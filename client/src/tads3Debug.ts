/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/*
 * tads3Debug.ts implements the Debug Adapter that "adapts" or translates the Debug Adapter Protocol (DAP) used by the client (e.g. VS Code)
 * into requests and events of the real "execution engine" or "debugger" (here: class Tads3Runtime).
 * When implementing your own debugger extension for VS Code, most of the work will go into the Debug Adapter.
 * Since the Debug Adapter is independent from VS Code, it can be used in any client (IDE) supporting the Debug Adapter Protocol.
 *
 * The most important class of the Debug Adapter is the Tads3DebugSession which implements many DAP requests by talking to the Tads3Runtime.
 */

import * as vscode from "vscode";

import {
  Logger,
  logger,
  LoggingDebugSession,
  InitializedEvent,
  TerminatedEvent,
  StoppedEvent,
  BreakpointEvent,
  OutputEvent,
  InvalidatedEvent,
  Thread,
  StackFrame,
  Scope,
  Source,
  Handles,
  Breakpoint,
  MemoryEvent,
} from "@vscode/debugadapter";
import { DebugProtocol } from "@vscode/debugprotocol";
import { basename } from "path-browserify";
import { Subject } from "await-notify";
import * as base64 from "base64-js";
import {
  Tads3Runtime,
  RuntimeVariable,
  IRuntimeVariableType,
  IRuntimeBreakpoint,
} from "./tads3Runtime";
import { FileAccessor } from "./types";
import { debug } from "./log";
import { existsSync } from "node:fs";
import which from "which";

import { tads3ImageHasDebugSymbols } from './modules/image';

const outputChannelsByName = new Map<string, vscode.OutputChannel>();

function getOutputChannel(name: string): vscode.OutputChannel {
  const existing = outputChannelsByName.get(name);
  if (existing) {
    return existing;
  }
  const created = vscode.window.createOutputChannel(name);
  outputChannelsByName.set(name, created);
  return created;
}

function clearFrobdOutputChannels(): void {
  getOutputChannel("frobd stdout").clear();
  getOutputChannel("frobd stderr").clear();
  getOutputChannel("frobd socket (Raw DAP)").clear();
}

/**
 * This interface describes the mock-debug specific launch attributes
 * (which are not part of the Debug Adapter Protocol).
 * The schema for these attributes lives in the package.json of the mock-debug extension.
 * The interface should always match this schema.
 */
interface ILaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
  /** An absolute path to the "program" to debug. */
  program: string;
  /** Path to the frobd interpreter. */
  frobd?: string;
  /** DAP communication mode: socket, or tcp */
  dapMode?: "socket" | "tcp";
  /** Path to Unix domain socket for DAP communication */
  dapSocket?: string;
  /** TCP port for DAP communication */
  dapPort?: number;
  /** Automatically stop target after launch. If not specified, target does not stop. */
  stopOnEntry?: boolean;
  /** enable logging the Debug Adapter Protocol */
  trace?: boolean;
  /** run without debugging */
  noDebug?: boolean;
}

interface IAttachRequestArguments extends ILaunchRequestArguments {}

export class Tads3DebugSession extends LoggingDebugSession {
  // we don't support multiple threads, so we can use a hardcoded ID for the default thread
  private static threadID = 1;

  // a Mock runtime (or debugger)
  private _runtime: Tads3Runtime;

  private _variableHandles = new Handles<
    "locals" | "globals" | RuntimeVariable | { __dapRef: number }
  >();

  private _configurationDone = new Subject();

  private _cancellationTokens = new Map<number, boolean>();

  private _valuesInHex = false;
  private _useInvalidatedEvent = false;

  private _addressesInHex = true;

  /**
   * Creates a new debug adapter that is used for one debug session.
   * We configure the default implementation of a debug adapter here.
   */
  public constructor(fileAccessor: FileAccessor) {
    super("tads3-debug.txt");

    // TADS3 uses 1-based lines and columns (like most language compilers)
    this.setDebuggerLinesStartAt1(true);
    this.setDebuggerColumnsStartAt1(true);

    this._runtime = new Tads3Runtime(fileAccessor);

    const frobdOutputChannel = getOutputChannel("frobd stdout");

    this._runtime.on("frobdStdout", (output: string) => {
      frobdOutputChannel.append(output);
      //frobdOutputChannel.show(true); // Optional: show on new output
      vscode.commands.executeCommand("tads3dbg.updateWebview", output);
    });

    const frobdErrorChannel = getOutputChannel("frobd stderr");

    this._runtime.on("frobdStderr", (output: string) => {
      frobdErrorChannel.append(output);
      vscode.commands.executeCommand("tads3dbg.updateWebview", output);
    });

    const frobdSocketOutputChannel = getOutputChannel("frobd socket (Raw DAP)");

    this._runtime.on("frobdSocket", (output: string) => {
      frobdSocketOutputChannel.append(output);
    });

    // --------------------
    // setup event handlers
    // --------------------

    // Step over - frobd will send this event when it has stopped after a step over action
    this._runtime.on("stopOnEntry", () => {
      debug("stopOnEntry entry event received, sending StoppedEvent");
      this.sendEvent(new StoppedEvent("entry", Tads3DebugSession.threadID));
    });

    // Step out - frobd will send this event when it has stopped after a step out action
    this._runtime.on("stopOnStep", () => {
      debug("stopOnStep step event received, sending StoppedEvent");
      this.sendEvent(new StoppedEvent("step", Tads3DebugSession.threadID));
    });

    // Stop on breakpoint - frobd will send this event when it has stopped on a breakpoint
    this._runtime.on("stopOnBreakpoint", () => {
      debug("stopOnBreakpoint breakpoint event received, sending StoppedEvent");
      this.sendEvent(
        new StoppedEvent("breakpoint", Tads3DebugSession.threadID),
      );
    });

    // Stop on pause (e.g. from pause button in VS Code)
    this._runtime.on("stopOnPause", () => {
      debug("stopOnPause pause event received, sending StoppedEvent");
      this.sendEvent(new StoppedEvent("pause", Tads3DebugSession.threadID));
    });

    // Stop on data breakpoint - frobd will send this event when it has stopped
    // on a data breakpoint
    this._runtime.on("stopOnDataBreakpoint", () => {
      this.sendEvent(
        new StoppedEvent("data breakpoint", Tads3DebugSession.threadID),
      );
    });

    // Stop on instruction breakpoint - frobd will send this event when it has
    // stopped on an instruction breakpoint
    this._runtime.on("stopOnInstructionBreakpoint", () => {
      this.sendEvent(
        new StoppedEvent("instruction breakpoint", Tads3DebugSession.threadID),
      );
    });

    // Stop on exception - frobd will send this event when it has stopped on
    // an exception
    this._runtime.on("stopOnException", (exception) => {
      if (exception) {
        this.sendEvent(
          new StoppedEvent(
            `exception(${exception})`,
            Tads3DebugSession.threadID,
          ),
        );
      } else {
        this.sendEvent(
          new StoppedEvent("exception", Tads3DebugSession.threadID),
        );
      }
    });

    // Stop on breakpoint validation (e.g. when frobd reports whether a breakpoint is verified or not)
    this._runtime.on("breakpointValidated", (bp: IRuntimeBreakpoint) => {
      this.sendEvent(
        new BreakpointEvent("changed", {
          verified: bp.verified,
          id: bp.id,
        } as DebugProtocol.Breakpoint),
      );
    });

    // The debug adapter stops on output from the debuggee (the program being debugged)
    // e.g. when the debuggee prints something to the console, or when
    // frobd sends some output from the debuggee
    this._runtime.on("output", (type, text, filePath, line, column) => {
      let category: string;
      switch (type) {
        case "prio":
          category = "important";
          break;
        case "out":
          category = "stdout";
          break;
        case "err":
          category = "stderr";
          break;
        default:
          category = "console";
          break;
      }
      const e: DebugProtocol.OutputEvent = new OutputEvent(
        `${text}\n`,
        category,
      );

      if (text === "start" || text === "startCollapsed" || text === "end") {
        e.body.group = text;
        e.body.output = `group-${text}\n`;
      }

      e.body.source = this.createSource(filePath);
      e.body.line = this.convertDebuggerLineToClient(line);
      e.body.column = this.convertDebuggerColumnToClient(column);
      this.sendEvent(e);
    });

    this._runtime.on("end", async () => {
      // Clear the game view
      await vscode.commands.executeCommand("tads3dbg.clearWebview");
      // Stop on end
      this.sendEvent(new TerminatedEvent());
    });

    // Stop on invalidated (e.g. when breakpoints are cleared on frobd side
    // and need to be resent from VS Code)
    this._runtime.on("invalidated", (areas) => {
      // Forward invalidated event from frobd to VS Code
      // This tells VS Code to resend breakpoints, variables, etc.
      debug("========================================");
      debug("INVALIDATED EVENT RECEIVED FROM FROBD");
      debug("  Areas:", areas);
      debug("  _useInvalidatedEvent:", this._useInvalidatedEvent);
      if (this._useInvalidatedEvent) {
        debug("  => Sending InvalidatedEvent to VS Code");
        debug("  => VS Code should now resend all breakpoints");
        this.sendEvent(new InvalidatedEvent(areas || ["breakpoints"]));
        debug("  => InvalidatedEvent sent successfully");
      } else {
        debug(
          "  => NOT sending InvalidatedEvent (_useInvalidatedEvent is false)",
        );
      }
      debug("========================================");
    });
  }

  /**
   * The 'initialize' request is the first request called by the frontend
   * to interrogate the features the debug adapter provides.
   */
  protected initializeRequest(
    response: DebugProtocol.InitializeResponse,
    args: DebugProtocol.InitializeRequestArguments,
  ): void {
    debug("========================================");
    debug("INITIALIZE REQUEST");
    debug(
      "  Client supports invalidated event:",
      args.supportsInvalidatedEvent,
    );

    // VS Code has supported InvalidatedEvent since 1.35 (2019), so we'll send it regardless of capability flag
    this._useInvalidatedEvent = true;
    debug("  Setting _useInvalidatedEvent = true");

    // build and return the capabilities of this debug adapter:
    response.body = response.body || {};

    // the adapter implements the configurationDone request.
    response.body.supportsConfigurationDoneRequest = true;

    // the adapter supports invalidated events (tells VS Code to resend breakpoints after VM loads)
    // Note: TypeScript definitions may not include this, but it's part of DAP spec since 2019
    (response.body as any).supportsInvalidatedEvent = true;

    // make VS Code use 'evaluate' when hovering over source
    response.body.supportsEvaluateForHovers = true;

    // TADS3 does not support reverse debugging or stepping backwards
    response.body.supportsStepBack = false;

    // make VS Code support data breakpoints
    response.body.supportsDataBreakpoints = true;

    // make VS Code support completion in REPL
    response.body.supportsCompletionsRequest = true;
    response.body.completionTriggerCharacters = [".", "["];

    // make VS Code send cancel request
    response.body.supportsCancelRequest = true;

    // make VS Code send the breakpointLocations request
    response.body.supportsBreakpointLocationsRequest = true;

    // make VS Code provide "Step in Target" functionality
    response.body.supportsStepInTargetsRequest = true;

    // the adapter defines two exceptions filters, one with support for conditions.
    response.body.supportsExceptionFilterOptions = true;
    response.body.exceptionBreakpointFilters = [
      {
        filter: "namedException",
        label: "Named Exception",
        description: `Break on named exceptions. Enter the exception's name as the Condition.`,
        default: false,
        supportsCondition: true,
        conditionDescription: `Enter the exception's name`,
      },
      {
        filter: "otherExceptions",
        label: "Other Exceptions",
        description: "This is a other exception",
        default: true,
        supportsCondition: false,
      },
    ];

    // make VS Code send exceptionInfo request
    response.body.supportsExceptionInfoRequest = true;

    // make VS Code send setVariable request
    response.body.supportsSetVariable = true;

    // make VS Code send setExpression request
    response.body.supportsSetExpression = true;

    // make VS Code send disassemble request
    response.body.supportsDisassembleRequest = true;
    response.body.supportsSteppingGranularity = true;
    response.body.supportsInstructionBreakpoints = true;

    // make VS Code able to read and write variable memory
    response.body.supportsReadMemoryRequest = true;
    response.body.supportsWriteMemoryRequest = true;

    response.body.supportSuspendDebuggee = true;
    response.body.supportTerminateDebuggee = true;
    response.body.supportsFunctionBreakpoints = true;
    response.body.supportsDelayedStackTraceLoading = true;

    this.sendResponse(response);

    // since this debug adapter can accept configuration requests like 'setBreakpoint' at any time,
    // we request them early by sending an 'initializeRequest' to the frontend.
    // The frontend will end the configuration sequence by calling 'configurationDone' request.
    debug("  => Sending InitializedEvent to VS Code");
    debug("  => VS Code will now send existing breakpoints");
    debug("========================================");
    this.sendEvent(new InitializedEvent());

    // Clear the game view 
    this._runtime.sendEvent("clearOutput");

  }

  /**
   * Called at the end of the configuration sequence.
   * Indicates that all breakpoints etc. have been sent to the DA and that the 'launch' can start.
   */
  protected async configurationDoneRequest(
    response: DebugProtocol.ConfigurationDoneResponse,
    args: DebugProtocol.ConfigurationDoneArguments,
  ): Promise<void> {
    super.configurationDoneRequest(response, args);

    debug("========================================");
    debug("CONFIGURATION DONE REQUEST");
    debug("  All breakpoints should now be set");
    debug("  Sending configurationDone to frobd...");

    // Now that breakpoints are set, send launch to start the VM
    await this._runtime.completeLaunch();

    debug("  Configuration complete - VM can now execute");
    debug("========================================");

    // notify the launchRequest that configuration has finished
    this._configurationDone.notify();
  }

  protected disconnectRequest(
    response: DebugProtocol.DisconnectResponse,
    args: DebugProtocol.DisconnectArguments,
    request?: DebugProtocol.Request,
  ): void {
    debug(
      `disconnectRequest suspend: ${args.suspendDebuggee}, terminate: ${args.terminateDebuggee}`,
    );
  }

  protected async attachRequest(
    response: DebugProtocol.AttachResponse,
    args: IAttachRequestArguments,
  ) {
    return this.launchRequest(response, args);
  }

  protected async launchRequest(
    response: DebugProtocol.LaunchResponse,
    args: ILaunchRequestArguments,
  ) {
    // make sure to 'Stop' the buffered logging if 'trace' is not set
    logger.setup(
      args.trace ? Logger.LogLevel.Verbose : Logger.LogLevel.Stop,
      false,
    );

    // Start frobd FIRST so it's ready to receive breakpoints during configuration phase
    const frobdPath = args.frobd || "frobd";
    const dapMode = args.dapMode || "socket"; // Default to socket mode
    const dapSocket = args.dapSocket || "/tmp/tads-dap.sock";
    const dapPort = args.dapPort || 9876;

    let resolvedFrobdPath = frobdPath;

    clearFrobdOutputChannels();

    // Resolve frobd in PATH for global installs, then fall back to explicit path check.
    try {
      resolvedFrobdPath = await which(frobdPath);
    } catch {
      if (existsSync(frobdPath) === false) {
        this.sendErrorResponse(response, {
          id: 1001,
          format: `Required debugger 'frobd' not found at \`${frobdPath}\`. Either create a launch.json with the correct path or ensure the file exists at the specified location
					or make \`frobd\` available globally in the system PATH.`,
          showUser: true,
        });
        return;
      }
    }
    if(!tads3ImageHasDebugSymbols(args.program)) {
      vscode.window.showWarningMessage(
        `The selected TADS3 image file '${args.program}' does not appear to contain 
        debug symbols. Debugging experience may be limited. Make sure to compile your 
        game with debugging enabled. (the -d flag in the Makefile.t3m)`,
      );
    }

    await vscode.commands.executeCommand("tads3dbg.clearWebview");
    try {
      console.log("Trying to start frobd with parameters:", { args, resolvedFrobdPath, dapMode, dapSocket, dapPort });
      await this._runtime.start(
        args.program,
        resolvedFrobdPath,
        !!args.stopOnEntry,
        dapMode,
        dapSocket,
        dapPort,
      );
    } catch (error) {
      console.error("Error starting frobd:", error);
    }

    // Wait for configuration to finish (breakpoints are set during this phase)
    await this._configurationDone.wait(1000);

    this.sendResponse(response);
  }

  protected setFunctionBreakPointsRequest(
    response: DebugProtocol.SetFunctionBreakpointsResponse,
    args: DebugProtocol.SetFunctionBreakpointsArguments,
    request?: DebugProtocol.Request,
  ): void {
    this.sendResponse(response);
  }

  protected async setBreakPointsRequest(
    response: DebugProtocol.SetBreakpointsResponse,
    args: DebugProtocol.SetBreakpointsArguments,
  ): Promise<void> {
    const path = args.source.path as string;
    const clientLines = args.lines || [];

    debug("setBreakPointsRequest called");
    debug("  File:", path);
    debug("  Lines:", clientLines);

    // clear all breakpoints for this file
    this._runtime.clearBreakpoints(path);

    // set and verify breakpoint locations
    const actualBreakpoints0 = clientLines.map(async (l) => {
      const { verified, line, id } = await this._runtime.setBreakPoint(
        path,
        this.convertClientLineToDebugger(l),
      );
      const bp = new Breakpoint(
        verified,
        this.convertDebuggerLineToClient(line),
      ) as DebugProtocol.Breakpoint;
      bp.id = id;
      return bp;
    });
    const actualBreakpoints =
      await Promise.all<DebugProtocol.Breakpoint>(actualBreakpoints0);

    // send back the actual breakpoint positions
    response.body = {
      breakpoints: actualBreakpoints,
    };
    this.sendResponse(response);
  }

  protected breakpointLocationsRequest(
    response: DebugProtocol.BreakpointLocationsResponse,
    args: DebugProtocol.BreakpointLocationsArguments,
    request?: DebugProtocol.Request,
  ): void {
    if (args.source.path) {
      const bps = this._runtime.getBreakpoints(
        args.source.path,
        this.convertClientLineToDebugger(args.line),
      );
      response.body = {
        breakpoints: bps.map((col) => {
          return {
            line: args.line,
            column: this.convertDebuggerColumnToClient(col),
          };
        }),
      };
    } else {
      response.body = {
        breakpoints: [],
      };
    }
    this.sendResponse(response);
  }

  protected async setExceptionBreakPointsRequest(
    response: DebugProtocol.SetExceptionBreakpointsResponse,
    args: DebugProtocol.SetExceptionBreakpointsArguments,
  ): Promise<void> {
    let namedException: string | undefined = undefined;
    let otherExceptions = false;

    if (args.filterOptions) {
      for (const filterOption of args.filterOptions) {
        switch (filterOption.filterId) {
          case "namedException":
            namedException = args.filterOptions[0].condition;
            break;
          case "otherExceptions":
            otherExceptions = true;
            break;
        }
      }
    }

    if (args.filters) {
      if (args.filters.indexOf("otherExceptions") >= 0) {
        otherExceptions = true;
      }
    }

    this._runtime.setExceptionsFilters(namedException, otherExceptions);

    this.sendResponse(response);
  }

  protected exceptionInfoRequest(
    response: DebugProtocol.ExceptionInfoResponse,
    args: DebugProtocol.ExceptionInfoArguments,
  ) {
    response.body = {
      exceptionId: "Exception ID",
      description: "This is a descriptive description of the exception.",
      breakMode: "always",
      details: {
        message: "Message contained in the exception.",
        typeName: "Short type name of the exception object",
        stackTrace: "stack frame 1\nstack frame 2",
      },
    };
    this.sendResponse(response);
  }

  protected threadsRequest(response: DebugProtocol.ThreadsResponse): void {
    // runtime supports only a single thread
    response.body = {
      threads: [new Thread(Tads3DebugSession.threadID, "thread 1")],
    };
    this.sendResponse(response);
  }

  protected async stackTraceRequest(
    response: DebugProtocol.StackTraceResponse,
    args: DebugProtocol.StackTraceArguments,
  ): Promise<void> {
    const startFrame =
      typeof args.startFrame === "number" ? args.startFrame : 0;
    const maxLevels = typeof args.levels === "number" ? args.levels : 1000;
    const endFrame = startFrame + maxLevels;

    const stk = await this._runtime.stack(startFrame, endFrame);

    response.body = {
      stackFrames: stk.frames.map((f, ix) => {
        // frobd returns DAP format with source.path, not f.file
        const filePath = f.source?.path || f.file;
        const sf: DebugProtocol.StackFrame = new StackFrame(
          f.id || f.index,
          f.name,
          this.createSource(filePath),
          this.convertDebuggerLineToClient(f.line),
        );
        if (typeof f.column === "number") {
          sf.column = this.convertDebuggerColumnToClient(f.column);
        }
        if (typeof f.instruction === "number") {
          const address = this.formatAddress(f.instruction);
          sf.name = `${f.name} ${address}`;
          sf.instructionPointerReference = address;
        }

        return sf;
      }),
      // 4 options for 'totalFrames':
      //omit totalFrames property: 	// VS Code has to probe/guess. Should result in a max. of two requests
      totalFrames: stk.count, // stk.count is the correct size, should result in a max. of two requests
      //totalFrames: 1000000 			// not the correct size, should result in a max. of two requests
      //totalFrames: endFrame + 20 	// dynamically increases the size with every requested chunk, results in paging
    };
    this.sendResponse(response);
  }

  protected scopesRequest(
    response: DebugProtocol.ScopesResponse,
    args: DebugProtocol.ScopesArguments,
  ): void {
    (async () => {
      try {
        const dapScopes = await this._runtime.dapScopes(args.frameId);
        response.body = {
          scopes: (dapScopes || []).map((s: any) => {
            const dapRef = typeof s.variablesReference === "number" ? s.variablesReference : 0;
            const variablesReference =
              dapRef > 0 ? this._variableHandles.create({ __dapRef: dapRef }) : 0;
            return {
              name: String(s.name ?? "Scope"),
              variablesReference,
              expensive: !!s.expensive,
            } as DebugProtocol.Scope;
          }),
        };
      } catch (e) {
        // Fall back to the old (but currently stubbed) behavior.
        response.body = {
          scopes: [
            new Scope("Locals", this._variableHandles.create("locals"), false),
            new Scope("Globals", this._variableHandles.create("globals"), true),
          ],
        };
      }

      this.sendResponse(response);
    })();
  }

  protected async writeMemoryRequest(
    response: DebugProtocol.WriteMemoryResponse,
    { data, memoryReference, offset = 0 }: DebugProtocol.WriteMemoryArguments,
  ) {
    const variable = this._variableHandles.get(Number(memoryReference));
    if (
      variable &&
      typeof variable === "object" &&
      "setMemory" in variable &&
      typeof (variable as any).setMemory === "function"
    ) {
      const decoded = base64.toByteArray(data);
      (variable as RuntimeVariable).setMemory(decoded, offset);
      response.body = { bytesWritten: decoded.length };
    } else {
      response.body = { bytesWritten: 0 };
    }

    this.sendResponse(response);
    this.sendEvent(new InvalidatedEvent(["variables"]));
  }

  protected async readMemoryRequest(
    response: DebugProtocol.ReadMemoryResponse,
    { offset = 0, count, memoryReference }: DebugProtocol.ReadMemoryArguments,
  ) {
    const variable = this._variableHandles.get(Number(memoryReference));
    if (
      variable &&
      typeof variable === "object" &&
      "memory" in variable &&
      (variable as RuntimeVariable).memory
    ) {
      const mem = (variable as RuntimeVariable).memory as Uint8Array;
      const memory = mem.subarray(
        Math.min(offset, mem.length),
        Math.min(offset + count, mem.length),
      );

      response.body = {
        address: offset.toString(),
        data: base64.fromByteArray(memory),
        unreadableBytes: count - memory.length,
      };
    } else {
      response.body = {
        address: offset.toString(),
        data: "",
        unreadableBytes: count,
      };
    }

    this.sendResponse(response);
  }

  protected async variablesRequest(
    response: DebugProtocol.VariablesResponse,
    args: DebugProtocol.VariablesArguments,
    request?: DebugProtocol.Request,
  ): Promise<void> {
    const handle = this._variableHandles.get(args.variablesReference);

    // 1) frobd-backed variables: we store its variablesReference in our handle space.
    if (
      handle &&
      typeof handle === "object" &&
      "__dapRef" in handle &&
      typeof (handle as any).__dapRef === "number"
    ) {
      const dapRef = (handle as any).__dapRef as number;
      const dapVars = await this._runtime.dapVariables(dapRef);
      response.body = {
        variables: (dapVars || []).map((dv: any) => {
          const childDapRef = typeof dv.variablesReference === "number" ? dv.variablesReference : 0;
          const variablesReference =
            childDapRef > 0
              ? this._variableHandles.create({ __dapRef: childDapRef })
              : 0;
          return {
            name: String(dv.name ?? ""),
            value: String(dv.value ?? ""),
            type: dv.type,
            variablesReference,
            evaluateName: dv.evaluateName,
            presentationHint: dv.presentationHint,
            memoryReference: dv.memoryReference,
          } as DebugProtocol.Variable;
        }),
      };
      this.sendResponse(response);
      return;
    }

    // 2) legacy / internal variables.
    let vs: RuntimeVariable[] = [];
    if (handle === "locals") {
      vs = this._runtime.getLocalVariables();
    } else if (handle === "globals") {
      if (request) {
        this._cancellationTokens.set(request.seq, false);
        vs = await this._runtime.getGlobalVariables(
          () => !!this._cancellationTokens.get(request.seq),
        );
        this._cancellationTokens.delete(request.seq);
      } else {
        vs = await this._runtime.getGlobalVariables();
      }
    } else if (handle && typeof handle === "object" && "value" in handle && Array.isArray((handle as any).value)) {
      vs = (handle as RuntimeVariable).value as RuntimeVariable[];
    }

    response.body = { variables: vs.map((v) => this.convertFromRuntime(v)) };
    this.sendResponse(response);
  }

  protected setVariableRequest(
    response: DebugProtocol.SetVariableResponse,
    args: DebugProtocol.SetVariableArguments,
  ): void {
    const container = this._variableHandles.get(args.variablesReference);
    const rv =
      container === "locals"
        ? this._runtime.getLocalVariable(args.name)
        : container instanceof RuntimeVariable &&
            container.value instanceof Array
          ? container.value.find((v) => v.name === args.name)
          : undefined;

    if (rv) {
      rv.value = this.convertToRuntime(args.value);
      response.body = this.convertFromRuntime(rv);

      if (rv.memory && rv.reference) {
        this.sendEvent(
          new MemoryEvent(String(rv.reference), 0, rv.memory.length),
        );
      }
    }

    this.sendResponse(response);
  }

  protected continueRequest(
    response: DebugProtocol.ContinueResponse,
    args: DebugProtocol.ContinueArguments,
  ): void {
    this._runtime.continue(false);
    debug("continueRequest:", response, args);
    this.sendResponse(response);
  }

  protected pauseRequest(
    response: DebugProtocol.PauseResponse,
    args: DebugProtocol.PauseArguments,
  ): void {
    this._runtime.pause();
    debug("pauseRequest:", response, args);
    this.sendResponse(response);
  }

  protected reverseContinueRequest(
    response: DebugProtocol.ReverseContinueResponse,
    args: DebugProtocol.ReverseContinueArguments,
  ): void {
    this._runtime.continue(true);
    this.sendResponse(response);
  }

  protected nextRequest(
    response: DebugProtocol.NextResponse,
    args: DebugProtocol.NextArguments,
  ): void {
    this._runtime.step(args.granularity === "instruction", false);
    this.sendResponse(response);
  }

  protected stepBackRequest(
    response: DebugProtocol.StepBackResponse,
    args: DebugProtocol.StepBackArguments,
  ): void {
    this._runtime.step(args.granularity === "instruction", true);
    this.sendResponse(response);
  }

  protected stepInTargetsRequest(
    response: DebugProtocol.StepInTargetsResponse,
    args: DebugProtocol.StepInTargetsArguments,
  ) {
    const targets = this._runtime.getStepInTargets(args.frameId);
    response.body = {
      targets: targets.map((t) => {
        return { id: t.id, label: t.label };
      }),
    };
    this.sendResponse(response);
  }

  protected stepInRequest(
    response: DebugProtocol.StepInResponse,
    args: DebugProtocol.StepInArguments,
  ): void {
    this._runtime.stepIn(args.targetId);
    this.sendResponse(response);
  }

  protected stepOutRequest(
    response: DebugProtocol.StepOutResponse,
    args: DebugProtocol.StepOutArguments,
  ): void {
    this._runtime.stepOut();
    this.sendResponse(response);
  }

  protected async evaluateRequest(
    response: DebugProtocol.EvaluateResponse,
    args: DebugProtocol.EvaluateArguments,
  ): Promise<void> {
    try {
      // Try to evaluate the expression using the TADS3 VM
      const result = await this._runtime.evaluate(
        args.expression,
        args.frameId,
        args.context || "repl",
      );

      response.body = {
        result:
          result?.result !== undefined && result?.result !== null
            ? String(result.result)
            : "",
        type: result?.type,
        variablesReference: result?.variablesReference ?? 0,
      };
    } catch (error) {
      // If evaluation fails, return error message
      response.body = {
        result: `Error: ${error}`,
        variablesReference: 0,
      };
    }

    this.sendResponse(response);
  }

  protected setExpressionRequest(
    response: DebugProtocol.SetExpressionResponse,
    args: DebugProtocol.SetExpressionArguments,
  ): void {
    if (args.expression.startsWith("$")) {
      const rv = this._runtime.getLocalVariable(args.expression.substr(1));
      if (rv) {
        rv.value = this.convertToRuntime(args.value);
        response.body = this.convertFromRuntime(rv);
        this.sendResponse(response);
      } else {
        this.sendErrorResponse(response, {
          id: 1002,
          format: `variable '{lexpr}' not found`,
          variables: { lexpr: args.expression },
          showUser: true,
        });
      }
    } else {
      this.sendErrorResponse(response, {
        id: 1003,
        format: `'{lexpr}' not an assignable expression`,
        variables: { lexpr: args.expression },
        showUser: true,
      });
    }
  }

  protected dataBreakpointInfoRequest(
    response: DebugProtocol.DataBreakpointInfoResponse,
    args: DebugProtocol.DataBreakpointInfoArguments,
  ): void {
    response.body = {
      dataId: null,
      description: "cannot break on data access",
      accessTypes: undefined,
      canPersist: false,
    };

    if (args.variablesReference && args.name) {
      const v = this._variableHandles.get(args.variablesReference);
      if (v === "globals") {
        response.body.dataId = args.name;
        response.body.description = args.name;
        response.body.accessTypes = ["write"];
        response.body.canPersist = true;
      } else {
        response.body.dataId = args.name;
        response.body.description = args.name;
        response.body.accessTypes = ["read", "write", "readWrite"];
        response.body.canPersist = true;
      }
    }

    this.sendResponse(response);
  }

  protected setDataBreakpointsRequest(
    response: DebugProtocol.SetDataBreakpointsResponse,
    args: DebugProtocol.SetDataBreakpointsArguments,
  ): void {
    // clear all data breakpoints
    this._runtime.clearAllDataBreakpoints();

    response.body = {
      breakpoints: [],
    };

    for (const dbp of args.breakpoints) {
      const ok = this._runtime.setDataBreakpoint(
        dbp.dataId,
        dbp.accessType || "write",
      );
      response.body.breakpoints.push({
        verified: ok,
      });
    }

    this.sendResponse(response);
  }

  protected completionsRequest(
    response: DebugProtocol.CompletionsResponse,
    args: DebugProtocol.CompletionsArguments,
  ): void {
    response.body = {
      targets: [
        {
          label: "item 10",
          sortText: "10",
        },
        {
          label: "item 1",
          sortText: "01",
          detail: "detail 1",
        },
        {
          label: "item 2",
          sortText: "02",
          detail: "detail 2",
        },
        {
          label: "array[]",
          selectionStart: 6,
          sortText: "03",
        },
        {
          label: "func(arg)",
          selectionStart: 5,
          selectionLength: 3,
          sortText: "04",
        },
      ],
    };
    this.sendResponse(response);
  }

  protected cancelRequest(
    response: DebugProtocol.CancelResponse,
    args: DebugProtocol.CancelArguments,
  ) {
    if (args.requestId) {
      this._cancellationTokens.set(args.requestId, true);
    }
  }

  protected disassembleRequest(
    response: DebugProtocol.DisassembleResponse,
    args: DebugProtocol.DisassembleArguments,
  ) {
    const memoryInt = args.memoryReference.slice(3);
    const baseAddress = parseInt(memoryInt);
    const offset = args.instructionOffset || 0;
    const count = args.instructionCount;

    const isHex = memoryInt.startsWith("0x");
    const pad = isHex ? memoryInt.length - 2 : memoryInt.length;

    const loc = this.createSource(this._runtime.sourceFile);

    let lastLine = -1;

    const instructions = this._runtime
      .disassemble(baseAddress + offset, count)
      .map((instruction) => {
        let address = Math.abs(instruction.address)
          .toString(isHex ? 16 : 10)
          .padStart(pad, "0");
        const sign = instruction.address < 0 ? "-" : "";
        const instr: DebugProtocol.DisassembledInstruction = {
          address: sign + (isHex ? `0x${address}` : `${address}`),
          instruction: instruction.instruction,
        };
        // if instruction's source starts on a new line add the source to instruction
        if (instruction.line !== undefined && lastLine !== instruction.line) {
          lastLine = instruction.line;
          instr.location = loc;
          instr.line = this.convertDebuggerLineToClient(instruction.line);
        }
        return instr;
      });

    response.body = {
      instructions: instructions,
    };
    this.sendResponse(response);
  }

  protected setInstructionBreakpointsRequest(
    response: DebugProtocol.SetInstructionBreakpointsResponse,
    args: DebugProtocol.SetInstructionBreakpointsArguments,
  ) {
    // clear all instruction breakpoints
    this._runtime.clearInstructionBreakpoints();

    // set instruction breakpoints
    const breakpoints = args.breakpoints.map((ibp) => {
      const address = parseInt(ibp.instructionReference.slice(3));
      const offset = ibp.offset || 0;
      return <DebugProtocol.Breakpoint>{
        verified: this._runtime.setInstructionBreakpoint(address + offset),
      };
    });

    response.body = {
      breakpoints: breakpoints,
    };
    this.sendResponse(response);
  }

  protected customRequest(
    command: string,
    response: DebugProtocol.Response,
    args: any,
  ) {
    if (command === "toggleFormatting") {
      this._valuesInHex = !this._valuesInHex;
      if (this._useInvalidatedEvent) {
        this.sendEvent(new InvalidatedEvent(["variables"]));
      }
      this.sendResponse(response);
    } else if (command === "sendInputToFrobd") {
      this._runtime.sendInputToFrobd(args.input);
      this.sendResponse(response);
    } else {
      super.customRequest(command, response, args);
    }
  }

  //---- helpers

  private convertToRuntime(value: string): IRuntimeVariableType {
    value = value.trim();

    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value[0] === "'" || value[0] === '"') {
      return value.substr(1, value.length - 2);
    }
    const n = parseFloat(value);
    if (!isNaN(n)) {
      return n;
    }
    return value;
  }

  private convertFromRuntime(v: RuntimeVariable): DebugProtocol.Variable {
    let dapVariable: DebugProtocol.Variable = {
      name: v.name,
      value: "???",
      type: typeof v.value,
      variablesReference: 0,
      evaluateName: "$" + v.name,
    };

    if (v.name.indexOf("lazy") >= 0) {
      // a "lazy" variable needs an additional click to retrieve its value

      dapVariable.value = "lazy var"; // placeholder value
      v.reference ??= this._variableHandles.create(
        new RuntimeVariable("", [new RuntimeVariable("", v.value)]),
      );
      dapVariable.variablesReference = v.reference;
      dapVariable.presentationHint = { lazy: true };
    } else {
      if (Array.isArray(v.value)) {
        dapVariable.value = "Object";
        v.reference ??= this._variableHandles.create(v);
        dapVariable.variablesReference = v.reference;
      } else {
        switch (typeof v.value) {
          case "number":
            if (Math.round(v.value) === v.value) {
              dapVariable.value = this.formatNumber(v.value);
              (<any>dapVariable).__vscodeVariableMenuContext = "simple"; // enable context menu contribution
              dapVariable.type = "integer";
            } else {
              dapVariable.value = v.value.toString();
              dapVariable.type = "float";
            }
            break;
          case "string":
            dapVariable.value = `"${v.value}"`;
            break;
          case "boolean":
            dapVariable.value = v.value ? "true" : "false";
            break;
          default:
            dapVariable.value = typeof v.value;
            break;
        }
      }
    }

    if (v.memory) {
      v.reference ??= this._variableHandles.create(v);
      dapVariable.memoryReference = String(v.reference);
    }

    return dapVariable;
  }

  private formatAddress(x: number, pad = 8) {
    return (
      "mem" +
      (this._addressesInHex
        ? "0x" + x.toString(16).padStart(8, "0")
        : x.toString(10))
    );
  }

  private formatNumber(x: number) {
    return this._valuesInHex ? "0x" + x.toString(16) : x.toString(10);
  }

  private createSource(filePath: string): Source {
    return new Source(
      basename(filePath),
      this.convertDebuggerPathToClient(filePath),
      undefined,
      undefined,
      "mock-adapter-data",
    );
  }
}
