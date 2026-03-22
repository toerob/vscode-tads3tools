import { describe, it, expect } from '@jest/globals';
import { parseRelational } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });
const id  = (name: string): AstNode => ({ kind: 'Identifier', name });

const rel = (op: string, left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: op as never, left, right });

const lt   = (l: AstNode, r: AstNode) => rel('<',      l, r);
const gt   = (l: AstNode, r: AstNode) => rel('>',      l, r);
const lteq = (l: AstNode, r: AstNode) => rel('<=',     l, r);
const gteq = (l: AstNode, r: AstNode) => rel('>=',     l, r);
const add  = (l: AstNode, r: AstNode) => rel('+',      l, r);
const shl  = (l: AstNode, r: AstNode) => rel('<<',     l, r);

// ── passthrough ───────────────────────────────────────────────────────────────

describe('relationalExpr → passthrough', () => {
  it('passes through a number literal', () => {
    expect(parseRelational('7')).toMatchObject(num('7'));
  });
});

// ── single comparison operators ───────────────────────────────────────────────

describe('relationalExpr → single operators', () => {
  it('parses 1<2',  () => expect(parseRelational('1<2')).toMatchObject(lt(num('1'), num('2'))));
  it('parses 1>2',  () => expect(parseRelational('1>2')).toMatchObject(gt(num('1'), num('2'))));
  it('parses 1<=2', () => expect(parseRelational('1<=2')).toMatchObject(lteq(num('1'), num('2'))));
  it('parses 1>=2', () => expect(parseRelational('1>=2')).toMatchObject(gteq(num('1'), num('2'))));
});

// ── left-associative chain ────────────────────────────────────────────────────

describe('relationalExpr → left-associative chain', () => {
  it('parses 1<2<3 as (1<2)<3', () => {
    expect(parseRelational('1<2<3')).toMatchObject(
      lt(lt(num('1'), num('2')), num('3'))
    );
  });
});

// ── precedence: shift binds tighter than relational ───────────────────────────

describe('precedence: << binds tighter than <', () => {
  it('parses 1<<2 < 3 as (1<<2) < 3', () => {
    expect(parseRelational('1<<2<3')).toMatchObject(
      lt(shl(num('1'), num('2')), num('3'))
    );
  });

  it('parses 1 < 2+3 as 1 < (2+3)', () => {
    expect(parseRelational('1<2+3')).toMatchObject(
      lt(num('1'), add(num('2'), num('3')))
    );
  });
});
