/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, activate } from "./helper";
import { CompletionItem, CompletionItemLabel } from "vscode";

suite.skip("Should do completion", () => {
  const docUri = getDocUri("diagnostics/diagnostics.t");

  test("Completes JS/TS in txt file", async () => {
    await testCompletion(docUri, new vscode.Position(0, 0), {
      items: [
        {
          label: { label: ".forEach", description: "Tads3 .forEach" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".indexWhich", description: "Tads3 .indexWhich" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".mapAll", description: "Tads3 .mapAll" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".sort", description: "Tads3 .sort" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".sublist", description: "Tads3 .sublist" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".subset", description: "Tads3 .subset" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: ".valWhich", description: "Tads3 .valWhich" },
          kind: vscode.CompletionItemKind.Snippet,
        },

        {
          label: {
            label: "action",
            description: "Tads3 action function snippet",
          },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: { label: "case", description: "Tads3 single-case" },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: {
            label: "check",
            description: "Tads3 check function snippet",
          },
          kind: vscode.CompletionItemKind.Snippet,
        },
        {
          label: {
            label: "DefineTAction",
            description: "Tads3 DefineTAction snippet",
          },
          kind: vscode.CompletionItemKind.Snippet,
        },

        /*
					DefineTIAction
					Tads3 DefineTIAction snippet
					else
					Tads3 else-expression
					else if
					Tads3 else if-expression
					eventlist
					Tads3 eventList snippet
					for
					Tads3 for-loop
					foreach
					Tads3 foreach loop
					forEachInstance
					Tads3 forEachInstance loop
					function
					Tads3 function snippet
					function (anonymous)
					Tads3 anonymous function snippet
					gActor
					Tads3 global gActor
					gActorIn
					Tads3 global gActorIn
					gActorIs
					Tads3 global gActorIs
					gDobj
					Tads3 global gDobj

					gIobj
					Tads3 global gIobj
					if
					Tads3 if-expression
					if-else-end
					Tads3 if-else-end string interpolation
					IFID
					Tads3 IFID snippet
					local
					Tads3 local variable definition
					one-of-or-stopping
					Tads3 oneof-or-stopping string interpolation
					q
					Tads3 quote-in-string
					quote-in-string
					Tads3 quote-in-string
					say
					Tads3 say snippet
					switch
					Tads3 switch-case
					verify
					Tads3 verify function snippet
					while
					Tads3 while-loop
				*/
      ],
    });
  });
});

async function testCompletion(
  docUri: vscode.Uri,
  position: vscode.Position,
  expectedCompletionList: vscode.CompletionList,
) {
  await activate(docUri);

  // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
  const actualCompletionList = (await vscode.commands.executeCommand(
    "vscode.executeCompletionItemProvider",
    docUri,
    position,
  )) as vscode.CompletionList;

  assert.ok(actualCompletionList.items.length >= 2);

  actualCompletionList.items.forEach((expectedItem, i) => {
    const expectedCompletionItemLabel = expectedItem.label as CompletionItemLabel;
    console.log(expectedCompletionItemLabel.label);
    console.log(expectedCompletionItemLabel.description);
  });

  expectedCompletionList.items.forEach((expectedItem, i) => {
    const expectedCompletionItemLabel = expectedItem.label as CompletionItemLabel;
    const actualItem: CompletionItem = actualCompletionList.items[i];
    const actualCompletionItemLabel = actualItem.label as CompletionItemLabel;
    assert.equal(actualCompletionItemLabel.label, expectedCompletionItemLabel.label);
    assert.equal(actualCompletionItemLabel.description, expectedCompletionItemLabel.description);
    assert.equal(actualItem.kind, expectedItem.kind);
  });
}
