import { DocumentSymbol, Range } from "vscode-languageserver/node";
import { preprocessTads3Files, preprocessTads2Files } from "./parser/preprocessor";
import { statSync, readFileSync, writeFileSync, existsSync } from "fs";
import { URI, Utils } from "vscode-uri";
import { spawn, Pool, Worker, Thread } from "threads";
import { connection } from "./server";
import { clearCompletionCache } from "./modules/completions";
import { basename } from "path";
import * as path from "path";
import { ensureDirSync, ensureFileSync } from "fs-extra";
import { parseTads2Files } from "./parseTads2Files";
import { symbolManager } from "./modules/symbol-manager";
import { filterForStandardLibraryFiles } from "./modules/utils";
import { serverState } from './state';
import { CaseInsensitiveMap } from './modules/CaseInsensitiveMap';

let lastMakeFileLocation: string | undefined;
let makefileStructure;
let usingAdv3Lite = false;
let initialParsing = true;

let globalStorageCachePath: string | undefined;

const adv3LitePathRegExp = RegExp(/[/]?adv3[Ll]ite[/]|\\?adv3[Ll]ite\\/);
const adv3PathRegExp = RegExp(/[/]?adv3[/]|\\?adv3\\/);
const generalHeaderIncludeRegExp = RegExp(/tads3[/]include[/]|tads3\\include\\/);


const SLOW_FILE_THRESHOLD_MS = 5000;
const WORKER_TIMEOUT_MS = 120_000; // 2 minutes — if a file takes longer, skip it


/**
 * Reads and parses the makefile to get additional information
 * such as which library it uses, paths, flags etc..
 * @param chosenMakefileUri
 */
function analyzeMakefile(chosenMakefileUri: string) {
  const makefileString = readFileSync(chosenMakefileUri).toString();
  const makeFileArray = makefileString.split(/\r?\n/);
  const makefileArray = [];
  for (const row of makeFileArray) {
    if (row.trimLeft().startsWith("#")) {
      continue;
    }
    const [key, value] = row.replace("  ", " ").split(" ");
    if (key && value) {
      makefileArray.push({ key, value });
    }
  }
  connection.console.debug(`Done analyzing makefile`);
  return makefileArray;
}

function logParseInfo(parseInfo: any) {
  if (!parseInfo) return;
  const { fileName, totalTimeMs, lexTimeMs, parseTimeMs, walkTimeMs, textLength, symbolCount, errorNodeCount, warnings, walkError, parsingMode } = parseInfo;
  connection.console.log(
    `[parse] ${fileName}: ${totalTimeMs}ms total (lex: ${lexTimeMs}ms, parse: ${parseTimeMs}ms, walk: ${walkTimeMs}ms) | mode: ${parsingMode} | ${textLength} chars, ${symbolCount} symbols${errorNodeCount > 0 ? `, ${errorNodeCount} error nodes` : ""}`
  );
  if (totalTimeMs > SLOW_FILE_THRESHOLD_MS) {
    connection.console.warn(
      `[parse] SLOW FILE: ${fileName} took ${totalTimeMs}ms (threshold: ${SLOW_FILE_THRESHOLD_MS}ms)`
    );
  }
  if (errorNodeCount > 0) {
    connection.console.warn(
      `[parse] ${fileName} had ${errorNodeCount} ANTLR error nodes — grammar may not fully cover this file`
    );
  }
  if (warnings && warnings.length > 0) {
    for (const warning of warnings) {
      connection.console.warn(`[parse] ${warning}`);
    }
  }
  if (walkError) {
    connection.console.error(`[parse] ${walkError}`);
  }
}

export function isUsingAdv3Lite(): boolean {
  return usingAdv3Lite;
}

/**
 *
 * @param globalStoragePath - no need yet, since tads2 projects are fairly fast to compile. We don't need to cache objects
 * @param mainFileLocation
 * @param token
 * @returns
 */
export async function preprocessAndParseTads2Files(
  globalStoragePath: string,
  mainFileLocation: string,
  filePaths: string[] | undefined,
  token: any,
) {
  try {
    const t2PreprocessorPath: string =
      (await connection.workspace.getConfiguration("tads.preprocessor.path")) ?? "t3make";
    const libFolder: string =
      (await connection.workspace.getConfiguration("tads2.library.path")) ?? "/usr/local/share/frobtads/tads2/";
    await preprocessTads2Files(
      mainFileLocation,
      serverState.preprocessedFilesCacheMap,
      t2PreprocessorPath,
      [libFolder],
      connection,
    );
    await connection.sendNotification("response/preprocessed/list", [...serverState.preprocessedFilesCacheMap.keys()]);
  } catch (error: any) {
    connection.console.error(error.message);
    await connection.sendNotification("symbolparsing/allfiles/failed", {
      error: error.message,
    });
    return;
  }
  parseTads2Files(filePaths);
}

/**
 *
 * @param makefileLocation string holding the file location of the makefile
 * @param filePaths string array of files to parse, "undefined" means parse all files
 * @param token CancellationToken
 */
export async function preprocessAndParseTads3Files(
  globalStoragePath: string,
  makefileLocation: string,
  filePaths: string[] | undefined,
  token: any,
  useCachedLibrary: boolean
) {
  if (lastMakeFileLocation !== makefileLocation) {
    lastMakeFileLocation = makefileLocation;
    makefileStructure = analyzeMakefile(makefileLocation);
    usingAdv3Lite = !!makefileStructure?.find(
      (keyvalue) => keyvalue.key.match(/-lib/) && keyvalue.value.match(adv3LitePathRegExp),
    );
    connection.console.debug("Project using " + (usingAdv3Lite ? "adv3Lite" : "standard adv3 library"));
    await connection.sendNotification("response/makefile/keyvaluemap", {
      makefileStructure,
      usingAdv3Lite,
    });
  }

  if (globalStoragePath) {
    ensureDirSync(globalStoragePath);
    connection.console.debug(`Ensuring "${globalStoragePath}" exists`);
    ensureDirSync(path.join(globalStoragePath, ".cache"));
    const library = usingAdv3Lite ? "adv3Lite" : "adv3";
    globalStorageCachePath = path.join(globalStoragePath, ".cache", library);

    connection.console.debug(`Ensuring "${globalStorageCachePath}" exists`);
    ensureDirSync(globalStorageCachePath);
  }

  try {
    const t3makeCompilerPath: string = (await connection.workspace.getConfiguration("tads3.compiler.path")) ?? "t3make";
    await preprocessTads3Files(makefileLocation, serverState.preprocessedFilesCacheMap, t3makeCompilerPath, connection);
  } catch (error: any) {
    connection.console.error(error.message);
    await connection.sendNotification("symbolparsing/allfiles/failed", {
      error: error.message,
    });
    return;
  }

  await connection.sendNotification("response/preprocessed/list", [...serverState.preprocessedFilesCacheMap.keys()]);

  let allFilePaths = filePaths;

  // Parse project files close to the makefile first:
  const baseDir = Utils.dirname(URI.file(makefileLocation)).fsPath;
  connection.console.debug(`Setting up base directory for project: ${baseDir}`); // Default 6 threads

  if (filePaths === undefined) {
    initialParsing = true;
    allFilePaths = [...serverState.preprocessedFilesCacheMap.keys()];

    // Sort by size, size ordering, the largest files goes first:
    allFilePaths = allFilePaths.sort((a: string, b: string) => statSync(b).size - statSync(a).size);

    // Then sort out all files in the project directory first:
    allFilePaths = allFilePaths.sort((a: string, b: string) => {
      if (a.startsWith(baseDir)) {
        return -1;
      }
      return 0;
    });
  }
  if (allFilePaths === undefined) {
    connection.console.error(`No files found to parse`);
    await connection.sendNotification("symbolparsing/allfiles/failed", {
      error: `No files found to parse`,
    });
    return;
  }

  const configuration = await connection.workspace.getConfiguration("tads3");
  const maxNumberOfParseWorkerThreads = configuration["maxNumberOfParseWorkerThreads"];
  const parseOnlyTheWorkspaceFiles = configuration["parseOnlyTheWorkspaceFiles"];
  const useExperimentalParser = configuration["useExperimentalParser"] !== false;
  const workerPath = useExperimentalParser ? "./workerV2" : "./worker";

  if (parseOnlyTheWorkspaceFiles) {
    allFilePaths = allFilePaths.filter((x) => x.startsWith(baseDir));
    connection.console.debug(`Only parses files with base directory: ${baseDir}`); // Default 6 threads
    connection.console.debug(`****\n${allFilePaths.map((x) => basename(x)).join("\n")}****\n`);
  }
  if (allFilePaths.length === 0) {
    connection.console.debug(`No files to parse. Aborting operation`);
    await connection.sendNotification("symbolparsing/allfiles/failed", {
      error: `No files to parse. Aborting operation`,
    });
    return;
  }

  // Temporary, just the first files to speed up during development
  // allFilePaths = allFilePaths.splice(0,14);
  const totalFiles = allFilePaths?.length;
  let tracker = 0;

  symbolManager.parsingInProgress = true;

  // Spawn a single worker if only one file is to be parsed
  if (allFilePaths.length === 1) {
    const filePath = allFilePaths[0];
    const startTime = Date.now();
    connection.console.debug(`Spawning worker to parse a single file: ${filePath}`);
    await connection.sendNotification("symbolparsing/processing", [filePath, 0, totalFiles, 1]);
    const worker = await spawn(new Worker(workerPath));
    const text = serverState.preprocessedFilesCacheMap.get(filePath) ?? "";
    const jobResult = await worker(filePath, text);
    connection.console.debug(`Worker finished with result`);
    const {
      symbols,
      keywords,
      propertyValues,
      templateItems,
      mapData,
      additionalProperties,
      inheritanceMap,
      assignmentStatements,
      expressionSymbols,
      scopes,
      parseInfo,
    } = jobResult;

    logParseInfo(parseInfo);

    symbolManager.symbols.set(filePath, symbols ?? []);
    symbolManager.notifySymbolsReady(filePath);
    symbolManager.keywords.set(filePath, keywords ?? []);
    symbolManager.assignmentStatements, expressionSymbols.set(filePath, assignmentStatements, expressionSymbols ?? []);
    symbolManager.expressionSymbols.set(filePath, expressionSymbols);
    if (propertyValues) symbolManager.propertyValues.set(filePath, propertyValues);
    if (templateItems) symbolManager.templateItems.set(filePath, templateItems);
    if (scopes) symbolManager.fileScopes.set(filePath, scopes);

    inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
    mapData.forEach((value: any, key: string) => symbolManager.mapData.set(key, value));

    clearCompletionCache();
    symbolManager.additionalProperties.set(filePath, additionalProperties);
    tracker++;
    const elapsedTime = Date.now() - startTime;
    symbolManager.parsingInProgress = false;
    await connection.sendNotification("symbolparsing/success", [filePath, tracker, totalFiles, 1]);
    connection.console.debug(`${filePath} parsed successfully in ${elapsedTime} ms`);
    try {
      await Thread.terminate(worker);
      connection.console.debug(`[worker unassigned]`);
    } catch (err) {
      connection.console.error(`Error during thread termination: ${err}`);
    }

    // Setup a WorkerPool if we have a collection of files to parse
  } else {
    connection.console.debug(`Preparing to parse a total of ${allFilePaths.length} files`);
    const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;
    connection.console.debug(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads

    const workerPool = Pool(() => spawn(new Worker(workerPath)), poolSize);

    const libraryFilePaths = filterForStandardLibraryFiles([...serverState.preprocessedFilesCacheMap.keys()]);

    // Track which files are currently being parsed by worker threads
    const inFlightFiles = new Set<string>();
    const inFlightStartTimes = new Map<string, number>();

    // Stall detection: periodically log files that have been parsing for a long time
    const STALL_CHECK_INTERVAL_MS = 15_000;
    const STALL_WARN_THRESHOLD_MS = 30_000;
    const stallCheckTimer = setInterval(() => {
      const now = Date.now();
      for (const [file, start] of inFlightStartTimes) {
        const elapsed = now - start;
        if (elapsed > STALL_WARN_THRESHOLD_MS) {
          connection.console.warn(
            `[parse] STALL WARNING: ${file} has been parsing for ${Math.round(elapsed / 1000)}s`
          );
        }
      }
    }, STALL_CHECK_INTERVAL_MS);

    try {
      const startTime = Date.now();
      let cachedFiles = new Set();

      if (initialParsing && useCachedLibrary) {
        cachedFiles = importLibrarySymbols(libraryFilePaths, "__symbols.json", (filePath: string, data: any) => {
          const symbols: DocumentSymbol[] = JSON.parse(data);
          symbolManager.symbols.set(filePath, symbols);
        });

        importLibraryKeywords(libraryFilePaths, "__keywords.json", (filePath: string, data: any) => {
          const keywords: any = new Map(JSON.parse(data));
          symbolManager.keywords.set(filePath, keywords);
        });

        importInheritanceMap((data: any) => {
          const inheritanceMap: Map<string, string> = new Map(JSON.parse(data));
          symbolManager.inheritanceMap = inheritanceMap;
        });

        const elapsedCacheReadTime = Date.now() - startTime;
        connection.console.debug(`Cached library files took ${elapsedCacheReadTime} ms to read`);
      }

      for (const filePath of allFilePaths) {
        connection.console.debug(`Queuing parsing job ${filePath}`);

        // Only use cached values herein:
        if (!cachedFiles.has(filePath)) {
          workerPool.queue(async (parseJob) => {
            const fileBaseName = basename(filePath);
            inFlightFiles.add(fileBaseName);
            inFlightStartTimes.set(fileBaseName, Date.now());
            connection.console.log(`[parse] STARTED: ${fileBaseName} (in-flight: ${[...inFlightFiles].join(", ")})`);
            await connection.sendNotification("symbolparsing/processing", [filePath, tracker, totalFiles, poolSize, [...inFlightFiles]]);

            const text = serverState.preprocessedFilesCacheMap.get(filePath) ?? "";
            const fileStartTime = Date.now();

            // Race the parse job against a timeout so a stuck file doesn't block forever
            const timeoutPromise = new Promise<never>((_, reject) => {
              setTimeout(() => reject(new Error(
                `TIMEOUT after ${WORKER_TIMEOUT_MS / 1000}s parsing ${fileBaseName} (${text.length} chars)`
              )), WORKER_TIMEOUT_MS);
            });

            try {
              const {
                symbols,
                keywords,
                propertyValues,
                templateItems,
                mapData,
                additionalProperties,
                inheritanceMap,
                assignmentStatements,
                expressionSymbols,
                scopes,
                parseInfo,
              } = await Promise.race([parseJob(filePath, text), timeoutPromise]);

              logParseInfo(parseInfo);

              symbolManager.symbols.set(filePath, symbols ?? []);
              symbolManager.notifySymbolsReady(filePath);
              symbolManager.keywords.set(filePath, keywords ?? []);
              symbolManager.assignmentStatements.set(filePath, assignmentStatements ?? []);
              symbolManager.expressionSymbols.set(filePath, expressionSymbols ?? []);
              if (propertyValues) symbolManager.propertyValues.set(filePath, propertyValues);
              if (templateItems) symbolManager.templateItems.set(filePath, templateItems);
              if (scopes) symbolManager.fileScopes.set(filePath, scopes);

              inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
              mapData.forEach((value: any, key: string) => symbolManager.mapData.set(key, value));

              symbolManager.additionalProperties.set(filePath, additionalProperties);
            } catch (err) {
              const elapsed = Date.now() - fileStartTime;
              connection.console.error(`[parse] FAILED: ${fileBaseName} after ${elapsed}ms — ${err}`);
            }

            inFlightFiles.delete(fileBaseName);
            inFlightStartTimes.delete(fileBaseName);
            tracker++;
            await connection.sendNotification("symbolparsing/success", [filePath, tracker, totalFiles, poolSize, [...inFlightFiles]]);
            connection.console.log(`[parse] FINISHED: ${fileBaseName} (${tracker}/${totalFiles}, remaining in-flight: ${inFlightFiles.size > 0 ? [...inFlightFiles].join(", ") : "none"})`);
          });
        } else {
          tracker++;
          await connection.sendNotification("symbolparsing/success", [filePath, tracker, totalFiles, poolSize, []]);
          connection.console.debug(`${filePath} cached restored successfully`);
        }
      }
      clearCompletionCache();

      try {
        await workerPool.completed();
        await workerPool.terminate();
      } catch (err) {
        connection.console.error(`Error happened during awaiting pool completion/termination: ` + err);
      } finally {
        clearInterval(stallCheckTimer);
      }

      const elapsedTime = Date.now() - startTime;
      connection.console.debug(`All files parsed within ${elapsedTime} ms`);
      symbolManager.parsingInProgress = false;
      await await connection.sendNotification("symbolparsing/allfiles/success", { allFilePaths, elapsedTime });

      if (initialParsing) {
        const startTime = Date.now();
        exportLibrarySymbols(libraryFilePaths, symbolManager.symbols, usingAdv3Lite);
        exportLibraryKeywords(libraryFilePaths, symbolManager.keywords, usingAdv3Lite);
        exportInheritanceMap(symbolManager.inheritanceMap);
        const elapsedCacheReadTime = Date.now() - startTime;
        connection.console.debug(`Cached library files export took ${elapsedCacheReadTime} ms to write`);
      }
      initialParsing = false;
    } catch (err) {
      clearInterval(stallCheckTimer);
      await workerPool.terminate();
      symbolManager.parsingInProgress = false;
      connection.console.error(`Error happened during parsing of files: ${err}`);
      await connection.sendNotification("symbolparsing/allfiles/failed", allFilePaths);
    }
  }
}

function exportLibrarySymbols(
  libraryFilePaths: string[],
  symbols: Map<string, DocumentSymbol[]>|CaseInsensitiveMap<string, DocumentSymbol[]>,
  usingAdv3Lite: boolean,
) {
  const librarySymbols = new Map();
  for (const file of libraryFilePaths) {
    librarySymbols.set(file, symbols.get(file));
  }
  for (const libraryPath of librarySymbols.keys()) {
    const value = librarySymbols.get(libraryPath);
    const fileNameStr = `${basename(libraryPath)}__symbols.json`;
    if (globalStorageCachePath) {
      const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
      try {
        ensureFileSync(libraryCacheFilePath);
        writeFileSync(libraryCacheFilePath, JSON.stringify(value).toString());
        connection.console.debug(`Cached symbols exported for ${libraryPath} to ${libraryCacheFilePath}`);
      } catch (err) {
        connection.console.error(`Caching failed for ${libraryPath}: \n` + err);
      }
    }
  }
}

function exportLibraryKeywords(
  libraryFilePaths: string[],
  keywords: Map<string, Map<string, Range[]>> | CaseInsensitiveMap<string, Map<string, Range[]>>,
  usingAdv3Lite: boolean,
) {
  const libraryKeywords = new Map();
  for (const file of libraryFilePaths) {
    libraryKeywords.set(file, keywords.get(file));
  }
  if (globalStorageCachePath) {
    for (const libraryKeywordPath of libraryKeywords.keys()) {
      const keywordRangeMap = libraryKeywords.get(libraryKeywordPath);
      if (keywordRangeMap) {
        const keywordRangeMapArray = [...keywordRangeMap];
        try {
          const fileNameStr = `${basename(libraryKeywordPath)}__keywords.json`;
          const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
          ensureFileSync(libraryCacheFilePath);
          writeFileSync(libraryCacheFilePath, JSON.stringify(keywordRangeMapArray).toString());
          connection.console.debug(`Cached keywords exported for ${libraryKeywordPath} to ${libraryCacheFilePath}`);
        } catch (err) {
          connection.console.error(`Error happened during export of keywords: ${err}`);
        }
      }
    }
  }
}

function exportInheritanceMap(inheritanceMap: Map<string, string>) {
  if (globalStorageCachePath) {
    const inheritanceMapArray = [...inheritanceMap];
    try {
      const fileNameStr = `inheritance__map.json`;
      const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
      ensureFileSync(libraryCacheFilePath);
      writeFileSync(libraryCacheFilePath, JSON.stringify(inheritanceMapArray).toString());
      connection.console.debug(`Cached inheritancemap to ${libraryCacheFilePath}`);
    } catch (err) {
      connection.console.error(`Error happened during export: ${err}`);
    }
  }
}

function importLibrarySymbols(libraryFilePaths: string[], fileSuffix: string, callback: any) {
  const cachedFiles = new Set();
  if (globalStorageCachePath) {
    for (const librarySymbolPath of libraryFilePaths) {
      if (!existsSync(librarySymbolPath)) {
        continue;
      }
      try {
        const fileNameStr = `${basename(librarySymbolPath)}${fileSuffix}`;
        const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
        if (!existsSync(libraryCacheFilePath)) {
          continue;
        }
        const data = readFileSync(libraryCacheFilePath).toString();
        callback(librarySymbolPath, data);
        connection.console.debug(`Cached symbols filed used for "${librarySymbolPath}"`);
        cachedFiles.add(librarySymbolPath);
      } catch (err) {
        connection.console.error(`Error happened during import of symbols: ${err}`);
      }
    }
  }
  return cachedFiles;
}

// TODO: (combine to make one method out of these two)
function importLibraryKeywords(libraryFilePaths: string[], fileSuffix: string, callback: any) {
  const cachedFiles = new Set();
  if (globalStorageCachePath) {
    for (const libraryKeywordPath of libraryFilePaths) {
      if (!existsSync(libraryKeywordPath)) {
        continue;
      }
      try {
        const fileNameStr = `${basename(libraryKeywordPath)}${fileSuffix}`;
        const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
        if (!existsSync(libraryCacheFilePath)) {
          continue;
        }
        const data = readFileSync(libraryCacheFilePath).toString();
        callback(libraryKeywordPath, data);
        connection.console.debug("Cached symbols filed used for" + libraryKeywordPath);
        cachedFiles.add(libraryCacheFilePath);
      } catch (err) {
        connection.console.error(`Error happened during import of symbols: ${err}`);
      }
    }
  }
  return cachedFiles;
}

function importInheritanceMap(callback: any) {
  if (globalStorageCachePath) {
    try {
      const fileNameStr = `inheritance__map.json`;
      const filePath = path.join(globalStorageCachePath, fileNameStr).toString();
      if (!existsSync(filePath)) {
        connection.console.debug(`No inheritance map cache exists ${filePath}`);
        return;
      }
      const data = readFileSync(filePath).toString();
      callback(data);
      connection.console.debug("Cached symbols filed used for" + filePath);
    } catch (err) {
      connection.console.error(`Error happened during import of symbols: ${err}`);
    }
  }
}
