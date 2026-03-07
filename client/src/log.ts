export const DEBUG_ENABLED = true;

let debugEnabled = DEBUG_ENABLED;

export function setDebugEnabled(enabled: boolean): void {
  debugEnabled = enabled;
}

export function debug(...args: unknown[]): void {
  if (!debugEnabled) {
    return;
  }
  console.log("[DEBUG]", ...args);
}
