/* eslint-disable no-debugger */
/* eslint-disable no-mixed-spaces-and-tabs */

// This runs inside a VS Code webview (browser context).
// It's compiled to `resources/maprenderer/maprenderer.js` via `npm run build:maprenderer`.

import { bindDomEvents, getDomRefs, initializeDom } from "./dom";
import { createMessenger } from "./messaging";

import cytoscape, { type Core, type ElementDefinition, type StylesheetCSS } from "cytoscape";

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
  cy.zoom({
    level: next,
    renderedPosition: { x: container.clientWidth / 2, y: container.clientHeight / 2 },
  });
}

(window as AnyObj).zoomIn = () => zoomBy(1.15);
(window as AnyObj).zoomOut = () => zoomBy(1 / 1.15);

function buildCyStyles(currentTheme: Theme): Stylesheet[] {
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
        "text-max-width": 140,
        "background-color": currentTheme.widgetBg,
        "border-color": currentTheme.widgetBorder,
        "border-width": 1,
        width: 32,
        height: 32,
        "text-background-color": currentTheme.widgetBg,
        "text-background-opacity": 1,
        "text-background-shape": "roundrectangle",
        "text-border-color": currentTheme.widgetBorder,
        "text-border-width": 1,
        "text-border-opacity": 1,
        "text-margin-y": -18,
        "text-background-padding": 6,
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
        "curve-style": "straight",
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
  | "south"
  | "west"
  | "east"
  | "northwest"
  | "southeast"
  | "northeast"
  | "southwest"
  | "up"
  | "down"
  | "in"
  | "out";

const relationDirs: RelationDir[] = [
  "north",
  "south",
  "west",
  "east",
  "northwest",
  "southeast",
  "northeast",
  "southwest",
  "up",
  "down",
  "in",
  "out",
];

function computePresetPositions(objects: AnyObj[]) {
  // Use project-provided coordinates if they look non-trivial; otherwise fall back to an automatic layout.
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  let anyFinite = false;
  for (const o of objects) {
    const x = Number(o?.x ?? NaN);
    const y = Number(o?.y ?? NaN);
    const z = Number(o?.z ?? NaN);
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;
    anyFinite = true;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  if (!anyFinite) {
    return { ok: false as const, positions: new Map<string, { x: number; y: number }>() };
  }

  const dx = maxX - minX;
  const dy = maxY - minY;
  const dz = maxZ - minZ;
  const looksTrivial = dx === 0 && dy === 0 && dz === 0;
  if (looksTrivial) {
    return { ok: false as const, positions: new Map<string, { x: number; y: number }>() };
  }

  const cx = (minX + maxX) / 2;
  const cy0 = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;

  const SPACING = 80;
  const LEVEL_SPACING = 140;
  const positions = new Map<string, { x: number; y: number }>();
  for (const o of objects) {
    const name: unknown = o?.name;
    if (typeof name !== "string" || !name) continue;
    const x = Number(o?.x ?? 0);
    const y = Number(o?.y ?? 0);
    const z = Number(o?.z ?? 0);
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;
    positions.set(name, {
      x: (x - cx) * SPACING,
      y: (y - cy0) * SPACING + (z - cz) * LEVEL_SPACING,
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

  const seen = new Set<string>();
  for (const o of objects) {
    const fromName: unknown = o?.name;
    if (typeof fromName !== "string" || !fromName) continue;

    for (const dir of relationDirs) {
      const toName: unknown = o?.[dir];
      if (typeof toName !== "string" || !toName) continue;

      const a = fromName;
      const b = toName;
      const key = a < b ? `${a}→${b}` : `${b}→${a}`;
      if (seen.has(key)) continue;
      seen.add(key);

      elements.push({
        group: "edges",
        data: { id: `edge:${key}`, source: a, target: b },
      });
    }
  }

  cy.batch(() => {
    cy.elements().remove();
    cy.add(elements);
  });

  // Ensure style is applied before layout so edges render correctly immediately.
  cy.style().update();

  const layout = usePreset
    ? cy.layout({ name: "preset", fit: true, padding: 30, animate: false })
    : cy.layout({ name: "cose", fit: true, padding: 30, animate: false });

  // Attach listeners before running; otherwise the event can be missed
  // (and the viewport won't be fit, leaving a blank view).
  layout.on("layoutstop", () => {
    cy.fit(undefined, 30);
    (cy as AnyObj)?.forceRender?.();
  });

  layout.run();

  // Layouts can finish synchronously for small graphs; always do a fallback fit.
  requestAnimationFrame(() => {
    cy.fit(undefined, 30);
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
