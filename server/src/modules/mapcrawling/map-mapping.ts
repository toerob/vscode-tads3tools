import { DocumentSymbol, SymbolKind } from 'vscode-languageserver';
import { ExtendedDocumentSymbolProperties } from '../../parser/Tads3SymbolListener';
import { symbolManager } from '../../server';
import { flattenTreeToArray, Tads3SymbolManager } from '../symbol-manager';
import { DefaultMapObject } from './DefaultMapObject';
import { crawlRooms } from './map-crawling';

enum EditorMode { MAP=0, NPC=1 }

export default class MapObjectManager {
	
	static npcSpecificRegexp = new RegExp(/ActorState|AccompanyingState|AgendaItem|Topic|ConvNode|ConversationReadyState|InConversationState/);

	showAllRooms = true;

	selectedEditor = EditorMode.MAP;
	newlyCreatedRoomsSet: Set<string> = new Set();
	persistedObjectPositions: any;

	startRoom: string|undefined = undefined;

	
	constructor(private t3SymbolManager: Tads3SymbolManager) {
		
	}

	/**
	 * 
	 * @param fsPath setting it to undefined means: map all possible objects
	 * @returns 
	 */
	public mapGameObjectsToMapObjects( fsPath: string|undefined = undefined): DefaultMapObject[] {
		let mappedSymbols: DocumentSymbol[] = [];
		
		// Hold a temporary map structure of additionalProperties where the symbol name acts as key
		const additionalProps: Map<string,ExtendedDocumentSymbolProperties> = new Map();
		
		if (this.showAllRooms || this.selectedEditor === EditorMode.NPC) {
			for (const fileNameKey of this.t3SymbolManager.symbols.keys()) {
				const localFileSymbols = this.t3SymbolManager.symbols.get(fileNameKey)  ?? [];
				for (const localSymbol of localFileSymbols) {
					mappedSymbols.push(localSymbol);
					this.addAdditionalPropsToMap(localSymbol, fileNameKey, additionalProps);
				}
			}
		} else if (fsPath) {
			mappedSymbols = this.t3SymbolManager.symbols.get(fsPath) ?? [];
		}
		// OR only the one that's in the current file:


		const classInheritanceMap = this.t3SymbolManager.inheritanceMap;


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
		setupClassInheritanceDefaults(classInheritanceMap);

		if (mappedSymbols.length > 0) {

			const objectsAsArray = Array.from(mappedSymbols);

			// Filter out rooms and doors:
			const roomsWithConnections = objectsAsArray.filter(x => this.isRoomOrDoor(x, additionalProps));

			// And the first level of children of each:
			const childrenMap: DocumentSymbol[] = [];
			for (const r of roomsWithConnections) {
				r.children?.forEach(c => childrenMap.push(c));
			}

			// Make a whole array of them intermixed:
			const flattenedMap = [...roomsWithConnections, ...childrenMap];

			// Map them all to DefaultMapObjects:
			mapObjects = flattenedMap.map(x => {
				return createMapObject(x, additionalProps, false, [SymbolKind.Object]);
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


	private addAdditionalPropsToMap(symbol: DocumentSymbol, fileNameKey: string, additionalProps: Map<string, ExtendedDocumentSymbolProperties>) {
		if (symbol.name) {
			const localPropsMap = this.t3SymbolManager.additionalProperties.get(fileNameKey);
			if (localPropsMap) {
				const symbolAdditionalProps = localPropsMap.get(symbol.name);
				if (symbolAdditionalProps) {
					additionalProps.set(symbol.name, symbolAdditionalProps);
				}
			}
		}
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
			const superClass = this.t3SymbolManager.inheritanceMap.get(derivedClassName);
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
		const classInheritanceMap = this.t3SymbolManager.inheritanceMap;
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



	isRoomOrDoor(o: DocumentSymbol, a: Map<string, ExtendedDocumentSymbolProperties>) {
		//TODO: minor "hack" until all library files are being processed
		// Should be removed once that is working perfectly
		try {
			if (o.detail) {
				if (o.detail.includes('Door') 
					|| o.detail.includes('Stairway')
					|| o.detail.includes('Passage')) {
					
					if (a.get(o.name)?.superClassRoot) {
						a.get(o.name)!.superClassRoot = 'Door';						
					}
					//a.superClassRoot = 'Door';
					return true;
				}

				if (this.inheritesFromAny(o.detail, 'Door')) {
					if (a.get(o.name)?.superClassRoot) {
						a.get(o.name)!.superClassRoot = 'Door';						
					}
					return true;
				}
				if (this.inheritesFromAny(o.detail, 'Room')) {
					if (a.get(o.name)?.superClassRoot) {
						a.get(o.name)!.superClassRoot = 'Room';						
					}

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
}



/**
 * 
 * @param x - The documentSymbol
 * @param skipChildren 
 * @param childrenKinds - only create children of the types defined in childrenKinds
 * @returns 
 */
 function createMapObject(x: DocumentSymbol, additionalProps: Map<string, ExtendedDocumentSymbolProperties>, skipChildren = true, childrenKinds:SymbolKind[] = []): DefaultMapObject {
	const o = new DefaultMapObject(x.name);
	if (!skipChildren) {
		const children: DocumentSymbol[] = x.children ?? [];
		for (const child of children) {
			if (childrenKinds === undefined || childrenKinds.includes(child.kind)) {
				o.children.push(createMapObject(child as DocumentSymbol, additionalProps, false, childrenKinds));				
			}
		}
	}
	const props = additionalProps.get(x.name);
	
	o.parent = props?.parent?.name;

	o.shortName = props?.shortName;
	o.arrowConnection = props?.arrowConnection;
	o.kind = x.kind;
	o.detail = x.detail;


	o.north = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'north')?.detail;
	o.northeast = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'northeast')?.detail;
	o.northwest = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'northwest')?.detail;

	o.south = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'south')?.detail;
	o.southeast = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'southeast')?.detail;
	o.southwest = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'southwest')?.detail;

	o.east = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'east')?.detail;
	o.west = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'west')?.detail;

	o.up = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'up')?.detail;
	o.down = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'down')?.detail;

	o.in = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'in')?.detail;
	o.out = x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'out')?.detail;

	// Sets north to fore if north is not already set, etc...
	o.north =  o.north? o.north:x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'fore')?.detail;
	o.south = o.south? o.south: x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'aft')?.detail;
	o.west = o.west? o.west: x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'port')?.detail;
	o.east = o.east? o.east: x.children?.find(x => additionalProps.get(x.name)?.isAssignment && x.name === 'starboard')?.detail;


	// Go through each travelConnector's destination value and assign it:
	const possibleExits = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'in', 'out', 'fore', 'port', 'aft', 'starboard'];
	for (const dir of possibleExits) {
		if (!hasExit(o, dir)) {
			const room = props?.travelConnectorMap.get(dir);
			if (room) {
				setExit(o, dir, room);
			}
		}
	}
	return o;
 }

function hasExit(obj:any, dir:any) {
	return obj[dir];
}
function setExit(obj: any, dir: any, exit: any) {
	obj[dir] = exit;

}

function setupClassInheritanceDefaults(classInheritanceMap: Map<string, string>) {
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
