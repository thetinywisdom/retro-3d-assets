// Sony PVM-20M4E (20-inch HR Trinitron studio monitor).
//
// Cabinet size is from the published specification for the PVM-20M4 family:
// 450 x 458 x 503 mm. No photographs or panel drawing were available, so the
// front layout (control order, label positions, tally lamp) is reconstructed
// from the manual's list of controls and is approximate.
import * as THREE from 'three';
import {
  Kit, rr, circle, ring, loft, plate, well, skipSides, straightFace, faceLocal, lay,
  rectOutline, holeRect, holeFits, boxCavity,
} from '../kit.js';
import { makeBrandTexture, makeDrawTexture, makeTallyTexture } from '../labels.js';

const W = 450, H = 458, D = 503, FOOT = 12, BODY_H = H - FOOT;
const FZ = D / 2, BZ = -D / 2, CY = FOOT + BODY_H / 2;

const B = (id, label, x, extra = {}) => ({ id, label, kind: 'button', role: id, x, ...extra });
const BUTTONS = [
  B('line-a', 'Line A input', -196, { radio: 'input', legend: 'LINE A' }),
  B('line-b', 'Line B input', -180, { radio: 'input', legend: 'LINE B' }),
  B('rgb', 'RGB input', -164, { radio: 'input', legend: 'RGB' }),
  B('sync', 'External sync', -144, { latch: true, legend: 'EXT SYNC' }),
  B('16-9', '16:9', -120, { latch: true, role: 'wide', legend: '16:9' }),
  B('hv-delay', 'H/V delay', -104, { latch: true, legend: 'H/V DELAY' }),
  B('underscan', 'Under scan', -88, { latch: true, legend: 'UNDERSCAN' }),
  B('blue-only', 'Blue only', -72, { latch: true, legend: 'BLUE ONLY' }),
  B('degauss', 'Degauss', -52, { legend: 'DEGAUSS' }),
  B('menu', 'Menu', -26, { legend: 'MENU' }),
  B('up', 'Menu up', -10, { legend: '▲' }),
  B('down', 'Menu down', 6, { legend: '▼' }),
  B('enter', 'Menu enter', 22, { legend: 'ENTER' }),
];
const KNOBS = [
  ['aper', 'APERTURE', 'Aperture (sharpness)'], ['bright', 'BRIGHT', 'Brightness'], ['chroma', 'CHROMA', 'Chroma (colour)'],
  ['phase', 'PHASE', 'Phase (hue)'], ['contr', 'CONTRAST', 'Contrast'], ['volume', 'VOLUME', 'Volume'],
].map(([id, legend, label], i) => ({ id, legend, label, kind: 'knob', role: id, x: 52 + i * 23 }));
const POWER_X = 198;

export const META = {
  id: 'pvm-20m4e',
  name: 'Sony PVM-20M4E',
  size: { w: W, h: H, d: D },
  inputs: ['line-a', 'line-b', 'rgb'],
  inputOf: (s) => s.radio.input,
  noSignal: 'black',
  controls: [{ id: 'power', label: 'Power', kind: 'button', role: 'power' }, ...BUTTONS, ...KNOBS],
};

export function buildMonitor({ tallyLogo = null } = {}) {
  const k = new Kit(META.name);
  k.mat('case', { color: 0xa9a8a0, roughness: 0.7, metalness: 0.05, bumpMap: k.grain, bumpScale: 0.5, roughnessMap: k.rough });
  k.mat('funnel', { color: 0x242424, roughness: 0.7 });
  k.mat('panel', { color: 0x77766f, roughness: 0.62 });
  const keyMat = () => new THREE.MeshStandardMaterial({ name: 'key', color: 0x3b3b39, roughness: 0.5 });
  const knobMat = () => new THREE.MeshStandardMaterial({ name: 'knob', color: 0x2a2a29, roughness: 0.42 });

  // ---- cabinet --------------------------------------------------------------
  const R = 3;
  const prof = (inset) => rr(W - 2 * inset, BODY_H - 2 * inset, 7 - inset, 0, CY);
  // Straight wrap, with top and both sides left open for vents and the carry
  // handle. The rounded front edge is a second loft so those openings stop
  // where the corner radius starts.
  k.add('case', loft([ring(prof(0), BZ), ring(prof(0), FZ - R)], { skip: skipSides('top', 'left', 'right') }));
  const frontRings = [ring(prof(0), FZ - R)];
  for (let i = 1; i <= 4; i++) {
    const t = (i / 4) * (Math.PI / 2);
    frontRings.push(ring(prof(R * (1 - Math.cos(t))), FZ - R + R * Math.sin(t)));
  }
  k.add('case', loft(frontRings));
  k.add('case', plate(prof(0), [], 0).rotateY(Math.PI).translate(0, 0, BZ));
  k.add('panel', new THREE.PlaneGeometry(W - 50, BODY_H - 50).rotateY(Math.PI).translate(0, CY, BZ - 0.06));

  const scr = { w: 406, h: 312, cy: H - 26 - 156 };
  const openOut = rr(scr.w + 2, scr.h + 2, 11, 0, scr.cy);
  const pan = { w: 420, h: 46, cy: FOOT + 40 };
  const panelOut = rr(pan.w, pan.h, 3, 0, pan.cy);
  const tal = { w: 18, h: 8, cy: H - 13 };
  const tallyOut = rr(tal.w, tal.h, 1, 0, tal.cy);
  k.add('case', plate(prof(R), [openOut, panelOut, tallyOut], FZ));

  // ---- screen: shallow dark funnel, then the 20-inch tube ----------------------
  const glass = { w: 392, h: 298 }, depth = 15;
  k.add('case', loft([ring(openOut, FZ), ring(rr(scr.w, scr.h, 10, 0, scr.cy), FZ - 1)]));
  k.add('funnel', loft([ring(rr(scr.w, scr.h, 10, 0, scr.cy), FZ - 1), ring(rr(glass.w + 4, glass.h + 4, 14, 0, scr.cy), FZ - depth)]));
  k.add('black', loft([ring(rr(glass.w + 4, glass.h + 4, 14, 0, scr.cy), FZ - depth), ring(rr(glass.w, glass.h, 13, 0, scr.cy), FZ - depth - 2.5)]));
  k.crt({ cx: 0, cy: scr.cy, edgeZ: FZ - depth - 3.2, glassW: glass.w, glassH: glass.h, picW: 386, picH: 289.5, RH: 1500, RV: 6500, corner: 11 });

  // ---- tally lamp: a short bezel lip, then a dark shaft, plate at the back --
  const tf = { w: tal.w - 2, h: tal.h - 2 };
  const tallyDepth = 6;
  const tallyLip = rr(tal.w - 1.2, tal.h - 1.2, 0.7, 0, tal.cy);
  k.add('case', loft([ring(tallyOut, FZ), ring(tallyLip, FZ - 1.2)]));
  k.add('black', loft([ring(tallyLip, FZ - 1.2), ring(rr(tf.w, tf.h, 0.5, 0, tal.cy), FZ - tallyDepth)]));
  const tallyMat = new THREE.MeshStandardMaterial({ name: 'tally', color: 0xd9d9d4, roughness: 0.45, emissive: 0xffffff, emissiveIntensity: 0, map: makeTallyTexture(tallyLogo, tf.w, tf.h) });
  tallyMat.emissiveMap = tallyMat.map;
  const tally = k.mesh(new THREE.PlaneGeometry(tf.w, tf.h).translate(0, tal.cy, FZ - tallyDepth + 0.15), tallyMat, 'tally');
  tally.userData.size = tf;

  // ---- badges on the frame under the screen ---------------------------------------
  const brand = { w: 46, h: 10.5, style: '#2c2c2a' };
  const badgeY = FOOT + 86;
  brand.mesh = k.decal(makeBrandTexture(brand), brand.w + 1.2, brand.h + 1.2, 0, badgeY, FZ + 0.05,
    { roughness: 0.5, alphaTest: 0.4, transparent: false, depthWrite: true });
  brand.mesh.name = 'brand-badge';
  k.decal(makeDrawTexture(120, 12, 12, (g, font) => {
    g.fillStyle = '#3a3a37'; g.textAlign = 'left';
    g.font = `900 5px ${font}`; g.fillText('HR', 2, 8.2);
    g.font = `900 7.4px "Arial Black", ${font}`; g.fillText('Trinitron', 13, 8.6);
  }), 120, 12, -143, badgeY, FZ + 0.04);
  k.decal(makeDrawTexture(60, 8, 16, (g, font) => {
    g.fillStyle = '#3a3a37'; g.textAlign = 'right'; g.font = `600 4.4px ${font}`; g.fillText('PVM-20M4E', 59, 5.8);
  }), 60, 8, 176, badgeY, FZ + 0.04);

  // ---- control strip ------------------------------------------------------------------
  const panelZ = FZ - 1.5, y = pan.cy - 2;
  k.add('case', loft([ring(panelOut, FZ), ring(panelOut, panelZ)]));
  const sockets = [];
  const socket = (outline, depth = 3) => {
    sockets.push(outline);
    const w = well(outline, panelZ, depth);
    k.add('black', w.walls); k.add('black', w.floor);
  };
  for (const b of BUTTONS) {
    socket(rr(12.4, 8.4, 1, b.x, y));
    const lit = b.latch || b.radio;
    const lamp = lit ? k.lamp(new THREE.CircleGeometry(1.25, 14).translate(b.x, y + 9.5, panelZ + 0.05), 0x45ff66, 'lamp-' + b.id) : null;
    if (lamp) lamp.raycast = () => {};
    k.button({ id: b.id, pos: [b.x, y, panelZ], w: 11, h: 7, out: 2.6, travel: 1.4, len: 8, r: 0.8, c: 0.5, material: keyMat(), lamp });
  }
  for (const n of KNOBS) {
    socket(circle(8.6, n.x, y - 1));
    k.knob({ id: n.id, pos: [n.x, y - 1, panelZ - 3], radius: 7.3, len: 11, material: knobMat() });
  }
  socket(rr(14, 20, 1.2, POWER_X, y - 1));
  k.button({ id: 'power', pos: [POWER_X, y - 1, panelZ], w: 12.4, h: 18.4, out: 4.2, travel: 2.2, len: 10, r: 1, c: 0.7, material: keyMat() });
  const led = k.lamp(new THREE.SphereGeometry(1.5, 14, 10).scale(1, 1, 0.6).translate(POWER_X - 13, y + 12, panelZ), 0x45ff66, 'power-led');
  k.add('panel', plate(panelOut, sockets, panelZ));

  k.decal(makeDrawTexture(pan.w, pan.h, 14, (g, font) => {
    const X = (x) => x + pan.w / 2, Y = (yy) => pan.cy + pan.h / 2 - yy;
    const ink = '#070706';
    const text = (str, x, yy, size) => {
      g.font = `700 ${size}px ${font}`;
      g.lineWidth = Math.max(0.28, size * 0.07);
      g.strokeStyle = ink;
      g.fillStyle = ink;
      g.strokeText(str, x, yy);
      g.fillText(str, x, yy);
    };
    g.textAlign = 'center';
    g.lineJoin = 'round';
    for (const b of BUTTONS) {
      const words = b.legend.split(' ');
      words.forEach((wd, i) => text(wd, X(b.x), Y(y - 9.0 - i * 3.8), 3.45));
    }
    for (const n of KNOBS) text(n.legend, X(n.x), Y(y + 12.8), 4.05);
    text('POWER', X(POWER_X), Y(y + 15.2), 4.15);
    g.strokeStyle = ink; g.lineWidth = 0.5;
    g.font = `700 3.5px ${font}`;
    g.fillStyle = ink;
    for (const [a, b, label] of [[-196, -164, 'INPUT'], [-120, -72, 'FUNCTION']]) {
      g.beginPath(); g.moveTo(X(a - 5), Y(y + 16.6)); g.lineTo(X(b + 5), Y(y + 16.6)); g.stroke();
      g.fillText(label, X((a + b) / 2), Y(y + 18.6));
    }
  }), pan.w, pan.h, 0, pan.cy, panelZ + 0.04).name = 'legends';

  // ---- carry handles and vents: openings in the shell, cavities behind them --
  const shell = { w: W, h: BODY_H, r: 7, cy: CY, z0: BZ, z1: FZ - R };
  const addShellFace = (side, fill) => {
    const desc = straightFace(side, shell);
    const holes = [];
    fill(desc, holes);
    k.add('case', lay(plate(rectOutline(desc.spanX, desc.spanY), holes), desc.face, desc.origin));
  };
  for (const side of ['left', 'right']) {
    addShellFace(side, (desc, holes) => {
      const handle = faceLocal(desc, new THREE.Vector3(desc.origin.x, FOOT + BODY_H * 0.66, 30));
      const mouth = rr(130, 40, 14);
      const pocket = well(mouth, 0, 20);
      k.add('grip', lay(pocket.walls, desc.face, desc.origin, handle.x, handle.y));
      k.add('cavity', lay(pocket.floor, desc.face, desc.origin, handle.x, handle.y));
      // Bar runs the long way, set back so the hand closes behind it.
      const bar = new THREE.CylinderGeometry(5.1, 5.1, 136, 24, 1, false).rotateZ(Math.PI / 2);
      bar.translate(0, 0, -9.5);
      k.add('grip', lay(bar, desc.face, desc.origin, handle.x, handle.y));
      holes.push(rr(130, 40, 14, handle.x, handle.y).slice().reverse());
      for (const zc of [-60, -150]) {
        for (let i = 0; i < 14; i++) {
          const p = faceLocal(desc, new THREE.Vector3(desc.origin.x, FOOT + 60 + i * 7, zc));
          if (!holeFits(desc, p.x, p.y, 70, 2.6)) continue;
          holes.push(holeRect(70, 2.6, p.x, p.y));
          k.add('cavity', lay(boxCavity(70, 2.6, 3.6), desc.face, desc.origin, p.x, p.y));
        }
      }
    });
  }
  addShellFace('top', (desc, holes) => {
    for (const x of [-140, 0, 140]) {
      for (let i = 0; i < 26; i++) {
        const p = faceLocal(desc, new THREE.Vector3(x, desc.origin.y, BZ + 40 + i * 7.5));
        if (!holeFits(desc, p.x, p.y, 110, 2.8)) continue;
        holes.push(holeRect(110, 2.8, p.x, p.y));
        k.add('cavity', lay(boxCavity(110, 2.8, 4), desc.face, desc.origin, p.x, p.y));
      }
    }
  });
  for (const x of [-180, 180]) {
    for (const z of [FZ - 60, BZ + 70]) {
      k.add('rubber', new THREE.CylinderGeometry(15, 13, FOOT, 20).translate(x, FOOT / 2, z));
    }
  }

  k.shadow(W, D);
  return k.finish(META, {
    brand, tally,
    setPower: (on) => { led.material.emissiveIntensity = on ? 2.4 : 0; },
  });
}
