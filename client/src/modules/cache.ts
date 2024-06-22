import { ExtensionContext, window } from "vscode";
import { rmdirSync } from "fs";

export async function clearCache(globalStoragePath: string) {
  const userAnswer = await window.showInformationMessage(
    `This will clear all potential cache for the standard libraries adv3/adv3Lite. With the effect of all library files having to go through a full parse next time around.
	Are you sure?`,
    { modal: true },
    { title: "Yes" },
    { title: "No" },
  );
  if (userAnswer === undefined || userAnswer.title === "No") {
    return;
  }
  try {
    rmdirSync(globalStoragePath, { recursive: true });
    window.showInformationMessage(`Standard library cache is cleared`);
  } catch (err) {
    window.showErrorMessage(`Error happened during cache removal: ${err}`);
  }
}


/**
 * A safe way to keep cached document symbols in check is to clear the cache every time a new version is installed.
 * This is what this function is here for
 */
export async function clearCacheOnVersionChange(ctx: ExtensionContext, version: string) {
  // TODO: test properly
  const currentVersion = version;
  const previousVersion = ctx.globalState.get("extensionVersion");
  if (previousVersion && previousVersion !== currentVersion) {
    // TODO: make sure this works before activating it
    // client.info(`Extension has been updated from version ${previousVersion} to ${currentVersion}. Clearing cache`);
    // Check if running a different version, and in that case clear the cache
    // await clearCache();
  }
  await ctx.globalState.update("extensionVersion", currentVersion);
}

