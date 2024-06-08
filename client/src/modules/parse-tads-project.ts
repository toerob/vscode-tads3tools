import { FileSystemWatcher, window } from "vscode";
import { extensionState } from "./state";
import { findAndSelectMakefileUri } from "./makefile-utils";
import { detectAndInitiallyParseTads2Project } from "./parse-tads2-project";
import { setupAndMonitorBinaryGamefileChanges } from "./game-change-monitor";
import { client, diagnosePreprocessAndParse } from "../extension";

export async function initiallyParseTadsProject(gameFileSystemWatcher: FileSystemWatcher) {
  if (window.activeTextEditor.document) {
    const textDocument = window.activeTextEditor.document;
    client.info(`Trying to locate a default tads3 makefile`);

    if (extensionState.getChosenMakefileUri() === undefined) {
      extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
    }
    if (extensionState.getChosenMakefileUri() === undefined) {
      client.info(`No tads3 makefile could be found`);
      detectAndInitiallyParseTads2Project();
      return;
    }

    client.info(`Found a makefile: ${extensionState.getChosenMakefileUri().fsPath}`);
    if (!gameFileSystemWatcher) {
      client.info(`Setting up t3 image monitor `);
      if (!gameFileSystemWatcher) {
        setupAndMonitorBinaryGamefileChanges("*.t3");
      }
    }
    await diagnosePreprocessAndParse(textDocument);
  }
}
