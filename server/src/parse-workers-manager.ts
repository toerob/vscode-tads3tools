import { DocumentSymbol, Range, TextDocuments } from 'vscode-languageserver/node';
import { preprocessAllFiles } from './parser/preprocessor';
import { statSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { spawn, Pool, Worker, Thread } from 'threads';
import { preprocessedFilesCacheMap, connection, symbolManager } from './server';
import { clearCompletionCache } from './modules/completions';
import { basename, dirname } from 'path';
import * as path from 'path';
import { ensureDirSync } from 'fs-extra';
import { TextDocument } from 'vscode-languageserver-textdocument';


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
		if (row.trimLeft().startsWith('#')) {
			continue;
		}
		const [key, value] = row.replace('  ', ' ').split(' ');
		if (key && value) {
			makefileArray.push({ key, value });
		}
	}
	connection.console.log(`Done analyzing makefile`);
	return makefileArray;
}

let lastMakeFileLocation: string | undefined;
let makefileStructure;
let usingAdv3Lite = false;

export function isUsingAdv3Lite(): boolean {
	return usingAdv3Lite;
}

let initialParsing = true;

let globalStorageCachePath: string | undefined;

const adv3LitePathRegExp = RegExp(/[/]?adv3[Ll]ite[/]|\\?adv3[Ll]ite\\/);

const adv3PathRegExp = RegExp(/[/]?adv3[/]|\\?adv3\\/);

const generalHeaderIncludeRegExp = RegExp(/tads3[/]include[/]|tads3\\include\\/);

const useCachedLibrary = true;

/**
 * 
 * @param makefileLocation string holding the file location of the makefile
 * @param filePaths string array of files to parse, "undefined" means parse all files
 * @param token CancellationToken
 */
export async function preprocessAndParseFiles(globalStoragePath: string, makefileLocation: string, filePaths: string[] | undefined, token: any) {

	if (lastMakeFileLocation !== makefileLocation) {
		lastMakeFileLocation = makefileLocation;
		makefileStructure = analyzeMakefile(makefileLocation);
		usingAdv3Lite = !!makefileStructure?.find(keyvalue => keyvalue.key.match(/-lib/) && keyvalue.value.match(adv3LitePathRegExp)) ?? false;
		connection.console.log('Project using ' + (usingAdv3Lite ? 'adv3Lite' : 'standard adv3 library'));
		connection.sendNotification('response/makefile/keyvaluemap', { makefileStructure, usingAdv3Lite });
	}

	if (globalStoragePath) {
		ensureDirSync(globalStoragePath);
		connection.console.log(`Ensuring "${globalStoragePath}" exists`);
		ensureDirSync(path.join(globalStoragePath, '.cache'));
		const library = usingAdv3Lite ? 'adv3Lite' : 'adv3';
		globalStorageCachePath = path.join(globalStoragePath, '.cache', library);

		connection.console.log(`Ensuring "${globalStorageCachePath}" exists`);
		ensureDirSync(globalStorageCachePath);
	}

	try {
		await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);
	} catch (error:any) {
		connection.console.error(error.message);
		connection.sendNotification('symbolparsing/allfiles/failed', { error: error.message });
		return;
	}

	connection.sendNotification('response/preprocessed/list', [...preprocessedFilesCacheMap.keys()]);

	let allFilePaths = filePaths;

	// Parse project files close to the makefile first:
	const baseDir = Utils.dirname(URI.parse(makefileLocation)).fsPath;

	if (filePaths === undefined) {
		initialParsing = true;
		allFilePaths = [...preprocessedFilesCacheMap.keys()];

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
		connection.sendNotification('symbolparsing/allfiles/failed', { error: `No files found to parse` });
		return;
	}

	const maxNumberOfParseWorkerThreads: number = await connection.workspace.getConfiguration("tads3.maxNumberOfParseWorkerThreads");

	const parseOnlyTheWorkspaceFiles: boolean = await connection.workspace.getConfiguration("tads3.parseOnlyTheWorkspaceFiles");

	if (parseOnlyTheWorkspaceFiles) {
		allFilePaths = allFilePaths.filter(x => x.startsWith(baseDir));
		connection.console.log(`Only parses files with base directory: ${baseDir}`); // Default 6 threads
		connection.console.log(`****\n${allFilePaths.map(x => basename(x)).join('\n')}****\n`);
	}
	if (allFilePaths.length === 0) {
		connection.console.log(`No files to parse. Aborting operation`);
		connection.sendNotification('symbolparsing/allfiles/failed', {error: `No files to parse. Aborting operation`});
		return;
	}


	// Temporary, just the first files to speed up during development
	// allFilePaths = allFilePaths.splice(0,14);
	const totalFiles = allFilePaths?.length;
	let tracker = 0;

	// Spawn a single worker if only one file is to be parsed
	if (allFilePaths.length === 1) {
		const filePath = allFilePaths[0];
		const startTime = Date.now();
		connection.console.log(`Spawning worker to parse a single file: ${filePath}`);
		const worker = await spawn(new Worker('./worker'));
		const text = preprocessedFilesCacheMap.get(filePath) ?? '';
		const jobResult = await worker(filePath, text);
		connection.console.log(`Worker finished with result`);
		const { symbols, keywords, additionalProperties, inheritanceMap } = jobResult;
		symbolManager.symbols.set(filePath, symbols ?? []);
		symbolManager.keywords.set(filePath, keywords ?? []);
		inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));

		clearCompletionCache();
		symbolManager.additionalProperties.set(filePath, additionalProperties);
		tracker++;
		const elapsedTime = Date.now() - startTime;
		connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles, 1]);
		connection.console.log(`${filePath} parsed successfully in ${elapsedTime} ms`);
		try {
			await Thread.terminate(worker);
			connection.console.log(`(worker terminated)`);
		} catch (err) {
			connection.console.error(`Error during thread termination: ${err}`);
		}

		// Setup a WorkerPool if we have a collection of files to parse
	} else {
		connection.console.log(`Preparing to parse a total of ${allFilePaths.length} files`);
		const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;
		connection.console.log(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads

		const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);

		const libraryFilePaths = filterForLibraryFiles([...preprocessedFilesCacheMap.keys()]);

		try {
			const startTime = Date.now();
			let cachedFiles = new Set();

			if (initialParsing && useCachedLibrary) {


				cachedFiles = importLibrarySymbols(libraryFilePaths, '__symbols.json', (filePath: string, data: any) => {
					const symbols: DocumentSymbol[] = JSON.parse(data);
					symbolManager.symbols.set(filePath, symbols);
				});

				importLibraryKeywords(libraryFilePaths, '__keywords.json', (filePath: string, data: any) => {
					const keywords: any = new Map(JSON.parse(data));
					symbolManager.keywords.set(filePath, keywords);
				});

				importInheritanceMap((data: any) => {
					const inheritanceMap: Map<string, string> = new Map(JSON.parse(data));
					symbolManager.inheritanceMap = inheritanceMap;
				});

				const elapsedCacheReadTime = Date.now() - startTime;
				connection.console.log(`Cached library files took ${elapsedCacheReadTime} ms to read`);
			}

			for (const filePath of allFilePaths) {
				connection.console.log(`Queuing parsing job ${filePath}`);

				// Only use cached values 
				if (!cachedFiles.has(filePath)) {
					workerPool.queue(async (parseJob) => {

						//TODO consider report file before processing it: 
						// e.g connection.sendNotification('symbolparsing/processing', [filePath, tracker, totalFiles, poolSize]);
						const text = preprocessedFilesCacheMap.get(filePath) ?? '';
						const { symbols, keywords, additionalProperties, inheritanceMap } = await parseJob(filePath, text);

						symbolManager.symbols.set(filePath, symbols ?? []);
						symbolManager.keywords.set(filePath, keywords ?? []);
						inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));

						clearCompletionCache();
						symbolManager.additionalProperties.set(filePath, additionalProperties);
						tracker++;
						connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles, poolSize]);
						connection.console.log(`${filePath} parsed successfully`);
					});
				} else {
					tracker++;
					connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles, poolSize]);
					connection.console.log(`${filePath} cached restored successfully`);
				}


			}

			try {
				//workerPool.events.length
				await workerPool.completed();
				await workerPool.terminate();
			} catch (err) {
				connection.console.error(`Error happened during awaiting pool completion/termination: ` + err);
			}




			const elapsedTime = Date.now() - startTime;
			console.log(`All files parsed within ${elapsedTime} ms`);
			connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });

			if (initialParsing) {
				const startTime = Date.now();

				//const libraryFilePaths = filterForLibraryFiles([...preprocessedFilesCacheMap.keys()]);

				exportLibrarySymbols(libraryFilePaths, symbolManager.symbols, usingAdv3Lite);
				exportLibraryKeywords(libraryFilePaths, symbolManager.keywords, usingAdv3Lite);
				exportInheritanceMap(symbolManager.inheritanceMap);

				// TODO: inheritanceMap must be exported to

				const elapsedCacheReadTime = Date.now() - startTime;
				connection.console.log(`Cached library files export took ${elapsedCacheReadTime} ms to write`);
			}
			initialParsing = false;

		} catch (err) {
			await workerPool.terminate();
			connection.console.error(`Error happened during parsing of files: ${err}`);
			connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
		}
	}
}

function exportLibrarySymbols(libraryFilePaths: string[], symbols: Map<string, DocumentSymbol[]>, usingAdv3Lite: boolean) {
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
				writeFileSync(libraryCacheFilePath, JSON.stringify(value).toString());
				connection.console.log(`Cached symbols exported for ${libraryPath} to ${libraryCacheFilePath}`);
			} catch (err) {
				connection.console.error(`Caching failed for ${libraryPath}: \n` + err);
			}
		}
	}
}

function exportLibraryKeywords(libraryFilePaths: string[], keywords: Map<string, Map<string, Range[]>>, usingAdv3Lite: boolean) {
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
					writeFileSync(libraryCacheFilePath, JSON.stringify(keywordRangeMapArray).toString());
					connection.console.log(`Cached keywords exported for${libraryKeywordPath} to ${libraryCacheFilePath}`);
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
			writeFileSync(libraryCacheFilePath, JSON.stringify(inheritanceMapArray).toString());
			connection.console.log(`Cached inheritancemap to ${libraryCacheFilePath}`);
		} catch (err) {
			connection.console.error(`Error happened during export: ${err}`);
		}
	}
}

function importLibrarySymbols(libraryFilePaths: string[], fileSuffix: string, callback: any) {
	const cachedFiles = new Set();
	if (globalStorageCachePath) {
		for (const librarySymbolPath of libraryFilePaths) {
			if (!existsSync(librarySymbolPath)) { continue; }
			try {
				const fileNameStr = `${basename(librarySymbolPath)}${fileSuffix}`;
				const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
				const data = readFileSync(libraryCacheFilePath).toString();
				callback(librarySymbolPath, data);
				connection.console.log(`Cached symbols filed used for "${librarySymbolPath}"`);
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
			if (!existsSync(libraryKeywordPath)) { continue; }
			try {
				const fileNameStr = `${basename(libraryKeywordPath)}${fileSuffix}`;
				const libraryCacheFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
				const data = readFileSync(libraryCacheFilePath).toString();
				callback(libraryKeywordPath, data);
				//const keywords:any = new Map(JSON.parse(data));
				//symbolManager.keywords.set(libraryKeywordPath, keywords);		

				connection.console.log('Cached symbols filed used for' + libraryKeywordPath);
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
			const data = readFileSync(filePath).toString();
			callback(data);
			connection.console.log('Cached symbols filed used for' + filePath);
		} catch (err) {
			connection.console.error(`Error happened during import of symbols: ${err}`);
		}
	}
}

/*
function importFromFileSuffix(fileSuffix: string, callback:any) {
	const filePaths = filterForLibraryFiles([...preprocessedFilesCacheMap.keys()]);
	const cachedFiles = new Set();
	if(globalStorageCachePath) {
		for(const fp of filePaths) {
			if(!existsSync(fp)) { continue;}
			try {
				const fileNameStr = `${basename(fp)}${fileSuffix}`;
				const cachedFilePath = path.join(globalStorageCachePath, fileNameStr).toString();
				const data = readFileSync(cachedFilePath).toString();
				callback(fp, data);
				connection.console.log('Cached symbols filed used for' + fp);
				cachedFiles.add(cachedFilePath);
			} catch (err) {
				connection.console.error(`Error happened during import: ${err}`);
			}

		}
	}
	return cachedFiles;
}*/


function filterForLibraryFiles(array: string[]): string[] {

	// Locate a common file used in both an adv3 or adv3Lite project: "tads.h"
	// Comparison needs to be done using URI to match windows file path system also
	const fileFoundInBothAdv3AndAdv3Lite = array.find(x => {
		return URI.file(x).path.match(/include[/]tads.h$/);
	});

	// Now that we know the location of that file, we can better guess 
	// the location of all tads3 standard library files by using the parent directory
	// as a base directory:
	if (fileFoundInBothAdv3AndAdv3Lite) {
		const commonIncludePath = dirname(fileFoundInBothAdv3AndAdv3Lite);
		const commonBaseDirectory = path.join(commonIncludePath, '..');
		return array.filter((x: string) => x.startsWith(commonBaseDirectory));
	} 

	return [];
}