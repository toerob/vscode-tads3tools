import type {
  WebviewToExtensionCommand,
  WebviewToExtensionMessage,
  WebviewToExtensionPayloadByCommand,
} from "./protocol";

declare function acquireVsCodeApi(): { postMessage(message: unknown): void };

type VsCodeApi = ReturnType<typeof acquireVsCodeApi>;

export type Messenger = {
  postMessage: (message: WebviewToExtensionMessage) => void;
  postCommand: <C extends WebviewToExtensionCommand>(
    command: C,
    payload: WebviewToExtensionPayloadByCommand[C],
  ) => void;
};

export function createMessenger(): Messenger {
  const vscode: VsCodeApi = acquireVsCodeApi();

  return {
    postMessage: (message) => vscode.postMessage(message),
    postCommand: (command, payload) => vscode.postMessage({ command, payload }),
  };
}
