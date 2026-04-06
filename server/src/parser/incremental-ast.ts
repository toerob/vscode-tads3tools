/**
 * incremental-ast.ts — Incremental AST update support.
 *
 * The unit of change is a single top-level directive (one element of
 * ProgramNode.directives).  When source lines change we re-parse only the
 * directive(s) whose line range overlaps the edit, leaving the rest of the
 * AST untouched.
 *
 * Design
 * ──────
 * 1. segmentize(program, text)
 *      Splits a ProgramNode into TopLevelSegments, each carrying its own
 *      source text and 0-based line range.
 *
 * 2. reparseSegment(text, lineOffset)
 *      Parses a single directive's text and shifts every range in the
 *      resulting AST node by lineOffset so positions match the full file.
 *
 * 3. applyEdit(segments, editRange, newFullText)
 *      Finds the segment(s) that overlap the changed lines, re-parses them
 *      from the new source, and returns an updated segment array together
 *      with a new ProgramNode whose directives array reflects the change.
 */

import {
  BailErrorStrategy,
  CharStreams,
  CommonTokenStream,
  DefaultErrorStrategy,
} from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';

import { Tads3v2Lexer }      from './Tads3v2Lexer';
import { Tads3v2Parser }     from './Tads3v2Parser';
import { Tads3v2AstVisitor } from './Tads3v2AstVisitor';
import { AstNode, ProgramNode, SourceRange } from './ast/nodes';

// ── types ────────────────────────────────────────────────────────────────────

export interface TopLevelSegment {
  /** The parsed directive AST node. */
  node: AstNode;
  /** 0-based index of the first line of this directive in the full source. */
  startLine: number;
  /** 0-based index of the last line (inclusive). */
  endLine: number;
  /** Source text of this directive as it appears in the full file. */
  text: string;
}

// ── parse helper ──────────────────────────────────────────────────────────────

function parseFull(text: string): ProgramNode {
  const lexer = new Tads3v2Lexer(CharStreams.fromString(text));
  lexer.removeErrorListeners();
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

// ── range shifting ────────────────────────────────────────────────────────────

function shiftRange(range: SourceRange | undefined, delta: number): SourceRange | undefined {
  if (!range) return undefined;
  return {
    start: { line: range.start.line + delta, character: range.start.character },
    end:   { line: range.end.line   + delta, character: range.end.character   },
  };
}

/**
 * Recursively shift all `range` fields in an AST subtree by `delta` lines.
 * Returns a new object (does not mutate the original).
 */
export function shiftAstRanges(node: AstNode, delta: number): AstNode {
  if (delta === 0) return node;

  const shifted: Record<string, unknown> = {};
  for (const key of Object.keys(node)) {
    const val = (node as Record<string, unknown>)[key];
    if (key === 'range') {
      shifted[key] = shiftRange(val as SourceRange | undefined, delta);
    } else if (Array.isArray(val)) {
      shifted[key] = val.map(item =>
        item && typeof item === 'object' && 'kind' in item
          ? shiftAstRanges(item as AstNode, delta)
          : item,
      );
    } else if (val && typeof val === 'object' && 'kind' in val) {
      shifted[key] = shiftAstRanges(val as AstNode, delta);
    } else {
      shifted[key] = val;
    }
  }
  return shifted as AstNode;
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Split a ProgramNode into per-directive segments, each with its source text
 * and 0-based line range extracted from the full source `text`.
 *
 * Directives without range information (should not happen in practice) are
 * given a single-line range at line 0 and an empty text.
 */
export function segmentize(program: ProgramNode, text: string): TopLevelSegment[] {
  const lines = text.split(/\r?\n/);

  return program.directives.map(node => {
    const startLine = node.range?.start.line ?? 0;
    const endLine   = node.range?.end.line   ?? 0;
    const segText   = lines.slice(startLine, endLine + 1).join('\n');
    return { node, startLine, endLine, text: segText };
  });
}

/**
 * Parse a single directive's source text and return the directive AST node
 * with all ranges shifted by `lineOffset` so they reflect positions in the
 * full file rather than the start of the extracted snippet.
 *
 * Returns null when the text parses to zero directives (empty or whitespace).
 */
export function reparseSegment(text: string, lineOffset: number): AstNode | null {
  const program = parseFull(text);
  if (program.directives.length === 0) return null;
  const directive = program.directives[0];
  return shiftAstRanges(directive, lineOffset);
}

/**
 * Apply an edit that touched lines [editStart, editEnd] (0-based, inclusive)
 * and return an updated segment array plus a rebuilt ProgramNode.
 *
 * Strategy: segments whose line range ends BEFORE the edit start are kept
 * as-is (their text didn't change and their positions haven't shifted).
 * Everything from the first affected segment onward is re-parsed from the
 * new source text — this correctly handles edits that change the line count
 * of a directive, since we never try to extract an incomplete code fragment.
 *
 * `newFullText` is the complete source after the edit has been applied.
 */
export function applyEdit(
  segments: TopLevelSegment[],
  editStart: number,
  editEnd: number,
  newFullText: string,
): { segments: TopLevelSegment[]; program: ProgramNode } {
  // Index of the first segment that overlaps or follows the edited lines.
  const firstAffectedIdx = segments.findIndex(s => s.endLine >= editStart);

  if (firstAffectedIdx === -1) {
    // Edit is beyond the last known segment — full re-parse.
    const program = parseFull(newFullText);
    return { segments: segmentize(program, newFullText), program };
  }

  // Keep segments that end before the edit untouched.
  const stable = segments.slice(0, firstAffectedIdx);

  // Re-parse everything from the start of the first affected segment to the
  // end of the file.  This is safe regardless of how many lines were added
  // or removed because we always work on complete top-level declarations.
  const reparseStart = segments[firstAffectedIdx].startLine;
  const newLines     = newFullText.split(/\r?\n/);
  const tailText     = newLines.slice(reparseStart).join('\n');
  const tailProgram  = parseFull(tailText);

  // Shift the tail directives back to their positions in the full file.
  const tailSegments: TopLevelSegment[] = tailProgram.directives.map(node => {
    const shifted   = shiftAstRanges(node, reparseStart);
    const startLine = shifted.range?.start.line ?? reparseStart;
    const endLine   = shifted.range?.end.line   ?? reparseStart;
    const text      = newLines.slice(startLine, endLine + 1).join('\n');
    return { node: shifted, startLine, endLine, text };
  });

  const updatedSegments = [...stable, ...tailSegments];

  const program: ProgramNode = {
    kind: 'Program',
    range: updatedSegments.length > 0
      ? {
          start: updatedSegments[0].node.range?.start ?? { line: 0, character: 0 },
          end:   updatedSegments[updatedSegments.length - 1].node.range?.end ?? { line: 0, character: 0 },
        }
      : undefined,
    directives: updatedSegments.map(s => s.node),
  };

  return { segments: updatedSegments, program };
}
