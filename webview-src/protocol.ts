export type WebviewToExtensionCommand =
  | "refresh"
  | "reset"
  | "select"
  | "showall"
  | "updatepos"
  | "change"
  | "changestartroom"
  | "log"
  | "editor"
  | "addroom"
  | "removeroom"
  | "changeport";

export type UpdatePosPayload = { name: string; pos: [number, number] };
export type ChangePortPayload = { from?: string; to?: string; directionName?: string };

export type WebviewToExtensionPayloadByCommand = {
  refresh: undefined;
  reset: undefined;
  select: string;
  showall: boolean;
  updatepos: UpdatePosPayload;
  change: string;
  changestartroom: string;
  log: unknown;
  editor: string;
  addroom: unknown;
  removeroom: string;
  changeport: ChangePortPayload;
};

export type WebviewToExtensionMessage<C extends WebviewToExtensionCommand = WebviewToExtensionCommand> = {
  command: C;
  payload: WebviewToExtensionPayloadByCommand[C];
};
