import { window } from "vscode";


export async function selectMakefileWithDialog() {
  const file = await window.showOpenDialog({
    title: `Select which folder the project's makefile (*.t3m) is located within`,
    filters: { Makefiles: ["t3m"] },
    openLabel: `Choose  makefile (*.t3m)`,
    canSelectFolders: false,
    canSelectFiles: true,
  });
  if (file && file.length > 0 && file[0] !== undefined) {
    return file[0];
  }
  return undefined;
}
