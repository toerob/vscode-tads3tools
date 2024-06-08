import { window, workspace } from "vscode";
import { runCommand } from "./run-command";

export const versionRegexp = new RegExp(`TADS Compiler (.*) Copyright `);

export async function validateUserSettings() {
  const path: string = workspace.getConfiguration("tads3")?.get("compiler.path");
  return validateCompilerPath(path, false);
}

export async function validateTads2Settings() {
  const preprocessorResult = await validateCompilerPath(
    workspace.getConfiguration("tads").get("preprocessor.path"),
    false,
  );
  const compilerResult = await validateCompilerPath(workspace.getConfiguration("tads2").get("compiler.path"), false);
  return preprocessorResult && compilerResult;
}

export async function validateCompilerPath(compilerPath: string, showSuccess = true) {
  const output = await runCommand(`"${compilerPath}"`);
  if (output) {
    const versionResult = versionRegexp.exec(output.toString());
    if (versionResult && versionResult.length > 0) {
      if (!showSuccess) {
        return true;
      }
      window.showInformationMessage(`Compiler path setting ${compilerPath} is valid, version: ${versionResult[1]} `);
      return true;
    }
  }
  window.showErrorMessage(
    `Compiler path setting (${compilerPath} executable) couldn't execute properly. The extension won't work properly without a valid path/executable string. Examine the ${compilerPath} setting, Set the path to a valid one and try saving any document in the project to trigger a new parse. `,
  );
  return false;
}

export async function validatePreprocessorPath(ppPath: string, showSuccess = true) {
  const versionArgument = "--version";
  const output = await runCommand(`"${ppPath}" ${versionArgument}`);
  if (output) {
    if (output.toString().includes("Copyright (C)")) {
      if (!showSuccess) {
        return true;
      }
      window.showInformationMessage(`Preprocessor path setting ${ppPath} is valid`);
      return true;
    }
  }
  window.showErrorMessage(
    `Tads2 preprocessor path setting (t3make executable) couldn't execute properly. The extension won't work properly without a valid path/executable string. Examine the tads.preprocessor.path setting, Set the path to a valid one and try saving any document in the project to trigger a new parse. `,
  );
  return false;
}
