import {
  Range,
  Position,
  SymbolKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

export function getVariableNameAtPosition(
  text: string,
  position: Position
): string | null {
  const lines = text.split("\n");
  const line = lines[position.line];
  const prefix = line.substring(0, position.character);
  const match = prefix.match(/(\w+)$/);
  return match ? match[0] : null;
}

export function camelCase(symbolName: any) {
  const first = symbolName[0].toLowerCase();
  const rest = symbolName.substring(1);
  return `${first}${rest}`;
}

export function isSymbolKindOneOf(
  symbolKind: SymbolKind,
  kinds: SymbolKind[]
): boolean {
  if (symbolKind === undefined) {
    return false;
  }
  for (const kind of kinds) {
    if (symbolKind === kind) {
      return true;
    }
  }
  return false;
}

export function getCurrentLine(
  currentDoc: TextDocument,
  cursorPosition: Position
): string {
  let currentLine = currentDoc.getText(
    Range.create(cursorPosition.line, 0, cursorPosition.line + 1, 0)
  );
  return currentLine.substring(0, currentLine.length - 1);
}
