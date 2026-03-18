import { describe, it, expect } from '@jest/globals';
import { parseSwitch } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const id   = (name: string): AstNode => ({ kind: 'Identifier', name });
const decl = (name: string, init: AstNode | null): AstNode => ({ kind: 'LocalDecl', name, init });
const ret  = (value: AstNode | null): AstNode => ({ kind: 'ReturnStmt', value });
const brk  = (): AstNode => ({ kind: 'BreakStmt', label: null });

// ── empty switch ──────────────────────────────────────────────────────────────

describe('switchStatement → empty', () => {
  it('parses switch (x) {} with no cases', () => {
    expect(parseSwitch('switch (x) {}')).toMatchObject({
      kind: 'SwitchStmt',
      discriminant: id('x'),
      cases: [],
    });
  });
});

// ── single case ───────────────────────────────────────────────────────────────

describe('switchStatement → single case', () => {
  it('parses switch (x) { case 1: break; }', () => {
    expect(parseSwitch('switch (x) { case 1: break; }')).toMatchObject({
      kind: 'SwitchStmt',
      discriminant: id('x'),
      cases: [
        { test: num('1'), body: [brk()] },
      ],
    });
  });
});

// ── default clause ────────────────────────────────────────────────────────────

describe('switchStatement → default clause', () => {
  it('parses switch (x) { default: break; }', () => {
    expect(parseSwitch('switch (x) { default: break; }')).toMatchObject({
      kind: 'SwitchStmt',
      discriminant: id('x'),
      cases: [
        { test: null, body: [brk()] },
      ],
    });
  });
});

// ── multiple cases + default ──────────────────────────────────────────────────

describe('switchStatement → multiple cases with default', () => {
  it('parses case 1 / case 2 / default pattern', () => {
    const src = `
      switch (x) {
        case 1: local y = 1; break;
        case 2: local y = 2; break;
        default: local y = 0;
      }
    `;
    expect(parseSwitch(src)).toMatchObject({
      kind: 'SwitchStmt',
      discriminant: id('x'),
      cases: [
        { test: num('1'), body: [decl('y', num('1')), brk()] },
        { test: num('2'), body: [decl('y', num('2')), brk()] },
        { test: null,     body: [decl('y', num('0'))] },
      ],
    });
  });
});

// ── fall-through (no break between cases) ─────────────────────────────────────

describe('switchStatement → fall-through', () => {
  it('parses case 1: case 2: return 1; (empty case 1 body)', () => {
    expect(parseSwitch('switch (x) { case 1: case 2: return 1; }')).toMatchObject({
      kind: 'SwitchStmt',
      cases: [
        { test: num('1'), body: [] },
        { test: num('2'), body: [ret(num('1'))] },
      ],
    });
  });
});
