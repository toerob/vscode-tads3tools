/**
 * Mini AST query helpers for writing concise tests.
 *
 * Three primitives:
 *   at(node, 'callee.object.member')   — field-path navigation, [n] for arrays
 *   find(node, 'BinaryOp')             — depth-first first match by kind
 *   findAll(node, 'Identifier')        — all descendants by kind
 *
 * Fluent wrapper:
 *   q(ast).at('init').find('Number').node.value
 */

import { AstNode, AstNodeKind } from '../../../src/parser/ast/nodes';

// ── path navigation ───────────────────────────────────────────────────────────

interface Segment {
  field: string;
  index: number | null;
}

function parseSegments(path: string): Segment[] {
  return path.split('.').map(part => {
    const m = part.match(/^(\w+)\[(\d+)\]$/);
    if (m) return { field: m[1], index: parseInt(m[2], 10) };
    return { field: part, index: null };
  });
}

/**
 * Navigate into an AST node by a dot-separated field path.
 * Use `[n]` for array indexing, e.g. `'args[0]'` or `'cases[1].body[0]'`.
 * Throws a descriptive error if any step fails.
 */
export function at(node: AstNode, path: string): AstNode {
  const segments = parseSegments(path);
  let cur: unknown = node;
  let walked = 'root';

  for (const { field, index } of segments) {
    if (cur == null || typeof cur !== 'object') {
      throw new Error(`at('${path}'): reached null/primitive at '${walked}'`);
    }
    const obj = cur as Record<string, unknown>;
    const kind = (obj as AstNode).kind ?? '?';

    if (!(field in obj)) {
      const available = Object.keys(obj).filter(k => k !== 'range').join(', ');
      throw new Error(
        `at('${path}'): field '${field}' not found on ${kind} at '${walked}' (available: ${available})`
      );
    }
    cur = obj[field];
    walked = `${walked}.${field}`;

    if (index !== null) {
      if (!Array.isArray(cur)) {
        throw new Error(`at('${path}'): '${walked}' is not an array`);
      }
      if (index >= (cur as unknown[]).length) {
        throw new Error(
          `at('${path}'): index [${index}] out of bounds (length=${(cur as unknown[]).length}) at '${walked}'`
        );
      }
      cur = (cur as unknown[])[index];
      walked = `${walked}[${index}]`;
    }
  }

  return cur as AstNode;
}

// ── depth-first search ────────────────────────────────────────────────────────

function isAstNode(val: unknown): val is AstNode {
  return val != null && typeof val === 'object' && 'kind' in (val as object);
}

function* descendants(node: AstNode): Generator<AstNode> {
  yield node;
  for (const val of Object.values(node)) {
    if (isAstNode(val)) {
      yield* descendants(val);
    } else if (Array.isArray(val)) {
      for (const item of val) {
        if (isAstNode(item)) yield* descendants(item);
      }
    }
  }
}

/**
 * Depth-first find of the first descendant (including root) with the given kind.
 * Returns null if not found.
 */
export function find(node: AstNode, kind: AstNodeKind): AstNode | null {
  for (const n of descendants(node)) {
    if (n.kind === kind) return n;
  }
  return null;
}

/**
 * Depth-first collect of all descendants (including root) with the given kind.
 */
export function findAll(node: AstNode, kind: AstNodeKind): AstNode[] {
  const results: AstNode[] = [];
  for (const n of descendants(node)) {
    if (n.kind === kind) results.push(n);
  }
  return results;
}

// ── fluent wrapper ────────────────────────────────────────────────────────────

export class AstQuery {
  constructor(readonly node: AstNode) {}

  /** Navigate by field path. Throws if any step is missing. */
  at(path: string): AstQuery {
    return new AstQuery(at(this.node, path));
  }

  /** Depth-first find first descendant (including self) of given kind. Throws if not found. */
  find(kind: AstNodeKind): AstQuery {
    const result = find(this.node, kind);
    if (result == null) {
      throw new Error(`find('${kind}'): no descendant of kind '${kind}' found under ${this.node.kind}`);
    }
    return new AstQuery(result);
  }

  /** Depth-first find all descendants (including self) of given kind. */
  findAll(kind: AstNodeKind): AstQuery[] {
    return findAll(this.node, kind).map(n => new AstQuery(n));
  }

  /** Convenience: the node's kind. */
  get kind(): AstNodeKind {
    return this.node.kind;
  }

  /** Access a property of the underlying node by name. */
  get(field: string): unknown {
    return (this.node as Record<string, unknown>)[field];
  }
}

/** Entry point for the fluent API. */
export function q(node: AstNode): AstQuery {
  return new AstQuery(node);
}
