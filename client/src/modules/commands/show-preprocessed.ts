import { Range } from "vscode";
import { PREPROCESS_URI, showVirtualDocument } from '../virtual-documents';

export async function showPreprocessedText(params: [any, any, any]) {
  const [range, _, preprocessedText] = params;
  await showVirtualDocument(PREPROCESS_URI, preprocessedText, range instanceof Range ? range : undefined);
}
