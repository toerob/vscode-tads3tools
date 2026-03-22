import { describe, it, expect } from '@jest/globals';
import { parseExpr } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });
const id  = (name: string): AstNode => ({ kind: 'Identifier', name });

// ── expr is a transparent alias for assignmentExpr ────────────────────────────

describe('expr → passthrough to primary', () => {
  it('parses a number literal', () => {
    expect(parseExpr('42')).toMatchObject(num('42'));
  });

  it('parses an identifier', () => {
    expect(parseExpr('x')).toMatchObject(id('x'));
  });
});

describe('expr → arithmetic expression', () => {
  it('parses 1+2*3', () => {
    expect(parseExpr('1+2*3')).toMatchObject({
      kind: 'BinaryOp', op: '+',
      left: num('1'),
      right: { kind: 'BinaryOp', op: '*', left: num('2'), right: num('3') },
    });
  });
});

describe('expr → equality expression', () => {
  it('parses x==1', () => {
    expect(parseExpr('x==1')).toMatchObject({
      kind: 'BinaryOp', op: '==', left: id('x'), right: num('1'),
    });
  });
});

describe('expr → assignment expression', () => {
  it('parses x=1', () => {
    expect(parseExpr('x=1')).toMatchObject({
      kind: 'Assignment', op: '=', target: id('x'), value: num('1'),
    });
  });

  it('parses x+=1', () => {
    expect(parseExpr('x+=1')).toMatchObject({
      kind: 'Assignment', op: '+=', target: id('x'), value: num('1'),
    });
  });
});

describe('expr → conditional expression', () => {
  it('parses x?1:2', () => {
    expect(parseExpr('x?1:2')).toMatchObject({
      kind: 'Conditional',
      condition: id('x'),
      consequent: num('1'),
      alternate: num('2'),
    });
  });
});

describe('expr → is in', () => {
  it('parses x is in (1,2)', () => {
    expect(parseExpr('x is in (1,2)')).toMatchObject({
      kind: 'IsIn',
      operand: id('x'),
      values: [num('1'), num('2')],
    });
  });
});
