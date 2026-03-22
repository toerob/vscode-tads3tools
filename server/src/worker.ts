/* eslint-disable @typescript-eslint/no-empty-function */
import { ANTLRErrorListener, BailErrorStrategy, CharStreams, CommonTokenStream, RecognitionException, Recognizer } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads3Lexer } from "./parser/Tads3Lexer";
import { Tads3Listener } from "./parser/Tads3Listener";
import { Tads3Parser } from "./parser/Tads3Parser";
import { Tads3SymbolListener, ExtendedDocumentSymbolProperties } from "./parser/Tads3SymbolListener";
import { expose } from "threads";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { DocumentSymbol } from "vscode-languageserver/node";
import { basename } from "path";
import { MapNodeData } from "./modules/mapcrawling/MapNodeData";

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
  const lexer = new Tads3Lexer(input);
  const lexerErrors = new CollectingErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);
  const tokenStream = new CommonTokenStream(lexer);
  const lexElapsed = Date.now() - lexStart;
  tokenStream.fill();

  if (lexerErrors.errors.length > 0) {
    warnings.push(`[${fileName}] Lexer errors (${lexerErrors.errors.length}): ${lexerErrors.errors.slice(0, 5).join("; ")}${lexerErrors.errors.length > 5 ? "..." : ""}`);
  }

  // --- Parsing (SLL-first, LL fallback — standard ANTLR4 two-stage strategy) ---
  const parseStart = Date.now();
  let parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener(path);
  let parseTree;
  let parsingMode = "SLL";

  // Stage 1: Try fast SLL mode first (no full-context prediction)
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.removeErrorListeners();
  parser.errorHandler = new BailErrorStrategy();
  try {
    parseTree = parser.program();
  } catch (err) {
    // Stage 2: SLL failed, fall back to full LL mode
    parsingMode = "SLL->LL fallback";
    const sllElapsed = Date.now() - parseStart;
    warnings.push(`[${fileName}] SLL parsing failed after ${sllElapsed}ms, falling back to LL mode`);
    lexer.reset();
    const tokenStream = new CommonTokenStream(lexer);
    tokenStream.fill();
    parser = new Tads3Parser(tokenStream);
    parser.interpreter.setPredictionMode(PredictionMode.LL);
    const parserErrors = new CollectingErrorListener();
    parser.removeErrorListeners();
    parser.addErrorListener(parserErrors);
    parseTree = parser.program();
    if (parserErrors.errors.length > 0) {
      warnings.push(`[${fileName}] Parser errors after LL fallback (${parserErrors.errors.length}): ${parserErrors.errors.slice(0, 5).join("; ")}${parserErrors.errors.length > 5 ? "..." : ""}`);
    }
  }
  const parseElapsed = Date.now() - parseStart;

  // --- Tree walking ---
  const walkStart = Date.now();
  listener.currentUri = path;
  let walkError: string | undefined;
  try {
    parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
  } catch (err) {
    walkError = `[${fileName}] parseTreeWalker failed: ${err}`;
  }
  const walkElapsed = Date.now() - walkStart;

  const totalElapsed = Date.now() - startTime;

  // Merge listener warnings (collected inside Tads3SymbolListener) into our warnings array
  if (listener.warnings?.length > 0) {
    warnings.push(...listener.warnings);
  }

  // ── Build name-keyed mapData from the listener's identity-keyed additionalProperties ──
  const mapData: Map<string, MapNodeData> = new Map();
  // First pass: create an entry for each object/function symbol
  for (const [sym, props] of listener.additionalProperties) {
    if (props.level !== undefined) {
      mapData.set(sym.name, {
        level: props.level,
        isClass: props.isClass ?? false,
        parentName: props.parent?.name,
        shortName: props.shortName,
        arrowConnection: props.arrowConnection,
        otherSide: props.otherSide,
        at: props.at,
        travelConnectorMap: props.travelConnectorMap ?? new Map(),
        assignedProperties: new Set(),
        superClassRoot: props.superClassRoot,
      });
    }
  }
  // Second pass: collect assignment-style property names into their parent's entry
  for (const [sym, props] of listener.additionalProperties) {
    if (props.isAssignment && props.parent) {
      mapData.get(props.parent.name)?.assignedProperties.add(sym.name);
    }
  }

  return {
    keywords: listener.localKeywords ?? [],
    symbols: listener.symbols ?? symbols,
    mapData,
    additionalProperties: listener.additionalProperties,
    inheritanceMap: listener.inheritanceMap,
    assignmentStatements: listener.assignmentStatements,
    expressionSymbols: listener.expressionSymbols,
    // Diagnostics for the caller
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
      errorNodeCount: listener.errorNodeCount ?? 0,
      warnings,
      walkError,
    },
  };
});
