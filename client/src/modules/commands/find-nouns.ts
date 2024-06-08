import {
  window, Position,
  SnippetString
} from "vscode";
import { extensionState } from "../state";
import { client } from '../../extension';

export async function findNouns({ tree, range, level }) {
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
}
