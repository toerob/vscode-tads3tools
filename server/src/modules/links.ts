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
				//documentLink['match'] = nameOfLink;
				links.push(documentLink);
			}
		}
	}
	return links;

}


	/*
import { TextDocument, Range, CancellationToken, ProviderResult, DocumentLinkProvider, DocumentLink } from 'vscode';
import { Uri } from 'vscode';
import { populateIncludesPaths } from '../populateIncludesPaths';

export class T3DocumentLinkProvider implements DocumentLinkProvider {
	includeRegexp = new RegExp(/(#\s*include\s*)(<(.*)>|\"(.*)\")/);

	constructor(private makefileFoldersMap: any) {

	}
	
	provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult<DocumentLink[]> {
		let links = [];
		for (let nr = 0; nr < document.lineCount; nr++) {
			let line = document.lineAt(nr).text;
			let match = this.includeRegexp.exec(line);
			if (match) {
				let startOfLink = match[1].length;
				let nameOfLink = match[3];
				let endOfLink = startOfLink + nameOfLink.length + 1;
				let documentLink = new DocumentLink(new Range(nr, startOfLink, nr, endOfLink));
				documentLink['match'] = nameOfLink;
				links.push(documentLink);
			}
		}
		return links;
	}
	resolveDocumentLink?(link: DocumentLink, token: CancellationToken): ProviderResult<DocumentLink> {
		let match = link['match'];
		let absoluteFilePath = this.makefileFoldersMap.get(match);
		if (absoluteFilePath) {
			link.target = Uri.parse(absoluteFilePath);
		} else {
			// Refresh the makefileFoldersMap in case files has been updated.
			populateIncludesPaths(this.makefileFoldersMap);
			let absoluteFilePath = this.makefileFoldersMap.get(match);
			if (absoluteFilePath) {
				link.target = Uri.parse(absoluteFilePath);
			}
		}
		
		return link;
	}
}


	*/