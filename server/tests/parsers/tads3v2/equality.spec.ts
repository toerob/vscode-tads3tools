import { describe, it, expect } from '@jest/globals';
import { parseEquality } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });
const id  = (name: string): AstNode => ({ kind: 'Identifier', name });

const eq    = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '==', left: l, right: r });
const neq   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '!=', left: l, right: r });
const lt    = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '<',  left: l, right: r });
const add   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '+',  left: l, right: r });
const isIn  = (operand: AstNode, values: AstNode[]): AstNode => ({ kind: 'IsIn',  operand, values });
const notIn = (operand: AstNode, values: AstNode[]): AstNode => ({ kind: 'NotIn', operand, values });

// ── passthrough ───────────────────────────────────────────────────────────────

describe('equalityExpr → passthrough', () => {
  it('passes through a number literal', () => {
    expect(parseEquality('42')).toMatchObject(num('42'));
  });
});

// ── single operators ──────────────────────────────────────────────────────────

describe('equalityExpr → single operators', () => {
  it('parses 1==2', () => {
    expect(parseEquality('1==2')).toMatchObject(eq(num('1'), num('2')));
  });

  it('parses 1!=2', () => {
    expect(parseEquality('1!=2')).toMatchObject(neq(num('1'), num('2')));
  });
});

// ── left-associative chain ────────────────────────────────────────────────────

describe('equalityExpr → left-associative chain', () => {
  it('parses 1==2==3 as (1==2)==3', () => {
    expect(parseEquality('1==2==3')).toMatchObject(
      eq(eq(num('1'), num('2')), num('3'))
    );
  });
});

// ── precedence ────────────────────────────────────────────────────────────────

describe('precedence: < binds tighter than ==', () => {
  it('parses x<1==y<2 as (x<1)==(y<2)', () => {
    expect(parseEquality('x<1==y<2')).toMatchObject(
      eq(lt(id('x'), num('1')), lt(id('y'), num('2')))
    );
  });

  it('parses 1+2==3 as (1+2)==3', () => {
    expect(parseEquality('1+2==3')).toMatchObject(
      eq(add(num('1'), num('2')), num('3'))
    );
  });
});

// ── is in / not in (set membership, equality level) ──────────────────────────

describe('equalityExpr → is in', () => {
  it('parses x is in (1)', () => {
    expect(parseEquality('x is in (1)')).toMatchObject(
      isIn(id('x'), [num('1')])
    );
  });

  it('parses x is in (1,2,3)', () => {
    expect(parseEquality('x is in (1,2,3)')).toMatchObject(
      isIn(id('x'), [num('1'), num('2'), num('3')])
    );
  });
});

describe('equalityExpr → not in', () => {
  it('parses x not in (1)', () => {
    expect(parseEquality('x not in (1)')).toMatchObject(
      notIn(id('x'), [num('1')])
    );
  });

  it('parses x not in (1,2,3)', () => {
    expect(parseEquality('x not in (1,2,3)')).toMatchObject(
      notIn(id('x'), [num('1'), num('2'), num('3')])
    );
  });
});

describe('precedence: is in at equality level', () => {
  it('parses x<1 is in (0,1) as (x<1) is in (0,1)', () => {
    expect(parseEquality('x<1 is in (0,1)')).toMatchObject(
      isIn(lt(id('x'), num('1')), [num('0'), num('1')])
    );
  });
});
