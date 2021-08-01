//import ProjectstormReactDiagrams from "https://cdn.skypack.dev/@projectstorm/react-diagrams@6.5.2";

//const h1 = React.createElement('h1', null, 'REACT')
//ReactDOM.render(h1, document.getElementById('content'))

const vscode = acquireVsCodeApi();
const roomSelector = document.getElementById('roomSelector');
const levelLabelRef = document.getElementById('levelLabel');
const editorSelector = document.getElementById('editorSelector');
let el = document.getElementById('inputDialog');
el.style.visibility = "hidden";




const graph = new LGraph();
//let editor = new Editor("editorElement", graph);
//const mapCanvas = editor.canvas;
const mapCanvas = new LGraphCanvas("#mapCanvas", graph);

const MAX_TITLE_LENGTH = 17;
const MAX_LENGTH = 19;


let selectedEditor = 0;  // 0: map editor, 1: conversation editor
let persistedObjectPositions = new Map();  // Keep track of object positions within this map
let lastMessage;
let currentLevel = 0

mapCanvas.connections_width = 2;
mapCanvas.render_collapsed_slots = false;
mapCanvas.render_connections_border = false;
mapCanvas.align_to_grid = true;

/**
 * Remember: node.pos is an array of 2 elements [x,y]
 */

mapCanvas.onNodeMoved = function (node) {
	vscode.postMessage({command: 'updatepos', text: { name: node.properties.name, pos: node.pos}});
}

//canvas.links_render_mode = LiteGraph.LINEAR_LINK;
//canvas.show_info = false;
//canvas.round_radius = 1;
//canvas.use_gradients = true; //set to true to render titlebar with gradients

levelUp = function () {
	currentLevel++;
	refresh(lastMessage);
}

levelDown = function () {
	currentLevel--;
	refresh(lastMessage);
}

let config = {
	collapsed: false,
	showAll: true,
	showUnmappedRooms: false
}

toggleCollapse = function () {
	config.collapsed = !config.collapsed;
	refresh(lastMessage);
}

toggleShowAll = function () {
	config.showAll = !config.showAll;
	vscode.postMessage({
		command: 'showall',
		text: config.showAll
	})
	refresh(lastMessage);
}

toggleShowUnmapped = function () {
	config.showUnmappedRooms = !config.showUnmappedRooms;
	refresh(lastMessage);
}


const portId = {
	NORTH: 0,
	NORTHEAST: 1,
	NORTHWEST: 2,
	WEST: 3,
	EAST: 4,
	SOUTH: 5,
	SOUTHEAST: 6,
	SOUTHWEST: 7,
};

function splitIntoListByNthCharacterFunc(str, maxLength) {
	let splittedWord = [];
	const totalLength = str.length ?? 0;
	for (let i = 0; i < totalLength; i += maxLength) {
		let word = str.substr(i, i + maxLength);
		splittedWord.push(word);
	}
	return splittedWord;
}

function splitIntoListByNthCharacterFuncOld(str, maxLength) {
	let splittedWord = [];
	const totalLength = str.length ?? 0;
	for (let i = 0; i < totalLength; i += maxLength) {
		let word = str.substr(i, i + maxLength);
		splittedWord.push(word);
	}
	return splittedWord;
}

function splitIntoListByWhitespacesAndMaxlengthPerRow(str, maxLength) {
	let splittedWordsByWS = str.split(' ');
	let rows = [];
	let rowString = '';
	for(let word=0; word<splittedWordsByWS.length; word++) {
		while(rowString.length<maxLength) {
			rowString += ' ' + splittedWordsByWS[word];
			rows.push(rowString);
			if(word < splittedWordsByWS) {
				word++;
			}
		}
	}
	return rows;
}


class NPCNode {
	title = "NPC";
	constructor() {
		this.properties = { title: this.title, name: "", desc: ""};
	}
}



class RoomNode {
	title = "ROOM";

	north_out = undefined;
	north_in = undefined;

	south_out = undefined;
	south_in = undefined;

	east_out = undefined;
	east_in = undefined;

	west_out = undefined;
	west_in = undefined;

	northeast_out = undefined;
	northeast_in = undefined;
	
	northwest_out = undefined;
	northwest_in = undefined;

	southeast_out = undefined;
	southeast_in = undefined;

	southwest_out = undefined;
	southwest_in = undefined;

	setupTwinPair(name, options, direction) {
		let dir_out = this.addOutput(name + '_out', "number", options);
		let dir_in  = this.addInput(name +'_in', "number", options);
		dir_out.dir = direction
		dir_in.dir = direction
		dir_out.label = '';
		dir_in.label = '';
		return [
			dir_out,
			dir_in
		]
	}

	constructor() {
		this.properties = { title: this.title, name: "", desc: "", shortName: "" };

		[ this.north_out, this.north_in ] = this.setupTwinPair("n", { pos: [70, -LiteGraph.NODE_TITLE_HEIGHT] }, LiteGraph.UP);
		[ this.south_out, this.south_in ] = this.setupTwinPair("s", { pos: [70, 85] }, LiteGraph.DOWN);
		[ this.west_out, this.west_in ] = this.setupTwinPair("w", { pos: [0, 45] }, LiteGraph.LEFT);
		[ this.east_out, this.east_in ] = this.setupTwinPair("e", { pos: [141, 45] }, LiteGraph.RIGHT);
		[ this.northeast_out, this.northeast_in ] = this.setupTwinPair("ne", { pos: [140, -LiteGraph.NODE_TITLE_HEIGHT] }, LiteGraph.RIGHT);
		[ this.northwest_out, this.northwest_in ] = this.setupTwinPair("nw", { pos: [0, -LiteGraph.NODE_TITLE_HEIGHT] }, LiteGraph.LEFT);
		[ this.southeast_out, this.southeast_in ] = this.setupTwinPair("se", { pos: [140, 85] }, LiteGraph.RIGHT);
		[ this.southwest_out, this.southwest_in ] = this.setupTwinPair("sw", { pos: [0, 85] }, LiteGraph.LEFT);

		//this.size[0] = 160
		this.size[1] = 85
		this.flags = {
			horizontal: false,
			collapsed: config.collapsed,
		}
		this.resizable = false;
		this.serialize_widgets = true;

		this.title_mode = LiteGraph.TRANSPARENT_TITLE

	}

	getTitle = function() {
		let title = this.title.length>MAX_TITLE_LENGTH? (this.title.substr(0, MAX_TITLE_LENGTH-3) + '...') : this.title;
        return title;
    };

	onDrawForeground = function(ctx, graphCanvas) {
		if (this.flags.collapsed) return;
		
		ctx.save();
		ctx.fillColor = "green";
		//let splittedWord = splitIntoListByNthCharacterFunc(this.properties.name, 17);
		//let splittedWord = this.properties.shortName.split(' ');
		let splittedWord = splitIntoListByNthCharacterFunc(this.properties.shortName, MAX_LENGTH);

		let yPos = 20;
		for (let word of splittedWord) {
			ctx.fillText(word, 5, yPos += 20);
		}
		ctx.restore();

		// Store the posistion in a map 
		// TODO: find the appropriate event handler for this and put it there instead,
		// TODO: Use local storage instead
		// this is highly inefficient




		return false;
	}

	/*
	this.onConnectionsChange(
		LiteGraph.INPUT,
		slot,
		true,
		link_info,
		input
	);

	this.onConnectionsChange(
		LiteGraph.OUTPUT,
		slot,
		true,
		link_info,
		output
	);
*/
	
	onConnectionsChange(directionType, slot, someBooleanState, linkInfo, inputOutput) {
		vscode.postMessage({ command: 'log', text: 'name: ' + directionType });
		vscode.postMessage({ command: 'log', text: 'name: ' + this.properties.name  });
		var target_node = graph.getNodeById(linkInfo.target_id);
		vscode.postMessage({ command: 'log', text: 'target name: '+target_node.properties.name });

		/*vscode.postMessage({command: 'log', text: 'directionType' +  directionType });
		vscode.postMessage({command: 'log', text: 'slot' + slot });
		vscode.postMessage({command: 'log', text: 'linkInfo.id:' + linkInfo.id });
		vscode.postMessage({command: 'log', text: 'linkInfo.origin_id:' + linkInfo.origin_id });
		
		vscode.postMessage({ command: 'log', text: 'linkInfo.target_id:' + linkInfo.target_id });
		*/

		//vscode.postMessage({ command: 'log', text: 'target_node:' + target_node });
		
		//vscode.postMessage({command: 'log', text: 'linkInfo.origin_slot:' + linkInfo.origin_slot });
		//vscode.postMessage({command: 'log', text: 'linkInfo.target_slot:' + linkInfo.target_slot });
		//vscode.postMessage({command: 'log', text: slot + inputOutput });
	}

	onExecute() {


		this.size[1] = 85;

		if (this.props.title !== this.title) {
			this.props.title = this.title;
		}
		this.north_out.pos[0] = this.size[0] >> 1;
		this.north_out.pos[1] = -LiteGraph.NODE_TITLE_HEIGHT;

		this.northeast_out.pos[0] = this.size[0];
		this.northeast_out.pos[1] = -LiteGraph.NODE_TITLE_HEIGHT;

		this.northwest_out.pos[0] = 0;
		this.northwest_out.pos[1] = -LiteGraph.NODE_TITLE_HEIGHT;

		this.south_out.pos[0] = this.size[0] >> 1;
		this.south_out.pos[1] = this.size[1];

		this.southeast_out.pos[0] = this.size[0];
		this.southeast_out.pos[1] = this.size[1];

		this.southwest_out.pos[0] = 0;
		this.southwest_out.pos[1] = this.size[1];

		this.east_out.pos[0] = this.size[0];
		this.east_out.pos[1] = this.size[1] >> 1;

		this.west_out.pos[0] = 0;
		this.west_out.pos[1] = this.size[1] >> 1;



		/*
		var A = this.getInputData(0);
		if( A === undefined )
			A = 0;
		var B = this.getInputData(1);
		if( B === undefined )
			B = 0;
		this.setOutputData( 0, A + B );
		*/
	}
		
};

LiteGraph.registerNodeType("basic/room", RoomNode);
LiteGraph.registerNodeType("basic/npc", NPCNode);



window.addEventListener('message', event => {
	lastMessage = event.data;
	//vscode.postMessage({command: 'log', text: event.data });
	refresh(event.data);
});

let currentStartRoom;

roomSelector.addEventListener('change', event => {
	currentStartRoom = event.target.value;
	vscode.postMessage({command: 'changestartroom', text: event.target.value });
})


editorSelector.addEventListener('change', event => {
	//let el = document.getElementById('mapCanvas');
	//el.style.visibility = (event.target.value === '0')? "visible": "hidden";
	selectedEditor = event.target.value;
	vscode.postMessage({
		command: 'editor',
		text: event.target.value
	})
});


function handleConversationNodes(payload) {
	if(payload.command === 'tads3.addNode' && payload.objects !== undefined) {
		for (let i = 0; i < payload.objects.length; i++) {
			let npc = payload.objects[i];
			createConversationNode(npc);
			nextX = npc.x + 1;
			nextY = npc.y + 1;
			for (let j = 0; j < npc.children.length; j++) {
				let childNode = npc.children[j];
				childNode.y = nextY;
				childNode.x = nextX++;
				createConversationNode(childNode);
				/*if (childNode.detail.includes('ActorState')) {
					nextY++;
				}*/
			}
		}
	}

}


function refresh(payload) {
	graph.clear();
	if(selectedEditor === '1') {
		handleConversationNodes(payload);
	} else {
		handleRoomNodes(payload);
	}
}
rooms = new Set();

function setupDirection(currentRoomNode, objectDir, port1, port2) {
	if (objectDir) {
		let connectedNode = graph._nodes.find(x => x.title === objectDir);
		if (connectedNode) {
			currentRoomNode.connect(port1, connectedNode, port2)
		}
	}
}

function removeOptions(selectElement) {
	//while(selectEl.options.length) selectEl.options.remove(0)
	var i, L = selectElement.options.length - 1;
	for(i = L; i >= 0; i--) {
	   selectElement.remove(i);
	}
 }
 

// Clear previous options
function clearRoomSelector() {
	try {
		removeOptions(roomSelector);
		/*for(let idx = 0; idx<roomSelector.options.length; idx++) {
			//roomSelector.options[idx] = null;
			roomSelector.remove(idx);
		}*/
		//roomSelector.options = [];
		vscode.postMessage({command: 'log', text: `Clearing old values in roomSelector: ${roomSelector.options.length} `})

	} catch (err) {
		vscode.postMessage({command: 'log', text: 'error during roomSelector clear: ' + err})
	 }
}

function handleRoomNodes(payload) {
	levelLabelRef.innerText = currentLevel;


	switch (payload.command) {
		case 'tads3.addNode':
			if (payload.objects !== undefined) {
				
				clearRoomSelector();
				// Add option to selector
				let sortedNames = payload.objects.map(x => x.name).sort(function (a, b) {
					if (a.name < b.name) return -1;
					if (a.name > b.name) return 1;
					return 0;
				});
				for (let name of sortedNames) {
					try {
						let optionNode = document.createElement('option');
						optionNode.value = name ?? 'err';
						optionNode.innerHTML = name ?? 'err';
						if (currentStartRoom === name) {
							optionNode.selected = true;
						}
						roomSelector.appendChild(optionNode);
					} catch(err) {

					}
				}
				
				
				let handleLater = [];
				let maximumY = 0;
				for (let i = 0; i < payload.objects.length; i++) {
					const currentObject = payload.objects[i];
					if (currentObject.z !== currentLevel) {
						handleLater.push(currentObject);
						continue;
					}
					if (currentObject.isMapped || currentObject.isNew) {
						let node = createNodeFromRoomObject(payload.objects[i]);
						maximumY = node.pos[1] > maximumY ? node.pos[1] : maximumY;
					} else {
						handleLater.push(currentObject);
					}
				}

				const yInc = 190;
				maximumY += yInc * 2;
				let xcount = 0;
				const COLS = 10;

				const xInc = 150;
				
				if (config.showUnmappedRooms && handleLater.length > 0) {					
					let group = new LGraphGroup();

					let totalRows = Math.ceil(handleLater.length / COLS);
					let totalLength = xInc * Math.min(handleLater.length, COLS);
					
					const yPadding = 80;
					group.configure({
						title: 'Unmapped rooms',
						bounding: [0,maximumY-yPadding, totalLength, (totalRows*yInc)]
					})
					graph.add(group);

					//TODO: make a grid of the remaining objects
					// Using maximumY as a start
					let x = 0;
					for (let i = 0; i < handleLater.length; i++) {
						if (xcount == COLS) {
							maximumY += yInc;
							xcount = 0;
							x = 0;
						}
						const currentObject = handleLater[i];
						currentObject.hasAbsolutePosition = true;
						currentObject.x = x;
						currentObject.y = maximumY;

						createNodeFromRoomObject(currentObject);

						x += xInc;
						xcount++;

					}
				}


			}
			break;
	}


	//n = output s = input
	//e = input w = output
	//se = input nw = output
	//sw = input ne = output

	if (payload.objects) {
		for (let i = 0; i < payload.objects.length; i++) {
			let o = payload.objects[i];
			let currentRoomNode = graph._nodes.find(x => x.title === o.name);
			setupDirection(currentRoomNode, o.north, 'n_out', 's_in');
			setupDirection(currentRoomNode, o.south, 's_out', 'n_in');
			setupDirection(currentRoomNode, o.west, 'w_out', 'e_in');
			setupDirection(currentRoomNode, o.east, 'e_out', 'w_in');
			setupDirection(currentRoomNode, o.northwest, 'nw_out', 'se_in');
			setupDirection(currentRoomNode, o.southeast, 'se_out', 'nw_in');
			setupDirection(currentRoomNode, o.northeast, 'ne_out', 'sw_in');
			setupDirection(currentRoomNode, o.southwest, 'sw_out', 'ne_in');
		}
	}

}

//https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md

function createConversationNode(convObject) {

	//vscode.postMessage({command: 'log',text: 'conv node: ' + convObject.name})
	
	var node = LiteGraph.createNode("basic/npc");
	if (convObject.name !== undefined) {
		node.properties.varname = convObject.name ?? 'unnamed node';
		node.title = convObject.name ?? 'unnamed node';
	}

	const scaleFactorX = 170;
	const scaleFactorY = 75;
	let x = 0;
	let y = 0;
	let offsetX = 50;
	let offsetY = 50;

	if (convObject.x !== undefined) {
		x = convObject.x * scaleFactorX + offsetX;
	}
	if (convObject.y !== undefined) {
		y = convObject.y * scaleFactorY + offsetY;
	}
	node.pos = [x, y];

	node.onMouseDown = () => vscode.postMessage({ command: 'select', text: node.title });

	graph.add(node);


}
	


function createNodeFromRoomObject(roomObject) {
	var node = LiteGraph.createNode("basic/room");

	let x = 0;
	let y = 0;

	// If node already has an absolute position, just set it directly,
	// otherwise calculate it.
	if (roomObject.hasAbsolutePosition) {
		x = roomObject.x;
		y = roomObject.y;
	} else {
		const scaleFactorX = 175;
		const scaleFactorY = config.collapsed ? 75 : 175;
		let offsetX = 50;
		let offsetY = 50;

		if (roomObject.x !== undefined) {
			x = roomObject.x * scaleFactorX + offsetX;
		}
		if (roomObject.y !== undefined) {
			y = roomObject.y * scaleFactorY + offsetY;
		}
	} 
	node.pos = [x, y];

	if (roomObject.name !== undefined) {
		node.title = roomObject.name;
		node.properties.name = roomObject.name;
	}

	node.properties.title = node.title;
	if (roomObject['shortName']) {
		node.properties.shortName = roomObject['shortName'].replace('\\\'', '\'');
		/*vscode.postMessage({
			command: 'log',
			text: `Creating ${node.properties.name} x/y: ${node.pos[0]}/${node.pos[0]}`
		})*/
	}

	graph.add(node);
	applyCallbacksOnRoomNode(node);
	return node;
}

function applyCallbacksOnRoomNode(node) {
	

	/*node.onKeyDown = function(key) {
		vscode.postMessage({ command: 'log', text: key });
	};*/

	node.onMouseDown = () => vscode.postMessage({ command: 'select', text: node.title });
	node.onPropertyChanged = function () {
		node.title = node.properties.name;
		vscode.postMessage({
			command: 'change',
			text: `Property change for object: ${node.properties.name}`
		})
		//return true; //return true is the event was used by your node, to block other behaviours
	}


	//TODO: add applyCallbacksOnRoomNode for del-key to remove it
	/*input.addEventListener("keydown", function (e) {
		modified = true;
		if (e.keyCode == 27) {
		}
	});*/


	
}

// TODO: convert node to Room
const createRoomNode = function (node) {
	let room = {
		name: node.title,
		pos: node.pos,
		directions: {
		}
	}
	return room;
}


// TODO: Trigger this programmatically 
// LGraphCanvas.onShowPropertyEditor = function (item, options, e, menu, node) {

const createRoomGUI = (value, event, mouseEvent, contextMenu) => {

	

	var first_event = contextMenu.getFirstEvent();

	//function(title, value, callback, event, multiline) {
	let modal = mapCanvas.prompt('Room name:', '', function (name) {

		var node = LiteGraph.createNode("basic/room");
		node.pos = mapCanvas.convertEventToCanvasOffset(first_event);
		
		modal.style.left = node.pos[0] + "px";
		modal.style.top = node.pos[1] + "px";

		setTimeout(function() {
            input.focus();
        }, 10);


		applyCallbacksOnRoomNode(node);
		node.properties.name = name;
		node.title = name;
		graph.add(node);
		vscode.postMessage({command: 'addroom',text: createRoomNode(node)})
		vscode.postMessage({command: 'select', text: node.title})				


		/*graph.beforeChange();
		var node = LiteGraph.createNode("basic/room");
		if (node) {
			var first_event = contextMenu.getFirstEvent();
			node.pos = mapCanvas.convertEventToCanvasOffset(first_event);
			applyCallbacksOnRoomNode(node);
			node.properties.name = name;
			node.title = name 
			graph.add(node);
			vscode.postMessage({command: 'addroom',text: createRoomNode(node)})
			vscode.postMessage({command: 'select', text: node.title})				

		}
		if (callback) {
			callback(node);		
		}

		graph.afterChange();*/

		//prompt.close();

	}, first_event, false);

	
}

mapCanvas.getMenuOptions = () => {
	return [
		{
			content: "Add Room",
			has_submenu: false,
			callback: createRoomGUI
		}
	]
};
  
graph.start()
