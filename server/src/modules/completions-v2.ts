/**
 * completions-v2.ts — Context-aware completion provider.
 *
 * This provider understands where the cursor is (function body, object body,
 * or global scope) and shapes the suggestion list accordingly:
 *
 *   Function / method body
 *     ① Locals visible at cursor (shadowed names resolved to closest declaration)
 *     ② Parameters of the current function
 *     ③ Properties and methods of the enclosing object (when inside a method)
 *     ④ All global symbols + TADS3 keywords + macros
 *
 *   Object body (property/method declaration, but NOT inside a function body)
 *     ① Properties and methods of the object and its supertype chain
 *     ② All global symbols + TADS3 keywords
 *
 *   Global scope
 *     Returns null — falls through to the original completion logic which
 *     already handles object declarations, templates, and direction exits well.
 *
 * Feature toggle
 * ──────────────
 * Set `smartCompletionsEnabled = true` to activate this provider.
 * When false (default), onCompletion() ignores it entirely.
 */

import {
  CompletionItem,
  CompletionItemKind,
  CompletionParams,
  DocumentSymbol,
  InsertTextFormat,
  Position,
  Range,
  SymbolKind,
  TextDocuments,
} from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import fuzzysort = require('fuzzysort');

import { TadsSymbolManager, flattenTreeToArray } from './symbol-manager';
import { FunctionScope, localsVisibleAt } from '../parser/Tads3v2AstScopeBuilder';
import { scopeAt } from './call-hierarchy';
import { getWordAtPosition } from './text-utils';
import { getDefineMacrosMap } from '../parser/preprocessor';
import { TADS3_KEYWORDS } from './constants';
import { createSnippetsFromTemplateItems } from './text-utils';
import { ShallowParser } from './ShallowParser';

const shallowParser = new ShallowParser();

// ── Feature toggle ─────────────────────────────────────────────────────────────

/** Set to true to activate the context-aware completion provider. */
export let smartCompletionsEnabled = true;

export function setSmartCompletionsEnabled(enabled: boolean): void {
  smartCompletionsEnabled = enabled;
}

// ── Context detection ─────────────────────────────────────────────────────────

type CompletionContext =
  | { kind: 'global' }
  | { kind: 'objectBody'; containerName: string }
  /**
   * `scope` is populated when the Tads3v2 scope builder has data for the file
   * (gives params + locals).  It may be null if the file couldn't be parsed by
   * the new parser (e.g. template-syntax objects) — the ShallowParser owner is
   * still reliable in that case.
   */
  | { kind: 'functionBody'; containerName: string | null; scope: FunctionScope | null };

/**
 * Determine where the cursor sits using the ShallowParser as the primary
 * authority.  It works on raw unprocessed text so it is resilient to
 * template syntax, preprocessor directives, and partial edits.
 *
 * The Tads3v2 scope builder is consulted only as an enrichment layer to
 * supply `params` and `locals` when available.
 */
function detectContext(
  textTillCursor: string,
  sm: TadsSymbolManager,
  fsPath: string,
  position: Position,
): CompletionContext {
  const structurized = shallowParser.structurize(textTillCursor);
  // structurize uses 1-based line numbers.
  const lineInfo = structurized.get(position.line + 1);
  const objectDepth = lineInfo?.stateBefore?.objectDepth ?? 0;
  const braceDepth  = lineInfo?.stateBefore?.braceDepth  ?? 0;
  const owner       = lineInfo?.owner ?? null;

  if (objectDepth === 0) return { kind: 'global' };

  if (braceDepth > 0) {
    // Inside a code block → function / method body.
    // Try to enrich with scope builder data (params, locals).
    const scopes = sm.fileScopes.get(fsPath);
    const scope  = scopes ? scopeAt(scopes, position) : null;
    return { kind: 'functionBody', containerName: owner, scope };
  }

  // Inside an object body but not a code block (property assignments, method
  // signatures not yet opened, etc.).
  return { kind: 'objectBody', containerName: owner ?? '' };
}

// ── Suggestion builders ────────────────────────────────────────────────────────

function makeVar(name: string, sortPrefix: string): CompletionItem {
  const item = CompletionItem.create(name);
  item.kind = CompletionItemKind.Variable;
  item.sortText = sortPrefix + name;
  return item;
}

function makeProperty(name: string): CompletionItem {
  const item = CompletionItem.create(name);
  item.kind = CompletionItemKind.Property;
  item.sortText = '2' + name;
  return item;
}

function makeMethod(name: string): CompletionItem {
  const item = CompletionItem.create(name);
  item.kind = CompletionItemKind.Method;
  item.sortText = '2' + name;
  return item;
}

/** Collect all properties and methods of an object plus its full supertype chain. */
function gatherObjectMembers(sm: TadsSymbolManager, containerName: string): CompletionItem[] {
  const items: CompletionItem[] = [];
  const seen = new Set<string>();

  const symbol = sm.findSymbol(containerName)?.symbol;
  if (!symbol) return items;

  // mapHeritage returns Map<superTypeName, ancestorChain[]>.  We collect all
  // chain entries across all immediate supertypes (handles multiple inheritance).
  const ancestorNames: string[] = [...sm.mapHeritage(symbol).values()].flat();
  const chain = [symbol, ...ancestorNames
    .map((n: string) => sm.findSymbol(n)?.symbol)
    .filter((s): s is DocumentSymbol => s !== undefined)];

  for (const s of chain) {
    for (const child of s.children ?? []) {
      if (seen.has(child.name)) continue;
      seen.add(child.name);
      if (child.kind === SymbolKind.Function) items.push(makeMethod(child.name));
      else items.push(makeProperty(child.name));
    }
  }

  return items;
}

/** Add all global symbols — objects, classes, functions — to the list. */
function gatherGlobals(sm: TadsSymbolManager): CompletionItem[] {
  const items: CompletionItem[] = [];
  const seen = new Set<string>();

  for (const file of sm.symbols.keys()) {
    const localKeys = sm.symbols.get(file);
    if (!localKeys) continue;
    for (const sym of flattenTreeToArray(localKeys) ?? []) {
      if (seen.has(sym.name)) continue;
      seen.add(sym.name);
      const item = CompletionItem.create(sym.name);
      item.sortText = '4' + sym.name;
      switch (sym.kind) {
        case SymbolKind.Class:     item.kind = CompletionItemKind.Class; break;
        case SymbolKind.Function:  item.kind = CompletionItemKind.Function; break;
        case SymbolKind.Object:    item.kind = CompletionItemKind.Module; break;
        default:                   item.kind = CompletionItemKind.Value; break;
      }
      items.push(item);
    }
  }

  // Macros
  for (const m of getDefineMacrosMap().keys()) {
    if (!seen.has(m)) {
      seen.add(m);
      const item = CompletionItem.create(m);
      item.kind = CompletionItemKind.Constant;
      item.sortText = '5' + m;
      items.push(item);
    }
  }

  // TADS3 keywords
  for (const kw of TADS3_KEYWORDS) {
    if (!seen.has(kw)) {
      seen.add(kw);
      const item = CompletionItem.create(kw);
      item.kind = CompletionItemKind.Keyword;
      item.sortText = '6' + kw;
      items.push(item);
    }
  }

  return items;
}

/** Build template snippet items for a class name, if templates exist. */
function gatherTemplateItems(sm: TadsSymbolManager, className: string): CompletionItem[] {
  const items: CompletionItem[] = [];
  const { templates, inherited } = sm.getTemplatesFor(className, true, false);
  for (const template of templates) {
    const templateItems = sm.getTemplateItems(template.name);
    if (!templateItems) continue;
    const inheritedSets = inherited.map(t => sm.getTemplateItems(t.name) ?? []);
    const snippets = createSnippetsFromTemplateItems(templateItems, inheritedSets);
    for (const snippet of snippets) {
      const snippetStr = `${className} ${snippet.trimEnd()};$0`;
      const cleanLabel = snippetStr.replace(/\$\{\d+:([^}]+)\}/g, '$1').replace(/\$\d+/g, '');
      const item = CompletionItem.create(cleanLabel);
      item.kind = CompletionItemKind.Snippet;
      item.insertTextFormat = InsertTextFormat.Snippet;
      item.labelDetails = { description: 'template' };
      item.insertText = snippetStr;
      item.sortText = '3' + cleanLabel;
      items.push(item);
    }
  }
  return items;
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Context-aware completion handler.
 *
 * Returns a `CompletionItem[]` when it has a useful response for the current
 * context, or `null` to signal "fall through to the original completions logic".
 */
export function onCompletionV2(
  handler: CompletionParams,
  documents: TextDocuments<TextDocument>,
  sm: TadsSymbolManager,
): CompletionItem[] | null {
  const document = documents.get(handler.textDocument.uri);
  if (!document) return null;

  const fsPath = URI.parse(handler.textDocument.uri).fsPath;
  const position = handler.position;

  const word =
    getWordAtPosition(document, position) ??
    getWordAtPosition(document, Position.create(position.line, position.character - 1)) ??
    '';

  // Full document text from start to cursor — ShallowParser processes this to
  // determine context.  It works on raw, unpreprocessed text so it handles
  // template-syntax objects (`'name' "desc"`) that the Tads3v2 ANTLR parser
  // cannot parse.
  const textTillCursor = document.getText(
    Range.create(0, 0, position.line, position.character),
  );

  // Text of the current line up to the cursor, used for pattern detection.
  const lineUpToCursor = document.getText(
    Range.create(position.line, 0, position.line, position.character),
  );

  // Run ShallowParser once — the owner is shared between self. detection and
  // detectContext (which re-runs structurize internally, but that's fast).
  const structurized = shallowParser.structurize(textTillCursor);
  const shallowLineInfo = structurized.get(position.line + 1); // structurize is 1-based
  const shallowOwner = shallowLineInfo?.owner ?? null;

  // ── self.<partial> — show only the containing object's members ──────────────
  //
  // Matches `self.` optionally followed by a partial identifier.
  // ShallowParser owner is the primary source because it works even when the
  // Tads3v2 ANTLR parser fails (e.g. template-syntax objects).
  const selfDotMatch = /\bself\.(\w*)$/.exec(lineUpToCursor);
  if (selfDotMatch) {
    const partial = selfDotMatch[1]; // empty string when cursor is right after the dot

    // 1. ShallowParser (works on raw text — most resilient)
    // 2. Tads3v2 scope builder (precise line/column range, when parse succeeded)
    // 3. Symbol manager's position-based lookup (last resort)
    let containerName: string | null = shallowOwner;
    if (!containerName) {
      const scopes = sm.fileScopes.get(fsPath);
      containerName = (scopes ? scopeAt(scopes, position)?.def.containerName : null) ?? null;
    }
    if (!containerName) {
      containerName = sm.findContainingObject(fsPath, position)?.name ?? null;
    }

    if (containerName) {
      const members = gatherObjectMembers(sm, containerName);
      if (!partial) return members;
      const results = fuzzysort.go(partial, members, { key: 'label' });
      return results.map((x: any) => x.obj);
    }
    // No container found — fall through to old logic.
    return null;
  }

  const ctx = detectContext(textTillCursor, sm, fsPath, position);

  // ── Global scope: let old logic handle (templates, object decls, etc.) ──────
  if (ctx.kind === 'global') return null;

  const items: CompletionItem[] = [];

  // ── Function / method body ────────────────────────────────────────────────
  if (ctx.kind === 'functionBody') {
    const { scope, containerName } = ctx;

    if (scope) {
      // ① Params — always visible, top priority
      for (const param of scope.params) {
        items.push(makeVar(param, '0'));
      }

      // ② Locals visible at the cursor line (shadowed names resolved automatically)
      for (const local of localsVisibleAt(scope, position.line)) {
        // Skip if a param already claimed this name
        if (scope.params.includes(local)) continue;
        items.push(makeVar(local, '1'));
      }
    }

    // ③ Properties / methods of the enclosing object (implicit self).
    //    Use scope.def.containerName when available; fall back to ShallowParser
    //    owner (reliable even when Tads3v2 parse failed).
    const selfContainer = scope?.def.containerName ?? containerName;
    if (selfContainer) {
      for (const member of gatherObjectMembers(sm, selfContainer)) {
        items.push(member);
      }
    }
  }

  // ── Object body (property / method declaration level) ────────────────────
  if (ctx.kind === 'objectBody') {
    for (const member of gatherObjectMembers(sm, ctx.containerName)) {
      items.push(member);
    }
    // Template snippets for the first word on the line (e.g. `Room` being typed
    // as a property value referencing a supertype).
    if (word) {
      for (const templateItem of gatherTemplateItems(sm, word)) {
        items.push(templateItem);
      }
    }
  }

  // ④ Global symbols, macros, keywords — appended for both contexts
  for (const global of gatherGlobals(sm)) {
    items.push(global);
  }

  if (!word) return items;

  const results = fuzzysort.go(word, items, { key: 'label' });
  return results.map((x: any) => x.obj);
}
