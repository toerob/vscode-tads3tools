import { window } from 'vscode';
import { client } from '../../extension';

export const findQuoteInStringRegExp = new RegExp(/["](.*)["]|['](.*)[']|["]{3}(.*)["]{3}|[']{3}(.*)[']{3}/);

export function analyzeTextAtPosition() {
	if (window.activeTextEditor.selection.isEmpty) {
		// the Position object gives you the line and character where the cursor is
		const fsPath = window.activeTextEditor.document.uri.fsPath;
		const position = window.activeTextEditor.selection.active;
		const text = window.activeTextEditor.document.lineAt(position.line).text;
		const quote = findQuoteInStringRegExp.exec(text);
		if (quote) {
			const firstQuote = quote[1];
			window.showInformationMessage(`Analyzing ${firstQuote}`);
			client.sendRequest('request/analyzeText/findNouns', { path: fsPath, position, firstQuote });
		}
	}
}
