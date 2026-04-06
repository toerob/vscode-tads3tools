import { readFileSync } from 'fs';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { BailErrorStrategy } from 'antlr4ts/BailErrorStrategy';
import { DefaultErrorStrategy } from 'antlr4ts/DefaultErrorStrategy';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { expect } from '@jest/globals';
import { DocumentSymbol } from 'vscode-languageserver';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../../../src/parser/Tads3v2AstVisitor';
import { AstNode, ProgramNode } from '../../../src/parser/ast/nodes';

function makeParser(source: string): Tads3v2Parser {
  const lexer = new Tads3v2Lexer(CharStreams.fromString(source));
  const tokens = new CommonTokenStream(lexer);
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  return parser;
}

function visit(parser: Tads3v2Parser, tree: ParseTree): AstNode {
  const node = new Tads3v2AstVisitor().visit(tree);
  expect(parser.numberOfSyntaxErrors).toBe(0);
  return node;
}

export function parsePrimary(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.primaryExpr());
}

export function parsePostfix(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.postfixExpr());
}

export function parseUnary(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.unaryExpr());
}

export function parseShift(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.shiftExpr());
}

export function parseRelational(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.relationalExpr());
}

export function parseEquality(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.equalityExpr());
}

export function parseBitwiseAnd(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.bitwiseAndExpr());
}

export function parseBitwiseXor(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.bitwiseXorExpr());
}

export function parseBitwiseOr(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.bitwiseOrExpr());
}

export function parseLogicalAnd(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.logicalAndExpr());
}

export function parseLogicalOr(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.logicalOrExpr());
}

export function parseIfNil(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.ifNilExpr());
}

export function parseConditional(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.conditionalExpr());
}

export function parseAssignment(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.assignmentExpr());
}

export function parseExpr(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.expr());
}

export function parseLocalDecl(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.assignmentStatement());
}

export function parseIfStatement(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.ifStatement());
}

export function parseSayStatement(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.sayStatement());
}

export function parseEmptyStatement(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.emptyStatement());
}

export function parseTryCatch(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.tryCatchStatement());
}

export function parseReturn(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.returnStatement());
}

export function parseThrow(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.throwStatement());
}

export function parseWhile(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.whileStatement());
}

export function parseDoWhile(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.doWhileStatement());
}

export function parseFor(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.forStatement());
}

export function parseForIn(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.forInStatement());
}

export function parseForEach(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.forEachStatement());
}

export function parseBreak(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.breakStatement());
}

export function parseContinue(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.continueStatement());
}

export function parseGoto(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.gotoStatement());
}

export function parseLabel(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.labelStatement());
}

export function parseSwitch(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.switchStatement());
}

export function parseParam(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.param());
}

export function parseParams(source: string): AstNode[] {
  const parser = makeParser(source);
  const ctx = parser.params();
  expect(parser.numberOfSyntaxErrors).toBe(0);
  const visitor = new (require('../../../src/parser/Tads3v2AstVisitor').Tads3v2AstVisitor)();
  return ctx.param().map((p: any) => visitor.visit(p));
}

export function parseAdditive(source: string): AstNode {
  const parser = makeParser(source);
  return visit(parser, parser.additiveExpr());
}

/** Parse a full program fragment and assert zero syntax errors.
 *  Uses two-stage SLL → LL prediction for maximum speed. */
export function assertParses(source: string): void {
  const lexer  = new Tads3v2Lexer(CharStreams.fromString(source));
  const tokens = new CommonTokenStream(lexer);
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();

  // Pre-fill the token buffer so both stages read from the same complete buffer.
  // Without this, a mid-file SLL bail leaves the buffer partially filled; the
  // LL pass would exhaust it and re-lex from position 0, producing duplicate tokens.
  tokens.fill();

  // Stage 1: fast SLL — bail on first error
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();
  try {
    console.log("Attempting SLL parse");
    parser.program();
  } catch(e) {
    console.log("SLL parse failed, retrying with LL", e);
    // SLL failed — reset position and retry with full LL
    parser.reset();  // internally calls tokens.seek(0)
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    parser.errorHandler = new DefaultErrorStrategy();
    parser.program();
  }

  expect(parser.numberOfSyntaxErrors).toBe(0);
}

/** Parse a full program and return DocumentSymbols produced by astToSymbols. */
export function parseSymbols(source: string): DocumentSymbol[] {
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
  const program = visitor.visit(tree) as any;
  return require('../../../src/parser/Tads3v2AstToSymbols').astToSymbols(program);
}

/** Parse a full program and return the visitor so tests can inspect collected state. */
export function parseProgram(source: string): Tads3v2AstVisitor {
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
  visitor.visit(tree);
  return visitor;
}

/** Parse a full program and return the ProgramNode AST. */
export function parseProgramAst(source: string): ProgramNode {
  const lexer  = new Tads3v2Lexer(CharStreams.fromString(source));
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();
  let tree;
  try {
    console.log("Attempting SLL parse");
    tree = parser.program();
  } catch {
    console.log("SLL parse failed, retrying with LL");
    parser.reset();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    parser.errorHandler = new DefaultErrorStrategy();
    tree = parser.program();
  }
  expect(parser.numberOfSyntaxErrors).toBe(0);
  const visitor = new Tads3v2AstVisitor();
  return visitor.visit(tree) as ProgramNode;
}

/** Read a fixture file and assert it parses with zero syntax errors. */
export function assertParsesFile(path: string): void {
  const source = readFileSync(path, 'utf-8');
  assertParses(source);
}
