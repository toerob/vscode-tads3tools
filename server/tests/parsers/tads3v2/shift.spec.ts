import { describe, it, expect } from '@jest/globals';
import { parseShift } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });

const shl  = (left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op: '<<',  left, right });
const shr  = (left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op: '>>',  left, right });
const ushr = (left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op: '>>>', left, right });
const add  = (left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op: '+',   left, right });
const mul  = (left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op: '*',   left, right });

describe('shiftExpr → passthrough', () => {
  it('passes through a number literal', () => {
    expect(parseShift('4')).toMatchObject(num('4'));
  });
});

describe('shiftExpr → single operators', () => {
  it('parses 1<<2', () => {
    expect(parseShift('1<<2')).toMatchObject(shl(num('1'), num('2')));
  });

  it('parses 8>>2', () => {
    expect(parseShift('8>>2')).toMatchObject(shr(num('8'), num('2')));
  });

  it('parses 8>>>2', () => {
    expect(parseShift('8>>>2')).toMatchObject(ushr(num('8'), num('2')));
  });
});

describe('shiftExpr → left-associative chain', () => {
  it('parses 1<<2<<3 as (1<<2)<<3', () => {
    expect(parseShift('1<<2<<3')).toMatchObject(
      shl(shl(num('1'), num('2')), num('3'))
    );
  });
});

describe('precedence: + binds looser than <<', () => {
  it('parses 1+2<<3 as 1+(2<<3)', () => {
    // shiftExpr calls additiveExpr for each operand, so
    // 1+2 is one additiveExpr, then << 3
    expect(parseShift('1+2<<3')).toMatchObject(
      shl(add(num('1'), num('2')), num('3'))
    );
  });

  it('parses 2*3<<1+1 as (2*3) << (1+1)', () => {
    expect(parseShift('2*3<<1+1')).toMatchObject(
      shl(mul(num('2'), num('3')), add(num('1'), num('1')))
    );
  });
});
