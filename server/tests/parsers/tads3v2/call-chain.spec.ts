/**
 * call-chain.spec.ts
 *
 * Verifies that the scope builder correctly captures the full call chain
 * defined in server/tests/fixtures/callchain.t, and that the
 * visualizeScopeTree / traceCallChain utilities work as expected.
 *
 * Fixture shape:
 *
 *   function functionCall1() { functionCall2(); }
 *   function functionCall2() { functionCall3(); }
 *   function functionCall3() { functionCall4(); }
 *   function functionCall4() { functionCall5(); }
 *   function functionCall5() { }
 *
 *   callTest: object
 *     method1() { functionCall1(); }
 *     method2() { self.method1(); }
 *     method3() { self.method2(); }
 *     method4() { self.method3(); }
 *   ;
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
import { Tads3v2AstScopeBuilder } from '../../../src/parser/Tads3v2AstScopeBuilder';
import { visualizeScopeTree, traceCallChain } from './scope-tree-utils';

function parseFixture(relPath: string): ProgramNode {
  const source = readFileSync(path.join(__dirname, '../../fixtures', relPath), 'utf-8');
  const lexer  = new Tads3v2Lexer(CharStreams.fromString(source));
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

describe('call-chain — callchain.t', () => {
  let scopes: ReturnType<Tads3v2AstScopeBuilder['scopes']['values']> extends IterableIterator<infer T> ? Map<string, T> : never;
  let builder: Tads3v2AstScopeBuilder;

  beforeAll(() => {
    const program = parseFixture('callchain.t');
    builder = new Tads3v2AstScopeBuilder();
    builder.build(program);
    scopes = builder.scopes as any;
  });

  // ── visualization ──────────────────────────────────────────────────────────

  it('visualizeScopeTree shows all scopes grouped by container', () => {
    const tree = visualizeScopeTree(builder.scopes);
    console.log('\n── Scope tree ──────────────────────────────\n' + tree);

    // Global section appears before containers
    expect(tree).toMatch(/\(global\)/);
    // All five global functions appear under (global)
    expect(tree).toMatch(/functionCall1/);
    expect(tree).toMatch(/functionCall5/);
    // callTest appears as its own container
    expect(tree).toMatch(/callTest/);
    // Each method appears under callTest
    expect(tree).toMatch(/method5/);
    // functionCall1 has no outgoing calls (leaf)
    expect(tree).toMatch(/functionCall1[\s\S]*?\(no calls\)/);
  });

  // ── scope index ────────────────────────────────────────────────────────────

  it('indexes all global functions', () => {
    for (let i = 1; i <= 5; i++) {
      expect(builder.scopes.has(`functionCall${i}`)).toBe(true);
    }
  });

  it('indexes all callTest methods', () => {
    for (let i = 1; i <= 5; i++) {
      expect(builder.scopes.has(`callTest.method${i}`)).toBe(true);
    }
  });

  // ── outgoing calls in the global chain ─────────────────────────────────────

  it.each([
    ['functionCall5', 'functionCall4'],
    ['functionCall4', 'functionCall3'],
    ['functionCall3', 'functionCall2'],
    ['functionCall2', 'functionCall1'],
  ])('%s calls %s', (caller, callee) => {
    const scope = builder.scopes.get(caller)!;
    expect(scope.calls.length).toBeGreaterThan(0);
    expect(scope.calls[0].calleeName).toBe(callee);
    expect(scope.calls[0].calleeContainer).toBeNull();
  });

  it('functionCall1 has no outgoing calls (leaf)', () => {
    expect(builder.scopes.get('functionCall1')!.calls).toHaveLength(0);
  });

  // ── outgoing calls in the object method chain ───────────────────────────────

  it('callTest.method1 calls the global functionCall5 (transition point)', () => {
    const scope = builder.scopes.get('callTest.method1')!;
    expect(scope.calls[0].calleeName).toBe('functionCall5');
    expect(scope.calls[0].calleeContainer).toBeNull();
  });

  it.each([
    ['callTest.method2', 'method1'],
    ['callTest.method3', 'method2'],
    ['callTest.method4', 'method3'],
    ['callTest.method5', 'method4'],
  ])('%s calls self.%s', (caller, callee) => {
    const scope = builder.scopes.get(caller)!;
    expect(scope.calls[0].calleeName).toBe(callee);
    expect(scope.calls[0].calleeContainer).toBe('self');
  });

  // ── full chain trace ────────────────────────────────────────────────────────

  it('traces the full call chain from callTest.method5 to functionCall1', () => {
    const chain = traceCallChain(builder.scopes, 'callTest.method5');
    console.log('\n── Call chain ──────────────────────────────');
    console.log(chain.join('\n  → '));

    expect(chain).toEqual([
      'callTest.method5',
      'callTest.method4',
      'callTest.method3',
      'callTest.method2',
      'callTest.method1',
      'functionCall5',
      'functionCall4',
      'functionCall3',
      'functionCall2',
      'functionCall1',
    ]);
  });

  it('traceCallChain starting mid-chain still reaches functionCall1', () => {
    const chain = traceCallChain(builder.scopes, 'functionCall3');
    expect(chain).toEqual([
      'functionCall3',
      'functionCall2',
      'functionCall1',
    ]);
  });

  it('traceCallChain on a leaf returns just the leaf', () => {
    const chain = traceCallChain(builder.scopes, 'functionCall1');
    expect(chain).toEqual(['functionCall1']);
  });

  // ── PropertySet (dobjFor) scope indexing ────────────────────────────────────
  //
  // Methods inside dobjFor(Take) { verify() {} check() {} action() {} } must be
  // indexed under their enclosing object (xyzzyRoom), not under a sub-namespace.

  it('indexes xyzzyRoom.verify inside dobjFor(Take)', () => {
    expect(builder.scopes.has('xyzzyRoom.verify')).toBe(true);
  });

  it('indexes xyzzyRoom.check inside dobjFor(Take)', () => {
    expect(builder.scopes.has('xyzzyRoom.check')).toBe(true);
  });

  it('indexes xyzzyRoom.action inside dobjFor(Take)', () => {
    expect(builder.scopes.has('xyzzyRoom.action')).toBe(true);
  });

  it('xyzzyRoom.verify records prop1.method5() call ref', () => {
    const scope = builder.scopes.get('xyzzyRoom.verify')!;
    expect(scope.calls).toHaveLength(1);
    expect(scope.calls[0].calleeName).toBe('method5');
    expect(scope.calls[0].calleeContainer).toBe('prop1');
  });

  it('xyzzyRoom.check records prop1.method3() call ref', () => {
    const scope = builder.scopes.get('xyzzyRoom.check')!;
    expect(scope.calls).toHaveLength(1);
    expect(scope.calls[0].calleeName).toBe('method3');
    expect(scope.calls[0].calleeContainer).toBe('prop1');
  });

  it('xyzzyRoom.action records bare functionCall3() call ref (no container)', () => {
    const scope = builder.scopes.get('xyzzyRoom.action')!;
    expect(scope.calls).toHaveLength(1);
    expect(scope.calls[0].calleeName).toBe('functionCall3');
    expect(scope.calls[0].calleeContainer).toBeNull();
  });
});
