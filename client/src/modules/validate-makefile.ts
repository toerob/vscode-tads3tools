import { basename } from 'path';
import { CancellationError, Uri, window, workspace } from 'vscode';

/**
 * Scans through the makefile and validates each row.
 * 
 * Existing validations:
 * 
 * 1) Warns the user if about to flood the directory with symbol and object files.
 * 
 * @param chosenMakefileUri 
 */
export async function validateMakefile(chosenMakefileUri: Uri) {
	const abortsDueToMissingDefinitionInMakefile = await workspace.openTextDocument(chosenMakefileUri)
		.then(async doc => {
			const text = doc.getText();
			const arrayOfText = text.split('\n');
			let fyFound = false;
			let foFound = false;
			for (const row of arrayOfText) {
				if (row.match(/^\s*(-F[yo])\s+(.+)\s*$/)) {
					if (row.includes('-Fy ')) fyFound = true;
					if (row.includes('-Fo ')) foFound = true;
				}
			}
			if (!fyFound || !foFound) {
				const result = await window.showWarningMessage(
					`The tads3tools extension detected that there's either no -Fy or -Fo definition in "${basename(chosenMakefileUri.path)}". \nThis will cause all symbol/object files to be generated in the same directory as the source files instead of in a dedicated folder "obj". e.g: \n\t-Fy obj\n\t-Fo obj\n\n`, { modal: true },
					{ title: 'Continue anyway' });
				return result === undefined;
			}



			
		});
	if (abortsDueToMissingDefinitionInMakefile) {
		throw new CancellationError();
	}
}
