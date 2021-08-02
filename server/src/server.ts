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
	CancellationTokenSource} from 'vscode-languageserver/node';



//import { threadId, Worker as WorkerThreads } from 'worker_threads';
import path = require('path');
import { Tads3SymbolManager } from './modules/symbol-manager';
import { onDocumentSymbol } from './modules/symbols';
import { onReferences } from './modules/references';
import { onDefinition } from './modules/definitions';
import { preprocessAndParseFiles } from './parse-workers-manager';
import { workspace } from 'vscode';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefaultMapObject } from './modules/mapcrawling/DefaultMapObject';
import MapObjectManager from './modules/mapcrawling/map-mapping';
//import { onCodeLens } from './modules/codelens';



export const preprocessedFilesCacheMap = new Map<string, string>();
export const symbolManager = new Tads3SymbolManager();
export const mapper = new MapObjectManager(symbolManager);

export default function processMapSymbols(symbolManager: Tads3SymbolManager, callback: any) {
	const symbols = mapper.mapGameObjectsToMapObjects();
	callback(symbols);
}

const hasSymbolsToFetch = new Map<string, boolean>();


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
			referencesProvider: true,
			definitionProvider: true,
			/*codeLensProvider: {
				resolveProvider: true,
			},*/
			textDocumentSync: {
				openClose: true,
				change: TextDocumentSyncKind.Full,
			},
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
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

	connection.onNotification('request/mapsymbols', () => {
		processMapSymbols(symbolManager, (symbols: DefaultMapObject[]) => {
			// TODO: doesn't show up in the client
			connection.sendNotification('response/mapsymbols', symbols);
		});
	});


});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'Tads3LanguageServer'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(params => {
	validateTextDocument(params.document);
});


async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	//const settings = await getDocumentSettings(textDocument.uri);
	const diagnostics: Diagnostic[] = [];
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}


connection.onDidChangeWatchedFiles(_change => {
	connection.console.log('We received an file change event');
});

connection.onDocumentSymbol(async (handler) => onDocumentSymbol(handler, documents, symbolManager));
connection.onReferences(async (handler) => onReferences(handler,documents, symbolManager));
connection.onDefinition(async (handler) => onDefinition(handler,documents, symbolManager));

//connection.onCodeLens(async (handler) => onCodeLens(handler,documents, symbolManager));


connection.onRequest('request/preprocessed/file', async (params) => {
	const { path, range } = params;
	const text = preprocessedFilesCacheMap.get(path);
	connection.sendNotification('response/preprocessed/file', { path, text } );
});
	
connection.onRequest('executeParse', async ({ makefileLocation, filePaths, token }) => {
	await preprocessAndParseFiles(makefileLocation, filePaths, token); 
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

connection.listen();


