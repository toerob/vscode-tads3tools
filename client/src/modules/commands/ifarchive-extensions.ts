import axios from "axios";
import { copyFileSync, createReadStream, createWriteStream, existsSync, readdirSync } from "fs";
import { dirname } from "path";
import path = require("path");
import { Extract } from "unzipper";
import { ExtensionContext, MessageItem, window, workspace } from "vscode";
import { client } from "../../extension";
import { extensionState } from "../state";
import { ensureDirSync } from "fs-extra";

let extensionDownloadMap: Map<any, any>;

export async function downloadAndInstallExtension(context: ExtensionContext) {
  const configuration = workspace.getConfiguration(extensionState.isUsingTads2 ? "tads2" : "tads3");
  const ifarchiveTads3ContributionsURL: string = configuration.get("ifArchiveExtensionURL");
  try {
    //if (extensionDownloadMap === undefined) {
    const response = await axios.get(ifarchiveTads3ContributionsURL);
    const entries = response.data.split("#");
    extensionDownloadMap = new Map();
    let idx = 0;
    for (const entry of entries) {
      const [key, data] = entry.split(/\n+/);
      const sections = entry.split(/\n+/);
      if (idx > 0) {
        //extensionDownloadMap.set(key.trim(), data.trim());
        extensionDownloadMap.set(sections[0].trim(), sections.splice(1).join());
      }
      idx++;
    }
    //}
  } catch (err) {
    const cachedDirs = readdirSync(extensionState.extensionCacheDirectory);
    if (cachedDirs.length === 0) {
      window.showErrorMessage(`Failed downloading extension list and no local cache to use: ${err}`);
      client.error(`Failed downloading extension list and no local cache to use: ${err}`);
      return;
    }
    performLocalExtensionInstallation(extensionState.extensionCacheDirectory, cachedDirs, extensionState);
    return;
  }

  const selections = await window.showQuickPick([...extensionDownloadMap.keys()], { canPickMany: true });
  if (selections === undefined || selections.length === 0) {
    return;
  }
  const option1: MessageItem = { title: "Install" };
  const option2: MessageItem = { title: "Abort" };

  const infoEntries = [];
  for (const extKey of selections) {
    const desc = extensionDownloadMap.get(extKey);
    const entry = extKey + " \n " + desc;
    infoEntries.push(entry);
  }

  const action = await window.showInformationMessage(infoEntries.join("\n\n***\n\n"), { modal: true }, option1);

  console.debug(`Choice: ${action}`);
  if (action?.title === "Install") {
    const makefileDir = dirname(
      extensionState.isUsingTads2
        ? extensionState.getTads2MainFile().fsPath
        : extensionState.getChosenMakefileUri().fsPath,
    );
    for (const extKey of selections) {
      const downloadURL = ifarchiveTads3ContributionsURL + extKey;
      try {
        await downloadAndCacheFile(downloadURL, makefileDir, extKey, extensionState.extensionCacheDirectory);
      } catch (err) {
        client.error(`Download failed for ${downloadURL}: ${err}`);
        window.showErrorMessage(`Download failed for ${downloadURL}: ${err}`);
        continue;
      }
      if (extKey.endsWith(".zip")) {
        const extensionPath = path.join(makefileDir, extKey);
        const fileNameWithoutZipExt = extKey.substr(0, extKey.length - 4);
        const extensionInstalledDirname = path.join(makefileDir, fileNameWithoutZipExt);
        client.info(`Unzipping ${extKey} to ${extensionInstalledDirname}`);
        unzipFromFiletoFolder(extensionPath, extensionInstalledDirname);
      }
      checkInstallRecipeFor(extKey);
    }
  }
}

export function unzipFromFiletoFolder(zipFile: string, folderToUnzipTo: string) {
  try {
    ensureDirSync(folderToUnzipTo);
    const readStream = createReadStream(zipFile);
    readStream.on("open", () => readStream.pipe(Extract({ path: folderToUnzipTo })));
    readStream.on("error", (err) => client.error(`Error during unzipping: ${err}`));
    readStream.on("end", async () => client.info(`Unzipping finished to folder: "${folderToUnzipTo}".`));
  } catch (err) {
    client.error(`Setting up readstream for ${zipFile} failed: ${err}`);
  }
}

export async function performLocalExtensionInstallation(
  extensionCacheDirectory: string,
  cachedDirs: string[],
  extensionState,
) {
  const selections = await window.showQuickPick(cachedDirs, {
    canPickMany: true,
    title: `[OFFLINE INSTALLER] (Select a cached library)`,
  });
  selections.forEach((filename) => {
    const makefileDir = dirname(
      extensionState.isUsingTads2
        ? extensionState.getTads2MainFile().fsPath
        : extensionState.getChosenMakefileUri().fsPath,
    );
    const fileNameWithoutZipExt = filename.substring(0, filename.length - 4);
    const extensionInstalledDirname = path.join(makefileDir, fileNameWithoutZipExt);
    const pathToStoreExtension = path.resolve(__dirname, makefileDir, filename);
    const cachedFilePath = path.join(extensionCacheDirectory, filename);
    if (existsSync(cachedFilePath)) {
      copyFileSync(cachedFilePath, pathToStoreExtension);
    }
    if (pathToStoreExtension.endsWith(".zip")) {
      unzipFromFiletoFolder(pathToStoreExtension, extensionInstalledDirname);
    }
    checkInstallRecipeFor(filename);
  });
}

async function downloadAndCacheFile(requestUrl: string, folder: string, fileName: string, extensionCacheDirectory) {
  ensureDirSync(extensionCacheDirectory);
  const cachedFilePath = path.join(extensionCacheDirectory, fileName);
  const pathToStoreExtension = path.resolve(__dirname, folder, fileName);
  if (existsSync(cachedFilePath)) {
    copyFileSync(cachedFilePath, pathToStoreExtension);
    client.info(`Reusing cached file ${cachedFilePath}`);
    return;
  }
  const writer = createWriteStream(pathToStoreExtension);
  await axios({ method: "get", url: requestUrl, responseType: "stream" }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve(true);
        }
      });
    })
      .then(() => {
        copyFileSync(pathToStoreExtension, cachedFilePath);
        client.info(`Download of ${fileName} to folder "${folder}" is completed`);
      })
      .catch((err) => {
        return client.error(err.message);
      });
  });
}

/**
 * A function that checks install recipies for certain supported extensions,
 * and does the tweaking necessary with the makefile to get it up and running
 * @param selections
 */
function checkInstallRecipeFor(selections: string) {
  // TODO: Yet to be written
}
