import { SymbolKind } from 'vscode';
//import { DocumentSymbol } from 'vscode-languageserver/node';

// TODO: make sure it is serializable

export class DefaultMapObject {
	north?: string;
	south?: string;
	east?: string;
	west?: string;
	northeast?: string;
	northwest?: string;
	southeast?: string;
	southwest?: string;
	up?: string;
	down?: string;
	in?: string;
	out?: string;

	x = 0;
	y = 0;
	z = 0;
	kind: any;
	detail: string | undefined;
	arrowConnection: string | undefined;
	shortName: string | undefined;

	hasAbsolutePosition = false;
	isMapped = false;
	isNew = false;
	parent: string | undefined;
	children: any[] = [];

	doordest: string|undefined; //tads2 specific

	constructor(public name: string) { }
}
