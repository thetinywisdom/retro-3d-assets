// <retro-giant>: Giant, the green hologram robot with a PVM-20M4E head (characters/giant), drawn in
// the same additive-green look as <retro-map>, on its own transparent canvas.
//
//   <retro-giant src="giant.glb"></retro-giant>
//   giant.say('happy')        // a reaction: the clip and the matching face
//   giant.talk(true / false)  // mouth and body talking, then back to idle
//   giant.face('thinking')    // eye expression only
//
// The model loads the first time the element is shown. It draws every frame only while it is on screen.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GREEN = 0x8dff9a;
const ONE_SHOTS = ['yes', 'no', 'happy', 'surprised', 'sad', 'wink', 'angry', 'dizzy'];

const STYLE = /* css */ `
:host { display: block; position: relative; }
canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
`;

/** Two square spirals, one in place of each eye in `geo` (the original dizzy eyes), flat in the same plane,
 *  built like the other faces: bars as thick as the open eyes' stroke, inside the open eye's box (`neutral`).
 *  Returns null if the shapes are not what was expected. */
function spiralEyes(geo, neutral) {
  const v = new THREE.Vector3();
  const box = (attr) => { const lo = new THREE.Vector3(Infinity, Infinity, Infinity), hi = lo.clone().negate();
    for (let i = 0; i < attr.count; i++) { v.fromBufferAttribute(attr, i); lo.min(v); hi.max(v); } return [lo, hi]; };
  const np = neutral.getAttribute('position'), dp = geo.getAttribute('position');
  if (!np || !dp) return null;
  const [lo, hi] = box(np), span = hi.clone().sub(lo);
  const [ax, ay, az] = [0, 1, 2].sort((a, b) => span.getComponent(b) - span.getComponent(a));   // eyes side by side along ax
  const mid = (lo.getComponent(ax) + hi.getComponent(ax)) / 2;
  const depth = (() => { const [l, h] = box(dp); return (l.getComponent(az) + h.getComponent(az)) / 2; })();
  const out = [];
  for (const side of [-1, 1]) {
    // this open eye's box: its centre and size; the stroke is 0.09 / 0.44 of the size (build_giant.py: ET, ES)
    const l = new THREE.Vector3(Infinity, Infinity, Infinity), h = l.clone().negate();
    for (let i = 0; i < np.count; i++) { v.fromBufferAttribute(np, i); if ((v.getComponent(ax) - mid) * side > 0) { l.min(v); h.max(v); } }
    if (!(h.getComponent(ax) > l.getComponent(ax))) return null;
    const cx = (l.getComponent(ax) + h.getComponent(ax)) / 2, cy = (l.getComponent(ay) + h.getComponent(ay)) / 2;
    const half = (h.getComponent(ax) - l.getComponent(ax)) / 2, t = half * 2 * 0.09 / 0.44;
    // in strokes from the box's top-left: the outer square, then a turn inwards (mirrored on the left eye)
    const k = half / t;                                                 // half the box, in strokes
    const bars = [
      [-k, k - 1, k, k],                                                // top
      [k - 1, -k, k, k - 1],                                            // right
      [-k, -k, k - 1, -k + 1],                                          // bottom
      [-k, -k + 1, -k + 1, k - 2],                                      // left, stopping a stroke under the top
      [-k + 1, k - 3, k - 2, k - 2],                                    // inner top
      [k - 3, -k + 2, k - 2, k - 3],                                    // inner right, down into the middle
    ];
    const pt = (x, y) => { const p = new THREE.Vector3(); p.setComponent(ax, cx + x * t * -side); p.setComponent(ay, cy + y * t); p.setComponent(az, depth); return p; };
    for (const [x0, y0, x1, y1] of bars) {
      const a = pt(x0, y0), b = pt(x1, y0), c = pt(x1, y1), d = pt(x0, y1);
      out.push(a, b, c, a, c, d);
    }
  }
  const g = new THREE.BufferGeometry().setFromPoints(out);
  g.computeVertexNormals();
  return g;
}

export class RetroGiantElement extends HTMLElement {
  static get observedAttributes() { return ['src']; }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${STYLE}</style><canvas aria-hidden="true"></canvas>`;
    this._canvas = root.querySelector('canvas');
    this._reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._frame = (now) => this._render(now);
    this._clock = new THREE.Clock();   // (THREE.Timer in newer three)
  }

  connectedCallback() {
    this._ro = new ResizeObserver(() => { this._resize(); this._wake(); });
    this._ro.observe(this);
    this._io = new IntersectionObserver((es) => { this._visible = es.some((e) => e.isIntersecting); if (this._visible) { this._load(); this._wake(); } });
    this._io.observe(this);
  }

  disconnectedCallback() {
    this._ro?.disconnect(); this._io?.disconnect();
    cancelAnimationFrame(this._raf); this._raf = 0;
  }

  attributeChangedCallback() { this._loaded = null; }

  /** A promise that settles once the model is in. */
  get ready() { return this._load(); }

  _load() {
    if (this._loaded) return this._loaded;
    const src = this.getAttribute('src');
    if (!src) return Promise.resolve();
    this._init();
    this._loaded = new GLTFLoader().loadAsync(src).then((gltf) => {
      const giant = gltf.scene;
      // premultiplied additive light: colour and alpha both add up, so the see-through canvas holds valid
      // premultiplied pixels and looks the same on every GPU (plain additive light on a see-through canvas
      // came out invisible on some phones)
      const add = { transparent: true, blending: THREE.AdditiveBlending, premultipliedAlpha: true, depthWrite: false };
      this._mats = {
        fill: new THREE.MeshBasicMaterial({ color: GREEN, opacity: 0.07, side: THREE.DoubleSide, ...add }),
        screen: new THREE.MeshBasicMaterial({ color: GREEN, opacity: 0.2, ...add }),
        edge: new THREE.LineBasicMaterial({ color: GREEN, opacity: 0.9, ...add }),
        eye: new THREE.MeshBasicMaterial({ color: 0xd8ffe0, side: THREE.DoubleSide, ...add }),
      };
      giant.traverse((o) => {
        if (o.isLineSegments || o.isLine) o.material = this._mats.edge;
        else if (o.isMesh) {
          const n = o.material?.name;
          o.material = n === 'holo_eye' ? this._mats.eye : n === 'holo_screen' ? this._mats.screen : this._mats.fill;
        }
      });
      // the dizzy eyes in the file are short bars round a tight spiral, which merge into a white blob at the
      // size the site shows him: draw each as one thin spiral line instead, in the same place
      const neutral = giant.getObjectByName('eyes_neutral');
      for (const name of ['eyes_dizzy', 'clip_eyes_dizzy']) {
        const m = giant.getObjectByName(name);
        if (m?.isMesh && neutral?.isMesh) { const g = spiralEyes(m.geometry, neutral.geometry); if (g) { m.geometry.dispose(); m.geometry = g; } }
      }
      this._giant = giant;
      this._eyes = giant.getObjectByName('Eyes');
      this._scene.add(giant);
      this._mixer = new THREE.AnimationMixer(giant);
      this._actions = Object.fromEntries(gltf.animations.map((c) => [c.name, this._mixer.clipAction(c)]));
      for (const n of ONE_SHOTS) if (this._actions[n]) { this._actions[n].setLoop(THREE.LoopOnce, 1); this._actions[n].clampWhenFinished = true; }
      this._mixer.addEventListener('finished', (e) => { if (ONE_SHOTS.includes(e.action.getClip().name)) this.play(this._talking ? 'talk' : 'idle'); });
      this.face('neutral');
      this._current = this._actions.idle?.play();
      // fit the camera to the figure, ring included
      const box = new THREE.Box3().setFromObject(giant);
      this._size = box.getSize(new THREE.Vector3());
      this._center = box.getCenter(new THREE.Vector3());
      this._resize();
      this._wake();
      this.dispatchEvent(new CustomEvent('giant-ready'));
    }).catch((err) => { console.warn('retro-giant: could not load', src, err); this._error = String(err?.message || err); this._loaded = null; });
    return this._loaded;
  }

  _init() {
    if (this._renderer && !this._lost) return;
    // a phone can drop a page's drawing surfaces (it allows only so many): when that happens to this one,
    // start again on a fresh canvas the next time it is shown; the model and its materials carry over
    if (this._renderer) {
      this._renderer.dispose();
      const fresh = document.createElement('canvas');
      fresh.setAttribute('aria-hidden', 'true');
      this._canvas.replaceWith(fresh);
      this._canvas = fresh;
      this._renderer = null;
    }
    this._lost = false;
    this._canvas.addEventListener('webglcontextlost', () => { this._lost = true; }, { once: true });
    try { this._error = null; this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true, premultipliedAlpha: true }); } catch { return; }
    this._renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
    this._renderer.setClearColor(0x000000, 0);
    this._scene ||= new THREE.Scene();
    this._camera ||= new THREE.PerspectiveCamera(24, 1, 0.05, 50);
    this._resize();
  }

  _resize() {
    if (!this._renderer) return;
    const w = this.clientWidth || 1, h = this.clientHeight || 1;
    this._renderer.setSize(w, h, false);
    this._camera.aspect = w / h;
    if (this._size) {
      const tan = Math.tan(THREE.MathUtils.degToRad(this._camera.fov / 2));
      const d = Math.max((this._size.y * 0.56) / tan, (this._size.x * 0.75) / (tan * this._camera.aspect));
      const c = this._center;
      this._camera.position.set(c.x, c.y + this._size.y * 0.12, c.z + d);
      this._camera.lookAt(c.x, c.y, c.z);
    }
    this._camera.updateProjectionMatrix();
  }

  /** What the element is doing, for checking on a device. */
  get status() {
    const gl = this._renderer?.getContext();
    return { renderer: !!this._renderer, lost: !!(this._lost || gl?.isContextLost()), model: !!this._giant, visible: !!this._visible,
      canvas: `${this._canvas.width}x${this._canvas.height}`, box: `${this.clientWidth}x${this.clientHeight}`, reduced: this._reduced,
      frames: this._frames || 0, error: this._error || null, gpu: gl ? (gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER) || '') : '' };
  }

  /** Eye expression: neutral, happy, blink, surprised, sad, thinking, wink, angry, dizzy. */
  face(name) {
    if (!this._eyes) return;
    for (const e of this._eyes.children) e.visible = e.name === `eyes_${name}`;
    this._wake();
  }

  /** Play a clip by name, cross-faded. */
  play(name, fade = 0.3) {
    const next = this._actions?.[name];
    if (!next || next === this._current) return;
    next.reset().play();
    if (this._current) this._current.crossFadeTo(next, fade, false);
    this._current = next;
    this._wake();
  }

  /** A reaction with its matching face, kept after the clip ends. */
  say(mood) {
    if (!this._actions) return;
    if (mood && mood !== 'neutral') { this.face(mood); this.play(mood); } else { this.face('neutral'); this.play(this._talking ? 'talk' : 'idle'); }
  }

  /** Talking on or off: the mouth moves while the text appears. */
  talk(on) {
    this._talking = !!on;
    const name = this._current?.getClip().name;
    if (on && (name === 'idle' || name === 'thinking')) this.play('talk');
    if (!on && name === 'talk') this.play('idle');
  }

  _wake() {
    if (this._renderer && this._renderer.getContext().isContextLost()) this._lost = true;
    if (this._lost) this._init();
    if (!this._raf && this._renderer) this._raf = requestAnimationFrame(this._frame);
  }

  _render(now) {
    this._raf = 0;
    if (!this._renderer || !this._visible || !this.isConnected) return;
    if (this._lost) { this._init(); if (!this._renderer) return; }
    const dt = Math.min(0.1, this._clock.getDelta());
    if (this._mixer && !this._reduced) this._mixer.update(dt);
    if (this._giant && !this._reduced) {
      // a slow sway and a faint hologram flicker
      const t = now / 1000;
      this._giant.rotation.y = Math.sin(t * 0.4) * 0.25;
      const f = 0.9 + 0.1 * Math.sin(t * 29) * Math.sin(t * 7.1) - (Math.random() < 0.015 ? 0.3 : 0);
      this._mats.edge.opacity = 0.9 * f; this._mats.fill.opacity = 0.07 * f; this._mats.screen.opacity = 0.2 * f;
    }
    this._renderer.render(this._scene, this._camera);
    this._frames = (this._frames || 0) + 1;
    if (!this._reduced) this._raf = requestAnimationFrame(this._frame);
  }
}
