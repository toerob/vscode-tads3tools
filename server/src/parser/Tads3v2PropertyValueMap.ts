/**
 * Tads3v2PropertyValueMap.ts
 *
 * Single-pass AST walker that extracts a serializable PropertyValueMap from a
 * parsed ProgramNode.  This runs inside the parse worker right after
 * astToSymbols() and ships its result back to the main thread alongside the
 * DocumentSymbol array.
 *
 * Design notes
 * ────────────
 * • We walk the AST directly rather than running the full evaluator so we can
 *   represent forward references (e.g. `north = library`) as { kind:'ref' }
 *   even when `library` has not been defined yet in the evaluation order.
 * • Constant folding is applied for simple binary expressions (string concat,
 *   numeric arithmetic) so that `name = 'the ' + 'kitchen'` reduces to a
 *   string rather than unknown.
 * • Anything that cannot be reduced at parse time becomes { kind:'unknown' }.
 */

import { AstNode, ObjectBodyNode, ProgramNode } from './ast/nodes';
import { PropertyValueMap, SimpleValue } from '../modules/types';

// ── Public entry point ────────────────────────────────────────────────────────

export function buildPropertyValueMap(program: ProgramNode): PropertyValueMap {
  const result: PropertyValueMap = new Map();

  for (const directive of program.directives) {
    if (directive.kind !== 'ObjectDecl' || !directive.id) continue;

    const propMap = new Map<string, SimpleValue>();
    extractBodyProps(directive.body, propMap);
    result.set(directive.id, propMap);
  }

  return result;
}

// ── Body walker ───────────────────────────────────────────────────────────────

function extractBodyProps(body: ObjectBodyNode, out: Map<string, SimpleValue>): void {
  for (const item of body.items) {
    switch (item.kind) {
      case 'PropertyDecl':
        if (item.value) {
          out.set(item.name, nodeToSimpleValue(item.value));
        } else if (item.nestedBody) {
          // name: SuperType { ... } — nested inline object; record as ref to supertype
          out.set(item.name, item.nestedSuperType
            ? { kind: 'ref', name: item.nestedSuperType }
            : { kind: 'unknown' });
        } else {
          out.set(item.name, { kind: 'nil' });
        }
        break;

      // FunctionDecl / OperatorOverride / PropertySet — not scalar values; skip
      default:
        break;
    }
  }
}

// ── AST node → SimpleValue ────────────────────────────────────────────────────

function nodeToSimpleValue(node: AstNode): SimpleValue {
  switch (node.kind) {
    case 'Nil':        return { kind: 'nil' };
    case 'Boolean':    return { kind: 'true' };
    case 'Number':     return { kind: 'number', value: parseFloat(node.value) };
    case 'Hex':        return { kind: 'number', value: parseInt(node.value, 16) };
    case 'String':     return { kind: 'string', value: stripQuotes(node.value) };
    case 'Regexp':     return { kind: 'string', value: node.value };

    // Identifier or &reference — preserve the name as a ref
    case 'Identifier': return { kind: 'ref', name: node.name };
    case 'Reference':  return { kind: 'ref', name: node.name };

    // Strip redundant parens
    case 'Paren':
      return node.inner ? nodeToSimpleValue(node.inner) : { kind: 'nil' };

    // Array literal — recurse into elements
    case 'ArrayLiteral': {
      const elements = node.elements.map(nodeToSimpleValue);
      return { kind: 'list', elements };
    }

    // Unary minus / plus on a number literal — fold immediately
    // & operator — property reference (&doThing → ref to doThing)
    case 'UnaryOp': {
      if (node.op === '&' && node.operand.kind === 'Identifier')
        return { kind: 'ref', name: node.operand.name };
      if (node.op === '-') {
        const inner = nodeToSimpleValue(node.operand);
        if (inner.kind === 'number') return { kind: 'number', value: -inner.value };
      }
      if (node.op === '+') {
        const inner = nodeToSimpleValue(node.operand);
        if (inner.kind === 'number') return inner;
      }
      return { kind: 'unknown' };
    }

    // Binary: attempt constant folding for the most common cases
    case 'BinaryOp': {
      const left  = nodeToSimpleValue(node.left);
      const right = nodeToSimpleValue(node.right);
      return foldBinary(node.op, left, right);
    }

    // Conditional: fold only when condition is a literal bool/nil
    case 'Conditional': {
      const cond = nodeToSimpleValue(node.condition);
      if (cond.kind === 'nil')  return nodeToSimpleValue(node.alternate);
      if (cond.kind === 'true') return nodeToSimpleValue(node.consequent);
      return { kind: 'unknown' };
    }

    // If-nil (??) as a BinaryOp is handled above; handle the structural case
    // All other node kinds are too complex to reduce statically
    default:
      return { kind: 'unknown' };
  }
}

// ── Constant folding for binary operators ─────────────────────────────────────

function foldBinary(op: string, left: SimpleValue, right: SimpleValue): SimpleValue {
  switch (op) {
    case '+':
      if (left.kind === 'number' && right.kind === 'number')
        return { kind: 'number', value: left.value + right.value };
      // String concatenation — coerce numbers to strings
      if (left.kind === 'string' || right.kind === 'string')
        return { kind: 'string', value: coerceStr(left) + coerceStr(right) };
      if (left.kind === 'list' && right.kind === 'list')
        return { kind: 'list', elements: [...left.elements, ...right.elements] };
      break;

    case '-':
      if (left.kind === 'number' && right.kind === 'number')
        return { kind: 'number', value: left.value - right.value };
      break;

    case '*':
      if (left.kind === 'number' && right.kind === 'number')
        return { kind: 'number', value: left.value * right.value };
      break;

    case '/':
      if (left.kind === 'number' && right.kind === 'number' && right.value !== 0)
        return { kind: 'number', value: Math.trunc(left.value / right.value) };
      break;

    case '%':
      if (left.kind === 'number' && right.kind === 'number' && right.value !== 0)
        return { kind: 'number', value: left.value % right.value };
      break;

    case '??':
      if (left.kind !== 'unknown') return left.kind === 'nil' ? right : left;
      break;
  }
  return { kind: 'unknown' };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripQuotes(raw: string): string {
  if (raw.length < 2) return raw;
  const first = raw[0], last = raw[raw.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return raw.slice(1, -1);
  }
  return raw;
}

function coerceStr(v: SimpleValue): string {
  if (v.kind === 'string') return v.value;
  if (v.kind === 'number') return String(v.value);
  if (v.kind === 'nil')    return '';
  if (v.kind === 'true')   return 'true';
  return '';
}
