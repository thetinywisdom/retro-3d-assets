// Sony KV-9PR1 (1985, 9-inch Trinitron personal TV, soft orange cabinet).
//
// No manual or dimension sheet was available for this one. Proportions were
// measured from front and side photographs and scaled from the 9-inch tube
// (about 158 x 118 mm of picture), giving roughly 218 x 184 x 296 mm. The top
// control strip is only partly visible in the photographs, so its button
// layout is a reasoned reconstruction.
import * as THREE from 'three';
import {
  Kit, rr, ring, loft, plate, rbox, skipSides, straightFace, faceLocal, lay,
  rectOutline, holeRect, holeCircle, holeFits, boxCavity, roundCavity,
} from '../kit.js';
import { makeBrandTexture, makeDrawTexture } from '../labels.js';

const W = 218, D = 296, BASE_H = 13, SHELL_H = 171, H = BASE_H + SHELL_H;
const FZ = D / 2, SHELL_BZ = FZ - 196, RIB_BZ = SHELL_BZ - 65, BZ = -D / 2;
const CY = BASE_H + SHELL_H / 2;
const CHANNELS = Array.from({ length: 12 }, (_, i) => 'ch-' + (i + 1));
const JP = '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", "Noto Sans CJK JP", Meiryo, sans-serif';

export const META = {
  id: 'kv-9pr1',
  name: 'Sony KV-9PR1',
  size: { w: W, h: H, d: D },
  inputs: CHANNELS,
  inputOf: (s) => s.radio.channel || CHANNELS[0],
  noSignal: 'noise',
  barsLabel: 'CH 1',
  values: { volume: 0.5 },
  controls: [
    { id: 'power', label: 'Power', kind: 'button', role: 'power' },
    { id: 'ch-down', label: 'Channel down', kind: 'button', role: 'channel-down' },
    { id: 'ch-up', label: 'Channel up', kind: 'button', role: 'channel-up' },
    { id: 'vol-down', label: 'Volume down', kind: 'button', role: 'volume-down' },
    { id: 'vol-up', label: 'Volume up', kind: 'button', role: 'volume-up' },
    { id: 'sleep', label: 'Sleep timer', kind: 'button', role: 'sleep', latch: true },
  ],
};

export function buildMonitor() {
  const k = new Kit(META.name);
  // Soft orange. 0xe2bc9a is so pale that studio light lifts it to cream, and
  // 0xf0a066 still rendered as pale peach. This is deep enough to stay apricot.
  k.mat('shell', { color: 0xe07a3c, roughness: 0.42, bumpMap: k.grain, bumpScale: 0.2, roughnessMap: k.rough });
  k.mat('bezel', { color: 0x34363b, roughness: 0.42 });
  k.mat('rib', { color: 0x69665c, roughness: 0.7, roughnessMap: k.rough });
  k.mat('window', { color: 0x0c0c0e, roughness: 0.25 });
  const keyMat = () => new THREE.MeshStandardMaterial({ name: 'key', color: 0x9ea28f, roughness: 0.5 });

  // ---- soft-orange shell with rounded front edge -----------------------------
  const R = 5;
  const prof = (inset) => rr(W - 2 * inset, SHELL_H - 2 * inset, 15 - inset, 0, CY);
  // Left side is a separate plate so the speaker grille can be real holes.
  k.add('shell', loft([ring(prof(0), SHELL_BZ), ring(prof(0), FZ - R)], { skip: skipSides('left') }));
  const frontRings = [ring(prof(0), FZ - R)];
  for (let i = 1; i <= 4; i++) {
    const t = (i / 4) * (Math.PI / 2);
    frontRings.push(ring(prof(R * (1 - Math.cos(t))), FZ - R + R * Math.sin(t)));
  }
  k.add('shell', loft(frontRings));
  const bz = { w: 206, h: 158, cy: BASE_H + 2.5 + 79 };
  const bezelOut = rr(bz.w, bz.h, 10, 0, bz.cy);
  k.add('shell', plate(prof(R), [bezelOut], FZ));

  // ---- dark bezel: flat face, then a slope down to the tube -------------------
  const open = { w: 180, h: 127, cy: bz.cy - bz.h / 2 + 12 + 63.5 };
  const bezelZ = FZ + 0.8;
  k.add('bezel', loft([ring(bezelOut, FZ), ring(bezelOut, bezelZ)]));
  const openOut = rr(open.w, open.h, 4, 0, open.cy);
  k.add('bezel', plate(bezelOut, [openOut], bezelZ));
  const glass = { w: 170, h: 121 };
  k.add('bezel', loft([ring(openOut, bezelZ), ring(rr(glass.w + 2, glass.h + 2, 6, 0, open.cy), bezelZ - 8)]));
  k.add('black', loft([ring(rr(glass.w + 2, glass.h + 2, 6, 0, open.cy), bezelZ - 8), ring(rr(glass.w, glass.h, 6, 0, open.cy), bezelZ - 9.5)]));
  k.crt({ cx: 0, cy: open.cy, edgeZ: bezelZ - 10, glassW: glass.w, glassH: glass.h, picW: 158, picH: 118.5, RH: 520, RV: 2400, corner: 7 });

  const brand = { w: 28, h: 5.6, style: '#f3f1ea' };
  brand.mesh = k.decal(makeBrandTexture(brand), brand.w + 1.2, brand.h + 1.2, 0, bz.cy - bz.h / 2 + 6.2, bezelZ + 0.06,
    { alphaTest: 0.4, transparent: false, depthWrite: true, emissive: 0x555555 });
  brand.mesh.name = 'brand-badge';

  // ---- pedestal base with the TRINITRON mark and the indicator window -----------
  const baseFZ = FZ - 8, baseW = 132;
  k.add('shell', new THREE.BoxGeometry(baseW, BASE_H + 4, 170).translate(0, (BASE_H + 4) / 2, baseFZ - 85));
  k.decal(makeDrawTexture(baseW, BASE_H, 18, (g, font) => {
    [['#e8463a', 9], ['#58b947', 13.6], ['#3c8fd8', 18.2]].forEach(([c, x]) => { g.fillStyle = c; g.beginPath(); g.arc(x, 8.6, 1.9, 0, Math.PI * 2); g.fill(); });
    g.fillStyle = '#3d5a8a'; g.textAlign = 'left'; g.font = `600 3.1px ${font}`; g.fillText('TRINITRON', 21.6, 9.75);
  }), baseW, BASE_H, 0, BASE_H / 2, baseFZ + 0.05);
  const win = { x: 39, y: 6.4, w: 32, h: 8.8 };
  k.add('window', rbox(win.w, win.h, 0.6, 0.8, 0.2).translate(win.x, win.y, baseFZ));
  k.decal(makeDrawTexture(win.w, win.h, 24, (g) => {
    g.fillStyle = '#d6d6d2'; g.textAlign = 'left'; g.font = `500 2.3px ${JP}`;
    g.fillText('スタンバイ', 9, 3.7); g.fillText('スリープ', 9, 7.3);
  }), win.w, win.h, win.x, win.y, baseFZ + 0.66);
  const lampGeo = (dy) => new THREE.PlaneGeometry(3.2, 1.3).translate(win.x - 11, win.y + dy, baseFZ + 0.67);
  const standby = k.lamp(lampGeo(1.75), 0xff3a2a, 'lamp-standby');
  const sleepLamp = k.lamp(lampGeo(-1.85), 0xffa53a, 'lamp-sleep');
  for (const l of [standby, sleepLamp]) { l.material.color.setHex(0x6b6b66); l.raycast = () => {}; }

  // ---- ribbed grey rear section and end cap --------------------------------------
  const ribW = W - 4, ribH = SHELL_H - 4, ribR = 13;
  const ribProf = rr(ribW, ribH, ribR, 0, CY);
  k.add('rib', loft([ring(ribProf, RIB_BZ), ring(ribProf, SHELL_BZ)], { skip: skipSides('top', 'left', 'right') }));
  k.add('rib', plate(ribProf, [], 0).rotateY(Math.PI).translate(0, 0, RIB_BZ));
  const capProf = rr(W - 30, SHELL_H - 44, 10, 0, CY + 8);
  k.add('rib', loft([ring(capProf, BZ), ring(capProf, RIB_BZ)]));
  k.add('rib', plate(capProf, [], 0).rotateY(Math.PI).translate(0, 0, BZ));
  k.add('rib', new THREE.BoxGeometry(150, BASE_H + 4, 46).translate(0, (BASE_H + 4) / 2, RIB_BZ + 32));
  const ribLen = SHELL_BZ - RIB_BZ - 1, ribZ = (SHELL_BZ + RIB_BZ) / 2;
  const ribShell = { w: ribW, h: ribH, r: ribR, cy: CY, z0: RIB_BZ, z1: SHELL_BZ };
  const addRibFace = (side, fill) => {
    const desc = straightFace(side, ribShell);
    const holes = [];
    fill(desc, holes);
    k.add('rib', lay(plate(rectOutline(desc.spanX, desc.spanY), holes), desc.face, desc.origin));
  };
  const groove = (desc, holes, world, len, t) => {
    const p = faceLocal(desc, world);
    if (!holeFits(desc, p.x, p.y, len, t, 0.3)) return;
    holes.push(holeRect(len, t, p.x, p.y));
    k.add('cavity', lay(boxCavity(len, t, 2.4), desc.face, desc.origin, p.x, p.y));
  };
  for (const side of ['left', 'right']) {
    addRibFace(side, (desc, holes) => {
      for (let i = 0; i < 30; i++) {
        groove(desc, holes, new THREE.Vector3(desc.origin.x, BASE_H + 18 + i * 4.7, ribZ), ribLen, 1.3);
      }
    });
  }
  addRibFace('top', (desc, holes) => {
    for (let i = 0; i < 39; i++) {
      groove(desc, holes, new THREE.Vector3(-89.3 + i * 4.7, desc.origin.y, ribZ), 1.3, ribLen);
    }
  });

  // ---- left side: round speaker grille, holes through the shell -----------------
  {
    const desc = straightFace('left', { w: W, h: SHELL_H, r: 15, cy: CY, z0: SHELL_BZ, z1: FZ - R });
    const holes = [];
    const radius = 1.35;
    for (let r = 0; r <= 8; r++) {
      const n = r === 0 ? 1 : Math.round((2 * Math.PI * r * 5) / 5.4);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + r * 0.31;
        const world = new THREE.Vector3(desc.origin.x, 100 + Math.sin(a) * r * 5, 9 + Math.cos(a) * r * 5);
        const p = faceLocal(desc, world);
        if (!holeFits(desc, p.x, p.y, radius * 2, radius * 2, 0.4)) continue;
        holes.push(holeCircle(radius, p.x, p.y, 8));
        k.add('cavity', lay(roundCavity(radius, 4.2, 8), desc.face, desc.origin, p.x, p.y));
      }
    }
    k.add('shell', lay(plate(rectOutline(desc.spanX, desc.spanY), holes), desc.face, desc.origin));
  }

  // ---- top: control strip (reconstructed) and aerial stub -------------------------
  const top = BASE_H + SHELL_H;
  const strip = { x: 52, z: -14, w: 96, d: 30 };
  k.add('rib', new THREE.PlaneGeometry(strip.w, strip.d).rotateX(-Math.PI / 2).translate(strip.x, top + 0.05, strip.z));
  const keys = [['power', -36, 18], ['ch-down', -15, 12], ['ch-up', -1, 12], ['vol-down', 15, 12], ['vol-up', 29, 12]];
  for (const [id, dx, w] of keys) {
    k.button({ id, pos: [strip.x + dx, top, strip.z - 3], w, h: 9, out: 2.2, travel: 1.2, len: 7, r: 4.4, c: 0.8, facing: 'top', material: keyMat() });
  }
  k.button({ id: 'sleep', pos: [strip.x + 40.5, top, strip.z - 3], w: 7, h: 9, out: 2.2, travel: 1.2, len: 7, r: 3.4, c: 0.8, facing: 'top', material: keyMat(), lamp: sleepLamp });
  k.decal(makeDrawTexture(strip.w, 9, 20, (g) => {
    g.fillStyle = '#e9e6dc'; g.textAlign = 'center'; g.font = `600 2.6px ${JP}`;
    g.fillText('電源', 12, 6); g.fillText('▼ チャンネル ▲', 40, 6);
    g.fillText('－ 音量 ＋', 70, 6); g.fillText('スリープ', 89, 6);
  }), strip.w, 9, strip.x, top + 0.09, strip.z + 9.5).rotation.x = -Math.PI / 2;
  k.add('rib', new THREE.CylinderGeometry(3.4, 4, 20, 16).translate(-74, top + 10, -22));
  k.add('chrome', new THREE.CylinderGeometry(2.2, 2.2, 6, 12).translate(-74, top + 22, -22));

  k.shadow(W - 30, D - 20);
  return k.finish(META, {
    brand,
    setPower: (on) => { standby.material.emissiveIntensity = on ? 0 : 2.2; },
  });
}
