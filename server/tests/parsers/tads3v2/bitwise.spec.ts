import { describe, it, expect } from '@jest/globals';
import { parseBitwiseAnd, parseBitwiseXor, parseBitwiseOr } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });

const band = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '&',  left: l, right: r });
const bxor = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '^',  left: l, right: r });
const bor  = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '|',  left: l, right: r });
const eq   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '==', left: l, right: r });

// ── bitwiseAndExpr ────────────────────────────────────────────────────────────

describe('bitwiseAndExpr → passthrough', () => {
  it('passes through a number', () => expect(parseBitwiseAnd('7')).toMatchObject(num('7')));
});

describe('bitwiseAndExpr', () => {
  it('parses 3&5', () => expect(parseBitwiseAnd('3&5')).toMatchObject(band(num('3'), num('5'))));

  it('parses 1&2&3 left-associatively', () =>
    expect(parseBitwiseAnd('1&2&3')).toMatchObject(band(band(num('1'), num('2')), num('3'))));
});

describe('precedence: == binds tighter than &', () => {
  it('parses 1==2&3==4 as (1==2)&(3==4)', () =>
    expect(parseBitwiseAnd('1==2&3==4')).toMatchObject(
      band(eq(num('1'), num('2')), eq(num('3'), num('4')))
    ));
});

// ── bitwiseXorExpr ────────────────────────────────────────────────────────────

describe('bitwiseXorExpr → passthrough', () => {
  it('passes through a number', () => expect(parseBitwiseXor('7')).toMatchObject(num('7')));
});

describe('bitwiseXorExpr', () => {
  it('parses 3^5', () => expect(parseBitwiseXor('3^5')).toMatchObject(bxor(num('3'), num('5'))));

  it('parses 1^2^3 left-associatively', () =>
    expect(parseBitwiseXor('1^2^3')).toMatchObject(bxor(bxor(num('1'), num('2')), num('3'))));
});

describe('precedence: & binds tighter than ^', () => {
  it('parses 1&2^3&4 as (1&2)^(3&4)', () =>
    expect(parseBitwiseXor('1&2^3&4')).toMatchObject(
      bxor(band(num('1'), num('2')), band(num('3'), num('4')))
    ));
});

// ── bitwiseOrExpr ─────────────────────────────────────────────────────────────

describe('bitwiseOrExpr → passthrough', () => {
  it('passes through a number', () => expect(parseBitwiseOr('7')).toMatchObject(num('7')));
});

describe('bitwiseOrExpr', () => {
  it('parses 3|5', () => expect(parseBitwiseOr('3|5')).toMatchObject(bor(num('3'), num('5'))));

  it('parses 1|2|3 left-associatively', () =>
    expect(parseBitwiseOr('1|2|3')).toMatchObject(bor(bor(num('1'), num('2')), num('3'))));
});

describe('precedence: ^ binds tighter than |', () => {
  it('parses 1^2|3^4 as (1^2)|(3^4)', () =>
    expect(parseBitwiseOr('1^2|3^4')).toMatchObject(
      bor(bxor(num('1'), num('2')), bxor(num('3'), num('4')))
    ));
});
