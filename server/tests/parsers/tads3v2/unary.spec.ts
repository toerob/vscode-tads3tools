import { describe, it, expect } from '@jest/globals';
import { parseUnary } from './parseHelper';

const id   = (name: string)  => ({ kind: 'Identifier', name });
const num  = (value: string) => ({ kind: 'Number', value });
const call = (name: string, args: unknown[] = []) => ({
  kind: 'Call',
  callee: id(name),
  args,
});

// ── passthrough (no prefix) ───────────────────────────────────────────────────

describe('unaryExpr → passthrough', () => {
  it('passes through an identifier with no prefix', () => {
    expect(parseUnary('foo')).toMatchObject(id('foo'));
  });

  it('passes through a call expression', () => {
    expect(parseUnary('foo()')).toMatchObject(call('foo'));
  });
});

// ── prefixOp ──────────────────────────────────────────────────────────────────

describe('unaryExpr → prefixOp', () => {
  it('parses !foo (logical NOT)', () => {
    expect(parseUnary('!foo')).toMatchObject({ kind: 'UnaryOp', op: '!', operand: id('foo') });
  });

  it('parses not foo (word-form logical NOT)', () => {
    expect(parseUnary('not foo')).toMatchObject({ kind: 'UnaryOp', op: 'not', operand: id('foo') });
  });

  it('parses -x (negation)', () => {
    expect(parseUnary('-x')).toMatchObject({ kind: 'UnaryOp', op: '-', operand: id('x') });
  });

  it('parses +x (unary plus)', () => {
    expect(parseUnary('+x')).toMatchObject({ kind: 'UnaryOp', op: '+', operand: id('x') });
  });

  it('parses ~x (bitwise NOT)', () => {
    expect(parseUnary('~x')).toMatchObject({ kind: 'UnaryOp', op: '~', operand: id('x') });
  });

  it('parses -1 (negated number literal)', () => {
    expect(parseUnary('-1')).toMatchObject({ kind: 'UnaryOp', op: '-', operand: num('1') });
  });

  it('parses nested prefix: !!foo', () => {
    expect(parseUnary('!!foo')).toMatchObject({
      kind: 'UnaryOp', op: '!',
      operand: { kind: 'UnaryOp', op: '!', operand: id('foo') },
    });
  });
});

// ── keyword prefixes ──────────────────────────────────────────────────────────

describe('unaryExpr → new', () => {
  it('parses new Foo (no args)', () => {
    expect(parseUnary('new Foo')).toMatchObject({ kind: 'NewExpr', expr: id('Foo') });
  });

  it('parses new Foo() (with call)', () => {
    expect(parseUnary('new Foo()')).toMatchObject({ kind: 'NewExpr', expr: call('Foo') });
  });

  it('parses new Foo(1, 2)', () => {
    expect(parseUnary('new Foo(1, 2)')).toMatchObject({
      kind: 'NewExpr',
      expr: { kind: 'Call', callee: id('Foo'), args: [num('1'), num('2')] },
    });
  });
});

describe('unaryExpr → delegated', () => {
  it('parses delegated foo()', () => {
    expect(parseUnary('delegated foo()')).toMatchObject({ kind: 'DelegatedExpr', expr: call('foo') });
  });
});

describe('unaryExpr → inherited (prefix call form)', () => {
  it('parses inherited foo() (call a specific parent method)', () => {
    expect(parseUnary('inherited foo()')).toMatchObject({ kind: 'InheritedCall', expr: call('foo') });
  });
});

describe('unaryExpr → static', () => {
  it('parses static foo', () => {
    expect(parseUnary('static foo')).toMatchObject({ kind: 'StaticExpr', expr: id('foo') });
  });
});
