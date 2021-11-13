import { LocationLink, TextDocuments } from 'vscode-languageserver';
import { flattenTreeToArray, Tads3SymbolManager } from './symbol-manager';
import { getWordAtPosition, withinQuote } from './text-utils';
import { DefinitionParams, Location, Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { SymbolKind } from 'vscode-languageserver';

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

		let symbolName = getWordAtPosition(currentDoc, position);

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


			
			// Not sure if this should be here since it is a bit too hardwired and only works for
			// adv3: If ctrl-clicking "Examine" in dobjFor(Examine) "Examine" will be replaced with
			// what the preprocessed version of it is, e.g:  "sentinelDobjExamine"
			// But leaving it as is for now.

			const currentLine = currentDoc.getText(Range.create(position.line, 0, position.line+1, 0));
			const dobjForRegexp = /[id]objFor[(](.*)[)]/;
			const result = dobjForRegexp.exec(currentLine);
			if(result && result[1] === symbolName) {
				//const fsPath = URI.parse(textDocument.uri).fsPath;
				//const prepRows = preprocessedFilesCacheMap.get(fsPath)?.split(/\n/) ?? [];
				//const prepLine = (prepRows[position.line]) ?? '';
				symbolName = "sentinelDobj" + symbolName;
			}
			


			//connection.console.log(`Find definition(s) for word: ${symbolName}`);
			for (const filePathKey of symbolManager.symbols.keys()) {
				const localSymbols = symbolManager.symbols.get(filePathKey);
				if (localSymbols) {
					const symbol = flattenTreeToArray(localSymbols).find(x => x.name === symbolName);
					if (symbol !== undefined) {
						//connection.console.log(`Found definition of ${symbolName} in ${filePathKey} at line: ${symbol.range.start.line}`);
						const filePath = URI.file(filePathKey).toString();
						locations.push(Location.create(filePath, symbol.range));
					}
				}
			}
		}
	}
	return locations;
}

