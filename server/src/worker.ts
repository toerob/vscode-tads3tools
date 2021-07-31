/* eslint-disable @typescript-eslint/no-empty-function */
import { parse } from 'path/posix';
import { BailErrorStrategy, CharStreams, CodePointCharStream, CommonTokenStream, ConsoleErrorListener, DefaultErrorStrategy } from 'antlr4ts';
import { parentPort, workerData } from 'worker_threads';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { T3ParserLexer } from './parser/T3ParserLexer';
import { T3ParserListener } from './parser/T3ParserListener';
import { ProgramContext, StatsContext, T3ParserParser } from './parser/T3ParserParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
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



/*
type WorkerResult = any;
type WorkerError = string | null;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const executeParse = async (path: string, text: string): Promise<[WorkerError, WorkerResult?]> => {
  try {

    return [null, await parseFunc(path, text)];

  } catch (error) {
    return [error];
  }
};

async function parseFunc(path: string, text: string) {
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
  return listener.symbols;
}

(async () => parentPort?.postMessage(await executeParse(workerData.path, workerData.text)))();

*/