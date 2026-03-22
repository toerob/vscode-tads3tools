/* eslint-disable no-debugger */
/* eslint-disable no-mixed-spaces-and-tabs */

// This runs inside a VS Code webview (browser context).
// It's compiled to `resources/maprenderer/maprenderer.js` via `npm run build:maprenderer`.

import { bindDomEvents, getDomRefs, initializeDom } from "./dom";
import { createMessenger } from "./messaging";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

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

// --- 3D renderer (Three.js) ---

const canvas = document.getElementById("mapCanvas") as HTMLCanvasElement | null;
if (!canvas) {
  throw new Error("Expected #mapCanvas to exist");
}

// Help TypeScript: after the runtime check, treat the canvas as non-null everywhere.
const canvasEl: HTMLCanvasElement = canvas;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true,
  alpha: false,
});

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100000);
const controls = new OrbitControls(camera, renderer.domElement);
// Render on-demand (no animation loop), so disable damping.
controls.enableDamping = false;
controls.minDistance = 20;
controls.maxDistance = 20000;

// On-demand rendering hook (assigned after render() is defined).
let requestRender: () => void = () => {};
let renderScheduled = false;

// Lighting for nicer-looking transparent cubes.
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);
const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
keyLight.position.set(1, 2, 1);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
fillLight.position.set(-1, 1, -1);
scene.add(fillLight);

// Subtle reference grid so the 3D space is never "empty".
const grid = new THREE.GridHelper(400, 80);
(grid.material as THREE.LineBasicMaterial).transparent = true;
(grid.material as THREE.LineBasicMaterial).opacity = 0.18;
scene.add(grid);

const roomsGroup = new THREE.Group();
scene.add(roomsGroup);

const relationsGroup = new THREE.Group();
scene.add(relationsGroup);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let currentStartRoom: string | undefined;
let selectedEditor = "0";
let lastMessage: unknown;

// These are referenced from inline onclick="..." handlers in the HTML.
// In the Three.js renderer we show the full 3D map, so these are no-ops.
(window as AnyObj).levelUp = () => {};
(window as AnyObj).levelDown = () => {};
(window as AnyObj).toggleCollapse = () => {};
(window as AnyObj).toggleShowAll = () => {};
(window as AnyObj).toggleShowUnmapped = () => {};

function zoomBy(factor: number) {
  // Move camera closer/farther from the orbit target.
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
  const len = dir.length();
  if (!isFinite(len) || len <= 0.0001) return;

  const nextLen = THREE.MathUtils.clamp(len * factor, controls.minDistance, controls.maxDistance);
  dir.setLength(nextLen);
  camera.position.copy(controls.target).add(dir);
  camera.updateProjectionMatrix();
  controls.update();
  requestRender();
}

(window as AnyObj).zoomIn = () => zoomBy(0.8);
(window as AnyObj).zoomOut = () => zoomBy(1.25);

function applyThemeToScene() {
  theme = readTheme();
  const bg = new THREE.Color(theme.editorBg);
  renderer.setClearColor(bg, 1);
  scene.background = bg;

  // Theme the grid to match VS Code.
  (grid.material as THREE.LineBasicMaterial).color = new THREE.Color(theme.widgetBorder);
}

function hashStringToHue(str: string): number {
  // Simple stable hash -> [0, 1)
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // >>> 0 ensures unsigned
  return ((h >>> 0) % 360) / 360;
}

// Keep colors sparse: use a single cube color for all rooms.
function cubeColor(): THREE.Color {
  return new THREE.Color(theme.widgetBg);
}

const lineMaterials = new Set<LineMaterial>();

function registerLineMaterial(material: LineMaterial) {
  lineMaterials.add(material);
}

function updateLineMaterialResolutions(width: number, height: number) {
  for (const mat of lineMaterials) {
    mat.resolution.set(width, height);
  }
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

function disposeGroup(group: THREE.Group) {
  const toDispose: THREE.Object3D[] = [];
  group.traverse((obj: THREE.Object3D) => toDispose.push(obj));
  for (const obj of toDispose) {
    const mesh = obj as AnyObj;
    if (mesh.geometry?.dispose) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        for (const m of mesh.material) m?.dispose?.();
      } else {
        // SpriteMaterial/standard materials can hold textures that also need disposing.
        if (mesh.material.map?.dispose) mesh.material.map.dispose();
        mesh.material?.dispose?.();
      }
    }
  }
  group.clear();
}

function createLabelSprite(text: string, color: string, background: string, border: string) {
  const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
  const fontSizePx = 14;
  const paddingX = 12;
  const paddingY = 7;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;

  ctx.font = `${fontSizePx}px ${theme.fontFamily}`;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const width = Math.min(512, textWidth + paddingX * 2);
  const height = fontSizePx + paddingY * 2;

  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  // Background pill.
  ctx.fillStyle = background;
  ctx.strokeStyle = border;
  ctx.lineWidth = 3;

  // Rounded rect path.
  const r = 7;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(width - r, 0);
  ctx.quadraticCurveTo(width, 0, width, r);
  ctx.lineTo(width, height - r);
  ctx.quadraticCurveTo(width, height, width - r, height);
  ctx.lineTo(r, height);
  ctx.quadraticCurveTo(0, height, 0, height - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Text.
  ctx.font = `${fontSizePx}px ${theme.fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, paddingX, Math.floor(height / 2));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  // Ensure labels always draw above dashed paths.
  sprite.renderOrder = 20;
  sprite.frustumCulled = false;

  // World-units scaling: fixed height, width follows aspect ratio.
  const aspect = width / height;
  const worldHeight = 0.9;
  sprite.scale.set(worldHeight * aspect, worldHeight, 1);
  return sprite;
}

function resizeRendererToCanvas() {
  // In VS Code webviews it's common for `clientWidth/clientHeight` to temporarily be 0
  // depending on layout timing. Use the bounding rect as the primary signal.
  const rect = canvasEl.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width) || canvasEl.width);
  const height = Math.max(1, Math.floor(rect.height) || canvasEl.height);
  const currentSize = new THREE.Vector2();
  renderer.getSize(currentSize);
  if (currentSize.x === width && currentSize.y === height) return;

  // Keep CSS-driven layout intact; only update the drawing buffer.
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  updateLineMaterialResolutions(width, height);
}

function frameCameraToObjects() {
  roomsGroup.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(roomsGroup);
  if (!isFinite(box.min.x) || !isFinite(box.max.x)) return;

  const center = new THREE.Vector3();
  box.getCenter(center);

  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z, 1);

  const fov = (camera.fov * Math.PI) / 180;
  const distance = (maxDim / 2) / Math.tan(fov / 2);
  const offset = distance * 1.8;

  controls.target.copy(center);
  // Start from a top-down view (Y is up in our world).
  camera.position.set(center.x + 0.001, center.y + offset, center.z + 0.001);
  camera.near = Math.max(0.1, distance / 100);
  camera.far = Math.max(1000, distance * 20);
  camera.updateProjectionMatrix();
  controls.update();
  requestRender();
}

function updateCubeOpacityByDistance() {
  // No-op: rooms are rendered as flat markers (not volumetric cubes).
}

function createDashedEdges(geometry: THREE.BufferGeometry, color: THREE.Color) {
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const posAttr = edgesGeometry.getAttribute("position") as THREE.BufferAttribute;
  const positions = Array.from(posAttr.array as Iterable<number>);

  const lineGeom = new LineSegmentsGeometry();
  lineGeom.setPositions(positions);

  const mat = new LineMaterial({
    color,
    linewidth: 2.5,
    transparent: true,
    opacity: 0.9,
    dashed: true,
    dashSize: 0.45,
    gapSize: 0.25,
    depthTest: false,
    depthWrite: false,
  });
  registerLineMaterial(mat);

  const lines = new LineSegments2(lineGeom, mat);
  lines.computeLineDistances();
  lines.renderOrder = 5;
  lines.frustumCulled = false;
  return lines;
}

function createRoomCube(room: AnyObj) {
  const name: string = room?.name ?? "";

  const color = cubeColor();
  const markerGroup = new THREE.Group();
  markerGroup.userData = { name };

  // Flat square marker (top-down view friendly).
  const geometry = new THREE.PlaneGeometry(1.0, 1.0);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.0,
    colorWrite: false,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const square = new THREE.Mesh(geometry, material);
  square.rotation.x = -Math.PI / 2;
  square.userData = { name };
  markerGroup.add(square);

  // Marker pill styled from theme widget colors.

/*
    fontFamily: cssVar("--vscode-font-family", "sans-serif"),
    foreground: cssVar("--vscode-editor-foreground", "#cccccc"),
    editorBg: cssVar("--vscode-editor-background", "#1e1e1e"),
    widgetBg: cssVar("--vscode-editorWidget-background", "#252526"),
    widgetBorder: cssVar("--vscode-editorWidget-border", "#454545"),
    link: cssVar("--vscode-textLink-foreground", "#3794ff"),
    warning: cssVar("--vscode-editorWarning-foreground", "#cca700"),
*/
  // TODO: ayudark orange Color theme name:
  // vscode-editorWarning-foreground: #cca700


  const label = createLabelSprite(name, theme.foreground, theme.widgetBg, theme.warning);
  //const label = createLabelSprite(name, theme.foreground, theme.widgetBg, theme.foreground);
  if (label) {
    label.position.set(0, 0.9, 0);
    label.userData = { name };
    markerGroup.add(label);
  }

  return markerGroup;
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

function buildRelations(objects: AnyObj[], cubeByName: Map<string, THREE.Object3D>) {
  disposeGroup(relationsGroup);

  const seen = new Set<string>();

  const relationColor = new THREE.Color(theme.link);


  const lineLift = 0.75; // lift above cube centers so segments don't get hidden inside geometry
  const endpointInset = 1.15; // pull endpoints slightly toward segment interior

  for (const o of objects) {
    const fromName: string | undefined = o?.name;
    if (!fromName) continue;

    for (const dir of relationDirs) {
      const toName: unknown = o?.[dir];
      if (typeof toName !== "string" || !toName) continue;

      const a = fromName;
      const b = toName;
      const key = a < b ? `${a}→${b}` : `${b}→${a}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const fromCube = cubeByName.get(fromName);
      const toCube = cubeByName.get(toName);
      if (!fromCube || !toCube) {
        continue;
      }

      const start = new THREE.Vector3();
      const end = new THREE.Vector3();
      fromCube.getWorldPosition(start);
      toCube.getWorldPosition(end);

      // Lift the segment a bit and keep it from running through cube centers.
      const dirVec = new THREE.Vector3().subVectors(end, start);
      const len = dirVec.length();
      if (!isFinite(len) || len < 0.0001) continue;
      const dirN = dirVec.clone().multiplyScalar(1 / len);
      start.addScaledVector(dirN, endpointInset);
      end.addScaledVector(dirN, -endpointInset);
      start.y += lineLift;
      end.y += lineLift;

      const geom = new LineGeometry();
      geom.setPositions([start.x, start.y, start.z, end.x, end.y, end.z]);

      //const relationColor = new THREE.Color(blue);

      // Use dashed lines for all connections 
      const mat = new LineMaterial({
        color:   relationColor,
        linewidth: 3.5,
        transparent: true,
        opacity: 0.65,
        dashed: true,
        dashSize: 1.0,
        gapSize: 0.55,
        depthTest: false,
        depthWrite: false,
      });
      registerLineMaterial(mat);

      const line = new Line2(geom, mat);
      line.renderOrder = 10;
      line.frustumCulled = false;
      line.computeLineDistances();
      relationsGroup.add(line);
    }
  }
}

function buildRoomScene(objects: AnyObj[]) {
  disposeGroup(roomsGroup);

  // New scene content means old line materials are stale.
  lineMaterials.clear();

  // Normalize coordinates into a visible spacing, and keep z as actual height.
  // If the incoming coordinates are already absolute, we still space them lightly.
  const SPACING = 5;

  // Centering: compute bounds in source coords first.
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (const o of objects) {
    const x = Number(o?.x ?? 0);
    const y = Number(o?.y ?? 0);
    const z = Number(o?.z ?? 0);
    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  const cx = isFinite(minX) && isFinite(maxX) ? (minX + maxX) / 2 : 0;
  const cy = isFinite(minY) && isFinite(maxY) ? (minY + maxY) / 2 : 0;
  const cz = isFinite(minZ) && isFinite(maxZ) ? (minZ + maxZ) / 2 : 0;

  const cubeByName = new Map<string, THREE.Object3D>();
  for (const o of objects) {
    const name: string | undefined = o?.name;
    if (!name) continue;

    const cube = createRoomCube(o);
    const x = Number(o?.x ?? 0);
    const y = Number(o?.y ?? 0);
    const z = Number(o?.z ?? 0);

    // Put Y “up” for a typical 3D view (z-level becomes height).
    cube.position.set((x - cx) * SPACING, (z - cz) * SPACING, (y - cy) * SPACING);
    cube.scale.setScalar(1.45);
    roomsGroup.add(cube);
    cubeByName.set(name, cube);
  }

  roomsGroup.updateWorldMatrix(true, true);
  relationsGroup.updateWorldMatrix(true, true);
  buildRelations(objects, cubeByName);
  frameCameraToObjects();
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
    applyThemeToScene();

    const p = payload as AnyObj;
    if (p?.command !== "tads3.addNode") return;
    const objects: AnyObj[] | undefined = p?.objects;
    if (!Array.isArray(objects)) return;

    // Keep existing selector UX intact.
    updateRoomSelector(objects);
    buildRoomScene(objects);

    requestRender();
  } catch (error) {
    console.error(error);
    messenger.postCommand("log", `Error during addnode:  ${error}`);
  }
}

function onCanvasPointerDown(event: PointerEvent) {
  // Only treat primary button clicks as selection.
  if (event.button !== 0) return;

  const rect = canvasEl.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  pointer.set(x, y);

  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(roomsGroup.children, true);
  const hit = hits[0];
  const name = hit?.object?.userData?.name;
  if (typeof name === "string" && name) {
    messenger.postCommand("select", name);
  }
}

canvasEl.addEventListener("pointerdown", onCanvasPointerDown);

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

function render() {
  resizeRendererToCanvas();
  controls.update();
  renderer.render(scene, camera);
}

requestRender = () => {
  if (renderScheduled) return;
  renderScheduled = true;
  requestAnimationFrame(() => {
    renderScheduled = false;
    render();
  });
};

controls.addEventListener("change", () => requestRender());
window.addEventListener("resize", () => requestRender());
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(() => requestRender()).observe(canvasEl);
}

applyThemeToScene();
camera.position.set(0, 250, 0.001);
controls.target.set(0, 0, 0);
controls.update();
requestRender();

export {};
