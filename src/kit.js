// Shared building kit for all CRT models: geometry helpers plus a small
// builder that collects static geometry per material, creates the interactive
// controls in a uniform shape, and sets up the CRT glass.
//
// Units are millimetres. +x right, +y up, +z towards the viewer.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeGrainTexture, makeRoughnessTexture, makeShadowTexture } from './labels.js';
import { makeCrtMaterial, makePhosphorMesh } from './crt.js';

// ---------------------------------------------------------------------------
// geometry helpers
// ---------------------------------------------------------------------------
export const SEG = 5;

/** Rounded rectangle outline, counter-clockwise, always 4*(SEG+1) points. */
export function rr(w, h, r, cx = 0, cy = 0) {
  const hw = w / 2, hh = h / 2;
  r = Math.max(0.01, Math.min(r, hw, hh));
  const corners = [
    [hw - r, hh - r, 0], [-hw + r, hh - r, Math.PI / 2],
    [-hw + r, -hh + r, Math.PI], [hw - r, -hh + r, Math.PI * 1.5],
  ];
  const pts = [];
  for (const [x, y, a0] of corners) {
    for (let i = 0; i <= SEG; i++) {
      const a = a0 + (i / SEG) * (Math.PI / 2);
      pts.push(new THREE.Vector2(cx + x + Math.cos(a) * r, cy + y + Math.sin(a) * r));
    }
  }
  return pts;
}

export function circle(r, cx, cy, n = 32) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
  return pts;
}

export const ring = (pts, z) => pts.map((p) => new THREE.Vector3(p.x, p.y, z));

/**
 * Skin between consecutive closed rings. Normals point away from the ring
 * centre when rings advance towards +z, and inwards when they advance
 * towards -z (i.e. shells go front-ward, wells go back-ward).
 */
export function loft(rings, { skip = null } = {}) {
  const n = rings[0].length, m = rings.length, row = n + 1;
  const pos = [], uv = [], idx = [];
  let v = 0;
  for (let j = 0; j < m; j++) {
    if (j > 0) v += rings[j][0].distanceTo(rings[j - 1][0]);
    let u = 0;
    for (let i = 0; i <= n; i++) {
      const p = rings[j][i % n];
      if (i > 0) u += p.distanceTo(rings[j][i - 1]);
      pos.push(p.x, p.y, p.z);
      uv.push(u, v);
    }
  }
  for (let j = 0; j < m - 1; j++) {
    for (let i = 0; i < n; i++) {
      if (skip && skip(i)) continue;
      const a = j * row + i, b = a + 1, c = a + row, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  // weld the seam normals
  const nrm = g.attributes.normal;
  for (let j = 0; j < m; j++) {
    const a = j * row, b = a + n;
    const x = nrm.getX(a) + nrm.getX(b), y = nrm.getY(a) + nrm.getY(b), z = nrm.getZ(a) + nrm.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    nrm.setXYZ(a, x / l, y / l, z / l);
    nrm.setXYZ(b, x / l, y / l, z / l);
  }
  return g;
}

/** Flat plate (facing +z) from an outline with optional holes. UVs are millimetres. */
export function plate(pts, holes = [], z = 0) {
  const s = new THREE.Shape(pts);
  for (const h of holes) s.holes.push(new THREE.Path(h));
  const g = new THREE.ShapeGeometry(s);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i), p.getY(i));
  if (z) g.translate(0, 0, z);
  return g;
}

/** Block standing on z=0, rising to z=d, with a softened top edge. */
export function rbox(w, h, d, r, c) {
  return mergeGeometries([
    loft([ring(rr(w, h, r), 0), ring(rr(w, h, r), d - c), ring(rr(w - 2 * c, h - 2 * c, r - c), d)]),
    plate(rr(w - 2 * c, h - 2 * c, r - c), [], d),
  ]);
}

/** Recess: walls going back from z to z-depth, plus its floor. */
export function well(outline, z, depth, floorOutline = outline) {
  return {
    walls: loft([ring(outline, z), ring(floorOutline, z - depth)]),
    floor: plate(floorOutline, [], z - depth),
  };
}

// place geometry built "z-up" onto the top cover (z -> +y)
export const onTop = (g, x, y, z) => g.rotateX(-Math.PI / 2).translate(x, y, z);

/** Segment index of one straight side of an `rr()` ring. */
export function straightSeg(side) {
  const n = SEG + 1;
  const which = { top: 0, left: 1, bottom: 2, right: 3 }[side];
  if (which === undefined) throw new Error(`kit: no straight side "${side}"`);
  return which * n + (n - 1);
}

/** `loft` skip callback that drops the named straight sides (top, left, right, bottom). */
export function skipSides(...sides) {
  const skip = new Set(sides.map(straightSeg));
  return (i) => skip.has(i);
}

// Outward-facing bases for a plate built in XY (local +Z is the outward normal).
// Each basis is right-handed so winding and normals survive the transform.
const FACE_AXES = {
  right: [new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0)],
  left: [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0)],
  top: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0)],
  bottom: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, -1, 0)],
};

/**
 * The flat side of an `rr(w, h, r, cx, cy)` profile extruded from z0 to z1.
 * `spanX` / `spanY` are the plate size in that face's local XY.
 */
export function straightFace(side, { w, h, r, cx = 0, cy = 0, z0, z1 }) {
  const zc = (z0 + z1) / 2;
  const depth = z1 - z0;
  if (side === 'right' || side === 'left') {
    const x = cx + (side === 'right' ? 1 : -1) * w / 2;
    const y0 = cy - h / 2 + r;
    const y1 = cy + h / 2 - r;
    return { face: side, origin: new THREE.Vector3(x, (y0 + y1) / 2, zc), spanX: depth, spanY: y1 - y0 };
  }
  const y = cy + (side === 'top' ? 1 : -1) * h / 2;
  const x0 = cx - w / 2 + r;
  const x1 = cx + w / 2 - r;
  return { face: side, origin: new THREE.Vector3((x0 + x1) / 2, y, zc), spanX: x1 - x0, spanY: depth };
}

/** World point → local XY on a `straightFace` result. */
export function faceLocal(desc, world) {
  const [ax, ay] = FACE_AXES[desc.face];
  const d = new THREE.Vector3(world.x, world.y, world.z).sub(desc.origin);
  return { x: d.dot(ax), y: d.dot(ay) };
}

/** Move geometry built in XY (depth toward -Z) onto a cabinet face. */
export function lay(geo, face, origin, lx = 0, ly = 0) {
  const [ax, ay, az] = FACE_AXES[face];
  const m = new THREE.Matrix4().makeBasis(ax, ay, az);
  m.setPosition(origin.x + ax.x * lx + ay.x * ly, origin.y + ax.y * lx + ay.y * ly, origin.z + ax.z * lx + ay.z * ly);
  geo.applyMatrix4(m);
  return geo;
}

/** CCW rectangle centred on the origin, for `plate` outer loops. */
export function rectOutline(w, h) {
  const hw = w / 2, hh = h / 2;
  return [
    new THREE.Vector2(-hw, -hh), new THREE.Vector2(hw, -hh),
    new THREE.Vector2(hw, hh), new THREE.Vector2(-hw, hh),
  ];
}

/** CW rectangle, a hole in a CCW plate. */
export function holeRect(w, h, cx = 0, cy = 0) {
  const hw = w / 2, hh = h / 2;
  return [
    new THREE.Vector2(cx - hw, cy - hh), new THREE.Vector2(cx - hw, cy + hh),
    new THREE.Vector2(cx + hw, cy + hh), new THREE.Vector2(cx + hw, cy - hh),
  ];
}

/** CW circle, a hole in a CCW plate. */
export function holeCircle(r, cx, cy, n = 8) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = -(i / n) * Math.PI * 2;
    pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
  return pts;
}

/** True when a w×h hole sits fully inside the face, clear of the rounded corners. */
export function holeFits(desc, lx, ly, w, h, margin = 0.5) {
  return Math.abs(lx) + w / 2 <= desc.spanX / 2 - margin
    && Math.abs(ly) + h / 2 <= desc.spanY / 2 - margin;
}

/**
 * Rectangular recess. Opening is centred on XY at z = 0 and the floor sits at
 * z = -depth, so laying it on a face sinks it into the cabinet.
 * Eight welded vertices: cheap enough to repeat for every vent.
 */
export function boxCavity(len, thick, depth) {
  const hw = len / 2, hh = thick / 2;
  const pos = [
    -hw, -hh, 0, hw, -hh, 0, hw, hh, 0, -hw, hh, 0,
    -hw, -hh, -depth, hw, -hh, -depth, hw, hh, -depth, -hw, hh, -depth,
  ];
  const idx = [
    4, 5, 6, 4, 6, 7,       // floor, normal +Z (out of the hole, toward the opening)
    0, 1, 5, 0, 5, 4,       // -Y wall
    2, 3, 7, 2, 7, 6,       // +Y wall
    1, 2, 6, 1, 6, 5,       // +X wall
    3, 0, 4, 3, 4, 7,       // -X wall
  ];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  stampUv(g);
  return g;
}

/** Round recess, opening at z = 0, floor at z = -depth. Normals point into the hole. */
export function roundCavity(radius, depth, seg = 8) {
  const pos = [];
  for (let ring = 0; ring < 2; ring++) {
    const z = ring === 0 ? 0 : -depth;
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pos.push(Math.cos(a) * radius, Math.sin(a) * radius, z);
    }
  }
  const center = seg * 2;
  pos.push(0, 0, -depth);
  const idx = [];
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    // wall, inward normal
    idx.push(i, j, j + seg, i, j + seg, i + seg);
    // floor, normal +Z
    idx.push(center, i + seg, j + seg);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  stampUv(g);
  return g;
}

function stampUv(g) {
  const p = g.attributes.position;
  const uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    uv[i * 2] = p.getX(i);
    uv[i * 2 + 1] = p.getY(i);
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

// ---------------------------------------------------------------------------
// builder
// ---------------------------------------------------------------------------
export class Kit {
  constructor(name) {
    this.root = new THREE.Group();
    this.root.name = name;
    this.interactive = new THREE.Group();
    this.interactive.name = 'controls';
    this.root.add(this.interactive);
    this.controls = {};
    this.bucket = {};
    this.grain = makeGrainTexture();
    this.grain.repeat.set(1 / 9, 1 / 9);
    this.rough = makeRoughnessTexture();
    this.M = {
      black: new THREE.MeshStandardMaterial({ name: 'black', color: 0x070707, roughness: 0.85 }),
      rubber: new THREE.MeshStandardMaterial({ name: 'rubber', color: 0x121212, roughness: 0.92 }),
      screw: new THREE.MeshStandardMaterial({ name: 'screw', color: 0xc4c4c0, roughness: 0.38, metalness: 1 }),
      chrome: new THREE.MeshStandardMaterial({ name: 'chrome', color: 0xdedede, roughness: 0.18, metalness: 1 }),
      // Dark but lit, so a recess reads as a cavity instead of an unlit decal.
      cavity: new THREE.MeshStandardMaterial({ name: 'cavity', color: 0x0c0c0c, roughness: 0.94, side: THREE.DoubleSide }),
      grip: new THREE.MeshStandardMaterial({ name: 'grip', color: 0x141414, roughness: 0.4, metalness: 0.06 }),
    };
  }

  /** Register a material under a bucket key. */
  mat(key, params, Type = THREE.MeshStandardMaterial) {
    this.M[key] = new Type({ name: key, ...params });
    return this.M[key];
  }

  /** Add static geometry to a material bucket (merged into one mesh at the end). */
  add(key, g) {
    if (!this.M[key]) throw new Error(`kit: no material "${key}"`);
    (this.bucket[key] ||= []).push(g);
    return g;
  }

  /** A loose mesh (own material), e.g. lamps. */
  mesh(geometry, material, name) {
    const m = new THREE.Mesh(geometry, material);
    if (name) m.name = name;
    this.root.add(m);
    return m;
  }

  lamp(geometry, color, name) {
    const mat = new THREE.MeshStandardMaterial({ name: 'lamp', color: 0x1a1a1a, roughness: 0.35, emissive: color, emissiveIntensity: 0 });
    const m = this.mesh(geometry, mat, name);
    m.userData.lampOn = 2.2;
    return m;
  }

  /**
   * Push button. `pos` is the point on the mounting surface under the button
   * centre; the cap sits `out` mm proud of it and travels `travel` mm.
   * facing: 'front' (presses towards -z) or 'top' (presses towards -y).
   */
  button({ id, pos, w, h, out = 3, travel = 1.5, len = 9, r = 0.7, c = 0.55, facing = 'front', material, lamp = null }) {
    const g = rbox(w, h, len, r, c);
    const mesh = new THREE.Mesh(g, material);
    const axis = new THREE.Vector3();
    if (facing === 'top') {
      g.rotateX(-Math.PI / 2);
      mesh.position.set(pos[0], pos[1] + out - len, pos[2]);
      axis.set(0, -1, 0);
    } else {
      mesh.position.set(pos[0], pos[1], pos[2] + out - len);
      axis.set(0, 0, -1);
    }
    mesh.name = id;
    mesh.userData.control = id;
    this.interactive.add(mesh);
    return (this.controls[id] = { id, kind: 'button', mesh, home: mesh.position.clone(), axis, travel, lamp });
  }

  /** Rotary knob facing the viewer. `pos` is the base of the knob. */
  knob({ id, pos, radius = 5.25, len = 9.6, material, markColor = 0xe8e8e2 }) {
    const profile = [[radius, 0], [radius, len - 1.0], [radius - 0.3, len - 0.35], [radius - 0.95, len], [0, len]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    const group = new THREE.Group();
    group.position.set(...pos);
    group.name = id;
    const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 36).rotateX(Math.PI / 2), material);
    body.userData.control = id;
    const mark = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 0.18, radius * 0.63, 0.12).translate(0, radius * 0.5, len + 0.06),
      new THREE.MeshBasicMaterial({ color: markColor }),
    );
    mark.userData.control = id;
    group.add(body, mark);
    this.interactive.add(group);
    return (this.controls[id] = { id, kind: 'knob', mesh: body, group });
  }

  /** Slide control: `mesh` travels `range` mm along +x from its current place. */
  slider({ id, mesh, range }) {
    mesh.name = id;
    mesh.userData.control = id;
    this.interactive.add(mesh);
    return (this.controls[id] = { id, kind: 'slider', mesh, home: mesh.position.clone(), range });
  }

  /** Flat textured label / badge. */
  decal(map, w, h, x, y, z, extra = {}) {
    const mat = new THREE.MeshStandardMaterial({ map, transparent: true, depthWrite: false, roughness: 0.6, ...extra });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z);
    m.raycast = () => {};
    m.renderOrder = 2;
    this.root.add(m);
    return m;
  }

  /**
   * The tube. A cylindrically curved glass face (Trinitron: curved side to
   * side, nearly flat top to bottom) whose edge sits at z = edgeZ, and the
   * flat picture plane the HTML is placed on.
   */
  crt({ cx, cy, edgeZ, glassW, glassH, picW, picH, RH, RV, corner = 5, outside = 1 }) {
    const zc = edgeZ + (glassW / 2) ** 2 / (2 * RH);
    const geo = new THREE.PlaneGeometry(glassW + 8, glassH + 8, 40, 20);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setXYZ(i, x + cx, y + cy, zc - (x * x) / (2 * RH) - (y * y) / (2 * RV));
    }
    geo.computeVertexNormals();
    this.picture = { cx, cy, w: picW, h: picH, z: zc - 2 };
    this.crtMaterial = makeCrtMaterial({ rect: this.picture, planeZ: this.picture.z, corner, outside });
    this.glass = new THREE.Mesh(geo, this.crtMaterial);
    this.glass.name = 'crt-glass';
    this.glass.userData.screen = true;
    this.root.add(this.glass);
    // Sits just behind the glass. The web shader overwrites it; the GLB's
    // transmissive glass shows it as the dark phosphor inside the tube.
    this.root.add(makePhosphorMesh(geo));
    return this.picture;
  }

  shadow(w, d, y = 0.3, pad = 70) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w + pad * 2, d + pad * 2).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: makeShadowTexture(w, d, pad), transparent: true, depthWrite: false, toneMapped: false }),
    );
    m.position.y = y;
    m.name = 'contact-shadow';
    m.raycast = () => {};
    this.root.add(m);
    this.shadowMesh = m;
    return m;
  }

  /** Merge the static buckets and return the model record the element uses. */
  finish(meta, extra = {}) {
    const body = new THREE.Group();
    body.name = 'body';
    for (const [key, list] of Object.entries(this.bucket)) {
      const mesh = new THREE.Mesh(mergeGeometries(list), this.M[key]);
      mesh.name = key;
      body.add(mesh);
    }
    this.root.add(body);
    return {
      root: this.root, body, controls: this.controls, glass: this.glass, crtMaterial: this.crtMaterial,
      picture: this.picture, shadow: this.shadowMesh, meta, setPower: () => {}, ...extra,
    };
  }
}

