/* eslint-disable @typescript-eslint/no-empty-function */
import { ANTLRErrorListener, BailErrorStrategy, CharStreams, CommonTokenStream, RecognitionException, Recognizer } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads2Lexer } from "./parser/Tads2Lexer";
import { Tads2Listener } from "./parser/Tads2Listener";
import { Tads2Parser } from "./parser/Tads2Parser";
import { Tads2SymbolListener } from "./parser/Tads2SymbolListener";
import { expose } from "threads";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { DocumentSymbol } from "vscode-languageserver/node";
import { basename } from "path";

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
  const fileName = basename(path);
  const startTime = Date.now();
  const symbols: DocumentSymbol[] = [];
  const warnings: string[] = [];

  // --- Lexing ---
  const lexStart = Date.now();
  const input = CharStreams.fromString(text);
  const lexer = new Tads2Lexer(input);
  const lexerErrors = new CollectingErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);
  const tokenStream = new CommonTokenStream(lexer);
  const lexElapsed = Date.now() - lexStart;

  if (lexerErrors.errors.length > 0) {
    warnings.push(`[${fileName}] Lexer errors (${lexerErrors.errors.length}): ${lexerErrors.errors.slice(0, 5).join("; ")}${lexerErrors.errors.length > 5 ? "..." : ""}`);
  }

  // --- Parsing ---
  const parseStart = Date.now();
  let parser = new Tads2Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads2SymbolListener();
  let parseTree;
  let parsingMode = "LL";

  if (path.endsWith(".h")) {
    parsingMode = "SLL";
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.removeErrorListeners();
    parser.errorHandler = new BailErrorStrategy();
    try {
      parseTree = parser.program();
    } catch (err) {
      parsingMode = "SLL->LL fallback";
      warnings.push(`[${fileName}] SLL parsing failed, falling back to LL mode`);
      lexer.reset();
      const tokenStream = new CommonTokenStream(lexer);
      parser = new Tads2Parser(tokenStream);
      parser.interpreter.setPredictionMode(PredictionMode.LL);
      const parserErrors = new CollectingErrorListener();
      parser.removeErrorListeners();
      parser.addErrorListener(parserErrors);
      parseTree = parser.program();
      if (parserErrors.errors.length > 0) {
        warnings.push(`[${fileName}] Parser errors after LL fallback (${parserErrors.errors.length}): ${parserErrors.errors.slice(0, 5).join("; ")}${parserErrors.errors.length > 5 ? "..." : ""}`);
      }
    }
  } else {
    const parserErrors = new CollectingErrorListener();
    parser.removeErrorListeners();
    parser.addErrorListener(parserErrors);
    parseTree = parser.program();
    if (parserErrors.errors.length > 0) {
      warnings.push(`[${fileName}] Parser errors (${parserErrors.errors.length}): ${parserErrors.errors.slice(0, 5).join("; ")}${parserErrors.errors.length > 5 ? "..." : ""}`);
    }
  }
  const parseElapsed = Date.now() - parseStart;

  // --- Tree walking ---
  const walkStart = Date.now();
  listener.currentUri = path;
  let walkError: string | undefined;
  try {
    parseTreeWalker.walk<Tads2Listener>(listener, parseTree);
  } catch (err) {
    walkError = `[${fileName}] parseTreeWalker failed: ${err}`;
  }
  const walkElapsed = Date.now() - walkStart;

  const totalElapsed = Date.now() - startTime;

  return {
    keywords: listener.localKeywords ?? [],
    symbols: listener.symbols ?? symbols,
    additionalProperties: listener.additionalProperties,
    inheritanceMap: listener.inheritanceMap,
    parseInfo: {
      fileName,
      path,
      parsingMode,
      lexTimeMs: lexElapsed,
      parseTimeMs: parseElapsed,
      walkTimeMs: walkElapsed,
      totalTimeMs: totalElapsed,
      textLength: text.length,
      symbolCount: listener.symbols?.length ?? 0,
      warnings,
      walkError,
    },
  };
});
