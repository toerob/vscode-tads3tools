import { describe, it, expect } from '@jest/globals';
import { parseLogicalAnd, parseLogicalOr, parseIfNil } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });
const id  = (name: string): AstNode => ({ kind: 'Identifier', name });

const land  = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '&&', left: l, right: r });
const lor   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '||', left: l, right: r });
const ifnil = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '??', left: l, right: r });
const bor   = (l: AstNode, r: AstNode): AstNode => ({ kind: 'BinaryOp', op: '|',  left: l, right: r });

// ── logicalAndExpr ────────────────────────────────────────────────────────────

describe('logicalAndExpr → passthrough', () => {
  it('passes through a number', () => expect(parseLogicalAnd('1')).toMatchObject(num('1')));
});

describe('logicalAndExpr', () => {
  it('parses x&&y', () => expect(parseLogicalAnd('x&&y')).toMatchObject(land(id('x'), id('y'))));

  it('parses x&&y&&z left-associatively', () =>
    expect(parseLogicalAnd('x&&y&&z')).toMatchObject(land(land(id('x'), id('y')), id('z'))));
});

describe('precedence: | binds tighter than &&', () => {
  it('parses 1|2&&3|4 as (1|2)&&(3|4)', () =>
    expect(parseLogicalAnd('1|2&&3|4')).toMatchObject(
      land(bor(num('1'), num('2')), bor(num('3'), num('4')))
    ));
});

// ── logicalOrExpr ─────────────────────────────────────────────────────────────

describe('logicalOrExpr → passthrough', () => {
  it('passes through a number', () => expect(parseLogicalOr('1')).toMatchObject(num('1')));
});

describe('logicalOrExpr', () => {
  it('parses x||y', () => expect(parseLogicalOr('x||y')).toMatchObject(lor(id('x'), id('y'))));

  it('parses x||y||z left-associatively', () =>
    expect(parseLogicalOr('x||y||z')).toMatchObject(lor(lor(id('x'), id('y')), id('z'))));
});

describe('precedence: && binds tighter than ||', () => {
  it('parses x&&y||z&&w as (x&&y)||(z&&w)', () =>
    expect(parseLogicalOr('x&&y||z&&w')).toMatchObject(
      lor(land(id('x'), id('y')), land(id('z'), id('w')))
    ));
});

// ── ifNilExpr (??) ────────────────────────────────────────────────────────────

describe('ifNilExpr → passthrough', () => {
  it('passes through a number', () => expect(parseIfNil('1')).toMatchObject(num('1')));
});

describe('ifNilExpr', () => {
  it('parses x??y', () => expect(parseIfNil('x??y')).toMatchObject(ifnil(id('x'), id('y'))));

  it('parses x??y??z left-associatively', () =>
    expect(parseIfNil('x??y??z')).toMatchObject(ifnil(ifnil(id('x'), id('y')), id('z'))));
});

describe('precedence: || binds tighter than ??', () => {
  it('parses x||y??z||w as (x||y)??(z||w)', () =>
    expect(parseIfNil('x||y??z||w')).toMatchObject(
      ifnil(lor(id('x'), id('y')), lor(id('z'), id('w')))
    ));
});
