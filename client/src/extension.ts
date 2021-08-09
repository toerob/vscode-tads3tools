/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { exec } from 'child_process';
import { existsSync, fstat, read, readFile, readFileSync, readSync, statSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument, languages, CancellationToken, Range, ViewColumn, WebviewOptions, WebviewPanel, DocumentSymbol, TextDocumentChangeEvent, TextEditor, FileSystemWatcher, RelativePattern, Terminal, MessageItem, Position } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { setupVisualEditorResponseHandler, visualEditorResponseHandlerMap, getHtmlForWebview } from './visual-editor';
import { Tads3CompileErrorParser } from './tads3-error-parser';
import { Subject, debounceTime } from 'rxjs';
import { LocalStorageService } from './local-storage-service';
import { writeFileSync } from 'fs';

let errorDiagnostics = [];
const collection = languages.createDiagnosticCollection('tads3diagnostics');

const tads3CompileErrorParser = new Tads3CompileErrorParser();
let allFilesBeenProcessed = false;
let isLongProcessingInAction = false;

let serverProcessCancelTokenSource: CancellationTokenSource;
let chosenMakefileUri: Uri | undefined;

// A string array of preprocessed files available for retrieval from the server
// via request: 'request/preprocessed/file'
let preprocessedList: string[];

export let tads3VisualEditorPanel: WebviewPanel | undefined = undefined;


const preprocessedFilesMap: Map<string, string> = new Map();

export let client: LanguageClient;

let storageManager;

const persistedObjectPositions = new Map();

let selectedObject: DocumentSymbol | undefined;
let lastChosenTextDocument: TextDocument | undefined;
let lastChosenTextEditor;
let isUsingAdv3Lite = false;

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
			fileEvents: workspace.createFileSystemWatcher('**/.{t,h,t3m,clientrc}')
		}
	};

	client = new LanguageClient('Tads3languageServer', 'Tads3 Language Server', serverOptions, clientOptions);
	client.start();

	storageManager = new LocalStorageService(context.workspaceState);

	context.subscriptions.push(workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)));


	/*context.subscriptions.push(workspace.onDidOpenTextDocument(async (textDocument) => {
		//
	}));*/

	context.subscriptions.push(commands.registerCommand('tads3.enablePreprocessorCodeLens', enablePreprocessorCodeLens));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextAction', (params) => showPreprocessedTextAction(params ?? undefined)));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextForCurrentFile', showPreprocessedTextForCurrentFile));

	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedFileQuickPick', showPreprocessedFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.openProjectFileQuickPick', openProjectFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.openInVisualEditor', () => openInVisualEditor(context)));

	context.subscriptions.push(commands.registerCommand('tads3.restartGameRunnerOnT3ImageChanges', () => toggleGameRunnerOnT3ImageChanges()));
	context.subscriptions.push(commands.registerCommand('tads3.analyzeTextAtPosition', () => analyzeTextAtPosition()));
	context.subscriptions.push(commands.registerCommand('tads3.installTracker', () => installTracker(context)));



	window.onDidChangeTextEditorSelection(e => {
		lastChosenTextEditor = e.textEditor;
	});

	window.onDidChangeActiveTextEditor((event: any) => {
		lastChosenTextDocument ??= event.document;
		if (lastChosenTextDocument) {
			client.info(`Last chosen editor changed to: ${lastChosenTextDocument.uri}`);
		}
	});

	setupVisualEditorResponseHandler();

	client.onReady().then(async () => {

		client.onNotification('response/makefile/keyvaluemap', ({ makefileStructure, usingAdv3Lite }) => {
			isUsingAdv3Lite = usingAdv3Lite;
		});

		client.onNotification('response/connectrooms', async ({ fromRoom, toRoom, validDirection1, validDirection2 }) => {
			client.info(`Connect from  ${fromRoom.symbol.name}  (${fromRoom.filePath}) to ${toRoom.symbol.name} (${toRoom.filePath}) via ${validDirection1 / validDirection2} to (${toRoom.filePath})?`);
			
			
			// Must begin with the room furthest down in the document,
			// otherwise the position will be stale and the new direction property
			// will be placed above the room object

			//TODO: refactor this to be less verbose: lot's of redundancy here
			if(fromRoom.symbol.range.start.line > toRoom.symbol.range.start.line) {
				await workspace.openTextDocument(fromRoom.filePath)
					.then(doc=>window.showTextDocument(doc,ViewColumn.One)
					.then(editor => {
						editor.edit(editor => {
							const pos = new Position(fromRoom.symbol.range.end.line, 0);
							const text = `\t${validDirection1} = ${toRoom.symbol.name}\n`;
							editor.insert(pos, text);
						});
						return editor;
					}));

				await workspace.openTextDocument(toRoom.filePath)
					.then(doc=>window.showTextDocument(doc,ViewColumn.One)
					.then(editor => {
						editor.edit(editor => {
							const pos = new Position(toRoom.symbol.range.end.line, 0);
							const text = `\t${validDirection2} = ${fromRoom.symbol.name}\n`;
							editor.insert(pos, text);
						});
						return editor;
					}));

			// Shifted order here:
			} else {
					await workspace.openTextDocument(toRoom.filePath)
					.then(doc=>window.showTextDocument(doc,ViewColumn.One))
					.then(editor => {
						editor.edit(editor => {
							const pos = new Position(toRoom.symbol.range.end.line, 0);
							const text = `\t${validDirection2} = ${fromRoom.symbol.name}\n`;
							editor.insert(pos, text);
						});
						return editor;
					});
					await workspace.openTextDocument(fromRoom.filePath)
					.then(doc=>window.showTextDocument(doc,ViewColumn.One))
					.then(editor => {
						editor.edit(editor => {
							const pos = new Position(fromRoom.symbol.range.end.line, 0);
							const text = `\t${validDirection1} = ${toRoom.symbol.name}\n`;
							editor.insert(pos, text);
						});
						return editor;
					});
			}

			await workspace.openTextDocument(fromRoom.filePath)
			.then(x=>x.save())
			.then(saveResult=>console.log(`${saveResult} saved `));

			if(fromRoom.filePath !== toRoom.filePath) {
				await workspace.openTextDocument(toRoom.filePath)
				.then(x=>x.save())
				.then(saveResult=>console.log(`${saveResult} saved `));
			}

		});


		client.onNotification('response/analyzeText/findNouns', async ({ tree, range, level }) => {
			//
			client.info(tree);
			//window.showInformationMessage(tree);
			const options = tree; //.map(x => (x.value));
			/*const i: MessageItem = {
				title: ''
			};*/
			if (options.length === 0) {
				window.showInformationMessage(`No suggestions for that line`);
				return;
			}
			const result = await window.showQuickPick(options, {
				canPickMany: true,
			});

			for (const noun of result) {
				await window.activeTextEditor.edit(editor => {
					// Insert the line after the closing range of the current object
					const pos = new Position(range.end.line + 1, 0);

					// FIXME: Level isn't working:
					
					const levelArray = [];
					for (let i = 0; i < level; i++) { 
						levelArray.push('+');
					}

					const text = isUsingAdv3Lite ?
						`${levelArray.join('')} ${noun} : Decoration '${noun}';\n` 				// Adv3Lite style
						: `${levelArray.join('')} ${noun} : Decoration '${noun}' '${noun}';\n`; 	// Adv3 style

					editor.insert(pos, text);
				});
			}

		});

		client.onNotification('response/mapsymbols', symbols => {
			if (tads3VisualEditorPanel && symbols && symbols.length > 0) {
				client.info(`Updating webview with new symbols`);
				try {
					overridePositionWithPersistedCoordinates(symbols);
					tads3VisualEditorPanel.webview.postMessage({ command: 'tads3.addNode', objects: symbols });
				} catch (err) {
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
					//if (lastChosenTextDocument) {
						window.showTextDocument(textDocument, {
							preserveFocus: true,
							selection: selectedObject.range,
							viewColumn: ViewColumn.One,
						});
					//}
				});
			}
		});


		client.onNotification('response/preprocessed/file', ({ path, text }) => {
			preprocessedFilesMap.set(path, text);
			client.info(`Server response for ${path}: ` + text);
			workspace
				.openTextDocument({ language: 'tads3', content: text })
				.then(doc => window.showTextDocument(doc, ViewColumn.Beside));
		});

		client.onNotification('response/preprocessed/list', (filesNames: string[]) => {
			preprocessedList = filesNames;
		});

		client.onNotification("symbolparsing/allfiles/success", ({ elapsedTime }) => {
			if (isLongProcessingInAction) {
				window.showInformationMessage(`All project and library files are now parsed (elapsed time: ${elapsedTime} ms)`);
			} else {
				client.info(`File parsed (elapsed time: ${elapsedTime} ms)`);
			}
			client.sendNotification('request/mapsymbols');
			isLongProcessingInAction = false;
		});

		initialParse();

	});

}



export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}



export async function findAndSelectMakefileUri(askIfNotFound = true) {
	let choice: Uri = undefined;
	const files = await workspace.findFiles(`**/*.t3m`);
	if (files.length > 1) {
		if (askIfNotFound) {
			window.showInformationMessage(`Select which Makefile the project uses`);
			const qpItemMap = new Map();
			files.forEach(x => qpItemMap.set(basename(x.path), x));
			const entriesStr: string[] = Array.from(qpItemMap.keys());
			const pick = await window.showQuickPick(entriesStr);
			choice = qpItemMap.get(pick);
		} else {
			choice = files[0];
			window.showInformationMessage(`Using first found makefile in project`);
		}
	} else if (files.length == 1) {
		choice = files[0];
	} else {
		if (!choice && askIfNotFound) {
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
		console.error(`No makefile could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
		return;
	}
	if (!t3FileSystemWatcher) {
		setupAndMonitorBinaryGamefileChanges(); // Client specific feature
	}
	await diagnosePreprocessAndParse(textDocument);
}


async function diagnosePreprocessAndParse(textDocument: TextDocument) {

	client.info(`Diagnosing`);
	await diagnose(textDocument);
	if (errorDiagnostics.length > 0) {
		//throw new Error('Could not assemble outliner symbols since there\'s an error. ');
		//window.showWarningMessage(`Could not assemble outliner symbols since there\'s an error. `);
		return;
	}
	//allFilesBeenProcessed = true;
	client.info(`Diagnosing went by with no errors`);
	if (!allFilesBeenProcessed) {
		isLongProcessingInAction = true;
		allFilesBeenProcessed = true;
		client.info(`Preprocess and parse all documents`);
		preprocessAndParseDocument();
		return;
	} else {

		if (isLongProcessingInAction) {
			client.info(`Skipping parsing since long processing is in action`);
		} else {
			client.info(`Preprocess and parse ${textDocument.uri.fsPath}`);
			preprocessAndParseDocument([textDocument]);
		}


	}
}



let t3FileSystemWatcher: FileSystemWatcher = undefined;

let gameRunnerTerminal: Terminal = undefined;

const runGameInTerminalSubject = new Subject();

function setupAndMonitorBinaryGamefileChanges() {
	if (gameRunnerTerminal) {
		client.info(`Game runner terminal already set up, skipping`);
		return;
	}
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
		client.info(`${event.fsPath} changed, restarting ${fileBaseName}`);
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
	return new Promise((resolve, reject) => {
		let result = '';
		const childProcess = exec(command, /*{maxBuffer: 1024 * 50000 }*/); 	//TODO: make configurable
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
	const filePaths = textDocuments?.map(x => x.uri.fsPath) ?? undefined;  //[window.activeTextEditor.document.uri.fsPath];
	await window.withProgress({
		location: ProgressLocation.Window,
		title: 'Parsing symbols',
		cancellable: false
	}, async (progress, withProgressToken) => {
		withProgressToken.onCancellationRequested(async () => {
			await cancelParse();
			return false;
		});
		client.onNotification('symbolparsing/success', ([filePath, tracker, totalFiles, poolSize]) => {
			const filename = basename(Uri.parse(filePath).path);
			progress.report({ message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}` });
			// TODO: maybe show "stale data" indicator instead
			/*if (tads3VisualEditorPanel) {
				client.info(`Since new symbols have been parsed and the webviewpanel is open, ask for new mapsymbols `);
				client.sendNotification('request/mapsymbols');			
			}*/
		});
		await executeParse(chosenMakefileUri.fsPath, filePaths);
		return true;
	});
}

export async function executeParse(makefileLocation: string, filePaths): Promise<any> {
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
	const [range, uri, preprocessedText] = params;
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
	client.sendRequest('request/preprocessed/file', { path: fsPath });
}

const findQuoteInStringRegExp = new RegExp(/["](.*)["]|['](.*)[']|["]{3}(.*)["]{3}|[']{3}(.*)[']{3}/);

function analyzeTextAtPosition() {
	if (window.activeTextEditor.selection.isEmpty) {
		// the Position object gives you the line and character where the cursor is
		const fsPath = window.activeTextEditor.document.uri.fsPath;
		const position = window.activeTextEditor.selection.active;
		const text = window.activeTextEditor.document.lineAt(position.line).text;
		const quote = findQuoteInStringRegExp.exec(text);

		if(quote) {
			const firstQuote = quote[1];
			window.showInformationMessage(`Analyzing ${firstQuote}`);
			client.sendRequest('request/analyzeText/findNouns', { path: fsPath, position, firstQuote });
	
		}


	}

}



function showPreprocessedFileQuickPick() {
	window.showQuickPick(preprocessedList)
		.then(choice => client.sendRequest('request/preprocessed/file', { path: choice }));
}

function openProjectFileQuickPick() {
	window.showQuickPick(preprocessedList)
		.then(p => p && workspace.openTextDocument(p))
		.then(window.showTextDocument);
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

	client.info(`Opening up the webview and ask server for map symbols`);
	client.sendNotification('request/mapsymbols');

	// TODO: redraw when back into focus

	tads3VisualEditorPanel.webview.onDidReceiveMessage(event => {
		const routine = visualEditorResponseHandlerMap.get(event.command);
		if (!routine) {
			console.error(`No handler installed for: ${event.command}`);
			return;
		}
		routine(event.payload, persistedObjectPositions);
	});
}


/*
TODO: update webview function. 

The old code:

updateWebview(webviewPanel: WebviewPanel, document: any , symbols = undefined) {
	webviewPanel.webview.postMessage({
		type: 'update',
		payload: document.getText(),
	});
	webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

	if(symbols) {
		try {
			webviewPanel.webview.postMessage({ command: 'tads3.addNode', objects: symbols  });
		} catch(err) {
			console.error(err);
		}
	}

}*/



// TODO: this functionality probably need to go to the server side this time
function overridePositionWithPersistedCoordinates(mapObjects: any[] /*DefaultMapObject[]*/) {
	const itemsToPersist = [];
	for (const node of mapObjects) {
		const persistedPosition = persistedObjectPositions.get(node.name);
		if(persistedPosition) {
			console.log(`${node.name} has persisted position: ${persistedPosition[0]}/${persistedPosition[1]}`);
		}
		if (persistedPosition && persistedPosition.length === 2) {
			const x = persistedPosition[0];
			const y = persistedPosition[1];
			if (x && y) {
				node.x = x;
				node.y = y;
				node.hasAbsolutePosition = true;
				itemsToPersist.push(node);
			}
		}
	}
	if (itemsToPersist.length > 0) {
		storageManager?.setValue('persistedMapObjectPositions', itemsToPersist);
	}
}

async function initialParse() {
	if (window.activeTextEditor.document) {
		const textDocument = window.activeTextEditor.document;
		client.info(`Trying to locate a default makefile`);

		if (chosenMakefileUri === undefined) {
			chosenMakefileUri = await findAndSelectMakefileUri(false);
		}
		if (chosenMakefileUri === undefined) {
			console.error(`No makefile could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
			return;
		}

		client.info(`Found a makefile: ${chosenMakefileUri.fsPath}`);
		if (!t3FileSystemWatcher) {
			client.info(`Setting up t3 image monitor `);
			if (!t3FileSystemWatcher) {
				setupAndMonitorBinaryGamefileChanges(); // Client specific feature
			}
		}
		await diagnosePreprocessAndParse(textDocument);
	}
}

async function installTracker(context: ExtensionContext) {

	const filePath = isUsingAdv3Lite? '_gameTrackerAdv3Lite.t' : '_gameTrackerAdv3.t';

	const trackerFileContents = readFileSync(Uri.joinPath(context.extensionUri, 'resources', filePath).fsPath).toString();
	
	if (chosenMakefileUri) {
		const workspaceFolder = dirname(chosenMakefileUri.fsPath);
		if (workspaceFolder) {
			const gameTrackerFilePath = path.join(workspaceFolder, filePath);
			const isATrackerFileAlreadyCreated = existsSync(gameTrackerFilePath);
			await workspace.openTextDocument(chosenMakefileUri.fsPath)
				.then(doc => window.showTextDocument(doc, ViewColumn.Beside))
				.then(async editor => {
					await editor.edit((ed) => {
						const trackerFile = isUsingAdv3Lite? '_gameTrackerAdv3Lite' : '_gameTrackerAdv3';
						const makefileText = editor.document.getText();
						const isTrackerFileAlreadyIncluded = makefileText.includes(`-source ${trackerFile}`);
						if (isTrackerFileAlreadyIncluded) {
							return window.showWarningMessage(`Tracker file was already included in ${chosenMakefileUri.fsPath}`);
						}
						const idx = makefileText.lastIndexOf('-source');
						const lastSourceRowPosition = editor.document.positionAt(idx);
						const lineBelow = lastSourceRowPosition.translate(1).with({ character: 0 });
						ed.insert(lineBelow, `-source ${trackerFile}\n`);
						const includedFileRange = new Range(lineBelow.line, 0, lineBelow.line, 0);
						editor.revealRange(includedFileRange);
						return window.showInformationMessage(`Tracker file was included in ${chosenMakefileUri.fsPath}`);
					});
					await editor.document.save();
				});


			if(!isATrackerFileAlreadyCreated) {
				await writeFileSync(gameTrackerFilePath, trackerFileContents, 'utf-8');
				await workspace.openTextDocument(gameTrackerFilePath)
					.then(doc=>window.showTextDocument(doc,ViewColumn.Beside));	
				window.showInformationMessage(`The tracker file (_game_tracker.t) has been added into the project's folder. `);
				return;
			} 
			window.showWarningMessage(`The tracker file (_game_tracker.t) is already in the project's folder. `);
		}
	}

}

