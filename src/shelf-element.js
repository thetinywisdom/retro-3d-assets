// <retro-shelf>: CRTs stacked on a shelf unit full of games and books.
//
// One fixed, straight-on camera. Tap a TV to move in to it (its page becomes
// usable), tap a case or a book to slide it out and read about it. When the
// unit is taller than the element (phones), ordinary scrolling moves the
// camera down it.
//
//   <retro-shelf stack="pyramid">
//     <div slot="pvm-20m4e">page for the 20-inch</div>
//     <div slot="kv-5200">page for the 5-inch</div>
//     <retro-item type="ps1" title="My Comic" subtitle="Vol. 1" color="#e4572e" href="/comic">
//       Any HTML: this shows on the card when the case is picked.
//     </retro-item>
//   </retro-shelf>
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SonyPVMElement, STYLE as SCREEN_STYLE } from './element.js';
import { MODELS } from './models/index.js';
import { buildShelf, buildItem, ITEM_TYPES } from './props/shelf.js';
import { PROPS } from './props/consoles.js';
import { arrange } from './arrange.js';
import { makeShadowTexture } from './labels.js';
import { Sound } from './sound.js';

const TVS = ['pvm-20m4e', 'pvm-9042qm', 'kv-9pr1', 'kv-5200'];
const FRONT_Z = -14; // how far the TV fronts sit behind the shelf's front edge

// Where each set stands: x (mm from centre), on = what it sits on, ry = turn in degrees.
export const STACKS = {
  pyramid: {
    'pvm-20m4e': { x: 0 },
    'pvm-9042qm': { x: -112, on: 'pvm-20m4e' },
    'kv-9pr1': { x: 112, on: 'pvm-20m4e' },
    'kv-5200': { x: -112, on: 'pvm-9042qm' },
  },
  pile: {
    'pvm-20m4e': { x: -165, ry: 4 },
    'kv-9pr1': { x: -190, on: 'pvm-20m4e', ry: -7 },
    'pvm-9042qm': { x: 262, ry: -9 },
    'kv-5200': { x: 268, on: 'pvm-9042qm', ry: 11 },
  },
  // one tall column, biggest at the bottom
  tower: {
    'pvm-20m4e': { x: 0, ry: -3 },
    'pvm-9042qm': { x: -28, on: 'pvm-20m4e', ry: 7 },
    'kv-9pr1': { x: 14, on: 'pvm-9042qm', ry: -9 },
    'kv-5200': { x: -6, on: 'kv-9pr1', ry: 6 },
  },
  // side by side, each turned a little towards the middle
  row: {
    'kv-5200': { x: -560, ry: 16, z: 30 },
    'pvm-9042qm': { x: -330, ry: 9, z: -40 },
    'pvm-20m4e': { x: 30, ry: -2 },
    'kv-9pr1': { x: 420, ry: -13, z: 20 },
  },
  // left where they were put down: two sets on the floor, each with a smaller one perched on it
  scatter: {
    'pvm-20m4e': { x: -190, ry: 8, z: -60 },
    'pvm-9042qm': { x: -130, on: 'pvm-20m4e', ry: -12, z: -60 },
    'kv-9pr1': { x: 290, ry: -16, z: 90 },
    'kv-5200': { x: 296, on: 'kv-9pr1', ry: -4, z: 96 },
  },

};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const STYLE = /* css */ `
:host { display: block; position: relative; width: 100%; height: 100vh; height: 100dvh; }
.wall { position: absolute; inset: 0; overflow-x: hidden; overflow-y: auto; scrollbar-width: none; overscroll-behavior-y: auto;
  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }
.wall::-webkit-scrollbar { display: none; }
.wall.locked { overflow-y: hidden; touch-action: none; }
.view { position: sticky; top: 0; height: 100%; overflow: hidden; }
.grain { position: absolute; inset: 0; z-index: 2; pointer-events: none; background-size: 256px 256px; opacity: 0; }
.ui { position: absolute; inset: 0; z-index: 3; pointer-events: none; font: 500 14px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
.ui > * { pointer-events: auto; }
.ui .back { top: max(14px, env(safe-area-inset-top, 0px)); left: max(14px, env(safe-area-inset-left, 0px)); }
.fill { position: absolute; top: max(14px, env(safe-area-inset-top, 0px)); left: calc(max(14px, env(safe-area-inset-left, 0px)) + 92px); padding: 8px 14px; border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(18, 18, 18, 0.72); color: #f2f2f2; font: 500 13px/1 system-ui, sans-serif; cursor: pointer;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.fill:hover { background: rgba(40, 40, 40, 0.85); }
.fill:focus-visible, .card button:focus-visible, .card a:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 2px; }
.card { position: absolute; left: 50%; bottom: max(18px, env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); width: min(440px, calc(100% - 32px));
  box-sizing: border-box; padding: 16px 18px; border-radius: 12px; background: rgba(20, 19, 18, 0.92); color: #ece8e0;
  border: 1px solid rgba(255, 255, 255, 0.14); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  display: flex; flex-direction: column; gap: 6px; max-height: 46%; overflow-y: auto; }
.card-type { font: 600 11px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: 0.1em; text-transform: uppercase; color: #a39e93; }
.card-title { margin: 0; font-size: 20px; line-height: 1.2; }
.card-sub { margin: 0; color: #c9c4ba; }
.card-body { color: #c9c4ba; }
.card-row { display: flex; gap: 8px; margin-top: 8px; }
.card a, .card button { font: 600 13px/1 system-ui, sans-serif; padding: 10px 14px; border-radius: 8px; cursor: pointer; text-decoration: none; }
.card a { background: #ece8e0; color: #151413; border: 1px solid #ece8e0; }
.card button { background: transparent; color: #ece8e0; border: 1px solid rgba(255, 255, 255, 0.25); }
.card[hidden], .fill[hidden], .reader[hidden] { display: none; }
.reader { position: absolute; inset: 0; z-index: 6; overflow: hidden; opacity: 0; transition: opacity 0.28s ease; background: #0b0b0b; }
.reader.open { opacity: 1; }
.reader-page { position: absolute; inset: 0; overflow: auto; -webkit-overflow-scrolling: touch; user-select: text; -webkit-user-select: text; }
.reader ::slotted(*) { box-sizing: border-box; min-height: 100%; width: 100%; }
.reader ::slotted(iframe) { height: 100%; border: 0; display: block; }
.reader .reader-close { position: fixed; z-index: 2; }
@media (prefers-reduced-motion: reduce) { .reader { transition: none; } }
.ui .hint { bottom: max(14px, env(safe-area-inset-bottom, 0px)); }
.fallback { display: none; padding: 16px; color: inherit; }
:host(.nogl) .wall, :host(.nogl) .ui { display: none; }
:host(.nogl) .fallback { display: block; }
:host(.nogl) { height: auto; }
`;

/** Wispy cloud texture for the haze. */
function smokeTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const g = c.getContext('2d');
  let s = 23;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 70; i++) {
    const x = 40 + rnd() * 176, y = 40 + rnd() * 80, r = 8 + rnd() * 30;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(255,255,255,${0.04 + rnd() * rnd() * 0.3})`); grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Carpet: fully matt, with a short speckled pile that also drives a bump map. */
function carpet(color, repeat) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#8c8c8c'; g.fillRect(0, 0, 256, 256);
  let s = 5;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 22000; i++) {
    const v = 60 + Math.floor(rnd() * 170);
    g.fillStyle = `rgba(${v},${v},${v},0.55)`;
    const x = rnd() * 256, y = rnd() * 256, a = rnd() * Math.PI;
    g.fillRect(x, y, 1 + Math.abs(Math.cos(a)) * 2, 1 + Math.abs(Math.sin(a)) * 2);
  }
  const tex = (srgb) => {
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
    t.anisotropy = 8;
    return t;
  };
  return { color: new THREE.Color(color).multiplyScalar(1.15), map: tex(true), bumpMap: tex(false), bumpScale: 1.6, roughness: 1, metalness: 0 };
}

/** Near-black concrete: blotchy, with faint trowel marks, plus panel seams and tie holes on walls. */
function concrete(repeat, wall = false) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#1b1b1c'; g.fillRect(0, 0, 512, 512);
  let s = wall ? 41 : 17;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 512, y = rnd() * 512, r = 20 + rnd() * 90, v = rnd() < 0.5 ? 0 : 60;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${v},${v},${v},${0.05 + rnd() * 0.08})`); grad.addColorStop(1, `rgba(${v},${v},${v},0)`);
    g.fillStyle = grad;
    for (const [ox, oy] of [[0, 0], [512, 0], [-512, 0], [0, 512], [0, -512]]) g.fillRect(x - r + ox, y - r + oy, r * 2, r * 2);
  }
  for (let i = 0; i < 5000; i++) { const v = rnd() < 0.5 ? 0 : 90; g.fillStyle = `rgba(${v},${v},${v},${rnd() * 0.12})`; g.fillRect(rnd() * 512, rnd() * 512, 1 + rnd() * 1.5, 1 + rnd() * 1.5); }
  if (wall) {
    g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillRect(0, 0, 512, 2); g.fillRect(0, 0, 2, 512);
    g.fillStyle = 'rgba(70,70,70,0.25)'; g.fillRect(0, 2, 512, 1); g.fillRect(2, 0, 1, 512);
    for (const [x, y] of [[64, 96], [448, 96], [64, 416], [448, 416]]) { g.fillStyle = 'rgba(0,0,0,0.6)'; g.beginPath(); g.arc(x, y, 5, 0, Math.PI * 2); g.fill(); }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, wall ? repeat * (5000 / 9000) : repeat);
  t.anisotropy = 8;
  return t;
}

const Base = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};

export class RetroShelfElement extends Base {
  static get observedAttributes() { return ['stack', 'arrange', 'layout', 'brand', 'muted', 'power', 'scene', 'lighting', 'wall', 'backlight', 'consoles', 'floor', 'floor-color', 'smoke', 'grain', 'front-light', 'no-reader']; }

  constructor() {
    super();
    this._units = {};
    this._items = [];
    this._tweens = new Map();
    this._sound = new Sound();
    this._f = 0;                 // 0 = overview, 1 = at the focus pose
    this._focus = null;          // { pos, look }
    this._focusKey = null;
    this._selected = -1;
    this._par = { x: 0, y: 0 };
    this._frame = this._frame.bind(this);
    this._onKey = (e) => { if (e.key === 'Escape') (this._reading ? this.closeReader() : this._selected >= 0 ? this.close() : this.unfocus()); };
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${SCREEN_STYLE}${STYLE}</style>
      <div class="wall" part="wall"><div class="view"><div class="css"></div><canvas aria-hidden="true"></canvas><div class="grain" aria-hidden="true"></div></div><div class="spacer"></div></div>
      <div class="ui">
        <button class="back" part="back" type="button" hidden>&larr; Back</button>
        <button class="fill" part="fill" type="button" hidden>Read full screen</button>
        <div class="card" part="card" hidden>
          <span class="card-type"></span><h3 class="card-title"></h3><p class="card-sub"></p>
          <div class="card-body"><slot name="card"></slot></div>
          <div class="card-row"><a class="card-link" hidden>Open</a><button class="card-close" type="button">Put it back</button></div>
        </div>
        <div class="reader" part="reader" hidden><div class="reader-page"><slot name="reader"></slot></div>
          <button class="reader-close back" part="reader-close" type="button">&larr; Back to the TV</button></div>
        <div class="hint" part="hint">Tap a TV, a game or a book</div>
      </div>
      <div class="sr" role="group" aria-label="Shelf"></div>
      <div class="fallback"><slot name="fallback">This page needs WebGL to show the 3D shelf.</slot></div>`;
    const q = (s) => root.querySelector(s);
    this._wall = q('.wall'); this._view = q('.view'); this._cssLayer = q('.css'); this._canvas = q('canvas'); this._spacer = q('.spacer');
    this._back = q('.back'); this._readBtn = q('.fill'); this._reader = q('.reader'); this._card = q('.card'); this._hint = q('.hint'); this._sr = q('.sr');
    this._back.addEventListener('click', () => this.unfocus());
    this._readBtn.addEventListener('click', () => this.openReader());
    q('.reader-close').addEventListener('click', () => this.closeReader());
    q('.card-close').addEventListener('click', () => this.close());
    const w = this._wall;
    w.addEventListener('pointerdown', (e) => this._onDown(e));
    w.addEventListener('pointermove', (e) => this._onMove(e));
    w.addEventListener('pointerup', (e) => this._onUp(e));
    w.addEventListener('pointercancel', () => { this._releaseButton(); this._drag = null; });
    w.addEventListener('pointerleave', () => this._hover(null));
    w.addEventListener('scroll', () => { if (this._selected >= 0) this.close(); this.invalidate(); }, { passive: true });
  }

  connectedCallback() {
    if (!this._inited) { this._inited = true; this._init(); }
    if (!this._renderer) return;
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._mo = new MutationObserver(() => { clearTimeout(this._moT); this._moT = setTimeout(() => this._rebuild(), 30); });
    this._mo.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['type', 'title', 'subtitle', 'color', 'cover', 'thickness', 'height', 'binding'] });
    window.addEventListener('keydown', this._onKey);
    this._resize();
  }

  disconnectedCallback() {
    this._ro?.disconnect(); this._mo?.disconnect();
    window.removeEventListener('keydown', this._onKey);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  attributeChangedCallback(name, _o, v) {
    if (name === 'muted') this._sound.muted = v !== null;
    if (name === 'grain') this._applyGrain();
    if (!this._renderer) return;
    if (['stack', 'layout', 'arrange', 'scene', 'lighting', 'wall', 'backlight', 'consoles', 'floor', 'floor-color', 'smoke', 'front-light'].includes(name)) this._rebuild();
    if (name === 'brand') for (const u of Object.values(this._units)) u.setBrand(v);
    if (name === 'power') this._applyPowerAttr();
    if (name === 'no-reader') this._applyNoReader();
  }

  /**
   * TVs listed in no-reader="..." never open full screen and stay at TV zoom.
   * Once the camera is in on one, its screen takes clicks (so embedded players
   * work), and its channel keys switch pages even before a second page exists.
   */
  canRead(id) { return !(this.getAttribute('no-reader') || '').split(/[\s,]+/).includes(id); }

  _applyNoReader() {
    if (!this._ready) return;
    for (const [id, u] of Object.entries(this._units)) {
      u._alwaysSwitch = !this.canRead(id);
      u._applyPicture();
    }
    if (this._focusKey) this._setScreenLive(this._focusKey, true);
  }

  // ----------------------------------------------------------------- init --
  _init() {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      this.classList.add('nogl');
      return;
    }
    this._renderer = renderer;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = (this._scene = new THREE.Scene());
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.6;
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(-500, 1700, 1500);
    scene.add(key);
    this._key = key;
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.5);
    fill.position.set(700, 300, 1200);
    scene.add(fill);
    this._fill = fill;
    this._camera = new THREE.PerspectiveCamera(28, 1, 50, 30000);
    this._css = new CSS3DRenderer({ element: this._cssLayer });
    this._ray = new THREE.Raycaster();
    this._reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    this._world = new THREE.Group();
    scene.add(this._world);
    this._furniture = new THREE.Group();
    this._world.add(this._furniture);

    // the four sets, each running "hosted" inside this scene
    const host = (parent) => ({ parent, invalidate: () => this.invalidate(), sound: this._sound, reduced: this._reduced, el: this });
    for (const id of TVS) {
      const parent = new THREE.Group();
      parent.userData.unit = id;
      this._world.add(parent);
      const unit = new SonyPVMElement();
      unit.setAttribute('model', id);
      unit._attachHost(host(parent), id);
      unit._parent = parent;
      unit.addEventListener('pvm-power', () => this._syncGlow());
      for (const type of ['pvm-power', 'pvm-button', 'pvm-knob', 'pvm-input', 'pvm-degauss']) {
        unit.addEventListener(type, (e) => this.dispatchEvent(new CustomEvent(type, { detail: { ...e.detail, tv: id }, bubbles: true, composed: true })));
      }
      this._units[id] = unit;
    }
    if (this.hasAttribute('brand')) for (const u of Object.values(this._units)) u.setBrand(this.getAttribute('brand'));
    this._applyPowerAttr();
    this._ready = true;
    this._applyNoReader();
    this._applyGrain();
    this._rebuild();
    // page styles may not be applied yet on the first pass; read the glow colours again once they are
    requestAnimationFrame(() => this._buildGlow());
    window.addEventListener('load', () => this._buildGlow(), { once: true });
    this.dispatchEvent(new CustomEvent('shelf-ready', { bubbles: true, composed: true }));
  }

  _applyPowerAttr() {
    const v = this.getAttribute('power');
    const on = v === null || v === 'all' ? TVS : v.split(/[\s,]+/);
    this._sound.muted = true;
    for (const id of TVS) this._units[id].power = on.includes(id);
    this._sound.muted = this.hasAttribute('muted');
  }

  /** Still film grain over the whole view: grain, or grain="2" for heavier, grain="0.5" for lighter. */
  _applyGrain() {
    const el = this.shadowRoot.querySelector('.grain');
    if (!this.hasAttribute('grain')) { el.style.opacity = 0; return; }
    if (!el.style.backgroundImage) {
      const c = document.createElement('canvas');
      c.width = c.height = 512;
      const g = c.getContext('2d'), img = g.createImageData(512, 512);
      for (let i = 0; i < img.data.length; i += 4) {
        // bell-shaped, so most of the frame is untouched and specks are soft, like film stock
        const v = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v > 0 ? 235 : 0;
        img.data[i + 3] = Math.min(255, Math.abs(v) * 2 * 255);
      }
      g.putImageData(img, 0, 0);
      el.style.backgroundImage = `url(${c.toDataURL()})`;
    }
    el.style.opacity = Math.max(0, Math.min(1, 0.2 * (parseFloat(this.getAttribute('grain')) || 1)));
  }

  /** The <sony-pvm> instance for one set: "pvm-20m4e", "pvm-9042qm", "kv-9pr1" or "kv-5200". */
  tv(id) { return this._units[id]; }

  // --------------------------------------------------------------- layout --
  _mode() {
    const a = this.getAttribute('layout');
    if (a === 'wide' || a === 'tall') return a;
    return (this.clientWidth || 1) / (this.clientHeight || 1) < 0.9 ? 'tall' : 'wide';
  }

  _dispose(obj) {
    obj.traverse((o) => {
      o.geometry?.dispose();
      for (const m of [].concat(o.material || [])) { m.map?.dispose(); m.dispose(); }
    });
    obj.clear();
  }

  /** (Re)build the shelf, place the sets, and shelve the items. */
  _rebuild() {
    if (!this._ready) return;
    if (this._selected >= 0) this.close(true);
    this._dispose(this._furniture);
    const mode = (this._builtMode = this._mode());
    const floorOnly = this.getAttribute('scene') === 'floor';
    const mood = this.getAttribute('lighting');
    const dim = mood === 'dim', dark = mood === 'dark' || dim;   // dim = dark room with a little light left on
    // room light: normal, or nothing but the screens
    // dark room: no room light, just a faint soft lamp from the viewer's side so the buttons can be made out
    const front = this.hasAttribute('front-light') ? Math.max(0, parseFloat(this.getAttribute('front-light')) || 0) : 1;
    this._key.intensity = dim ? 0.22 : dark ? 0 : 2.1;
    this._fill.intensity = dim ? 0.3 : dark ? 0.24 * front : 0.5;
    this._fill.color.set(dark ? 0xfff1dc : 0xdfe8ff);
    this._fill.position.set(dark ? 150 : 700, dark ? 520 : 300, dark ? 1600 : 1200);
    this._scene.environmentIntensity = dim ? 0.16 : dark ? 0.014 : 0.6;
    this._room = dim ? 0.3 : dark ? 0.06 : 1;
    const spread = floorOnly && this.hasAttribute('consoles');
    this._floorPad = spread ? 330 : floorOnly ? 190 : 0;
    this._hintHome = floorOnly ? 'Tap a TV to look closer' : 'Tap a TV, a game or a book';
    this._hint.textContent = this._hintHome;
    if (!this._focusKey) this._say(this._hintHome);
    this._pitch = floorOnly ? (spread ? 0.27 : 0.12) : 0;      // look down a little at things on the floor
    // two long levels, no dividers; narrower on a tall (phone) view
    const shelf = floorOnly ? { height: 0, width: 0, depth: 520, cells: [] } : buildShelf({ cols: 1, rows: 2, cellW: mode === 'wide' ? 980 : 860 });
    if (!floorOnly) this._furniture.add(shelf.group);
    if (floorOnly || dark) {
      // a floor to catch the glow; slightly glossy so the screens smear across it
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000).rotateX(-Math.PI / 2),
        new THREE.MeshStandardMaterial(dark
          ? (this.getAttribute('floor') === 'carpet'
            ? carpet(this.getAttribute('floor-color') || '#55682f', 60000 / 300)                // matt pile, no shine
            : { color: 0x8a8a8a, map: concrete(60000 / 1400), roughness: 0.5, metalness: 0 })   // dark sealed concrete
          : { color: 0x2a2826, roughness: 0.5, metalness: 0 }));
      floor.position.set(0, -0.5, 0);
      floor.raycast = () => {};
      this._furniture.add(floor);
    }
    const back = this.getAttribute('backlight');
    if (this.hasAttribute('wall') || back !== null) {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(9000, 5000), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, map: concrete(9000 / 1400, true), roughness: 0.88 }));
      wall.position.set(0, 2500, -760);
      wall.raycast = () => {};
      this._furniture.add(wall);
    }
    if (!dark && !floorOnly) {
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(shelf.width + 260, shelf.depth + 260).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ map: makeShadowTexture(shelf.width, shelf.depth, 130), transparent: true, depthWrite: false, toneMapped: false }),
      );
      shadow.position.set(0, 0.5, -shelf.depth / 2);
      shadow.raycast = () => {};
      this._furniture.add(shadow);
    }

    // sets
    // stack="scatter tower" means scatter on wide screens, tower on tall ones
    const names = (this.getAttribute('stack') || 'pyramid').trim().split(/\s+/);
    const stack = STACKS[mode === 'tall' && names[1] ? names[1] : names[0]] || STACKS.pyramid;
    this._dark = dark;
    const baseY = {};
    let top = shelf.height, left = -shelf.width / 2, right = shelf.width / 2;
    const place = (id) => {
      if (id in baseY) return baseY[id];
      const p = stack[id], size = MODELS[id].META.size;
      const y = p.on ? place(p.on) + MODELS[p.on].META.size.h : shelf.height;
      const g = this._units[id]._parent;
      g.position.set(p.x, y, FRONT_Z - size.d / 2 + (p.z || 0));
      g.rotation.y = THREE.MathUtils.degToRad(p.ry || 0);
      g.updateMatrixWorld(true);
      top = Math.max(top, y + (id === 'kv-5200' ? 269 : size.h));
      this._units[id]._m.shadow.visible = !dark && floorOnly && !p.on;
      left = Math.min(left, p.x - size.w / 2); right = Math.max(right, p.x + size.w / 2);
      return (baseY[id] = y);
    };
    TVS.forEach(place);
    this._buildGlow();
    this._bounds = { w: Math.max(-left, right) * 2, h: top };
    if (back !== null) {
      // coloured light hidden behind the sets, washing up the wall and round their edges
      const color = new THREE.Color(back || '#10a045');
      const half = this._bounds.w / 2;
      // low and wide, so it reads as a haze at the edges of the room rather than a halo
      for (const [x, y, k] of [[-half * 1.5, 120, 1], [half * 1.5, 120, 0.8], [0, 60, 0.35]]) {
        const lamp = new THREE.PointLight(color, 150000 * k, 0, 2);
        lamp.position.set(x, y, -560);
        this._furniture.add(lamp);
      }
    }
    this._smoke = [];
    if (this.hasAttribute('smoke')) {
      // still haze: big soft sheets that pick up the backlight colour
      const tint = new THREE.Color(back || (back === '' ? '#10a045' : '#8a8f8c'));
      const strength = Math.max(0.2, Math.min(3, parseFloat(this.getAttribute('smoke')) || 1));
      const map = smokeTexture();
      const half = Math.max(this._bounds.w / 2, 500);
      let seed = 11;
      const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
      for (let i = 0; i < 14; i++) {
        const behind = i < 9, size = 900 + rnd() * 1100;
        const mat = new THREE.MeshBasicMaterial({ map, color: tint, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: (behind ? 0.13 : 0.04) * strength, toneMapped: false });
        const puff = new THREE.Mesh(new THREE.PlaneGeometry(size, size * 0.6), mat);
        puff.position.set((rnd() - 0.5) * half * 4.2, behind ? 120 + rnd() * top * 0.9 : 40 + rnd() * 160, behind ? -330 - rnd() * 380 : 140 + rnd() * 420);
        puff.rotation.z = (rnd() - 0.5) * 0.8;
        puff.raycast = () => {};
        puff.renderOrder = 5;
        // still: each sheet is posed once, at a random point of the drift it used to have
        const phase = rnd() * 6.28, sway = 90 + rnd() * 180;
        puff.position.x += Math.sin(phase) * sway;
        puff.position.y += Math.sin(phase * 2) * 30;
        puff.rotation.z += Math.sin(phase) * 0.25;
        mat.opacity *= 0.75 + 0.25 * Math.sin(phase * 3);
        this._furniture.add(puff);
        this._smoke.push(puff);
      }
    }
    if (spread) {
      // consoles lying face up on the floor in front of the sets, switched on
      const span = Math.max(this._bounds.w / 2 + 120, mode === 'tall' ? 330 : 520);
      const spots = mode === 'tall'
        ? [['ps-one', -0.5, 250, 0.2], ['dualshock', 0.42, 330, -0.5], ['gba', -0.62, 520, -0.3], ['ps-vita', 0.2, 560, 0.16], ['psp-go', 0.72, 150, 0.5]]
        : [['ps-one', -0.42, 300, 0.22], ['dualshock', -0.1, 420, -0.4], ['gba', -0.86, 430, 0.5], ['ps-vita', 0.34, 360, -0.2], ['psp-go', 0.8, 470, 0.34]];
      const LCD = { gba: 0xcfeecb, 'ps-vita': 0x8fb8ff, 'psp-go': 0xa9c6ff };
      for (const [name, fx, z, turn] of spots) {
        const obj = PROPS[name]();
        const hold = new THREE.Group();
        hold.add(obj);
        if (LCD[name]) {
          obj.rotation.x = -Math.PI / 2;                       // screen up, top edge away from the viewer
          obj.traverse((o) => { if (o.name === 'lcd') o.material = new THREE.MeshBasicMaterial({ color: LCD[name] }); });
          const glow = new THREE.PointLight(LCD[name], dark ? 15000 : 0, 0, 2);
          glow.position.set(0, 90, name === 'psp-go' ? -75 : -42);
          hold.add(glow);
        }
        hold.position.set(fx * span, 0, z);
        hold.rotation.y = turn;
        hold.traverse((o) => { o.raycast = () => {}; });
        this._furniture.add(hold);
      }
      this._bounds.w = Math.max(this._bounds.w, span * 2 + 120);
    }

    // items and consoles
    this._items = [];
    if (floorOnly) { this._buildA11y(); this._fit(); if (this._focusKey) this._aim(); return; }
    const specs = [...this.querySelectorAll('retro-item')].map((el) => ({
      el, type: (el.getAttribute('type') || 'book').toLowerCase(), title: el.getAttribute('title') || el.textContent.trim().slice(0, 40),
      subtitle: el.getAttribute('subtitle') || '', color: el.getAttribute('color') || '', cover: el.getAttribute('cover'),
      t: el.getAttribute('thickness'), h: el.getAttribute('height'), binding: el.getAttribute('binding'),
    }));
    const built = specs.map((spec) => {
      const item = buildItem(spec);
      item.userData.el = spec.el;
      return item;
    });
    for (const obj of arrange(this.getAttribute('arrange') || 'browsed', shelf.cells, built, (name) => PROPS[name]())) {
      if (obj.userData.spec) {
        obj.userData.home = { pos: obj.position.clone(), quat: obj.quaternion.clone() };
        obj.userData.item = this._items.length;
        this._items.push(obj);
        const cover = obj.userData.el.getAttribute('cover');
        if (cover) this._loadCover(obj, cover);
      }
      this._furniture.add(obj);
    }
    this._buildA11y();
    this._fit();
    if (this._focusKey) this._aim();
  }

  /** In a dark room each screen is a lamp, coloured by the page it shows. */
  _buildGlow() {
    for (const id of TVS) {
      const u = this._units[id], g = u._parent, pic = u._m.picture;
      if (u._glow) { g.remove(u._glow, u._glow.target); u._glow.dispose(); u._glow = null; }
      u._m.crtMaterial.uniforms.uRoom.value = this._room ?? 1;
      if (!this._dark) continue;
      const page = this.querySelector(`[slot="${id}"]`);
      const css = page ? getComputedStyle(page).backgroundColor : '';
      const transparent = !css || css === 'transparent' || css.endsWith(', 0)');
      const color = new THREE.Color(transparent ? '#cfe0ff' : css);
      const hsl = color.getHSL({});
      color.setHSL(hsl.h, Math.min(hsl.s, 0.8), Math.max(hsl.l, 0.55));
      // a wide soft cone thrown forwards from the tube, so a set never lights its own face
      const light = new THREE.SpotLight(color, 0, 0, 1.25, 1, 1.7);
      light.position.set(pic.cx, pic.cy, pic.z);
      light.target.position.set(pic.cx, pic.cy - 160, pic.z + 400);
      g.add(light.target);
      light.userData.full = pic.w * pic.h * (this._room > 0.1 ? 0.75 : 0.2);
      // plus a little spill in every direction, so neighbours and the set's own bezel pick up the colour
      const spill = new THREE.PointLight(color, 0, 0, 1.7);
      spill.position.set(0, 0, pic.w * 0.9);
      spill.userData.full = pic.w * pic.h * (this._room > 0.1 ? 0.05 : 0.012);
      light.add(spill);
      g.add(light);
      u._glow = light;
    }
    this._syncGlow();
  }

  _syncGlow() {
    if (!this._units) return;
    for (const u of Object.values(this._units)) if (u._glow) for (const l of [u._glow, ...u._glow.children]) l.intensity = u.power ? l.userData.full : 0;
    this.invalidate();
  }

  _loadCover(item, src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { item.userData.setCoverImage(img); this.invalidate(); };
    img.onerror = () => console.warn(`retro-shelf: could not load cover "${src}"`);
    img.src = src;
  }

  _buildA11y() {
    this._sr.textContent = '';
    const btn = (label, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); this._sr.append(b); };
    for (const id of TVS) { btn(`Look at the ${MODELS[id].META.name}`, () => this.focusTV(id)); btn(`Read the ${MODELS[id].META.name} page full screen`, () => this.openReader(id)); this._sr.append(this._units[id]._sr); }
    this._items.forEach((m, i) => btn(`${ITEM_TYPES[m.userData.spec.type].name}: ${m.userData.spec.title}`, () => this.select(i)));
  }

  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth || 1, h = this.clientHeight || 1;
    this._renderer.setSize(w, h, false);
    this._css.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    if (!this.hasAttribute('layout') && this._builtMode && this._mode() !== this._builtMode) this._rebuild();
    else this._fit();
  }

  /** Work out the overview camera: fit everything, or fit the width and scroll. */
  _fit() {
    if (!this._bounds) return;
    const cam = this._camera, vh = this.clientHeight || 1;
    const tanV = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)), tanH = tanV * cam.aspect;
    this._tan = { v: tanV, h: tanH };
    const pad = this._floorPad || 0;                    // extra floor shown below the sets
    const sw = this._bounds.w * 1.08, sh = this._bounds.h + 110 + pad;
    const dW = sw / 2 / tanH, dH = sh / 2 / tanV;
    // landscape always shows everything; portrait scrolls once fitting it all would shrink it too far
    const fitAll = cam.aspect >= 1 || dH <= dW * 1.15;
    const o = (this._over = { d: fitAll ? Math.max(dW, dH) : dW, top: this._bounds.h + 70 });
    o.viewH = 2 * o.d * tanV;
    o.range = Math.max(0, sh - o.viewH);
    o.pxPerMm = vh / o.viewH;
    this._spacer.style.height = o.range > 4 ? `${Math.round(o.range * o.pxPerMm)}px` : '0';
    if (o.range <= 4) o.top = (this._bounds.h + 30 - pad) / 2 + o.viewH / 2;
    if (this._focusKey) this._aim();
    this.invalidate();
  }

  // --------------------------------------------------------------- render --
  invalidate() {
    if (!this._raf && this._ready && this.isConnected) this._raf = requestAnimationFrame(this._frame);
  }

  _tween(key, dur, fn, done) {
    if (this._reduced || dur <= 0) { this._tweens.delete(key); fn(1); done?.(); }
    else this._tweens.set(key, { start: performance.now(), dur, fn, done });
    this.invalidate();
  }

  _frame(now) {
    this._raf = 0;
    let active = false;
    for (const [key, tw] of this._tweens) {
      const t = Math.min((now - tw.start) / tw.dur, 1);
      tw.fn(ease(t));
      if (t >= 1) { this._tweens.delete(key); tw.done?.(); } else active = true;
    }
    // overview pose: straight on, panned by the scroll position, nudged by the pointer
    const o = this._over, cam = this._camera;
    const y = o.top - o.viewH / 2 - this._wall.scrollTop / o.pxPerMm;
    const px = this._par.x * 26, py = this._par.y * 16;
    const f = this._f, F = this._focus;
    if (F && f > 0) {
      const y0 = y + py + o.d * Math.tan(this._pitch || 0);
      cam.position.set(px + (F.pos.x - px) * f, y0 + (F.pos.y - y0) * f, o.d + (F.pos.z - o.d) * f);
      cam.lookAt(px * 0.4 + (F.look.x - px * 0.4) * f, y + py * 0.4 + (F.look.y - y - py * 0.4) * f, F.look.z * f);
    } else {
      cam.position.set(px, y + py + o.d * Math.tan(this._pitch || 0), o.d);
      cam.lookAt(px * 0.4, y + py * 0.4, 0);
    }
    cam.updateMatrixWorld();
    for (const u of Object.values(this._units)) if (u._tick(now, cam)) active = true;
    this._renderer.render(this._scene, cam);
    this._css.render(this._scene, cam);
    if (active) this.invalidate();
  }

  // ---------------------------------------------------------------- focus --
  /** Point the focus pose at the current set: its whole front, or just its picture. */
  _aim() {
    const u = this._units[this._focusKey], g = u._parent, size = u._meta.size, pic = u._m.picture;
    const centre = this._fillScreen ? new THREE.Vector3(pic.cx, pic.cy, pic.z) : new THREE.Vector3(0, size.h / 2, size.d / 2);
    const w = this._fillScreen ? pic.w : size.w, h = this._fillScreen ? pic.h : size.h;
    const m = this._fillScreen ? 1.04 : 1.12;
    const dist = Math.max((h / 2) * m / this._tan.v, (w / 2) * m / this._tan.h);
    const look = g.localToWorld(centre.clone());
    const pos = g.localToWorld(centre.clone().add(new THREE.Vector3(0, 0, dist)));
    this._focus = { pos, look };
    this.invalidate();
  }

  /** Move the camera in to one set. Its page becomes usable. */
  focusTV(id) {
    if (!this._units[id] || !this._ready) return;
    if (this._selected >= 0) this.close(true);
    const from = this._focus && this._f > 0 ? { pos: this._focus.pos.clone(), look: this._focus.look.clone() } : null;
    if (this._focusKey) this._setScreenLive(this._focusKey, false);
    this._focusKey = id;
    this._aim();
    const to = this._focus, f0 = this._f;
    if (from) {
      // glide from one set to the next
      const tmp = { pos: from.pos.clone(), look: from.look.clone() };
      this._focus = tmp;
      this._tween('focus', 650, (t) => { tmp.pos.lerpVectors(from.pos, to.pos, t); tmp.look.lerpVectors(from.look, to.look, t); this._f = f0 + (1 - f0) * t; }, () => { this._focus = to; });
    } else {
      this._tween('focus', 850, (t) => { this._f = f0 + (1 - f0) * t; });
    }
    this._setScreenLive(id, true);
    this._wall.classList.add('locked');
    this._back.hidden = false; this._readBtn.hidden = !this.canRead(id);
    // say what the next tap does, briefly
    this._hint.textContent = this.canRead(id) ? 'Tap the screen to read it full screen' : 'Press a channel key on the set';
    this._say(this._hint.textContent);
    this._hint.classList.remove('gone');
    clearTimeout(this._hintT);
    this._hintT = setTimeout(() => this._hint.classList.add('gone'), 3200);
    this.dispatchEvent(new CustomEvent('shelf-focus', { detail: { tv: id }, bubbles: true, composed: true }));
  }

  /** Back to the whole shelf. */
  unfocus() {
    if (!this._focusKey) return;
    if (this._reading) this.closeReader();
    this._setScreenLive(this._focusKey, false);
    this._focusKey = null;
    const f0 = this._f;
    this._tween('focus', 750, (t) => { this._f = f0 * (1 - t); });
    this._wall.classList.remove('locked');
    this._back.hidden = true; this._readBtn.hidden = true;
    clearTimeout(this._hintT);
    this._hint.classList.add('gone');
    this._setFill(false, true);
    this._say(this._hintHome);
    this.dispatchEvent(new CustomEvent('shelf-focus', { detail: { tv: null }, bubbles: true, composed: true }));
  }

  _setScreenLive(id, live) {
    const u = this._units[id];
    u.state.focused = live;
    u._m.crtMaterial.uniforms.uGlare.value = live ? 0.35 : 1;
    u._screenEl.style.pointerEvents = live && !this.canRead(id) ? 'auto' : 'none';
    this.invalidate();
  }

  _setFill(on, quiet = false) {
    this._fillScreen = on;
    if (quiet || !this._focusKey) return;
    const from = { pos: this._focus.pos.clone(), look: this._focus.look.clone() };
    this._aim();
    const to = this._focus, tmp = { pos: from.pos.clone(), look: from.look.clone() };
    this._focus = tmp;
    const f0 = this._f;
    this._tween('focus', 500, (t) => { tmp.pos.lerpVectors(from.pos, to.pos, t); tmp.look.lerpVectors(from.look, to.look, t); this._f = f0 + (1 - f0) * t; }, () => { this._focus = to; });
  }

  // --------------------------------------------------------------- reader --
  /**
   * Show the focused TV's page full screen, as ordinary readable page content.
   * The page element is moved from the TV's slot to the reader's, so it is the
   * same element (state, scroll position and any running media are kept).
   */
  openReader(id = this._focusKey) {
    if (!id || this._reading?.id === id || !this.canRead(id)) return;
    const page = this.querySelector(`[slot="${id}"]`);
    if (!page) return;
    if (this._reading) {
      // already reading another page: swap the pages in place, the camera follows behind
      const r = this._reading;
      clearTimeout(this._readT);
      r.page.setAttribute('slot', r.id);
      this.dispatchEvent(new CustomEvent('shelf-read', { detail: { tv: r.id, open: false }, bubbles: true, composed: true }));
      this._reading = null;
      this.focusTV(id);
      this._reading = { id, page };
      this._paintReader(page);
      page.setAttribute('slot', 'reader');
      this._reader.querySelector('.reader-page').scrollTop = 0;
      this._say('Reading. Press Esc or Back to return');
      this.dispatchEvent(new CustomEvent('shelf-read', { detail: { tv: id, open: true }, bubbles: true, composed: true }));
      return;
    }
    if (id !== this._focusKey) this.focusTV(id);
    this._reading = { id, page };
    this._paintReader(page);
    this._reader.hidden = false;
    this._setFill(true);                                        // push the camera in to the glass as the page fades up
    requestAnimationFrame(() => this._reader.classList.add('open'));
    clearTimeout(this._readT);
    this._readT = setTimeout(() => {
      page.setAttribute('slot', 'reader');
      this._reader.querySelector('.reader-page').scrollTop = 0;
      this._reader.querySelector('.reader-close').focus({ preventScroll: true });
    }, this._reduced ? 0 : 260);
    this._back.hidden = true; this._readBtn.hidden = true;
    this._hint.classList.add('gone');
    this._say('Reading. Press Esc or Back to return');
    this.dispatchEvent(new CustomEvent('shelf-read', { detail: { tv: id, open: true }, bubbles: true, composed: true }));
  }

  _paintReader(page) {
    const bg = getComputedStyle(page).backgroundColor;
    this._reader.style.background = bg && !bg.endsWith(', 0)') && bg !== 'transparent' ? bg : '#0b0b0b';
  }

  /** What the next tap does, in a few words (the same text as the hint). */
  get hint() { return this._hintNow || ''; }

  _say(text) {
    if (text === this._hintNow) return;
    this._hintNow = text;
    this.dispatchEvent(new CustomEvent('shelf-hint', { detail: { text }, bubbles: true, composed: true }));
  }

  /** The page element shown on a TV, wherever it currently is. */
  page(id) { return this._reading?.id === id ? this._reading.page : this.querySelector(`[slot="${id}"]`); }

  /** Close the full-screen page and return to the TV. */
  closeReader() {
    const r = this._reading;
    if (!r) return;
    this._reading = null;
    clearTimeout(this._readT);
    r.page.setAttribute('slot', r.id);
    this._reader.classList.remove('open');
    this._readT = setTimeout(() => { this._reader.hidden = true; }, this._reduced ? 0 : 300);
    if (this._focusKey) { this._setFill(false); this._back.hidden = false; this._readBtn.hidden = !this.canRead(this._focusKey); this._say(this.canRead(this._focusKey) ? 'Tap the screen to read it full screen' : 'Press a channel key on the set'); }
    this.dispatchEvent(new CustomEvent('shelf-read', { detail: { tv: r.id, open: false }, bubbles: true, composed: true }));
  }

  // ---------------------------------------------------------------- items --
  /** Slide an item out and show its card. Accepts an index or the <retro-item> element. */
  select(which) {
    const i = typeof which === 'number' ? which : this._items.findIndex((m) => m.userData.el === which);
    const mesh = this._items[i];
    if (!mesh || i === this._selected) return;
    if (this._focusKey) this.unfocus();
    if (this._selected >= 0) this.close(true);
    this._selected = i;
    const sp = mesh.userData.spec, cam = this._camera, o = this._over;
    mesh.userData.ensureCover();
    this._sound.click(0.5, 1500);
    // a spot in front of the camera, upper part of the view (the card sits below)
    const dist = Math.min(o.d - 120, Math.max(sp.h / (2 * this._tan.v * 0.42), (sp.d + 30) / (2 * this._tan.h * 0.6)));
    const to = new THREE.Vector3(cam.position.x, cam.position.y + dist * this._tan.v * 0.3, cam.position.z - dist);
    const home = mesh.userData.home;
    const mid = home.pos.clone(); mid.z = 70 + sp.d / 2;
    const facing = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2 + 0.32);
    this._tween('item' + i, 620, (t) => {
      const a = Math.min(t / 0.35, 1), b = Math.max((t - 0.25) / 0.75, 0);
      mesh.position.lerpVectors(home.pos, mid, a).lerp(to, b);
      mesh.quaternion.slerpQuaternions(home.quat, facing, b);
    });
    const el = mesh.userData.el, q = (s) => this._card.querySelector(s);
    for (const other of this.querySelectorAll('retro-item[slot="card"]')) other.removeAttribute('slot');
    el.setAttribute('slot', 'card');
    q('.card-type').textContent = ITEM_TYPES[sp.type].name;
    q('.card-title').textContent = sp.title;
    q('.card-sub').textContent = sp.subtitle; q('.card-sub').hidden = !sp.subtitle;
    const link = q('.card-link'), href = el.getAttribute('href');
    link.hidden = !href;
    if (href) { link.href = href; link.textContent = el.getAttribute('link-text') || 'Open'; }
    this._card.hidden = false;
    this._hint.classList.add('gone');
    this.dispatchEvent(new CustomEvent('shelf-select', { detail: { item: el, index: i }, bubbles: true, composed: true }));
  }

  /** Put the selected item back. */
  close(instant = false) {
    const i = this._selected, mesh = this._items[i];
    if (!mesh) return;
    this._selected = -1;
    this._card.hidden = true;
    mesh.userData.el?.removeAttribute('slot');
    const from = mesh.position.clone(), q0 = mesh.quaternion.clone(), home = mesh.userData.home;
    const back = (t) => { mesh.position.lerpVectors(from, home.pos, t); mesh.quaternion.slerpQuaternions(q0, home.quat, t); };
    if (instant) { this._tweens.delete('item' + i); back(1); this.invalidate(); } else this._tween('item' + i, 420, back);
    this.dispatchEvent(new CustomEvent('shelf-select', { detail: { item: null, index: -1 }, bubbles: true, composed: true }));
  }

  // -------------------------------------------------------------- pointer --
  _pick(e) {
    const r = this._view.getBoundingClientRect();
    this._ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), this._camera);
    const hit = this._ray.intersectObject(this._world, true)[0];
    if (!hit) return {};
    const out = { control: hit.object.userData.control || null, screen: !!hit.object.userData.screen };
    for (let o = hit.object; o; o = o.parent) {
      if (o.userData.item !== undefined) out.item = o.userData.item;
      if (o.userData.unit) out.unit = o.userData.unit;
    }
    return out;
  }

  /** Pointer over the picture of a no-reader TV the camera is in on: let the page have it. */
  _inLiveScreen(e) {
    const id = this._focusKey;
    return !!id && !this.canRead(id) && e.composedPath().includes(this._units[id]._screenEl);
  }

  _onDown(e) {
    if (!this._ready || e.button > 0 || this._inLiveScreen(e)) return;
    const hit = this._pick(e);
    this._drag = { x: e.clientX, y: e.clientY, moved: 0, hit };
    const unit = hit.unit && this._units[hit.unit];
    const c = hit.control && unit?._m.controls[hit.control];
    if (!c) return;
    if (c.kind === 'button') {
      this._drag.button = { unit, id: c.id };
      unit._buttonDown(c.id);
    } else if (this._focusKey === hit.unit || e.pointerType === 'mouse') {
      e.preventDefault();
      try { this._wall.setPointerCapture(e.pointerId); } catch {}
      this._drag.knob = { unit, id: c.id, v: unit.getKnob(c.id) };
    }
  }

  _onMove(e) {
    const d = this._drag;
    if (d?.knob) { d.knob.unit.setKnob(d.knob.id, d.knob.v + ((e.clientX - d.x) - (e.clientY - d.y)) * 0.005); return; }
    if (d) d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.x, e.clientY - d.y));
    if (e.pointerType !== 'mouse' || !this._ready) return;
    const r = this._view.getBoundingClientRect();
    this._par.x = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    this._par.y = -clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    if (!d && !this._inLiveScreen(e)) {
      const h = this._pick(e);
      this._wall.style.cursor = h.control || h.item !== undefined || (h.unit && h.unit !== this._focusKey) ? 'pointer' : h.screen ? 'zoom-in' : '';
      this._hover(h.unit || null);
    }
    this.invalidate();
  }

  _hover(tv) {
    if (tv === this._hovered) return;
    this._hovered = tv;
    this.dispatchEvent(new CustomEvent('shelf-hover', { detail: { tv }, bubbles: true, composed: true }));
  }

  _releaseButton() {
    const b = this._drag?.button;
    if (b) b.unit._buttonUp(b.id);
  }

  _onUp(e) {
    const d = this._drag;
    this._drag = null;
    if (!d) return;
    if (d.button) { d.button.unit._buttonUp(d.button.id); return; }
    if (d.knob || d.moved > 8) return;
    const h = d.hit;
    if (this._selected >= 0) { if (h.item === this._selected) return; this.close(); if (h.item === undefined) return; }
    if (h.item !== undefined) this.select(h.item);
    else if (h.unit) {
      // first tap moves in to the set; a tap on its screen then opens the page full screen
      if (h.unit !== this._focusKey) this.focusTV(h.unit);
      else if (h.screen) this.openReader();
    }
    else if (this._focusKey) this.unfocus();
  }
}
