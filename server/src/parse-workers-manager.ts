import { CancellationTokenSource, DocumentSymbol,Range } from 'vscode-languageserver/node';
import { preprocessAllFiles } from './parser/preprocessor';
import { statSync, readFileSync, writeSync, writeFileSync } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { spawn, Pool, Worker } from 'threads';
import { abortParsingProcess, preprocessedFilesCacheMap, connection, symbolManager, documents } from './server';
import { clearCompletionCache } from './modules/completions';
import { basename, dirname } from 'path';
import { identity } from 'underscore';
import { Tads3SymbolManager } from './modules/symbol-manager';
import path = require('path');
import { start } from 'repl';


/**
 * Reads and parses the makefile to get additional information
 * such as which library it uses, paths, flags etc..
 * @param chosenMakefileUri 
 */
 function analyzeMakefile(chosenMakefileUri: string) {
	const makefileString = readFileSync(chosenMakefileUri).toString();
	const makeFileArray = makefileString.split(/\r?\n/);
	const makefileArray = [];
	for(const row of makeFileArray) {
		if(row.trimLeft().startsWith('#')) {
			continue;
		}
		const [key,value]= row.replace('  ',' ').split(' ');
		if(key && value) {
			makefileArray.push({key,value});
		}
	}
	/*makefileArray.forEach((keyvalue,index)=> {
		//

	});*/

	console.log(`Done!`);
	return makefileArray;
}

let lastMakeFileLocation: string|undefined;
let makefileStructure;
let usingAdv3Lite = false;

export function isUsingAdv3Lite(): boolean {
	return usingAdv3Lite;
}

let initialParsing = true;

/**
 * 
 * @param makefileLocation string holding the file location of the makefile
 * @param filePaths string array of files to parse, "undefined" means parse all files
 * @param token CancellationToken
 */
export async function preprocessAndParseFiles(makefileLocation: string, filePaths: string[]|undefined, token: any) {

	if(lastMakeFileLocation !== makefileLocation) {
		lastMakeFileLocation = makefileLocation;
		makefileStructure = analyzeMakefile(makefileLocation);
		usingAdv3Lite = !!makefileStructure?.find(keyvalue=> keyvalue.value.includes('adv3lite')) ?? false;
		connection.sendNotification('response/makefile/keyvaluemap', {makefileStructure, usingAdv3Lite});
	} 


	await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);
	connection.sendNotification('response/preprocessed/list', [...preprocessedFilesCacheMap.keys()]);

	let allFilePaths = filePaths;

	// Parse project files close to the makefile first:
	const baseDir = Utils.dirname(URI.parse(makefileLocation)).fsPath;

	if (filePaths === undefined) {
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
		console.error(`No files found to parse`);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
		return;
	}
    connection.console.log(`Preparing to parse a total of ${allFilePaths.length} files`);

    const maxNumberOfParseWorkerThreads:number = await connection.workspace.getConfiguration("tads3.maxNumberOfParseWorkerThreads");

	const parseOnlyTheWorkspaceFiles:boolean = await connection.workspace.getConfiguration("tads3.parseOnlyTheWorkspaceFiles");
	if(parseOnlyTheWorkspaceFiles) {
		connection.console.log(`TODO: Skips library files during parsing.`); // Default 6 threads
		console.log(dirname(makefileLocation));
		//const workspaceDirectory = dirname(makefileLocation);
		allFilePaths = allFilePaths.filter(x=>x.startsWith(baseDir));
		connection.console.log(`Only parses files with base directory: ${baseDir}`); // Default 6 threads
		connection.console.log(`****\n${allFilePaths.map(x=>basename(x)).join('\n')}****\n`);
	}
	if (allFilePaths.length === 0) {
		connection.console.log(`No files to parse. Aborting operation`);
		return;
	}


	// Temporary, just the first files to speed up
	//allFilePaths = allFilePaths.splice(0,3);
	const totalFiles = allFilePaths?.length;
	let tracker = 0;

	const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;

	connection.console.log(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads

	const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);
	try {
		const startTime = Date.now();


		// TODO: export and import additionalProperties as well (mash it with symbols on import and then extract on export)

		if(initialParsing) {
			// TODO: create folder for cache
			//let createdProjectObjFolder = path.join(createdProjectFolder, '.cache');
			//ensureDirSync(createdProjectFolder);
			importLibrarySymbols(symbolManager.symbols, usingAdv3Lite);
			importLibraryKeywords(symbolManager.keywords, usingAdv3Lite);
			const elapsedCacheReadTime = Date.now() - startTime;
			connection.console.log(`Cached library files took ${elapsedCacheReadTime} ms to read`);
		}


		for (const filePath of allFilePaths) {
			connection.console.log(`Queuing parsing job ${filePath}`);

			// Only use cached values 
			if(initialParsing && !symbolManager.symbols.has(filePath)) {
				workerPool.queue(async (parseJob) => {

					//TODO consider report file before processing it: 
					// e.g connection.sendNotification('symbolparsing/processing', [filePath, tracker, totalFiles, poolSize]);
					const text = preprocessedFilesCacheMap.get(filePath) ?? '';
					const { symbols, keywords, additionalProperties} = await parseJob(filePath, text);

					symbolManager.symbols.set(filePath, symbols);
					symbolManager.keywords.set(filePath, keywords);

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


		await workerPool.completed();
		await workerPool.terminate();
		const elapsedTime = Date.now() - startTime;
		console.log(`All files parsed within ${elapsedTime} ms`);
		connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });

		if(initialParsing) {
			const startTime = Date.now();
			exportLibrarySymbols(symbolManager.symbols, usingAdv3Lite);
			exportLibraryKeywords(symbolManager.keywords, usingAdv3Lite);
			const elapsedCacheReadTime = Date.now() - startTime;
			connection.console.log(`Cached library files export took ${elapsedCacheReadTime} ms to write`);
		}
		initialParsing = false;
		
	} catch (err) {
		await workerPool.terminate();
		console.error(err);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
	}
}

const adv3LitePathRegExp = RegExp(/[/]adv3[Ll]ite[/]/);

const adv3PathRegExp = RegExp(/[/]adv3[/]/);


function exportLibrarySymbols(symbols: Map<string, DocumentSymbol[]>, usingAdv3Lite: boolean) {
	const librarySymbolsFilePaths = [...symbols.keys()].filter(x=>x.match(usingAdv3Lite?adv3LitePathRegExp:adv3PathRegExp));
	const librarySymbols = new Map();
	for(const file of librarySymbolsFilePaths) {
		librarySymbols.set(file, symbols.get(file));
	}
	librarySymbols.forEach((value,key)=> {
		writeFileSync(`./cache/${basename(key)}__symbols.json`, JSON.stringify(value).toString());
	});

}

function exportLibraryKeywords(keywords: Map<string, Map<string, Range[]>>,usingAdv3Lite: boolean) {
	const libraryKeywordsFilePaths= [...keywords.keys()].filter(x=>x.match(usingAdv3Lite?adv3LitePathRegExp:adv3PathRegExp));
	const libraryKeywords = new Map();
	for(const file of libraryKeywordsFilePaths) {
		libraryKeywords.set(file, keywords.get(file));
	}

	for(const path of libraryKeywords.keys()) {
		const keywordRangeMap = libraryKeywords.get(path);
		if(keywordRangeMap) {
			const keywordRangeMapArray = [...keywordRangeMap];
			writeFileSync(`./cache/${basename(path)}__keywords.json`, JSON.stringify(keywordRangeMapArray).toString());
		}
	}
}

function importLibrarySymbols(symbolManagerSymbols: Map<string, DocumentSymbol[]>, usingAdv3Lite: boolean) {
	const librarySymbolsFilePaths = [...preprocessedFilesCacheMap.keys()].filter(x=>x.match(usingAdv3Lite?adv3LitePathRegExp:adv3PathRegExp));
	//const librarySymbols : Map<string, DocumentSymbol[]> = new Map();
	for(const path of librarySymbolsFilePaths) {
		try {
			const data = readFileSync(`./cache/${basename(path)}__symbols.json`).toString();
			const symbols:DocumentSymbol[] = JSON.parse(data);
			symbolManagerSymbols.set(path, symbols);
		} catch(err) {
			connection.console.error(err);
		}
	}
}

/**
 * TODO: make sure this works... 
 * @param symbolManagerKeywords 
 * @param usingAdv3Lite 
 */
function importLibraryKeywords(symbolManagerKeywords: Map<string, Map<string, Range[]>>, usingAdv3Lite: boolean) {
	const libraryKeywordsFilePaths= [...preprocessedFilesCacheMap.keys()].filter(x=>x.match(usingAdv3Lite?adv3LitePathRegExp:adv3PathRegExp));
	//const libraryKeywords:Map<string, Map<string, Range[]>> = new Map();
	for(const path of libraryKeywordsFilePaths) {
		const data = readFileSync(`./cache/${basename(path)}__keywords.json`).toString();
		const keywords:any = new Map(JSON.parse(data));
		symbolManagerKeywords.set(path, keywords);
	}


}
