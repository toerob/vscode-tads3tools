import { describe, it, expect } from '@jest/globals';
import { parsePostfix } from './parseHelper';

const id = (name: string) => ({ kind: 'Identifier', name });
const num = (value: string) => ({ kind: 'Number', value });

// ── no suffix — passthrough ───────────────────────────────────────────────────

describe('postfixExpr → no suffix', () => {
  it('passes through an identifier with no suffix', () => {
    expect(parsePostfix('foo')).toMatchObject(id('foo'));
  });
});

// ── single suffixes ───────────────────────────────────────────────────────────

describe('postfixExpr → member access', () => {
  it('parses foo.bar', () => {
    expect(parsePostfix('foo.bar')).toMatchObject({
      kind: 'MemberAccess',
      object: id('foo'),
      member: id('bar'),
    });
  });

  it('parses foo.(&bar) — dynamic property via address-of', () => {
    expect(parsePostfix('foo.(&bar)')).toMatchObject({
      kind: 'MemberAccess',
      object: id('foo'),
      member: { kind: 'Paren', inner: { kind: 'UnaryOp', op: '&', operand: id('bar') } },
    });
  });

  it('parses foo.(propName) — dynamic property via identifier', () => {
    expect(parsePostfix('foo.(propName)')).toMatchObject({
      kind: 'MemberAccess',
      object: id('foo'),
      member: { kind: 'Paren', inner: id('propName') },
    });
  });
});

describe('postfixExpr → index access', () => {
  it('parses foo[0]', () => {
    expect(parsePostfix('foo[0]')).toMatchObject({
      kind: 'IndexAccess',
      object: id('foo'),
      index: num('0'),
    });
  });

  it('parses foo[] (empty index)', () => {
    expect(parsePostfix('foo[]')).toMatchObject({
      kind: 'IndexAccess',
      object: id('foo'),
      index: null,
    });
  });
});

describe('postfixExpr → call', () => {
  it('parses foo()', () => {
    expect(parsePostfix('foo()')).toMatchObject({
      kind: 'Call',
      callee: id('foo'),
      args: [],
    });
  });

  it('parses foo(1, 2)', () => {
    expect(parsePostfix('foo(1, 2)')).toMatchObject({
      kind: 'Call',
      callee: id('foo'),
      args: [num('1'), num('2')],
    });
  });
});

describe('postfixExpr → post-increment / post-decrement', () => {
  it('parses foo++', () => {
    expect(parsePostfix('foo++')).toMatchObject({
      kind: 'PostIncrement',
      object: id('foo'),
    });
  });

  it('parses foo--', () => {
    expect(parsePostfix('foo--')).toMatchObject({
      kind: 'PostDecrement',
      object: id('foo'),
    });
  });
});

describe('postfixExpr → range (for..in context)', () => {
  it('parses 1..10', () => {
    expect(parsePostfix('1..10')).toMatchObject({
      kind: 'RangeExpr',
      object: num('1'),
      end: num('10'),
      step: null,
    });
  });

  it('parses 1..10 step 2', () => {
    expect(parsePostfix('1..10 step 2')).toMatchObject({
      kind: 'RangeExpr',
      object: num('1'),
      end: num('10'),
      step: num('2'),
    });
  });
});

// ── suffix chains ─────────────────────────────────────────────────────────────

describe('postfixExpr → chained suffixes', () => {
  it('parses foo.bar.baz (left-associative)', () => {
    expect(parsePostfix('foo.bar.baz')).toMatchObject({
      kind: 'MemberAccess',
      object: {
        kind: 'MemberAccess',
        object: id('foo'),
        member: id('bar'),
      },
      member: id('baz'),
    });
  });

  it('parses foo.bar()', () => {
    expect(parsePostfix('foo.bar()')).toMatchObject({
      kind: 'Call',
      callee: {
        kind: 'MemberAccess',
        object: id('foo'),
        member: id('bar'),
      },
      args: [],
    });
  });

  it('parses foo.bar(x)[0]', () => {
    expect(parsePostfix('foo.bar(x)[0]')).toMatchObject({
      kind: 'IndexAccess',
      object: {
        kind: 'Call',
        callee: {
          kind: 'MemberAccess',
          object: id('foo'),
          member: id('bar'),
        },
        args: [id('x')],
      },
      index: num('0'),
    });
  });
});
