import {
  CompletionParams,
  Position,
  TextDocuments,
  Range,
  CompletionItem,
  CompletionList,
  CompletionItemKind,
  SymbolKind,
  InsertTextFormat,
} from "vscode-languageserver";
import { flattenTreeToArray, TadsSymbolManager, symbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import { connection } from "../server";

import fuzzysort = require("fuzzysort");
import { getWordAtPosition } from "./text-utils";
import { URI } from "vscode-uri";
import { isUsingAdv3Lite } from "../parse-workers-manager";
import { retrieveDocumentationForKeyword } from "./documentation";
import { serverState } from "../state";
import { glob } from "fast-glob";
import { getDefineMacrosMap } from "../parser/preprocessor";

import {
  TADS3_KEYWORDS,
  WS,
  ID,
  DIRECTION_ASSIGNMENT_REGEXP,
  PROPERTY_REGEXP,
  NEW_INSTANCE_REGEXP,
  NEW_ASSIGNMENT_REGEXP,
  ID_U,
} from "./constants";
import { createSnippetsFromTemplateItems } from "./text-utils";
import { ShallowParser } from "./ShallowParser";
import { smartCompletionsEnabled, onCompletionV2 } from "./completions-v2";

let cachedKeyWords: Map<string, CompletionItem> | undefined = undefined;
let shortTermMemoryKeyword: Set<string> = new Set();

const shallowParser = new ShallowParser();

export function clearCompletionCache() {
  connection.console.debug("Clearing keyword cache");
  cachedKeyWords?.clear();
  cachedKeyWords = undefined;
  shortTermMemoryKeyword?.clear();
}

export function addShortTermMemoryKeyword(word: string) {
  if (!shortTermMemoryKeyword.has(word)) {
    shortTermMemoryKeyword?.add(word);
  }
}

export async function onCompletion(
  handler: CompletionParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager,
) {
  const suggestions: Map<string, CompletionItem> = new Map();
  const document = documents.get(handler.textDocument.uri);

  if (document == undefined) {
    return;
  }

  if (document.uri.endsWith(".t3m")) {
    return tads3MakefileSuggestions();
  }

  // ── Smart completions (v2) ─────────────────────────────────────────────────
  // When enabled, run the context-aware provider first.  It returns null for
  // cases it doesn't handle (global scope, specific pattern matches) so this
  // code falls through to the original logic below.
  if (smartCompletionsEnabled) {
    const v2 = onCompletionV2(handler, documents, symbolManager);
    if (v2 !== null) return v2;
  }

  // First try to get the word at the position
  let word = getWordAtPosition(document, handler.position);
  // In case we are right beside the end of the word, try one character backwards before giving up:
  if (word === undefined) {
    word = getWordAtPosition(document, Position.create(handler.position.line, handler.position.character - 1));
  }
  const currentLineRange = Range.create(handler.position.line, 0, handler.position.line, handler.position.character);

  const currentLineStr = document?.getText(currentLineRange) ?? "";
  const fsPath = URI.parse(handler.textDocument.uri).fsPath;
  try {
    if (currentLineStr.match(`${WS}self.${word}`)) {
      const symbol = symbolManager.findContainingObject(fsPath, handler.position);
      if (symbol) {
        const item = CompletionItem.create(symbol.name);
        item.kind = CompletionItemKind.Class;
        suggestions.set(symbol.name, item);

        if (symbol.children) {
          for (const prop of symbol.children) {
            const item = CompletionItem.create(prop.name);
            switch (prop.kind) {
              case SymbolKind.Property:
                item.kind = CompletionItemKind.Property;
                break;
              case SymbolKind.Object:
                item.kind = CompletionItemKind.Class;
                break;
              case SymbolKind.Function:
                item.kind = CompletionItemKind.Function;
                break;
            }
            suggestions.set(symbol.name, item);
          }
        }

        // Add all inherited properties for the object by checking its heritage and lookup all symbols
        const heritage = symbolManager.mapHeritage(symbol);
        for (const ancestorClass of [...heritage.values()][0] ?? []) {
          const result = symbolManager.findSymbol(ancestorClass);
          if (result.symbol) {
            const item = CompletionItem.create(result.symbol.name);
            item.kind = CompletionItemKind.Class;
            suggestions.set(symbol.name, item);
            for (const prop of result.symbol.children ?? []) {
              const item = CompletionItem.create(prop.name);
              switch (prop.kind) {
                case SymbolKind.Property:
                  item.kind = CompletionItemKind.Property;
                  break;
                case SymbolKind.Object:
                  item.kind = CompletionItemKind.Class;
                  break;
                case SymbolKind.Function:
                  item.kind = CompletionItemKind.Function;
                  break;
              }
              suggestions.set(symbol.name, item);
            }
          }
        }

        const results = fuzzysort.go(word, [...suggestions.values()], { key: "label" });
        return results.map((x: any) => x.obj);
      }
    }

    // An object declaration where the word is a class, show all class alternatives:
    const objDeclarationMatcher = new RegExp(`${WS}(class)?(${ID_U})${WS}[:]${WS}(${ID}${WS},${WS})*${word}`, "u");
    const objDeclarationMatcherResult = objDeclarationMatcher.exec(currentLineStr);
    if (objDeclarationMatcherResult) {
      connection.console.debug(`Matching object declaration for: "${word}"`);
      const classNames = [...symbolManager.inheritanceMap.keys()];
      for (const className of classNames) {
        const item = CompletionItem.create(className);
        item.kind = CompletionItemKind.Class;
        suggestions.set(item.label, item);
      }
      if (word === undefined) {
        return [...suggestions];
      }

      // Add a base object suggestion
      const item = CompletionItem.create("object");
      item.kind = CompletionItemKind.Snippet;
      item.insertTextFormat = InsertTextFormat.Snippet;
      item.insertText = "object { $1 }$0";
      item.preselect = true;
      suggestions.set(item.label, item);

      let templateCompletionItems: CompletionItem[] = [];

      const rangeFromStartToCursor = Range.create(0, 0, handler.position.line, handler.position.character);
      const textTillCursor = document.getText(rangeFromStartToCursor);
      const result = shallowParser.structurize(textTillCursor);
      const lineInfo = result.get(handler.position.line + 1);
      let isWithinObject = (lineInfo?.stateBefore?.objectDepth ?? 0) > 0;
      const results = fuzzysort.go(word, [...suggestions.values()], { key: "label" });

      results.forEach((x) => {
        const { templates, inherited } = symbolManager.getTemplatesFor(x.obj.label, true, false);
        for (const template of templates) {
          const items = symbolManager.getTemplateItems(template.name);
          if (items) {
            const inheritedSets = inherited.map((t) => symbolManager.getTemplateItems(t.name) ?? []);
            const snippets = createSnippetsFromTemplateItems(items, inheritedSets);
            for (const snippet of snippets) {
              const snippetString = `${x.obj.label} ${isWithinObject ? "{" : ""} ${snippet.trimEnd()}${isWithinObject ? "}" : ";$0"}`;
              const cleanLabel = snippetString.replace(/\$\{\d+:([^}]+)\}/g, "$1").replace(/\$\d+/g, "");
              const item = CompletionItem.create(cleanLabel);
              item.kind = CompletionItemKind.Snippet;
              item.insertTextFormat = InsertTextFormat.Snippet;
              item.labelDetails = { description: "template" };
              item.insertText = snippetString;
              templateCompletionItems.push(item);
            }
          }
        }
      });

      return templateCompletionItems;
    }

    // Matches a direction assignment, collect all symbols inheriting TravelConnector
    // And return all suggestions if no word have been written, otherwise fuzzysort it
    // on the word written so far:

    const result = DIRECTION_ASSIGNMENT_REGEXP.exec(currentLineStr);
    if (result && result.length > 0) {
      connection.console.debug(`Matching direction assignment for: "${word}"`);
      for (const key of symbolManager.symbols.keys()) {
        for (const symbol of symbolManager.symbols.get(key) ?? []) {
          if (symbol.kind === SymbolKind.Object) {
            const inheritanceMap = symbolManager.mapHeritage(symbol);
            const commonRoomType = isUsingAdv3Lite() ? "Room" : "TravelConnector";
            const addSymbol = inheritanceMap.get(symbol.detail)?.includes(commonRoomType);
            if (addSymbol) {
              const item = CompletionItem.create(symbol.name);
              item.kind = CompletionItemKind.Struct;
              applyDocumentation(item);
              suggestions.set(symbol.name, item);
            }
          }
        }
      }
      if (word === undefined) {
        return [...suggestions];
      }
      const results = fuzzysort.go(word, [...suggestions.values()], { key: "label" });
      connection.console.debug(results.map((x) => x.obj.label).join(","));
      return results.map((x: any) => x.obj);
    }
  } catch (err) {
    console.error(err);
  }

  const usedUpKeys = new Set();

  if (!cachedKeyWords) {
    const startTime = Date.now();
    connection.console.debug("Creating cache for word completion");

    for (const file of symbolManager.keywords.keys()) {
      const localKeys = symbolManager.keywords.get(file);
      if (localKeys) {
        for (const key of localKeys?.keys() ?? []) {
          if (usedUpKeys.has(key)) {
            continue;
          }
          usedUpKeys.add(key);
          const item = CompletionItem.create(key);
          item.kind = CompletionItemKind.Keyword;
          suggestions.set(key, item);

          // Add all the short-form for the Action(s) as keywords also
          // TODO: Note, room for improvement: we could accidentally match an
          // object or class that follows the same convention. Better to
          // keep track of the actions via the macros
          if (key.match(/^[A-Z][a-z]+Action$/)) {
            const item = CompletionItem.create(key.slice(0, -6));
            item.kind = CompletionItemKind.TypeParameter;
            applyDocumentation(item);
            suggestions.set(key, item);
          }
        }
      }
    }

    // Add all macros
    for (const m of getDefineMacrosMap().keys()) {
      suggestions.set(m, CompletionItem.create(m));
    }

    // Add known symbols
    for (const file of symbolManager.symbols.keys()) {
      const localKeys = symbolManager.symbols.get(file);
      if (localKeys) {
        const flattened = flattenTreeToArray(localKeys);
        if (flattened) {
          for (const value of flattened?.values() ?? []) {
            if (usedUpKeys.has(value.name)) {
              continue;
            }
            usedUpKeys.add(value.name);
            const item = CompletionItem.create(value.name);
            applyDocumentation(item);
            suggestions.set(value.name, item);
          }
        }
      }
    }

    // Add common tads3 keywords
    for (const keyword of TADS3_KEYWORDS) {
      const item = CompletionItem.create(keyword);
      item.kind = CompletionItemKind.Keyword;

      suggestions.set(item.label, item);
    }

    const objectItem = CompletionItem.create("object");
    objectItem.kind = CompletionItemKind.Snippet;
    objectItem.insertTextFormat = InsertTextFormat.Snippet;
    objectItem.insertText = "object { $1 }$0";
    objectItem.preselect = true;
    suggestions.set(objectItem.label, objectItem);

    cachedKeyWords = suggestions;

    const elapsedTime = Date.now() - startTime;
    connection.console.debug(`Updating cache with keywords, elapsed time = ${elapsedTime} ms`);
  }

  // When matching "local x = new " -> return all classes as suggestion
  const newInstanceMatch = NEW_INSTANCE_REGEXP.exec(currentLineStr);
  if (newInstanceMatch && newInstanceMatch.length > 0 && newInstanceMatch[1]) {
    return getSuggestedClassNames(newInstanceMatch[1]);
  }

  const memberCallMatch = PROPERTY_REGEXP.exec(currentLineStr);
  if (memberCallMatch && memberCallMatch.length > 1 && memberCallMatch[1]) {
    const isInline = memberCallMatch[2] && memberCallMatch[2].startsWith("(");
    if (isInline) {
      const className = memberCallMatch[1];
      return getSuggestedProperty(
        handler.position.line,
        document!,
        className,
        memberCallMatch[1],
        memberCallMatch[3] ?? "",
      );
    }

    const word = memberCallMatch[1];
    const fsPath = URI.parse(handler.textDocument.uri).fsPath;
    const localAssignments = symbolManager.assignmentStatements.get(fsPath) ?? [];
    const foundMatches = localAssignments.filter((x) => x.name === word);
    if (foundMatches.length > 0) {
      const detail = foundMatches[0]?.detail;
      let className = detail;
      if (detail) {
        const resultOfRegexp = NEW_ASSIGNMENT_REGEXP.exec(detail);
        if (resultOfRegexp) {
          className = resultOfRegexp[2].trim();
        }
      }
      if (className) {
        const variableName = memberCallMatch[1];
        return getSuggestedProperty(
          handler.position.line,
          document!,
          variableName,
          className,
          memberCallMatch[3] ?? "",
        );
      }
    }
  }

  // Add local keywords that hasn't yet been compiled and because of this isn't part
  // of the collection
  for (const word of [...shortTermMemoryKeyword]) {
    cachedKeyWords?.set(word, CompletionItem.create(word));
  }
  shortTermMemoryKeyword.clear();

  const results = fuzzysort.go(word, [...cachedKeyWords.values()], { key: "label" });
  return results.map((x: any) => x.obj);
}

function applyDocumentation(item: CompletionItem) {
  let documentation = "";
  const symbolSearchResult = symbolManager.findSymbols(item.label, [SymbolKind.Class]);
  if (symbolSearchResult && symbolSearchResult.length > 0) {
    for (const eachPathAndSymbolResult of symbolSearchResult) {
      const filePath = eachPathAndSymbolResult.filePath;
      if (filePath) {
        for (const symbol of eachPathAndSymbolResult.symbols) {
          const classDoc = retrieveDocumentationForKeyword(symbol, filePath);
          if (classDoc) {
            documentation += `${classDoc}\r\n (source: ${filePath})\n\n`;
          }
        }
      }
    }
  }
  if (documentation.length > 0) {
    item.documentation = documentation;
    item.detail = documentation;
  }
}

function tads3MakefileSuggestions(): CompletionItem[] | CompletionList {
  const suggestions = [...(serverState.fileBasePaths?.values() ?? [])]
    .flatMap((x) =>
      glob.sync("**/*.{t,h}", {
        cwd: x.fsPath,
        onlyFiles: true,
        ignore: ["*.{t3s,t3o}"],
      }),
    )
    .map((x) => {
      const itemPathWithoutExt = x.replace(/[.][th]$/, "");
      const completionItem = CompletionItem.create(itemPathWithoutExt);
      return completionItem;
    });
  suggestions.push(CompletionItem.create("source"));
  suggestions.push(CompletionItem.create("lib"));
  return suggestions;
}

function getSuggestedClassNames(partialClassWord: string) {
  const suggestions = symbolManager
    .getAllWorkspaceSymbols(false)
    .filter((x) => x.kind === SymbolKind.Class || x.kind === SymbolKind.Object || x.kind === SymbolKind.Interface)
    .map((x) => {
      const item = CompletionItem.create(x.name);
      item.kind = CompletionItemKind.Class;
      applyDocumentation(item);
      item.insertText = x.name + "($1)$0";
      item.kind = CompletionItemKind.Snippet;
      item.insertTextFormat = InsertTextFormat.Snippet;
      item.command = {
        command: "editor.action.triggerParameterHints",
        title: "Trigger Parameter Hints",
      };
      return item;
    });

  if (partialClassWord === "") {
    return suggestions;
  }

  const results = fuzzysort.go(partialClassWord, [...suggestions], {
    key: "label",
  });

  return results.map((x: any) => x.obj);
}

function getSuggestedProperty(
  line: number,
  document: TextDocument,
  variableName: string,
  className: string | undefined,
  partialPropertyWord: string,
) {
  if (className === undefined) {
    return [];
  }

  const classSymbol = symbolManager.findSymbol(className)?.symbol;

  let containerNames: string[] = [className];

  if (classSymbol !== undefined) {
    const heritageMap = symbolManager.mapHeritage(classSymbol);
    const classNames = [...heritageMap.values()]?.[0] ?? [];
    containerNames = [className, ...classNames];
  }

  const propertyNames = symbolManager
    .getAllWorkspaceSymbols(false)
    .filter((symbol) => {
      return (
        symbol.containerName !== undefined &&
        containerNames.includes(symbol.containerName) &&
        (symbol.kind === SymbolKind.Property || symbol.kind === SymbolKind.Method)
      );
    })
    .map((x) => x.name);

  const uniquePropertyNames = [...new Set(propertyNames).values()];
  const propertyNameSuggestions = uniquePropertyNames.map(CompletionItem.create);

  if (partialPropertyWord === "") {
    return propertyNameSuggestions;
  }

  const results = fuzzysort.go(partialPropertyWord, propertyNameSuggestions, {
    key: "label",
  });

  return results.map((x: any) => x.obj);
}
