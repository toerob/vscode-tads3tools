/* eslint-disable no-debugger */
/* eslint-disable no-mixed-spaces-and-tabs */

// This runs inside a VS Code webview (browser context).
// It's compiled to `resources/maprenderer/maprenderer.js` via `npm run build:maprenderer`.

import { bindDomEvents, getDomRefs, initializeDom } from "./dom";
import { createMessenger } from "./messaging";

// litegraph is loaded via <script src=".../litegraph.js"> in the webview HTML.

import { LiteGraph, LGraph, LGraphCanvas, LGraphGroup, LGraphNode } from "litegraph.js";

/*
// We intentionally use it as globals.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const LiteGraph: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const LGraph: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const LGraphCanvas: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const LGraphGroup: any;
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;

const messenger = createMessenger();
const dom = getDomRefs();
initializeDom(dom);

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

type Theme = {
  fontFamily: string;
  foreground: string;
  editorBg: string;
  widgetBg: string;
  widgetBorder: string;
  link: string;
  warning: string;
};

function readTheme(): Theme {
  return {
    fontFamily: cssVar("--vscode-font-family", "sans-serif"),
    foreground: cssVar("--vscode-editor-foreground", "#cccccc"),
    editorBg: cssVar("--vscode-editor-background", "#1e1e1e"),
    widgetBg: cssVar("--vscode-editorWidget-background", "#222228"),
    widgetBorder: cssVar("--vscode-editorWidget-border", "#454545"),
    link: cssVar("--vscode-textLink-foreground", "#3794ff"),
    warning: cssVar("--vscode-editorWarning-foreground", "#cc9c00"),
  };
}

let theme = readTheme();

function applyNodeTheme(node: AnyObj, opts: { isDoor: boolean }) {
  // In LiteGraph, node.color is used as the default titlebar color.
  // We keep the titlebar background theme-consistent and use accent colors for title text instead.
  node.color = theme.widgetBg;
  node.bgcolor = theme.editorBg;
  node.boxcolor = opts.isDoor ? theme.warning : theme.link;
  node.bordercolor = theme.widgetBorder;
}

let isPopulatingMap = true;

let lowestZLevel = 0;
let highestZLevel = 0;

const graph = new LGraph();
const mapCanvas = new LGraphCanvas("#mapCanvas", graph);

const MAX_TITLE_LENGTH = 17;
const MAX_LENGTH = 19;

let selectedEditor = "0"; // 0: map editor, 1: conversation editor
let lastMessage: unknown;
let currentLevel = 0;

mapCanvas.connections_width = 2;
mapCanvas.render_collapsed_slots = false;
mapCanvas.render_connections_border = false;
(mapCanvas as AnyObj).align_to_grid = true;

// Disable the grid
mapCanvas.clear_background = true;  // still clears the canvas each frame
(mapCanvas as AnyObj).background_image = null;
mapCanvas.bgcanvas.style.backgroundColor = theme.editorBg;
mapCanvas.drawBackCanvas = function() {
    const ctx = this.bgcanvas.getContext("2d");
    ctx?.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
};


mapCanvas.onNodeMoved = function (node: AnyObj) {
  messenger.postCommand("updatepos", { name: node.properties.name, pos: node.pos });
};

const config = {
  collapsed: false,
  showAll: true,
  showUnmappedRooms: false,
};

const levelUp = () => {
  if (currentLevel < highestZLevel) {
    currentLevel++;
    refresh(lastMessage);
  }
};

const levelDown = () => {
  if (currentLevel > lowestZLevel) {
    currentLevel--;
    refresh(lastMessage);
  }
};

const toggleCollapse = () => {
  config.collapsed = !config.collapsed;
  refresh(lastMessage);
};

const toggleShowAll = () => {
  config.showAll = !config.showAll;
  messenger.postCommand("showall", config.showAll);
  refresh(lastMessage);
};

const toggleShowUnmapped = () => {
  config.showUnmappedRooms = !config.showUnmappedRooms;
  refresh(lastMessage);
};

// These are referenced from inline onclick="..." handlers in the HTML.
(window as AnyObj).levelUp = levelUp;
(window as AnyObj).levelDown = levelDown;
(window as AnyObj).toggleCollapse = toggleCollapse;
(window as AnyObj).toggleShowAll = toggleShowAll;
(window as AnyObj).toggleShowUnmapped = toggleShowUnmapped;

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

function splitIntoListByNthCharacterFunc(str: string, maxLength: number): string[] {
  const splittedWord: string[] = [];
  const totalLength = str.length ?? 0;
  for (let i = 0; i < totalLength; i += maxLength) {
    const word = str.substr(i, i + maxLength);
    splittedWord.push(word);
  }
  return splittedWord;
}

function splitIntoListByNthCharacterFuncOld(str: string, maxLength: number): string[] {
  const splittedWord: string[] = [];
  const totalLength = str.length ?? 0;
  for (let i = 0; i < totalLength; i += maxLength) {
    const word = str.substr(i, i + maxLength);
    splittedWord.push(word);
  }
  return splittedWord;
}

function splitIntoListByWhitespacesAndMaxlengthPerRow(str: string, maxLength: number): string[] {
  const splittedWordsByWS = str.split(" ");
  const rows: string[] = [];
  let rowString = "";
  for (let word = 0; word < splittedWordsByWS.length; word++) {
    while (rowString.length < maxLength) {
      rowString += " " + splittedWordsByWS[word];
      rows.push(rowString);
      if (word < splittedWordsByWS.length) {
        word++;
      }
    }
  }
  return rows;
}

class NPCNode extends LGraphNode {
  constructor() {
    super();
    this.title = "NPC";
    this.properties = { title: this.title, name: "", desc: "" };
  }
}

class RoomNode extends LGraphNode {
  static title_mode: number;
  static title_color: string;
  static title_text_color: string;

  north_out: AnyObj = undefined;
  north_in: AnyObj = undefined;

  south_out: AnyObj = undefined;
  south_in: AnyObj = undefined;

  east_out: AnyObj = undefined;
  east_in: AnyObj = undefined;

  west_out: AnyObj = undefined;
  west_in: AnyObj = undefined;

  northeast_out: AnyObj = undefined;
  northeast_in: AnyObj = undefined;

  northwest_out: AnyObj = undefined;
  northwest_in: AnyObj = undefined;

  southeast_out: AnyObj = undefined;
  southeast_in: AnyObj = undefined;

  southwest_out: AnyObj = undefined;
  southwest_in: AnyObj = undefined;

  setupTwinPair(name: string, options: AnyObj, direction: AnyObj): AnyObj[] {
    const dir_out = this.addOutput(name + "_out", "number", options);
    const dir_in = this.addInput(name + "_in", "number", options);
    dir_out.dir = direction;
    dir_in.dir = direction;
    dir_out.label = "";
    dir_in.label = "";
    return [dir_out, dir_in];
  }

  constructor() {
    super();
    this.title = "ROOM";
    this.properties = { title: this.title, name: "", desc: "", shortName: "" };

    [this.north_out, this.north_in] = this.setupTwinPair(
      "n",
      { pos: [70, -LiteGraph.NODE_TITLE_HEIGHT] },
      LiteGraph.UP,
    );
    [this.south_out, this.south_in] = this.setupTwinPair("s", { pos: [70, 85] }, LiteGraph.DOWN);
    [this.west_out, this.west_in] = this.setupTwinPair("w", { pos: [0, 45] }, LiteGraph.LEFT);
    [this.east_out, this.east_in] = this.setupTwinPair("e", { pos: [141, 45] }, LiteGraph.RIGHT);
    [this.northeast_out, this.northeast_in] = this.setupTwinPair(
      "ne",
      { pos: [140, -LiteGraph.NODE_TITLE_HEIGHT] },
      LiteGraph.RIGHT,
    );
    [this.northwest_out, this.northwest_in] = this.setupTwinPair(
      "nw",
      { pos: [0, -LiteGraph.NODE_TITLE_HEIGHT] },
      LiteGraph.LEFT,
    );
    [this.southeast_out, this.southeast_in] = this.setupTwinPair("se", { pos: [140, 85] }, LiteGraph.RIGHT);
    [this.southwest_out, this.southwest_in] = this.setupTwinPair("sw", { pos: [0, 85] }, LiteGraph.LEFT);

    this.size[0] = 160;
    this.size[1] = 85;
    this.flags = { horizontal: false, collapsed: config.collapsed } as AnyObj;
    (this as AnyObj).resizable = false;
    (this as AnyObj).serialize_widgets = true;
    (this as AnyObj).removable = false;
    (this as AnyObj).title_mode = LiteGraph.TRANSPARENT_TITLE;
  }

  getTitle = () => {
    const title =
      this.title.length > MAX_TITLE_LENGTH ? this.title.substr(0, MAX_TITLE_LENGTH - 3) + "..." : this.title;
    return title;
  };

  onDrawForeground = (ctx: AnyObj) => {
    if (this.flags.collapsed) return;

    ctx.save();
    ctx.font = `12px ${theme.fontFamily}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = theme.foreground;

    const label: string = this.properties?.shortName || this.properties?.name || this.title;
    const splittedWord = splitIntoListByNthCharacterFunc(label, MAX_LENGTH);

    let yPos = 20;
    for (const word of splittedWord) {
      ctx.fillText(word, 5, (yPos += 20));
    }

    if (this.properties?.isDoor) {
      ctx.fillStyle = theme.warning;
      ctx.font = `10px ${theme.fontFamily}`;
      ctx.fillText("DOOR", 5, 14);
    }
    ctx.restore();

    return false;
  };

  onConnectionsChange(directionType: AnyObj, slot: AnyObj, connected: boolean, linkInfo: AnyObj, inputInfo: AnyObj) {
    if (connected && !isPopulatingMap) {
      const target_node = graph.getNodeById(linkInfo.target_id);
      const from = this.properties?.name;
      const to = target_node?.properties?.name;
      const directionName = inputInfo.name;
      messenger.postCommand("changeport", { from, to, directionName });
    }
  }

  onExecute() {
    this.size[1] = 85;

    if (this.properties.title !== this.title) {
      this.properties.title = this.title;
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
  }

  onRemoved() {
    // `graph.clear()` during refresh removes every node and calls `onRemoved()`.
    // Only treat removal as user intent when we're not populating the map.
    if (!isPopulatingMap) {
      const name = this.properties?.name ?? this.title;
      if (name) {
        messenger.postCommand("removeroom", name);
      }
    }
  }
}

class DoorNode extends RoomNode {
  static title_text_color: string;
}

function applyThemeToLiteGraph() {
  theme = readTheme();

  // Canvas defaults (used when a node type doesn't override it)
  mapCanvas.node_title_color = theme.foreground;

  RoomNode.title_mode = LiteGraph.NORMAL_TITLE;
  RoomNode.title_color = theme.widgetBg;
  RoomNode.title_text_color = theme.link;

  DoorNode.title_mode = LiteGraph.NORMAL_TITLE;
  DoorNode.title_color = theme.widgetBg;
  DoorNode.title_text_color = theme.warning;
}

applyThemeToLiteGraph();

LiteGraph.registerNodeType("basic/room", RoomNode);
LiteGraph.registerNodeType("basic/door", DoorNode);
LiteGraph.registerNodeType("basic/npc", NPCNode);

let currentStartRoom: string | undefined;

bindDomEvents(dom, {
  onRefreshClick: () => messenger.postCommand("refresh", undefined),
  onResetClick: () => messenger.postCommand("reset", undefined),
  onRoomChange: (value) => {
    currentStartRoom = value;
    messenger.postCommand("changestartroom", value);
  },
  onEditorChange: (value) => {
    selectedEditor = value;
    messenger.postCommand("editor", value);
  },
  onWindowMessage: (data) => {
    lastMessage = data;
    refresh(data);
  },
});

function handleConversationNodes(payload: AnyObj) {
  if (payload.command === "tads3.addNode" && payload.objects !== undefined) {
    let nextX = 0;
    let nextY = 0;

    for (let i = 0; i < payload.objects.length; i++) {
      const npc = payload.objects[i];
      createConversationNode(npc);
      nextX = npc.x + 1;
      nextY = npc.y + 1;
      for (let j = 0; j < npc.children.length; j++) {
        const childNode = npc.children[j];
        childNode.y = nextY;
        childNode.x = nextX++;
        createConversationNode(childNode);
      }
    }
  }
}

function refresh(payload: unknown) {
  isPopulatingMap = true;
  try {
    applyThemeToLiteGraph();
    graph.clear();
    if (selectedEditor === "1") {
      handleConversationNodes(payload);
    } else {
      handleRoomNodes(payload);
    }
  } catch (error) {
    console.error(error);
    messenger.postCommand("log", `Error during addnode:  ${error}`);
  } finally {
    isPopulatingMap = false;
  }
}

const rooms = new Set<string>();

function setupDirection(currentRoomNode: AnyObj, objectDir: AnyObj, port1: AnyObj, port2: AnyObj) {
  if (objectDir) {
    const connectedNode = (graph as AnyObj)._nodes.find((x: AnyObj) => x.title === objectDir);
    if (connectedNode) {
      currentRoomNode.connect(port1, connectedNode, port2);
    }
  }
}

function removeOptions(selectElement: HTMLSelectElement) {
  const L = selectElement.options.length - 1;
  for (let i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function clearRoomSelector() {
  try {
    if (!dom.roomSelector) return;

    removeOptions(dom.roomSelector);
    messenger.postCommand("log", `Clearing old values in roomSelector: ${dom.roomSelector.options.length} `);
  } catch (err) {
    messenger.postCommand("log", "error during roomSelector clear: " + err);
  }
}

function isDoor(obj: AnyObj) {
  const detail: unknown = obj?.detail;
  if (typeof detail !== "string") return false;
  return /Door|Passage|Stairway/.test(detail);
}

function handleRoomNodes(payload: AnyObj) {
  if (dom.levelLabelRef) {
    dom.levelLabelRef.innerText = String(currentLevel);
  }

  switch (payload.command) {
    case "tads3.addNode":
      if (payload.objects !== undefined) {
        clearRoomSelector();

        const sortedNames: string[] = payload.objects
          .filter((x: AnyObj) => !isDoor(x))
          .map((x: AnyObj) => x.name)
          .sort((a: string, b: string) => a.localeCompare(b));

        for (const name of sortedNames) {
          try {
            if (!dom.roomSelector) break;

            const optionNode = document.createElement("option");
            optionNode.value = name ?? "err";
            optionNode.innerHTML = name ?? "err";
            if (currentStartRoom === name) {
              optionNode.selected = true;
            }
            dom.roomSelector.appendChild(optionNode);
          } catch (err) {
            messenger.postCommand("log", `Error during addnode:  ${err}`);
          }
        }

        const handleLater: AnyObj[] = [];
        let maximumY = 0;
        for (let i = 0; i < payload.objects.length; i++) {
          const currentObject = payload.objects[i];
          lowestZLevel = Math.min(lowestZLevel, currentObject.z);
          highestZLevel = Math.max(highestZLevel, currentObject.z);

          if (currentObject.z !== currentLevel) {
            handleLater.push(currentObject);
            continue;
          }
          if (currentObject.isMapped || currentObject.isNew) {
            const node = createNodeFromRoomObject(payload.objects[i]);
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
          const group = new LGraphGroup();

          const totalRows = Math.ceil(handleLater.length / COLS);
          const totalLength = xInc * Math.min(handleLater.length, COLS);

          const yPadding = 80;
          group.configure({
            title: "Unmapped rooms",
            bounding: [0, maximumY - yPadding, totalLength, totalRows * yInc],
            color: theme.widgetBorder,
            font: theme.fontFamily,
          } as AnyObj);
          (graph as AnyObj).add(group);

          let x = 0;
          for (let i = 0; i < handleLater.length; i++) {
            if (xcount === COLS) {
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

  if (payload.objects) {
    for (let i = 0; i < payload.objects.length; i++) {
      const o = payload.objects[i];
      const currentRoomNode = (graph as AnyObj)._nodes.find((x: AnyObj) => x.title === o.name);
      if (currentRoomNode) {
        setupDirection(currentRoomNode, o.north, "n_out", "s_in");
        setupDirection(currentRoomNode, o.south, "s_out", "n_in");
        setupDirection(currentRoomNode, o.west, "w_out", "e_in");
        setupDirection(currentRoomNode, o.east, "e_out", "w_in");
        setupDirection(currentRoomNode, o.northwest, "nw_out", "se_in");
        setupDirection(currentRoomNode, o.southeast, "se_out", "nw_in");
        setupDirection(currentRoomNode, o.northeast, "ne_out", "sw_in");
        setupDirection(currentRoomNode, o.southwest, "sw_out", "ne_in");
      }
    }
  }
}

function createConversationNode(convObject: AnyObj) {
  const node = LiteGraph.createNode("basic/npc");
  if (convObject.name !== undefined) {
    node.properties.varname = convObject.name ?? "unnamed node";
    node.title = convObject.name ?? "unnamed node";
  }

  const scaleFactorX = 170;
  const scaleFactorY = 75;
  let x = 0;
  let y = 0;
  const offsetX = 50;
  const offsetY = 50;

  if (convObject.x !== undefined) {
    x = convObject.x * scaleFactorX + offsetX;
  }
  if (convObject.y !== undefined) {
    y = convObject.y * scaleFactorY + offsetY;
  }
  node.pos = [x, y];

  node.onMouseDown = () => messenger.postCommand("select", node.title);

  graph.add(node);
}

function createNodeFromRoomObject(roomObject: AnyObj) {
  const isDoorNode = isDoor(roomObject);
  const node = LiteGraph.createNode(isDoorNode ? "basic/door" : "basic/room");

  let x = 0;
  let y = 0;

  if (roomObject.hasAbsolutePosition) {
    x = roomObject.x;
    y = roomObject.y;
  } else {
    const scaleFactorX = 175;
    const scaleFactorY = config.collapsed ? 75 : 175;
    const offsetX = 50;
    const offsetY = 50;

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
  node.properties.isDoor = isDoorNode;
  if (roomObject["shortName"]) {
    node.properties.shortName = roomObject["shortName"].replace("\\'", "'");
  }

  applyNodeTheme(node, { isDoor: isDoorNode });

  graph.add(node);
  applyCallbacksOnRoomNode(node);
  return node;
}

function applyCallbacksOnRoomNode(node: AnyObj) {
  node.onMouseDown = () => {
    messenger.postCommand("select", node.properties.name ?? node.title);
  };

  node.onPropertyChanged = function () {
    node.title = node.properties.name;
    messenger.postCommand("change", `Property change for object: ${node.properties.name}`);
  };

  node.clonable = false;

  node.getMenuOptions = () => {
    return [
      {
        content: "locate",
        has_submenu: false,
        callback: () => messenger.postCommand("select", node.properties.name ?? node.title),
      },
    ];
  };
}

const createRoomNode = function (node: AnyObj) {
  const room = {
    name: node.title,
    pos: node.pos,
    directions: {},
  };
  return room;
};

function doAddRoom(name: string, firstEvent: AnyObj) {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return;

  const node = LiteGraph.createNode("basic/room");
  node.pos = mapCanvas.convertEventToCanvasOffset(firstEvent);

  applyCallbacksOnRoomNode(node);
  node.properties.name = trimmed;
  node.title = trimmed;
  applyNodeTheme(node, { isDoor: false });

  graph.add(node);
  messenger.postCommand("addroom", createRoomNode(node));
  messenger.postCommand("select", node.title);
}

const createRoomGUI = (_value: AnyObj, _event: AnyObj, _mouseEvent: AnyObj, contextMenu: AnyObj) => {
  try {
    const first_event = contextMenu?.getFirstEvent?.() ?? _mouseEvent ?? _event;

    try {
      mapCanvas.prompt(
        "Room name:",
        "",
        (name: string) => doAddRoom(name, first_event),
        first_event,
      );
    } catch (err) {
      // Fallback: if LiteGraph prompt cannot open (e.g. active_canvas issues),
      // use a native prompt so adding a room never hard-fails.
      const name = window.prompt("Room name:", "");
      if (name != null) {
        doAddRoom(name, first_event);
      }
    }
  } catch (err) {
    console.error(err);
    messenger.postCommand("log", `Error during Add Room: ${err}`);
  }
};

mapCanvas.getMenuOptions = () => {
  return [
    {
      content: "Add Room",
      has_submenu: false,
      callback: createRoomGUI,
    },
  ];
};

graph.start();

// Sync canvas buffer dimensions to its CSS rendered size.
// The webview HTML sets fixed width/height attributes (1024×1024) on the <canvas>,
// but CSS stretches it to fill the panel. LiteGraph uses the attribute size for all
// coordinate math (mouse→canvas, node hit-testing), so a mismatch causes a click
// offset equal to (cssSize - 1024) and makes nodes appear stretched.
function resizeMapCanvas() {
  const canvas = (mapCanvas as AnyObj).canvas as HTMLCanvasElement;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w;
    canvas.height = h;
  }
}

requestAnimationFrame(resizeMapCanvas);
window.addEventListener("resize", resizeMapCanvas);
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(resizeMapCanvas).observe((mapCanvas as AnyObj).canvas);
}

export {};
