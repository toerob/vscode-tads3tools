import { dirname } from "path";
import { workspace, RelativePattern } from "vscode";
import { debounceTime } from "rxjs";
import { extensionState } from "./state";
import { client, runGameInTerminalSubject, DEBOUNCE_TIME, startGameWithInterpreter } from '../extension';


export function setupAndMonitorBinaryGamefileChanges(imageFormat: string): void {
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
    const logToFileOption = enableScriptFiles && logToFileEnabled ? `-o "scripts/Auto ${extensionState.autoScriptFileSerial + 1}.cmd"` : "";
    startGameWithInterpreter(event.fsPath, logToFileOption);
  });

  gameFileSystemWatcher.onDidChange((event) => runGameInTerminalSubject.next(event));
  extensionState.gameFileSystemWatcher = gameFileSystemWatcher;
}
