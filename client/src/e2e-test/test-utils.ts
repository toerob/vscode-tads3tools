import * as vscode from 'vscode';


export async function triggerParseBySave(docUri: vscode.Uri) {
  const doc = await vscode.workspace.openTextDocument(docUri);
  const editor = await vscode.window.showTextDocument(doc);

  await editor.edit((editBuilder) => {
    editBuilder.insert(new vscode.Position(0, 0), " ");
  });
  await doc.save();

  await editor.edit((editBuilder) => {
    editBuilder.delete(new vscode.Range(0, 0, 0, 1));
  });
  await doc.save();
}

export async function ensureSingleRootWorkspace(folderUri: vscode.Uri, name: string, timeoutMs = 5000) {
  const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
  const isAlreadySingleRoot =
    workspaceFolders.length === 1 && workspaceFolders[0].uri.toString() === folderUri.toString();

  if (isAlreadySingleRoot) {
    return;
  }

  const updated = vscode.workspace.updateWorkspaceFolders(0, workspaceFolders.length, {
    uri: folderUri,
    name,
  });

  if (!updated) {
    throw new Error(`Failed to switch workspace folder to ${name}`);
  }

  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const folders = vscode.workspace.workspaceFolders ?? [];
    const isTarget = folders.length === 1 && folders[0].uri.toString() === folderUri.toString();
    if (isTarget) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const actual = (vscode.workspace.workspaceFolders ?? []).map((f) => f.uri.toString()).join(", ");
  throw new Error(`Timed out waiting for workspace switch to ${name}. Actual: ${actual}`);
}
