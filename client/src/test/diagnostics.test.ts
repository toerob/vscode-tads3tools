/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite('Should get diagnostics', () => {
	const docUri = getDocUri('diagnostics.t');
	test('Makefile missing essential configuration', async () => {
		await testDiagnostics(docUri, [
			{
				message: `unresolved external reference "main"`,
				range: new vscode.Range(0, 0, 0, 0),
				severity: vscode.DiagnosticSeverity.Error, source: ''
			}
		]);
	});
});


async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
	await activate(docUri);
	const actualDiagnostics = vscode.languages.getDiagnostics(docUri);
	assert.equal(actualDiagnostics.length, expectedDiagnostics.length);
	expectedDiagnostics.forEach((expectedDiagnostic, i) => {
		const actualDiagnostic = actualDiagnostics[i];
		assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
		assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
		assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
	});
}