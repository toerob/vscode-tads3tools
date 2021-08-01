import { DocumentSymbol, SymbolKind } from 'vscode';
import { DefaultMapObject } from './DefaultMapObject';

export const possibleExits = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'in', 'out', 'fore', 'aft', 'port', 'starboard'];
// TODO: use possibleExits in extension.ts instead
const dirArray: string[] = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'fore', 'aft', 'port', 'starboard' /*,'in','out'*/];
let crawledRooms: DefaultMapObject[] = [];

let minX = 0;
let minY = 0;
let minZ = 0;

let symbols: any[];

const unlistedProxyRegExp = new RegExp(/static[(]{2}(.*)[)][.]createUnlistedProxy/);
const unlistedProxyRegExpAdv3Lite = new RegExp(/UnlistedProxyConnector{\s*direction\s*[=]\s*(.*)\s*}/);
const travelConnectorRegExp = new RegExp(/TravelConnector.*destination[=](.*)travelDesc.*/);
//TravelConnector{destination=forestPathtravelDesc="


const dirCoordsMap: any = {
	"north": [0, -1, 0],
	"south": [0, 1, 0],
	"east": [1, 0, 0],
	"west": [-1, 0, 0],
	"northeast": [1, -1, 0],
	"northwest": [-1, -1, 0],
	"southeast": [1, 1, 0],
	"southwest": [-1, 1, 0],
	"up": [0, 0, 1],
	"down": [0, 0, -1],
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

export function crawlRooms(mapObjects: DefaultMapObject[], objectsAsArray: DocumentSymbol[], startRoom: any = undefined) {
	if (startRoom === undefined) {
		// Find the first Object with a direction property:
		startRoom = mapObjects
			.filter(x => x.kind === SymbolKind.Object)
			//.find(x => x.props.find(x=>dirArray.includes(x.name)) )
			.find(x => dirArray.find(dir => getAdjacentRoomName(x, dir) /*x[dir]*/ !== undefined));

		if (startRoom === undefined) {
			startRoom = mapObjects
				.find(x => x.kind === SymbolKind.Object && x.detail?.includes('Room'));
		}

	} else {
		startRoom = mapObjects.find(x => x.name === startRoom);
	}
	symbols = objectsAsArray;
	crawledRooms = [];
	crawlRoom(startRoom, [0, 0, 0], mapObjects);
	crawledRooms.forEach(room => {
		room.x += Math.abs(minX);
		room.y += Math.abs(minY);
		//room.z += Math.abs(minZ);
	});
	return crawledRooms;
}

export function flattenArrayByType(objects: any[], kind: SymbolKind): DocumentSymbol[] {
	const objectArray: DocumentSymbol[] = [...objects];
	for (const o of objectArray) {
		objectArray.push(...flattenArrayByType(o.children, kind));
	}
	return objectArray;
}

function crawlRoom(room: DefaultMapObject, coords: any[], mapObjects: any[]) {
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
	//console.error(`Adding room: ${room.name} x,y,z: ${room.x},${room.y},${room.z}`);
	for (const dir of dirArray) {
		let nextRoomName = getAdjacentRoomName(room, dir) /*room[dir]*/;
		if (nextRoomName === undefined) {
			continue;
		}

		const travelConnectorMatch = travelConnectorRegExp.exec(nextRoomName);
		if (travelConnectorMatch) {
			nextRoomName = travelConnectorMatch[1];
			setAdjacentRoomName(room, dir, nextRoomName);
			//room[dir] = nextRoomName;
			//console.error(`Replacing travelConnector match ${match[1]} with: ${nextRoomName}`);
		}
		let match = unlistedProxyRegExp.exec(nextRoomName);
		if (match) {
			const dir = match[1];
			//TODO: Make sure this works as before
			nextRoomName = getAdjacentRoomName(room, dir);
			setAdjacentRoomName(room, dir, nextRoomName);
			//nextRoomName = room[match[1]];
			//room[dir] = nextRoomName;

			//console.error(`Replacing proxy direction match ${match[1]} with: ${nextRoomName}`);
		} else {
			match = unlistedProxyRegExpAdv3Lite.exec(nextRoomName);
			if (match) {
				const dir = match[1];
				nextRoomName = getAdjacentRoomName(room, dir);
				//nextRoomName = room[match[1]];

				if (nextRoomName === undefined) {
					console.error(`${match[1]} as property wasn't found within ${room.name}`);
				}
				setAdjacentRoomName(room, dir, nextRoomName);
				//room[dir] = nextRoomName;

				//console.error(`Replacing proxy direction match ${match[1]} with: ${nextRoomName}`);
			}
		}

		// TODO: broken.. need to fix. or not use at all. It gets redundant in a way. 
		// Optional paths is either to allow certain 
		// '//' - comment to add specifics when it is to hard to computate
		//  or evaluate the row using the compiler's built in eval function, but that seems even more wasteful.

		// Last, check children objects that contains the word door, and see if they have an arrowConnection
		//if (room[dir] === undefined) {
		/*room.children.filter(x => x.arrowConnection !== undefined && x.detail.includes('Door')).forEach(door => {
			let parentNode = symbols.find(x => x.children?.find(x => x.name === door.arrowConnection));
			if (parentNode) {
				door = mapObjects.find(x => x.name === parentNode.name);
				let dirToDoor = dirArray.find(x => room[x] === room.name);
				if (dirToDoor) {
					room[dirToDoor] = door.name;
				}
			}
		})*/
		//}


		let nextRoom = mapObjects.find(x => x.name === nextRoomName);
		if (nextRoom === undefined) {
			continue;
		}

		if (nextRoom.detail.includes('Door') || nextRoom.detail.includes('Stairway')) {
			//console.error(` (Passage type: ${nextRoom.detail}) `);

			if (nextRoom.arrowConnection) {
				const parentNode = symbols.find(x => x.children?.find((x: DefaultMapObject) => x.name === nextRoom.arrowConnection));
				if (parentNode) {
					nextRoom = mapObjects.find(x => x.name === parentNode.name);

					setAdjacentRoomName(room, dir, nextRoom.name);
					//room[dir] = nextRoom.name;

					//console.error(`  (Replacing door object to parent node: ${nextRoom.name})`);
				}
			}
		}



		try {
			const offsetCoords: any = getDirectionCoords(dir);
			const nextCoords: any = [...offsetCoords];

			nextCoords[0] = room.x + offsetCoords[0];
			nextCoords[1] = room.y + offsetCoords[1];
			nextCoords[2] = room.z + offsetCoords[2];
			crawlRoom(nextRoom, nextCoords, mapObjects);
		} catch (error) {
			console.error(`room ${room} and direction: ${dir}, crawling failure: ${error}`);
		}
	}
}

