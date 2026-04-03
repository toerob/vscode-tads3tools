/**
 * debug-ast.ts — Client-side handlers for the two developer debug commands:
 *
 *   tads3.dev.showAst    — Show indented AST for the current file.
 *   tads3.dev.showScopes — Show AST + scope builder output for the current file.
 */

import { window } from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';
import { AST_URI, SCOPES_URI, showVirtualDocument } from '../virtual-documents';

export async function showAst(client: LanguageClient): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    window.showWarningMessage('TADS3 Dev: no active editor.');
    return;
  }

  const uri = editor.document.uri.toString();
  let result: { output: string };
  try {
    result = await client.sendRequest('request/dev/showAst', { uri });
  } catch (err) {
    window.showErrorMessage(`TADS3 Dev – showAst failed: ${err}`);
    return;
  }

  await showVirtualDocument(AST_URI, result.output);
}

export async function showScopes(client: LanguageClient): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    window.showWarningMessage('TADS3 Dev: no active editor.');
    return;
  }

  const uri = editor.document.uri.toString();
  let result: { output: string };
  try {
    result = await client.sendRequest('request/dev/showScopes', { uri });
  } catch (err) {
    window.showErrorMessage(`TADS3 Dev – showScopes failed: ${err}`);
    return;
  }

  await showVirtualDocument(SCOPES_URI, result.output);
}
