/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { existsSync } from "fs";
import * as path from "path";
import { basename, dirname } from "path";
import {
  workspace,
  ExtensionContext,
  commands,
  ProgressLocation,
  window,
  CancellationTokenSource,
  Uri,
  TextDocument,
  languages,
  Range,
  ViewColumn,
  WebviewOptions,
  WebviewPanel,
  CancellationError,
  DiagnosticSeverity,
  Diagnostic,
  TextEditorSelectionChangeEvent,
  version,
} from "vscode";
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";
import {
  setupVisualEditorResponseHandler,
  visualEditorResponseHandlerMap,
  getHtmlForWebview,
} from "./modules/visual-editor/visual-editor";
import { parseAndPopulateErrors, parseAndPopulateTads2Errors } from "./modules/tads3-error-parser";
import { Subject, debounceTime } from "rxjs";
import { LocalStorageService } from "./modules/local-storage-service";
import { ensureDirSync } from "fs-extra";
import { rmdirSync } from "fs";
import { validateCompilerPath, validateUserSettings } from "./modules/validations";
import { extensionState } from "./modules/state";
import { extractAllQuotes } from "./modules/commands/extract-quotes";
import { createTemplateProject as createProject } from "./modules/commands/create-template-project";
import { installTracker } from "./modules/commands/install-tracker";
import { analyzeTextAtPosition } from "./modules/commands/analyzeTextAtPosition";
import { addFileToProject } from "./modules/commands/add-file-to-project";
import { SnippetCompletionItemProvider } from "./modules/snippets/snippet-completion-item-provider";
import {
  deleteReplayScript,
  openReplayScript,
  replayScript,
  ReplayScriptTreeDataProvider,
} from "./modules/replay-script";
import { downloadAndInstallExtension as dlInstallExtension } from "./modules/commands/ifarchive-extensions";
import { initiallyParseTadsProject } from "./modules/parse-tads-project";
import { insertLocalAssignment } from "./modules/snippets/snippet-insert-local-assignment";
import { diagnose } from "./modules/diagnose";
import { setMakeFile } from "./modules/makefile-utils";
import { offsetSymbols } from "./modules/offset-symbols";
import { setupClientNotifications } from "./modules/client-notifications";
import { diagnoseAndCompile } from './modules/diagnoseAndCompile';

//////////
// Globals
//////////
export const DEBOUNCE_TIME = 200;
const collection = languages.createDiagnosticCollection("tads3diagnostics");

export const preprocessedFilesMap: Map<string, string> = new Map();
const persistedObjectPositions = new Map();

let lastChosenTextDocument: TextDocument | undefined;
let globalStoragePath: string;
let serverProcessCancelTokenSource: CancellationTokenSource;

let preprocessDocument: TextDocument;

const diagnoseAndCompileSubject = new Subject<TextDocument>();

export const runGameInTerminalSubject = new Subject();
export let errorDiagnostics = [];
export let tads3VisualEditorPanel: WebviewPanel | undefined = undefined;
export let client: LanguageClient;


///////////////////////////
// Extension starting point
///////////////////////////
export async function activate(ctx: ExtensionContext) {
  await clearCacheOnVersionChange(ctx, version);

  const serverOptions = getServerConfiguration(ctx);
  const clientOptions = getClientOptions();

  client = new LanguageClient("Tads3languageServer", "Tads3 Language Server", serverOptions, clientOptions);

  await client.start();
  client.info(`Tads3 Language Client - activation starting`);

  globalStoragePath = ctx.globalStorageUri.fsPath;
  extensionState.storageManager = new LocalStorageService(ctx.workspaceState);

  setupExtensionState(ctx);
  registerExtensionCommands(ctx);
  registerVscodeSpecificProviders(ctx);

  await registerWorkspaceAndWindowHooks(ctx);

  setupVisualEditorResponseHandler();
  setupClientNotifications(client);

  //Tads3CustomTextEditorProvider.register(ctx); // Register a custom text editor

  // This observable will be trigger every time a user saves (trigger in onDidSaveTextDocument)
  diagnoseAndCompileSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(diagnoseAndCompile);

  client.info(`Tads3 Language Client - activation completed`);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  client.info(`Tads3 Language Client - stopping`);
  return client.stop();
}


/**
 * Ceremony to set up the connection with the server
 */
function getServerConfiguration(ctx: ExtensionContext) {
  const serverModule = ctx.asAbsolutePath(path.join("server", "out", "server.js"));
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };
  return serverOptions;
}

function getClientOptions() {
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "untitled", language: "tads3" },
      { scheme: "file", language: "tads3" },
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.{t,h,t3m,clientrc}"),
    },
  };
  return clientOptions;
}

export function setupExtensionState(ctx: ExtensionContext) {
  extensionState.scriptsFolder = Uri.file(ctx.asAbsolutePath("scripts"));
  extensionState.extensionCacheDirectory = path.join(ctx.globalStorageUri.fsPath, "extensions");
}

async function onDidSaveTextDocument(textDocument: TextDocument) {
  //updateScriptFolder();

  if (extensionState.isDiagnosing()) {
    client.warn(`Still diagnosing, parsing is skipped this time around`);
    return;
  }

  if (extensionState.isPreprocessing()) {
    client.warn(`Still preprocessing, parsing is skipped this time around`);
    return;
  }

  // If setting restartGameRunnerOnT3ImageChanges is on,and on windows using the
  // interpreter t3run.exe we need to first shut down the interpreter in due time,
  // otherwise the output file is locked and prevents further compilation.
  const gameRunnerInterpreter: string = workspace.getConfiguration("tads3").get("gameRunnerInterpreter") ?? "";
  const restartGameRunnerOnT3ImageChanges: string =
    workspace.getConfiguration("tads3").get("restartGameRunnerOnT3ImageChanges") ?? "";
  if (
    restartGameRunnerOnT3ImageChanges &&
    process.platform === "win32" &&
    gameRunnerInterpreter.startsWith("t3run.exe")
  ) {
    closeAllTerminalsNamed("Tads3 Game runner terminal");
  }

  diagnoseAndCompileSubject.next(textDocument);
}

export async function diagnosePreprocessAndParse(textDocument: TextDocument) {
  client.info(`Diagnosing`);
  try {
    await diagnose(textDocument);
  } catch (err) {
    if (!(err instanceof CancellationError)) {
      client.info(`Error while diagnosing: ${err}`);
      window.showErrorMessage(`Error while diagnosing: ${err}`);
    }
    extensionState.setDiagnosing(false);
    return;
  }
  //const warnings = errorDiagnostics.filter((x:Diagnostic) => x.severity === DiagnosticSeverity.Warning);
  const errors = errorDiagnostics.filter((x: Diagnostic) => x.severity === DiagnosticSeverity.Error);
  if (errors.length > 0) {
    client.warn(
      `Could not assemble outliner symbols due to error(s): \n${errorDiagnostics.map((e) => e.message).join("\n")}`,
    );
    return;
  }
  client.info(`Diagnosing went by with no errors`);
  if (!extensionState.allFilesBeenProcessed) {
    extensionState.setLongProcessing(true);
    extensionState.allFilesBeenProcessed = true;
    client.info(`Preprocess and parse all documents`);
    preprocessAndParseDocument();
    return;
  } else {
    if (extensionState.isLongProcessingInAction()) {
      client.info(`Skipping parsing since long processing is in action`);
    } else {
      client.info(`Preprocess and parse ${textDocument.uri.fsPath}`);
      preprocessAndParseDocument([textDocument]);
    }
  }
}

export function closeAllTerminalsNamed(name: string) {
  const gameRunnerTerminals = window.terminals.filter((x) => x.name === name);
  for (const gameRunnerTerminal of gameRunnerTerminals) {
    client.info(`Dispose previous game runner terminal`);
    gameRunnerTerminal.sendText(`quit`);
    gameRunnerTerminal.sendText(`y`);
    gameRunnerTerminal.sendText(``);
    //gameRunnerTerminal.sendText(`\u001c`);
    gameRunnerTerminal.dispose();
  }
}

export function startGameWithInterpreter(filepath: string, interpreterArgs = ""): void {
  const configuration = workspace.getConfiguration("tads3");
  const interpreter = configuration.get("gameRunnerInterpreter");

  if (!interpreter) {
    window.showErrorMessage(`Interpreter setting missing. Examine setting tads3.gameRunnerInterpreter`);
    return;
  }

  const fileBaseName = `"${basename(filepath)}"`;
  closeAllTerminalsNamed("Tads3 Game runner terminal");

  const gameRunnerTerminal = window.createTerminal("Tads3 Game runner terminal");
  client.info(`${filepath} changed, restarting ${fileBaseName} in game runner terminal`);

  // FIXME: preserveFocus doesn't work, the terminal takes focus anyway (might be because of sendText)
  gameRunnerTerminal.show(true);
  const commandLine = `${interpreter} ${interpreterArgs} ${fileBaseName}`;
  gameRunnerTerminal.sendText(commandLine);

  // FIXME: Interim hack to make preserveFocus work even when there's a slow startup of the interpreter
  // (This won't always work, especially on a slow machine)
  const documentWorkingOn = window.activeTextEditor.document;
  setTimeout(() => window.showTextDocument(documentWorkingOn), 500);
}

async function toggleRunnerOnChanges() {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("restartGameRunnerOnT3ImageChanges");
  configuration.update("restartGameRunnerOnT3ImageChanges", !oldValue, true);
}

async function toggleURLCodeLensesInT3Makefile() {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("showURLCodeLensesInT3Makefile");
  configuration.update("showURLCodeLensesInT3Makefile", !oldValue, true);
}

function enablePreprocessorCodeLens(arg0: string, enablePreprocessorCodeLens: any) {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("enablePreprocessorCodeLens");
  configuration.update("enablePreprocessorCodeLens", !oldValue);
  window.showInformationMessage(`CodeLens for preprocessor differences is now ${!oldValue ? "enabled" : "disabled"} `);
}

export function ensureObjFolderExistsInProjectRoot() {
  if (existsSync(extensionState.getChosenMakefileUri().fsPath)) {
    const projectBaseDirectory = dirname(extensionState.getChosenMakefileUri().fsPath);
    const objFolderUri = path.join(projectBaseDirectory, "obj");
    ensureDirSync(objFolderUri);
    return;
  }
  throw new Error(`Could not ensure obj folder exists in the root folder since no makefile is known. `);
}

export function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument, tadsVersion = 3) {
  if (tadsVersion === 3) {
    errorDiagnostics = parseAndPopulateErrors(resultOfCompilation, textDocument, collection);
  } else {
    errorDiagnostics = parseAndPopulateTads2Errors(resultOfCompilation, textDocument, collection);
  }
}

export async function preprocessAndParseDocument(textDocuments: TextDocument[] | undefined = undefined) {
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
        await cancelParse();
        return false;
      });
      await executeParse(filePaths);
      return true;
    },
  );
}

export async function executeParse(filePaths: string[]): Promise<any> {
  serverProcessCancelTokenSource = new CancellationTokenSource();
  extensionState.setPreprocessing(true);
  if (extensionState.getUsingTads2()) {
    await client.sendRequest("request/parseTads2Documents", {
      globalStoragePath,
      mainFileLocation: extensionState.getTads2MainFile().fsPath,
      filePaths,
      token: serverProcessCancelTokenSource.token,
    });

    return;
  }

  await client.sendRequest("request/parseDocuments", {
    globalStoragePath,
    makefileLocation: extensionState.getChosenMakefileUri().fsPath,
    filePaths: filePaths,
    token: serverProcessCancelTokenSource.token,
  });
}

export async function cancelParse(): Promise<any> {
  return new Promise(async (resolve) => {
    await client.sendNotification("symbolparsing/abort");
    serverProcessCancelTokenSource?.cancel();
    return resolve(true);
  });
}

async function showPreprocessedText(params: [any, any, any]) {
  const [range, uri, preprocessedText] = params;
  if (preprocessDocument && !preprocessDocument.isClosed) {
    await window.showTextDocument(preprocessDocument, {
      viewColumn: ViewColumn.Beside,
      preserveFocus: true,
      preview: true,
    });
    await window.visibleTextEditors
      .find((editor) => editor.document.uri.path === preprocessDocument.uri.path)
      .edit((prepDoc) => {
        const wholeRange = preprocessDocument.validateRange(new Range(0, 0, preprocessDocument.lineCount, 0));
        prepDoc.replace(wholeRange, preprocessedText);
      });
    showAndScrollToRange(preprocessDocument, range);
  } else {
    const doc = await workspace.openTextDocument({
      language: "tads3",
      content: preprocessedText,
    });
    preprocessDocument = doc;
    showAndScrollToRange(doc, range);
  }
}

function showCurrentAsPrep() {
  const fsPath = window.activeTextEditor.document.uri.fsPath;
  client.sendRequest("request/preprocessed/file", { path: fsPath });
}

function showPreprocessedFileQP() {
  window
    .showQuickPick(extensionState.preprocessedList)
    .then((choice) => client.sendRequest("request/preprocessed/file", { path: choice }));
}

function openProjectFileQuickPick() {
  window
    .showQuickPick(extensionState.preprocessedList)
    .then((p) => p && workspace.openTextDocument(p))
    .then(window.showTextDocument);
}

function showAndScrollToRange(document: TextDocument, range: Range) {
  const activeEditor = window.activeTextEditor;
  window
    .showTextDocument(document, {
      viewColumn: ViewColumn.Beside,
      preserveFocus: true,
      preview: true,
      selection: range,
    })
    .then((shownDoc) => {
      shownDoc.revealRange(range);
      activeEditor.revealRange(range);
    });
}

/**
 * Visual editor webview for the project. Draws a map or npc details
 * @param context
 * @returns
 */
async function openInVisualEditor(context: ExtensionContext) {
  if (tads3VisualEditorPanel) {
    tads3VisualEditorPanel.reveal();
    await client.sendNotification("request/mapsymbols");
    return;
  }

  tads3VisualEditorPanel = window.createWebviewPanel("tads3VisualEditor", "Tads3 visual editor", {
    viewColumn: ViewColumn.Beside,
    preserveFocus: true,
  });
  const options: WebviewOptions = {
    enableScripts: true,
    //localResourceRoots: [Uri.joinPath(context.extensionUri, 'media')],
    localResourceRoots: [
      Uri.joinPath(context.extensionUri, "media"),
      Uri.joinPath(context.extensionUri, "client", "node_modules", "litegraph.js/build"),
      Uri.joinPath(context.extensionUri, "client", "node_modules", "litegraph.js/css"),
    ],
  };

  tads3VisualEditorPanel.webview.options = options;
  tads3VisualEditorPanel.webview.html = getHtmlForWebview(
    context,
    tads3VisualEditorPanel.webview,
    context.extensionUri,
  );
  tads3VisualEditorPanel.onDidDispose(
    () => {
      tads3VisualEditorPanel = undefined;
    },
    null,
    context.subscriptions,
  );

  tads3VisualEditorPanel.onDidChangeViewState(async (e) => {
    if (e.webviewPanel.active) {
      client.info(`Refresh map view`);
      await client.sendNotification("request/mapsymbols");
    }
  });

  client.info(`Opening up the webview and ask server for map symbols`);
  await client.sendNotification("request/mapsymbols");

  tads3VisualEditorPanel.webview.onDidReceiveMessage((event) => {
    const routine = visualEditorResponseHandlerMap.get(event.command);
    if (!routine) {
      console.error(`No handler installed for: ${event.command}`);
      return;
    }
    routine(event.payload, persistedObjectPositions);
  });
}

export function resetPersistedPositions() {
  persistedObjectPositions.clear();
}

export function overridePositionWithPersistedCoordinates(mapObjects: any[]) {
  const itemsToPersist = [];
  for (const node of mapObjects) {
    const persistedPosition = persistedObjectPositions.get(node.name);
    if (persistedPosition) {
      /*console.log(
        `${node.name} has persisted position: ${persistedPosition[0]}/${persistedPosition[1]}`
      );*/
    }
    if (persistedPosition && persistedPosition.length === 2) {
      const x = persistedPosition[0];
      const y = persistedPosition[1];
      if (x && y) {
        node.x = x;
        node.y = y;
        node.hasAbsolutePosition = true;
        itemsToPersist.push(node);
      }
    }
  }
  if (itemsToPersist.length > 0) {
    extensionState.storageManager.setValue("persistedMapObjectPositions", itemsToPersist);
  }
}

async function clearCache() {
  const userAnswer = await window.showInformationMessage(
    `This will clear all potential cache for the standard libraries adv3/adv3Lite. With the effect of all library files having to go through a full parse next time around.
	Are you sure?`,
    { modal: true },
    { title: "Yes" },
    { title: "No" },
  );
  if (userAnswer === undefined || userAnswer.title === "No") {
    return;
  }
  try {
    rmdirSync(globalStoragePath, { recursive: true });
    window.showInformationMessage(`Standard library cache is cleared`);
  } catch (err) {
    window.showErrorMessage(`Error happened during cache removal: ${err}`);
  }
}

export async function selectMakefileWithDialog() {
  const file = await window.showOpenDialog({
    title: `Select which folder the project's makefile (*.t3m) is located within`,
    filters: { Makefiles: ["t3m"] },
    openLabel: `Choose  makefile (*.t3m)`,
    canSelectFolders: false,
    canSelectFiles: true,
  });
  if (file && file.length > 0 && file[0] !== undefined) {
    return file[0];
  }
  return undefined;
}

export async function selectTads2MainFile() {
  const userChoice = await window.showOpenDialog({
    title: "Select the main file for the tads2 project",
  });
  if (userChoice.length === 1) {
    extensionState.setTads2MainFile(userChoice[0]);
    extensionState.setUsingTads2(true);
  }
}

async function switchToTads3CustomEditor() {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const document = activeEditor.document;
  const viewType = "tads3.customEditor";
  const isCustomEditor = activeEditor.viewColumn === undefined;
  await commands.executeCommand("vscode.openWith", document.uri, isCustomEditor ? "default" : viewType);
}

function registerVscodeSpecificProviders(ctx: ExtensionContext) {
  ctx.subscriptions.push(languages.registerCompletionItemProvider("tads3", new SnippetCompletionItemProvider(ctx)));
}

function registerExtensionCommands(ctx: ExtensionContext) {
  ctx.subscriptions.push(commands.registerCommand("tads3.switchEditor", switchToTads3CustomEditor));
  ctx.subscriptions.push(commands.registerCommand("extension.insertLocalAssignmentSnippet", insertLocalAssignment));
  ctx.subscriptions.push(commands.registerCommand("tads2.parseTads2Project", selectTads2MainFile));
  ctx.subscriptions.push(commands.registerCommand("tads3.createTads3TemplateProject", () => createProject(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.addFileToProject", () => addFileToProject(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.setMakefile", setMakeFile));
  ctx.subscriptions.push(commands.registerCommand("tads3.enablePreprocessorCodeLens", enablePreprocessorCodeLens));
  ctx.subscriptions.push(commands.registerCommand("tads3.showPreprocessedTextAction", (p) => showPreprocessedText(p)));
  ctx.subscriptions.push(commands.registerCommand("tads3.showPreprocessedTextForCurrentFile", showCurrentAsPrep));
  ctx.subscriptions.push(commands.registerCommand("tads3.showPreprocessedFileQuickPick", showPreprocessedFileQP));
  ctx.subscriptions.push(commands.registerCommand("tads3.restartGameRunnerOnT3ImageChanges", toggleRunnerOnChanges));
  ctx.subscriptions.push(commands.registerCommand("tads3.downloadAndInstallExtension", () => dlInstallExtension(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.openProjectFileQuickPick", openProjectFileQuickPick));
  ctx.subscriptions.push(commands.registerCommand("tads3.openInVisualEditor", () => openInVisualEditor(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.analyzeTextAtPosition", analyzeTextAtPosition));
  ctx.subscriptions.push(commands.registerCommand("tads3.extractAllQuotes", () => extractAllQuotes(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.installTracker", () => installTracker(ctx)));
  ctx.subscriptions.push(commands.registerCommand("tads3.clearCache", () => clearCache()));
  ctx.subscriptions.push(commands.registerCommand("tads3.replayScript", (params) => replayScript(params)));
  ctx.subscriptions.push(commands.registerCommand("tads3.restartReplayScript", (p) => replayScript(p, true)));
  ctx.subscriptions.push(commands.registerCommand("tads3.openReplayScript", (params) => openReplayScript(params)));
  ctx.subscriptions.push(commands.registerCommand("tads3.deleteReplayScript", (p) => deleteReplayScript(p)));

  /*
  context.subscriptions.push(
    commands.registerCommand("extension.moveCursor", (uri, line, character) => {
      const editor = window.activeTextEditor;
      if (editor && editor.document.uri.toString() === uri.toString()) {
        const newPosition = new Position(line, character);
        editor.selection = new Selection(newPosition, newPosition);
        editor.revealRange(new Range(newPosition, newPosition));
      }
    })
  );
  */
}
async function registerWorkspaceAndWindowHooks(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    workspace.onDidChangeConfiguration(async (config) => {
      if (config.affectsConfiguration("tads3.compiler.path")) {
        validateCompilerPath(workspace.getConfiguration("tads3").get("compiler.path"));
      }
      if (config.affectsConfiguration("tads.preprocessor.path")) {
        validateCompilerPath(workspace.getConfiguration("tads2").get("preprocessor.path"));
      }
      if (config.affectsConfiguration("tads2.compiler.path")) {
        validateCompilerPath(workspace.getConfiguration("tads2").get("compiler.path"));
      }
    }),
  );

  ctx.subscriptions.push(workspace.onDidSaveTextDocument(async (doc: TextDocument) => onDidSaveTextDocument(doc)));
  ctx.subscriptions.push(workspace.onDidChangeTextDocument(offsetSymbols));

  ctx.subscriptions.push(window.onDidChangeTextEditorSelection((evt:TextEditorSelectionChangeEvent) => {
    extensionState.lastChosenTextEditor = evt.textEditor;
  }));

  ctx.subscriptions.push(
    window.onDidChangeActiveTextEditor((event: any) => {
      if (event.document !== undefined) {
        
        extensionState.lastChosenTextDocument = event.document;
        if (lastChosenTextDocument) {
          client.info(`Last chosen editor changed to: ${lastChosenTextDocument.uri}`);
        }
      }
    }),
  );

  if (await validateUserSettings()) {
    await initiallyParseTadsProject(extensionState.gameFileSystemWatcher);
    if (workspace.getConfiguration("tads3").get("enableScriptFiles")) {
      // Only register a ReplayScriptTreeDataProvider if it is a tads3 project,
      // Since that will create a folder for Scripts if there is not already one.
      ctx.subscriptions.push(
        window.createTreeView("tads3ScriptTree", {
          treeDataProvider: new ReplayScriptTreeDataProvider(ctx),
        }),
      );
    }
  }
}

/**
 * A safe way to keep cached document symbols in check is to clear the cache every time a new version is installed.
 * This is what this function is here for
 */
async function clearCacheOnVersionChange(ctx: ExtensionContext, version: string) {
  // TODO: test properly
  const currentVersion = version;
  const previousVersion = ctx.globalState.get("extensionVersion");
  if (previousVersion && previousVersion !== currentVersion) {
    // TODO: make sure this works before activating it
    // client.info(`Extension has been updated from version ${previousVersion} to ${currentVersion}. Clearing cache`);
    // Check if running a different version, and in that case clear the cache
    // await clearCache();
  }
  await ctx.globalState.update("extensionVersion", currentVersion);
}
