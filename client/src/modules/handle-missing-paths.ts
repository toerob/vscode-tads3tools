import { ProgressLocation, window, CancellationToken, Progress, WorkspaceConfiguration, ConfigurationTarget, Uri } from 'vscode';
import { glob, IGlob } from 'glob';

export async function handleMissingCompilerWithGui(config: WorkspaceConfiguration) {
	const scanOption = "Search for it automatically";
	const pickManuallyOption = "Select the file manually";
	const userPick = await window.showInformationMessage(
		`Could not find the path to the tads3 compiler "t3make". It is needed for the extension to work. `,
		{ detail: '...' },
		{ title: scanOption },
		{ title: pickManuallyOption });
	if (userPick.title === scanOption) {
		await searchForCompilerAutomatically(config);
	} else if (userPick.title === pickManuallyOption) {
		await selectCompilerManually(config);
	}
}

async function searchForCompilerAutomatically(config: WorkspaceConfiguration) {
	const progressOptions = { title: 'Scanning directories for t3make.exe', location: ProgressLocation.Notification, cancellable: true };
	await window.withProgress(progressOptions, (progress, withProgressToken) => searchWithProgressForCompiler(progress, withProgressToken))
		.then((result) => onFoundPaths(result, config), () => onAbortOrError());
}

function searchWithProgressForCompiler(progress: Progress<{ message?: string; increment?: number; }>, withProgressToken: CancellationToken): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		progress.report({ message: "Scanning..." });
		const globHandle: IGlob = glob(
			'/Program*/TADS*3/t3make.exe',
			{ root: "C:\\", nocase: true, silent: true, strict: false },
			(errors, result) => {
				return errors ? reject() : resolve(result);
			});
		withProgressToken.onCancellationRequested(() => { globHandle.abort(); reject(false); });
	});
}

async function onFoundPaths(foundPaths: string[], config: WorkspaceConfiguration) {
	if (foundPaths.length > 1) {
		await window.showQuickPick(foundPaths, { title: `Found several files. Select one or press escape to abort. ` });
	} else {
		const userInput = await window.showInformationMessage(`Found: "${foundPaths[0]}" Store this setting to tads3.compiler.path?`, { modal: true }, { title: "Yes" });
		if (userInput?.title === 'Yes') {
			try {
				const path = foundPaths[0];
				await config.update('compiler.path', path, undefined, true);
				await config.update('compiler.path', path, ConfigurationTarget.Global);
			} catch (err) {
				await window.showErrorMessage(`Failed to change the tads3.compiler.path setting. (${err}) `, { modal: true });
			}
		}
	}
}

async function onAbortOrError() {
	await window.showInformationMessage(`The compiler t3make wasn't found. Extension capabilites are now limited. `);
}


async function selectCompilerManually(config: WorkspaceConfiguration) {
	const t3makeBinaryPath: Uri[] = await window.showOpenDialog({
		title: `Select the location of the t3make.exe binary file`,
		openLabel: `Select file (*.exe)`,
		filters: { 'Executable': ['exe'] },
		canSelectFolders: false,
		canSelectFiles: true,
	});
	if (t3makeBinaryPath?.length > 0 && t3makeBinaryPath[0] !== undefined) {
		const selectedT3makeBinaryPath = t3makeBinaryPath[0].fsPath;
		await config.update('compiler.path', selectedT3makeBinaryPath, undefined, true);
		await config.update('compiler.path', selectedT3makeBinaryPath, ConfigurationTarget.Global);
	}
}

