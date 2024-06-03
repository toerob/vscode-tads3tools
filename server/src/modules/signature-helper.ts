import { ParameterInformation, Position, SignatureInformation, SymbolKind, TextDocuments } from "vscode-languageserver";
import { SignatureHelp, SignatureHelpParams } from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { retrieveDocumentationForKeyword } from "./documentation";
import { TadsSymbolManager, isClassOrObject, swapToConstructor } from "./symbol-manager";
import { FilePathAndSymbols } from "./types";
import { getCurrentLine } from "./utils";
import { getLineOfMethodDeclaration } from "./utils";
import { extractFunctionNameAndParams } from "./utils";
import { preprocessedFilesCacheMap } from "../server";

let activeParameter = 0;

export async function onSignatureHelp(
  { position, textDocument, context }: SignatureHelpParams,
  documents: TextDocuments<TextDocument>,
  sm: TadsSymbolManager,
): Promise<SignatureHelp> {
  let signatures: SignatureInformation[] = [];
  const activeSignature = context?.activeSignatureHelp?.activeSignature ?? 0; // Set the signature to the last chosen signature
  const currentDocument = documents.get(textDocument.uri);
  if (currentDocument === undefined) {
    return { signatures, activeSignature, activeParameter };
  }
  const currentLine = getCurrentLine(currentDocument, position.line);
  activeParameter = decideSelectedParameter(currentLine, position.character);

  const symbolNameAndParams = extractFunctionNameAndParams(currentLine);
  if (symbolNameAndParams) {
    const { symbolName } = symbolNameAndParams;
    if (symbolName === "construct") {
      return { signatures: [], activeSignature, activeParameter };
    }
    signatures = createSignatures(symbolName, sm);
  }

  return {
    signatures,
    activeSignature,
    activeParameter,
  };
}

function createSignatures(symbolName: string, sm: TadsSymbolManager): SignatureInformation[] {
  const signatures: SignatureInformation[] = [];

  const locations: FilePathAndSymbols[] = sm.findSymbols(symbolName, [
    SymbolKind.Function,
    SymbolKind.Method,
    SymbolKind.Interface,
    SymbolKind.Class,
    SymbolKind.Object,
  ]);

  // Build Signatures from the locations
  for (const location of locations) {
    for (let symbol of location.symbols) {
      const fsPath = location.filePath;

      // If the symbol is a class, swap the symbol for its constructor method
      symbol = isClassOrObject(symbol) ? swapToConstructor(symbol) : symbol;

      if (symbol === undefined) {
        continue;
      }

      const lineOfMethodDeclaration = symbol.range.start.line - 1;
      const signatureLine = getLineOfMethodDeclaration(preprocessedFilesCacheMap, fsPath, lineOfMethodDeclaration);
      if (signatureLine) {
        const signature = createSignature(sm, fsPath, symbol, location, signatureLine);
        signatures.push(signature);
      }
    }
  }
  return signatures;
}

function createSignature(
  sm: TadsSymbolManager,
  fsPath: string,
  symbol: any,
  location: FilePathAndSymbols,
  signatureLine: string,
) {
  // TODO: cannot find intrinsic methods like toString
  const symbolParameters = sm.symbolParameters.get(fsPath)?.get(symbol.name) ?? [];

  const parameters = symbolParameters.map((x) => ParameterInformation.create(x.name));
  const doc = retrieveDocumentationForKeyword(symbol, location.filePath);
  const signature = SignatureInformation.create(signatureLine, doc, ...parameters);
  return signature;
}

/**
 * Figure out which is the current parameter on the line.
 * (Simply counts the commas to decide which is the active parameter )
 *
 * @param currentLine
 * @param cursorPosition
 * @returns n of position
 */
function decideSelectedParameter(currentLine: string, cursorPosition: number) {
  const parametersToCursorPos = currentLine.substring(0, cursorPosition);
  const selectedParameter = parametersToCursorPos.match(/,/g)?.length ?? 0;

  // Note for further improvement:
  // this won't work in cases of passing an array of at least 2 elements ([1,2]) as an argument

  return selectedParameter;
}
