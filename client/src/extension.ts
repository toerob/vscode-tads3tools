/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { copyFileSync, createReadStream, createWriteStream, existsSync, unlinkSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument, languages, Range, ViewColumn, WebviewOptions, WebviewPanel, DocumentSymbol, TextEditor, FileSystemWatcher, RelativePattern, MessageItem, Position, SnippetString, CancellationError } from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { setupVisualEditorResponseHandler, visualEditorResponseHandlerMap, getHtmlForWebview } from './modules/visual-editor';
import { parseAndPopulateErrors } from './modules/tads3-error-parser';
import { Subject, debounceTime } from 'rxjs';
import { LocalStorageService } from './modules/local-storage-service';
import { ensureDirSync } from 'fs-extra';
import axios from 'axios';
import { Extract } from 'unzipper';
import { rmdirSync } from 'fs';
import { validateCompilerPath, validateUserSettings } from './modules/validations';
import { extensionState } from './modules/state';
import { validateMakefile } from './modules/validate-makefile';
import { extractAllQuotes } from './modules/extract-quotes';
import { createTemplateProject } from './modules/create-template-project';
import { installTracker } from './modules/install-tracker';
import { connectRoomsWithProperties } from './modules/map-editor-sync';
import { runCommand } from './modules/run-command';
import { analyzeTextAtPosition } from './modules/commands/analyzeTextAtPosition';
import { findAndSelectMakefileUri } from './modules/findAndSelectMakefileUri';
import { addFileToProject } from './modules/addFileToProject';
import { SnippetCompletionItemProvider } from './modules/snippet-completion-item-provider';

const DEBOUNCE_TIME = 200;
const collection = languages.createDiagnosticCollection('tads3diagnostics');

const preprocessedFilesMap: Map<string, string> = new Map();
const persistedObjectPositions = new Map();

let storageManager: LocalStorageService;
let selectedObject: DocumentSymbol | undefined;
let lastChosenTextDocument: TextDocument | undefined;
let lastChosenTextEditor: TextEditor;
let globalStoragePath: string;
let extensionCacheDirectory: string;
let currentTextDocument: TextDocument | undefined;
let extensionDownloadMap: Map<any, any>;

let errorDiagnostics = [];
let allFilesBeenProcessed = false;
let serverProcessCancelTokenSource: CancellationTokenSource;
let preprocessedList: string[];

let preprocessDocument: TextDocument;

let t3FileSystemWatcher: FileSystemWatcher = undefined;

const diagnoseAndCompileSubject = new Subject();

const runGameInTerminalSubject = new Subject();

export let makefileKeyMapValues = [];
export let tads3VisualEditorPanel: WebviewPanel | undefined = undefined;
export let client: LanguageClient;

export function getProcessedFileList(): string[] {
	return preprocessedList;
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
	client.info(`Tads3 Language Client Activates`);


	context.subscriptions.push(languages.registerCompletionItemProvider('tads3', new SnippetCompletionItemProvider(context)));

	storageManager = new LocalStorageService(context.workspaceState);

	context.subscriptions.push(workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)));


	context.subscriptions.push(commands.registerCommand('tads2.parseTads2Project', () => parseTads2Project(context)));
	context.subscriptions.push(commands.registerCommand('tads3.createTads3TemplateProject', () => createTemplateProject(context)));
	context.subscriptions.push(commands.registerCommand('tads3.addFileToProject', () => addFileToProject(context)));

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
	context.subscriptions.push(commands.registerCommand('tads3.extractAllQuotes', () => extractAllQuotes(context)));
	context.subscriptions.push(commands.registerCommand('tads3.installTracker', () => installTracker(context)));
	context.subscriptions.push(commands.registerCommand('tads3.clearCache', () => clearCache(context)));

	window.onDidChangeTextEditorSelection(e => {
		lastChosenTextEditor = e.textEditor;
	});

	window.onDidChangeActiveTextEditor((event: any) => {
		if (event.document !== undefined) {
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
		});

		client.onNotification('response/makefile/keyvaluemap', ({ makefileStructure, usingAdv3Lite }) => {
			makefileKeyMapValues = makefileStructure;
			extensionState.setUsingAdv3LiteStatus(usingAdv3Lite);
		});

		client.onNotification('response/connectrooms', async ({ fromRoom, toRoom, validDirection1, validDirection2 }) => {
			client.info(`Connect from  ${fromRoom.symbol.name}  (${fromRoom.filePath}) to ${toRoom.symbol.name} (${toRoom.filePath}) via ${validDirection1 / validDirection2} to (${toRoom.filePath})?`);
			await connectRoomsWithProperties(fromRoom, toRoom, validDirection1, validDirection2);
		});


		client.onNotification('response/analyzeText/findNouns', async ({ tree, range, level }) => {
			client.info(tree);
			const options = tree;
			if (options.length === 0) {
				window.showInformationMessage(`No suggestions for that line`);
				return;
			}
			const result = await window.showQuickPick(options, { canPickMany: true });

			// Build up a SnippetString with all the props identified in the text:

			let stringBuffer = '';
			for (const noun of result) {
				await window.activeTextEditor.edit(editor => {
					const levelArray = [];
					for (let i = 0; i < level; i++) {
						levelArray.push('+');
					}

					const text = extensionState.getUsingAdv3LiteStatus() ?
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
			extensionState.setPreprocessing(false);
			preprocessedList = filesNames;
		});

		client.onNotification("symbolparsing/allfiles/success", ({ elapsedTime }) => {
			if (extensionState.isLongProcessingInAction()) {
				window.showInformationMessage(`All project and library files are now parsed (elapsed time: ${elapsedTime} ms)`);
			} else {
				client.info(`File parsed (elapsed time: ${elapsedTime} ms)`);
			}
			client.sendNotification('request/mapsymbols');
			extensionState.setLongProcessing(false);
		});

		client.onNotification("symbolparsing/allfiles/failed", ({ error }) => {
			window.showErrorMessage(`Parsing all files via makefile ${basename(extensionState.getChosenMakefileUri().fsPath)} failed: ${error} `, { modal: true });
			extensionState.setLongProcessing(false);
			extensionState.setPreprocessing(false);
			allFilesBeenProcessed = false;
		});

		workspace.onDidChangeConfiguration(async config => {
			if (config.affectsConfiguration('tads3.compiler.path')) {
				validateCompilerPath(workspace.getConfiguration("tads3").get('compiler.path'));
			}
		});

		if (await validateUserSettings()) {
			initialParse();
		}

		/**
		 * This will be trigger by onDidSaveTextDocument:
		 */
		diagnoseAndCompileSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(async (textDocument: TextDocument) => {
			client.info(`Debounce time of ${DEBOUNCE_TIME} has passed.`);
			currentTextDocument = textDocument;

			if (extensionState.getChosenMakefileUri() && !existsSync(extensionState.getChosenMakefileUri().fsPath)) {
				extensionState.setChosenMakefileUri(undefined);
			}

			if (extensionState.getChosenMakefileUri() === undefined) {
				extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
			}

			if (extensionState.getChosenMakefileUri() === undefined) {
				console.error(`No makefile could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
				return;
			}
			if (!t3FileSystemWatcher) {
				setupAndMonitorBinaryGamefileChanges();
			}
			await diagnosePreprocessAndParse(textDocument);
		});

	});

}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

async function setMakeFile() {
	if (extensionState.isLongProcessingInAction()) {
		window.showWarningMessage(`Cannot change makefile and reparse right now, since a full project parsing is already in progress. Try again later. `, { modal: true });
		return;
	}
	const newMakefile = await findAndSelectMakefileUri();
	if (newMakefile === undefined) {
		client.info(`No makefile, cannot parse document symbols. `);
		return;
	}
	extensionState.setChosenMakefileUri(newMakefile);

	client.info(`Chosen makefile set to: ${basename(extensionState.getChosenMakefileUri().fsPath)}`);
	const makefileDoc = await workspace.openTextDocument(extensionState.getChosenMakefileUri().fsPath);

	try {
		await diagnose(makefileDoc);
	} catch (err) {
		if (!(err instanceof CancellationError)) {
			window.showErrorMessage(`Error while diagnosing: ${err}`);
			client.error(`Error while diagnosing: ${err.message}`);
		}
		extensionState.setDiagnosing(false);
		return;
	}

	if (errorDiagnostics.length > 0) {
		window.showErrorMessage(`Error during compilation:\n${errorDiagnostics.map(e => e.message).join('\n')}`);
		return;
	}

	extensionState.setLongProcessing(true);
	client.info(`Preprocess and parse all documents`);
	await preprocessAndParseDocument();
}

async function onDidSaveTextDocument(textDocument: any) {

	if (extensionState.isDiagnosing()) {
		client.warn(`Still diagnosing, parsing is skipped this time around`);
		return;
	}

	if (extensionState.isPreprocessing()) {
		client.warn(`Still preprocessing, parsing is skipped this time around`);
		return;
	}


	diagnoseAndCompileSubject.next(textDocument);
}


async function diagnosePreprocessAndParse(textDocument: TextDocument) {
	client.info(`Diagnosing`);
	try {
		await diagnose(textDocument);
	} catch (err) {
		if (!(err instanceof CancellationError)) {
			client.info(`Error while diagnosing: ${err}`);
			window.showErrorMessage(`Error while diagnosing: ${err}`);
		}
		extensionState.setDiagnosing(false);
		return;
	}
	if (errorDiagnostics.length > 0) {
		client.warn(`Could not assemble outliner symbols due to error(s): \n${errorDiagnostics.map(e => e.message).join('\n')}`);
		return;
	}
	//allFilesBeenProcessed = true;
	client.info(`Diagnosing went by with no errors`);
	if (!allFilesBeenProcessed) {
		extensionState.setLongProcessing(true);
		allFilesBeenProcessed = true;
		client.info(`Preprocess and parse all documents`);
		preprocessAndParseDocument();
		return;
	} else {

		if (extensionState.isLongProcessingInAction()) {
			client.info(`Skipping parsing since long processing is in action`);
		} else {
			client.info(`Preprocess and parse ${textDocument.uri.fsPath}`);
			preprocessAndParseDocument([textDocument]);
		}


	}
}




function setupAndMonitorBinaryGamefileChanges() {
	client.info(`setup and monitor binary game file changes. `);
	const workspaceFolder = dirname(extensionState.getChosenMakefileUri().fsPath);
	t3FileSystemWatcher = workspace.createFileSystemWatcher(new RelativePattern(workspaceFolder, "*.t3"));

	runGameInTerminalSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe((event: any) => {
		const configuration = workspace.getConfiguration("tads3");
		if (!configuration.get("restartGameRunnerOnT3ImageChanges")) {
			return;
		}

		const interpreter = configuration.get("gameRunnerInterpreter");
		if (!interpreter) {
			return;
		}

		const fileBaseName = basename(event.fsPath);
		const gameRunnerTerminals = window.terminals.filter(x => x.name === 'Tads3 Game runner terminal');
		for (const gameRunnerTerminal of gameRunnerTerminals) {
			client.info(`Dispose previous game runner terminal`);
			gameRunnerTerminal.sendText(`quit`);
			gameRunnerTerminal.sendText(`y`);
			gameRunnerTerminal.sendText(``);
			gameRunnerTerminal.dispose();
		}

		const gameRunnerTerminal = window.createTerminal('Tads3 Game runner terminal');
		client.info(`${event.fsPath} changed, restarting ${fileBaseName} in game runner terminal`);

		// FIXME: preserveFocus doesn't work, the terminal takes focus anyway (might be because of sendText)
		gameRunnerTerminal.show(true);
		gameRunnerTerminal.sendText(`${interpreter} ${fileBaseName}`);

		// FIXME: Interim hack to make preserveFocus work even when there's a slow startup of the interpreter
		// (This won't always work, especially on a slow machine)
		const documentWorkingOn = window.activeTextEditor.document;
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
		const makefileDir = dirname(extensionState.getChosenMakefileUri().fsPath);
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
	window.showInformationMessage(`CodeLens for preprocessor differences is now ${!oldValue ? 'enabled' : 'disabled'} `);
}

function ensureObjFolderExistsInProjectRoot() {
	if (existsSync(extensionState.getChosenMakefileUri().fsPath)) {
		const projectBaseDirectory = dirname(extensionState.getChosenMakefileUri().fsPath);
		const objFolderUri = path.join(projectBaseDirectory, 'obj');
		ensureDirSync(objFolderUri);
		return;
	}
	throw new Error(`Could not ensure obj folder exists in the root folder since no makefile is known. `);
}

async function diagnose(textDocument: TextDocument) {
	await validateMakefile(extensionState.getChosenMakefileUri());
	extensionState.setDiagnosing(true);
	ensureObjFolderExistsInProjectRoot();
	const tads3ExtensionConfig = workspace.getConfiguration('tads3');
	const compilerPath = tads3ExtensionConfig?.compiler?.path ?? 't3make';
	const resultOfCompilation = await runCommand(`${compilerPath} -nobanner -q -f "${extensionState.getChosenMakefileUri().fsPath}"`);
	parseDiagnostics(resultOfCompilation.toString(), textDocument);
	extensionState.setDiagnosing(false);
}

function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument) {
	errorDiagnostics = parseAndPopulateErrors(resultOfCompilation, textDocument, collection);
}

async function preprocessAndParseDocument(textDocuments: TextDocument[] | undefined = undefined) {
	const filePaths = textDocuments?.map(x => x.uri.fsPath) ?? undefined;
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
			if (allFilesBeenProcessed && !extensionState.isLongProcessingInAction()) {
				if (tads3VisualEditorPanel) {
					client.info(`Refreshing the map view`);
					client.sendNotification('request/mapsymbols');
				}
			}
			const filename = basename(Uri.parse(filePath).path);
			progress.report({ message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}` });
			// TODO: maybe show "stale data" indicator instead
			/*if (tads3VisualEditorPanel) {
				client.info(`Since new symbols have been parsed and the webviewpanel is open, ask for new mapsymbols `);
				client.sendNotification('request/mapsymbols');			
			}*/
		});

		await executeParse(extensionState.getChosenMakefileUri().fsPath, filePaths);
		return true;
	});
}

export async function executeParse(makefileLocation: string, filePaths: string[]): Promise<any> {
	await client.onReady();
	serverProcessCancelTokenSource = new CancellationTokenSource();
	extensionState.setPreprocessing(true);
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

async function showPreprocessedTextAction(params: [any, any, any]) {
	const [range, uri, preprocessedText] = params;
	if (preprocessDocument && !preprocessDocument.isClosed) {
		await window.showTextDocument(preprocessDocument, {
			viewColumn: ViewColumn.Beside,
			preserveFocus: true,
			preview: true,
		});
		await window.visibleTextEditors
			.find(editor => editor.document.uri.path === preprocessDocument.uri.path)
			.edit(prepDoc => {
				const wholeRange = preprocessDocument.validateRange(new Range(0, 0, preprocessDocument.lineCount, 0));
				prepDoc.replace(wholeRange, preprocessedText);
			});
		showAndScrollToRange(preprocessDocument, range);
	} else {
		const doc = await workspace.openTextDocument({ language: 'tads3', content: preprocessedText });
		preprocessDocument = doc;
		showAndScrollToRange(doc, range);
	}
}


function showPreprocessedTextForCurrentFile() {
	const fsPath = window.activeTextEditor.document.uri.fsPath;
	client.sendRequest('request/preprocessed/file', { path: fsPath });
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
			preserveFocus: true,
		}
	);
	const options: WebviewOptions = {
		enableScripts: true,
		localResourceRoots: [Uri.joinPath(context.extensionUri, 'media')],

	};
	tads3VisualEditorPanel.webview.options = options;
	tads3VisualEditorPanel.webview.html = getHtmlForWebview(context, tads3VisualEditorPanel.webview, context.extensionUri);
	tads3VisualEditorPanel.onDidDispose(() => {
		tads3VisualEditorPanel = undefined;
	}, null, context.subscriptions);

	tads3VisualEditorPanel.onDidChangeViewState(e => {
		if (e.webviewPanel.active) {
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

export function resetPersistedPositions() {
	persistedObjectPositions.clear();
}

function overridePositionWithPersistedCoordinates(mapObjects: any[]) {
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
		client.info(`Trying to locate a default tads3 makefile`);

		if (extensionState.getChosenMakefileUri() === undefined) {
			extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
		}
		if (extensionState.getChosenMakefileUri() === undefined) {
			client.info(`No tads3 makefile could be found`);
			detectTads2Usage();
			return;
		}

		client.info(`Found a makefile: ${extensionState.getChosenMakefileUri().fsPath}`);
		if (!t3FileSystemWatcher) {
			client.info(`Setting up t3 image monitor `);
			if (!t3FileSystemWatcher) {
				setupAndMonitorBinaryGamefileChanges();
			}
		}
		await diagnosePreprocessAndParse(textDocument);
	}
}

async function clearCache(context: ExtensionContext) {
	const userAnswer = await window.showInformationMessage(`This will clear all potential cache for the standard libraries adv3/adv3Lite. With the effect of all library files having to go through a full parse next time around.
	Are you sure?`, { modal: true }, { title: 'Yes' }, { title: 'No' });
	if (userAnswer === undefined || userAnswer.title === 'No') {
		return;
	}
	try {
		rmdirSync(globalStoragePath, { recursive: true });
		window.showInformationMessage(`Standard library cache is cleared`);
	} catch (err) {
		window.showErrorMessage(`Error happened during cache removal: ${err}`);
	}
}


export async function selectMakefileWithDialog() {
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

export async function parseTads2Project(context: ExtensionContext) {
	const mainFile = await window.showOpenDialog({
		title: 'Select the main file for the tads2 project'
	});
	serverProcessCancelTokenSource = new CancellationTokenSource();
	extensionState.setPreprocessing(true);

	if (mainFile && mainFile.length > 0) {
		await client.sendRequest('request/parseTads2Documents', {
			globalStoragePath,
			mainFileLocation: mainFile[0].fsPath,
			token: serverProcessCancelTokenSource.token
		});

	}

}


class DependencyNode {
	filename: string
	//parents: Set<string> = new Set();
	includes: Set<string> = new Set();
	constructor(public uri: Uri | undefined = undefined) {

	}
}

/**
 * Auto detects a Tads2 project's main file
 */
async function detectTads2Usage() {

	// TODO: verify cpp
	
	client.info('Detecting Tads2 project');
	const totalIncludeSet = new Set();
	const nodes = new Map();
	const includeRegexp = new RegExp(/[#]\s*include\s*[<"](.+)[">]/);
	const files = await workspace.findFiles('**/*.{t,h}');
	for (const currentFile of files) {
		const doc = await workspace.openTextDocument(currentFile.fsPath);
		nodes.set(basename(currentFile.fsPath), new DependencyNode(currentFile));
		for (const row of doc.getText()?.split(/\r?\n/)) {
			const result = includeRegexp.exec(row);
			if (result && result.length === 2) {
				const filename = result[1];
				totalIncludeSet.add(filename);
				const node = nodes.has(basename(currentFile.fsPath)) ? nodes.get(basename(currentFile.fsPath)) : new DependencyNode();
				node.includes.add(filename);
				nodes.set(basename(currentFile.fsPath), node);
			}
		}
	};
	if(files.length === 0) {
		client.info('No Tads2 files found. Detection is over. ');
		return;
	}

	// Look for root dependencies (files that none of the other project files includes):
	// TODO: this may be improved even further

	const roots = [...nodes.keys()].filter(x => !totalIncludeSet.has(x));
	for (const root of roots) {
		const rootNode = nodes.get(root);
		console.log(`${root}: ${[...rootNode.includes.values()]}`);
	}
	const userChoice = roots.length === 1 ? roots[0] : await window.showQuickPick(roots, { 
		title: `Which file is the project's main file?: ` 
	});
	const userChoiceAsNode = nodes.get(userChoice);

	extensionState.setTads2MainFile(userChoice);
	extensionState.setUsingTads2(true);
	extensionState.setPreprocessing(true);
	serverProcessCancelTokenSource = new CancellationTokenSource();
	client.sendRequest('request/parseTads2Documents', {
		globalStoragePath,
		mainFileLocation: userChoiceAsNode.uri.fsPath,
		token: serverProcessCancelTokenSource.token
	});
}
