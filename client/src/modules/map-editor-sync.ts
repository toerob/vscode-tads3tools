import { workspace, window, ViewColumn, Position } from "vscode";
import { client } from "../extension";

async function connectRoomViaDirection(room: any, validDirection: any, nextRoom: any) {
  await workspace.openTextDocument(room.filePath).then((doc) =>
    window.showTextDocument(doc, ViewColumn.One).then((editor) => {
      editor.edit((editor) => {
        const pos = new Position(room.symbol.range.end.line, 0);
        const text = `\t${validDirection} = ${nextRoom.symbol.name}\n`;
        editor.insert(pos, text);
      });
      return editor;
    }),
  );
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
