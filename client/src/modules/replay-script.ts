import { basename } from "path";
import {
  TreeDataProvider,
  Event,
  ProviderResult,
  TreeItem,
  workspace,
  EventEmitter,
  Uri,
  window,
  ExtensionContext,
  ViewColumn,
  FileSystemWatcher,
  RelativePattern,
} from "vscode";
import { extensionState, ScriptInfo } from "./state";
import { closeAllTerminalsNamed, startGameWithInterpreter } from "../extension";

import path = require("path");
import { unlinkSync } from "fs";
import { sleep } from "../test/helper";
import { ensureDirSync } from "fs-extra";

const lineScriptRegExp = new RegExp(/[<]line[>](.*)/);
const autoScriptFileRegExp = new RegExp(/(Auto) ([0-9]+)(.cmd)$/);
const autoScriptRegExp = new RegExp(/Auto [0-9].cmd$/);
let configuredInterpreter: string | undefined;

export class ReplayScriptTreeDataProvider implements TreeDataProvider<string> {
  private _onDidChangeTreeData: EventEmitter<string | void | string[]> = new EventEmitter<string | void | string[]>();

  readonly onDidChangeTreeData: Event<string | void | string[]> = this._onDidChangeTreeData.event;

  context: ExtensionContext;

  scriptFileSystemWatcher: FileSystemWatcher;

  scriptFolderPattern: RelativePattern;
  scriptFolderName: string;

  constructor(context: ExtensionContext) {
    this.context = context;
    const wp = workspace.workspaceFolders[0].uri;
    if (wp === undefined) {
      return;
    }

    if (extensionState.getChosenMakefileUri()) {
      this.scriptFolderName = workspace.getConfiguration("tads3").get("scriptFolderName");
      const scriptsPath = Uri.joinPath(wp, this.scriptFolderName);
      ensureDirSync(scriptsPath.fsPath);
      this.scriptFolderPattern = new RelativePattern(scriptsPath, "**/*.cmd");

      this.scriptFileSystemWatcher = workspace.createFileSystemWatcher(this.scriptFolderPattern);
      this.scriptFileSystemWatcher.onDidChange((_) => this.updateFiles());
      this.scriptFileSystemWatcher.onDidDelete((_) => this.updateFiles());
      this.scriptFileSystemWatcher.onDidCreate(async (_) => {
        await this.updateFiles();
        this.trimToMaxFiles();
      });
      this.updateFiles();
    }
  }

  refresh() {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: string): TreeItem | Thenable<TreeItem> {
    const treeItem = new TreeItem(element);
    treeItem.contextValue = "string";
    treeItem.iconPath = this.context.asAbsolutePath(path.join("resources", "icons", "script.svg"));
    return treeItem;
  }

  getChildren(element?: string): ProviderResult<string[]> {
    const keys = [...extensionState.scriptFolderContent.keys()];
    if (element) {
      return keys.filter((x) => x === element);
    }
    return keys;
  }

  async updateFiles() {
    configuredInterpreter = workspace.getConfiguration("tads3").get("gameRunnerInterpreter") ?? undefined;
    extensionState.scriptFolderContent.clear();
    const files = await workspace.findFiles(this.scriptFolderPattern);
    if (files.length === 0) {
      extensionState.autoScriptFileSerial = 0;
    }
    for (const file of files) {
      const fname = basename(file.fsPath);
      extractAndStoreLargestAutoScriptSerialNumber(fname);
      await this.updateFile(fname, file);
    }
    this.refresh();
  }

  convertToSerial(filename: string) {
    const result = filename.match("[0-9]+");
    const serial = result && result[1] ? parseInt(result[1]) ?? 0 : 0;
    return serial;
  }

  async trimToMaxFiles() {
    const maxScriptFiles: number = workspace.getConfiguration("tads3").get("maximumScriptFiles");
    const files = await workspace.findFiles(this.scriptFolderPattern);
    if (files.length > maxScriptFiles) {
      const customFilesNotToTrim = files.filter((f) => !autoScriptRegExp.test(f.fsPath));
      const autoScriptFilesNotToTrim = files
        .filter((f) => !customFilesNotToTrim.includes(f))
        .sort((a, b) => this.convertToSerial(b.fsPath) - this.convertToSerial(a.fsPath))
        .splice(0, maxScriptFiles);

      const filesNotToTrim = [...autoScriptFilesNotToTrim, ...customFilesNotToTrim];

      files.filter((x) => !filesNotToTrim.includes(x)).forEach((x) => unlinkSync(x.fsPath));
    }
  }

  async updateFile(fname: string, file: Uri) {
    const docText = await (await workspace.openTextDocument(file.fsPath)).getText();
    const trimExpression = new RegExp(/[<]line[>]\s*q(uit)?\s*\n+[<]line[>]\s*y(es)?\s*$/gim);
    const trimmedDocText = trimExpression ? docText.replace(trimExpression, "") : docText;
    if (trimmedDocText.match(/^\s*[<]eventscript[>]/gm)) {
      extensionState.scriptFolderContent.set(fname, {
        uri: file,
        content: trimmedDocText,
      });
    }
  }
}

export async function replayScript(scriptName: string, restart = false) {
  if (restart) {
    closeAllTerminalsNamed("Tads3 Game runner terminal");
    await findAndStartGameFile();
    await sleep(1000);
  }
  const currentTerminal = window.terminals.filter((x) => x.name === "Tads3 Game runner terminal")[0];
  if (currentTerminal) {
    const scriptInfo = extensionState.scriptFolderContent.get(scriptName);
    const rows = scriptInfo.content.split(/\r?\n/);
    for (const row of rows) {
      const result = lineScriptRegExp.exec(row);
      if (result && result.length > 0) {
        currentTerminal.sendText(result[1], true);
      }
    }
  }
}

export function openReplayScript(scriptFileName: string): any {
  const scriptInfo: ScriptInfo = extensionState.scriptFolderContent.get(scriptFileName);
  workspace
    .openTextDocument(scriptInfo.uri.fsPath)
    .then((doc) => window.showTextDocument(doc, { viewColumn: ViewColumn.Beside }));
}

export async function deleteReplayScript(scriptFileName: string) {
  const scriptInfo: ScriptInfo = extensionState.scriptFolderContent.get(scriptFileName);
  try {
    unlinkSync(scriptInfo.uri.fsPath);
  } catch (error) {
    window.showErrorMessage(`Failed to remove "${scriptInfo.uri.fsPath}". 
		This might happen when a running game instance is writing to the file. In that case close any running interpreter and try again. 
		(Detailed message: ${error.message})`);
  }
}

function extractAndStoreLargestAutoScriptSerialNumber(fname: string) {
  const embeddedSerialAsString = autoScriptFileRegExp.exec(fname);
  if (embeddedSerialAsString && embeddedSerialAsString[2]) {
    const embeddedSerialAsNumber = parseInt(embeddedSerialAsString[2]);
    if (embeddedSerialAsNumber) {
      extensionState.autoScriptFileSerial = Math.max(extensionState.autoScriptFileSerial, embeddedSerialAsNumber);
    }
  }
}

async function findAndStartGameFile(interpreterOptions = "") {
  const files = await workspace.findFiles(`**/*.t3`);
  if (files && (await files).length > 0) {
    if (files.length === 1) {
      startGameWithInterpreter(files[0].fsPath, interpreterOptions);
    } else {
      await window
        .showQuickPick(
          files.map((x) => x.fsPath),
          { title: "Which file should be run?" },
        )
        .then((filepath) => startGameWithInterpreter(filepath, interpreterOptions));
    }
  }
}
