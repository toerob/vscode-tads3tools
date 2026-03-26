/**
 * Tests for Tads3v2AstScopeBuilder.
 *
 * Fixture: server/tests/fixtures/smallgame.t  (all line numbers 0-based)
 *
 *   Line 0:  /* comment *\/
 *   Line 1:  (blank)
 *   Line 2:  startRoom: Room
 *   Line 3:      name = 'The Entrance Hall'
 *   Line 4:      north = library
 *   Line 5:  (blank)
 *   Line 6:      doSomething() {
 *   Line 7:          local count = 0;
 *   Line 8:          local msg = 'hello';
 *   Line 9:          count++;
 *   Line 10:         self.helper();
 *   Line 11:         computeValue(3);
 *   Line 12:     }
 *   Line 13: (blank)
 *   Line 14:     helper() {
 *   Line 15:         return name;
 *   Line 16:     }
 *   Line 17: (blank)
 *   Line 18:     /* withShadow comment *\/
 *   Line 19:     (comment continued)
 *   Line 20:     (comment continued)
 *   Line 21:     withShadow() {
 *   Line 22:         self.helper();
 *   Line 23:         local fn = function() { computeValue(1); };
 *   Line 24:     }
 *   Line 25: ;
 *   Line 26: (blank)
 *   Line 27: library: Room
 *   Line 28:     name = 'The Library'
 *   Line 29:     south = startRoom
 *   Line 30: ;
 *   Line 31: (blank)
 *   Line 32: function computeValue(n) {
 *   Line 33:     local temp = n * 2;
 *   Line 34:     return temp;
 *   Line 35: }
 */

import { readFileSync } from 'fs';
import * as path from 'path';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { BailErrorStrategy } from 'antlr4ts/BailErrorStrategy';
import { DefaultErrorStrategy } from 'antlr4ts/DefaultErrorStrategy';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../../../src/parser/Tads3v2AstVisitor';
import { ProgramNode } from '../../../src/parser/ast/nodes';
import {
  Tads3v2AstScopeBuilder,
  FunctionScope,
} from '../../../src/parser/Tads3v2AstScopeBuilder';

// ── helpers ────────────────────────────────────────────────────────────────────

function parseFixture(relPath: string): ProgramNode {
  const source = readFileSync(path.join(__dirname, '../../fixtures', relPath), 'utf-8');
  const lexer = new Tads3v2Lexer(CharStreams.fromString(source));
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();
  let tree;
  try {
    tree = parser.program();
  } catch {
    parser.reset();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    parser.errorHandler = new DefaultErrorStrategy();
    tree = parser.program();
  }
  expect(parser.numberOfSyntaxErrors).toBe(0);
  const visitor = new Tads3v2AstVisitor();
  return visitor.visit(tree) as ProgramNode;
}

// ── suite ──────────────────────────────────────────────────────────────────────

describe('Tads3v2AstScopeBuilder — smallgame.t', () => {
  let builder: Tads3v2AstScopeBuilder;

  beforeAll(() => {
    const program = parseFixture('smallgame.t');
    builder = new Tads3v2AstScopeBuilder();
    builder.build(program);
  });

  // ── scope index ─────────────────────────────────────────────────────────────

  it('indexes all four named function/method scopes', () => {
    expect(builder.scopes.has('startRoom.doSomething')).toBe(true);
    expect(builder.scopes.has('startRoom.helper')).toBe(true);
    expect(builder.scopes.has('startRoom.withShadow')).toBe(true);
    expect(builder.scopes.has('computeValue')).toBe(true);
  });

  // ── (1) local variable in a code block ──────────────────────────────────────
  //
  // Line 7: `        local count = 0;`
  // scopeAt() should return startRoom.doSomething whose range covers that line.

  it('scopeAt the local-variable line resolves to startRoom.doSomething', () => {
    const scope = builder.scopeAt({ line: 7, character: 8 });
    expect(scope).not.toBeNull();
    expect(scope!.def.qualifiedName).toBe('startRoom.doSomething');
    expect(scope!.def.containerName).toBe('startRoom');
    expect(scope!.def.name).toBe('doSomething');
  });

  it('startRoom.doSomething range starts at its declaration line (6) and covers its body', () => {
    const scope = builder.scopes.get('startRoom.doSomething')!;
    expect(scope.def.range.start.line).toBe(6);
    expect(scope.def.range.end.line).toBeGreaterThan(6);
  });

  // ── (2) finding another definition that ends up in the properties ────────────
  //
  // From inside doSomething, `self.helper()` is a call to a method defined as
  // a property/method on the same object.  The scope builder records it in the
  // calls list, and startRoom.helper exists as its own indexed scope.

  it('doSomething calls list contains the self.helper() call site', () => {
    const scope = builder.scopes.get('startRoom.doSomething')!;
    const helperCall = scope.calls.find(c => c.calleeName === 'helper');
    expect(helperCall).toBeDefined();
    expect(helperCall!.calleeContainer).toBe('self');
  });

  it('startRoom.helper is indexed as a scope at line 14', () => {
    const scope = builder.scopes.get('startRoom.helper')!;
    expect(scope.def.range.start.line).toBe(14);
    expect(scope.def.containerName).toBe('startRoom');
  });

  it('startRoom.helper range starts before computeValue range', () => {
    const helperStart = builder.scopes.get('startRoom.helper')!.def.range.start.line;
    const computeStart = builder.scopes.get('computeValue')!.def.range.start.line;
    expect(helperStart).toBeLessThan(computeStart);
  });

  // ── (3) global object symbol from the same block scope ──────────────────────
  //
  // From inside doSomething, `computeValue(3)` is a call to a top-level function.
  // It appears in the calls list with calleeContainer === null, and the scope
  // builder also indexes computeValue as a top-level FunctionScope at line 24.

  it('doSomething calls list contains the computeValue() call site', () => {
    const scope = builder.scopes.get('startRoom.doSomething')!;
    const globalCall = scope.calls.find(c => c.calleeName === 'computeValue');
    expect(globalCall).toBeDefined();
    expect(globalCall!.calleeContainer).toBeNull();
  });

  it('computeValue is indexed as a top-level scope at line 32', () => {
    const scope = builder.scopes.get('computeValue')!;
    expect(scope.def.containerName).toBeNull();
    expect(scope.def.range.start.line).toBe(32);
  });

  it('scopeAt inside computeValue body resolves to computeValue', () => {
    const scope = builder.scopeAt({ line: 33, character: 4 });
    expect(scope).not.toBeNull();
    expect(scope!.def.qualifiedName).toBe('computeValue');
  });

  // ── (4) shadowed symbol — lambda scope boundary ──────────────────────────────
  //
  // withShadow() calls self.helper() directly (visible in its calls list) but
  // wraps the computeValue(1) call inside an inline lambda.
  // The lambda body is a scope boundary: the builder stops descending into it,
  // so computeValue must NOT appear in withShadow's calls list.

  it('withShadow is indexed as a scope at line 21', () => {
    const scope = builder.scopes.get('startRoom.withShadow')!;
    expect(scope.def.range.start.line).toBe(21);
    expect(scope.def.containerName).toBe('startRoom');
  });

  it('withShadow calls list contains the direct self.helper() call', () => {
    const scope = builder.scopes.get('startRoom.withShadow')!;
    const helperCall = scope.calls.find(c => c.calleeName === 'helper');
    expect(helperCall).toBeDefined();
    expect(helperCall!.calleeContainer).toBe('self');
  });

  it('withShadow calls list does NOT contain computeValue (hidden inside lambda)', () => {
    const scope = builder.scopes.get('startRoom.withShadow')!;
    const leaked = scope.calls.find(c => c.calleeName === 'computeValue');
    expect(leaked).toBeUndefined();
  });

  it('scopeAt inside the withShadow body resolves to withShadow, not computeValue', () => {
    // Line 22: `        self.helper();`  — inside withShadow, outside the lambda
    const scope = builder.scopeAt({ line: 22, character: 8 });
    expect(scope).not.toBeNull();
    expect(scope!.def.qualifiedName).toBe('startRoom.withShadow');
  });
});
