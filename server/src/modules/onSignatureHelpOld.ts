import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import {
  ParameterInformation,
  SignatureInformation,
  SymbolKind,
  TextDocuments,
} from "vscode-languageserver";
import {
  DocumentSymbol,
  SignatureHelp,
  SignatureHelpParams,
} from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as languageserver from "vscode-languageserver/node";
import { URI } from "vscode-uri";
import { Tads3Lexer } from "../parser/Tads3Lexer";
import { Tads3Listener } from "../parser/Tads3Listener";
import { Tads3Parser } from "../parser/Tads3Parser";
import Tads3SymbolListenerParameterCollector from "../parser/Tads3SymbolListenerCallStatement";
import { simpleWholeLineRegExp, wholeLineRegExp } from "../parser/preprocessor";
import { connection, preprocessedFilesCacheMap } from "../server";
import { retrieveDocumentationForKeyword } from "./documentation";
import { TadsSymbolManager } from "./symbol-manager";
import { FilePathAndSymbols } from "./types";

const idWithParametersRegexp1 = /\s*(.*)[(](.*)?[)]/;
const idWithParametersRegexp2 = /\s*([a-zA-Z][a-zA-Z0-9]*)\s*[(](.*)?[)]/;

let activeParameter = 0;
let activeSignature = 0;

export async function onSignatureHelpOld(
  handler: SignatureHelpParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
): Promise<SignatureHelp> {
  const { position, textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);
  let signatures: SignatureInformation[] = [];

  const fsPath = URI.parse(handler.textDocument.uri).fsPath;

  if (currentDocument === undefined) {
    return { signatures, activeSignature, activeParameter };
  }

  const currentLineAtPos = currentDocument
    .getText()
    .split(simpleWholeLineRegExp)[position.line];

  if (currentLineAtPos === undefined) {
    return { signatures, activeSignature, activeParameter };
  }

  // Get the function name + params using regexp
  const currentDocIdWithParamsMatch =
    idWithParametersRegexp1.exec(currentLineAtPos);

  const userEnteredParameters = parseToParameterList(currentLineAtPos);

  if (userEnteredParameters.length === 0) {
    activeParameter = 0;
  }

  if (currentDocIdWithParamsMatch && currentDocIdWithParamsMatch.length >= 3) {
    for (let nr = 0; nr < userEnteredParameters.length; nr++) {
      const param = userEnteredParameters[nr];
      // TODO: replace predicate with range intersection
      if (
        position.character >= param.range.start.character + 1 &&
        position.character <= param.range.end.character + 1
      ) {
        activeParameter = nr > 0 ? nr : 0;
        break;
      }
    }

    // TODO: snygga till
    const currentDocIdWithParamsMatch2 = idWithParametersRegexp2.exec(currentLineAtPos);
    const symbolName = currentDocIdWithParamsMatch2?.[1]; //
    if (symbolName) {
      const locations: FilePathAndSymbols[] = symbolManager.findSymbols(
        symbolName,
        [
          SymbolKind.Function,
          SymbolKind.Method,
          SymbolKind.Interface,
          SymbolKind.Class,
          SymbolKind.Object,
        ]
      );

      if (symbolName === "construct") {
        return { signatures, activeSignature, activeParameter };
      }

      // TODO: måste kolla på nuvarande sträng, inte i andra filen som här:
      //const activeParameterStr = symbolParameters.find((x) => isPositionWithinRange(position, x.range))?.detail ?? '0';
      //activeParameter = parseInt(activeParameterStr);
      
      const signaturesFromClass = getSignatures(locations, fsPath, symbolManager, position);
      /*getParametersFromSignature2(
        signaturesFromClass,
        currentLineAtPos
      )*/


      return {
        signatures: signaturesFromClass,
        activeSignature,
        activeParameter,
      };
    }
  }

  // Keep the state of the last chosen signature so that the cursor can move sideways without changing it.
  activeSignature = handler.context?.activeSignatureHelp?.activeSignature ?? 0;

  //activeParameter = currentLineAtPos.split(/,/).length - 1;
  activeParameter = 1;
  return {
    signatures,
    activeSignature,
    activeParameter,
  };
}

function getSignatures(
  locations: FilePathAndSymbols[],
  fsPath: string,
  symbolManager: TadsSymbolManager,
  position: languageserver.Position
): SignatureInformation[] {
  const signatures: SignatureInformation[] = [];
  for (const location of locations) {
    for (let symbolToBe of location.symbols) {
      const symbol = isClassOrObject(symbolToBe)
        ? swapSymbolForConstructor(symbolToBe)
        : symbolToBe;

      if (symbol === undefined) {
        continue;
      }

      const preprocessedDoc = preprocessedFilesCacheMap.get(location.filePath);
      const preprocessedFileAsArray =
        preprocessedDoc?.split(wholeLineRegExp) ?? [];

      const rawSignatureLine =
        preprocessedFileAsArray[symbol.range.start.line - 1] ?? "";

      // For now assume the function declaration ends at the last ')' on the current line
      // This might not always be right, but this feature will improve gradually.
      const includingLastRightParenthesis =
        rawSignatureLine.lastIndexOf(")") + 1;
      const signatureLine = rawSignatureLine
        .trimStart()
        .substring(0, includingLastRightParenthesis);

      if (signatureLine) {
        const symbolParameters =
          symbolManager.symbolParameters.get(fsPath)?.get(symbol.name) ?? [];

        const parameters = symbolParameters.map((x:any) =>
          ParameterInformation.create(
            [x.range.start.character, x.range.end.character], // TODO:
            x.name
          )
        );

        const classDoc =
          retrieveDocumentationForKeyword(symbol, location.filePath) ?? "";
        const signature = SignatureInformation.create(
          signatureLine,
          classDoc,
          ...parameters
        );
        signatures.push(signature);
      }
    }
  }
  return signatures;
}

function getParametersFromSignature(
  params: string[],
  signatureLine: string
): ParameterInformation[] {
  const parameters: ParameterInformation[] = [];
  for (let p of params) {
    /*
		// TODO: add details for optional and typed parameter for better decision on which signature to use
		const isOptional = p.match(/(\w+)\?$/);
		if(isOptional) {
			console.log(`parameter name: ${isOptional[1]} is optional`);
		}
		const isTyped = p.match(/(\w+)\s+(\w+)$/);
		if(isTyped) {
			const type = isTyped[1] ?? '';
			const parameterName = isTyped[2];
			console.log(`Type: ${type}, parameter name: ${parameterName}`);
		}*/
    p = p
      .replace("[", "\\[")
      .replace("&", "\\&")
      .replace("?", "\\?")
      .replace(":", "\\:");
    const regexpExpressionForParam = `\\s*${p}\\s*`;
    const result = new RegExp(regexpExpressionForParam).exec(signatureLine);
    if (result && result.length > 0) {
      const startIndex = result?.index ?? 0;
      const stopIndex = startIndex + result[0].length;
      const parameterInformation = ParameterInformation.create(
        [startIndex, stopIndex],
        p
      );
      parameters.push(parameterInformation);
    }
  }
  return parameters;
}



function parseToParameterList(currentLineAtPos: string) {
  const input = CharStreams.fromString(currentLineAtPos);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  parser.removeErrorListeners();
  const parseTree = parser.callStatement();
  const listener = new Tads3SymbolListenerParameterCollector();
  const parseTreeWalker = new ParseTreeWalker();
  try {
    parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
  } catch (err) {
    connection.console.debug(
      `Couln't parse parameters in: "${currentLineAtPos}" `
    );
    return [];
  }
  return listener.parameterCollection ?? [];
}

function parseFunctionHeadToParameterList(currentLineAtPos: string) {
  const input = CharStreams.fromString(currentLineAtPos);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  parser.removeErrorListeners();
  const parseTree = parser.functionHead();
  const listener = new Tads3SymbolListenerParameterCollector();
  const parseTreeWalker = new ParseTreeWalker();
  try {
    parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
  } catch (err) {
    connection.console.debug(
      `Couln't parse parameters in: "${currentLineAtPos}" `
    );
    return [];
  }
  return listener.parameterCollection ?? [];
}

function swapSymbolForConstructor(symbolToBe: DocumentSymbol): any {
  return symbolToBe.children?.find((x) => x.name === "construct") ?? symbolToBe;
}

function isClassOrObject(symbol: any): boolean {
  return symbol.kind === SymbolKind.Class || symbol.kind === SymbolKind.Object;
}
















/*
function getMockSignatures(): SignatureInformation[] {
  const parameter1 = ParameterInformation.create("rows", "param doc1");
  const parameter2 = ParameterInformation.create("cols", "param doc2");
  const parameter3 = ParameterInformation.create("tileX", "param doc3");
  const parameter4 = ParameterInformation.create("tileY", "param doc4");
  return [
    SignatureInformation.create(
      "rows,cols",
      "documentation...yadayada..",
      ...[parameter1, parameter2]
    ),
    SignatureInformation.create(
      "rows,cols,tileX,tileY",
      undefined,
      ...[parameter1, parameter2, parameter3, parameter4]
    ),
  ];
}*/

/**
 * TODO:
 */
/*
function getActiveSignatureBasedOn(currentLine: string, signatures: any[]) {
  let bestMatchIdx = 0;
  let bestMatchCount = 0;
  const firstLeftParam = currentLine.indexOf("(") + 1;
  const lastRightParam = currentLine.lastIndexOf(")");
  const currentLineFromFirstLeftParen = currentLine.substring(
    firstLeftParam,
    lastRightParam
  );
  const totalParameters =
    currentLineFromFirstLeftParen.match(/,/g)?.length ?? 0;
  for (let idx = 0; idx < totalParameters; idx++) {
    const signature = signatures[idx];
    const parameterCount = signature.parameters?.length - 1;
    if (parameterCount === activeParameter) {
      return idx;
    }
    //if(parameterCount > )
    //Math.max(bestMatchCount, parameterCount);
  }
  return 0;
}*/
