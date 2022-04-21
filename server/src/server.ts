/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-empty-function */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	TextDocumentSyncKind,
	InitializeResult,
	CancellationTokenSource,
	SymbolKind} from 'vscode-languageserver/node';

import { symbolManager, TadsSymbolManager } from './modules/symbol-manager';
import { onDocumentSymbol } from './modules/symbols';
import { onReferences } from './modules/references';
import { onDefinition } from './modules/definitions';
import { preprocessAndParseTads3Files, preprocessAndParseTads2Files } from './parse-workers-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefaultMapObject } from './modules/mapcrawling/DefaultMapObject';
import MapObjectManager from './modules/mapcrawling/map-mapping';
import { onCodeLens } from './modules/codelens';
import { onCompletion } from './modules/completions';
import { tokenizeQuotesWithIndex } from './modules/text-utils';
import { onDocumentLinks } from './modules/links';
import { onHover } from './modules/hover';
import { CaseInsensitiveMap } from './modules/CaseInsensitiveMap';
import { onWorkspaceSymbol } from './modules/workspace-symbols';
import { markFileToBeCheckedForMacroDefinitions } from './parser/preprocessor';
import { URI } from 'vscode-uri';
import { serverState } from './state';
import { onDocumentFormatting } from './modules/document-formatting';
import { onDocumentRangeFormatting } from './modules/document-range-formatting';
import { onImplementation } from './modules/implementation';

import {onSignatureHelp} from './modules/onSignatureHelp';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const posTagger = require('wink-pos-tagger');

const onWindowsPlatform = (process.platform === 'win32');

export const preprocessedFilesCacheMap = onWindowsPlatform? new CaseInsensitiveMap<string, string>() : new Map<string, string>();

export const mapper = new MapObjectManager(symbolManager);

export default function processMapSymbols(symbolManager: TadsSymbolManager, callback: any) {
	const symbols = mapper.mapGameObjectsToMapObjects();
	callback(symbols);
}

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
export const connection = createConnection(ProposedFeatures.all);

/*export function getCurrentDocument() {
	return currentDocument;
}*/

// Create a simple text document manager.
export const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;


	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			documentSymbolProvider: true,
			workspaceSymbolProvider: true,
			referencesProvider: true, // TODO: need to fix the row synchronization issue
			definitionProvider: true,
			documentLinkProvider: {
				resolveProvider: true,
			},
			codeLensProvider: {
				resolveProvider: true,
			},
			textDocumentSync: {
				openClose: true,
				willSave: true,
				save: true,
				change: TextDocumentSyncKind.Full,
			},
			hoverProvider: true,
			completionProvider: {
				resolveProvider: false
			},
			implementationProvider: true,
			documentFormattingProvider: true,
			documentRangeFormattingProvider: true,
			callHierarchyProvider: true,
			signatureHelpProvider: {
				triggerCharacters: ['(', ','],
			}
		}
	};
	
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

export let abortParsingProcess: CancellationTokenSource| undefined;

connection.onInitialized(() => {
	
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}

	connection.onNotification('symbolparsing/abort', ()=> {
		abortParsingProcess?.cancel();
	});

	connection.onNotification('request/mapsymbols', (options) => {
		if(options?.reset) {
			mapper.newlyCreatedRoomsSet.clear();
			mapper.persistedObjectPositions.clear();
		}
		processMapSymbols(symbolManager, (symbols: DefaultMapObject[]) => {
			connection.sendNotification('response/mapsymbols', symbols);
		});
	});
	
	connection.onRequest('request/changestartroom', (startRoom)=> {
		mapper.startRoom = startRoom;
		processMapSymbols(symbolManager, (symbols: DefaultMapObject[]) => {
			connection.sendNotification('response/mapsymbols', symbols);
		});
	});


	// In case the client asks for a symbol, locate it and send it back
	connection.onRequest('request/findsymbol', ({ name, postAction }) => {
		const symbol = symbolManager.findSymbol(name);
		if (symbol) {
			connection.console.log(`Found symbol: ${name}`);
			connection.sendNotification('response/foundsymbol', {...symbol, postAction});
		}
	});
	connection.onRequest('request/addroom', ({ room })=> {
		// Let's the mapping-mapper know it is a new room and render it even if it lacks
		// connections to other rooms
		mapper.newlyCreatedRoomsSet.add(room.name);
		mapper.persistedObjectPositions.set(room.name, room.pos);
	});

	connection.onRequest('request/connectrooms', ({currentPayload, previousPayload }) => {
		const fromObject = {
			roomName: previousPayload.from,
			directionName: previousPayload.directionName

		};
		const toObject = {
			roomName: currentPayload.from,
			directionName: currentPayload.directionName
		};

		const fromRoom = symbolManager.findSymbol(fromObject.roomName);
		const toRoom = symbolManager.findSymbol(toObject.roomName);

		const validDirection1 = parseDirection(fromObject.directionName);
		const validDirection2 = parseDirection(toObject.directionName);

		if (fromRoom.symbol?.name && toRoom.symbol?.name && validDirection1 && validDirection2) {
			const response = { fromRoom, toRoom, validDirection1, validDirection2 };
			connection.sendNotification('response/connectrooms', response);
		} else {
			connection.console.error(`Cannot connect rooms: ${fromRoom.symbol?.name} with ${toRoom.symbol?.name} via ${validDirection1}/${validDirection2}`);
		}
	});
});

// The tads3 global settings
interface Tads3Settings {
	maxNumberOfProblems: number;
	enablePreprocessorCodeLens: boolean;
	include: string;
	lib: string;
	
} 

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: Tads3Settings = { 
	maxNumberOfProblems: 1000, 
	enablePreprocessorCodeLens: false, 
	include: "/usr/local/share/frobtads/tads3/include/",
	lib: "/usr/local/share/frobtads/tads3/lib/",
};



let globalSettings: Tads3Settings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<Tads3Settings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		documentSettings.clear();		// Reset all cached document settings
	} else {
		globalSettings = <Tads3Settings>((change.settings.tads3 || defaultSettings));
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});


// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(async params => {
	validateTextDocument(params.document);
});

documents.onWillSave(async params => {
	const fp = URI.parse(params.document.uri).path ;
	markFileToBeCheckedForMacroDefinitions(fp);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	const diagnostics: Diagnostic[] = [];
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onWorkspaceSymbol(async (handler) => onWorkspaceSymbol(handler, documents, symbolManager));
connection.onDocumentSymbol(async (handler) => onDocumentSymbol(handler, documents, symbolManager));
connection.onReferences(async (handler) => onReferences(handler,documents, symbolManager, preprocessedFilesCacheMap));
connection.onDefinition(async (handler) => onDefinition(handler,documents, symbolManager));
connection.onCompletion(async (handler) => onCompletion(handler, documents, symbolManager));
connection.onDocumentLinks(async (handler) => onDocumentLinks(handler, documents, symbolManager));
connection.onCodeLens(async (handler) => onCodeLens(handler, documents, symbolManager));
connection.onHover(async (handler) => onHover(handler, documents, symbolManager));
connection.onDocumentFormatting(async (handler) => onDocumentFormatting(handler, documents));
connection.onDocumentRangeFormatting(async (handler) => onDocumentRangeFormatting(handler, documents));
connection.onImplementation(async (handler) => onImplementation(handler, documents, symbolManager));
connection.onSignatureHelp(async (handler) => onSignatureHelp(handler, documents, symbolManager));

connection.onRequest('request/extractQuotes', async (params) => {
	if(params.fsPath === undefined) {
		let resultArray:string[] = [];
		for(const key of preprocessedFilesCacheMap.keys()) {
			const prepText = preprocessedFilesCacheMap.get(key) ?? '';
			const result = tokenizeQuotesWithIndex(prepText);
			const fileResultArray = [...result.values()] ?? [];
			resultArray = [...resultArray, ...fileResultArray];
		}
		if(params.types === 'single') {
			resultArray = resultArray.filter(x=>x.startsWith('\''));
		} else if(params.types === 'double') {
			resultArray = resultArray.filter(x=>x.startsWith('\"'));
		}

		resultArray = [...new Set([...resultArray])];
		connection.sendNotification('response/extractQuotes', { resultArray } );
		return;
	}
	
	const { text, fsPath } = params;
	const prepText = preprocessedFilesCacheMap.get(fsPath) ?? '';
	const result = tokenizeQuotesWithIndex(prepText);
	let resultArray = [...result.values()] ?? [];
	if(params.types === 'single') {
		resultArray = resultArray.filter(x=>x.startsWith('\''));
	} else if(params.types === 'double') {
		resultArray = resultArray.filter(x=>x.startsWith('\"'));
	}

	connection.sendNotification('response/extractQuotes', { resultArray } );
});


connection.onRequest('request/preprocessed/file', async (params) => {
	const { path, range } = params;
	const text = preprocessedFilesCacheMap.get(path);
	connection.sendNotification('response/preprocessed/file', { path, text } );
});


connection.onRequest('request/analyzeText/findNouns', async (params) => {
	const { path, position, text } = params;
	
	const preprocessedText = preprocessedFilesCacheMap.get(path);
	const array = preprocessedText?.split(/\r?\n/) ?? [];
	const line = array[position.line];
	
	connection.console.log(`Analyzing: ${line} / ${text}`);

	if(line) {
		const tree = analyzeText(line);
		
		// Calculate where to best put the suggestions
		const symbol = symbolManager.findClosestSymbolKindByPosition(path, SymbolKind.Object, position);
		if(symbol) {
			const level = symbolManager.additionalProperties.get(path)?.get(symbol)?.level + 1;
			//connection.console.log(`Closest object symbol: ${symbol.name}, therefore range ${symbol.range}`);
			connection.sendNotification('response/analyzeText/findNouns', { tree, range: symbol.range, level } );
		}
	} 

});

connection.onRequest('request/parseDocuments', async ({ globalStoragePath, makefileLocation, filePaths, token }) => {
	serverState.tadsVersion = 3;
	await preprocessAndParseTads3Files(globalStoragePath, makefileLocation, filePaths, token); 
});

connection.onRequest('request/parseTads2Documents', async ({ globalStoragePath, mainFileLocation, filePaths, token }) => {
	serverState.tadsVersion = 2;
	await preprocessAndParseTads2Files(globalStoragePath, mainFileLocation, filePaths, token); 
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
connection.listen();

function analyzeText(text: string) {
	const tagger = posTagger();
	const tagged = tagger.tagSentence(text);
	const nnTagged = tagged.filter((x:any) => x.pos.startsWith('NN'));
	const uniqueValues = new Set(nnTagged.map((x:any)=>x.value as string));
	return [...uniqueValues];
}
const regExp = /^(.*)_(in|out)$/;
	
function parseDirection(directionName: any): string|undefined {
	const result = regExp.exec(directionName);
	if (result) {
		switch (result[1]) {
			case 'n': return 'north';
			case 's': return 'south';
			case 'e': return 'east';
			case 'w': return 'west';
			case 'ne': return serverState.tadsVersion===2?'ne':'northeast';
			case 'nw': return serverState.tadsVersion===2?'nw':'northwest';
			case 'se': return serverState.tadsVersion===2?'se':'southeast';
			case 'sw': return serverState.tadsVersion===2?'sw':'southwest';
		}
	}
	return undefined;
	//throw new Error(`Not a valid direction`);
}

