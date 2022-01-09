import { URI } from 'vscode-uri';
import { dirname } from 'path';
import * as path from 'path';

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

export function filterForLibraryFiles(array: string[]): string[] {
	// Locate a common file used in both an adv3 or adv3Lite project: "tads.h"
	// Comparison needs to be done using URI to match windows file path system also.

	const fileFoundInBothAdv3AndAdv3Lite = array.find(x => URI.file(x).path.match(/include[/]tads.h$/));

	// Now that we know the location of that file, we can better guess 
	// the location of all tads3 standard library files by using the parent directory
	// as a base directory.
	if (fileFoundInBothAdv3AndAdv3Lite) {
		const commonIncludePath = dirname(fileFoundInBothAdv3AndAdv3Lite);
		const commonBaseDirectory = path.join(commonIncludePath, '..');
		return array.filter((x: string) => x.startsWith(commonBaseDirectory));
	}

	// If no library files were found, return an empty array so they at least have the chance of 
	// getting parsed.
	return [];
}
