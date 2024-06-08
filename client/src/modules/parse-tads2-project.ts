import { basename } from "path";
import { workspace, window, TextDocument } from "vscode";
import { validateTads2Settings } from "./validations";
import { extensionState } from "./state";
import { DependencyNode } from "../models/DependencyNode";
import { client, diagnosePreprocessAndParse } from '../extension';

/**
 * Auto detects a Tads2 project's main file and stores it in extensionState.
 * Then it triggers a "request/parseTads2Documents" to the server which preprocesses
 * all documents and then parses them for the first time.
 *
 */
export async function detectAndInitiallyParseTads2Project() {
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

  const userChoice = roots.length === 1
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
