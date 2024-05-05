import { basename } from "path";
import { workspace, window, Uri } from "vscode";
import { selectMakefileWithDialog } from "../extension";

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

      const pathDelimNr = (a) =>
        a.match(process.platform === "win32" ? /\\/g : /\//g).length;
      const shortestPath = files.reduce((a, b) =>
        pathDelimNr(a.fsPath) <= pathDelimNr(b.fsPath) ? a : b
      );
      const defaultMakefile = files.find(
        (x) =>
          x.fsPath.endsWith("Makefile.t3m") &&
          pathDelimNr(x.fsPath) === shortestPath.fsPath
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
