import { CancellationError, Uri, window, workspace } from "vscode";
import { runCommand } from "./run-command";
import { basename } from "path";


export const versionRegexp = new RegExp(`TADS Compiler (.*) Copyright `);

export async function validateUserSettings() {
  const path: string = workspace.getConfiguration("tads3")?.get("compiler.path");
  return validateCompilerPath(path, false);
}

export async function validateCompilerPath(compilerPath: string, showSuccess = true) {
  const output = await runCommand(`"${compilerPath}"`);
  if (output) {
    const versionResult = versionRegexp.exec(output.toString());
    if (versionResult && versionResult.length > 0) {
      if (!showSuccess) {
        return true;
      }
      window.showInformationMessage(`Compiler path setting "${compilerPath}" is valid, version: ${versionResult[1]} `);
      return true;
    }
  }
  window.showErrorMessage(
    `Compiler path from the setting "compiler.path" ("${compilerPath}") executable) couldn't execute properly. The extension won't work properly without a valid path/executable string. Examine the "compiler.path" setting, Set the path to a valid one and try saving any document in the project to trigger a new parse. `,
  );
  return false;
}

export async function validateTads2Settings() {
  const preprocessorResult = await validateCompilerPath(
    workspace.getConfiguration("tads").get("preprocessor.path"),
    false,
  );
  const compilerResult = await validateCompilerPath(workspace.getConfiguration("tads2").get("compiler.path"), false);
  return preprocessorResult && compilerResult;
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
  const abortsDueToMissingDefinitionInMakefile = await workspace
    .openTextDocument(chosenMakefileUri)
    .then(async (doc) => {
      const text = doc.getText();
      const arrayOfText = text.split("\n");
      let fyFound = false;
      let foFound = false;
      for (const row of arrayOfText) {
        if (row.match(/^\s*(-F[yo])\s+(.+)\s*$/)) {
          if (row.includes("-Fy ")) fyFound = true;
          if (row.includes("-Fo ")) foFound = true;
        }
      }
      if (!fyFound || !foFound) {
        const result = await window.showWarningMessage(
          `The tads3tools extension detected that there's either no -Fy or -Fo definition in "${basename(chosenMakefileUri.path)}". \nThis will cause all symbol/object files to be generated in the same directory as the source files instead of in a dedicated folder "obj". e.g: \n\t-Fy obj\n\t-Fo obj\n\n`,
          { modal: true },
          { title: "Continue anyway" },
        );
        return result === undefined;
      }
    });
  if (abortsDueToMissingDefinitionInMakefile) {
    throw new CancellationError();
  }
}
