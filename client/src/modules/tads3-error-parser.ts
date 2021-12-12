import { existsSync } from 'fs';
import { TextDocument, Diagnostic, DiagnosticSeverity, Position, Range, DiagnosticCollection, Uri } from 'vscode';
import { extensionState } from './state';

const errorOrWarningRegExp = /((.*?)[(]([0-9]+)[)]:\s*)?([Ee]rror|[Ww]arning):\s*(.*)/;
const summaryRegExp = /Errors:\s*([0-9]*)Warnings:\s*([0-9]*)$/g;

/**
 * Parses compilation error messages and create diagnostics out of them
 */
 export function parseAndPopulateErrors(text: string, textDocument: TextDocument, collection: DiagnosticCollection) {
	collection.clear();
	const diagnostics: Diagnostic[] = [];
	const unbrokenErrorText = text.replace(/\n/g, '');
	const result = errorOrWarningRegExp.exec(unbrokenErrorText);
	if (result) {
		const line: number = (result[3] ? Number.parseInt((result[3]) as string) : 1) - 1 ?? 0;
		if (result.length >= 4) {
			const characterLengthOfIssueLine = textDocument.positionAt(line).character.valueOf();
			const severity = convertMessageToSeverity(result[4]);
			const position = new Position(line, characterLengthOfIssueLine);
			const range = new Range(position, position);
			const message = (result[5] ?? '').replace(summaryRegExp, '');
			const diagnostic: Diagnostic = {
				severity,
				range,
				message,
				source: 'tads3',
			};
			diagnostics.push(diagnostic);
			const filename = result[2] ? Uri.parse(result[2]) : extensionState.getChosenMakefileUri();
			if(existsSync(filename.fsPath)) {
				collection.set(filename, diagnostics);
			}
		}
	}
	return diagnostics;
}

function convertMessageToSeverity(str: string): DiagnosticSeverity {
	if (str?.match('[Ee]rror')) return DiagnosticSeverity.Error;
	if (str?.match('[Ww]arning')) return DiagnosticSeverity.Warning;
	return DiagnosticSeverity.Error;
}

