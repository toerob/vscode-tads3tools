import {
  CompletionParams,
  Position,
  TextDocuments,
  Range,
  CompletionItem,
  CompletionList,
  CompletionItemKind,
  SymbolKind,
} from "vscode-languageserver/node";
import { flattenTreeToArray, TadsSymbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import { connection } from "../server";
import { symbolManager } from "./symbol-manager";

import fuzzysort = require("fuzzysort");
import { getWordAtPosition } from "./text-utils";
import { URI } from "vscode-uri";
import { isUsingAdv3Lite } from "../parse-workers-manager";
import { retrieveDocumentationForKeyword } from "./documentation";
import { serverState } from "../state";
import { glob } from "glob";
import { getDefineMacrosMap } from "../parser/preprocessor";
import {
  TADS3_KEYWORDS,
  WS,
  ID,
  DIRECTION_ASSIGNMENT_REGEXP,
  PROPERTY_REGEXP,
  NEW_INSTANCE_REGEXP,
  NEW_ASSIGNMENT_REGEXP,
} from "./constants";

let cachedKeyWords: Set<CompletionItem> | undefined = undefined;

export function clearCompletionCache() {
  connection.console.debug("Clearing keyword cache");
  cachedKeyWords?.clear();
  cachedKeyWords = undefined;
}

export async function onCompletion(
  handler: CompletionParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
) {
  const methodStartTime = Date.now();

  const suggestions: Set<CompletionItem> = new Set();
  const document = documents.get(handler.textDocument.uri);
  const range = Range.create(
    handler.position.line,
    0,
    handler.position.line,
    handler.position.character
  );
  const lineTillCurrentPos = document?.getText(range) ?? "";

  if (document?.uri.endsWith(".t3m")) {
    return tads3MakefileSuggestions();
  }

  let word = getWordAtPosition(document, handler.position);
  // We might be right at the end of the word, try one character backwards before giving up:
  if (word === undefined) {
    word = getWordAtPosition(
      document,
      Position.create(handler.position.line, handler.position.character - 1)
    );
  }

  const currentLineRange = Range.create(
    handler.position.line,
    0,
    handler.position.line,
    handler.position.character
  );
  const currentLineStr = document?.getText(currentLineRange) ?? "";
  //const characterOffset = offsetAt(document, handler.position);

  try {
    // match "self[.](.*)"
    if (currentLineStr.match(`${WS}self.${word}`)) {
      //TODO: default also?
      const fsPath = URI.parse(handler.textDocument.uri).fsPath;
      const symbol = symbolManager.findContainingObject(
        fsPath,
        handler.position
      );
      if (symbol) {
        const item = CompletionItem.create(symbol.name);
        item.kind = CompletionItemKind.Class;
        suggestions.add(item);

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
            suggestions.add(item);
          }
        }

        // Add all inherited properties for the object by checking its heritage and lookup all symbols
        const heritage = symbolManager.mapHeritage(symbol);
        connection.console.debug([...heritage].join(","));
        for (const ancestorClass of [...heritage.values()][0] ?? []) {
          const result = symbolManager.findSymbol(ancestorClass);
          if (result.symbol) {
            const item = CompletionItem.create(result.symbol.name);
            item.kind = CompletionItemKind.Class;
            suggestions.add(item);
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
              suggestions.add(item);
            }
          }
        }

        const results = fuzzysort.go(word, [...suggestions], { key: "label" });
        connection.console.debug(results.map((x) => x.obj.label).join(","));
        return results.map((x: any) => x.obj);
      }
    }

    // An object declaration where the word is a class, show all class alternatives:
    if (
      currentLineStr.match(`${WS}(class)?${ID}${WS}:${WS}${word}`) ||
      currentLineStr.match(
        `${WS}(class)?${ID}${WS}:${WS}(${ID}${WS},${WS})*${word}`
      )
    ) {
      connection.console.debug(`Matching object declaration for: "${word}"`);
      const classNames = [...symbolManager.inheritanceMap.keys()];
      for (const className of classNames) {
        const item = CompletionItem.create(className);
        item.kind = CompletionItemKind.Class;
        applyDocumentation(item);
        suggestions.add(item);
      }
      if (word === undefined) {
        return [...suggestions];
      }

      const results = fuzzysort.go(word, [...suggestions], { key: "label" });
      //connection.console.debug(results.map(x=>x.obj.label).join(','));
      return results.map((x: any) => x.obj);
    }

    // Matches a direction assignment, collect all symbols inheriting TravelConnector
    // And return all suggestions if no word have been written, otherwise fuzzysort it
    // on the word written so far:

    const result = DIRECTION_ASSIGNMENT_REGEXP.exec(currentLineStr);
    if (result && result.length > 0) {
      //word ??= '';
      connection.console.debug(`Matching direction assignment for: "${word}"`);
      for (const key of symbolManager.symbols.keys()) {
        for (const symbol of symbolManager.symbols.get(key) ?? []) {
          if (symbol.kind === SymbolKind.Object) {
            const inheritanceMap = symbolManager.mapHeritage(symbol);
            const commonRoomType = isUsingAdv3Lite()
              ? "Room"
              : "TravelConnector";
            const addSymbol = inheritanceMap
              .get(symbol.detail)
              ?.includes(commonRoomType);
            if (addSymbol) {
              const item = CompletionItem.create(symbol.name);
              item.kind = CompletionItemKind.Struct;
              applyDocumentation(item);
              suggestions.add(item);
            }
          }
        }
      }
      if (word === undefined) {
        return [...suggestions];
      }
      const results = fuzzysort.go(word, [...suggestions], { key: "label" });
      connection.console.debug(results.map((x) => x.obj.label).join(","));
      return results.map((x: any) => x.obj);
    }
  } catch (err) {
    console.error(err);
  }

  const usedUpKeys = new Set();

  if (!cachedKeyWords) {
    const startTime = Date.now();
    connection.console.debug("Collecting keywords");

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
          if (!suggestions.has(item)) {
            //connection.console.debug(`Adding ${key} for ${file}`);
            suggestions.add(item);
          }
        }
      }
    }

    // Add all macros
    for (const m of getDefineMacrosMap().keys()) {
      suggestions.add(CompletionItem.create(m));
    }

    // Add known symbols
    for (const file of symbolManager.symbols.keys()) {
      const localKeys = symbolManager.symbols.get(file);
      if (localKeys) {
        const flattened = flattenTreeToArray(localKeys); //.filter(x=>x.kind === SymbolKind.Object)
        if (flattened) {
          for (const value of flattened?.values() ?? []) {
            if (usedUpKeys.has(value.name)) {
              continue;
            }
            usedUpKeys.add(value.name);
            const item = CompletionItem.create(value.name);
            item.kind = CompletionItemKind.Class;
            applyDocumentation(item);
            suggestions.add(item);
          }
        }
      }
    }

    // Add common tads3 keywords
    for (const keyword of TADS3_KEYWORDS) {
      const item = CompletionItem.create(keyword);
      item.kind = CompletionItemKind.Keyword;
      suggestions.add(item);
    }

    cachedKeyWords = suggestions;
    const elapsedTime = Date.now() - startTime;
    connection.console.debug(
      `Updating cache with keywords, elapsed time = ${elapsedTime} ms`
    );
  }

  // TODO: Experimenting
  // if (results.length == 0) {
  // When matching "local x = new " -> return all classes as suggestion
  // Match any assignment and add classes if keyword new is used

  // TODO: check if inside code block for these
  {
    const newInstanceMatch = NEW_INSTANCE_REGEXP.exec(currentLineStr);
    if (
      newInstanceMatch &&
      newInstanceMatch.length > 0 &&
      newInstanceMatch[1]
    ) {
      return getSuggestedClassNames(newInstanceMatch[1]);
    }

    const memberCallMatch = PROPERTY_REGEXP.exec(currentLineStr);
    if (memberCallMatch && memberCallMatch.length > 1 && memberCallMatch[1]) {
      // TODO: handle this the same way as below. Change the listnener if needs be
      // TODO: find variable assignments instead and figure out the scope
      const isInline = memberCallMatch[2] && memberCallMatch[2].startsWith("(");
      if (isInline) {
        const className = memberCallMatch[1];
        return getSuggestedProperty(
          handler.position.line,
          document!,
          className,
          memberCallMatch[1],
          memberCallMatch[3] ?? ""
        );
      }

      const word = memberCallMatch[1];
      const fsPath = URI.parse(handler.textDocument.uri).fsPath;
      const localAssignments =
        symbolManager.assignmentStatements.get(fsPath) ?? [];
      const foundMatches = localAssignments.filter((x) => x.name === word);
      if (foundMatches.length > 0) {
        // TODO: decide the one match with most closest scope around this
        const detail = foundMatches[0]?.detail; // TODO: handle undefined... listener should add this detail?

        let className = detail;
        if (detail) {
          const resultOfRegexp = NEW_ASSIGNMENT_REGEXP.exec(detail);
          if (resultOfRegexp) {
            className = resultOfRegexp[2].trim();
          }
        }
        connection.console.log(foundMatches[0]?.name);

        // TODO: now details isn't just holding the class name anymore, but also the whole expression
        //const TODO = symbolManager.assignmentDeclarations.get(fsPath)?.get(word);

        if (className) {
          connection.console.log(className);
          const variableName = memberCallMatch[1];
          return getSuggestedProperty(
            handler.position.line,
            document!,
            variableName,
            className,
            memberCallMatch[3] ?? ""
          );
        }
      }
    }
  }

  const results = fuzzysort.go(word, [...cachedKeyWords], { key: "label" });
  const mappedResults = results.map((x: any) => x.obj);
  const methodTookMs = Date.now() - methodStartTime;
  connection.console.debug(
    `Completion took ${methodTookMs} ms+`
  );
  return mappedResults;
}

function applyDocumentation(item: CompletionItem) {
  let documentation = "";
  const symbolSearchResult = symbolManager.findSymbols(item.label, [
    SymbolKind.Class,
  ]);
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
  }
}

function tads3MakefileSuggestions(): CompletionItem[] | CompletionList {
  const suggestions = [...(serverState.fileBasePaths?.values() ?? [])]
    .flatMap((x) =>
      glob.sync("**/*.{t,h}", {
        cwd: x.fsPath,
        nodir: true,
        ignore: "*.{t3s,t3o}",
      })
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
    .filter((x) => x.kind == SymbolKind.Class)
    .map((x) => {
      const item = CompletionItem.create(x.name);
      item.kind = CompletionItemKind.Class;
      applyDocumentation(item);
      return item;
    });

  if (partialClassWord === "") {
    return suggestions;
  }

  const results = fuzzysort.go(partialClassWord, [...suggestions], {
    key: "label",
  });

  /*connection.console.debug(
    `Suggestions: ${results.map((x) => x.obj.label).join(" ")}`
  );*/
  return results.map((x: any) => x.obj);
}

function getSuggestedProperty(
  line: number,
  document: TextDocument,
  variableName: string,
  className: string | undefined,
  partialPropertyWord: string
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
        (symbol.kind === SymbolKind.Property ||
          symbol.kind === SymbolKind.Method)
      );
    })
    .map((x) => x.name);

  const uniquePropertyNames = [...new Set(propertyNames).values()];
  const propertyNameSuggestions = uniquePropertyNames.map(
    CompletionItem.create
  );

  if (partialPropertyWord === "") {
    return propertyNameSuggestions;
  }

  const results = fuzzysort.go(partialPropertyWord, propertyNameSuggestions, {
    key: "label",
  });

  connection.console.debug(
    `Suggestions: ${results.map((x) => x.obj.label).join(" ")}`
  );
  const mappedResult = results.map((x: any) => x.obj);
  return mappedResult;
}
