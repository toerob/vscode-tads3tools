/**
 * Tads3v2AstScopeBuilder.ts
 *
 * A single-pass structural walk over a parsed ProgramNode.
 * Builds a scope map of all named functions and methods, each annotated
 * with the call sites reachable directly from its body.
 *
 * Nothing is evaluated. No values are computed.
 * The result is intended to feed LSP providers:
 *   - Call Hierarchy  (incoming / outgoing calls)
 *   - (future) Find All References, Rename
 *
 * Entry point:
 *   const builder = new Tads3v2AstScopeBuilder();
 *   builder.build(programNode);
 *   builder.scopes           // Map<qualifiedName, FunctionScope>
 *   builder.scopeAt(pos)     // innermost scope containing a position
 */

import {
  AstNode,
  FunctionDeclNode,
  LocalDeclNode,
  ObjectDeclNode,
  ObjectBodyNode,
  OperatorOverrideNode,
  PropertyDeclNode,
  ProgramNode,
  SourcePosition,
  SourceRange,
} from './ast/nodes';

// ── Output types ──────────────────────────────────────────────────────────────

/** Identifies a named function or method definition. */
export interface SymbolDef {
  /** Simple name as written in source (`doThing`, `north`, `operator+`). */
  name: string;
  /** Enclosing object for methods; null for top-level functions. */
  containerName: string | null;
  /** Fully-qualified name used as the map key: `"Container.name"` or `"name"`. */
  qualifiedName: string;
  /** Full extent of the declaration (function body included). */
  range: SourceRange;
  /** Range covering just the name identifier (best-effort approximation). */
  selectionRange: SourceRange;
}

/** A single call expression within a function body. */
export interface CallRef {
  /** The simple name of the callee (`doThing`, `method`, `inherited`). */
  calleeName: string;
  /**
   * For member-access calls (`obj.method()`), the object name when it is a
   * simple identifier. Null for plain function calls or complex expressions.
   */
  calleeContainer: string | null;
  /** Source range of the entire call expression. */
  range: SourceRange;
}

/** Everything known about one named function or method scope. */
export interface FunctionScope {
  def: SymbolDef;
  /** All call expressions in this scope (not in nested functions / lambdas). */
  calls: CallRef[];
}

const ZERO_POS:  SourcePosition = { line: 0, character: 0 };
const ZERO_RANGE: SourceRange   = { start: ZERO_POS, end: ZERO_POS };

// ── Builder ───────────────────────────────────────────────────────────────────

export class Tads3v2AstScopeBuilder {
  /** All named function/method scopes, keyed by qualified name. */
  readonly scopes = new Map<string, FunctionScope>();

  // ── Public API ──────────────────────────────────────────────────────────────

  /** Walk `program` and populate `scopes`. Idempotent — clears state on each call. */
  build(program: ProgramNode): void {
    this.scopes.clear();
    for (const directive of program.directives) {
      if (directive.kind === 'ObjectDecl') {
        this.visitObjectDecl(directive as ObjectDeclNode);
      } else if (directive.kind === 'FunctionDecl') {
        this.visitFunctionDecl(directive as FunctionDeclNode, null);
      }
    }
  }

  /**
   * Find the innermost scope whose definition range contains `pos`.
   * Returns null when the position is not inside any known function or method.
   */
  scopeAt(pos: SourcePosition): FunctionScope | null {
    let best: FunctionScope | null = null;
    let bestArea = Infinity;
    for (const scope of this.scopes.values()) {
      const r = scope.def.range;
      if (!this.contains(r, pos)) continue;
      // Prefer the smallest (innermost) containing range.
      const area = (r.end.line - r.start.line) * 100_000 +
                   (r.end.character - r.start.character);
      if (area < bestArea) { best = scope; bestArea = area; }
    }
    return best;
  }

  // ── Private walkers ─────────────────────────────────────────────────────────

  private visitObjectDecl(node: ObjectDeclNode): void {
    this.visitBodyItems(node.body.items, node.id);
  }

  /**
   * Walk a list of body items (properties, methods, operator overrides)
   * under a given container name, recursing into nested object forms.
   */
  private visitBodyItems(items: AstNode[], containerName: string | null): void {
    for (const item of items) {
      if (item.kind === 'FunctionDecl') {
        this.visitFunctionDecl(item as FunctionDeclNode, containerName);

      } else if (item.kind === 'OperatorOverride') {
        if (containerName) this.visitOperatorOverride(item as OperatorOverrideNode, containerName);

      } else if (item.kind === 'PropertyDecl') {
        const prop = item as PropertyDeclNode;
        // `name: SuperType { body }` — nested object form; recurse with a qualified container.
        if (prop.nestedBody) {
          const nested = containerName ? `${containerName}.${prop.name}` : prop.name;
          this.visitBodyItems(prop.nestedBody.items, nested);
        }
      }
    }
  }

  private visitFunctionDecl(node: FunctionDeclNode, containerName: string | null): void {
    // Anonymous function expressions are scope boundaries but aren't indexed.
    if (!node.name || !node.body) return;
    const qualifiedName = containerName ? `${containerName}.${node.name}` : node.name;
    const calls: CallRef[] = [];
    this.collectCalls(node.body, calls);
    const range = this.rangeOf(node);
    this.scopes.set(qualifiedName, {
      def: {
        name:           node.name,
        containerName,
        qualifiedName,
        range,
        selectionRange: this.nameRange(range, node.name),
      },
      calls,
    });
  }

  private visitOperatorOverride(node: OperatorOverrideNode, containerName: string): void {
    const name = `operator${node.op}`;
    const qualifiedName = `${containerName}.${name}`;
    const calls: CallRef[] = [];
    this.collectCalls(node.body, calls);
    const range = this.rangeOf(node);
    this.scopes.set(qualifiedName, {
      def: { name, containerName, qualifiedName, range, selectionRange: range },
      calls,
    });
  }

  // ── Call collection ──────────────────────────────────────────────────────────

  /**
   * Recursively collect all call sites reachable from `node`.
   * Stops descending at nested function / lambda / operator-override boundaries
   * (calls inside those belong to their own scope).
   */
  private collectCalls(node: AstNode, calls: CallRef[]): void {
    const r = (n: AstNode) => this.collectCalls(n, calls);

    switch (node.kind) {

      // ── Scope boundaries: stop descent ──────────────────────────────────
      case 'FunctionDecl':
      case 'OperatorOverride':
        return;

      // ── Call sites ───────────────────────────────────────────────────────
      case 'Call': {
        const callRange = this.rangeOf(node);
        const callee = node.callee;
        if (callee.kind === 'Identifier') {
          calls.push({ calleeName: callee.name, calleeContainer: null, range: callRange });
        } else if (callee.kind === 'MemberAccess' && callee.member.kind === 'Identifier') {
          const container = callee.object.kind === 'Identifier' ? callee.object.name : null;
          calls.push({ calleeName: callee.member.name, calleeContainer: container, range: callRange });
        }
        r(node.callee);
        node.args.forEach(r);
        return;
      }

      case 'InheritedCall':
        calls.push({ calleeName: 'inherited', calleeContainer: null, range: this.rangeOf(node) });
        r(node.expr);
        return;

      case 'LambdaCall':
        // The callee expression is in the enclosing scope; the brace-lambda body is not.
        r(node.callee);
        return;

      // ── Statements ───────────────────────────────────────────────────────
      case 'Block':
        node.body.forEach(r);
        return;

      case 'IfStmt':
        r(node.condition);
        r(node.consequent);
        node.elseIfs.forEach(b => { r(b.condition); r(b.consequent); });
        if (node.alternate) r(node.alternate);
        return;

      case 'WhileStmt':
        if (node.condition) r(node.condition);
        r(node.body);
        return;

      case 'DoWhileStmt':
        r(node.body);
        if (node.condition) r(node.condition);
        return;

      case 'ForStmt':
        if (node.init)      r(node.init);
        if (node.condition) r(node.condition);
        if (node.update)    r(node.update);
        r(node.body);
        return;

      case 'ForInStmt':
        r(node.iterable);
        r(node.body);
        return;

      case 'ForEachStmt':
        r(node.variable);
        r(node.iterable);
        r(node.body);
        return;

      case 'SwitchStmt':
        r(node.discriminant);
        node.cases.forEach(c => { if (c.test) r(c.test); c.body.forEach(r); });
        return;

      case 'TryCatch':
        r(node.body);
        node.catches.forEach(c => r(c.body));
        if (node.finallyBlock) r(node.finallyBlock);
        return;

      case 'ReturnStmt':
        if (node.value) r(node.value);
        return;

      case 'ThrowStmt':
        r(node.value);
        return;

      case 'LabelStmt':
      case 'BreakStmt':
      case 'ContinueStmt':
      case 'GotoStmt':
      case 'SayStmt':
        return;

      // ── Expressions ──────────────────────────────────────────────────────
      case 'Assignment':
        r(node.target);
        r(node.value);
        return;

      case 'BinaryOp':
        r(node.left);
        r(node.right);
        return;

      case 'UnaryOp':
        r(node.operand);
        return;

      case 'Conditional':
        r(node.condition);
        r(node.consequent);
        r(node.alternate);
        return;

      case 'MemberAccess':
        r(node.object);
        // node.member is the property identifier — not a call in isolation
        return;

      case 'IndexAccess':
        r(node.object);
        if (node.index) r(node.index);
        return;

      case 'PostIncrement':
      case 'PostDecrement':
        r(node.object);
        return;

      case 'ArrowOp':
        r(node.object);
        r(node.target);
        return;

      case 'RangeExpr':
        r(node.object);
        r(node.end);
        if (node.step) r(node.step);
        return;

      case 'IsIn':
        r(node.operand);
        node.values.forEach(r);
        return;

      case 'NotIn':
        r(node.operand);
        node.values.forEach(r);
        return;

      case 'ArrayLiteral':
        node.elements.forEach(r);
        return;

      case 'Paren':
        if (node.inner) r(node.inner);
        return;

      case 'LocalDecl':
        if ((node as LocalDeclNode).init) r((node as LocalDeclNode).init!);
        return;

      case 'LocalDeclList':
        node.decls.forEach((d: LocalDeclNode) => { if (d.init) r(d.init); });
        return;

      case 'StaticExpr':
      case 'LocalExpr':
      case 'TransientExpr':
        r(node.expr);
        return;

      case 'Lambda':
        // Inline lambda: its body is its own scope boundary.
        return;

      // Inline anonymous object — recurse into property values (not method bodies).
      case 'AnonObject':
        r(node.object);
        return;

      case 'AnonObjectTyped':
        r(node.object);
        return;

      // ObjectDecl inside a function body (unusual but valid TADS3).
      // Property value expressions are in the enclosing scope;
      // method bodies (FunctionDecl items) are scope boundaries caught above.
      case 'ObjectDecl': {
        const objDecl = node as ObjectDeclNode;
        for (const item of objDecl.body.items) {
          if (item.kind === 'PropertyDecl') {
            const prop = item as PropertyDeclNode;
            if (prop.value) r(prop.value);
            // Nested object bodies (prop.nestedBody) — skip; handled by visitBodyItems
          }
        }
        return;
      }

      // ── Leaves (no sub-nodes to visit) ───────────────────────────────────
      default:
        return;
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private rangeOf(node: AstNode): SourceRange {
    return node.range ?? ZERO_RANGE;
  }

  private contains(range: SourceRange, pos: SourcePosition): boolean {
    const { start, end } = range;
    if (pos.line < start.line || pos.line > end.line) return false;
    if (pos.line === start.line && pos.character < start.character) return false;
    if (pos.line === end.line   && pos.character > end.character)   return false;
    return true;
  }

  /**
   * Approximate a selection range for the name identifier.
   * FunctionDeclNode does not store a separate name-token range, so we
   * assume the name starts at the declaration's start position.
   * This is a best-effort estimate; it may be off if preceded by keywords
   * like `static`, `replace`, or `modify`.
   */
  private nameRange(defRange: SourceRange, name: string): SourceRange {
    return {
      start: defRange.start,
      end: {
        line:      defRange.start.line,
        character: defRange.start.character + name.length,
      },
    };
  }
}

/** Build a reverse index: callee qualifiedName → callers. */
export function buildIncomingCallIndex(
  scopes: Map<string, FunctionScope>,
): Map<string, { callerQualifiedName: string; range: SourceRange }[]> {
  const index = new Map<string, { callerQualifiedName: string; range: SourceRange }[]>();
  for (const scope of scopes.values()) {
    for (const call of scope.calls) {
      // Try qualified first ("Container.method"), then bare name as fallback key.
      const key = call.calleeContainer
        ? `${call.calleeContainer}.${call.calleeName}`
        : call.calleeName;
      if (!index.has(key)) index.set(key, []);
      index.get(key)!.push({ callerQualifiedName: scope.def.qualifiedName, range: call.range });
    }
  }
  return index;
}
