import { TadsSymbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  TextDocuments,
  SymbolKind,
  SignatureInformation,
  ParameterInformation,
} from "vscode-languageserver";
import {
  SignatureHelpParams,
  SignatureHelp,
  DocumentSymbol,
} from "vscode-languageserver-protocol";
import { retrieveDocumentationForKeyword } from "./documentation";
import { simpleWholeLineRegExp, wholeLineRegExp } from "../parser/preprocessor";
import { connection, preprocessedFilesCacheMap } from "../server";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads3Lexer } from "../parser/Tads3Lexer";
import { Tads3Listener } from "../parser/Tads3Listener";
import { Tads3Parser } from "../parser/Tads3Parser";
import Tads3SymbolListenerParameterCollector from "../parser/Tads3SymbolListenerCallStatement";
import { FilePathAndSymbols } from "./types";

const idWithParametersRegexp = /\s*([a-zA-Z][a-zA-Z0-9]*)\s*[(](.*)?[)]/;

let activeParameter = 0;
let activeSignature = 0;

export async function onSignatureHelp(
  handler: SignatureHelpParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
): Promise<SignatureHelp> {
  const { position, textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);
  const signatures: SignatureInformation[] = [];

  if (currentDocument === undefined) {
    return { signatures, activeSignature, activeParameter };
  }

  const currentLineAtPos = currentDocument.getText().split(simpleWholeLineRegExp)[
    position.line
  ]; // Get current line from editor
  const currentDocIdWithParamsMatch =
    idWithParametersRegexp.exec(currentLineAtPos); // Get the function name using regexp
  if(currentLineAtPos === undefined) {
    return { signatures, activeSignature, activeParameter };
  }
  const userEnteredParameters = parseToParameterList(currentLineAtPos);

  if(userEnteredParameters.length === 0) {
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

    const symbolName = currentDocIdWithParamsMatch[1]; //
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

      for (const location of locations) {
        for (let symbolToBe of location.symbols) {
          const symbol = isClassOrObject(symbolToBe)
            ? swapSymbolForConstructor(symbolToBe)
            : symbolToBe;

            if (symbol === undefined) continue;

          const preprocessedDoc = preprocessedFilesCacheMap.get(
            location.filePath
          );
          const preprocessedFileAsArray =
            preprocessedDoc?.split(wholeLineRegExp) ?? [];
          const rawSignatureLine =
            preprocessedFileAsArray[symbol.range.start.line - 1] ?? "";
          const signatureLine = rawSignatureLine.replace(/{\s*$/, "");

          if (signatureLine) {
            const signatureLineIdWithParametersRegexpMatch =
              idWithParametersRegexp.exec(signatureLine);
            if (
              signatureLineIdWithParametersRegexpMatch &&
              signatureLineIdWithParametersRegexpMatch.length > 0
            ) {
              const params =
                signatureLineIdWithParametersRegexpMatch[2]?.split(/[,]\s*/) ??
                [];
              const parameters = getParametersFromSignature(
                params,
                signatureLine
              );
              const classDoc =
                retrieveDocumentationForKeyword(symbol, location.filePath) ??
                "";
              const signature = SignatureInformation.create(
                signatureLine,
                classDoc,
                ...parameters
              );
              signatures.push(signature);
            }
          }
        }
      }
    }
  }

  /*
  console.log(
    `ActiveSignature: ${handler.context?.activeSignatureHelp?.activeSignature}`
  );
  console.log(
    `ActiveParameter: ${handler.context?.activeSignatureHelp?.activeParameter}`
  );*/

  // Keep the state of the last chosen signature so that the cursor can move sideways without changing it.
  activeSignature = handler.context?.activeSignatureHelp?.activeSignature ?? 0;

  // TODO: detect types and decide signature based on number of parameters and/or types used
  // Change the active signature to the one best matching the current line (i.e number of parameters)
  /*for(let i=0; i<signatures.length; i++) {
		if(signatures[i].parameters?.length === enteredParametersCollection.length) {
			activeSignature = i;
			//break;
		}
	}*/

  return {
    signatures,
    activeSignature,
    activeParameter,
  };
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
    if (result && result.length>0) {
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
  } catch(err) {
    connection.console.debug(`Couln't parse parameters in: "${currentLineAtPos}" `);
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
