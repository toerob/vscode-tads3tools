/* eslint-disable no-useless-escape */
import { DocumentLink, DocumentLinkParams, TextDocuments, Range } from 'vscode-languageserver';
import { TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { connection, preprocessedFilesCacheMap } from '../server';

const includeRegexp = new RegExp(/(#\s*include\s*)(?:[<]|\")(.*)(?:[>]|\")/);

export async function onDocumentLinks({ textDocument }: DocumentLinkParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager) {
	const links = [];
	const document: TextDocument | undefined = documents.get(textDocument.uri);
	if (document) {
		const documentArray = document.getText().split(/\n/);
		const documentLineCount = documentArray.length;
		const fileNameArray = [...preprocessedFilesCacheMap.keys()];
		try {
			for (let nr = 0; nr < documentLineCount; nr++) {
				const line = documentArray[nr];
				const match = includeRegexp.exec(line);
				if (match && match.length === 3) {
					const startOfLink = (match[1]?.length + 1) ?? 0;
					const nameOfLink = match[2] ?? '';
					const endOfLink = startOfLink + nameOfLink.length;
					const documentLink = DocumentLink.create(Range.create(nr, startOfLink, nr, endOfLink));
					const fullPath = fileNameArray.find(x => x.endsWith(nameOfLink));
					if (fullPath) {
						documentLink.target = URI.file(fullPath).path;
						links.push(documentLink);
					}
				}
			}
		} catch (err: any) {
			connection.console.error(err.message);
		}
	}
	return links;
}

