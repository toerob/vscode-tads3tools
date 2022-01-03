import { makeAutoObservable } from "mobx";


export class ServerState {

	_tadsVersion = 3;
	
	constructor() {
		makeAutoObservable(this);
	}

	set tadsVersion(nr: number) { 
		if(![2,3].includes(nr)) {
			throw new Error(`Incompatible tads version number`);
		}
		this._tadsVersion = nr; 
	}
	get tadsVersion() {return this._tadsVersion;}
}

export const serverState = new ServerState();
