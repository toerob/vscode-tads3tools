import { TextDocuments, HoverParams, Hover, ResponseError, MarkupKind, DocumentSymbol, SymbolKind } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getWordAtPosition } from './text-utils';

export function onHover({ textDocument, position, workDoneToken }: HoverParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager): Hover | undefined {
	const currentDoc = documents.get(textDocument.uri);
	let templateMarkdownString;
	if (currentDoc) {
		const symbolName = getWordAtPosition(currentDoc, position);
		if (symbolName) {
			const result = symbolManager.findSymbol(symbolName);
			if (result.symbol?.kind === SymbolKind.Object || result.symbol?.kind === SymbolKind.Class || result.symbol?.kind === SymbolKind.TypeParameter) {
				const templates = symbolManager.getTemplatesFor(symbolName);
				if (templates) {
					const templateSummary = templates.map(x => ' * ' + x.detail).join('\n\n');
					if (templateSummary) {
						templateMarkdownString = `Available templates for ${symbolName ?? 'unknown'}: \n\n${templateSummary}`;
					}
				}
			}
		}
	}

	if (templateMarkdownString) {
		return {
			contents: {
				kind: MarkupKind.Markdown,
				value: templateMarkdownString,
				language: 'tads3'
			},
		};
	}
	return undefined;
}
