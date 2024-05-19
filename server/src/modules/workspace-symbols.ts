import { TextDocuments } from "vscode-languageserver/node";
import { TadsSymbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import { connection } from "../server";

export async function onWorkspaceSymbol(
  handler: any,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
) {
  const configuration = await connection.workspace.getConfiguration("tads3");
  const lookOnlyForProjectFiles =
    configuration["enableWorkspaceSymbolsProjectScope"];

  return symbolManager.getAllWorkspaceSymbols(lookOnlyForProjectFiles);
}
