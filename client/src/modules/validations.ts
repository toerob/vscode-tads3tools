import { window, workspace } from 'vscode';
import { runCommand } from "./run-command";

export const versionRegexp = new RegExp(`TADS Compiler (.*) Copyright `);

export async function validateUserSettings() {
	const path: string = workspace.getConfiguration("tads3")?.get('compiler.path');
	return validateCompilerPath(path, false);
}

export async function validateCompilerPath(t3makePath: string, showSuccess = true) {
	const output = await runCommand(`"${t3makePath}"`);
	if (output) {
		const versionResult = versionRegexp.exec(output.toString());
		if (versionResult && versionResult.length > 0) {
			if (!showSuccess) { return true; }
			window.showInformationMessage(`Compiler path setting ${t3makePath} is valid, version: ${versionResult[1]} `);
			return true;
		}
	}
	window.showErrorMessage(`Tads3 Compiler path setting (t3make executable) couldn't execute properly. The extension won't work properly without a valid path/executable string. Examine the tads3.compiler.path setting, Set the path to a valid one and try saving any document in the project to trigger a new parse. `);
	return false;
}
