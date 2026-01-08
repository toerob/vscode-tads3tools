import { autorun, makeAutoObservable, observable } from "mobx";
import { DocumentSymbol, FileSystemWatcher, Progress, TextDocument, TextEditor, Uri } from "vscode";
import { client } from "../extension";
import { LocalStorageService } from "./local-storage-service";

export type ScriptInfo = {
  uri: Uri;
  content: string;
};

// TODO: convert to properties
export class ExtensionStateStore {
  longProcessing = false;
  diagnosing = false;
  preprocessing = false;

  isUsingAdv3Lite = undefined;
  chosenMakefileUri: Uri | undefined;
  _projectFolderUri: Uri | undefined;

  tads2MainFile: Uri | undefined = undefined;
  isUsingTads2: boolean = undefined;

  private _autoScriptFileSerial = 0;
  private _tads2ProjectFilesInfo: Map<any, any>;
  private _allFilesBeenProcessed = false;
  private _scriptFolderContent = new Map<string, ScriptInfo>();
  private _makefileKeyMapValues: any[];
  private _currentPreprocessAndParseProgress: Progress<any>;
  private _preprocessedList: string[];

  private _scriptsFolder: Uri;
  private _extensionCacheDirectory: string;

  private _gameFileSystemWatcher: FileSystemWatcher;
  private _lastChosenTextDocument: TextEditor | undefined;

  private _preprocessDocument: TextDocument;
  private _storageManager: LocalStorageService;
  private _selectedObject: DocumentSymbol;
  private _lastChosenTextEditor: TextEditor;

  private _makefileDefinitions: Map<string, string>;
  
  private _preprocessedFilesMap: any; // Can this go?

  public get storageManager(): LocalStorageService {
    return this._storageManager;
  }
  public set storageManager(value: LocalStorageService) {
    this._storageManager = value;
  }
  public get preprocessDocument(): TextDocument {
    return this._preprocessDocument;
  }
  public set preprocessDocument(value: TextDocument) {
    this._preprocessDocument = value;
  }

  public get gameFileSystemWatcher(): FileSystemWatcher {
    return this._gameFileSystemWatcher;
  }
  public set gameFileSystemWatcher(value: FileSystemWatcher) {
    this._gameFileSystemWatcher = value;
  }
  public get lastChosenTextEditor(): TextEditor {
    return this._lastChosenTextEditor;
  }
  public set lastChosenTextEditor(value: TextEditor) {
    this._lastChosenTextEditor = value;
  }
  public get lastChosenTextDocument(): TextEditor | undefined {
    return this._lastChosenTextDocument;
  }
  public set lastChosenTextDocument(value: TextEditor | undefined) {
    this._lastChosenTextDocument = value;
  }
  public get preprocessedFilesMap(): any {
    return this._preprocessedFilesMap;
  }
  public set preprocessedFilesMap(value: any) {
    this._preprocessedFilesMap = value;
  }
public get makefileDefinitions(): Map<string, string> {
    return this._makefileDefinitions;
  }
  public set makefileDefinitions(value: Map<string, string>) {
    this._makefileDefinitions = value;
  }

  constructor() {
    makeAutoObservable(this, {
      longProcessing: observable,
      diagnosing: observable,
      preprocessing: observable,
      isUsingAdv3Lite: observable,
    });
    autorun(() => {
      const text = [];
      if (this.preprocessing) text.push("[Preprocessing]");
      if (this.diagnosing) text.push("[Diagnosing]");
      if (this.longProcessing) text.push("[Longprocessing]");
      if (this.isUsingTads2) text.push("[Detected using Tads2]");
      if (this.tads2MainFile) text.push(`[Detected Tads2 main file: ${this.tads2MainFile}]`);
      setTimeout(() => reportState(text.length > 0 ? text.join(", ") : "Done"));
    });
  }

  public get tads2ProjectFilesInfo() {
    return this._tads2ProjectFilesInfo;
  }
  public set tads2ProjectFilesInfo(tads2ProjectFilesInfo) {
    this._tads2ProjectFilesInfo = tads2ProjectFilesInfo;
  }

  public get autoScriptFileSerial() {
    return this._autoScriptFileSerial;
  }
  public set autoScriptFileSerial(value) {
    this._autoScriptFileSerial = value;
  }

  public get makefileKeyMapValues(): any[] {
    return this._makefileKeyMapValues;
  }
  public set makefileKeyMapValues(value: any[]) {
    this._makefileKeyMapValues = value;
  }

  public get scriptFolderContent() {
    return this._scriptFolderContent;
  }
  public set scriptFolderContent(value) {
    this._scriptFolderContent = value;
  }

  public get allFilesBeenProcessed(): boolean {
    return this._allFilesBeenProcessed;
  }
  public set allFilesBeenProcessed(value: boolean) {
    this._allFilesBeenProcessed = value;
  }

  public get currentPreprocessAndParseProgress(): Progress<any> {
    return this._currentPreprocessAndParseProgress;
  }
  public set currentPreprocessAndParseProgress(value: Progress<any>) {
    this._currentPreprocessAndParseProgress = value;
  }

  public get scriptsFolder(): Uri {
    return this._scriptsFolder;
  }
  public set scriptsFolder(value: Uri) {
    this._scriptsFolder = value;
  }

  public get projectFolderUri(): Uri {
    return this._projectFolderUri;
  }
  public set projectFolderUri(value: Uri) {
    this._projectFolderUri = value;
  }

  public get selectedObject(): DocumentSymbol {
    return this._selectedObject;
  }
  public set selectedObject(value: DocumentSymbol) {
    this._selectedObject = value;
  }

  public get extensionCacheDirectory(): string {
    return this._extensionCacheDirectory;
  }
  public set extensionCacheDirectory(value: string) {
    this._extensionCacheDirectory = value;
  }

  setUsingTads2(state: boolean) {
    this.isUsingTads2 = state;
  }

  getUsingTads2() {
    return this.isUsingTads2;
  }

  setTads2MainFile(tads2MainFile: Uri) {
    this.tads2MainFile = tads2MainFile;
  }

  getTads2MainFile() {
    return this.tads2MainFile;
  }

  setDiagnosing(state: boolean) {
    this.diagnosing = state;
  }

  setLongProcessing(state: boolean) {
    this.longProcessing = state;
  }

  isDiagnosing() {
    return this.diagnosing;
  }

  isLongProcessingInAction() {
    return this.longProcessing;
  }

  setPreprocessing(state: boolean) {
    this.preprocessing = state;
  }

  public get preprocessedList(): string[] {
    return this._preprocessedList;
  }
  public set preprocessedList(value: string[]) {
    this._preprocessedList = value;
  }

  isPreprocessing() {
    return this.preprocessing;
  }

  setUsingAdv3LiteStatus(state: boolean) {
    this.isUsingAdv3Lite = state;
  }

  getUsingAdv3LiteStatus() {
    return this.isUsingAdv3Lite;
  }
  
  getChosenMakefileUri(): Uri | undefined {
    return this.chosenMakefileUri;
  }

  setChosenMakefileUri(chosenMakefileUri: Uri | undefined) {
    this.chosenMakefileUri = chosenMakefileUri;
  }
}

export const extensionState = new ExtensionStateStore();

export function reportState(text) {
  client.info(`Current state(s): ${text}`);
}
