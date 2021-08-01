/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const assert  = require('assert');
const textUtils  = require('../out/modules/text-utils');

const Textdocument  = require('vscode-languageserver-textdocument');
const vscodeLanguageserver  = require('vscode-languageserver');

const chai  = require('chai');


function fakeDocument(content) {
	return Textdocument.TextDocument.create('uri','tads3',1, content);
}

describe('Server tests', () => {
	it('locates the word at a position', () => {
		const doc = fakeDocument('needle in haystack');
		chai.expect(textUtils.getWordAtPosition(doc, vscodeLanguageserver.Position.create(0,0))).to.be('needle');
	});
});

/*
async function testCompletion(
	docUri: vscode.Uri,
	position: vscode.Position,
	expectedCompletionList: vscode.CompletionList
) {
	await activate(docUri);

	// Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
	const actualCompletionList = (await vscode.commands.executeCommand(
		'vscode.executeCompletionItemProvider',
		docUri,
		position
	)) as vscode.CompletionList;

	assert.ok(actualCompletionList.items.length >= 2);
	expectedCompletionList.items.forEach((expectedItem, i) => {
		const actualItem = actualCompletionList.items[i];
		assert.equal(actualItem.label, expectedItem.label);
		assert.equal(actualItem.kind, expectedItem.kind);
	});
}
*/