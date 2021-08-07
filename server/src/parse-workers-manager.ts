import { CancellationTokenSource } from 'vscode-languageserver/node';
import { preprocessAllFiles } from './parser/preprocessor';
import { statSync, readFileSync } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { spawn, Pool, Worker } from 'threads';
import { abortParsingProcess, preprocessedFilesCacheMap, connection, symbolManager } from './server';
import { clearCompletionCache } from './onCompletion';


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

	if (filePaths === undefined) {
		const baseDir = Utils.dirname(URI.parse(makefileLocation)).fsPath;
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

	// Temporary, just the first files to speed up
	//allFilePaths = allFilePaths.splice(0,3);
	const totalFiles = allFilePaths?.length;
	let tracker = 0;

	const poolMaxSize = 4; //6;
	const poolSize = allFilePaths.length >= poolMaxSize ? poolMaxSize : 1;
	const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);
	try {
		const startTime = Date.now();
		for (const filePath of allFilePaths) {
			connection.console.log(`Queuing parsing job ${filePath}`);
			workerPool.queue(async (parseJob) => {

				const text = preprocessedFilesCacheMap.get(filePath) ?? '';
				const { symbols, keywords, additionalProperties} = await parseJob(filePath, text);

				symbolManager.symbols.set(filePath, symbols);
				symbolManager.keywords.set(filePath, keywords);
				clearCompletionCache();
				symbolManager.additionalProperties.set(filePath, additionalProperties);
				tracker++;
				connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles]);
				connection.console.log(`${filePath} parsed successfully`);
			});
		}
		await workerPool.completed();
		await workerPool.terminate();
		const elapsedTime = Date.now() - startTime;
		console.log(`All files parsed within ${elapsedTime} ms`);
		connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });
		
	} catch (err) {
		await workerPool.terminate();
		console.error(err);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
	}
}
