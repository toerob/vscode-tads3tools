/**
 * Tads3v2AstEvaluator.ts
 *
 * Tree-walking interpreter / partial evaluator for the TADS3 AST.
 * Used within the language server for static analysis: evaluating constant
 * sub-expressions, resolving local variable bindings, and propagating object
 * property values that can be determined without running the game.
 *
 * Anything that cannot be resolved statically (calls to unknown functions,
 * inherited dispatch, runtime I/O, etc.) is represented as TadsUnknown.
 *
 * Entry points:
 *   eval(program, env?)           — evaluate a full ProgramNode
 *   evalBlock(block, env)         — evaluate a BlockNode
 *   evalExpr(expr, env)           — evaluate any expression node
 */

import {
  AstNode,
  AssignmentOpKind,
  BinaryOpKind,
  BlockNode,
  FunctionDeclNode,
  ObjectDeclNode,
  ParamNode,
  PropertyDeclNode,
  ProgramNode,
  UnaryOpKind,
  IntrinsicDeclNode,
  IntrinsicMethodNode,
} from './ast/nodes';

// ── Runtime value types ───────────────────────────────────────────────────────

export interface TadsNil      { type: 'nil' }
export interface TadsTrue     { type: 'true' }
export interface TadsNumber   { type: 'number';   value: number }
export interface TadsString   { type: 'string';   value: string }
export interface TadsList     { type: 'list';     elements: TadsValue[] }
export interface TadsObject   {
  type: 'object';
  name: string | null;
  superTypes: string[];
  props: Map<string, TadsValue>;
}
export interface TadsFunction {
  type: 'function';
  name: string | null;
  params: ParamNode[];
  body: AstNode | null;
  closure: EvalEnv;
}

export interface TadsIntrinsicMethod {
  type: 'intrinsicMethod';
  name: string | null;
  params: ParamNode[];
  closure: EvalEnv;
}

export interface TadsUnknown  { type: 'unknown' }

export type TadsValue =
  | TadsNil
  | TadsTrue
  | TadsNumber
  | TadsString
  | TadsList
  | TadsObject
  | TadsFunction
  | TadsIntrinsicMethod
  | TadsUnknown;

// Singleton constants for the two valueless types
export const NIL:     TadsNil     = { type: 'nil' };
export const TRUE:    TadsTrue    = { type: 'true' };
export const UNKNOWN: TadsUnknown = { type: 'unknown' };

export const tadsNum  = (v: number):        TadsNumber  => ({ type: 'number',  value: v });
export const tadsStr  = (v: string):        TadsString  => ({ type: 'string',  value: v });
export const tadsList = (els: TadsValue[]): TadsList    => ({ type: 'list',    elements: els });

// ── Typed scope chain ─────────────────────────────────────────────────────────

export class EvalEnv {
  constructor(
    private readonly bindings: Map<string, TadsValue> = new Map(),
    private readonly parent:   EvalEnv | null = null,
  ) {}

  /** Look up a name through the scope chain; returns UNKNOWN if not found. */
  get(name: string): TadsValue {
    return this.bindings.get(name) ?? this.parent?.get(name) ?? UNKNOWN;
  }

  /** Bind a name in this (innermost) scope, regardless of outer bindings. */
  define(name: string, value: TadsValue): void {
    this.bindings.set(name, value);
  }

  /**
   * Assign to an already-bound name, searching the scope chain.
   * If the name is unbound anywhere, falls back to defining it locally.
   */
  assign(name: string, value: TadsValue): void {
    if (!this.assignIfExists(name, value)) {
      this.bindings.set(name, value);
    }
  }

  private assignIfExists(name: string, value: TadsValue): boolean {
    if (this.bindings.has(name)) {
      this.bindings.set(name, value);
      return true;
    }
    return this.parent?.assignIfExists(name, value) ?? false;
  }

  /** Return a new child scope whose parent is this env. */
  child(): EvalEnv {
    return new EvalEnv(new Map(), this);
  }
}

// ── Control-flow signals (thrown, caught within the evaluator) ────────────────

class ReturnSignal   { constructor(readonly value: TadsValue) {} }
class BreakSignal    { constructor(readonly label: string | null) {} }
class ContinueSignal { constructor(readonly label: string | null) {} }
class ThrowSignal    { constructor(readonly value: TadsValue) {} }

// ── Evaluator ─────────────────────────────────────────────────────────────────

export class Tads3v2AstEvaluator {

  readonly globalEnvironment: EvalEnv = new EvalEnv();

  // ── Public API ──────────────────────────────────────────────────────────────

  /** Evaluate a full program, populating globalEnvironment with top-level bindings. */
  eval(program: ProgramNode, env: EvalEnv = this.globalEnvironment): TadsValue {
    let last: TadsValue = NIL;
    for (const directive of program.directives) {
      last = this.evalNode(directive, env);
    }
    return last;
  }

  /** Evaluate a block of statements in the given env. Returns the last statement value. */
  evalBlock(block: BlockNode, env: EvalEnv): TadsValue {
    let last: TadsValue = NIL;
    for (const stmt of block.body) {
      last = this.evalNode(stmt, env);
    }
    return last;
  }

  /** Evaluate any expression or statement node in the given env. */
  evalExpr(expr: AstNode, env: EvalEnv): TadsValue {
    return this.evalNode(expr, env);
  }

  // ── Central dispatch ────────────────────────────────────────────────────────

  private evalNode(node: AstNode, env: EvalEnv): TadsValue {
    switch (node.kind) {

      // ── Literals ────────────────────────────────────────────────────────────
      case 'Nil':     return NIL;
      case 'Boolean': return TRUE;
      case 'Number':  return tadsNum(parseFloat(node.value));
      case 'Hex':     return tadsNum(parseInt(node.value, 16));
      case 'String':  return tadsStr(this.stripQuotes(node.value));
      case 'Regexp':  return tadsStr(node.value);

      // ── Identifier (look up in scope chain) ─────────────────────────────────
      case 'Identifier': return env.get(node.name);

      // ── Reference (&foo — address-of; treat as looking up the binding) ───────
      case 'Reference': return env.get(node.name);

      // ── Paren ────────────────────────────────────────────────────────────────
      case 'Paren': return node.inner ? this.evalNode(node.inner, env) : NIL;

      // ── Array literal ────────────────────────────────────────────────────────
      case 'ArrayLiteral':
        return tadsList(node.elements.map(e => this.evalNode(e, env)));

      // ── Unary ────────────────────────────────────────────────────────────────
      case 'UnaryOp':
        return this.evalUnary(node.op, this.evalNode(node.operand, env));

      // ── Binary ───────────────────────────────────────────────────────────────
      case 'BinaryOp':
        return this.evalBinary(node.op, this.evalNode(node.left, env), this.evalNode(node.right, env));

      // ── Ternary conditional ──────────────────────────────────────────────────
      case 'Conditional': {
        const cond = this.evalNode(node.condition, env);
        if (cond.type === 'unknown') return UNKNOWN;
        return this.isTruthy(cond)
          ? this.evalNode(node.consequent, env)
          : this.evalNode(node.alternate, env);
      }

      // ── Set membership ───────────────────────────────────────────────────────
      case 'IsIn': {
        const operand = this.evalNode(node.operand, env);
        if (operand.type === 'unknown') return UNKNOWN;
        const vals = node.values.map(v => this.evalNode(v, env));
        if (vals.some(v => v.type === 'unknown')) return UNKNOWN;
        return vals.some(v => this.valuesEqual(operand, v)) ? TRUE : NIL;
      }

      case 'NotIn': {
        const operand = this.evalNode(node.operand, env);
        if (operand.type === 'unknown') return UNKNOWN;
        const vals = node.values.map(v => this.evalNode(v, env));
        if (vals.some(v => v.type === 'unknown')) return UNKNOWN;
        return vals.some(v => this.valuesEqual(operand, v)) ? NIL : TRUE;
      }

      // ── Assignment ───────────────────────────────────────────────────────────
      case 'Assignment':
        return this.evalAssignment(node.op, node.target, node.value, env);

      // ── Local variable declarations ──────────────────────────────────────────
      case 'LocalDecl': {
        const value = node.init ? this.evalNode(node.init, env) : NIL;
        env.define(node.name, value);
        return value;
      }

      case 'LocalDeclList': {
        let last: TadsValue = NIL;
        for (const decl of node.decls) {
          const value = decl.init ? this.evalNode(decl.init, env) : NIL;
          env.define(decl.name, value);
          last = value;
        }
        return last;
      }

      // ── Block (introduces a new inner scope) ─────────────────────────────────
      case 'Block': {
        const inner = env.child();
        let last: TadsValue = NIL;
        for (const stmt of node.body) {
          last = this.evalNode(stmt, inner);
        }
        return last;
      }

      // ── If statement ─────────────────────────────────────────────────────────
      case 'IfStmt': {
        const cond = this.evalNode(node.condition, env);
        if (cond.type !== 'unknown' && this.isTruthy(cond)) {
          return this.evalNode(node.consequent, env);
        }
        for (const branch of node.elseIfs) {
          const bc = this.evalNode(branch.condition, env);
          if (bc.type !== 'unknown' && this.isTruthy(bc)) {
            return this.evalNode(branch.consequent, env);
          }
        }
        return node.alternate ? this.evalNode(node.alternate, env) : NIL;
      }

      // ── While loop ───────────────────────────────────────────────────────────
      case 'WhileStmt': {
        let last: TadsValue = NIL;
        for (let guard = 0; guard < 10_000; guard++) {
          const cond = node.condition ? this.evalNode(node.condition, env) : TRUE;
          if (cond.type === 'unknown' || !this.isTruthy(cond)) break;
          try {
            last = this.evalNode(node.body, env);
          } catch (e) {
            if (e instanceof BreakSignal)    break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        return last;
      }

      // ── Do-while loop ────────────────────────────────────────────────────────
      case 'DoWhileStmt': {
        let last: TadsValue = NIL;
        let running = true;
        for (let guard = 0; guard < 10_000 && running; guard++) {
          try {
            last = this.evalNode(node.body, env);
          } catch (e) {
            if (e instanceof BreakSignal)    { running = false; break; }
            if (e instanceof ContinueSignal) { /* fall through to condition check */ }
            else throw e;
          }
          const cond = node.condition ? this.evalNode(node.condition, env) : TRUE;
          if (cond.type === 'unknown' || !this.isTruthy(cond)) running = false;
        }
        return last;
      }

      // ── For loop ─────────────────────────────────────────────────────────────
      case 'ForStmt': {
        const loopEnv = env.child();
        if (node.init) this.evalNode(node.init, loopEnv);
        let last: TadsValue = NIL;
        for (let guard = 0; guard < 10_000; guard++) {
          const cond = node.condition ? this.evalNode(node.condition, loopEnv) : TRUE;
          if (cond.type === 'unknown' || !this.isTruthy(cond)) break;
          try {
            last = this.evalNode(node.body, loopEnv);
          } catch (e) {
            if (e instanceof BreakSignal)    break;
            if (e instanceof ContinueSignal) { /* fall through to update */ }
            else throw e;
          }
          if (node.update) this.evalNode(node.update, loopEnv);
        }
        return last;
      }

      // ── For-in loop (for local x in iterable) ────────────────────────────────
      case 'ForInStmt': {
        const iterable = this.evalNode(node.iterable, env);
        const items = this.toIterable(iterable);
        if (!items) return UNKNOWN;
        const loopEnv = env.child();
        let last: TadsValue = NIL;
        for (const item of items) {
          loopEnv.define(node.name, item);
          try {
            last = this.evalNode(node.body, loopEnv);
          } catch (e) {
            if (e instanceof BreakSignal)    break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        return last;
      }

      // ── ForEach loop (foreach (variable in iterable)) ────────────────────────
      case 'ForEachStmt': {
        const iterable = this.evalNode(node.iterable, env);
        const items = this.toIterable(iterable);
        if (!items) return UNKNOWN;
        const loopEnv = env.child();
        let last: TadsValue = NIL;
        for (const item of items) {
          this.assignLvalue(node.variable, item, loopEnv);
          try {
            last = this.evalNode(node.body, loopEnv);
          } catch (e) {
            if (e instanceof BreakSignal)    break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        return last;
      }

      // ── Switch ───────────────────────────────────────────────────────────────
      case 'SwitchStmt': {
        const disc = this.evalNode(node.discriminant, env);
        let matched = disc.type === 'unknown'; // if disc unknown, execute everything
        let last: TadsValue = NIL;
        try {
          for (const clause of node.cases) {
            if (!matched) {
              if (clause.test === null) {
                matched = true; // default clause
              } else {
                const test = this.evalNode(clause.test, env);
                matched = this.valuesEqual(disc, test);
              }
            }
            if (matched) {
              for (const stmt of clause.body) {
                last = this.evalNode(stmt, env);
              }
            }
          }
        } catch (e) {
          if (!(e instanceof BreakSignal)) throw e;
        }
        return last;
      }

      // ── Try-catch-finally ────────────────────────────────────────────────────
      case 'TryCatch': {
        let last: TadsValue = NIL;
        try {
          last = this.evalNode(node.body, env);
        } catch (e) {
          if (e instanceof ThrowSignal) {
            for (const clause of node.catches) {
              const catchEnv = env.child();
              // Bind the caught value to the first parameter name if present
              if (clause.params.length > 0 && clause.params[0].name) {
                catchEnv.define(clause.params[0].name, e.value);
              }
              last = this.evalNode(clause.body, catchEnv);
              break; // first matching catch wins (type matching not modelled)
            }
          } else throw e;
        } finally {
          if (node.finallyBlock) this.evalNode(node.finallyBlock, env);
        }
        return last;
      }

      // ── Return ───────────────────────────────────────────────────────────────
      case 'ReturnStmt': {
        const value = node.value ? this.evalNode(node.value, env) : NIL;
        throw new ReturnSignal(value);
      }

      // ── Throw ────────────────────────────────────────────────────────────────
      case 'ThrowStmt':
        throw new ThrowSignal(this.evalNode(node.value, env));

      // ── Flow-control jumps ───────────────────────────────────────────────────
      case 'BreakStmt':    throw new BreakSignal(node.label);
      case 'ContinueStmt': throw new ContinueSignal(node.label);
      case 'GotoStmt':     return UNKNOWN; // not modelled
      case 'LabelStmt':    return NIL;

      // ── Say (TADS3 output statement — treat as the string value) ─────────────
      case 'SayStmt': return tadsStr(this.stripQuotes(node.value));

      // ── Function call ────────────────────────────────────────────────────────
      case 'Call': {
        const callee = this.evalNode(node.callee, env);
        if (callee.type !== 'function') return UNKNOWN;
        const args = node.args.map(a => this.evalNode(a, env));
        return this.applyFunction(callee, args, env);
      }

      // ── Member access (obj.name) ─────────────────────────────────────────────
      case 'MemberAccess': {
        const obj = this.evalNode(node.object, env);
        if (obj.type !== 'object') return UNKNOWN;
        if (node.member.kind === 'Identifier') {
          return obj.props.get(node.member.name) ?? NIL;
        }
        // Computed member access — evaluate to get property name
        const key = this.evalNode(node.member, env);
        if (key.type === 'string') return obj.props.get(key.value) ?? NIL;
        return UNKNOWN;
      }

      // ── Index access (obj[idx]) ──────────────────────────────────────────────
      case 'IndexAccess': {
        const obj = this.evalNode(node.object, env);
        const idx = node.index ? this.evalNode(node.index, env) : UNKNOWN;
        if (obj.type === 'list' && idx.type === 'number') {
          // TADS3 uses 1-based indexing
          const i = Math.floor(idx.value) - 1;
          return obj.elements[i] ?? NIL;
        }
        if (obj.type === 'string' && idx.type === 'number') {
          const i = Math.floor(idx.value) - 1;
          return obj.value[i] !== undefined ? tadsStr(obj.value[i]) : NIL;
        }
        return UNKNOWN;
      }

      // ── Post-increment / post-decrement ──────────────────────────────────────
      case 'PostIncrement': {
        const cur = this.evalNode(node.object, env);
        if (cur.type === 'number') {
          this.assignLvalue(node.object, tadsNum(cur.value + 1), env);
          return cur; // return old value (post semantics)
        }
        return UNKNOWN;
      }

      case 'PostDecrement': {
        const cur = this.evalNode(node.object, env);
        if (cur.type === 'number') {
          this.assignLvalue(node.object, tadsNum(cur.value - 1), env);
          return cur;
        }
        return UNKNOWN;
      }

      // ── Range expression (start..end [step s]) ───────────────────────────────
      case 'RangeExpr': {
        const start = this.evalNode(node.object, env);
        const end   = this.evalNode(node.end, env);
        if (start.type !== 'number' || end.type !== 'number') return UNKNOWN;
        const step = node.step
          ? this.evalNode(node.step, env)
          : tadsNum(start.value <= end.value ? 1 : -1);
        if (step.type !== 'number' || step.value === 0) return UNKNOWN;
        const els: TadsValue[] = [];
        for (
          let i = start.value;
          step.value > 0 ? i <= end.value : i >= end.value;
          i += step.value
        ) {
          els.push(tadsNum(i));
          if (els.length > 100_000) break; // safety guard
        }
        return tadsList(els);
      }

      // ── Lambda { params : body } ─────────────────────────────────────────────
      case 'Lambda':
        return {
          type:    'function',
          name:    null,
          params:  node.params,
          body:    node.body,
          closure: env,
        } satisfies TadsFunction;

      // ── Lambda call: callee { params : body } ────────────────────────────────
      case 'LambdaCall': {
        const callee = this.evalNode(node.callee, env);
        if (callee.type !== 'function') return UNKNOWN;
        // The braced block becomes a function value passed as the sole argument
        const lambdaArg: TadsFunction = {
          type:    'function',
          name:    null,
          params:  node.params,
          body:    node.body,
          closure: env,
        };
        return this.applyFunction(callee, [lambdaArg], env);
      }

      // ── Intrinsic object declaration ───────────────────────────────────────────────────
      case 'IntrinsicDecl':
        return this.evalIntrinsicDecl(node, env);

      // ── Object declaration ───────────────────────────────────────────────────
      case 'ObjectDecl':
        return this.evalObjectDecl(node, env);

      // ── Function declaration ─────────────────────────────────────────────────
      case 'FunctionDecl': {
        const fn: TadsFunction = {
          type:    'function',
          name:    node.name,
          params:  node.params,
          body:    node.body,
          closure: env,
        };
        if (node.name) env.define(node.name, fn);
        return fn;
      }

      // ── Program (can be reached via evalExpr) ────────────────────────────────
      case 'Program': {
        let last: TadsValue = NIL;
        for (const directive of node.directives) {
          last = this.evalNode(directive, env);
        }
        return last;
      }

      // ── Unary wrappers ───────────────────────────────────────────────────────
      case 'NewExpr':        return UNKNOWN; // runtime instantiation
      case 'DelegatedExpr':  return UNKNOWN;
      case 'InheritedCall':  return UNKNOWN;
      case 'TransientExpr':  return UNKNOWN;
      case 'StaticExpr':     return this.evalNode(node.expr, env);
      case 'LocalExpr':      return this.evalNode(node.expr, env);

      // ── Inherited atom (primary) ─────────────────────────────────────────────
      case 'Inherited':      return UNKNOWN;

      // ── Arrow / arrow-op ─────────────────────────────────────────────────────
      case 'Arrow':
      case 'StarArrow':
      case 'ArrowOp':        return UNKNOWN;

      // ── Anonymous objects ────────────────────────────────────────────────────
      case 'AnonObject':
      case 'AnonObjectTyped': return UNKNOWN;

      // ── Structural nodes not directly evaluated ──────────────────────────────
      case 'ObjectBody':       return UNKNOWN;
      case 'PropertyDecl':     return UNKNOWN;
      case 'PropertySet':      return UNKNOWN;
      case 'OperatorOverride': return UNKNOWN;
      case 'TemplateDecl':     return UNKNOWN;
      case 'FunctionExpr':     return UNKNOWN;
      case 'Param':            return UNKNOWN;
      case 'Unhandled':        return UNKNOWN;
    }

    // Defensive fallback for future AstNode kinds.
    return UNKNOWN;
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private evalUnary(op: UnaryOpKind, operand: TadsValue): TadsValue {
    if (operand.type === 'unknown') return UNKNOWN;
    switch (op) {
      case '!':
      case 'not': return this.isTruthy(operand) ? NIL : TRUE;
      case '-':   return operand.type === 'number' ? tadsNum(-operand.value) : UNKNOWN;
      case '+':   return operand.type === 'number' ? operand               : UNKNOWN;
      case '~':   return operand.type === 'number' ? tadsNum(~operand.value | 0) : UNKNOWN;
      case '*':   return UNKNOWN; // pointer dereference
      case '&':   return UNKNOWN; // address-of
      case '@':   return UNKNOWN; // TADS3 special
    }
  }

  private evalBinary(op: BinaryOpKind, left: TadsValue, right: TadsValue): TadsValue {
    // Short-circuit logical operators even with an unknown operand
    if (op === '&&') {
      if (left.type !== 'unknown' && !this.isTruthy(left)) return left;
      if (right.type !== 'unknown' && !this.isTruthy(right)) return right;
    }
    if (op === '||') {
      if (left.type !== 'unknown' && this.isTruthy(left)) return left;
    }
    if (op === '??') {
      if (left.type !== 'unknown' && left.type !== 'nil') return left;
      if (left.type === 'nil') return right;
    }

    if (left.type === 'unknown' || right.type === 'unknown') return UNKNOWN;

    switch (op) {
      // Arithmetic
      case '+':
        if (left.type === 'number' && right.type === 'number')
          return tadsNum(left.value + right.value);
        if (left.type === 'string' || right.type === 'string')
          return tadsStr(this.coerceToString(left) + this.coerceToString(right));
        if (left.type === 'list' && right.type === 'list')
          return tadsList([...left.elements, ...right.elements]);
        return UNKNOWN;
      case '-':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum(left.value - right.value) : UNKNOWN;
      case '*':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum(left.value * right.value) : UNKNOWN;
      case '/':
        if (left.type === 'number' && right.type === 'number' && right.value !== 0)
          return tadsNum(Math.trunc(left.value / right.value)); // integer division
        return UNKNOWN;
      case '%':
        if (left.type === 'number' && right.type === 'number' && right.value !== 0)
          return tadsNum(left.value % right.value);
        return UNKNOWN;

      // Shift
      case '<<':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value << right.value) | 0) : UNKNOWN;
      case '>>':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value >> right.value) | 0) : UNKNOWN;
      case '>>>':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value >>> right.value) | 0) : UNKNOWN;

      // Bitwise
      case '&':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value & right.value) | 0) : UNKNOWN;
      case '^':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value ^ right.value) | 0) : UNKNOWN;
      case '|':
        return left.type === 'number' && right.type === 'number'
          ? tadsNum((left.value | right.value) | 0) : UNKNOWN;

      // Relational
      case '<':   return tadsNum(this.compare(left, right)) .value < 0  ? TRUE : NIL;
      case '>':   return tadsNum(this.compare(left, right)) .value > 0  ? TRUE : NIL;
      case '<=':  return tadsNum(this.compare(left, right)) .value <= 0 ? TRUE : NIL;
      case '>=':  return tadsNum(this.compare(left, right)) .value >= 0 ? TRUE : NIL;

      // Equality
      case '==': return this.valuesEqual(left, right) ? TRUE : NIL;
      case '!=': return this.valuesEqual(left, right) ? NIL  : TRUE;

      // Logical (both operands known here)
      case '&&': return this.isTruthy(left) ? right : left;
      case '||': return this.isTruthy(left) ? left  : right;
      case '??': return left.type !== 'nil' ? left  : right;
    }
  }

  private evalAssignment(
    op: AssignmentOpKind, target: AstNode, valueNode: AstNode, env: EvalEnv,
  ): TadsValue {
    const rhs = this.evalNode(valueNode, env);
    if (op === '=') {
      this.assignLvalue(target, rhs, env);
      return rhs;
    }
    const cur = this.evalNode(target, env);
    const opMap: Record<AssignmentOpKind, BinaryOpKind | null> = {
      '=': null, '+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%',
      '|=': '|', '&=': '&', '^=': '^', '<<=': '<<', '>>=': '>>', '>>>=': '>>>',
    };
    const binOp = opMap[op];
    const newValue = binOp ? this.evalBinary(binOp, cur, rhs) : rhs;
    this.assignLvalue(target, newValue, env);
    return newValue;
  }

  private assignLvalue(target: AstNode, value: TadsValue, env: EvalEnv): void {
    if (target.kind === 'Identifier') {
      env.assign(target.name, value);
    } else if (target.kind === 'MemberAccess' && target.member.kind === 'Identifier') {
      const obj = this.evalNode(target.object, env);
      if (obj.type === 'object') obj.props.set(target.member.name, value);
    } else if (target.kind === 'IndexAccess' && target.index) {
      const obj = this.evalNode(target.object, env);
      const idx = this.evalNode(target.index, env);
      if (obj.type === 'list' && idx.type === 'number') {
        obj.elements[Math.floor(idx.value) - 1] = value;
      }
    }
    // Paren / complex lvalues — silently ignored
  }

  private applyFunction(fn: TadsFunction, args: TadsValue[], _callEnv: EvalEnv): TadsValue {
    if (!fn.body) return UNKNOWN;
    const fnEnv = fn.closure.child();
    fn.params.forEach((param, i) => {
      if (param.spread || param.name === null) return;
      const arg = i < args.length
        ? args[i]
        : (param.defaultValue ? this.evalNode(param.defaultValue, fnEnv) : NIL);
      fnEnv.define(param.name, arg);
    });
    try {
      return this.evalNode(fn.body, fnEnv);
    } catch (e) {
      if (e instanceof ReturnSignal) return e.value;
      throw e;
    }
  }
  private evalIntrinsicDecl(node: IntrinsicDeclNode, env: EvalEnv): TadsValue {
    // Intrinsic declarations are object-like shells with method signatures.
    const obj: TadsObject = {
      type:       'object',
      name:       node.name,
      superTypes: node.superTypes,
      props:      new Map(),
    };

    for (const method of node.methods) {
     if (method.kind === 'IntrinsicMethodDecl') {
        const fn = method as IntrinsicMethodNode;
        const fnValue: TadsIntrinsicMethod = {
          type:    'intrinsicMethod' ,
          name:    fn.name,
          params:  fn.params,
          closure: env,
        };
        if (fn.name) obj.props.set(fn.name, fnValue);
      }
    }

    if (obj.name) env.define(obj.name, obj);
    return obj;
  }


  private evalObjectDecl(node: ObjectDeclNode, env: EvalEnv): TadsValue {
    const obj: TadsObject = {
      type:       'object',
      name:       node.id,
      superTypes: node.superTypes,
      props:      new Map(),
    };
    // Evaluate each property and method in the object body
    for (const item of node.body.items) {
      if (item.kind === 'PropertyDecl') {
        const prop = item as PropertyDeclNode;
        obj.props.set(prop.name, prop.value ? this.evalNode(prop.value, env) : NIL);
      } else if (item.kind === 'FunctionDecl') {
        const fn = item as FunctionDeclNode;
        const fnValue: TadsFunction = {
          type:    'function',
          name:    fn.name,
          params:  fn.params,
          body:    fn.body,
          closure: env,
        };
        if (fn.name) obj.props.set(fn.name, fnValue);
      }
    }
    if (node.id) env.define(node.id, obj);
    return obj;
  }

  /** Is the value truthy by TADS3 rules? */
  private isTruthy(v: TadsValue): boolean {
    switch (v.type) {
      case 'nil':      return false;
      case 'true':     return true;
      case 'number':   return v.value !== 0;
      case 'string':   return true; // all strings are truthy in TADS3
      case 'list':     return true;
      case 'object':   return true;
      case 'function': return true;
      case 'intrinsicMethod': return true;
      case 'unknown':  return false; // conservative
    }
  }

  private valuesEqual(a: TadsValue, b: TadsValue): boolean {
    if (a.type !== b.type) {
      // TADS3 coerces number↔string in equality comparisons
      if (a.type === 'number' && b.type === 'string') return String(a.value) === b.value;
      if (a.type === 'string' && b.type === 'number') return a.value === String(b.value);
      return false;
    }
    switch (a.type) {
      case 'nil':    return true;
      case 'true':   return true;
      case 'number': return a.value  === (b as TadsNumber).value;
      case 'string': return a.value  === (b as TadsString).value;
      default:       return a === b;  // reference equality for objects / functions
    }
  }

  private compare(a: TadsValue, b: TadsValue): number {
    if (a.type === 'number' && b.type === 'number') return a.value - b.value;
    if (a.type === 'string' && b.type === 'string')
      return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
    return 0;
  }

  private coerceToString(v: TadsValue): string {
    switch (v.type) {
      case 'nil':    return '';
      case 'true':   return 'true';
      case 'number': return String(v.value);
      case 'string': return v.value;
      default:       return '';
    }
  }

  /**
   * Return a flat JS array to iterate over, or null if not iterable.
   * ForIn / ForEach use this; RangeExpr is already evaluated to a list.
   */
  private toIterable(v: TadsValue): TadsValue[] | null {
    if (v.type === 'list')   return v.elements;
    if (v.type === 'string') return [...v.value].map(c => tadsStr(c));
    return null;
  }

  /** Strip the outer quote characters from a TADS3 string/say token. */
  private stripQuotes(raw: string): string {
    if (raw.length < 2) return raw;
    const first = raw[0], last = raw[raw.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return raw.slice(1, -1);
    }
    return raw;
  }
}
