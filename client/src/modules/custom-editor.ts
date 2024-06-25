import {
  CancellationToken,
  CustomTextEditorProvider,
  ExtensionContext,
  TextDocument,
  Webview,
  WebviewPanel,
  commands,
  window,
  Disposable,
} from "vscode";

export class Tads3CustomTextEditorProvider implements CustomTextEditorProvider {
  public static register(context: ExtensionContext): Disposable {
    const provider = new Tads3CustomTextEditorProvider();
    const providerRegistration = window.registerCustomEditorProvider("tads3.customEditor", provider);
    return providerRegistration;
  }

  public resolveCustomTextEditor(
    document: TextDocument,
    webviewPanel: WebviewPanel,
    token: CancellationToken,
  ): void | Thenable<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlForWebview(document, webviewPanel.webview);
  }

  private getHtmlForWebview(document: TextDocument, webview: Webview): string {
    const text = document.getText();
    const escapedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
				<h1>Tads3 Custom Editor Mode</h1>
					<pre>${escapedText}</pre>
        </body>
        </html>`;
  }
}

export async function switchToTads3CustomEditor() {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  const document = activeEditor.document;
  const viewType = "tads3.customEditor";
  const isCustomEditor = activeEditor.viewColumn === undefined;
  await commands.executeCommand("vscode.openWith", document.uri, isCustomEditor ? "default" : viewType);
}
