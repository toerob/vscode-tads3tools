import { TextDocuments } from "vscode-languageserver/node";
import { SymbolKind, CodeActionKind, CodeAction, CodeActionParams } from "vscode-languageserver";
import { TadsSymbolManager, symbolManager } from "./symbol-manager";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { camelCase } from "./utils";
import { isSymbolKindOneOf } from "./utils";
import { getCurrentLine } from "./utils";
import { addShortTermMemoryKeyword } from "./completions";
import { URI } from "vscode-uri";
import { ID } from "./constants";

const lastWordRegExp = new RegExp(/\s*(\w+)[^\w]*(\s*[(].*[)]\s*[;]?)?$/); // RegExp for the Last occurring word
const assignmentRegExp = new RegExp(/\s*(.*)\s*[=]\s*(new\s+)?(.*)\s*/);

// TODO: Make run findSymbol less frequent?
export async function onCodeAction(
  params: CodeActionParams,
  documents: TextDocuments<TextDocument>,
  sm: TadsSymbolManager,
): Promise<CodeAction[]> {
  const actions: CodeAction[] = [];
  const fsPath = URI.parse(params.textDocument.uri).fsPath;

  const currentStartRange = { ...params.range.start };
  currentStartRange.line++;

  /*
  TODO: the "sm.isPositionWithinCodeBlock" restriction works... but only if the document is saved in between.
  If work has been done without saving (which is mostly the case), 
  the parser has no clue if the current rows is within a code block or not.

  This will be a coming improvement.

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
  const currentLine = getCurrentLine(currentDoc, cursorPosition.line);
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
      return [createArrayAssignmentAction(currentLine, params.textDocument.uri, cursorPosition)];
    }
    return [];
  }

  symbolName = match[1];

  let symbol = undefined;

  const startingWord = currentLine.match(/\w/);
  const startPosition = startingWord?.index;
  if (symbolName === "inherited") {
    const result = symbolManager.findContainingObject(fsPath, params.range.start);
    if (result) {
      symbol = { symbol: result, filePath: fsPath };
    }
  } else {
    symbol = sm.findSymbol(symbolName);
  }

  if (symbol?.symbol === undefined) {
    const exp = `(${ID})?\\s*[=]?\\s*(${ID})\\s*([+\\-\\*\\/])\\s*(${ID})([;])?`;
    const aritmethicExpression = new RegExp(exp);
    const aritmethicExpressionMatch = aritmethicExpression.exec(currentLine);
    if (aritmethicExpressionMatch) {
      const variable = aritmethicExpressionMatch[1];
      const left = aritmethicExpressionMatch[2]?.trim();
      const op = aritmethicExpressionMatch[3]?.trim();
      const right = aritmethicExpressionMatch[4]?.trim();
      const end = aritmethicExpressionMatch[5];

      if (left && op && right) {
        return [
          createSumAction(currentLine, params.textDocument.uri, cursorPosition, {
            variable,
            left,
            op,
            right,
            end,
          }),
        ];
      }
    }

    return [];
  }

  const symbolKind = symbol.symbol?.kind;

  if (!(symbolKind && currentLine && startPosition !== undefined && symbolKind)) {
    return [];
  }

  // TODO: refactorize this, for now - it works.
  const hasNew = isSymbolKindOneOf(symbolKind, [SymbolKind.Object, SymbolKind.Class, SymbolKind.Interface]);

  const hasParenthesis = isSymbolKindOneOf(symbolKind, [
    SymbolKind.Object,
    SymbolKind.Class,
    SymbolKind.Interface,
    SymbolKind.Function,
    SymbolKind.Method,
  ]);

  const isMissingParams = hasParenthesis && currentLine.match(/[(].*[)]\s*[;]?\s*$/) === null;

  const isMissingNewKeyword = hasNew && hasParenthesis && currentLine.match(`\\s*new\\s+${symbolName}`) === null;

  const isMissingSemicolon = currentLine.match(/;\s*$/) === null;
  const maybeParenthesis = isMissingParams ? "()" : "";
  const maybeSemicolon = isMissingSemicolon ? ";" : "";
  let maybeNewKeyword = isMissingNewKeyword ? "new " : "";
  let instanceName = currentLine?.trim();
  let variableName = camelCase(symbolName?.trim());

  // Check for already existing variable names, e.g: "xyzzy = new Thing()"
  // - in that case reuse that name

  const variableNameExistsMatcher = assignmentRegExp.exec(instanceName);
  if (variableNameExistsMatcher != null && variableNameExistsMatcher.length > 2) {
    variableName = camelCase(variableNameExistsMatcher[1]?.trim()) ?? undefined;
    if (variableNameExistsMatcher[2]?.trim() === "new") {
      maybeNewKeyword = "new";
    }
    instanceName = variableNameExistsMatcher[3];
  }
  // Cut off the 'get' part for the variable name if this is a typical getter
  if (variableName.startsWith("get") && variableName.length > 3) {
    variableName = camelCase(variableName.substring(3));
  }

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

function createArrayAssignmentAction(currentLine: string, uri: string, cursorPosition: Position): CodeAction {
  const startingWord = currentLine.match(/\[/);
  const startPosition = startingWord?.index;
  return {
    title: "Complete local assignment (array) statement",
    kind: CodeActionKind.RefactorExtract,
    command: {
      title: "Insert local assignment snippet",
      command: "extension.insertLocalAssignmentSnippet",
      arguments: [uri, `local \${1:x} = [];\$0`, cursorPosition.line, startPosition, currentLine.length],
    },
  };
}

function createSumAction(
  currentLine: string,
  uri: string,
  cursorPosition: Position,
  parts: {
    variable: string;
    left: string;
    op: string;
    right: string;
    end: string;
  },
): CodeAction {
  const startingWord = currentLine.match(/\w/);
  const startPosition = startingWord?.index;
  const ending = parts.end ? parts.end : ";";

  let variableName = parts.variable ? parts.variable : "sum";
  if (variableName.startsWith("get") && variableName.length > 3) {
    variableName = variableName.substring(3);
  }

  //const newText = `local \${1:${variableName}} = ${currentLine.trim()}${ending}\$0`;
  const newText = `local \${1:${variableName}} = ${parts.left} ${parts.op} ${parts.right}${ending}\$0`;
  return {
    title: "Complete local assignment (arithmetic) statement",
    kind: CodeActionKind.RefactorExtract,
    command: {
      title: "Insert local assignment snippet",
      command: "extension.insertLocalAssignmentSnippet",
      arguments: [uri, newText, cursorPosition.line, startPosition, currentLine.length],
    },
  };
}
