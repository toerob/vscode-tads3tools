import { TextDocuments, HoverParams, Hover, MarkupKind, SymbolKind, DocumentSymbol } from "vscode-languageserver/node";
import { TadsSymbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getWordAtPosition } from "./text-utils";
import { retrieveDocumentationForKeyword } from "./documentation";
import { pathExistsSync } from "fs-extra";
import { SimpleValue } from "./types";

function symbolsAllowingHoveringDocs() {
  return [
    SymbolKind.Class,
    SymbolKind.Object,
    SymbolKind.TypeParameter,
    SymbolKind.Interface,
    SymbolKind.Method,
    SymbolKind.Property,
    SymbolKind.Function,
  ];
}

function checkSymbolsAllowingHoveringDocs(x: DocumentSymbol) {
  for (const symbolKind of symbolsAllowingHoveringDocs()) {
    if (x.kind === symbolKind) {
      return true;
    }
  }
  return false;
}

export function onHover(
  { textDocument, position, workDoneToken }: HoverParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager,
): Hover | undefined {
  const currentDoc = documents.get(textDocument.uri);
  const symbolName = currentDoc ? getWordAtPosition(currentDoc, position) : undefined;
  let documentation = "";
  let templateText = "";
  if (currentDoc && symbolName) {
    const symbolSearchResult = symbolManager.findSymbols(symbolName, symbolsAllowingHoveringDocs());
    if (symbolSearchResult && symbolSearchResult.length > 0 && symbolSearchResult[0]?.symbols?.length > 0) {
      const { templates } = symbolManager.getTemplatesFor(symbolName);
      if (templates && templates.length > 0) {
        const templateSummary = templates.map((x) => " - " + x.detail).join("\n\n");
        if (templateSummary) {
          templateText += `Templates for ${symbolName ?? "unknown"}: \n\n${templateSummary}\n\n`;
        }
      }
      const foundPathAndSymbolResult = symbolSearchResult.filter((x: any) =>
        x.symbols.find(checkSymbolsAllowingHoveringDocs),
      );

      const nonExistant =
        foundPathAndSymbolResult.filter((x: any) => (!pathExistsSync(x.filePath) ? x : undefined)) ?? [];
      // Prune non-existant files (can happen if they are moved to another location within the project)
      nonExistant.forEach((x: any) => symbolManager.pruneFile(x.filePath));

      const prunedFoundPathAndSymbolResult = foundPathAndSymbolResult.filter((s: any) => !nonExistant.includes(s));
      if (prunedFoundPathAndSymbolResult && prunedFoundPathAndSymbolResult.length > 0) {
        for (const eachPathAndSymbolResult of prunedFoundPathAndSymbolResult) {
          const filePath = eachPathAndSymbolResult.filePath;
          if (filePath && pathExistsSync(filePath)) {
            for (const symbol of eachPathAndSymbolResult.symbols) {
              const classDoc = retrieveDocumentationForKeyword(symbol, filePath);
              if (classDoc) {
                documentation += `\n\n${classDoc}\r\n (source: ${filePath})\n\n`;
              }
            }
          }
        }
      }
    }
  }

  let propertyTable = "";
  if (symbolName) {
    const props = symbolManager.getObjectProperties(symbolName);
    if (props && props.size > 0) {
      const rows = [...props.entries()]
        .map(([name, val]) => `  ${name.padEnd(20)} ${formatSimpleValue(val)}`)
        .join("\n");
      propertyTable = `\n\nProperties of \`${symbolName}\`:\n\`\`\`\n${rows}\n\`\`\``;
    }
  }

  if (documentation.length > 0 || propertyTable.length > 0) {
    const docSection = documentation.length > 0
      ? "\r\n```\r\n\r\n" + templateText + "Documentation:\n\n" + documentation + "```\r\n"
      : "";
    return {
      contents: {
        kind: MarkupKind.Markdown,
        value: docSection + propertyTable,
      },
    };
  }
  return undefined;
}

function formatSimpleValue(v: SimpleValue): string {
  switch (v.kind) {
    case 'nil':     return 'nil';
    case 'true':    return 'true';
    case 'number':  return String(v.value);
    case 'string':  return `'${v.value}'`;
    case 'ref':     return v.name;
    case 'list':    return `[${v.elements.map(formatSimpleValue).join(', ')}]`;
    case 'unknown': return '(expression)';
  }
}
