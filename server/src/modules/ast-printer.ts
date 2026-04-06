/**
 * ast-printer.ts — Developer debug utility: pretty-prints a TADS3 AST.
 *
 * Structural nodes (objects, classes, functions, blocks, propertysets) are
 * indented recursively so the containment hierarchy is immediately visible.
 * Leaf nodes (expressions, simple statements) are shown on a single line.
 *
 * Line numbers are 1-based to match editor display conventions.
 */

import {
  AstNode,
  AstNodeKind,
  BlockNode,
  FunctionDeclNode,
  IfStmtNode,
  LocalDeclListNode,
  LocalDeclNode,
  ObjectBodyNode,
  ObjectDeclNode,
  OperatorOverrideNode,
  ParamNode,
  ProgramNode,
  PropertyDeclNode,
  PropertySetNode,
  SwitchStmtNode,
  TemplateDeclNode,
  TryCatchNode,
} from '../parser/ast/nodes';

// ── helpers ───────────────────────────────────────────────────────────────────

const INDENT = '  ';

function line1(node: AstNode): number {
  return (node.range?.start.line ?? 0) + 1; // 0-based → 1-based
}

function lineRange(node: AstNode): string {
  if (!node.range) return '';
  const s = node.range.start.line + 1;
  const e = node.range.end.line + 1;
  return s === e ? `  @L${s}` : `  @L${s}–${e}`;
}

/**
 * Compact single-line representation of a leaf expression/statement.
 * Never recurses more than a couple of levels.
 */
function compact(node: AstNode, depth = 0): string {
  if (depth > 3) return '…';
  const n = node as any;
  switch (node.kind) {
    case 'Identifier':    return n.name as string;
    case 'Number':        return n.value as string;
    case 'Hex':           return n.value as string;
    case 'String':        return n.quoteStyle === 'single' ? `'${n.value}'` : `"${n.value}"`;
    case 'Boolean':       return 'true';
    case 'Nil':           return 'nil';
    case 'Inherited':     return 'inherited';
    case 'Reference':     return `&${n.name}`;
    case 'Paren':         return n.inner ? `(${compact(n.inner, depth + 1)})` : '()';
    case 'BinaryOp':      return `${compact(n.left, depth + 1)} ${n.op} ${compact(n.right, depth + 1)}`;
    case 'UnaryOp':       return `${n.op}${compact(n.operand, depth + 1)}`;
    case 'Assignment':    return `${compact(n.target, depth + 1)} ${n.op} ${compact(n.value, depth + 1)}`;
    case 'MemberAccess':  return `${compact(n.object, depth + 1)}.${compact(n.member, depth + 1)}`;
    case 'IndexAccess':   return `${compact(n.object, depth + 1)}[${n.index ? compact(n.index, depth + 1) : ''}]`;
    case 'Call': {
      const callee = compact(n.callee, depth + 1);
      const args   = (n.args as AstNode[]).length > 0
        ? (n.args as AstNode[]).slice(0, 3).map((a: AstNode) => compact(a, depth + 2)).join(', ')
        : '';
      return `${callee}(${args})`;
    }
    case 'NewExpr':         return `new ${compact(n.expr, depth + 1)}`;
    case 'Arrow':           return `-> ${compact(n.target, depth + 1)}`;
    case 'Conditional':     return `${compact(n.condition, depth + 1)} ? … : …`;
    case 'LocalDecl':       return `local ${n.name}${n.init ? ` = ${compact(n.init as AstNode, depth + 1)}` : ''}`;
    case 'LocalDeclList':   return `local ${(n.decls as LocalDeclNode[]).map(d => d.name).join(', ')}`;
    case 'ReturnStmt':      return n.value ? `return ${compact(n.value as AstNode, depth + 1)}` : 'return';
    case 'ThrowStmt':       return `throw ${compact(n.value as AstNode, depth + 1)}`;
    case 'SayStmt':         return `"${n.value}"`;
    case 'BreakStmt':       return n.label ? `break ${n.label}` : 'break';
    case 'ContinueStmt':    return n.label ? `continue ${n.label}` : 'continue';
    case 'GotoStmt':        return n.label ? `goto ${n.label}` : 'goto';
    case 'LabelStmt':       return `${n.name}:`;
    case 'IsIn':            return `${compact(n.operand as AstNode, depth + 1)} is in (…)`;
    case 'NotIn':           return `${compact(n.operand as AstNode, depth + 1)} not in (…)`;
    case 'PostIncrement':   return `${compact(n.object as AstNode, depth + 1)}++`;
    case 'PostDecrement':   return `${compact(n.object as AstNode, depth + 1)}--`;
    case 'InheritedCall':   return `inherited ${compact(n.expr as AstNode, depth + 1)}`;
    case 'Lambda':          return `{ ${(n.params as ParamNode[]).map(p => p.name ?? '…').join(', ')} : … }`;
    case 'ArrayLiteral':    return `[${(n.elements as AstNode[]).slice(0, 4).map((e: AstNode) => compact(e, depth + 2)).join(', ')}${(n.elements as AstNode[]).length > 4 ? ', …' : ''}]`;
    case 'Unhandled':       return '<unhandled>';
    default:                return `<${node.kind}>`;
  }
}

function fmtParams(params: ParamNode[]): string {
  return params.map(p => {
    if (p.spread) return '...';
    let s = p.name ?? '?';
    if (p.optional) s += '?';
    if (p.defaultValue) s += ` = ${compact(p.defaultValue)}`;
    return s;
  }).join(', ');
}

// ── structural nodes ─────────────────────────────────────────────────────────

function printNode(node: AstNode, indent: string, lines: string[]): void {
  const next = indent + INDENT;
  const n = node as any;

  switch (node.kind as AstNodeKind) {

    case 'Program': {
      const prog = node as ProgramNode;
      lines.push(`${indent}Program${lineRange(node)}`);
      for (const d of prog.directives) printNode(d, next, lines);
      break;
    }

    case 'ObjectDecl': {
      const obj = node as ObjectDeclNode;
      const kw = obj.isClass ? 'class'
               : obj.isModify ? 'modify'
               : obj.isReplace ? 'replace'
               : 'object';
      const prefix = '+'.repeat(obj.level) || '';
      const id = obj.id ?? '(anon)';
      const supers = obj.superTypes.length > 0 ? `: ${obj.superTypes.join(', ')}` : '';
      lines.push(`${indent}${kw} ${prefix}${id}${supers}${lineRange(node)}`);
      printBody(obj.body, next, lines);
      break;
    }

    case 'FunctionDecl': {
      const fn = node as FunctionDeclNode;
      const kw = fn.isModify ? 'modify function'
               : fn.isReplace ? 'replace function'
               : 'function';
      const name = fn.name ?? '(anon)';
      lines.push(`${indent}${kw} ${name}(${fmtParams(fn.params)})${lineRange(node)}`);
      if (fn.body) printNode(fn.body, next, lines);
      break;
    }

    case 'OperatorOverride': {
      const op = node as OperatorOverrideNode;
      lines.push(`${indent}operator ${op.op}(${fmtParams(op.params)})${lineRange(node)}`);
      printNode(op.body, next, lines);
      break;
    }

    case 'PropertySet': {
      const ps = node as PropertySetNode;
      const params = ps.paramNames.length > 0 ? ` (${ps.paramNames.join(', ')})` : '';
      lines.push(`${indent}propertyset '${ps.pattern}'${params}${lineRange(node)}`);
      printBody(ps.body, next, lines);
      break;
    }

    case 'PropertyDecl': {
      const pd = node as PropertyDeclNode;
      const stat = pd.isStatic ? 'static ' : '';
      if (pd.nestedBody) {
        // name: SuperType { body } form
        lines.push(`${indent}${stat}property ${pd.name}: ${pd.nestedSuperType ?? ''} {${lineRange(node)}`);
        printBody(pd.nestedBody, next, lines);
        lines.push(`${indent}}`);
      } else if (pd.value) {
        const val = compact(pd.value);
        lines.push(`${indent}${stat}property ${pd.name} = ${val}${lineRange(node)}`);
      } else {
        lines.push(`${indent}${stat}property ${pd.name}${lineRange(node)}`);
      }
      break;
    }

    case 'Block': {
      const blk = node as BlockNode;
      if (blk.body.length === 0) {
        lines.push(`${indent}{}${lineRange(node)}`);
      } else {
        lines.push(`${indent}{${lineRange(node)}`);
        for (const s of blk.body) printNode(s, next, lines);
        lines.push(`${indent}}`);
      }
      break;
    }

    case 'IfStmt': {
      const ifs = node as IfStmtNode;
      lines.push(`${indent}if (${compact(ifs.condition)})${lineRange(node)}`);
      printNode(ifs.consequent, next, lines);
      for (const ei of ifs.elseIfs) {
        lines.push(`${indent}else if (${compact(ei.condition)})`);
        printNode(ei.consequent, next, lines);
      }
      if (ifs.alternate) {
        lines.push(`${indent}else`);
        printNode(ifs.alternate, next, lines);
      }
      break;
    }

    case 'WhileStmt': {
      lines.push(`${indent}while (${n.condition ? compact(n.condition as AstNode) : ''})${lineRange(node)}`);
      printNode(n.body as AstNode, next, lines);
      break;
    }

    case 'DoWhileStmt': {
      lines.push(`${indent}do${lineRange(node)}`);
      printNode(n.body as AstNode, next, lines);
      lines.push(`${indent}while (${n.condition ? compact(n.condition as AstNode) : ''})`);
      break;
    }

    case 'ForStmt': {
      const init = n.init ? compact(n.init as AstNode) : '';
      const cond = n.condition ? compact(n.condition as AstNode) : '';
      const upd  = n.update ? compact(n.update as AstNode) : '';
      lines.push(`${indent}for (${init}; ${cond}; ${upd})${lineRange(node)}`);
      printNode(n.body as AstNode, next, lines);
      break;
    }

    case 'ForInStmt': {
      lines.push(`${indent}for (local ${n.name} in ${compact(n.iterable as AstNode)})${lineRange(node)}`);
      printNode(n.body as AstNode, next, lines);
      break;
    }

    case 'ForEachStmt': {
      lines.push(`${indent}foreach (${compact(n.variable as AstNode)} in ${compact(n.iterable as AstNode)})${lineRange(node)}`);
      printNode(n.body as AstNode, next, lines);
      break;
    }

    case 'TryCatch': {
      const tc = node as TryCatchNode;
      lines.push(`${indent}try${lineRange(node)}`);
      printNode(tc.body, next, lines);
      for (const c of tc.catches) {
        const params = fmtParams(c.params);
        lines.push(`${indent}catch (${params})`);
        printNode(c.body, next, lines);
      }
      if (tc.finallyBlock) {
        lines.push(`${indent}finally`);
        printNode(tc.finallyBlock, next, lines);
      }
      break;
    }

    case 'SwitchStmt': {
      const sw = node as SwitchStmtNode;
      lines.push(`${indent}switch (${compact(sw.discriminant)})${lineRange(node)}`);
      for (const c of sw.cases) {
        const label = c.test ? `case ${compact(c.test)}:` : 'default:';
        lines.push(`${next}${label}`);
        for (const s of c.body) printNode(s, next + INDENT, lines);
      }
      break;
    }

    case 'TemplateDecl': {
      const td = node as TemplateDeclNode;
      const slots = td.items.map(it => it.propName ?? 'inherited').join(' ');
      lines.push(`${indent}template ${td.className ?? '(string)'} ${slots}${lineRange(node)}`);
      break;
    }

    case 'LocalDecl':
    case 'LocalDeclList':
    case 'ReturnStmt':
    case 'ThrowStmt':
    case 'SayStmt':
    case 'BreakStmt':
    case 'ContinueStmt':
    case 'GotoStmt':
    case 'LabelStmt':
    case 'IsIn':
    case 'NotIn':
    case 'Assignment':
    case 'Call':
    case 'MemberAccess':
    case 'BinaryOp':
    case 'UnaryOp':
    case 'PostIncrement':
    case 'PostDecrement':
    case 'InheritedCall':
    case 'Conditional':
    default:
      lines.push(`${indent}${compact(node)}${lineRange(node)}`);
      break;
  }
}

/** Print ObjectBody items without adding an extra indentation level. */
function printBody(body: ObjectBodyNode, indent: string, lines: string[]): void {
  for (const item of body.items) printNode(item, indent, lines);
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Produce a human-readable indented text representation of a TADS3 AST.
 * Structural nodes (objects, functions, blocks, propertysets) are indented
 * recursively; expression leaves are printed on a single line.
 */
export function printAst(program: ProgramNode): string {
  const lines: string[] = [];
  printNode(program, '', lines);
  return lines.join('\n');
}
