"use strict";
import { Memento } from "vscode";
export class LocalStorageService {
  constructor(private storage: Memento) {}

  public getValue(key: string) {
    return this.storage.get(key, null);
  }

  public setValue(key: string, value: any) {
    this.storage.update(key, value);
  }
}
