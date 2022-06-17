import { makeAutoObservable } from "mobx";
import { URI } from 'vscode-uri';


export class ServerState {
	_tadsVersion = 3;
	_cachedFileLocation = new Map<string | undefined, string>();
	_fileBasePaths: Set<URI> = new Set();
	private _makefileLocation: URI | undefined;
	
	constructor() {
		makeAutoObservable(this);
	}

	get tadsVersion() { return this._tadsVersion; }
	set tadsVersion(nr: number) {
		if (![2, 3].includes(nr)) {
			throw new Error(`Incompatible tads version number`);
		}
		this._tadsVersion = nr;
	}

	get cachedFileLocation() { return this._cachedFileLocation; }
	set cachedFileLocation(cachedFileLocation: Map<string | undefined, string>) {
		this._cachedFileLocation = cachedFileLocation;
	}

	public get fileBasePaths() { return this._fileBasePaths; }
	public set fileBasePaths(value) {
		this._fileBasePaths = value;
	}

	public get makefileLocation(): URI|undefined {
		return this._makefileLocation;
	}
	public set makefileLocation(value: URI|undefined) {
		this._makefileLocation = value;
	}

}


export const serverState = new ServerState();
