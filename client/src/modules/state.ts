import { autorun, makeAutoObservable, observable } from "mobx";
import { Uri } from 'vscode';
import { client } from '../extension';

class ExtensionStateStore {
	longProcessing = false;
	diagnosing = false;
	preprocessing = false;

	isUsingAdv3Lite = undefined;
	chosenMakefileUri: Uri | undefined;
	
	tads2MainFile: Uri | undefined = undefined
	isUsingTads2: boolean = undefined;

	constructor() {
		makeAutoObservable(this, {
			longProcessing: observable,
			diagnosing: observable,
			preprocessing: observable,
			isUsingAdv3Lite: observable
		});
		autorun(() => {
			const text = [];
			if (this.preprocessing) text.push('[Preprocessing]');
			if (this.diagnosing) text.push('[Diagnosing]');
			if (this.longProcessing) text.push('[Longprocessing]');
			if (this.isUsingTads2) text.push('[Detected using Tads2]');
			if (this.tads2MainFile) text.push(`[Detected Tads2 main file: ${this.tads2MainFile}]`);
			setTimeout(()=>reportState(text.length > 0 ? text.join(', ') : 'Done'));
		});
	}

	setUsingTads2(state: boolean) {
		this.isUsingTads2 = state;
	}

	setTads2MainFile(tads2MainFile: Uri) {
		this.tads2MainFile = tads2MainFile;
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
