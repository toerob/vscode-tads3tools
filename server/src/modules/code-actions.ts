import {
  CodeAction,
  CodeActionParams,
  TextDocuments,
  CodeActionKind,
  SymbolKind,
  Range,
} from "vscode-languageserver/node";
import { TadsSymbolManager, symbolManager } from "./symbol-manager";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { camelCase } from "./utils";
import { isSymbolKindOneOf } from "./utils";
import { getCurrentLine } from "./utils";
import { addShortTermMemoryKeyword } from "./completions";
import { URI } from "vscode-uri";

const lastWordRegExp = new RegExp(/\s*(\w+)[^\w]*(\s*[(].*[)]\s*[;]?)?$/); // RegExp for the Last occurring word

export async function onCodeAction(
  params: CodeActionParams,
  documents: TextDocuments<TextDocument>,
  sm: TadsSymbolManager
) {
  const actions: CodeAction[] = [];
  const fsPath = URI.parse(params.textDocument.uri).fsPath;

  const currentStartRange = { ...params.range.start };
  currentStartRange.line++;

  /*
  TODO: the "sm.isPositionWithinCodeBlock" restriction works... but only if the document is saved in between.
  If work has been done without saving (which is mostly the case), 
  the parser has no clue if the current rows is within a code block or not.

  One option could be to try to preprocess and parse the incomplete document prior to this, 
    it the preprocessor and parser doesn't break

  This needs to depend on some easier way to determine that. Perhaps a simple regexp that checks the most common ways
  a function and code block can be written.

  const isValidPosition = sm.isPositionWithinCodeBlock(
    fsPath,
    params.range.start
  );
  if (!isValidPosition) {
    return [];
  }  
  */

  const currentDoc = documents.get(params.textDocument.uri);
  if (currentDoc === undefined || params.range?.start === undefined) {
    return [];
  }
  const cursorPosition = params.range.start;
  const currentLine = getCurrentLine(currentDoc, cursorPosition.character);
  if (
    currentLine === undefined ||
    currentLine.match(/\b(for(each)?|local|while|if|else)\b/) // Skip rows with control flow symbols
  ) {
    return [];
  }

  let symbolName = "";

  const match = lastWordRegExp.exec(currentLine); // Extract the last word on this line
  if (match === null) {
    if (currentLine.match(/^\s*\[\s*\]\s*;?$/)) {
      return [
        createArrayAssignmentAction(
          currentLine,
          currentDoc.uri,
          cursorPosition
        ),
      ];
    }
    return [];
  }

  symbolName = match[1];

  let symbol = undefined;

  const startingWord = currentLine.match(/\w/);
  const startPosition = startingWord?.index;
  if (symbolName === "inherited") {
    const result = symbolManager.findContainingObject(
      fsPath,
      params.range.start
    );
    if (result) {
      symbol = { symbol: result, filePath: fsPath };
    }
  } else {
    symbol = sm.findSymbol(symbolName);
  }

  if (symbol === undefined) {
    return [];
  }

  const symbolKind = symbol.symbol?.kind;

  if (
    !(symbolKind && currentLine && startPosition !== undefined && symbolKind)
  ) {
    return [];
  }

  const hasNew = isSymbolKindOneOf(symbolKind, [
    SymbolKind.Object,
    SymbolKind.Class,
    SymbolKind.Interface,
  ]);

  const hasParenthesis = isSymbolKindOneOf(symbolKind, [
    SymbolKind.Object,
    SymbolKind.Class,
    SymbolKind.Interface,
    SymbolKind.Function,
    SymbolKind.Method,
  ]);

  const isMissingParams =
    hasParenthesis && currentLine.match(/[(].*[)]\s*[;]?\s*$/) === null;

  const isMissingNewKeyword =
    hasNew &&
    hasParenthesis &&
    currentLine.match(`\\s*new\\s+${symbolName}`) === null;

  const isMissingSemicolon = currentLine.match(/;\s*$/) === null;
  const maybeNewKeyword = isMissingNewKeyword ? "new " : "";
  const maybeParenthesis = isMissingParams ? "()" : "";
  const maybeSemicolon = isMissingSemicolon ? ";" : "";

  const instanceName = currentLine.trim();
  const variableName = camelCase(symbolName.trim());

  addShortTermMemoryKeyword(variableName);

  actions.push({
    title: "Complete local assignment statement",
    kind: CodeActionKind.RefactorExtract,
    command: {
      title: "Insert local assignment snippet",
      command: "extension.insertLocalAssignmentSnippet",
      arguments: [
        params.textDocument.uri,
        `local \${1:${variableName}} = ${maybeNewKeyword}${instanceName}${maybeParenthesis}${maybeSemicolon}$0`,
        cursorPosition.line,
        startPosition,
        currentLine.length,
      ],
    },
  });
  return actions;
}

function createArrayAssignmentAction(
  currentLine: string,
  uri: string,
  cursorPosition: Position
): CodeAction {
  const startingWord = currentLine.match(/\[/);
  const startPosition = startingWord?.index;
  return {
    title: "Complete local assignment statement",
    kind: CodeActionKind.RefactorExtract,
    command: {
      title: "Insert local assignment snippet",
      command: "extension.insertLocalAssignmentSnippet",
      arguments: [
        uri,
        "local ${1:x} = [];$0",
        cursorPosition.line,
        startPosition,
        currentLine.length,
      ],
    },
  };
}

