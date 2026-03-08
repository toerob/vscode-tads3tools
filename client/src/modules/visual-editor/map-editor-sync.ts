import { workspace, window, ViewColumn, Position } from "vscode";
import { client } from "../../extension";

async function connectRoomViaDirection(room: any, validDirection: any, nextRoom: any) {
  const doc = await workspace.openTextDocument(room.filePath);
  const editor = await window.showTextDocument(doc, ViewColumn.One);

  const direction = String(validDirection);
  const nextRoomName = String(nextRoom?.symbol?.name ?? "");
  if (!direction || !nextRoomName) return;

  const startLine = room?.symbol?.range?.start?.line;
  const endLine = room?.symbol?.range?.end?.line;
  if (typeof startLine !== "number" || typeof endLine !== "number") return;

  const safeEndLine = Math.min(endLine, editor.document.lineCount - 1);
  const directionLineRe = new RegExp(`^\\s*${direction}\\s*=`, "i");

  const existingLines: number[] = [];
  for (let line = startLine; line <= safeEndLine; line++) {
    const text = editor.document.lineAt(line).text;
    if (directionLineRe.test(text)) {
      existingLines.push(line);
    }
  }

  await editor.edit((builder) => {
    if (existingLines.length > 0) {
      // Replace the first occurrence, delete any duplicates.
      const firstLine = existingLines[0];
      const lineText = editor.document.lineAt(firstLine).text;
      const indentMatch = lineText.match(/^\s*/);
      const indent = indentMatch ? indentMatch[0] : "\t";
      const replacement = `${indent}${direction} = ${nextRoomName}\n`;
      builder.replace(editor.document.lineAt(firstLine).rangeIncludingLineBreak, replacement);

      // Delete from bottom to top to avoid overlapping edits.
      for (let i = existingLines.length - 1; i >= 1; i--) {
        const dupLine = existingLines[i];
        builder.delete(editor.document.lineAt(dupLine).rangeIncludingLineBreak);
      }
    } else {
      const pos = new Position(safeEndLine, 0);
      const text = `\t${direction} = ${nextRoomName}\n`;
      builder.insert(pos, text);
    }
  });
}

export async function connectRoomsWithProperties(
  fromRoom: any,
  toRoom: any,
  validDirection1: any,
  validDirection2: any,
) {
  if (fromRoom.symbol.range.start.line > toRoom.symbol.range.start.line) {
    // Must begin with the room furthest down in the document,
    // otherwise the position will be stale and the new direction property
    // will be placed above the room object

    await connectRoomViaDirection(fromRoom, validDirection1, toRoom);
    await connectRoomViaDirection(toRoom, validDirection2, fromRoom);
  } else {
    // Shifted order here:
    await connectRoomViaDirection(toRoom, validDirection2, fromRoom);
    await connectRoomViaDirection(fromRoom, validDirection1, toRoom);
  }

  await workspace
    .openTextDocument(fromRoom.filePath)
    .then((x) => x.save())
    .then((saveResult) => console.log(`${saveResult} saved `));

  if (fromRoom.filePath !== toRoom.filePath) {
    await workspace
      .openTextDocument(toRoom.filePath)
      .then((x) => x.save())
      .then((saveResult) => console.log(`${saveResult} saved `));
  }
}
