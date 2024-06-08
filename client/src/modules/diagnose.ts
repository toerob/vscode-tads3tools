import { dirname } from "path";
import { workspace, TextDocument } from "vscode";
import { extensionState } from "./state";
import { validateMakefile } from "./validate-makefile";
import { runCommand } from "./run-command";
import { parseDiagnostics, ensureObjFolderExistsInProjectRoot } from '../extension';

export async function diagnose(textDocument: TextDocument) {
  if (extensionState.getUsingTads2()) {
    extensionState.setDiagnosing(true);
    const tads2ExtensionConfig = workspace.getConfiguration("tads2");
    const compilerPath = tads2ExtensionConfig?.compiler?.path ?? "tadsc";
    const tads2libraryPath = tads2ExtensionConfig?.library?.path ?? "/usr/local/share/frobtads/tads2/";
    const mainFilePath = extensionState.getTads2MainFile().fsPath;
    const projectBaseFolder = dirname(mainFilePath);
    const commandLine = `"${compilerPath}" -i "${tads2libraryPath}" -i "${projectBaseFolder}" -ds "${mainFilePath}"`;
    const resultOfCompilation = await runCommand(commandLine);
    parseDiagnostics(resultOfCompilation.toString(), textDocument, 2);
    extensionState.setDiagnosing(false);
    return;
  }

  await validateMakefile(extensionState.getChosenMakefileUri());
  extensionState.setDiagnosing(true);
  ensureObjFolderExistsInProjectRoot();
  const tads3ExtensionConfig = workspace.getConfiguration("tads3"); // TODO: add configuration
  const compilerPath = tads3ExtensionConfig?.compiler?.path ?? "t3make"; // TODO: add configuration
  const resultOfCompilation = await runCommand(
    `${compilerPath} -nobanner -q -f "${extensionState.getChosenMakefileUri().fsPath}"`
  );
  parseDiagnostics(resultOfCompilation.toString(), textDocument);
  extensionState.setDiagnosing(false);
}
