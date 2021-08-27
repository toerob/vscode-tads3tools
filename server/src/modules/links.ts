import { DocumentLink, DocumentLinkParams, TextDocuments, Range } from 'vscode-languageserver';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { connection, preprocessedFilesCacheMap } from '../server';

const includeRegexp = new RegExp(/(#\s*include\s*)(?:[<]|\")(.*)(?:[>]|\")/);

export async function onDocumentLinks({ textDocument }: DocumentLinkParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const links = [];
	const document: TextDocument | undefined = documents.get(textDocument.uri);
	if (document) {
		const documentArray = document.getText().split(/\n/);
		const documentLineCount = documentArray.length;
		const fileNameArray = [...preprocessedFilesCacheMap.keys()];
		try {
			for (let nr = 0; nr < documentLineCount; nr++) {
				let line = documentArray[nr];
				let match = includeRegexp.exec(line);
				if (match && match.length === 3) {
					let startOfLink = (match[1]?.length + 1) ?? 0;
					let nameOfLink = match[2] ?? '';
					let endOfLink = startOfLink + nameOfLink.length;
					let documentLink = DocumentLink.create(Range.create(nr, startOfLink, nr, endOfLink));
					const fullPath = fileNameArray.find(x => x.endsWith(nameOfLink));
					if (fullPath) {
						documentLink.target = URI.parse(fullPath).fsPath;
						links.push(documentLink);
					}
				}
			}
		} catch (err) {
			connection.console.error(err);
		}
	}
	return links;
}

