/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext, commands, ProgressLocation, window, CancellationTokenSource } from 'vscode';

import {
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

	// push to collection
	context.subscriptions.push(commands.registerCommand(
		'extension.parseTads3', parseTads3

	));
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}




let source: CancellationTokenSource;

function parseTads3() {
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
			await executeParse(['fil1','fil2']);
			return resolve(true);
		});
	});
}


export async function executeParse(filePaths): Promise<any> {
	return client.onReady().then(() => {
		source = new CancellationTokenSource();
		return client.sendRequest('executeParse', {filePaths: filePaths, token: source.token});
	});
}

export async function cancelParse(): Promise<any> {
	return new Promise((resolve) => {
		source?.cancel();
		return resolve(true);
	});
}


