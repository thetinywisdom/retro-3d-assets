// <retro-pager>: a site navigation dock drawn as a desk pager in 3D.
//
//   <retro-pager for="shelf" name="briandi.to">
//     <button data-tv="pvm-20m4e" data-label="Home" data-info="The front page">Home</button>
//     ...
//     <button data-action="back">Back</button>
//     <button data-action="sound">Sound</button>
//     <button data-action="info" data-info="About this site">Info</button>
//   </retro-pager>
//
// The children are the real, focusable buttons (kept off screen); the pager
// draws one key for each. Keys with data-tv move the <retro-shelf> camera to
// that set, and a second press opens its page full screen. The LCD shows what
// the key under the pointer does (or the TV under the pointer in the shelf),
// and otherwise the shelf's own hint, so "Tap a TV to look closer" is always
// on screen.
//
// There is no real model behind this one: it is a generic 1990s pager shape,
// sized to hold the keys. Units are millimetres, +z towards the viewer.
import * as THREE from 'three';
import { rr, circle, ring, loft, plate, rbox } from './kit.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const LEGEND = '"Barlow Semi Condensed", "Arial Narrow", Arial, sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
// LCD lettering: a dot-matrix face (with Japanese) when the page offers it, else a monospace
const DOTS = '"DotGothic16", "IBM Plex Mono", ui-monospace, monospace';
const NARROW = 560;            // element width (CSS px) below which the keys go on two rows
const TILT = -0.2;             // top edge leans away, as if propped on the floor

const STYLE = /* css */ `
:host { display: block; position: relative; height: 128px; pointer-events: none; -webkit-tap-highlight-color: transparent; }
:host([narrow]) { height: 176px; }
canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.7)); }
.pad { position: absolute; pointer-events: auto; touch-action: manipulation; }
.keys { position: absolute; top: 0; left: 0; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
`;

/** Where each part goes, for a given number of TV keys and extra keys. */
function layout(narrow, nNav, nExtra) {
  const R = 6.5, eg = 3, extraW = nExtra ? nExtra * R * 2 + (nExtra - 1) * eg : 0;
  const parts = { nav: [], extra: [] };
  if (!narrow) {
    const m = 13, lcdW = 108, kw = 24, kh = 22, kg = 4, H = 52;
    const navW = nNav * kw + Math.max(0, nNav - 1) * kg;
    const W = m + lcdW + m + navW + (nExtra ? m + extraW : 0) + m;
    let x = -W / 2 + m;
    parts.lcd = { x: x + lcdW / 2, y: 0, w: lcdW, h: 30 };
    x += lcdW + m;
    for (let i = 0; i < nNav; i++) parts.nav.push({ x: x + kw / 2 + i * (kw + kg), y: 0, w: kw, h: kh });
    x += navW + m;
    for (let i = 0; i < nExtra; i++) parts.extra.push({ x: x + R + i * (2 * R + eg), y: 0, r: R });
    parts.led = { x: W / 2 - 12, y: H / 2 - 7.5 };
    return Object.assign(parts, { W, H, r: 7 });
  }
  const m = 11, H = 74, lcdW = 78, gap = 6, kh = 20, kg = 4;
  const W = Math.max(m + lcdW + (nExtra ? gap + extraW : 0) + m, 132);
  const kw = (W - 2 * m - Math.max(0, nNav - 1) * kg) / Math.max(1, nNav);
  const top = H / 2 - m - 12, bottom = -H / 2 + m + kh / 2;
  const lw = W - 2 * m - (nExtra ? gap + extraW : 0);
  parts.lcd = { x: -W / 2 + m + lw / 2, y: top, w: lw, h: 24 };
  for (let i = 0; i < nExtra; i++) parts.extra.push({ x: W / 2 - m - extraW + R + i * (2 * R + eg), y: top, r: R });
  for (let i = 0; i < nNav; i++) parts.nav.push({ x: -W / 2 + m + kw / 2 + i * (kw + kg), y: bottom, w: kw, h: kh });
  parts.led = { x: W / 2 - 10, y: H / 2 - 6.5 };
  return Object.assign(parts, { W, H, r: 7 });
}

/** Round key: a short cylinder with a softened top, standing on z = 0. */
function roundKey(r, d, c) {
  return mergeGeometries([
    loft([ring(circle(r, 0, 0, 40), 0), ring(circle(r, 0, 0, 40), d - c), ring(circle(r - c, 0, 0, 40), d)]),
    plate(circle(r - c, 0, 0, 40), [], d),
  ]);
}

function canvasTexture(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return [c, c.getContext('2d'), t];
}

const pad2 = (n) => String(n).padStart(2, '0');

/** A colour made light enough to read as lit (dark page colours like navy would not look like a lamp). */
function brighten(css) {
  const c = new THREE.Color();
  try { c.setStyle(css); } catch { return css; }
  const hsl = {}; c.getHSL(hsl);
  if (hsl.l < 0.62) c.setHSL(hsl.h, Math.min(1, hsl.s * 1.1), 0.62);
  return '#' + c.getHexString();
}

export class RetroPagerElement extends HTMLElement {
  static get observedAttributes() { return ['for', 'name']; }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${STYLE}</style><canvas aria-hidden="true"></canvas><div class="pad" aria-hidden="true"></div>
      <div class="keys" role="navigation" aria-label="${this.getAttribute('aria-label') || 'Site'}"><slot></slot></div>
      <div class="keys" aria-live="polite"></div>`;
    this._canvas = root.querySelector('canvas');
    this._pad = root.querySelector('.pad');
    this._live = root.querySelectorAll('.keys')[1];
    this._hover = -1;          // key under the pointer or keyboard focus
    this._sceneTV = null;      // TV under the pointer in the shelf
    this._pressed = -1;
    this._note = null;         // text pinned by the info key
    this._reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;

    const p = this._pad;
    p.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') this._setHover(this._pick(e)); });
    p.addEventListener('pointerleave', () => { this._release(); this._setHover(-1); });
    p.addEventListener('pointerdown', (e) => {
      const k = this._pick(e);
      if (k < 0) return;
      e.preventDefault();
      this._setHover(k);
      this._pressed = k;
      this._shelf?._sound?.click?.(0.35, 2400);
      this._layoutKeys();
    });
    p.addEventListener('pointerup', (e) => {
      const k = this._pressed;
      this._release();
      if (k >= 0 && k === this._pick(e)) this._keys[k].el.click();
      if (e.pointerType !== 'mouse') this._setHover(k);
    });
    p.addEventListener('pointercancel', () => this._release());

    this.addEventListener('click', (e) => {
      const el = e.target.closest?.('[data-tv], [data-action]');
      if (el && el.parentElement === this) this._activate(el);
    });
    this.addEventListener('focusin', (e) => { const i = this._keys?.findIndex((k) => k.el === e.target) ?? -1; if (i >= 0) this._setHover(i); });
    this.addEventListener('focusout', () => this._setHover(-1));

    this._onShelf = (e) => {
      if (e.type === 'pvm-input') { (this._channels ||= {})[e.detail.tv] = e.detail.input; }
      if (e.type === 'shelf-ready') this._paintLegends();
      if (e.type === 'shelf-focus' || e.type === 'shelf-read') { this._note = null; this._layoutKeys(); this._paintLegends(); }
      this._draw();
    };
  }

  connectedCallback() {
    if (!this._renderer) this._init();
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._mo = new MutationObserver(() => this._rebuild());
    this._mo.observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: ['data-tv', 'data-action', 'data-label', 'data-info', 'data-channel', 'data-color'] });
    this._bind();
    this._clock = setInterval(() => this._draw(), 20000);
    document.fonts?.ready.then(() => { this._paintLegends(); this._draw(); });
    document.fonts?.load?.('16px "DotGothic16"', 'A').then(() => this._draw(), () => {});
    this._resize();
  }

  disconnectedCallback() {
    this._ro?.disconnect(); this._mo?.disconnect();
    clearInterval(this._clock); clearTimeout(this._mqT);
    this._bind(true);
  }

  attributeChangedCallback(name) {
    if (!this._renderer) return;
    if (name === 'for') this._bind();
    this._draw();
  }

  /** The <retro-shelf> this pager drives. */
  get shelf() { return this._shelf || null; }

  _bind(off = false) {
    // (the pager does not follow the mouse over the scene: its screen changes only for its own keys and the shelf's state)
    const evs = ['shelf-hint', 'shelf-focus', 'shelf-read', 'shelf-ready', 'pvm-input'];
    if (this._shelf) for (const t of evs) this._shelf.removeEventListener(t, this._onShelf);
    this._nowMo?.disconnect();
    this._shelf = null;
    if (off) return;
    const id = this.getAttribute('for');
    this._shelf = (id ? document.getElementById(id) : document.querySelector('retro-shelf')) || null;
    if (this._shelf) for (const t of evs) this._shelf.addEventListener(t, this._onShelf);
    // pages say what they are playing in data-now-playing (it can change once a player reports its title)
    this._nowMo?.disconnect();
    if (this._shelf) {
      this._nowMo = new MutationObserver(() => this._draw());
      this._nowMo.observe(this._shelf, { subtree: true, attributes: true, attributeFilter: ['data-now-playing'] });
    }
  }

  // ---------------------------------------------------------------- scene --
  _init() {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true });
    } catch {
      this.setAttribute('nogl', '');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    this._renderer = renderer;
    const scene = (this._scene = new THREE.Scene());
    scene.add(new THREE.HemisphereLight(0x8f9c90, 0x040604, 0.9));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.2);
    key.position.set(-120, 300, 260);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x10a045, 1.4);   // the room's green backlight, from behind and above
    rim.position.set(60, 200, -220);
    scene.add(rim);
    this._camera = new THREE.PerspectiveCamera(7, 1, 10, 20000);   // a long lens, so the ends of the pager do not lean in
    this._ray = new THREE.Raycaster();
    this._group = new THREE.Group();
    this._group.rotation.x = TILT;
    scene.add(this._group);

    this._mat = {
      body: new THREE.MeshStandardMaterial({ color: 0x1c1b19, roughness: 0.48, metalness: 0.05 }),
      bezel: new THREE.MeshStandardMaterial({ color: 0x070707, roughness: 0.35 }),
      key: new THREE.MeshStandardMaterial({ color: 0x2b2926, roughness: 0.82 }),
      keyHot: new THREE.MeshStandardMaterial({ color: 0x4a4641, roughness: 0.7 }),
      led: new THREE.MeshBasicMaterial({ color: 0x3a0c0a }),
    };
    const [lc, lg, lt] = canvasTexture(1024, 2);
    this._lcd = { c: lc, g: lg, t: lt };
    this._mat.lcd = new THREE.MeshBasicMaterial({ map: lt, toneMapped: false });
    this._glow = new THREE.PointLight(0xb6e08a, 900, 140, 2);   // the backlit LCD lights the keys next to it
    scene.add(this._glow);
  }

  _readKeys() {
    const kids = [...this.children].filter((el) => el.matches('[data-tv], [data-action]'));
    const nav = kids.filter((el) => el.dataset.tv), extra = kids.filter((el) => !el.dataset.tv);
    let n = 0;
    return [...nav, ...extra].map((el) => {
      const tv = el.dataset.tv || null;
      return {
        el, tv, action: el.dataset.action || null,
        label: el.dataset.label || el.textContent.trim(),
        channel: tv ? el.dataset.channel || pad2(++n) : '',
      };
    });
  }

  _rebuild() {
    if (!this._renderer) return;
    if (this._body) {
      this._group.traverse((o) => { o.geometry?.dispose(); if (o.material?.map && o.material !== this._mat.lcd) { o.material.map.dispose(); o.material.dispose(); } });
      this._group.clear();
    }
    this._keys = this._readKeys();
    const narrow = this.hasAttribute('narrow');
    const nNav = this._keys.filter((k) => k.tv).length, nExtra = this._keys.length - nNav;
    const L = (this._L = layout(narrow, nNav, nExtra));
    const D = 12, g = this._group;

    this._body = new THREE.Mesh(rbox(L.W, L.H, D, L.r, 3), this._mat.body);
    this._body.position.z = -D;
    g.add(this._body);
    // a thin parting line round the shell
    const seam = new THREE.Mesh(loft([ring(rr(L.W + 0.3, L.H + 0.3, L.r), -D * 0.45), ring(rr(L.W + 0.3, L.H + 0.3, L.r), -D * 0.45 - 0.5)]), this._mat.bezel);
    g.add(seam);

    // LCD in a black bezel
    const s = L.lcd, b = 3;
    const bezel = new THREE.Mesh(mergeGeometries([
      loft([ring(rr(s.w + 2 * b, s.h + 2 * b, 5), 0), ring(rr(s.w + 2 * b, s.h + 2 * b, 5), 0.8)]),
      plate(rr(s.w + 2 * b, s.h + 2 * b, 5), [rr(s.w, s.h, 2.5).reverse()], 0.8),
      loft([ring(rr(s.w, s.h, 2.5), 0.8), ring(rr(s.w, s.h, 2.5), 0.05)]),
    ]), this._mat.bezel);
    bezel.position.set(s.x, s.y, 0);
    g.add(bezel);
    const lcd = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), this._mat.lcd);
    lcd.position.set(s.x, s.y, 0.1);
    g.add(lcd);
    // a fresh canvas and texture at this LCD's shape (resizing a texture three has already sized skews it)
    const lh = Math.round(1024 * s.h / s.w);
    if (this._lcd.c.height !== lh) {
      this._lcd.t.dispose();
      const [c, g2, t] = canvasTexture(1024, lh);
      this._lcd = { c, g: g2, t };
      this._mat.lcd.map = t;
      this._mat.lcd.needsUpdate = true;
    }
    this._glow.position.set(s.x, s.y * Math.cos(TILT), 24);

    // LED, top right
    const led = new THREE.Mesh(roundKey(1.3, 0.8, 0.3), this._mat.led);
    led.position.set(L.led.x, L.led.y, 0);
    g.add(led);
    this._ledMesh = led;

    // keys
    let ni = 0, ei = 0;
    for (const k of this._keys) {
      const p = k.tv ? L.nav[ni++] : L.extra[ei++];
      const hold = new THREE.Group();
      hold.position.set(p.x, p.y, 0);
      const depth = 4.5;
      const geo = k.tv ? rbox(p.w, p.h, depth, 4, 1.6) : roundKey(p.r, depth, 1.4);
      const cap = new THREE.Mesh(geo, this._mat.key);
      // a dark well round the key
      const well = new THREE.Mesh(k.tv ? plate(rr(p.w + 2.4, p.h + 2.4, 5), [rr(p.w, p.h, 4).reverse()], 0.05) : plate(circle(p.r + 1.2, 0, 0, 40), [circle(p.r, 0, 0, 40).reverse()], 0.05), this._mat.bezel);
      const lw = k.tv ? p.w - 3.2 : (p.r - 1.4) * 2, lh = k.tv ? p.h - 3.2 : lw;
      const [lc2, lg2, lt2] = canvasTexture(Math.round(lw * 16), Math.round(lh * 16));
      const legend = new THREE.Mesh(new THREE.PlaneGeometry(lw, lh), new THREE.MeshStandardMaterial({ map: lt2, transparent: true, roughness: 0.8, alphaTest: 0.02, emissive: 0xffffff, emissiveMap: lt2, emissiveIntensity: 0 }));
      legend.position.z = depth + 0.05;
      const top = new THREE.Group();
      top.add(cap, legend);
      hold.add(well, top);
      g.add(hold);
      Object.assign(k, { top, cap, w: lw, h: lh, legend: { c: lc2, g: lg2, t: lt2, mat: legend.material } });
      for (const m of [cap, legend]) m.userData.key = this._keys.indexOf(k);
    }
    this._paintLegends();
    this._layoutKeys();
    this._fit();
    this._draw();
  }

  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth, narrow = w < NARROW;
    if (narrow !== this.hasAttribute('narrow') || !this._keys) {
      if (narrow) this.setAttribute('narrow', ''); else this.removeAttribute('narrow');
      this._rebuild();
      return;
    }
    this._fit();
    this._render();
  }

  /** Size the pager to the element: about 780 px wide at most, never taller than the element. */
  _fit() {
    const w = this.clientWidth, h = this.clientHeight, L = this._L;
    if (!w || !h || !L) return;
    this._renderer.setSize(w, h, false);
    const cam = this._camera;
    cam.aspect = w / h;
    const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const target = Math.min(w - 24, 780);
    const tallH = L.H * Math.cos(TILT) + 16 * Math.abs(Math.sin(TILT));
    const d = Math.max((L.W * h) / (2 * target * tan), tallH / (2 * 0.84 * tan));
    cam.position.set(0, 0, d);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    // the pad that takes pointer events covers just the pager, so the scene behind stays usable
    this._group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(this._group), pts = [];
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) pts.push(new THREE.Vector3(x, y, z).project(cam));
    const xs = pts.map((p) => (p.x + 1) / 2 * w), ys = pts.map((p) => (1 - p.y) / 2 * h);
    Object.assign(this._pad.style, { left: `${Math.min(...xs)}px`, top: `${Math.min(...ys)}px`, width: `${Math.max(...xs) - Math.min(...xs)}px`, height: `${Math.max(...ys) - Math.min(...ys)}px` });
  }

  _pick(e) {
    const r = this._canvas.getBoundingClientRect();
    this._ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), this._camera);
    const hit = this._ray.intersectObject(this._group, true).find((h) => h.object.userData.key !== undefined);
    return hit ? hit.object.userData.key : -1;
  }

  _release() {
    if (this._pressed < 0) return;
    this._pressed = -1;
    this._layoutKeys();
  }

  _setHover(i) {
    if (i === this._hover) return;
    if (i >= 0) this._note = null;
    this._hover = i;
    this._pad.style.cursor = i >= 0 ? 'pointer' : '';
    this._layoutKeys();
    this._draw();
  }

  // ---------------------------------------------------------------- state --
  _state() {
    const s = this._shelf;
    return { focused: s?._focusKey || null, reading: s?._reading?.id || null, muted: !!s?.hasAttribute('muted') };
  }

  /** Key heights: pressed keys sink, the set being viewed stays latched down. */
  _layoutKeys() {
    if (!this._keys) return;
    const st = this._state(), sceneKey = this._keys.findIndex((k) => k.tv && k.tv === this._sceneTV);
    this._keys.forEach((k, i) => {
      const latched = k.tv && k.tv === (st.reading || st.focused);
      k.top.position.z = i === this._pressed ? -2.6 : latched ? -1.4 : 0;
      k.cap.material = i === this._hover || i === sceneKey ? this._mat.keyHot : this._mat.key;
    });
    this._render();
  }

  _tvColor(tv) {
    const k = this._keys?.find((x) => x.tv === tv);
    if (k?.el.dataset.color) return k.el.dataset.color;
    const page = this._shelf?.page?.(tv) || this._shelf?.querySelector?.(`[slot="${tv}"]`);
    const bg = page ? getComputedStyle(page).backgroundColor : '';
    return bg && !bg.endsWith(', 0)') && bg !== 'transparent' ? bg : '#e8e4da';
  }

  _paintLegends() {
    if (!this._keys) return;
    const st = this._state();
    for (const k of this._keys) {
      const { c, g, t } = k.legend, s = 16;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, c.width, c.height);
      g.scale(s, s);
      const w = k.w, h = k.h, ink = '#d8d3c7';
      g.fillStyle = ink; g.strokeStyle = ink; g.textAlign = 'center';
      if (k.tv) {
        // the key of the TV in view shines: its dot, number and word light up (and glow, see emissive below)
        const lit = k.tv === (st.reading || st.focused);
        const dotColor = lit ? brighten(this._tvColor(k.tv)) : this._tvColor(k.tv);
        g.font = `500 ${h * 0.24}px ${MONO}`;
        const chW = g.measureText(k.channel).width, dotR = h * 0.075;
        const cx = w / 2 + dotR + 0.6, cy = h * 0.34;
        g.fillStyle = lit ? '#fff2d2' : '#9d988d';
        if (lit) { g.shadowColor = 'rgba(255, 236, 190, 0.9)'; g.shadowBlur = 2; }
        g.textBaseline = 'middle';
        g.fillText(k.channel, cx, cy);
        g.beginPath(); g.arc(cx - chW / 2 - 1.4 - dotR, cy, dotR, 0, Math.PI * 2);
        g.fillStyle = dotColor;
        g.globalAlpha = lit ? 1 : 0.55;
        if (lit) { g.shadowColor = dotColor; g.shadowBlur = 3; }
        g.fill();
        g.globalAlpha = 1;
        g.fillStyle = lit ? '#fff8e6' : ink;
        if (lit) { g.shadowColor = 'rgba(255, 236, 190, 0.85)'; g.shadowBlur = 2.2; } else g.shadowBlur = 0;
        g.textBaseline = 'alphabetic';
        let size = h * 0.36;
        g.font = `700 ${size}px ${LEGEND}`;
        const label = k.label.toUpperCase();
        const lw = g.measureText(label).width;
        if (lw > w * 0.9) { size *= (w * 0.9) / lw; g.font = `700 ${size}px ${LEGEND}`; }
        g.fillText(label, w / 2, h * 0.84);
        g.shadowBlur = 0;
        k.legend.mat.emissiveIntensity = lit ? 1.1 : 0;
      } else {
        g.lineWidth = w * 0.09; g.lineCap = 'round'; g.lineJoin = 'round';
        const cx = w / 2, cy = h / 2, u = w * 0.22;
        g.globalAlpha = k.action === 'back' && !st.focused ? 0.4 : 1;
        if (k.action === 'back') {
          g.beginPath(); g.moveTo(cx + u, cy); g.lineTo(cx - u, cy); g.moveTo(cx - u * 0.1, cy - u * 0.9); g.lineTo(cx - u, cy); g.lineTo(cx - u * 0.1, cy + u * 0.9); g.stroke();
        } else if (k.action === 'sound') {
          g.beginPath(); g.moveTo(cx - u * 1.1, cy - u * 0.4); g.lineTo(cx - u * 0.6, cy - u * 0.4); g.lineTo(cx, cy - u); g.lineTo(cx, cy + u); g.lineTo(cx - u * 0.6, cy + u * 0.4); g.lineTo(cx - u * 1.1, cy + u * 0.4); g.closePath(); g.fill();
          g.beginPath();
          if (st.muted) { g.moveTo(cx + u * 0.4, cy - u * 0.45); g.lineTo(cx + u * 1.2, cy + u * 0.45); g.moveTo(cx + u * 1.2, cy - u * 0.45); g.lineTo(cx + u * 0.4, cy + u * 0.45); }
          else { g.arc(cx + u * 0.2, cy, u * 0.6, -0.9, 0.9); g.moveTo(cx + u * 0.2 + Math.cos(-0.9) * u * 1.1, cy + Math.sin(-0.9) * u * 1.1); g.arc(cx + u * 0.2, cy, u * 1.1, -0.9, 0.9); }
          g.stroke();
        } else if (k.action === 'info') {
          g.font = `700 ${h * 0.62}px Georgia, "Times New Roman", serif`;
          g.textBaseline = 'middle';
          g.fillText('i', cx, cy + h * 0.03);
        } else {
          g.font = `700 ${h * 0.5}px ${LEGEND}`;
          g.textBaseline = 'middle';
          g.fillText((k.label[0] || '?').toUpperCase(), cx, cy);
        }
        g.globalAlpha = 1;
      }
      t.needsUpdate = true;
    }
    this._render();
  }

  // ------------------------------------------------------------------ LCD --
  _text() {
    const st = this._state();
    const now = new Date(), clock = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    const name = this.getAttribute('name') || location.hostname || 'PAGER';
    const scene = this._sceneTV ? this._keys?.find((k) => k.tv === this._sceneTV) : null;
    const k = this._hover >= 0 ? this._keys[this._hover] : scene;
    if (k) {
      if (k.tv) {
        const readable = this._shelf?.canRead?.(k.tv) ?? true;
        const go = k.tv === st.reading ? 'Reading now' : k.tv === st.focused ? (readable ? 'Press again to read it full screen' : 'Press a channel key on the set') : null;
        return { left: `TV ${k.channel}  ${k.label}`, right: k.tv.toUpperCase(), main: k.el.dataset.info || k.label, sub: go };
      }
      if (k.action === 'back') return { left: 'BACK', right: clock, main: st.reading ? 'Back to the TV' : st.focused ? 'Back to the room' : 'You are in the room' };
      if (k.action === 'sound') return { left: 'SOUND', right: st.muted ? 'OFF' : 'ON', main: st.muted ? 'Sound is off. Press to turn it on' : 'Sound is on. Press to mute' };
      return { left: k.label.toUpperCase(), right: clock, main: k.el.dataset.info || k.label };
    }
    if (this._note) return { left: 'INFO', right: clock, main: this._note };
    const on = st.reading || st.focused;
    const cur = on && this._keys?.find((x) => x.tv === on);
    const hint = this._shelf?.hint || 'Tap a TV to look closer';
    // a TV that changes channel shows the one on air, and what is playing on it
    const tuned = on && this._channels?.[on], chan = tuned ? 'CH ' + tuned.replace(/^ch-/, '').toUpperCase().padStart(2, '0') : null;
    const first = on && this._shelf?.tv?.(on)?._meta?.inputs?.[0];
    if (tuned && tuned !== first) {
      const page = this._shelf.querySelector(`[slot="${on}:${tuned}"]`);
      if (page) return { left: `${chan}  NOW PLAYING`, right: page.dataset.kind || '', main: page.dataset.nowPlaying || page.title || 'On air' };
      return { left: chan, right: clock, main: 'No signal on this channel' };
    }
    const curName = cur && cur.label.toUpperCase() !== 'TV' ? `TV ${cur.channel}  ${cur.label}` : cur ? `TV ${cur.channel}` : null;
    return { left: curName || name, right: chan || clock, main: hint };
  }

  _draw() {
    if (!this._L || !this._renderer) return;
    const { c, g, t } = this._lcd, W = c.width, H = c.height, txt = this._text();
    if (this._hover < 0 && !this._sceneTV && this._live.textContent !== txt.main) this._live.textContent = txt.main;
    // backlit panel, a little darker at the top where the bezel shades it
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#87a061'); bg.addColorStop(0.18, '#a3bc7b'); bg.addColorStop(1, '#93ad6b');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const px = W * 0.035, ink = '#162010';
    const top = H * 0.27, mainSize = H * 0.32;
    g.fillStyle = ink;
    g.textBaseline = 'alphabetic';
    g.font = `400 ${H * 0.21}px ${DOTS}`;
    g.globalAlpha = 0.72;
    g.textAlign = 'left'; g.fillText(txt.left.toUpperCase(), px, top);
    g.textAlign = 'right'; g.fillText(txt.right, W - px, top);
    g.globalAlpha = 1;
    // main line: scrolls like a pager when it is too long
    g.font = `400 ${mainSize}px ${DOTS}`;
    g.textAlign = 'left';
    const avail = W - 2 * px, msg = txt.sub ? `${txt.main} · ${txt.sub}` : txt.main;
    const tw = g.measureText(msg).width;
    if (msg !== this._mqText) { this._mqText = msg; this._mq0 = performance.now(); }
    let off = 0;
    clearTimeout(this._mqT);
    if (tw > avail) {
      if (this._reduced) {
        let s = msg;
        while (s.length > 1 && g.measureText(s + '…').width > avail) s = s.slice(0, -1);
        g.fillText(s + '…', px, H * 0.8);
      } else {
        // runs round like a pager: the text, a gap, the text again, resting 2 s at the start of each pass
        // so its beginning can be read
        const speed = W * 0.14, loop = tw + avail * 0.35, hold = 2000, cycle = hold + (loop / speed) * 1000;
        off = Math.max(0, ((performance.now() - this._mq0) % cycle) - hold) / 1000 * speed;
        g.save(); g.beginPath(); g.rect(px, 0, avail, H); g.clip();
        g.fillText(msg, px - off, H * 0.8);
        g.fillText(msg, px - off + loop, H * 0.8);
        g.restore();
        this._mqT = setTimeout(() => this._draw(), 33);
      }
    } else g.fillText(msg, px, H * 0.8);
    // pixel grid and a faint shadow under the bezel
    g.fillStyle = 'rgba(20, 30, 10, 0.07)';
    for (let x = 0; x < W; x += 4) g.fillRect(x, 0, 1, H);
    for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);
    const sh = g.createLinearGradient(0, 0, 0, H * 0.22);
    sh.addColorStop(0, 'rgba(0, 0, 0, 0.35)'); sh.addColorStop(1, 'rgba(0, 0, 0, 0)');
    g.fillStyle = sh; g.fillRect(0, 0, W, H * 0.22);
    t.needsUpdate = true;
    // the LED blinks on while something is being described
    const busy = this._hover >= 0 || !!this._sceneTV;
    this._mat.led.color.set(busy ? 0xff3b2f : 0x3a0c0a);
    this._render();
  }

  _render() {
    if (!this._renderer || !this._L) return;
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => { this._raf = 0; this._renderer.render(this._scene, this._camera); });
  }

  // -------------------------------------------------------------- actions --
  _activate(el) {
    const s = this._shelf, st = this._state(), tv = el.dataset.tv, act = el.dataset.action;
    this._note = null;
    if (tv && s) {
      const readable = s.canRead?.(tv) ?? true;
      if (st.reading && readable) s.openReader(tv);
      else if (st.reading) { s.closeReader(); s.focusTV(tv); }
      else if (st.focused === tv) { if (readable) s.openReader(tv); }
      else s.focusTV(tv);
    } else if (act === 'back' && s) {
      if (st.reading) s.closeReader();
      else if (st.focused) s.unfocus();
    } else if (act === 'sound' && s) {
      s.toggleAttribute('muted');
      this._paintLegends();
    } else if (act === 'info') {
      this._note = el.dataset.info || el.textContent.trim();
    }
    this.dispatchEvent(new CustomEvent('pager-press', { detail: { tv: tv || null, action: act || null }, bubbles: true }));
    this._layoutKeys();
    this._paintLegends();
    this._draw();
  }
}
