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
	DocumentSymbol,
	DocumentSymbolParams,
	DocumentSymbolRequest
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
	// In this simple example we get the settings for every validate run.
	const settings = await getDocumentSettings(textDocument.uri);

	// The validator creates diagnostics for all uppercase words length 2 and more
	const text = textDocument.getText();
	const pattern = /\b[A-Z]{2,}\b/g;
	let m: RegExpExecArray | null;

	const problems = 0;
	const diagnostics: Diagnostic[] = [];
	/*while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		problems++;
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: textDocument.positionAt(m.index),
				end: textDocument.positionAt(m.index + m[0].length)
			},
			message: `${m[0]} is all uppercase.`,
			source: 'ex'
		};
		if (hasDiagnosticRelatedInformationCapability) {
			diagnostic.relatedInformation = [
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnostic.range)
					},
					message: 'Spelling matters'
				},
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnostic.range)
					},
					message: 'Particularly for names'
				}
			];
		}
		diagnostics.push(diagnostic);
	}*/

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return [
			{
				label: 'TypeScript',
				kind: CompletionItemKind.Text,
				data: 1
			},
			{
				label: 'JavaScript',
				kind: CompletionItemKind.Text,
				data: 2
			}
		];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			item.detail = 'TypeScript details';
			item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			item.detail = 'JavaScript details';
			item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);
class Tads3SymbolManager {
	symbols: Map<string, DocumentSymbol[]> = new Map();
}

const symbolManager = new Tads3SymbolManager();

connection.onDocumentSymbol((handler: DocumentSymbolParams) => {

	const symbols = symbolManager.symbols.get(handler.textDocument.uri);
	return symbols;
});



const preprocessedFilesCacheMap = new Map<string, string>();

function parseJob(filePath: string) {
	console.log(filePath);
	/*const input = CharStreams.fromString(preprocessedFilesCacheMap.get(filePath) ?? '');
	const lexer = new T3ParserLexer(input);
	const tokenStream = new CommonTokenStream(lexer);
	const parser = new T3ParserParser(tokenStream);
	const parseTreeWalker = new ParseTreeWalker();
	const listener = new Tads3SymbolListener();
	const parseTree = parser.program();
	try {
		parseTreeWalker.walk<T3ParserListener>(listener, parseTree);
	} catch (err) {
		console.error(`parseTreeWalker failed ${err}`);
	}
	connection.sendNotification('symbolparsing/success', filePath);
	connection.console.log(`${filePath} parsed successfully`);
	symbolManager.symbols.set(filePath, listener.symbols);	*/
}

connection.onRequest('executeParse', async ({ makefileLocation, filePaths, token }) => {
	await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);
	const allFilePaths = [...preprocessedFilesCacheMap.keys()]; //.splice(0, 16);

	const workerPool = Pool(() => spawn(new Worker('./worker')), 8);

	try {
		const startTime = Date.now();

		for (const filePath of allFilePaths) {
			workerPool.queue(async parseJob => {
				const text = preprocessedFilesCacheMap.get(filePath) ?? '';
				const symbols = await parseJob(filePath, text);
				console.log(symbols);
				symbolManager.symbols.set(filePath, symbols);
			});
		}
		await workerPool.completed();
		await workerPool.terminate();
		const elapsedTime = Date.now() - startTime;
		console.log(`All files parsed within ${elapsedTime} ms`);

	} catch (err) {
		console.error(err);
	}

	/*if(!token) {
		connection.console.error(`No cancellableToken received, this action will not be cancellable`);
	} else {
		token?.onCancellationRequested(async () => {
			connection.console.log('Cancellation requested');
			worker?.terminate().then((status) => {
				connection.console.log(`Canceled with status: ${status}`);
				throw new Error(`Canceled`);
			});
		});	
	}*/

	/*
	const cq = cargoQueue(() => async (tasks: any, callback: any) => {
		for(let i=0;i<tasks.length;i++) {
			const p = tasks[i].path;
			const text = tasks[i].text;
			console.log(`Parsing ${p}`);
			callback();
		}

		const input = CharStreams.fromString(text);
		const lexer = new T3ParserLexer(input);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new T3ParserParser(tokenStream);
		const parseTreeWalker = new ParseTreeWalker();
		const listener = new Tads3SymbolListener();
		const parseTree = parser.program();
		try {
			parseTreeWalker.walk<T3ParserListener>(listener, parseTree);
		} catch (err) {
			console.error(`parseTreeWalker failed ${err}`);
		}
		connection.sendNotification('symbolparsing/success', p);
		connection.console.log(`${p} parsed successfully`);
		symbolManager.symbols.set(p, listener.symbols);
		callback();
	});**/

	/*for (const filePath of allFilePaths) {
		const text = preprocessedFilesCacheMap.get(filePath);
		const filePathUriStr = URI.parse(filePath).toString();
		try {
			cq.push({ path: filePathUriStr, text: text });
		} catch (err) {
			console.error(err);
		}
	}

	await cq.drain(() => {
		console.log('All done!');
	}); */





	/*let worker: WorkerThreads;
	//return new Promise((resolve) => {
	for(const filePath of allFilePaths) {
		try {
			const uri  = URI.parse(filePath).toString();
			connection.console.log(`Begin parsing of ${filePath}`);
			const text = preprocessedFilesCacheMap.get(filePath);
			const worker = new WorkerThreads(path.resolve(__dirname, 'worker.js'), {workerData: { path: uri, text: text }});
			worker.on('message', ([error, symbols]) => {
				if (error) {
					connection.console.error(error.message);
					throw new Error(error.message);
				}
				symbolManager.symbols.set(uri, symbols);

				connection.sendNotification('symbolparsing/success', filePath);
				connection.console.log(`${uri} parsed successfully`);
				worker.terminate();
				//return symbols;
				//return resolve(symbols);
			});
	
		} catch(err) {
			console.error(err);
		}
	}*/
	return 'OK!';

	/*}).catch(err => {
		console.error(err);
	});*/
});


// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();


