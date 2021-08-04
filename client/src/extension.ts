/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { exec } from 'child_process';
import { existsSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument, languages, CancellationToken, Range, ViewColumn, WebviewOptions, WebviewPanel, DocumentSymbol, TextDocumentChangeEvent, TextEditor, FileSystemWatcher, RelativePattern, Terminal } from 'vscode';

import {
	ConnectionError,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { setupVisualEditorResponseHandler, visualEditorResponseHandlerMap, getHtmlForWebview } from './visual-editor';
import { Tads3CompileErrorParser } from './tads3-error-parser';
import { Subject, debounceTime } from 'rxjs';

let errorDiagnostics = [];
const collection = languages.createDiagnosticCollection('tads3diagnostics');

const tads3CompileErrorParser = new Tads3CompileErrorParser();
let allFilesBeenProcessed = false;

let serverProcessCancelTokenSource: CancellationTokenSource;
let chosenMakefileUri: Uri|undefined;

 // A string array of preprocessed files available for retrieval from the server
 // via request: 'request/preprocessed/file'
let preprocessedList: string[];

export let tads3VisualEditorPanel: WebviewPanel|undefined = undefined;


const preprocessedFilesMap: Map<string,string> = new Map();

export let client: LanguageClient;

let selectedObject: DocumentSymbol | undefined;
let lastChosenTextDocument: TextDocument | undefined;
let lastChosenTextEditor;

export function getLastChosenTextEditor() { return lastChosenTextEditor; }

export function activate(context: ExtensionContext) {
	const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));

	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{ scheme: 'untitled', language: 'tads3' },
			{ scheme: 'file', language: 'tads3' }],
		synchronize: {
			// Notify the server about file changes to '.t, .h, and .clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.{t,h,clientrc}')
		}
	};

	client = new LanguageClient('Tads3languageServer', 'Tads3 Language Server', serverOptions, clientOptions);
	client.start();

	
	context.subscriptions.push(workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)));
	context.subscriptions.push(commands.registerCommand('tads3.enablePreprocessorCodeLens', enablePreprocessorCodeLens));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextAction', (params) => showPreprocessedTextAction(params ?? undefined)));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextForCurrentFile', showPreprocessedTextForCurrentFile));

	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedFileQuickPick', showPreprocessedFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.openInVisualEditor', () => openInVisualEditor(context)));
	
	context.subscriptions.push(commands.registerCommand('tads3.restartGameRunnerOnT3ImageChanges', () => toggleGameRunnerOnT3ImageChanges()));


	
	window.onDidChangeTextEditorSelection(e => {
		lastChosenTextEditor = e.textEditor;
	});
	
	window.onDidChangeActiveTextEditor((event: any) => {
		lastChosenTextDocument ??= event.document;
		if (lastChosenTextDocument) {
			console.log(`Last chosen editor changed to: ${lastChosenTextDocument.uri}`);			
		}
	});

	setupVisualEditorResponseHandler();

	client.onReady().then(() => {
		
		client.onNotification('response/mapsymbols', symbols => {
			if(tads3VisualEditorPanel && symbols && symbols.length>0) {
				console.log(`Updating webview with new symbols`);
				try {
					tads3VisualEditorPanel.webview.postMessage({ command: 'tads3.addNode', objects: symbols  });
				} catch(err) {
					console.error(err);
				}
			}
		});

		// This is used by the map handler:
		// If the client has asked the server to locate a symbol,
		// The server responds by sending the client the symbol and filepath back
		// if it finds anything, therefore "found" 
		client.onNotification('response/foundsymbol', ({ symbol, filePath }): void => {
			if (symbol && filePath) {
				selectedObject = symbol as DocumentSymbol; // keep track of the last selected object
				workspace.openTextDocument(filePath).then(textDocument => {
					//const lastSelectedTextDocument = textDocument;
					if (lastChosenTextDocument) {
						window.showTextDocument(textDocument, {
							preserveFocus: true,
							selection: selectedObject.range,
						});
					}
				});
			}
		});


		client.onNotification('response/preprocessed/file', ({ path, text }) => {
			preprocessedFilesMap.set(path, text);
			console.log(`Server response for ${path}: ` +text);
			workspace
				.openTextDocument({ language: 'tads3', content: text })
				.then(doc => window.showTextDocument(doc, ViewColumn.Beside));
		});
	
		client.onNotification('response/preprocessed/list', (filesNames: string[]) => {
			preprocessedList = filesNames;
		});

		client.onNotification("symbolparsing/allfiles/success", ({ elapsedTime }) => {
			window.showInformationMessage(`File(s) parsed in ${elapsedTime} ms`);
			client.sendNotification('request/mapsymbols');				
		});

	});

}



export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}



export async function findAndSelectMakefileUri() {
	let choice: Uri = undefined;
	const files = await workspace.findFiles(`**/*.t3m`);
	if (files.length > 1) {
		window.showInformationMessage(`Select which Makefile the project uses`);
		const qpItemMap = new Map();
		files.forEach(x => qpItemMap.set(basename(x.path), x));
		const entriesStr: string[] = Array.from(qpItemMap.keys());
		const pick = await window.showQuickPick(entriesStr);
		choice = qpItemMap.get(pick);
	} else if (files.length == 1) {
		choice = files[0];
	} else {
		if (!choice) {
			const file = await window.showOpenDialog({
				title: `Select which folder the project's makefile (*.t3m) is located within`,
				filters: { 'Makefiles': ['t3m'] },
				openLabel: `Choose  makefile (*.t3m)`,
				canSelectFolders: false,
				canSelectFiles: true,
			});
			if (file.length > 0 && file[0] !== undefined) {
				choice = files[0];
			}
		}
	}
	if (choice === undefined) {
		console.error(`No Makefile.t3m found, source code could not be processed.`);
	}
	return Promise.resolve(choice);
}


let currentTextDocument: TextDocument | undefined;


async function onDidSaveTextDocument(textDocument: any) {
	currentTextDocument = textDocument;

	if (chosenMakefileUri && !existsSync(chosenMakefileUri.path)) {
		chosenMakefileUri = undefined;
	}

	if (chosenMakefileUri === undefined) {
		chosenMakefileUri = await findAndSelectMakefileUri();
	}

	if (chosenMakefileUri === undefined) {
		return;
	}
	
	if (chosenMakefileUri === undefined) {
		console.error(`No makefile could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
		return;
	}
	if(!t3FileSystemWatcher) {
		setupAndMonitorBinaryGamefileChanges(); // Client specific feature
	}
	await diagnosePreprocessAndParse(textDocument);
}


async function diagnosePreprocessAndParse(textDocument: TextDocument) {
	
	await diagnose(textDocument);
	if (errorDiagnostics.length > 0) {
		//throw new Error('Could not assemble outliner symbols since there\'s an error. ');
		//window.showWarningMessage(`Could not assemble outliner symbols since there\'s an error. `);
		return;
	}
	//allFilesBeenProcessed = true;

	if (!allFilesBeenProcessed) {
		allFilesBeenProcessed = true;
		preprocessAndParseDocument();
		return;
	} else {
		preprocessAndParseDocument([textDocument]);
	}
}



let t3FileSystemWatcher: FileSystemWatcher = undefined;

let gameRunnerTerminal: Terminal = undefined;

const runGameInTerminalSubject = new Subject();

function setupAndMonitorBinaryGamefileChanges() {
	const workspaceFolder = dirname(chosenMakefileUri.fsPath);
	t3FileSystemWatcher = workspace.createFileSystemWatcher(new RelativePattern(workspaceFolder, "*.t3"));
	runGameInTerminalSubject.pipe(debounceTime(300)).subscribe((event: any) => {
		const configuration = workspace.getConfiguration("tads3");
		if (!configuration.get("restartGameRunnerOnT3ImageChanges")) {
			return;
		}
		const fileBaseName = basename(event.fsPath);
		if (gameRunnerTerminal) {
			gameRunnerTerminal.sendText(`quit`);
			gameRunnerTerminal.sendText(`y`);
			gameRunnerTerminal.sendText(``);
			gameRunnerTerminal.dispose();
		}
		gameRunnerTerminal = window.createTerminal('Game runner terminal');
		console.log(`${event.fsPath} changed, restarting ${fileBaseName}`);
		gameRunnerTerminal.show(true);
		gameRunnerTerminal.sendText(`frob ${fileBaseName}`);
		window.showTextDocument(window.activeTextEditor.document);
	});
	t3FileSystemWatcher.onDidChange(event => runGameInTerminalSubject.next(event));
}




// Commands

async function toggleGameRunnerOnT3ImageChanges() {
	const configuration = workspace.getConfiguration("tads3");
	const oldValue = configuration.get("restartGameRunnerOnT3ImageChanges");
	configuration.update("restartGameRunnerOnT3ImageChanges", !oldValue, true);
}


function enablePreprocessorCodeLens(arg0: string, enablePreprocessorCodeLens: any) {
	const configuration = workspace.getConfiguration("tads3");
	const oldValue = configuration.get("enablePreprocessorCodeLens");
	configuration.update("enablePreprocessorCodeLens", !oldValue);
}


async function diagnose(textDocument: TextDocument) {
	const tads3ExtensionConfig = workspace.getConfiguration('tads3');
	const compilerPath = tads3ExtensionConfig?.compiler?.path ?? 't3make';
	const resultOfCompilation = await runCommand(`${compilerPath} -nobanner -q -f "${chosenMakefileUri.path}"`);
	parseDiagnostics(resultOfCompilation.toString(), textDocument);
}

async function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument) {
	errorDiagnostics = tads3CompileErrorParser.parse(resultOfCompilation, textDocument);
	collection.set(textDocument.uri, errorDiagnostics);
}



export function runCommand(command: string) {
	return new Promise( (resolve, reject) => {
		let result = '';
		const childProcess = exec(command, /*{maxBuffer: 1024 * 50000 }*/ ); 	//TODO: make configurable
		try {
			childProcess.stdout.on('data', (data: any) => {
				result += data;
			});
			childProcess.on('close', function () {
				resolve(result);
			});
		} catch (error) {
			reject(error);
		}
		return result;
	});
}

//----------------------------


async function preprocessAndParseDocument(textDocuments: TextDocument[] | undefined = undefined) {
	const filePaths = textDocuments?.map(x=>x.uri.fsPath) ?? undefined;  //[window.activeTextEditor.document.uri.fsPath];
	await window.withProgress({
		location: ProgressLocation.Window,
		title: 'Parsing symbols',
		cancellable: false
	}, async (progress, withProgressToken) => {
		withProgressToken.onCancellationRequested(async () => {
			await cancelParse();
			return false;
		});
		client.onNotification('symbolparsing/success',([filePath, tracker, totalFiles]) => {
			const filename = basename(Uri.parse(filePath).path);
			progress.report({ message: ` ${tracker}/${totalFiles}: ${filename} done ` });
			
			// TODO: maybe show "stale data" indicator instead
			/*if (tads3VisualEditorPanel) {
			
				console.log(`Since new symbols have been parsed and the webviewpanel is open, ask for new mapsymbols `);
				client.sendNotification('request/mapsymbols');			
			}*/

		});

		await executeParse(chosenMakefileUri.fsPath, filePaths);
		return true;
	});
}

export async function executeParse(makefileLocation:string, filePaths): Promise<any> {
	await client.onReady();
	serverProcessCancelTokenSource = new CancellationTokenSource();
	await client.sendRequest('executeParse', {
		makefileLocation: makefileLocation, 
		filePaths: filePaths, 
		token: serverProcessCancelTokenSource.token
	});
}

export async function cancelParse(): Promise<any> {
	return new Promise((resolve) => {
		client.sendNotification('symbolparsing/abort');
		serverProcessCancelTokenSource?.cancel();
		return resolve(true);
	});
}



let preprocessDocument;

function showPreprocessedTextAction(params) {
	const [ range, uri, preprocessedText ] = params;
	if (preprocessDocument) {
		window.visibleTextEditors
			.find(editor => editor.document.uri.path === preprocessDocument.uri.path)
			.edit(prepDoc => {
				const wholeRange = preprocessDocument.validateRange(new Range(0, 0, preprocessDocument.lineCount, 0));
				prepDoc.replace(wholeRange, preprocessedText);
			}).then(() => {
				showAndScrollToRange(preprocessDocument, range);
			});
	} else {
		workspace.openTextDocument({ language: 'tads3', content: preprocessedText })
			.then(doc => {
				preprocessDocument = doc;
				showAndScrollToRange(doc, range);
			});
	}
}


function showPreprocessedTextForCurrentFile() {
	const fsPath = window.activeTextEditor.document.uri.fsPath;
	client.sendRequest('request/preprocessed/file', {path: fsPath});
}

function showPreprocessedFileQuickPick() {
	window.showQuickPick(preprocessedList)
	.then(choice => client.sendRequest('request/preprocessed/file', {path: choice}));
}

function showAndScrollToRange(document: TextDocument, range: Range) {
	const activeEditor = window.activeTextEditor;
	window.showTextDocument(document, {
		viewColumn: ViewColumn.Beside,
		preserveFocus: true,
		preview: true,
		selection: range,
	}).then(shownDoc => {
		shownDoc.revealRange(range);
		activeEditor.revealRange(range);
	});
}



/**
 * Visual editor webview for the project. Draws a map or npc details
 * @param context 
 * @returns 
 */
async function openInVisualEditor(context: ExtensionContext) {
	if (tads3VisualEditorPanel) {
		tads3VisualEditorPanel.reveal();
		client.sendNotification('request/mapsymbols');
		return;
	}

	tads3VisualEditorPanel = window.createWebviewPanel(
		'tads3VisualEditor',
		'Tads3 visual editor',
		{
			viewColumn: ViewColumn.Beside,
			preserveFocus: true
		}
	);

	const options: WebviewOptions = { enableScripts: true };
	tads3VisualEditorPanel.webview.options = options;
	tads3VisualEditorPanel.webview.html = getHtmlForWebview(tads3VisualEditorPanel.webview, context.extensionUri);
	tads3VisualEditorPanel.onDidDispose(() => {
		tads3VisualEditorPanel = undefined;
	}, null, context.subscriptions);
	
	console.log(`Opening up the webview and ask server for map symbols`);
	client.sendNotification('request/mapsymbols');

	tads3VisualEditorPanel.webview.onDidReceiveMessage(event => {
		const routine = visualEditorResponseHandlerMap.get(event.command);
		if (!routine) {
			console.error(`No handler installed for: ${event.command}`);
			return;
		}
		routine(event.payload);
	});
}
