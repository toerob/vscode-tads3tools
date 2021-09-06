import { autorun, makeAutoObservable, observable, reaction } from "mobx";
import { client } from './extension';

class ExtensionStateStore {

	longProcessing = false;

	diagnosing = false;

	constructor() {
		makeAutoObservable(this, {
			longProcessing: observable,
			diagnosing: observable
		});
		autorun(() => {
			const text = [];
			if (this.diagnosing) text.push('[Diagnosing]');
			if (this.longProcessing) text.push('[Longprocessing]');
			setTimeout(()=>reportState(text.length > 0 ? text.join(' and ') : 'Done'));
		});
	}
	setDiagnosing(state: boolean) { this.diagnosing = state; }

	setLongProcessing(state: boolean) { this.longProcessing = state; }

	isDiagnosing() { return this.diagnosing; }

	isLongProcessingInAction() { return this.longProcessing; }

}

export const extensionState = new ExtensionStateStore();

export function reportState(text) {
	client.info(`Current state(s): ${text}`);
}
