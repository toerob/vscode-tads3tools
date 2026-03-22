/*
 * extension.ts (and activateMockDebug.ts) forms the "plugin" that plugs into VS Code and contains the code that
 * connects VS Code with the debug adapter.
 *
 */
"use strict";

import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function getWebviewResourceUri(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext,
  relPath: string,
): vscode.Uri {
  const onDiskPath = vscode.Uri.file(
    path.join(context.extensionPath, "resources", relPath),
  );
  return panel.webview.asWebviewUri(onDiskPath);
}

function getWebviewContent(
  output: string,
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel,
): string {
  // Escape HTML special chars for output
  const safeOutput = output.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const htmlPath = context.asAbsolutePath("resources/gameview/gameview.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  // Replace resource links with webview-safe URIs
  const cssUri = getWebviewResourceUri(panel, context, "gameview/gameview.css");
  const jsUri = getWebviewResourceUri(panel, context, "gameview/gameview.js");
  html = html.replace("gameview.css", cssUri.toString());
  html = html.replace("gameview.js", jsUri.toString());
  html = html.replace("{{output}}", safeOutput);
  return html;
}

export function showGameWebview(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "gameConsole",
    "Game Console",
    { viewColumn: vscode.ViewColumn.Two, preserveFocus: false },
    { enableScripts: true, retainContextWhenHidden: true },
  );

  // Initial output
  let output = "";

  // HTML for the webview
  panel.webview.html = getWebviewContent(output, context, panel);

  // Handle messages from the webview (user input)
  panel.webview.onDidReceiveMessage(
    (message) => {
      if (message.command === "input") {

        // Send the input to the debug adapter
        panel.webview.postMessage({
          command: "update",
          data: " > " + message.text, // Simple hack to show what is user input in the output
        });
        vscode.commands.executeCommand("tads3dbg.sendInput", message.text);
      }
    },
    undefined,
    context.subscriptions,
  );
  return panel;
}
