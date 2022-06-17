import { FilePathAndSymbols, TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments, SymbolKind, SignatureInformation, ParameterInformation } from 'vscode-languageserver';
import { SignatureHelpParams, SignatureHelp } from 'vscode-languageserver-protocol';
import { retrieveDocumentationForKeyword } from './documentation';
import { wholeLineRegExp } from '../parser/preprocessor';
import { preprocessedFilesCacheMap } from '../server';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from '../parser/Tads3Lexer';
import { Tads3Listener } from '../parser/Tads3Listener';
import { Tads3Parser } from '../parser/Tads3Parser';
import Tads3SymbolListenerParameterCollector from '../parser/Tads3SymbolListenerCallStatement';

const idWithParametersRegexp = /\s*(.*)[(](.*)?[)]/;

let activeParameter = 0;
let activeSignature = 0;

export async function onSignatureHelp(handler: SignatureHelpParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager): Promise<SignatureHelp> {
	const { position, textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);
	const signatures: SignatureInformation[] = [];

	if (currentDocument === undefined) {
		return { signatures, activeSignature, activeParameter };
	}

	const currentLineAtPos = currentDocument.getText().split(wholeLineRegExp)[position.line];	// Get current line from editor
	const currentDocIdWithParamsMatch = idWithParametersRegexp.exec(currentLineAtPos);			// Get the function name using regexp

	const userEnteredParameters = parseToParameterList(currentLineAtPos);

	if (currentDocIdWithParamsMatch && currentDocIdWithParamsMatch.length >= 3) {
		for(let nr=0; nr < userEnteredParameters.length; nr++) {
			const param = userEnteredParameters[nr];
			// TODO: replace predicate with range intersection
			if(position.character >= param.range.start.character + 1 && position.character <= param.range.end.character + 1) { 
				activeParameter = nr>0? nr : 0;
				break;
			}
		}

		const symbolName = currentDocIdWithParamsMatch[1]; // 
		if (symbolName) {
			const locations: FilePathAndSymbols[] = symbolManager.findSymbols(symbolName, [SymbolKind.Function, SymbolKind.Method]);
			for (const location of locations) {
				for (const symbol of location.symbols) {
					const preprocessedDoc = preprocessedFilesCacheMap.get(location.filePath);
					const preprocessedFileAsArray = preprocessedDoc?.split(wholeLineRegExp) ?? [];
					const rawSignatureLine = preprocessedFileAsArray[symbol.range.start.line - 1] ?? '';
					const signatureLine = rawSignatureLine.replace(/{\s*$/, '');
					if (signatureLine) {
						const signatureLineIdWithParametersRegexpMatch = idWithParametersRegexp.exec(signatureLine);
						if (signatureLineIdWithParametersRegexpMatch && signatureLineIdWithParametersRegexpMatch.length > 0) {
							const params = signatureLineIdWithParametersRegexpMatch[2]?.split(/[,]\s*/) ?? [];
							const parameters = getParametersFromSignature(params, signatureLine);
							const classDoc = retrieveDocumentationForKeyword(symbol, location.filePath) ?? '';
							const signature = SignatureInformation.create(signatureLine, classDoc, ...parameters);
							signatures.push(signature);	
						}
					}
				}
			}
		}
	}

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
		activeParameter
	};
}


function getParametersFromSignature(params: string[], signatureLine: string) {
	const parameters = [];
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
		p = p.replace('[','\\[').replace('&', '\\&').replace('?','\\?').replace(':','\\:');
		const regexpExpressionForParam = `\\s*${p}\\s*`;
		const result = new RegExp(regexpExpressionForParam).exec(signatureLine);
		if (result) {
			const startIndex = result?.index ?? 0;
			const stopIndex = startIndex + result[0].length;
			const parameterInformation = ParameterInformation.create([startIndex, stopIndex], p);
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
	const parseTree = parser.callStatement();
	const listener = new Tads3SymbolListenerParameterCollector();
	const parseTreeWalker = new ParseTreeWalker();
	parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
	return listener.parameterCollection ?? [];
}

