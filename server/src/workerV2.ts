import { ANTLRErrorListener, BailErrorStrategy, CharStreams, CommonTokenStream, DefaultErrorStrategy, RecognitionException, Recognizer } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { expose } from 'threads';
import { DocumentSymbol, Range } from 'vscode-languageserver/node';
import { basename } from 'path';

import { Tads3v2Lexer } from './parser/Tads3v2Lexer';
import { Tads3v2Parser } from './parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from './parser/Tads3v2AstVisitor';
import { ProgramNode } from './parser/ast/nodes';
import { astToSymbols, extractTemplateItems } from './parser/Tads3v2AstToSymbols';
import { buildPropertyValueMap } from './parser/Tads3v2PropertyValueMap';

class CollectingErrorListener implements ANTLRErrorListener<any> {
  errors: string[] = [];
  syntaxError(
    _recognizer: Recognizer<any, any>,
    _offendingSymbol: any,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | undefined,
  ): void {
    this.errors.push(`line ${line}:${charPositionInLine} ${msg}`);
  }
}

expose(function parseFunc(path: string, text: string) {
  const fileName  = basename(path);
  const startTime = Date.now();
  const warnings: string[] = [];

  // ── Lex + pre-fill token buffer ──────────────────────────────────────────
  const lexStart = Date.now();
  const lexer    = new Tads3v2Lexer(CharStreams.fromString(text));
  const lexerErrors = new CollectingErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  const lexElapsed = Date.now() - lexStart;

  if (lexerErrors.errors.length > 0) {
    warnings.push(`[${fileName}] Lexer errors (${lexerErrors.errors.length}): ${lexerErrors.errors.slice(0, 5).join('; ')}${lexerErrors.errors.length > 5 ? '...' : ''}`);
  }

  // ── Parse: SLL first, LL fallback ────────────────────────────────────────
  const parseStart = Date.now();
  let parsingMode  = 'SLL';
  const parser     = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();

  let tree;
  try {
    tree = parser.program();
  } catch {
    parsingMode = 'SLL->LL';
    warnings.push(`[${fileName}] SLL failed after ${Date.now() - parseStart}ms, falling back to LL`);
    parser.reset();
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    parser.errorHandler = new DefaultErrorStrategy();
    const parserErrors = new CollectingErrorListener();
    parser.addErrorListener(parserErrors);
    tree = parser.program();
    if (parserErrors.errors.length > 0) {
      warnings.push(`[${fileName}] Parser errors (${parserErrors.errors.length}): ${parserErrors.errors.slice(0, 5).join('; ')}${parserErrors.errors.length > 5 ? '...' : ''}`);
    }
  }
  const parseElapsed = Date.now() - parseStart;

  // ── AST visit ─────────────────────────────────────────────────────────────
  const visitStart = Date.now();
  const visitor    = new Tads3v2AstVisitor();
  const program    = visitor.visit(tree) as ProgramNode;
  const visitElapsed = Date.now() - visitStart;

  // ── Symbol extraction ─────────────────────────────────────────────────────
  const symbolStart = Date.now();
  const symbols: DocumentSymbol[] = astToSymbols(program);
  const symbolElapsed = Date.now() - symbolStart;

  // ── Property value map ────────────────────────────────────────────────────
  const propValStart = Date.now();
  const propertyValues = buildPropertyValueMap(program);
  const propValElapsed = Date.now() - propValStart;

  // ── Template items ────────────────────────────────────────────────────────
  const templateItems = extractTemplateItems(program);

  // ── Keyword map (name → 1-based Range[], matching old worker convention) ──
  const keywords: Map<string, Range[]> = new Map();
  for (const [name, lines] of visitor.keywordLines) {
    keywords.set(name, lines.map(line => Range.create(line, 0, line, 0)));
  }

  const totalElapsed = Date.now() - startTime;

  return {
    symbols,
    keywords,
    propertyValues,
    templateItems,
    mapData:              visitor.mapData,
    additionalProperties: new Map(),
    inheritanceMap:       visitor.inheritanceMap,
    assignmentStatements: [],
    expressionSymbols:    new Map(),
    parseInfo: {
      fileName,
      path,
      parsingMode,
      lexTimeMs:      lexElapsed,
      parseTimeMs:    parseElapsed,
      visitTimeMs:    visitElapsed,
      symbolTimeMs:   symbolElapsed,
      propValTimeMs:  propValElapsed,
      totalTimeMs:    totalElapsed,
      textLength:     text.length,
      symbolCount:    symbols.length,
      errorNodeCount: 0,
      warnings,
    },
  };
});
