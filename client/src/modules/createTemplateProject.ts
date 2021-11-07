import { existsSync, readFileSync } from 'fs';
import { workspace, ExtensionContext, window, Uri, Position, SnippetString } from 'vscode';
import { writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { isUsingAdv3Lite, setUsingAdv3LiteStatus } from '../extension';

export async function createTemplateProject(context: ExtensionContext) {

	const projectFolder: Uri[] = await window.showOpenDialog({
		title: `Select which in which folder to place the project folder`,
		openLabel: `Select folder)`,
		canSelectFolders: true,
		canSelectFiles: false,
	});


	if (projectFolder?.length > 0 && projectFolder[0] !== undefined) {
		const firstWorkspaceFolder = projectFolder[0];


		const makefileUri = Uri.joinPath(firstWorkspaceFolder, 'Makefile.t3m');
		const gameFileUri = Uri.joinPath(firstWorkspaceFolder, 'gameMain.t');
		const objFolderUri = Uri.joinPath(firstWorkspaceFolder, 'obj');

		if (existsSync(makefileUri.fsPath) || existsSync(gameFileUri.fsPath)) {
			const userAnswer = await window.showInformationMessage(
				`Project already have either a Makefile.t3m or a gameMain.t, do you want to overwrite them with a fresh template?`,
				{ title: 'Yes' }, { title: 'No' });
			if (userAnswer === undefined || userAnswer.title === 'No') {
				return;
			}
		}

		const result = await window.showQuickPick(['adv3', 'adv3Lite'], { placeHolder: 'Project type' });
		setUsingAdv3LiteStatus((result === 'adv3Lite' ? true : false));

		const makefileResourceFilename = isUsingAdv3Lite ? 'Makefile-adv3Lite.t3m' : 'Makefile.t3m';
		const gamefileResourceFilename = isUsingAdv3Lite ? 'gameMain-adv3Lite.t' : 'gameMain.t';

		const makefileResourceFileUri = Uri.joinPath(context.extensionUri, 'resources', makefileResourceFilename);
		const gamefileResourceFileUri = Uri.joinPath(context.extensionUri, 'resources', gamefileResourceFilename);

		let makefileResourceFileContent = readFileSync(makefileResourceFileUri.fsPath).toString();
		const gamefileResourceFileContent = readFileSync(gamefileResourceFileUri.fsPath).toString();

		if (!existsSync('/usr/local/share/frobtads/tads3/include') && !existsSync('/usr/local/share/frobtads/tads3/lib')) {
			makefileResourceFileContent = makefileResourceFileContent
				.replace('-FI /usr/local/share/frobtads/tads3/include', '#-FI /usr/local/share/frobtads/tads3/include')
				.replace('-FL /usr/local/share/frobtads/tads3/lib', '#-FL /usr/local/share/frobtads/tads3/lib');
		}

		ensureDirSync(objFolderUri.fsPath);
		writeFileSync(makefileUri.fsPath, makefileResourceFileContent);
		writeFileSync(gameFileUri.fsPath, '');

		const gameFilecontent = new SnippetString(gamefileResourceFileContent);

		await workspace.openTextDocument(gameFileUri.fsPath)
			.then(doc => window.showTextDocument(doc))
			.then(editor => editor.insertSnippet(gameFilecontent, new Position(0, 0)));
	}
}
