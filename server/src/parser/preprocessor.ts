/* eslint-disable no-useless-escape */
import { exec } from "child_process";
import { readFile, readFileSync } from "fs";
import { URI } from "vscode-uri";
import { CaseInsensitiveSet } from "../modules/CaseInsensitiveSet";
import { CaseInsensitiveMap } from '../modules/CaseInsensitiveMap';

// ── Compiled regexes ──────────────────────────────────────────────────────────

const tads3PathRegexp = /^#line ([0-9]+) "(.*)"$/;
const tads2PathRegexp = /^# ([0-9]+) "(.*)"$/;
const defineRegExp    = /^\s*[#]\s*define\s+([^\(\s\n]+)[^(\n]*/;

/**
 * Splits on real newlines but NOT on escaped newlines (e.g. `\\n` inside
 * string literals).  The lookbehind requires a preceding character, so this
 * regex intentionally will NOT match a `\n` at position 0 of a string.
 * Use this only where that limitation is acceptable (e.g. user-facing display).
 * For internal line-by-line iteration, split on plain `"\n"` instead.
 */
export const wholeLineRegExp       = /(?<=[^\\])\r?\n/;
export const simpleWholeLineRegExp = /\r?\n/;

export const rowsMap = new Map<string, number>();

const defineMacrosMap = new Map<string, any>();
const onWindowsPlatform = process.platform === "win32";
const macrosChecked = onWindowsPlatform ? new CaseInsensitiveSet() : new Set<string>();

type PreprocessedCache = Map<string, string> | CaseInsensitiveMap<string, string>;

// ── Public API ────────────────────────────────────────────────────────────────

export function getDefineMacrosMap(): Map<string, any> {
  return defineMacrosMap;
}

export function markFileToBeCheckedForMacroDefinitions(uri: string) {
  macrosChecked.delete(uri);
}

export function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = "";
    const childProcess = exec(command, { maxBuffer: 1024 * 50000 });
    try {
      childProcess?.stdout?.on("data", (data: string) => {
        result += data;
      });
      childProcess.on("close", () => resolve(result));
    } catch (error) {
      reject(error);
    }
  });
}

export async function preprocessTads3Files(
  chosenMakefilePath: string,
  preprocessedFilesCacheMap: PreprocessedCache,
  t3makeCompilerPath = "t3make",
  connection?: any
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();
  const commandLine = `"${t3makeCompilerPath}" -P -w0 -q -f "${chosenMakefilePath}"`;
  const result = await runCommand(commandLine);
  if (result.match(/unable to open/i)) {
    throw new Error(`Preprocessing failed: ${result}`);
  }
  processPreprocessedResult(result, preprocessedFilesCacheMap);
  const unprocessedRowsMap = countRowsOfUnprocessedFiles([...preprocessedFilesCacheMap.keys()], connection);
  postProcessPreprocessedResult(unprocessedRowsMap, preprocessedFilesCacheMap, connection);
}

export async function preprocessTads2Files(
  chosenMainfilePath: string,
  preprocessedFilesCacheMap: PreprocessedCache,
  t2PreprocessorPath = "t3make",
  libFolders: string[] = ["/usr/local/share/frobtads/tads2/"],
  connection?: any
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();
  const includes = [libFolders, require("path").dirname(chosenMainfilePath)]
    .map((x) => `-I "${x}"`)
    .join(" ");
  const commandLine = `${t2PreprocessorPath} -w0 ${includes} -P -q "${chosenMainfilePath}"`;
  const result = await runCommand(commandLine);
  if (result.match(/unable to open/i)) {
    throw new Error(`Preprocessing failed: ${result}`);
  }
  processPreprocessedResult(result, preprocessedFilesCacheMap, true);
  const unprocessedRowsMap = countRowsOfUnprocessedFiles([...preprocessedFilesCacheMap.keys()], connection);
  postProcessPreprocessedResult(unprocessedRowsMap, preprocessedFilesCacheMap, connection);
}

/**
 * Store a buffer of preprocessed content for a file, accumulating rows.
 * Exported for use by external callers and tests.
 */
export function storeCurrentBufferAndRows(
  currentFile: string,
  currentBuffer: string,
  currentCounter: number,
  preprocessedFilesCacheMap: PreprocessedCache
) {
  const previouslyCountedRows = rowsMap.get(currentFile);
  if (previouslyCountedRows !== undefined) {
    rowsMap.set(currentFile, previouslyCountedRows + currentCounter);
  } else {
    rowsMap.set(currentFile, currentCounter);
  }
  const previousContent = preprocessedFilesCacheMap.get(currentFile);
  if (previousContent) {
    preprocessedFilesCacheMap.set(currentFile, previousContent + currentBuffer);
  } else {
    preprocessedFilesCacheMap.set(currentFile, currentBuffer ?? "");
  }
}

// ── Internal pipeline ─────────────────────────────────────────────────────────

/**
 * Parse the raw `t3make -P` output (which contains `#line N "file"` markers
 * interleaved with expanded source code) into a per-file content map.
 *
 * Performance: uses string[] buffers throughout to avoid O(n²) string
 * concatenation; arrays are joined to strings only at the very end.
 */
function processPreprocessedResult(
  result: string,
  preprocessedFilesCacheMap: PreprocessedCache,
  usingTads2 = false
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();

  const pathRegexp  = usingTads2 ? tads2PathRegexp : tads3PathRegexp;
  const lineMarker  = usingTads2 ? "#" : "#line";

  // Per-file line arrays (O(1) push instead of O(n) string concat)
  const fileLines = new Map<string, string[]>();

  let currentFile: string | undefined;
  let currentBuf: string[] = [];

  const flushCurrentBuffer = () => {
    if (currentFile === undefined) return;
    const existing = fileLines.get(currentFile);
    if (existing) {
      for (const l of currentBuf) existing.push(l);
    } else {
      fileLines.set(currentFile, currentBuf.slice());
    }
  };

  // Iterate lines without building a full split-array:
  // Split on plain "\n" — the lookbehind in wholeLineRegExp cannot match
  // position-0 newlines and would mis-index preprocessed output.
  const lines = result.split("\n");

  for (const line of lines) {
    if (line.startsWith(lineMarker)) {
      const match = pathRegexp.exec(line);
      if (match) {
        // Flush accumulated lines into the current file's buffer
        flushCurrentBuffer();
        currentBuf = [];

        const fileName        = match[2].replace(/\\\\/g, "\\");
        const targetLine      = Number(match[1]) - 1; // 0-based

        // Skip TADS2 virtual headers (e.g. `<built-in>`)
        if (usingTads2 && fileName.startsWith("<")) {
          currentFile = undefined;
          continue;
        }

        if (!fileLines.has(fileName)) {
          fileLines.set(fileName, []);
        }
        const fileBuf = fileLines.get(fileName)!;

        const diff = targetLine - fileBuf.length;
        if (diff > 0) {
          // Gap: pad with blank lines to reach the target line number
          for (let i = 0; i < diff; i++) fileBuf.push("");
        } else if (diff === -1) {
          // Overlap by one: remove the trailing blank that was added speculatively
          if (fileBuf.length > 0 && fileBuf[fileBuf.length - 1] === "") {
            fileBuf.pop();
          }
        }

        currentFile = fileName;
        rowsMap.set(currentFile, targetLine);
        continue;
      }
    }

    if (currentFile === undefined) continue;

    // #charset lines become blank placeholders (preserving line numbers)
    currentBuf.push(line.startsWith("#charset") ? "" : line);
  }

  // Flush the final file's buffer
  flushCurrentBuffer();

  // Materialise string[] → string for each file
  for (const [file, lineArr] of fileLines) {
    preprocessedFilesCacheMap.set(file, lineArr.join("\n"));
  }
}

/**
 * Count the number of logical lines in each unprocessed source file by
 * counting `\n` characters directly — no array allocation, no regex.
 * Returns (newline_count + 1), which equals `split("\n").length`.
 */
function countRowsOfUnprocessedFiles(
  filesArray: string[],
  connection?: any
): Map<string, number> {
  const startTime = Date.now();
  const rowMap = new Map<string, number>();
  for (const f of filesArray) {
    const contents = readFileSync(f, "utf8");
    let count = 1;
    for (let i = 0; i < contents.length; i++) {
      if (contents.charCodeAt(i) === 10 /* '\n' */) count++;
    }
    rowMap.set(f, count);
  }
  connection?.console?.debug(`Counting row lines done in ${Date.now() - startTime} ms`);
  return rowMap;
}

/**
 * Trim or pad each preprocessed file so its line count exactly matches the
 * original source file.  This is necessary because some library headers
 * (e.g. adv3.h) get included multiple times during preprocessing, making the
 * preprocessed version much longer than the original.
 *
 * Both sides are measured as `split("\n").length` so comparison is consistent.
 */
function postProcessPreprocessedResult(
  unprocessedRowsMap: Map<string, number>,
  preprocessedFilesCacheMap: PreprocessedCache,
  connection?: any
) {
  const startTime = Date.now();

  for (const filename of preprocessedFilesCacheMap.keys()) {
    const preprocessedText = preprocessedFilesCacheMap.get(filename);
    if (!preprocessedText) continue;

    const unprocessedRows = unprocessedRowsMap.get(filename);
    if (!unprocessedRows) {
      if (isFileDefinesToBeProcess(filename)) mapMacroDefinitions(filename, connection);
      continue;
    }

    const processedLines = preprocessedText.split("\n");

    if (processedLines.length !== unprocessedRows) {
      if (processedLines.length > unprocessedRows) {
        // Trim: preprocessed is longer (repeated includes, etc.)
        preprocessedFilesCacheMap.set(filename, processedLines.slice(0, unprocessedRows).join("\n"));
      } else {
        // Pad: preprocessed is shorter — append blank lines to align positions
        const blankRows = unprocessedRows - processedLines.length;
        for (let i = 0; i < blankRows; i++) processedLines.push("");
        preprocessedFilesCacheMap.set(filename, processedLines.join("\n"));
      }
    }

    if (isFileDefinesToBeProcess(filename)) mapMacroDefinitions(filename, connection);
  }

  connection?.console?.debug(`Postprocessing row lines done in ${Date.now() - startTime} ms`);
}

function isFileDefinesToBeProcess(filename: string): boolean {
  const uriPath = onWindowsPlatform ? URI.file(filename).path : filename;
  return !macrosChecked.has(uriPath);
}

function mapMacroDefinitions(filename: string, connection?: any) {
  const fp = onWindowsPlatform ? URI.file(filename).fsPath : filename;
  readFile(fp, (err, data) => {
    if (err) return;
    const uriPath = onWindowsPlatform ? URI.file(filename).path : filename;
    const rows = data.toString().split("\n");
    rows.forEach((row, idx) => {
      const result = defineRegExp.exec(row);
      if (result !== null && result.length >= 2) {
        let macroDefAdditionalRows = 0;
        for (let nextRowIdx = idx; nextRowIdx < rows.length; nextRowIdx++) {
          if (rows[nextRowIdx].endsWith("\\")) {
            macroDefAdditionalRows++;
          } else {
            break;
          }
        }
        defineMacrosMap.set(result[1], {
          row: idx,
          uri: uriPath,
          endLine: idx + macroDefAdditionalRows,
        });
      }
    });
    macrosChecked.add(uriPath);
    connection?.console?.debug(`${uriPath} scanned for macro definitions`);
  });
}
