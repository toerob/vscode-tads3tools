import { TextDocument, Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode'; 

/**
 * Has the responsibility to parse compilation error messages and create diagnostics out of them
 */
export class Tads3CompileErrorParser {

	jsonLexer: any;

	pattern = /((.*)[(]([0-9]+)[)]:\s*)?([Ee]rror|[Ww]arning):\s*(.*)/;

	pattern2 = /Errors:\s*([0-9]*)Warnings:\s*([0-9]*)$/g;
		//let re = this.pattern2.exec(text);
	

	//constructor(params: any) { }

	parse(text: string, textDocument: TextDocument) {
		const diagnostics: Diagnostic[] = [];

		const unbrokenErrorText = text.replace(/\n/g,'');
		
		const result = this.pattern.exec(unbrokenErrorText);
		if(result) {
			let line: number = result[3] ? Number.parseInt(result[3] as string) : undefined;
			if (line) {
				line -= 1;
			}
			let issueBody = result[5];
			issueBody = issueBody.replace(this.pattern2, '');
			if (result.length >= 4) {
				const isError = (result[4].match('[Ee]rror')) ? true : false;
				const characterLengthOfIssueLine = textDocument.positionAt(line ?? 0).character.valueOf();

				const diagnostic: Diagnostic = {
					severity: isError ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
					range: new Range(new Position(line, characterLengthOfIssueLine), new Position(line, characterLengthOfIssueLine)),
					message: issueBody,
					source: result[1]
				};

				diagnostics.push(diagnostic);
			}
		}


		return diagnostics;
	}
}