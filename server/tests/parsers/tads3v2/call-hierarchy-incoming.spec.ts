/**
 * call-hierarchy-incoming.spec.ts
 *
 * Unit tests for onIncomingCalls() using the callchain.t fixture.
 *
 * Fixture excerpt (relevant to these tests):
 *
 *   xyzzyRoom: Room
 *     method1() { "In method1"; }
 *     ...
 *   ;
 *
 *   anotherRoom: Room
 *     func()  { xyzzyRoom.method1(); }   // explicit obj.method call
 *     func2() { self.func(); }           // self.method call
 *   ;
 *
 * Expected incoming chains:
 *   xyzzyRoom.method1  ←  anotherRoom.func   (explicit xyzzyRoom.method1())
 *   anotherRoom.func   ←  anotherRoom.func2  (self.func() resolves to anotherRoom.func)
 */

import { readFileSync } from 'fs';
import * as path from 'path';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { BailErrorStrategy } from 'antlr4ts/BailErrorStrategy';
import { DefaultErrorStrategy } from 'antlr4ts/DefaultErrorStrategy';
import { CallHierarchyItem, SymbolKind, Range } from 'vscode-languageserver';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../../../src/parser/Tads3v2AstVisitor';
import { ProgramNode } from '../../../src/parser/ast/nodes';
import { Tads3v2AstScopeBuilder, FunctionScope } from '../../../src/parser/Tads3v2AstScopeBuilder';
import { onIncomingCalls } from '../../../src/modules/call-hierarchy';
import { TadsSymbolManager } from '../../../src/modules/symbol-manager';

// ── helpers ───────────────────────────────────────────────────────────────────

const FIXTURE_PATH = '/callchain.t';

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
  return new Tads3v2AstVisitor().visit(tree) as ProgramNode;
}

function makeStubSm(
  scopes: Map<string, FunctionScope>,
  inheritanceMap?: Map<string, string>,
): TadsSymbolManager {
  const sm = new TadsSymbolManager();
  sm.fileScopes.set(FIXTURE_PATH, scopes);
  if (inheritanceMap) {
    for (const [child, parent] of inheritanceMap) {
      sm.inheritanceMap.set(child, parent);
    }
  }
  return sm;
}

function itemFor(qualifiedName: string): CallHierarchyItem {
  const dummyRange = Range.create(0, 0, 0, 0);
  return {
    name: qualifiedName,
    kind: SymbolKind.Function,
    uri: `file://${FIXTURE_PATH}`,
    range: dummyRange,
    selectionRange: dummyRange,
    data: { fsPath: FIXTURE_PATH, qualifiedName },
  };
}

// ── suite ─────────────────────────────────────────────────────────────────────

describe('onIncomingCalls — callchain.t', () => {
  let sm: TadsSymbolManager;

  beforeAll(() => {
    const program = parseFixture('callchain.t');
    const builder = new Tads3v2AstScopeBuilder();
    builder.build(program);
    sm = makeStubSm(builder.scopes);
  });

  // ── explicit obj.method call ──────────────────────────────────────────────

  it('xyzzyRoom.method1 has one incoming call from anotherRoom.func', async () => {
    const result = await onIncomingCalls({ item: itemFor('xyzzyRoom.method1') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    expect(result![0].from.name).toBe('anotherRoom.func');
    expect(result![0].fromRanges).toHaveLength(1);
  });

  it('anotherRoom.func incoming item carries resolvable data', async () => {
    const result = await onIncomingCalls({ item: itemFor('xyzzyRoom.method1') }, sm);
    const fromItem = result![0].from;
    expect(fromItem.data).toBeDefined();
    expect((fromItem.data as any).qualifiedName).toBe('anotherRoom.func');
  });

  // ── self.method call ───────────────────────────────────────────────────────

  it('anotherRoom.func has one incoming call from anotherRoom.func2 (self.func)', async () => {
    const result = await onIncomingCalls({ item: itemFor('anotherRoom.func') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    expect(result![0].from.name).toBe('anotherRoom.func2');
    expect(result![0].fromRanges).toHaveLength(1);
  });

  it('anotherRoom.func2 incoming item carries resolvable data', async () => {
    const result = await onIncomingCalls({ item: itemFor('anotherRoom.func') }, sm);
    const fromItem = result![0].from;
    expect(fromItem.data).toBeDefined();
    expect((fromItem.data as any).qualifiedName).toBe('anotherRoom.func2');
  });

  // ── full reverse-chain traversal ──────────────────────────────────────────
  //
  // Starting from xyzzyRoom.method1, walk incoming callers repeatedly —
  // simulating VS Code collapsing the call hierarchy upward.

  it('walks the reverse chain xyzzyRoom.method1 ← anotherRoom.func ← anotherRoom.func2', async () => {
    const visited: string[] = [];
    let current = itemFor('xyzzyRoom.method1');

    for (;;) {
      const result = await onIncomingCalls({ item: current }, sm);
      if (!result || result.length === 0) break;

      // Each node in this chain has exactly one caller.
      expect(result).toHaveLength(1);
      const caller = result[0].from;
      visited.push(caller.name);

      expect(caller.data).toBeDefined();
      current = caller;
    }

    expect(visited).toEqual([
      'anotherRoom.func',
      'anotherRoom.func2',
    ]);
  });

  // ── leaf nodes ────────────────────────────────────────────────────────────

  it('anotherRoom.func2 has no incoming calls (root of chain)', async () => {
    const result = await onIncomingCalls({ item: itemFor('anotherRoom.func2') }, sm);
    expect(result).toBeNull();
  });

  it('functionCall5 incoming: called by callTest.method1 via bare global name', async () => {
    // callTest.method1 calls functionCall5() with no container — bare call inside a method
    // that resolves to the global via the inheritance-chain fallback.
    const result = await onIncomingCalls({ item: itemFor('functionCall5') }, sm);
    expect(result).not.toBeNull();
    const names = result!.map(r => r.from.name);
    expect(names).toContain('callTest.method1');
  });

  it('functionCall1 has no incoming calls (never called in the fixture)', async () => {
    const result = await onIncomingCalls({ item: itemFor('functionCall1') }, sm);
    // functionCall1 is called by functionCall2
    expect(result).not.toBeNull();
    const names = result!.map(r => r.from.name);
    expect(names).toContain('functionCall2');
  });
});

// ── inherited-call incoming edges ─────────────────────────────────────────────
//
// Fixture: BaseGreeter → MidGreeter → TopGreeter (each calls inherited())
//
// When viewing incoming calls for a parent method, subclass overrides that
// explicitly call `inherited` must appear as callers.

describe('onIncomingCalls — inherited chain', () => {
  let sm: TadsSymbolManager;

  beforeAll(() => {
    const program = parseFixture('callchain.t');
    const builder = new Tads3v2AstScopeBuilder();
    builder.build(program);

    // inheritanceMap is normally populated by the symbol listener during a real
    // parse pass.  Seed it manually here to mirror what the server would supply.
    const inheritanceMap = new Map([
      ['MidGreeter', 'BaseGreeter'],
      ['TopGreeter', 'MidGreeter'],
    ]);
    sm = makeStubSm(builder.scopes, inheritanceMap);
  });

  it('scope builder indexes all three greet methods', () => {
    expect(sm.fileScopes.get(FIXTURE_PATH)!.has('BaseGreeter.greet')).toBe(true);
    expect(sm.fileScopes.get(FIXTURE_PATH)!.has('MidGreeter.greet')).toBe(true);
    expect(sm.fileScopes.get(FIXTURE_PATH)!.has('TopGreeter.greet')).toBe(true);
  });

  it('MidGreeter.greet records an inherited() call ref', () => {
    const scope = sm.fileScopes.get(FIXTURE_PATH)!.get('MidGreeter.greet')!;
    expect(scope.calls.some(c => c.calleeName === 'inherited')).toBe(true);
  });

  // ── direct subclass ───────────────────────────────────────────────────────

  it('BaseGreeter.greet incoming includes MidGreeter.greet (calls inherited)', async () => {
    const result = await onIncomingCalls({ item: itemFor('BaseGreeter.greet') }, sm);
    expect(result).not.toBeNull();
    const names = result!.map(r => r.from.name);
    expect(names).toContain('MidGreeter.greet');
  });

  it('BaseGreeter.greet incoming does NOT include TopGreeter.greet (two hops — TopGreeter calls MidGreeter, not BaseGreeter)', async () => {
    // TopGreeter.greet calls inherited() which resolves to MidGreeter.greet, not
    // BaseGreeter.greet directly.  It must appear under MidGreeter.greet's callers.
    const result = await onIncomingCalls({ item: itemFor('BaseGreeter.greet') }, sm);
    const names = result?.map(r => r.from.name) ?? [];
    expect(names).not.toContain('TopGreeter.greet');
  });

  // ── middle of the chain ───────────────────────────────────────────────────

  it('MidGreeter.greet incoming includes TopGreeter.greet (calls inherited)', async () => {
    const result = await onIncomingCalls({ item: itemFor('MidGreeter.greet') }, sm);
    expect(result).not.toBeNull();
    const names = result!.map(r => r.from.name);
    expect(names).toContain('TopGreeter.greet');
  });

  // ── leaf ─────────────────────────────────────────────────────────────────

  it('TopGreeter.greet has no incoming inherited calls (it is the top override)', async () => {
    const result = await onIncomingCalls({ item: itemFor('TopGreeter.greet') }, sm);
    // No subclass overrides TopGreeter in the fixture.
    expect(result).toBeNull();
  });

  // ── full reverse-chain walk ───────────────────────────────────────────────
  //
  // Incoming calls travel from callee → caller, so we start at the base
  // (the first method to be called via `inherited`) and expand upward.
  //
  //   BaseGreeter.greet  ←  MidGreeter.greet  (MidGreeter calls inherited → BaseGreeter)
  //   MidGreeter.greet   ←  TopGreeter.greet  (TopGreeter calls inherited → MidGreeter)
  //   TopGreeter.greet   ←  (nobody)

  it('walks up the inherited chain from BaseGreeter.greet to TopGreeter.greet', async () => {
    const visited: string[] = [];
    let current = itemFor('BaseGreeter.greet');

    for (;;) {
      const result = await onIncomingCalls({ item: current }, sm);
      if (!result || result.length === 0) break;
      expect(result).toHaveLength(1);
      const caller = result[0].from;
      visited.push(caller.name);
      expect(caller.data).toBeDefined();
      current = caller;
    }

    expect(visited).toEqual([
      'MidGreeter.greet',
      'TopGreeter.greet',
    ]);
  });
});
