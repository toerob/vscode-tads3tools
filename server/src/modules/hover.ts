import { TextDocuments, HoverParams, Hover, MarkupKind, SymbolKind, MarkedString, MarkupContent, DocumentSymbol } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getWordAtPosition } from './text-utils';
import { retrieveDocumentationForKeyword } from './documentation';

const symbolsAllowingHoveringDocs = [
	SymbolKind.Class,
	SymbolKind.Object,
	SymbolKind.TypeParameter,
	SymbolKind.Interface,
	SymbolKind.Method,
	SymbolKind.Property
];

function checkSymbolsAllowingHoveringDocs(x: DocumentSymbol) {
	for (const symbolKind of symbolsAllowingHoveringDocs) {
		if (x.kind === symbolKind) {
			return true;
		}
	}
	return false;
}


export function onHover({ textDocument, position, workDoneToken }: HoverParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager): Hover | undefined {
	const currentDoc = documents.get(textDocument.uri);
	let documentation = '';
	let templateText = '';
	if (currentDoc) {
		const symbolName = getWordAtPosition(currentDoc, position);
		if (symbolName) {
			const symbolSearchResult = symbolManager.findSymbols(symbolName, symbolsAllowingHoveringDocs);
			if (symbolSearchResult && symbolSearchResult.length > 0 && symbolSearchResult[0]?.symbols?.length > 0) {
				const templates = symbolManager.getTemplatesFor(symbolName);
				if (templates && templates.length > 0) {
					const templateSummary = templates.map(x => ' - ' + x.detail).join('\n\n');
					if (templateSummary) {
						templateText += `Templates for ${symbolName ?? 'unknown'}: \n\n${templateSummary}\n\n`;
					}
				}
				const foundPathAndSymbolResult = symbolSearchResult.filter(x => x.symbols.find(checkSymbolsAllowingHoveringDocs));
				if (foundPathAndSymbolResult && foundPathAndSymbolResult.length > 0) {
					for (const eachPathAndSymbolResult of foundPathAndSymbolResult) {
						const filePath = eachPathAndSymbolResult.filePath;
						if (filePath) {
							for (const symbol of eachPathAndSymbolResult.symbols) {
								const classDoc = retrieveDocumentationForKeyword(symbol, filePath);
								if (classDoc) {
									documentation += `\n\n${classDoc}\r\n (source: ${filePath})\n\n`;
								}
							}
						}
					}
				}
			}
		}
	}

	if (documentation.length > 0) {

		const text = '\r\n```\r\n\r\n' + templateText + 'Documentation:\n\n' + documentation + '```\r\n';
		return {
			contents: {
				kind: MarkupKind.Markdown,
				value: text,
				language: 'tads3',
			},
		};
	}
	return undefined;
}
