/*import { autorun, makeAutoObservable, observable, reaction } from "mobx";

export enum ExtensionState {DIAGNOSING, LONGPROCESSING, IDLE}

class ExtensionStateStore {

	curState: ExtensionState = ExtensionState.IDLE;

	get currentState() { 
		return this.curState; 
	}

	constructor() {
		makeAutoObservable(this, {
			curState: observable
		});
		autorun(() =>  {
			console.log(` *** Current State: ${ ExtensionState[this.curState]} `);
		});
	}

	setState(newState:ExtensionState) {
		this.curState = newState;
	}

}

export const extensionState = new ExtensionStateStore();*/