/* eslint-disable no-debugger */
/* eslint-disable no-mixed-spaces-and-tabs */

// This runs inside a VS Code webview (browser context).
// It's compiled to `resources/maprenderer/maprenderer.js` via `npm run build:maprenderer`.

import { Core, ElementDefinition, StylesheetJsonBlock } from "cytoscape";
import { bindDomEvents, getDomRefs, initializeDom } from "./dom";
import { createMessenger } from "./messaging";
import cytoscape from "cytoscape";

//import cytoscape, { Stylesheet, type Core, type ElementDefinition, type StylesheetCSS } from "cytoscape";

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
    widgetBg: cssVar("--vscode-editorWidget-background", "#252526"),
    widgetBorder: cssVar("--vscode-editorWidget-border", "#454545"),
    link: cssVar("--vscode-textLink-foreground", "#3794ff"),
    warning: cssVar("--vscode-editorWarning-foreground", "#cca700"),
  };
}

let theme = readTheme();

// --- Graph renderer (Cytoscape.js) ---

const container = document.getElementById("mapCanvas") as HTMLElement | null;
if (!container) {
  throw new Error("Expected #mapCanvas to exist");
}

let cy: Core | undefined;

let currentStartRoom: string | undefined;
let selectedEditor = "0";
let lastMessage: unknown;

// These are referenced from inline onclick="..." handlers in the HTML.
(window as AnyObj).levelUp = () => {};
(window as AnyObj).levelDown = () => {};
(window as AnyObj).toggleCollapse = () => {};
(window as AnyObj).toggleShowAll = () => {};
(window as AnyObj).toggleShowUnmapped = () => {};

function zoomBy(factor: number) {
  if (!cy) return;
  const current = cy.zoom();
  const next = current * factor;
  if (container) {
    cy.zoom({
      level: next,
      renderedPosition: { x: container.clientWidth / 2, y: container.clientHeight / 2 },
    });
  }
}

(window as AnyObj).zoomIn = () => zoomBy(1.15);
(window as AnyObj).zoomOut = () => zoomBy(1 / 1.15);

// Maps each exit direction to (source-endpoint, target-endpoint, taxi-direction).
// Percentages are measured from node centre: "50% 0%" = right edge, "0% -50%" = top edge, etc.
const DIR_ENDPOINTS: Record<RelationDir, { se: string; te: string; td: string }> = {
  north:     { se: "0% -50%",   te: "0% 50%",    td: "upward"    },
  northeast: { se: "50% -50%",  te: "-50% 50%",  td: "auto"      },
  east:      { se: "50% 0%",    te: "-50% 0%",   td: "rightward" },
  southeast: { se: "50% 50%",   te: "-50% -50%", td: "auto"      },
  south:     { se: "0% 50%",    te: "0% -50%",   td: "downward"  },
  southwest: { se: "-50% 50%",  te: "50% -50%",  td: "auto"      },
  west:      { se: "-50% 0%",   te: "50% 0%",    td: "leftward"  },
  northwest: { se: "-50% -50%", te: "50% 50%",   td: "auto"      },
  up:        { se: "0% -50%",   te: "0% 50%",    td: "upward"    },
  down:      { se: "0% 50%",    te: "0% -50%",   td: "downward"  },
  in:        { se: "50% 0%",    te: "-50% 0%",   td: "rightward" },
  out:       { se: "-50% 0%",   te: "50% 0%",    td: "leftward"  },
};

function buildCyStyles(currentTheme: Theme): StylesheetJsonBlock[] {
  const dirSelectors: StylesheetJsonBlock[] = (Object.entries(DIR_ENDPOINTS) as [RelationDir, typeof DIR_ENDPOINTS[RelationDir]][]).map(
    ([dir, { se, te, td }]) => ({
      selector: `edge[dir='${dir}']`,
      style: {
        "source-endpoint": se,
        "target-endpoint": te,
        "taxi-direction": td,
      } as AnyObj,
    }),
  );

  return [
    {
      selector: "core",
      style: {
        "background-color": currentTheme.editorBg,
        "active-bg-color": currentTheme.editorBg,
      },
    },
    {
      selector: "node",
      style: {
        label: "data(label)",
        color: currentTheme.foreground,
        "font-family": currentTheme.fontFamily,
        "font-size": 12,
        "text-events": "yes",
        "text-valign": "center",
        "text-halign": "center",
        "text-wrap": "wrap",
        "text-max-width": "140",
        shape: "rectangle",
        "background-color": currentTheme.widgetBg,
        "border-color": currentTheme.widgetBorder,
        "border-width": 1,
        width: "label",
        height: "label",
        padding: "8",
        "background-opacity": 1,
        "border-opacity": 1,
        "text-background-color": currentTheme.widgetBg,
        "text-background-opacity": 0,
        "text-background-shape": "roundrectangle",
        "text-border-color": currentTheme.widgetBorder,
        "text-border-width": 0,
        "text-border-opacity": 0,
        "text-margin-y": 0,
        "text-background-padding": "0",
      },
    },
    {
      selector: "node[?isDoor]",
      style: {
        shape: "diamond",
        width: 20,
        height: 20,
        "background-color": currentTheme.warning,
        "background-opacity": 0.85,
        "border-color": currentTheme.warning,
        "border-width": 1,
        "border-opacity": 1,
        "font-size": 10,
        "text-margin-y": -16,
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": currentTheme.link,
        "line-style": "dashed",
        "line-dash-pattern": [8, 6],
        "line-cap": "butt",
        opacity: 0.65,
        "curve-style": "taxi",
        "taxi-direction": "auto",
        "taxi-turn": "50%",
      },
    },
    {
      selector: ":selected",
      style: {
        "border-color": currentTheme.warning,
        "border-width": 3,
        "text-border-color": currentTheme.warning,
        "text-border-width": 2,
      },
    },
    ...dirSelectors,
  ];
}

function ensureCy() {
  if (cy) return;

  cy = cytoscape({
    container,
    elements: [],
    style: buildCyStyles(theme),
    wheelSensitivity: 0.15,
    minZoom: 0.05,
    maxZoom: 5,
    selectionType: "single",
    autoungrabify: false,
    autounselectify: false,
    userPanningEnabled: true,
    userZoomingEnabled: true,
  });

  cy.on("tap", "node", (evt) => {
    const data = evt.target?.data?.();
    const name = data?.name;
    if (typeof name === "string" && name) {
      messenger.postCommand("select", name);
    }
  });

  // If the webview is still laying out, Cytoscape can initialize with a 0-sized container.
  // Force a resize + render on the next frame to avoid "blobs" until first interaction.
  requestAnimationFrame(() => {
    resizeGraph();
    (cy as AnyObj)?.forceRender?.();
  });
}

function applyThemeToGraph() {
  theme = readTheme();
  ensureCy();
  if (!cy) return;
  cy.style().fromJson(buildCyStyles(theme)).update();
  (cy as AnyObj)?.forceRender?.();
}

function isDoor(obj: AnyObj) {
  const detail: unknown = obj?.detail;
  if (typeof detail !== "string") return false;
  return /Door|Passage|Stairway/.test(detail);
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
  } catch (err) {
    messenger.postCommand("log", "error during roomSelector clear: " + err);
  }
}

type RelationDir =
  | "north"
  | "northeast"
  | "east"
  | "southeast"
  | "south"
  | "southwest"
  | "west"
  | "northwest"
  | "up"
  | "down"
  | "in"
  | "out";

const relationDirs: RelationDir[] = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
  "up",
  "down",
  "in",
  "out",
];

function computePresetPositions(objects: AnyObj[]) {
  // Only consider objects that were actually placed by the server's BFS crawl.
  const mapped = objects.filter((o) => o?.isMapped === true);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  let anyFinite = false;
  for (const o of mapped) {
    const x = Number(o?.x ?? NaN);
    const y = Number(o?.y ?? NaN);
    if (!isFinite(x) || !isFinite(y)) continue;
    anyFinite = true;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  if (!anyFinite) {
    return { ok: false as const, positions: new Map<string, { x: number; y: number }>() };
  }

  // Trust server-assigned grid coordinates unconditionally.
  const SPACING = 150;
  const LEVEL_SPACING = 300;
  const positions = new Map<string, { x: number; y: number }>();
  for (const o of mapped) {
    const name: unknown = o?.name;
    if (typeof name !== "string" || !name) continue;
    const x = Number(o?.x ?? 0);
    const y = Number(o?.y ?? 0);
    const z = Number(o?.z ?? 0);
    if (!isFinite(x) || !isFinite(y)) continue;
    const zVal = isFinite(z) ? z : 0;
    positions.set(name, {
      x: x * SPACING,
      y: y * SPACING + zVal * LEVEL_SPACING,
    });
  }

  return { ok: true as const, positions };
}

function buildGraph(objects: AnyObj[]) {
  ensureCy();
  if (!cy) return;

  const elements: ElementDefinition[] = [];

  const { ok: usePreset, positions } = computePresetPositions(objects);

  for (const o of objects) {
    const name: unknown = o?.name;
    if (typeof name !== "string" || !name) continue;

    const pos = positions.get(name);
    elements.push({
      group: "nodes",
      data: { id: name, name, label: name, isDoor: isDoor(o) },
      selectable: true,
      grabbable: true,
      ...(usePreset && pos ? { position: pos } : {}),
    });
  }

  // Filter out nodes where either the source or target is missing
  const nodeIds = new Set(elements.map((e) => e.data.id));
  const seen = new Set<string>();
  for (const o of objects) {
    const fromName: unknown = o?.name;
    if (typeof fromName !== "string" || !fromName) continue;

    for (const dir of relationDirs) {
      const toName: unknown = o?.[dir];
      if (typeof toName !== "string" || !toName) continue;

      const a = fromName;
      const b = toName;

      if (!nodeIds.has(a) || !nodeIds.has(b)) {
        console.warn(`Skipping edge from ${a} to ${b} (dir: ${dir}) — missing node`);
        continue;
      }

      // Deduplicate by first-seen direction so the exit-side anchor is preserved.
      const fwdKey = `${a}→${b}`;
      const revKey = `${b}→${a}`;
      if (seen.has(fwdKey) || seen.has(revKey)) continue;
      seen.add(fwdKey);

      elements.push({
        group: "edges",
        data: { id: `edge:${fwdKey}`, source: a, target: b, dir },
      });
    }
  }

  // Hide nodes that have no edges
  const connectedNodeIds = new Set<string>();
  for (const el of elements) {
    if (el.group === "edges") {
      connectedNodeIds.add(el.data.source as string);
      connectedNodeIds.add(el.data.target as string);
    }
  }
  const visibleElements = elements.filter(
    (el) => el.group === "edges" || connectedNodeIds.has(el.data.id as string)
  );

  cy.batch(() => {
    cy?.elements().remove();
    cy?.add(visibleElements);
  });

  cy?.style().update();

  // Identify nodes with and without grid positions.
  const positionedNodes = cy.nodes().filter((n) => positions.has(n.id()));
  const unpositionedNodes = cy.nodes().filter((n) => !positions.has(n.id()));

  if (usePreset && positionedNodes.length > 0) {
    // Nodes already have positions set from the element definitions.
    // Run preset to finalize, then nudge only nodes that share an exact pixel
    // position (stacked rooms) — without running any force-directed simulation
    // that would scramble the semantically correct north/south/east/west layout.
    positionedNodes.layout({ name: "preset", fit: false, padding: 30, animate: false }).run();

    const byPos = new Map<string, ReturnType<typeof positionedNodes.toArray>[number][]>();
    positionedNodes.forEach((node) => {
      const p = node.position();
      const key = `${Math.round(p.x)},${Math.round(p.y)}`;
      if (!byPos.has(key)) byPos.set(key, []);
      byPos.get(key)!.push(node);
    });
    for (const group of byPos.values()) {
      if (group.length <= 1) continue;
      const radius = 50;
      group.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / group.length;
        const p = node.position();
        node.position({ x: p.x + Math.cos(angle) * radius, y: p.y + Math.sin(angle) * radius });
      });
    }
  } else if (!usePreset) {
    // No grid data — fall back to cose for connected nodes.
    const connectedIds = new Set<string>();
    for (const el of elements) {
      if (el.group === "edges") {
        connectedIds.add(el.data.source as string);
        connectedIds.add(el.data.target as string);
      }
    }
    const connectedNodes = cy.nodes().filter((n) => connectedIds.has(n.id()));
    if (connectedNodes.length > 0) {
      const subgraph = connectedNodes.union(connectedNodes.connectedEdges());
      subgraph.layout({
        name: "cose",
        fit: false,
        padding: 30,
        animate: false,
        randomize: true,
        nodeRepulsion: () => 8000,
        idealEdgeLength: () => 120,
        edgeElasticity: () => 100,
        gravity: 0.25,
        numIter: 1000,
      } as AnyObj).run();
    }
  }

  // Place unpositioned nodes in a grid below the positioned ones.
  if (unpositionedNodes.length > 0) {
    const positioned = usePreset ? positionedNodes : cy.nodes().filter((n) => !unpositionedNodes.contains(n));
    const bb = positioned.length > 0
      ? positioned.boundingBox({})
      : { x1: 0, y1: 0, x2: 0, y2: 0 };
    const startY = (bb as AnyObj).y2 + 150;
    const startX = (bb as AnyObj).x1;
    const cols = Math.max(1, Math.ceil(Math.sqrt(unpositionedNodes.length)));
    const spacing = 90;
    unpositionedNodes.forEach((node, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      node.position({ x: startX + col * spacing, y: startY + row * spacing });
    });
  }

  cy.fit(undefined, 30);
  (cy as AnyObj)?.forceRender?.();

  requestAnimationFrame(() => {
    cy?.fit(undefined, 30);
    (cy as AnyObj)?.forceRender?.();
  });
}

function resizeGraph() {
  if (!cy) return;
  cy.resize();
  (cy as AnyObj)?.forceRender?.();
}

function updateRoomSelector(objects: AnyObj[]) {
  clearRoomSelector();
  if (!dom.roomSelector) return;

  const sortedNames: string[] = objects
    .filter((x: AnyObj) => !isDoor(x))
    .map((x: AnyObj) => x.name)
    .filter((x: AnyObj) => typeof x === "string")
    .sort((a: string, b: string) => a.localeCompare(b));

  for (const name of sortedNames) {
    const optionNode = document.createElement("option");
    optionNode.value = name ?? "err";
    optionNode.innerHTML = name ?? "err";
    if (currentStartRoom === name) {
      optionNode.selected = true;
    }
    dom.roomSelector.appendChild(optionNode);
  }
}

function refresh(payload: unknown) {
  try {
    applyThemeToGraph();

    const p = payload as AnyObj;
    if (p?.command !== "tads3.addNode") return;
    const objects: AnyObj[] | undefined = p?.objects;
    if (!Array.isArray(objects)) return;

    // Keep existing selector UX intact.
    updateRoomSelector(objects);
    buildGraph(objects);
  } catch (error) {
    console.error(error);
    messenger.postCommand("log", `Error during addnode:  ${error}`);
  }
}

bindDomEvents(dom, {
  onRefreshClick: () => messenger.postCommand("refresh", undefined),
  onResetClick: () => {
    messenger.postCommand("reset", undefined);
    cy?.fit(undefined, 30);
  },
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

ensureCy();
applyThemeToGraph();
window.addEventListener("resize", () => resizeGraph());
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(() => resizeGraph()).observe(container);
}

export {};
