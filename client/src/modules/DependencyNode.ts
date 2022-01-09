import { Uri } from 'vscode';

/**
 * Little construct to hold information about the Tads project tree
 */
export class DependencyNode {
	filename: string;
	includes: Set<string> = new Set();
	constructor(public uri: Uri | undefined = undefined) {
	}
}
