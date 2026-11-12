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

/** D-pad key: a bar with a pointed inner end. dir = [dx, dy] unit vector pointing outwards. */
function arrowKey(cx, cy, [dx, dy], inner, outer, w) {
  const px = -dy, py = dx, h = w / 2, mid = inner + w * 0.45;
  const P = (along, side) => new THREE.Vector2(cx + dx * along + px * side, cy + dy * along + py * side);
  return [P(inner, 0), P(mid, -h), P(outer, -h), P(outer, h), P(mid, h)];
}
const dots = (k, mat, list, r, z) => list.forEach(([x, y]) => k.add(mat, plate(circle(r, x, y, 10), [], z)));

function done(k, name, lift = 0) {
  const { root } = k.finish({});
  root.position.y = lift;
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
  k.mat('shell', { color: 0xc4c3bd, roughness: 0.58 });
  k.mat('lid', { color: 0xc8c7c1, roughness: 0.54 });
  k.mat('seam', { color: 0x8b8a84, roughness: 0.8 });
  k.mat('door', { color: 0xc3c2bc, roughness: 0.55 });
  k.mat('port', { color: 0xa9a8a3, roughness: 0.6 });
  const D = 144, top = 33.5;
  const plan = outline('psone');
  k.add('shell', flat(solid(plan, 0, top, 7, 11, 6)));
  // mid seam running round the body
  k.add('seam', flat(loft([ring(inset(plan, -0.05), 17.6), ring(inset(plan, -0.05), 18.4)])));
  // lid: 135 mm disc, hinge strip to the back edge
  const lr = 67.5, ly = -1;
  k.add('lid', flat(slab(rr(105, 30, 2, 0, 56.5), top - 2, top + 1.6, 1.2)));
  k.add('lid', flat(slab(circle(lr, 0, ly, 72), top - 2, top + 3.4, 2.6)));
  k.add('seam', new THREE.RingGeometry(lr - 0.1, lr + 0.9, 72).rotateX(-Math.PI / 2).translate(0, top + 0.06, -ly));
  // corner buttons in their raised pads
  for (const s of [-1, 1]) {
    k.add('shell', flat(slab(circle(19.5, s * 75, -49, 44), top - 3, top + 0.9, 2)));
    k.add('seam', new THREE.RingGeometry(15, 15.8, 44).rotateX(-Math.PI / 2).translate(s * 75, top + 0.95, 49));
    k.add('lid', flat(slab(circle(15, s * 75, -49, 44), top - 1, top + 2.6, 1.4)));
  }
  k.add('seam', new THREE.PlaneGeometry(1.6, 5).rotateX(-Math.PI / 2).translate(-75, top - 2.2, 68.2));
  // finger scoop under the front of the lid
  k.add('seam', new THREE.CircleGeometry(15, 24, Math.PI, Math.PI).translate(0, top - 4.4, D / 2 - 0.9).rotateX(0));
  // front: memory card doors over controller ports
  const fz = D / 2 - 0.4;
  for (const s of [-1, 1]) {
    k.add('door', new THREE.BoxGeometry(53, 8.4, 2).translate(s * 34.5, 22.6, fz - 0.6));
    k.add('port', slab(rr(53, 10.5, 4, s * 34.5, 11.8), fz - 6, fz + 0.5, 0.5));
  }
  print(k, 150, 30, 0, 17, fz + 0.56, (g, font) => {
    for (const s of [-1, 1]) {
      txt(g, 'MEMORY CARD', s * 34.5, 5.4, `600 2.5px ${font}`, '#74736e');
      for (let i = 0; i < 3; i++) {
        const x = s * 34.5 - 23.5 + i * 16.2;
        g.fillStyle = '#d7d6d1'; g.beginPath(); g.roundRect(x, 2.1, 14.6, 6.2, 1.2); g.fill();
        g.fillStyle = '#85847f';
        for (let j = 0; j < 3; j++) g.fillRect(x + 3.4 + j * 3.3, 4.6, 1.3, 1.3);
      }
    }
  });
  // lid and button markings
  print(k, 170, 144, 0, top + 3.46, 0, (g, font) => {
    txt(g, 'SONY', 0, 40, `700 9px ${SERIF}`, '#6f6e68');
    [['#d9382c', -2.6, 1.6, 3.4, 3.4], ['#e9b723', 0.6, 2.4, 3, 2.6], ['#2c8f6b', -0.2, -1.4, 3.4, 2.6], ['#2a63b8', 3.2, -0.6, 3, 3]].forEach(([c, dx, dy, w, h]) => { g.fillStyle = c; g.fillRect(dx - w / 2, -(-33 + dy) - h / 2, w, h); });
    txt(g, 'PS', -4.6, -43, `500 6.4px ${font}`, '#66655f'); txt(g, 'one', 5.4, -43.3, `500 5.2px ${font}`, '#66655f');
  }).rotation.x = -Math.PI / 2;
  print(k, 170, 144, 0, top + 0.08, 0, (g, font) => {
    txt(g, '1', -37, -66.5, `500 4px ${font}`, '#a3a29c'); txt(g, '2', 37, -66.5, `500 4px ${font}`, '#a3a29c');
  }).rotation.x = -Math.PI / 2;
  for (const [s, draw] of [[-1, (g, font) => { txt(g, 'I/⏻', 0, 2.2, `700 7px ${font}`, '#2f9b68'); txt(g, 'RESET', 0, -5, `700 3px ${font}`, '#6f6e68'); }],
    [1, (g) => { g.strokeStyle = '#3d86c9'; g.lineWidth = 1.1; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-4.4, 0.6); g.lineTo(0, -4.8); g.lineTo(4.4, 0.6); g.closePath(); g.stroke(); g.strokeRect(-4.4, 2.6, 8.8, 1.8); }]]) {
    print(k, 26, 26, s * 75, top + 2.66, 49, draw).rotation.x = -Math.PI / 2;
  }
  return done(k, 'ps-one');
}

// ---------------------------------------------------------------------------
// DualShock in PS one colours. Plan: x right, y towards the cable.
// ---------------------------------------------------------------------------
export function buildDualShock() {
  const k = new Kit('DualShock');
  k.mat('shell', { color: 0xd6d3c6, roughness: 0.58 });
  k.mat('pad', { color: 0xdedbd0, roughness: 0.5 });
  k.mat('key', { color: 0x7f808a, roughness: 0.62 });
  k.mat('cable', { color: 0xb9b8b3, roughness: 0.7 });
  const zT = 27;
  k.add('shell', flat(solid(outline('pad'), 0, zT, 6, 7, 5)));
  // handles swell downwards towards their tips
  for (const s of [-1, 1]) k.add('shell', new THREE.CapsuleGeometry(12.5, 26, 10, 24).rotateX(Math.PI / 2 - 0.5).rotateY(s * 0.19).translate(s * 62.5, 5, 24));
  // shoulder buttons (grey tips showing above the body)
  for (const s of [-1, 1]) k.add('key', flat(slab(rr(22, 7, 3, s * 45, 44.6), 9, 21, 2)));
  // D-pad: recessed cross plate with four arrow keys
  const dx = -45.5, by = 11;
  k.add('pad', flat(slab(rr(37, 13.5, 2, dx, by), zT - 1, zT + 0.5, 0.4)));
  k.add('pad', flat(slab(rr(13.5, 37, 2, dx, by), zT - 1, zT + 0.5, 0.4)));
  for (const d of [[0, 1], [0, -1], [1, 0], [-1, 0]]) k.add('key', flat(slab(arrowKey(dx, by, d, 2.2, 13.6, 9.6), zT, zT + 3, 0.9)));
  // face buttons on their own cross plate
  const fx = 46;
  k.add('pad', flat(slab(rr(38, 14.5, 2, fx, by), zT - 1, zT + 0.5, 0.4)));
  k.add('pad', flat(slab(rr(14.5, 38, 2, fx, by), zT - 1, zT + 0.5, 0.4)));
  for (const [ox, oy] of [[0, 12], [12, 0], [0, -12], [-12, 0]]) k.add('key', flat(slab(circle(6.2, fx + ox, by + oy, 28), zT, zT + 3.2, 1)));
  // analog sticks in raised collars
  for (const s of [-1, 1]) {
    k.add('shell', flat(slab(circle(15.5, s * 23, -11.5, 36), zT - 2, zT + 2.2, 2.2)));
    k.add('key', flat(slab(circle(4, s * 23, -11.5, 16), zT, zT + 4, 0.4)));
    k.add('key', flat(slab(circle(11, s * 23, -11.5, 32), zT + 3.4, zT + 7.4, 2)));
  }
  // SELECT, START, ANALOG and its lamp
  k.add('key', flat(slab(rr(7.6, 4.4, 0.9, -14.5, by), zT, zT + 1.3, 0.4)));
  k.add('key', flat(slab([new THREE.Vector2(10.5, by + 2.9), new THREE.Vector2(10.5, by - 2.9), new THREE.Vector2(19.5, by)], zT, zT + 1.3, 0.3)));
  k.add('key', flat(slab(rr(7.6, 4.8, 0.9, 0, -4.2), zT, zT + 1.3, 0.4)));
  k.add('key', new THREE.PlaneGeometry(4.6, 1.6).rotateX(-Math.PI / 2).translate(0, zT + 0.06, 11.2));
  // cable
  const path = new THREE.CatmullRomCurve3([[0, 14, -38], [0, 12, -60], [-26, 6, -84], [-70, 4, -84], [-104, 4, -64]].map((p) => new THREE.Vector3(...p)));
  k.add('cable', new THREE.TubeGeometry(path, 36, 2.3, 8));
  print(k, 160, 100, 0, zT + 0.08, 0, (g, font) => {
    const ink = '#85837a';
    txt(g, 'SONY', 0, 24.5, `700 7.6px ${SERIF}`, ink);
    txt(g, 'PS', -2.8, 9.6, `500 3.6px ${font}`, ink); txt(g, 'one', 2.6, 9.4, `500 3px ${font}`, ink);
    txt(g, 'SELECT', -14.5, 6.2, `500 2.5px ${font}`, ink);
    txt(g, 'START', 14.5, 6.2, `500 2.5px ${font}`, ink);
    txt(g, 'ANALOG', 0, 0.9, `500 2.5px ${font}`, ink);
    g.strokeStyle = ink; g.lineWidth = 0.35; g.lineJoin = 'round';
    for (const [ox, oy, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(dx + ox * 16.2, -(by + oy * 16.2)); g.rotate(r); g.beginPath(); g.moveTo(-1.6, 0.7); g.lineTo(0, -0.7); g.lineTo(1.6, 0.7); g.stroke(); g.restore();
    }
  }).rotation.x = -Math.PI / 2;
  print(k, 44, 44, fx, zT + 3.26, -by, (g) => symbols(g, 0, 0, 12, 3.3, ['#2fa07a', '#d8553f', '#7f9bd6', '#d98ab0'], 0.65)).rotation.x = -Math.PI / 2;
  return done(k, 'dualshock');
}

// ---------------------------------------------------------------------------
// Game Boy Advance (AGB-001, indigo)
// ---------------------------------------------------------------------------
export function buildGBA() {
  const k = new Kit('Game Boy Advance');
  k.mat('shell', { color: 0x5446a8, roughness: 0.52 });
  k.mat('dark', { color: 0x43389a, roughness: 0.6 });
  k.mat('key', { color: 0xc9c7c9, roughness: 0.55 });
  k.mat('lens', { color: 0x1d1d20, roughness: 0.35 });
  k.mat('lcd', { color: 0x80847b, roughness: 0.6 });
  const T = 21, H = 82;
  const body = outline('gba', 1, 1.02);
  // grey shoulder buttons behind the top corners
  for (const s of [-1, 1]) k.add('key', solid(rr4(26, 13, [6.5, 6.5, 3, 3], 0, 0).map((p) => p.clone().rotateAround(new THREE.Vector2(), -s * 0.5).add(new THREE.Vector2(s * 60.6, 25.5))), 3.5, 14.5, 3, 3));
  k.add('shell', solid(body, 0, T, 4.5, 8, 5));
  // lens: 74 x 63.5 mm, square top corners, deep round bottom corners
  const lens = rr4(74, 63.5, [5.5, 5.5, 15, 15], 0, -1.2);
  k.add('dark', plate(rr4(77, 66.5, [7, 7, 16.5, 16.5], 0, -1.2), [], T + 0.03));
  k.add('lens', slab(lens, T, T + 0.9, 0.6));
  k.add('lcd', new THREE.PlaneGeometry(61.2, 40.8).translate(0, 3, T + 0.95));
  // D-pad
  const dx = -52.5, dy = 7.8;
  k.add('dark', plate(circle(11.6, dx, dy, 32), [], T + 0.03));
  k.add('key', slab(rr(19.4, 6.4, 1, dx, dy), T, T + 2.6, 0.8));
  k.add('key', slab(rr(6.4, 19.4, 1, dx, dy), T, T + 2.6, 0.8));
  // A, B
  for (const [x, y] of [[57.8, 8.4], [45.2, 3.9]]) { k.add('dark', plate(circle(5.3, x, y, 28), [], T + 0.03)); k.add('key', slab(circle(4.5, x, y, 28), T, T + 2.3, 1)); }
  // START / SELECT
  for (const [x, y] of [[-43.4, -13.1], [-43.6, -21.2]]) k.add('key', slab(circle(2.4, x, y, 18), T, T + 1.5, 0.6));
  // speaker: five slanted slits, shorter towards the bottom
  [[16, 0], [16, -3.5], [15, -7], [14.5, -10.5], [13, -14]].forEach(([w, oy], i) => {
    k.add('dark', plate(rr(w, 1.15, 0.55), [], 0).rotateZ(0.21).translate(47.8 - i * 0.2, -10.6 + oy, T + 0.04));
  });
  k.add('dark', plate(circle(1.15, 45.9, 25.2, 14), [], T + 0.04));
  print(k, 150, 86, 0, 0, T + 0.98, (g, font) => {
    g.save(); g.translate(0, 25.2); g.transform(1, 0, -0.2, 1, 0, 0);
    txt(g, 'GAME BOY', -10.2, 0, `900 3.9px ${font}`, '#d4d4d8');
    g.save(); g.scale(1.15, 1); txt(g, 'ADVANCE', 9.9, -0.1, `600 3.3px ${font}`, '#d4d4d8'); g.restore();
    g.restore();
  }, 20);
  print(k, 150, 86, 0, 0, T + 0.06, (g, font) => {
    const ink = '#473c9f';
    g.strokeStyle = ink; g.lineWidth = 0.45;
    for (const [y, label] of [[-13.1, 'START'], [-21.2, 'SELECT']]) {
      g.beginPath(); g.roundRect(-58.5, -y - 2.7, 13.5, 5.4, 2.7); g.stroke();
      txt(g, label, -52.4, y, `800 2.3px ${font}`, ink);
    }
    txt(g, 'POWER', 53, 25.2, `800 2.2px ${font}`, ink);
    g.beginPath(); g.ellipse(1.5, -35.6, 9, 2.3, 0, 0, Math.PI * 2); g.stroke();
    txt(g, 'Nintendo', 1.5, 35.5, `800 3px ${font}`, ink);
  }, 20);
  return done(k, 'gba', H / 2 - 1);
}

// ---------------------------------------------------------------------------
// PS Vita (PCH-2000)
// ---------------------------------------------------------------------------
export function buildVita() {
  const k = new Kit('PS Vita');
  k.mat('shell', { color: 0x17171a, roughness: 0.6 });
  k.mat('face', { color: 0x08080a, roughness: 0.25 });
  k.mat('key', { color: 0x1d1d20, roughness: 0.42 });
  k.mat('stick', { color: 0x101012, roughness: 0.7 });
  k.mat('lcd', { color: 0x30333b, roughness: 0.35 });
  const H = 85.1, T = 14, z = T;
  k.add('shell', solid(outline('vita', 1, H / 85.9), 0, T, 3.2, 5, 5));
  // glossy front panel and the 5-inch LCD (LCD centre is 3.8 mm above the body centre)
  const oy = 3.8;
  k.add('face', slab(rr(121.5, 81.5, 5, 0, 1.3), T - 0.6, T + 0.5, 0.45));
  k.add('lcd', new THREE.PlaneGeometry(110.7, 62.3).translate(0, oy, T + 0.53));
  // D-pad
  const dx = -74.5, dy = 10.5 + oy;
  for (const d of [[0, 1], [0, -1], [1, 0], [-1, 0]]) k.add('key', slab(arrowKey(dx, dy, d, 1.6, 10, 6.2), z, z + 1.7, 0.6));
  // sticks
  for (const [sx, sy] of [[-70, -10.7 + oy], [68.8, -10.4 + oy]]) {
    k.add('face', plate(circle(8.2, sx, sy, 32), [], z + 0.04));
    k.add('stick', slab(circle(3.2, sx, sy, 16), z, z + 2.6, 0.3));
    k.add('stick', slab(circle(6.2, sx, sy, 28), z + 2.2, z + 4.6, 1.3));
  }
  // face buttons, small top-right key, PS, SELECT, START
  const bx = 73.8, by = 10.8 + oy;
  for (const [ox, o2] of [[0, 8], [8, 0], [0, -8], [-8, 0]]) k.add('key', slab(circle(3.7, bx + ox, by + o2, 22), z, z + 1.6, 0.6));
  k.add('key', slab(circle(3, 65.6, 23.3 + oy, 20), z, z + 0.9, 0.4));
  k.add('key', slab(circle(4.1, -71.5, -26 + oy, 22), z, z + 0.9, 0.4));
  for (const x of [65.6, 74.6]) k.add('key', slab(circle(3.7, x, -26.2 + oy, 22), z, z + 0.9, 0.4));
  // speakers
  for (const [sx, sy] of [[-84, -10.7 + oy], [82.3, -10.7 + oy]]) dots(k, 'face', [[0, 0], [2.2, 1.3], [2.2, -1.3], [-2.2, 1.3], [-2.2, -1.3], [0, 2.6], [0, -2.6]].map(([a, b]) => [sx + a, sy + b]), 0.6, z + 0.05);
  print(k, 190, 90, 0, 0, T + 0.56, (g, font) => {
    txt(g, 'SONY', -48, 34.6 + oy, `700 4.3px ${SERIF}`, '#d2d2d6');
    // PS VITA wordmark: light, wide capitals
    g.save(); g.translate(-0.8, -(-36.8 + oy)); g.scale(1.42, 1);
    txt(g, 'PS VITA', 0, 0, `200 5.6px ${font}`, '#dcdce0');
    g.restore();
  }, 20);
  print(k, 190, 90, 0, 0, z + 1.66, (g, font) => {
    symbols(g, bx, by, 8, 1.8, ['#c4c4c8', '#c4c4c8', '#c4c4c8', '#c4c4c8'], 0.38);
    g.strokeStyle = '#9a9a9e'; g.lineWidth = 0.3;
    for (const [ox, o2, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(dx + ox * 6.6, -(dy + o2 * 6.6)); g.rotate(r); g.beginPath(); g.moveTo(-1.1, 0.6); g.lineTo(0, -0.6); g.lineTo(1.1, 0.6); g.closePath(); g.stroke(); g.restore();
    }
  }, 20);
  print(k, 190, 90, 0, 0, z + 0.96, (g, font) => {
    txt(g, 'SELECT', 65.6, -26.2 + oy, `700 1.5px ${font}`, '#e6e6ea');
    txt(g, 'START', 74.6, -26.2 + oy, `700 1.5px ${font}`, '#e6e6ea');
  }, 24);
  return done(k, 'ps-vita', H / 2);
}

// ---------------------------------------------------------------------------
// PSP Go (PSP-N1000), slid open
// ---------------------------------------------------------------------------
export function buildPSPGo() {
  const k = new Kit('PSP Go');
  k.mat('silver', { color: 0xb9babd, roughness: 0.36, metalness: 0.8 });
  k.mat('deck', { color: 0x151517, roughness: 0.55 });
  k.mat('face', { color: 0x09090b, roughness: 0.22 });
  k.mat('key', { color: 0x1a1a1d, roughness: 0.4 });
  k.mat('stick', { color: 0x0e0e10, roughness: 0.8 });
  k.mat('lcd', { color: 0x34363b, roughness: 0.35 });
  const H = 69, slide = 38.8, lowT = 9.5, T = 16.5;
  const shape = outline('pspgo');
  // lower half: silver tray, black control deck set into it
  k.add('silver', solid(shape, 0, lowT - 0.5, 1.6, 4, 4));
  k.add('deck', slab(inset(shape, 2.6), lowT - 1.4, lowT, 0.6));
  k.add('silver', new THREE.TorusGeometry(4.2, 1.1, 8, 20).translate(-58.5, -30.5, 3));   // strap loop
  const z = lowT, py = -15.5, px = 34.9;
  for (const s of [-1, 1]) {
    k.add('deck', slab(circle(16.6, s * px, py, 44), z - 0.6, z + 0.5, 0.5));
    k.add('silver', new THREE.RingGeometry(12.5, 14.7, 48).translate(s * px, py, z + 0.53));
  }
  for (const d of [[0, 1], [0, -1], [1, 0], [-1, 0]]) k.add('key', slab(arrowKey(-px, py, d, 1.6, 11, 8.6), z + 0.4, z + 1.9, 0.6));
  for (const [ox, oy] of [[0, 8.4], [8.4, 0], [0, -8.4], [-8.4, 0]]) k.add('key', slab(circle(3.5, px + ox, py + oy, 22), z + 0.4, z + 1.9, 0.6));
  // analog nub and SELECT / START
  k.add('face', plate(circle(7.7, -10.5, -20.7, 30), [], z + 0.04));
  k.add('stick', slab(circle(5, -10.5, -20.7, 26), z, z + 2.2, 0.8));
  k.add('face', plate(circle(8.4, 10.8, -20.7, 30), [], z + 0.04));
  const halfPill = (sgn) => { const pts = []; for (let i = 0; i <= 14; i++) { const a = (i / 14) * Math.PI; pts.push(new THREE.Vector2(10.8 + Math.cos(a) * 6.9, -20.7 + sgn * (0.55 + Math.sin(a) * 4.4))); } return sgn > 0 ? pts : pts.reverse(); };
  k.add('key', slab(halfPill(1), z, z + 1.2, 0.4)); k.add('key', slab(halfPill(-1), z, z + 1.2, 0.4));
  k.add('face', plate(rr(2.4, 1.1, 0.5, 0, -31.6), [], z + 0.04));
  print(k, 130, 70, 0, 0, z + 1.96, (g, font) => {
    symbols(g, px, py, 8.4, 1.75, ['#d6d6da', '#d6d6da', '#d6d6da', '#d6d6da'], 0.36);
    g.strokeStyle = '#d6d6da'; g.lineWidth = 0.3;
    for (const [ox, oy, r] of [[0, 1, 0], [0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2]]) {
      g.save(); g.translate(-px + ox * 8, -(py + oy * 8)); g.rotate(r); g.beginPath(); g.moveTo(-1.2, 0.7); g.lineTo(0, -0.7); g.lineTo(1.2, 0.7); g.closePath(); g.stroke(); g.restore();
    }
  }, 24);
  print(k, 130, 70, 0, 0, z + 1.26, (g, font) => {
    txt(g, 'SELECT', 10.8, -18.3, `500 1.9px ${font}`, '#d6d6da');
    txt(g, 'START', 10.8, -23.3, `500 1.9px ${font}`, '#d6d6da');
  }, 24);
  // upper half (the screen), slid up by 38.8 mm
  const up = shape.map((p) => new THREE.Vector2(p.x, p.y + slide));
  k.add('silver', loft([ring(inset(up, 0.3), lowT + 0.1), ring(inset(up, 0.3), lowT + 1.3)]));
  k.add('deck', solid(up, lowT + 1.2, T, 1.8, 1.2, 4));
  const uy = slide + 2;                                    // LCD centre, 2 mm above the upper half's centre
  k.add('face', slab(rr(86.5, 56, 1.5, 0, uy - 2), T - 0.4, T + 0.35, 0.3));
  k.add('lcd', new THREE.PlaneGeometry(84.1, 47.3).translate(0, uy, T + 0.38));
  k.add('key', slab(rr4(9, 9, [4.5, 2, 4.5, 4.5], -52.2, uy - 17), T - 0.3, T + 0.7, 0.4));
  for (const sx of [-51.2, 51.3]) dots(k, 'face', [[0, 1.5], [1.5, 0], [0, -1.5], [-1.5, 0]].map(([a, b]) => [sx + a, uy + 8 + b]), 0.7, T + 0.04);
  dots(k, 'key', [[-52.6, uy + 17], [52.8, uy + 16]], 0.9, T + 0.04);
  print(k, 130, 70, 0, slide, T + 0.42, (g, font) => {
    txt(g, 'SONY', 0.8, 29.4, `700 3.6px ${SERIF}`, '#cfcfd3');
    // PSP wordmark, drawn as thin strokes: 18.8 x 2.7 mm
    g.strokeStyle = '#dedee2'; g.lineWidth = 0.42; g.lineCap = 'butt'; g.lineJoin = 'miter';
    const y0 = 24.7 - 1.35, y1 = 24.7, y2 = 24.7 + 1.35;      // canvas y (downwards): top, middle, bottom
    const P = (x) => { g.beginPath(); g.moveTo(x, y2); g.lineTo(x, y1); g.lineTo(x + 5.6, y1); g.lineTo(x + 5.6, y0); g.lineTo(x, y0); g.stroke(); };
    P(-9);
    g.beginPath(); g.moveTo(3.2, y0); g.lineTo(-2.4, y0); g.lineTo(-2.4, y1); g.lineTo(3.2, y1); g.lineTo(3.2, y2); g.lineTo(-2.4, y2); g.stroke();
    P(4.2);
  }, 24);
  return done(k, 'psp-go', H / 2);
}

export const PROPS = { 'ps-one': buildPSOne, dualshock: buildDualShock, gba: buildGBA, 'ps-vita': buildVita, 'psp-go': buildPSPGo };
