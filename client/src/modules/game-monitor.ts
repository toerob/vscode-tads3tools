import { dirname,basename } from "path";
import { workspace, RelativePattern, window } from "vscode";
import { debounceTime } from "rxjs";
import { client, runGameInTerminalSubject, DEBOUNCE_TIME } from "../extension";

export function setupAndMonitorBinaryGamefileChanges(extensionState, imageFormat: string): void {
  if (extensionState.gameFileSystemWatcher !== undefined) {
    return;
  }

  client.info(`setup and monitor binary game file changes. `);

  const workspaceFolder = extensionState.getUsingTads2()
    ? dirname(extensionState.getTads2MainFile().fsPath)
    : dirname(extensionState.getChosenMakefileUri().fsPath);

  const gameFileSystemWatcher = workspace.createFileSystemWatcher(new RelativePattern(workspaceFolder, imageFormat));

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
  extensionState.gameFileSystemWatcher = gameFileSystemWatcher;
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

export async function toggleRunnerOnChanges() {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("restartGameRunnerOnT3ImageChanges");
  configuration.update("restartGameRunnerOnT3ImageChanges", !oldValue, true);
}
