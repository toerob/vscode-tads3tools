/**
 * dev-ast-handler.ts — Server-side implementation of the developer debug
 * commands "Show AST" and "Show AST + Scopes".
 *
 * Uses the preprocessed text from the server's cache (the same content the
 * real parse worker sees after #include expansion) so that adv3/adv3Lite
 * library macros and includes are already resolved.  Falls back to the raw
 * document text when no preprocessed entry exists for the file.
 */

import {
  BailErrorStrategy,
  CharStreams,
  CommonTokenStream,
  DefaultErrorStrategy,
} from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { TextDocuments } from 'vscode-languageserver';
import { TextDocument }  from 'vscode-languageserver-textdocument';
import { URI }           from 'vscode-uri';

import { CaseInsensitiveMap }     from './CaseInsensitiveMap';
import { Tads3v2Lexer }           from '../parser/Tads3v2Lexer';
import { Tads3v2Parser }          from '../parser/Tads3v2Parser';
import { Tads3v2AstVisitor }      from '../parser/Tads3v2AstVisitor';
import { ProgramNode }            from '../parser/ast/nodes';
import { Tads3v2AstScopeBuilder } from '../parser/Tads3v2AstScopeBuilder';
import { printAst }               from './ast-printer';
import { printScopes }            from './scope-printer';

// ── shared parse helper ───────────────────────────────────────────────────────

function parseContent(content: string): ProgramNode {
  const lexer = new Tads3v2Lexer(CharStreams.fromString(content));
  lexer.removeErrorListeners();
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

  return new Tads3v2AstVisitor().visit(tree) as ProgramNode;
}

function resolveContent(
  params: { uri: string },
  documents: TextDocuments<TextDocument>,
  preprocessedCache: Map<string, string> | CaseInsensitiveMap<string, string>,
): { content: string; source: string } {
  const fsPath = URI.parse(params.uri).fsPath;

  const preprocessed = preprocessedCache.get(fsPath);
  if (preprocessed) {
    return { content: preprocessed, source: 'preprocessed' };
  }

  // Fallback: use the current document text (will lack #include expansions).
  const doc = documents.get(params.uri);
  if (doc) {
    return { content: doc.getText(), source: 'raw (not yet preprocessed)' };
  }

  return { content: '', source: 'not found' };
}

// ── request handlers ──────────────────────────────────────────────────────────

export function handleDevShowAst(
  params: { uri: string },
  documents: TextDocuments<TextDocument>,
  preprocessedCache: Map<string, string> | CaseInsensitiveMap<string, string>,
): { output: string } {
  const { content, source } = resolveContent(params, documents, preprocessedCache);
  if (!content) return { output: `// No content found for ${params.uri}` };

  const program = parseContent(content);
  const header  = `// Source: ${source}\n// URI:    ${params.uri}\n\n`;
  return { output: header + printAst(program) };
}

export function handleDevShowScopes(
  params: { uri: string },
  documents: TextDocuments<TextDocument>,
  preprocessedCache: Map<string, string> | CaseInsensitiveMap<string, string>,
): { output: string } {
  const { content, source } = resolveContent(params, documents, preprocessedCache);
  if (!content) return { output: `// No content found for ${params.uri}` };

  const program = parseContent(content);
  const header  = `// Source: ${source}\n// URI:    ${params.uri}\n\n`;

  const astText = printAst(program);

  const builder = new Tads3v2AstScopeBuilder();
  builder.build(program);
  const scopeText = printScopes(builder.scopes);

  return { output: `${header}${astText}\n\n${'═'.repeat(60)}\n\n${scopeText}` };
}
