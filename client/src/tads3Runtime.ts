/*---------------------------------------------------------
 * TADS3 Runtime - Connects to frobd debugger
 *--------------------------------------------------------*/

import { EventEmitter } from "events";
import { spawn, ChildProcess } from "child_process";
import * as Net from "net";
import { access, unlink } from "fs/promises";
import { debug } from "./log";
import { FileAccessor } from "./types";
import { TextDecoder, TextEncoder } from 'util';

export interface IRuntimeBreakpoint {
  id: number;
  line: number;
  verified: boolean;
}

export type IRuntimeVariableType =
  | number
  | boolean
  | string
  | RuntimeVariable[];

export class RuntimeVariable {
  private _memory?: Uint8Array;
  public reference?: number;

  constructor(
    public readonly name: string,
    private _value: IRuntimeVariableType,
  ) {}

  public get value() {
    return this._value;
  }

  public set value(value: IRuntimeVariableType) {
    this._value = value;
    this._memory = undefined;
  }

  public get memory() {
    if (this._memory === undefined && typeof this._value === "string") {
      this._memory = new TextEncoder().encode(this._value);
    }
    return this._memory;
  }

  public setMemory(data: Uint8Array, offset = 0) {
    const memory = this.memory;
    if (!memory) {
      return;
    }
    memory.set(data, offset);
    this._memory = memory;
    this._value = new TextDecoder().decode(memory);
  }
}

/**
 * TADS3Runtime communicates with frobd interpreter
 * using the Debug Adapter Protocol (DAP).
 * Supports Unix domain socket, and TCP communication.
 */
export class Tads3Runtime extends EventEmitter {
  private _frobdProcess?: ChildProcess;
  private _socket?: Net.Socket;
  private _dapMode: "socket" | "tcp" = "socket";
  private _messageBuffer: string = "";
  private _sequenceNumber: number = 1;
  private _pendingRequests: Map<number, (response: any) => void> = new Map();
  private _queueEnabled: boolean = true;
  private _queuedMessages: string[] = [];
  private _queueCommands = new Set(["setBreakpoints"]);
  private _readyForBreakpoints: boolean = false;
  private _socketReadyRetries = 20;
  private _socketReadyDelayMs = 100;

  // Debug state
  private _breakPoints = new Map<string, IRuntimeBreakpoint[]>();
  private _breakpointId = 1;

  constructor(_fileAccessor: FileAccessor) {
    super();
  }

  /**
   * Start frobd debugger process
   */
  public async start(
    program: string,
    frobdPath: string,
    stopOnEntry: boolean,
    dapMode: "socket" | "tcp" = "socket",
    dapSocket: string = "/tmp/tads-dap.sock",
    dapPort: number = 9876,
  ): Promise<void> {
    this._dapMode = dapMode;
    this._queueEnabled = true;
    this._readyForBreakpoints = false;

    debug("tads3Runtime.start - dapMode:", dapMode);

    if (dapMode === "socket") {
      await this._startWithSocket(program, frobdPath, dapSocket, stopOnEntry);
    } else {
      await this._startWithTCP(program, frobdPath, dapPort, stopOnEntry);
    }
  }

  /**
   * Start frobd with Unix domain socket communication
   */
  private async _startWithSocket(
    program: string,
    frobdPath: string,
    socketPath: string,
    stopOnEntry: boolean,
  ): Promise<void> {
    debug("Starting frobd with socket:", socketPath);

    // Clean up any existing socket file
    try {
      await unlink(socketPath); // Remove existing socket file if it exists
      debug("Removed existing socket file");
    } catch (err: any) {
      // It's normal for the socket file to not exist, so only log 
      // other errors
      if (err.code !== "ENOENT") {
        console.log("[DEBUG] Socket file does not exist (OK)");
      }
    }

    // Spawn frobd with socket option
    try {
      this._frobdProcess = spawn(frobdPath, [
        "-D",
        "dap",
        "--dap-socket",
        socketPath,
        "-i",
        "plain",
        "-k",
        "utf-8",
        `${program}`,
      ]);
    } catch (err) {
      console.error("[DEBUG] Failed to spawn frobd:", err);
      this.sendEvent("end");
      return;
    }

    debug(
      "frobd process spawned with socket mode, PID:",
      this._frobdProcess.pid,
    );

    // Handle process errors
    this._frobdProcess.on("error", (err) => {
      console.error("[DEBUG] frobd process error:", err);
      this.sendEvent("end");
    });

    // Handle process exit
    this._frobdProcess.on("exit", (code) => {
      console.log("frobd exited with code:", code);
      this._socket?.destroy();
      this.sendEvent("end");
    });


    // Handle stdout from frobd (game output, not DAP messages)
    this._frobdProcess.stdout?.on("data", (data: Buffer) => {
      try {
        if (data) {
          this.emit("frobdStdout", data.toString());
        }
      } catch (err) {
        console.error("Error in stdout data handler:", err);
      }
    });

    // Handle stderr from frobd (debug logs, not DAP messages in socket mode)
    this._frobdProcess.stderr?.on("data", (data: Buffer) => {
      const output = data.toString();
      if (output.includes("[DAP Debug]")) {
        if (data) {
          // We send this to a dedicated event "frobStdErr"
          this.emit("frobStdErr", data.toString());
        }
        return;
      }
      console.error("frobd stderr:", output.trim());
    });

    // Wait for frobd to create socket and start listening
    const socketReady = await this._waitForSocketReady(socketPath);
    if (!socketReady) {
      console.error("[DEBUG] Socket not ready after retries:", socketPath);
      this.sendEvent("end");
      return;
    }

    // Connect to frobd's socket
    debug("Connecting to frobd socket...");
    this._socket = Net.createConnection(socketPath);

    this._socket.on("connect", async () => {
      debug("Connected to frobd via socket"); // 1.

      // Flush queued breakpoints after socket connect
      this._flushQueuedMessages();
      await this._initialize();

      if (stopOnEntry) {
        this.sendEvent("stopOnEntry");
      } else {
        this.continue();
      }
    });

    this._socket.on("data", (data: Buffer) => {
      // Setup socket data handler to receive DAP messages from frobd

      if (data) { 
        this.emit("frobdSocket", data.toString());
        //console.log(" <-- Receiving raw socket data:", data.toString());
      }
      this._handleFrobdOutput(data.toString());
    });

    this._socket.on("error", (err) => {
      console.error("[DEBUG] Socket error:", err);
      this.sendEvent("end");
    });

    this._socket.on("close", () => {
      console.log("[DEBUG] Socket closed");
      this.sendEvent("end");
    });
  }

  /**
   * Alllows sending input to frobd's stdin (when not in debug mode) - used by game console webview
   * @param input
   */
  public sendInputToFrobd(input: string) {
    if (this._frobdProcess?.stdin?.writable) {
      this._frobdProcess.stdin.write(input + "\n");
    }
  }

  private async _waitForSocketReady(socketPath: string): Promise<boolean> {
    for (let attempt = 1; attempt <= this._socketReadyRetries; attempt++) {
      try {
        await access(socketPath);
        debug("Socket file exists:", socketPath);
        return true;
      } catch {
        await new Promise((resolve) =>
          setTimeout(resolve, this._socketReadyDelayMs),
        );
      }
    }
    return false;
  }

  /**
   * Start frobd with TCP socket communication
   */
  private async _startWithTCP(
    program: string,
    frobdPath: string,
    port: number,
    stopOnEntry: boolean,
  ): Promise<void> {
    debug("Starting frobd with TCP port:", port);

    // Spawn frobd with TCP option
    try {
      this._frobdProcess = spawn(frobdPath, [
        "-D",
        "dap",
        "--dap-port",
        port.toString(),
        "-i",
        "plain",
        "utf-8",
        "utf-8",
        "-k",
        "utf-8",
        program,
      ]);
    } catch (err) {
      console.error("[DEBUG] Failed to spawn frobd:", err);
      this.sendEvent("end");
      return;
    }

    debug("frobd process spawned with TCP mode, PID:", this._frobdProcess.pid);

    //this._frobdProcess?.stdout?.resume();

    // Handle process errors
    this._frobdProcess.on("error", (err) => {
      console.error("[DEBUG] frobd process error:", err);
      this.sendEvent("end");
    });

    // Handle stderr from frobd (debug logs)
    this._frobdProcess.stderr?.on("data", (data: Buffer) => {
      const output = data.toString();
      if (output.includes("[DAP Debug]")) {
        return;
      }
      console.error("frobd stderr:", output.trim());
    });

    // Handle process exit
    this._frobdProcess.on("exit", (code) => {
      console.log("frobd exited with code:", code);
      this._socket?.destroy();
      this.sendEvent("end");
    });

    // Wait for frobd to start listening on TCP port
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Connect to frobd's TCP port
    debug("Connecting to frobd TCP port...");
    this._socket = Net.createConnection(port, "localhost");

    this._socket.on("connect", async () => {
      debug("Connected to frobd via TCP");
      // Flush queued breakpoints after socket connect (comment out to disable).
      this._flushQueuedMessages();
      await this._initialize();

      if (stopOnEntry) {
        this.sendEvent("stopOnEntry");
      } else {
        this.continue();
      }
    });

    this._socket.on("data", (data: Buffer) => {
      this._handleFrobdOutput(data.toString());
    });

    this._socket.on("error", (err) => {
      console.error("[DEBUG] Socket error:", err);
      this.sendEvent("end");
    });

    this._socket.on("close", () => {
      console.log("[DEBUG] Socket closed");
      this.sendEvent("end");
    });
  }

  /**
   * Send DAP initialize and launch sequence to frobd
   */
  private async _initialize(): Promise<void> {
    debug("Sending initialize request...");
    await this.sendRequest("initialize", {
      clientID: "vscode",
      clientName: "Visual Studio Code",
      adapterID: "tads3",
      pathFormat: "path",
      linesStartAt1: true,
      columnsStartAt1: true,
      supportsVariableType: true,
      supportsVariablePaging: true,
      supportsRunInTerminalRequest: true,
      locale: "en-us",
    });

    debug("Sending launch request...");
    // Send launch request - this will cause frobd to start the VM
    // BUT it will stop at the first instruction or wait for configurationDone
    await this.sendRequest("launch", {
      noDebug: false,
    });

    debug("Initialization complete - waiting for breakpoints");
    this._readyForBreakpoints = true;
    this._flushQueuedMessages();
    // DON'T send configurationDone yet - wait for breakpoints to be set
  }

  /**
   * Complete the launch sequence after configuration is done 
   * (breakpoints set)
   */
  public async completeLaunch(): Promise<void> {
    debug("Sending configurationDone request...");
    await this.sendRequest("configurationDone", {});

    debug("Configuration complete - VM can now execute");
  }

  /**
   * Send DAP request to frobd
   */
  public sendRequest(command: string, args: any): Promise<any> {
    const seq = this._sequenceNumber++;
    const message = {
      seq,
      type: "request",
      command,
      arguments: args,
    };

    debug("--> Sending DAP request:", command, args);

    return new Promise((resolve) => {
      // Since frobd may not be ready to receive messages immediately,
      // we store the callback in _pendingRequests and it will be 
      // called when we receive the response with the matching sequence 
      // number. 
      this._pendingRequests.set(seq, resolve);
      this._sendMessage(message);
    });
  }

  /**
   * Send a message to frobd via stdin
   */
  private _sendMessage(message: any): void {
    const json = JSON.stringify(message);
    const data = `Content-Length: ${json.length}\r\n\r\n${json}`;

    if (
      this._queueEnabled &&
      this._queueCommands.has(message.command) &&
      !this._readyForBreakpoints
    ) {
      // Queue breakpoints until initialize completes (comment out to disable).
      this._queuedMessages.push(data);
      debug("Breakpoints queued before init:", message.command);
      return;
    }

    debug("Sending message via", this._dapMode);

    // Send via socket (Unix domain or TCP)
    if (this._socket?.writable) {
      try {
        this._socket.write(data, (err) => {
          if (err) {
            console.error("[DEBUG] Socket write error:", err);
          }
        });
      } catch (err) {
        console.error("Error writing to socket:", err);
      }
    } else {
      if (this._queueEnabled && this._queueCommands.has(message.command)) {
        this._queuedMessages.push(data);
        debug("Socket not writable - queued message:", message.command);
      } else {
        console.error("Socket is not writable!");
      }
    }
  }

  private _flushQueuedMessages(): void {
    if (
      !this._queueEnabled ||
      !this._readyForBreakpoints ||
      this._queuedMessages.length === 0
    ) {
      return;
    }
    const queued = this._queuedMessages.slice();
    debug("Flushing queued DAP messages:", queued.length);

    if (!this._socket?.writable) {
      console.error("[DEBUG] Cannot flush queue - socket not writable");
      return;
    }
    for (const data of queued) {
      this._socket.write(data);
    }

    // The queue should now be flushed
    // But to be really certain, clear the queue again
    // this._queuedMessages = [];
    // this._queueEnabled = false;

    debug("Flushed queued DAP messages:", queued.length);
  }

  /**
   * Handle output from frobd
   */
  private _handleFrobdOutput(data: string): void {
    this._messageBuffer += data;

    // Parse DAP messages (format: Content-Length: N\r\n\r\n{json})
    while (true) {
      const headerMatch = this._messageBuffer.match(
        /Content-Length: (\d+)\r\n\r\n/,
      );
      if (!headerMatch) {
        break;
      }

      const contentLength = parseInt(headerMatch[1]);
      const messageStart = headerMatch.index! + headerMatch[0].length;
      const messageEnd = messageStart + contentLength;

      if (this._messageBuffer.length < messageEnd) {
        break;
      }

      const messageJson = this._messageBuffer.substring(
        messageStart,
        messageEnd,
      );
      this._messageBuffer = this._messageBuffer.substring(messageEnd);

      try {
        const message = JSON.parse(messageJson);
        this._handleMessage(message);
      } catch (e) {
        console.error("Failed to parse DAP message:", e);
      }
    }
  }

  /**
   * Handle a DAP message from frobd
   */
  private _handleMessage(message: any): void {
    if (message.type === "response") {
      
      // Handle response to a request

      // The callback for the request is stored in _pendingRequests
      // with the sequence number. When we get a response, we look
      // up the callback and call it with the response.
      const callback = this._pendingRequests.get(message.request_seq);
      if (callback) {
        this._pendingRequests.delete(message.request_seq);
        callback(message);
      } 

      // TODO: handle "message.command = launch"  here: 
      console.log("RECEIVED DAP response:", message.command, message.body || "");
      // TODO: handleResponse()
      if(message.command === "launch") {  
        this.handleResponse(message);
      }

    } else if (message.type === "event") {
      // Handle events from frobd
      this.handleEvent(message);
    } 
  }

  handleResponse(message: any) {
    // TODO: throw new Error("Method not implemented.");
  }

  /**
   * Handle DAP events from frobd
   */
  public handleEvent(event: any): void {
    debug("<-- Received DAP event:", event.event, event.body || "");
    switch (event.event) {
      case "stopped":
        // Send the appropriate stop event based on the reason
        const reason = event.body?.reason;
        if (reason === "breakpoint") {
          this.sendEvent("stopOnBreakpoint");
        } else if (reason === "step") {
          this.sendEvent("stopOnStep");
        } else if (reason === "pause") {
          this.sendEvent("stopOnPause");
        } else if (reason === "entry") {
          this.sendEvent("stopOnEntry");
        } else {
          // Default to stopOnStep for unknown reasons
          this.sendEvent("stopOnStep");
        }
        break;
      case "continued":
        this.sendEvent("continue");
        break;
      case "terminated":
        this.sendEvent("end");
        break;
      case "output":
        this.sendEvent("output", event.body.output, event.body.category);
        break;
      case "invalidated":
        // Forward the invalidated event with its areas
        this.sendEvent("invalidated", event.body.areas);
        break;
    }
  }

  /**
   * Continue execution
   */
  public continue(reverse: boolean = false): void {
    if (reverse) {
      // Step back not supported yet
      debug("Step back not supported");
    } else {
      this.sendRequest("continue", { threadId: 1 });
    }
  }

  /**
   * Pause execution by sending "debug" command to the game's stdin.
   * This triggers the interpreter's built-in debug command.
   */
  public pause(): void {
    if (this._frobdProcess && this._frobdProcess.stdin) {
      debug('Sending "debug" command to stdin to trigger debugger');
      this._frobdProcess.stdin.write("debug\n");
      this.emit("frobdStdout", "debug\n");
    } else {
      console.error("[ERROR] Cannot pause: process or stdin not available");
    }
  }

  /**
   * Step to next line
   */
  public step(instruction: boolean = false, reverse: boolean = false): void {
    if (reverse) {
      debug("Reverse step not supported");
      return;
    }
    if (instruction) {
      this.sendRequest("stepIn", { threadId: 1, granularity: "instruction" });
    } else {
      this.sendRequest("next", { threadId: 1 });
    }
  }

  /**
   * Step into function
   */
  public stepIn(targetId?: number): void {
    this.sendRequest("stepIn", { threadId: 1, targetId });
  }

  /**
   * Step out of function
   */
  public stepOut(): void {
    this.sendRequest("stepOut", { threadId: 1 });
  }

  /**
   * Get stack trace
   */
  public async stack(startFrame: number, endFrame: number): Promise<any> {
    const response = await this.sendRequest("stackTrace", {
      threadId: 1,
      startFrame,
      levels: endFrame - startFrame,
    });
    // Return frames in expected format
    return {
      frames: response.body?.stackFrames || [],
      count: response.body?.totalFrames || 0,
    };
  }

  /**
   * Evaluate an expression
   */
  public async evaluate(
    expression: string,
    frameId?: number,
    context: string = "repl",
  ): Promise<any> {
    const response = await this.sendRequest("evaluate", {
      expression,
      frameId: frameId || 0,
      context,
    });
    return response.body;
  }

  /**
   * Set breakpoints
   */
  public async setBreakPoints(
    path: string,
    lines: number[],
  ): Promise<IRuntimeBreakpoint[]> {
    const response = await this.sendRequest("setBreakpoints", {
      source: { path },
      lines,
      breakpoints: lines.map((line) => ({ line })),
    });

    const bps: IRuntimeBreakpoint[] = [];
    if (response.body?.breakpoints) {
      for (const bp of response.body.breakpoints) {
        bps.push({
          id: this._breakpointId++,
          line: bp.line,
          verified: bp.verified,
        });
      }
    }

    this._breakPoints.set(path, bps);
    return bps;
  }

  /**
   * Set a single breakpoint (used by mockDebug)
   */
  public async setBreakPoint(
    path: string,
    line: number,
  ): Promise<IRuntimeBreakpoint> {
    const bps = await this.setBreakPoints(path, [line]);
    return bps[0] || { id: this._breakpointId++, line, verified: false };
  }

  /**
   * Clear breakpoints for a file
   */
  public clearBreakpoints(path: string): void {
    this._breakPoints.delete(path);
    // Send empty breakpoint list to frobd
    this.sendRequest("setBreakpoints", {
      source: { path },
      lines: [],
      breakpoints: [],
    });
  }

  /**
   * Get breakpoints for a line (used for breakpoint locations)
   */
  public getBreakpoints(path: string, line: number): number[] {
    const bps = this._breakPoints.get(path);
    if (!bps) {
      return [];
    }
    return bps.filter((bp) => bp.line === line).map(() => 0); // Return column 0
  }

  /**
   * Set exception filters
   */
  public setExceptionsFilters(
    namedException: string | undefined,
    otherExceptions: boolean,
  ): void {
    // Store for later use with frobd
    debug("Exception filters:", namedException, otherExceptions);
  }

  /**
   * Get local variables (stub for now)
   */
  public getLocalVariables(): RuntimeVariable[] {
    // TODO: Implement with actual DAP scopes request
    return [];
  }

  /**
   * Get global variables (stub for now)
   */
  public async getGlobalVariables(
    cancellationToken?: () => boolean,
  ): Promise<RuntimeVariable[]> {
    // TODO: Implement with actual DAP scopes request
    return [];
  }

  /**
   * Get a local variable by name (stub for now)
   */
  public getLocalVariable(name: string): RuntimeVariable | undefined {
    // TODO: Implement
    return undefined;
  }

  /**
   * Get variables for a scope
   */
  public async getVariables(
    variablesReference: number,
  ): Promise<RuntimeVariable[]> {
    const response = await this.sendRequest("variables", {
      variablesReference,
    });

    const variables: RuntimeVariable[] = [];
    if (response.body?.variables) {
      for (const v of response.body.variables) {
        const variable = new RuntimeVariable(v.name, v.value);
        variable.reference = v.variablesReference;
        variables.push(variable);
      }
    }

    return variables;
  }

  /**
   * Fetch scopes for a given stack frame from frobd (DAP).
   */
  public async dapScopes(frameId: number): Promise<any[]> {
    const response = await this.sendRequest("scopes", { frameId });
    return response.body?.scopes || [];
  }

  /**
   * Fetch variables for a given variablesReference from frobd (DAP).
   */
  public async dapVariables(variablesReference: number): Promise<any[]> {
    const response = await this.sendRequest("variables", { variablesReference });
    return response.body?.variables || [];
  }

  /**
   * Stop debugging
   */
  public stop(): void {
    this.sendRequest("disconnect", {});
    
    // Kill the frobd process if it's still running
    this._frobdProcess?.kill();
  
    // SIGKILL if process is still alive after regular kill attempt
    if(!this._frobdProcess.killed) {
      this._frobdProcess.kill("SIGKILL");
    }
    if(this._frobdProcess.killed) {
      debug("Killed frobd process, PID:", this._frobdProcess.pid);
      this._frobdProcess = undefined;
    } else {
      console.error("Failed to kill frobd process, PID:", this._frobdProcess.pid);
    }

    // Clean up socket if using socket mode
    if(this._socket) {
        this._socket.destroy();
        this._socket = undefined;
    }

    // Send event so we know to update UI and clean up state
    this.sendEvent("end");
  }

  /**
   * Get step-in targets
   */
  public getStepInTargets(frameId: number): any[] {
    // TODO: Implement
    return [];
  }

  /**
   * Data breakpoint support
   */
  public clearAllDataBreakpoints(): void {
    // TODO: Implement data breakpoints
  }

  public setDataBreakpoint(dataId: string, accessType: string): boolean {
    // TODO: Implement data breakpoints
    return false;
  }

  /**
   * Instruction breakpoint support
   */
  public clearInstructionBreakpoints(): void {
    // TODO: Implement instruction breakpoints
  }

  public setInstructionBreakpoint(address: number): boolean {
    // TODO: Implement instruction breakpoints
    return false;
  }

  /**
   * Disassembly support
   */
  public disassemble(address: number, instructionCount: number): any[] {
    // TODO: Implement disassembly
    return [];
  }

  /**
   * Source file tracking
   */
  public sourceFile: string = "";

  /**
   * Clear a specific breakpoint
   */
  public clearBreakPoint(
    path: string,
    line: number,
  ): IRuntimeBreakpoint | undefined {
    const bps = this._breakPoints.get(path);
    if (bps) {
      const index = bps.findIndex((bp) => bp.line === line);
      if (index >= 0) {
        const bp = bps.splice(index, 1)[0];
        this.setBreakPoints(
          path,
          bps.map((b) => b.line),
        );
        return bp;
      }
    }
    return undefined;
  }

  public sendEvent(event: string, ...args: any[]): void {
    setTimeout(() => {
      this.emit(event, ...args);
    }, 0);
  }
}
