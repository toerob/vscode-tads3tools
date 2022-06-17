import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { workspace, ExtensionContext, window, Uri, Range, ViewColumn } from 'vscode';
import { writeFileSync } from 'fs';
import { extensionState } from './state';

export async function installTracker(context: ExtensionContext) {
	const filePath = extensionState.getUsingAdv3LiteStatus() ? '_gameTrackerAdv3Lite.t' : '_gameTrackerAdv3.t';
	let trackerFileContents = readFileSync(Uri.joinPath(context.extensionUri, 'resources', filePath).fsPath).toString();

	const keyvalue = extensionState.makefileKeyMapValues?.find(keyvalue => keyvalue?.key === '-D' && keyvalue.value?.startsWith(`LANGUAGE`));
	if (keyvalue) {
		const languageValue = keyvalue.value?.split('=');
		if (languageValue.length === 2) {
			trackerFileContents = trackerFileContents.replace('<en_us.h>', `<${languageValue[1]}.h>`);
		}
	}
	const chosenMakefileUri = extensionState.getChosenMakefileUri();

	if (chosenMakefileUri) {
		const workspaceFolder = dirname(chosenMakefileUri.fsPath);
		if (workspaceFolder) {
			const gameTrackerFilePath = path.join(workspaceFolder, filePath);
			const isATrackerFileAlreadyCreated = existsSync(gameTrackerFilePath);
			await workspace.openTextDocument(chosenMakefileUri.fsPath)
				.then(doc => window.showTextDocument(doc, ViewColumn.Beside))
				.then(async (editor) => {
					await editor.edit((ed) => {
						const trackerFile = extensionState.getUsingAdv3LiteStatus() ? '_gameTrackerAdv3Lite' : '_gameTrackerAdv3';
						const makefileText = editor.document.getText();
						const isTrackerFileAlreadyIncluded = makefileText.includes(`-source ${trackerFile}`);
						if (isTrackerFileAlreadyIncluded) {
							return window.showWarningMessage(`Tracker file was already included in ${chosenMakefileUri.fsPath}`);
						}
						const idx = makefileText.lastIndexOf('-source');
						const lastSourceRowPosition = editor.document.positionAt(idx);
						const lineBelow = lastSourceRowPosition.translate(1).with({ character: 0 });
						ed.insert(lineBelow, `-source ${trackerFile}\n`);
						const includedFileRange = new Range(lineBelow.line, 0, lineBelow.line, 0);
						editor.revealRange(includedFileRange);
						return window.showInformationMessage(`Tracker file was included in ${chosenMakefileUri.fsPath}`);
					});
					await editor.document.save();
				});


			if (!isATrackerFileAlreadyCreated) {
				await writeFileSync(gameTrackerFilePath, trackerFileContents, 'utf-8');
				await workspace.openTextDocument(gameTrackerFilePath)
					.then(doc => window.showTextDocument(doc, ViewColumn.Beside));
				window.showInformationMessage(`The tracker file (_game_tracker.t) has been added into the project's folder. `);
				return;
			}
			window.showWarningMessage(`The tracker file (_game_tracker.t) is already in the project's folder. `);
		}
	}

}
