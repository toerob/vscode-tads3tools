import { describe, it, expect } from '@jest/globals';
import { parseConditional } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const id   = (name: string): AstNode => ({ kind: 'Identifier', name });

const cond = (condition: AstNode, consequent: AstNode, alternate: AstNode): AstNode =>
  ({ kind: 'Conditional', condition, consequent, alternate });

const ifnil = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '??', left: l, right: r });
const add   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '+',  left: l, right: r });

// ── passthrough ───────────────────────────────────────────────────────────────

describe('conditionalExpr → passthrough', () => {
  it('passes through a number literal', () => {
    expect(parseConditional('1')).toMatchObject(num('1'));
  });
});

// ── single ternary ────────────────────────────────────────────────────────────

describe('conditionalExpr → single ternary', () => {
  it('parses x?1:2', () => {
    expect(parseConditional('x?1:2')).toMatchObject(
      cond(id('x'), num('1'), num('2'))
    );
  });
});

// ── right-associativity ───────────────────────────────────────────────────────

describe('conditionalExpr → right-associative', () => {
  it('parses x?1:y?2:3 as x?1:(y?2:3)', () => {
    expect(parseConditional('x?1:y?2:3')).toMatchObject(
      cond(id('x'), num('1'), cond(id('y'), num('2'), num('3')))
    );
  });
});

// ── precedence: ?? binds tighter than ?: ─────────────────────────────────────

describe('precedence: ?? binds tighter than ?:', () => {
  it('parses x??y?1:2 as (x??y)?1:2', () => {
    expect(parseConditional('x??y?1:2')).toMatchObject(
      cond(ifnil(id('x'), id('y')), num('1'), num('2'))
    );
  });
});

// ── expressions inside branches ───────────────────────────────────────────────

describe('conditionalExpr → expressions in branches', () => {
  it('parses x?1+2:3', () => {
    expect(parseConditional('x?1+2:3')).toMatchObject(
      cond(id('x'), add(num('1'), num('2')), num('3'))
    );
  });
});
