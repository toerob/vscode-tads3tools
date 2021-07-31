/* eslint-disable @typescript-eslint/no-empty-function */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	DocumentSymbolParams,
	DocumentSymbolRequest,
	CancellationToken,
	CancellationTokenSource,
	DocumentSymbol,
	ServerRequestHandler
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

//import { threadId, Worker as WorkerThreads } from 'worker_threads';
import path = require('path');
import { connect } from 'http2';
import { CharStreams, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
import { preprocessAllFiles } from './parser/preprocessor';
import { fstat } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { cargoQueue } from 'async';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from './parser/Tads3Lexer';
import { Tads3Listener } from './parser/Tads3Listener';
import { Tads3Parser } from './parser/Tads3Parser';
import { Tads3SymbolListener } from './parser/Tads3SymbolListener';
import { spawn, expose, Pool, Worker, Thread } from 'threads';
import { Tads3SymbolManager } from './Tads3SymbolManager';
import { promisify } from 'util';
import { WorkspaceChange } from 'atom-languageclient/build/lib/languageclient';



const symbolManager = new Tads3SymbolManager();
const preprocessedFilesCacheMap = new Map<string, string>();
const hasSymbolsToFetch = new Map<string, boolean>();


// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

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
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	//const settings = await getDocumentSettings(textDocument.uri);
	const diagnostics: Diagnostic[] = [];
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}


connection.onDidChangeWatchedFiles(_change => {
	connection.console.log('We received an file change event');
});

const asyncSetTimeout = promisify(setTimeout);
async function asyncSleep(ms: number) {
	await asyncSetTimeout(ms);
	/*return new Promise( (resolve, reject) => {
		setTimeout(() => resolve(undefined), ms);
	});*/
}


connection.onDocumentSymbol(async (handler): Promise<DocumentSymbol[]> => {
	const fsPath = URI.parse(handler.textDocument.uri).fsPath;
	if (fsPath.endsWith('.t') || fsPath.endsWith('.h')) {
		while (!symbolManager.symbols.has(fsPath)) {
			connection.console.log(`${fsPath} is waiting for symbols`);
			await asyncSetTimeout(2000);
		}			
	}
	return symbolManager.symbols.get(fsPath) ?? [];
});



connection.onRequest('executeParse', async ({ makefileLocation, filePaths, token }) => {
	await preprocessAndParseAllFiles(makefileLocation, filePaths); 
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();


async function preprocessAndParseAllFiles(makefileLocation: any, filePaths: any) {
	await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);

	let allFilePaths = filePaths;

	// Parse project files close to the makefile first:
	if (filePaths === undefined) {
		const baseDir = Utils.dirname(URI.parse(makefileLocation)).fsPath;
		allFilePaths = [...preprocessedFilesCacheMap.keys()];
		allFilePaths = allFilePaths.sort((a:string, b:string) => {
			if (a.startsWith(baseDir)) {
				return -1;
			}
			return 0;
		});
	}

	// TODO: possibly make the project libraries be parsed before the std library:


	/*

		const preferredFilesfirst = ['misc.t', 'action.t', 'actor.t', 'travel.t'];
	
	const sortedByUtility = libraryPrepFiles.sort((a, b) => {
		for (let p of preferredFilesfirst) {
			if (a.endsWith(p)) {
				return -1;
			}
		}
		return 0;
	});
	//return sortedByUtility;

	/*const smallestFileFirst = sortedByUtility.sort(function(a, b) {
	  return statSync(a).size - statSync(b).size;
	});*/
	const poolMaxSize = 4;
	const poolSize = allFilePaths.length >= poolMaxSize? poolMaxSize : 1;

	const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);
	try {
		const startTime = Date.now();
		for (const filePath of allFilePaths) {

			//if (token !== undefined && token._isCancelled) {
			//token.onCancellationRequested(async () => {
			//connection.console.log('Cancellation requested');
			//});
			//throw new Error(`Parsing cancelled`);
			//}
			workerPool.queue(async (parseJob) => {
				const text = preprocessedFilesCacheMap.get(filePath) ?? '';
				const symbols = await parseJob(filePath, text);
				//connection.console.log(symbols);
				connection.sendNotification('symbolparsing/success', filePath);
				connection.console.log(`${filePath} parsed successfully`);
				symbolManager.symbols.set(filePath, symbols);
			});
		}
		await workerPool.completed();
		await workerPool.terminate();
		const elapsedTime = Date.now() - startTime;
		console.log(`All files parsed within ${elapsedTime} ms`);
		connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });
	} catch (err) {
		await workerPool.terminate();
		console.error(err);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
	}
}

