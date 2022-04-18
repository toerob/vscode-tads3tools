/* eslint-disable no-useless-escape */
import { DocumentLink, DocumentLinkParams, TextDocuments, Range, TextDocumentIdentifier } from 'vscode-languageserver';
import { TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI, Utils } from 'vscode-uri';
import { connection, preprocessedFilesCacheMap } from '../server';
import { existsSync } from 'fs-extra';
import { isAbsolute } from 'path';
import { serverState } from '../state';

const includeRegexp = new RegExp(/(#\s*include\s*)(?:[<]|\")(.*)(?:[>]|\")/);

export async function onDocumentLinks({ textDocument }: DocumentLinkParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager) {
	const links: DocumentLink[] = [];
	const document: TextDocument | undefined = documents.get(textDocument.uri);
    const uri = URI.parse(textDocument.uri);
    const fsPath = uri.fsPath;
	if (textDocument.uri.endsWith('.t3m')) {
        return getLinksForTads3Makefile(symbolManager, fsPath, textDocument, links);
    }

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

function getLinksForTads3Makefile(symbolManager: TadsSymbolManager, fsPath: any, textDocument: TextDocumentIdentifier, links: DocumentLink[]) {
	const symbols = symbolManager.symbols.get(fsPath) ?? [];
    const makefileLocationURI = URI.parse(textDocument.uri);
    const directoryName = Utils.dirname(makefileLocationURI);
    const makefileLocation = URI.file(directoryName.fsPath);
	
	const uris:any = symbols
            .filter(x => x.name.match(/^f[li]$/i))
            .map(x => x.detail && URI.file(x.detail))
            .filter(x => x && existsSync(x.fsPath));

	serverState.makefileLocation = makefileLocation;
	serverState.fileBasePaths  = new Set([
        makefileLocation,
        ...uris
    ]);

	for (const symbol of symbols) {
        const isDirectory = symbol.name.match(/^f[liyo]$/i) ? true : false;
        const relativeSourceFile = symbol.name.match(/source/) ? true : false;
        const relativeLibraryFile = symbol.name.match(/lib/) ? true : false;
        if (relativeSourceFile || relativeLibraryFile) {
			const absolutePath = serverState.cachedFileLocation.get(symbol.detail) ?? toAbsoluteUrl(symbol.detail, symbol, serverState.fileBasePaths, isDirectory);
			const range = Range.create(symbol.range.start.line, symbol.name.length+2,  symbol.range.end.line, symbol.range.end.character);
			const documentLink = DocumentLink.create(range, URI.file(absolutePath).path);
            serverState.cachedFileLocation.set(symbol.detail ?? '', absolutePath);
			links.push(documentLink);
        }
    }
    return links;
}


/**
 * Determines if input path is relative or absolute, in case it is relative it 
 * uses the makefileLocation uri to determine
 * the absolute path.
 * 
 * @param relativePath the relative or absolute address
 * @param makefileLocation the makefile location uri
 * @returns an absolute path, regardless input was relative or absolute
 */
 function toAbsoluteUrl(relativePath = '', symbol: any, basePaths: Set<URI>, isDirectory: boolean): string {
    if (isAbsolute(relativePath) && existsSync(relativePath)) {
        return relativePath;
    }
    const hasExtensionAtEnd = relativePath.match(/[.](lib|tl|t)$/) ? true : false;
    const ext = (hasExtensionAtEnd || isDirectory) ? '' : symbol.name === 'lib' ? '.tl' : '.t';
    const result = [...basePaths]
        .map((basePath: URI) => Utils.joinPath(basePath, relativePath + ext))
        .find((x: URI) => existsSync(x.fsPath)? x : undefined);
    if (result) {
        return result.fsPath;
    }
    return relativePath;
}
