/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { exec } from 'child_process';
import { existsSync } from 'fs';
import * as path from 'path';
import { basename, dirname } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri, TextDocument } from 'vscode';

import {
	ConnectionError,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';
import { Tads3CompileErrorParser } from './tads3-error-parser';

let client: LanguageClient;
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

	client.onReady().then(()=> {
		
		client.onNotification('symbolparsing/success', (path)=> {
			window.showInformationMessage(`${basename(path)} has been parsed successfully`);
		});
		client.onNotification("symbolparsing/allfiles/success", ({elapsedTime}) => {
			window.showInformationMessage(`All project/library files parsed in ${elapsedTime} ms`);
		});
	});

}


export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}


let source: CancellationTokenSource;
let chosenMakefileUri: Uri|undefined;



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


const tads3CompileErrorParser = new Tads3CompileErrorParser();
let allFilesBeenProcessed = false;

async function diagnosePreprocessAndParse(textDocument: any) {
	await diagnose(textDocument);
	if(!allFilesBeenProcessed) {
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

let errorDiagnostics;
let collection;

async function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument) {
	errorDiagnostics = tads3CompileErrorParser.parse(resultOfCompilation, textDocument);
	collection.set(textDocument.uri, errorDiagnostics);
	if (errorDiagnostics.length === 0) {
		return;
	}
	throw new Error('Could not assemble outliner symbols since there\'s an error. ');
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
	return new Promise((resolve) => {
		window.withProgress({
			location: ProgressLocation.Notification,
			title: 'Parsing source code...',
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(async () => {
				await cancelParse();
				return resolve(false);
			});
			executeParse(chosenMakefileUri.fsPath, filePaths);
			return resolve(true);
		});
	});
	//await executeParse(chosenMakefileUri.fsPath, filePaths);
}


export async function executeParse(makefileLocation:string, filePaths): Promise<any> {
	return client.onReady().then(() => {
		source = new CancellationTokenSource();
		return client.sendRequest('executeParse', {
			makefileLocation: makefileLocation, 
			filePaths: filePaths, 
			token: source.token
		});
	});
}

export async function cancelParse(): Promise<any> {
	return new Promise((resolve) => {
		source?.cancel();
		return resolve(true);
	});
}