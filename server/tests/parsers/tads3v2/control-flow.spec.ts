import { describe, it, expect } from '@jest/globals';
import {
  parseReturn,
  parseThrow,
  parseWhile,
  parseDoWhile,
  parseFor,
  parseForIn,
  parseForEach,
  parseBreak,
  parseContinue,
  parseGoto,
  parseLabel,
  parseLocalDecl,
  parseParams,
  parsePostfix,
} from './parseHelper';
import { AstNode, BinaryOpKind } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const id   = (name: string): AstNode => ({ kind: 'Identifier', name });
const decl = (name: string, init: AstNode | null): AstNode => ({ kind: 'LocalDecl', name, init });
const block = (...body: AstNode[]): AstNode => ({ kind: 'Block', body });
const bin  = (op: BinaryOpKind, left: AstNode, right: AstNode): AstNode => ({ kind: 'BinaryOp', op, left, right });

// ── returnStatement ──────────────────────────────────────────────────────────

describe('returnStatement → no value', () => {
  it('parses return;', () => {
    expect(parseReturn('return;')).toMatchObject({ kind: 'ReturnStmt', value: null });
  });
});

describe('returnStatement → with value', () => {
  it('parses return 1;', () => {
    expect(parseReturn('return 1;')).toMatchObject({ kind: 'ReturnStmt', value: num('1') });
  });

  it('parses return x + 1;', () => {
    expect(parseReturn('return x + 1;')).toMatchObject({
      kind: 'ReturnStmt',
      value: bin('+', id('x'), num('1')),
    });
  });
});

// ── throwStatement ───────────────────────────────────────────────────────────

describe('throwStatement', () => {
  it('parses throw e;', () => {
    expect(parseThrow('throw e;')).toMatchObject({ kind: 'ThrowStmt', value: id('e') });
  });
});

// ── whileStatement ───────────────────────────────────────────────────────────

describe('whileStatement', () => {
  it('parses while (x > 0) { local y = 1; }', () => {
    expect(parseWhile('while (x > 0) { local y = 1; }')).toMatchObject({
      kind: 'WhileStmt',
      condition: bin('>', id('x'), num('0')),
      body: block(decl('y', num('1'))),
    });
  });

  it('parses while (x > 0) local y = 1; (no braces)', () => {
    expect(parseWhile('while (x > 0) local y = 1;')).toMatchObject({
      kind: 'WhileStmt',
      condition: bin('>', id('x'), num('0')),
      body: block(decl('y', num('1'))),
    });
  });
});

// ── doWhileStatement ─────────────────────────────────────────────────────────

describe('doWhileStatement', () => {
  it('parses do { local x = 1; } while (x > 0);', () => {
    expect(parseDoWhile('do { local x = 1; } while (x > 0);')).toMatchObject({
      kind: 'DoWhileStmt',
      body: block(decl('x', num('1'))),
      condition: bin('>', id('x'), num('0')),
    });
  });
});

// ── forStatement ─────────────────────────────────────────────────────────────

describe('forStatement → all three parts', () => {
  it('parses for (i = 0; i < 10; i++) {}', () => {
    expect(parseFor('for (i = 0; i < 10; i++) {}')).toMatchObject({
      kind: 'ForStmt',
      init:      { kind: 'Assignment', op: '=', target: id('i'), value: num('0') },
      condition: bin('<', id('i'), num('10')),
      body: block(),
    });
  });
});

describe('forStatement → missing parts', () => {
  it('parses for (;;) {} (all null)', () => {
    expect(parseFor('for (;;) {}')).toMatchObject({
      kind: 'ForStmt',
      init: null,
      condition: null,
      update: null,
      body: block(),
    });
  });

  it('parses for (; i < 10;) {} (only condition)', () => {
    expect(parseFor('for (; i < 10;) {}')).toMatchObject({
      kind: 'ForStmt',
      init: null,
      condition: bin('<', id('i'), num('10')),
      update: null,
    });
  });
});

// ── forInStatement ───────────────────────────────────────────────────────────

describe('forInStatement', () => {
  it('parses for (local x in items) {}', () => {
    expect(parseForIn('for (local x in items) {}')).toMatchObject({
      kind: 'ForInStmt',
      name: 'x',
      iterable: id('items'),
      body: block(),
    });
  });

  // Regression: adv3lite swedish.t — `for(i = 1, obj in objList ; ; ++i)` reuses
  // pre-existing variables for both the counter and the binding, neither prefixed
  // with 'local'. Mirrors forEachStatement's already-supported non-local form.
  it('parses for (x in items) {} — binding without local, reusing an existing variable', () => {
    expect(parseForIn('for (x in items) {}')).toMatchObject({
      kind: 'ForInStmt',
      name: 'x',
      iterable: id('items'),
      body: block(),
    });
  });
});

// ── forEachStatement ─────────────────────────────────────────────────────────

describe('forEachStatement', () => {
  it('parses foreach (x in items) {}', () => {
    expect(parseForEach('foreach (x in items) {}')).toMatchObject({
      kind: 'ForEachStmt',
      variable: id('x'),
      isLocal: false,
      iterable: id('items'),
      body: block(),
    });
  });

  // Regression: adv3lite messages.t — `foreach (local c in CustomMessages.all)`
  // declares the loop variable inline instead of referencing a pre-existing one.
  it('parses foreach (local x in items) {}', () => {
    expect(parseForEach('foreach (local x in items) {}')).toMatchObject({
      kind: 'ForEachStmt',
      variable: id('x'),
      isLocal: true,
      iterable: id('items'),
      body: block(),
    });
  });
});

// ── 'step' as an ordinary identifier ────────────────────────────────────────
//
// Regression: adv3lite swe_messages.t uses `step` as a local/param/member
// name. STEP is a reserved lexer token (only meaningful in
// `for (x in a..b step c)`), so without softening it, any use of `step` as
// an identifier anywhere in the file derailed parsing from that point on.

describe("'step' as an ordinary identifier", () => {
  it('parses local step = expr;', () => {
    expect(parseLocalDecl('local step = 1;')).toMatchObject(decl('step', num('1')));
  });

  it('parses step as a function parameter', () => {
    expect(parseParams('step')).toMatchObject([{ kind: 'Param', name: 'step' }]);
  });

  it('parses step as a member access', () => {
    expect(parsePostfix('x.step')).toMatchObject({
      kind: 'MemberAccess',
      object: id('x'),
      member: id('step'),
    });
  });

  it('still parses step as the range-step keyword', () => {
    expect(parseFor('for (x = 1..10 step 2) {}')).toMatchObject({ kind: 'ForStmt' });
  });
});

// ── breakStatement ───────────────────────────────────────────────────────────

describe('breakStatement', () => {
  it('parses break;', () => {
    expect(parseBreak('break;')).toMatchObject({ kind: 'BreakStmt', label: null });
  });

  it('parses break myLabel;', () => {
    expect(parseBreak('break myLabel;')).toMatchObject({ kind: 'BreakStmt', label: 'myLabel' });
  });
});

// ── continueStatement ────────────────────────────────────────────────────────

describe('continueStatement', () => {
  it('parses continue;', () => {
    expect(parseContinue('continue;')).toMatchObject({ kind: 'ContinueStmt', label: null });
  });

  it('parses continue myLabel;', () => {
    expect(parseContinue('continue myLabel;')).toMatchObject({ kind: 'ContinueStmt', label: 'myLabel' });
  });
});

// ── gotoStatement ─────────────────────────────────────────────────────────────

describe('gotoStatement', () => {
  it('parses goto myLabel;', () => {
    expect(parseGoto('goto myLabel;')).toMatchObject({ kind: 'GotoStmt', label: 'myLabel' });
  });

  it('parses goto; (no label)', () => {
    expect(parseGoto('goto;')).toMatchObject({ kind: 'GotoStmt', label: null });
  });
});

// ── labelStatement ───────────────────────────────────────────────────────────

describe('labelStatement', () => {
  it('parses myLabel:', () => {
    expect(parseLabel('myLabel:')).toMatchObject({ kind: 'LabelStmt', name: 'myLabel' });
  });
});
