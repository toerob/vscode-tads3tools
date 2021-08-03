/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { exec } from 'child_process';
import { existsSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument, languages, CancellationToken, Range, ViewColumn } from 'vscode';

import {
	ConnectionError,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { CodelensProvider } from './providers/code-lens';
import { Tads3VisualEditorProvider } from './providers/visual-provider';
import { Tads3CompileErrorParser } from './tads3-error-parser';

let errorDiagnostics = [];
const collection = languages.createDiagnosticCollection('tads3diagnostics');

const tads3CompileErrorParser = new Tads3CompileErrorParser();
let allFilesBeenProcessed = false;

let serverProcessCancelTokenSource: CancellationTokenSource;
let chosenMakefileUri: Uri|undefined;

 // A string array of preprocessed files available for retrieval from the server
 // via request: 'request/preprocessed/file'
let preprocessedList: string[];

const preprocessedFilesMap: Map<string,string> = new Map();

export let client: LanguageClient;

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

	client = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
	client.start();

	
	//context.subscriptions.push(commands.registerCommand('extension.parseTads3', parseTads3));
	context.subscriptions.push(workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)));

	const tads3VisualEditorProvider = new Tads3VisualEditorProvider(context);

	//Preprocess view - CustomReadonlyEditorProvider https://code.visualstudio.com/api/extension-guides/custom-editors
	//context.subscriptions.push(Tads3VisualEditorProvider.register(context));

	context.subscriptions.push(window.registerCustomEditorProvider('tads3.visualEdit', tads3VisualEditorProvider, {
		supportsMultipleEditorsPerDocument: true
	}));

	//context.subscriptions.push(languages.registerCodeLensProvider({ language: "tads3" }, new CodelensProvider(preprocessedFilesMap)));

	context.subscriptions.push(commands.registerCommand('tads3.enablePreprocessorCodeLens', enablePreprocessorCodeLens));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextAction', (params) => showPreprocessedTextAction(params)));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedFileQuickPick', showPreprocessedFileQuickPick));
	context.subscriptions.push(commands.registerCommand('tads3.showPreprocessedTextActionWithRange', (range: Range, uri: Uri) => showPreprocessedTextActionWithRange(range, uri)));

	

	context.subscriptions.push(commands.registerCommand('tads3.openInVisualEditor', openInVisualEditor));

	client.onReady().then(() => {
		
		client.onNotification('response/mapsymbols', symbols => {
			tads3VisualEditorProvider.drawSymbols(symbols);
			//webviewPanel.webview
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



		
		client.onNotification('symbolparsing/success', (filePath) => {
			
			//preprocessedDocument
			window.showInformationMessage(`${basename(filePath)} has been parsed successfully`);			
			if (window.activeTextEditor.document.uri.fsPath === filePath) {

				
				const uri = window.activeTextEditor.document.uri;
				//TODO: refresh the outliner somehow
				//workspace.onDidChangeTextDocument(window.activeTextEditor.document.uri);
				/*workspace.openTextDocument(window.activeTextEditor.document.uri).then(doc => {

				})*/
				//window.activeTerminal.
				/*runCommand("workbench.action.closeActiveEditor").then(() => {
					workspace.openTextDocument(window.activeTextEditor.document.uri);
					//window.showTextDocument(uri);
				});*/


			}
		});

		client.onNotification("symbolparsing/allfiles/success", ({ elapsedTime }) => {
			window.showInformationMessage(`All project/library files parsed in ${elapsedTime} ms`);
		});

	});

}

async function openInVisualEditor() {
	client.sendNotification('request/mapsymbols');
	commands.executeCommand("vscode.openWith", window.activeTextEditor.document.uri, 'tads3.visualEdit');

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
		client.onNotification('symbolparsing/success',(filePath) => {
			const filename = basename(Uri.parse(filePath).path);
			progress.report({message: ` ${filename} done`});
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



function enablePreprocessorCodeLens() {
	const configuration = workspace.getConfiguration("tads3");
	const oldValue = configuration.get("enablePreprocessorCodeLens");
	configuration.update("enablePreprocessorCodeLens", !oldValue);
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



function showPreprocessedFileQuickPick() {
	window.showQuickPick(preprocessedList)
	.then(choice => client.sendRequest('request/preprocessed/file', {path: choice}));

}




function showPreprocessedTextActionWithRange(range: Range, uri: Uri) {
	const text = preprocessedFilesMap.get(uri.path);
	if (preprocessDocument) {
		window.visibleTextEditors
			.find(editor => editor.document.uri.path === preprocessDocument.uri.path)
			.edit(prepDoc => {
				const wholeRange = preprocessDocument.validateRange(new Range(0, 0, preprocessDocument.lineCount, 0));
				prepDoc.replace(wholeRange, text);
			}).then(() => {
				showAndScrollToRange(preprocessDocument, range);
			});
	} else {
		workspace.openTextDocument({ language: 'tads3', content: text })
			.then(doc => {
				preprocessDocument = doc;
				showAndScrollToRange(doc, range);
			});
	}
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
