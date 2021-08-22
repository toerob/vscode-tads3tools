/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { exec } from 'child_process';
import { copyFileSync, createReadStream, createWriteStream, existsSync, readFileSync, unlinkSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument, languages, Range, ViewColumn, WebviewOptions, WebviewPanel, DocumentSymbol, TextEditor, FileSystemWatcher, RelativePattern, Terminal, MessageItem, Position, TextEditorSelectionChangeKind, SnippetString } from 'vscode';
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
import { ensureDirSync } from 'fs-extra';
import axios from 'axios';
import { Extract } from 'unzipper';
import { rmdirSync } from 'fs';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

const collection = languages.createDiagnosticCollection('tads3diagnostics');
const tads3CompileErrorParser = new Tads3CompileErrorParser();

const preprocessedFilesMap: Map<string, string> = new Map();
const persistedObjectPositions = new Map();

let storageManager: LocalStorageService;
let selectedObject: DocumentSymbol | undefined;
let lastChosenTextDocument: TextDocument | undefined;
let lastChosenTextEditor: TextEditor;
let isUsingAdv3Lite = false;
let globalStoragePath: string;
let extensionCacheDirectory: string;
let currentTextDocument: TextDocument | undefined;
let extensionDownloadMap: Map<any, any>;

let errorDiagnostics = [];
let allFilesBeenProcessed = false;
let isLongProcessingInAction = false;
let serverProcessCancelTokenSource: CancellationTokenSource;
let chosenMakefileUri: Uri | undefined;
let preprocessedList: string[];

export let tads3VisualEditorPanel: WebviewPanel | undefined = undefined;
export let client: LanguageClient;

export function getUsingAdv3LiteStatus() {
	return isUsingAdv3Lite;
}

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
			fileEvents: workspace.createFileSystemWatcher('**/.{t,h,t3m,clientrc}'),
		}
	};

	client = new LanguageClient('Tads3languageServer', 'Tads3 Language Server', serverOptions, clientOptions);
	client.start();

	storageManager = new LocalStorageService(context.workspaceState);

	context.subscriptions.push(workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)));
	
	context.subscriptions.push(commands.registerCommand('tads3.extractAllQuotes', () => extractAllQuotes(context)));	
	context.subscriptions.push(commands.registerCommand('tads3.createTads3TemplateProject', () => createTemplateProject(context)));
	context.subscriptions.push(commands.registerCommand('tads3.setMakefile', setMakeFile));
	context.subscriptions.push(commands.registerCommand('tads3.enablePreprocessorCodeLens', enablePreprocessorCodeLens));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextAction', (params) => showPreprocessedTextAction(params ?? undefined)));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextForCurrentFile', showPreprocessedTextForCurrentFile));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedFileQuickPick', showPreprocessedFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.openProjectFileQuickPick', openProjectFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.openInVisualEditor', () => openInVisualEditor(context)));
	context.subscriptions.push(commands.registerCommand('tads3.restartGameRunnerOnT3ImageChanges', () => toggleGameRunnerOnT3ImageChanges()));
	context.subscriptions.push(commands.registerCommand('tads3.downloadAndInstallExtension', downloadAndInstallExtension));
	context.subscriptions.push(commands.registerCommand('tads3.analyzeTextAtPosition', () => analyzeTextAtPosition()));
	context.subscriptions.push(commands.registerCommand('tads3.installTracker', () => installTracker(context)));
	context.subscriptions.push(commands.registerCommand('tads3.clearCache', () => clearCache(context)));


	window.onDidChangeTextEditorSelection(e => {
		lastChosenTextEditor = e.textEditor;
	});

	window.onDidChangeActiveTextEditor((event: any) => {
		if(event.document !== undefined) {
			lastChosenTextDocument = event.document;
			if (lastChosenTextDocument) {
				client.info(`Last chosen editor changed to: ${lastChosenTextDocument.uri}`);
			}
		}
	});

	setupVisualEditorResponseHandler();

	globalStoragePath = context.globalStorageUri.fsPath;

	extensionCacheDirectory = path.join(context.globalStorageUri.fsPath, 'extensions');

	client.onReady().then(async () => {


		client.onNotification('response/extractQuotes', (payload) => {

			workspace
				.openTextDocument({ language: 'tads3', content: payload.resultArray.join('\n') })
				.then(doc => window.showTextDocument(doc, ViewColumn.Beside));

			
		})

		client.onNotification('response/makefile/keyvaluemap', ({ makefileStructure, usingAdv3Lite }) => {
			isUsingAdv3Lite = usingAdv3Lite;
		});

		client.onNotification('response/connectrooms', async ({ fromRoom, toRoom, validDirection1, validDirection2 }) => {
			client.info(`Connect from  ${fromRoom.symbol.name}  (${fromRoom.filePath}) to ${toRoom.symbol.name} (${toRoom.filePath}) via ${validDirection1 / validDirection2} to (${toRoom.filePath})?`);


			// Must begin with the room furthest down in the document,
			// otherwise the position will be stale and the new direction property
			// will be placed above the room object

			//TODO: refactor this to be less verbose: lot's of redundancy here
			if (fromRoom.symbol.range.start.line > toRoom.symbol.range.start.line) {
				await workspace.openTextDocument(fromRoom.filePath)
					.then(doc => window.showTextDocument(doc, ViewColumn.One)
						.then(editor => {
							editor.edit(editor => {
								const pos = new Position(fromRoom.symbol.range.end.line, 0);
								const text = `\t${validDirection1} = ${toRoom.symbol.name}\n`;
								editor.insert(pos, text);
							});
							return editor;
						}));

				await workspace.openTextDocument(toRoom.filePath)
					.then(doc => window.showTextDocument(doc, ViewColumn.One)
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
					.then(doc => window.showTextDocument(doc, ViewColumn.One))
					.then(editor => {
						editor.edit(editor => {
							const pos = new Position(toRoom.symbol.range.end.line, 0);
							const text = `\t${validDirection2} = ${fromRoom.symbol.name}\n`;
							editor.insert(pos, text);
						});
						return editor;
					});
				await workspace.openTextDocument(fromRoom.filePath)
					.then(doc => window.showTextDocument(doc, ViewColumn.One))
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
				.then(x => x.save())
				.then(saveResult => console.log(`${saveResult} saved `));

			if (fromRoom.filePath !== toRoom.filePath) {
				await workspace.openTextDocument(toRoom.filePath)
					.then(x => x.save())
					.then(saveResult => console.log(`${saveResult} saved `));
			}

		});


		client.onNotification('response/analyzeText/findNouns', async ({ tree, range, level }) => {
			client.info(tree);
			const options = tree; 
			if (options.length === 0) {
				window.showInformationMessage(`No suggestions for that line`);
				return;
			}
			const result = await window.showQuickPick(options, {canPickMany: true});

			// Build up a SnippetString with all the props identified in the text:

			let stringBuffer = '';
			for (const noun of result) {
				await window.activeTextEditor.edit(editor => {
					const levelArray = [];
					for (let i = 0; i < level; i++) {
						levelArray.push('+');
					}
					const text = isUsingAdv3Lite ?
						`${levelArray.join('')} ${noun} : \${1:Decoration} '${noun}';\n` 				// Adv3Lite style
						: `${levelArray.join('')} ${noun} : \${1:Decoration} '${noun}' '${noun}';\n`; 	// Adv3 style

						stringBuffer += text;
				});
			}
			stringBuffer += '$0';
			
			// Inserts the line after the closing range of the current object
			const pos = new Position(range.end.line + 1, 0);
			window.activeTextEditor.insertSnippet(new SnippetString(stringBuffer), pos);
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
		// The postAction is something the client originally defines
		// and is supposed to be brought into action here.
		// It is done this way so request/findsymbol can be reused for different purposes
		client.onNotification('response/foundsymbol', ({ symbol, filePath, postAction }): void => {
			if (symbol && filePath) {
				selectedObject = symbol as DocumentSymbol; // keep track of the last selected object

				workspace.openTextDocument(filePath)
					.then(textDocument => {
						window.showTextDocument(textDocument, {
							preserveFocus: true,
							selection: selectedObject.range,
							viewColumn: ViewColumn.One,
						});
					});
				// TODO: there's an issue here, due to all items being triggered with onRemoved whenever the map gets updated,
				// thus all rooms would be deleted in their textdocument's equivalence whenever that happens. 
				/*.then(()=> {
					if(postAction === 'remove') {
						client.info(`Removing via map is not yet implemented. `);
						//editor.edit(editorBuilder => editorBuilder.delete(selectedObject.range));
					}	
				});*/



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
		if (choice === undefined && askIfNotFound) {
			choice = await selectMakefileWithDialog();				
		}
	}

	if (choice === undefined) {
		console.error(`No Makefile.t3m found, source code could not be processed.`);
	}
	return Promise.resolve(choice);
}


async function setMakeFile() {
	chosenMakefileUri =  await selectMakefileWithDialog() ?? chosenMakefileUri;
	if (chosenMakefileUri) {
		client.info(`Chosen makefile set to: ${basename(chosenMakefileUri.fsPath)}`);
	}
}



async function onDidSaveTextDocument(textDocument: any) {
	currentTextDocument = textDocument;

	if (chosenMakefileUri && !existsSync(chosenMakefileUri.fsPath)) {
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

const runGameInTerminalSubject = new Subject();

function setupAndMonitorBinaryGamefileChanges() {
	const documentWorkingOn = window.activeTextEditor.document;
	const workspaceFolder = dirname(chosenMakefileUri.fsPath);
	t3FileSystemWatcher = workspace.createFileSystemWatcher(new RelativePattern(workspaceFolder, "*.t3"));

	runGameInTerminalSubject.pipe(debounceTime(200)).subscribe( (event: any) => {
		const configuration = workspace.getConfiguration("tads3");
		if (!configuration.get("restartGameRunnerOnT3ImageChanges")) {
			return;
		}

		const interpreter = configuration.get("gameRunnerInterpreter");
		if (!interpreter) {
			return;
		}

		const fileBaseName = basename(event.fsPath);
		const gameRunnerTerminals = window.terminals.filter(x=>x.name === 'Tads3 Game runner terminal');
		for(const gameRunnerTerminal of gameRunnerTerminals) {
			gameRunnerTerminal.sendText(`quit`);
			gameRunnerTerminal.sendText(`y`);
			gameRunnerTerminal.sendText(``);
			gameRunnerTerminal.dispose();
		}

		const gameRunnerTerminal = window.createTerminal('Tads3 Game runner terminal');
		client.info(`${event.fsPath} changed, restarting ${fileBaseName}`);
		
		
		// FIXME: preserveFocus doesn't work, the terminal takes focus anyway (might be because of sendText)
		gameRunnerTerminal.show(true); 

		gameRunnerTerminal.sendText(`${interpreter} ${fileBaseName}`);

		// FIXME: Interim hack to make preserveFocus work even when there's a slow startup of the interpreter
		// (This won't always work, especially on a slow machine)
		setTimeout(() => window.showTextDocument(documentWorkingOn), 500);	
	});

	t3FileSystemWatcher.onDidChange(event => runGameInTerminalSubject.next(event));
}




async function toggleGameRunnerOnT3ImageChanges() {
	const configuration = workspace.getConfiguration("tads3");
	const oldValue = configuration.get("restartGameRunnerOnT3ImageChanges");
	configuration.update("restartGameRunnerOnT3ImageChanges", !oldValue, true);
}

async function downloadFile(requestUrl: string, folder: string, fileName: string) {
	ensureDirSync(extensionCacheDirectory);
	const cachedFilePath = path.join(extensionCacheDirectory, fileName);
	const pathToStoreExtension = path.resolve(__dirname, folder, fileName);
	if (existsSync(cachedFilePath)) {
		copyFileSync(cachedFilePath, pathToStoreExtension);
		client.info(`Reusing cached file ${cachedFilePath}`);
		return;
	}

	const res = await axios.get(requestUrl, { responseType: "stream" });
	if (res.status == 200) {
		res.data.pipe(createWriteStream(pathToStoreExtension));
		res.data.on("end", () => {
			try {
				copyFileSync(pathToStoreExtension, cachedFilePath);
				client.info(`Download of ${fileName} to folder "${folder}" is completed`);
			} catch (err) {
				client.error(err);
			}
		});
		return;
	}
	throw new Error(`Error during download: ${res.status}`);
}



async function downloadAndInstallExtension(context: ExtensionContext) {
	const configuration = workspace.getConfiguration("tads3");
	const ifarchiveTads3ContributionsURL: string = configuration.get("ifArchiveExtensionURL");
	try {
		if (extensionDownloadMap === undefined) {
			const response = await axios.get(ifarchiveTads3ContributionsURL);
			const entries = response.data.split('#');
			extensionDownloadMap = new Map();
			let idx = 0;
			for (const entry of entries) {
				const [key, data] = entry.split('\n\n');
				if (idx > 0) {
					extensionDownloadMap.set(key.trim(), data.trim());
				}
				idx++;
			}
		}
	} catch (err) {
		window.showErrorMessage(`Failed downloading extension list: ${err}`);
		client.error(`Failed downloading extension list: ${err}`);
		return;
	}


	const selections = await window.showQuickPick([...extensionDownloadMap.keys()], { canPickMany: true });
	if (selections === undefined || selections.length === 0) {
		return;
	}
	const option1: MessageItem = { title: 'Install' };
	const option2: MessageItem = { title: 'Abort' };

	const infoEntries = [];
	for (const extKey of selections) {
		const desc = extensionDownloadMap.get(extKey);
		const entry = extKey + ' \n ' + desc;
		infoEntries.push(entry);
	}

	const action = await window.showInformationMessage(infoEntries.join('\n\n***\n\n'), { modal: true }, option1, option2);
	console.log(action);
	if (action.title === 'Install') {
		const makefileDir = dirname(chosenMakefileUri.fsPath);
		for (const extKey of selections) {
			const downloadURL = ifarchiveTads3ContributionsURL + extKey;
			try {
				await downloadFile(downloadURL, makefileDir, extKey);
			} catch (err) {
				client.error(`Download failed for ${downloadURL}: ${err}`);
				window.showErrorMessage(`Download failed for ${downloadURL}: ${err}`);
				continue;
			}

			if (extKey.endsWith('.zip')) {
				const extensionPath = path.join(makefileDir, extKey);
				const fileNameWithoutZipExt = extKey.substr(0, extKey.length - 4);
				const extensionInstalledDirname = path.join(makefileDir, fileNameWithoutZipExt);
				client.info(`Unzipping ${extKey} to ${extensionInstalledDirname}`);
				try {
					const readStream = createReadStream(extensionPath);
					readStream.on('open', () => readStream.pipe(Extract({ path: extensionInstalledDirname })));
					readStream.on('error', (err) => client.error(`Error during unzipping: ${err}`));
					readStream.on('close', () => {
						client.info(`Unzipping finished`);
						try {
							unlinkSync(extensionPath);
							client.info(`Archive deleted`);
						} catch (err) {
							client.error(`Deletion of archive failed: ${err}`);
						}
					});
				} catch (err) {
					client.error(`Setting up readstream for ${extensionPath} failed: ${err}`);
				}
			}
		}
	}
}

function enablePreprocessorCodeLens(arg0: string, enablePreprocessorCodeLens: any) {
	const configuration = workspace.getConfiguration("tads3");
	const oldValue = configuration.get("enablePreprocessorCodeLens");
	configuration.update("enablePreprocessorCodeLens", !oldValue);
	window.showInformationMessage(`CodeLens for preprocessor differences is now ${!oldValue?'enabled':'disabled'} `);
}


async function diagnose(textDocument: TextDocument) {
	const tads3ExtensionConfig = workspace.getConfiguration('tads3');
	const compilerPath = tads3ExtensionConfig?.compiler?.path ?? 't3make';
	const resultOfCompilation = await runCommand(`${compilerPath} -nobanner -q -f "${chosenMakefileUri.fsPath}"`);
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

export async function executeParse(makefileLocation: string, filePaths: string[]): Promise<any> {
	await client.onReady();
	serverProcessCancelTokenSource = new CancellationTokenSource();
	await client.sendRequest('request/parseDocuments', {
		globalStoragePath,
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



let preprocessDocument: TextDocument;

function showPreprocessedTextAction(params: [any, any, any]) {
	const [range, uri, preprocessedText] = params;
	
	if (preprocessDocument && !preprocessDocument.isClosed) {
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
		if (quote) {
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

	tads3VisualEditorPanel.onDidChangeViewState(e=> {
		if(e.webviewPanel.active) {
			client.info(`Refresh map view`);
			client.sendNotification('request/mapsymbols');		
		}
	});
	
	client.info(`Opening up the webview and ask server for map symbols`);
	client.sendNotification('request/mapsymbols');

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
		if (persistedPosition) {
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

	const filePath = isUsingAdv3Lite ? '_gameTrackerAdv3Lite.t' : '_gameTrackerAdv3.t';

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
						const trackerFile = isUsingAdv3Lite ? '_gameTrackerAdv3Lite' : '_gameTrackerAdv3';
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


			if (!isATrackerFileAlreadyCreated) {
				await writeFileSync(gameTrackerFilePath, trackerFileContents, 'utf-8');
				await workspace.openTextDocument(gameTrackerFilePath)
					.then(doc => window.showTextDocument(doc, ViewColumn.Beside));
				window.showInformationMessage(`The tracker file (_game_tracker.t) has been added into the project's folder. `);
				return;
			}
			window.showWarningMessage(`The tracker file (_game_tracker.t) is already in the project's folder. `);
		}
	}

}

async function clearCache(context: ExtensionContext) {
	const userAnswer = await window.showInformationMessage(`This will clear all potential cache for the standard libraries adv3/adv3Lite. With the effect of all library files having to go through a full parse next time around.
	Are you sure?`, { title: 'Yes' }, { title: 'No' });
	if (userAnswer.title === 'Yes') {
		try {
			rmdirSync(globalStoragePath, { recursive: true });
			window.showInformationMessage(`Standard library cache is cleared`);
		} catch (err) {
			window.showErrorMessage(`Error happened during cache removal: ${err}`);
		}
	}
}


async function selectMakefileWithDialog() {
	const file = await window.showOpenDialog({
		title: `Select which folder the project's makefile (*.t3m) is located within`,
		filters: { 'Makefiles': ['t3m'] },
		openLabel: `Choose  makefile (*.t3m)`,
		canSelectFolders: false,
		canSelectFiles: true,
	});
	if (file && file.length > 0 && file[0] !== undefined) {
		return file[0];
	}
	return undefined;
}

async function createTemplateProject(context: ExtensionContext) {

	const projectFolder: Uri[] = await window.showOpenDialog({
		title: `Select which in which folder to place the project folder`,
		openLabel: `Select folder)`,
		canSelectFolders: true,
		canSelectFiles: false,
	});


	if(projectFolder.length > 0 && projectFolder[0] !== undefined) {
		const firstWorkspaceFolder = projectFolder[0];

		const makefileUri = Uri.joinPath(firstWorkspaceFolder, 'Makefile.t3m');
		const gameFileUri = Uri.joinPath(firstWorkspaceFolder, 'gameMain.t');
		const objFolderUri = Uri.joinPath(firstWorkspaceFolder, 'obj');


		if (existsSync(makefileUri.fsPath) || existsSync(makefileUri.fsPath)) {
			const userAnswer = await window.showInformationMessage(
				`Project already have either a Makefile.t3m or a gameMain.t, do you want to overwrite them with a fresh template?`,
				{ title: 'Yes' }, { title: 'No' });
			if (userAnswer === undefined || userAnswer.title === 'No') {
				return;
			}
		}

		const result = await window.showQuickPick(['adv3', 'adv3Lite'], { placeHolder: 'Project type' });
		isUsingAdv3Lite = (result === 'adv3Lite' ? true : false);
	
		const makefileResourceFilename = isUsingAdv3Lite ? 'Makefile-adv3Lite.t3m' : 'Makefile.t3m';
		const gamefileResourceFilename = isUsingAdv3Lite ? 'gameMain-adv3Lite.t' : 'gameMain.t';

		const makefileResourceFileUri = Uri.joinPath(context.extensionUri, 'resources', makefileResourceFilename);
		const gamefileResourceFileUri = Uri.joinPath(context.extensionUri, 'resources', gamefileResourceFilename);

		const makefileResourceFileContent = readFileSync(makefileResourceFileUri.fsPath).toString();
		const gamefileResourceFileContent = readFileSync(gamefileResourceFileUri.fsPath).toString();


		ensureDirSync(objFolderUri.fsPath);
		writeFileSync(makefileUri.fsPath, makefileResourceFileContent);
		writeFileSync(gameFileUri.fsPath, '');

		const gameFilecontent = new SnippetString(gamefileResourceFileContent);

		await workspace.openTextDocument(gameFileUri.fsPath)
			.then(doc => window.showTextDocument(doc))
			.then(editor => editor.insertSnippet(gameFilecontent, new Position(0, 0)));
	}
}

async function extractAllQuotes(context: ExtensionContext) {
	const files = await window.showQuickPick(['All project files','current file']);
	const types = await window.showQuickPick(['both','double','single']);

	if(files.startsWith('current')) {
		const text = window.activeTextEditor.document.getText();
		const fsPath  = window.activeTextEditor.document.uri.fsPath;
		await client.sendRequest('request/extractQuotes', {types, text, fsPath});	
		return;
	}
	await client.sendRequest('request/extractQuotes', {types});	


}

