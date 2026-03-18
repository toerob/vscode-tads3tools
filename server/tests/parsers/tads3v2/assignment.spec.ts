import { describe, it, expect } from '@jest/globals';
import { parseAssignment } from './parseHelper';
import { AstNode, AssignmentOpKind } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const id   = (name: string): AstNode => ({ kind: 'Identifier', name });

const assign = (op: AssignmentOpKind, target: AstNode, value: AstNode): AstNode =>
  ({ kind: 'Assignment', op, target, value });

const cond = (condition: AstNode, consequent: AstNode, alternate: AstNode): AstNode =>
  ({ kind: 'Conditional', condition, consequent, alternate });

// ── passthrough ───────────────────────────────────────────────────────────────

describe('assignmentExpr → passthrough', () => {
  it('passes through a number literal', () => {
    expect(parseAssignment('42')).toMatchObject(num('42'));
  });
});

// ── simple assignment ─────────────────────────────────────────────────────────

describe('assignmentExpr → simple =', () => {
  it('parses x=1', () => {
    expect(parseAssignment('x=1')).toMatchObject(assign('=', id('x'), num('1')));
  });
});

// ── compound operators ────────────────────────────────────────────────────────

describe('assignmentExpr → compound operators', () => {
  it('parses x+=1',   () => expect(parseAssignment('x+=1')).toMatchObject(assign('+=',   id('x'), num('1'))));
  it('parses x-=1',   () => expect(parseAssignment('x-=1')).toMatchObject(assign('-=',   id('x'), num('1'))));
  it('parses x*=1',   () => expect(parseAssignment('x*=1')).toMatchObject(assign('*=',   id('x'), num('1'))));
  it('parses x/=1',   () => expect(parseAssignment('x/=1')).toMatchObject(assign('/=',   id('x'), num('1'))));
  it('parses x%=1',   () => expect(parseAssignment('x%=1')).toMatchObject(assign('%=',   id('x'), num('1'))));
  it('parses x|=1',   () => expect(parseAssignment('x|=1')).toMatchObject(assign('|=',   id('x'), num('1'))));
  it('parses x&=1',   () => expect(parseAssignment('x&=1')).toMatchObject(assign('&=',   id('x'), num('1'))));
  it('parses x^=1',   () => expect(parseAssignment('x^=1')).toMatchObject(assign('^=',   id('x'), num('1'))));
  it('parses x<<=1',  () => expect(parseAssignment('x<<=1')).toMatchObject(assign('<<=',  id('x'), num('1'))));
  it('parses x>>=1',  () => expect(parseAssignment('x>>=1')).toMatchObject(assign('>>=',  id('x'), num('1'))));
  it('parses x>>>=1', () => expect(parseAssignment('x>>>=1')).toMatchObject(assign('>>>=', id('x'), num('1'))));
});

// ── right-associativity ───────────────────────────────────────────────────────

describe('assignmentExpr → right-associative', () => {
  it('parses a=b=1 as a=(b=1)', () => {
    expect(parseAssignment('a=b=1')).toMatchObject(
      assign('=', id('a'), assign('=', id('b'), num('1')))
    );
  });

  it('parses a+=b+=1 as a+=(b+=1)', () => {
    expect(parseAssignment('a+=b+=1')).toMatchObject(
      assign('+=', id('a'), assign('+=', id('b'), num('1')))
    );
  });
});

// ── precedence: ?: binds tighter than = ──────────────────────────────────────

describe('precedence: ?: binds tighter than =', () => {
  it('parses x=a?1:2 as x=(a?1:2)', () => {
    expect(parseAssignment('x=a?1:2')).toMatchObject(
      assign('=', id('x'), cond(id('a'), num('1'), num('2')))
    );
  });
});
