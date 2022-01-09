/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite.skip('Should get diagnostics', () => {
	const docUri = getDocUri('diagnostics.t');
	test('Makefile missing essential configuration', async () => {
		await testDiagnostics(docUri, [
			{
				message: 'The symbol "wrong_ref" is undefined, but appears from context to be a propertyname.  The compiler is assuming that this is a property.  Check the spelling ofthe symbol.  If this assumption is correct, you can avoid this warning byexplicitly declaring a value to the property in an object definition ratherthan in method code.',
				range: new vscode.Range(5, 5, 5, 5),
				severity: vscode.DiagnosticSeverity.Warning, source: 'tads3'
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