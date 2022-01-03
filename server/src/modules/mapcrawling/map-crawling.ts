import { DocumentSymbol, SymbolKind } from 'vscode-languageserver';
import { isUsingAdv3Lite } from '../../parse-workers-manager';
import { serverState } from '../../state';
import { DefaultMapObject } from './DefaultMapObject';

export const possibleExits = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'in', 'out', 'fore', 'aft', 'port', 'starboard'];
const dirArray: string[] = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'fore', 'aft', 'port', 'starboard' /*,'in','out'*/];
let crawledRooms: DefaultMapObject[] = [];

let minX = 0;
let minY = 0;
let minZ = 0;

let symbols: any[];

const unlistedProxyRegExp = new RegExp(/static[(]{2}(.*)[)][.]createUnlistedProxy/);
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

export function crawlRooms(mapObjects: DefaultMapObject[], objectsAsArray: DocumentSymbol[], startRoom: any = undefined) {
	const tadsVersion = serverState.tadsVersion;
	if (startRoom === undefined) {
		if(tadsVersion === 3) {
			// Find the first Object with a direction property:
			startRoom = mapObjects
				.filter(x => x.kind === SymbolKind.Object)
				.find(x => dirArray.find(dir => getAdjacentRoomName(x, dir) !== undefined));

			if (startRoom === undefined) {
				
				startRoom = mapObjects
					.find(x => x.kind === SymbolKind.Object && x.detail?.includes('Room'));
			}
		} else {
			// Tads2
			if (startRoom === undefined) {	
				startRoom = mapObjects
					.find(x => x.kind === SymbolKind.Object && x.detail?.includes('room'));
			}
		}
	} else {
		startRoom = mapObjects.find(x => x.name === startRoom);
	}



	symbols = objectsAsArray;
	crawledRooms = [];

	if(tadsVersion === 3) {
		crawlRoomTads3(startRoom, [0, 0, 0], mapObjects);
	} else {
		crawlRoomTads2(startRoom, [0, 0, 0], mapObjects);
	}

	crawledRooms.forEach(room => {
		room.x += Math.abs(minX);
		room.y += Math.abs(minY);
		//room.z += Math.abs(minZ);
	});
	return crawledRooms;
}

export function flattenArrayByType(objects: DocumentSymbol[], kind: SymbolKind): DocumentSymbol[] {
	const objectArray: DocumentSymbol[] = [...objects];
	for (const o of objectArray) {
		objectArray.push(...flattenArrayByType(o.children as DocumentSymbol[], kind));
	}
	return objectArray;
}

function crawlRoomTads3(room: DefaultMapObject, coords: any[], mapObjects: any[]) {
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
		let nextRoomName = getAdjacentRoomName(room, dir) /*room[dir]*/;
		if (nextRoomName === undefined) {
			continue;
		}

		const travelConnectorMatch = travelConnectorRegExp.exec(nextRoomName);
		if (travelConnectorMatch) {
			nextRoomName = travelConnectorMatch[1];
			setAdjacentRoomName(room, dir, nextRoomName);
			//room[dir] = nextRoomName;
			//console.log(`Replacing travelConnector match ${match[1]} with: ${nextRoomName}`);
		}
		let match = unlistedProxyRegExp.exec(nextRoomName);
		if (match) {
			const dir = match[1];
			//TODO: Make sure this works as before
			nextRoomName = getAdjacentRoomName(room, dir);
			setAdjacentRoomName(room, dir, nextRoomName);
			//nextRoomName = room[match[1]];
			//room[dir] = nextRoomName;

			//console.log(`Replacing proxy direction match ${match[1]} with: ${nextRoomName}`);
		} else {
			match = unlistedProxyRegExpAdv3Lite.exec(nextRoomName);
			if (match) {
				const dir = match[1];
				nextRoomName = getAdjacentRoomName(room, dir);

				if (nextRoomName === undefined) {
					console.error(`${match[1]} as property wasn't found within ${room.name}`);
				}
				setAdjacentRoomName(room, dir, nextRoomName);
				//console.log(`Replacing proxy direction match ${match[1]} with: ${nextRoomName}`);
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
			if (nextRoom.arrowConnection) {
				const parentNode = symbols.find(x => x.children?.find((x: DefaultMapObject) => x.name === nextRoom.arrowConnection));
				if (parentNode) {
					nextRoom = mapObjects.find(x => x.name === parentNode.name);
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
			crawlRoomTads3(nextRoom, nextCoords, mapObjects);
		} catch (error) {
			console.error(`room ${room} and direction: ${dir}, crawling failure: ${error}`);
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
		let nextRoomName = getAdjacentRoomName(room, dir) /*room[dir]*/;
		if (nextRoomName === undefined) {
			continue;
		}

		let nextRoom = mapObjects.find(x => x.name === nextRoomName);
		if (nextRoom === undefined) {
			continue;
		}

		if (nextRoom.detail.includes('doorway')) {
			if(nextRoom.doordest) {
				const doorwayParentNode = symbols.find(x => x.name === nextRoom.doordest);
				if (doorwayParentNode) {
					nextRoom = mapObjects.find(x => x.name === doorwayParentNode.name);
					setAdjacentRoomName(room, dir, nextRoom.name);
				}
			} else if (nextRoom.arrowConnection) {
				const doorwayNode = symbols.find(x => x.name === nextRoom.arrowConnection);
				const doorwayLocationChildNode = doorwayNode.children.find((x:any)=>x.name === 'location');
				const doorwayParentNode = symbols.find(x => x.name === doorwayLocationChildNode.detail);
				if (doorwayParentNode) {
					nextRoom = mapObjects.find(x => x.name === doorwayParentNode.name);
					
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