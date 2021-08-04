/* eslint-disable @typescript-eslint/no-empty-function */
import { Uri, Webview, window, workspace } from 'vscode';
import { client, getLastChosenTextEditor } from './extension';

export const visualEditorResponseHandlerMap = new Map();

enum MapResponse {
	REFRESH = 'refresh',
	SELECT = 'select',
	SHOW_ALL = 'showall',
	UPDATE_POS = 'updatepos',
	CHANGE = 'change',
	CHANGE_START_ROOM = 'changestartroom',
	LOG = 'log',
	EDITOR = 'editor',
	ADD_ROOM = 'addroom'
}

export function setupVisualEditorResponseHandler() {
	visualEditorResponseHandlerMap.set(MapResponse.REFRESH, onDidRefresh);
	visualEditorResponseHandlerMap.set(MapResponse.SELECT, onDidSelectMapObject);
	visualEditorResponseHandlerMap.set(MapResponse.SHOW_ALL, onDidShowAll);
	visualEditorResponseHandlerMap.set(MapResponse.UPDATE_POS, onDidUpdatePosition);
	visualEditorResponseHandlerMap.set(MapResponse.CHANGE, onDidChange);
	visualEditorResponseHandlerMap.set(MapResponse.CHANGE_START_ROOM, onDidChangeStartRoom);
	visualEditorResponseHandlerMap.set(MapResponse.LOG, onDidLog);
	visualEditorResponseHandlerMap.set(MapResponse.EDITOR, onDidSelectEditor);
	visualEditorResponseHandlerMap.set(MapResponse.ADD_ROOM, onDidAddRoom);
}


export function onDidRefresh() {
	client.sendNotification('request/mapsymbols');
}

export function onDidSelectMapObject(payload) {
	if (payload) {
		client.sendRequest('request/findsymbol', ({ name: payload }));
	}
}


export function onDidShowAll(payload) {
	console.log('did show all: ');
	console.log(payload);
}

export function onDidUpdatePosition(payload, persistedObjectPositions) {
	console.log('did update position: ');

	//console.log(`Persisting new position (${payload.pos[0]}/${payload.pos[1]}) for node: ${payload.name}`);
	persistedObjectPositions.set(payload.name, payload.pos);

	/*
	TODO:
		
		let persistedMapObjectPositions = this.storeManager.getValue('persistedMapObjectPositions');
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
}

export function onDidChangeStartRoom(payload) {
	console.log('did change start room: ');
	console.log(payload);
}

export function onDidLog(payload) {
	console.log('did Log: ');
	console.log(payload);
}

export function onDidSelectEditor(payload) {
	console.log('did select editor: ');
	console.log(payload);
}


export function onDidAddRoom(payload) {
	const editorOfChoice = getLastChosenTextEditor();
	if (payload && editorOfChoice) {
		console.error(`Adding a room with name: ${payload.name}`);

		/*const { foundObject, fileEntryUri } = this.locateObjectNameWithinAllSymbols(payload);
		if (foundObject) {
			window.showErrorMessage(`${payload} already exists as an identified object in file: ${fileEntryUri}`);
			return;
		}*/

		editorOfChoice.edit(async builder => {
			const lastLine = editorOfChoice.document.lineCount - 1;
			let lastRange = editorOfChoice.document.lineAt(lastLine).range;
			lastRange = editorOfChoice.document.validateRange(lastRange);
			// TODO: use Snippet?
			// TODO: Trigger same GUI in maprenderer as when changing title
			const superTypes = 'Room';

			const str = `\n${payload.name}: ${superTypes} '${payload.name}';`;
			builder.insert(lastRange.end, str);
			//let snippet = new SnippetString("\n${1: " + payload.name + "}: ${1: Room} '${" + payload.name + "}';");
			//await window.activeTextEditor.insertSnippet(snippet, lastRange)

			// TODO: maybe... doesn't work
			// Add a temporary symbol in the outliner (will get replaced by the parsed object
			// On update:


		}).then((roomName) => {
			//this.lastChosenTextEditor = editorOfChoice;
			editorOfChoice.document.save().then(saveResult => {
				if (saveResult) {
					console.error(`Successfully saved with new content`);
				}
			}).then(() => {
				// TODO: Persist in server or here?
				this.newlyCreatedRoomsSet.add(payload.name);
				this.persistedObjectPositions.set(payload.name, payload.pos);
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