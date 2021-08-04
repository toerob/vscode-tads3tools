/* eslint-disable @typescript-eslint/no-empty-function */
// TODO: make compatible
// TODO: make the map crawling on the server side instead, so this can be made an external viewer also
// create notifications: "send" and "on"

import { CustomDocument, CustomDocumentOpenContext, ExtensionContext, TextDocument, Uri, window } from 'vscode';
import { workspace, CancellationToken, WebviewPanel, Webview } from 'vscode';
import { CustomReadonlyEditorProvider } from 'vscode';
import { WebviewOptions } from 'vscode';
import { TextEditor } from 'vscode';
import { client } from '../extension';

interface AssetManifest {
	files: {
		'main.js': string;
		'main.css': string;
		'runtime-main.js': string;
		[key: string]: string;
	};
}

// TODO: remove as soon as everything is moved to visual-editor.ts
// We only need a webview for this

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
	
	private webviewPanel: WebviewPanel;

	constructor(private context: ExtensionContext) {}


	public drawSymbols(symbols) {
		console.log(`Getting new symbols. Updating webview`);
		console.log(symbols);
		this.updateWebview(this.webviewPanel, this.lastSelectedTextDocument, symbols);

	}

	updateWebview(webviewPanel: WebviewPanel, document: any , symbols = undefined) {
		webviewPanel.webview.postMessage({
			type: 'update',
			payload: document.getText(),
		});
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

		if(symbols) {
			try {
				webviewPanel.webview.postMessage({ command: 'tads3.addNode', objects: symbols  });
			} catch(err) {
				console.error(err);
			}
		}

	}



	openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): CustomDocument | Thenable<CustomDocument> {
		return { uri, dispose: () => { } };
	}

	resolveCustomEditor(document: CustomDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void> {
		//resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void> {

		this.webviewPanel = webviewPanel;
		const options: WebviewOptions = { enableScripts: true };
		webviewPanel.webview.options = options;
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);
		//const changeDocumentSubscription = workspace.onDidChangeTextDocument(e => {});
		const changeTextEditorSelectionSubscription = window.onDidChangeTextEditorSelection(e => {
			this.lastChosenTextEditor = e.textEditor;

			if (e.textEditor.document !== this.lastSelectedTextDocument) {
				this.lastSelectedTextDocument = e.textEditor.document;

				//console.log(`Change document to ${this.lastSelectedTextDocument}`);
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			/*const selection: Selection = e.selections[0];
			this.selectedObject = this.t3SymbolManager.getSymbols(e.textEditor.document.uri.path)
				.find(x => x.range.intersection(selection));
			if (this.selectedObject) {
				//console.log(this.selectedObject.name);
				// TODO: webviewPanel.webview.postMessage({ command: 'tads3.selectNode', nodeName: this.selectedObject.name});
			}*/
		});

		webviewPanel.onDidDispose(() => {
			// Make sure we get rid of the listener when our editor is closed.
			//changeDocumentSubscription.dispose();
			//openDocumentSubscription.dispose();
			changeTextEditorSelectionSubscription.dispose();

		});

		webviewPanel.webview.onDidReceiveMessage(e => {
			if (e?.command === 'select' && e?.text && this.lastSelectedTextDocument) {
				this.activeEditor = window.activeTextEditor;
				this.lastChosenTextEditor = window.activeTextEditor;

				const { foundObject, fileEntryUri } = this.locateObjectNameWithinAllSymbols(e.payload);
				if (fileEntryUri && foundObject) {
					this.selectedObject = foundObject;
					workspace.openTextDocument(fileEntryUri).then(textDocument => {
						this.lastSelectedTextDocument = textDocument;
						if (this.lastChosenTextEditor) {
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
				this.showAllRooms = e.payload;
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			if (e.command === 'updatepos') {
				const payload = e.payload;
				//console.log(`Persisting new position (${payload.pos[0]}/${payload.pos[1]}) for node: ${payload.name}`);
				//this.persistedObjectPositions.set(payload.name, payload.pos);

				/*const persistedMapObjectPositions = this.storeManager.getValue('persistedMapObjectPositions');
				const mapObject = persistedMapObjectPositions.find(x=>x.name===payload.name);
				if (mapObject) {
					mapObject.x = payload.pos[0];
					mapObject.y = payload.pos[1];
					persistedMapObjectPositions.set(persistedMapObjectPositions);
				}*/
			}


			if (e.command === 'change') {
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
			}
			if (e.command === 'changestartroom') {
				console.error(`Change startroom to: ${e.payload}`);
				if (e.payload) {
					this.startRoom = e.payload;
					this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
				}
			}

			if (e.command === 'log') {
				console.error(`Log from maprenderer: ${e.payload}`);
			}
			if (e.command === 'editor') {
				if (e.payload) {
					this.selectedEditor = Number(e.payload);
				}
				console.error(`Change editor type: ${this.selectedEditor}`);
				this.updateWebview(webviewPanel, this.lastSelectedTextDocument);
			}

			if (e.command === 'addroom') {
				//webviewPanel.webview.postMessage({ command: 'refactor' }).then(x => {})
				const editorOfChoice = this.lastChosenTextEditor;
				if (e.payload && editorOfChoice) {
					console.error(`Adding room with name: ${e.payload.name}`);

					const { foundObject, fileEntryUri } = this.locateObjectNameWithinAllSymbols(e.payload);
					if (foundObject) {
						window.showErrorMessage(`${e.payload} already exists as an identified object in file: ${fileEntryUri}`);
						return;
					}

					editorOfChoice.edit(async builder => {
						const lastLine = editorOfChoice.document.lineCount - 1;
						let lastRange = editorOfChoice.document.lineAt(lastLine).range;
						lastRange = editorOfChoice.document.validateRange(lastRange);
						// TODO: use Snippet?
						// TODO: Trigger same GUI in maprenderer as when changing title
						const superTypes = 'Room';

						const str = `\n${e.payload.name}: ${superTypes} '${e.payload.name}';`;
						builder.insert(lastRange.end, str);
						//let snippet = new SnippetString("\n${1: " + e.payload.name + "}: ${1: Room} '${" + e.payload.name + "}';");
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
							// TODO: Persist in server or here?
							//this.newlyCreatedRoomsSet.add(e.payload.name);
							//this.persistedObjectPositions.set(e.payload.name, e.payload.pos);
						});

					});
				}
			}
		});


		function locateObjectNameWithinAllSymbols() {

		}


	}

	locateObjectNameWithinAllSymbols(text: any): any {
		// TODO: needs to fetch via server
	}

	getHtmlForWebview(webview: Webview, document: CustomDocument): string {
		this.webview = webview;
		const litegraphScriptUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'litegraph.min.js'));
		const litegraphCssUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'litegraph.css'));
		const mapLogicUri = webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, 'media', 'maprenderer.js'));
		return `
			<html>
				<head>
					<link rel="stylesheet" type="text/css" href="${litegraphCssUri}">
					<script type="text/javascript" src="${litegraphScriptUri}"></script>
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














