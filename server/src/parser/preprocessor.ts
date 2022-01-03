/* eslint-disable no-useless-escape */
//import { URI } from 'vscode-languageserver';
import { exec } from 'child_process';
import { readFile, readFileSync } from 'fs';
import { basename, dirname } from 'path';
import { URI } from 'vscode-uri';
import { CaseInsensitiveSet } from '../modules/CaseInsensitiveSet';
import { connection, preprocessedFilesCacheMap } from '../server';

const rowsMap = new Map<string, number>();
const defineMacrosMap = new Map();
const onWindowsPlatform = (process.platform === 'win32');
const macrosChecked = (onWindowsPlatform)? new CaseInsensitiveSet() : new Set();

export function getDefineMacrosMap(): Map<string, any> {
	return defineMacrosMap;
}

export function markFileToBeCheckedForMacroDefinitions(uri: string) {
	macrosChecked.delete(uri);
}

const defineRegExp = new RegExp(/^\s*[#]\s*define\s+([^\(\s\n]+)[^(\n]*/);

export function runCommand(command: string) {
	return new Promise( (resolve, reject) => {
		let result = '';
		const childProcess = exec(command, {maxBuffer: 1024 * 50000 }); 	//TODO: make configurable
		try {
			childProcess?.stdout?.on('data', (data: any) => {
				result += data;
			});
			childProcess.on('close', function () {
				resolve(result);
			});
		} catch (error) {
			reject(error);
		}
		return result;
	});
}

export async function preprocessTads2Files(chosenMakefilePath: string, preprocessedFilesCacheMap: Map<string, string>) {
	const t2PreprocessorPath: number = await connection.workspace.getConfiguration('tads2.preprocessor.path') ?? 'cpp';
	const libFolder: string = await connection.workspace.getConfiguration('tads2.library.path') ?? '/usr/local/share/frobtads/tads2/';
	preprocessedFilesCacheMap.clear();
	rowsMap.clear();
	const currentFolder = dirname(chosenMakefilePath);
	const commandLine = `"${t2PreprocessorPath}" -I ${libFolder} -I ${currentFolder} -ds "${chosenMakefilePath}"`;
	const result: any = await runCommand(commandLine);
	if (result.match(/unable to open/i)) {
		throw new Error(`Preprocessing failed: ${result}`);
	}
	processPreprocessedResult(result, preprocessedFilesCacheMap, true);
	const unprocessedRowsMap = countRowsOfUnprocessedFiles([...preprocessedFilesCacheMap?.keys()] ?? []);
	postProcessPreprocessedResult(unprocessedRowsMap);
}

export async function preprocessAllFiles(chosenMakefilePath: string, preprocessedFilesCacheMap: Map<string, string>) {
	const t3makeCompilerPath: number = await connection.workspace.getConfiguration('tads3.compiler.path') ?? 't3make';
	preprocessedFilesCacheMap.clear();
	rowsMap.clear();
	const commandLine = `"${t3makeCompilerPath}" -P -q -f "${chosenMakefilePath}"`;
	const result: any = await runCommand(commandLine);
	if (result.match(/unable to open/i)) {
		throw new Error(`Preprocessing failed: ${result}`);
	}
	processPreprocessedResult(result, preprocessedFilesCacheMap);
	const unprocessedRowsMap = countRowsOfUnprocessedFiles([...preprocessedFilesCacheMap?.keys()] ?? []);
	postProcessPreprocessedResult(unprocessedRowsMap);
}

function processPreprocessedResult(result: any, preprocessedFilesCacheMap: Map<string, string>, usingTads2=false) {
	preprocessedFilesCacheMap.clear();
	rowsMap.clear();
	const pathRegexp = usingTads2? new RegExp("^# ([0-9]+) \"(.*)\""): new RegExp("^#line ([0-9]+) \"(.*)\"");
	const startTime = Date.now();
	let totalLineCount = 0;
	let currentCounter = 0;
	let currentBuffer = '';
	let currentFile = undefined;
	const tadsLineQuickMatchDelimiter = usingTads2? '#': '#line';
	for (const line of result.split(/\n/)) {
		totalLineCount++;
		currentCounter++;
		if (line.startsWith(tadsLineQuickMatchDelimiter)) {
			const match = pathRegexp.exec(line);
			if (match) {
				if (currentFile) {
					if(!(usingTads2 && currentFile.startsWith('<'))) {
						storeCurrentBufferAndRows(currentFile, currentBuffer, currentCounter - 1, preprocessedFilesCacheMap);
					}
				}
				currentBuffer = '';
				currentCounter = 0;
				if (currentCounter === undefined || currentCounter === Infinity) {
					currentCounter = 1;
				}

				currentFile = match[2]
								.replace(/\\\\/g,'\\'); 

				const newCurrentCounter = Number(match[1]) - 1;
				let lastLine = rowsMap.get(currentFile);
				if (lastLine === undefined || lastLine === Infinity) {
					lastLine = newCurrentCounter;
				}
				const diff = newCurrentCounter - lastLine;

				// Salvage negative difference:
				if (diff === -1) {
					const lastStored = preprocessedFilesCacheMap.get(currentFile);
					if(lastStored) {
						const lastCharacter = lastStored[lastStored.length - 1];
						if (lastCharacter === '\n') {
							//console.error(`Salvaging negative diff in ${currentFile} ${diff} last line: ${lastLine}`);
							const removedLastLine = lastStored.slice(0, lastStored.length - 1);
							preprocessedFilesCacheMap.set(currentFile, removedLastLine);
							currentCounter--;
						}
					}
				}

				for (let x = 0; x < diff; x++) {
					currentBuffer = currentBuffer.concat('\n');
					currentCounter++;
				}
				rowsMap.set(currentFile, lastLine);
				continue;
			}
		}

		if (!line.startsWith('#charset')) {
			currentBuffer = currentBuffer.concat(line).concat('\n');
		} else {
			currentBuffer = currentBuffer.concat('\n');
		}
	}

	if (currentFile) {
		const newString = (preprocessedFilesCacheMap.get(currentFile) ?? '') + currentBuffer;
		preprocessedFilesCacheMap.set(currentFile, newString);
	}

	const elapsedTime = Date.now() - startTime;
	connection.console.log(`${totalLineCount - 1} number of preprocessed lines mapped in ${elapsedTime} ms`);
}

function storeCurrentBufferAndRows(currentFile: string, currentBuffer: string, currentCounter: number, preprocessedFilesCacheMap: Map<string, string>) {
	try {
		const previouslyCountedRows = rowsMap.get(currentFile);
		if (previouslyCountedRows !== undefined) {
			rowsMap.set(currentFile, previouslyCountedRows + currentCounter);
		} else {
			rowsMap.set(currentFile, 0);
		}
		const previousContent = preprocessedFilesCacheMap.get(currentFile);
		if (previousContent) {
			preprocessedFilesCacheMap.set(currentFile, previousContent.concat(currentBuffer));
		} else {
			if (currentBuffer) {
				preprocessedFilesCacheMap.set(currentFile, currentBuffer);		// Can't do this
			} else {
				preprocessedFilesCacheMap.set(currentFile, '');		// Can't do this
			}
		}
	} catch (err) {
		console.error(err);
	}
}
function countRowsOfUnprocessedFiles(filesArray: string[]) {
	const startTime = Date.now();
	const rowMap = new Map();
	for(const f of filesArray) {
		const contents = readFileSync(f).toString();
		const countedLines = contents.split(/\r?\n/)?.length;
		rowMap.set(f,countedLines);
	}
	const elapsedTime = Date.now() - startTime;
	connection.console.log(`Counting row lines done in ${elapsedTime} ms`);
	return rowMap;
}


/**
 * Some preprocessed documents (such as adv3.h / adv3Lite.h) gets duplicated several times during 
 * preprocessing and ends up very long, therefore they need trimming.
 * @param unprocessedRowsMap 
 */
function postProcessPreprocessedResult(unprocessedRowsMap: Map<string, number>) {
	const startTime = Date.now();
	for(const filename of preprocessedFilesCacheMap.keys()) {
		const preprocessedText = preprocessedFilesCacheMap.get(filename);
		if(preprocessedText) {
			const processedRowsArray = preprocessedText.split(/\r?\n/);
			const unprocessedRows = unprocessedRowsMap.get(filename);
			if(unprocessedRows) {
				if(processedRowsArray.length > unprocessedRows) {
					const slicedText = processedRowsArray.slice(0, unprocessedRows).join('\n');
					preprocessedFilesCacheMap.set(filename, slicedText);
				}	
			}
		}
		if(isFileDefinesToBeProcess(filename)) {
			mapMacroDefinitions(filename);
		}
	}
	const elapsedTime = Date.now() - startTime;
	connection.console.log(`Postprocessing row lines done in ${elapsedTime} ms`);
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
	const uriPath = onWindowsPlatform? URI.file(filename).path : filename; // Optimize for linux
	return !macrosChecked?.has(uriPath);
}

function mapMacroDefinitions(filename: string) {
	const fp = onWindowsPlatform? URI.file(filename).fsPath: filename;
	readFile(fp, (err, data) => {
		if(!err) {
			const fp = onWindowsPlatform? URI.file(filename).path : filename;
			let rowIdx = 0;
			const text = data.toString();
			const rows = text.split(/\r?\n/) ?? [];
			rows.forEach((row, idx)=> {
				const result = defineRegExp.exec(row);
				if(result !== null && result?.length >= 2) {
					let macroDefAdditionalRows = 0;
					for(let nextRowIdx = idx; nextRowIdx<rows.length;nextRowIdx++) {
						if(rows[nextRowIdx].endsWith('\\')) {
							macroDefAdditionalRows++;
						} else {
							break;
						}
					}
					defineMacrosMap.set(result[1], {row: rowIdx, uri: fp, endLine: rowIdx+macroDefAdditionalRows});
				}
				rowIdx++;
			});
			macrosChecked.add(fp); // Cache result, only refresh on file changes			
			connection.console.info(`${fp} scanned for macro definitions`);
		}

	});
}