import { describe, it, expect } from '@jest/globals';
import { at, find, findAll, q } from './astQuery';
import { parsePostfix, parseFor, parseSwitch, parseLocalDecl } from './parseHelper';

// ── at() ──────────────────────────────────────────────────────────────────────

describe('at() — field path navigation', () => {
  it('returns the root for an empty-ish single field', () => {
    const ast = parsePostfix('foo.bar');
    expect(at(ast, 'member').kind).toBe('Identifier');
  });

  it('traverses nested fields', () => {
    const ast = parsePostfix('foo.bar.baz');
    // MemberAccess{ object: MemberAccess{ object: foo, member: bar }, member: baz }
    expect(at(ast, 'object.object').kind).toBe('Identifier');
    expect((at(ast, 'object.object') as any).name).toBe('foo');
    expect((at(ast, 'object.member') as any).name).toBe('bar');
    expect((at(ast, 'member') as any).name).toBe('baz');
  });

  it('indexes into arrays with [n]', () => {
    const ast = parsePostfix('foo(1, 2, 3)');
    expect(at(ast, 'args[0]').kind).toBe('Number');
    expect((at(ast, 'args[0]') as any).value).toBe('1');
    expect((at(ast, 'args[2]') as any).value).toBe('3');
  });

  it('chains field access and array indexing', () => {
    const ast = parseFor('for (i = 0; i < 10; i++) { break; }');
    // body is a Block, body.body[0] is BreakStmt
    expect(at(ast, 'body.body[0]').kind).toBe('BreakStmt');
  });

  it('throws a descriptive error for a missing field', () => {
    const ast = parsePostfix('foo');
    expect(() => at(ast, 'nonexistent')).toThrow("field 'nonexistent'");
  });

  it('throws a descriptive error for an out-of-bounds index', () => {
    const ast = parsePostfix('foo()');
    expect(() => at(ast, 'args[5]')).toThrow('out of bounds');
  });
});

// ── find() ────────────────────────────────────────────────────────────────────

describe('find() — depth-first search', () => {
  it('finds the root itself when it matches', () => {
    const ast = parsePostfix('foo');
    expect(find(ast, 'Identifier')?.kind).toBe('Identifier');
  });

  it('finds a deep descendant', () => {
    const ast = parseFor('for (i = 0; i < 10; i++) {}');
    // first Number in the tree is the '0' in i = 0
    const num = find(ast, 'Number');
    expect(num?.kind).toBe('Number');
    expect((num as any)?.value).toBe('0');
  });

  it('returns null when the kind is not present', () => {
    const ast = parsePostfix('foo');
    expect(find(ast, 'Call')).toBeNull();
  });
});

// ── findAll() ─────────────────────────────────────────────────────────────────

describe('findAll() — collect all descendants', () => {
  it('collects all identifiers in foo.bar.baz', () => {
    const ast = parsePostfix('foo.bar.baz');
    const ids = findAll(ast, 'Identifier');
    expect(ids.map((n: any) => n.name)).toEqual(['foo', 'bar', 'baz']);
  });

  it('collects all Number nodes in a for loop', () => {
    const ast = parseFor('for (i = 0; i < 10; i++) {}');
    const nums = findAll(ast, 'Number').map((n: any) => n.value);
    expect(nums).toEqual(['0', '10']);
  });

  it('returns empty array when kind not found', () => {
    const ast = parsePostfix('foo');
    expect(findAll(ast, 'Call')).toHaveLength(0);
  });
});

// ── q() — fluent wrapper ──────────────────────────────────────────────────────

describe('q() — fluent API', () => {
  it('q(ast).at().kind', () => {
    const ast = parsePostfix('foo.bar');
    expect(q(ast).at('member').kind).toBe('Identifier');
  });

  it('q(ast).find()', () => {
    const ast = parseFor('for (i = 0; i < 10; i++) {}');
    expect(q(ast).find('Number').get('value')).toBe('0');
  });

  it('q(ast).at().find() — combines navigation and search', () => {
    const ast = parseFor('for (i = 0; i < 10; i++) {}');
    // condition is BinaryOp; find the right-hand Number
    const rhs = q(ast).at('condition').at('right').kind;
    expect(rhs).toBe('Number');
  });

  it('q(ast).findAll()', () => {
    const ast = parsePostfix('foo.bar.baz');
    const names = q(ast).findAll('Identifier').map(n => n.get('name'));
    expect(names).toEqual(['foo', 'bar', 'baz']);
  });

  it('throws from find() with a clear message when kind is absent', () => {
    const ast = parsePostfix('foo');
    expect(() => q(ast).find('Call')).toThrow("find('Call')");
  });

  it('demonstrates a cleaner switch-case test', () => {
    const ast = parseSwitch('switch (x) { case 1: break; case 2: break; default: return; }');
    // instead of deeply-nested toMatchObject:
    expect(at(ast, 'cases[0].test').kind).toBe('Number');
    expect((at(ast, 'cases[0].test') as any).value).toBe('1');
    expect(at(ast, 'cases[0].body[0]').kind).toBe('BreakStmt');
    expect(at(ast, 'cases[2].test')).toBeNull();          // default case
    expect(at(ast, 'cases[2].body[0]').kind).toBe('ReturnStmt');
  });

  it('demonstrates a cleaner local-decl chained-call test', () => {
    const ast = parseLocalDecl('local toks = topic.topicProd.getOrigTokenList().mapAll({x: ((x)[1])});');
    // dig straight to the deepest member without writing nested object literals
    expect(at(ast, 'init.callee.object.callee.object.object').kind).toBe('Identifier');
    expect((at(ast, 'init.callee.object.callee.object.object') as any).name).toBe('topic');
  });
});
