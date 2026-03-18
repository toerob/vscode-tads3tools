/**
 * template-snippets.ts
 *
 * Compatibility wrapper: parses a raw TADS3 template declaration string
 * (e.g. `Thing template 'vocab' @location? "desc"?;`) into TemplateItemNode[]
 * via the ANTLR v2 parser, then delegates to createSnippetsFromTemplateItems.
 *
 * Used by the test suite and any code that receives raw template source
 * rather than pre-parsed TemplateItemNode[].
 */

import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { Tads3v2Lexer } from '../parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../parser/Tads3v2AstVisitor';
import { TemplateDeclNode, TemplateItemNode } from '../parser/ast/nodes';
import { createSnippetsFromTemplateItems } from './text-utils';

/**
 * Parse `source` as a TADS3 template declaration and return snippet strings.
 *
 * `inheritedSources` should be raw template declaration strings for any
 * `inherited` markers found in `source` (same format as `source`).
 */
export function createTemplateSnippetStrings(
  source: string,
  inheritedSources: string[] = [],
): string[] {
  const items = parseTemplateDeclaration(source);
  const inheritedSets = inheritedSources.map(parseTemplateDeclaration);
  return createSnippetsFromTemplateItems(items, inheritedSets);
}

function parseTemplateDeclaration(source: string): TemplateItemNode[] {
  try {
    const lexer = new Tads3v2Lexer(CharStreams.fromString(source.trim()));
    lexer.removeErrorListeners();
    const tokens = new CommonTokenStream(lexer);
    const parser = new Tads3v2Parser(tokens);
    parser.removeErrorListeners();
    parser.interpreter.setPredictionMode(PredictionMode.SLL);
    parser.errorHandler = new BailErrorStrategy();
    const tree = parser.templateDeclaration();
    const visitor = new Tads3v2AstVisitor();
    const node = visitor.visit(tree) as TemplateDeclNode;
    return node.items ?? [];
  } catch {
    return [];
  }
}
