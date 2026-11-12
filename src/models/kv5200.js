// Sony KV-5200 (1970s 5-inch portable Trinitron colour TV).
//
// Overall size from the service manual: 162 (w) x 269 (h) x 330 (d) mm
// "including projecting parts", i.e. with the carry handle up. The cabinet
// itself is about 205 mm tall. Front-panel positions were measured from a
// straight-on photograph; the hood slant, handle and rear cover from side and
// three-quarter photographs.
import * as THREE from 'three';
import { Kit, rr, ring, loft, plate, rbox, slotRow } from '../kit.js';
import { makeBrandTexture, makeDrawTexture } from '../labels.js';

const W = 162, D = 330, BODY_H = 205, H = 269;
const BASE_H = 17, BLOCK_H = 48, UP0 = BASE_H + BLOCK_H; // upper shell starts at y = 65
const FZ_TOP = D / 2, FZ_LOW = FZ_TOP - 41;               // hood overhangs 41 mm at the top
const RZ = -D / 2 + 45;                                    // silver ends, black rear cover begins
const BLOCK_W = 150;

// numbered 1-12 at the site owner's request (the real US-market set reads 2-13)
const CH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'u1', 'u2'];
const chLabel = (c) => (c.startsWith('u') ? `UHF preset ${c[1]}` : `Channel ${c}`);

export const META = {
  id: 'kv-5200',
  name: 'Sony KV-5200',
  size: { w: W, h: BODY_H + 30, d: D },
  // when the camera moves in, frame the picture and the channel keys, not the carry handle above
  focus: { cy: BODY_H / 2, h: BODY_H, z: FZ_LOW - 6 },          // the plane of the picture and keys, behind the hood
  inputs: CH.map((c) => 'ch-' + c),
  inputOf: (s) => s.radio.channel,
  noSignal: 'noise',
  barsLabel: 'CH 1',
  controls: [
    { id: 'power', label: 'Power', kind: 'button', role: 'power' },
    ...CH.map((c) => ({ id: 'ch-' + c, label: chLabel(c), kind: 'button', role: 'channel', radio: 'channel' })),
    { id: 'volume', label: 'Volume', kind: 'slider', role: 'volume', value: 0.35 },
  ],
};

export function buildMonitor() {
  const k = new Kit(META.name);
  k.mat('silver', { color: 0xb7b0a4, roughness: 0.42, metalness: 0.55, bumpMap: k.grain, bumpScale: 0.25 });
  k.mat('hood', { color: 0x0b0b0b, roughness: 0.8 });
  k.mat('gloss', { color: 0x0d0d0d, roughness: 0.28 });
  k.mat('rear', { color: 0x161616, roughness: 0.7 });
  k.mat('orange', { color: 0xe8491c, roughness: 0.5 });
  const cap = () => new THREE.MeshStandardMaterial({ name: 'key', color: 0x111111, roughness: 0.3 });

  // ---- upper shell with the slanted viewing hood ---------------------------
  const upH = BODY_H - UP0, upCy = UP0 + upH / 2;
  const slant = (pts) => pts.map((p) => new THREE.Vector3(p.x, p.y, FZ_LOW + ((p.y - UP0) / upH) * (FZ_TOP - FZ_LOW)));
  const outer = rr(W, upH, 9, 0, upCy), inner = rr(W - 10, upH - 10, 6, 0, upCy);
  k.add('silver', loft([ring(outer, RZ), slant(outer)]));
  k.add('silver', loft([slant(outer), slant(inner)]));       // rim of the hood
  const bezelZ = FZ_LOW - 12;
  const bezel = rr(W - 12, upH - 12, 5, 0, upCy);
  k.add('hood', loft([slant(inner), ring(bezel, bezelZ)]));   // inside of the hood

  // smoked face plate with the 5-inch picture in the middle
  const glass = { w: 129, h: 113, cy: 125.5 };
  k.add('gloss', plate(bezel, [rr(glass.w, glass.h, 4, 0, glass.cy)], bezelZ));
  k.crt({ cx: 0, cy: glass.cy, edgeZ: bezelZ - 1, glassW: glass.w, glassH: glass.h, picW: 100, picH: 75, RH: 900, RV: 4000, corner: 6, outside: 0.22 });
  const brand = { w: 21.5, h: 4.2, style: '#eeeeea' };
  brand.mesh = k.decal(makeBrandTexture(brand), brand.w + 1.2, brand.h + 1.2, 0, 76, bezelZ + 1.6,
    { alphaTest: 0.4, transparent: false, depthWrite: true, emissive: 0x666666 });
  brand.mesh.name = 'brand-badge';

  // ---- lower block: channel keys, power, volume ----------------------------
  const blockCy = BASE_H + BLOCK_H / 2, blockFZ = FZ_LOW + 2;
  const blockProf = rr(BLOCK_W, BLOCK_H, 5, 0, blockCy);
  k.add('silver', loft([ring(blockProf, RZ), ring(blockProf, blockFZ)]));
  const bx = (mm) => -BLOCK_W / 2 + mm;          // mm from the block's left edge
  const by = (mm) => UP0 - mm;                   // mm below the block's top edge
  const panel = rr(141.2, 37.4, 1.5, 0, by(22.9));
  const panelZ = blockFZ - 1.6;
  k.add('silver', plate(blockProf, [panel], blockFZ));
  k.add('silver', loft([ring(panel, blockFZ), ring(panel, panelZ)]));
  k.add('hood', plate(panel, [], panelZ));

  // channel keys: 2 rows of 7, each with a back-lit number cell above it
  const pitch = 11.7, col0 = 12.75;
  const rows = [{ cell: 8.8, key: 16.9 }, { cell: 24.6, key: 32.8 }];
  const dot = new THREE.SphereGeometry(0.85, 12, 8);
  CH.forEach((c, i) => {
    const r = rows[Math.floor(i / 7)], x = bx(col0 + (i % 7) * pitch);
    const lamp = k.lamp(new THREE.PlaneGeometry(10.9, 5.0).translate(x, by(r.cell), panelZ + 0.03), c.startsWith('u') ? 0x66ff55 : 0xffd9a0, 'lamp-ch-' + c);
    lamp.userData.lampOn = 1.4;
    lamp.raycast = () => {};
    const b = k.button({ id: 'ch-' + c, pos: [x, by(r.key), panelZ], w: 10.9, h: 8.7, out: 1.3, travel: 0.9, len: 6, r: 0.5, c: 0.35, material: cap(), lamp });
    b.backlight = k.backlight(x, by(r.key), panelZ + 0.05, 10.9, 8.7);   // not on the real set: the site's backlit-keyboard hint
    const pip = new THREE.Mesh(dot, k.M.chrome);
    pip.position.set(0, 0, 6.2);
    pip.scale.z = 0.5;
    pip.userData.control = b.id;
    b.mesh.add(pip);
  });

  // TRINITRON block, POWER key, VOLUME slide
  const tri = { x: bx(105.3), y: by(17.2), w: 32.2, h: 21.2 };
  k.add('gloss', rbox(tri.w, tri.h, 1.6, 0.8, 0.4).translate(tri.x, tri.y, panelZ));
  const pw = { x: bx(132.4), y: by(17.15), w: 20, h: 19.4 };
  const power = k.button({ id: 'power', pos: [pw.x, pw.y, panelZ], w: pw.w, h: pw.h, out: 2.4, travel: 1.3, len: 7, r: 0.8, c: 0.4, material: cap() });
  const powerLegend = new THREE.Mesh(new THREE.PlaneGeometry(pw.w - 1, pw.h - 1), new THREE.MeshBasicMaterial({
    transparent: true, depthWrite: false,
    map: makeDrawTexture(pw.w - 1, pw.h - 1, 32, (g, font) => {
      g.fillStyle = '#e4e4de'; g.textAlign = 'center';
      g.font = `700 2.6px ${font}`; g.fillText('POWER', 9.5, 8.2);
      g.font = `600 1.25px ${font}`; g.fillStyle = '#8d8d88';
      g.fillText('▁ ON', 5.2, 15.6); g.fillText('▔ OFF', 13.6, 15.6);
    }),
  }));
  powerLegend.position.z = 7.03;
  powerLegend.raycast = () => {};
  power.mesh.add(powerLegend);

  const vol = { x0: bx(100), y: by(34.2), range: 31 };
  k.add('rubber', new THREE.BoxGeometry(40, 2.2, 0.2).translate(bx(116), vol.y, panelZ + 0.1));
  const thumb = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 7.5, 20, 1).rotateZ(Math.PI / 2), k.M.chrome);
  thumb.scale.set(1, 1, 0.75);
  thumb.position.set(vol.x0, vol.y, panelZ + 1.2);
  k.slider({ id: 'volume', mesh: thumb, range: vol.range });

  // legends on the black panel
  const pcy = by(22.9);
  const legends = k.decal(makeDrawTexture(141.2, 37.4, 16, (g, font) => {
    const X = (mm) => mm - 4.4, Y = (mm) => mm - 4.2;   // block mm -> panel canvas mm
    // number strips (smoked windows)
    g.fillStyle = 'rgba(70,70,70,0.55)';
    for (const r of rows) g.fillRect(X(col0 - 5.6), Y(r.cell - 2.6), pitch * 7 - 0.5, 5.2);
    g.fillStyle = '#9a9a96'; g.textAlign = 'center'; g.font = `500 4.3px ${font}`;
    CH.forEach((c, i) => {
      const r = rows[Math.floor(i / 7)];
      g.fillText(c.startsWith('u') ? '✳' : c, X(col0 + (i % 7) * pitch), Y(r.cell + 1.55));
    });
    // TRINITRON block
    const cx = X(105.3);
    [['#e23b2e', -7.3], ['#2fae4a', 0], ['#2a8fd6', 7.3]].forEach(([col, dx]) => {
      g.fillStyle = col; g.beginPath(); g.ellipse(cx + dx, Y(11.2), 3.4, 1.15, 0, 0, Math.PI * 2); g.fill();
    });
    g.fillStyle = '#e9e9e4'; g.font = `600 3.3px ${font}`;
    g.save(); g.translate(cx, Y(16.6)); g.scale(1.42, 1); g.fillText('TRINITRON', 0, 0); g.restore();
    // volume
    g.fillStyle = '#d5d5cf'; g.font = `600 1.55px ${font}`;
    g.fillText('MIN', X(99.5), Y(31.4)); g.fillText('MAX', X(132.5), Y(31.4));
    g.font = `600 2.1px ${font}`; g.fillText('VOLUME', X(116), Y(31.4));
  }), 141.2, 37.4, 0, pcy, panelZ + 0.06);
  legends.name = 'legends';
  // lifted just above the raised TRINITRON block
  legends.position.z = panelZ + 1.66;

  // ---- black base with the charge lamps -------------------------------------
  const baseFZ = FZ_LOW - 4;
  k.add('rear', new THREE.BoxGeometry(128, BASE_H + 2, baseFZ + D / 2 - 14).translate(0, (BASE_H + 2) / 2, (baseFZ - D / 2 + 14) / 2));
  k.decal(makeDrawTexture(128, 15, 14, (g, font) => {
    g.fillStyle = '#b8b8b2'; g.textAlign = 'left'; g.font = `600 2.1px ${font}`;
    g.fillText('START', 37.5, 6.3); g.fillText('RECHARGE', 37.5, 9); g.fillText('CHARGING', 59, 7.7);
    g.strokeStyle = '#3a3a3a'; g.lineWidth = 0.25; g.strokeRect(100, 3.6, 16, 6.6);
    g.textAlign = 'center'; g.font = `700 2.2px ${font}`; g.fillText('KV-5200', 108, 7.7);
  }), 128, 15, 0, 8, baseFZ + 0.05);
  k.add('rubber', new THREE.CircleGeometry(1.1, 14).translate(-30.5, 9.3, baseFZ + 0.04));
  k.add('rubber', new THREE.CircleGeometry(1.1, 14).translate(-8.5, 8.7, baseFZ + 0.04));

  // ---- black rear cover -------------------------------------------------------
  const rearA = rr(W - 2, BODY_H - BASE_H - 4, 9, 0, (BODY_H + BASE_H) / 2), rearB = rr(W - 24, BODY_H - BASE_H - 34, 9, 0, (BODY_H + BASE_H) / 2);
  k.add('rear', loft([ring(rearB, -D / 2), ring(rearA, RZ)]));
  k.add('rear', plate(rearB, [], 0).rotateY(Math.PI).translate(0, 0, -D / 2));
  k.add('rear', plate(rearA, [], RZ + 0.5));

  // ---- top: handle with the telescopic aerial, PUSH release, vents ---------------
  const top = BODY_H;
  k.add('hood', new THREE.PlaneGeometry(27, 190).rotateX(-Math.PI / 2).translate(0, top + 0.06, -27));
  const hz0 = -121, hz1 = 67, hh = 52;
  for (const z of [hz0 + 9, hz1 - 9]) k.add('silver', new THREE.BoxGeometry(25, hh, 18).translate(0, top + hh / 2, z));
  k.add('silver', rbox(25, hz1 - hz0, 11, 1.5, 1).rotateX(-Math.PI / 2).translate(0, top + hh - 11, (hz0 + hz1) / 2));
  k.add('hood', new THREE.PlaneGeometry(15, hz1 - hz0 - 8).rotateX(-Math.PI / 2).translate(0, top + hh + 0.06, (hz0 + hz1) / 2));
  k.add('chrome', new THREE.CylinderGeometry(3, 3, 172, 16).rotateX(Math.PI / 2).translate(0, top + hh + 3.4, -31));
  k.add('chrome', new THREE.SphereGeometry(4.2, 14, 10).translate(0, top + hh + 3.6, -118));
  k.add('orange', new THREE.CylinderGeometry(3.7, 3.7, 9, 16).rotateX(Math.PI / 2).translate(0, top + hh + 3.4, 59.5));
  k.add('silver', rbox(23, 12, 1.4, 1, 0.5).rotateX(-Math.PI / 2).translate(0, top, 76));
  k.decal(makeDrawTexture(23, 12, 20, (g, font) => {
    g.fillStyle = '#6f6a61'; g.textAlign = 'center'; g.font = `700 3.4px ${font}`; g.fillText('PUSH', 11.5, 7.3);
  }), 23, 12, 0, top + 1.46, 76).rotation.x = -Math.PI / 2;
  for (const side of [-1, 1]) {
    for (const z of [-96, -109]) {
      k.bucket.slot ||= [];
      k.bucket.slot.push(...slotRow({ n: 22, pitch: 2.6, len: 1.25, t: 9, at: [side * 19, top + 0.06, z], step: [side, 0, 0] }));
    }
  }

  // ---- right side: closed control door --------------------------------------------
  const sx = BLOCK_W / 2 + 0.06;
  const door = k.decal(makeDrawTexture(140, 40, 10, (g, font) => {
    g.strokeStyle = 'rgba(20,20,20,0.75)'; g.lineWidth = 0.5; g.strokeRect(4, 12, 132, 26);
    g.fillStyle = '#8f897e'; g.fillRect(64, 6.5, 13, 5.5);
    g.strokeStyle = 'rgba(40,40,40,0.5)'; g.lineWidth = 0.3;
    for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(66.5 + i * 2, 7.3); g.lineTo(66.5 + i * 2, 11.2); g.stroke(); }
    g.fillStyle = '#4c4840'; g.textAlign = 'right'; g.font = `700 2.6px ${font}`; g.fillText('OPEN ▸', 61, 10.6);
  }), 140, 40, sx, BASE_H + 21, -3);
  door.rotation.y = Math.PI / 2;

  k.shadow(BLOCK_W, D - 20);
  return k.finish(META, { brand });
}
