import { workspace, window, Range, ViewColumn } from "vscode";
import { showAndScrollToRange } from '../editor-utils';

export async function showPreprocessedText(preprocessDocument, params: [any, any, any]) {
  const [range, _, preprocessedText] = params;
  if (preprocessDocument && !preprocessDocument.isClosed) {
    await window.showTextDocument(preprocessDocument, {
      viewColumn: ViewColumn.Beside,
      preserveFocus: true,
      preview: true,
    });
    await window.visibleTextEditors
      .find((editor) => editor.document.uri.path === preprocessDocument.uri.path)
      .edit((prepDoc) => {
        const wholeRange = preprocessDocument.validateRange(new Range(0, 0, preprocessDocument.lineCount, 0));
        prepDoc.replace(wholeRange, preprocessedText);
      });
    showAndScrollToRange(preprocessDocument, range);
  } else {
    const doc = await workspace.openTextDocument({
      language: "tads3",
      content: preprocessedText,
    });
    preprocessDocument = doc;
    showAndScrollToRange(doc, range);
  }
}


