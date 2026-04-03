/**
 * virtual-documents.ts — Shared virtual read-only document provider.
 *
 * Documents opened under the "tads3-dev://" scheme are never marked dirty
 * and VS Code never prompts to save them on close.
 *
 * Usage:
 *   1. Call registerVirtualDocumentProvider(ctx) once during activation.
 *   2. Call showVirtualDocument(uri, content) to open / refresh a tab.
 *   3. Use the pre-defined URI constants for each output type, or create
 *      new ones with Uri.parse('tads3-dev://...') as needed.
 */

import {
  EventEmitter,
  ExtensionContext,
  Range,
  TextDocumentContentProvider,
  Uri,
  ViewColumn,
  window,
  workspace,
} from 'vscode';

// ── Provider ──────────────────────────────────────────────────────────────────

export const SCHEME = 'tads3-dev';

class Tads3DevContentProvider implements TextDocumentContentProvider {
  private readonly _emitter  = new EventEmitter<Uri>();
  private readonly _content  = new Map<string, string>();

  readonly onDidChange = this._emitter.event;

  update(uri: Uri, content: string): void {
    this._content.set(uri.toString(), content);
    this._emitter.fire(uri);
  }

  provideTextDocumentContent(uri: Uri): string {
    return this._content.get(uri.toString()) ?? '';
  }
}

export const virtualDocumentProvider = new Tads3DevContentProvider();

export function registerVirtualDocumentProvider(ctx: ExtensionContext): void {
  ctx.subscriptions.push(
    workspace.registerTextDocumentContentProvider(SCHEME, virtualDocumentProvider),
  );
}

// ── Well-known URIs ───────────────────────────────────────────────────────────

export const AST_URI          = Uri.parse(`${SCHEME}://debug/AST`);
export const SCOPES_URI       = Uri.parse(`${SCHEME}://debug/AST%2BScopes`);
export const DISASM_METHOD_URI = Uri.parse(`${SCHEME}://debug/Disassembly`);
export const DISASM_IMAGE_URI  = Uri.parse(`${SCHEME}://debug/Disassembly%20(full%20image)`);
export const PREPROCESS_URI   = Uri.parse(`${SCHEME}://debug/Preprocessed`);

// ── Helper ────────────────────────────────────────────────────────────────────

/**
 * Update the virtual document at `uri` with `content` and show it beside the
 * current editor.  If `scrollTo` is provided, the editor scrolls to that range.
 */
export async function showVirtualDocument(
  uri: Uri,
  content: string,
  scrollTo?: Range,
): Promise<void> {
  virtualDocumentProvider.update(uri, content);
  const doc = await workspace.openTextDocument(uri);
  await window.showTextDocument(doc, {
    viewColumn: ViewColumn.Beside,
    preserveFocus: true,
    preview: false,
    selection: scrollTo,
  });
}
