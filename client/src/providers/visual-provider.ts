// TODO: make compatible
// TODO: make the map crawling on the server side instead, so this can be made an external viewer also

// create notifications: "send" and "on"




/*import { CustomDocument, CustomDocumentOpenContext, ExtensionContext, Position, SnippetString, TextDocument, TextEditorSelectionChangeKind, Uri, window } from 'vscode';

import { workspace, CancellationToken, WebviewPanel, Webview } from 'vscode';
import { CustomReadonlyEditorProvider } from 'vscode';
import { flattenTreeToArray, Tads3SymbolManager } from '../tads3-symbol-manager';
import { DocumentSymbol } from 'vscode';
import { WebviewOptions } from 'vscode';
import { DefaultMapObject } from './mapcrawling/DefaultMapObject';
import { crawlRooms, createJsonMapObject } from './mapcrawling/map-crawling';
import { Selection } from 'vscode';
import * as path from 'path';
import { TextEditor } from 'vscode';
import { ExtendedDocumentSymbol } from '../tads3-outliner-listener';
import { getVSCodeDownloadUrl } from 'vscode-test/out/util';
import { editor } from '../../../test/helper';
import { ViewColumn } from 'vscode';
import { Subject } from 'rxjs';
import { Range } from 'vscode';
import { SymbolKind } from 'vscode';
import { Override } from 'antlr4ts/Decorators';
import { LocalStorageService } from '../local-storage-service';
import { possibleExits } from '../../extension';


interface AssetManifest {
	files: {
		'main.js': string;
		'main.css': string;
		'runtime-main.js': string;
		[key: string]: string;
	};
}

export class Tads3VisualEditorProvider implements CustomReadonlyEditorProvider {
	lastSelectedTextDocument: TextDocument = undefined;
	selectedObject = undefined;
	activeEditor: TextEditor;
	webview = undefined;
	selectedEditor = 0; // 0: map editor, 1: conversation editor
	showAllRooms = true;
	lastChosenTextEditor: TextEditor;
	
	newlyCreatedRoomsSet = new Set();

	startRoom = undefined;

	constructor(
		private context: ExtensionContext,
		private t3SymbolManager: Tads3SymbolManager,
		private readonly symbolsUpdatedSubject: Subject<number>,
		private persistedObjectPositions: any,
		private storeManager: LocalStorageService
	) {
		const result = storeManager.getValue('persistedMapObjectPositions');
		if (result) {
			//console.error(`Found persisted MapObject positions: `);
			//console.error(result);
			for (const entry of result) {
				persistedObjectPositions.set(entry.name, [entry.x, entry.y]);
			}
		}
	}


	locateObjectNameWithinAllSymbols(name: string): { foundObject: ExtendedDocumentSymbol, fileEntryUri: string } {
		try {
			for (const fileEntry of Array.from(this.t3SymbolManager.getAllSymbols().entries())) {
				const fileEntryUri = fileEntry[0];
				if (fileEntryUri) {
					const foundObject = this.t3SymbolManager.getSymbols(fileEntryUri).find(x => x.name === name);
					if (foundObject) {
						return { foundObject, fileEntryUri };
					}
				}
			}
		} catch (err) {
			console.error(err);
		}
		return {
			foundObject: undefined,
			fileEntryUri: undefined
		};
	}



	overridePositionWithPersistedCoordinates(mapObjects: DefaultMapObject[]) {

		const itemsToPersist = [];

		for (const node of mapObjects) {
			const persistedPosition = this.persistedObjectPositions.get(node.name);
			if (persistedPosition && persistedPosition.length === 2) {
				const x = persistedPosition[0];
				const y = persistedPosition[1];
				if (x && y) {
					node.x = x;
					node.y = y;
					node.hasAbsolutePosition = true;
					itemsToPersist.push(node);
				}
			}
		}
		if (itemsToPersist.length > 0) {
			this.storeManager.setValue('persistedMapObjectPositions', itemsToPersist);
		}

	}

	updateWebview(webviewPanel: WebviewPanel, document) {
		webviewPanel.webview.postMessage({
			type: 'update',
			text: document.getText(),
		});
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

		const mapObjects = this.mapGameObjectsToMapObjects(document);
		this.overridePositionWithPersistedCoordinates(mapObjects);
		webviewPanel.webview.postMessage({ command: 'tads3.addNode', objects: mapObjects });
	}

	openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): CustomDocument | Thenable<CustomDocument> {
		//console.log(uri.path);
		return { uri, dispose: () => { } };
	}

	resolveCustomEditor(document: CustomDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void> {
		//resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void> {
		const options: WebviewOptions = { enableScripts: true };
		webviewPanel.webview.options = options;

		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);



		const changeDocumentSubscription = workspace.onDidChangeTextDocument(e => {
			//if (e.document.uri.toString() === document.uri.toString()) {

			//}
		});



		this.symbolsUpdatedSubject.subscribe((value: any) => {
			
			if (value > 0) {
				//console.log(`Getting ${value} new symbols. Updating webview`);
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}
		});


		const changeTextEditorSelectionSubscription = window.onDidChangeTextEditorSelection(e => {
			this.lastChosenTextEditor = e.textEditor;

			if (e.textEditor.document !== this.lastSelectedTextDocument) {
				this.lastSelectedTextDocument = e.textEditor.document;

				//console.log(`Change document to ${this.lastSelectedTextDocument}`);
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			const selection: Selection = e.selections[0];
			this.selectedObject = this.t3SymbolManager.getSymbols(e.textEditor.document.uri.path)
				.find(x => x.range.intersection(selection));
			if (this.selectedObject) {
				//console.log(this.selectedObject.name);
				// TODO: webviewPanel.webview.postMessage({ command: 'tads3.selectNode', nodeName: this.selectedObject.name});
			}
		});

		webviewPanel.onDidDispose(() => {
			// Make sure we get rid of the listener when our editor is closed.
			changeDocumentSubscription.dispose();
			//openDocumentSubscription.dispose();
			changeTextEditorSelectionSubscription.dispose();

		});

		webviewPanel.webview.onDidReceiveMessage(e => {
			if (e?.command === 'select' && e?.text && this.lastSelectedTextDocument) {
				this.activeEditor = window.activeTextEditor;
				this.lastChosenTextEditor = window.activeTextEditor;

				const { foundObject, fileEntryUri } = this.locateObjectNameWithinAllSymbols(e.text);
				if (fileEntryUri && foundObject) {
					this.selectedObject = foundObject;
					workspace.openTextDocument(fileEntryUri).then(textDocument => {
						this.lastSelectedTextDocument = textDocument;
						if(this.lastChosenTextEditor) {
							window.showTextDocument(textDocument, {
								//viewColumn: ViewColumn.Beside,
								//preview: false,
								//preserveFocus: true,
								selection: this.selectedObject.range,
							});										
						}
					});						
				}
			}

			if (e.command === 'showall') {
				this.showAllRooms = e.text;
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			if (e.command === 'updatepos') {
				const payload = e.text;
				//console.log(`Persisting new position (${payload.pos[0]}/${payload.pos[1]}) for node: ${payload.name}`);
				this.persistedObjectPositions.set(payload.name, payload.pos);
				
				const persistedMapObjectPositions = this.storeManager.getValue('persistedMapObjectPositions');
				const mapObject = persistedMapObjectPositions.find(x=>x.name===payload.name);
				if (mapObject) {
					mapObject.x = payload.pos[0];
					mapObject.y = payload.pos[1];
					persistedMapObjectPositions.set(persistedMapObjectPositions);
				}
			}


			if (e.command === 'change') {
				if (this.selectedObject && e.text && this.lastSelectedTextDocument) {
					console.error(`Change name of: ${this.selectedObject.name} to: ${e.text}`);
					const textAtRange = this.lastSelectedTextDocument.getText(this.selectedObject.range);
					const newTextAtRange = textAtRange?.replace(this.selectedObject.name, e.text);
					if (newTextAtRange && this.lastChosenTextEditor) {
						this.lastChosenTextEditor.edit(builder => {
							console.error(`Replace selection to: ${newTextAtRange}`);
							builder.replace(this.lastChosenTextEditor.selection, newTextAtRange);
						});
					}
				}
			}
			if (e.command === 'changestartroom') {
				console.error(`Change startroom to: ${e.text}`);
				if(e.text) {
					this.startRoom = e.text;
					this.updateWebview(webviewPanel, this.lastSelectedTextDocument);	
				}
			}

			if (e.command === 'log') {
				console.error(`Log from maprenderer: ${e.text}`);
			}
			if (e.command === 'editor') {
				if (e.text) {
					this.selectedEditor = Number(e.text);
				}
				console.error(`Change editor type: ${this.selectedEditor}`);
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			if (e.command === 'addroom') {
				//webviewPanel.webview.postMessage({ command: 'refactor' }).then(x => {})
				const editorOfChoice = this.lastChosenTextEditor;
				if (e.text && editorOfChoice) {
					console.error(`Adding room with name: ${e.text.name}`);

					const {foundObject,fileEntryUri } = this.locateObjectNameWithinAllSymbols(e.text);
					if (foundObject) {
						window.showErrorMessage(`${e.text} already exists as an identified object in file: ${fileEntryUri}`);
						return;
					}


					
						

					editorOfChoice.edit( async builder => {
						const lastLine = editorOfChoice.document.lineCount - 1;
						let lastRange = editorOfChoice.document.lineAt(lastLine).range;
						lastRange = editorOfChoice.document.validateRange(lastRange);
						// TODO: use Snippet?
						// TODO: Trigger same GUI in maprenderer as when changing title
						const superTypes = 'Room';
						
						const str = `\n${e.text.name}: ${superTypes} '${e.text.name}';`;
						builder.insert(lastRange.end, str);
						//let snippet = new SnippetString("\n${1: " + e.text.name + "}: ${1: Room} '${" + e.text.name + "}';");
						//await window.activeTextEditor.insertSnippet(snippet, lastRange)

						// TODO: maybe... doesn't work
						// Add a temporary symbol in the outliner (will get replaced by the parsed object
						// On update:
						

					}).then((roomName) => {
						this.lastChosenTextEditor = editorOfChoice;
						editorOfChoice.document.save().then(saveResult => {
							if (saveResult) {
								console.error(`Successfully saved with new content`);
							}								
						}).then(() => {
							this.newlyCreatedRoomsSet.add(e.text.name);
							this.persistedObjectPositions.set(e.text.name, e.text.pos);
						});

					});
				}
			}
		});

		//let mapObjects = this.mapGameObjectsToMapObjects(document);
		//webviewPanel.webview.postMessage({ command: 'tads3.addNode', objects: mapObjects });
	}

	//static npcSpecificRegexp = new RegExp(/Actor|Person|ActorState|AccompanyingState|AgendaItem|Topic|ConvNode|ConversationReadyState|InConversationState/);
	//static npcSpecificRegexp = new RegExp(/Actor|Person/);
	static npcSpecificRegexp = new RegExp(/ActorState|AccompanyingState|AgendaItem|Topic|ConvNode|ConversationReadyState|InConversationState/);

	mapGameObjectsToMapObjects(document): DefaultMapObject[] {


		// TODO: Option to draw all currently mapped symbols:
		let mappedSymbols = [];

		if (this.showAllRooms || this.selectedEditor === 1) {
			for (const key of this.t3SymbolManager.getAllSymbols().keys()) {
				const values = this.t3SymbolManager.getAllSymbols().get(key);
				for (const value of values) {
					mappedSymbols.push(value);
				}
			}
		} else {
			mappedSymbols = this.t3SymbolManager.getSymbols(document.uri.path) ?? [];
		}
		// OR only the one that's in the current file:


		const classInheritanceMap = this.t3SymbolManager.listener.inheritanceMap;


		// Here begins the NPC-editor
		if (this.selectedEditor === 1) {
			let globalY = 0;

			const arrayOfAllSymbols = flattenTreeToArray(mappedSymbols);

			const actors = arrayOfAllSymbols
				.filter(x => [SymbolKind.Object].includes(x.kind))
				.filter(x => this.inheritesFromAny(x.detail, 'Actor'));			
		 	const mappedObjects = actors.map(x => createMapObject(x as ExtendedDocumentSymbol, false, [SymbolKind.Object]));
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
		}

		// Here begins the map-editor
		let mapObjects = [];

		// Map defaults if not already mapped:
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


		if (mappedSymbols.length > 0) {
			//let objectsAsArray = Array.from(this.t3SymbolManager.getAllSymbols().values())[0];
			const objectsAsArray = Array.from(mappedSymbols);

			const roomsWithConnections = objectsAsArray.filter(x => {
				return this.isRoomOrDoor(x);
			});
			const childrenMap = [];
			for (const r of roomsWithConnections) {
				r.children.forEach(c => {
					childrenMap.push(c);
				});
			}

			const flattenedMap = [...roomsWithConnections, ...childrenMap];

			
			//let roomsWithConnections = flattenedObjectArray.filter(x => isRoomOrDoor(x));
			mapObjects = flattenedMap.map(x => createMapObject(x, false, [SymbolKind.Object]));
			
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
			const superClass = this.t3SymbolManager.listener.inheritanceMap.get(derivedClassName);
			if (superClass && superClass.length>0 && superClass !== '__root__') {
				collection.push(superClass);
				this.craftClassInheritanceArray(superClass, collection);						
			}
		} catch (err) {
			console.error('err!');
		}
	}

	
	// * Checks if a derived class is derived from a particular class
	// * @param derivedClassName - the derived class you want to check
	// * @param className - the particular class you want to check the derived class against
	// * @returns True if so, false otherwise
	inheritesFrom(derivedClassName: string, className: string) {
		const classInheritanceMap = this.t3SymbolManager.listener.inheritanceMap;
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



	isRoomOrDoor(o: ExtendedDocumentSymbol) {
		//TODO: minor "hack" until all library files are being processed
		// Should be removed once that is working perfectly
		try {
			if(o.detail) {
				if (o.detail.includes('Door') 
					|| o.detail.includes('Stairway')
					|| o.detail.includes('Passage')) {
					
					o['superClassRoot'] = 'Door';
					return true;
				}

				if (this.inheritesFromAny(o.detail, 'Door')) {
					o['superClassRoot'] = 'Door';
					return true;
				}
				if (this.inheritesFromAny(o.detail, 'Room')) {
					o['superClassRoot'] = 'Room';
					return true;
				}		
			} 

		} catch(err) {
			console.error(err);
		}
		return false;
	}

	isDir(str) {
		return str.match(/north|south|east|west|northeast|northwest|southeast|southwest|up|down|in|out|fore|port|aft|starboard/);
	}

	getHtmlForWebview(webview: Webview, document: CustomDocument): string {
		this.webview = webview;
		const litegraphScriptUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'litegraph.min.js'));
		const litegraphCssUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'litegraph.css'));


		const d3ScriptUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'd3.min.js'));
		const mapLogicUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'maprenderer.js'));

		const reactUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'maprenderer.js'));
		const reactDomUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'maprenderer.js'));
		return `<html>
			<head>
				<link rel="stylesheet" type="text/css" href="${litegraphCssUri}">
				<script type="text/javascript" src="${litegraphScriptUri}"></script>
				

				<!--script type="text/javascript" src="${reactUri}"></script>
				<script type="text/javascript" src="${reactDomUri}"></script-->
				

			</head>
			<body style='width:100%; height:100% padding:0px;'>
			<div id="content"></div>
			<label id="dialogLabel">Editor</label>
			<select id="editorSelector">
				<option value="0">Map editor</option>
				<option value="1">Conversation editor</option>
			</select>

			<label id="dialogLabel">Starting room</label>
			<select id="roomSelector">
			
			</select>

			<label>Map level:</label>
			<button id="minusButton" onclick="levelDown()">-</button>
			<label id="levelLabel"></label>
			<button id="plusButton" onclick="levelUp()">+</button>

			<label>Collapse nodes:</label><input type="checkbox" onclick="toggleCollapse()" />
			<label>Show all:</label><input type="checkbox" onclick="toggleShowAll()" checked />

			<label>Show unmapped:</label><input type="checkbox" onclick="toggleShowUnmapped()" />

			<div id="inputDialog">
				<label>Room name: <label><input type="text" id='inputDialog'></input>
			</div>

			<div id="editorElement"> </div>
			<canvas id='mapCanvas' width='1024' height='1024' style='border: 1px solid'></canvas>


			<!--script>
			</script-->

			<script src="${mapLogicUri}"></script>




			</body>
			</html>`;
	}
}


function createMapObject(x: ExtendedDocumentSymbol, skipChildren = true, childrenKinds = []): DefaultMapObject {
	const o = new DefaultMapObject(x.name);
	if (!skipChildren) {
		for (const child of x.children) {
			if (childrenKinds === undefined || childrenKinds.includes(child.kind)) {
				o.children.push(createMapObject(child as ExtendedDocumentSymbol, false, childrenKinds));				
			}
		}
	}
	o.parent = x.parent?.name;
	o.shortName = x.shortName;
	o.arrowConnection = x['arrowConnection'];
	o.kind = x.kind;
	o.detail = x.detail;

	o.north = x.children.find(x => x['isAssignment'] && x.name === 'north')?.detail;
	o.northeast = x.children.find(x => ['isAssignment'] && x.name === 'northeast')?.detail;
	o.northwest = x.children.find(x => ['isAssignment'] && x.name === 'northwest')?.detail;

	o.south = x.children.find(x => ['isAssignment'] && x.name === 'south')?.detail;
	o.southeast = x.children.find(x => ['isAssignment'] && x.name === 'southeast')?.detail;
	o.southwest = x.children.find(x => ['isAssignment'] && x.name === 'southwest')?.detail;

	o.east = x.children.find(x => ['isAssignment'] && x.name === 'east')?.detail;
	o.west = x.children.find(x => ['isAssignment'] && x.name === 'west')?.detail;

	o.up = x.children.find(x => ['isAssignment'] && x.name === 'up')?.detail;
	o.down = x.children.find(x => ['isAssignment'] && x.name === 'down')?.detail;

	o.in = x.children.find(x => ['isAssignment'] && x.name === 'in')?.detail;
	o.out = x.children.find(x => ['isAssignment'] && x.name === 'out')?.detail;

	// Sets north to fore if north is not already set, etc...
	o.north =  o.north? o.north:x.children.find(x => ['isAssignment'] && x.name === 'fore')?.detail;
	o.south = o.south? o.south: x.children.find(x => ['isAssignment'] && x.name === 'aft')?.detail;
	o.west = o.west? o.west: x.children.find(x => ['isAssignment'] && x.name === 'port')?.detail;
	o.east = o.east? o.east: x.children.find(x => ['isAssignment'] && x.name === 'starboard')?.detail;


	// Go through each travelConnector's destination value and assign it:
	//const possibleExits = ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'up', 'down', 'in', 'out', 'fore', 'port', 'aft', 'starboard'];
	for (const eachExit of possibleExits) {
		if (!o[eachExit]) {
			o[eachExit] = x.travelConnectorMap.get(eachExit);
		}
	}
	return o;
}
*/