import { existsSync } from "fs";
import { dirname } from "path";
import { TextDocument } from "vscode";
import { extensionState } from "./state";
import { findAndSelectMakefileUri } from "./makefile-utils";
import { setupAndMonitorBinaryGamefileChanges } from "./game-change-monitor";
import {  client, DEBOUNCE_TIME, diagnosePreprocessAndParse } from '../extension';

export async function diagnoseAndCompile(textDocument: TextDocument): Promise<void> {
  client.info(`Debounce time of ${DEBOUNCE_TIME} has passed since trigger - diagnose and compiling starting`);
  if (extensionState.getUsingTads2()) {
    const mainFile = extensionState.getTads2MainFile();
    if (mainFile && !existsSync(mainFile.fsPath)) {
      extensionState.setTads2MainFile(undefined);
    }
    if (mainFile === undefined) {
      console.error(`No main file could be found for ${dirname(textDocument.uri.fsPath)}`);
      return;
    }
    if (!extensionState.gameFileSystemWatcher) {
      setupAndMonitorBinaryGamefileChanges("*.gam");
    }

    await diagnosePreprocessAndParse(textDocument);
    return;
  }

  if (extensionState.getChosenMakefileUri() && !existsSync(extensionState.getChosenMakefileUri().fsPath)) {
    extensionState.setChosenMakefileUri(undefined);
  }
  if (extensionState.getChosenMakefileUri() === undefined) {
    extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
  }
  if (extensionState.getChosenMakefileUri() === undefined) {
    console.error(`No makefile could be found for ${dirname(textDocument.uri.fsPath)}`);
    return;
  }
  if (!extensionState.gameFileSystemWatcher) {
    setupAndMonitorBinaryGamefileChanges("*.t3");
  }

  await diagnosePreprocessAndParse(textDocument);
}
