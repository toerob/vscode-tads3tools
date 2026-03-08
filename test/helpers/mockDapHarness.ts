import { Tads3Runtime } from "../../src/tads3Runtime";

type DapRequestMessage = {
  seq: number;
  type: "request";
  command: string;
  arguments?: Record<string, unknown>;
};

type DapResponseMessage = {
  seq: number;
  type: "response";
  request_seq: number;
  success: boolean;
  command: string;
  body?: Record<string, unknown>;
};

type DapEventMessage = {
  seq: number;
  type: "event";
  event: string;
  body?: Record<string, unknown>;
};

type DapMessage = DapResponseMessage | DapEventMessage;

type RequestHandler = (
  request: DapRequestMessage,
) => Record<string, unknown> | void;

export class DapMockHarness {
  private _seq = 1;
  private _handlers = new Map<string, RequestHandler>();

  public readonly sent: DapRequestMessage[] = [];

  constructor(public readonly runtime: Tads3Runtime) {
    (this.runtime as any)._sendMessage = (message: DapRequestMessage) => {
      this.sent.push(message);
      const handler = this._handlers.get(message.command);
      if (handler) {
        const body = handler(message) || {};
        this.sendResponse(message, body);
      }
    };
  }

  public onRequest(command: string, handler: RequestHandler): void {
    this._handlers.set(command, handler);
  }

  public lastRequest(): DapRequestMessage {
    if (this.sent.length === 0) {
      throw new Error("No DAP requests sent yet.");
    }
    return this.sent[this.sent.length - 1];
  }

  public sendResponse(
    request: DapRequestMessage,
    body: Record<string, unknown> = {},
    success = true,
  ): void {
    const response: DapResponseMessage = {
      seq: this._seq++,
      type: "response",
      request_seq: request.seq,
      success,
      command: request.command,
      body,
    };

    this._sendMessage(response);
  }

  public sendEvent(event: string, body: Record<string, unknown> = {}): void {
    const message: DapEventMessage = {
      seq: this._seq++,
      type: "event",
      event,
      body,
    };

    this._sendMessage(message);
  }

  public sendChunkedMessage(message: DapMessage, splitAt: number): void {
    const framed = this._frameMessage(message);
    const left = framed.slice(0, splitAt);
    const right = framed.slice(splitAt);
    this.sendRaw(left);
    this.sendRaw(right);
  }

  public sendRaw(raw: string): void {
    (this.runtime as any)._handleFrobdOutput(raw);
  }

  private _sendMessage(message: DapMessage): void {
    this.sendRaw(this._frameMessage(message));
  }

  private _frameMessage(message: DapMessage): string {
    const json = JSON.stringify(message);
    return `Content-Length: ${json.length}\r\n\r\n${json}`;
  }
}
