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
  DocumentSymbol,
  TextEditor,
  FileSystemWatcher,
  RelativePattern,
  Position,
  SnippetString,
  CancellationError,
  DiagnosticSeverity,
  Diagnostic,
  Selection,
} from "vscode";
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";
import {
  setupVisualEditorResponseHandler,
  visualEditorResponseHandlerMap,
  getHtmlForWebview,
} from "./modules/visual-editor";
import { parseAndPopulateErrors, parseAndPopulateTads2Errors } from "./modules/tads3-error-parser";
import { Subject, debounceTime } from "rxjs";
import { LocalStorageService } from "./modules/local-storage-service";
import { ensureDirSync } from "fs-extra";
import { rmdirSync } from "fs";
import { validateCompilerPath, validateTads2Settings, validateUserSettings } from "./modules/validations";
import { extensionState } from "./modules/state";
import { validateMakefile } from "./modules/validate-makefile";
import { extractAllQuotes } from "./modules/extract-quotes";
import { createTemplateProject } from "./modules/create-template-project";
import { installTracker } from "./modules/install-tracker";
import { connectRoomsWithProperties } from "./modules/map-editor-sync";
import { runCommand } from "./modules/run-command";
import { analyzeTextAtPosition } from "./modules/commands/analyzeTextAtPosition";
import { findAndSelectMakefileUri } from "./modules/findAndSelectMakefileUri";
import { addFileToProject } from "./modules/addFileToProject";
import { SnippetCompletionItemProvider } from "./modules/snippet-completion-item-provider";
import { DependencyNode } from "./modules/DependencyNode";
import {
  deleteReplayScript,
  openReplayScript,
  replayScript,
  ReplayScriptTreeDataProvider,
} from "./modules/replay-script";
import { downloadAndInstallExtension } from "./ifarchive-extensions";
import { version } from "../../package.json";

const DEBOUNCE_TIME = 200;
const collection = languages.createDiagnosticCollection("tads3diagnostics");

const preprocessedFilesMap: Map<string, string> = new Map();
const persistedObjectPositions = new Map();

let storageManager: LocalStorageService;
let selectedObject: DocumentSymbol | undefined;
let lastChosenTextDocument: TextDocument | undefined;
let lastChosenTextEditor: TextEditor;
let globalStoragePath: string;

let currentTextDocument: TextDocument | undefined;

let errorDiagnostics = [];
let serverProcessCancelTokenSource: CancellationTokenSource;
let preprocessedList: string[];

let preprocessDocument: TextDocument;

let gameFileSystemWatcher: FileSystemWatcher = undefined;

const diagnoseAndCompileSubject = new Subject();

const runGameInTerminalSubject = new Subject();

export let tads3VisualEditorPanel: WebviewPanel | undefined = undefined;
export let client: LanguageClient;

export function getProcessedFileList(): string[] {
  return preprocessedList;
}

export function getLastChosenTextEditor() {
  return lastChosenTextEditor;
}

export async function activate(context: ExtensionContext) {
  /*
  TODO: make sure this works before activating it
  // Check if running a different version, and in that case clear the cache
  const currentVersion = version;
  const previousVersion = context.globalState.get('extensionVersion');
  if (previousVersion && previousVersion !== currentVersion) {
    client.info(`Extension has been updated from version ${previousVersion} to ${currentVersion}. Clearing cache`);
    await clearCache();
  }
  await context.globalState.update('extensionVersion', currentVersion);
  */

  const serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "untitled", language: "tads3" },
      { scheme: "file", language: "tads3" },
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.{t,h,t3m,clientrc}"),
    },
  };

  client = new LanguageClient("Tads3languageServer", "Tads3 Language Server", serverOptions, clientOptions);
  await client.start();
  globalStoragePath = context.globalStorageUri.fsPath;

  client.onNotification("response/extractQuotes", (payload) => {
    workspace
      .openTextDocument({
        language: "tads3",
        content: payload.resultArray.join("\n"),
      })
      .then((doc) => window.showTextDocument(doc, ViewColumn.Beside));
  });

  client.onNotification("response/makefile/keyvaluemap", ({ makefileStructure, usingAdv3Lite }) => {
    // A map can't be used here since there might be several identical keys
    //extensionState.makefileKeyMapValues = new Map<string,string>(makefileStructure.map(i => [i.key, i.value] ));
    extensionState.makefileKeyMapValues = makefileStructure;
    extensionState.setUsingAdv3LiteStatus(usingAdv3Lite);
  });

  client.onNotification("response/connectrooms", async ({ fromRoom, toRoom, validDirection1, validDirection2 }) => {
    client.info(
      `Connect from  ${fromRoom.symbol.name}  (${fromRoom.filePath}) to ${toRoom.symbol.name} (${toRoom.filePath}) via ${validDirection1 / validDirection2} to (${toRoom.filePath})?`,
    );
    await connectRoomsWithProperties(fromRoom, toRoom, validDirection1, validDirection2);
  });

  client.onNotification("response/analyzeText/findNouns", async ({ tree, range, level }) => {
    client.info(tree);
    const options = tree;
    if (options.length === 0) {
      window.showInformationMessage(`No suggestions for that line`);
      return;
    }
    const result = await window.showQuickPick(options, { canPickMany: true });

    // Build up a SnippetString with all the props identified in the text:

    let stringBuffer = "";
    for (const noun of result) {
      await window.activeTextEditor.edit((editor) => {
        const levelArray = [];
        for (let i = 0; i < level; i++) {
          levelArray.push("+");
        }

        const text = extensionState.getUsingAdv3LiteStatus()
          ? `${levelArray.join("")} ${noun} : \${1:Decoration} '${noun}';\n` // Adv3Lite style
          : `${levelArray.join("")} ${noun} : \${1:Decoration} '${noun}' '${noun}';\n`; // Adv3 style

        stringBuffer += text;
      });
    }
    stringBuffer += "$0";

    // Inserts the line after the closing range of the current object
    const pos = new Position(range.end.line + 1, 0);
    window.activeTextEditor.insertSnippet(new SnippetString(stringBuffer), pos);
  });

  client.onNotification("response/mapsymbols", (symbols) => {
    if (tads3VisualEditorPanel && symbols && symbols.length > 0) {
      client.info(`Updating webview with new symbols`);
      try {
        overridePositionWithPersistedCoordinates(symbols);
        tads3VisualEditorPanel.webview.postMessage({
          command: "tads3.addNode",
          objects: symbols,
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  // This is used by the map handler:
  // If the client has asked the server to locate a symbol,
  // The server responds by sending the client the symbol and filepath back
  // The postAction is something the client originally defines
  // and is supposed to be brought into action here.
  // It is done this way so request/findsymbol can be reused for different purposes
  client.onNotification("response/foundsymbol", ({ symbol, filePath, postAction }): void => {
    if (symbol && filePath) {
      selectedObject = symbol as DocumentSymbol; // keep track of the last selected object

      workspace.openTextDocument(filePath).then((textDocument) => {
        window.showTextDocument(textDocument, {
          preserveFocus: true,
          selection: selectedObject.range,
          viewColumn: ViewColumn.One,
        });
      });
      // TODO: there's an issue here, due to all items being triggered with onRemoved whenever the map gets updated,
      // thus all rooms would be deleted in their textdocument's equivalence whenever that happens.
      /*.then(()=> {
				if(postAction === 'remove') {
					client.info(`Removing via map is not yet implemented. `);
					//editor.edit(editorBuilder => editorBuilder.delete(selectedObject.range));
				}	
			});*/
    }
  });

  client.onNotification("response/preprocessed/file", ({ path, text }) => {
    preprocessedFilesMap.set(path, text);
    client.info(`Server response for ${path}: ` + text);
    workspace
      .openTextDocument({ language: "tads3", content: text })
      .then((doc) => window.showTextDocument(doc, ViewColumn.Beside));
  });

  client.onNotification("response/preprocessed/list", (filesNames: string[]) => {
    extensionState.setPreprocessing(false);
    preprocessedList = filesNames;
  });

  client.onNotification("symbolparsing/success", async ([filePath, tracker, totalFiles, poolSize]) => {
    if (extensionState.allFilesBeenProcessed && !extensionState.isLongProcessingInAction()) {
      if (tads3VisualEditorPanel) {
        client.info(`Refreshing the map view`);
        await client.sendNotification("request/mapsymbols");
      }
    }
    const filename = basename(Uri.parse(filePath).path);
    if (extensionState.currentPreprocessAndParseProgress) {
      extensionState.currentPreprocessAndParseProgress.report({
        message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}`,
      });
    }
    //progress.report({ message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}` });
  });

  client.onNotification("symbolparsing/allfiles/success", async ({ elapsedTime }) => {
    if (extensionState.isLongProcessingInAction()) {
      window.showInformationMessage(`All project and library files are now parsed (elapsed time: ${elapsedTime} ms)`);
    } else {
      client.info(`File parsed (elapsed time: ${elapsedTime} ms)`);
    }
    await client.sendNotification("request/mapsymbols");
    extensionState.setLongProcessing(false);
    extensionState.allFilesBeenProcessed = true;
  });

  client.onNotification("symbolparsing/allfiles/failed", ({ error }) => {
    window.showErrorMessage(
      `Parsing all files via makefile ${basename(extensionState.getChosenMakefileUri().fsPath)} failed: ${error} `,
      { modal: true },
    );
    extensionState.setLongProcessing(false);
    extensionState.setPreprocessing(false);
    extensionState.allFilesBeenProcessed = false;
  });

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
  });

  if (await validateUserSettings()) {
    await initiallyParseTadsProject();
    if (workspace.getConfiguration("tads3").get("enableScriptFiles")) {
      // Only register a ReplayScriptTreeDataProvider if it is a tads3 project,
      // Since that will create a folder for Scripts if there is not already one.
      context.subscriptions.push(
        window.createTreeView("tads3ScriptTree", {
          treeDataProvider: new ReplayScriptTreeDataProvider(context),
        }),
      );
    }
  }

  /**
   * This will be trigger by onDidSaveTextDocument:
   */
  diagnoseAndCompileSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(async (textDocument: TextDocument) => {
    client.info(`Debounce time of ${DEBOUNCE_TIME} has passed.`);
    currentTextDocument = textDocument;

    if (extensionState.getUsingTads2()) {
      const mainFile = extensionState.getTads2MainFile();
      if (mainFile && !existsSync(mainFile.fsPath)) {
        extensionState.setTads2MainFile(undefined);
      }
      if (mainFile === undefined) {
        console.error(`No main file could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
        return;
      }
      if (!gameFileSystemWatcher) {
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
      console.error(`No makefile could be found for ${dirname(currentTextDocument.uri.fsPath)}`);
      return;
    }
    if (!gameFileSystemWatcher) {
      setupAndMonitorBinaryGamefileChanges("*.t3");
    }

    await diagnosePreprocessAndParse(textDocument);
  });

  client.info(`Tads3 Language Client Activates`);

  context.subscriptions.push(
    languages.registerCompletionItemProvider("tads3", new SnippetCompletionItemProvider(context)),
  );

  storageManager = new LocalStorageService(context.workspaceState);

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
  context.subscriptions.push(
    commands.registerCommand(
      "extension.insertLocalAssignmentSnippet",
      async (uri, snippetString, line, startPos, endPos) => {
        const snippet = new SnippetString(snippetString);
        const editor = window.activeTextEditor;
        if (editor && editor.document.uri.toString() === uri.toString()) {
          const startPosition = new Position(line, startPos);
          const endPosition = new Position(line, endPos);
          const selection = new Selection(startPosition, endPosition);

          await editor.edit((ed) => ed.delete(selection));
          editor.insertSnippet(snippet, startPosition);
        }
      },
    ),
  );

  context.subscriptions.push(
    workspace.onDidSaveTextDocument(async (textDocument: TextDocument) => onDidSaveTextDocument(textDocument)),
  );

  context.subscriptions.push(commands.registerCommand("tads2.parseTads2Project", () => selectTads2MainFile()));
  context.subscriptions.push(
    commands.registerCommand("tads3.createTads3TemplateProject", () => createTemplateProject(context)),
  );
  context.subscriptions.push(commands.registerCommand("tads3.addFileToProject", () => addFileToProject(context)));
  context.subscriptions.push(commands.registerCommand("tads3.setMakefile", setMakeFile));
  context.subscriptions.push(commands.registerCommand("tads3.enablePreprocessorCodeLens", enablePreprocessorCodeLens));
  context.subscriptions.push(
    commands.registerCommand("tads3.showPreprocessedTextAction", (params) =>
      showPreprocessedTextAction(params ?? undefined),
    ),
  );
  context.subscriptions.push(
    commands.registerCommand("tads3.showPreprocessedTextForCurrentFile", showPreprocessedTextForCurrentFile),
  );
  context.subscriptions.push(
    commands.registerCommand("tads3.showPreprocessedFileQuickPick", showPreprocessedFileQuickPick),
  );
  context.subscriptions.push(commands.registerCommand("tads3.openProjectFileQuickPick", openProjectFileQuickPick));
  context.subscriptions.push(commands.registerCommand("tads3.openInVisualEditor", () => openInVisualEditor(context)));
  context.subscriptions.push(
    commands.registerCommand("tads3.restartGameRunnerOnT3ImageChanges", () => toggleGameRunnerOnT3ImageChanges()),
  );
  context.subscriptions.push(
    commands.registerCommand("tads3.downloadAndInstallExtension", () => downloadAndInstallExtension(context)),
  );
  context.subscriptions.push(commands.registerCommand("tads3.analyzeTextAtPosition", () => analyzeTextAtPosition()));
  context.subscriptions.push(commands.registerCommand("tads3.extractAllQuotes", () => extractAllQuotes(context)));
  context.subscriptions.push(commands.registerCommand("tads3.installTracker", () => installTracker(context)));
  context.subscriptions.push(commands.registerCommand("tads3.clearCache", () => clearCache()));
  context.subscriptions.push(commands.registerCommand("tads3.replayScript", (params) => replayScript(params)));
  context.subscriptions.push(
    commands.registerCommand("tads3.restartReplayScript", (params) => replayScript(params, true)),
  );
  context.subscriptions.push(commands.registerCommand("tads3.openReplayScript", (params) => openReplayScript(params)));
  context.subscriptions.push(
    commands.registerCommand("tads3.deleteReplayScript", (params) => deleteReplayScript(params)),
  );
  // WIP: Start from the bottom going upwards and applying offsets to the already parsed symbols

  context.subscriptions.push(
    workspace.onDidChangeTextDocument(async (event) => {
      for (const change of event.contentChanges) {
        let offset = change.range.start.line - change.range.end.line;
        if (offset === 0) {
          offset = change.text.match(/\r?\n/g)?.length ?? 0;
        }
        if (offset != 0) {
          // Note: Keeping this for debugging purposes:
          // const msg =`Apply offset of ${offset} before/after line: ${change.range.start.line + 1}`;
          // window.showInformationMessage(msg);
          await client.sendRequest("request/offsetSymbols", {
            filePath: event.document.uri.fsPath,
            line: change.range.start.line,
            offset,
          });
        }
      }
    }),
  );

  context.subscriptions.push(
    window.onDidChangeTextEditorSelection((textEditorSelectionChange) => {
      lastChosenTextEditor = textEditorSelectionChange.textEditor;
    }),
  );

  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((event: any) => {
      if (event.document !== undefined) {
        lastChosenTextDocument = event.document;
        if (lastChosenTextDocument) {
          client.info(`Last chosen editor changed to: ${lastChosenTextDocument.uri}`);
        }
      }
    }),
  );

  setupVisualEditorResponseHandler();

  extensionState.scriptsFolder = Uri.file(context.asAbsolutePath("scripts"));

  extensionState.extensionCacheDirectory = path.join(context.globalStorageUri.fsPath, "extensions");
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

async function setMakeFile() {
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
  const makefileDoc = await workspace.openTextDocument(extensionState.getChosenMakefileUri().fsPath);

  try {
    await diagnose(makefileDoc);
  } catch (err) {
    if (!(err instanceof CancellationError)) {
      window.showErrorMessage(`Error while diagnosing: ${err}`);
      client.error(`Error while diagnosing: ${err.message}`);
    }
    extensionState.setDiagnosing(false);
    return;
  }

  if (errorDiagnostics.length > 0) {
    window.showErrorMessage(`Error during compilation:\n${errorDiagnostics.map((e) => e.message).join("\n")}`);
    return;
  }

  extensionState.setLongProcessing(true);
  client.info(`Preprocess and parse all documents`);
  await preprocessAndParseDocument();
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

async function diagnosePreprocessAndParse(textDocument: TextDocument) {
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

function setupAndMonitorBinaryGamefileChanges(imageFormat) {
  client.info(`setup and monitor binary game file changes. `);

  const workspaceFolder = extensionState.getUsingTads2()
    ? dirname(extensionState.getTads2MainFile().fsPath)
    : dirname(extensionState.getChosenMakefileUri().fsPath);

  gameFileSystemWatcher = workspace.createFileSystemWatcher(new RelativePattern(workspaceFolder, imageFormat));

  runGameInTerminalSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe((event: any) => {
    const configuration = workspace.getConfiguration("tads3");

    if (!configuration.get("restartGameRunnerOnT3ImageChanges")) {
      return;
    }
    // TODO: right now autmatic script generation is only compatible with t3run.exe (windows)
    // which has the -o flag to capture both input to a file. Frob misses that.
    // Closest yet with frob is logging output but i doesn't capture input regardless plain mode etc:
    // "frob -p -c  -i plain -R scripts/tmp.cmd gameMain.t3 1>&1 | tee scripts/auto.cmd"
    const enableScriptFiles: boolean = configuration.get("enableScriptFiles");
    const gameRunnerInterpreter: string = configuration.get("gameRunnerInterpreter") ?? "";
    const logToFileEnabled = process.platform === "win32" && gameRunnerInterpreter.match("t3run.exe");
    const logToFileOption =
      enableScriptFiles && logToFileEnabled ? `-o "scripts/Auto ${extensionState.autoScriptFileSerial + 1}.cmd"` : "";
    startGameWithInterpreter(event.fsPath, logToFileOption);
  });

  gameFileSystemWatcher.onDidChange((event) => runGameInTerminalSubject.next(event));
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

async function toggleGameRunnerOnT3ImageChanges() {
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

function ensureObjFolderExistsInProjectRoot() {
  if (existsSync(extensionState.getChosenMakefileUri().fsPath)) {
    const projectBaseDirectory = dirname(extensionState.getChosenMakefileUri().fsPath);
    const objFolderUri = path.join(projectBaseDirectory, "obj");
    ensureDirSync(objFolderUri);
    return;
  }
  throw new Error(`Could not ensure obj folder exists in the root folder since no makefile is known. `);
}

async function diagnose(textDocument: TextDocument) {
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
    `${compilerPath} -nobanner -q -f "${extensionState.getChosenMakefileUri().fsPath}"`,
  );
  parseDiagnostics(resultOfCompilation.toString(), textDocument);
  extensionState.setDiagnosing(false);
}

function parseDiagnostics(resultOfCompilation: string, textDocument: TextDocument, tadsVersion = 3) {
  if (tadsVersion === 3) {
    errorDiagnostics = parseAndPopulateErrors(resultOfCompilation, textDocument, collection);
  } else {
    errorDiagnostics = parseAndPopulateTads2Errors(resultOfCompilation, textDocument, collection);
  }
}

async function preprocessAndParseDocument(textDocuments: TextDocument[] | undefined = undefined) {
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

async function showPreprocessedTextAction(params: [any, any, any]) {
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

function showPreprocessedTextForCurrentFile() {
  const fsPath = window.activeTextEditor.document.uri.fsPath;
  client.sendRequest("request/preprocessed/file", { path: fsPath });
}

function showPreprocessedFileQuickPick() {
  window
    .showQuickPick(preprocessedList)
    .then((choice) => client.sendRequest("request/preprocessed/file", { path: choice }));
}

function openProjectFileQuickPick() {
  window
    .showQuickPick(preprocessedList)
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

function overridePositionWithPersistedCoordinates(mapObjects: any[]) {
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
    storageManager?.setValue("persistedMapObjectPositions", itemsToPersist);
  }
}

async function initiallyParseTadsProject() {
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

/**
 * Auto detects a Tads2 project's main file and stores it in extensionState.
 * Then it triggers a "request/parseTads2Documents" to the server which preprocesses
 * all documents and then parses them for the first time.
 *
 */
async function detectAndInitiallyParseTads2Project() {
  if (!(await validateTads2Settings())) {
    return;
  }

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
    return;
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
    await diagnosePreprocessAndParse(mainText);
  }
}
