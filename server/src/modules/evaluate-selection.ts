/**
 * evaluate-selection.ts
 *
 * Server-side handler for the "tads3.evaluateSelection" command.
 * Parses and evaluates a text snippet (expression or statement list)
 * using the Tads3v2AstEvaluator and returns a human-readable result string.
 *
 * Strategy
 * ────────
 * 1. Try to parse the text as a single `expr` — covers the most common case
 *    of the user selecting an expression like `3 + 4` or `'foo' + bar`.
 * 2. If that fails or produces UNKNOWN, try wrapping in a minimal codeBlock
 *    so that statement sequences and local declarations work:
 *      { <text> }
 *    and evaluate via evalBlock.
 * 3. Return the formatted TadsValue.
 */

import {
  BailErrorStrategy,
  CharStreams,
  CommonTokenStream,
  DefaultErrorStrategy,
} from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { Tads3v2Lexer } from '../parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../parser/Tads3v2AstVisitor';
import {
  Tads3v2AstEvaluator,
  TadsValue,
  UNKNOWN,
} from '../parser/Tads3v2AstEvaluator';
import { BlockNode } from '../parser/ast/nodes';

// ── Public entry point ────────────────────────────────────────────────────────

export function evaluateSelection(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '(empty selection)';

  // 1. Try as expression
  const exprResult = tryEvalExpr(trimmed);
  if (exprResult !== null && exprResult.type !== 'unknown') {
    return formatValue(exprResult);
  }

  // 2. Try as statement block
  const blockResult = tryEvalBlock(trimmed);
  if (blockResult !== null) {
    return formatValue(blockResult);
  }

  return exprResult ? formatValue(exprResult) : '(could not evaluate)';
}

// ── Parse + eval helpers ──────────────────────────────────────────────────────

function tryEvalExpr(text: string): TadsValue | null {
  try {
    const parser = makeParser(text);
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.errorHandler = new BailErrorStrategy();
    const tree = parser.expr();
    const visitor = new Tads3v2AstVisitor();
    const node = visitor.visit(tree);
    const evaluator = new Tads3v2AstEvaluator();
    return evaluator.evalExpr(node, evaluator.globalEnvironment);
  } catch {
    return null;
  }
}

function tryEvalBlock(text: string): TadsValue | null {
  // Wrap in braces so it parses as a codeBlock / innerCodeBlock
  const wrapped = `{ ${text} }`;
  try {
    const parser = makeParser(wrapped);
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.errorHandler = new BailErrorStrategy();
    const tree = parser.codeBlock();
    const visitor = new Tads3v2AstVisitor();
    const node = visitor.visit(tree);
    if (node.kind !== 'Block') return null;
    const evaluator = new Tads3v2AstEvaluator();
    return evaluator.evalBlock(node as BlockNode, evaluator.globalEnvironment);
  } catch {
    // SLL failed — retry with full LL
    try {
      const parser = makeParser(`{ ${text} }`);
      parser.removeErrorListeners();
      parser.interpreter.setPredictionMode(PredictionMode.LL);
      parser.errorHandler = new DefaultErrorStrategy();
      const tree = parser.codeBlock();
      const visitor = new Tads3v2AstVisitor();
      const node = visitor.visit(tree);
      if (node.kind !== 'Block') return null;
      const evaluator = new Tads3v2AstEvaluator();
      return evaluator.evalBlock(node as BlockNode, evaluator.globalEnvironment);
    } catch {
      return null;
    }
  }
}

function makeParser(text: string): Tads3v2Parser {
  const lexer = new Tads3v2Lexer(CharStreams.fromString(text));
  lexer.removeErrorListeners();
  const tokens = new CommonTokenStream(lexer);
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  return parser;
}

// ── Value formatter ───────────────────────────────────────────────────────────

function formatValue(v: TadsValue): string {
  switch (v.type) {
    case 'nil':      return 'nil';
    case 'true':     return 'true';
    case 'number':   return String(v.value);
    case 'string':   return `'${v.value}'`;
    case 'list':     return `[${v.elements.map(formatValue).join(', ')}]`;
    case 'object':   return `<object ${v.name ?? '(anonymous)'}>`;
    case 'function': return `<function ${v.name ?? '(anonymous)'}>`;
    case 'unknown':  return '(unknown — contains runtime-only values)';
  }
}
