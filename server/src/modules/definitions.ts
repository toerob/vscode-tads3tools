import { DefinitionLink, LocationLink, TextDocuments } from 'vscode-languageserver';
import { connection } from '../server';
import { flattenTreeToArray, Tads3SymbolManager } from './symbol-manager';
import { getWordAtPosition, withinQuote } from './text-utils';
import { DefinitionParams, Location, Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { SymbolKind } from 'vscode-languageserver';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Tads3Lexer } from '../parser/Tads3Lexer';
import { Tads3Parser } from '../parser/Tads3Parser';

const interpolatedExpressionRegExp = /[<][<](.*)[>][>]/g;

export async function onDefinition({ textDocument, position }: DefinitionParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const locations: Location[] = [];
	const currentDoc = documents.get(textDocument.uri);
	if (currentDoc) {

		const quote = withinQuote(currentDoc, position);
		if(quote) {
			// Left TODO: Quotes holds no definition per se. Unless it is an template inline expression  '<<' .* '>>'
			// in which case we can parse that expression here.
			/*
			const inlineExpression = interpolatedExpressionRegExp.exec(quote.quoteString);
			if(inlineExpression) {
				const str = inlineExpression[1];
				const input = CharStreams.fromString(str);
				const lexer = new Tads3Lexer(input);
				const tokenStream = new CommonTokenStream(lexer);
				const parser = new Tads3Parser(tokenStream);
				const parseTree = parser.expr();
				console.log(parseTree.ruleContext);
			}*/
			
			return locations;
		}

		const symbolName = getWordAtPosition(currentDoc, position);

		if (symbolName) {
			if (symbolName === 'object') {
				return locations;
			}


			if (symbolName === 'inherited') {
				const fsPath = URI.parse(textDocument.uri).fsPath;
				const containingObject = symbolManager.findContainingObject(fsPath, position);
				if (containingObject.kind === SymbolKind.Object || containingObject.kind === SymbolKind.Class) {
					const foundSuperTypes = [];
					const superTypeSymbolNames = containingObject.detail.split(',');
					for (const superTypeName of superTypeSymbolNames) {
						if(superTypeName === 'object') {
							continue;
						}
						foundSuperTypes.push(symbolManager.findSymbol(superTypeName));
						const { filePath, symbol } = symbolManager.findSymbol(superTypeName);
						if (filePath && symbol) {
							const fileUri = URI.file(filePath).toString();
							locations.push(Location.create(fileUri, symbol.range));
						}
					}
					return locations;
				}
			}

			if (symbolName === 'self') {
				const fsPath = URI.parse(textDocument.uri).fsPath;
				const containingObject = symbolManager.findContainingObject(fsPath, position);
				if (containingObject) {
					const toOfContainingObjectRange = Range.create(containingObject.range.start.line, containingObject.range.start.character, containingObject.range.start.line, containingObject.range.start.character);
					const locationLink = LocationLink.create(textDocument.uri, containingObject.range, toOfContainingObjectRange);
					if (locationLink) {
						return [locationLink];
					}
				}
			}

			connection.console.log(`Find definition(s) for word: ${symbolName}`);
			for (const filePathKey of symbolManager.symbols.keys()) {
				const localSymbols = symbolManager.symbols.get(filePathKey);
				if (localSymbols) {
					const symbol = flattenTreeToArray(localSymbols).find(x => x.name === symbolName);
					if (symbol !== undefined) {
						connection.console.log(`Found definition of ${symbolName} in ${filePathKey} at line: ${symbol.range.start.line}`);
						const filePath = URI.file(filePathKey).toString();
						locations.push(Location.create(filePath, symbol.range));
					}
				}
			}
		}
	}
	return locations;
}

