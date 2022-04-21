
import { FilePathAndSymbols, TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments, SymbolKind, SignatureInformation, ParameterInformation } from 'vscode-languageserver';

import { SignatureHelpParams, SignatureHelp } from 'vscode-languageserver-protocol';
import { retrieveDocumentationForKeyword } from './documentation';
import { wholeLineRegExp } from '../parser/preprocessor';
import { preprocessedFilesCacheMap } from '../server';

const idWithParametersRegexp = /\s*(.*)[(](.*)?[)]/;

export async function onSignatureHelp(handler: SignatureHelpParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager): Promise<SignatureHelp> {
	const { position, textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);

	const parameters = [];
	const signatures: SignatureInformation[] = [];

	let activeSignature = 0;
	let activeParameter = 0;

	if (currentDocument === undefined) {
		return { signatures, activeSignature, activeParameter }
	}

	const currentLineAtPos = currentDocument.getText().split(wholeLineRegExp)[position.line];
	const currentDocIdWithParamsMatch = idWithParametersRegexp.exec(currentLineAtPos);

	if (currentDocIdWithParamsMatch && currentDocIdWithParamsMatch.length >= 3) {

		// Get the active parameter by counting the commas from the first parenthesis to the current position:
		const parameterSubset = currentLineAtPos.substring(Math.max(0, currentLineAtPos.lastIndexOf('(') + 1), position.character);
		
		// Replace commas within strings with '_' so they won't interfere when counting the parameters
		const parameterSubsetPrunedFromCommasInsideStrings = parameterSubset.replace(/['"](.*)([,])(.*)['"]/, "$1_$3");

		//const parametersMatchResult =  parameterSubsetPrunedFromCommasInsideStrings.match(/[,](.+)/g);

		const parametersMatchResult =  parameterSubsetPrunedFromCommasInsideStrings.match(/([,])/g);
		activeParameter = parametersMatchResult?.length ?? 0;

		const symbolName = currentDocIdWithParamsMatch[1]; // 
		if (symbolName) {
			const locations: FilePathAndSymbols[] = symbolManager.findSymbols(symbolName, [SymbolKind.Function, SymbolKind.Method]);
			for (const location of locations) {
				for (const symbol of location.symbols) {
					const preprocessedDoc = preprocessedFilesCacheMap.get(location.filePath);
					const preprocessedFileAsArray = preprocessedDoc?.split(wholeLineRegExp) ?? [];
					const signatureLine = preprocessedFileAsArray[symbol.range.start.line - 1] ?? '';
					if (signatureLine) {
						const signatureLineIdWithParametersRegexpMatch = idWithParametersRegexp.exec(signatureLine);
						if (signatureLineIdWithParametersRegexpMatch && signatureLineIdWithParametersRegexpMatch.length > 0) {
							const params = signatureLineIdWithParametersRegexpMatch[2]?.split(/[,]\s*/) ?? [];
							for (const p of params) {
								//TODO: add details for optional and typed parameter
								if (activeParameter <= params.length - 1) {
									const currentParameter = params[activeParameter];
									const result = new RegExp(currentParameter).exec(signatureLine);
									const startIndex = result?.index ?? 0;
									const stopIndex = startIndex + currentParameter.length;
									const parameterInformation = ParameterInformation.create([startIndex, stopIndex], p);
									parameters.push(parameterInformation);
								}
							}
						}

						const classDoc = retrieveDocumentationForKeyword(symbol, location.filePath) ?? '';
						
						// TODO: Change the active signature to the one best matching the current line
						
						const signature = SignatureInformation.create(signatureLine, classDoc, ...parameters);
						signatures.push(signature);
	
					}
				}
			}
		}
	}

	return {
		signatures,
		activeSignature,
		activeParameter
	}
}
