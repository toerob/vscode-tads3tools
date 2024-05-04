import { DocumentSymbol, SymbolKind } from 'vscode-languageserver';
import { isUsingAdv3Lite } from '../../parse-workers-manager';
import { ExtendedDocumentSymbolProperties } from '../../parser/Tads3SymbolListener';
import { TadsSymbolManager } from '../symbol-manager';
import { serverState } from '../../state';
import { DefaultMapObject } from './DefaultMapObject';
import { crawlRooms } from './map-crawling';

enum EditorMode { MAP=0, NPC=1 }

export default class MapObjectManager {
	
	static npcSpecificRegexp = new RegExp(/ActorState|AccompanyingState|AgendaItem|Topic|ConvNode|ConversationReadyState|InConversationState/);

	showAllRooms = true;

	selectedEditor = EditorMode.MAP;
	newlyCreatedRoomsSet: Set<string> = new Set();
	persistedObjectPositions: any = new Map();

	startRoom: string|undefined = undefined;

	
	constructor(private symbolManager: TadsSymbolManager) {
		
	}

	/**
	 * 
	 * @param fsPath setting it to undefined means: map all possible objects
	 * @returns 
	 */
	public mapGameObjectsToMapObjects( fsPath: string|undefined = undefined): DefaultMapObject[] {
		let mappedSymbols: DocumentSymbol[] = [];
		
		// Hold a temporary map structure of additionalProperties where the symbol name acts as key
		//const additionalProps: Map<string,ExtendedDocumentSymbolProperties> = new Map();
		
		if (this.showAllRooms || this.selectedEditor === EditorMode.NPC) {
			for (const fileNameKey of this.symbolManager.symbols.keys()) {
				const localFileSymbols = this.symbolManager.symbols.get(fileNameKey)  ?? [];
				for (const localSymbol of localFileSymbols) {
					mappedSymbols.push(localSymbol);
					//this.addAdditionalPropsToMap(localSymbol, fileNameKey, additionalProps);
				}
			}
		} else if (fsPath) {
			mappedSymbols = this.symbolManager.symbols.get(fsPath) ?? [];
		}
		// OR only the one that's in the current file:



		const classInheritanceMap = this.symbolManager.inheritanceMap;


		// Here begins the mapping for the NPC-editor
		/*if (this.selectedEditor === 1) {
			let globalY = 0;

			const arrayOfAllSymbols = flattenTreeToArray(mappedSymbols);

			//for (let a of arrayOfAllSymbols) {
			//	if (![SymbolKind.Object, SymbolKind.Class].includes(a.kind)) {
			//		continue;
			//	}
			//	let classList = this.craftClassInheritanceArrayFromCommaDelimDetail(a.detail);
			//	console.error(`${a.name} inherits from: ${classList.join(' -> ')}`);
			//}
			const actors = arrayOfAllSymbols
				.filter(x => [SymbolKind.Object].includes(x.kind))
				.filter(x => this.inheritesFromAny(x.detail, 'Actor'));
			
			const mappedObjects = actors.map(x => {
				const y = symbolManager.additionalProperties.get(x.name);
				return createMapObject(x,y, false, [SymbolKind.Object]);
			});
			
			for (const o of mappedObjects) {
				o.y = globalY;
				globalY += 3;
			}
			
			const sortedMappedObjects = mappedObjects.sort(function (a,b) {
				if (a.name > b.name) return -1;
				if (a.name < b.name) return 1;
				return 0;
			});
			return sortedMappedObjects;
		}*/

		// Here begins the map-editor
		let mapObjects: DefaultMapObject[] = [];


		// Map default inheritance if not already mapped:
		// TODO: tweak this for Tads2?
		setupClassInheritanceDefaultsTads3(classInheritanceMap);


		const roomOrDoorPredicate = serverState.tadsVersion === 3 ? this.isRoomOrDoorT3 : this.isRoomOrDoorT2;

		if (mappedSymbols.length > 0) {

			const objectsAsArray = Array.from(mappedSymbols);

			const classList = new Set([...this.symbolManager.inheritanceMap.keys()]);
			// Filter out rooms and doors and then classes:

			const roomsWithConnections = objectsAsArray
				.filter(x => roomOrDoorPredicate.bind(this)(x))
				.filter(x => !classList.has(x.name))
				.filter(x => !['unknownDest_','varDest_'].includes(x.name) && isUsingAdv3Lite);


			// And the first level of children of each:
			const childrenMap: DocumentSymbol[] = [];
			for (const r of roomsWithConnections) {
				r.children?.forEach(c => childrenMap.push(c));
			}

			// Make a whole array of them intermixed:
			const flattenedMap = [...roomsWithConnections, ...childrenMap];

			// Map them all to DefaultMapObjects:
			mapObjects = flattenedMap.map(x => {
				return this.createMapObject(x, false, [SymbolKind.Object]);
			});
			
			for (const mapObject of mapObjects) {
				if (this.newlyCreatedRoomsSet.has(mapObject.name)) {
					
					// Mark all new room as isNew=true
					// and hasAbsolutePosition, along with setting that value
					mapObject.isNew = true;
					const position = this.persistedObjectPositions.get(mapObject.name);
					if (position) {
						mapObject.x = position[0];
						mapObject.y = position[1];
						mapObject.hasAbsolutePosition = true;
					}
				}
			}



			try {

				//The old ways: mapObjects = crawlRooms(mapObjects, objectsAsArray);
				//TODO: filter out properties and already mapped rooms from mapObjects 
				// afterwards crawling (they are needed during crawling to make door 
				// connections work) and just return room objects

				const crawledObjects = crawlRooms(mapObjects, objectsAsArray, this.startRoom);

				// Remove already mapped objects
				const crawledObjectNames = crawledObjects.map(x => x.name);
				const uncrawledObjects = mapObjects.filter(x => !crawledObjectNames.includes(x.name));

				// Remove properties
				const propertiesAsNames = childrenMap.map(x => x.name);				
				const nonPropertiesAndUncrawledObjects = uncrawledObjects.filter(x => !propertiesAsNames.includes(x.name));
					


				// Return crawled (and uncrawled rooms (only))
				const collection = [...crawledObjects, ...nonPropertiesAndUncrawledObjects];

				const sortedCollection = collection.sort( function(a,b) {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
				//console.dir(sortedCollection);
				return sortedCollection;

			} catch (error) {
				console.error('Crawling failed', error);
			}
		}
		//let jsonObjects =  '[' + mapObjects.map(x=>(createJsonMapObject(x))).join(',') + ']';
		
		
		return mapObjects;
		/*const sortedMapObjects = mapObjects.sort((a,b) => {
					if (a.name > b.name) return -1;
					if (a.name < b.name) return 1;
					return 0;
				});
		return sortedMapObjects;*/
	}

	private findAdditionalProps(symbol: DocumentSymbol): ExtendedDocumentSymbolProperties|undefined {
		if (symbol) {
			for(const eachFileKey of this.symbolManager.additionalProperties.keys()) {
				const symbolAdditionalProps = this.symbolManager.additionalProperties.get(eachFileKey)?.get(symbol);
				if (symbolAdditionalProps) {
					return symbolAdditionalProps;
				}
			}
		}
		return undefined;
	}

	craftClassInheritanceArrayFromCommaDelimDetail(commaDelimitedClassList: string) {
		const classList = [];
		for (const kind of commaDelimitedClassList.split(',')) {
			classList.push(kind);
			this.craftClassInheritanceArray(kind, classList);
		}
		return classList;
	}

	craftClassInheritanceArray(derivedClassName: string, collection: string[] = []) {
		try {
			const superClass = this.symbolManager.inheritanceMap.get(derivedClassName);
			if (superClass && superClass.length>0 && superClass !== '__root__') {
				collection.push(superClass);
				this.craftClassInheritanceArray(superClass, collection);						
			}
		} catch (err) {
			console.error('err!');
		}
	}

	/**
	 * Checks if a derived class is derived from a particular class
	 * @param derivedClassName - the derived class you want to check
	 * @param className - the particular class you want to check the derived class against
	 * @returns True if so, false otherwise
	 */
	inheritesFrom(derivedClassName: string, className: string) {
		const classInheritanceMap = this.symbolManager.inheritanceMap;
		try {			
			if (className === derivedClassName) {
				return true;
			}
			const superClass = classInheritanceMap.get(derivedClassName);
			if (superClass && this.inheritesFrom(superClass, className)) {
				return true;
			}
		} catch (err) {
			console.log(err);
		}
		return false;
	}

	inheritesFromAny(commaDelimitedClassList: string, className: string) {
		for (const derivedClassName of commaDelimitedClassList.split(',')) {
			if (this.inheritesFrom(derivedClassName.trim(), className)) {
				//console.error(`${derivedClassName} derives from ${className}`);
				return true;
			} else {
				//console.error(`**** ${derivedClassName} does NOT derive from ${className}`);
			}
		}
		return false;
	}

	isRoomOrDoorT3(o: DocumentSymbol) {
		//TODO: minor "hack" until all library files are being processed
		// Should be removed once that is working perfectly
		const a = this.findAdditionalProps(o);
		try {
			if(a?.isClass) {
				return false;
			}
			if (o.detail) {
				if (o.detail.includes('Door') 
					|| o.detail.includes('Stairway')
					|| o.detail.includes('Passage')) {
					if (a) { a.superClassRoot ??= 'Door'; }
					return true;
				}
				if (this.inheritesFromAny(o.detail, 'Door')) {
					if (a) { a.superClassRoot ??= 'Door'; }
					return true;
				}
				if (this.inheritesFromAny(o.detail, 'Room')) {
					if (a) { a.superClassRoot ??= 'Room'; }
					return true;
				}		
				if (this.inheritesFromAny(o.detail, 'room')) {
					if (a) { a.superClassRoot ??= 'room'; }
					return true;
				}		
			} 

		} catch(err) {
			console.error(err);
		}
		return false;
	}

	isRoomOrDoorT2(o: DocumentSymbol) {
		//TODO: minor "hack" until all library files are being processed
		// Should be removed once that is working perfectly
		const a = this.findAdditionalProps(o);
		try {
			if(a?.isClass) {
				return false;
			}
			if (o.detail) {
				if (o.detail.includes('doorway')) {
					if (a) { a.superClassRoot ??= 'doorway'; }
					return true;
				}
				if (this.inheritesFromAny(o.detail, 'room')) {
					if (a) { a.superClassRoot ??= 'room'; }
					return true;
				}		
			} 

		} catch(err) {
			console.error(err);
		}
		return false;
	}

	isDir(str: string) {
		return str.match(/north|south|east|west|northeast|northwest|southeast|southwest|up|down|in|out|fore|port|aft|starboard/);
	}


	/**
	 * 
	 * @param symbol - The documentSymbol
	 * @param skipChildren 
	 * @param childrenKinds - only create children of the types defined in childrenKinds
	 * @returns 
	 */
	createMapObject(symbol: DocumentSymbol, skipChildren = true, childrenKinds:SymbolKind[] = []): DefaultMapObject {
		const mapObj: DefaultMapObject = new DefaultMapObject(symbol.name);
		if (!skipChildren) {
			const children: DocumentSymbol[] = symbol.children ?? [];
			for (const child of children) {
				if (childrenKinds === undefined || childrenKinds.includes(child.kind)) {
					try {
						mapObj.children.push(this.createMapObject(child as DocumentSymbol, false, childrenKinds));
					} catch (err) {
						console.error(err);
					}
				}
			}
		}
		const props = this.findAdditionalProps(symbol);
		mapObj.parent = props?.parent?.name;
		mapObj.shortName = props?.shortName;
		mapObj.arrowConnection = props?.arrowConnection;
		mapObj.kind = symbol.kind;
		mapObj.detail = symbol.detail;
		
		const isAssignment = (obj: DocumentSymbol) => {
			const isAssignment = this.findAdditionalProps(obj)?.isAssignment;
			return isAssignment;
		};

		mapObj.north = symbol.children?.find(x => isAssignment(x) && x.name === 'north')?.detail;
		mapObj.south = symbol.children?.find(x => isAssignment(x) && x.name === 'south')?.detail;

		if(serverState.tadsVersion === 3) {
			mapObj.northeast = symbol.children?.find(x => isAssignment(x) && x.name === 'northeast')?.detail;
			mapObj.northwest = symbol.children?.find(x => isAssignment(x) && x.name === 'northwest')?.detail;
			mapObj.southeast = symbol.children?.find(x => isAssignment(x) && x.name === 'southeast')?.detail;
			mapObj.southwest = symbol.children?.find(x => isAssignment(x) && x.name === 'southwest')?.detail;
		} else {
			mapObj.northeast = symbol.children?.find(x => isAssignment(x) && x.name === 'ne')?.detail;
			mapObj.northwest = symbol.children?.find(x => isAssignment(x) && x.name === 'nw')?.detail;
			mapObj.southeast = symbol.children?.find(x => isAssignment(x) && x.name === 'se')?.detail;
			mapObj.southwest = symbol.children?.find(x => isAssignment(x) && x.name === 'sw')?.detail;


			mapObj.doordest = symbol.children?.find(x => isAssignment(x) && x.name === 'doordest')?.detail;
		}

		mapObj.east = symbol.children?.find(x => isAssignment(x) && x.name === 'east')?.detail;
		mapObj.west = symbol.children?.find(x => isAssignment(x) && x.name === 'west')?.detail;


		mapObj.up = symbol.children?.find(x => isAssignment(x) && x.name === 'up')?.detail;
		mapObj.down = symbol.children?.find(x => isAssignment(x) && x.name === 'down')?.detail;

		mapObj.in = symbol.children?.find(x => isAssignment(x) && x.name === 'in')?.detail;
		mapObj.out = symbol.children?.find(x => isAssignment(x) && x.name === 'out')?.detail;

		// Sets north to fore if north is not already set, etc...
		mapObj.north =  mapObj.north? mapObj.north:symbol.children?.find(x => isAssignment(x) && x.name === 'fore')?.detail;
		mapObj.south = mapObj.south? mapObj.south: symbol.children?.find(x => isAssignment(x) && x.name === 'aft')?.detail;
		mapObj.west = mapObj.west? mapObj.west: symbol.children?.find(x => isAssignment(x) && x.name === 'port')?.detail;
		mapObj.east = mapObj.east? mapObj.east: symbol.children?.find(x => isAssignment(x) && x.name === 'starboard')?.detail;


		// Go through each travelConnector's destination value and assign it:
		const possibleExits = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'in', 'out', 'fore', 'port', 'aft', 'starboard'];
		for (const dir of possibleExits) {
			if (!hasExit(mapObj, dir)) {
				const room = props?.travelConnectorMap.get(dir);
				if (room) {
					setExit(mapObj, dir, room);
				}
			}
		}
		return mapObj;
	}
	
}






function hasExit(obj:any, dir:any) {
	return obj[dir];
}
function setExit(obj: any, dir: any, exit: any) {
	obj[dir] = exit;

}

function setupClassInheritanceDefaultsTads3(classInheritanceMap: Map<string, string>) {
	if (!classInheritanceMap.get('object')) {
		classInheritanceMap.set('object', '__root__');
	}

	if (!classInheritanceMap.get('Actor')) {
		classInheritanceMap.set('Actor', '__root__');
	}

	if (!classInheritanceMap.get('Room')) {
		classInheritanceMap.set('Room', '__root__');
	}
	if (!classInheritanceMap.get('OutdoorRoom')) {
		classInheritanceMap.set('OutdoorRoom', 'Room');
	}
	if (!classInheritanceMap.get('Door')) {
		classInheritanceMap.set('Door', '__root__');
	}

}
