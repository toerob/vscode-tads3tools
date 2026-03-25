// This runs inside a VS Code webview (browser context).
// It's compiled to `resources/maprenderer/maprenderer.js` via `npm run build:maprenderer`.

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  Handle,
  Panel,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
  NodeMouseHandler,
  BackgroundVariant,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { bindDomEvents, getDomRefs, initializeDom } from "./dom";
import { createMessenger } from "./messaging";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;

// ── Theming ────────────────────────────────────────────────────────────────────

function cssVar(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function readTheme() {
  return {
    fontFamily:  cssVar("--vscode-font-family",                         "sans-serif"),
    canvas:      cssVar("--vscode-editor-background",                   "#1e1e1e"),
    nodeBg:      cssVar("--vscode-editorWidget-background",             "#252526"),
    nodeText:    cssVar("--vscode-foreground",                          "#cccccc"),
    nodeBorder:  cssVar("--vscode-widget-border",                       "#454545"),
    nodeWarning: cssVar("--vscode-list-warningForeground",              "#cca700"),
    edgeColor:   cssVar("--vscode-textLink-foreground",                 "#3794ff"),
    edgeLabel:   cssVar("--vscode-descriptionForeground",               "#999999"),
    gridLine:    cssVar("--vscode-editorIndentGuide-background",        "#404040"),
  };
}

// ── Directional handles ────────────────────────────────────────────────────────
//
// Each room node exposes 8 handles — one per cardinal/intercardinal direction.
// `pos` tells React Flow which side of the node the handle is on (used for
// edge routing). `style` pins the handle to the correct spot along that side.

type HandleConfig = { pos: Position; style: React.CSSProperties };

const HANDLE_CONFIG: Record<string, HandleConfig> = {
  north:     { pos: Position.Top,    style: { left: "50%",  top:    0 } },
  south:     { pos: Position.Bottom, style: { left: "50%",  bottom: 0 } },
  east:      { pos: Position.Right,  style: { top:  "50%",  right:  0 } },
  west:      { pos: Position.Left,   style: { top:  "50%",  left:   0 } },
  northeast: { pos: Position.Top,    style: { left: "100%", top:    0 } },
  northwest: { pos: Position.Top,    style: { left: "0%",   top:    0 } },
  southeast: { pos: Position.Bottom, style: { left: "100%", bottom: 0 } },
  southwest: { pos: Position.Bottom, style: { left: "0%",   bottom: 0 } },
};

// Return exit from source → which handle the edge should enter on the target.
const OPPOSITE: Record<string, string> = {
  north: "south", south: "north",
  east: "west",   west: "east",
  northeast: "southwest", southwest: "northeast",
  northwest: "southeast", southeast: "northwest",
  up: "down",     down: "up",
  in: "out",      out: "in",
};

// ── Door icon ─────────────────────────────────────────────────────────────────

function DoorIcon({ color }: { color: string }) {
  return (
    <svg
      width="10" height="13"
      viewBox="0 0 10 13"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px", flexShrink: 0 }}
    >
      {/* half-circle arch above the door */}
      <path d="M1,6 A4,4 0 0,1 9,6" fill={color} />
      {/* door rectangle */}
      <rect x="1" y="6" width="8" height="6" fill={color} />
    </svg>
  );
}

// ── Custom node component ──────────────────────────────────────────────────────

function RoomNode({ data }: NodeProps) {
  const theme = readTheme();
  const isDoor = !!(data as AnyObj).isDoor;
  const usedSet = new Set<string>((data as AnyObj).usedHandles ?? []);

  const handleStyle: React.CSSProperties = {
    width: 7,
    height: 7,
    background: isDoor ? theme.nodeWarning : theme.nodeBorder,
    border: `1px solid ${isDoor ? theme.nodeWarning : theme.edgeColor}`,
    borderRadius: "50%",
    minWidth: "unset",
    minHeight: "unset",
  };

  return (
    <div
      style={{
        background: theme.nodeBg,
        color: isDoor ? theme.nodeWarning : theme.nodeText,
        border: `1px solid ${isDoor ? theme.nodeWarning : theme.nodeBorder}`,
        borderRadius: "4px",
        padding: "8px 14px",
        fontFamily: theme.fontFamily,
        minWidth: "110px",
        textAlign: "center",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {Object.entries(HANDLE_CONFIG).map(([dir, cfg]) => {
        const srcUsed = usedSet.has(dir);
        const tgtUsed = usedSet.has(`${dir}-in`);
        const visible = srcUsed || tgtUsed;
        return (
          <React.Fragment key={dir}>
            <Handle
              id={dir}
              type="source"
              position={cfg.pos}
              style={{ ...handleStyle, ...cfg.style, opacity: visible ? 1 : 0 }}
            />
            <Handle
              id={`${dir}-in`}
              type="target"
              position={cfg.pos}
              style={{ ...handleStyle, ...cfg.style, opacity: 0, pointerEvents: "none" }}
            />
          </React.Fragment>
        );
      })}
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: isDoor ? "8px" : "12px" }}>
        {isDoor && <DoorIcon color={theme.nodeWarning} />}
        {data.label as string}
      </span>
    </div>
  );
}

// Defined at module level so React Flow never sees it as a new object reference.
const nodeTypes = { room: RoomNode };

// ── Directions ─────────────────────────────────────────────────────────────────

const DIRS = [
  "north", "northeast", "east", "southeast",
  "south", "southwest", "west", "northwest",
  "up", "down", "in", "out",
] as const;

function isDoorObj(obj: AnyObj): boolean {
  return typeof obj?.detail === "string" && /Door|Passage|Stairway/.test(obj.detail);
}

// ── Build graph ────────────────────────────────────────────────────────────────

const SPACING_X = 175;
const SPACING_Y = 175;

// Pixel offset from an anchor room's top-left to place a door node.
// H accounts for node width (~110px) + gap; V accounts for node height (~36px) + gap.
const DOOR_H = 140;
const DOOR_V = 70;

const DIR_OFFSETS: Record<string, [number, number]> = {
  north:     [0,        -DOOR_V],
  south:     [0,         DOOR_V],
  east:      [DOOR_H,        0],
  west:      [-DOOR_H,       0],
  northeast: [DOOR_H,   -DOOR_V],
  northwest: [-DOOR_H,  -DOOR_V],
  southeast: [DOOR_H,    DOOR_V],
  southwest: [-DOOR_H,   DOOR_V],
  up:        [0,        -DOOR_V],
  down:      [0,         DOOR_V],
  in:        [DOOR_H,        0],
  out:       [-DOOR_H,       0],
};

function buildGraph(objects: AnyObj[]): { nodes: Node[]; edges: Edge[] } {
  const theme = readTheme();
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seen = new Set<string>();

  // Track which directional handles are actually used per node.
  const usedHandles = new Map<string, Set<string>>();

  // Quick name → object lookup.
  const objByName = new Map<string, AnyObj>();
  for (const obj of objects) {
    if (obj?.name) objByName.set(obj.name, obj);
  }

  // Find the first room that connects to each door, and in what direction.
  const doorAnchor = new Map<string, { fromName: string; dir: string }>();
  for (const obj of objects) {
    const fromName: string = obj?.name;
    if (!fromName || isDoorObj(obj)) continue;
    for (const dir of DIRS) {
      const to: string | undefined = obj?.[dir];
      if (to && !doorAnchor.has(to) && isDoorObj(objByName.get(to))) {
        doorAnchor.set(to, { fromName, dir });
      }
    }
  }

  // First pass: room nodes at their grid positions.
  const nodePositions = new Map<string, { x: number; y: number }>();
  for (const obj of objects) {
    const name: string = obj?.name;
    if (!name || isDoorObj(obj)) continue;
    const x = (obj.x ?? 0) * SPACING_X + 50;
    const y = (obj.y ?? 0) * SPACING_Y + 50;
    nodePositions.set(name, { x, y });
    nodes.push({ id: name, type: "room", position: { x, y }, data: { label: name, isDoor: false, usedHandles: [] as string[] } });
    usedHandles.set(name, new Set());
  }

  // Second pass: door nodes adjacent to their anchor room.
  for (const obj of objects) {
    const name: string = obj?.name;
    if (!name || !isDoorObj(obj)) continue;
    let x: number, y: number;
    const anchor = doorAnchor.get(name);
    if (anchor && nodePositions.has(anchor.fromName)) {
      const rp = nodePositions.get(anchor.fromName)!;
      const [dx, dy] = DIR_OFFSETS[anchor.dir] ?? [0, DOOR_V];
      x = rp.x + dx;
      y = rp.y + dy;
    } else {
      x = (obj.x ?? 0) * SPACING_X + 50;
      y = (obj.y ?? 0) * SPACING_Y + 50;
    }
    nodes.push({ id: name, type: "room", position: { x, y }, data: { label: name, isDoor: true, usedHandles: [] as string[] } });
    usedHandles.set(name, new Set());
  }

  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const obj of objects) {
    const from: string = obj?.name;
    if (!from || !nodeIds.has(from)) continue;

    for (const dir of DIRS) {
      const to: string | undefined = obj?.[dir];
      if (!to || !nodeIds.has(to)) continue;

      const fwd = `${from}→${to}`;
      const rev = `${to}→${from}`;
      if (seen.has(fwd) || seen.has(rev)) continue;
      seen.add(fwd);

      // Only wire to a named handle if it exists in HANDLE_CONFIG;
      // up/down/in/out fall back to automatic boundary routing.
      const srcHandle = dir in HANDLE_CONFIG ? dir : undefined;
      const tgtHandle = OPPOSITE[dir] in HANDLE_CONFIG ? `${OPPOSITE[dir]}-in` : undefined;

      if (srcHandle) usedHandles.get(from)?.add(srcHandle);
      if (tgtHandle) usedHandles.get(to)?.add(tgtHandle);

      edges.push({
        id: `e:${fwd}`,
        source: from,
        target: to,
        sourceHandle: srcHandle,
        targetHandle: tgtHandle,
        label: dir[0].toUpperCase(), // Abbreviate direction to a single letter for the edge label.
        style: { stroke: theme.edgeColor, strokeWidth: 1.5 },
        labelStyle: {
          fill: theme.edgeLabel,
          fontSize: 10,
          fontFamily: theme.fontFamily,
        },
        labelBgStyle: { fill: theme.canvas, fillOpacity: 0.75 },
      });
    }
  }

  // Stamp usedHandles into each node's data.
  for (const node of nodes) {
    (node.data as AnyObj).usedHandles = [...(usedHandles.get(node.id) ?? [])];
  }

  return { nodes, edges };
}

// ── DOM + messaging ────────────────────────────────────────────────────────────

const messenger = createMessenger();
const dom = getDomRefs();
initializeDom(dom);

let allObjects: AnyObj[] = [];
let onObjects: ((objects: AnyObj[]) => void) | null = null;
let onLevelChange: ((delta: number) => void) | null = null;

// Expose level controls as globals for the inline onclick handlers in the HTML.
(window as AnyObj).levelUp   = () => onLevelChange?.(1);
(window as AnyObj).levelDown = () => onLevelChange?.(-1);

function updateRoomSelector(objects: AnyObj[]) {
  if (!dom.roomSelector) return;
  const sel = dom.roomSelector;
  while (sel.options.length) sel.remove(0);
  const names = objects
    .filter((o) => !isDoorObj(o))
    .map((o) => o.name as string)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  for (const name of names) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  }
}

bindDomEvents(dom, {
  onRefreshClick:  () => messenger.postCommand("refresh", undefined),
  onResetClick:    () => messenger.postCommand("reset", undefined),
  onRoomChange:    (v) => messenger.postCommand("changestartroom", v),
  onEditorChange:  (v) => messenger.postCommand("editor", v),
  onWindowMessage: (data) => {
    const payload = data as AnyObj;
    if (payload?.command === "tads3.addNode" && Array.isArray(payload?.objects)) {
      updateRoomSelector(payload.objects);
      onObjects?.(payload.objects);
    }
  },
});

// ── Export ─────────────────────────────────────────────────────────────────────
//
// Build a plain SVG from graph data — no DOM serialisation, no CSS inlining,
// no freezes. PNG is derived by rendering that SVG onto a canvas.

const EXPORT_PAD = 48;
const NODE_W = 120;
const NODE_H = 36;

// Cardinal/intercardinal handle positions as fractions of (w, h).
const HANDLE_FRAC: Record<string, [number, number]> = {
  north:     [0.5, 0],   south:     [0.5, 1],
  east:      [1,   0.5], west:      [0,   0.5],
  northeast: [1,   0],   northwest: [0,   0],
  southeast: [1,   1],   southwest: [0,   1],
};

function buildExportSvg(nodes: Node[], edges: Edge[], theme: ReturnType<typeof readTheme>): string {
  const PAD = EXPORT_PAD;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const w = (n as AnyObj).measured?.width  ?? NODE_W;
    const h = (n as AnyObj).measured?.height ?? NODE_H;
    minX = Math.min(minX, n.position.x);
    minY = Math.min(minY, n.position.y);
    maxX = Math.max(maxX, n.position.x + w);
    maxY = Math.max(maxY, n.position.y + h);
  }

  const W = maxX - minX + PAD * 2;
  const H = maxY - minY + PAD * 2;
  const ox = -minX + PAD;
  const oy = -minY + PAD;

  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  function handleXY(node: Node, handleId: string | undefined | null): [number, number] {
    const w = (node as AnyObj).measured?.width  ?? NODE_W;
    const h = (node as AnyObj).measured?.height ?? NODE_H;
    const cx = node.position.x + ox + w / 2;
    const cy = node.position.y + oy + h / 2;
    if (handleId && handleId in HANDLE_FRAC) {
      const [fx, fy] = HANDLE_FRAC[handleId];
      return [node.position.x + ox + fx * w, node.position.y + oy + fy * h];
    }
    return [cx, cy];
  }

  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">\n`;
  out += `<rect width="100%" height="100%" fill="${theme.canvas}"/>\n`;

  // Edges
  for (const e of edges) {
    const src = nodeById.get(e.source);
    const tgt = nodeById.get(e.target);
    if (!src || !tgt) continue;
    // targetHandle has "-in" suffix — strip it for the position lookup
    const tgtHandleKey = typeof e.targetHandle === "string"
      ? e.targetHandle.replace(/-in$/, "") : undefined;
    const [x1, y1] = handleXY(src, e.sourceHandle as string | undefined);
    const [x2, y2] = handleXY(tgt, tgtHandleKey);
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${theme.edgeColor}" stroke-width="1.5"/>\n`;
    if (e.label) {
      const lx = ((x1 + x2) / 2).toFixed(1);
      const ly = ((y1 + y2) / 2 - 3).toFixed(1);
      out += `<text x="${lx}" y="${ly}" text-anchor="middle" fill="${theme.edgeLabel}" font-size="10" font-family="${theme.fontFamily}">${esc(String(e.label))}</text>\n`;
    }
  }

  // Nodes
  for (const n of nodes) {
    const w = (n as AnyObj).measured?.width  ?? NODE_W;
    const h = (n as AnyObj).measured?.height ?? NODE_H;
    const x = n.position.x + ox;
    const y = n.position.y + oy;
    const isDoor = !!(n.data as AnyObj).isDoor;
    const stroke = isDoor ? theme.nodeWarning : theme.nodeBorder;
    const fill   = theme.nodeBg;
    const color  = isDoor ? theme.nodeWarning : theme.nodeText;
    out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}"/>\n`;
    out += `<text x="${(x + w / 2).toFixed(1)}" y="${(y + h / 2 + 4).toFixed(1)}" text-anchor="middle" fill="${color}" font-size="12" font-family="${theme.fontFamily}">${esc(String(n.data.label))}</text>\n`;
  }

  out += "</svg>";
  return out;
}

function downloadSvg(svgText: string, filename: string) {
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadPng(svgText: string, filename: string) {
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width  = img.width  * 2; // 2× for retina
    canvas.height = img.height * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    const a = document.createElement("a");
    a.download = filename;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  img.src = url;
}

// Must be a child of <ReactFlow> so useReactFlow() has context.
function ExportPanel() {
  const { getNodes, getEdges } = useReactFlow();
  const theme = readTheme();

  function exportMap(format: "png" | "svg") {
    const nodes = getNodes();
    if (nodes.length === 0) return;
    const svgText = buildExportSvg(nodes, getEdges(), theme);
    if (format === "svg") downloadSvg(svgText, "map.svg");
    else                  downloadPng(svgText, "map.png");
  }

  const btnStyle: React.CSSProperties = {
    background: theme.nodeBg,
    color: theme.nodeText,
    border: `1px solid ${theme.nodeBorder}`,
    borderRadius: "3px",
    padding: "3px 8px",
    fontSize: "11px",
    fontFamily: theme.fontFamily,
    cursor: "pointer",
    marginLeft: "4px",
  };

  return (
    <Panel position="bottom-right">
      <button style={btnStyle} onClick={() => exportMap("png")}>Export PNG</button>
      <button style={btnStyle} onClick={() => exportMap("svg")}>Export SVG</button>
    </Panel>
  );
}

// ── React component ────────────────────────────────────────────────────────────

function MapApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [level, setLevel] = useState(0);
  const levelRef = useRef(0);

  // Wire the global level-change buttons.
  useEffect(() => {
    onLevelChange = (delta) => setLevel((prev) => prev + delta);
    return () => { onLevelChange = null; };
  }, []);

  // Rebuild graph when level changes.
  useEffect(() => {
    levelRef.current = level;
    if (dom.levelLabelRef) dom.levelLabelRef.textContent = String(level);
    if (allObjects.length > 0) {
      const filtered = allObjects.filter((o) => (o.z ?? 0) === level);
      const { nodes: n, edges: e } = buildGraph(filtered);
      setNodes(n);
      setEdges(e);
    }
  }, [level, setNodes, setEdges]);

  // Rebuild graph when new objects arrive (use current level via ref).
  useEffect(() => {
    onObjects = (objects: AnyObj[]) => {
      allObjects = objects;
      const filtered = objects.filter((o) => (o.z ?? 0) === levelRef.current);
      const { nodes: n, edges: e } = buildGraph(filtered);
      setNodes(n);
      setEdges(e);
    };
    return () => { onObjects = null; };
  }, [setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = (_, node) => {
    messenger.postCommand("select", node.id);
  };

  const theme = readTheme();

  return (
    <div style={{ width: "100%", height: "100%", background: theme.canvas }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color={theme.gridLine}
          gap={20}
          size={1}
        />
        <Controls />
        <ExportPanel />
      </ReactFlow>
    </div>
  );
}

// ── Mount ──────────────────────────────────────────────────────────────────────

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<MapApp />);
}

export {};
