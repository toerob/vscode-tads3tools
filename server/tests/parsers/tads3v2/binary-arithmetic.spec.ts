import { describe, it, expect } from '@jest/globals';
import { parseAdditive } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num = (v: string): AstNode => ({ kind: 'Number', value: v });

const mul = (left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: '*', left, right });

const add = (left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: '+', left, right });

const sub = (left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: '-', left, right });

const div = (left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: '/', left, right });

const mod = (left: AstNode, right: AstNode): AstNode =>
  ({ kind: 'BinaryOp', op: '%', left, right });

// ── passthrough ───────────────────────────────────────────────────────────────

describe('additiveExpr → passthrough', () => {
  it('returns a number literal with no operator', () => {
    expect(parseAdditive('42')).toMatchObject(num('42'));
  });
});

// ── multiplicative precedence ─────────────────────────────────────────────────

describe('multiplicativeExpr', () => {
  it('parses 2*5 as a single BinaryOp', () => {
    expect(parseAdditive('2*5')).toMatchObject(mul(num('2'), num('5')));
  });

  it('parses 6/3 as a single BinaryOp', () => {
    expect(parseAdditive('6/3')).toMatchObject(div(num('6'), num('3')));
  });

  it('parses 7%3 as a single BinaryOp', () => {
    expect(parseAdditive('7%3')).toMatchObject(mod(num('7'), num('3')));
  });

  it('parses 2*3*4 left-associatively', () => {
    // (2*3)*4
    expect(parseAdditive('2*3*4')).toMatchObject(
      mul(mul(num('2'), num('3')), num('4'))
    );
  });
});

// ── additive precedence ───────────────────────────────────────────────────────

describe('additiveExpr', () => {
  it('parses 1+2 as a single BinaryOp', () => {
    expect(parseAdditive('1+2')).toMatchObject(add(num('1'), num('2')));
  });

  it('parses 5-3 as a single BinaryOp', () => {
    expect(parseAdditive('5-3')).toMatchObject(sub(num('5'), num('3')));
  });

  it('parses 1+2+3 left-associatively', () => {
    // (1+2)+3
    expect(parseAdditive('1+2+3')).toMatchObject(
      add(add(num('1'), num('2')), num('3'))
    );
  });
});

// ── mixed precedence ──────────────────────────────────────────────────────────

describe('precedence: * binds tighter than +', () => {
  it('parses 2+3*4 as 2+(3*4)', () => {
    expect(parseAdditive('2+3*4')).toMatchObject(
      add(num('2'), mul(num('3'), num('4')))
    );
  });

  it('parses 2*3+4 as (2*3)+4', () => {
    expect(parseAdditive('2*3+4')).toMatchObject(
      add(mul(num('2'), num('3')), num('4'))
    );
  });

  it('parses 2*5+7*3+8+8 correctly', () => {
    // ((( 2*5) + (7*3) ) + 8) + 8
    expect(parseAdditive('2*5+7*3+8+8')).toMatchObject(
      add(
        add(
          add(
            mul(num('2'), num('5')),
            mul(num('7'), num('3'))
          ),
          num('8')
        ),
        num('8')
      )
    );
  });
});
