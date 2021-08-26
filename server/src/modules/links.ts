import { DocumentLink, DocumentLinkParams, TextDocuments, Range } from 'vscode-languageserver';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';

const includeRegexp = new RegExp(/(#\s*include\s*)(<(.*)>|["](.*)["])/);

export async function onDocumentLinks({textDocument}: DocumentLinkParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const links: DocumentLink[] = [];
	const currentDoc = documents.get(textDocument.uri);
	if(currentDoc) {
		const rows = currentDoc.getText().split(/\n/);
		for (let nr = 0; nr < currentDoc.lineCount; nr++) {
			const line = rows[nr];
			const match = includeRegexp.exec(line);
			if (match) {
				const startOfLink = match[1].length;
				const nameOfLink = match[3];
				const endOfLink = startOfLink + nameOfLink.length + 1;
				const documentLink = DocumentLink.create(Range.create(nr, startOfLink, nr, endOfLink));
				links.push(documentLink);
			}
		}
	}
	return links;

}
