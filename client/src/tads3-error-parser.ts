import { TextDocument, Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode';

const errorOrWarningRegExp = /((.*)[(]([0-9]+)[)]:\s*)?([Ee]rror|[Ww]arning):\s*(.*)/;

const summaryRegExp = /Errors:\s*([0-9]*)Warnings:\s*([0-9]*)$/g;

/**
 * Has the responsibility to parse compilation error messages and create 
 * diagnostics out of them
 */
export class Tads3CompileErrorParser {

	parse(text: string, textDocument: TextDocument) {
		const diagnostics: Diagnostic[] = [];
		const unbrokenErrorText = text.replace(/\n/g, '');
		const result = errorOrWarningRegExp.exec(unbrokenErrorText);
		if (result) {
			let line: number = (result[3] ? Number.parseInt((result[3]) as string) : 1) - 1 ?? 0;
			if (result.length >= 4) {
				const isError = (result[4].match('[Ee]rror')) ? true : false;
				const characterLengthOfIssueLine = textDocument.positionAt(line).character.valueOf();
				const severity = isError ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning;
				const position = new Position(line, characterLengthOfIssueLine);
				const range = new Range(position, position);
				let message = (result[5] ?? '').replace(summaryRegExp, '');
				const source = result[1] ?? '';
				const diagnostic: Diagnostic = {
					severity,
					range,
					message,
					source
				};
				diagnostics.push(diagnostic);
			}
		}
		return diagnostics;
	}
}