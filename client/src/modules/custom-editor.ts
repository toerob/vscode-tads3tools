import * as vscode from "vscode";

export class Tads3CustomTextEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new Tads3CustomTextEditorProvider();
    const providerRegistration = vscode.window.registerCustomEditorProvider("tads3.customEditor", provider);
    return providerRegistration;
  }

  public resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken,
  ): void | Thenable<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlForWebview(document, webviewPanel.webview);
  }

  private getHtmlForWebview(document: vscode.TextDocument, webview: vscode.Webview): string {
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
