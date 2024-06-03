import { readFileSync } from "fs";
import { reaction } from "mobx";
import {
  TextDocument,
  Position,
  CompletionItemProvider,
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionList,
  ProviderResult,
  SnippetString,
  Uri,
  ExtensionContext,
} from "vscode";
import { CompletionItemKind } from "vscode-languageclient";
import { client } from "../extension";
import { extensionState } from "./state";

export class SnippetCompletionItemProvider implements CompletionItemProvider {
  private snippets = [];

  constructor(private context: ExtensionContext) {
    reaction(
      () => extensionState.isUsingAdv3Lite,
      (usingAdv3Lite: Boolean) => {
        client.info(`Loading snippets for Tads3 ${usingAdv3Lite ? "Adv3" : "Adv3Lite"} library`);
        const liberarySnippetfileResourceFileUri = Uri.joinPath(
          this.context.extensionUri,
          "snippets",
          usingAdv3Lite ? "snippets_adv3Lite.json" : "snippets_adv3.json",
        );
        this.populateSnippetsFromFileUri(liberarySnippetfileResourceFileUri);
      },
    );

    reaction(
      () => extensionState.isUsingTads2,
      () => {
        client.info(`Loading snippets for Tads2`);
        const liberarySnippetfileResourceFileUri = Uri.joinPath(
          this.context.extensionUri,
          "snippets",
          "snippets_tads2.json",
        );
        this.populateSnippetsFromFileUri(liberarySnippetfileResourceFileUri);
      },
    );
  }

  populateSnippetsFromFileUri(snippetfileResourceFileUri: Uri) {
    const snippetfileResourceFileContent = readFileSync(snippetfileResourceFileUri.fsPath).toString();
    const parsedSnippetFile = JSON.parse(snippetfileResourceFileContent);
    for (const key in parsedSnippetFile) {
      let data = parsedSnippetFile[key];
      const label = Array.isArray(data.prefix) ? data.prefix[0] : data.prefix;
      const completionItem = new CompletionItem(label);
      completionItem.documentation = data.description;
      completionItem.insertText = new SnippetString(data.body.join("\n"));
      completionItem.kind = CompletionItemKind.Snippet;
      this.snippets.push(completionItem);
    }
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    return this.snippets;
  }
}
