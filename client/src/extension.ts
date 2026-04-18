/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { join } from "path";
import {
  ExtensionContext,
  commands,
  window,
  CancellationTokenSource,
  Uri,
  TextDocument,
  languages,
  WebviewPanel,
  TextEditorSelectionChangeEvent,
  version,
  workspace,
  debug,
  WorkspaceFoldersChangeEvent,
  RelativePattern,
} from "vscode";

import { TransportKind } from "vscode-languageclient/node";
import { LanguageClient, LanguageClientOptions, ServerOptions } from "vscode-languageclient/node";

import {
  onDidChange,
  openInVisualEditor,
  setupVisualEditorResponseHandler,
} from "./modules/visual-editor/visual-editor";
import { Subject, debounceTime } from "rxjs";
import { LocalStorageService } from "./modules/local-storage-service";
import { validateCompilerPath, validateUserSettings } from "./modules/validations";
import { ExtensionStateStore, extensionState } from "./modules/state";
import { extractAllQuotes } from "./modules/commands/extract-quotes";
import {
  createTemplateProject as createProject,
  openPendingTemplateProjectFile,
} from "./modules/commands/create-template-project";
import { installTracker } from "./modules/commands/install-tracker";
import { analyzeTextAtPosition } from "./modules/commands/decoration-analyzer";
import { addFileToProject } from "./modules/commands/add-file-to-project";
import { SnippetCompletionItemProvider } from "./modules/snippets/snippet-completion-item-provider";
import {
  deleteReplayScript,
  openReplayScript,
  replayScript,
  ReplayScriptTreeDataProvider,
} from "./modules/replay-script";
import { downloadAndInstallExtension as dlInstallExtension } from "./modules/commands/ifarchive-extensions";
import { initiallyParseTadsProject, shouldAttemptInitialParse } from "./modules/parsing";
import { insertLocalAssignment } from "./modules/snippets/snippet-insert-local-assignment";
import { selectTads2MainFile, setMakeFile } from "./modules/makefile-utils";
import { offsetSymbols } from "./modules/offset-symbols";
import { setupClientNotifications } from "./modules/client-notifications";
import { diagnoseAndParseTads2, diagnoseAndParseTads3 } from "./modules/diagnosing";
import { switchToTads3CustomEditor } from "./modules/custom-editor";
import { clearCache, clearCacheOnVersionChange } from "./modules/cache";
import { closeAllTerminalsNamed, toggleRunnerOnChanges } from "./modules/game-monitor";
import { showPreprocessedText as showPrep } from "./modules/commands/show-preprocessed";
import { evaluateSelection } from "./modules/commands/evaluate-selection";
import {
  showCurrentAsPrep,
  showPreprocessedFileQP as showPrepQuickPick,
  openProjectFileQuickPick,
} from "./modules/editor-utils";
import { enablePreprocessorCodeLens } from "./modules/code-lens";
import { activateTads3Debug } from "./activateTads3Debug";
import { ImageInfoProvider } from "./modules/debugTreeView";
import {
  disassembleMethod as disasmMethod,
  disassembleImage as disasmImage,
} from "./modules/commands/disassemble";
import { showAst as devShowAst, showScopes as devShowScopes } from "./modules/commands/debug-ast";
import { registerVirtualDocumentProvider } from "./modules/virtual-documents";

//////////
// Globals
//////////
const diagnosticsCollection = languages.createDiagnosticCollection("tads3diagnostics");

let errorDiagnostics = [];

export function setErrorDiagnostics(diagnostics:any) {
  errorDiagnostics = diagnostics;
}

export const DEBOUNCE_TIME = 200;

export const persistedObjectPositions = new Map();

export function getPersistedObjectPositions() {
  return persistedObjectPositions;
}
export function resetPersistedPositions() {
  persistedObjectPositions.clear();
}

let lastChosenTextDocument: TextDocument | undefined;

let cancelToken: CancellationTokenSource;

const diagnoseAndCompileSubject = new Subject<TextDocument>();

export const runGameInTerminalSubject = new Subject();

let visualEditorPanel: WebviewPanel | undefined = undefined;

export function getVisualEditor(): WebviewPanel | undefined {
  return visualEditorPanel;
}
export function setVisualEditor(tads3VisualEditorPanel: WebviewPanel) {
  visualEditorPanel = tads3VisualEditorPanel;
}

export let client: LanguageClient;
const TADS_PROJECT_CONTEXT_KEY = "tads3.isTadsProject";

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

  extensionState.storageManager = new LocalStorageService(ctx.workspaceState);

  setupExtensionState(ctx);
  registerExtensionCommands(ctx, extensionState);
  registerVscodeSpecificProviders(ctx);
  registerVirtualDocumentProvider(ctx);
  await updateTadsProjectCommandContext();
  await openPendingTemplateProjectFile(ctx);

  await registerWorkspaceAndWindowHooks(ctx, client, cancelToken);

  setupVisualEditorResponseHandler();
  setupClientNotifications(client, extensionState);

  // This observable will be trigger every time a user saves (trigger in onDidSaveTextDocument)
  diagnoseAndCompileSubject.pipe(debounceTime(DEBOUNCE_TIME)).subscribe((textDocument) => {
    if (extensionState.getUsingTads2()) {
      diagnoseAndParseTads2(ctx, textDocument, extensionState, client, cancelToken, diagnosticsCollection);
      return;
    }
    diagnoseAndParseTads3(ctx, textDocument, extensionState, client, cancelToken, diagnosticsCollection);
  });

  // Activate the debug adapter and related features
  activateTads3Debug(ctx);

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
  const serverModule = ctx.asAbsolutePath(join("server", "out", "server.js"));
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

    middleware: {
      provideHover: async (document, position, token, next) => {
        const disableHoverDuringDebug = workspace.getConfiguration("tads3").get("disableHoverDuringDebug", true);
        if (disableHoverDuringDebug && debug.activeDebugSession?.type === "tads3") {
          console.log(
            `Hover is disabled during debugging sessions, enable 'tads3.disableHoverDuringDebug' setting to change this behavior`,
          );
          return undefined;
        }
        console.log(`Providing hover for ${document.uri} at line ${position.line}`);
        return next(document, position, token);
      },
    },

    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.{t,h,t3m,clientrc}"),
    },
  };
  return clientOptions;
}

export function setupExtensionState(ctx: ExtensionContext) {
  extensionState.scriptsFolder = Uri.file(ctx.asAbsolutePath("scripts"));
  extensionState.extensionCacheDirectory = join(ctx.globalStorageUri.fsPath, "extensions");
}

function registerVscodeSpecificProviders(ctx: ExtensionContext) {
  ctx.subscriptions.push(languages.registerCompletionItemProvider("tads3", new SnippetCompletionItemProvider(ctx)));
  
  extensionState.imageInfoProvider = new ImageInfoProvider();
  ctx.subscriptions.push(
    window.createTreeView("tads3DebugInfo", {
      treeDataProvider: extensionState.imageInfoProvider,
      showCollapseAll: true,
    }),
  );
}

function registerExtensionCommands(ctx: ExtensionContext, state: ExtensionStateStore) {
  const tads3Commands = [
    commands.registerCommand("tads3.switchEditor", switchToTads3CustomEditor),
    commands.registerCommand("tads3.addFileToProject", () => addFileToProject(ctx, extensionState)),
    commands.registerCommand("tads2.parseTads2Project", () => selectTads2MainFile(state)),
    commands.registerCommand("tads3.createTads3TemplateProject", () => createProject(ctx)),
    commands.registerCommand("tads3.insertLocalAssignmentSnippet", insertLocalAssignment),
    commands.registerCommand("tads3.setMakefile", () => setMakeFile(ctx, cancelToken, client, diagnosticsCollection)),
    commands.registerCommand("tads3.enablePreprocessorCodeLens", enablePreprocessorCodeLens),
    commands.registerCommand("tads3.showPreprocessedTextAction", (p) => showPrep(p)),
    commands.registerCommand("tads3.showPreprocessedTextForCurrentFile", () => showCurrentAsPrep(client)),
    commands.registerCommand("tads3.showPreprocessedFileQuickPick", () => showPrepQuickPick(state, client)),
    commands.registerCommand("tads3.restartGameRunnerOnT3ImageChanges", toggleRunnerOnChanges),
    commands.registerCommand("tads3.downloadAndInstallExtension", () => dlInstallExtension(ctx)),
    commands.registerCommand("tads3.openProjectFileQuickPick", () => openProjectFileQuickPick(state, workspace)),
    commands.registerCommand("tads3.openInVisualEditor", () => openInVisualEditor(ctx, client)),
    commands.registerCommand("tads3.analyzeTextAtPosition", () => analyzeTextAtPosition()),
    commands.registerCommand("tads3.extractAllQuotes", () => extractAllQuotes(ctx)),
    commands.registerCommand("tads3.installTracker", () => installTracker(ctx)),
    commands.registerCommand("tads3.clearCache", () => clearCache(ctx.globalStorageUri.fsPath)),
    commands.registerCommand("tads3.replayScript", (params) => replayScript(params)),
    commands.registerCommand("tads3.restartReplayScript", (p) => replayScript(p, true)),
    commands.registerCommand("tads3.openReplayScript", (params) => openReplayScript(params)),
    commands.registerCommand("tads3.deleteReplayScript", (p) => deleteReplayScript(p)),
    commands.registerCommand("tads3.analyzeImage", () => analyzeImage()),
    commands.registerCommand("tads3.evaluateSelection", () => evaluateSelection(client)),
    commands.registerCommand("tads3.disassembleMethod", () => disasmMethod(findImageByPattern)),
    commands.registerCommand("tads3.disassembleImage", () => disasmImage(findImageByPattern)),
    commands.registerCommand("tads3.dev.showAst", () => devShowAst(client)),
    commands.registerCommand("tads3.dev.showScopes", () => devShowScopes(client)),
  ];
  tads3Commands.forEach((com) => ctx.subscriptions.push(com));
}

async function registerWorkspaceAndWindowHooks(
  ctx: ExtensionContext,
  client: LanguageClient,
  serverProcessCancelTokenSource: CancellationTokenSource,
) {
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
      // Forward configuration changes to the language server
      //client.sendNotification('workspace/didChangeConfiguration');
      const allConfig = workspace.getConfiguration();
      client.sendNotification('workspace/didChangeConfiguration', { settings: allConfig });
    }),
  );

  ctx.subscriptions.push(
    workspace.onDidSaveTextDocument(async (doc: TextDocument) => onDidSaveTextDocument(doc, extensionState, client)),
  );
  ctx.subscriptions.push(workspace.onDidChangeTextDocument((evt) => offsetSymbols(evt, client)));

  ctx.subscriptions.push(
    window.onDidChangeTextEditorSelection((evt: TextEditorSelectionChangeEvent) => {
      extensionState.lastChosenTextEditor = evt.textEditor;
      client.sendNotification("client.cursorMoved", {
        uri: evt.textEditor.document.uri.toString(),
        line: evt.selections[0].active.line,
      });
    }),
  );

  ctx.subscriptions.push(
    window.onDidChangeActiveTextEditor((event: any) => {
      if (event?.document !== undefined) {
        // Store the editor (not the document) so features that call editor.edit() work.
        extensionState.lastChosenTextDocument = event;
        lastChosenTextDocument = event.document;
        client.info(`Last chosen editor changed to: ${event.document.uri}`);
      }
      void updateTadsProjectCommandContext();
    }),
  );

  ctx.subscriptions.push(
    workspace.onDidChangeWorkspaceFolders((_event: WorkspaceFoldersChangeEvent) => {
      void updateTadsProjectCommandContext();
    }),
  );

  if (!(await shouldAttemptInitialParse())) {
    client.info(`Skipping initial parsing because no TADS project indicators were found`);
    return;
  }

  if (!(await validateUserSettings())) {
    return;
  }

  const status = await initiallyParseTadsProject(
    extensionState.gameFileSystemWatcher,
    client,
    ctx,
    extensionState,
    serverProcessCancelTokenSource,
    diagnosticsCollection,
  );
  if (!status) {
    client.warn(`Initial parsing of the project failed, check previous messages for details`);
    return;
  }

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

async function onDidSaveTextDocument(
  textDocument: TextDocument,
  extensionState: ExtensionStateStore,
  client: LanguageClient,
) {
  void updateTadsProjectCommandContext();

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

export async function analyzeImage() {
  // Fetch user input for the .t3 file path
  let filepath = await findImageByPattern(true);
  if (filepath && extensionState.imageInfoProvider) {
    extensionState.imageInfoProvider.update(filepath);
  } else {
    window.showErrorMessage(`ImageInfoProvider not found`);
  }
}

export async function findImageByPattern(askIfMoreMatchesFound: boolean): Promise<string | undefined> {
  const t3Files = await workspace.findFiles(`**/*.t3`);
  if (t3Files.length === 1) {
    return t3Files[0].fsPath;
  }

  if (t3Files.length > 1) {
    if (!askIfMoreMatchesFound) {
      return t3Files[0].fsPath;
    }

    // Let user choose from multiple files
    const items = t3Files.map((uri) => ({
      label: workspace.asRelativePath(uri),
      uri: uri,
    }));

    const selected = await window.showQuickPick(items, {
      placeHolder: "Select a TADS3 game file to debug",
    });

    if (selected) {
      return selected.uri.fsPath;
    }
  }

  return undefined;
}

async function updateTadsProjectCommandContext() {
  const isTadsProjectContext = await shouldAttemptInitialParse();
  await commands.executeCommand("setContext", TADS_PROJECT_CONTEXT_KEY, isTadsProjectContext);
}
