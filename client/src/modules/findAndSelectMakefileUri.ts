import { basename } from 'path';
import { workspace, window, Uri } from 'vscode';
import { selectMakefileWithDialog } from '../extension';


export async function findAndSelectMakefileUri(askIfNotFound = false) {
	let choice: Uri = undefined;
	const files = await workspace.findFiles(`**/*.t3m`);
	if (files.length > 1) {
		if (askIfNotFound) {
			window.showInformationMessage(`Select which Makefile the project uses`);
			const qpItemMap = new Map();
			files.forEach(x => qpItemMap.set(basename(x.path), x));
			const entriesStr: string[] = Array.from(qpItemMap.keys());
			const pick = await window.showQuickPick(entriesStr);
			choice = qpItemMap.get(pick);
		} else {
			const defaultMakefile = files.find(x => x.fsPath.endsWith('Makefile.t3m'));
			choice = defaultMakefile ? defaultMakefile : files[0];
			window.showInformationMessage(`Using first found makefile in project`);
		}
	} else if (files.length == 1) {
		choice = files[0];
	} else {
		if (choice === undefined && askIfNotFound) {
			choice = await selectMakefileWithDialog();
		}
	}

	if (choice === undefined) {
		console.error(`No Makefile.t3m found, source code could not be processed.`);
	}
	return Promise.resolve(choice);
}
