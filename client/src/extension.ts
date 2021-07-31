/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { basename } from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource, Uri } from 'vscode';

import {
	ConnectionError,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

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
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	client = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
	client.start();

	
	context.subscriptions.push(commands.registerCommand('extension.parseTads3', parseTads3));
	
	client.onReady().then(()=> {
		
		client.onNotification('symbolparsing/success', (path)=> {
			window.showInformationMessage(`${basename(path)} has been parsed successfully`);
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

async function parseTads3() {
	const makefileLocation = await findAndSelectMakefileUri();
	const filePaths = [window.activeTextEditor.document.uri.fsPath];
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
			await executeParse(makefileLocation.fsPath, filePaths);
			return resolve(true);
		});
	});

	//await executeParse(makefileLocation.fsPath, filePaths);
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
