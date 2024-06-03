/* eslint-disable @typescript-eslint/no-empty-function */
import { BailErrorStrategy, CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads2Lexer } from "./parser/Tads2Lexer";
import { Tads2Listener } from "./parser/Tads2Listener";
import { Tads2Parser } from "./parser/Tads2Parser";
import { Tads2SymbolListener } from "./parser/Tads2SymbolListener";
import { expose } from "threads";
import { PredictionMode } from "antlr4ts/atn/PredictionMode";
import { DocumentSymbol } from "vscode-languageserver";

expose(function parseFunc(path: string, text: string) {
  const symbols: DocumentSymbol[] = [];
  const input = CharStreams.fromString(text);
  const lexer = new Tads2Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  let parser = new Tads2Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads2SymbolListener();
  let parseTree;
  if (path.endsWith(".h")) {
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.removeErrorListeners();
    parser.errorHandler = new BailErrorStrategy();
    try {
      parseTree = parser.program();
      console.log(`SLL parsing succeeded for: ${path}`);
    } catch (err) {
      // Silently fail in case SLL fails, error is thrown by BailErrorStrategy
      console.error(`Failing with (faster) SLL parsing for ${path}. Switching predicition mode to LL and retries`);
      lexer.reset();
      const tokenStream = new CommonTokenStream(lexer);
      parser = new Tads2Parser(tokenStream);
      parser.interpreter.setPredictionMode(PredictionMode.LL);
      parseTree = parser.program();
    }
  } else {
    // If file is not a header file, use LL directly to save time:
    parseTree = parser.program();
  }

  listener.currentUri = path;
  try {
    parseTreeWalker.walk<Tads2Listener>(listener, parseTree);
  } catch (err) {
    console.error(`parseTreeWalker failed ${err}`);
  }

  return {
    keywords: listener.localKeywords ?? [],
    symbols: listener.symbols ?? symbols,
    additionalProperties: listener.additionalProperties,
    inheritanceMap: listener.inheritanceMap,
  };
});
