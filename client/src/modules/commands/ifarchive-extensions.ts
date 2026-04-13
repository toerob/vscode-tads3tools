import axios = require("axios");
import { copyFileSync, createReadStream, createWriteStream, existsSync, readdirSync } from "fs";
import { dirname } from "path";
import path = require("path");
import { Extract } from "unzipper";
import { ExtensionContext, MessageItem, window, workspace } from "vscode";
import { client } from "../../extension";
import { extensionState, ExtensionStateStore } from "../state";
import { ensureDirSync } from "fs-extra";

let extensionDownloadMap: Map<string, string>;

// Runtime bindings for external side effects so tests can override only what they need.
export type IfArchiveRuntimeFacade = {
  axiosGet: (url: string) => Promise<any>;
  axiosRequest: (config: any) => Promise<any>;
  showQuickPick: typeof window.showQuickPick;
  showInformationMessage: typeof window.showInformationMessage;
  showErrorMessage: typeof window.showErrorMessage;
  getConfiguration: typeof workspace.getConfiguration;
  existsSync: typeof existsSync;
  readdirSync: typeof readdirSync;
  copyFileSync: typeof copyFileSync;
  createReadStream: typeof createReadStream;
  createWriteStream: typeof createWriteStream;
  ensureDirSync: typeof ensureDirSync;
  extract: typeof Extract;
};

const productionRuntimeFacade: IfArchiveRuntimeFacade = {
  axiosGet: (url) => axios.get(url),
  axiosRequest: (config) => axios.request(config),
  showQuickPick: window.showQuickPick,
  showInformationMessage: window.showInformationMessage,
  showErrorMessage: window.showErrorMessage,
  getConfiguration: workspace.getConfiguration,
  existsSync,
  readdirSync,
  copyFileSync,
  createReadStream,
  createWriteStream,
  ensureDirSync,
  extract: Extract,
};

/**
 * Creates a runtime facade by layering test overrides on top of production bindings.
 */
function createRuntimeFacade(runtimeOverrides?: Partial<IfArchiveRuntimeFacade>): IfArchiveRuntimeFacade {
  return { ...productionRuntimeFacade, ...(runtimeOverrides ?? {}) };
}

function getMakefileDir(state: ExtensionStateStore): string {
  return dirname(
    state.isUsingTads2 ? state.getTads2MainFile()?.fsPath ?? "" : state.getChosenMakefileUri()?.fsPath ?? "",
  );
}

function buildInfoEntries(selections: readonly string[], downloadMap: Map<string, string>): string[] {
  return selections.map((extKey) => `${extKey} \n ${downloadMap.get(extKey)}`);
}

async function streamToWriter(readable: any, writer: any): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    readable.pipe(writer);
    let error: Error | null = null;
    writer.on("error", (err: Error) => {
      error = err;
      writer.close();
      reject(err);
    });
    writer.on("close", () => {
      if (!error) {
        resolve();
      }
    });
  });
}

export function parseIfArchiveIndex(rawData: string): Map<string, string> {
  const entries = rawData.split("#");
  const parsedMap = new Map<string, string>();
  let idx = 0;
  for (const entry of entries) {
    const sections = entry.split(/\n+/);
    if (idx > 0 && sections[0]?.trim().length > 0) {
      parsedMap.set(sections[0].trim(), sections.splice(1).join("\n"));
    }
    idx++;
  }
  return parsedMap;
}

export async function downloadAndInstallExtension(
  _context: ExtensionContext,
  runtimeOverrides?: Partial<IfArchiveRuntimeFacade>,
) {
  const runtime = createRuntimeFacade(runtimeOverrides);
  const configuration = runtime.getConfiguration(extensionState.isUsingTads2 ? "tads2" : "tads3");
  const ifarchiveTads3ContributionsURL: string =
    configuration.get("ifArchiveExtensionURL") ??
    "https://ifarchive.org/if-archive/infocom/interpreters/tads3/contrib/";
  try {
    const response = await runtime.axiosGet(ifarchiveTads3ContributionsURL);
    extensionDownloadMap = parseIfArchiveIndex(response.data);
  } catch (err) {
    const dirExists = runtime.existsSync(extensionState.extensionCacheDirectory);
    const cachedDirs = dirExists ? runtime.readdirSync(extensionState.extensionCacheDirectory) : [];
    if (!dirExists || cachedDirs.length === 0) {
      const msg = `Failed downloading extension list and no local cache to use. Check internet connection: ${err}`;
      client.error(msg, undefined, true);
      return;
    }
    await performLocalExtensionInstallation(
      extensionState.extensionCacheDirectory,
      cachedDirs,
      extensionState,
      runtimeOverrides,
    );
    return;
  }

  const selections = await runtime.showQuickPick([...extensionDownloadMap.keys()], { canPickMany: true });
  if (selections === undefined || selections.length === 0) {
    return;
  }
  const option1: MessageItem = { title: "Install" };
  const infoEntries = buildInfoEntries(selections, extensionDownloadMap);

  const action = await runtime.showInformationMessage(infoEntries.join("\n\n***\n\n"), { modal: true }, option1);

  console.debug(`Choice: ${action}`);
  if (action?.title === "Install") {
    const makefileDir = getMakefileDir(extensionState);
    for (const extKey of selections) {
      const downloadURL = ifarchiveTads3ContributionsURL + extKey;
      try {
        await downloadAndCacheFile(
          downloadURL,
          makefileDir,
          extKey,
          extensionState.extensionCacheDirectory,
          runtimeOverrides,
        );
      } catch (err) {
        client.error(`Download failed for ${downloadURL}: ${err}`);
        runtime.showErrorMessage(`Download failed for ${downloadURL}: ${err}`);
        continue;
      }
      if (extKey.endsWith(".zip")) {
        const extensionPath = path.join(makefileDir, extKey);
        const fileNameWithoutZipExt = extKey.substr(0, extKey.length - 4);
        const extensionInstalledDirname = path.join(makefileDir, fileNameWithoutZipExt);
        client.info(`Unzipping ${extKey} to ${extensionInstalledDirname}`);
        unzipFromFiletoFolder(extensionPath, extensionInstalledDirname, runtimeOverrides);
      }
      checkInstallRecipeFor(extKey);
    }
  }
}

export function unzipFromFiletoFolder(
  zipFile: string,
  folderToUnzipTo: string,
  runtimeOverrides?: Partial<IfArchiveRuntimeFacade>,
) {
  const runtime = createRuntimeFacade(runtimeOverrides);
  try {
    runtime.ensureDirSync(folderToUnzipTo);
    const readStream = runtime.createReadStream(zipFile);
    readStream.on("open", () => readStream.pipe(runtime.extract({ path: folderToUnzipTo })));
    readStream.on("error", (err) => client.error(`Error during unzipping: ${err}`));
    readStream.on("end", async () => client.info(`Unzipping finished to folder: "${folderToUnzipTo}".`));
  } catch (err) {
    client.error(`Setting up readstream for ${zipFile} failed: ${err}`);
  }
}

export async function performLocalExtensionInstallation(
  extensionCacheDirectory: string,
  cachedDirs: string[],
  extensionState: ExtensionStateStore,
  runtimeOverrides?: Partial<IfArchiveRuntimeFacade>,
) {
  const runtime = createRuntimeFacade(runtimeOverrides);
  const selections = await runtime.showQuickPick(cachedDirs, {
    canPickMany: true,
    title: `[OFFLINE INSTALLER] (Select a cached library)`,
  });
  if (selections === undefined || selections.length === 0) {
    return;
  }
  const makefileDir = getMakefileDir(extensionState);
  selections.forEach((filename) => {
    const fileNameWithoutZipExt = filename.substring(0, filename.length - 4);
    const extensionInstalledDirname = path.join(makefileDir, fileNameWithoutZipExt);
    const pathToStoreExtension = path.resolve(__dirname, makefileDir, filename);
    const cachedFilePath = path.join(extensionCacheDirectory, filename);
    if (runtime.existsSync(cachedFilePath)) {
      runtime.copyFileSync(cachedFilePath, pathToStoreExtension);
    }
    if (pathToStoreExtension.endsWith(".zip")) {
      unzipFromFiletoFolder(pathToStoreExtension, extensionInstalledDirname, runtimeOverrides);
    }
    checkInstallRecipeFor(filename);
  });
}

export async function downloadAndCacheFile(
  requestUrl: string,
  folder: string,
  fileName: string,
  extensionCacheDirectory: string,
  runtimeOverrides?: Partial<IfArchiveRuntimeFacade>,
) {
  const runtime = createRuntimeFacade(runtimeOverrides);
  runtime.ensureDirSync(extensionCacheDirectory);
  const cachedFilePath = path.join(extensionCacheDirectory, fileName);
  const pathToStoreExtension = path.resolve(__dirname, folder, fileName);
  if (runtime.existsSync(cachedFilePath)) {
    runtime.copyFileSync(cachedFilePath, pathToStoreExtension);
    client.info(`Reusing cached file ${cachedFilePath}`);
    return;
  }
  const writer = runtime.createWriteStream(pathToStoreExtension);
  const response = await runtime.axiosRequest({ method: "get", url: requestUrl, responseType: "stream" });
  try {
    await streamToWriter(response.data, writer);
    runtime.copyFileSync(pathToStoreExtension, cachedFilePath);
    client.info(`Download of ${fileName} to folder "${folder}" is completed`);
  } catch (err: any) {
    client.error(err?.message ?? String(err));
  }
}

/**
 * A function that checks install recipies for certain supported extensions,
 * and does the tweaking necessary with the makefile to get it up and running
 * @param selections
 */
function checkInstallRecipeFor(selections: string) {
  // TODO: Yet to be written
}
