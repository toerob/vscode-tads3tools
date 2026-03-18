import { describe, it, expect } from '@jest/globals';
import { parseIfStatement } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const id   = (name: string): AstNode => ({ kind: 'Identifier', name });
const bin  = (op: string, l: AstNode, r: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: op as never, left: l, right: r });
const decl = (name: string, init: AstNode | null): AstNode =>
  ({ kind: 'LocalDecl', name, init });
const block = (...body: AstNode[]): AstNode => ({ kind: 'Block', body });

const ifStmt = (
  condition: AstNode,
  consequent: AstNode,
  elseIfs: { condition: AstNode; consequent: AstNode }[] = [],
  alternate: AstNode | null = null,
): AstNode => ({ kind: 'IfStmt', condition, consequent, elseIfs, alternate });

// ── simple if ─────────────────────────────────────────────────────────────────

describe('ifStatement → simple', () => {
  it('parses if (x > 0) { local y = 1; }', () => {
    expect(parseIfStatement('if (x > 0) { local y = 1; }')).toMatchObject(
      ifStmt(
        bin('>', id('x'), num('0')),
        block(decl('y', num('1'))),
      )
    );
  });

  it('parses if with empty body', () => {
    expect(parseIfStatement('if (x > 0) { }')).toMatchObject(
      ifStmt(bin('>', id('x'), num('0')), block())
    );
  });
});

// ── if / else ─────────────────────────────────────────────────────────────────

describe('ifStatement → if / else', () => {
  it('parses if (x > 0) { local y = 1; } else { local y = 2; }', () => {
    expect(parseIfStatement(
      'if (x > 0) { local y = 1; } else { local y = 2; }'
    )).toMatchObject(
      ifStmt(
        bin('>', id('x'), num('0')),
        block(decl('y', num('1'))),
        [],
        block(decl('y', num('2'))),
      )
    );
  });
});

// ── no braces (single-statement body) ────────────────────────────────────────

describe('ifStatement → no braces', () => {
  it('parses if (x > 0) local y = 1;', () => {
    expect(parseIfStatement('if (x > 0) local y = 1;')).toMatchObject(
      ifStmt(
        bin('>', id('x'), num('0')),
        block(decl('y', num('1'))),
      )
    );
  });

  it('parses if (x > 0) local y = 1; else local y = 2;', () => {
    expect(parseIfStatement('if (x > 0) local y = 1; else local y = 2;')).toMatchObject(
      ifStmt(
        bin('>', id('x'), num('0')),
        block(decl('y', num('1'))),
        [],
        block(decl('y', num('2'))),
      )
    );
  });
});

// ── if / else if / else ───────────────────────────────────────────────────────

describe('ifStatement → if / else if / else', () => {
  it('parses three-branch chain', () => {
    expect(parseIfStatement(
      'if (x > 0) { local y = 1; } else if (x < 0) { local y = -1; } else { local y = 0; }'
    )).toMatchObject(
      ifStmt(
        bin('>', id('x'), num('0')),
        block(decl('y', num('1'))),
        [{ condition: bin('<', id('x'), num('0')), consequent: block(decl('y', { kind: 'UnaryOp', op: '-', operand: num('1') })) }],
        block(decl('y', num('0'))),
      )
    );
  });
});
