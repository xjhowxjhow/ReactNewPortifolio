import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const COLOR = {
  cyan: new THREE.Color(0x4fd8eb),
  blue: new THREE.Color(0x4c7dff),
  violet: new THREE.Color(0xa78bfa),
  slab: new THREE.Color(0x16243a),
  amber: new THREE.Color(0xf2c46d),
  green: new THREE.Color(0x5fd39a),
  azure: new THREE.Color(0x2f8cff),
  dbx: new THREE.Color(0xff5a36),
  coral: new THREE.Color(0xff6b5a),
  idle: new THREE.Color(0x4a5a6e),
};
const CSS = {
  cyan: '#4fd8eb',
  blue: '#7ea4ff',
  violet: '#b4a2ff',
  amber: '#f2c46d',
  green: '#5fd39a',
  azure: '#5aa9ff',
  dbx: '#ff7a5c',
  datadog: '#a27be6',
};

const LAYER_Y = [0, 0.9, 1.8, 2.7];
const LAYER_COLORS = [COLOR.cyan, COLOR.blue, COLOR.cyan, COLOR.violet];

// Which element groups are emphasised in each narrative stage (-1 = overview, 'all' = whole platform).
const STAGE_FOCUS = {
  '-1': null,
  0: ['sources', 'flowsIn', 'layer0'],
  1: ['layer0', 'layer1', 'flowsCore'],
  2: ['layer1', 'layer2', 'flowsCore'],
  3: ['layer2', 'destinations', 'flowsOut'],
  4: 'all',
  5: ['layer3', 'agents', 'flowsAI'],
};

// Camera framing per stage: focus point in platform space, distance, elevation (rad) and platform yaw.
const STAGE_VIEW = {
  '-1': { focus: [0, 1.9, 0], dist: 20.5, elev: 0.15, rotY: -0.5 },
  0: { focus: [-3.55, 1.35, 1.0], dist: 8.6, elev: 0.2, rotY: 0.42 },
  1: { focus: [0, 1.3, 1.85], dist: 7.6, elev: 0.1, rotY: -0.16 },
  2: { focus: [2.75, 1.3, 1.3], dist: 6.2, elev: 0.18, rotY: -0.72 },
  3: { focus: [3.35, 1.85, 0.1], dist: 7.8, elev: 0.2, rotY: -0.95 },
  4: { focus: [0, 1.6, 0], dist: 14, elev: 0.26, rotY: -0.95 },
  5: { focus: [0.1, 4.55, 0], dist: 9.8, elev: 0.3, rotY: -0.35 },
};
const OVERVIEW_DIST = STAGE_VIEW['-1'].dist;

const frac = (x) => x - Math.floor(x);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function radialTexture(inner, outer, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, inner);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function bezier(a, b, mode = 'h') {
  const A = new THREE.Vector3(...a);
  const B = new THREE.Vector3(...b);
  const c1 = A.clone();
  const c2 = B.clone();
  if (mode === 'h') {
    const dx = (B.x - A.x) * 0.55;
    c1.x += dx;
    c2.x -= dx;
  } else {
    const dy = (B.y - A.y) * 0.55;
    c1.y += dy;
    c2.y -= dy;
  }
  return new THREE.CubicBezierCurve3(A, c1, c2, B);
}

// Dashboard painters for the observability stage (canvas 480×290, header already drawn).
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';
const SANS = '"Inter Variable", system-ui, sans-serif';

function drawSeries(g, time, color) {
  const x0 = 24;
  const x1 = 456;
  const y0 = 78;
  const y1 = 262;
  const N = 42;
  const pts = [];
  for (let i = 0; i < N; i += 1) {
    const s = i + time * 3;
    const v = 0.55 + 0.22 * Math.sin(s * 0.45) + 0.1 * Math.sin(s * 1.37) + 0.05 * Math.sin(s * 3.1);
    pts.push([x0 + ((x1 - x0) * i) / (N - 1), y1 - v * (y1 - y0)]);
  }
  const grad = g.createLinearGradient(0, y0, 0, y1);
  grad.addColorStop(0, hexA(color, 0.35));
  grad.addColorStop(1, hexA(color, 0));
  g.beginPath();
  g.moveTo(x0, y1);
  pts.forEach(([x, y]) => g.lineTo(x, y));
  g.lineTo(x1, y1);
  g.closePath();
  g.fillStyle = grad;
  g.fill();
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.strokeStyle = color;
  g.lineWidth = 3;
  g.stroke();
  g.setLineDash([8, 8]);
  g.strokeStyle = 'rgba(242,196,109,0.6)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(x0, y0 + 20);
  g.lineTo(x1, y0 + 20);
  g.stroke();
  g.setLineDash([]);
}

function drawBars(g, time, color) {
  const N = 22;
  const w = 432 / N;
  const step = Math.floor(time * 4);
  for (let i = 0; i < N; i += 1) {
    const s = i + step;
    const v = 0.22 + 0.55 * Math.abs(Math.sin(s * 0.7) * Math.cos(s * 0.23));
    const h = v * 170;
    g.fillStyle = v > 0.68 ? '#f2c46d' : color;
    g.fillRect(24 + i * w + 2, 262 - h, w - 5, h);
  }
  g.setLineDash([8, 8]);
  g.strokeStyle = 'rgba(242,196,109,0.7)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(24, 262 - 0.68 * 170);
  g.lineTo(456, 262 - 0.68 * 170);
  g.stroke();
  g.setLineDash([]);
}

const MONITORS = ['Carga ERP → destino', 'Job do lakehouse', 'API de destino', 'Reconciliação', 'Modelo do BI'];
function drawMonitors(g, time) {
  MONITORS.forEach((name, i) => {
    const y = 92 + i * 36;
    const warn = i === 2 && Math.sin(time * 0.8) > 0.55;
    g.font = `400 19px ${SANS}`;
    g.fillStyle = '#c9d6e4';
    g.fillText(name, 30, y);
    const c = warn ? '#f2c46d' : '#5fd39a';
    g.fillStyle = hexA(c, 0.16);
    g.beginPath();
    g.roundRect(372, y - 13, 82, 26, 13);
    g.fill();
    g.fillStyle = c;
    g.font = `600 15px ${MONO}`;
    g.fillText(warn ? 'WARN' : 'OK', 392, y + 1);
  });
}

const ETAPAS = ['extract', 'validate', 'merge', 'load', 'reconcile'];
function drawAudit(g, time) {
  const start = Math.floor(time * 2.2);
  g.font = `500 16px ${MONO}`;
  for (let i = 0; i < 6; i += 1) {
    const n = start - i;
    const etapa = ETAPAS[((n % 5) + 5) % 5];
    const ok = n % 11 !== 0;
    const id = ((n * 2654435761) >>> 0).toString(16).slice(0, 4);
    g.fillStyle = i === 0 ? '#e8eef6' : `rgba(201,214,228,${0.8 - i * 0.12})`;
    g.fillText(`{"run":"r${id}","etapa":"${etapa}","ok":${ok}}`, 24, 252 - i * 32);
  }
}

export function createArchitectureScene(canvas, { lowPower = false, hud = null } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lowPower,
    alpha: true,
    powerPreference: lowPower ? 'low-power' : 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x090d13, 22, 46);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 90);

  const disposables = [];
  const track = (o) => {
    disposables.push(o);
    return o;
  };
  const instanced = [];

  let envTarget = null;
  let composer = null;
  if (!lowPower) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    envTarget = pmrem.fromScene(room, 0.04);
    scene.environment = envTarget.texture;
    room.dispose?.();
    pmrem.dispose();

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.42, 0.45, 0.86));
    composer.addPass(new OutputPass());
  }

  scene.add(new THREE.HemisphereLight(0x9fc3ff, 0x05070a, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(4, 9, 6);
  scene.add(key);
  const rimCyan = new THREE.PointLight(0x4fd8eb, 16, 18, 2);
  rimCyan.position.set(-5, 2.5, 3);
  scene.add(rimCyan);
  const rimViolet = new THREE.PointLight(0xa78bfa, 12, 16, 2);
  rimViolet.position.set(2.5, 5.5, -2);
  scene.add(rimViolet);

  const root = new THREE.Group();
  const rig = new THREE.Group();
  root.add(rig);
  scene.add(root);

  // Groups whose emphasis is animated; each keeps a list of materials and a base opacity/emissive.
  const groups = {};
  const group = (name) => {
    if (!groups[name]) groups[name] = { level: 0.7, target: 0.7, items: [] };
    return groups[name];
  };
  const register = (name, material, kind, base) => group(name).items.push({ material, kind, base });

  // Floor: soft light pool + faint grid.
  const pool = new THREE.Mesh(
    track(new THREE.PlaneGeometry(22, 22)),
    track(new THREE.MeshBasicMaterial({
      map: track(radialTexture('rgba(79,216,235,0.16)', 'rgba(10,14,20,0)')),
      transparent: true,
      depthWrite: false,
    })),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -0.75;
  rig.add(pool);
  const shadow = new THREE.Mesh(
    track(new THREE.PlaneGeometry(6, 4.4)),
    track(new THREE.MeshBasicMaterial({
      map: track(radialTexture('rgba(0,0,0,0.75)', 'rgba(0,0,0,0)')),
      transparent: true,
      depthWrite: false,
    })),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.74;
  rig.add(shadow);
  const grid = new THREE.GridHelper(22, 44, 0x2a3a52, 0x1a2638);
  grid.position.y = -0.76;
  grid.material.transparent = true;
  grid.material.opacity = 0.22;
  track(grid.geometry);
  track(grid.material);
  rig.add(grid);

  // Core: four translucent slabs (ingestion, processing, storage, intelligence).
  const slabGeo = track(new RoundedBoxGeometry(3.4, 0.26, 2.3, 4, 0.08));
  const slabEdges = track(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 0.26, 2.3)));
  const moduleGeos = [
    track(new RoundedBoxGeometry(0.42, 0.14, 0.32, 2, 0.03)),
    track(new RoundedBoxGeometry(0.62, 0.08, 0.14, 2, 0.02)),
    track(new THREE.CylinderGeometry(0.17, 0.17, 0.16, 20)),
    track(new THREE.OctahedronGeometry(0.15)),
  ];
  const moduleLayout = [
    [5, 3],
    [4, 6],
    [6, 4],
    [5, 3],
  ];
  const dummy = new THREE.Object3D();

  LAYER_Y.forEach((y, i) => {
    const mat = track(new THREE.MeshPhysicalMaterial({
      color: COLOR.slab,
      metalness: 0.35,
      roughness: 0.22,
      transparent: true,
      opacity: 0.62,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
      emissive: LAYER_COLORS[i],
      emissiveIntensity: 0.05,
    }));
    const slab = new THREE.Mesh(slabGeo, mat);
    slab.position.y = y;
    rig.add(slab);
    register(`layer${i}`, mat, 'emissive', 0.05);

    const edgeMat = track(new THREE.LineBasicMaterial({ color: LAYER_COLORS[i], transparent: true, opacity: 0.5 }));
    const edges = new THREE.LineSegments(slabEdges, edgeMat);
    edges.position.y = y;
    rig.add(edges);
    register(`layer${i}`, edgeMat, 'opacity', 0.55);

    const [cols, rows] = moduleLayout[i];
    const modMat = track(new THREE.MeshStandardMaterial({
      color: i === 3 ? 0x6d5bd0 : 0x8fa3b8,
      metalness: 0.85,
      roughness: 0.32,
      emissive: LAYER_COLORS[i],
      emissiveIntensity: 0.1,
    }));
    const mods = new THREE.InstancedMesh(moduleGeos[i], modMat, cols * rows);
    let n = 0;
    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        dummy.position.set(-1.25 + (2.5 / (cols - 1)) * c, y + 0.2, -0.75 + (1.5 / (rows - 1)) * r);
        dummy.rotation.set(0, i === 3 ? (c + r) * 0.4 : 0, 0);
        dummy.updateMatrix();
        mods.setMatrixAt(n, dummy.matrix);
        n += 1;
      }
    }
    rig.add(mods);
    instanced.push(mods);
    register(`layer${i}`, modMat, 'emissive', 0.1);
  });

  // Peripheral nodes.
  const nodeMetal = (emissive) => track(new THREE.MeshStandardMaterial({
    color: 0x6f8399,
    metalness: 0.9,
    roughness: 0.36,
    emissive,
    emissiveIntensity: 0.2,
  }));

  const sourceGeo = track(new RoundedBoxGeometry(0.78, 0.46, 0.56, 3, 0.06));
  const lampGeo = track(new THREE.BoxGeometry(0.5, 0.04, 0.02));
  const sources = [];
  for (let i = 0; i < 6; i += 1) {
    const z = -2.1 + i * 0.84;
    const pos = [-4.8 + Math.abs(i - 2.5) * 0.18, 0.15 + (i % 2) * 0.32, z];
    const mat = nodeMetal(COLOR.cyan);
    const m = new THREE.Mesh(sourceGeo, mat);
    m.position.set(...pos);
    rig.add(m);
    const lampMat = track(new THREE.MeshBasicMaterial({ color: COLOR.cyan, transparent: true, opacity: 0.9, toneMapped: false }));
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(pos[0], pos[1] + 0.08, pos[2] + 0.29);
    rig.add(lamp);
    register('sources', mat, 'emissive', 0.2);
    register('sources', lampMat, 'opacity', 0.9);
    sources.push(pos);
  }

  const dbGeo = track(new THREE.CylinderGeometry(0.34, 0.34, 0.62, 28));
  const apiGeo = track(new THREE.OctahedronGeometry(0.36));
  const destinations = [];
  const destDefs = [
    { geo: apiGeo, pos: [4.6, 2.35, -1.5] },
    { geo: dbGeo, pos: [4.9, 1.55, -0.45] },
    { geo: apiGeo, pos: [4.7, 2.0, 0.65] },
    { geo: dbGeo, pos: [4.4, 1.2, 1.7] },
  ];
  destDefs.forEach(({ geo, pos }) => {
    const mat = nodeMetal(COLOR.blue);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...pos);
    rig.add(m);
    register('destinations', mat, 'emissive', 0.2);
    destinations.push(pos);
  });

  const agentGeo = track(new THREE.IcosahedronGeometry(0.34, 0));
  const toolGeo = track(new RoundedBoxGeometry(0.34, 0.34, 0.34, 2, 0.05));
  const agents = [];
  const agentMeshes = [];
  [[-1.4, 4.2, -0.4], [0.2, 4.55, 0.5], [1.6, 4.15, -0.6]].forEach((pos) => {
    const mat = track(new THREE.MeshStandardMaterial({
      color: 0x8b7bdc,
      metalness: 0.4,
      roughness: 0.2,
      emissive: COLOR.violet,
      emissiveIntensity: 0.35,
      flatShading: true,
    }));
    const m = new THREE.Mesh(agentGeo, mat);
    m.position.set(...pos);
    rig.add(m);
    agentMeshes.push(m);
    register('agents', mat, 'emissive', 0.35);
    agents.push(pos);
  });
  const tools = [[-3.3, 4.9, 0.4], [-2.6, 5.4, -1.4], [3.1, 5.2, 0.6], [3.4, 4.6, -1.2]];
  tools.forEach((pos) => {
    const mat = nodeMetal(COLOR.violet);
    const m = new THREE.Mesh(toolGeo, mat);
    m.position.set(...pos);
    rig.add(m);
    register('agents', mat, 'emissive', 0.2);
  });

  // Connections.
  const curves = [];
  const addFlow = (groupName, curve, color) => {
    const geo = track(new THREE.TubeGeometry(curve, 48, 0.012, 5, false));
    const mat = track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, toneMapped: false, depthWrite: false }));
    rig.add(new THREE.Mesh(geo, mat));
    register(groupName, mat, 'opacity', 0.35);
    curves.push({ groupName, samples: curve.getSpacedPoints(96), color });
  };

  sources.forEach((p, i) => {
    addFlow('flowsIn', bezier([p[0] + 0.4, p[1], p[2]], [-1.7, LAYER_Y[0], -0.9 + i * 0.36], 'h'), COLOR.cyan);
  });
  [-1.35, 1.35].forEach((x, k) => {
    for (let i = 0; i < 3; i += 1) {
      const z = k === 0 ? -0.4 : 0.4;
      addFlow(
        i < 2 ? 'flowsCore' : 'flowsAI',
        bezier([x, LAYER_Y[i] + 0.14, z], [x, LAYER_Y[i + 1] - 0.14, z], 'v'),
        i < 2 ? COLOR.blue : COLOR.violet,
      );
    }
  });
  destinations.forEach((p, i) => {
    addFlow('flowsOut', bezier([1.7, LAYER_Y[2], -0.8 + i * 0.5], [p[0] - 0.35, p[1], p[2]], 'h'), COLOR.blue);
  });
  agents.forEach((p, i) => {
    addFlow('flowsAI', bezier([-0.8 + i * 0.8, LAYER_Y[3] + 0.14, 0], [p[0], p[1] - 0.3, p[2]], 'v'), COLOR.violet);
  });
  [[0, 0], [0, 1], [2, 2], [2, 3], [1, 2]].forEach(([a, t]) => {
    const A = agents[a];
    const T = tools[t];
    addFlow('flowsAI', bezier([A[0], A[1] + 0.2, A[2]], [T[0], T[1], T[2]], 'h'), COLOR.violet);
  });

  // Data pulses travelling along each connection.
  const perCurve = lowPower ? 1 : 2;
  const pulseCount = curves.length * perCurve;
  const pulseGeo = track(new THREE.SphereGeometry(0.045, 10, 8));
  const haloGeo = track(new THREE.SphereGeometry(0.12, 10, 8));
  const pulseMat = track(new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const haloMat = track(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const pulses = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);
  const halos = new THREE.InstancedMesh(haloGeo, haloMat, pulseCount);
  instanced.push(pulses, halos);
  const pulseState = [];
  curves.forEach((c, ci) => {
    for (let k = 0; k < perCurve; k += 1) {
      const idx = pulseState.length;
      pulseState.push({ curve: ci, offset: (k / perCurve) + ci * 0.137, speed: 0.11 + ((ci * 7) % 5) * 0.012 });
      pulses.setColorAt(idx, c.color);
      halos.setColorAt(idx, c.color);
    }
  });
  rig.add(pulses);
  rig.add(halos);

  const tmp = new THREE.Vector3();
  const placePulses = (time) => {
    pulseState.forEach((p, i) => {
      const { samples, groupName } = curves[p.curve];
      const level = groups[groupName].level;
      const t = frac(p.offset + time * p.speed);
      const f = t * (samples.length - 1);
      const i0 = Math.floor(f);
      tmp.copy(samples[i0]).lerp(samples[Math.min(i0 + 1, samples.length - 1)], f - i0);
      const s = 0.25 + level * 0.9;
      dummy.position.copy(tmp);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      pulses.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(s * (0.6 + level * 0.6));
      dummy.updateMatrix();
      halos.setMatrixAt(i, dummy.matrix);
    });
    pulses.instanceMatrix.needsUpdate = true;
    halos.instanceMatrix.needsUpdate = true;
  };

  const applyLevels = () => {
    Object.values(groups).forEach((g) => {
      g.items.forEach(({ material, kind, base }) => {
        if (kind === 'opacity') material.opacity = Math.min(1, base * (0.25 + g.level * 1.1));
        else material.emissiveIntensity = base * (0.3 + g.level * 1.6);
      });
    });
  };

  /* ------------------------------------------------------------------ */
  /* Zoom details: one micro-scene per stage, materialised as the camera */
  /* dives into that part of the platform.                               */
  /* ------------------------------------------------------------------ */

  const details = [];
  const makeDetail = (stageIndex, position) => {
    const g = new THREE.Group();
    g.position.set(...position);
    g.visible = false;
    rig.add(g);
    const d = { stage: stageIndex, group: g, level: 0, mats: [], update: null };
    d.fade = (mat, base = mat.opacity ?? 1) => {
      mat.transparent = true;
      d.mats.push({ mat, base });
      return mat;
    };
    details.push(d);
    return d;
  };

  function makeLabel(text, { color = CSS.cyan, sub = '', height = 0.2, plain = false } = {}) {
    const c = document.createElement('canvas');
    const g = c.getContext('2d');
    const titleFont = `600 40px ${MONO}`;
    const subFont = `400 30px ${SANS}`;
    g.font = titleFont;
    const w1 = g.measureText(text).width;
    g.font = subFont;
    const w2 = sub ? g.measureText(sub).width : 0;
    const padX = plain ? 6 : 34;
    const W = Math.ceil(Math.max(w1, w2) + padX * 2);
    const H = sub ? 122 : plain ? 56 : 76;
    c.width = W;
    c.height = H;
    if (!plain) {
      g.fillStyle = 'rgba(8, 13, 20, 0.93)';
      g.beginPath();
      g.roundRect(1, 1, W - 2, H - 2, 14);
      g.fill();
      g.strokeStyle = hexA(color, 0.65);
      g.lineWidth = 2;
      g.stroke();
      g.fillStyle = color;
      g.fillRect(16, sub ? 24 : 22, 4, sub ? 74 : 32);
    }
    g.textBaseline = 'middle';
    g.font = titleFont;
    g.fillStyle = plain ? color : '#cfdbe8';
    g.fillText(text, padX, sub ? 42 : H / 2);
    if (sub) {
      g.font = subFont;
      g.fillStyle = '#8aa0b6';
      g.fillText(sub, padX, 90);
    }
    const tex = track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = track(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }));
    const s = new THREE.Sprite(mat);
    s.scale.set((height * W) / H, height, 1);
    s.center.set(0.5, 0);
    s.renderOrder = 20;
    return s;
  }

  const addLabel = (d, text, opts, pos, center) => {
    const l = makeLabel(text, opts);
    l.position.set(...pos);
    if (center) l.center.set(...center);
    d.fade(l.material, 1);
    d.group.add(l);
    return l;
  };

  const tube = (d, curve, color, opacity, radius = 0.008) => {
    const mat = d.fade(track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, toneMapped: false, depthWrite: false })), opacity);
    d.group.add(new THREE.Mesh(track(new THREE.TubeGeometry(curve, 40, radius, 5, false)), mat));
  };

  const pulseSystem = (d, list, { color, per = 2, speed = 0.25, size = 0.04 }) => {
    const samples = list.map((c) => c.getSpacedPoints(80));
    const mat = d.fade(track(new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })), 1);
    const mesh = new THREE.InstancedMesh(pulseGeo, mat, samples.length * per);
    instanced.push(mesh);
    d.group.add(mesh);
    const scale = size / 0.045;
    return (time) => {
      let n = 0;
      samples.forEach((pts, ci) => {
        for (let k = 0; k < per; k += 1) {
          const t = frac(time * speed + k / per + ci * 0.17);
          const f = t * (pts.length - 1);
          const i0 = Math.floor(f);
          dummy.position.copy(pts[i0]).lerp(pts[Math.min(i0 + 1, pts.length - 1)], f - i0);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          mesh.setMatrixAt(n, dummy.matrix);
          n += 1;
        }
      });
      mesh.instanceMatrix.needsUpdate = true;
    };
  };

  // 0 · EXTRACT — Azure Key Vault handing secrets to the source connectors.
  {
    const V = [-3.15, 1.75, 1.45];
    const d = makeDetail(0, V);
    const g = d.group;
    const bodyGeo = track(new THREE.CylinderGeometry(0.42, 0.42, 0.86, 6, 1));
    const body = new THREE.Mesh(bodyGeo, d.fade(track(new THREE.MeshPhysicalMaterial({
      color: 0x0f2643,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      emissive: COLOR.azure,
      emissiveIntensity: 0.3,
    }))));
    body.rotation.y = Math.PI / 6;
    g.add(body);
    const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(bodyGeo)), d.fade(track(new THREE.LineBasicMaterial({ color: 0x7cc0ff, transparent: true, opacity: 0.9 }))));
    edges.rotation.y = Math.PI / 6;
    g.add(edges);

    const doorZ = 0.372;
    const goldGlow = d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.amber, toneMapped: false })));
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(0.17, 0.018, 10, 48)), goldGlow);
    ring.position.set(0, 0.04, doorZ);
    g.add(ring);
    const wheel = new THREE.Group();
    wheel.position.set(0, 0.04, doorZ + 0.012);
    g.add(wheel);
    const steel = d.fade(track(new THREE.MeshStandardMaterial({ color: 0xc9d6e6, metalness: 0.9, roughness: 0.3 })));
    const spokeGeo = track(new THREE.BoxGeometry(0.3, 0.022, 0.02));
    for (let i = 0; i < 3; i += 1) {
      const s = new THREE.Mesh(spokeGeo, steel);
      s.rotation.z = (i * Math.PI) / 3;
      wheel.add(s);
    }
    wheel.add(new THREE.Mesh(track(new THREE.SphereGeometry(0.045, 16, 12)), goldGlow));

    const keyMat = d.fade(track(new THREE.MeshStandardMaterial({ color: 0xf2c46d, metalness: 0.9, roughness: 0.25, emissive: COLOR.amber, emissiveIntensity: 0.6 })));
    const keyObj = new THREE.Group();
    keyObj.add(new THREE.Mesh(track(new THREE.TorusGeometry(0.06, 0.017, 8, 24)), keyMat));
    const shaft = new THREE.Mesh(track(new THREE.BoxGeometry(0.2, 0.026, 0.026)), keyMat);
    shaft.position.x = 0.15;
    keyObj.add(shaft);
    const toothGeo = track(new THREE.BoxGeometry(0.025, 0.05, 0.026));
    [0.2, 0.235].forEach((x) => {
      const t = new THREE.Mesh(toothGeo, keyMat);
      t.position.set(x, -0.03, 0);
      keyObj.add(t);
    });
    g.add(keyObj);

    const shieldMat = d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.cyan, transparent: true, opacity: 0.5, toneMapped: false })));
    const shieldGeo = track(new THREE.TorusGeometry(0.74, 0.005, 6, 120));
    const s1 = new THREE.Mesh(shieldGeo, shieldMat);
    const s2 = new THREE.Mesh(shieldGeo, shieldMat);
    s1.rotation.x = 1.2;
    s2.rotation.set(0.4, 0, 0.9);
    g.add(s1, s2);

    const beams = sources.map((p) => {
      const A = new THREE.Vector3(0, -0.3, 0);
      const B = new THREE.Vector3(p[0] - V[0], p[1] - V[1] + 0.24, p[2] - V[2]);
      const C = A.clone().lerp(B, 0.5);
      C.y += 0.55;
      return new THREE.QuadraticBezierCurve3(A, C, B);
    });
    beams.forEach((c) => tube(d, c, COLOR.amber, 0.3, 0.006));
    const beamPulses = pulseSystem(d, beams, { color: COLOR.amber, per: 2, speed: 0.32, size: 0.035 });

    ['REST', 'SOAP', 'OData', 'SFTP', 'REST', 'OData'].forEach((t, i) => {
      const p = sources[i];
      addLabel(d, t, { color: CSS.cyan, height: 0.13 }, [p[0] - V[0], p[1] - V[1] + 0.3, p[2] - V[2]]);
    });
    addLabel(d, 'AZURE KEY VAULT', { color: CSS.azure, sub: 'segredos lidos em tempo de execução', height: 0.3 }, [0, 0.66, 0]);

    d.update = (time) => {
      wheel.rotation.z = time * 0.9;
      const a = time * 0.7;
      keyObj.position.set(Math.cos(a) * 0.8, 0.1 + Math.sin(time * 1.3) * 0.08, Math.sin(a) * 0.8);
      keyObj.rotation.set(0, -a + Math.PI / 2, Math.sin(time * 2) * 0.2);
      s1.rotation.z = time * 0.35;
      s2.rotation.y = time * 0.28;
      beamPulses(time);
    };
  }

  // 1 · TRANSFORM — a Databricks Workflow DAG running on a Spark cluster.
  {
    const W = [0, 1.35, 1.85];
    const d = makeDetail(1, W);
    const g = d.group;
    const panelGeo = track(new THREE.PlaneGeometry(3.8, 2.05));
    g.add(new THREE.Mesh(panelGeo, d.fade(track(new THREE.MeshBasicMaterial({ color: 0x0a1626, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide })))));
    g.add(new THREE.LineSegments(track(new THREE.EdgesGeometry(panelGeo)), d.fade(track(new THREE.LineBasicMaterial({ color: COLOR.dbx, transparent: true, opacity: 0.85 })))));
    const gp = [];
    for (let x = -1.7; x < 1.9; x += 0.2) gp.push(x, -1.025, 0.001, x, 1.025, 0.001);
    for (let y = -0.82; y < 1.02; y += 0.205) gp.push(-1.9, y, 0.001, 1.9, y, 0.001);
    const gridGeo = track(new THREE.BufferGeometry());
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3));
    g.add(new THREE.LineSegments(gridGeo, d.fade(track(new THREE.LineBasicMaterial({ color: 0x4fd8eb, transparent: true, opacity: 0.07 })))));
    addLabel(d, 'DATABRICKS WORKFLOWS', { color: CSS.dbx, sub: 'job multitarefa · repair só do que falhou', height: 0.32 }, [-0.7, 1.1, 0]);

    const TASKS = [
      { name: 'extrair', p: [-1.38, 0.38], level: 0 },
      { name: 'validar', p: [-0.46, 0.68], level: 1 },
      { name: 'contrato', p: [-0.46, 0.08], level: 1 },
      { name: 'transformar', p: [0.46, 0.38], level: 2 },
      { name: 'MERGE', p: [1.38, 0.38], level: 3 },
    ];
    const nodeGeo = track(new RoundedBoxGeometry(0.74, 0.26, 0.08, 2, 0.04));
    const dotGeo = track(new THREE.SphereGeometry(0.035, 12, 10));
    TASKS.forEach((t) => {
      t.mat = d.fade(track(new THREE.MeshStandardMaterial({ color: 0x142233, metalness: 0.6, roughness: 0.35, emissive: COLOR.dbx, emissiveIntensity: 0.12 })));
      const m = new THREE.Mesh(nodeGeo, t.mat);
      m.position.set(t.p[0], t.p[1], 0.05);
      g.add(m);
      t.lampMat = d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.idle, toneMapped: false })));
      const lamp = new THREE.Mesh(dotGeo, t.lampMat);
      lamp.position.set(t.p[0] - 0.28, t.p[1], 0.1);
      g.add(lamp);
      addLabel(d, t.name, { plain: true, color: '#d6e2ee', height: 0.1 }, [t.p[0] - 0.21, t.p[1], 0.11], [0, 0.5]);
    });
    const links = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]].map(([a, b]) => {
      const A = TASKS[a].p;
      const B = TASKS[b].p;
      return bezier([A[0] + 0.37, A[1], 0.05], [B[0] - 0.37, B[1], 0.05], 'h');
    });
    links.push(bezier([0.2, -0.42, 0.15], [0.46, 0.25, 0.05], 'v'));
    links.forEach((c) => tube(d, c, COLOR.dbx, 0.5, 0.007));
    const linkPulses = pulseSystem(d, links, { color: COLOR.dbx, per: 1, speed: 0.45, size: 0.032 });

    const cluster = new THREE.Group();
    cluster.position.set(0.2, -0.55, 0.18);
    g.add(cluster);
    const driver = new THREE.Mesh(track(new THREE.IcosahedronGeometry(0.1, 0)), d.fade(track(new THREE.MeshStandardMaterial({
      color: 0xff8a65,
      metalness: 0.4,
      roughness: 0.25,
      emissive: COLOR.dbx,
      emissiveIntensity: 0.8,
      flatShading: true,
    }))));
    cluster.add(driver);
    const workerGeo = track(new RoundedBoxGeometry(0.09, 0.09, 0.09, 2, 0.015));
    const workerMat = d.fade(track(new THREE.MeshStandardMaterial({ color: 0xb8c6d6, metalness: 0.85, roughness: 0.3, emissive: COLOR.dbx, emissiveIntensity: 0.25 })));
    const workers = Array.from({ length: 8 }, () => {
      const w = new THREE.Mesh(workerGeo, workerMat);
      cluster.add(w);
      return w;
    });
    const linkPos = new Float32Array(workers.length * 6);
    const spokes = track(new THREE.BufferGeometry());
    spokes.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
    cluster.add(new THREE.LineSegments(spokes, d.fade(track(new THREE.LineBasicMaterial({ color: COLOR.dbx, transparent: true, opacity: 0.45 })))));
    addLabel(d, 'cluster Spark', { color: CSS.dbx, sub: 'driver + workers', height: 0.22 }, [-1.2, -0.85, 0.05]);
    const repair = makeLabel('repair', { color: CSS.amber, height: 0.12 });
    repair.position.set(-0.46, -0.24, 0.12);
    g.add(repair);

    const CYCLE = 8;
    const STEP = 1.15;
    const statusAt = (t, failCycle, task) => {
      let start = task.level * STEP;
      if (failCycle && task.level >= 2) start += STEP;
      if (t < start) return 'idle';
      if (failCycle && task.name === 'contrato') {
        if (t < start + STEP * 0.7) return 'run';
        if (t < start + STEP * 1.2) return 'fail';
        if (t < start + STEP * 2) return 'run';
        return 'done';
      }
      return t < start + STEP ? 'run' : 'done';
    };
    const LAMP = { idle: COLOR.idle, run: COLOR.amber, done: COLOR.green, fail: COLOR.coral };

    d.update = (time) => {
      const failCycle = Math.floor(time / CYCLE) % 2 === 1;
      const t = time % CYCLE;
      TASKS.forEach((task) => {
        const s = statusAt(t, failCycle, task);
        task.lampMat.color.copy(LAMP[s]);
        task.mat.emissive.copy(s === 'fail' ? COLOR.coral : s === 'done' ? COLOR.green : COLOR.dbx);
        task.mat.emissiveIntensity = s === 'run' ? 0.5 + Math.sin(time * 10) * 0.25 : s === 'idle' ? 0.08 : 0.3;
      });
      const showRepair = failCycle && t >= STEP * 1.7 && t < STEP * 3;
      repair.material.opacity = showRepair ? d.level : 0;
      linkPulses(time);
      workers.forEach((w, i) => {
        const a = time * 0.9 + (i / workers.length) * Math.PI * 2;
        w.position.set(Math.cos(a) * 0.55, Math.sin(a * 2) * 0.03, Math.sin(a) * 0.2);
        w.rotation.set(a, a * 0.5, 0);
        linkPos.set([0, 0, 0, w.position.x, w.position.y, w.position.z], i * 6);
      });
      spokes.attributes.position.needsUpdate = true;
      driver.rotation.y = time * 0.8;
    };
  }

  // 2 · STORE — Delta Lake medallion with its transaction log.
  {
    const M = [2.75, 1.25, 1.3];
    const d = makeDetail(2, M);
    const g = d.group;
    const tiers = [
      { name: 'BRONZE', sub: 'dado bruto', color: 0xc0763a, css: '#d08a4e' },
      { name: 'PRATA', sub: 'limpo e tipado', color: 0xb9c6d6, css: '#c8d4e2' },
      { name: 'OURO', sub: 'estado consolidado', color: 0xf2c46d, css: '#f2c46d' },
    ];
    const discGeo = track(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 64));
    const rimGeo = track(new THREE.TorusGeometry(0.635, 0.012, 8, 96));
    tiers.forEach((tier, i) => {
      const y = -0.55 + i * 0.55;
      const c = new THREE.Color(tier.color);
      const disc = new THREE.Mesh(discGeo, d.fade(track(new THREE.MeshPhysicalMaterial({
        color: c.clone().multiplyScalar(0.45),
        metalness: 0.8,
        roughness: 0.25,
        clearcoat: 1,
        emissive: c,
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0.92,
      }))));
      disc.position.y = y;
      g.add(disc);
      const rim = new THREE.Mesh(rimGeo, d.fade(track(new THREE.MeshBasicMaterial({ color: c, toneMapped: false, transparent: true, opacity: 0.95 }))));
      rim.rotation.x = Math.PI / 2;
      rim.position.y = y;
      g.add(rim);
      addLabel(d, tier.name, { color: tier.css, sub: tier.sub, height: 0.24 }, [0.85, y - 0.12, 0.25], [0, 0]);
    });
    g.add(new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.32, 0.32, 1.5, 32, 1, true)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.cyan, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false }))),
    ));

    const P = 30;
    const parts = new THREE.InstancedMesh(pulseGeo, d.fade(track(new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))), P);
    const cBronze = new THREE.Color(0xd08a4e);
    const cSilver = new THREE.Color(0xc8d4e2);
    const cGold = new THREE.Color(0xf2c46d);
    const tmpC = new THREE.Color();
    for (let i = 0; i < P; i += 1) parts.setColorAt(i, cBronze);
    g.add(parts);
    instanced.push(parts);

    const T = 36;
    const ticks = new THREE.InstancedMesh(
      track(new THREE.BoxGeometry(0.1, 0.018, 0.018)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, toneMapped: false }))),
      T,
    );
    for (let i = 0; i < T; i += 1) {
      const a = i * 0.5;
      dummy.position.set(Math.cos(a) * 0.98, -0.75 + (i / T) * 1.6, Math.sin(a) * 0.98);
      dummy.rotation.set(0, -a, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      ticks.setMatrixAt(i, dummy.matrix);
      ticks.setColorAt(i, tmpC.set(0x4fd8eb).lerp(cGold, i / T).multiplyScalar(0.55));
    }
    const helix = new THREE.Group();
    helix.add(ticks);
    g.add(helix);
    instanced.push(ticks);

    addLabel(d, 'DELTA LAKE', { color: CSS.cyan, sub: 'ACID · versões · time travel', height: 0.3 }, [0, 1.0, 0]);
    addLabel(d, '_delta_log', { plain: true, color: CSS.cyan, height: 0.12 }, [-1.05, 0.85, 0]);
    addLabel(d, 'MERGE  + inclusões  ~ alterações  − exclusões', { color: CSS.amber, height: 0.15 }, [0, -0.95, 0.3], [0.5, 1]);

    d.update = (time) => {
      helix.rotation.y = time * 0.25;
      for (let i = 0; i < P; i += 1) {
        const t = frac(time * 0.18 + i / P);
        const a = i * 2.4 + time * 1.2;
        const r = 0.1 + (i % 3) * 0.07;
        dummy.position.set(Math.cos(a) * r, -0.75 + t * 1.5, Math.sin(a) * r);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(0.6);
        dummy.updateMatrix();
        parts.setMatrixAt(i, dummy.matrix);
        if (t < 0.5) tmpC.copy(cBronze).lerp(cSilver, t * 2);
        else tmpC.copy(cSilver).lerp(cGold, (t - 0.5) * 2);
        parts.setColorAt(i, tmpC);
      }
      parts.instanceMatrix.needsUpdate = true;
      parts.instanceColor.needsUpdate = true;
    };
  }

  // 3 · LOAD — gateway throttling batches towards the destination APIs.
  {
    const G = [3.05, 1.85, 0.05];
    const d = makeDetail(3, G);
    const g = d.group;
    const ringMat = d.fade(track(new THREE.MeshStandardMaterial({ color: 0x9fb3c8, metalness: 0.9, roughness: 0.25, emissive: COLOR.blue, emissiveIntensity: 0.6 })));
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(0.62, 0.035, 14, 80)), ringMat);
    ring.rotation.y = Math.PI / 2;
    g.add(ring);
    const membrane = new THREE.Mesh(
      track(new THREE.CircleGeometry(0.6, 48)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.blue, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false }))),
    );
    membrane.rotation.y = Math.PI / 2;
    g.add(membrane);
    const throttle = new THREE.Group();
    g.add(throttle);
    const segGeo = track(new THREE.BoxGeometry(0.05, 0.16, 0.05));
    const segMat = d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.cyan, toneMapped: false })));
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      const s = new THREE.Mesh(segGeo, segMat);
      s.position.set(0, Math.cos(a) * 0.8, Math.sin(a) * 0.8);
      s.rotation.x = -a;
      throttle.add(s);
    }

    const lanes = destinations.map((p, i) => new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.72 - G[0], 1.8 - G[1], -0.5 + i * 0.33),
      new THREE.Vector3(-0.45, 0, (i - 1.5) * 0.08),
      new THREE.Vector3(0.45, 0, (i - 1.5) * 0.08),
      new THREE.Vector3(p[0] - 0.42 - G[0], p[1] - G[1], p[2] - G[2]),
    ]));
    lanes.forEach((c) => tube(d, c, COLOR.blue, 0.28, 0.006));
    const laneSamples = lanes.map((c) => c.getSpacedPoints(90));
    const PER = 4;
    const packets = new THREE.InstancedMesh(
      track(new RoundedBoxGeometry(0.1, 0.1, 0.1, 2, 0.02)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }))),
      lanes.length * PER,
    );
    const cBlue = new THREE.Color(0x7ea4ff);
    const cCyan = new THREE.Color(0x4fd8eb);
    for (let i = 0; i < lanes.length * PER; i += 1) packets.setColorAt(i, cBlue);
    g.add(packets);
    instanced.push(packets);
    const checks = destinations.map((p) => {
      const l = makeLabel('✓ 200 · validado', { color: CSS.green, height: 0.14 });
      l.position.set(p[0] - G[0], p[1] - G[1] + 0.45, p[2] - G[2]);
      l.material.opacity = 0;
      g.add(l);
      return l;
    });
    addLabel(d, 'GATEWAY DE CARGA', { color: CSS.blue, sub: 'lotes · concorrência · timeout', height: 0.3 }, [0, 0.98, 0]);

    const SPEED = 0.16;
    d.update = (time) => {
      throttle.rotation.x = time * 0.9;
      ringMat.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.2;
      let n = 0;
      laneSamples.forEach((pts, li) => {
        const phase = time * SPEED + li * 0.27;
        for (let k = 0; k < PER; k += 1) {
          const t = frac(phase - k * 0.035);
          const f = t * (pts.length - 1);
          const i0 = Math.floor(f);
          dummy.position.copy(pts[i0]).lerp(pts[Math.min(i0 + 1, pts.length - 1)], f - i0);
          dummy.rotation.set(time * 2 + k, time * 1.5, 0);
          dummy.scale.setScalar(t > 0.92 ? 1 - ((t - 0.92) / 0.08) * 0.7 : 1);
          dummy.updateMatrix();
          packets.setMatrixAt(n, dummy.matrix);
          packets.setColorAt(n, t > 0.85 ? COLOR.green : t > 0.4 ? cCyan : cBlue);
          n += 1;
        }
        checks[li].material.opacity = d.level * Math.max(0.15, 1 - frac(phase) / 0.4);
      });
      packets.instanceMatrix.needsUpdate = true;
      packets.instanceColor.needsUpdate = true;
    };
  }

  // 4 · OBSERVE — scanner sweeping the platform, telemetry feeding live dashboards.
  {
    const O = [0, 1.4, 0];
    const d = makeDetail(4, O);
    const g = d.group;
    const scan = new THREE.Group();
    g.add(scan);
    const scanRing = new THREE.Mesh(track(new THREE.TorusGeometry(2.35, 0.014, 8, 160)), d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.amber, toneMapped: false }))));
    scanRing.rotation.x = Math.PI / 2;
    scan.add(scanRing);
    const scanDisc = new THREE.Mesh(
      track(new THREE.RingGeometry(1.95, 2.35, 96)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.amber, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false }))),
    );
    scanDisc.rotation.x = -Math.PI / 2;
    scan.add(scanDisc);

    const PANELS = [
      { pos: [-3.2, 1.5, 0.9], title: 'Execuções · pipelines', color: CSS.green, draw: drawSeries },
      { pos: [3.2, 1.75, 0.5], title: 'Latência p95 · APIs', color: CSS.datadog, draw: drawBars },
      { pos: [-1.0, -0.95, 2.7], title: 'Monitores', color: CSS.amber, draw: drawMonitors },
      { pos: [2.9, -0.65, -0.8], title: 'Trilha de auditoria', color: CSS.cyan, draw: drawAudit },
    ];
    const painters = PANELS.map((p) => {
      const c = document.createElement('canvas');
      c.width = 480;
      c.height = 290;
      const ctx = c.getContext('2d');
      const tex = track(new THREE.CanvasTexture(c));
      tex.colorSpace = THREE.SRGBColorSpace;
      const s = new THREE.Sprite(d.fade(track(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.96, depthWrite: false, toneMapped: false }))));
      s.scale.set(2.2, (2.2 * 290) / 480, 1);
      s.position.set(...p.pos);
      s.renderOrder = 15;
      g.add(s);
      return (time) => {
        ctx.clearRect(0, 0, 480, 290);
        ctx.fillStyle = 'rgba(9,14,22,0.92)';
        ctx.beginPath();
        ctx.roundRect(1, 1, 478, 288, 16);
        ctx.fill();
        ctx.strokeStyle = hexA(p.color, 0.55);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(28, 31, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.textBaseline = 'middle';
        ctx.font = `600 21px ${MONO}`;
        ctx.fillStyle = '#cfdbe8';
        ctx.fillText(p.title, 44, 32);
        ctx.fillStyle = 'rgba(148,178,214,0.18)';
        ctx.fillRect(16, 56, 448, 1);
        p.draw(ctx, time, p.color);
        tex.needsUpdate = true;
      };
    });
    const feeds = PANELS.map((p, i) => bezier([p.pos[0] > 0 ? 1.7 : -1.7, LAYER_Y[i] - O[1], 0], p.pos, 'h'));
    feeds.forEach((c) => tube(d, c, COLOR.amber, 0.3, 0.006));
    const feedPulses = pulseSystem(d, feeds, { color: COLOR.amber, per: 3, speed: 0.35, size: 0.036 });
    addLabel(d, 'OBSERVABILIDADE', { color: CSS.amber, sub: 'Datadog · logs · métricas · auditoria', height: 0.34 }, [0, -1.85, 1.6]);
    addLabel(d, 'DATADOG', { color: CSS.datadog, height: 0.16 }, [3.2, 2.45, 0.5]);

    let painted = -1;
    d.update = (time) => {
      scan.position.y = -0.1 + Math.sin(time * 0.6) * 1.9;
      feedPulses(time);
      if (Math.abs(time - painted) > 0.12) {
        painted = time;
        painters.forEach((paint) => paint(time));
      }
    };
  }

  // 5 · AGENTS — MCP ring of tools orbiting the agents, inside a guardrail dome.
  {
    const A = [0.1, 4.35, 0];
    const d = makeDetail(5, A);
    const g = d.group;
    const violetGlow = d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.violet, toneMapped: false })));
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(2.1, 0.01, 8, 180)), violetGlow);
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    const dotsPos = [];
    for (let i = 0; i < 140; i += 1) {
      const a = (i / 140) * Math.PI * 2;
      dotsPos.push(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1);
    }
    const dotsGeo = track(new THREE.BufferGeometry());
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotsPos, 3));
    const dots = new THREE.Points(dotsGeo, d.fade(track(new THREE.PointsMaterial({ color: COLOR.violet, size: 0.05, transparent: true, depthWrite: false, toneMapped: false }))));
    g.add(dots);
    const dome = new THREE.Mesh(
      track(new THREE.IcosahedronGeometry(2.75, 2)),
      d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.violet, wireframe: true, transparent: true, opacity: 0.1, depthWrite: false }))),
    );
    g.add(dome);

    const satGeo = track(new RoundedBoxGeometry(0.24, 0.24, 0.24, 2, 0.04));
    const satMat = d.fade(track(new THREE.MeshStandardMaterial({ color: 0x8b7bdc, metalness: 0.7, roughness: 0.25, emissive: COLOR.violet, emissiveIntensity: 0.55 })));
    const sats = ['Azure DevOps', 'Databricks', 'Wiki', 'Boards', 'CLI'].map((name, i, arr) => {
      const m = new THREE.Mesh(satGeo, satMat);
      g.add(m);
      const l = addLabel(d, name, { color: CSS.violet, height: 0.15 }, [0, 0, 0]);
      return { m, l, base: (i / arr.length) * Math.PI * 2 };
    });
    const spokePos = new Float32Array(sats.length * 6);
    const spokes = track(new THREE.BufferGeometry());
    spokes.setAttribute('position', new THREE.BufferAttribute(spokePos, 3));
    g.add(new THREE.LineSegments(spokes, d.fade(track(new THREE.LineBasicMaterial({ color: COLOR.violet, transparent: true, opacity: 0.4 })))));
    const sparks = new THREE.InstancedMesh(pulseGeo, d.fade(track(new THREE.MeshBasicMaterial({ color: COLOR.violet, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))), sats.length * 2);
    g.add(sparks);
    instanced.push(sparks);

    addLabel(d, 'HUB DE AGENTES', { color: CSS.violet, sub: 'skills · MCP · guardrails', height: 0.32 }, [0, 1.05, 0]);
    addLabel(d, 'GUARDRAILS', { plain: true, color: CSS.violet, height: 0.14 }, [0, 2.8, 0]);
    addLabel(d, 'MCP', { color: CSS.violet, height: 0.15 }, [2.25, 0.1, 0.4]);
    addLabel(d, 'audit.jsonl', { plain: true, color: CSS.amber, height: 0.12 }, [-1.3, -0.75, 1.1]);

    d.update = (time) => {
      dots.rotation.y = -time * 0.2;
      dome.rotation.y = time * 0.05;
      let n = 0;
      sats.forEach((s, i) => {
        const a = s.base + time * 0.18;
        s.m.position.set(Math.cos(a) * 2.1, Math.sin(time + i) * 0.08, Math.sin(a) * 2.1);
        s.m.rotation.set(time * 0.6, a, 0);
        s.l.position.set(s.m.position.x, s.m.position.y + 0.2, s.m.position.z);
        spokePos.set([0, 0, 0, s.m.position.x, s.m.position.y, s.m.position.z], i * 6);
        for (let k = 0; k < 2; k += 1) {
          const t = frac(time * 0.5 + i * 0.2 + k * 0.5);
          dummy.position.copy(s.m.position).multiplyScalar(t);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.setScalar(0.8);
          dummy.updateMatrix();
          sparks.setMatrixAt(n, dummy.matrix);
          n += 1;
        }
      });
      spokes.attributes.position.needsUpdate = true;
      sparks.instanceMatrix.needsUpdate = true;
    };
  }

  const applyDetails = () => {
    details.forEach((d) => {
      d.group.visible = d.level > 0.004;
      if (!d.group.visible) return;
      d.group.scale.setScalar(0.8 + 0.2 * easeOut(Math.min(1, d.level)));
      d.mats.forEach(({ mat, base }) => {
        mat.opacity = base * d.level;
      });
    });
  };

  // State.
  let stage = -1;
  let paused = false;
  let active = true;
  let pageVisible = !document.hidden;
  let frame = 0;
  let firstFrameCb = null;
  let rendered = false;
  let time = 0;
  let dive = 1;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const view = {
    focus: new THREE.Vector3(...STAGE_VIEW['-1'].focus),
    dist: STAGE_VIEW['-1'].dist,
    elev: STAGE_VIEW['-1'].elev,
    rotY: STAGE_VIEW['-1'].rotY,
  };
  const targetFocus = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const hudVec = new THREE.Vector3();
  const hudZoom = hud?.querySelector('[data-zoom]');
  let lastZoom = 0;

  const setTargets = () => {
    const focus = STAGE_FOCUS[stage];
    Object.entries(groups).forEach(([name, g]) => {
      if (focus === 'all') g.target = 0.95;
      else g.target = !focus ? 0.7 : focus.includes(name) ? 1 : 0.14;
    });
  };

  const snap = () => {
    const v = STAGE_VIEW[stage];
    view.focus.set(...v.focus);
    view.dist = v.dist;
    view.elev = v.elev;
    view.rotY = v.rotY;
    dive = 1;
    Object.values(groups).forEach((g) => {
      g.level = g.target;
    });
    details.forEach((d) => {
      d.level = d.stage === stage ? 1 : 0;
    });
  };

  const animate = () => {
    agentMeshes.forEach((m, i) => {
      m.rotation.y = time * 0.25 + i;
      m.position.y = agents[i][1] + Math.sin(time * 0.8 + i * 1.7) * 0.06;
    });
    placePulses(time);
    details.forEach((d) => d.level > 0.004 && d.update?.(time));
  };

  const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const draw = () => {
    rig.rotation.y = view.rotY + pointer.x * 0.12;
    rig.rotation.x = pointer.y * 0.04;
    // The camera pulls back mid-transition and then dives into the next target.
    const pull = 1 + Math.sin(Math.PI * Math.min(dive, 1)) * 0.32;
    const portrait = camera.aspect < 1 ? Math.min(2.3, 1 / Math.pow(camera.aspect, 0.85)) : 1;
    const dist = view.dist * pull * portrait;
    lookAt.copy(view.focus).applyEuler(rig.rotation);
    // Wide layouts keep the copy on the left, so the focus sits around 70% of the width.
    const offsetX = camera.aspect > 1.25 ? halfFov * view.dist * pull * camera.aspect * 0.42 : 0;
    root.position.x = offsetX;
    camera.position.set(lookAt.x, lookAt.y + Math.sin(view.elev) * dist, lookAt.z + Math.cos(view.elev) * dist);
    camera.lookAt(lookAt);
    applyLevels();
    applyDetails();
    if (composer) composer.render();
    else renderer.render(scene, camera);

    if (hud) {
      hudVec.copy(lookAt);
      hudVec.x += offsetX;
      hudVec.project(camera);
      hud.style.setProperty('--hx', `${(((hudVec.x + 1) / 2) * canvas.clientWidth).toFixed(1)}px`);
      hud.style.setProperty('--hy', `${(((1 - hudVec.y) / 2) * canvas.clientHeight).toFixed(1)}px`);
      const z = OVERVIEW_DIST / (view.dist * pull);
      if (hudZoom && Math.abs(z - lastZoom) > 0.04) {
        lastZoom = z;
        hudZoom.textContent = `${z.toFixed(1)}×`;
      }
    }
    if (!rendered) {
      rendered = true;
      firstFrameCb?.();
    }
  };

  let last = 0;
  const loop = (now) => {
    frame = 0;
    if (paused || !active || !pageVisible) return;
    const dt = Math.min((now - last) / 1000 || 0, 0.05);
    last = now;
    time += dt;
    const k = 1 - Math.exp(-dt * 2);
    const v = STAGE_VIEW[stage];
    view.focus.lerp(targetFocus.set(...v.focus), k);
    view.dist += (v.dist - view.dist) * k;
    view.elev += (v.elev - view.elev) * k;
    view.rotY += (v.rotY + Math.sin(time * 0.12) * 0.06 - view.rotY) * k;
    dive = Math.min(1, dive + dt / 1.6);
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 3));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 3));
    Object.values(groups).forEach((g) => {
      g.level += (g.target - g.level) * (1 - Math.exp(-dt * 3.5));
    });
    details.forEach((d) => {
      d.level += ((d.stage === stage ? 1 : 0) - d.level) * (1 - Math.exp(-dt * 2.6));
    });
    animate();
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (frame || paused || !active || !pageVisible) return;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  };
  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  const still = () => {
    snap();
    animate();
    draw();
  };

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    camera.aspect = w / h;
    // Portrait layouts put the copy below, so lift the platform into the upper half.
    if (camera.aspect < 0.9) camera.setViewOffset(w, h, 0, h * 0.2, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    if (!frame) draw();
  };

  const onPointer = (e) => {
    if (paused) return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVisibility = () => {
    pageVisible = !document.hidden;
    if (pageVisible) start();
    else stop();
  };
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  setTargets();
  snap();
  animate();
  resize();
  start();

  return {
    onFirstFrame(cb) {
      firstFrameCb = cb;
      if (rendered) cb();
    },
    setStage(next) {
      if (next === stage || !(String(next) in STAGE_VIEW)) return;
      stage = next;
      dive = 0;
      setTargets();
      if (paused) still();
    },
    setPaused(value) {
      paused = value;
      if (paused) {
        stop();
        pointer.x = pointer.y = pointer.tx = pointer.ty = 0;
        still();
      } else {
        start();
      }
    },
    setActive(value) {
      active = value;
      if (active) start();
      else stop();
    },
    dispose() {
      stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      instanced.forEach((m) => m.dispose());
      disposables.forEach((d) => d.dispose?.());
      composer?.dispose();
      envTarget?.dispose();
      renderer.dispose();
    },
  };
}
