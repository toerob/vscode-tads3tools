import { URI } from 'vscode-uri';
import { dirname } from 'path';
import * as path from 'path';
import { existsSync } from 'fs';

export function filterForStandardLibraryFiles(array: string[] = []): string[] {
	if (array.length === 0) {
		return [];
	}
	// Locate a common file used in both an adv3 or adv3Lite project: "tads.h"
	// Comparison needs to be done using URI to match windows file path system also.
	const genericTadsHeaderFile = array
		.find(x => URI.file(x).path.match(/include[/]tads.h$/));

	// Locate files used in adv3/adv3Lite
	const adv3HeaderFile = array.find(x => URI.file(x).path.match(/[/]adv3.h$/));
	const adv3MainLibFile = array.find(x => URI.file(x).path.match(/tads3[/]lib[/]_main.t$/));
	const adv3LiteHeaderFile = array.find(x => URI.file(x).path.match(/[/]advlite.h$/));

	// Create a set with folder base paths for:
	// * system include files
	// * adv3 system library files 
	// * adv3lite system library 
	// And filter out files starting with these paths
	const stdLibraryBasepaths = new Set<string>();
	for (const file of [genericTadsHeaderFile, adv3HeaderFile, adv3MainLibFile, adv3LiteHeaderFile]) {
		if (file) {
			stdLibraryBasepaths.add(path.join(dirname(file)));
		}
	}
	const basePathsArray: string[] = Array.from(stdLibraryBasepaths.keys());
	return array.filter(x => basePathsArray.find(y => !!x.startsWith(y))) ?? [];
}
