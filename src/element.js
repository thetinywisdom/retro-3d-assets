// <sony-pvm> custom element.
//
// Layering inside the shadow root (back to front):
//   1. .css   – CSS3DRenderer layer. Holds the real HTML "picture", transformed
//               so it sits exactly on the tube's picture plane.
//   2. canvas – WebGL. Draws the monitor; the CRT glass material leaves a
//               see-through window over the HTML and adds the tube look.
// The canvas never takes pointer events. Everything is handled on the stage
// by ray-casting, so once the screen is "focused" the HTML underneath is
// directly clickable / scrollable like any other page content.
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MODELS, DEFAULT_MODEL } from './models/index.js';
import { makeTallyTexture, makeBrandTexture } from './labels.js';
import { Sound } from './sound.js';

const KNOB_SWEEP = THREE.MathUtils.degToRad(150);

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const linear = (t) => t;

// ---------------------------------------------------------------------------
// YouTube players on a channel follow the set's volume and mute.
// Talks to the player through its postMessage interface (the embed URL needs
// enablejsapi=1). A player asked to start with sound that the browser keeps
// silent is started muted instead, and unmuted on the visitor's next click or
// key press.
// ---------------------------------------------------------------------------
const YT = /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\//;
const isYouTube = (f) => YT.test(f.getAttribute('src') || f.dataset.held || '');
const players = new Set();
const ytPost = (f, msg) => { try { f.contentWindow?.postMessage(JSON.stringify(msg), '*'); } catch {} };
const ytCmd = (f, func, args = []) => ytPost(f, { event: 'command', func, args });

function ytLevel(f, vol, quiet) {
  const y = f._yt;
  if (!y) return;
  y.vol = vol; y.quiet = quiet;
  if (quiet || vol <= 0) ytCmd(f, 'mute');
  else if (!y.blocked) { ytCmd(f, 'unMute'); ytCmd(f, 'setVolume', [Math.round(vol * 100)]); }
}

function ytWire(f, level) {
  if (f._yt) return;
  f._yt = { state: -1, level };
  players.add(f);
  f.addEventListener('load', () => {
    if (!YT.test(f.src)) return;
    const y = f._yt;
    y.state = -1; y.blocked = false;
    clearTimeout(y.t);
    for (const t of [250, 900, 2000]) {
      setTimeout(() => {
        ytPost(f, { event: 'listening', id: 1, channel: 'widget' });
        const { vol, quiet, standby } = y.level();
        if (standby || y.playing === false) ytCmd(f, 'pauseVideo');   // in standby, or its channel already left: wait
        else ytLevel(f, vol, quiet);
      }, t);
    }
    // the browser refused to start it with sound: play it muted until the visitor does something
    y.t = setTimeout(() => {
      const { vol, quiet, standby } = y.level();
      if (!standby && y.playing !== false && y.state !== 1 && !quiet && vol > 0) { y.blocked = true; ytCmd(f, 'mute'); ytCmd(f, 'playVideo'); }   // not one that is meant to be paused
    }, 3200);
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('message', (e) => {
    if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
    let d;
    try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    const state = d?.info?.playerState;
    if (state === undefined) return;
    for (const f of players) if (f.contentWindow === e.source && f._yt) f._yt.state = state;
  });
  const wake = () => {
    for (const f of players) {
      const y = f._yt;
      if (!y?.blocked || !f.isConnected || !YT.test(f.src)) continue;
      y.blocked = false;
      const { vol, quiet } = y.level();
      ytLevel(f, vol, quiet);
    }
  };
  window.addEventListener('pointerdown', wake, true);
  window.addEventListener('keydown', wake, true);
}

export const STYLE = /* css */ `
:host { display: block; position: relative; width: 100%; height: 480px; }
:host([hidden]) { display: none; }
.stage { position: absolute; inset: 0; overflow: hidden; touch-action: pan-y; cursor: grab;
  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }
.stage.dragging { cursor: grabbing; }
.css { position: absolute; inset: 0; z-index: 0; }
canvas { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; display: block; pointer-events: none; }

.screen { width: 640px; height: 480px; background: #000; overflow: hidden; color: #e9e9e4;
  font: 16px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; text-align: left; }
.beam, .roll, .raster, .picture { position: absolute; inset: 0; }
.beam { opacity: 0; }
.beam.on { opacity: 1; animation: pvm-on 0.95s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.beam.off { animation: pvm-off 0.5s ease-in both; }
.beam.instant { animation-duration: 1ms; }
@keyframes pvm-on {
  0% { opacity: 0; transform: scale(1, 0.004); filter: brightness(6); }
  20% { opacity: 1; transform: scale(1, 0.004); filter: brightness(6); }
  55% { transform: scale(1, 1); filter: brightness(2.2); }
  100% { opacity: 1; transform: none; filter: none; }
}
@keyframes pvm-off {
  0% { opacity: 1; transform: none; filter: none; }
  45% { opacity: 1; transform: scale(1, 0.004); filter: brightness(8); }
  85% { opacity: 1; transform: scale(0.004, 0.004); filter: brightness(12); }
  100% { opacity: 0; transform: scale(0.004, 0.004); }
}
.roll.rolling { animation: pvm-roll 1.25s linear infinite; }
@keyframes pvm-roll {
  from { transform: translateY(-100%) skewX(-3deg); }
  to { transform: translateY(100%) skewX(-3deg); }
}
.raster { transition: transform 0.22s ease-out; overflow: hidden; }
.picture { background: #000; overflow: hidden; }
.input { position: absolute; inset: 0; overflow: auto; display: none; }
.input.active { display: block; }
.input iframe { width: 100%; height: 100%; border: 0; background: #fff; display: block; }
.blue { position: absolute; inset: 0; background: #00f; mix-blend-mode: multiply; pointer-events: none; display: none; }
.screen.blue-only .blue { display: block; }

.noise { position: absolute; inset: -64px; display: none; background-size: 192px 192px; image-rendering: pixelated; animation: pvm-noise 0.32s steps(4) infinite; }
.noise.active { display: block; }
@keyframes pvm-noise { 0% { transform: translate(0, 0); } 25% { transform: translate(-37px, 23px); } 50% { transform: translate(29px, -41px); } 75% { transform: translate(-19px, -13px); } 100% { transform: translate(0, 0); } }
.bars { position: absolute; inset: 0; display: none; flex-direction: column; }
.bars.active { display: flex; }
.bars i { display: block; }
.bars i:nth-child(1) { flex: 67; background: linear-gradient(90deg, #c0c0c0 0 14.286%, #c0c000 0 28.571%, #00c0c0 0 42.857%, #00c000 0 57.143%, #c000c0 0 71.429%, #c00000 0 85.714%, #0000c0 0); }
.bars i:nth-child(2) { flex: 8; background: linear-gradient(90deg, #0000c0 0 14.286%, #131313 0 28.571%, #c000c0 0 42.857%, #131313 0 57.143%, #00c0c0 0 71.429%, #131313 0 85.714%, #c0c0c0 0); }
.bars i:nth-child(3) { flex: 25; background: linear-gradient(90deg, #00214c 0 17.86%, #fff 0 35.71%, #32006a 0 53.57%, #131313 0 71.43%, #090909 0 76.19%, #131313 0 80.95%, #1d1d1d 0 85.71%, #131313 0); }
.bars b { position: absolute; left: 50%; top: 36%; transform: translate(-50%, -50%); background: #000; color: #f2f2f2;
  font: 600 22px/1 ui-monospace, "SF Mono", Menlo, Consolas, monospace; letter-spacing: 0.12em; padding: 10px 16px; }

.back { position: absolute; z-index: 3; top: 14px; left: 14px; padding: 8px 14px; border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(18, 18, 18, 0.72); color: #f2f2f2;
  font: 500 13px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; cursor: pointer;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.back:hover { background: rgba(40, 40, 40, 0.85); }
.back:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 2px; }
.back[hidden] { display: none; }
.hint { position: absolute; z-index: 2; left: 50%; bottom: 14px; transform: translateX(-50%); padding: 7px 13px;
  border-radius: 999px; background: rgba(18, 18, 18, 0.6); color: #ededed; white-space: nowrap; pointer-events: none;
  font: 500 12px/1 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; transition: opacity 0.5s; }
.hint.gone, :host([no-hint]) .hint { opacity: 0; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* no-WebGL fallback: just show the content in a plain frame */
.stage.nogl { cursor: default; display: grid; place-items: center; }
.stage.nogl canvas, .stage.nogl .hint, .stage.nogl .css { display: none; }
.stage.nogl .screen { position: relative; max-width: 100%; border: 14px solid #62605c; border-radius: 10px; box-sizing: content-box; }
@media (prefers-reduced-motion: reduce) {
  .beam.on, .beam.off { animation-duration: 1ms; }
  .roll.rolling, .noise { animation: none; }
  .raster { transition: none; }
}
`;

const Base = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};

let noiseUrl = null;
function noiseTile() {
  if (noiseUrl) return noiseUrl;
  const c = document.createElement('canvas');
  c.width = c.height = 96;
  const g = c.getContext('2d'), img = g.createImageData(96, 96);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = v * 0.92; img.data[i + 1] = v * 0.97; img.data[i + 2] = Math.min(255, v * 1.08); img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return (noiseUrl = c.toDataURL());
}

export class SonyPVMElement extends Base {
  static get observedAttributes() {
    return ['model', 'power', 'muted', 'src', 'resolution', 'tally', 'tally-logo', 'brand', 'brand-logo', 'auto-rotate', 'effects', 'view'];
  }

  constructor() {
    super();
    this.state = { power: false, focused: false, buttons: {}, values: {}, radio: {} };
    this._modelId = DEFAULT_MODEL;
    this._meta = MODELS[DEFAULT_MODEL].META;
    this._ctl = {};
    this._sound = new Sound();
    this._tweens = new Map();
    this._pointers = new Map();
    this._res = [640, 480];
    this._focusF = 0;
    this._orbit = {
      goal: { az: 0.42, pol: 1.36, zoom: 1 },
      cur: { az: 0.42, pol: 1.36, zoom: 1 },
    };
    this._home = { az: 0.42, pol: 1.36, zoom: 1 };
    this._frame = this._frame.bind(this);
    this._onKey = this._onKey.bind(this);
    this._buildDom();
  }

  // ------------------------------------------------------------------ DOM --
  _buildDom() {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${STYLE}</style>
      <div class="stage" part="stage">
        <div class="css"></div>
        <canvas aria-hidden="true"></canvas>
        <button class="back" part="back" type="button" hidden>&larr; Back</button>
        <div class="hint" part="hint">Drag to look around &middot; click the screen to zoom in</div>
        <div class="sr" role="group" aria-label="Sony PVM-9042QM monitor controls"></div>
      </div>`;
    this._stage = root.querySelector('.stage');
    this._cssLayer = root.querySelector('.css');
    this._canvas = root.querySelector('canvas');
    this._back = root.querySelector('.back');
    this._hint = root.querySelector('.hint');
    this._sr = root.querySelector('.sr');

    const screen = document.createElement('div');
    screen.className = 'screen';
    screen.setAttribute('part', 'screen');
    screen.innerHTML = `<div class="beam"><div class="roll"><div class="raster">
        <div class="picture">
          <div class="inputs"></div>
          <div class="noise" aria-hidden="true"></div>
          <div class="bars" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
        </div>
        <div class="blue"></div>
      </div></div></div>`;
    this._screenEl = screen;
    this._beam = screen.querySelector('.beam');
    this._roll = screen.querySelector('.roll');
    this._raster = screen.querySelector('.raster');
    this._picture = screen.querySelector('.picture');
    this._bars = screen.querySelector('.bars');
    this._noise = screen.querySelector('.noise');
    this._inputsEl = screen.querySelector('.inputs');
    this._inputs = {};
    this._a11y = {};
    this._resetState();

    this._back.addEventListener('click', () => this.unfocus());
    const st = this._stage;
    st.addEventListener('pointerdown', (e) => this._onDown(e));
    st.addEventListener('pointermove', (e) => this._onMove(e));
    st.addEventListener('pointerup', (e) => this._onUp(e));
    st.addEventListener('pointercancel', (e) => this._onUp(e, true));
    st.addEventListener('pointerleave', () => { if (!this._drag) this._setHover(null); });
    st.addEventListener('wheel', (e) => this._onWheel(e), { passive: false });
  }

  connectedCallback() {
    if (!this._inited) {
      this._inited = true;
      this._init();
    }
    if (this._renderer) {
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
      this._io = new IntersectionObserver((en) => {
        this._visible = en[en.length - 1].isIntersecting;
        if (this._visible) this.invalidate();
      });
      this._io.observe(this);
      this._resize();
    }
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._io?.disconnect();
    window.removeEventListener('keydown', this._onKey);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  attributeChangedCallback(name, _old, value) {
    if (this._reflecting) return;
    switch (name) {
      case 'model': this._setModel(value); break;
      case 'brand': this.setBrand(value); break;
      case 'brand-logo': this.setBrandLogo(value); break;
      case 'power': this.power = value !== null && value !== 'off' && value !== 'false'; break;
      case 'muted': this._sound.muted = value !== null; break;
      case 'src': this._setSrc(value); break;
      case 'resolution': this._setResolution(value); break;
      case 'tally': this.setTally(value); break;
      case 'tally-logo': this.setTallyLogo(value); break;
      case 'auto-rotate': this._autoRotate = value !== null; this.invalidate(); break;
      case 'effects': if (this._m) { this._m.crtMaterial.uniforms.uFx.value = value === 'off' ? 0 : 1; this.invalidate(); } break;
      case 'view': this._setViewPreset(value); break;
    }
  }

  // ----------------------------------------------------------------- init --
  _init() {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      this._fallback();
      return;
    }
    this._renderer = renderer;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = (this._scene = new THREE.Scene());
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.6;
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(-320, 520, 460);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.35);
    fill.position.set(420, 180, 300);
    scene.add(fill);

    this._camera = new THREE.PerspectiveCamera(28, 1, 10, 12000);
    this._css = new CSS3DRenderer({ element: this._cssLayer });
    this._screenObj = new CSS3DObject(this._screenEl);
    this._screenEl.style.userSelect = 'auto';
    this._screenEl.style.webkitUserSelect = 'auto';
    this._screenEl.style.pointerEvents = 'none';
    this._ray = new THREE.Raycaster();
    this._ndc = new THREE.Vector2();
    this._reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    this._visible = true;
    this._mountModel();
    this._ready = true;
    this._applyPicture();
    this._applyPower(true);
    this.dispatchEvent(new CustomEvent('pvm-ready', { bubbles: true, composed: true }));
  }

  // ---------------------------------------------------------------- model --
  /** Reset control state and rebuild the slots + accessible controls for the current model. */
  _resetState() {
    const meta = this._meta;
    this._ctl = Object.fromEntries(meta.controls.map((c) => [c.id, c]));
    this._roleId = {};
    const st = this.state;
    st.buttons = {}; st.values = {}; st.radio = {};
    for (const c of meta.controls) {
      if (c.role && !(c.role in this._roleId)) this._roleId[c.role] = c.id;
      if (c.kind === 'button' && c.latch) st.buttons[c.id] = false;
      if (c.kind !== 'button') st.values[c.role] = c.value ?? 0.5;
      if (c.radio && (c.selected || !(c.radio in st.radio))) st.radio[c.radio] = c.id;
    }
    for (const [role, v] of Object.entries(meta.values || {})) st.values[role] ??= v;
    this._lastInput = meta.inputOf(st);

    // one slot per input; the first input takes the element's plain children
    this._inputsEl.textContent = '';
    this._inputs = {};
    meta.inputs.forEach((id, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'input';
      wrap.dataset.input = id;
      const slot = document.createElement('slot');
      const pre = this._slotPrefix;
      if (pre) slot.name = i > 0 ? `${pre}:${id}` : pre;
      else if (i > 0) slot.name = id;
      slot.addEventListener('slotchange', () => this._applyPicture());
      wrap.append(slot);
      this._inputsEl.append(wrap);
      this._inputs[id] = wrap;
    });
    const src = this.getAttribute('src');
    if (src) this._setSrc(src, true);

    // real, focusable controls for keyboard and screen-reader users
    this._sr.textContent = '';
    this._sr.setAttribute('aria-label', `${meta.name} controls`);
    this._a11y = {};
    const mk = (tag, attrs) => Object.assign(document.createElement(tag), attrs);
    for (const c of meta.controls) {
      let el;
      if (c.kind === 'button') {
        el = mk('button', { type: 'button', textContent: c.label });
        if (c.latch || c.radio || c.role === 'power') el.setAttribute('aria-pressed', 'false');
        el.addEventListener('click', () => this.press(c.id));
      } else {
        el = mk('input', { type: 'range', min: 0, max: 100, step: 1, value: Math.round(st.values[c.role] * 100) });
        el.setAttribute('aria-label', c.label);
        el.addEventListener('input', () => this.setKnob(c.id, el.value / 100));
      }
      el.addEventListener('focus', () => this._highlight(c.id, true));
      el.addEventListener('blur', () => this._highlight(c.id, false));
      this._sr.append(el);
      this._a11y[c.id] = el;
    }
    const zoom = mk('button', { type: 'button', textContent: 'Zoom in to the screen' });
    zoom.addEventListener('click', () => (this.state.focused ? this.unfocus() : this.focusScreen()));
    this._sr.append(zoom);
  }

  _mountModel() {
    if (this._m) {
      this._m.root.remove(this._screenObj);
      this._scene.remove(this._m.root);
      this._m.root.traverse((o) => {
        o.geometry?.dispose();
        for (const mat of [].concat(o.material || [])) { mat.map?.dispose(); mat.dispose(); }
      });
    }
    this._tweens.clear();
    this._hoverId = null;
    this._m = MODELS[this._modelId].build();
    this._scene.add(this._m.root);
    const pic = this._m.picture;
    this._screenObj.position.set(pic.cx, pic.cy, pic.z);
    this._m.root.add(this._screenObj);
    this._applyResolution();
    const u = this._m.crtMaterial.uniforms;
    u.uFx.value = this.getAttribute('effects') === 'off' ? 0 : 1;
    u.uOn.value = this.state.power ? 1 : 0;
    if (this.hasAttribute('tally')) this.setTally(this.getAttribute('tally'));
    if (this._logoSrc !== undefined) this.setTallyLogo(this._logoSrc);
    if (this._brandSrc !== undefined) this.setBrandLogo(this._brandSrc);
    else if (this._brandText !== undefined) this.setBrand(this._brandText);
    for (const c of this._meta.controls) {
      if (c.kind === 'button') this._poseButton(c.id, this._buttonRest(c.id), 0); else this._poseValue(c.id);
    }
    this._syncLamps();
    if (this._host) { if (this._m.shadow) this._m.shadow.visible = false; } else if (this.isConnected) this._resize();
  }

  /** Swap to another model ("pvm-9042qm", "pvm-20m4e", "kv-5200", "kv-9pr1"). */
  _setModel(name) {
    const id = name && MODELS[name.toLowerCase()] ? name.toLowerCase() : DEFAULT_MODEL;
    if (name && !MODELS[name.toLowerCase()]) console.warn(`sony-pvm: unknown model "${name}". Available: ${Object.keys(MODELS).join(', ')}`);
    if (id === this._modelId) return;
    const wasOn = this.state.power;
    if (this.state.focused) this.unfocus();
    this._focusF = 0;
    this._modelId = id;
    this._meta = MODELS[id].META;
    this._resetState();
    if (this._renderer) {
      this._mountModel();
      this.state.power = wasOn;
      this._applyPower(true);
    }
    this._applyPicture();
  }

  get model() { return this._modelId; }
  set model(v) { this.setAttribute('model', v); }

  _fallback() {
    this._stage.classList.add('nogl');
    this._stage.append(this._screenEl);
    this.state.power = true;
    this._beam.className = 'beam on instant';
    this._applyPicture();
  }

  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth || 1, h = this.clientHeight || 1;
    this._renderer.setSize(w, h, false);
    this._css.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    const tanV = Math.tan(THREE.MathUtils.degToRad(this._camera.fov / 2));
    const tanH = tanV * this._camera.aspect;
    const { w: sw, h: sh, d: sd } = this._meta.size, pic = this._m.picture;
    this._baseDist = 0.455 * Math.hypot(sw, sh, sd) / Math.min(tanV, tanH);
    const m = 1.035;
    this._focusDist = Math.max((pic.h / 2) * m / tanV, (pic.w / 2) * m / tanH);
    this.invalidate();
  }

  // --------------------------------------------------------------- render --
  /** Ask for a redraw. The scene only renders when something changed. */
  invalidate() {
    if (this._host) { this._host.invalidate(); return; }
    if (!this._raf && this._ready && this.isConnected) this._raf = requestAnimationFrame(this._frame);
  }

  _tween(key, from, to, dur, fn, { ease = easeOut, delay = 0, done } = {}) {
    if (dur <= 0 && delay <= 0) {
      this._tweens.delete(key);
      fn(to);
      done?.();
    } else {
      this._tweens.set(key, { start: performance.now() + delay, from, to, dur: Math.max(dur, 1), fn, ease, done });
    }
    this.invalidate();
  }

  _runTweens(now) {
    let active = false;
    for (const [key, tw] of this._tweens) {
      const t = (now - tw.start) / tw.dur;
      if (t < 0) { active = true; continue; }
      tw.fn(tw.from + (tw.to - tw.from) * tw.ease(Math.min(t, 1)));
      if (t >= 1) { this._tweens.delete(key); tw.done?.(); } else active = true;
    }
    return active;
  }

  // ------------------------------------------------------------ hosted mode --
  /**
   * Run this set inside another element's scene instead of its own canvas
   * (this is how <retro-shelf> stacks several sets). The host owns the
   * renderer, camera and pointer handling and calls _tick() every frame.
   * host: { parent: Object3D, invalidate(), sound, reduced, el }
   */
  _attachHost(host, slotPrefix) {
    this._host = host;
    this._slotPrefix = slotPrefix;
    this._sound = host.sound;
    this._reduced = host.reduced;
    this._visible = true;
    this._inited = true;
    this._resetState();
    this._scene = host.parent;
    this._screenObj = new CSS3DObject(this._screenEl);
    this._screenEl.style.userSelect = 'auto';
    this._screenEl.style.webkitUserSelect = 'auto';
    this._screenEl.style.pointerEvents = 'none';
    this._mountModel();
    this._ready = true;
    this._applyPicture();
    this._applyPower(true);
  }

  /** Hosted mode: advance animations and keep the glass shader's camera current. */
  _tick(now, camera) {
    const active = this._runTweens(now);
    const u = this._m.crtMaterial.uniforms;
    u.uCam.value.copy(camera.position);
    this._m.root.worldToLocal(u.uCam.value);
    u.uTime.value = (now / 1000) % 1000;
    return active;
  }

  _frame(now) {
    this._raf = 0;
    if (!this._ready) return;
    const dt = Math.min((now - (this._last || now)) / 1000, 0.05);
    this._last = now;
    let active = this._runTweens(now);

    const o = this._orbit;
    if (this._autoRotate && !this._reduced && !this.state.focused && !this._drag && this._visible) {
      o.goal.az = this._home.az + Math.sin(now / 4200) * 0.38;
      active = true;
    }
    const k = 1 - Math.exp(-dt * 9);
    for (const p of ['az', 'pol', 'zoom']) {
      const d = o.goal[p] - o.cur[p];
      if (Math.abs(d) > 1e-4) { o.cur[p] += d * (dt ? k : 1); active = true; } else o.cur[p] = o.goal[p];
    }

    // camera = blend between the orbit pose and the "screen fills the view" pose
    const cam = this._camera, pic = this._m.picture, f = this._focusF;
    const dist = this._baseDist / o.cur.zoom;
    const sp = Math.sin(o.cur.pol);
    const tx = 0, ty = this._meta.size.h * 0.5, tz = 0;
    const ox = tx + dist * sp * Math.sin(o.cur.az), oy = ty + dist * Math.cos(o.cur.pol), oz = tz + dist * sp * Math.cos(o.cur.az);
    cam.position.set(ox + (pic.cx - ox) * f, oy + (pic.cy - oy) * f, oz + (pic.z + this._focusDist - oz) * f);
    cam.lookAt(tx + (pic.cx - tx) * f, ty + (pic.cy - ty) * f, tz + (pic.z - tz) * f);
    cam.updateMatrixWorld();

    const u = this._m.crtMaterial.uniforms;
    u.uCam.value.copy(cam.position);
    this._m.root.worldToLocal(u.uCam.value);
    u.uTime.value = (now / 1000) % 1000;

    this._renderer.render(this._scene, cam);
    this._css.render(this._scene, cam);
    if (active && this._visible !== false) this.invalidate();
  }

  // -------------------------------------------------------------- pointer --
  _pick(e) {
    if (!this._ready) return null;
    const r = this._stage.getBoundingClientRect();
    this._ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this._ray.setFromCamera(this._ndc, this._camera);
    const hit = this._ray.intersectObject(this._m.root, true)[0];
    if (!hit) return null;
    return { control: hit.object.userData.control || null, screen: !!hit.object.userData.screen };
  }

  _inScreen(e) {
    return this.state.focused && e.composedPath().includes(this._screenEl);
  }

  _onDown(e) {
    if (!this._ready || e.button > 0 || e.target === this._back || this._inScreen(e)) return;
    this._hint.classList.add('gone');
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      this._pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), zoom: this._orbit.goal.zoom };
      this._drag = null;
      return;
    }
    const hit = this._pick(e);
    const c = hit?.control && this._m.controls[hit.control];
    try { this._stage.setPointerCapture(e.pointerId); } catch {}
    if (c?.kind === 'button') {
      e.preventDefault();
      this._drag = { type: 'button', id: c.id };
      this._buttonDown(c.id);
    } else if (c?.kind === 'knob' || c?.kind === 'slider') {
      e.preventDefault();
      this._drag = { type: 'knob', id: c.id, x: e.clientX, y: e.clientY, v: this.getKnob(c.id) };
      this._stage.classList.add('dragging');
    } else if (this.state.focused) {
      this._drag = { type: 'exit' };
    } else {
      this._drag = { type: 'orbit', x: e.clientX, y: e.clientY, moved: 0, screen: !!hit?.screen };
      this._stage.classList.add('dragging');
    }
  }

  _onMove(e) {
    if (!this._ready) return;
    if (this._pointers.has(e.pointerId)) this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._pinch && this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      this._orbit.goal.zoom = clamp(this._pinch.zoom * (d / this._pinch.d), 0.55, 2.2);
      this.invalidate();
      return;
    }
    const d = this._drag;
    if (!d) {
      if (e.pointerType === 'mouse' && !this._inScreen(e)) this._setHover(this._pick(e));
      return;
    }
    if (d.type === 'orbit') {
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      d.x = e.clientX; d.y = e.clientY;
      d.moved += Math.abs(dx) + Math.abs(dy);
      const g = this._orbit.goal;
      g.az = clamp(g.az - dx * 0.005, -2.2, 2.2);
      g.pol = clamp(g.pol - dy * 0.004, 0.45, 1.64);
      this.invalidate();
    } else if (d.type === 'knob') {
      this.setKnob(d.id, d.v + ((e.clientX - d.x) - (e.clientY - d.y)) * 0.005);
    }
  }

  _onUp(e, cancelled = false) {
    this._pointers.delete(e.pointerId);
    if (this._pinch) { if (this._pointers.size < 2) this._pinch = null; return; }
    const d = this._drag;
    this._drag = null;
    this._stage.classList.remove('dragging');
    if (!d) return;
    if (d.type === 'button') this._buttonUp(d.id);
    else if (cancelled) return;
    else if (d.type === 'exit') this.unfocus();
    else if (d.type === 'orbit' && d.moved < 6 && d.screen) {
      if (!this.state.power) this.press('power');
      this.focusScreen();
    }
  }

  _onWheel(e) {
    if (this._inScreen(e) || !this._ready) return;
    const hit = this._pick(e);
    const c = hit?.control && this._m.controls[hit.control];
    if (c?.kind === 'knob' || c?.kind === 'slider') {
      e.preventDefault();
      this.setKnob(c.id, this.getKnob(c.id) - Math.sign(e.deltaY) * 0.04);
    } else if (this.hasAttribute('wheel-zoom') && !this.state.focused) {
      e.preventDefault();
      this._orbit.goal.zoom = clamp(this._orbit.goal.zoom * Math.exp(-e.deltaY * 0.0012), 0.55, 2.2);
      this.invalidate();
    }
  }

  _setHover(hit) {
    const id = hit?.control || null;
    if (id !== this._hoverId) {
      if (this._hoverId) this._highlight(this._hoverId, false);
      if (id) this._highlight(id, true);
      this._hoverId = id;
    }
    const kind = id && this._m.controls[id].kind;
    this._stage.style.cursor = kind === 'knob' || kind === 'slider' ? 'ew-resize' : kind === 'button' ? 'pointer'
      : hit?.screen && !this.state.focused ? 'zoom-in' : '';
  }

  _highlight(id, on) {
    const c = this._m?.controls[id];
    if (!c) return;
    c.mesh.material.emissive?.setHex(on ? 0x2e2e2c : 0x000000);
    this.invalidate();
  }

  _onKey(e) {
    if (e.key === 'Escape' && this.state.focused) this.unfocus();
  }

  // ------------------------------------------------------------- controls --
  _on(role) {
    const id = this._roleId[role];
    return !!(id && this.state.buttons[id]);
  }

  _val(role) { return this.state.values[role] ?? 0.5; }

  _buttonRest(id) {
    const c = this._ctl[id];
    if (c.role === 'power') return this.state.power ? 1 : 0;
    if (c.radio) return this.state.radio[c.radio] === id ? 1 : 0;
    return this.state.buttons[id] ? 1 : 0;
  }

  _poseButton(id, pos, dur = 70) {
    const c = this._m?.controls[id];
    if (!c) return;
    c.pos ??= 0;
    this._tween('btn-' + id, c.pos, pos, this._reduced ? 0 : dur, (v) => {
      c.pos = v;
      c.mesh.position.copy(c.home).addScaledVector(c.axis, c.travel * v);
    });
  }

  /** Indicator lamps follow their button's resting state. */
  /**
   * Light the keys with this role like a backlit keyboard: a soft glow round each key and the number
   * cells above them lit faintly (the key that is on keeps its full lamp). It fades in, then breathes
   * slowly between `low` and `high` (eased), and fades out when turned off. Steady with reduced motion.
   * Only keys built with a backlight (the KV-5200's channel keys) have the glow.
   */
  setBacklight(on = true, { role = 'channel', low = 0.1, high = 0.2, cells = 0.22, period = 4000, duration = 700 } = {}) {
    if (!this._m) return;
    this._bl ||= { v: 0, p: 0.5 };
    Object.assign(this._bl, { role, low, high, cells });
    const want = on && this.state.power;
    this._bl.on = want;
    this._tween('backlight', this._bl.v, want ? 1 : 0, this._reduced ? 0 : duration, (v) => { this._bl.v = v; this._applyBacklight(); }, { ease: easeInOut });
    // the breathing runs on a light timer (5 updates a second: the pulse is slow and dim), not every frame,
    // and holds still while the set is in standby (the camera is not on it), because every update redraws
    // the host's whole scene
    if (want && !this._reduced && !this._blTimer) {
      const t0 = performance.now();
      this._blTimer = setInterval(() => {
        if (!this._bl.on && this._bl.v <= 0) { clearInterval(this._blTimer); this._blTimer = 0; return; }
        if (this._standby) return;
        const phase = ((performance.now() - t0) % period) / period;
        this._bl.p = (1 - Math.cos(2 * Math.PI * phase)) / 2;          // eased in and out at both ends
        this._applyBacklight();
      }, 200);
    }
  }

  _applyBacklight() {
    const bl = this._bl;
    if (!bl || !this._m) return;
    const v = this.state.power ? bl.v : 0;
    const level = this._reduced ? (bl.low + bl.high) / 2 : bl.low + (bl.high - bl.low) * bl.p;   // 10% .. 20%
    for (const c of this._meta.controls) {
      const rec = this._m.controls[c.id];
      if (c.role !== bl.role || !rec) continue;
      if (rec.backlight) rec.backlight.material.opacity = level * v;
      if (rec.lamp && this._buttonRest(c.id) !== 1) rec.lamp.material.emissiveIntensity = bl.cells * (level / bl.high) * v;
    }
    this.invalidate();
  }

  _syncLamps() {
    if (!this._m) return;
    for (const c of this._meta.controls) {
      const rec = this._m.controls[c.id];
      if (c.kind !== 'button') continue;
      const on = this._buttonRest(c.id) === 1;
      const a = this._a11y[c.id];
      if (a?.hasAttribute('aria-pressed')) a.setAttribute('aria-pressed', String(on));
      if (rec?.lamp && c.role !== 'power') rec.lamp.material.emissiveIntensity = on && (this.state.power || c.lampAlways) ? rec.lamp.userData.lampOn : 0;
    }
    this._applyBacklight();
    this.invalidate();
  }

  _buttonDown(id) {
    this._poseButton(id, 1.25, 55);
    this._activate(id);
  }

  _buttonUp(id) {
    this._poseButton(id, this._buttonRest(id), 90);
    if (this._ctl[id].role !== 'power') this._sound.click(0.6, 3200);
  }

  _activate(id) {
    const c = this._ctl[id], st = this.state;
    if (c.role === 'power') { this.power = !st.power; return; }
    this._sound.click(1, 2500);
    if (c.role === 'degauss') { this.degauss(); return; }
    if (c.radio) {
      const before = st.radio[c.radio];
      st.radio[c.radio] = id;
      if (before && before !== id) this._poseButton(before, 0, 90);
    } else if (c.role === 'channel-up' || c.role === 'channel-down') {
      const list = this._meta.inputs, i = list.indexOf(this.input);
      st.radio.channel = list[(i + (c.role === 'channel-up' ? 1 : list.length - 1)) % list.length];
    } else if (c.role === 'volume-up' || c.role === 'volume-down') {
      st.values.volume = clamp(this._val('volume') + (c.role === 'volume-up' ? 0.08 : -0.08), 0, 1);
      this._emit('pvm-knob', { id: 'volume', value: st.values.volume });
    } else if (c.latch) {
      st.buttons[id] = !st.buttons[id];
    }
    const input = this.input;
    this._syncLamps();
    this._applyPicture();
    this._emit('pvm-button', { id, pressed: c.latch ? st.buttons[id] : true });
    if (input !== this._lastInput) {
      this._lastInput = input;
      // (no burst of snow between channels: the owner found it read as a fault)
      this._emit('pvm-input', { input });
    }
  }

  /** Press a front-panel button, exactly as a click on it would. */
  press(id) {
    if (this._ctl[id]?.kind !== 'button') throw new Error(`sony-pvm: unknown button "${id}"`);
    this._poseButton(id, 1.25, 55);
    this._activate(id);
    setTimeout(() => this._poseButton(id, this._buttonRest(id), 90), 110);
  }

  /** Set a latching button to a specific state. */
  setButton(id, pressed) {
    if (!this._ctl[id]?.latch) throw new Error(`sony-pvm: "${id}" is not a latching button`);
    if (this.state.buttons[id] !== !!pressed) this.press(id);
  }

  /** Turn a knob or move a slider. value is 0..1 (0.5 = centre). */
  setKnob(id, value) {
    const c = this._ctl[id];
    if (!c || c.kind === 'button') throw new Error(`sony-pvm: unknown knob "${id}"`);
    const v = clamp(+value || 0, 0, 1);
    if (v === this.state.values[c.role]) return;
    this.state.values[c.role] = v;
    this._a11y[id].value = Math.round(v * 100);
    this._poseValue(id);
    this._applyPicture();
    this._emit('pvm-knob', { id, value: v });
  }

  getKnob(id) { return this.state.values[this._ctl[id]?.role]; }

  _poseValue(id) {
    const c = this._m?.controls[id];
    if (!c) return;
    const v = this.state.values[this._ctl[id].role];
    if (c.kind === 'knob') c.group.rotation.z = (0.5 - v) * 2 * KNOB_SWEEP;
    else c.mesh.position.x = c.home.x + c.range * v;
    this.invalidate();
  }

  /** The input / channel currently selected (also the slot name that shows). */
  get input() { return this._meta.inputOf(this.state); }

  // ---------------------------------------------------------------- power --
  get power() { return this.state.power; }
  set power(on) {
    on = !!on;
    if (on === this.state.power) return;
    this.state.power = on;
    this._sound.power(on);
    this._applyPower(false);
    this._emit('pvm-power', { on });
  }
  powerOn() { this.power = true; }
  powerOff() { this.power = false; }
  togglePower() { this.power = !this.power; }

  _applyPower(instant) {
    const on = this.state.power;
    this._reflect('power', on ? 'on' : 'off');
    this._beam.className = 'beam ' + (on ? 'on' : instant ? '' : 'off') + (instant ? ' instant' : '');
    this._applyPicture();
    if (!this._m) return;
    const pid = this._roleId.power;
    if (pid && !this._drag) this._poseButton(pid, on ? 1 : 0, instant ? 0 : 90);
    this._m.setPower(on);
    this._syncLamps();
    const u = this._m.crtMaterial.uniforms;
    const quick = instant || this._reduced;
    if (on) this._tween('tube', u.uOn.value, 1, quick ? 0 : 380, (v) => (u.uOn.value = v), { delay: quick ? 0 : 150, ease: linear });
    else this._tween('tube', u.uOn.value, 0, quick ? 0 : 650, (v) => (u.uOn.value = v), { delay: quick ? 0 : 480, ease: linear });
  }

  /** Fire the degauss coil (only does anything while powered). */
  degauss() {
    this._emit('pvm-degauss', {});
    if (!this.state.power) return;
    this._sound.degauss();
    if (!this._m) return;
    const u = this._m.crtMaterial.uniforms;
    this._tween('degauss', 1, 0, 1500, (v) => (u.uDegauss.value = v * v), { ease: linear });
    if (!this._reduced && this._roll.animate) {
      const frames = [];
      for (let i = 0; i <= 18; i++) {
        const t = i / 18, a = (1 - t) ** 2;
        frames.push({
          transform: `translate(${Math.sin(i * 2.4) * 16 * a}px, ${Math.cos(i * 3.1) * 11 * a}px) scale(${1 + 0.035 * a}) rotate(${Math.sin(i * 1.9) * 1.2 * a}deg)`,
          filter: `hue-rotate(${Math.sin(i * 2.2) * 150 * a}deg) saturate(${1 + 1.6 * a})`,
        });
      }
      this._roll.animate(frames, { duration: 1500, easing: 'linear' });
    }
  }

  // -------------------------------------------------------------- picture --
  _hasContent(input) {
    const wrap = this._inputs[input];
    if (!wrap) return false;
    if (wrap.querySelector('iframe')) return true;
    return wrap.querySelector('slot').assignedNodes().some((n) => n.nodeType === 1 || n.textContent.trim());
  }

  _applyPicture() {
    const { power } = this.state;
    const b = (role) => this._on(role), k = (role) => this._val(role);
    // which input is on air
    const all = this._meta.inputs, first = all[0];
    const extra = this._alwaysSwitch || all.slice(1).some((id) => this._hasContent(id));
    const want = extra ? this.input : first;
    const has = this._hasContent(want);
    for (const id of all) this._inputs[id].classList.toggle('active', id === want && has);
    this._holdMedia(power ? want : null);
    this._bars.classList.toggle('active', want === first && !has);
    this._bars.lastElementChild.textContent = this._meta.barsLabel || first.replace('-', ' ').toUpperCase();
    const snow = !has && want !== first && this._meta.noSignal === 'noise';
    if (snow && !this._noise.style.backgroundImage) this._noise.style.backgroundImage = `url(${noiseTile()})`;
    this._noise.classList.toggle('active', snow);

    // picture controls -> CSS filters on the real content
    const f = [];
    if (k('bright') !== 0.5) f.push(`brightness(${(0.35 + 1.3 * k('bright')).toFixed(3)})`);
    if (k('contr') !== 0.5) f.push(`contrast(${(0.4 + 1.2 * k('contr')).toFixed(3)})`);
    if (k('chroma') !== 0.5) f.push(`saturate(${(2 * k('chroma')).toFixed(3)})`);
    if (k('phase') !== 0.5) f.push(`hue-rotate(${((k('phase') - 0.5) * 120).toFixed(1)}deg)`);
    if (k('aper') < 0.5) f.push(`blur(${((0.5 - k('aper')) * 2.4).toFixed(2)}px)`);
    this._picture.style.filter = f.join(' ');

    // raster geometry
    let sx = 1, sy = 1, tr = '';
    if (b('underscan')) { sx *= 0.94; sy *= 0.94; }
    if (b('wide')) sy *= 0.75;
    if (b('hv-delay')) tr = 'translate(25%, 50%) ';
    this._raster.style.transform = tr || sx !== 1 || sy !== 1 ? `${tr}scale(${sx}, ${sy})` : '';
    this._screenEl.classList.toggle('blue-only', b('blue-only'));
    this._roll.classList.toggle('rolling', b('sync') && power);

    // VOLUME (and the host's mute) drives the media on this set: <video>, <audio> and YouTube players
    const vol = power ? k('volume') : 0, quiet = !!this._sound?.muted;
    for (const n of this._content()) {
      for (const m of n.matches('video, audio') ? [n] : n.querySelectorAll('video, audio')) {
        try { m.volume = vol; m.muted = quiet; } catch {}
      }
      for (const f of n.matches('iframe') ? [n] : n.querySelectorAll('iframe')) if (isYouTube(f)) ytLevel(f, vol, quiet);
    }
  }

  /** Elements placed on this set's channels (its own children, or the host's slotted pages). */
  _content() {
    const out = [];
    for (const wrap of Object.values(this._inputs || {})) out.push(...wrap.querySelector('slot').assignedElements());
    return out;
  }

  /**
   * Only the channel on air plays. Embedded players (YouTube, Spotify, ...) on
   * the other channels are unloaded so their sound stops, and reloaded when
   * their channel comes back; <video> and <audio> are paused.
   */
  _holdMedia(onAir) {
    const standby = !!this._standby;
    for (const [id, wrap] of Object.entries(this._inputs)) {
      const live = id === onAir;
      const nodes = wrap.querySelector('slot').assignedElements();
      for (const n of nodes) {
        for (const f of n.matches('iframe') ? [n] : n.querySelectorAll('iframe')) {
          const yt = isYouTube(f);
          if (yt) ytWire(f, () => ({ vol: this.state.power ? this._val('volume') : 0, quiet: !!this._sound?.muted, standby: !!this._standby }));
          const playing = live && !standby;
          const hold = () => { if (!f.dataset.held && f.getAttribute('src') && f.getAttribute('src') !== 'about:blank') { f.dataset.held = f.getAttribute('src'); f.src = 'about:blank'; } };
          const load = () => { if (f.dataset.held) { f.src = f.dataset.held; delete f.dataset.held; } };
          if (yt) {
            // YouTube keeps its place: a video is only loaded the first time its channel comes on air, and from
            // then on it is paused off air and in standby, and carries on from there. It is told only when that
            // changes, so a video the visitor paused themselves stays paused.
            const y = f._yt;
            if (!y.aired) { if (live) { load(); y.aired = true; y.playing = playing; } else hold(); }
            else if (y.playing !== playing) { ytCmd(f, playing ? 'playVideo' : 'pauseVideo'); y.playing = playing; }
          } else if (playing) load();
          else hold();                                                   // other players (Spotify) cannot be paused from here
        }
        for (const m of n.matches('video, audio') ? [n] : n.querySelectorAll('video, audio')) {
          if (!live || standby) { try { m.pause(); } catch {} } else if (m.autoplay) { m.play?.().catch(() => {}); }
        }
      }
    }
  }

  /**
   * Standby: the picture stays but nothing on the set plays (YouTube and audio pause where they are,
   * other embedded players are unloaded). A host uses it for a set the camera is not on.
   */
  setStandby(on) {
    on = !!on;
    if (on === !!this._standby) return;
    this._standby = on;
    this._applyPicture();
  }

  _setSrc(url, quiet = false) {
    const wrap = this._inputs[this._meta.inputs[0]];
    wrap.querySelector('iframe')?.remove();
    wrap.querySelector('slot').style.display = url ? 'none' : '';
    if (url) {
      const f = document.createElement('iframe');
      f.src = url;
      f.title = this.getAttribute('title') || 'Screen content';
      f.loading = 'lazy';
      wrap.append(f);
    }
    if (!quiet) this._applyPicture();
  }

  _setResolution(value) {
    const m = /^(\d+)\s*[x×]\s*(\d+)$/i.exec(value || '');
    this._res = m ? [clamp(+m[1], 160, 4096), clamp(+m[2], 120, 4096)] : [640, 480];
    this._applyResolution();
  }

  _applyResolution() {
    const [w, h] = this._res;
    this._screenEl.style.width = w + 'px';
    this._screenEl.style.height = h + 'px';
    if (this._screenObj && this._m) {
      this._screenObj.scale.set(this._m.picture.w / w, this._m.picture.h / h, 1);
      this.invalidate();
    }
  }

  // ---------------------------------------------------------------- focus --
  /** Fly the camera in until the picture fills the element. */
  focusScreen() {
    if (this.state.focused || !this._ready) return;
    this.state.focused = true;
    this._stage.classList.add('focused');
    this._screenEl.style.pointerEvents = 'auto';
    this._back.hidden = false;
    this._hint.classList.add('gone');
    this._setHover(null);
    this._reflect('focused', '');
    window.addEventListener('keydown', this._onKey);
    this._flyTo(1);
    this._emit('pvm-focus', { focused: true });
  }

  /** Fly back out to the whole monitor. */
  unfocus() {
    if (!this.state.focused) return;
    this.state.focused = false;
    this._stage.classList.remove('focused');
    this._screenEl.style.pointerEvents = 'none';
    this._back.hidden = true;
    this._reflect('focused', null);
    window.removeEventListener('keydown', this._onKey);
    this._flyTo(0);
    this._emit('pvm-focus', { focused: false });
  }

  _flyTo(f) {
    const u = this._m.crtMaterial.uniforms;
    const g0 = u.uGlare.value, g1 = f ? 0.3 : 1;
    this._tween('focus', this._focusF, f, this._reduced ? 0 : 950, (v) => {
      this._focusF = v;
      u.uGlare.value = g0 + (g1 - g0) * (f ? v : 1 - v);
    }, { ease: easeInOut });
  }

  // ----------------------------------------------------------------- view --
  /** Move the orbit camera. Angles in degrees; zoom 1 = default framing. */
  setView({ azimuth, polar, zoom } = {}) {
    const g = this._orbit.goal;
    if (azimuth !== undefined) g.az = clamp(THREE.MathUtils.degToRad(azimuth), -2.2, 2.2);
    if (polar !== undefined) g.pol = clamp(THREE.MathUtils.degToRad(polar), 0.45, 1.64);
    if (zoom !== undefined) g.zoom = clamp(zoom, 0.55, 2.2);
    this.invalidate();
  }

  resetView() { Object.assign(this._orbit.goal, this._home); this.invalidate(); }

  _setViewPreset(v) {
    const presets = { front: [0, 90], hero: [24, 78], top: [28, 40], side: [80, 80] };
    const p = presets[v] || presets.hero;
    this._home = { az: THREE.MathUtils.degToRad(p[0]), pol: THREE.MathUtils.degToRad(p[1]), zoom: 1 };
    Object.assign(this._orbit.goal, this._home);
    if (!this._ready || !this._last) Object.assign(this._orbit.cur, this._home);
    this.invalidate();
  }

  // ---------------------------------------------------------------- tally --
  /** Light the tally lamp in a CSS colour ("red", "#0f0"...), or null for off. */
  setTally(color) {
    const tally = this._m?.tally;
    if (!tally) return;
    const mat = tally.material;
    if (color && color !== 'off') {
      mat.emissive.set(color === 'on' || color === '' ? '#ff2a1a' : color);
      mat.emissiveIntensity = 1.6;
    } else {
      mat.emissiveIntensity = 0;
    }
    this.invalidate();
  }

  _loadImage(src, what) {
    if (!src) return Promise.resolve(null);
    if (typeof src !== 'string') return Promise.resolve(src);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => { console.warn(`sony-pvm: could not load ${what} "${src}"`); resolve(undefined); };
      img.src = src;
    });
  }

  /** Put a logo in the tally window (PVM models). Accepts a URL, <img>, <canvas> or null to clear. */
  async setTallyLogo(src) {
    this._logoSrc = src;
    const image = await this._loadImage(src, 'tally logo');
    const tally = this._m?.tally;
    if (!tally || image === undefined || this._logoSrc !== src) return;
    const old = tally.material.map;
    tally.material.map = tally.material.emissiveMap = makeTallyTexture(image, tally.userData.size.w, tally.userData.size.h);
    old?.dispose();
    tally.material.needsUpdate = true;
    this.invalidate();
  }

  // ---------------------------------------------------------------- brand --
  _paintBrand(opts) {
    const brand = this._m?.brand;
    if (!brand) return;
    const mat = brand.mesh.material, old = mat.map;
    mat.map = makeBrandTexture({ w: brand.w, h: brand.h, style: brand.style, ...opts });
    if (mat.emissiveMap) mat.emissiveMap = mat.map;
    old?.dispose();
    mat.needsUpdate = true;
    this.invalidate();
  }

  /**
   * Replace the maker's badge with your own wordmark. "" removes the badge,
   * null restores the original.
   */
  setBrand(text) {
    this._brandText = text ?? undefined;
    this._brandSrc = undefined;
    this._paintBrand(text === null || text === undefined ? {} : { text: String(text) });
  }

  /** Replace the maker's badge with a logo image (URL, <img> or <canvas>); null restores the original. */
  async setBrandLogo(src) {
    this._brandSrc = src ?? undefined;
    if (!src) { this._paintBrand(this._brandText !== undefined ? { text: this._brandText } : {}); return; }
    const image = await this._loadImage(src, 'brand logo');
    if (image && this._brandSrc === src) this._paintBrand({ image });
  }

  // ----------------------------------------------------------------- misc --
  get focused() { return this.state.focused; }
  get muted() { return this._sound.muted; }
  set muted(v) { this._sound.muted = !!v; this._reflect('muted', v ? '' : null); }

  /** The THREE.Group of the monitor, for anyone who wants to go further. */
  get object3D() { return this._m?.root || null; }

  _reflect(name, value) {
    this._reflecting = true;
    if (value === null) this.removeAttribute(name);
    else if (this.getAttribute(name) !== value) this.setAttribute(name, value);
    this._reflecting = false;
  }

  _emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }
}
