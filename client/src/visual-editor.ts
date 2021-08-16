/* eslint-disable @typescript-eslint/no-empty-function */
import { Uri, Webview } from 'vscode';
import { client, getLastChosenTextEditor, getUsingAdv3LiteStatus } from './extension';

export const visualEditorResponseHandlerMap = new Map();

export function setupVisualEditorResponseHandler() {
	visualEditorResponseHandlerMap.set('refresh', onDidRefresh);
	visualEditorResponseHandlerMap.set('reset', onDidReset);
	visualEditorResponseHandlerMap.set('select', onDidSelectMapObject);
	visualEditorResponseHandlerMap.set('showall', onDidShowAll);
	visualEditorResponseHandlerMap.set('updatepos', onDidUpdatePosition);
	visualEditorResponseHandlerMap.set('change', onDidChange);
	visualEditorResponseHandlerMap.set('changestartroom', onDidChangeStartRoom);
	visualEditorResponseHandlerMap.set('log', onDidLog);
	visualEditorResponseHandlerMap.set('editor', onDidSelectEditor);
	visualEditorResponseHandlerMap.set('addroom', onDidAddRoom);
	visualEditorResponseHandlerMap.set('removeroom', onDidRemoveRoom);
	visualEditorResponseHandlerMap.set('changeport', onDidChangePort);
}


export function onDidRefresh() {
	client.sendNotification('request/mapsymbols');
}

export function onDidReset() {
	client.sendNotification('request/mapsymbols', { reset: true });
}

export function onDidSelectMapObject(payload) {
	if (payload) {
		client.sendRequest('request/findsymbol', ({ name: payload }));
	}
}


export function onDidShowAll(payload) {
	console.log('did show all: ');
	console.log(payload);

	// The old code:
	//this.showAllRooms = e.payload;
	//this.updateWebview(webviewPanel, this.lastSelectedTextDocument);


}

export function onDidUpdatePosition(payload, persistedObjectPositions) {
	console.log('did update position: ');

	//console.log(`Persisting new position (${payload.pos[0]}/${payload.pos[1]}) for node: ${payload.name}`);
	persistedObjectPositions.set(payload.name, payload.pos);

	/*
	TODO:
		
		let persistedMapObjectPositions = this.storageManager.getValue('persistedMapObjectPositions');
		let mapObject = persistedMapObjectPositions.find(x=>x.name===payload.name);
		if (mapObject) {
			mapObject.x = payload.pos[0];
			mapObject.y = payload.pos[1];
			persistedMapObjectPositions.set(persistedMapObjectPositions);
		}
	}*/

	console.log(payload);
}

export function onDidChange(payload) {
	console.log('did change: ');
	console.log(payload);

	/*
		OLD CODE: (this needs to be sent to the server now)
		if (this.selectedObject && e.payload && this.lastSelectedTextDocument) {
			console.error(`Change name of: ${this.selectedObject.name} to: ${e.payload}`);
			const textAtRange = this.lastSelectedTextDocument.getText(this.selectedObject.range);
			const newTextAtRange = textAtRange?.replace(this.selectedObject.name, e.payload);
			if (newTextAtRange && this.lastChosenTextEditor) {
				this.lastChosenTextEditor.edit(builder => {
					console.error(`Replace selection to: ${newTextAtRange}`);
					builder.replace(this.lastChosenTextEditor.selection, newTextAtRange);
				});
			}
		}
	*/
}

export function onDidChangeStartRoom(payload) {
	console.log('did change start room: ');
	console.log(payload);

	/*
	OLD CODE: (this needs to be sent to the server now)
		this.startRoom = e.payload;
		this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
	*/
	console.log(`${payload}`);
	client.sendRequest('request/changestartroom', (payload));
}



export function onDidLog(payload) {
	console.log('did Log: ');
	console.log(payload);
}

export function onDidSelectEditor(payload) {
	console.log('did select editor: ');
	console.log(payload);

	/*
	OLD CODE: (this needs to be sent to the server now)
	if (e.payload) {
		this.selectedEditor = Number(e.payload);
	}
	this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
	*/

}



const connectingPairStack = [];

export function onDidChangePort(payload) {
	if (connectingPairStack.length === 0) {
		connectingPairStack.push(payload);
	} else {
		const previousPayload = connectingPairStack.pop();
		console.log('did change port: ');
		console.log(payload);

		// TODO: save the current document before if dirty
		client.sendRequest('request/connectrooms', ({ currentPayload: payload, previousPayload }));
	}
}
export function onDidRemoveRoom(payload, persistedObjectPositions) {
	//TODO: Not used
	/*if (payload) {
		//console.error(`Removing a room with name: ${payload}`);
		//client.sendRequest('request/findsymbol', ({ name: payload, postAction: 'remove' }));
	}*/
}

function capitalize(str: string) {
	return str[0].toUpperCase() + str.substr(1);
}

function camelCaseName(name: string) {
	const result = name?.split(/\s+/) ?? [];
	const capitalized = result.map((x) => capitalize(x)).join('');
	return capitalized[0].toLowerCase() + capitalized.substr(1);
}


export function onDidAddRoom(payload, persistedObjectPositions) {
	const editorOfChoice = getLastChosenTextEditor();
	if (payload && editorOfChoice && payload.name) {

		const camelCasedName = camelCaseName(payload.name);

		editorOfChoice.edit(async builder => {
			const lastLine = editorOfChoice.document.lineCount - 1;
			let lastRange = editorOfChoice.document.lineAt(lastLine).range;
			lastRange = editorOfChoice.document.validateRange(lastRange);
			// TODO: use Snippet?
			// TODO: Trigger same GUI in maprenderer as when changing title
			const superTypes = 'Room';


			// TODO: if using adv3Lite


			const str = getUsingAdv3LiteStatus() ?
				`\n${camelCasedName}: ${superTypes} '${payload.name}'\n;`
				: `\n${camelCasedName}: ${superTypes} '${payload.name}' '${payload.name}'\n;`;

			builder.insert(lastRange.end, str);

			//let snippet = new SnippetString("\n${1: " + payload.name + "}: ${1: Room} '${" + payload.name + "}';");
			//await window.activeTextEditor.insertSnippet(snippet, lastRange)

			// TODO: maybe... doesn't work
			// Add a temporary symbol in the outliner (will get replaced by the parsed object
			// On update:
			persistedObjectPositions.set(camelCasedName, payload.pos);



		}).then(() => {
			//this.lastChosenTextEditor = editorOfChoice;
			editorOfChoice.document.save().then(saveResult => {
				if (saveResult) {
					console.error(`Successfully saved with new content`);
				}
			}).then(() => {
				persistedObjectPositions.set(camelCasedName, payload.pos);

				// TODO: Persist in server or here?
				//this.newlyCreatedRoomsSet.add(payload.name);

				client.sendRequest('request/addroom', ({ room: payload }));

			});

		});

	}
}


export function getHtmlForWebview(webview: Webview, extensionUri: Uri): string {
	const scriptPath = 'media';
	const litegraphScriptUri = webview.asWebviewUri(Uri.joinPath(extensionUri, scriptPath, 'litegraph.min.js')) ?? '';
	const litegraphCssUri = webview.asWebviewUri(Uri.joinPath(extensionUri, scriptPath, 'litegraph.css')) ?? '';
	const mapLogicUri = webview.asWebviewUri(Uri.joinPath(extensionUri, scriptPath, 'maprenderer.js')) ?? '';
	return `
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="${litegraphCssUri}">
				<script type="text/javascript" src="${litegraphScriptUri}"></script>
			</head>

			<body style='width:100%; height:100% padding:0px;'>
				<div id="content"></div>

				<button id="refreshButton">Update</button>
				<button id="resetButton">Reset</button>
				<label id="dialogLabel">Editor</label>
				<select id="editorSelector">
					<option value="0">Map editor</option>
					<!--option value="1">Conversation editor</option-->
				</select>
				<label id="dialogLabel">Starting room</label>
				<select id="roomSelector">
				</select>
				<label>Map level:</label>
				<button id="minusButton" onclick="levelDown()">-</button>
				<label id="levelLabel"></label>
				<button id="plusButton" onclick="levelUp()">+</button>
				<label>Collapse nodes:</label><input type="checkbox" onclick="toggleCollapse()" />
				<!--label>Show all:</label><input type="checkbox" onclick="toggleShowAll()" checked /-->
				<!--label>Show unmapped:</label><input type="checkbox" onclick="toggleShowUnmapped()" /-->
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