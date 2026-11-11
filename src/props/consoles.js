// Game hardware props, modelled from reference photographs and the published
// body dimensions:
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

function done(k, name) {
  const { root } = k.finish({});
  root.name = name;
  root.userData.prop = name;
  return root;
}

// ---------------------------------------------------------------------------
// PS one
// ---------------------------------------------------------------------------
export function buildPSOne() {
  const k = new Kit('PS one');
  k.mat('shell', { color: 0xd3d2cc, roughness: 0.55 });
  k.mat('lid', { color: 0xd3d2cc, roughness: 0.52 });
  k.mat('seam', { color: 0x8f8e88, roughness: 0.7 });
  k.mat('port', { color: 0xb6b5b0, roughness: 0.6 });
  const W = 193, D = 144, H = 38;
  // plan outline: rounded, slightly squarer at the back
  const plan = rr4(W, D, [26, 26, 30, 30]);            // "top" of the outline = back of the console
  k.add('shell', flat(slab(plan, 0, 19, 5)));
  k.add('shell', flat(slab(inset(plan, 0.6), 19.6, H - 3, 9)));
  k.add('seam', flat(loft([ring(inset(plan, 1.2), 18.6), ring(inset(plan, 1.2), 20.2)])));
  const top = H - 3;
  // lid: big disc with the hinge strip running to the back
  const lz = 4;                                         // lid centre, mm behind the middle
  k.add('lid', flat(disc(64, 0, lz, top - 1, top + 2.6, 2.2, 56)));
  k.add('lid', flat(slab(rr(98, 42, 3, 0, 49.5), top - 1, top + 1.2, 1)));
  k.add('seam', new THREE.RingGeometry(64, 64.9, 56).rotateX(-Math.PI / 2).translate(0, top + 0.05, -lz));
  // POWER / RESET (left) and OPEN (right): round buttons in raised corner pads
  for (const s of [-1, 1]) {
    k.add('shell', flat(disc(17.5, s * 73, -47, top - 2, top + 0.8, 1.6, 36)));
    k.add('lid', flat(disc(14, s * 73, -47, top, top + 2.6, 1, 36)));
    k.add('seam', new THREE.RingGeometry(14, 14.6, 36).rotateX(-Math.PI / 2).translate(s * 73, top + 0.85, 47));
  }
  // finger scoop at the front of the lid
  k.add('seam', new THREE.CircleGeometry(17, 24, Math.PI, Math.PI).translate(0, 30.5, D / 2 - 2.4));
  // front: memory card slots over controller ports
  for (const s of [-1, 1]) {
    k.add('port', new THREE.BoxGeometry(54, 8.6, 3).translate(s * 34, 23.6, D / 2 - 1.1));
    k.add('port', pill(52, 9, s * 34, 12.6, D / 2 - 8, D / 2 + 0.4, 0.4));
  }
  print(k, 150, 26, 0, 18.2, D / 2 + 0.46, (g, font) => {
    for (const s of [-1, 1]) {
      txt(g, 'MEMORY CARD', s * 34, 5.4, `600 2.6px ${font}`, '#7c7b76');
      g.fillStyle = '#e4e3de';
      for (let i = 0; i < 3; i++) g.fillRect(s * 34 - 23 + i * 16, 3, 14, 5.4);
      g.fillStyle = '#8a8984';
      for (let i = 0; i < 9; i++) g.fillRect(s * 34 - 20.6 + Math.floor(i / 3) * 16 + (i % 3) * 3.6, 5.2, 1.3, 1.3);
    }
  });
  // lid and button markings
  print(k, 150, 130, 0, top + 2.68, 0, (g, font) => {
    txt(g, 'SONY', 0, 38 + lz, `700 8.4px ${SERIF}`, '#77766f');
    // four-colour mark and the model name
    [['#d9382c', -3.2, 1.2], ['#e9b723', -0.4, 2.2], ['#2c8f6b', 0.2, -0.9], ['#2a63b8', 3.1, -0.2]].forEach(([c, dx, dy]) => { g.fillStyle = c; g.fillRect(dx - 1.6, -(-34 + lz + dy) - 1.5, 3.2, 3); });
    txt(g, 'PS one', 0, -43 + lz, `600 6px ${font}`, '#6f6e68');
    txt(g, '1', -40, -64, `500 4px ${font}`, '#a09f99'); txt(g, '2', 40, -64, `500 4px ${font}`, '#a09f99');
  }).rotation.x = -Math.PI / 2;
  for (const [s, draw] of [[-1, (g, font) => { txt(g, 'I/⏻', 0, 2.4, `700 6.4px ${font}`, '#2f9b68'); txt(g, 'RESET', 0, -4.4, `700 3px ${font}`, '#77766f'); }],
    [1, (g) => { g.strokeStyle = '#3d86c9'; g.lineWidth = 1; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-4, 1); g.lineTo(0, -4.4); g.lineTo(4, 1); g.closePath(); g.stroke(); g.strokeRect(-4, 2.8, 8, 1.6); }]]) {
    print(k, 24, 24, s * 73, top + 2.68, 47, draw).rotation.x = -Math.PI / 2;
  }
  return done(k, 'ps-one');
}

// ---------------------------------------------------------------------------
// DualShock in PS one colours
// ---------------------------------------------------------------------------
export function buildDualShock() {
  const k = new Kit('DualShock');
  k.mat('shell', { color: 0xdad8cc, roughness: 0.55 });
  k.mat('key', { color: 0x858690, roughness: 0.6 });
  k.mat('cable', { color: 0xb9b8b3, roughness: 0.7 });
  // plan (x right, "y" = towards the cable, i.e. away from the player)
  const podX = 49, podY = 12, podR = 26;
  k.add('shell', flat(slab(rr(104, 46, 12, 0, podY + 2), 0, 25, 5)));                 // centre bridge
  for (const s of [-1, 1]) {
    k.add('shell', flat(disc(podR, s * podX, podY, 0, 27, 6, 40)));                   // round pods
    k.add('shell', flat(disc(17, s * 22.5, -11, 0, 26, 5, 32)));                      // stick wells
    k.add('key', flat(disc(11, s * 22.5, -11, 26, 31.5, 2.2, 28)));                   // analog sticks
    // handles: fat capsules running down and outwards
    k.add('shell', new THREE.CapsuleGeometry(16.5, 48, 10, 24).rotateX(Math.PI / 2).rotateY(s * 0.2).translate(s * 59, 13, 30));
    // shoulder buttons
    k.add('shell', flat(slab(rr(30, 14, 5, s * podX, podY + 27), 6, 22, 4)));
    k.add('key', flat(slab(rr(22, 6, 2.5, s * podX, podY + 33.5), 12, 21, 2)));
  }
  // D-pad: four keys
  for (const [dx, dy, w, h] of [[0, 9.5, 9, 10], [0, -9.5, 9, 10], [-9.5, 0, 10, 9], [9.5, 0, 10, 9]]) {
    k.add('key', flat(slab(rr(w, h, 2, -podX + dx, podY + dy), 26, 29.4, 0.9)));
  }
  // face buttons
  for (const [dx, dy] of [[0, 11], [11, 0], [0, -11], [-11, 0]]) k.add('key', flat(disc(5.9, podX + dx, podY + dy, 26, 29.6, 0.9, 24)));
  // SELECT, START, ANALOG
  k.add('key', flat(slab(rr(8, 4.6, 1, -13, podY, ), 24, 26.2, 0.4)));
  k.add('key', flat(slab([new THREE.Vector2(9, podY + 2.8), new THREE.Vector2(9, podY - 2.8), new THREE.Vector2(18, podY)], 24, 26.2, 0.3)));
  k.add('key', flat(slab(rr(8, 5.6, 1, 0, -4), 24, 26.2, 0.4)));
  // cable
  const path = new THREE.CatmullRomCurve3([[0, 14, -(podY + 24)], [0, 12, -(podY + 46)], [-26, 6, -(podY + 70)], [-70, 4, -(podY + 70)], [-104, 4, -(podY + 50)]].map((p) => new THREE.Vector3(...p)));
  k.add('cable', new THREE.TubeGeometry(path, 36, 2.3, 8));
  // markings
  print(k, 150, 70, 0, 25.06, -podY, (g, font) => {
    txt(g, 'SONY', 0, 13.5, `700 6.6px ${SERIF}`, '#8a887f');
    txt(g, 'SELECT', -13, -5.4, `600 2.4px ${font}`, '#8a887f');
    txt(g, 'START', 13.5, -5.4, `600 2.4px ${font}`, '#8a887f');
    txt(g, 'ANALOG', 0, -10.4, `600 2.4px ${font}`, '#8a887f');
    txt(g, 'PS one', 0, 0.5, `600 3px ${font}`, '#8a887f');
  }).rotation.x = -Math.PI / 2;
  print(k, 40, 40, podX, 29.66, -podY, (g) => symbols(g, 0, 0, 11, 3, ['#2fa07a', '#d8553f', '#6c8fd0', '#d98ab0'], 0.6)).rotation.x = -Math.PI / 2;
  return done(k, 'dualshock');
}

// ---------------------------------------------------------------------------
// Game Boy Advance (AGB-001, indigo)
// ---------------------------------------------------------------------------
export function buildGBA() {
  const k = new Kit('Game Boy Advance');
  k.mat('shell', { color: 0x5448b8, roughness: 0.5 });
  k.mat('dark', { color: 0x3f3490, roughness: 0.6 });
  k.mat('key', { color: 0xc6c4c8, roughness: 0.55 });
  k.mat('lens', { color: 0x1b1b1e, roughness: 0.4 });
  k.mat('lcd', { color: 0x7b7f76, roughness: 0.6 });
  const W = 144.5, H = 82, T = 20, cy = H / 2;
  const body = rr4(W, H, [17, 17, 33, 33], 0, cy);
  // grey shoulder buttons wrap the top corners, just proud of the body
  for (const s of [-1, 1]) k.add('key', slab(rr4(30, 20, s > 0 ? [12, 4, 3, 6] : [4, 12, 6, 3], s * 57.6, H - 9.6), 3, 14, 3));
  k.add('shell', slab(body, 0, T, 5));
  // screen lens: wider at the top, big soft corners at the bottom
  const lcy = cy + 3.5;
  k.add('dark', plate(rr4(90, 69, [10, 10, 19, 19], 0, lcy), [], T + 0.03));
  k.add('lens', slab(rr4(87, 66, [9, 9, 18, 18], 0, lcy), T, T + 0.9, 0.5));
  k.add('lcd', new THREE.PlaneGeometry(61.2, 40.8).translate(0, lcy + 5, T + 0.95));
  // D-pad
  const dx = -58, dy = cy + 13;
  k.add('dark', plate(circle(12.5, dx, dy), [], T + 0.03));
  k.add('key', slab(rr(21, 7, 1.2, dx, dy), T, T + 2.6, 0.7));
  k.add('key', slab(rr(7, 21, 1.2, dx, dy), T, T + 2.6, 0.7));
  // A and B
  k.add('key', disc(5.8, 64.5, cy + 2.5, T, T + 2.4, 0.9));
  k.add('key', disc(5.8, 51.5, cy - 4, T, T + 2.4, 0.9));
  // START / SELECT
  k.add('key', disc(2.5, -48.5, cy - 8.5, T, T + 1.6, 0.6, 16));
  k.add('key', disc(2.5, -51.5, cy - 17.5, T, T + 1.6, 0.6, 16));
  // speaker grille and power lamp
  const widths = [9, 15, 19, 20, 19, 15];
  widths.forEach((w, i) => k.add('dark', plate(rr(w, 1.3, 0.6, 54 + (20 - w) / 2 - 1, cy - 14 - i * 3.1), [], T + 0.04).rotateZ(-0.0)));
  k.add('dark', plate(circle(1.3, 53, cy + 15), [], T + 0.04));
  print(k, W, H, 0, cy, T + 0.98, (g, font) => {
    g.save(); g.translate(0, -(lcy - cy - 27)); g.transform(1, 0, -0.18, 1, 0, 0);
    txt(g, 'GAME BOY', -9.5, 0, `900 4.3px ${font}`, '#d9d9de');
    txt(g, 'ADVANCE', 16, -0.2, `700 3.6px ${font}`, '#d9d9de');
    g.restore();
  });
  print(k, W, H, 0, cy, T + 0.06, (g, font) => {
    txt(g, 'START', -57.5, -7.5, `700 2.3px ${font}`, '#40358f');
    txt(g, 'SELECT', -61, -16.5, `700 2.3px ${font}`, '#40358f');
    txt(g, 'POWER', 61, 15, `700 2.1px ${font}`, '#40358f');
    g.strokeStyle = '#463b9c'; g.lineWidth = 0.5;
    g.beginPath(); g.ellipse(52, -33.5, 11, 3, 0, 0, Math.PI * 2); g.stroke();
    txt(g, 'Nintendo', 52, 33.4, `700 3.1px ${font}`, '#463b9c');
  });
  return done(k, 'gba');
}

// ---------------------------------------------------------------------------
// PS Vita (PCH-2000)
// ---------------------------------------------------------------------------
export function buildVita() {
  const k = new Kit('PS Vita');
  k.mat('shell', { color: 0x141416, roughness: 0.62 });
  k.mat('face', { color: 0x0b0b0d, roughness: 0.42 });
  k.mat('key', { color: 0x1c1c1f, roughness: 0.5 });
  k.mat('lcd', { color: 0x1b1e24, roughness: 0.45 });
  const W = 183.6, H = 85.1, T = 15, cy = H / 2;
  const body = rr(W, H, 41.5, 0, cy);
  k.add('shell', slab(body, 0, T - 1, 4.5));
  // one-piece front panel across the middle
  k.add('face', slab(rr(137, H - 3.4, 8, 0, cy), T - 1.6, T, 0.5));
  k.add('lcd', new THREE.PlaneGeometry(110.7, 62.3).translate(0, cy + 0.5, T + 0.03));
  const z = T - 1;
  // D-pad (top left), left stick, PS button
  const dx = -76.5, dy = cy + 14;
  for (const [ox, oy, w, h] of [[0, 6.4, 7, 8], [0, -6.4, 7, 8], [-6.4, 0, 8, 7], [6.4, 0, 8, 7]]) k.add('key', slab(rr(w, h, 1.6, dx + ox, dy + oy), z, z + 1.8, 0.6));
  for (const s of [-1, 1]) {
    const sx = s * 71.5, sy = cy + (s < 0 ? -11 : -24);
    k.add('face', plate(circle(9.4, sx, sy), [], z + 0.04));
    k.add('key', disc(6.9, sx, sy, z, z + 4.4, 1.4));
  }
  k.add('key', disc(4.2, -74, cy - 27.5, z, z + 1, 0.4, 20));
  // face buttons, START / SELECT
  const bx = 78, by = cy + 9;
  for (const [ox, oy] of [[0, 8.8], [8.8, 0], [0, -8.8], [-8.8, 0]]) k.add('key', disc(3.9, bx + ox, by + oy, z, z + 1.7, 0.6, 20));
  k.add('key', disc(3.3, 62, cy + 27, z, z + 1, 0.4, 16));
  for (const [x, y] of [[58, -36], [69, -33.5]]) k.add('key', pill(8.5, 5, x, cy + y, z, z + 1.1, 0.4));
  // speaker dots
  for (const [sx, sy] of [[-87, cy], [86.5, cy - 13]]) {
    for (let i = 0; i < 7; i++) { const a = (i / 6) * Math.PI * 2; const r = i === 6 ? 0 : 2.4; k.add('face', plate(circle(0.55, sx + Math.cos(a) * r, sy + Math.sin(a) * r, 8), [], z + 0.05)); }
  }
  print(k, W, H, 0, cy, T + 0.05, (g, font) => {
    txt(g, 'SONY', -52, 37, `700 4.2px ${SERIF}`, '#c9c9cc');
    g.save(); g.translate(0, 36.8); g.scale(1.25, 1);
    txt(g, 'PS VITA', 0, 0, `300 6.4px ${font}`, '#c9c9cc');
    g.restore();
  });
  print(k, 30, 30, bx, by, z + 1.76, (g) => symbols(g, 0, 0, 8.8, 1.9, ['#b9b9bd', '#b9b9bd', '#b9b9bd', '#b9b9bd'], 0.4), 24);
  return done(k, 'ps-vita');
}

// ---------------------------------------------------------------------------
// PSP Go (PSP-N1000), slid open
// ---------------------------------------------------------------------------
export function buildPSPGo() {
  const k = new Kit('PSP Go');
  k.mat('silver', { color: 0xb4b5b9, roughness: 0.38, metalness: 0.75 });
  k.mat('deck', { color: 0x131315, roughness: 0.6 });
  k.mat('face', { color: 0x0b0b0d, roughness: 0.42 });
  k.mat('key', { color: 0x1b1b1e, roughness: 0.5 });
  k.mat('lcd', { color: 0x1b1e24, roughness: 0.45 });
  const W = 128, H = 69, cy = H / 2, slide = 39, lowT = 9, T = 16.5;
  const body = rr(W, H, 27, 0, cy);
  // lower half: silver tray with the black control deck
  k.add('silver', slab(body, 0, lowT - 0.6, 3));
  k.add('deck', slab(inset(body, 2.4), lowT - 1.2, lowT, 0.5));
  const z = lowT;
  const ringAt = (x, y) => { k.add('silver', new THREE.RingGeometry(12.6, 14.8, 40).translate(x, y, z + 0.05)); k.add('deck', plate(circle(12.6, x, y, 32), [], z + 0.04)); };
  const padY = 21;
  ringAt(-37, padY); ringAt(37, padY);
  for (const [ox, oy, w, h] of [[0, 6, 6.4, 7.4], [0, -6, 6.4, 7.4], [-6, 0, 7.4, 6.4], [6, 0, 7.4, 6.4]]) k.add('key', slab(rr(w, h, 1.5, -37 + ox, padY + oy), z, z + 1.5, 0.5));
  for (const [ox, oy] of [[0, 6.6], [6.6, 0], [0, -6.6], [-6.6, 0]]) k.add('key', disc(3.3, 37 + ox, padY + oy, z, z + 1.5, 0.5, 20));
  k.add('face', plate(circle(8, -12.5, 11.5), [], z + 0.05));
  k.add('key', disc(5.3, -12.5, 11.5, z, z + 2.6, 1));
  k.add('face', plate(circle(8.4, 12.5, 11.5), [], z + 0.05));
  for (const oy of [2.5, -2.5]) k.add('key', pill(12, 4.2, 12.5, 11.5 + oy, z, z + 1.2, 0.4));
  print(k, W, H, 0, cy, z + 1.56, (g, font) => {
    symbols(g, 37, padY - cy, 6.6, 1.5, ['#c9c9cc', '#c9c9cc', '#c9c9cc', '#c9c9cc'], 0.35);
    txt(g, 'SELECT', 12.5, 14 - cy, `600 1.9px ${font}`, '#c9c9cc');
    txt(g, 'START', 12.5, 9 - cy, `600 1.9px ${font}`, '#c9c9cc');
  }, 24);
  // upper half: the screen, slid up
  const up = rr(W, H, 27, 0, cy + slide);
  k.add('silver', loft([ring(inset(up, 0.4), lowT + 0.2), ring(inset(up, 0.4), lowT + 1.6)]));
  k.add('face', slab(up, lowT + 1.4, T, 2.2));
  k.add('lcd', new THREE.PlaneGeometry(84, 47.3).translate(0, cy + slide + 1, T + 0.03));
  k.add('key', disc(5.2, -52, cy + slide - 21, T - 0.4, T + 0.7, 0.4, 20));
  for (const sx of [-55, 55]) for (const [ox, oy] of [[0, 1.6], [1.6, 0], [0, -1.6], [-1.6, 0]]) k.add('deck', plate(circle(0.65, sx + ox, cy + slide + 7 + oy, 8), [], T + 0.04));
  print(k, W, H, 0, cy + slide, T + 0.05, (g, font) => {
    txt(g, 'SONY', 0, 29.5, `700 3.9px ${SERIF}`, '#c9c9cc');
    // PSP wordmark drawn as thin strokes
    g.strokeStyle = '#d2d2d5'; g.lineWidth = 0.75; g.lineCap = 'square'; g.lineJoin = 'miter';
    const P = (x) => { g.beginPath(); g.moveTo(x, 31.2); g.lineTo(x, 28.6); g.lineTo(x + 8, 28.6); g.lineTo(x + 8, 26); g.lineTo(x, 26); g.stroke(); };
    P(-14.5);
    g.beginPath(); g.moveTo(4, 26); g.lineTo(-4, 26); g.lineTo(-4, 28.6); g.lineTo(4, 28.6); g.lineTo(4, 31.2); g.lineTo(-4, 31.2); g.stroke();
    P(6.5);
  }, 20);
  return done(k, 'psp-go');
}

export const PROPS = { 'ps-one': buildPSOne, dualshock: buildDualShock, gba: buildGBA, 'ps-vita': buildVita, 'psp-go': buildPSPGo };
