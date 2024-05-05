import { Location } from "vscode-languageserver";

export class ScopedEnvironment {
  environment = new Map<string, Location>();

  constructor(private enclosingEnvironment: ScopedEnvironment | null = null) {}

  getSymbol(keyword: string): any {
    const word = this.environment.get(keyword);
    if (word) {
      return word;
    }
    return this.enclosingEnvironment?.getSymbol(keyword) ?? undefined;
  }
  getEnclosingEnvironment() {
    return this.enclosingEnvironment;
  }
}
