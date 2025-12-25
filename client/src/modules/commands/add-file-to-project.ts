import { ExtensionContext, Position, Range, SnippetString, Uri, ViewColumn, window, workspace } from "vscode";
import { ExtensionStateStore } from "../state";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { ensureDirSync } from "fs-extra";
import { basename, dirname } from "path";
import path = require("path");

/**
 * Adds a new file to the project relative located to the makefile location. If a path is used, then directories will be added.
 * Also adds an entry in the makefile, and show that next to the newly created file in the editor
 * @param context
 */
export async function addFileToProject(context: ExtensionContext, extensionState: ExtensionStateStore) {
  let userInput = await window.showInputBox({
    title: `Add file: `,
    prompt: `Type (the relative location and) name of the new file, e.g: locations.t, locations/place.t etc... `,
    validateInput: (str) =>
      str.match(/^(?:([a-zA-Z][a-zA-Z0-9.\-_]*)\/)*[a-zA-Z][a-zA-Z0-9.\-_]*$/)
        ? null
        : `${str} is not a valid filename`,
  });
  if (userInput === undefined) {
    return;
  }

  // Add default .t extension if missing
  if (!userInput.match(/.*[.][th]/)) {
    userInput = `${userInput}.t`;
  }

  // Find out the current language
  const langCode = extensionState?.makefileDefinitions.get("LANGUAGE") ?? "en_us";

  const makefileUri = extensionState.getChosenMakefileUri();

  const usingAdv3Lite = extensionState.isUsingAdv3Lite;
  const extensionUri = context.extensionUri;

  if (existsSync(makefileUri.fsPath)) {
    const newFile = Uri.joinPath(makefileUri, "..", userInput);

    // Search for a language specific + library specific template file
    const gameFilecontent = readTemplateFileToSnippetString(usingAdv3Lite, langCode, extensionUri);

    if (existsSync(newFile.fsPath)) {
      window.showWarningMessage(`The file (${newFile.fsPath}) already exists `);
      return;
    }

    ensureDirSync(dirname(newFile.fsPath));
    writeFileSync(newFile.fsPath, "");

    await workspace
      .openTextDocument(newFile.fsPath)
      .then((doc) => window.showTextDocument(doc))
      .then((editor) => editor.insertSnippet(gameFilecontent, new Position(0, 0)));

    await workspace
      .openTextDocument(makefileUri.fsPath)
      .then((doc) => window.showTextDocument(doc, ViewColumn.Beside, true))
      .then(async (editor) => {
        await editor.edit((ed) => {
          const newFileBaseName = basename(newFile.fsPath);
          const makeFileDirname = dirname(makefileUri.fsPath);
          let newFileRelativeFromMakefile = path.relative(makeFileDirname, newFile.fsPath);
          if (newFileRelativeFromMakefile.endsWith(".t")) {
            newFileRelativeFromMakefile = newFileRelativeFromMakefile.substring(
              0,
              newFileRelativeFromMakefile.length - 2,
            );
          }

          const makefileText = editor.document.getText();
          const isNewFileAlreadyIncluded = makefileText.includes(`-source ${newFileRelativeFromMakefile}`);
          if (isNewFileAlreadyIncluded) {
            return window.showWarningMessage(`${newFile.fsPath} was already included in ${makefileUri.fsPath}`);
          }
          const idx = makefileText.lastIndexOf("-source");
          const lastSourceRowPosition = editor.document.positionAt(idx);
          const lineBelow = lastSourceRowPosition.translate(1).with({ character: 0 });
          ed.insert(lineBelow, `-source ${newFileRelativeFromMakefile}\n`);
          const includedFileRange = new Range(lineBelow.line, 0, lineBelow.line, 0);
          editor.revealRange(includedFileRange);
          return editor;
        });
        await editor.document.save();
        await workspace.openTextDocument(newFile.fsPath).then((doc) => window.showTextDocument(doc, ViewColumn.Active));
      });
  }
}

/**
 * Searches for a language specific + library specific template file within the extension uri
 * @param usingAdv3Lite boolean - true for adv3Lite, false for Adv3
 * @param langCode en_us, sv_se, de_de, cs_cz etc...
 * @param templateFileBaseUri the extension uri - the location of the template files
 * @returns a SnippetString containing the typical headers and imports for a new file in a Tads3 project
 */
export function readTemplateFileToSnippetString(usingAdv3Lite: any, langCode: string, templateFileBaseUri: Uri) {
  let gamefileResourceFileUri = fetchUriForSuitableGameTemplate(usingAdv3Lite, langCode, templateFileBaseUri);

  const gamefileResourceFileContent = readFileSync(gamefileResourceFileUri.fsPath).toString();
  const gameFilecontent = new SnippetString(gamefileResourceFileContent);
  return gameFilecontent;
}

export function fetchUriForSuitableGameTemplate(usingAdv3Lite: boolean, langCode: string, templateFileBaseUri: Uri) {
  const gamefileResourceFilename = `gameFileTemplateAdv3${usingAdv3Lite ? "Lite" : ""}-${langCode}.t`;
  let gamefileResourceFileUri = Uri.joinPath(templateFileBaseUri, "resources", gamefileResourceFilename);

  // Make sure there's a fallback to the default en_us-template if the language specific file wasn't found
  if (gamefileResourceFileUri && !existsSync(gamefileResourceFileUri.fsPath)) {
    const gamefileResourceFilename = `gameFileTemplateAdv3${usingAdv3Lite ? "Lite" : ""}-en_us.t`;
    gamefileResourceFileUri = Uri.joinPath(templateFileBaseUri, "resources", gamefileResourceFilename);

    if (!existsSync(gamefileResourceFileUri.fsPath)) {
      throw new Error(`Cannot open the file ${gamefileResourceFileUri?.fsPath}`);
    }
  }

  return gamefileResourceFileUri;
}
