import { window, workspace } from "vscode";

export function enablePreprocessorCodeLens() {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("enablePreprocessorCodeLens");
  configuration.update("enablePreprocessorCodeLens", !oldValue);
  window.showInformationMessage(`CodeLens for preprocessor differences is now ${!oldValue ? "enabled" : "disabled"} `);
}

async function toggleURLCodeLensesInT3Makefile() {
  const configuration = workspace.getConfiguration("tads3");
  const oldValue = configuration.get("showURLCodeLensesInT3Makefile");
  configuration.update("showURLCodeLensesInT3Makefile", !oldValue, true);
}
