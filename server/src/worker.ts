/* eslint-disable @typescript-eslint/no-empty-function */
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from './parser/Tads3Lexer';
import { Tads3Listener } from './parser/Tads3Listener';
import { Tads3Parser } from './parser/Tads3Parser';
import Tads3SymbolListener from './parser/Tads3SymbolListener';
import { expose } from 'threads';
import { DocumentSymbol } from 'vscode-languageserver';

expose(function parseFunc(path: string, text: string) {
  const symbols: DocumentSymbol[] = [];
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  const parseTree = parser.program();
  try {
    parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
  } catch (err) {
    console.error(`parseTreeWalker failed ${err}`);
  }
  return listener?.symbols ?? symbols;
});
