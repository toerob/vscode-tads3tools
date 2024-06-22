import {
  CancellationTokenSource,
  ExtensionContext,
  FileSystemWatcher,
  ProgressLocation,
  TextDocument,
  window,
  workspace,
} from "vscode";
import { ExtensionStateStore } from "./state";
import { findAndSelectMakefileUri } from "./makefile-utils";
import { setupAndMonitorBinaryGamefileChanges } from "./game-monitor";
import { LanguageClient } from "vscode-languageclient/node";
import { diagnoseDocument } from "./diagnosing";
import { basename } from "path";
import { validateTads2Settings } from "./validations";
import { DependencyNode } from "../models/DependencyNode";

export async function initiallyParseTadsProject(
  gameFileWatcher: FileSystemWatcher,
  client: LanguageClient,
  ctx: ExtensionContext,
  extensionState: ExtensionStateStore,
  serverProcessCancelTokenSource: any,
  collection,
) {
  if (window.activeTextEditor.document) {
    const textDocument = window.activeTextEditor.document;
    client.info(`Trying to locate a default tads3 makefile`);

    if (extensionState.getChosenMakefileUri() === undefined) {
      extensionState.setChosenMakefileUri(await findAndSelectMakefileUri());
    }

    if (extensionState.getChosenMakefileUri() === undefined) {
      client.info(`No tads3 makefile could be found`);
      if (!(await validateTads2Settings())) {
        return;
      }

      const tads2MainFile = await detectTads2MainFile(client, extensionState);

      if (!(await diagnoseDocument(tads2MainFile, client, collection, extensionState))) {
        return;
      }
      await parseSymbols(2, ctx, tads2MainFile, extensionState, client, serverProcessCancelTokenSource);
      return;
    }

    client.info(`Found a makefile: ${extensionState.getChosenMakefileUri().fsPath}`);
    if (!gameFileWatcher) {
      client.info(`Setting up t3 image monitor `);
      if (!gameFileWatcher) {
        setupAndMonitorBinaryGamefileChanges(extensionState, "*.t3");
      }
    }
    if (!(await diagnoseDocument(textDocument, client, collection, extensionState))) {
      return;
    }

    await parseSymbols(3, ctx, textDocument, extensionState, client, serverProcessCancelTokenSource);
  }
}

export async function parseSymbols(
  tadsVersion: number,
  ctx: ExtensionContext,
  textDocument: TextDocument,
  extensionState: ExtensionStateStore,
  client: LanguageClient,
  serverProcessCancelTokenSource: any,
) {
  if (!extensionState.allFilesBeenProcessed) {
    extensionState.setLongProcessing(true);
    extensionState.allFilesBeenProcessed = true;
    client.info(`Preprocess and parse all documents`);
    parseDocument(tadsVersion, ctx, undefined, serverProcessCancelTokenSource, client, extensionState);
    return;
  }

  if (extensionState.isLongProcessingInAction()) {
    client.info(`Skipping parsing since long processing is in action`);
    return;
  }
  client.info(`Preprocess and parse ${textDocument.uri.fsPath}`);
  parseDocument(tadsVersion, ctx, [textDocument], serverProcessCancelTokenSource, client, extensionState);
}

export async function parseDocument(
  tadsVersion: number,
  ctx: ExtensionContext,
  textDocuments: TextDocument[] | undefined = undefined,
  serverProcessCancelTokenSource: CancellationTokenSource,
  client: LanguageClient,
  extensionState: ExtensionStateStore,
) {
  const filePaths = textDocuments?.map((x) => x.uri.fsPath) ?? undefined;
  await window.withProgress(
    {
      location: ProgressLocation.Window,
      title: "Parsing symbols",
      cancellable: false,
    },

    async (progress, withProgressToken) => {
      extensionState.currentPreprocessAndParseProgress = progress;
      withProgressToken.onCancellationRequested(async () => {
        await cancelParse(serverProcessCancelTokenSource, client);
        return false;
      });
      if (tadsVersion === 3) {
        await sendParseTads3Request(ctx, filePaths, serverProcessCancelTokenSource, client, extensionState);
      }
      if (tadsVersion === 2) {
        await sendParseTads2Request(ctx, filePaths, serverProcessCancelTokenSource, client, extensionState);
      }
      return true;
    },
  );
}

export async function sendParseTads2Request(
  ctx: ExtensionContext,
  filePaths: string[],
  serverProcessCancelTokenSource,
  client,
  extensionState: any,
): Promise<any> {
  serverProcessCancelTokenSource = new CancellationTokenSource();
  extensionState.setPreprocessing(true);
  await client.sendRequest("request/parseTads2Documents", {
    globalStoragePath: ctx.globalStorageUri.fsPath,
    mainFileLocation: extensionState.getTads2MainFile().fsPath,
    filePaths,
    token: serverProcessCancelTokenSource.token,
  });
}

export async function sendParseTads3Request(
  ctx: ExtensionContext,
  filePaths: string[],
  serverProcessCancelTokenSource,
  client,
  extensionState: any,
): Promise<any> {
  serverProcessCancelTokenSource = new CancellationTokenSource();
  extensionState.setPreprocessing(true);
  await client.sendRequest("request/parseDocuments", {
    globalStoragePath: ctx.globalStorageUri.fsPath,
    makefileLocation: extensionState.getChosenMakefileUri().fsPath,
    filePaths: filePaths,
    token: serverProcessCancelTokenSource.token,
  });
}

export async function cancelParse(
  serverProcessCancelTokenSource: CancellationTokenSource,
  client: LanguageClient,
): Promise<any> {
  return new Promise(async (resolve) => {
    await client.sendNotification("symbolparsing/abort");
    serverProcessCancelTokenSource?.cancel();
    return resolve(true);
  });
}

/**¯
 * Auto detects a Tads2 project's main file and stores it in extensionState.
 * Then it triggers a "request/parseTads2Documents" to the server which preprocesses
 * all documents and then parses them for the first time.
 *
 */
export async function detectTads2MainFile(client: LanguageClient, extensionState: ExtensionStateStore) {
  client.info("Detecting Tads2 project");
  const totalIncludeSet = new Set();
  const nodes = new Map();
  const includeRegexp = new RegExp(/[#]\s*include\s*[<"](.+)[">]/);
  const files = await workspace.findFiles("**/*.{t,h}");

  const result = files.filter((x) => x.fsPath.endsWith(".t"));
  if (result.length === 0) {
    client.info(`No tads source files found at all, won't assume Tads2 project`);
    return;
  }

  for (const currentFile of files) {
    const doc = await workspace.openTextDocument(currentFile.fsPath);
    nodes.set(basename(currentFile.fsPath), new DependencyNode(currentFile));
    for (const row of doc.getText()?.split(/\r?\n/) ?? []) {
      const result = includeRegexp.exec(row);
      if (result && result.length === 2) {
        const filename = result[1];
        totalIncludeSet.add(filename);
        const node = nodes.has(basename(currentFile.fsPath))
          ? nodes.get(basename(currentFile.fsPath))
          : new DependencyNode();
        node.includes.add(filename);
        nodes.set(basename(currentFile.fsPath), node);
      }
    }
  }
  if (files.length === 0) {
    client.info("No Tads2 files found. Detection is over. ");
    return undefined;
  }

  extensionState.setUsingTads2(true);
  extensionState.tads2ProjectFilesInfo = nodes;

  // Look for files that none of the other project files includes:
  const roots = [...nodes.keys()].filter((x) => !totalIncludeSet.has(x));
  for (const root of roots) {
    const rootNode = nodes.get(root);
    console.log(`${root}: ${[...rootNode.includes.values()]}`);
  }

  const userChoice =
    roots.length === 1
      ? roots[0]
      : await window.showQuickPick(roots, {
          title: `Which file is the Tads2 project's main file?: `,
        });

  if (userChoice) {
    const userChoiceAsNode = nodes.get(userChoice);
    extensionState.setTads2MainFile(userChoiceAsNode.uri);
    const mainText: TextDocument = workspace.textDocuments.find((x) => x.fileName === userChoiceAsNode.uri.fsPath);

    return mainText;
  }
}
