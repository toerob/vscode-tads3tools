import { window } from 'vscode';
import {
  disassembleNamedMethod,
  disassembleAllMethods,
  getMethodsFromImage,
  MethodSummary,
} from '../disassembler';
import { DISASM_IMAGE_URI, DISASM_METHOD_URI, showVirtualDocument } from '../virtual-documents';

async function pickImageFile(findImageByPattern: (ask: boolean) => Promise<string | undefined>): Promise<string | undefined> {
  const path = await findImageByPattern(true);
  if (!path) {
    window.showErrorMessage('No .t3 image file found. Build the project first.');
  }
  return path;
}

function wordAtCursor(): string | undefined {
  const editor = window.activeTextEditor;
  if (!editor) return undefined;
  const wordRange = editor.document.getWordRangeAtPosition(editor.selection.active, /[A-Za-z_][A-Za-z0-9_]*/);
  return wordRange ? editor.document.getText(wordRange) : undefined;
}

/**
 * Shows a QuickPick of all named methods in the image. If the cursor is on a
 * word that matches a known method name it is pre-selected. The selected
 * method is then disassembled and shown in a side panel.
 */
export async function disassembleMethod(
  findImageByPattern: (ask: boolean) => Promise<string | undefined>,
): Promise<void> {
  const imagePath = await pickImageFile(findImageByPattern);
  if (!imagePath) return;

  let methods: MethodSummary[];
  try {
    methods = getMethodsFromImage(imagePath);
  } catch (err: any) {
    window.showErrorMessage(`Failed to read image: ${err.message}`);
    return;
  }

  if (methods.length === 0) {
    window.showErrorMessage('No methods found in the image. The image may lack debug symbols (GSYM/MHLS blocks).');
    return;
  }

  const cursor = wordAtCursor();
  const items = methods.map((m) => ({
    label: m.name,
    description: [
      `params: ${m.varArgs ? m.paramCount + '+' : m.paramCount}${m.optParamCount > 0 ? ` (+${m.optParamCount} opt)` : ''}`,
      `locals: ${m.localCount}`,
      `addr: 0x${m.codePoolAddr.toString(16)}`,
    ].join('  |  '),
    method: m,
  }));

  // Pre-select if cursor word matches a known method name
  const activeItem = cursor ? items.find((i) => i.label === cursor) : undefined;

  const selected = await window.showQuickPick(items, {
    placeHolder: 'Select method to disassemble',
    matchOnDescription: true,
    ...(activeItem ? {} : {}),
  });

  if (!selected) return;

  let asm: string;
  try {
    asm = disassembleNamedMethod(imagePath, selected.label);
  } catch (err: any) {
    window.showErrorMessage(`Disassembly failed: ${err.message}`);
    return;
  }

  await showVirtualDocument(DISASM_METHOD_URI, asm);
}

/**
 * Disassembles every method in the image and opens the result in a side panel.
 */
export async function disassembleImage(
  findImageByPattern: (ask: boolean) => Promise<string | undefined>,
): Promise<void> {
  const imagePath = await pickImageFile(findImageByPattern);
  if (!imagePath) return;

  let asm: string;
  try {
    asm = disassembleAllMethods(imagePath);
  } catch (err: any) {
    window.showErrorMessage(`Disassembly failed: ${err.message}`);
    return;
  }

  await showVirtualDocument(DISASM_IMAGE_URI, asm);
}
