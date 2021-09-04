import { TextDocuments, HoverParams, Hover, MarkupKind, SymbolKind, MarkedString, MarkupContent } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getWordAtPosition } from './text-utils';
import { retrieveDocumentationForKeyword } from './documentation';

export function onHover({ textDocument, position, workDoneToken }: HoverParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager): Hover | undefined {
	const currentDoc = documents.get(textDocument.uri);
	let documentation = '';
	if (currentDoc) {
		const symbolName = getWordAtPosition(currentDoc, position);
		if (symbolName) {
			const symbolSearchResult = symbolManager.findSymbols(symbolName, [SymbolKind.Class, SymbolKind.Object, SymbolKind.TypeParameter, SymbolKind.Interface]);
			if (symbolSearchResult && symbolSearchResult.length > 0 && symbolSearchResult[0]?.symbols?.length > 0) {
				const templates = symbolManager.getTemplatesFor(symbolName);
				if (templates) {
					const templateSummary = templates.map(x => ' - ' + x.detail).join('\n\n');
					if (templateSummary) {
						documentation += `Templates for ${symbolName ?? 'unknown'}: \n\n${templateSummary}\n\n`;
					}
				}
				const firstFoundClassesResult = symbolSearchResult.filter(x => x.symbols.find(x => x.kind === SymbolKind.Class || x.kind === SymbolKind.Interface));
				if (firstFoundClassesResult && firstFoundClassesResult.length > 0) {
					const symbol = firstFoundClassesResult[0].symbols[0];
					const filePath = firstFoundClassesResult[0].filePath;
					if (filePath) {
						const classDoc = retrieveDocumentationForKeyword(symbol, filePath);
						if (classDoc) {
							documentation += `Documentation: \n\n${classDoc} \n\n`;
						}
					}
				}
			}
		}
	}

	if (documentation.length > 0) {
		const text = '\r\n```\r\n\r\n' + documentation + '```\r\n';
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
