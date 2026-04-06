/**
 * call-hierarchy-outgoing.spec.ts
 *
 * Unit tests for onOutgoingCalls() using the callchain.t fixture.
 *
 * Tests document both the working cases and the self.X resolution bug
 * so that fixing it is unambiguous.
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
import { onOutgoingCalls } from '../../../src/modules/call-hierarchy';
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
  expect(parser.numberOfSyntaxErrors).toBe(0);
  return new Tads3v2AstVisitor().visit(tree) as ProgramNode;
}

/** Build a minimal TadsSymbolManager stub with only fileScopes populated. */
function makeStubSm(scopes: Map<string, FunctionScope>): TadsSymbolManager {
  const sm = new TadsSymbolManager();
  sm.fileScopes.set(FIXTURE_PATH, scopes);
  return sm;
}

/** Build a CallHierarchyItem whose data points to the given scope. */
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

// ── suite ──────────────────────────────────────────────────────────────────────

describe('onOutgoingCalls — callchain.t', () => {
  let sm: TadsSymbolManager;

  beforeAll(() => {
    const program = parseFixture('callchain.t');
    const builder = new Tads3v2AstScopeBuilder();
    builder.build(program);
    sm = makeStubSm(builder.scopes);
  });

  // ── global function chain (plain unqualified calls) ────────────────────────
  // These work correctly: callee qualified name matches the scope key exactly.

  it('functionCall5 outgoing resolves to a real functionCall4 item', async () => {
    const result = await onOutgoingCalls({ item: itemFor('functionCall5') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    const edge = result![0];
    expect(edge.to.name).toBe('functionCall4');
    expect(edge.to.data).toBeDefined();
    expect((edge.to.data as any).qualifiedName).toBe('functionCall4');
  });

  it('functionCall2 outgoing resolves to a real functionCall1 item', async () => {
    const result = await onOutgoingCalls({ item: itemFor('functionCall2') }, sm);
    expect(result).not.toBeNull();
    expect(result![0].to.name).toBe('functionCall1');
    expect(result![0].to.data).toBeDefined();
  });

  it('functionCall1 has no outgoing calls (leaf)', async () => {
    const result = await onOutgoingCalls({ item: itemFor('functionCall1') }, sm);
    expect(result).toBeNull();
  });

  // ── object → global (transition point) ────────────────────────────────────

  it('callTest.method1 outgoing resolves to the global functionCall5', async () => {
    const result = await onOutgoingCalls({ item: itemFor('callTest.method1') }, sm);
    expect(result).not.toBeNull();
    expect(result![0].to.name).toBe('functionCall5');
    expect(result![0].to.data).toBeDefined();
  });

  // ── self.X method chain ────────────────────────────────────────────────────

  it('callTest.method5 outgoing: self.method4 resolves to callTest.method4', async () => {
    const result = await onOutgoingCalls({ item: itemFor('callTest.method5') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    const edge = result![0];
    expect(edge.to.name).toBe('callTest.method4');
    expect(edge.to.data).toBeDefined();
    expect((edge.to.data as any).qualifiedName).toBe('callTest.method4');
  });

  it('callTest.method2 outgoing: self.method1 resolves to callTest.method1', async () => {
    const result = await onOutgoingCalls({ item: itemFor('callTest.method2') }, sm);
    expect(result).not.toBeNull();
    expect(result![0].to.name).toBe('callTest.method1');
    expect(result![0].to.data).toBeDefined();
  });

  // ── full chain traversal (simulates VS Code expanding each node) ───────────
  //
  // VS Code calls onOutgoingCalls once per node expansion, each time passing
  // back the item returned in the previous `to` field.  This test walks the
  // entire chain that way so a break at any step is immediately visible.

  it('walks the full chain by repeatedly expanding each result item', async () => {
    const visited: string[] = [];
    let current = itemFor('callTest.method5');

    for (;;) {
      const result = await onOutgoingCalls({ item: current }, sm);
      if (!result || result.length === 0) break;

      const edge = result[0]; // each scope in the chain has exactly one outgoing call
      visited.push(edge.to.name);

      // If the item has no data it can't be expanded further — chain is broken.
      expect(edge.to.data).toBeDefined();
      current = edge.to;
    }

    expect(visited).toEqual([
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

  // ── PropertySet (dobjFor) outgoing calls ────────────────────────────────────
  //
  // Methods inside dobjFor(Take) are indexed under xyzzyRoom.  Their outgoing
  // calls must resolve correctly regardless of being defined inside a propertyset.

  it('xyzzyRoom.action outgoing: bare functionCall3 resolves to the global scope', async () => {
    // xyzzyRoom.action calls functionCall3() with no container — should resolve
    // to the global functionCall3 scope (real item with data).
    const result = await onOutgoingCalls({ item: itemFor('xyzzyRoom.action') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    const edge = result![0];
    expect(edge.to.name).toBe('functionCall3');
    expect(edge.to.data).toBeDefined();
    expect((edge.to.data as any).qualifiedName).toBe('functionCall3');
  });

  it('xyzzyRoom.action chain fully expandable from the propertyset boundary', async () => {
    // Expanding from xyzzyRoom.action should walk the rest of the global chain.
    const visited: string[] = [];
    let current = itemFor('xyzzyRoom.action');

    for (;;) {
      const result = await onOutgoingCalls({ item: current }, sm);
      if (!result || result.length === 0) break;
      const edge = result[0];
      visited.push(edge.to.name);
      expect(edge.to.data).toBeDefined();
      current = edge.to;
    }

    expect(visited).toEqual([
      'functionCall3',
      'functionCall2',
      'functionCall1',
    ]);
  });

  it('xyzzyRoom.verify outgoing: prop1.method5 is an unresolved stub (dynamic property ref)', async () => {
    // prop1 is a property value, not a class — static analysis cannot follow it.
    // The call should appear as an unresolved stub item (no data / undefined data).
    const result = await onOutgoingCalls({ item: itemFor('xyzzyRoom.verify') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    const edge = result![0];
    expect(edge.to.name).toBe('prop1.method5');
    expect(edge.to.data).toBeUndefined();
  });

  it('xyzzyRoom.check outgoing: prop1.method3 is an unresolved stub', async () => {
    const result = await onOutgoingCalls({ item: itemFor('xyzzyRoom.check') }, sm);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
    const edge = result![0];
    expect(edge.to.name).toBe('prop1.method3');
    expect(edge.to.data).toBeUndefined();
  });
});
