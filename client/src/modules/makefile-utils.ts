import { basename } from "path";
import {
  workspace,
  window,
  Uri,
  CancellationError,
  TextDocument,
  CancellationTokenSource,
  ExtensionContext,
} from "vscode";
import { setErrorDiagnostics } from "../extension";
import { selectMakefileWithDialog } from './select-makefile-dialog';
import { extensionState } from "./state";
import { diagnose } from "./diagnosing";
import { LanguageClient } from "vscode-languageclient/node";
import { parseDocument } from "./parsing";
import { ExtensionStateStore } from "./state";

export async function findAndSelectMakefileUri(askIfNotFound = false) {
  let choice: Uri = undefined;

  // Let's assume for simplicities sake that the Makefile is in the root folder.
  // If it's not then look for all folders.
  // This as a precaution if nestled Makefiles are found (e.g within extensions)

  // const files = await workspace.findFiles(`*.t3m`) ?? await workspace.findFiles(`**/*.t3m`);
  const files = await workspace.findFiles(`**/*.t3m`);
  if (files.length > 1) {
    if (askIfNotFound) {
      window.showInformationMessage(`Select which Makefile the project uses`);
      const qpItemMap = new Map();
      files.forEach((x) => qpItemMap.set(basename(x.path), x));
      const entriesStr: string[] = Array.from(qpItemMap.keys());
      const pick = await window.showQuickPick(entriesStr);
      choice = qpItemMap.get(pick);
    } else {
      // Locate the path with least path delimiters. (Counting '/' tokens on *nix systems and '\' tokens on windows systems.)
      // Compare any default Makefile.t3m files found and see if matching wiht the path with the least delimiters
      // If so, use this file, otherwise use shortestPath.

      const pathDelimNr = (a) => a.match(process.platform === "win32" ? /\\/g : /\//g).length;
      const shortestPath = files.reduce((a, b) => (pathDelimNr(a.fsPath) <= pathDelimNr(b.fsPath) ? a : b));
      const defaultMakefile = files.find(
        (x) => x.fsPath.endsWith("Makefile.t3m") && pathDelimNr(x.fsPath) === shortestPath.fsPath,
      );
      choice = defaultMakefile ? defaultMakefile : shortestPath;
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

export async function setMakeFile(
  ctx: ExtensionContext,
  serverProcessCancelTokenSource: CancellationTokenSource,
  client: LanguageClient,
  collection: any,
) {
  if (extensionState.isLongProcessingInAction()) {
    window.showWarningMessage(
      `Cannot change makefile and reparse right now, since a full project parsing is already in progress. Try again later. `,
      { modal: true },
    );
    return;
  }
  const newMakefile = await findAndSelectMakefileUri();
  if (newMakefile === undefined) {
    client.info(`No makefile, cannot parse document symbols. `);
    return;
  }
  extensionState.setChosenMakefileUri(newMakefile);

  client.info(`Chosen makefile set to: ${basename(extensionState.getChosenMakefileUri().fsPath)}`);
  const makefileDoc: TextDocument = await workspace.openTextDocument(extensionState.getChosenMakefileUri().fsPath);

  try {
    const errors = await diagnose(makefileDoc, collection, extensionState);
    if (errors.length > 0) {
      window.showErrorMessage(`Error during compilation:\n${errors.map((e) => e.message).join("\n")}`);
      setErrorDiagnostics(errors);
      return;
    }

    extensionState.setLongProcessing(true);
    client.info(`Preprocess and parse all documents`);
    await parseDocument(3, ctx, undefined, serverProcessCancelTokenSource, client, extensionState);
  } catch (err) {
    if (!(err instanceof CancellationError)) {
      window.showErrorMessage(`Error while diagnosing: ${err}`);
      client.error(`Error while diagnosing: ${err.message}`);
    }
    extensionState.setDiagnosing(false);
    return;
  }
}



export async function selectTads2MainFile(extensionState: ExtensionStateStore) {
  const userChoice = await window.showOpenDialog({
    title: "Select the main file for the tads2 project",
  });
  if (userChoice.length === 1) {
    extensionState.setTads2MainFile(userChoice[0]);
    extensionState.setUsingTads2(true);
  }
}
