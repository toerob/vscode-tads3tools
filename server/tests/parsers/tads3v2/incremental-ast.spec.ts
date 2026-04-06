/**
 * incremental-ast.spec.ts
 *
 * Tests for segmentize(), reparseSegment(), shiftAstRanges(), and applyEdit().
 *
 * The atomic unit of incremental re-parse is one top-level directive
 * (one element of ProgramNode.directives).  A change inside an object's
 * method re-parses the whole object; a change to an unrelated directive
 * leaves that directive's AST node untouched.
 */

import { describe, it, expect } from '@jest/globals';
import {
  segmentize,
  reparseSegment,
  shiftAstRanges,
  applyEdit,
  TopLevelSegment,
} from '../../../src/parser/incremental-ast';
import { BailErrorStrategy, CharStreams, CommonTokenStream, DefaultErrorStrategy } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../../../src/parser/Tads3v2AstVisitor';
import { ProgramNode, ObjectDeclNode, FunctionDeclNode } from '../../../src/parser/ast/nodes';

// ── parse helper ──────────────────────────────────────────────────────────────

function parse(text: string): ProgramNode {
  const lexer = new Tads3v2Lexer(CharStreams.fromString(text));
  lexer.removeErrorListeners();
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();
  let tree;
  try { tree = parser.program(); } catch {
    parser.reset();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    parser.errorHandler = new DefaultErrorStrategy();
    tree = parser.program();
  }
  return new Tads3v2AstVisitor().visit(tree) as ProgramNode;
}

// ── fixtures ──────────────────────────────────────────────────────────────────

const TWO_FUNCTIONS = [
  'functionA() {',       // L0
  '  local x = 1;',     // L1
  '}',                   // L2
  'functionB() {',       // L3
  '  local y = 2;',     // L4
  '}',                   // L5
].join('\n');

const OBJECT_AND_FUNCTION = [
  'hall: Room',          // L0
  '  brightness = 100', // L1
  '  hilfe() {',        // L2
  '  }',                // L3
  ';',                  // L4
  'functionA() {',      // L5
  '  local x = 1;',    // L6
  '}',                  // L7
].join('\n');

// ── segmentize ────────────────────────────────────────────────────────────────

describe('segmentize', () => {
  it('produces one segment per top-level directive', () => {
    const program = parse(TWO_FUNCTIONS);
    const segs = segmentize(program, TWO_FUNCTIONS);
    expect(segs).toHaveLength(2);
  });

  it('segment startLine / endLine cover the correct source lines', () => {
    const program = parse(TWO_FUNCTIONS);
    const [segA, segB] = segmentize(program, TWO_FUNCTIONS);

    expect(segA.startLine).toBe(0);
    expect(segA.endLine).toBe(2);
    expect(segB.startLine).toBe(3);
    expect(segB.endLine).toBe(5);
  });

  it('segment text matches the source lines', () => {
    const program = parse(TWO_FUNCTIONS);
    const [segA] = segmentize(program, TWO_FUNCTIONS);
    expect(segA.text).toBe('functionA() {\n  local x = 1;\n}');
  });

  it('handles a mix of object and function directives', () => {
    const program = parse(OBJECT_AND_FUNCTION);
    const segs = segmentize(program, OBJECT_AND_FUNCTION);
    expect(segs).toHaveLength(2);

    const [objSeg, fnSeg] = segs;
    expect(objSeg.node.kind).toBe('ObjectDecl');
    expect(objSeg.startLine).toBe(0);
    expect(objSeg.endLine).toBe(4);

    expect(fnSeg.node.kind).toBe('FunctionDecl');
    expect(fnSeg.startLine).toBe(5);
    expect(fnSeg.endLine).toBe(7);
  });
});

// ── shiftAstRanges ────────────────────────────────────────────────────────────

describe('shiftAstRanges', () => {
  it('adds the delta to every range in the tree', () => {
    const program = parse('functionA() {\n  local x = 1;\n}');
    const node = program.directives[0];

    const shifted = shiftAstRanges(node, 10);

    expect(shifted.range?.start.line).toBe(node.range!.start.line + 10);
    expect(shifted.range?.end.line).toBe(node.range!.end.line + 10);
  });

  it('does not mutate the original node', () => {
    const program = parse('functionA() {}');
    const node = program.directives[0];
    const originalStart = node.range!.start.line;

    shiftAstRanges(node, 5);

    expect(node.range!.start.line).toBe(originalStart);
  });

  it('shifts nested child ranges (function body block)', () => {
    const program = parse('functionA() {\n  local x = 1;\n}');
    const fn = program.directives[0] as FunctionDeclNode;
    const bodyRangeBefore = fn.body!.range!.start.line;

    const shifted = shiftAstRanges(fn, 3) as FunctionDeclNode;

    expect(shifted.body!.range!.start.line).toBe(bodyRangeBefore + 3);
  });

  it('is a no-op when delta is 0', () => {
    const program = parse('functionA() {}');
    const node = program.directives[0];
    const shifted = shiftAstRanges(node, 0);
    expect(shifted).toBe(node); // exact same reference
  });
});

// ── reparseSegment ────────────────────────────────────────────────────────────

describe('reparseSegment', () => {
  it('parses a single function and returns its AST node', () => {
    const node = reparseSegment('functionA() {\n  local x = 1;\n}', 0);
    expect(node).not.toBeNull();
    expect(node!.kind).toBe('FunctionDecl');
    expect((node as FunctionDeclNode).name).toBe('functionA');
  });

  it('applies the line offset to the returned node', () => {
    const node = reparseSegment('functionA() {}', 7);
    expect(node!.range!.start.line).toBe(7);
    expect(node!.range!.end.line).toBe(7);
  });

  it('parses an object declaration', () => {
    const src = 'hall: Room\n  brightness = 100\n;';
    const node = reparseSegment(src, 0);
    expect(node!.kind).toBe('ObjectDecl');
    expect((node as ObjectDeclNode).id).toBe('hall');
  });

  it('returns null for empty/whitespace text', () => {
    expect(reparseSegment('', 0)).toBeNull();
    expect(reparseSegment('   \n  ', 0)).toBeNull();
  });
});

// ── applyEdit ─────────────────────────────────────────────────────────────────

describe('applyEdit', () => {
  it('re-parses from the first affected segment onward', () => {
    const program = parse(TWO_FUNCTIONS);
    const segments = segmentize(program, TWO_FUNCTIONS);

    // Keep a reference to the stable (pre-edit) segment's node.
    // With TWO_FUNCTIONS the edit touches lines 0-2 (functionA), so
    // functionA is the first affected segment — nothing is stable before it.
    // To get a stable segment, use OBJECT_AND_FUNCTION and edit the function.
    const prog2 = parse(OBJECT_AND_FUNCTION);
    const segs2 = segmentize(prog2, OBJECT_AND_FUNCTION);

    // hall (L0–L4) is stable; edit touches functionA (L5–L7).
    const hallNodeBefore = segs2[0].node;

    const edited = [
      'hall: Room',
      '  brightness = 100',
      '  hilfe() {',
      '  }',
      ';',
      'functionA() {',
      '  local x = 1;',
      '  local z = 3;', // added line
      '}',
    ].join('\n');

    const { segments: updated } = applyEdit(segs2, 5, 7, edited);

    // Still two top-level directives.
    expect(updated).toHaveLength(2);

    // hall was NOT re-parsed — same node reference.
    expect(updated[0].node).toBe(hallNodeBefore);

    // functionA was re-parsed — new node.
    expect(updated[1].node).not.toBe(segs2[1].node);
    expect((updated[1].node as FunctionDeclNode).name).toBe('functionA');
  });

  it('preserves correct start/end lines after re-parse', () => {
    const program = parse(TWO_FUNCTIONS);
    const segments = segmentize(program, TWO_FUNCTIONS);

    // Edit stays within functionA (same line count).
    const edited = TWO_FUNCTIONS.replace('local x = 1', 'local x = 99');

    const { segments: updated } = applyEdit(segments, 1, 1, edited);

    expect(updated[0].startLine).toBe(0);
    expect(updated[0].endLine).toBe(2);
    expect(updated[1].startLine).toBe(3);
    expect(updated[1].endLine).toBe(5);
  });

  it('rebuilt ProgramNode has directives matching the updated segments', () => {
    const program = parse(TWO_FUNCTIONS);
    const segments = segmentize(program, TWO_FUNCTIONS);

    const edited = TWO_FUNCTIONS.replace('local x = 1', 'local x = 42');
    const { program: newProgram } = applyEdit(segments, 1, 1, edited);

    expect(newProgram.kind).toBe('Program');
    expect(newProgram.directives).toHaveLength(2);
    expect(newProgram.directives[0].kind).toBe('FunctionDecl');
    expect(newProgram.directives[1].kind).toBe('FunctionDecl');
  });

  it('falls back to a full re-parse when the edit is outside all known segments', () => {
    const program = parse(TWO_FUNCTIONS);
    const segments = segmentize(program, TWO_FUNCTIONS);

    // Append a brand-new function beyond the last segment's endLine.
    const edited = TWO_FUNCTIONS + '\nfunctionC() {}';

    const { segments: updated, program: newProgram } = applyEdit(segments, 6, 6, edited);

    expect(newProgram.directives).toHaveLength(3);
    expect(updated).toHaveLength(3);
  });
});
