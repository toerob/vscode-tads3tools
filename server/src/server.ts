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
	CancellationTokenSource
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
import { T3ParserLexer } from './parser/T3ParserLexer';
import { T3ParserListener } from './parser/T3ParserListener';
import { T3ParserParser } from './parser/T3ParserParser';
import Tads3SymbolListener from './parser/Tads3SymbolListener';
import { spawn, expose, Pool, Worker, Thread } from 'threads';
import { Tads3SymbolManager } from './Tads3SymbolManager';



const symbolManager = new Tads3SymbolManager();
const preprocessedFilesCacheMap = new Map<string, string>();


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

connection.onDocumentSymbol((handler: DocumentSymbolParams) => {
	const fsPath = URI.parse(handler.textDocument.uri).fsPath;
	const symbols = symbolManager.symbols.get(fsPath);
	return symbols;
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

	const allFilePaths = filePaths ?? [...preprocessedFilesCacheMap.keys()];

	const workerPool = Pool(() => spawn(new Worker('./worker')), 4);
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

