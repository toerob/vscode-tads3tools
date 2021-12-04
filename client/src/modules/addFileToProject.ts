import { ExtensionContext, Position, Range, SnippetString, Uri, ViewColumn, window, workspace } from 'vscode';
import { extensionState } from './state';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { basename, dirname } from 'path';
import path = require('path');

/**
 * Adds a new file to the project relative located to the makefile location. If a path is used, then directories will be added.
 * Also adds an entry in the makefile, and show that next to the newly created file in the editor
 * @param context 
 */
export async function addFileToProject(context: ExtensionContext) {
	let userInput = await window.showInputBox({
		title: `Add file: `,
		prompt: `Type (the relative location and) name of the new file, e.g: locations.t, locations/place.t etc... `,
		validateInput: (str) => str.match(/^(?:([a-zA-Z][a-zA-Z0-9.\-_]*)\/)*[a-zA-Z][a-zA-Z0-9.\-_]*$/) ? null : `${str} is not a valid filename`
	})

	// Add default .t extension if missing
	if (!userInput.match(/.*[.][th]/)) {
		userInput = `${userInput}.t`;
	}

	const makefileUri = extensionState.getChosenMakefileUri();
	if (existsSync(makefileUri.fsPath)) {
		const newFile = Uri.joinPath(makefileUri, '..', userInput);
		const gamefileResourceFilename = extensionState.getUsingAdv3LiteStatus() ? 'gameFileTemplateAdv3Lite.t' : 'gameFileTemplateAdv3.t';
		const gamefileResourceFileUri = Uri.joinPath(context.extensionUri, 'resources', gamefileResourceFilename);
		const gamefileResourceFileContent = readFileSync(gamefileResourceFileUri.fsPath).toString();
		const gameFilecontent = new SnippetString(gamefileResourceFileContent);

		if (existsSync(newFile.fsPath)) {
			window.showWarningMessage(`The file (${newFile.fsPath}) already exists `);
			return;
		}
		
		ensureDirSync(dirname(newFile.fsPath));
		writeFileSync(newFile.fsPath, '');

		await workspace.openTextDocument(newFile.fsPath)
			.then(doc => window.showTextDocument(doc))
			.then(editor => editor.insertSnippet(gameFilecontent, new Position(0, 0)));


		await workspace.openTextDocument(makefileUri.fsPath)
		.then(doc => window.showTextDocument(doc, ViewColumn.Beside, true))
		.then(async (editor) => {
			await editor.edit((ed) => {
				const newFileBaseName = basename(newFile.fsPath);
				const makeFileDirname = dirname(makefileUri.fsPath);
				let newFileRelativeFromMakefile = path.relative(makeFileDirname, newFile.fsPath);
				if(newFileRelativeFromMakefile.endsWith('.t')) {
					newFileRelativeFromMakefile = newFileRelativeFromMakefile.substring(0, newFileRelativeFromMakefile.length-2);
				}

				const makefileText = editor.document.getText();
				const isNewFileAlreadyIncluded = makefileText.includes(`-source ${newFileRelativeFromMakefile}`);
				if (isNewFileAlreadyIncluded) {
					return window.showWarningMessage(`${newFile.fsPath} was already included in ${makefileUri.fsPath}`);
				}
				const idx = makefileText.lastIndexOf('-source');
				const lastSourceRowPosition = editor.document.positionAt(idx);
				const lineBelow = lastSourceRowPosition.translate(1).with({ character: 0 });
				ed.insert(lineBelow, `-source ${newFileRelativeFromMakefile}\n`);
				const includedFileRange = new Range(lineBelow.line, 0, lineBelow.line, 0);
				editor.revealRange(includedFileRange);
				return editor;
			});
			await editor.document.save();
			await workspace.openTextDocument(newFile.fsPath)
			.then(doc => window.showTextDocument(doc, ViewColumn.Active))
		});

	}

}
