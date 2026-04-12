/*
 * extension.ts (and activateMockDebug.ts) forms the "plugin" that plugs into VS Code and contains the code that
 * connects VS Code with the debug adapter.
 *
 */
"use strict";
import * as vscode from "vscode";
import { showGameWebview } from "./gameview";

import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken, window } from "vscode";
import { Tads3DebugSession } from "./tads3Debug";
import { FileAccessor } from "./types";
import { TextEncoder } from "util";
import which from "which";
import * as path from "node:path";
import { accessSync, constants, existsSync, statSync } from "node:fs";

export function activateTads3Debug(context: vscode.ExtensionContext, factory?: vscode.DebugAdapterDescriptorFactory) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.tads3-debug.runEditorContents", (resource: vscode.Uri) => {
      runEditorContents(resource);
    }),

    vscode.commands.registerCommand("extension.tads3-debug.debugEditorContents", (resource: vscode.Uri) => {
      debugEditorContents(resource);
    }),

    vscode.commands.registerCommand("extension.tads3-debug.toggleFormatting", (variable) => {
      toggleFormatting();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.tads3-debug.getProgramName", (config) => {
      return vscode.window.showInputBox({
        placeHolder: "Please enter the name of a TADS3 game file",
        value: "game.t3",
      });
    }),
  );

  // register a configuration provider for 'tads3' debug type
  const provider = new Tads3ConfigurationProvider();
  context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider("tads3", provider));

  // register a dynamic configuration provider for 'tads3' debug type
  context.subscriptions.push(
    vscode.debug.registerDebugConfigurationProvider(
      "tads3",
      {
        provideDebugConfigurations(folder: WorkspaceFolder | undefined): ProviderResult<DebugConfiguration[]> {
          return [
            {
              name: "Dynamic Launch",
              request: "launch",
              type: "tads3",
              program: "${file}",
            },
            {
              name: "Another Dynamic Launch",
              request: "launch",
              type: "tads3",
              program: "${file}",
            },
            {
              name: "TADS3 Launch",
              request: "launch",
              type: "tads3",
              program: "${file}",
            },
          ];
        },
      },
      vscode.DebugConfigurationProviderTriggerKind.Dynamic,
    ),
  );

  if (!factory) {
    factory = new InlineDebugAdapterFactory();
  }
  context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("tads3", factory));
  if ("dispose" in factory) {
    context.subscriptions.push(factory as any);
  }

  // override VS Code's default implementation of the debug hover
  context.subscriptions.push(
    vscode.languages.registerEvaluatableExpressionProvider(
      { scheme: "file", language: "tads3" },
      {
        provideEvaluatableExpression(
          document: vscode.TextDocument,
          position: vscode.Position,
        ): vscode.ProviderResult<vscode.EvaluatableExpression> {
          // Provide an expression range for debug-hover evaluation.
          // TADS3 identifiers are typically plain symbols (no '$' prefix), but we
          // also accept an optional leading '$' since some debugger UIs use it.
          const exprRange = document.getWordRangeAtPosition(
            position,
            /\$?[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*/,
          );
          if (!exprRange) return undefined;

          // Trim the matched chain to the segment the cursor is on.
          // e.g. hovering "x" in "x.moveInto(y)" returns "x", not "x.moveInto".
          const fullExpr = document.getText(exprRange);
          const cursorOffset = document.offsetAt(position) - document.offsetAt(exprRange.start);
          let segEnd = 0;
          for (const seg of fullExpr.split('.')) {
            segEnd += seg.length;
            if (segEnd > cursorOffset) break;
            segEnd += 1; // account for the '.'
          }
          const trimmedRange = new vscode.Range(
            exprRange.start,
            document.positionAt(document.offsetAt(exprRange.start) + segEnd),
          );
          return new vscode.EvaluatableExpression(trimmedRange);
        },
      },
    ),
  );

  // override VS Code's default implementation of the "inline values" feature"
  context.subscriptions.push(
    vscode.languages.registerInlineValuesProvider(
      { scheme: "file", language: "tads3" },
      {
        provideInlineValues(
          document: vscode.TextDocument,
          viewport: vscode.Range,
          context: vscode.InlineValueContext,
        ): vscode.ProviderResult<vscode.InlineValue[]> {
          const allValues: vscode.InlineValue[] = [];

          for (let l = viewport.start.line; l <= context.stoppedLocation.end.line; l++) {
            const line = document.lineAt(l);
            var regExp = /\$([a-z][a-z0-9]*)/gi; // variables are words starting with '$'
            do {
              var m = regExp.exec(line.text);
              if (m) {
                const varName = m[1];
                const varRange = new vscode.Range(l, m.index, l, m.index + varName.length);

                // some literal text
                //allValues.push(new vscode.InlineValueText(varRange, `${varName}: ${viewport.start.line}`));
                // value found via variable lookup
                allValues.push(new vscode.InlineValueVariableLookup(varRange, varName, false));

                // value determined via expression evaluation
                //allValues.push(new vscode.InlineValueEvaluatableExpression(varRange, varName));
              }
            } while (m);
          }

          return allValues;
        },
      },
    ),
  );

  let panel: vscode.WebviewPanel | undefined;

  const ensureGameViewPanel = (): vscode.WebviewPanel | undefined => {
    if (panel) {
      return panel;
    }

    panel = showGameWebview(context);
    panel.onDidDispose(
      () => {
        panel = undefined;
      },
      undefined,
      context.subscriptions,
    );
    return panel;
  };

  context.subscriptions.push(
    vscode.debug.onDidStartDebugSession(
      (session) => {
        if (session.type !== "tads3") {
          return;
        }

        const p = ensureGameViewPanel();
        // Make it visible when a new debug session starts, but don't steal focus.
        p?.reveal(p.viewColumn, true);
      },
      undefined,
      context.subscriptions,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("tads3dbg.updateWebview", (data) => {
      // Only show/create the panel during an active TADS3 debug session.
      const session = vscode.debug.activeDebugSession;
      if (!session || session.type !== "tads3") {
        return;
      }

      ensureGameViewPanel()?.webview.postMessage({ command: "update", data });
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("tads3dbg.clearWebview", () => {
      ensureGameViewPanel()?.webview.postMessage({ command: "clear" });
    }),
  );

  vscode.commands.registerCommand("tads3dbg.sendInput", (input: string) => {
    const session = vscode.debug.activeDebugSession;
    if (session) {
      session.customRequest("sendInputToFrobd", { input });
    }
  });
}

export class Tads3ConfigurationProvider implements vscode.DebugConfigurationProvider {
  /**
   * Massage a debug configuration just before a debug session is being launched,
   * e.g. add all missing attributes to the debug configuration.
   */
  async resolveDebugConfiguration(
    folder: WorkspaceFolder | undefined,
    config: DebugConfiguration,
    token?: CancellationToken,
  ): Promise<DebugConfiguration | undefined> {
    // if launch.json is missing or empty
    if (!config.type && !config.request && !config.name) {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === "tads3") {
        config.type = "tads3";
        config.name = "Debug TADS3 Program";
        config.request = "launch";
        config.program = undefined;
        config.stopOnEntry = true;
      }
    }

    if (!config.program) {
      // Try to find .t3 files in the workspace
      if (folder) {
        const t3Files = await vscode.workspace.findFiles(
          new vscode.RelativePattern(folder, "**/*.t3"),
          "**/node_modules/**",
          10,
        );

        if (t3Files.length === 1) {
          // Auto-select if only one .t3 file found
          config.program = t3Files[0].fsPath;
        } else if (t3Files.length > 1) {
          // Let user choose from multiple .t3 files
          const items = t3Files.map((uri) => ({
            label: vscode.workspace.asRelativePath(uri),
            uri: uri,
          }));
          const selected = await vscode.window.showQuickPick(items, {
            placeHolder: "Select a TADS3 game file to debug",
          });
          if (selected) {
            config.program = selected.uri.fsPath;
          } else {
            return undefined; // User cancelled
          }
        }
      }

      // Still no program? Ask user to specify one
      if (!config.program) {
        const program = await vscode.window.showInputBox({
          placeHolder: "Enter path to TADS3 game file (.t3)",
          value: "game.t3",
          prompt: "No .t3 files found in workspace. Specify the path to your TADS3 game file.",
        });
        if (!program) {
          await vscode.window.showInformationMessage("Cannot find a program to debug");
          return undefined; // abort launch
        }
        config.program = program;
      }
    }

    // Preflight: frobd is required to start a debugging session. Fail fast with a visible message.
    const frobdSetting =
      typeof (config as any).frobd === "string" && (config as any).frobd.trim()
        ? (config as any).frobd.trim()
        : "frobd";
    let resolvedFrobdPath: string | undefined;

    const looksLikePath = frobdSetting.startsWith(".") || /[\\/]/.test(frobdSetting);
    if (looksLikePath) {
      const candidate = path.isAbsolute(frobdSetting)
        ? frobdSetting
        : folder
          ? path.resolve(folder.uri.fsPath, frobdSetting)
          : path.resolve(frobdSetting);

      if (!existsSync(candidate)) {
        await vscode.window.showErrorMessage(
          `Cannot start TADS3 debugging: required debugger 'frobd' was not found at '${candidate}'. Configure the 'frobd' setting in launch.json or install frobd and make it available in PATH.`,
        );
        return undefined;
      }

      try {
        accessSync(candidate, constants.X_OK);
      } catch {
        await vscode.window.showErrorMessage(
          `Cannot start TADS3 debugging: '${candidate}' exists but is not executable. Fix file permissions or configure a different 'frobd' path in launch.json.`,
        );
        return undefined;
      }

      resolvedFrobdPath = candidate;
    } else {
      try {
        resolvedFrobdPath = await which(frobdSetting);
      } catch {
        await vscode.window.showErrorMessage(
          `Cannot start TADS3 debugging: required debugger 'frobd' was not found in PATH. Install frobd or set the 'frobd' path in launch.json.`,
        );
        return undefined;
      }
    }

    // Pass the resolved path to the debug adapter.
    (config as any).frobd = resolvedFrobdPath;

    return config;
  }

  async resolveDebugConfigurationWithSubstitutedVariables(
    folder: WorkspaceFolder | undefined,
    config: DebugConfiguration,
    token?: CancellationToken,
  ): Promise<DebugConfiguration | undefined> {
    const program = typeof config.program === "string" ? config.program.trim() : "";
    if (!program) {
      await vscode.window.showErrorMessage(
        "Cannot start TADS3 debugging: no game file was provided (missing 'program' in launch configuration).",
      );
      return undefined;
    }

    const candidate = path.isAbsolute(program)
      ? program
      : folder
        ? path.resolve(folder.uri.fsPath, program)
        : path.resolve(program);

    if (!existsSync(candidate)) {
      await vscode.window.showErrorMessage(
        `Cannot start TADS3 debugging: game file not found at '${candidate}'. Build your game first, or update 'program' in launch.json.`,
      );
      return undefined;
    }

    try {
      const st = statSync(candidate);
      if (!st.isFile()) {
        await vscode.window.showErrorMessage(
          `Cannot start TADS3 debugging: '${candidate}' is not a file. Update 'program' in launch.json to point at a .t3 file.`,
        );
        return undefined;
      }
    } catch {
      await vscode.window.showErrorMessage(
        `Cannot start TADS3 debugging: unable to access '${candidate}'. Check file permissions and update 'program' in launch.json if needed.`,
      );
      return undefined;
    }

    config.program = candidate;
    return config;
  }
}

export const workspaceFileAccessor: FileAccessor = {
  isWindows: typeof process !== "undefined" && process.platform === "win32",
  async readFile(path: string): Promise<Uint8Array> {
    let uri: vscode.Uri;
    try {
      uri = pathToUri(path);
    } catch (e) {
      return new TextEncoder().encode(`cannot read '${path}'`);
    }

    return await vscode.workspace.fs.readFile(uri);
  },
  async writeFile(path: string, contents: Uint8Array) {
    await vscode.workspace.fs.writeFile(pathToUri(path), contents);
  },
};

export function toggleFormatting() {
  const ds = vscode.debug.activeDebugSession;
  if (ds) {
    ds.customRequest("toggleFormatting");
  }
}

export function debugEditorContents(resource: vscode.Uri) {
  let targetResource = resource;
  if (!targetResource && vscode.window.activeTextEditor) {
    targetResource = vscode.window.activeTextEditor.document.uri;
  }
  if (targetResource) {
    vscode.debug.startDebugging(undefined, {
      type: "tads3",
      name: "Debug File",
      request: "launch",
      program: targetResource.fsPath,
      stopOnEntry: true,
    });
  }
}

export function runEditorContents(resource: vscode.Uri) {
  let targetResource = resource;
  if (!targetResource && vscode.window.activeTextEditor) {
    targetResource = vscode.window.activeTextEditor.document.uri;
  }
  if (targetResource) {
    vscode.debug.startDebugging(
      undefined,
      {
        type: "tads3",
        name: "Run File",
        request: "launch",
        program: targetResource.fsPath,
      },
      { noDebug: true },
    );
  }
}

function pathToUri(path: string) {
  try {
    return vscode.Uri.file(path);
  } catch (e) {
    return vscode.Uri.parse(path);
  }
}

export class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {
  createDebugAdapterDescriptor(_session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
    return new vscode.DebugAdapterInlineImplementation(new Tads3DebugSession(workspaceFileAccessor));
  }
}
