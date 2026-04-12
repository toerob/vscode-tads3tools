/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, getDocPath, activate } from "./helper";
import { extensionState } from "../modules/state";
import { ensureSingleRootWorkspace, triggerParseBySave } from "./test-utils";

suite("Should get diagnostics", () => {
  teardown(async () => {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
    const folders = vscode.workspace.workspaceFolders ?? [];
    if (folders.length > 0) {
      vscode.workspace.updateWorkspaceFolders(0, folders.length);
    }
    extensionState.setChosenMakefileUri(undefined);
  });

  const docUri = getDocUri("diagnostics/diagnostics.t");
  test("Makefile missing essential configuration", async () => {
    await testDiagnostics(docUri, [
      {
        message:

          'The symbol "wrong_ref" is undefined, but appears from context to be a property name.  The compiler is assuming that this is a property.  Check the spelling of the symbol.  If this assumption is correct, you can avoid this warning by explicitly declaring a value to the property in an object definition rather than in method code.   Errors:   0 Warnings: 1 ', 
        range: new vscode.Range(5, 5, 5, 5),
        severity: vscode.DiagnosticSeverity.Warning,
        source: "tads3",
      },
    ]);
  });
});

async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
  //await ensureSingleRootWorkspace(vscode.Uri.file(getDocPath("diagnostics")), "diagnostics");
  await activate(docUri);
  await triggerParseBySave(docUri);

  // Pin the project makefile for this fixture to avoid ambiguous makefile selection.
  extensionState.setUsingTads2(false);
  extensionState.setChosenMakefileUri(getDocUri("diagnostics/Makefile.t3m"));

  const actualDiagnostics = await waitForDiagnostics(docUri, expectedDiagnostics.length);

  expectedDiagnostics.forEach((expectedDiagnostic) => {
    const matched = actualDiagnostics.find((actualDiagnostic) => {
      return (
        actualDiagnostic.message === expectedDiagnostic.message &&
        actualDiagnostic.severity === expectedDiagnostic.severity &&
        actualDiagnostic.range.isEqual(expectedDiagnostic.range)
      );
    });

    assert.ok(matched, `Missing expected diagnostic: ${expectedDiagnostic.message}`);
  });
}

async function waitForDiagnostics(docUri: vscode.Uri, minCount: number, timeoutMs = 15000): Promise<vscode.Diagnostic[]> {
  const targetUri = docUri.toString();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      disposable.dispose();
      clearInterval(interval);
      const latest = vscode.languages.getDiagnostics(docUri);
      reject(new Error(`Timed out waiting for diagnostics for ${targetUri}. Latest count: ${latest.length}`));
    }, timeoutMs);

    const tryResolve = () => {
      const diagnostics = vscode.languages.getDiagnostics(docUri);
      if (diagnostics.length >= minCount) {
        clearTimeout(timeout);
        clearInterval(interval);
        disposable.dispose();
        resolve(diagnostics);
      }
    };

    const disposable = vscode.languages.onDidChangeDiagnostics((event) => {
      if (event.uris.some((uri) => uri.toString() === targetUri)) {
        tryResolve();
      }
    });

    const interval = setInterval(tryResolve, 100);
    tryResolve();
  });
}
