import { autorun, makeAutoObservable, observable } from "mobx";
import { Progress, Uri } from 'vscode';
import { client } from '../extension';


export type ScriptInfo = {
	uri: Uri,
	content: string
}

// TODO: convert to properties
class ExtensionStateStore {
	longProcessing = false;
	diagnosing = false;
	preprocessing = false;

	isUsingAdv3Lite = undefined;
	chosenMakefileUri: Uri | undefined;

	tads2MainFile: Uri | undefined = undefined;
	isUsingTads2: boolean = undefined;

	private _autoScriptFileSerial = 0;
	private _tads2ProjectFilesInfo: Map<any, any>;
	private _allFilesBeenProcessed = false;
	private _scriptFolderContent = new Map<string, ScriptInfo>();
	private _makefileKeyMapValues: any[];
	private _currentPreprocessAndParseProgress: Progress<any>;
	
	private _projectRootPath: Uri;

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
			setTimeout(() => reportState(text.length > 0 ? text.join(', ') : 'Done'));
		});
	}

	public get tads2ProjectFilesInfo() { return this._tads2ProjectFilesInfo; }
	public set tads2ProjectFilesInfo(tads2ProjectFilesInfo) { this._tads2ProjectFilesInfo = tads2ProjectFilesInfo; }
	
	public get autoScriptFileSerial() { return this._autoScriptFileSerial; }
	public set autoScriptFileSerial(value) { this._autoScriptFileSerial = value; }

	public get makefileKeyMapValues(): any[] { return this._makefileKeyMapValues; }
	public set makefileKeyMapValues(value: any[]) { this._makefileKeyMapValues = value; }

	public get scriptFolderContent() { return this._scriptFolderContent; }
	public set scriptFolderContent(value) { this._scriptFolderContent = value; }

	public get allFilesBeenProcessed(): boolean { return this._allFilesBeenProcessed; }
	public set allFilesBeenProcessed(value: boolean) { this._allFilesBeenProcessed = value; }

	public get currentPreprocessAndParseProgress(): Progress<any> {
		return this._currentPreprocessAndParseProgress;
	}
	public set currentPreprocessAndParseProgress(value: Progress<any>) {
		this._currentPreprocessAndParseProgress = value;
	}

	public get scriptsFolder(): Uri { return this._projectRootPath; }
	public set scriptsFolder(value: Uri) { this._projectRootPath = value; }


	setUsingTads2(state: boolean) { this.isUsingTads2 = state; }

	getUsingTads2() { return this.isUsingTads2; }

	setTads2MainFile(tads2MainFile: Uri) { this.tads2MainFile = tads2MainFile; }

	getTads2MainFile() { return this.tads2MainFile; }

	setDiagnosing(state: boolean) { this.diagnosing = state; }

	setLongProcessing(state: boolean) { this.longProcessing = state; }

	isDiagnosing() { return this.diagnosing; }

	isLongProcessingInAction() { return this.longProcessing; }

	setPreprocessing(state: boolean) { this.preprocessing = state; }

	isPreprocessing() { return this.preprocessing; }

	setUsingAdv3LiteStatus(state: boolean) { this.isUsingAdv3Lite = state; }

	getUsingAdv3LiteStatus() { return this.isUsingAdv3Lite; }

	getChosenMakefileUri(): Uri | undefined { return this.chosenMakefileUri; }

	setChosenMakefileUri(chosenMakefileUri: Uri | undefined) { this.chosenMakefileUri = chosenMakefileUri; }

}

export const extensionState = new ExtensionStateStore();

export function reportState(text) {
	client.info(`Current state(s): ${text}`);
}
