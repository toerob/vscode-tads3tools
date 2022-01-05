import { existsSync } from 'fs';
import { TextDocument, Diagnostic, DiagnosticSeverity, Position, Range, DiagnosticCollection, Uri, workspace } from 'vscode';
import { extensionState } from './state';

const errorOrWarningRegExp = /((.*?)[(]([0-9]+)[)]:\s*)?([Ee]rror|[Ww]arning):\s*(.*)/;
const summaryRegExp = /Errors:\s*([0-9]*)Warnings:\s*([0-9]*)$/g;
const tads2WarningRegExp = /(.*)[(]([0-9]+)[)][:]\s+(.+)/

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

export function parseAndPopulateTads2Errors(text: string, textDocument: TextDocument, collection: DiagnosticCollection) {
	collection.clear();
	const diagnostics: Map<Uri,Set<Diagnostic>> = new Map();
	for(const row of text.split(/\r?\n/)) {
		const result = tads2WarningRegExp.exec(row);
		if(result) {
			const line: number = (result[2] ? Number.parseInt((result[2]) as string) : 1) - 1 ?? 0;
			const message = row;
			const characterLengthOfIssueLine = textDocument.positionAt(line).character.valueOf();
			const position = new Position(line, characterLengthOfIssueLine);
			const range = new Range(position, position);
			const severity = convertMessageToSeverity(row);
			const diagnostic: Diagnostic = {
				severity,
				range,
				message,
				source: 'tads2',
			};
			const filename = (result[1] ?  mapToFullPath(result[1]) : extensionState.getTads2MainFile());
			if(existsSync(filename.fsPath)) {
				const setOfDiagnostics = diagnostics.get(filename) ?? new Set();
				setOfDiagnostics.add(diagnostic);
				diagnostics.set(filename, setOfDiagnostics);
			}
		}
	}
	diagnostics.forEach( (diagnostics, filename)=> {
		collection.set(filename, [...diagnostics.values()]);
	})
	return [...diagnostics.values()];
}

function convertMessageToSeverity(str: string): DiagnosticSeverity {
	if (str?.includes('warning')) return DiagnosticSeverity.Warning;
	return DiagnosticSeverity.Error;
}


function mapToFullPath(fileShortName: string) {
	const node = extensionState.tads2ProjectFilesInfo.get(fileShortName);
	return node.uri;
}

