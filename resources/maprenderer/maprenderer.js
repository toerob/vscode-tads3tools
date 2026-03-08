(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // webview-src/dom.ts
  function getDomRefs() {
    return {
      resetButton: document.getElementById("resetButton"),
      refreshButton: document.getElementById("refreshButton"),
      roomSelector: document.getElementById("roomSelector"),
      levelLabelRef: document.getElementById("levelLabel"),
      editorSelector: document.getElementById("editorSelector"),
      inputDialogEl: document.getElementById("inputDialog")
    };
  }
  function initializeDom(refs) {
    if (refs.inputDialogEl) {
      refs.inputDialogEl.style.visibility = "hidden";
    }
  }
  function bindDomEvents(refs, handlers) {
    refs.refreshButton?.addEventListener("click", handlers.onRefreshClick);
    refs.resetButton?.addEventListener("click", handlers.onResetClick);
    refs.roomSelector?.addEventListener("change", (event) => {
      const value = event.target.value;
      handlers.onRoomChange(value);
    });
    refs.editorSelector?.addEventListener("change", (event) => {
      const value = event.target.value;
      handlers.onEditorChange(value);
    });
    window.addEventListener("message", (event) => {
      handlers.onWindowMessage(event.data);
    });
  }

  // webview-src/messaging.ts
  function createMessenger() {
    const vscode = acquireVsCodeApi();
    return {
      postMessage: (message) => vscode.postMessage(message),
      postCommand: (command, payload) => vscode.postMessage({ command, payload })
    };
  }

  // webview-src/maprenderer.ts
  var messenger = createMessenger();
  var dom = getDomRefs();
  initializeDom(dom);
  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }
  function readTheme() {
    return {
      fontFamily: cssVar("--vscode-font-family", "sans-serif"),
      foreground: cssVar("--vscode-editor-foreground", "#cccccc"),
      editorBg: cssVar("--vscode-editor-background", "#1e1e1e"),
      widgetBg: cssVar("--vscode-editorWidget-background", "#252526"),
      widgetBorder: cssVar("--vscode-editorWidget-border", "#454545"),
      link: cssVar("--vscode-textLink-foreground", "#3794ff"),
      warning: cssVar("--vscode-editorWarning-foreground", "#cca700")
    };
  }
  var theme = readTheme();
  function applyNodeTheme(node, opts) {
    node.color = theme.widgetBg;
    node.bgcolor = theme.editorBg;
    node.boxcolor = opts.isDoor ? theme.warning : theme.link;
    node.bordercolor = theme.widgetBorder;
  }
  var isPopulatingMap = true;
  var lowestZLevel = 0;
  var highestZLevel = 0;
  var graph = new LGraph();
  var mapCanvas = new LGraphCanvas("#mapCanvas", graph);
  var MAX_TITLE_LENGTH = 17;
  var MAX_LENGTH = 19;
  var selectedEditor = "0";
  var lastMessage;
  var currentLevel = 0;
  mapCanvas.connections_width = 2;
  mapCanvas.render_collapsed_slots = false;
  mapCanvas.render_connections_border = false;
  mapCanvas.align_to_grid = true;
  mapCanvas.onNodeMoved = function(node) {
    messenger.postCommand("updatepos", { name: node.properties.name, pos: node.pos });
  };
  var config = {
    collapsed: false,
    showAll: true,
    showUnmappedRooms: false
  };
  var levelUp = () => {
    if (currentLevel < highestZLevel) {
      currentLevel++;
      refresh(lastMessage);
    }
  };
  var levelDown = () => {
    if (currentLevel > lowestZLevel) {
      currentLevel--;
      refresh(lastMessage);
    }
  };
  var toggleCollapse = () => {
    config.collapsed = !config.collapsed;
    refresh(lastMessage);
  };
  var toggleShowAll = () => {
    config.showAll = !config.showAll;
    messenger.postCommand("showall", config.showAll);
    refresh(lastMessage);
  };
  var toggleShowUnmapped = () => {
    config.showUnmappedRooms = !config.showUnmappedRooms;
    refresh(lastMessage);
  };
  window.levelUp = levelUp;
  window.levelDown = levelDown;
  window.toggleCollapse = toggleCollapse;
  window.toggleShowAll = toggleShowAll;
  window.toggleShowUnmapped = toggleShowUnmapped;
  function splitIntoListByNthCharacterFunc(str, maxLength) {
    const splittedWord = [];
    const totalLength = str.length ?? 0;
    for (let i = 0; i < totalLength; i += maxLength) {
      const word = str.substr(i, i + maxLength);
      splittedWord.push(word);
    }
    return splittedWord;
  }
  var NPCNode = class {
    constructor() {
      __publicField(this, "title", "NPC");
      __publicField(this, "properties");
      this.properties = { title: this.title, name: "", desc: "" };
    }
  };
  var RoomNode = class {
    constructor() {
      __publicField(this, "title", "ROOM");
      __publicField(this, "north_out");
      __publicField(this, "north_in");
      __publicField(this, "south_out");
      __publicField(this, "south_in");
      __publicField(this, "east_out");
      __publicField(this, "east_in");
      __publicField(this, "west_out");
      __publicField(this, "west_in");
      __publicField(this, "northeast_out");
      __publicField(this, "northeast_in");
      __publicField(this, "northwest_out");
      __publicField(this, "northwest_in");
      __publicField(this, "southeast_out");
      __publicField(this, "southeast_in");
      __publicField(this, "southwest_out");
      __publicField(this, "southwest_in");
      __publicField(this, "properties");
      __publicField(this, "size");
      __publicField(this, "flags");
      __publicField(this, "resizable");
      __publicField(this, "serialize_widgets");
      __publicField(this, "removable");
      __publicField(this, "title_mode");
      __publicField(this, "props");
      __publicField(this, "getTitle", () => {
        const title = this.title.length > MAX_TITLE_LENGTH ? this.title.substr(0, MAX_TITLE_LENGTH - 3) + "..." : this.title;
        return title;
      });
      __publicField(this, "onDrawForeground", (ctx) => {
        if (this.flags.collapsed) return;
        ctx.save();
        ctx.font = `12px ${theme.fontFamily}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = theme.foreground;
        const label = this.properties?.shortName || this.properties?.name || this.title;
        const splittedWord = splitIntoListByNthCharacterFunc(label, MAX_LENGTH);
        let yPos = 20;
        for (const word of splittedWord) {
          ctx.fillText(word, 5, yPos += 20);
        }
        if (this.properties?.isDoor) {
          ctx.fillStyle = theme.warning;
          ctx.font = `10px ${theme.fontFamily}`;
          ctx.fillText("DOOR", 5, 14);
        }
        ctx.restore();
        return false;
      });
      this.properties = { title: this.title, name: "", desc: "", shortName: "" };
      [this.north_out, this.north_in] = this.setupTwinPair(
        "n",
        { pos: [70, -LiteGraph.NODE_TITLE_HEIGHT] },
        LiteGraph.UP
      );
      [this.south_out, this.south_in] = this.setupTwinPair("s", { pos: [70, 85] }, LiteGraph.DOWN);
      [this.west_out, this.west_in] = this.setupTwinPair("w", { pos: [0, 45] }, LiteGraph.LEFT);
      [this.east_out, this.east_in] = this.setupTwinPair("e", { pos: [141, 45] }, LiteGraph.RIGHT);
      [this.northeast_out, this.northeast_in] = this.setupTwinPair(
        "ne",
        { pos: [140, -LiteGraph.NODE_TITLE_HEIGHT] },
        LiteGraph.RIGHT
      );
      [this.northwest_out, this.northwest_in] = this.setupTwinPair(
        "nw",
        { pos: [0, -LiteGraph.NODE_TITLE_HEIGHT] },
        LiteGraph.LEFT
      );
      [this.southeast_out, this.southeast_in] = this.setupTwinPair("se", { pos: [140, 85] }, LiteGraph.RIGHT);
      [this.southwest_out, this.southwest_in] = this.setupTwinPair("sw", { pos: [0, 85] }, LiteGraph.LEFT);
      this.size[1] = 85;
      this.flags = {
        horizontal: false,
        collapsed: config.collapsed
      };
      this.resizable = false;
      this.serialize_widgets = true;
      this.removable = false;
      this.title_mode = LiteGraph.TRANSPARENT_TITLE;
    }
    setupTwinPair(name, options, direction) {
      const dir_out = this.addOutput(name + "_out", "number", options);
      const dir_in = this.addInput(name + "_in", "number", options);
      dir_out.dir = direction;
      dir_in.dir = direction;
      dir_out.label = "";
      dir_in.label = "";
      return [dir_out, dir_in];
    }
    onConnectionsChange(directionType, slot, connected, linkInfo, inputInfo) {
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
    }
    onRemoved() {
      if (!isPopulatingMap) {
        const name = this.properties?.name ?? this.title;
        if (name) {
          messenger.postCommand("removeroom", name);
        }
      }
    }
  };
  __publicField(RoomNode, "title_mode");
  __publicField(RoomNode, "title_color");
  __publicField(RoomNode, "title_text_color");
  var DoorNode = class extends RoomNode {
  };
  __publicField(DoorNode, "title_text_color");
  function applyThemeToLiteGraph() {
    theme = readTheme();
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
  var currentStartRoom;
  bindDomEvents(dom, {
    onRefreshClick: () => messenger.postCommand("refresh", void 0),
    onResetClick: () => messenger.postCommand("reset", void 0),
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
    }
  });
  function handleConversationNodes(payload) {
    if (payload.command === "tads3.addNode" && payload.objects !== void 0) {
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
  function refresh(payload) {
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
  function setupDirection(currentRoomNode, objectDir, port1, port2) {
    if (objectDir) {
      const connectedNode = graph._nodes.find((x) => x.title === objectDir);
      if (connectedNode) {
        currentRoomNode.connect(port1, connectedNode, port2);
      }
    }
  }
  function removeOptions(selectElement) {
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
  function isDoor(obj) {
    const detail = obj?.detail;
    if (typeof detail !== "string") return false;
    return /Door|Passage|Stairway/.test(detail);
  }
  function handleRoomNodes(payload) {
    if (dom.levelLabelRef) {
      dom.levelLabelRef.innerText = String(currentLevel);
    }
    switch (payload.command) {
      case "tads3.addNode":
        if (payload.objects !== void 0) {
          clearRoomSelector();
          const sortedNames = payload.objects.filter((x) => !isDoor(x)).map((x) => x.name).sort((a, b) => a.localeCompare(b));
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
          const handleLater = [];
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
              bounding: [0, maximumY - yPadding, totalLength, totalRows * yInc]
            });
            graph.add(group);
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
        const currentRoomNode = graph._nodes.find((x) => x.title === o.name);
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
  function createConversationNode(convObject) {
    const node = LiteGraph.createNode("basic/npc");
    if (convObject.name !== void 0) {
      node.properties.varname = convObject.name ?? "unnamed node";
      node.title = convObject.name ?? "unnamed node";
    }
    const scaleFactorX = 170;
    const scaleFactorY = 75;
    let x = 0;
    let y = 0;
    const offsetX = 50;
    const offsetY = 50;
    if (convObject.x !== void 0) {
      x = convObject.x * scaleFactorX + offsetX;
    }
    if (convObject.y !== void 0) {
      y = convObject.y * scaleFactorY + offsetY;
    }
    node.pos = [x, y];
    node.onMouseDown = () => messenger.postCommand("select", node.title);
    graph.add(node);
  }
  function createNodeFromRoomObject(roomObject) {
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
      if (roomObject.x !== void 0) {
        x = roomObject.x * scaleFactorX + offsetX;
      }
      if (roomObject.y !== void 0) {
        y = roomObject.y * scaleFactorY + offsetY;
      }
    }
    node.pos = [x, y];
    if (roomObject.name !== void 0) {
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
  function applyCallbacksOnRoomNode(node) {
    node.onMouseDown = () => {
    };
    node.onPropertyChanged = function() {
      node.title = node.properties.name;
      messenger.postCommand("change", `Property change for object: ${node.properties.name}`);
    };
    node.clonable = false;
    node.getMenuOptions = () => {
      return [
        {
          content: "locate",
          has_submenu: false,
          callback: locateRoom
        }
      ];
    };
  }
  var locateRoom = (_value, event) => {
    messenger.postCommand("select", event.extra.title);
  };
  var createRoomNode = function(node) {
    const room = {
      name: node.title,
      pos: node.pos,
      directions: {}
    };
    return room;
  };
  function doAddRoom(name, firstEvent) {
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
  var createRoomGUI = (_value, _event, _mouseEvent, contextMenu) => {
    try {
      const first_event = contextMenu?.getFirstEvent?.() ?? _mouseEvent ?? _event;
      try {
        mapCanvas.prompt(
          "Room name:",
          "",
          (name) => doAddRoom(name, first_event),
          first_event,
          false
        );
      } catch (err) {
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
        callback: createRoomGUI
      }
    ];
  };
  graph.start();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd2Vidmlldy1zcmMvZG9tLnRzIiwgIi4uLy4uL3dlYnZpZXctc3JjL21lc3NhZ2luZy50cyIsICIuLi8uLi93ZWJ2aWV3LXNyYy9tYXByZW5kZXJlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHR5cGUgRG9tUmVmcyA9IHtcbiAgcmVzZXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgcmVmcmVzaEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xuICByb29tU2VsZWN0b3I6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbiAgbGV2ZWxMYWJlbFJlZjogSFRNTExhYmVsRWxlbWVudCB8IG51bGw7XG4gIGVkaXRvclNlbGVjdG9yOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG4gIGlucHV0RGlhbG9nRWw6IEhUTUxFbGVtZW50IHwgbnVsbDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21SZWZzKCk6IERvbVJlZnMge1xuICByZXR1cm4ge1xuICAgIHJlc2V0QnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0QnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCxcbiAgICByZWZyZXNoQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZnJlc2hCdXR0b25cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsLFxuICAgIHJvb21TZWxlY3RvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb29tU2VsZWN0b3JcIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsLFxuICAgIGxldmVsTGFiZWxSZWY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGV2ZWxMYWJlbFwiKSBhcyBIVE1MTGFiZWxFbGVtZW50IHwgbnVsbCxcbiAgICBlZGl0b3JTZWxlY3RvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0b3JTZWxlY3RvclwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwsXG4gICAgaW5wdXREaWFsb2dFbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dERpYWxvZ1wiKSBhcyBIVE1MRWxlbWVudCB8IG51bGwsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRG9tKHJlZnM6IERvbVJlZnMpIHtcbiAgaWYgKHJlZnMuaW5wdXREaWFsb2dFbCkge1xuICAgIHJlZnMuaW5wdXREaWFsb2dFbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21IYW5kbGVycyA9IHtcbiAgb25SZWZyZXNoQ2xpY2s6ICgpID0+IHZvaWQ7XG4gIG9uUmVzZXRDbGljazogKCkgPT4gdm9pZDtcbiAgb25Sb29tQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25FZGl0b3JDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbldpbmRvd01lc3NhZ2U6IChkYXRhOiB1bmtub3duKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmREb21FdmVudHMocmVmczogRG9tUmVmcywgaGFuZGxlcnM6IERvbUhhbmRsZXJzKSB7XG4gIHJlZnMucmVmcmVzaEJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLm9uUmVmcmVzaENsaWNrKTtcbiAgcmVmcy5yZXNldEJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLm9uUmVzZXRDbGljayk7XG5cbiAgcmVmcy5yb29tU2VsZWN0b3I/LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWU7XG4gICAgaGFuZGxlcnMub25Sb29tQ2hhbmdlKHZhbHVlKTtcbiAgfSk7XG5cbiAgcmVmcy5lZGl0b3JTZWxlY3Rvcj8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50KS52YWx1ZTtcbiAgICBoYW5kbGVycy5vbkVkaXRvckNoYW5nZSh2YWx1ZSk7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIGhhbmRsZXJzLm9uV2luZG93TWVzc2FnZShldmVudC5kYXRhKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICBXZWJ2aWV3VG9FeHRlbnNpb25Db21tYW5kLFxuICBXZWJ2aWV3VG9FeHRlbnNpb25NZXNzYWdlLFxuICBXZWJ2aWV3VG9FeHRlbnNpb25QYXlsb2FkQnlDb21tYW5kLFxufSBmcm9tIFwiLi9wcm90b2NvbFwiO1xuXG5kZWNsYXJlIGZ1bmN0aW9uIGFjcXVpcmVWc0NvZGVBcGkoKTogeyBwb3N0TWVzc2FnZShtZXNzYWdlOiB1bmtub3duKTogdm9pZCB9O1xuXG50eXBlIFZzQ29kZUFwaSA9IFJldHVyblR5cGU8dHlwZW9mIGFjcXVpcmVWc0NvZGVBcGk+O1xuXG5leHBvcnQgdHlwZSBNZXNzZW5nZXIgPSB7XG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZTogV2Vidmlld1RvRXh0ZW5zaW9uTWVzc2FnZSkgPT4gdm9pZDtcbiAgcG9zdENvbW1hbmQ6IDxDIGV4dGVuZHMgV2Vidmlld1RvRXh0ZW5zaW9uQ29tbWFuZD4oXG4gICAgY29tbWFuZDogQyxcbiAgICBwYXlsb2FkOiBXZWJ2aWV3VG9FeHRlbnNpb25QYXlsb2FkQnlDb21tYW5kW0NdLFxuICApID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2VuZ2VyKCk6IE1lc3NlbmdlciB7XG4gIGNvbnN0IHZzY29kZTogVnNDb2RlQXBpID0gYWNxdWlyZVZzQ29kZUFwaSgpO1xuXG4gIHJldHVybiB7XG4gICAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlKSA9PiB2c2NvZGUucG9zdE1lc3NhZ2UobWVzc2FnZSksXG4gICAgcG9zdENvbW1hbmQ6IChjb21tYW5kLCBwYXlsb2FkKSA9PiB2c2NvZGUucG9zdE1lc3NhZ2UoeyBjb21tYW5kLCBwYXlsb2FkIH0pLFxuICB9O1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLWRlYnVnZ2VyICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1zcGFjZXMtYW5kLXRhYnMgKi9cblxuLy8gVGhpcyBydW5zIGluc2lkZSBhIFZTIENvZGUgd2VidmlldyAoYnJvd3NlciBjb250ZXh0KS5cbi8vIEl0J3MgY29tcGlsZWQgdG8gYHJlc291cmNlcy9tYXByZW5kZXJlci9tYXByZW5kZXJlci5qc2AgdmlhIGBucG0gcnVuIGJ1aWxkOm1hcHJlbmRlcmVyYC5cblxuaW1wb3J0IHsgYmluZERvbUV2ZW50cywgZ2V0RG9tUmVmcywgaW5pdGlhbGl6ZURvbSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgY3JlYXRlTWVzc2VuZ2VyIH0gZnJvbSBcIi4vbWVzc2FnaW5nXCI7XG5cbi8vIGxpdGVncmFwaCBpcyBsb2FkZWQgdmlhIDxzY3JpcHQgc3JjPVwiLi4uL2xpdGVncmFwaC5qc1wiPiBpbiB0aGUgd2VidmlldyBIVE1MLlxuLy8gV2UgaW50ZW50aW9uYWxseSB1c2UgaXQgYXMgZ2xvYmFscy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5kZWNsYXJlIGNvbnN0IExpdGVHcmFwaDogYW55O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmRlY2xhcmUgY29uc3QgTEdyYXBoOiBhbnk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZGVjbGFyZSBjb25zdCBMR3JhcGhDYW52YXM6IGFueTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5kZWNsYXJlIGNvbnN0IExHcmFwaEdyb3VwOiBhbnk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG50eXBlIEFueU9iaiA9IGFueTtcblxuY29uc3QgbWVzc2VuZ2VyID0gY3JlYXRlTWVzc2VuZ2VyKCk7XG5jb25zdCBkb20gPSBnZXREb21SZWZzKCk7XG5pbml0aWFsaXplRG9tKGRvbSk7XG5cbmZ1bmN0aW9uIGNzc1ZhcihuYW1lOiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB2YWx1ZSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpLnRyaW0oKTtcbiAgcmV0dXJuIHZhbHVlIHx8IGZhbGxiYWNrO1xufVxuXG50eXBlIFRoZW1lID0ge1xuICBmb250RmFtaWx5OiBzdHJpbmc7XG4gIGZvcmVncm91bmQ6IHN0cmluZztcbiAgZWRpdG9yQmc6IHN0cmluZztcbiAgd2lkZ2V0Qmc6IHN0cmluZztcbiAgd2lkZ2V0Qm9yZGVyOiBzdHJpbmc7XG4gIGxpbms6IHN0cmluZztcbiAgd2FybmluZzogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gcmVhZFRoZW1lKCk6IFRoZW1lIHtcbiAgcmV0dXJuIHtcbiAgICBmb250RmFtaWx5OiBjc3NWYXIoXCItLXZzY29kZS1mb250LWZhbWlseVwiLCBcInNhbnMtc2VyaWZcIiksXG4gICAgZm9yZWdyb3VuZDogY3NzVmFyKFwiLS12c2NvZGUtZWRpdG9yLWZvcmVncm91bmRcIiwgXCIjY2NjY2NjXCIpLFxuICAgIGVkaXRvckJnOiBjc3NWYXIoXCItLXZzY29kZS1lZGl0b3ItYmFja2dyb3VuZFwiLCBcIiMxZTFlMWVcIiksXG4gICAgd2lkZ2V0Qmc6IGNzc1ZhcihcIi0tdnNjb2RlLWVkaXRvcldpZGdldC1iYWNrZ3JvdW5kXCIsIFwiIzI1MjUyNlwiKSxcbiAgICB3aWRnZXRCb3JkZXI6IGNzc1ZhcihcIi0tdnNjb2RlLWVkaXRvcldpZGdldC1ib3JkZXJcIiwgXCIjNDU0NTQ1XCIpLFxuICAgIGxpbms6IGNzc1ZhcihcIi0tdnNjb2RlLXRleHRMaW5rLWZvcmVncm91bmRcIiwgXCIjMzc5NGZmXCIpLFxuICAgIHdhcm5pbmc6IGNzc1ZhcihcIi0tdnNjb2RlLWVkaXRvcldhcm5pbmctZm9yZWdyb3VuZFwiLCBcIiNjY2E3MDBcIiksXG4gIH07XG59XG5cbmxldCB0aGVtZSA9IHJlYWRUaGVtZSgpO1xuXG5mdW5jdGlvbiBhcHBseU5vZGVUaGVtZShub2RlOiBBbnlPYmosIG9wdHM6IHsgaXNEb29yOiBib29sZWFuIH0pIHtcbiAgLy8gSW4gTGl0ZUdyYXBoLCBub2RlLmNvbG9yIGlzIHVzZWQgYXMgdGhlIGRlZmF1bHQgdGl0bGViYXIgY29sb3IuXG4gIC8vIFdlIGtlZXAgdGhlIHRpdGxlYmFyIGJhY2tncm91bmQgdGhlbWUtY29uc2lzdGVudCBhbmQgdXNlIGFjY2VudCBjb2xvcnMgZm9yIHRpdGxlIHRleHQgaW5zdGVhZC5cbiAgbm9kZS5jb2xvciA9IHRoZW1lLndpZGdldEJnO1xuICBub2RlLmJnY29sb3IgPSB0aGVtZS5lZGl0b3JCZztcbiAgbm9kZS5ib3hjb2xvciA9IG9wdHMuaXNEb29yID8gdGhlbWUud2FybmluZyA6IHRoZW1lLmxpbms7XG4gIG5vZGUuYm9yZGVyY29sb3IgPSB0aGVtZS53aWRnZXRCb3JkZXI7XG59XG5cbmxldCBpc1BvcHVsYXRpbmdNYXAgPSB0cnVlO1xuXG5sZXQgbG93ZXN0WkxldmVsID0gMDtcbmxldCBoaWdoZXN0WkxldmVsID0gMDtcblxuY29uc3QgZ3JhcGggPSBuZXcgTEdyYXBoKCk7XG5jb25zdCBtYXBDYW52YXMgPSBuZXcgTEdyYXBoQ2FudmFzKFwiI21hcENhbnZhc1wiLCBncmFwaCk7XG5cbmNvbnN0IE1BWF9USVRMRV9MRU5HVEggPSAxNztcbmNvbnN0IE1BWF9MRU5HVEggPSAxOTtcblxubGV0IHNlbGVjdGVkRWRpdG9yID0gXCIwXCI7IC8vIDA6IG1hcCBlZGl0b3IsIDE6IGNvbnZlcnNhdGlvbiBlZGl0b3JcbmxldCBsYXN0TWVzc2FnZTogdW5rbm93bjtcbmxldCBjdXJyZW50TGV2ZWwgPSAwO1xuXG5tYXBDYW52YXMuY29ubmVjdGlvbnNfd2lkdGggPSAyO1xubWFwQ2FudmFzLnJlbmRlcl9jb2xsYXBzZWRfc2xvdHMgPSBmYWxzZTtcbm1hcENhbnZhcy5yZW5kZXJfY29ubmVjdGlvbnNfYm9yZGVyID0gZmFsc2U7XG5tYXBDYW52YXMuYWxpZ25fdG9fZ3JpZCA9IHRydWU7XG5cbm1hcENhbnZhcy5vbk5vZGVNb3ZlZCA9IGZ1bmN0aW9uIChub2RlOiBBbnlPYmopIHtcbiAgbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwidXBkYXRlcG9zXCIsIHsgbmFtZTogbm9kZS5wcm9wZXJ0aWVzLm5hbWUsIHBvczogbm9kZS5wb3MgfSk7XG59O1xuXG5jb25zdCBjb25maWcgPSB7XG4gIGNvbGxhcHNlZDogZmFsc2UsXG4gIHNob3dBbGw6IHRydWUsXG4gIHNob3dVbm1hcHBlZFJvb21zOiBmYWxzZSxcbn07XG5cbmNvbnN0IGxldmVsVXAgPSAoKSA9PiB7XG4gIGlmIChjdXJyZW50TGV2ZWwgPCBoaWdoZXN0WkxldmVsKSB7XG4gICAgY3VycmVudExldmVsKys7XG4gICAgcmVmcmVzaChsYXN0TWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IGxldmVsRG93biA9ICgpID0+IHtcbiAgaWYgKGN1cnJlbnRMZXZlbCA+IGxvd2VzdFpMZXZlbCkge1xuICAgIGN1cnJlbnRMZXZlbC0tO1xuICAgIHJlZnJlc2gobGFzdE1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcbiAgY29uZmlnLmNvbGxhcHNlZCA9ICFjb25maWcuY29sbGFwc2VkO1xuICByZWZyZXNoKGxhc3RNZXNzYWdlKTtcbn07XG5cbmNvbnN0IHRvZ2dsZVNob3dBbGwgPSAoKSA9PiB7XG4gIGNvbmZpZy5zaG93QWxsID0gIWNvbmZpZy5zaG93QWxsO1xuICBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJzaG93YWxsXCIsIGNvbmZpZy5zaG93QWxsKTtcbiAgcmVmcmVzaChsYXN0TWVzc2FnZSk7XG59O1xuXG5jb25zdCB0b2dnbGVTaG93VW5tYXBwZWQgPSAoKSA9PiB7XG4gIGNvbmZpZy5zaG93VW5tYXBwZWRSb29tcyA9ICFjb25maWcuc2hvd1VubWFwcGVkUm9vbXM7XG4gIHJlZnJlc2gobGFzdE1lc3NhZ2UpO1xufTtcblxuLy8gVGhlc2UgYXJlIHJlZmVyZW5jZWQgZnJvbSBpbmxpbmUgb25jbGljaz1cIi4uLlwiIGhhbmRsZXJzIGluIHRoZSBIVE1MLlxuKHdpbmRvdyBhcyBBbnlPYmopLmxldmVsVXAgPSBsZXZlbFVwO1xuKHdpbmRvdyBhcyBBbnlPYmopLmxldmVsRG93biA9IGxldmVsRG93bjtcbih3aW5kb3cgYXMgQW55T2JqKS50b2dnbGVDb2xsYXBzZSA9IHRvZ2dsZUNvbGxhcHNlO1xuKHdpbmRvdyBhcyBBbnlPYmopLnRvZ2dsZVNob3dBbGwgPSB0b2dnbGVTaG93QWxsO1xuKHdpbmRvdyBhcyBBbnlPYmopLnRvZ2dsZVNob3dVbm1hcHBlZCA9IHRvZ2dsZVNob3dVbm1hcHBlZDtcblxuY29uc3QgcG9ydElkID0ge1xuICBOT1JUSDogMCxcbiAgTk9SVEhFQVNUOiAxLFxuICBOT1JUSFdFU1Q6IDIsXG4gIFdFU1Q6IDMsXG4gIEVBU1Q6IDQsXG4gIFNPVVRIOiA1LFxuICBTT1VUSEVBU1Q6IDYsXG4gIFNPVVRIV0VTVDogNyxcbn07XG5cbmZ1bmN0aW9uIHNwbGl0SW50b0xpc3RCeU50aENoYXJhY3RlckZ1bmMoc3RyOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKTogc3RyaW5nW10ge1xuICBjb25zdCBzcGxpdHRlZFdvcmQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHRvdGFsTGVuZ3RoID0gc3RyLmxlbmd0aCA/PyAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsTGVuZ3RoOyBpICs9IG1heExlbmd0aCkge1xuICAgIGNvbnN0IHdvcmQgPSBzdHIuc3Vic3RyKGksIGkgKyBtYXhMZW5ndGgpO1xuICAgIHNwbGl0dGVkV29yZC5wdXNoKHdvcmQpO1xuICB9XG4gIHJldHVybiBzcGxpdHRlZFdvcmQ7XG59XG5cbmZ1bmN0aW9uIHNwbGl0SW50b0xpc3RCeU50aENoYXJhY3RlckZ1bmNPbGQoc3RyOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKTogc3RyaW5nW10ge1xuICBjb25zdCBzcGxpdHRlZFdvcmQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHRvdGFsTGVuZ3RoID0gc3RyLmxlbmd0aCA/PyAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsTGVuZ3RoOyBpICs9IG1heExlbmd0aCkge1xuICAgIGNvbnN0IHdvcmQgPSBzdHIuc3Vic3RyKGksIGkgKyBtYXhMZW5ndGgpO1xuICAgIHNwbGl0dGVkV29yZC5wdXNoKHdvcmQpO1xuICB9XG4gIHJldHVybiBzcGxpdHRlZFdvcmQ7XG59XG5cbmZ1bmN0aW9uIHNwbGl0SW50b0xpc3RCeVdoaXRlc3BhY2VzQW5kTWF4bGVuZ3RoUGVyUm93KHN0cjogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgY29uc3Qgc3BsaXR0ZWRXb3Jkc0J5V1MgPSBzdHIuc3BsaXQoXCIgXCIpO1xuICBjb25zdCByb3dzOiBzdHJpbmdbXSA9IFtdO1xuICBsZXQgcm93U3RyaW5nID0gXCJcIjtcbiAgZm9yIChsZXQgd29yZCA9IDA7IHdvcmQgPCBzcGxpdHRlZFdvcmRzQnlXUy5sZW5ndGg7IHdvcmQrKykge1xuICAgIHdoaWxlIChyb3dTdHJpbmcubGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG4gICAgICByb3dTdHJpbmcgKz0gXCIgXCIgKyBzcGxpdHRlZFdvcmRzQnlXU1t3b3JkXTtcbiAgICAgIHJvd3MucHVzaChyb3dTdHJpbmcpO1xuICAgICAgaWYgKHdvcmQgPCBzcGxpdHRlZFdvcmRzQnlXUy5sZW5ndGgpIHtcbiAgICAgICAgd29yZCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcm93cztcbn1cblxuY2xhc3MgTlBDTm9kZSB7XG4gIHRpdGxlID0gXCJOUENcIjtcbiAgcHJvcGVydGllczogQW55T2JqO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHsgdGl0bGU6IHRoaXMudGl0bGUsIG5hbWU6IFwiXCIsIGRlc2M6IFwiXCIgfTtcbiAgfVxufVxuXG5jbGFzcyBSb29tTm9kZSB7XG4gIHN0YXRpYyB0aXRsZV9tb2RlOiBudW1iZXI7XG4gIHN0YXRpYyB0aXRsZV9jb2xvcjogc3RyaW5nO1xuICBzdGF0aWMgdGl0bGVfdGV4dF9jb2xvcjogc3RyaW5nO1xuXG4gIHRpdGxlID0gXCJST09NXCI7XG5cbiAgbm9ydGhfb3V0OiBBbnlPYmogPSB1bmRlZmluZWQ7XG4gIG5vcnRoX2luOiBBbnlPYmogPSB1bmRlZmluZWQ7XG5cbiAgc291dGhfb3V0OiBBbnlPYmogPSB1bmRlZmluZWQ7XG4gIHNvdXRoX2luOiBBbnlPYmogPSB1bmRlZmluZWQ7XG5cbiAgZWFzdF9vdXQ6IEFueU9iaiA9IHVuZGVmaW5lZDtcbiAgZWFzdF9pbjogQW55T2JqID0gdW5kZWZpbmVkO1xuXG4gIHdlc3Rfb3V0OiBBbnlPYmogPSB1bmRlZmluZWQ7XG4gIHdlc3RfaW46IEFueU9iaiA9IHVuZGVmaW5lZDtcblxuICBub3J0aGVhc3Rfb3V0OiBBbnlPYmogPSB1bmRlZmluZWQ7XG4gIG5vcnRoZWFzdF9pbjogQW55T2JqID0gdW5kZWZpbmVkO1xuXG4gIG5vcnRod2VzdF9vdXQ6IEFueU9iaiA9IHVuZGVmaW5lZDtcbiAgbm9ydGh3ZXN0X2luOiBBbnlPYmogPSB1bmRlZmluZWQ7XG5cbiAgc291dGhlYXN0X291dDogQW55T2JqID0gdW5kZWZpbmVkO1xuICBzb3V0aGVhc3RfaW46IEFueU9iaiA9IHVuZGVmaW5lZDtcblxuICBzb3V0aHdlc3Rfb3V0OiBBbnlPYmogPSB1bmRlZmluZWQ7XG4gIHNvdXRod2VzdF9pbjogQW55T2JqID0gdW5kZWZpbmVkO1xuXG4gIHByb3BlcnRpZXM6IEFueU9iajtcbiAgc2l6ZTogQW55T2JqO1xuICBmbGFnczogQW55T2JqO1xuICByZXNpemFibGU6IEFueU9iajtcbiAgc2VyaWFsaXplX3dpZGdldHM6IEFueU9iajtcbiAgcmVtb3ZhYmxlOiBBbnlPYmo7XG4gIHRpdGxlX21vZGU6IEFueU9iajtcbiAgcHJvcHM6IEFueU9iajtcblxuICAvLyBsaXRlZ3JhcGggbWl4aW5zXG4gIGRlY2xhcmUgYWRkT3V0cHV0OiBBbnlPYmo7XG4gIGRlY2xhcmUgYWRkSW5wdXQ6IEFueU9iajtcblxuICBzZXR1cFR3aW5QYWlyKG5hbWU6IHN0cmluZywgb3B0aW9uczogQW55T2JqLCBkaXJlY3Rpb246IEFueU9iaik6IEFueU9ialtdIHtcbiAgICBjb25zdCBkaXJfb3V0ID0gdGhpcy5hZGRPdXRwdXQobmFtZSArIFwiX291dFwiLCBcIm51bWJlclwiLCBvcHRpb25zKTtcbiAgICBjb25zdCBkaXJfaW4gPSB0aGlzLmFkZElucHV0KG5hbWUgKyBcIl9pblwiLCBcIm51bWJlclwiLCBvcHRpb25zKTtcbiAgICBkaXJfb3V0LmRpciA9IGRpcmVjdGlvbjtcbiAgICBkaXJfaW4uZGlyID0gZGlyZWN0aW9uO1xuICAgIGRpcl9vdXQubGFiZWwgPSBcIlwiO1xuICAgIGRpcl9pbi5sYWJlbCA9IFwiXCI7XG4gICAgcmV0dXJuIFtkaXJfb3V0LCBkaXJfaW5dO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0geyB0aXRsZTogdGhpcy50aXRsZSwgbmFtZTogXCJcIiwgZGVzYzogXCJcIiwgc2hvcnROYW1lOiBcIlwiIH07XG5cbiAgICBbdGhpcy5ub3J0aF9vdXQsIHRoaXMubm9ydGhfaW5dID0gdGhpcy5zZXR1cFR3aW5QYWlyKFxuICAgICAgXCJuXCIsXG4gICAgICB7IHBvczogWzcwLCAtTGl0ZUdyYXBoLk5PREVfVElUTEVfSEVJR0hUXSB9LFxuICAgICAgTGl0ZUdyYXBoLlVQLFxuICAgICk7XG4gICAgW3RoaXMuc291dGhfb3V0LCB0aGlzLnNvdXRoX2luXSA9IHRoaXMuc2V0dXBUd2luUGFpcihcInNcIiwgeyBwb3M6IFs3MCwgODVdIH0sIExpdGVHcmFwaC5ET1dOKTtcbiAgICBbdGhpcy53ZXN0X291dCwgdGhpcy53ZXN0X2luXSA9IHRoaXMuc2V0dXBUd2luUGFpcihcIndcIiwgeyBwb3M6IFswLCA0NV0gfSwgTGl0ZUdyYXBoLkxFRlQpO1xuICAgIFt0aGlzLmVhc3Rfb3V0LCB0aGlzLmVhc3RfaW5dID0gdGhpcy5zZXR1cFR3aW5QYWlyKFwiZVwiLCB7IHBvczogWzE0MSwgNDVdIH0sIExpdGVHcmFwaC5SSUdIVCk7XG4gICAgW3RoaXMubm9ydGhlYXN0X291dCwgdGhpcy5ub3J0aGVhc3RfaW5dID0gdGhpcy5zZXR1cFR3aW5QYWlyKFxuICAgICAgXCJuZVwiLFxuICAgICAgeyBwb3M6IFsxNDAsIC1MaXRlR3JhcGguTk9ERV9USVRMRV9IRUlHSFRdIH0sXG4gICAgICBMaXRlR3JhcGguUklHSFQsXG4gICAgKTtcbiAgICBbdGhpcy5ub3J0aHdlc3Rfb3V0LCB0aGlzLm5vcnRod2VzdF9pbl0gPSB0aGlzLnNldHVwVHdpblBhaXIoXG4gICAgICBcIm53XCIsXG4gICAgICB7IHBvczogWzAsIC1MaXRlR3JhcGguTk9ERV9USVRMRV9IRUlHSFRdIH0sXG4gICAgICBMaXRlR3JhcGguTEVGVCxcbiAgICApO1xuICAgIFt0aGlzLnNvdXRoZWFzdF9vdXQsIHRoaXMuc291dGhlYXN0X2luXSA9IHRoaXMuc2V0dXBUd2luUGFpcihcInNlXCIsIHsgcG9zOiBbMTQwLCA4NV0gfSwgTGl0ZUdyYXBoLlJJR0hUKTtcbiAgICBbdGhpcy5zb3V0aHdlc3Rfb3V0LCB0aGlzLnNvdXRod2VzdF9pbl0gPSB0aGlzLnNldHVwVHdpblBhaXIoXCJzd1wiLCB7IHBvczogWzAsIDg1XSB9LCBMaXRlR3JhcGguTEVGVCk7XG5cbiAgICAvLyB0aGlzLnNpemVbMF0gPSAxNjBcbiAgICB0aGlzLnNpemVbMV0gPSA4NTtcbiAgICB0aGlzLmZsYWdzID0ge1xuICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICBjb2xsYXBzZWQ6IGNvbmZpZy5jb2xsYXBzZWQsXG4gICAgfTtcbiAgICB0aGlzLnJlc2l6YWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VyaWFsaXplX3dpZGdldHMgPSB0cnVlO1xuXG4gICAgdGhpcy5yZW1vdmFibGUgPSBmYWxzZTtcbiAgICB0aGlzLnRpdGxlX21vZGUgPSBMaXRlR3JhcGguVFJBTlNQQVJFTlRfVElUTEU7XG4gIH1cblxuICBnZXRUaXRsZSA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9XG4gICAgICB0aGlzLnRpdGxlLmxlbmd0aCA+IE1BWF9USVRMRV9MRU5HVEggPyB0aGlzLnRpdGxlLnN1YnN0cigwLCBNQVhfVElUTEVfTEVOR1RIIC0gMykgKyBcIi4uLlwiIDogdGhpcy50aXRsZTtcbiAgICByZXR1cm4gdGl0bGU7XG4gIH07XG5cbiAgb25EcmF3Rm9yZWdyb3VuZCA9IChjdHg6IEFueU9iaikgPT4ge1xuICAgIGlmICh0aGlzLmZsYWdzLmNvbGxhcHNlZCkgcmV0dXJuO1xuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZm9udCA9IGAxMnB4ICR7dGhlbWUuZm9udEZhbWlseX1gO1xuICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhlbWUuZm9yZWdyb3VuZDtcblxuICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLnByb3BlcnRpZXM/LnNob3J0TmFtZSB8fCB0aGlzLnByb3BlcnRpZXM/Lm5hbWUgfHwgdGhpcy50aXRsZTtcbiAgICBjb25zdCBzcGxpdHRlZFdvcmQgPSBzcGxpdEludG9MaXN0QnlOdGhDaGFyYWN0ZXJGdW5jKGxhYmVsLCBNQVhfTEVOR1RIKTtcblxuICAgIGxldCB5UG9zID0gMjA7XG4gICAgZm9yIChjb25zdCB3b3JkIG9mIHNwbGl0dGVkV29yZCkge1xuICAgICAgY3R4LmZpbGxUZXh0KHdvcmQsIDUsICh5UG9zICs9IDIwKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcGVydGllcz8uaXNEb29yKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhlbWUud2FybmluZztcbiAgICAgIGN0eC5mb250ID0gYDEwcHggJHt0aGVtZS5mb250RmFtaWx5fWA7XG4gICAgICBjdHguZmlsbFRleHQoXCJET09SXCIsIDUsIDE0KTtcbiAgICB9XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBvbkNvbm5lY3Rpb25zQ2hhbmdlKGRpcmVjdGlvblR5cGU6IEFueU9iaiwgc2xvdDogQW55T2JqLCBjb25uZWN0ZWQ6IGJvb2xlYW4sIGxpbmtJbmZvOiBBbnlPYmosIGlucHV0SW5mbzogQW55T2JqKSB7XG4gICAgaWYgKGNvbm5lY3RlZCAmJiAhaXNQb3B1bGF0aW5nTWFwKSB7XG4gICAgICBjb25zdCB0YXJnZXRfbm9kZSA9IGdyYXBoLmdldE5vZGVCeUlkKGxpbmtJbmZvLnRhcmdldF9pZCk7XG4gICAgICBjb25zdCBmcm9tID0gdGhpcy5wcm9wZXJ0aWVzPy5uYW1lO1xuICAgICAgY29uc3QgdG8gPSB0YXJnZXRfbm9kZT8ucHJvcGVydGllcz8ubmFtZTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbk5hbWUgPSBpbnB1dEluZm8ubmFtZTtcbiAgICAgIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImNoYW5nZXBvcnRcIiwgeyBmcm9tLCB0bywgZGlyZWN0aW9uTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbkV4ZWN1dGUoKSB7XG4gICAgdGhpcy5zaXplWzFdID0gODU7XG5cbiAgICBpZiAodGhpcy5wcm9wcy50aXRsZSAhPT0gdGhpcy50aXRsZSkge1xuICAgICAgdGhpcy5wcm9wcy50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgfVxuICAgIHRoaXMubm9ydGhfb3V0LnBvc1swXSA9IHRoaXMuc2l6ZVswXSA+PiAxO1xuICAgIHRoaXMubm9ydGhfb3V0LnBvc1sxXSA9IC1MaXRlR3JhcGguTk9ERV9USVRMRV9IRUlHSFQ7XG5cbiAgICB0aGlzLm5vcnRoZWFzdF9vdXQucG9zWzBdID0gdGhpcy5zaXplWzBdO1xuICAgIHRoaXMubm9ydGhlYXN0X291dC5wb3NbMV0gPSAtTGl0ZUdyYXBoLk5PREVfVElUTEVfSEVJR0hUO1xuXG4gICAgdGhpcy5ub3J0aHdlc3Rfb3V0LnBvc1swXSA9IDA7XG4gICAgdGhpcy5ub3J0aHdlc3Rfb3V0LnBvc1sxXSA9IC1MaXRlR3JhcGguTk9ERV9USVRMRV9IRUlHSFQ7XG5cbiAgICB0aGlzLnNvdXRoX291dC5wb3NbMF0gPSB0aGlzLnNpemVbMF0gPj4gMTtcbiAgICB0aGlzLnNvdXRoX291dC5wb3NbMV0gPSB0aGlzLnNpemVbMV07XG5cbiAgICB0aGlzLnNvdXRoZWFzdF9vdXQucG9zWzBdID0gdGhpcy5zaXplWzBdO1xuICAgIHRoaXMuc291dGhlYXN0X291dC5wb3NbMV0gPSB0aGlzLnNpemVbMV07XG5cbiAgICB0aGlzLnNvdXRod2VzdF9vdXQucG9zWzBdID0gMDtcbiAgICB0aGlzLnNvdXRod2VzdF9vdXQucG9zWzFdID0gdGhpcy5zaXplWzFdO1xuXG4gICAgdGhpcy5lYXN0X291dC5wb3NbMF0gPSB0aGlzLnNpemVbMF07XG4gICAgdGhpcy5lYXN0X291dC5wb3NbMV0gPSB0aGlzLnNpemVbMV0gPj4gMTtcblxuICAgIHRoaXMud2VzdF9vdXQucG9zWzBdID0gMDtcbiAgICB0aGlzLndlc3Rfb3V0LnBvc1sxXSA9IHRoaXMuc2l6ZVsxXSA+PiAxO1xuICB9XG5cbiAgb25SZW1vdmVkKCkge1xuICAgIC8vIGBncmFwaC5jbGVhcigpYCBkdXJpbmcgcmVmcmVzaCByZW1vdmVzIGV2ZXJ5IG5vZGUgYW5kIGNhbGxzIGBvblJlbW92ZWQoKWAuXG4gICAgLy8gT25seSB0cmVhdCByZW1vdmFsIGFzIHVzZXIgaW50ZW50IHdoZW4gd2UncmUgbm90IHBvcHVsYXRpbmcgdGhlIG1hcC5cbiAgICBpZiAoIWlzUG9wdWxhdGluZ01hcCkge1xuICAgICAgY29uc3QgbmFtZSA9IHRoaXMucHJvcGVydGllcz8ubmFtZSA/PyB0aGlzLnRpdGxlO1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwicmVtb3Zlcm9vbVwiLCBuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgRG9vck5vZGUgZXh0ZW5kcyBSb29tTm9kZSB7XG4gIHN0YXRpYyB0aXRsZV90ZXh0X2NvbG9yOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VGhlbWVUb0xpdGVHcmFwaCgpIHtcbiAgdGhlbWUgPSByZWFkVGhlbWUoKTtcblxuICAvLyBDYW52YXMgZGVmYXVsdHMgKHVzZWQgd2hlbiBhIG5vZGUgdHlwZSBkb2Vzbid0IG92ZXJyaWRlIGl0KVxuICBtYXBDYW52YXMubm9kZV90aXRsZV9jb2xvciA9IHRoZW1lLmZvcmVncm91bmQ7XG5cbiAgUm9vbU5vZGUudGl0bGVfbW9kZSA9IExpdGVHcmFwaC5OT1JNQUxfVElUTEU7XG4gIFJvb21Ob2RlLnRpdGxlX2NvbG9yID0gdGhlbWUud2lkZ2V0Qmc7XG4gIFJvb21Ob2RlLnRpdGxlX3RleHRfY29sb3IgPSB0aGVtZS5saW5rO1xuXG4gIERvb3JOb2RlLnRpdGxlX21vZGUgPSBMaXRlR3JhcGguTk9STUFMX1RJVExFO1xuICBEb29yTm9kZS50aXRsZV9jb2xvciA9IHRoZW1lLndpZGdldEJnO1xuICBEb29yTm9kZS50aXRsZV90ZXh0X2NvbG9yID0gdGhlbWUud2FybmluZztcbn1cblxuYXBwbHlUaGVtZVRvTGl0ZUdyYXBoKCk7XG5cbkxpdGVHcmFwaC5yZWdpc3Rlck5vZGVUeXBlKFwiYmFzaWMvcm9vbVwiLCBSb29tTm9kZSk7XG5MaXRlR3JhcGgucmVnaXN0ZXJOb2RlVHlwZShcImJhc2ljL2Rvb3JcIiwgRG9vck5vZGUpO1xuTGl0ZUdyYXBoLnJlZ2lzdGVyTm9kZVR5cGUoXCJiYXNpYy9ucGNcIiwgTlBDTm9kZSk7XG5cbmxldCBjdXJyZW50U3RhcnRSb29tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbmJpbmREb21FdmVudHMoZG9tLCB7XG4gIG9uUmVmcmVzaENsaWNrOiAoKSA9PiBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJyZWZyZXNoXCIsIHVuZGVmaW5lZCksXG4gIG9uUmVzZXRDbGljazogKCkgPT4gbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwicmVzZXRcIiwgdW5kZWZpbmVkKSxcbiAgb25Sb29tQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICBjdXJyZW50U3RhcnRSb29tID0gdmFsdWU7XG4gICAgbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwiY2hhbmdlc3RhcnRyb29tXCIsIHZhbHVlKTtcbiAgfSxcbiAgb25FZGl0b3JDaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgIHNlbGVjdGVkRWRpdG9yID0gdmFsdWU7XG4gICAgbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwiZWRpdG9yXCIsIHZhbHVlKTtcbiAgfSxcbiAgb25XaW5kb3dNZXNzYWdlOiAoZGF0YSkgPT4ge1xuICAgIGxhc3RNZXNzYWdlID0gZGF0YTtcbiAgICByZWZyZXNoKGRhdGEpO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZUNvbnZlcnNhdGlvbk5vZGVzKHBheWxvYWQ6IEFueU9iaikge1xuICBpZiAocGF5bG9hZC5jb21tYW5kID09PSBcInRhZHMzLmFkZE5vZGVcIiAmJiBwYXlsb2FkLm9iamVjdHMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBuZXh0WCA9IDA7XG4gICAgbGV0IG5leHRZID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBucGMgPSBwYXlsb2FkLm9iamVjdHNbaV07XG4gICAgICBjcmVhdGVDb252ZXJzYXRpb25Ob2RlKG5wYyk7XG4gICAgICBuZXh0WCA9IG5wYy54ICsgMTtcbiAgICAgIG5leHRZID0gbnBjLnkgKyAxO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBucGMuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbnBjLmNoaWxkcmVuW2pdO1xuICAgICAgICBjaGlsZE5vZGUueSA9IG5leHRZO1xuICAgICAgICBjaGlsZE5vZGUueCA9IG5leHRYKys7XG4gICAgICAgIGNyZWF0ZUNvbnZlcnNhdGlvbk5vZGUoY2hpbGROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVmcmVzaChwYXlsb2FkOiB1bmtub3duKSB7XG4gIGlzUG9wdWxhdGluZ01hcCA9IHRydWU7XG4gIHRyeSB7XG4gICAgYXBwbHlUaGVtZVRvTGl0ZUdyYXBoKCk7XG4gICAgZ3JhcGguY2xlYXIoKTtcbiAgICBpZiAoc2VsZWN0ZWRFZGl0b3IgPT09IFwiMVwiKSB7XG4gICAgICBoYW5kbGVDb252ZXJzYXRpb25Ob2RlcyhwYXlsb2FkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlUm9vbU5vZGVzKHBheWxvYWQpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJsb2dcIiwgYEVycm9yIGR1cmluZyBhZGRub2RlOiAgJHtlcnJvcn1gKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpc1BvcHVsYXRpbmdNYXAgPSBmYWxzZTtcbiAgfVxufVxuXG5jb25zdCByb29tcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG5mdW5jdGlvbiBzZXR1cERpcmVjdGlvbihjdXJyZW50Um9vbU5vZGU6IEFueU9iaiwgb2JqZWN0RGlyOiBBbnlPYmosIHBvcnQxOiBBbnlPYmosIHBvcnQyOiBBbnlPYmopIHtcbiAgaWYgKG9iamVjdERpcikge1xuICAgIGNvbnN0IGNvbm5lY3RlZE5vZGUgPSBncmFwaC5fbm9kZXMuZmluZCgoeDogQW55T2JqKSA9PiB4LnRpdGxlID09PSBvYmplY3REaXIpO1xuICAgIGlmIChjb25uZWN0ZWROb2RlKSB7XG4gICAgICBjdXJyZW50Um9vbU5vZGUuY29ubmVjdChwb3J0MSwgY29ubmVjdGVkTm9kZSwgcG9ydDIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVPcHRpb25zKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gIGNvbnN0IEwgPSBzZWxlY3RFbGVtZW50Lm9wdGlvbnMubGVuZ3RoIC0gMTtcbiAgZm9yIChsZXQgaSA9IEw7IGkgPj0gMDsgaS0tKSB7XG4gICAgc2VsZWN0RWxlbWVudC5yZW1vdmUoaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJSb29tU2VsZWN0b3IoKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFkb20ucm9vbVNlbGVjdG9yKSByZXR1cm47XG5cbiAgICByZW1vdmVPcHRpb25zKGRvbS5yb29tU2VsZWN0b3IpO1xuICAgIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImxvZ1wiLCBgQ2xlYXJpbmcgb2xkIHZhbHVlcyBpbiByb29tU2VsZWN0b3I6ICR7ZG9tLnJvb21TZWxlY3Rvci5vcHRpb25zLmxlbmd0aH0gYCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImxvZ1wiLCBcImVycm9yIGR1cmluZyByb29tU2VsZWN0b3IgY2xlYXI6IFwiICsgZXJyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0Rvb3Iob2JqOiBBbnlPYmopIHtcbiAgY29uc3QgZGV0YWlsOiB1bmtub3duID0gb2JqPy5kZXRhaWw7XG4gIGlmICh0eXBlb2YgZGV0YWlsICE9PSBcInN0cmluZ1wiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAvRG9vcnxQYXNzYWdlfFN0YWlyd2F5Ly50ZXN0KGRldGFpbCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJvb21Ob2RlcyhwYXlsb2FkOiBBbnlPYmopIHtcbiAgaWYgKGRvbS5sZXZlbExhYmVsUmVmKSB7XG4gICAgZG9tLmxldmVsTGFiZWxSZWYuaW5uZXJUZXh0ID0gU3RyaW5nKGN1cnJlbnRMZXZlbCk7XG4gIH1cblxuICBzd2l0Y2ggKHBheWxvYWQuY29tbWFuZCkge1xuICAgIGNhc2UgXCJ0YWRzMy5hZGROb2RlXCI6XG4gICAgICBpZiAocGF5bG9hZC5vYmplY3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2xlYXJSb29tU2VsZWN0b3IoKTtcblxuICAgICAgICBjb25zdCBzb3J0ZWROYW1lczogc3RyaW5nW10gPSBwYXlsb2FkLm9iamVjdHNcbiAgICAgICAgICAuZmlsdGVyKCh4OiBBbnlPYmopID0+ICFpc0Rvb3IoeCkpXG4gICAgICAgICAgLm1hcCgoeDogQW55T2JqKSA9PiB4Lm5hbWUpXG4gICAgICAgICAgLnNvcnQoKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBzb3J0ZWROYW1lcykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWRvbS5yb29tU2VsZWN0b3IpIGJyZWFrO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgIG9wdGlvbk5vZGUudmFsdWUgPSBuYW1lID8/IFwiZXJyXCI7XG4gICAgICAgICAgICBvcHRpb25Ob2RlLmlubmVySFRNTCA9IG5hbWUgPz8gXCJlcnJcIjtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhcnRSb29tID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgIG9wdGlvbk5vZGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tLnJvb21TZWxlY3Rvci5hcHBlbmRDaGlsZChvcHRpb25Ob2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImxvZ1wiLCBgRXJyb3IgZHVyaW5nIGFkZG5vZGU6ICAke2Vycn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYW5kbGVMYXRlcjogQW55T2JqW10gPSBbXTtcbiAgICAgICAgbGV0IG1heGltdW1ZID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXlsb2FkLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0ID0gcGF5bG9hZC5vYmplY3RzW2ldO1xuICAgICAgICAgIGxvd2VzdFpMZXZlbCA9IE1hdGgubWluKGxvd2VzdFpMZXZlbCwgY3VycmVudE9iamVjdC56KTtcbiAgICAgICAgICBoaWdoZXN0WkxldmVsID0gTWF0aC5tYXgoaGlnaGVzdFpMZXZlbCwgY3VycmVudE9iamVjdC56KTtcblxuICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnogIT09IGN1cnJlbnRMZXZlbCkge1xuICAgICAgICAgICAgaGFuZGxlTGF0ZXIucHVzaChjdXJyZW50T2JqZWN0KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC5pc01hcHBlZCB8fCBjdXJyZW50T2JqZWN0LmlzTmV3KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlTm9kZUZyb21Sb29tT2JqZWN0KHBheWxvYWQub2JqZWN0c1tpXSk7XG4gICAgICAgICAgICBtYXhpbXVtWSA9IG5vZGUucG9zWzFdID4gbWF4aW11bVkgPyBub2RlLnBvc1sxXSA6IG1heGltdW1ZO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVMYXRlci5wdXNoKGN1cnJlbnRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHlJbmMgPSAxOTA7XG4gICAgICAgIG1heGltdW1ZICs9IHlJbmMgKiAyO1xuICAgICAgICBsZXQgeGNvdW50ID0gMDtcbiAgICAgICAgY29uc3QgQ09MUyA9IDEwO1xuXG4gICAgICAgIGNvbnN0IHhJbmMgPSAxNTA7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5zaG93VW5tYXBwZWRSb29tcyAmJiBoYW5kbGVMYXRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgTEdyYXBoR3JvdXAoKTtcblxuICAgICAgICAgIGNvbnN0IHRvdGFsUm93cyA9IE1hdGguY2VpbChoYW5kbGVMYXRlci5sZW5ndGggLyBDT0xTKTtcbiAgICAgICAgICBjb25zdCB0b3RhbExlbmd0aCA9IHhJbmMgKiBNYXRoLm1pbihoYW5kbGVMYXRlci5sZW5ndGgsIENPTFMpO1xuXG4gICAgICAgICAgY29uc3QgeVBhZGRpbmcgPSA4MDtcbiAgICAgICAgICBncm91cC5jb25maWd1cmUoe1xuICAgICAgICAgICAgdGl0bGU6IFwiVW5tYXBwZWQgcm9vbXNcIixcbiAgICAgICAgICAgIGJvdW5kaW5nOiBbMCwgbWF4aW11bVkgLSB5UGFkZGluZywgdG90YWxMZW5ndGgsIHRvdGFsUm93cyAqIHlJbmNdLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdyYXBoLmFkZChncm91cCk7XG5cbiAgICAgICAgICBsZXQgeCA9IDA7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVMYXRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHhjb3VudCA9PT0gQ09MUykge1xuICAgICAgICAgICAgICBtYXhpbXVtWSArPSB5SW5jO1xuICAgICAgICAgICAgICB4Y291bnQgPSAwO1xuICAgICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3QgPSBoYW5kbGVMYXRlcltpXTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QuaGFzQWJzb2x1dGVQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnggPSB4O1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gbWF4aW11bVk7XG5cbiAgICAgICAgICAgIGNyZWF0ZU5vZGVGcm9tUm9vbU9iamVjdChjdXJyZW50T2JqZWN0KTtcblxuICAgICAgICAgICAgeCArPSB4SW5jO1xuICAgICAgICAgICAgeGNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGlmIChwYXlsb2FkLm9iamVjdHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBheWxvYWQub2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbyA9IHBheWxvYWQub2JqZWN0c1tpXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRSb29tTm9kZSA9IGdyYXBoLl9ub2Rlcy5maW5kKCh4OiBBbnlPYmopID0+IHgudGl0bGUgPT09IG8ubmFtZSk7XG4gICAgICBpZiAoY3VycmVudFJvb21Ob2RlKSB7XG4gICAgICAgIHNldHVwRGlyZWN0aW9uKGN1cnJlbnRSb29tTm9kZSwgby5ub3J0aCwgXCJuX291dFwiLCBcInNfaW5cIik7XG4gICAgICAgIHNldHVwRGlyZWN0aW9uKGN1cnJlbnRSb29tTm9kZSwgby5zb3V0aCwgXCJzX291dFwiLCBcIm5faW5cIik7XG4gICAgICAgIHNldHVwRGlyZWN0aW9uKGN1cnJlbnRSb29tTm9kZSwgby53ZXN0LCBcIndfb3V0XCIsIFwiZV9pblwiKTtcbiAgICAgICAgc2V0dXBEaXJlY3Rpb24oY3VycmVudFJvb21Ob2RlLCBvLmVhc3QsIFwiZV9vdXRcIiwgXCJ3X2luXCIpO1xuICAgICAgICBzZXR1cERpcmVjdGlvbihjdXJyZW50Um9vbU5vZGUsIG8ubm9ydGh3ZXN0LCBcIm53X291dFwiLCBcInNlX2luXCIpO1xuICAgICAgICBzZXR1cERpcmVjdGlvbihjdXJyZW50Um9vbU5vZGUsIG8uc291dGhlYXN0LCBcInNlX291dFwiLCBcIm53X2luXCIpO1xuICAgICAgICBzZXR1cERpcmVjdGlvbihjdXJyZW50Um9vbU5vZGUsIG8ubm9ydGhlYXN0LCBcIm5lX291dFwiLCBcInN3X2luXCIpO1xuICAgICAgICBzZXR1cERpcmVjdGlvbihjdXJyZW50Um9vbU5vZGUsIG8uc291dGh3ZXN0LCBcInN3X291dFwiLCBcIm5lX2luXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb252ZXJzYXRpb25Ob2RlKGNvbnZPYmplY3Q6IEFueU9iaikge1xuICBjb25zdCBub2RlID0gTGl0ZUdyYXBoLmNyZWF0ZU5vZGUoXCJiYXNpYy9ucGNcIik7XG4gIGlmIChjb252T2JqZWN0Lm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIG5vZGUucHJvcGVydGllcy52YXJuYW1lID0gY29udk9iamVjdC5uYW1lID8/IFwidW5uYW1lZCBub2RlXCI7XG4gICAgbm9kZS50aXRsZSA9IGNvbnZPYmplY3QubmFtZSA/PyBcInVubmFtZWQgbm9kZVwiO1xuICB9XG5cbiAgY29uc3Qgc2NhbGVGYWN0b3JYID0gMTcwO1xuICBjb25zdCBzY2FsZUZhY3RvclkgPSA3NTtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG4gIGNvbnN0IG9mZnNldFggPSA1MDtcbiAgY29uc3Qgb2Zmc2V0WSA9IDUwO1xuXG4gIGlmIChjb252T2JqZWN0LnggIT09IHVuZGVmaW5lZCkge1xuICAgIHggPSBjb252T2JqZWN0LnggKiBzY2FsZUZhY3RvclggKyBvZmZzZXRYO1xuICB9XG4gIGlmIChjb252T2JqZWN0LnkgIT09IHVuZGVmaW5lZCkge1xuICAgIHkgPSBjb252T2JqZWN0LnkgKiBzY2FsZUZhY3RvclkgKyBvZmZzZXRZO1xuICB9XG4gIG5vZGUucG9zID0gW3gsIHldO1xuXG4gIG5vZGUub25Nb3VzZURvd24gPSAoKSA9PiBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJzZWxlY3RcIiwgbm9kZS50aXRsZSk7XG5cbiAgZ3JhcGguYWRkKG5vZGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlRnJvbVJvb21PYmplY3Qocm9vbU9iamVjdDogQW55T2JqKSB7XG4gIGNvbnN0IGlzRG9vck5vZGUgPSBpc0Rvb3Iocm9vbU9iamVjdCk7XG4gIGNvbnN0IG5vZGUgPSBMaXRlR3JhcGguY3JlYXRlTm9kZShpc0Rvb3JOb2RlID8gXCJiYXNpYy9kb29yXCIgOiBcImJhc2ljL3Jvb21cIik7XG5cbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG5cbiAgaWYgKHJvb21PYmplY3QuaGFzQWJzb2x1dGVQb3NpdGlvbikge1xuICAgIHggPSByb29tT2JqZWN0Lng7XG4gICAgeSA9IHJvb21PYmplY3QueTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzY2FsZUZhY3RvclggPSAxNzU7XG4gICAgY29uc3Qgc2NhbGVGYWN0b3JZID0gY29uZmlnLmNvbGxhcHNlZCA/IDc1IDogMTc1O1xuICAgIGNvbnN0IG9mZnNldFggPSA1MDtcbiAgICBjb25zdCBvZmZzZXRZID0gNTA7XG5cbiAgICBpZiAocm9vbU9iamVjdC54ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHggPSByb29tT2JqZWN0LnggKiBzY2FsZUZhY3RvclggKyBvZmZzZXRYO1xuICAgIH1cbiAgICBpZiAocm9vbU9iamVjdC55ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHkgPSByb29tT2JqZWN0LnkgKiBzY2FsZUZhY3RvclkgKyBvZmZzZXRZO1xuICAgIH1cbiAgfVxuICBub2RlLnBvcyA9IFt4LCB5XTtcblxuICBpZiAocm9vbU9iamVjdC5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICBub2RlLnRpdGxlID0gcm9vbU9iamVjdC5uYW1lO1xuICAgIG5vZGUucHJvcGVydGllcy5uYW1lID0gcm9vbU9iamVjdC5uYW1lO1xuICB9XG5cbiAgbm9kZS5wcm9wZXJ0aWVzLnRpdGxlID0gbm9kZS50aXRsZTtcbiAgbm9kZS5wcm9wZXJ0aWVzLmlzRG9vciA9IGlzRG9vck5vZGU7XG4gIGlmIChyb29tT2JqZWN0W1wic2hvcnROYW1lXCJdKSB7XG4gICAgbm9kZS5wcm9wZXJ0aWVzLnNob3J0TmFtZSA9IHJvb21PYmplY3RbXCJzaG9ydE5hbWVcIl0ucmVwbGFjZShcIlxcXFwnXCIsIFwiJ1wiKTtcbiAgfVxuXG4gIGFwcGx5Tm9kZVRoZW1lKG5vZGUsIHsgaXNEb29yOiBpc0Rvb3JOb2RlIH0pO1xuXG4gIGdyYXBoLmFkZChub2RlKTtcbiAgYXBwbHlDYWxsYmFja3NPblJvb21Ob2RlKG5vZGUpO1xuICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gYXBwbHlDYWxsYmFja3NPblJvb21Ob2RlKG5vZGU6IEFueU9iaikge1xuICBub2RlLm9uTW91c2VEb3duID0gKCkgPT4ge1xuICAgIC8vIHZzY29kZS5wb3N0TWVzc2FnZSh7IGNvbW1hbmQ6ICdzZWxlY3QnLCBwYXlsb2FkOiBub2RlLnRpdGxlIH0pO1xuICB9O1xuXG4gIG5vZGUub25Qcm9wZXJ0eUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS50aXRsZSA9IG5vZGUucHJvcGVydGllcy5uYW1lO1xuICAgIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImNoYW5nZVwiLCBgUHJvcGVydHkgY2hhbmdlIGZvciBvYmplY3Q6ICR7bm9kZS5wcm9wZXJ0aWVzLm5hbWV9YCk7XG4gIH07XG5cbiAgbm9kZS5jbG9uYWJsZSA9IGZhbHNlO1xuXG4gIG5vZGUuZ2V0TWVudU9wdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgY29udGVudDogXCJsb2NhdGVcIixcbiAgICAgICAgaGFzX3N1Ym1lbnU6IGZhbHNlLFxuICAgICAgICBjYWxsYmFjazogbG9jYXRlUm9vbSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfTtcbn1cblxuY29uc3QgbG9jYXRlUm9vbSA9IChfdmFsdWU6IEFueU9iaiwgZXZlbnQ6IEFueU9iaikgPT4ge1xuICBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJzZWxlY3RcIiwgZXZlbnQuZXh0cmEudGl0bGUpO1xufTtcblxuY29uc3QgY3JlYXRlUm9vbU5vZGUgPSBmdW5jdGlvbiAobm9kZTogQW55T2JqKSB7XG4gIGNvbnN0IHJvb20gPSB7XG4gICAgbmFtZTogbm9kZS50aXRsZSxcbiAgICBwb3M6IG5vZGUucG9zLFxuICAgIGRpcmVjdGlvbnM6IHt9LFxuICB9O1xuICByZXR1cm4gcm9vbTtcbn07XG5cbmZ1bmN0aW9uIGRvQWRkUm9vbShuYW1lOiBzdHJpbmcsIGZpcnN0RXZlbnQ6IEFueU9iaikge1xuICBjb25zdCB0cmltbWVkID0gKG5hbWUgPz8gXCJcIikudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybjtcblxuICBjb25zdCBub2RlID0gTGl0ZUdyYXBoLmNyZWF0ZU5vZGUoXCJiYXNpYy9yb29tXCIpO1xuICBub2RlLnBvcyA9IG1hcENhbnZhcy5jb252ZXJ0RXZlbnRUb0NhbnZhc09mZnNldChmaXJzdEV2ZW50KTtcblxuICBhcHBseUNhbGxiYWNrc09uUm9vbU5vZGUobm9kZSk7XG4gIG5vZGUucHJvcGVydGllcy5uYW1lID0gdHJpbW1lZDtcbiAgbm9kZS50aXRsZSA9IHRyaW1tZWQ7XG4gIGFwcGx5Tm9kZVRoZW1lKG5vZGUsIHsgaXNEb29yOiBmYWxzZSB9KTtcblxuICBncmFwaC5hZGQobm9kZSk7XG4gIG1lc3Nlbmdlci5wb3N0Q29tbWFuZChcImFkZHJvb21cIiwgY3JlYXRlUm9vbU5vZGUobm9kZSkpO1xuICBtZXNzZW5nZXIucG9zdENvbW1hbmQoXCJzZWxlY3RcIiwgbm9kZS50aXRsZSk7XG59XG5cbmNvbnN0IGNyZWF0ZVJvb21HVUkgPSAoX3ZhbHVlOiBBbnlPYmosIF9ldmVudDogQW55T2JqLCBfbW91c2VFdmVudDogQW55T2JqLCBjb250ZXh0TWVudTogQW55T2JqKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZmlyc3RfZXZlbnQgPSBjb250ZXh0TWVudT8uZ2V0Rmlyc3RFdmVudD8uKCkgPz8gX21vdXNlRXZlbnQgPz8gX2V2ZW50O1xuXG4gICAgdHJ5IHtcbiAgICAgIG1hcENhbnZhcy5wcm9tcHQoXG4gICAgICAgIFwiUm9vbSBuYW1lOlwiLFxuICAgICAgICBcIlwiLFxuICAgICAgICAobmFtZTogc3RyaW5nKSA9PiBkb0FkZFJvb20obmFtZSwgZmlyc3RfZXZlbnQpLFxuICAgICAgICBmaXJzdF9ldmVudCxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gRmFsbGJhY2s6IGlmIExpdGVHcmFwaCBwcm9tcHQgY2Fubm90IG9wZW4gKGUuZy4gYWN0aXZlX2NhbnZhcyBpc3N1ZXMpLFxuICAgICAgLy8gdXNlIGEgbmF0aXZlIHByb21wdCBzbyBhZGRpbmcgYSByb29tIG5ldmVyIGhhcmQtZmFpbHMuXG4gICAgICBjb25zdCBuYW1lID0gd2luZG93LnByb21wdChcIlJvb20gbmFtZTpcIiwgXCJcIik7XG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XG4gICAgICAgIGRvQWRkUm9vbShuYW1lLCBmaXJzdF9ldmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgbWVzc2VuZ2VyLnBvc3RDb21tYW5kKFwibG9nXCIsIGBFcnJvciBkdXJpbmcgQWRkIFJvb206ICR7ZXJyfWApO1xuICB9XG59O1xuXG5tYXBDYW52YXMuZ2V0TWVudU9wdGlvbnMgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY29udGVudDogXCJBZGQgUm9vbVwiLFxuICAgICAgaGFzX3N1Ym1lbnU6IGZhbHNlLFxuICAgICAgY2FsbGJhY2s6IGNyZWF0ZVJvb21HVUksXG4gICAgfSxcbiAgXTtcbn07XG5cbmdyYXBoLnN0YXJ0KCk7XG5cbmV4cG9ydCB7fTtcbiJdLAogICJtYXBwaW5n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
