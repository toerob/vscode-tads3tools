import { autorun, makeAutoObservable, observable, reaction } from "mobx";
import { Uri } from 'vscode';
import { client } from '../extension';

class ExtensionStateStore {

	longProcessing = false;
	diagnosing = false;
	preprocessing = false;

	isUsingAdv3Lite = false
	chosenMakefileUri: Uri | undefined;

	constructor() {
		makeAutoObservable(this, {
			longProcessing: observable,
			diagnosing: observable,
			preprocessing: observable
		});
		autorun(() => {
			const text = [];
			if (this.preprocessing) text.push('[Preprocessing]');
			if (this.diagnosing) text.push('[Diagnosing]');
			if (this.longProcessing) text.push('[Longprocessing]');
			setTimeout(()=>reportState(text.length > 0 ? text.join(', ') : 'Done'));
		});
	}
	setDiagnosing(state: boolean) { this.diagnosing = state; }

	setLongProcessing(state: boolean) { this.longProcessing = state; }

	isDiagnosing() { return this.diagnosing; }

	isLongProcessingInAction() { return this.longProcessing; }

	setPreprocessing(state: boolean) { this.preprocessing = state; }
	
	isPreprocessing() { return this.preprocessing; }

	setUsingAdv3LiteStatus(state: boolean) { this.isUsingAdv3Lite = state }

	getUsingAdv3LiteStatus() {return this.isUsingAdv3Lite; }
	
	getChosenMakefileUri(): Uri | undefined {
		return this.chosenMakefileUri;
	}

	setChosenMakefileUri(chosenMakefileUri :Uri | undefined) {
		this.chosenMakefileUri = chosenMakefileUri;
	}

	
}

export const extensionState = new ExtensionStateStore();

export function reportState(text) {
	client.info(`Current state(s): ${text}`);
}
