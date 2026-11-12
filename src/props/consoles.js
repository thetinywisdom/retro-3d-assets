// Game hardware props. Body outlines are traced from straight-on reference
// images (see outlines.js); button, screen and label positions were measured
// from perspective-corrected photographs, scaled by each LCD's known size.
// Published body dimensions:
//
//   PS one (SCPH-100)          193 x 38 x 144 mm
//   DualShock (PS one colour)  157 x 55 x 95 mm
//   Game Boy Advance (AGB-001) 144.5 x 82 x 24.5 mm
//   PS Vita (PCH-2000)         183.6 x 85.1 x 15 mm
//   PSP Go (PSP-N1000)         128 x 69 x 16.5 mm (closed)
//
// Consoles that lie flat are built y-up, front towards +z, sitting on y = 0.
// Handhelds are built facing +z with their bottom edge on y = 0, so they can
// be leaned back on a shelf.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Kit, rr, circle, ring, loft, plate } from '../kit.js';
import { makeDrawTexture } from '../labels.js';
import { OUTLINES } from './outlines.js';

const SERIF = 'Rockwell, "Roboto Slab", Georgia, "Times New Roman", serif';

// ---------------------------------------------------------------------------
// shape helpers
// ---------------------------------------------------------------------------
/** Rounded rectangle with a different radius per corner: [topRight, topLeft, bottomLeft, bottomRight]. */
function rr4(w, h, radii, cx = 0, cy = 0, seg = 7) {
  const hw = w / 2, hh = h / 2;
  const c = [[hw, hh, 0], [-hw, hh, Math.PI / 2], [-hw, -hh, Math.PI], [hw, -hh, Math.PI * 1.5]];
  const pts = [];
  c.forEach(([x, y, a0], i) => {
    const r = Math.max(0.01, radii[i]);
    const ox = x - Math.sign(x) * r, oy = y - Math.sign(y) * r;
    for (let k = 0; k <= seg; k++) {
      const a = a0 + (k / seg) * (Math.PI / 2);
      pts.push(new THREE.Vector2(cx + ox + Math.cos(a) * r, cy + oy + Math.sin(a) * r));
    }
  });
  return pts;
}

/** Move a counter-clockwise outline inwards by d. */
function inset(pts, d) {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = pts[(i + n - 1) % n], b = pts[(i + 1) % n];
    let nx = b.y - a.y, ny = -(b.x - a.x);
    const l = Math.hypot(nx, ny) || 1;
    return new THREE.Vector2(p.x - (nx / l) * d, p.y - (ny / l) * d);
  });
}

/** Solid slab from z0 to z1 with a rounded top edge (bottom is open). */
function slab(pts, z0, z1, bevel = 1.5) {
  const b = Math.min(bevel, (z1 - z0) * 0.9);
  const rings = [ring(pts, z0), ring(pts, z1 - b)];
  for (let i = 1; i <= 3; i++) {
    const t = (i / 3) * (Math.PI / 2);
    rings.push(ring(inset(pts, b * (1 - Math.cos(t))), z1 - b + b * Math.sin(t)));
  }
  return mergeGeometries([loft(rings), plate(inset(pts, b), [], z1)]);
}

const flat = (g) => g.rotateX(-Math.PI / 2);   // z-up geometry -> y-up
const disc = (r, x, y, z0, z1, bevel = 0.5, n = 28) => slab(circle(r, x, y, n), z0, z1, bevel);
const pill = (w, h, x, y, z0, z1, bevel = 0.4) => slab(rr(w, h, Math.min(w, h) / 2, x, y), z0, z1, bevel);

/** Printed markings: draw(g) works in mm with the origin at the centre, y up. */
function print(k, w, h, x, y, z, draw, px = 16) {
  return k.decal(makeDrawTexture(w, h, px, (g, font) => {
    g.translate(w / 2, h / 2);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    draw(g, font);
  }), w, h, x, y, z);
}
// canvas y runs downwards; these take "y up" coordinates
const txt = (g, s, x, y, font, color) => { g.font = font; g.fillStyle = color; g.fillText(s, x, -y); };

/** The four PlayStation face-button symbols, centred on (x, y) with spacing d. */
function symbols(g, x, y, d, s, colors, lw = 0.45) {
  g.lineWidth = lw; g.lineJoin = 'round';
  const [tri, cir, cro, squ] = colors;
  g.strokeStyle = tri; g.beginPath(); g.moveTo(x, -(y + d) - s); g.lineTo(x + s, -(y + d) + s * 0.75); g.lineTo(x - s, -(y + d) + s * 0.75); g.closePath(); g.stroke();
  g.strokeStyle = cir; g.beginPath(); g.arc(x + d, -y, s * 0.9, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = cro; g.beginPath(); g.moveTo(x - s * 0.8, -(y - d) - s * 0.8); g.lineTo(x + s * 0.8, -(y - d) + s * 0.8); g.moveTo(x + s * 0.8, -(y - d) - s * 0.8); g.lineTo(x - s * 0.8, -(y - d) + s * 0.8); g.stroke();
  g.strokeStyle = squ; g.strokeRect(x - d - s * 0.8, -y - s * 0.8, s * 1.6, s * 1.6);
}

const outline = (name, sx = 1, sy = 1) => OUTLINES[name].map(([x, y]) => new THREE.Vector2(x * sx, y * sy));

/** Closed solid from z0 to z1 with rounded front and back edges. Outline must be left-right symmetric. */
function solid(pts, z0, z1, bf = 2, bb = 2, steps = 4) {
  const rings = [];
  for (let i = 0; i <= steps; i++) { const t = (i / steps) * (Math.PI / 2); rings.push(ring(inset(pts, bb * (1 - Math.sin(t))), z0 + bb * (1 - Math.cos(t)))); }
  for (let i = 0; i <= steps; i++) { const t = (i / steps) * (Math.PI / 2); rings.push(ring(inset(pts, bf * (1 - Math.cos(t))), z1 - bf + bf * Math.sin(t))); }
  return mergeGeometries([loft(rings), plate(inset(pts, bf), [], z1), plate(inset(pts, bb), [], 0).rotateY(Math.PI).translate(0, 0, z0)]);
}

/** Straight extrusion. No edge inset, so concave outlines (a cross, a scooped lid) stay intact. */
function extrude(pts, z0, z1) {
  const bottom = plate(pts, [], 0);
  bottom.rotateY(Math.PI);
  bottom.translate(0, 0, z0);
  return mergeGeometries([loft([ring(pts, z0), ring(pts, z1)]), plate(pts, [], z1), bottom]);
}

/** One connected cross, counter-clockwise. `arm` is the outer reach, `w` the arm width. */
function crossOutline(cx, cy, arm, w) {
  const h = w / 2, a = arm;
  return [
    [h, h], [h, a], [-h, a], [-h, h], [-a, h], [-a, -h],
    [-h, -h], [-h, -a], [h, -a], [h, -h], [a, -h], [a, h],
  ].map(([x, y]) => new THREE.Vector2(cx + x, cy + y));
}

/** Pull the flat front of a plan outline back (positive depth moves the front toward +plan y). */
function easeFront(pts, depth, halfW, edgeY = -60) {
  return pts.map((p) => {
    const q = p.clone();
    if (q.y > edgeY) return q;
    const t = 1 - Math.min(1, Math.abs(q.x) / halfW);
    if (t <= 0) return q;
    const s = t * t * (3 - 2 * t);
    q.y += depth * s;
    return q;
  });
}

/** Pull the top (+y) or bottom edge of a facing outline inward. side +1 is the top. */
function easeEdge(pts, depth, halfW, side) {
  let edge = side > 0 ? -1e9 : 1e9;
  for (const p of pts) edge = side > 0 ? Math.max(edge, p.y) : Math.min(edge, p.y);
  return pts.map((p) => {
    const q = p.clone();
    const along = side > 0 ? edge - q.y : q.y - edge;
    if (along > 8) return q;
    const t = 1 - Math.min(1, Math.abs(q.x) / halfW);
    if (t <= 0) return q;
    const s = t * t * (3 - 2 * t);
    q.y -= side * depth * s * (1 - along / 8);
    return q;
  });
}

/**
 * Circle with a finger-scoop bitten out of the front (negative plan y).
 * The scoop is a smooth inward bulge so the lid can be extruded as one piece.
 */
function circleScoop(r, cx, cy, width, depth, n = 72) {
  const half = Math.asin(Math.min(0.85, (width / 2) / r));
  const aR = -Math.PI / 2 + half;
  const span = Math.PI * 2 - 2 * half;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = aR + (i / n) * span;
    pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
  const pL = pts[pts.length - 1], pR = pts[0];
  const mid = new THREE.Vector2((pL.x + pR.x) / 2, (pL.y + pR.y) / 2);
  const bulge = new THREE.Vector2(mid.x, mid.y + depth);
  const C = new THREE.Vector2(2 * bulge.x - mid.x, 2 * bulge.y - mid.y);
  for (let i = 1; i < 16; i++) {
    const t = i / 16, u = 1 - t;
    pts.push(new THREE.Vector2(
      u * u * pL.x + 2 * u * t * C.x + t * t * pR.x,
      u * u * pL.y + 2 * u * t * C.y + t * t * pR.y,
    ));
  }
  return pts;
}

/** Closed bite (chord + inward bulge) used as the scoop floor. */
function scoopFloor(cx, chordY, width, depth) {
  const pL = new THREE.Vector2(cx - width / 2, chordY);
  const pR = new THREE.Vector2(cx + width / 2, chordY);
  const mid = new THREE.Vector2(cx, chordY);
  const bulge = new THREE.Vector2(cx, chordY + depth);
  const C = new THREE.Vector2(2 * bulge.x - mid.x, 2 * bulge.y - mid.y);
  const pts = [pL];
  for (let i = 1; i < 14; i++) {
    const t = i / 14, u = 1 - t;
    pts.push(new THREE.Vector2(
      u * u * pL.x + 2 * u * t * C.x + t * t * pR.x,
      u * u * pL.y + 2 * u * t * C.y + t * t * pR.y,
    ));
  }
  pts.push(pR);
  return pts;
}

/**
 * Handle that drops away from the deck. A tilted capsule stays inside the
 * traced footprint (no horn sticking past the front) and gives the pad its height.
 */
function gripGeometry(side) {
  const s = side;
  const g = new THREE.CapsuleGeometry(12.2, 34, 8, 18);
  g.rotateX(Math.PI / 2 - 0.82);
  g.rotateY(s * 0.2);
  g.translate(s * 57, 24, 20);
  return g;
}

/** Concave rubber cap. Lathe is y-up; callers rotate it onto a face. */
function nub(radius, height) {
  const r = radius, h = height;
  const pts = [
    new THREE.Vector2(r * 0.46, 0),
    new THREE.Vector2(r * 0.55, h * 0.32),
    new THREE.Vector2(r * 0.96, h * 0.52),
    new THREE.Vector2(r, h * 0.7),
    new THREE.Vector2(r * 0.72, h * 0.9),
    new THREE.Vector2(r * 0.34, h * 0.78),
    new THREE.Vector2(0, h * 0.68),
  ];
  return new THREE.LatheGeometry(pts, 16);
}

function faceNub(radius, height, x, y, z) {
  const g = nub(radius, height);
  g.rotateX(Math.PI / 2);
  g.translate(x, y, z);
  return g;
}

// Subtle tiled roughness shared by every plastic. Values stay near white so
// the material's roughness factor still dominates; the variation is the grain.
let _rough;
function sharedRough() {
  if (_rough) return _rough;
  const size = 96, grid = 6;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  let seed = 9001;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const cells = [];
  for (let i = 0; i <= grid; i++) {
    cells[i] = [];
    for (let j = 0; j <= grid; j++) cells[i][j] = 214 + rnd() * 41;
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = (x / size) * grid, gy = (y / size) * grid;
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      const tx = gx - x0, ty = gy - y0;
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
      const v = cells[x0][y0] * (1 - sx) * (1 - sy) + cells[x0 + 1][y0] * sx * (1 - sy)
        + cells[x0][y0 + 1] * (1 - sx) * sy + cells[x0 + 1][y0 + 1] * sx * sy;
      const b = Math.max(0, Math.min(255, v + (rnd() - 0.5) * 10));
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  _rough = new THREE.CanvasTexture(c);
  _rough.colorSpace = THREE.NoColorSpace;
  _rough.wrapS = _rough.wrapT = THREE.RepeatWrapping;
  _rough.repeat.set(0.11, 0.11);
  return _rough;
}

function plastic(k, bumpScale = 0.2) {
  if (!k.grain.userData.tiled) {
    k.grain.wrapS = k.grain.wrapT = THREE.RepeatWrapping;
    k.grain.repeat.set(0.16, 0.16);
    k.grain.colorSpace = THREE.NoColorSpace;
    k.grain.needsUpdate = true;
    k.grain.userData.tiled = true;
  }
  return { bumpMap: k.grain, bumpScale, roughnessMap: sharedRough() };
}

/** Albedo + normal for a field of holes, seen straight on. One small canvas, not a mesh per hole. */
function makeGrille(cols, rows) {
  const S = 128;
  const albedoC = document.createElement('canvas');
  const normalC = document.createElement('canvas');
  albedoC.width = normalC.width = albedoC.height = normalC.height = S;
  const ai = albedoC.getContext('2d').createImageData(S, S);
  const ni = normalC.getContext('2d').createImageData(S, S);
  const rad = 0.29;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const u = ((x + 0.5) / S) * cols;
      const v = ((y + 0.5) / S) * rows;
      const cx = u - Math.floor(u) - 0.5;
      const cy = v - Math.floor(v) - 0.5;
      const dist = Math.hypot(cx / rad, cy / rad);
      let ar = 236, nr = 128, ng = 128, nb = 255;
      if (dist < 1) {
        const pit = Math.sqrt(Math.max(0, 1 - dist * dist));
        const len = Math.hypot(cx / rad, cy / rad, pit) || 1;
        nr = Math.round(((-cx / rad) / len) * 127 + 128);
        ng = Math.round(((cy / rad) / len) * 127 + 128);
        nb = Math.round((pit / len) * 127 + 128);
        ar = Math.round(16 + 40 * dist);
      }
      const i = (y * S + x) * 4;
      ai.data[i] = ai.data[i + 1] = ai.data[i + 2] = ar; ai.data[i + 3] = 255;
      ni.data[i] = nr; ni.data[i + 1] = ng; ni.data[i + 2] = nb; ni.data[i + 3] = 255;
    }
  }
  albedoC.getContext('2d').putImageData(ai, 0, 0);
  normalC.getContext('2d').putImageData(ni, 0, 0);
  const map = new THREE.CanvasTexture(albedoC);
  map.colorSpace = THREE.SRGBColorSpace;
  const normalMap = new THREE.CanvasTexture(normalC);
  normalMap.colorSpace = THREE.NoColorSpace;
  return { map, normalMap };
}

/** Fine horizontal streaks so a metal reads brushed rather than pearlescent. */
let _brush;
function brushNormal() {
  if (_brush) return _brush;
  const S = 128;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const img = c.getContext('2d').createImageData(S, S);
  let seed = 77;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const line = [];
  for (let y = 0; y < S; y++) line[y] = rnd();
  for (let y = 0; y < S; y++) {
    const slope = (line[(y + 1) % S] - line[(y - 1 + S) % S]) * 1.6;
    const ny = Math.max(-1, Math.min(1, slope));
    const nz = Math.sqrt(Math.max(0.05, 1 - ny * ny));
    const gn = Math.round(ny * 127 + 128);
    const b = Math.round(nz * 255);
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      img.data[i] = 128;
      img.data[i + 1] = gn;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  c.getContext('2d').putImageData(img, 0, 0);
  _brush = new THREE.CanvasTexture(c);
  _brush.colorSpace = THREE.NoColorSpace;
  _brush.wrapS = _brush.wrapT = THREE.RepeatWrapping;
  _brush.repeat.set(0.35, 1.4);
  return _brush;
}

const Phys = THREE.MeshPhysicalMaterial;

function done(k, name, lift = 0) {
  const { root } = k.finish({});
  root.position.y = lift === 'ground' ? -new THREE.Box3().setFromObject(root).min.y : lift;
  const wrap = new THREE.Group();
  wrap.add(root);
  wrap.name = name;
  wrap.userData.prop = name;
  return wrap;
}

// ---------------------------------------------------------------------------
// PS one (SCPH-100). Plan: x right, y towards the back.
// ---------------------------------------------------------------------------
export function buildPSOne() {
  const k = new Kit('PS one');
  const grit = plastic(k, 0.22);
  // Warm light grey, a step darker than the old near-white so it stays grey under a key light.
  k.mat('shell', { color: 0xb3ac9f, roughness: 0.64, metalness: 0.02, ...grit });
  k.mat('lid', { color: 0xc2baad, roughness: 0.56, metalness: 0.02, ...plastic(k, 0.16) });
  k.mat('seam', { color: 0x847e74, roughness: 0.74, ...plastic(k, 0.1) });
  k.mat('door', { color: 0xbab3a6, roughness: 0.58, metalness: 0.02, ...plastic(k, 0.16) });
  k.mat('port', { color: 0x8f897e, roughness: 0.48, metalness: 0.06, ...plastic(k, 0.1) });
  const top = 34.2;
  // The flat front is pulled back so the doors and port holes sit in a real bay.
  const plan = easeFront(outline('psone'), 6.2, 70, -62);
  k.add('shell', flat(solid(plan, 0, top, 5.2, 7.2, 5)));
  k.add('seam', flat(loft([ring(inset(plan, -0.05), 17.2), ring(inset(plan, -0.05), 18.0)])));
  // lid: hinge strip, then a disc with a finger scoop cut into the front lip
  const lr = 67.5, ly = -1;
  k.add('lid', flat(slab(rr(100, 28, 2, 0, 58), top - 1.6, top + 1.7, 1.1)));
  const lidPts = circleScoop(lr, 0, ly, 18, 8.5, 70);
  k.add('lid', flat(extrude(lidPts, top - 0.4, top + 3.5)));
  // rounded lip around the disc, with a gap where the scoop is
  const gap = 0.5;
  const lip = new THREE.TorusGeometry(lr - 0.6, 1.15, 6, 56, Math.PI * 2 - gap);
  lip.rotateZ(Math.PI / 2 - gap / 2);
  lip.rotateX(Math.PI / 2);
  lip.translate(0, top + 2.5, -ly);
  k.add('lid', lip);
  k.add('seam', new THREE.RingGeometry(lr - 0.2, lr + 0.7, 64).rotateX(-Math.PI / 2).translate(0, top + 0.35, -ly));
  // scoop floor, just under the lid surface
  const chordY = ly - lr + 1.2;
  k.add('seam', flat(plate(scoopFloor(0, chordY, 15, 6.4), [], top + 1.05)));
  // hinge knuckles where the disc meets the rear tab
  for (const x of [-32, 0, 32]) {
    k.add('seam', new THREE.CylinderGeometry(1.55, 1.55, 12, 10).rotateZ(Math.PI / 2).translate(x, top + 1.15, -62));
  }
  // corner buttons dropped into circular wells
  for (const s of [-1, 1]) {
    const x = s * 75;
    k.add('shell', flat(slab(circle(18.4, x, -49, 36), top - 2.4, top + 0.55, 0.7)));
    k.add('seam', flat(plate(circle(14.8, x, -49, 32), [], top + 0.62)));
    k.add('shell', new THREE.TorusGeometry(14.6, 1.05, 7, 32).rotateX(Math.PI / 2).translate(x, top + 1.55, 49));
    k.add('lid', flat(slab(circle(11.4, x, -49, 32), top + 0.35, top + 2.85, 1)));
  }
  // front bay: two door flaps over two controller-port cavities
  const bay = 66.2;
  for (const s of [-1, 1]) {
    const x = s * 27;
    k.add('door', new THREE.BoxGeometry(48, 7.4, 2.1).translate(x, 23.2, 70.7));
    k.add('seam', new THREE.CylinderGeometry(0.55, 0.55, 46, 8).rotateZ(Math.PI / 2).translate(x, 19.6, 70.2));
    const outer = rr(44, 8.8, 2.1, x, 12.2);
    const inner = rr(37.5, 5.6, 1.3, x, 12.2);
    k.add('port', plate(outer, [inner.slice().reverse()], 71.15));
    k.add('port', loft([ring(inner, 71.15), ring(inner, bay + 0.35)]));
    k.add('slot', plate(inner, [], bay + 0.3));
    print(k, 42, 5.5, x, 24.2, 71.82, (g, font) => {
      txt(g, 'MEMORY CARD', 0, 0, `600 2.3px ${font}`, '#6c675f');
    }, 10);
  }
  k.add('seam', new THREE.BoxGeometry(4.2, 7.2, 1.5).translate(0, 23.2, 69.6));
  const ink = '#6e6a62';
  print(k, 36, 12, 0, top + 3.58, -40, (g, font) => {
    txt(g, 'SONY', 0, 0, `700 8.6px ${SERIF}`, ink);
  }, 8).rotation.x = -Math.PI / 2;
  print(k, 28, 20, 0, top + 3.58, 33, (g, font) => {
    const sq = (c, x, y, w, h) => { g.fillStyle = c; g.fillRect(x - w / 2, -y - h / 2, w, h); };
    sq('#d24a3c', -2.6, 4.2, 3.3, 3.3);
    sq('#e0b02a', 0.6, 5.0, 2.9, 2.5);
    sq('#2a8a64', -0.2, 1.2, 3.3, 2.5);
    sq('#2a62b4', 3.1, 2.0, 2.9, 2.9);
    txt(g, 'PS', -4.4, -4.6, `500 6px ${font}`, ink);
    txt(g, 'one', 5.2, -4.9, `500 4.8px ${font}`, ink);
  }, 10).rotation.x = -Math.PI / 2;
  print(k, 90, 8, 0, top + 0.7, 66.2, (g, font) => {
    txt(g, '1', -37, 0, `500 3.6px ${font}`, '#8e8980');
    txt(g, '2', 37, 0, `500 3.6px ${font}`, '#8e8980');
  }, 8).rotation.x = -Math.PI / 2;
  for (const [s, draw] of [[-1, (g, font) => { txt(g, 'I/⏻', 0, 2.2, `700 6.4px ${font}`, '#2f9b68'); txt(g, 'RESET', 0, -4.6, `700 2.7px ${font}`, '#6f6e68'); }],
    [1, (g) => { g.strokeStyle = '#3d86c9'; g.lineWidth = 1.05; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-4.2, 0.5); g.lineTo(0, -4.6); g.lineTo(4.2, 0.5); g.closePath(); g.stroke(); g.strokeRect(-4.2, 2.4, 8.4, 1.7); }]]) {
    print(k, 22, 22, s * 75, top + 2.92, 49, draw, 12).rotation.x = -Math.PI / 2;
  }
  return done(k, 'ps-one');
}

// ---------------------------------------------------------------------------
// DualShock in PS one colours. Plan: x right, y towards the cable.
// ---------------------------------------------------------------------------
export function buildDualShock() {
  const k = new Kit('DualShock');
  const grit = plastic(k, 0.2);
  k.mat('shell', { color: 0xc3bbae, roughness: 0.6, metalness: 0.02, ...grit });
  k.mat('pad', { color: 0xcec6b8, roughness: 0.52, metalness: 0.02, ...plastic(k, 0.12) });
  k.mat('key', { color: 0x6a6b74, roughness: 0.55, ...plastic(k, 0.08) });
  k.mat('seam', { color: 0x8a847a, roughness: 0.7, ...plastic(k, 0.08) });
  k.mat('cable', { color: 0xb4b0a6, roughness: 0.62, ...plastic(k, 0.12) });
  k.mat('led', { color: 0x3a0a0a, emissive: 0xff2430, emissiveIntensity: 1.35, roughness: 0.32 });
  // Deck sits up off the table; the grips drop down to meet it, which is where the 55 mm comes from.
  const z0 = 30, zT = 48;
  k.add('shell', flat(solid(outline('pad'), z0, zT, 4.2, 3.6, 4)));
  k.add('shell', flat(solid(rr(60, 32, 12, 0, 6), 13, z0, 3, 2.4, 3)));
  for (const s of [-1, 1]) k.add('shell', gripGeometry(s));
  // L1/R1 on the top shoulder, L2/R2 just behind, both sunk into the deck
  for (const s of [-1, 1]) {
    k.add('key', flat(slab(rr(26, 8, 2.6, s * 52, 33), zT - 7, zT + 1.7, 1.1)));
    k.add('key', flat(slab(rr(28, 8.5, 2.8, s * 50, 42), zT - 12, zT + 0.7, 1.15)));
  }
  // single-piece cross in a round well
  const dx = -45.5, by = 11;
  k.add('pad', flat(slab(circle(16.8, dx, by, 32), zT - 1.4, zT + 0.35, 0.35)));
  k.add('shell', new THREE.TorusGeometry(15.4, 1.05, 6, 28).rotateX(Math.PI / 2).translate(dx, zT + 1.15, -by));
  k.add('key', flat(extrude(crossOutline(dx, by, 12.4, 7.2), zT + 0.45, zT + 3.15)));
  // face buttons in a round well instead of a plus-shaped plate
  const fx = 46;
  k.add('pad', flat(slab(circle(19.5, fx, by, 32), zT - 1.2, zT + 0.3, 0.3)));
  for (const [ox, oy] of [[0, 11.2], [11.2, 0], [0, -11.2], [-11.2, 0]]) {
    k.add('key', flat(slab(circle(5.5, fx + ox, by + oy, 22), zT + 0.15, zT + 2.7, 0.85)));
  }
  // analog sticks: collar, concave cap, a couple of rubber ridges
  for (const s of [-1, 1]) {
    k.add('shell', flat(slab(circle(14.2, s * 23, -11.5, 30), zT - 1.6, zT + 1.7, 1.2)));
    k.add('seam', flat(plate(circle(10.2, s * 23, -11.5, 26), [], zT + 1.75)));
    const cap = nub(8.2, 5.5);
    cap.translate(s * 23, zT + 1.6, 11.5);
    k.add('key', cap);
    for (const h of [3.15, 4.15]) {
      k.add('key', new THREE.TorusGeometry(7.6, 0.28, 5, 16).rotateX(Math.PI / 2).translate(s * 23, zT + h, 11.5));
    }
  }
  k.add('key', flat(slab(rr(7.4, 4.2, 0.9, -14.5, by), zT, zT + 1.25, 0.35)));
  k.add('key', flat(slab([new THREE.Vector2(10.5, by + 2.8), new THREE.Vector2(10.5, by - 2.8), new THREE.Vector2(19.2, by)], zT, zT + 1.25, 0.3)));
  k.add('key', flat(slab(rr(7.2, 4.4, 0.9, 0, -4.2), zT, zT + 1.2, 0.35)));
  // ANALOG window: a small lit lens in a recess, not a flat dark dash
  k.add('key', flat(slab(rr(7.4, 2.8, 1.1, 0, -10.8), zT - 0.6, zT + 0.25, 0.25)));
  k.add('led', new THREE.SphereGeometry(1.05, 12, 8).scale(1.7, 0.5, 0.42).translate(0, zT + 0.72, 10.8));
  const path = new THREE.CatmullRomCurve3([[0, 36, -50], [0, 24, -64], [-20, 10, -82], [-58, 6, -84], [-92, 5, -64]].map((p) => new THREE.Vector3(...p)));
  k.add('cable', new THREE.TubeGeometry(path, 32, 2.15, 8));
  const boot = new THREE.CylinderGeometry(4.1, 2.35, 11, 12);
  boot.rotateX(Math.PI / 2 + 0.55);
  boot.translate(0, 32, -54);
  k.add('cable', boot);
  const ink = '#7a756c';
  const upLabel = (w, h, x, z, draw, px = 10) => {
    print(k, w, h, x, zT + 0.14, z, draw, px).rotation.x = -Math.PI / 2;
  };
  upLabel(32, 12, 0, -24.5, (g, font) => txt(g, 'SONY', 0, 0, `700 7.2px ${SERIF}`, ink), 8);
  upLabel(18, 8, 0, -9.5, (g, font) => {
    txt(g, 'PS', -2.6, 0.2, `500 3.4px ${font}`, ink);
    txt(g, 'one', 2.8, 0, `500 2.8px ${font}`, ink);
  }, 12);
  upLabel(16, 5, -14.5, -6.2, (g, font) => txt(g, 'SELECT', 0, 0, `500 2.4px ${font}`, ink), 14);
  upLabel(14, 5, 14.5, -6.2, (g, font) => txt(g, 'START', 0, 0, `500 2.4px ${font}`, ink), 14);
  upLabel(16, 5, 0, -0.9, (g, font) => txt(g, 'ANALOG', 0, 0, `500 2.3px ${font}`, ink), 14);
  print(k, 28, 28, dx, zT + 3.22, -by, (g) => {
    g.strokeStyle = '#c5c2ba'; g.lineWidth = 0.38; g.lineJoin = 'round'; g.lineCap = 'round';
    for (const [ox, oy, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(ox * 7.2, -(oy * 7.2)); g.rotate(r);
      g.beginPath(); g.moveTo(-1.5, 0.7); g.lineTo(0, -0.75); g.lineTo(1.5, 0.7); g.stroke();
      g.restore();
    }
  }, 12).rotation.x = -Math.PI / 2;
  print(k, 36, 36, fx, zT + 2.78, -by, (g) => symbols(g, 0, 0, 11.2, 3.1, ['#1f9a52', '#e0232a', '#3a6ed0', '#e06aa0'], 0.7), 12).rotation.x = -Math.PI / 2;
  return done(k, 'dualshock', 'ground');
}

// ---------------------------------------------------------------------------
// Game Boy Advance (AGB-001, indigo)
// ---------------------------------------------------------------------------
export function buildGBA() {
  const k = new Kit('Game Boy Advance');
  // Indigo AGB-001 is a deep blue-violet. 0x5446a8 reads as pastel lavender once lit.
  const indigo = 0x261c52;
  const ink = '#ddd8ee';
  k.mat('shell', { color: indigo, roughness: 0.46, metalness: 0.03, clearcoat: 0.32, clearcoatRoughness: 0.38, ...plastic(k, 0.2) }, Phys);
  k.mat('dark', { color: 0x100c24, roughness: 0.55 });
  k.mat('key', { color: 0xd5d3d8, roughness: 0.48, ...plastic(k, 0.1) });
  k.mat('shoulder', { color: 0x8d8a98, roughness: 0.42, ...plastic(k, 0.1) });
  k.mat('lens', { color: 0x07070a, roughness: 0.12, clearcoat: 0.9, clearcoatRoughness: 0.06 }, Phys);
  k.mat('lcd', { color: 0x0c100e, roughness: 0.04, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.7 }, Phys);
  const grille = makeGrille(7, 8);
  k.mat('grille', { color: indigo, roughness: 0.48, map: grille.map, normalMap: grille.normalMap, normalScale: new THREE.Vector2(1.15, 1.15) });
  const T = 24.5;
  const sx = 144.5 / 143.66, sy = 82 / 78.46;
  let body = easeEdge(outline('gba', sx, sy), 2.4, 20, 1);
  let minY = Infinity, maxY = -Infinity;
  for (const p of body) { minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); }
  // Slim triggers following the top corner, flush with the face instead of sticking out as ears.
  for (const s of [-1, 1]) {
    const pts = rr(16.5, 4.4, 2).map((p) => p.clone().rotateAround(new THREE.Vector2(), -s * 0.46).add(new THREE.Vector2(s * 56.2, 33.4)));
    k.add('shoulder', solid(pts, T - 6.2, T + 0.25, 0.8, 1.1, 3));
  }
  k.add('shell', solid(body, 0, T, 3.6, 6.5, 5));
  // cartridge mouth in the notch pulled out of the top edge
  k.add('slot', new THREE.BoxGeometry(30, 1.7, 3.0).translate(0, maxY - 1.15, T * 0.55));
  const lens = rr4(72, 56, [4.2, 4.2, 12, 12], 0, 2.2);
  k.add('dark', plate(rr4(75, 59, [5.5, 5.5, 13.5, 13.5], 0, 2.2), [], T + 0.04));
  k.add('lens', slab(lens, T, T + 0.7, 0.45));
  k.add('lcd', new THREE.PlaneGeometry(61.2, 40.8).translate(0, 3.2, T + 0.78));
  const dx = -52.5, dy = 7.8;
  k.add('dark', plate(circle(12.6, dx, dy, 32), [], T + 0.06));
  k.add('shell', new THREE.TorusGeometry(12.3, 0.72, 6, 28).translate(dx, dy, T + 0.4));
  k.add('key', extrude(crossOutline(dx, dy, 9.6, 5.5), T + 0.15, T + 2.45));
  for (const [x, y] of [[57.8, 8.4], [45.2, 3.9]]) {
    k.add('dark', plate(circle(5.5, x, y, 24), [], T + 0.05));
    k.add('key', slab(circle(4.4, x, y, 24), T + 0.05, T + 2.15, 0.85));
  }
  k.add('dark', plate(rr(16, 16, 5, -46, -17.1), [], T + 0.05));
  for (const [x, y] of [[-43.4, -13.1], [-43.6, -21.2]]) k.add('key', pill(6.6, 3.3, x, y, T + 0.08, T + 1.3, 0.4));
  k.add('grille', new THREE.PlaneGeometry(14.5, 16).translate(47.2, -11.2, T + 0.1));
  k.add('dark', plate(circle(1.2, 45.9, 25.6, 14), [], T + 0.06));
  // Wordmark sits on the shell above the lens, not on the glass.
  print(k, 58, 7, 0, 32.5, T + 0.12, (g, font) => {
    g.save(); g.transform(1, 0, -0.16, 1, 0, 0);
    txt(g, 'GAME BOY', -11.5, 0.3, `900 3.15px ${font}`, '#ece9f6');
    g.save(); g.scale(1.16, 1); txt(g, 'ADVANCE', 8.6, 0.15, `600 2.7px ${font}`, '#ece9f6'); g.restore();
    g.restore();
  }, 14);
  print(k, 20, 16, -52, -17.2, T + 0.1, (g, font) => {
    g.strokeStyle = ink; g.lineWidth = 0.4;
    for (const [y, label] of [[4.1, 'START'], [-4.1, 'SELECT']]) {
      g.beginPath(); g.roundRect(-8.2, -y - 2.5, 13.2, 5, 2.5); g.stroke();
      txt(g, label, -1.6, y, `800 2.15px ${font}`, ink);
    }
  }, 12);
  print(k, 14, 4, 52, 25.6, T + 0.1, (g, font) => txt(g, 'POWER', 0, 0, `800 2.1px ${font}`, ink), 14);
  print(k, 22, 7, 1.5, 37.6, T + 0.1, (g, font) => {
    g.strokeStyle = ink; g.lineWidth = 0.42;
    g.beginPath(); g.ellipse(0, 0, 8.6, 2.2, 0, 0, Math.PI * 2); g.stroke();
    txt(g, 'Nintendo', 0, -0.05, `800 2.7px ${font}`, ink);
  }, 12);
  print(k, 8, 6, 61.5, 13.6, T + 2.2, (g, font) => txt(g, 'A', 0, 0, `800 3px ${font}`, '#f4f2f8'), 16);
  print(k, 8, 6, 40.2, 9.4, T + 2.2, (g, font) => txt(g, 'B', 0, 0, `800 3px ${font}`, '#f4f2f8'), 16);
  return done(k, 'gba', -minY);
}

// ---------------------------------------------------------------------------
// PS Vita (PCH-2000)
// ---------------------------------------------------------------------------
export function buildVita() {
  const k = new Kit('PS Vita');
  // Piano black: low albedo plus clearcoat, so a grey studio doesn't wash the shell out to gunmetal.
  k.mat('shell', { color: 0x060607, roughness: 0.4, metalness: 0.08, clearcoat: 0.28, clearcoatRoughness: 0.32, ...plastic(k, 0.14) }, Phys);
  k.mat('face', { color: 0x040405, roughness: 0.14, metalness: 0.1, clearcoat: 0.82, clearcoatRoughness: 0.1, ...plastic(k, 0.06) }, Phys);
  k.mat('key', { color: 0x101013, roughness: 0.36 });
  k.mat('stick', { color: 0x0c0c0e, roughness: 0.72 });
  k.mat('lcd', { color: 0x020308, roughness: 0.03, metalness: 0.14, clearcoat: 1, clearcoatRoughness: 0.025, envMapIntensity: 1.8 }, Phys);
  const grille = makeGrille(5, 4);
  k.mat('grille', { color: 0x08080a, roughness: 0.32, map: grille.map, normalMap: grille.normalMap, normalScale: new THREE.Vector2(0.9, 0.9) });
  const H = 85.1, T = 15, z = T;
  k.add('shell', solid(outline('vita', 1, H / 85.9), 0, T, 3.2, 5, 5));
  const oy = 3.8;
  k.add('face', slab(rr(121.5, 81.5, 5, 0, 1.3), T - 0.6, T + 0.45, 0.4));
  k.add('lcd', new THREE.PlaneGeometry(110.7, 62.3).translate(0, oy, T + 0.52));
  // front camera on the top-right bezel (the stray button that used to sit here is not on a PCH-2000)
  k.add('key', new THREE.TorusGeometry(1.2, 0.26, 6, 14).translate(58.2, 37.2, z + 0.55));
  k.add('lcd', slab(circle(1.0, 58.2, 37.2, 14), z + 0.15, z + 0.62, 0.2));
  const dx = -74.5, dy = 10.5 + oy;
  k.add('face', plate(circle(11.4, dx, dy, 28), [], z + 0.06));
  k.add('key', extrude(crossOutline(dx, dy, 8.6, 5.0), z + 0.08, z + 1.2));
  for (const [sx, sy] of [[-70, -10.7 + oy], [68.8, -10.4 + oy]]) {
    k.add('face', plate(circle(7.6, sx, sy, 28), [], z + 0.05));
    k.add('stick', faceNub(5.3, 2.5, sx, sy, z + 0.1));
  }
  const bx = 73.8, by = 10.8 + oy;
  for (const [ox, o2] of [[0, 8], [8, 0], [0, -8], [-8, 0]]) k.add('key', slab(circle(3.5, bx + ox, by + o2, 20), z, z + 1.35, 0.5));
  k.add('key', slab(circle(4.1, -71.5, -26 + oy, 20), z, z + 0.85, 0.35));
  for (const x of [65.6, 74.6]) k.add('key', slab(circle(3.5, x, -26.2 + oy, 20), z, z + 0.85, 0.35));
  for (const sx of [-84, 82.3]) k.add('grille', new THREE.PlaneGeometry(7.5, 6.4).translate(sx, -10.7 + oy, z + 0.1));
  // L/R hints along the top edge
  for (const s of [-1, 1]) {
    k.add('key', new THREE.CapsuleGeometry(1.05, 22, 3, 8).rotateZ(Math.PI / 2).translate(s * 40, 42.55, T * 0.42));
  }
  print(k, 20, 7, -48, 34.6 + oy, T + 0.55, (g, font) => txt(g, 'SONY', 0, 0, `700 4.1px ${SERIF}`, '#e6e6ea'), 12);
  print(k, 36, 8, -0.8, -36.8 + oy, T + 0.55, (g, font) => {
    g.scale(1.35, 1);
    txt(g, 'PS VITA', 0, 0, `200 5.2px ${font}`, '#eeeef2');
  }, 12);
  print(k, 22, 22, bx, by, z + 1.42, (g) => symbols(g, 0, 0, 8, 1.7, ['#d0d0d4', '#d0d0d4', '#d0d0d4', '#d0d0d4'], 0.36), 14);
  print(k, 20, 20, dx, dy, z + 1.26, (g) => {
    g.strokeStyle = '#b0b0b4'; g.lineWidth = 0.28; g.lineJoin = 'round';
    for (const [ox, o2, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(ox * 5.2, -(o2 * 5.2)); g.rotate(r);
      g.beginPath(); g.moveTo(-1.05, 0.55); g.lineTo(0, -0.55); g.lineTo(1.05, 0.55); g.closePath(); g.stroke();
      g.restore();
    }
  }, 14);
  print(k, 8, 8, -71.5, -26 + oy, z + 0.92, (g) => {
    symbols(g, 0, 0, 1.15, 0.62, ['#e4e4e8', '#e4e4e8', '#e4e4e8', '#e4e4e8'], 0.26);
  }, 16);
  print(k, 8, 4, 65.6, -26.2 + oy, z + 0.92, (g, font) => txt(g, 'SELECT', 0, 0, `700 1.45px ${font}`, '#eeeef2'), 18);
  print(k, 8, 4, 74.6, -26.2 + oy, z + 0.92, (g, font) => txt(g, 'START', 0, 0, `700 1.45px ${font}`, '#eeeef2'), 18);
  return done(k, 'ps-vita', H / 2);
}

// ---------------------------------------------------------------------------
// PSP Go (PSP-N1000), slid open
// ---------------------------------------------------------------------------
export function buildPSPGo() {
  const k = new Kit('PSP Go');
  const brush = brushNormal();
  k.mat('silver', {
    color: 0xd5d7dc, roughness: 0.3, metalness: 0.94,
    normalMap: brush, normalScale: new THREE.Vector2(0.4, 0.4),
  }, Phys);
  k.mat('deck', { color: 0x050506, roughness: 0.28, metalness: 0.08, clearcoat: 0.62, clearcoatRoughness: 0.12, ...plastic(k, 0.1) }, Phys);
  k.mat('face', { color: 0x030304, roughness: 0.12, metalness: 0.1, clearcoat: 0.88, clearcoatRoughness: 0.08 }, Phys);
  k.mat('key', { color: 0x121214, roughness: 0.38 });
  k.mat('stick', { color: 0x0c0c0e, roughness: 0.78 });
  k.mat('lcd', { color: 0x020308, roughness: 0.03, metalness: 0.14, clearcoat: 1, clearcoatRoughness: 0.025, envMapIntensity: 1.8 }, Phys);
  const grille = makeGrille(4, 4);
  k.mat('grille', { color: 0x070708, roughness: 0.3, map: grille.map, normalMap: grille.normalMap, normalScale: new THREE.Vector2(0.85, 0.85) });
  const H = 69, slide = 38.8, lowT = 9.5, T = 16.5;
  const shape = outline('pspgo');
  k.add('silver', solid(shape, 0, lowT - 0.5, 1.6, 4, 4));
  k.add('deck', slab(inset(shape, 2.6), lowT - 1.4, lowT, 0.6));
  k.add('silver', new THREE.TorusGeometry(4.2, 1.1, 8, 20).translate(-58.5, -30.5, 3));
  const z = lowT, py = -15.5, px = 34.9;
  for (const s of [-1, 1]) {
    k.add('deck', slab(circle(16.6, s * px, py, 40), z - 0.6, z + 0.45, 0.45));
    k.add('silver', new THREE.RingGeometry(12.4, 14.6, 40).translate(s * px, py, z + 0.5));
  }
  k.add('key', extrude(crossOutline(-px, py, 10.2, 6.4), z + 0.4, z + 1.75));
  for (const [ox, oy] of [[0, 8.4], [8.4, 0], [0, -8.4], [-8.4, 0]]) k.add('key', slab(circle(3.4, px + ox, py + oy, 20), z + 0.4, z + 1.75, 0.55));
  k.add('face', plate(circle(7.4, -10.5, -20.7, 28), [], z + 0.05));
  k.add('stick', faceNub(4.7, 2.15, -10.5, -20.7, z + 0.08));
  k.add('face', plate(circle(8.4, 10.8, -20.7, 28), [], z + 0.05));
  const halfPill = (sgn) => { const pts = []; for (let i = 0; i <= 14; i++) { const a = (i / 14) * Math.PI; pts.push(new THREE.Vector2(10.8 + Math.cos(a) * 6.9, -20.7 + sgn * (0.55 + Math.sin(a) * 4.4))); } return sgn > 0 ? pts : pts.reverse(); };
  k.add('key', slab(halfPill(1), z, z + 1.15, 0.4));
  k.add('key', slab(halfPill(-1), z, z + 1.15, 0.4));
  k.add('face', plate(rr(2.4, 1.1, 0.5, 0, -31.6), [], z + 0.05));
  // L/R on the lower half, peeking beside the slid-up screen
  for (const s of [-1, 1]) k.add('key', slab(rr(12, 5.2, 2.2, s * 56, 13), lowT - 1.2, lowT + 2.2, 0.7));
  print(k, 22, 22, px, py, z + 1.82, (g) => symbols(g, 0, 0, 8.4, 1.7, ['#e4e4e8', '#e4e4e8', '#e4e4e8', '#e4e4e8'], 0.34), 14);
  print(k, 24, 24, -px, py, z + 1.82, (g) => {
    g.strokeStyle = '#e4e4e8'; g.lineWidth = 0.32; g.lineJoin = 'round';
    for (const [ox, oy, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(ox * 6.4, -(oy * 6.4)); g.rotate(r);
      g.beginPath(); g.moveTo(-1.15, 0.65); g.lineTo(0, -0.65); g.lineTo(1.15, 0.65); g.closePath(); g.stroke();
      g.restore();
    }
  }, 14);
  print(k, 12, 8, 10.8, -20.7, z + 1.22, (g, font) => {
    txt(g, 'SELECT', 0, 2.4, `500 1.8px ${font}`, '#e4e4e8');
    txt(g, 'START', 0, -2.6, `500 1.8px ${font}`, '#e4e4e8');
  }, 16);
  const up = shape.map((p) => new THREE.Vector2(p.x, p.y + slide));
  // silver rail the screen housing rides in, slightly proud of the deck
  k.add('silver', loft([ring(inset(up, -0.35), lowT - 0.5), ring(inset(up, -0.35), lowT + 1.7)]));
  k.add('face', loft([ring(inset(up, 1.7), lowT + 0.15), ring(inset(up, 1.7), lowT + 1.2)]));
  k.add('deck', solid(up, lowT + 1.2, T, 1.8, 1.2, 4));
  const uy = slide + 2;
  k.add('face', slab(rr(86.5, 56, 1.5, 0, uy - 2), T - 0.4, T + 0.32, 0.28));
  k.add('lcd', new THREE.PlaneGeometry(84.1, 47.3).translate(0, uy, T + 0.38));
  k.add('key', slab(rr4(9, 9, [4.5, 2, 4.5, 4.5], -52.2, uy - 17), T - 0.3, T + 0.7, 0.4));
  for (const sx of [-51.2, 51.3]) k.add('grille', new THREE.PlaneGeometry(6.2, 5.4).translate(sx, uy + 8, T + 0.08));
  print(k, 16, 6, 0.8, slide + 29.4, T + 0.42, (g, font) => txt(g, 'SONY', 0, 0, `700 3.4px ${SERIF}`, '#d8d8dc'), 14);
  print(k, 24, 5, 0, slide + 24.7, T + 0.42, (g) => {
    g.strokeStyle = '#eeeef2'; g.lineWidth = 0.42; g.lineCap = 'butt'; g.lineJoin = 'miter';
    const top = -1.35, mid = 0, bot = 1.35;
    const P = (x) => { g.beginPath(); g.moveTo(x, bot); g.lineTo(x, mid); g.lineTo(x + 5.6, mid); g.lineTo(x + 5.6, top); g.lineTo(x, top); g.stroke(); };
    P(-9.4);
    g.beginPath(); g.moveTo(2.8, top); g.lineTo(-2.8, top); g.lineTo(-2.8, mid); g.lineTo(2.8, mid); g.lineTo(2.8, bot); g.lineTo(-2.8, bot); g.stroke();
    P(3.8);
  }, 16);
  print(k, 8, 8, -52.2, uy - 17, T + 0.78, (g) => {
    g.strokeStyle = '#f0f0f4'; g.lineWidth = 0.42; g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(0, -2.05); g.lineTo(2.15, 0.15); g.lineTo(1.25, 0.15); g.lineTo(1.25, 2.05);
    g.lineTo(-1.25, 2.05); g.lineTo(-1.25, 0.15); g.lineTo(-2.15, 0.15);
    g.closePath(); g.stroke();
  }, 16);
  return done(k, 'psp-go', H / 2);
}

export const PROPS = { 'ps-one': buildPSOne, dualshock: buildDualShock, gba: buildGBA, 'ps-vita': buildVita, 'psp-go': buildPSPGo };
