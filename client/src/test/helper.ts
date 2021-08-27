/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as path from 'path';
import { copyFileSync, fstat } from 'fs';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

/**
 * Activates the toerob.vscode-tads3tools extension
 */
export async function activate(docUri: vscode.Uri) {

	try {
		copyTestFixtureFilesToTmpFolder(['completion.txt','diagnostics.t','Makefile.t3m']);
			} catch(err) {
		console.error(err)
		process.exit(1);
	}
	

	const ext = vscode.extensions.getExtension('toerob.vscode-tads3tools')!;
	await ext.activate();
	try {
		doc = await vscode.workspace.openTextDocument(docUri);
		editor = await vscode.window.showTextDocument(doc);
		await sleep(2000); // Wait for server activation
	} catch (e) {
		console.error(e);
	}
}
export async function copyTestFixtureFilesToTmpFolder(fileArray: string[]) {
	for(const f of fileArray) {
		copyFileSync(path.resolve(__dirname, `../../testFixture/${f}`), `/tmp/${f}`);	
	}

}

export async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDocPath = (p: string) => {
	return path.resolve(__dirname, '/tmp/', p);
	//return path.resolve(__dirname, '../../testFixture', p);
};
export const getDocUri = (p: string) => {
	return vscode.Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
	const all = new vscode.Range(
		doc.positionAt(0),
		doc.positionAt(doc.getText().length)
	);
	return editor.edit(eb => eb.replace(all, content));
}
