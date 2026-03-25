import { DocumentSymbol, SymbolKind } from "vscode-languageserver";
import { isUsingAdv3Lite } from "../../parse-workers-manager";
import { serverState } from "../../state";
import { DefaultMapObject } from "./DefaultMapObject";

export const possibleExits = [
  "north",
  "south",
  "east",
  "west",
  "northeast",
  "northwest",
  "southeast",
  "southwest",
  "up",
  "down",
  "in",
  "out",
  "fore",
  "aft",
  "port",
  "starboard",
];
const dirArray: string[] = [
  "north",
  "south",
  "east",
  "west",
  "northeast",
  "northwest",
  "southeast",
  "southwest",
  "up",
  "down",
  "fore",
  "aft",
  "port",
  "starboard" /*,'in','out'*/,
];
let crawledRooms: DefaultMapObject[] = [];

let minX = 0;
let minY = 0;
let minZ = 0;

let symbols: any[];

const unlistedProxyRegExp = /static\(\((\w+)\)\.createUnlistedProxy/;
const unlistedProxyRegExpAdv3Lite = new RegExp(/UnlistedProxyConnector{\s*direction\s*[=]\s*(.*)\s*}/);
const travelConnectorRegExp = new RegExp(/TravelConnector.*destination[=](.*)travelDesc.*/);

const dirCoordsMap: any = {
  north: [0, -1, 0],
  south: [0, 1, 0],
  east: [1, 0, 0],
  west: [-1, 0, 0],
  northeast: [1, -1, 0],
  northwest: [-1, -1, 0],
  southeast: [1, 1, 0],
  southwest: [-1, 1, 0],
  up: [0, 0, 1],
  down: [0, 0, -1],
  //in: [0, 0, -1],
  //out: [0, 0, 1]
};

function getDirectionCoords(dir: string): [] {
  return dirCoordsMap[dir];
}

function getAdjacentRoomName(room: any, direction: string): string {
  return room[direction];
}
function setAdjacentRoomName(room: any, direction: string, newname: string) {
  room[direction] = newname;
}

export function crawlRooms(
  mapObjects: DefaultMapObject[],
  objectsAsArray: DocumentSymbol[],
  startRoom: any = undefined,
) {
  const tadsVersion = serverState.tadsVersion;
  if (startRoom === undefined) {
    if (tadsVersion === 3) {
      // Find the first Object with a direction property:
      startRoom = mapObjects
        .filter((x) => x.kind === SymbolKind.Object)
        .find((x) => dirArray.find((dir) => getAdjacentRoomName(x, dir) !== undefined));

      if (startRoom === undefined) {
        startRoom = mapObjects.find((x) => x.kind === SymbolKind.Object && x.detail?.includes("Room"));
      }
    } else {
      // Tads2
      if (startRoom === undefined) {
        startRoom = mapObjects.find((x) => x.kind === SymbolKind.Object && x.detail?.includes("room"));
      }
    }
  } else {
    startRoom = mapObjects.find((x) => x.name === startRoom);
  }

  symbols = objectsAsArray;
  crawledRooms = [];

  if (tadsVersion === 3) {
    crawlRoomTads3(startRoom, [0, 0, 0], mapObjects);
  } else {
    crawlRoomTads2(startRoom, [0, 0, 0], mapObjects);
  }

  crawledRooms.forEach((room) => {
    room.x += Math.abs(minX);
    room.y += Math.abs(minY);
    //room.z += Math.abs(minZ);
  });

  resolvePositionConflicts(crawledRooms);

  return crawledRooms;
}

function resolvePositionConflicts(rooms: DefaultMapObject[]): void {
  const byPos = new Map<string, DefaultMapObject[]>();
  for (const room of rooms) {
    const key = `${room.x},${room.y},${room.z}`;
    if (!byPos.has(key)) byPos.set(key, []);
    byPos.get(key)!.push(room);
  }
  for (const [, group] of byPos) {
    if (group.length <= 1) continue;
    group.sort((a, b) => a.name.localeCompare(b.name));
    group.forEach((room, i) => {
      const angle = (2 * Math.PI * i) / group.length;
      room.x += 0.5 * Math.cos(angle);
      room.y += 0.5 * Math.sin(angle);
    });
  }
}

export function flattenArrayByType(objects: DocumentSymbol[], kind: SymbolKind): DocumentSymbol[] {
  const objectArray: DocumentSymbol[] = [...objects];
  for (const o of objectArray) {
    objectArray.push(...flattenArrayByType(o.children as DocumentSymbol[], kind));
  }
  return objectArray;
}

function crawlRoomTads3(startRoom: DefaultMapObject, startCoords: any[], mapObjects: any[]) {
  // Pre-build a lookup: door name → parent room name.
  // This lets us resolve "otherSide" doors without searching the symbol tree.
  const doorParentMap = new Map<string, string>();
  for (const obj of mapObjects) {
    if (obj.parent && obj.detail && /Door|Passage|Stairway/.test(obj.detail)) {
      doorParentMap.set(obj.name, obj.parent);
    }
  }

  // Pre-resolve all asExit / UnlistedProxy / TravelConnector references
  // so the BFS doesn't depend on iteration order.
  for (const room of mapObjects) {
    for (const dir of dirArray) {
      let target = getAdjacentRoomName(room, dir);
      if (target === undefined) continue;

      const tcMatch = travelConnectorRegExp.exec(target);
      if (tcMatch) {
        target = tcMatch[1];
        setAdjacentRoomName(room, dir, target);
        continue;
      }

      let proxyMatch = unlistedProxyRegExp.exec(target);
      if (proxyMatch) {
        const proxyDir = proxyMatch[1];
        const resolved = getAdjacentRoomName(room, proxyDir);
        if (resolved !== undefined) {
          setAdjacentRoomName(room, dir, resolved);
        }
        continue;
      }

      proxyMatch = unlistedProxyRegExpAdv3Lite.exec(target);
      if (proxyMatch) {
        const proxyDir = proxyMatch[1];
        const resolved = getAdjacentRoomName(room, proxyDir);
        if (resolved !== undefined) {
          setAdjacentRoomName(room, dir, resolved);
        } else {
          console.error(`${proxyMatch[1]} as property wasn't found within ${room.name}`);
        }
      }
    }
  }

  // A second pass to resolve chained proxies (e.g. east = asExit(north), north = asExit(south)).
  // Keep resolving until stable or max iterations reached.
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (const room of mapObjects) {
      for (const dir of dirArray) {
        const target = getAdjacentRoomName(room, dir);
        if (target === undefined) continue;

        let proxyMatch = unlistedProxyRegExp.exec(target) ?? unlistedProxyRegExpAdv3Lite.exec(target);
        if (proxyMatch) {
          const resolved = getAdjacentRoomName(room, proxyMatch[1]);
          if (resolved !== undefined && resolved !== target) {
            setAdjacentRoomName(room, dir, resolved);
            changed = true;
          }
        }

        const tcMatch = travelConnectorRegExp.exec(target);
        if (tcMatch) {
          setAdjacentRoomName(room, dir, tcMatch[1]);
          changed = true;
        }
      }
    }
    if (!changed) break;
  }

  const visited = new Set<DefaultMapObject>();
  const queue: { room: DefaultMapObject; coords: any[] }[] = [{ room: startRoom, coords: startCoords }];
  visited.add(startRoom);

  while (queue.length > 0) {
    const { room, coords } = queue.shift()!;

    crawledRooms.push(room);
    room.isMapped = true;

    minX = Math.min(minX, coords[0]);
    minY = Math.min(minY, coords[1]);
    minZ = Math.min(minZ, coords[2]);

    room.x = coords[0];
    room.y = coords[1];
    room.z = coords[2];

    for (const dir of dirArray) {
      const nextRoomName = getAdjacentRoomName(room, dir);
      if (nextRoomName === undefined) {
        continue;
      }

      let nextRoom = mapObjects.find((x) => x.name === nextRoomName);
      if (nextRoom === undefined) {
        continue;
      }

      if (nextRoom.detail && /Door|Passage|Stairway/.test(nextRoom.detail)) {
        // Resolve through the other side of the door to find the destination room.
        const otherSideName = nextRoom.otherSide ?? nextRoom.arrowConnection;
        if (otherSideName) {
          const destRoomName = doorParentMap.get(otherSideName);
          if (destRoomName) {
            const destRoom = mapObjects.find((x) => x.name === destRoomName);
            if (destRoom) {
              nextRoom = destRoom;
              setAdjacentRoomName(room, dir, destRoom.name);
            }
          }
        }
      }

      if (visited.has(nextRoom)) {
        continue;
      }
      visited.add(nextRoom);

      try {
        const offsetCoords: any = getDirectionCoords(dir);
        const nextCoords: any = [
          room.x + offsetCoords[0],
          room.y + offsetCoords[1],
          room.z + offsetCoords[2],
        ];
        queue.push({ room: nextRoom, coords: nextCoords });
      } catch (error) {
        console.error(`room ${room} and direction: ${dir}, crawling failure: ${error}`);
      }
    }
  }
}

function crawlRoomTads2(room: DefaultMapObject, coords: any[], mapObjects: any[]) {
  if (crawledRooms.includes(room)) {
    return;
  }
  crawledRooms.push(room);
  room.isMapped = true;

  minX = Math.min(minX, coords[0]);
  minY = Math.min(minY, coords[1]);
  minZ = Math.min(minY, coords[2]);

  room.x = coords[0];
  room.y = coords[1];
  room.z = coords[2];
  //console.log(`Adding room: ${room.name} x,y,z: ${room.x},${room.y},${room.z}`);
  for (const dir of dirArray) {
    let nextRoomName = getAdjacentRoomName(room, dir); /*room[dir]*/
    if (nextRoomName === undefined) {
      continue;
    }

    let nextRoom = mapObjects.find((x) => x.name === nextRoomName);
    if (nextRoom === undefined) {
      continue;
    }

    if (nextRoom.detail.includes("doorway")) {
      if (nextRoom.doordest) {
        const doorwayParentNode = symbols.find((x) => x.name === nextRoom.doordest);
        if (doorwayParentNode) {
          nextRoom = mapObjects.find((x) => x.name === doorwayParentNode.name);
          setAdjacentRoomName(room, dir, nextRoom.name);
        }
      } else if (nextRoom.arrowConnection) {
        const doorwayNode = symbols.find((x) => x.name === nextRoom.arrowConnection);
        const doorwayLocationChildNode = doorwayNode.children.find((x: any) => x.name === "location");
        const doorwayParentNode = symbols.find((x) => x.name === doorwayLocationChildNode.detail);
        if (doorwayParentNode) {
          nextRoom = mapObjects.find((x) => x.name === doorwayParentNode.name);

          setAdjacentRoomName(room, dir, nextRoom.name);
        }
      }
    }

    try {
      const offsetCoords: any = getDirectionCoords(dir);
      const nextCoords: any = [...offsetCoords];

      nextCoords[0] = room.x + offsetCoords[0];
      nextCoords[1] = room.y + offsetCoords[1];
      nextCoords[2] = room.z + offsetCoords[2];
      crawlRoomTads2(nextRoom, nextCoords, mapObjects);
    } catch (error) {
      console.error(`room ${room} and direction: ${dir}, crawling failure: ${error}`);
    }
  }
}
