/* eslint-disable @typescript-eslint/no-empty-function */
import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from './parser/Tads3Lexer';
import { Tads3Listener } from './parser/Tads3Listener';
import { Tads3Parser } from './parser/Tads3Parser';
import { Tads3SymbolListener } from './parser/Tads3SymbolListener';
import { expose } from 'threads';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { Range, DefinitionParams, Location, DocumentSymbol  } from 'vscode-languageserver';
import { connection } from './server';


expose(function parseFunc(path: string, text: string) {
  const symbols: DocumentSymbol[] = [];
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  let parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  let parseTree;
  if (path.endsWith('.h')) {
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.removeErrorListeners();
    parser.errorHandler = new BailErrorStrategy();
    try {
      parseTree = parser.program();
      console.log(`SLL parsing succeeded for. ${path}`);
    } catch (err) {
      // Silently fail in case SLL fails, error is thrown by BailErrorStrategy
      console.error(`Failing with (faster) SLL parsing for ${path}. Switching predicition mode to LL and retries`);
      lexer.reset();
      const tokenStream = new CommonTokenStream(lexer);
      parser = new Tads3Parser(tokenStream);
      parser.interpreter.setPredictionMode(PredictionMode.LL);
      parseTree = parser.program();
    }
  } else {
    // If file is not a header file, use LL directly to save time:			
    parseTree = parser.program();
  }

  listener.currentUri = path;
  try {
    parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
  } catch (err) {
    console.error(`parseTreeWalker failed ${err}`);
  }

  
  return {
    keywords: listener.localKeywords ?? [],
    symbols: listener.symbols ?? symbols,
    additionalProperties: listener.additionalProperties
  };
});
