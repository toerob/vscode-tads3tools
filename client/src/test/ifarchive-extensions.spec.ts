/* eslint-disable @typescript-eslint/no-var-requires */
import { describe, expect, jest } from "@jest/globals";

jest.mock("vscode");

jest.mock("../../src/extension", () => {
  return {
    client: {
      info: jest.fn(),
      error: jest.fn(),
    },
  };
});

jest.mock("../../src/modules/state", () => {
  return {
    extensionState: {
      isUsingTads2: false,
      extensionCacheDirectory: "/cache",
      getChosenMakefileUri: jest.fn(() => ({ fsPath: "/project/Makefile.t3m" })),
      getTads2MainFile: jest.fn(() => ({ fsPath: "/project/main.t" })),
    },
    ExtensionStateStore: jest.fn(),
  };
});

jest.mock("axios", () => {
  const axiosFn: any = jest.fn();
  axiosFn.get = jest.fn();
  axiosFn.request = jest.fn();
  return axiosFn;
});

jest.mock("fs-extra", () => {
  return {
    ensureDirSync: jest.fn(),
  };
});

jest.mock("unzipper", () => {
  return {
    Extract: jest.fn((opts: any) => ({ __extractTarget: opts.path })),
  };
});

jest.mock("fs", () => {
  return {
    copyFileSync: jest.fn(),
    createReadStream: jest.fn(() => {
      const handlers: Record<string, (...args: any[]) => void> = {};
      return {
        on: jest.fn((event: string, handler: (...args: any[]) => void) => {
          handlers[event] = handler;
          return this;
        }),
        pipe: jest.fn(),
        __handlers: handlers,
      };
    }),
    createWriteStream: jest.fn(() => {
      return {
        on: jest.fn(),
        close: jest.fn(),
      };
    }),
    existsSync: jest.fn(),
    readdirSync: jest.fn(),
  };
});

const axios = require("axios");
const { window, workspace } = require("vscode");
const { client } = require("../../src/extension");
const { extensionState } = require("../../src/modules/state");
const { existsSync, readdirSync, copyFileSync, createReadStream } = require("fs");
const { ensureDirSync } = require("fs-extra");
const { Extract } = require("unzipper");

import {
  downloadAndCacheFile,
  downloadAndInstallExtension,
  parseIfArchiveIndex,
  performLocalExtensionInstallation,
  unzipFromFiletoFolder,
} from "../modules/commands/ifarchive-extensions";

function createDepsForDownloadAndCacheFile() {
  const writerHandlers: Record<string, (...args: any[]) => void> = {};
  const writer = {
    on: jest.fn((event: string, handler: (...args: any[]) => void) => {
      writerHandlers[event] = handler;
      return writer;
    }),
    close: jest.fn(),
  };
  const readable = {
    pipe: jest.fn(),
  };

  const deps = {
    ensureDirSync: jest.fn(),
    existsSync: jest.fn(),
    copyFileSync: jest.fn(),
    createWriteStream: jest.fn(() => writer),
    axiosRequest: jest.fn(async () => ({ data: readable })),
  };

  return {
    deps,
    writer,
    writerHandlers,
    readable,
  };
}

describe("ifarchive-extensions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockReset();
    axios.request.mockReset();
    existsSync.mockReset();
    readdirSync.mockReset();
    copyFileSync.mockReset();
    createReadStream.mockReset();
    ensureDirSync.mockReset();
    Extract.mockReset();

    Extract.mockImplementation((opts: any) => ({ __extractTarget: opts.path }));
    createReadStream.mockImplementation(() => {
      const handlers: Record<string, (...args: any[]) => void> = {};
      return {
        on: jest.fn((event: string, handler: (...args: any[]) => void) => {
          handlers[event] = handler;
          return this;
        }),
        pipe: jest.fn(),
        __handlers: handlers,
      };
    });

    workspace.getConfiguration.mockReturnValue({
      get: jest.fn(() => "https://example.com/contrib/"),
      update: jest.fn(),
    });
    extensionState.isUsingTads2 = false;
    extensionState.extensionCacheDirectory = "/cache";
    extensionState.getChosenMakefileUri.mockReturnValue({ fsPath: "/project/Makefile.t3m" });
    extensionState.getTads2MainFile.mockReturnValue({ fsPath: "/project/main.t" });
    window.showQuickPick.mockResolvedValue(undefined);
    window.showInformationMessage.mockResolvedValue(undefined);
  });

  test("falls back with an error when extension list fetch fails and no cache exists", async () => {
    axios.get.mockRejectedValueOnce(new Error("offline"));
    existsSync.mockReturnValue(false);

    await downloadAndInstallExtension({} as any);

    expect(client.error).toHaveBeenCalledTimes(1);
    expect(String(client.error.mock.calls[0][0])).toContain("Failed downloading extension list and no local cache to use");
    expect(window.showQuickPick).toHaveBeenCalledTimes(0);
  });

  test("parseIfArchiveIndex parses entries and ignores empty header section", () => {
    const parsed = parseIfArchiveIndex("#foo.zip\nDesc one\nline2#bar.t\nDesc two");

    expect(parsed.size).toBe(2);
    expect(parsed.get("foo.zip")).toBe("Desc one\nline2");
    expect(parsed.get("bar.t")).toBe("Desc two");
  });

  test("downloadAndCacheFile reuses cached file when available", async () => {
    const { deps } = createDepsForDownloadAndCacheFile();
    deps.existsSync.mockReturnValue(true);

    await downloadAndCacheFile("https://x/y.zip", "/project", "y.zip", "/cache", deps as any);

    expect(deps.ensureDirSync).toHaveBeenCalledWith("/cache");
    expect(deps.copyFileSync).toHaveBeenCalledWith("/cache/y.zip", "/project/y.zip");
    expect(deps.axiosRequest).toHaveBeenCalledTimes(0);
    expect(client.info).toHaveBeenCalledWith("Reusing cached file /cache/y.zip");
  });

  test("downloadAndCacheFile downloads and stores file when cache is missing", async () => {
    const { deps, writerHandlers, readable } = createDepsForDownloadAndCacheFile();
    deps.existsSync.mockReturnValue(false);

    const downloadPromise = downloadAndCacheFile("https://x/z.zip", "/project", "z.zip", "/cache", deps as any);

    await Promise.resolve();

    expect(deps.axiosRequest).toHaveBeenCalledWith({ method: "get", url: "https://x/z.zip", responseType: "stream" });
    expect(readable.pipe).toHaveBeenCalledTimes(1);
    writerHandlers.close();
    await downloadPromise;

    expect(deps.copyFileSync).toHaveBeenCalledWith("/project/z.zip", "/cache/z.zip");
    expect(client.info).toHaveBeenCalledWith('Download of z.zip to folder "/project" is completed');
  });

  test("downloadAndCacheFile logs stream errors and closes writer", async () => {
    const { deps, writerHandlers } = createDepsForDownloadAndCacheFile();
    deps.existsSync.mockReturnValue(false);

    const downloadPromise = downloadAndCacheFile("https://x/w.zip", "/project", "w.zip", "/cache", deps as any);

    await Promise.resolve();

    const streamError = new Error("stream failed");
    writerHandlers.error(streamError);
    await downloadPromise;

    expect(deps.copyFileSync).toHaveBeenCalledTimes(0);
    expect(client.error).toHaveBeenCalledWith("stream failed");
  });

  test("uses offline installer quick pick when extension list fetch fails but cache exists", async () => {
    axios.get.mockRejectedValueOnce(new Error("offline"));
    existsSync.mockImplementation((targetPath: string) => targetPath === "/cache");
    readdirSync.mockReturnValue(["cached.zip"]);

    await downloadAndInstallExtension({} as any);

    expect(window.showQuickPick).toHaveBeenCalledWith(["cached.zip"],
      expect.objectContaining({ title: "[OFFLINE INSTALLER] (Select a cached library)" }));
  });

  test("online listing returns early when no extension is selected", async () => {
    const runtime = {
      axiosGet: jest.fn(async () => ({ data: "#one.zip\nDesc one" })),
      showQuickPick: jest.fn(async () => undefined),
      showInformationMessage: jest.fn(),
    };

    await downloadAndInstallExtension({} as any, runtime as any);

    expect(runtime.showQuickPick).toHaveBeenCalledWith(["one.zip"], { canPickMany: true });
    expect(runtime.showInformationMessage).toHaveBeenCalledTimes(0);
  });

  test("online listing shows modal info and aborts when action is not Install", async () => {
    const runtime = {
      axiosGet: jest.fn(async () => ({ data: "#one.zip\nDesc one" })),
      showQuickPick: jest.fn(async () => ["one.zip"]),
      showInformationMessage: jest.fn(async () => ({ title: "Abort" })),
    };

    await downloadAndInstallExtension({} as any, runtime as any);

    expect(runtime.showInformationMessage).toHaveBeenCalledWith(
      "one.zip \n Desc one",
      { modal: true },
      { title: "Install" },
    );
  });

  test("online install reports download errors from helper path", async () => {
    axios.get.mockResolvedValueOnce({ data: "#bad.zip\nDesc" });
    window.showQuickPick.mockResolvedValueOnce(["bad.zip"]);
    window.showInformationMessage.mockResolvedValueOnce({ title: "Install" });

    const runtime = {
      axiosRequest: jest.fn(async () => {
        throw new Error("network fail");
      }),
      createWriteStream: jest.fn(() => ({ on: jest.fn(), close: jest.fn() })),
      ensureDirSync: jest.fn(),
      existsSync: jest.fn(() => false),
      showErrorMessage: jest.fn(),
      createReadStream: jest.fn(() => ({ on: jest.fn(), pipe: jest.fn() })),
      extract: jest.fn(),
      copyFileSync: jest.fn(),
      readdirSync: jest.fn(),
      getConfiguration: workspace.getConfiguration,
      showQuickPick: window.showQuickPick,
      showInformationMessage: window.showInformationMessage,
      axiosGet: axios.get,
    };

    await downloadAndInstallExtension({} as any, runtime as any);

    expect(runtime.showErrorMessage).toHaveBeenCalledWith(expect.stringContaining("Download failed for https://example.com/contrib/bad.zip"));
    expect(client.error).toHaveBeenCalledWith(expect.stringContaining("Download failed for https://example.com/contrib/bad.zip"));
  });

  test("online install unzips .zip extension on successful download", async () => {
    axios.get.mockResolvedValueOnce({ data: "#good.zip\nDesc" });
    window.showQuickPick.mockResolvedValueOnce(["good.zip"]);
    window.showInformationMessage.mockResolvedValueOnce({ title: "Install" });

    const writerHandlers: Record<string, (...args: any[]) => void> = {};
    const writer = {
      on: jest.fn((event: string, handler: (...args: any[]) => void) => {
        writerHandlers[event] = handler;
        return writer;
      }),
      close: jest.fn(),
    };
    const readable = {
      pipe: jest.fn(() => {
        Promise.resolve().then(() => writerHandlers.close?.());
      }),
    };

    const runtime = {
      axiosRequest: jest.fn(async () => ({ data: readable })),
      createWriteStream: jest.fn(() => writer),
      ensureDirSync: jest.fn(),
      existsSync: jest.fn(() => false),
      createReadStream: jest.fn(() => ({ on: jest.fn(), pipe: jest.fn() })),
      extract: jest.fn(() => ({})),
      copyFileSync: jest.fn(),
      readdirSync: jest.fn(),
      showErrorMessage: jest.fn(),
      getConfiguration: workspace.getConfiguration,
      showQuickPick: window.showQuickPick,
      showInformationMessage: window.showInformationMessage,
      axiosGet: axios.get,
    };

    await downloadAndInstallExtension({} as any, runtime as any);

    expect(runtime.createReadStream).toHaveBeenCalledWith("/project/good.zip");
    expect(client.info).toHaveBeenCalledWith("Unzipping good.zip to /project/good");
  });

  test("downloadAndCacheFile uses production runtime axiosRequest binding", async () => {
    const writerHandlers: Record<string, (...args: any[]) => void> = {};
    const writer = {
      on: jest.fn((event: string, handler: (...args: any[]) => void) => {
        writerHandlers[event] = handler;
        return writer;
      }),
      close: jest.fn(),
    };

    const { createWriteStream } = require("fs");
    createWriteStream.mockImplementationOnce(() => writer);
    existsSync.mockImplementation((targetPath: string) => targetPath !== "/cache/default.zip");

    axios.request.mockImplementationOnce(async (config: any) => {
      return {
        data: {
          pipe: () => {
            Promise.resolve().then(() => writerHandlers.close?.());
          },
        },
      };
    });

    await downloadAndCacheFile("https://example.com/default.zip", "/project", "default.zip", "/cache");

    expect(axios.request).toHaveBeenCalledWith({ method: "get", url: "https://example.com/default.zip", responseType: "stream" });
  });

  test("performLocalExtensionInstallation copies cached files and unzips zip archives", async () => {
    const runtime = {
      showQuickPick: jest.fn(async () => ["one.zip", "two.t"]),
      existsSync: jest.fn((targetPath: string) => targetPath === "/cache/one.zip" || targetPath === "/cache/two.t"),
      copyFileSync: jest.fn(),
      createReadStream: jest.fn(() => ({ on: jest.fn(), pipe: jest.fn() })),
      extract: jest.fn(() => ({})),
      ensureDirSync: jest.fn(),
    };
    const localState: any = {
      isUsingTads2: false,
      getChosenMakefileUri: jest.fn(() => ({ fsPath: "/project/Makefile.t3m" })),
      getTads2MainFile: jest.fn(() => ({ fsPath: "/project/main.t" })),
    };

    await performLocalExtensionInstallation("/cache", ["one.zip", "two.t"], localState, runtime as any);

    expect(runtime.copyFileSync).toHaveBeenCalledWith("/cache/one.zip", "/project/one.zip");
    expect(runtime.copyFileSync).toHaveBeenCalledWith("/cache/two.t", "/project/two.t");
    expect(runtime.createReadStream).toHaveBeenCalledWith("/project/one.zip");
    expect(runtime.createReadStream).not.toHaveBeenCalledWith("/project/two.t");
  });

  test("unzipFromFiletoFolder wires stream extraction pipeline", () => {
    unzipFromFiletoFolder("/tmp/sample.zip", "/tmp/out");

    expect(ensureDirSync).toHaveBeenCalledWith("/tmp/out");
    expect(createReadStream).toHaveBeenCalledWith("/tmp/sample.zip");

    const stream = createReadStream.mock.results[0].value;
    const openHandler = stream.__handlers.open;
    expect(openHandler).toBeDefined();

    openHandler();

    expect(Extract).toHaveBeenCalledWith({ path: "/tmp/out" });
    expect(stream.pipe).toHaveBeenCalledWith(expect.objectContaining({ __extractTarget: "/tmp/out" }));
  });

  test("unzipFromFiletoFolder logs setup errors from createReadStream", () => {
    const failingRuntime = {
      ensureDirSync: jest.fn(),
      createReadStream: jest.fn(() => {
        throw new Error("cannot open zip");
      }),
      extract: jest.fn(),
    };

    unzipFromFiletoFolder("/tmp/bad.zip", "/tmp/out", failingRuntime as any);

    expect(client.error).toHaveBeenCalledWith(expect.stringContaining("Setting up readstream for /tmp/bad.zip failed"));
  });
	
});