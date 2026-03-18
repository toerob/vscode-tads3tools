import { describe, it, expect } from '@jest/globals';
import { parseSayStatement, parseEmptyStatement } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });
const id  = (name: string): AstNode => ({ kind: 'Identifier', name });

// ── sayStatement ──────────────────────────────────────────────────────────────

describe('sayStatement', () => {
  it('parses "Hello, world!";', () => {
    expect(parseSayStatement('"Hello, world!";')).toMatchObject({
      kind: 'SayStmt',
      value: '"Hello, world!"',
    });
  });

  it('parses a double-quoted string with embedded expression', () => {
    expect(parseSayStatement('"Value: <<x>>";')).toMatchObject({
      kind: 'SayStmt',
      value: '"Value: <<x>>"',
    });
  });
});

// ── emptyStatement (expression-as-statement) ──────────────────────────────────

describe('emptyStatement → expression as statement', () => {
  it('parses x + 1; as the expression itself', () => {
    expect(parseEmptyStatement('x + 1;')).toMatchObject({
      kind: 'BinaryOp', op: '+', left: id('x'), right: num('1'),
    });
  });

  it('parses a function call foo(1,2); as the Call expression', () => {
    expect(parseEmptyStatement('foo(1, 2);')).toMatchObject({
      kind: 'Call',
      callee: id('foo'),
      args: [num('1'), num('2')],
    });
  });
});

describe('emptyStatement → bare semicolon', () => {
  it('parses ; as Unhandled', () => {
    expect(parseEmptyStatement(';')).toMatchObject({ kind: 'Unhandled' });
  });
});
