import { TextDocument, Range, CancellationToken, ProviderResult, DocumentLinkProvider, DocumentLink } from 'vscode';
import { Uri } from 'vscode';
import { client, getProcessedFileList } from '../extension';

export class Tads3DocumentLinkProvider implements DocumentLinkProvider {

	includeRegexp = new RegExp(/(#\s*include\s*)(?:[<]|\")(.*)(?:[>]|\")/);

	provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult<DocumentLink[]> {
		let links = [];
		try {
			for (let nr = 0; nr < document.lineCount; nr++) {
				let line = document.lineAt(nr).text;
				let match = this.includeRegexp.exec(line);
				if (match && match.length === 3) {
					let startOfLink = (match[1]?.length + 1) ?? 0;
					let nameOfLink = match[2] ?? '';
					let endOfLink = startOfLink + nameOfLink.length;
					let documentLink = new DocumentLink(new Range(nr, startOfLink, nr, endOfLink));
					documentLink['match'] = nameOfLink;
					links.push(documentLink);
				}
			}
		} catch (err) {
			client.error(err);
		}

		return links;
	}

	resolveDocumentLink(link: DocumentLink, token: CancellationToken) {
		let match = link['match'];
		const fullPath = getProcessedFileList().find(x => x.endsWith(match));
		link.target = Uri.file(fullPath);
		return link;
	}
}

