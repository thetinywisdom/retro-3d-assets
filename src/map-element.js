// <retro-map>: a small green hologram of the TV stack, showing which set the
// camera is on and which sets are above and below it.
//
//   <retro-map for="shelf">
//     <button data-tv="kv-5200" data-label="Guide">Guide</button>
//     ...
//   </retro-map>
//
// The children name the sets (in the order they are numbered, 01, 02, ...);
// they stay off screen. The map copies the shelf's arrangement as plain boxes,
// so it always matches the stack. It shows only while the camera is in on a
// set (not in the room view, not while a page is open full screen). Above it
// a key goes to the set above, below it a key goes to the set below, and a
// label beside the lit set says where you are. Tapping a set goes there.
import * as THREE from 'three';

const DOTS = '"DotGothic16", "IBM Plex Mono", ui-monospace, monospace';
const GREEN = 0x8dff9a;
// the picture on each set's front, as fractions of its width and height, and the height of its centre
const SCREENS = {
  'pvm-20m4e': [0.8, 0.62, 0.55],
  'pvm-9042qm': [0.73, 0.55, 0.6],
  'kv-9pr1': [0.72, 0.62, 0.55],
  'kv-5200': [0.66, 0.5, 0.68],
};

const STYLE = /* css */ `
:host { display: block; position: relative; width: 150px; height: 330px; pointer-events: none; opacity: 0; visibility: hidden;
  transition: opacity 0.5s ease, visibility 0s linear 0.5s; font: 400 13px/1.2 ${DOTS}; color: #8dff9a; letter-spacing: 0.06em;
  -webkit-tap-highlight-color: transparent; }
:host([open]) { opacity: 1; visibility: visible; transition: opacity 0.5s ease; }
/* while it first runs through the sets, the labels follow along but cannot be pressed */
:host([intro]) .go, :host([intro]) .here { pointer-events: none; }
:host([intro]) .here:empty { visibility: hidden; }
.holo { position: absolute; left: 0; right: 0; top: 34px; bottom: 34px; pointer-events: auto; cursor: pointer; }
canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
/* fine scanlines over the hologram */
.holo::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0 1px, transparent 1px 3px); }
.go { all: unset; position: absolute; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px;
  white-space: nowrap; cursor: pointer; pointer-events: auto; text-shadow: 0 0 6px rgba(141, 255, 154, 0.6); padding: 2px 6px; }
.go[hidden] { display: none; }
.go:hover, .go:focus-visible { background: #8dff9a; color: #031208; text-shadow: none; }
.up { top: 0; }
.down { bottom: 0; flex-direction: column-reverse; }
.arrow { display: block; font-size: 11px; animation: nudge 1.6s ease-in-out infinite; }
.down .arrow { animation-name: nudge-down; }
@keyframes nudge { 50% { transform: translateY(-3px); opacity: 0.5; } }
@keyframes nudge-down { 50% { transform: translateY(3px); opacity: 0.5; } }
/* where you are: a tag pointing at the lit set */
.here { position: absolute; left: 100%; top: 0; transform: translateY(-50%); display: flex; align-items: center; gap: 4px; white-space: nowrap;
  padding: 2px 6px; background: #8dff9a; color: #031208; box-shadow: 0 0 10px rgba(141, 255, 154, 0.5); }
.here::before { content: ""; position: absolute; right: 100%; top: 50%; width: 10px; height: 1px; background: #8dff9a; }
.keys { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); }
@media (prefers-reduced-motion: reduce) { .arrow { animation: none; } :host, :host([open]) { transition: none; } }
`;

export class RetroMapElement extends HTMLElement {
  static get observedAttributes() { return ['for']; }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${STYLE}</style>
      <button class="go up" type="button" hidden><span class="arrow">&#9650;</span><span class="name"></span></button>
      <div class="holo"><canvas></canvas></div>
      <div class="here" hidden aria-live="polite"></div>
      <button class="go down" type="button" hidden><span class="arrow">&#9660;</span><span class="name"></span></button>
      <div class="keys"><slot></slot></div>`;
    this._canvas = root.querySelector('canvas');
    this._holo = root.querySelector('.holo');
    this._up = root.querySelector('.up');
    this._down = root.querySelector('.down');
    this._here = root.querySelector('.here');
    this._reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // phones and tablets: no sway, flicker or scan band, and a fresh drawing only when something changes
    this._lite = matchMedia('(pointer: coarse)').matches;
    this._onShelf = () => this._update();
    this._frame = (now) => this._render(now);
    this._up.addEventListener('click', () => this._go(this._up.dataset.tv));
    this._down.addEventListener('click', () => this._go(this._down.dataset.tv));
    this._canvas.addEventListener('click', (e) => this._pick(e));
  }

  connectedCallback() {
    this._bind();
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this._holo);
    this._update();
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._bind(true);
    cancelAnimationFrame(this._raf); this._raf = 0;
  }

  attributeChangedCallback() { if (this.isConnected) { this._bind(); this._update(); } }

  /** The <retro-shelf> this map follows. */
  get shelf() { return this._shelf || null; }

  _bind(off = false) {
    const evs = ['shelf-focus', 'shelf-read', 'shelf-ready'];
    if (this._shelf) for (const t of evs) this._shelf.removeEventListener(t, this._onShelf);
    this._shelf = null;
    if (off) return;
    const id = this.getAttribute('for');
    this._shelf = (id ? document.getElementById(id) : document.querySelector('retro-shelf')) || null;
    if (this._shelf) for (const t of evs) this._shelf.addEventListener(t, this._onShelf);
  }

  /** "01 GUIDE" for a set, from the child buttons. */
  _name(id) {
    const keys = [...this.querySelectorAll('[data-tv]')];
    const i = keys.findIndex((k) => k.dataset.tv === id);
    if (i < 0) return id.toUpperCase();
    const label = keys[i].dataset.label || keys[i].textContent.trim();
    return `${String(i + 1).padStart(2, '0')} ${label.toUpperCase()}`;
  }

  _go(id) {
    if (id && this._shelf?.focusTV) this._shelf.focusTV(id);
  }

  // ---------------------------------------------------------------- state --
  _update() {
    const shelf = this._shelf;
    const on = !!(shelf && shelf._ready && shelf._focusKey && !shelf._reading);
    this.toggleAttribute('open', on);
    if (!on) { cancelAnimationFrame(this._raf); this._raf = 0; return; }
    if (!this._scene) this._build();
    else this._place();
    const order = shelf._order();
    this._current = shelf._focusKey;
    if (!this._intro) this._labels(shelf._focusKey, order);
    // the first time: fade in, light each set from the top down, then settle on the one you are on
    if (!this._introduced) {
      this._introduced = true;
      if (!this._reduced) {
        this._intro = { start: performance.now() + 500, order };
        this.setAttribute('intro', '');
        this._labels(null, order);
      }
    }
    if (!this._raf) this._raf = requestAnimationFrame(this._frame);
  }

  /** Point the tag at a set, with keys for the sets above and below it. */
  _labels(at, order) {
    this._labelled = at;
    const i = order.indexOf(at);
    for (const [el, id] of [[this._up, order[i - 1]], [this._down, order[i + 1]]]) {
      el.hidden = !at || !id;                                        // nothing above the top set, nothing below the bottom one
      if (el.hidden) continue;
      el.dataset.tv = id;
      el.querySelector('.name').textContent = this._name(id);
      el.setAttribute('aria-label', `Go to ${this._name(id)}`);
    }
    this._here.textContent = at ? `\u25C0 ${this._name(at)}` : '';
    this._here.hidden = false;
  }

  // ---------------------------------------------------------------- scene --
  _build() {
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
    this._renderer = renderer;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(22, 1, 10, 20000);
    this._group = new THREE.Group();
    this._scene.add(this._group);
    this._band = new THREE.Mesh(new THREE.PlaneGeometry(520, 12),
      new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true }));
    this._scene.add(this._band);
    this._place();
    this._resize();
  }

  /** Copy the shelf's sets as boxes, standing as they stand in the room. */
  _place() {
    const units = this._shelf?._units;
    if (!units || !this._group) return;
    for (const c of [...this._group.children]) {
      this._group.remove(c);
      c.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
    }
    this._sets = {};
    const pos = new THREE.Vector3(), quat = new THREE.Quaternion(), box = new THREE.Box3();
    for (const id of Object.keys(units)) {
      const u = units[id], size = u._meta.size;
      const h = id === 'kv-5200' ? 205 : size.h;                    // the portable's body; its handle is drawn on top
      u._parent.getWorldPosition(pos); u._parent.getWorldQuaternion(quat);
      const g = new THREE.Group();
      g.position.copy(pos); g.quaternion.copy(quat); g.userData.id = id;
      const fill = new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.05, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true, side: THREE.DoubleSide });
      const edges = new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.45 });
      const screenFill = fill.clone();
      const geo = new THREE.BoxGeometry(size.w, h, size.d);
      const body = new THREE.Mesh(geo, fill);
      body.position.y = h / 2; body.userData.tv = id;
      const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edges);
      lines.position.y = h / 2;
      g.add(body, lines);
      const [sw, sh, sy] = SCREENS[id] || [0.7, 0.55, 0.58];
      const sg = new THREE.PlaneGeometry(size.w * sw, h * sh);
      const screen = new THREE.Mesh(sg, screenFill);
      screen.position.set(0, h * sy, size.d / 2 + 1);
      const frame = new THREE.LineSegments(new THREE.EdgesGeometry(sg), edges);
      frame.position.copy(screen.position);
      g.add(screen, frame);
      if (id === 'kv-5200') {
        const arc = new THREE.TorusGeometry(size.w * 0.42, 6, 4, 24, Math.PI);
        const handle = new THREE.LineSegments(new THREE.EdgesGeometry(arc), edges);
        handle.position.set(0, h + 4, 0); handle.rotation.y = Math.PI / 2; handle.scale.set(1, 0.42, 1);
        g.add(handle);
      }
      this._group.add(g);
      this._sets[id] = { g, body, fill, edges, screenFill, h };
    }
    // centre the stack on its own axis
    this._group.position.set(0, 0, 0);
    this._group.updateMatrixWorld(true);
    box.setFromObject(this._group);
    const c = box.getCenter(new THREE.Vector3());
    this._group.position.set(-c.x, -c.y, -c.z);
    this._height = box.max.y - box.min.y;
    // how far any corner reaches from the stack's axis, whichever way it turns
    this._reach = 0;
    const corner = new THREE.Vector3();
    for (const set of Object.values(this._sets)) {
      const { g } = set, { w, d } = units[g.userData.id]._meta.size;
      set.reach = 0;
      for (const [x, z] of [[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]]) {
        corner.set(x, 0, z); g.localToWorld(corner); corner.add(this._group.position);
        set.reach = Math.max(set.reach, Math.hypot(corner.x, corner.z));
      }
      this._reach = Math.max(this._reach, set.reach);
    }
    this._fitCamera();
  }

  _fitCamera() {
    if (!this._camera || !this._height) return;
    const w = this._holo.clientWidth || 1, h = this._holo.clientHeight || 1;
    this._camera.aspect = w / h;
    // fit the stack's height, or its width on a short, wide map
    const fov = (this._camera.fov / 2) * Math.PI / 180;
    // (the widest set's corners swing out as the stack turns, and come nearer the camera: leave room for both)
    const dist = Math.max(this._height * 0.56 / Math.tan(fov), this._reach * 1.08 / (Math.tan(fov) * this._camera.aspect));
    this._camera.position.set(0, this._height * 0.18, dist);
    this._camera.lookAt(0, 0, 0);
    this._camera.updateProjectionMatrix();
  }

  _resize() {
    if (!this._renderer) return;
    this._renderer.setSize(this._holo.clientWidth || 1, this._holo.clientHeight || 1, false);
    this._fitCamera();
  }

  _pick(e) {
    if (!this._sets) return;
    const r = this._canvas.getBoundingClientRect();
    const p = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(p, this._camera);
    const hit = ray.intersectObjects(Object.values(this._sets).map((s) => s.body))[0];
    if (hit) this._go(hit.object.userData.tv);
  }

  _render(now) {
    this._raf = 0;
    if (!this._renderer || !this.hasAttribute('open')) return;
    // at most 20 drawings a second: plenty for a flickering hologram
    if (this._lastDraw && now - this._lastDraw < 48) { this._raf = requestAnimationFrame(this._frame); return; }
    this._lastDraw = now;
    const still = this._reduced || this._lite;
    const t = now / 1000;
    const flicker = still ? 1 : 0.86 + 0.14 * Math.sin(t * 31) * Math.sin(t * 7.3) - (Math.random() < 0.02 ? 0.35 : 0);
    this._scene.rotation.y = still ? -0.3 : -0.3 + Math.sin(t * 0.5) * 0.3;
    let current = this._current, sweeping = false;
    if (this._intro) {
      // a set every 0.32 s, one step at most per frame so a slow device still shows each one
      const it = this._intro;
      if (now >= it.start && now >= (it.next || 0)) { it.k = (it.k ?? -1) + 1; it.next = now + 320; }
      const k = it.k ?? -1;
      if (k < it.order.length) { current = k < 0 ? null : it.order[k]; sweeping = true; }
      else { this._intro = null; this.removeAttribute('intro'); }
      if (current !== this._labelled) this._labels(current, this._shelf._order());
    }
    for (const [id, s] of Object.entries(this._sets || {})) {
      const lit = id === current, pulse = lit && !still && !sweeping ? 0.75 + 0.25 * Math.sin(t * 4) : 1;
      s.fill.opacity = (lit ? 0.22 * pulse : 0.035) * flicker;
      s.screenFill.opacity = (lit ? 0.35 * pulse : 0.03) * flicker;
      s.edges.opacity = (lit ? 1 : 0.4) * flicker;
    }
    this._band.visible = !still;
    this._band.position.y = ((t * 160) % (this._height * 1.3)) - this._height * 0.65;
    this._renderer.render(this._scene, this._camera);
    // the "you are here" tag follows the lit set
    const lit = this._sets?.[current];
    if (lit) {
      const v = new THREE.Vector3(0, lit.h / 2, 0);
      lit.g.localToWorld(v);
      v.applyMatrix4(this._scene.matrixWorld).project(this._camera);
      const y = this._holo.offsetTop + (1 - (v.y + 1) / 2) * this._holo.clientHeight;
      // just right of the lit set: the furthest right of its corners on screen
      lit.body.geometry.computeBoundingBox();
      const bb = lit.body.geometry.boundingBox, e = new THREE.Vector3();
      let right = -Infinity;
      for (const cx of [bb.min.x, bb.max.x]) for (const cy of [bb.min.y, bb.max.y]) for (const cz of [bb.min.z, bb.max.z]) {
        e.set(cx, cy, cz); lit.body.localToWorld(e); right = Math.max(right, e.project(this._camera).x);
      }
      const x = this._holo.offsetLeft + ((right + 1) / 2) * this._holo.clientWidth + 12;
      this._here.style.top = `${y.toFixed(1)}px`;
      this._here.style.left = `${x.toFixed(1)}px`;
    }
    if (!still || this._intro) this._raf = requestAnimationFrame(this._frame);
  }
}
