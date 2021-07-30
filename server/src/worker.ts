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


type WorkerResult = any;
type WorkerError = string | null;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// The long-running operation
const executeParse = async (test: any): Promise<[WorkerError, WorkerResult?]> => {
  // The `test` variable from the main thread is accessible here
  try {
    return [null, await parseFunc('hej', `object: Room 'hello world';`)];
  } catch (error) {
    return [error];
  }
};

// parentPort allows communication with the parent thread
(async () => {
  parentPort?.postMessage(await executeParse(workerData.test));
})();


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
  } catch(err) {
    console.error(`parseTreeWalker failed ${err}`);
  }
  return listener.symbols;
}