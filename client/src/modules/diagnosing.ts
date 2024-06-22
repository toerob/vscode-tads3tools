import { existsSync } from "fs";
import { dirname } from "path";
import { workspace, TextDocument, CancellationError, window, Diagnostic, DiagnosticSeverity } from "vscode";
import { ExtensionStateStore } from "./state";
import { findAndSelectMakefileUri } from "./makefile-utils";
import { setupAndMonitorBinaryGamefileChanges } from "./game-monitor";
import { LanguageClient } from "vscode-languageclient/node";
import { ensureDirSync } from "fs-extra";
import { join } from "path";
import { validateMakefile } from "./validations";
import { runCommand } from "./run-command";
import { DEBOUNCE_TIME, setErrorDiagnostics } from "../extension";
import { parseAndPopulateErrors, parseAndPopulateTads2Errors } from "./tads-error-parser";
import { parseSymbols } from "./parsing";

export async function diagnoseAndParseTads3(
  ctx: any,
  doc: TextDocument,
  state: ExtensionStateStore,
  client: LanguageClient,
  cancellationToken: any,
  diagnosticsCollection: any,
): Promise<void> {
  client.info(`Debounce time of ${DEBOUNCE_TIME} has passed since trigger - diagnose and compiling starting`);
  if (!(await diagnoseTads3(doc, state, client, diagnosticsCollection))) {
    return;
  }

  setupAndMonitorBinaryGamefileChanges(state, "*.t3");

  await parseSymbols(3, ctx, doc, state, client, cancellationToken);
}

export async function diagnoseAndParseTads2(
  ctx: any,
  textDocument: TextDocument,
  state: ExtensionStateStore,
  client: LanguageClient,
  cancellationToken: any,
  collection: any,
): Promise<void> {
  client.info(`Debounce time of ${DEBOUNCE_TIME} has passed since trigger - diagnose and compiling starting`);
  if (!(await diagnoseTads2(textDocument, state, client, collection))) {
    return;
  }
  setupAndMonitorBinaryGamefileChanges(state, "*.gam");
  await parseSymbols(2, ctx, textDocument, state, client, cancellationToken);
}

export async function diagnoseTads3(
  textDocument: TextDocument,
  extensionState: ExtensionStateStore,
  client: LanguageClient,
  collection: any,
) {
  if (extensionState.getChosenMakefileUri() && !existsSync(extensionState.getChosenMakefileUri().fsPath)) {
    extensionState.setChosenMakefileUri(undefined);
  }
  if (extensionState.getChosenMakefileUri() === undefined) {
    extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
  }
  if (extensionState.getChosenMakefileUri() === undefined) {
    client.debug(`No makefile could be found for ${dirname(textDocument.uri.fsPath)}`);
    return;
  }
  return diagnoseDocument(textDocument, client, collection, extensionState);
}

export async function diagnoseTads2(
  textDocument: TextDocument,
  extensionState: ExtensionStateStore,
  client: LanguageClient,
  collection: any,
) {
  const mainFile = extensionState.getTads2MainFile();
  if (mainFile && !existsSync(mainFile.fsPath)) {
    extensionState.setTads2MainFile(undefined);
  }
  if (mainFile === undefined) {
    client.debug(`No main file could be found for ${dirname(textDocument.uri.fsPath)}`);
    return;
  }
  if (!extensionState.gameFileSystemWatcher) {
    setupAndMonitorBinaryGamefileChanges(extensionState, "*.gam");
  }

  return diagnoseDocument(textDocument, client, collection, extensionState);
}

export async function diagnoseDocument(
  textDocument: TextDocument,
  client: LanguageClient,
  collection: any,
  extensionState,
) {
  client.info(`Diagnosing`);
  try {
    const errorDiagnostics = await diagnose(textDocument, collection, extensionState);
    const errors = errorDiagnostics.filter((x: Diagnostic) => x.severity === DiagnosticSeverity.Error);
    if (errors.length > 0) {
      setErrorDiagnostics(errors);
      client.warn(
        `Could not assemble outliner symbols due to error(s): \n${errorDiagnostics.map((e) => e.message).join("\n")}`,
      );
      return false;
    }
    client.info(`Diagnosing went by with no errors`);
    return true;
  } catch (err) {
    if (!(err instanceof CancellationError)) {
      client.info(`Error while diagnosing: ${err}`);
      window.showErrorMessage(`Error while diagnosing: ${err}`);
    }
    extensionState.setDiagnosing(false);
    return false;
  }
}

export async function diagnose(textDocument: TextDocument, collection, extensionState) {
  if (extensionState.getUsingTads2()) {
    extensionState.setDiagnosing(true);
    const tads2ExtensionConfig = workspace.getConfiguration("tads2");
    const compilerPath = tads2ExtensionConfig?.compiler?.path ?? "tadsc";
    const tads2libraryPath = tads2ExtensionConfig?.library?.path ?? "/usr/local/share/frobtads/tads2/";
    const mainFilePath = extensionState.getTads2MainFile().fsPath;
    const projectBaseFolder = dirname(mainFilePath);
    const commandLine = `"${compilerPath}" -i "${tads2libraryPath}" -i "${projectBaseFolder}" -ds "${mainFilePath}"`;
    const resultOfCompilation = await runCommand(commandLine);
    const errorDiagnosticsResult = parseDiagnostics(resultOfCompilation.toString(), textDocument, 2, collection);
    extensionState.setDiagnosing(false);
    return errorDiagnosticsResult;
  }

  await validateMakefile(extensionState.getChosenMakefileUri());
  extensionState.setDiagnosing(true);
  ensureObjFolderExistsInProjectRoot(extensionState);
  const tads3ExtensionConfig = workspace.getConfiguration("tads3"); // TODO: add configuration
  const compilerPath = tads3ExtensionConfig?.compiler?.path ?? "t3make"; // TODO: add configuration
  const resultOfCompilation = await runCommand(
    `${compilerPath} -nobanner -q -f "${extensionState.getChosenMakefileUri().fsPath}"`,
  );
  const errorDiagnostics = parseDiagnostics(resultOfCompilation.toString(), textDocument, 3, collection);
  extensionState.setDiagnosing(false);
  return errorDiagnostics;
}

export function ensureObjFolderExistsInProjectRoot(extensionState: ExtensionStateStore) {
  if (existsSync(extensionState.getChosenMakefileUri().fsPath)) {
    const projectBaseDirectory = dirname(extensionState.getChosenMakefileUri().fsPath);
    const objFolderUri = join(projectBaseDirectory, "obj");
    ensureDirSync(objFolderUri);
    return;
  }
  throw new Error(`Could not ensure obj folder exists in the root folder since no makefile is known. `);
}

export function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument, tadsVersion = 3, collection) {
  if (tadsVersion === 3) {
    return parseAndPopulateErrors(resultOfCompilation, textDocument, collection);
  } else {
    return parseAndPopulateTads2Errors(resultOfCompilation, textDocument, collection);
  }
}
