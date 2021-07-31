/* eslint-disable @typescript-eslint/no-empty-function */
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { T3ParserLexer } from './parser/T3ParserLexer';
import { T3ParserListener } from './parser/T3ParserListener';
import { T3ParserParser } from './parser/T3ParserParser';
import Tads3SymbolListener from './parser/Tads3SymbolListener';
import { expose } from 'threads';
import { DocumentSymbol } from 'vscode-languageserver';

expose(function parseFunc(path: string, text: string) {
  const symbols: DocumentSymbol[] = [];
  const input = CharStreams.fromString(text);
  const lexer = new T3ParserLexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new T3ParserParser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  const parseTree = parser.program();
  try {
    parseTreeWalker.walk<T3ParserListener>(listener, parseTree);
  } catch (err) {
    console.error(`parseTreeWalker failed ${err}`);
  }
  return listener?.symbols ?? symbols;
});
