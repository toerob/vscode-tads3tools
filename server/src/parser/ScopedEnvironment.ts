import { AutoClosingPair } from 'vscode';
import { DocumentSymbol, Location } from "vscode-languageserver";


export class ScopedEnvironment {

  constructor(public envs:any = {}, public parent: ScopedEnvironment|undefined = undefined) {}

  public getSymbol(keyword: string): any {
    if (this.envs.hasOwnProperty(keyword)) {
      return this.envs[keyword];
    }
    return this.parent?.getSymbol(keyword) ?? undefined;
  }

  buildNamePath(name: string): string {
    if(this.parent === undefined) {
      return name;
    }
    if(Object.keys(this.parent.envs).length === 0) {
      return name;
    }
    return Object.keys(this.parent.envs)[0] + '.' + this.parent.buildNamePath(name)
  }

}
