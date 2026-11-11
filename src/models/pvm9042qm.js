// Procedural Sony PVM-9042QM.
//
// Units are millimetres. Origin is on the desk under the centre of the unit:
// +x right, +y up, +z towards the viewer (the front face is at z = +D/2).
//
// Overall size comes from Sony's dimension drawing (217 x 217 x 352.5 mm,
// 30 mm bezel, feet 163 mm apart / 60 mm back / 263 mm pitch). Everything on
// the front face and the top cover was measured from perspective-corrected
// photographs of a real unit; those positions are given as (fx, fy) =
// millimetres from the left / top edge of the front face.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  makePanelLabels, makeBrandTexture, makeTrinitronLabel, makeGrainTexture, makeRoughnessTexture,
  makeShadowTexture, makeTallyTexture,
} from '../labels.js';
import { makeCrtMaterial, makePhosphorMesh } from '../crt.js';
import {
  rr, circle, ring, loft, plate, rbox, well, onTop, skipSides, straightFace, faceLocal, lay,
  rectOutline, holeRect, holeFits, boxCavity,
} from '../kit.js';

export const DIM = {
  W: 217, H: 217, D: 352.5,
  FOOT_H: 9, BODY_H: 208, BEZEL_D: 30,
  PICTURE_W: 158, PICTURE_H: 118.5,
};

const { W, D, FOOT_H: Y0, BODY_H, BEZEL_D } = DIM;
const Y1 = Y0 + BODY_H;        // top of the body
const FZ = D / 2;              // front face
const BZ = -D / 2;             // back
const ZB = FZ - BEZEL_D;       // bezel / cover joint
const CY = Y0 + BODY_H / 2;

// Front-face layout (mm from left / top of the face)
export const LAYOUT = {
  screen: { fx: 108.5, fy: 86, w: 199, h: 132 },
  tally: { fx: 108.5, fy: 10.25, w: 22, h: 15.5 },
  trinitron: { fx: 24.5, fy: 15, w: 18, h: 5 },
  sony: { fx: 108.5, fy: 165.5, w: 33, h: 7.5 },
  panel: { fx0: 15.5, fy0: 174.3, w: 184.5, h: 27.7 },
  buttonCols: [21.7, 33.2, 45, 56.5],
  buttonRows: [183.9, 193.4],
  buttons: [
    ['ab', 'line-rgb', 'sync', 'degauss'],
    ['blue-only', 'underscan', 'hv-delay', '16-9'],
  ],
  trimCols: [67, 76.7],
  trimRows: [180.9, 188.4, 195.9],
  knobs: ['APER', 'BRIGHT', 'CHROMA', 'PHASE', 'CONTR', 'VOLUME'].map((label, i) => ({
    id: label.toLowerCase(), label, fx: 88.5 + 15.35 * i, fy: 187.2,
  })),
  led: { fx: 177.5, fy: 188 },
  power: { fx: 190.7, fy: 189.2 },
};

const fxX = (fx) => fx - W / 2;
const fyY = (fy) => Y1 - fy;

// ---------------------------------------------------------------------------
// build
// ---------------------------------------------------------------------------
const BTN = (id, label, extra = {}) => ({ id, label, kind: 'button', role: id, latch: true, ...extra });
export const META = {
  id: 'pvm-9042qm',
  name: 'Sony PVM-9042QM',
  size: { w: W, h: DIM.H, d: D },
  inputs: ['line-a', 'line-b', 'rgb', 'component'],
  inputOf: (s) => (s.buttons['line-rgb'] ? (s.buttons.ab ? 'component' : 'rgb') : s.buttons.ab ? 'line-b' : 'line-a'),
  noSignal: 'black',
  controls: [
    BTN('power', 'Power', { latch: false }),
    BTN('ab', 'A/B input selector'),
    BTN('line-rgb', 'LINE/RGB input selector'),
    BTN('sync', 'Sync internal/external'),
    BTN('degauss', 'Degauss', { latch: false }),
    BTN('blue-only', 'Blue only'),
    BTN('underscan', 'Under scan'),
    BTN('hv-delay', 'H/V delay'),
    BTN('16-9', '16:9', { role: 'wide' }),
    { id: 'aper', label: 'Aperture (sharpness)', kind: 'knob', role: 'aper' },
    { id: 'bright', label: 'Brightness', kind: 'knob', role: 'bright' },
    { id: 'chroma', label: 'Chroma (colour)', kind: 'knob', role: 'chroma' },
    { id: 'phase', label: 'Phase (hue)', kind: 'knob', role: 'phase' },
    { id: 'contr', label: 'Contrast', kind: 'knob', role: 'contr' },
    { id: 'volume', label: 'Volume', kind: 'knob', role: 'volume' },
  ],
};

export function buildMonitor({ tallyLogo = null } = {}) {
  const root = new THREE.Group();
  root.name = 'Sony PVM-9042QM';

  const grain = makeGrainTexture();
  grain.repeat.set(1 / 9, 1 / 9);
  const rough = makeRoughnessTexture();

  const M = {
    cover: new THREE.MeshStandardMaterial({ name: 'cover', color: 0x93938e, roughness: 0.74, metalness: 0.05, bumpMap: grain, bumpScale: 0.6, roughnessMap: rough }),
    bezel: new THREE.MeshStandardMaterial({ name: 'bezel', color: 0x55534f, roughness: 0.66, metalness: 0.0, bumpMap: grain, bumpScale: 0.45, roughnessMap: rough }),
    funnel: new THREE.MeshStandardMaterial({ name: 'funnel', color: 0x2b2a29, roughness: 0.72 }),
    panel: new THREE.MeshStandardMaterial({ name: 'panel', color: 0x3a3a39, roughness: 0.62 }),
    black: new THREE.MeshStandardMaterial({ name: 'black', color: 0x070707, roughness: 0.85 }),
    strap: new THREE.MeshStandardMaterial({ name: 'strap', color: 0x8c8c87, roughness: 0.6 }),
    rubber: new THREE.MeshStandardMaterial({ name: 'rubber', color: 0x121212, roughness: 0.92 }),
    handle: new THREE.MeshPhysicalMaterial({ name: 'handle', color: 0x0b0b0b, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
    screw: new THREE.MeshStandardMaterial({ name: 'screw', color: 0xc4c4c0, roughness: 0.38, metalness: 1 }),
    trimmer: new THREE.MeshStandardMaterial({ name: 'trimmer', color: 0x1d1d1d, roughness: 0.5 }),
    cavity: new THREE.MeshStandardMaterial({ name: 'cavity', color: 0x0c0c0c, roughness: 0.94, side: THREE.DoubleSide }),
  };
  const buttonMat = () => new THREE.MeshStandardMaterial({ name: 'button', color: 0xa9a699, roughness: 0.6 });
  const knobMat = () => new THREE.MeshStandardMaterial({ name: 'knob', color: 0x141414, roughness: 0.38 });

  const bucket = {};
  const add = (mat, g) => (bucket[mat] ||= []).push(g);

  // ---- cover (light grey steel wrap: top, sides, bottom, back) -------------
  const cw = W - 1, ch = BODY_H - 1, cr = 3.5;
  const cprof = rr(cw, ch, cr, 0, CY);
  const coverTop = CY + ch / 2;
  // Top and both sides are plates, so the vents can be openings rather than decals.
  add('cover', loft([ring(cprof, BZ), ring(cprof, ZB)], { skip: skipSides('top', 'left', 'right') }));
  add('cover', plate(cprof, [], 0).rotateY(Math.PI).translate(0, 0, BZ));               // plain back
  add('panel', new THREE.PlaneGeometry(W - 28, BODY_H - 30).rotateY(Math.PI).translate(0, CY, BZ - 0.06));

  const tray = { w: 80, d: 240, zc: BZ + 170, depth: 7 };
  const coverFace = { w: cw, h: ch, r: cr, cy: CY, z0: BZ, z1: ZB };
  // tray: soft lip, sloped walls, flat floor
  add('cover', onTop(loft([
    ring(rr(tray.w, tray.d, 8), 0), ring(rr(tray.w - 2.4, tray.d - 2.4, 7), -1.1),
    ring(rr(tray.w - 9, tray.d - 9, 5), -tray.depth),
  ]), 0, coverTop, tray.zc));
  add('cover', onTop(plate(rr(tray.w - 9, tray.d - 9, 5), [], -tray.depth), 0, coverTop, tray.zc));

  // fold-flat carry handle: two screwed end blocks and a strap
  const trayFloor = coverTop - tray.depth;
  const blockZ = [BZ + 86.5, BZ + 258.5];
  for (const z of blockZ) add('cover', onTop(rbox(27, 33, 5.6, 1.6, 0.9), 0, trayFloor, z));
  add('strap', onTop(rbox(25, 140, 4.2, 1.2, 0.8), 0, trayFloor, BZ + 172.5));

  const screw = (m4, r = 3.3) => {
    const head = new THREE.CylinderGeometry(r * 0.86, r, 1.1, 20).translate(0, 0.55, 0);
    const cross = mergeGeometries([
      new THREE.BoxGeometry(r * 1.2, 0.3, 0.75).translate(0, 1.1, 0),
      new THREE.BoxGeometry(0.75, 0.3, r * 1.2).translate(0, 1.1, 0),
    ]);
    add('screw', head.applyMatrix4(m4));
    add('black', cross.applyMatrix4(m4));
  };
  screw(new THREE.Matrix4().makeTranslation(0, trayFloor + 5.6, BZ + 93));
  screw(new THREE.Matrix4().makeTranslation(0, trayFloor + 5.6, BZ + 252));

  // top plate: carry-handle tray plus the vent columns, each vent a real recess
  const slotW = 16, slotT = 1.7, slotD = 2.8;
  const topGroups = [[12, 14], [88, 14], [164, 14], [240, 8]];
  {
    const desc = straightFace('top', coverFace);
    const holes = [];
    const trayAt = faceLocal(desc, new THREE.Vector3(0, desc.origin.y, tray.zc));
    holes.push(rr(tray.w, tray.d, 8, trayAt.x, trayAt.y).slice().reverse());
    for (const sx of [-91.5, -67.5, 67.5, 91.5]) {
      for (const [y0, n] of topGroups) {
        for (let k = 0; k < n; k++) {
          const p = faceLocal(desc, new THREE.Vector3(sx, desc.origin.y, BZ + y0 + k * 5.05));
          if (!holeFits(desc, p.x, p.y, slotW, slotT)) continue;
          holes.push(holeRect(slotW, slotT, p.x, p.y));
          add('cavity', lay(boxCavity(slotW, slotT, slotD), desc.face, desc.origin, p.x, p.y));
        }
      }
    }
    add('cover', lay(plate(rectOutline(desc.spanX, desc.spanY), holes), desc.face, desc.origin));
  }

  // side vents + screws, from the dimension drawing (zf = mm behind the front face)
  const sideCols = [[47, 114], [122, 188], [196, 262], [270, 327]];
  const sideRows = [[12, 28], [36, 52], [60, 75], [132, 148], [156, 173]];
  const sideScrews = [[50, 100], [334, 100], [110, 198], [281, 198]];
  for (const sideName of ['left', 'right']) {
    const side = sideName === 'right' ? 1 : -1;
    const desc = straightFace(sideName, coverFace);
    const holes = [];
    for (const [z0, z1] of sideCols) {
      const n = Math.floor((z1 - z0 + 3) / 17.5);
      const len = (z1 - z0 - (n - 1) * 3) / n;
      for (const [t0] of sideRows) {
        for (let r = 0; r < 4; r++) {
          for (let k = 0; k < n; k++) {
            const zf = z0 + len / 2 + k * (len + 3);
            const p = faceLocal(desc, new THREE.Vector3(desc.origin.x, Y1 - (t0 + 1.2 + r * 4.6), FZ - zf));
            if (!holeFits(desc, p.x, p.y, len, slotT, 0.35)) continue;
            holes.push(holeRect(len, slotT, p.x, p.y));
            add('cavity', lay(boxCavity(len, slotT, slotD), desc.face, desc.origin, p.x, p.y));
          }
        }
      }
    }
    add('cover', lay(plate(rectOutline(desc.spanX, desc.spanY), holes), desc.face, desc.origin));
    for (const [zf, ft] of sideScrews) {
      screw(new THREE.Matrix4().makeRotationZ(-side * Math.PI / 2).setPosition(side * cw / 2, Y1 - ft, FZ - zf), 3.6);
    }
  }

  // ---- feet ----------------------------------------------------------------
  for (const x of [-81.5, 81.5]) {
    for (const z of [FZ - 60, FZ - 323]) {
      const foot = mergeGeometries([
        loft([ring(rr(25, 17, 3), 0), ring(rr(22, 14, 3), 7.8), ring(rr(20, 12, 2.4), 9)]),
        plate(rr(20, 12, 2.4), [], 9),
      ]);
      add('rubber', foot.rotateX(Math.PI / 2).translate(x, Y0 + 0.4, z));
    }
  }

  // ---- bezel (dark grey moulding, 30 mm deep) ------------------------------
  const R = 2.6; // front edge radius
  const bprof = (inset) => rr(W - 2 * inset, BODY_H - 2 * inset, 4.2 - inset, 0, CY);
  const bezelRings = [ring(bprof(0), ZB), ring(bprof(0), FZ - R)];
  for (let k = 1; k <= 4; k++) {
    const th = (k / 4) * (Math.PI / 2);
    bezelRings.push(ring(bprof(R * (1 - Math.cos(th))), FZ - R + R * Math.sin(th)));
  }
  add('bezel', loft(bezelRings));
  add('bezel', plate(bprof(0), [cprof.map((p) => new THREE.Vector2(-p.x, p.y))]).rotateY(Math.PI).translate(0, 0, ZB));

  const S = LAYOUT.screen, TL = LAYOUT.tally, P = LAYOUT.panel;
  const scx = fxX(S.fx), scy = fyY(S.fy);
  const openOuter = rr(S.w + 1.6, S.h + 1.6, 5.8, scx, scy);
  const tallyOuter = rr(TL.w, TL.h, 1.2, fxX(TL.fx), fyY(TL.fy));
  const pcx = fxX(P.fx0 + P.w / 2), pcy = fyY(P.fy0 + P.h / 2);
  const panelOuter = rr(P.w, P.h, 1.5, pcx, pcy);
  add('bezel', plate(bprof(R), [openOuter, tallyOuter, panelOuter], FZ));

  // screen funnel: wide sloping side walls, shallow top and bottom
  const funnelDepth = 19;
  const maskW = 163, maskH = 123;
  add('bezel', loft([ring(openOuter, FZ), ring(rr(S.w, S.h, 5, scx, scy), FZ - 0.9)]));
  add('funnel', loft([ring(rr(S.w, S.h, 5, scx, scy), FZ - 0.9), ring(rr(maskW + 3, maskH + 3, 7, scx, scy), FZ - funnelDepth)]));
  add('black', loft([ring(rr(maskW + 3, maskH + 3, 7, scx, scy), FZ - funnelDepth), ring(rr(maskW, maskH, 6, scx, scy), FZ - funnelDepth - 2)]));

  // tally lamp window: bezel lip, dark shaft, diffuser at the back of the well
  const tallyFloor = { w: TL.w - 3, h: TL.h - 3 };
  const tallyDepth = 8;
  const tallyLip = rr(TL.w - 1.5, TL.h - 1.5, 1.0, fxX(TL.fx), fyY(TL.fy));
  add('bezel', loft([ring(tallyOuter, FZ), ring(tallyLip, FZ - 1.4)]));
  add('black', loft([ring(tallyLip, FZ - 1.4), ring(rr(tallyFloor.w, tallyFloor.h, 0.7, fxX(TL.fx), fyY(TL.fy)), FZ - tallyDepth)]));
  const tallyMat = new THREE.MeshStandardMaterial({
    name: 'tally', color: 0xd0d0ca, roughness: 0.55, emissive: 0xffffff, emissiveIntensity: 0,
    map: makeTallyTexture(tallyLogo, tallyFloor.w, tallyFloor.h),
  });
  tallyMat.emissiveMap = tallyMat.map;
  const tally = new THREE.Mesh(new THREE.PlaneGeometry(tallyFloor.w, tallyFloor.h), tallyMat);
  tally.position.set(fxX(TL.fx), fyY(TL.fy), FZ - tallyDepth + 0.2);
  tally.name = 'tally';
  tally.userData.size = tallyFloor;
  root.add(tally);

  // ---- control strip -------------------------------------------------------
  const panelZ = FZ - 1.2;
  add('bezel', loft([ring(panelOuter, FZ), ring(panelOuter, panelZ)]));
  const sockets = [];
  const socketDepth = 3;
  const cutSocket = (outline) => {
    sockets.push(outline);
    const w = well(outline, panelZ, socketDepth);
    add('black', w.walls);
    add('black', w.floor);
  };

  const controls = {};
  const interactive = new THREE.Group();
  interactive.name = 'controls';
  root.add(interactive);

  // push buttons
  const makeButton = (id, fx, fy, w, h, out, travel) => {
    cutSocket(rr(w + 1.5, h + 1.5, 0.8, fxX(fx), fyY(fy)));
    const len = 9;
    const mesh = new THREE.Mesh(rbox(w, h, len, 0.7, 0.55), buttonMat());
    mesh.position.set(fxX(fx), fyY(fy), panelZ + out - len);
    mesh.name = id;
    mesh.userData.control = id;
    interactive.add(mesh);
    controls[id] = { id, kind: 'button', mesh, home: mesh.position.clone(), axis: new THREE.Vector3(0, 0, -1), travel };
  };
  LAYOUT.buttons.forEach((row, r) => row.forEach((id, c) => {
    makeButton(id, LAYOUT.buttonCols[c], LAYOUT.buttonRows[r], 6.5, 6.7, 3.6, 1.7);
  }));
  makeButton('power', LAYOUT.power.fx, LAYOUT.power.fy, 7.5, 10.5, 5.2, 2.4);

  // BIAS / GAIN trimmer wells
  for (const tx of LAYOUT.trimCols) {
    cutSocket(rr(6.4, 22, 3.2, fxX(tx), fyY(LAYOUT.trimRows[1])));
    for (const ty of LAYOUT.trimRows) {
      add('trimmer', new THREE.CylinderGeometry(2.0, 2.0, 1.6, 18).rotateX(Math.PI / 2).translate(fxX(tx), fyY(ty), panelZ - socketDepth + 0.8));
      add('black', new THREE.BoxGeometry(3.0, 0.55, 0.3).translate(fxX(tx), fyY(ty), panelZ - socketDepth + 1.6));
    }
  }

  // rotary knobs
  const knobLen = 9.6;
  const knobProfile = [
    [5.25, 0], [5.25, knobLen - 1.0], [4.95, knobLen - 0.35], [4.3, knobLen], [0, knobLen],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  for (const k of LAYOUT.knobs) {
    cutSocket(circle(6.3, fxX(k.fx), fyY(k.fy)));
    const group = new THREE.Group();
    group.position.set(fxX(k.fx), fyY(k.fy), panelZ - socketDepth);
    group.name = k.id;
    const mat = knobMat();
    const body = new THREE.Mesh(new THREE.LatheGeometry(knobProfile, 36).rotateX(Math.PI / 2), mat);
    body.userData.control = k.id;
    const mark = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 3.3, 0.12).translate(0, 2.65, knobLen + 0.06),
      new THREE.MeshBasicMaterial({ color: 0xe8e8e2 }),
    );
    mark.userData.control = k.id;
    group.add(body, mark);
    interactive.add(group);
    controls[k.id] = { id: k.id, kind: 'knob', mesh: body, group, label: k.label };
  }

  // power LED
  const ledMat = new THREE.MeshStandardMaterial({ name: 'led', color: 0x1c2a1c, roughness: 0.3, emissive: 0x39ff5a, emissiveIntensity: 0 });
  const led = new THREE.Mesh(new THREE.SphereGeometry(1.05, 16, 10), ledMat);
  led.scale.z = 0.7;
  led.position.set(fxX(LAYOUT.led.fx), fyY(LAYOUT.led.fy), panelZ);
  led.name = 'power-led';
  root.add(led);

  add('panel', plate(panelOuter, sockets, panelZ));

  // legends
  const decal = (map, w, h, x, y, z, extra = {}) => {
    const mat = new THREE.MeshStandardMaterial({ map, transparent: true, depthWrite: false, roughness: 0.6, ...extra });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z);
    m.raycast = () => {};
    m.renderOrder = 2;
    root.add(m);
    return m;
  };
  decal(makePanelLabels(LAYOUT), P.w, P.h, pcx, pcy, panelZ + 0.04).name = 'legends';
  const SN = LAYOUT.sony, TR = LAYOUT.trinitron;
  const brandMesh = decal(makeBrandTexture({ w: SN.w, h: SN.h, style: 'chrome' }), SN.w + 1.2, SN.h + 1.2, fxX(SN.fx), fyY(SN.fy), FZ + 0.05,
    { metalness: 0.35, roughness: 0.3, alphaTest: 0.4, transparent: false, depthWrite: true, emissive: 0x555555 });
  brandMesh.name = 'brand-badge';
  decal(makeTrinitronLabel(TR.w, TR.h), TR.w, TR.h, fxX(TR.fx), fyY(TR.fy), FZ + 0.04).name = 'trinitron';

  // ---- front handles (black tube loops either side of the control strip) ---
  const handlePath = (() => {
    const L = 30, out = 12.5, rc = 7, path = new THREE.CurvePath();
    const v = (y, z) => new THREE.Vector3(0, y, z);
    path.add(new THREE.LineCurve3(v(0, -1), v(0, out - rc)));
    path.add(new THREE.QuadraticBezierCurve3(v(0, out - rc), v(0, out), v(-rc, out)));
    path.add(new THREE.LineCurve3(v(-rc, out), v(-(L - rc), out)));
    path.add(new THREE.QuadraticBezierCurve3(v(-(L - rc), out), v(-L, out), v(-L, out - rc)));
    path.add(new THREE.LineCurve3(v(-L, out - rc), v(-L, -1)));
    return { path, L };
  })();
  for (const side of [-1, 1]) {
    const g = mergeGeometries([
      new THREE.TubeGeometry(handlePath.path, 72, 3, 24, false),
      new THREE.CylinderGeometry(4.4, 4.8, 1.8, 28).rotateX(Math.PI / 2).translate(0, 0, 0.9),
      new THREE.CylinderGeometry(4.4, 4.8, 1.8, 28).rotateX(Math.PI / 2).translate(0, -handlePath.L, 0.9),
    ]);
    g.rotateY(side * 0.2).translate(side * 99.2, fyY(166), FZ);
    add('handle', g);
  }

  // ---- merge static parts ---------------------------------------------------
  const body = new THREE.Group();
  body.name = 'body';
  for (const [key, list] of Object.entries(bucket)) {
    const mesh = new THREE.Mesh(mergeGeometries(list.map((g) => (g.index ? g : g))), M[key]);
    mesh.name = key;
    body.add(mesh);
  }
  root.add(body);

  // ---- CRT -----------------------------------------------------------------
  // Trinitron tubes are cylindrical: clearly curved side to side, almost flat
  // top to bottom.
  const RH = 560, RV = 2600;
  const glassEdgeZ = FZ - funnelDepth - 2.6;
  const zc = glassEdgeZ + (maskW / 2) ** 2 / (2 * RH);
  const glassGeo = new THREE.PlaneGeometry(maskW + 8, maskH + 8, 40, 20);
  {
    const p = glassGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setXYZ(i, x + scx, y + scy, zc - (x * x) / (2 * RH) - (y * y) / (2 * RV));
    }
    glassGeo.computeVertexNormals();
  }
  const picture = { cx: scx, cy: scy, w: DIM.PICTURE_W, h: DIM.PICTURE_H, z: zc - 2 };
  const crtMaterial = makeCrtMaterial({ rect: picture, planeZ: picture.z });
  const glass = new THREE.Mesh(glassGeo, crtMaterial);
  glass.name = 'crt-glass';
  glass.userData.screen = true;
  root.add(glass);
  root.add(makePhosphorMesh(glassGeo));

  // ---- contact shadow --------------------------------------------------------
  const pad = 70;
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(W + pad * 2, D + pad * 2).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: makeShadowTexture(W, D, pad), transparent: true, depthWrite: false, toneMapped: false }),
  );
  shadow.position.y = 0.3;
  shadow.name = 'contact-shadow';
  shadow.raycast = () => {};
  root.add(shadow);

  const setPower = (on) => {
    ledMat.emissiveIntensity = on ? 2.4 : 0;
    ledMat.color.setHex(on ? 0x2f8f3f : 0x1c2a1c);
  };
  return {
    root, body, controls, glass, crtMaterial, picture, tally, shadow, setPower, meta: META,
    brand: { mesh: brandMesh, w: SN.w, h: SN.h, style: 'chrome' },
  };
}
