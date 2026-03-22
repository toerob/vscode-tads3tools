import { makeAutoObservable } from "mobx";
import { URI } from "vscode-uri";
import { CaseInsensitiveMap } from './modules/CaseInsensitiveMap';

const onWindowsPlatform = process.platform === "win32";

export class ServerState {
  _tadsVersion = 3;
  _fileBasePaths: Set<URI> = new Set();
  private _makefileLocation: URI | undefined;
  private _currentDocChanges: string | undefined;
  private _currentCursorLocation: { fsPath: string; line: number } | undefined;

  // TODO: move into the serverState
  private _preprocessedFilesCacheMap = onWindowsPlatform
    ? new CaseInsensitiveMap<string, string>()
    : new Map<string, string>();

  constructor() {
    makeAutoObservable(this);
  }

  get tadsVersion() {
    return this._tadsVersion;
  }
  set tadsVersion(nr: number) {
    if (![2, 3].includes(nr)) {
      throw new Error(`Incompatible tads version number`);
    }
    this._tadsVersion = nr;
  }

  public get fileBasePaths() {
    return this._fileBasePaths;
  }
  public set fileBasePaths(value) {
    this._fileBasePaths = value;
  }

  public get makefileLocation(): URI | undefined {
    return this._makefileLocation;
  }
  public set makefileLocation(value: URI | undefined) {
    this._makefileLocation = value;
  }

  public set currentDocChanges(text) {
    this._currentDocChanges = text;
  }
  public get currentDocChanges(): string | undefined {
    return this._currentDocChanges;
  }

  public get currentCursorLocation(): { fsPath: string; line: number } | undefined {
    return this._currentCursorLocation;
  }
  public set currentCursorLocation(value: { fsPath: string; line: number } | undefined) {
    this._currentCursorLocation = value;
  }

  public get preprocessedFilesCacheMap() {
    return this._preprocessedFilesCacheMap;
  }
  public set preprocessedFilesCacheMap(value) {
    this._preprocessedFilesCacheMap = value;
  }

}

export const serverState = new ServerState();
