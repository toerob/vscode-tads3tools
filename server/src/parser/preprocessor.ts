/* eslint-disable no-useless-escape */
//import { URI } from 'vscode-languageserver';
import { exec } from "child_process";
import { readFile, readFileSync } from "fs";
import { basename, dirname } from "path";
import { URI } from "vscode-uri";
import { CaseInsensitiveSet } from "../modules/CaseInsensitiveSet";

const defineRegExp = new RegExp(/^\s*[#]\s*define\s+([^\(\s\n]+)[^(\n]*/);

/**
 * It's not enough to just look for regular line breaks, e.g: \r?\n
 * As a complement a look behind needs to be done to make sure we are
 * not parsing a quoted newline. Those we don't want to touch.
 */
export const wholeLineRegExp = new RegExp(/(?<=[^\\])\r?\n/);

export const rowsMap = new Map<string, number>();
const defineMacrosMap = new Map();
const onWindowsPlatform = process.platform === "win32";
const macrosChecked = onWindowsPlatform ? new CaseInsensitiveSet() : new Set();

export function getDefineMacrosMap(): Map<string, any> {
  return defineMacrosMap;
}

export function markFileToBeCheckedForMacroDefinitions(uri: string) {
  macrosChecked.delete(uri);
}

export function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    let result = "";
    const childProcess = exec(command, { maxBuffer: 1024 * 50000 }); //TODO: make configurable
    try {
      childProcess?.stdout?.on("data", (data: any) => {
        result += data;
      });
      childProcess.on("close", function () {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
    return result;
  });
}

export async function preprocessTads2Files(
  chosenMainfilePath: string,
  preprocessedFilesCacheMap: Map<string, string>,
  t2PreprocessorPath = "t3make",
  libFolders: string[] = ["/usr/local/share/frobtads/tads2/"],
  connection: any = undefined
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();
  const includes = [libFolders, dirname(chosenMainfilePath)]
    .map((x) => `-I "${x}"`)
    .join(" ");
  const commandLine = `${t2PreprocessorPath} -w0 ${includes} -P -q "${chosenMainfilePath}"`;
  const result: any = await runCommand(commandLine);
  //connection?.console?.log(`command line: ${commandLine}`);
  if (result.match(/unable to open/i)) {
    throw new Error(`Preprocessing failed: ${result}`);
  }
  processPreprocessedResult(result, preprocessedFilesCacheMap);
  const unprocessedRowsMap = countRowsOfUnprocessedFiles(
    [...preprocessedFilesCacheMap?.keys()] ?? [],
    connection
  );
  postProcessPreprocessedResultTads(
    unprocessedRowsMap,
    preprocessedFilesCacheMap,
    connection
  );
}

export async function preprocessTads3Files(
  chosenMakefilePath: string,
  preprocessedFilesCacheMap: Map<string, string>,
  t3makeCompilerPath = "t3make",
  connection: any = undefined
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();
  const commandLine = `"${t3makeCompilerPath}" -P -q -f "${chosenMakefilePath}"`;
  //connection?.console?.log(`command line: ${commandLine}`);
  const result: any = await runCommand(commandLine);
  if (result.match(/unable to open/i)) {
    throw new Error(`Preprocessing failed: ${result}`);
  }
  processPreprocessedResult(result, preprocessedFilesCacheMap);
  const unprocessedRowsMap = countRowsOfUnprocessedFiles(
    [...preprocessedFilesCacheMap?.keys()] ?? [],
    connection
  );
  postProcessPreprocessedResultTads(
    unprocessedRowsMap,
    preprocessedFilesCacheMap,
    connection
  );
}

function processPreprocessedResult(
  result: any,
  preprocessedFilesCacheMap: Map<string, string>,
  usingTads2 = false,
  connection: any = undefined
) {
  preprocessedFilesCacheMap.clear();
  rowsMap.clear();

  const pathRegexp = usingTads2
    ? new RegExp('^# ([0-9]+) "(.*)"')
    : new RegExp('^#line ([0-9]+) "(.*)"');
  const tadsLineQuickMatchDelimiter = usingTads2 ? "#" : "#line";

  const startTime = Date.now();
  let totalLineCount = 0;
  let currentCounter = 0;
  let currentBuffer = "";
  let currentFile = undefined;
  for (const line of result.split(wholeLineRegExp)) {
    // Split only simple "\n", not "\\n" found within strings
    totalLineCount++;
    currentCounter++;
    if (line.startsWith(tadsLineQuickMatchDelimiter)) {
      const match = pathRegexp.exec(line);
      if (match) {
        if (currentFile) {
          if (!(usingTads2 && currentFile.startsWith("<"))) {
            storeCurrentBufferAndRows(
              currentFile,
              currentBuffer,
              currentCounter - 1,
              preprocessedFilesCacheMap
            );
          }
        }
        currentBuffer = "";
        currentCounter = 0;
        if (currentCounter === undefined || currentCounter === Infinity) {
          currentCounter = 1;
        }

        currentFile = match[2].replace(/\\\\/g, "\\");

        const newCurrentCounter = Number(match[1]) - 1;
        let lastLine = rowsMap.get(currentFile);
        if (lastLine === undefined || lastLine === Infinity) {
          lastLine = newCurrentCounter;
        }
        const diff = newCurrentCounter - lastLine;

        // Salvage negative difference:
        if (diff === -1) {
          const lastStored = preprocessedFilesCacheMap.get(currentFile);
          if (lastStored) {
            const lastCharacter = lastStored[lastStored.length - 1];
            if (lastCharacter === "\n") {
              //console.error(`Salvaging negative diff in ${currentFile} ${diff} last line: ${lastLine}`);
              const removedLastLine = lastStored.slice(
                0,
                lastStored.length - 1
              );
              preprocessedFilesCacheMap.set(currentFile, removedLastLine);
              currentCounter--;
            }
          }
        }

        for (let x = 0; x < diff; x++) {
          currentBuffer = currentBuffer.concat("\n");
          currentCounter++;
        }
        rowsMap.set(currentFile, lastLine);
        continue;
      }
    }

    if (!line.startsWith("#charset")) {
      currentBuffer = currentBuffer.concat(line).concat("\n");
    } else {
      currentBuffer = currentBuffer.concat("\n");
    }
  }

  if (currentFile) {
    const newString =
      (preprocessedFilesCacheMap.get(currentFile) ?? "") + currentBuffer;
    preprocessedFilesCacheMap.set(currentFile, newString);
  }

  const elapsedTime = Date.now() - startTime;
  connection?.console?.debug(
    `${totalLineCount - 1} number of preprocessed lines mapped in ${elapsedTime} ms`
  );
}

export function storeCurrentBufferAndRows(
  currentFile: string,
  currentBuffer: string,
  currentCounter: number,
  preprocessedFilesCacheMap: Map<string, string>
) {
  try {
    const previouslyCountedRows = rowsMap.get(currentFile);
    if (previouslyCountedRows !== undefined) {
      rowsMap.set(currentFile, previouslyCountedRows + currentCounter);
    } else {
      rowsMap.set(currentFile, 0);
    }
    const previousContent = preprocessedFilesCacheMap.get(currentFile);
    if (previousContent) {
      preprocessedFilesCacheMap.set(
        currentFile,
        previousContent.concat(currentBuffer)
      );
    } else {
      if (currentBuffer) {
        preprocessedFilesCacheMap.set(currentFile, currentBuffer);
      } else {
        preprocessedFilesCacheMap.set(currentFile, "");
      }
    }
  } catch (err) {
    console.error(err);
  }
}
function countRowsOfUnprocessedFiles(
  filesArray: string[],
  connection: any = undefined
) {
  const startTime = Date.now();
  const rowMap = new Map();
  for (const f of filesArray) {
    const contents = readFileSync(f).toString();
    const countedLines = contents.split(wholeLineRegExp)?.length;
    rowMap.set(f, countedLines);
  }
  const elapsedTime = Date.now() - startTime;
  connection?.console?.debug(`Counting row lines done in ${elapsedTime} ms`);
  return rowMap;
}

/**
 * Some preprocessed documents (such as adv3.h / adv3Lite.h) gets duplicated several times during
 * preprocessing and ends up very long, therefore they need trimming.
 * @param unprocessedRowsMap
 */
function postProcessPreprocessedResultTads(
  unprocessedRowsMap: Map<string, number>,
  preprocessedFilesCacheMap: Map<string, string>,
  connection: any
) {
  const startTime = Date.now();
  for (const filename of preprocessedFilesCacheMap.keys()) {
    const preprocessedText = preprocessedFilesCacheMap.get(filename);
    if (preprocessedText) {
      const processedRowsArray = preprocessedText.split(wholeLineRegExp);
      const unprocessedRows = unprocessedRowsMap.get(filename);
      if (unprocessedRows) {
        // In case the preprocessed document is longer than the original document.
        // - Slice it so it matches the length of the unprocessed document
        if (processedRowsArray.length > unprocessedRows) {
          const slicedText = processedRowsArray
            .slice(0, unprocessedRows)
            .join("\n");
          preprocessedFilesCacheMap.set(filename, slicedText);
        }

        // In case the original document is longer than the preprocessed.
        // - Fill up the lost rows with blank rows
        if (unprocessedRows > processedRowsArray.length) {
          const blankRows = unprocessedRows - processedRowsArray.length - 1;
          for (let i = 0; i < blankRows; i++) {
            processedRowsArray.push(``);
          }
          preprocessedFilesCacheMap.set(
            filename,
            processedRowsArray.join("\n")
          );
        }
      }
    }
    if (isFileDefinesToBeProcess(filename)) {
      mapMacroDefinitions(filename, connection);
    }
  }
  const elapsedTime = Date.now() - startTime;
  connection?.console?.debug(
    `Postprocessing row lines done in ${elapsedTime} ms`
  );
}

/**
 * Determine if the file should be checked for define macros
 * This preferably done once for library files and each time
 * for the currently opened file.
 *
 * @param filename
 * @returns
 */
function isFileDefinesToBeProcess(filename: string) {
  const uriPath = onWindowsPlatform ? URI.file(filename).path : filename; // Optimize for linux
  return !macrosChecked?.has(uriPath);
}

function mapMacroDefinitions(filename: string, connection: any) {
  const fp = onWindowsPlatform ? URI.file(filename).fsPath : filename;
  readFile(fp, (err, data) => {
    if (!err) {
      const fp = onWindowsPlatform ? URI.file(filename).path : filename;
      let rowIdx = 0;
      const text = data.toString();
      //const rows = text.split(wholeLineRegExp) ?? []; // TODO: kolla 375 mot \n också
      const rows = text.split(/\n/) ?? []; // TODO: kolla 375 mot \n också
      rows.forEach((row, idx) => {
        const result = defineRegExp.exec(row);
        if (result !== null && result?.length >= 2) {
          let macroDefAdditionalRows = 0;
          for (let nextRowIdx = idx; nextRowIdx < rows.length; nextRowIdx++) {
            if (rows[nextRowIdx].endsWith("\\")) {
              macroDefAdditionalRows++;
            } else {
              break;
            }
          }
          defineMacrosMap.set(result[1], {
            row: rowIdx,
            uri: fp,
            endLine: rowIdx + macroDefAdditionalRows,
          });
        }
        rowIdx++;
      });
      macrosChecked.add(fp); // Cache result, only refresh on file changes
      connection?.console?.debug(`${fp} scanned for macro definitions`);
    }
  });
}
