// CD jewel cases with cover art, rendered to still images.
//
//   import { renderCases } from 'retro-3d';
//   const urls = await renderCases('cd-case.obj', ['p5.jpg', canvas, ...], { size: 480 });
//   img.src = urls[0];
//
// The case is the owner's model (models/cd-case.obj: a slim jewel case, lid and tray hinged on the left,
// 14.3 x 12.5 x 0.5 units). Each cover is laid in under the clear lid, as a printed insert would be, and
// the case is drawn at a three-quarter turn in soft studio light on a see-through background. One WebGL
// context draws them all, one after another, so a page of covers costs one context, not one each.
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

let modelP = null;
const loadModel = (url) => (modelP ||= new OBJLoader().loadAsync(url));

// the insert sits on the tray floor between the hinge strip and the right edge, under the lid
const INSERT = { x0: -6.0, x1: 6.95, y0: -6.05, y1: 6.05, z: 0.86 };

const toTexture = (src) => new Promise((resolve) => {
  if (src instanceof HTMLCanvasElement) { const t = new THREE.CanvasTexture(src); t.colorSpace = THREE.SRGBColorSpace; resolve(t); return; }
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { const t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; resolve(t); };
  img.onerror = () => resolve(null);
  img.src = src;
});

/**
 * Render one image per cover. `covers` are image URLs or canvases, or { src, align } where align ('top',
 * 'center', 'bottom', 'left', 'right') says which part of art that is not square to keep (square art suits the case; other shapes
 * are cropped to fill). Returns PNG data URLs in the same order (null where a cover failed to load).
 */
export async function renderCases(modelUrl, covers, { size = 480, angle = 32, tilt = 8, roll = 0, insert: withInsert = true } = {}) {
  const obj = await loadModel(modelUrl);
  const canvas = document.createElement('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(size, size, false);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-6, 10, 14);
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

  // the case: a clear, glossy lid over a black tray
  const lidMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.22,
    clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.2, depthWrite: false, side: THREE.DoubleSide });
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.35, metalness: 0 });
  const box = new THREE.Group();
  const model = obj.clone(true);
  const lidEdges = [];
  model.traverse((o) => {
    if (!o.isMesh) return;
    const lid = /cover/i.test(o.name);
    o.material = lid ? lidMat : trayMat;
    o.renderOrder = lid ? 2 : 0;
    // the clear lid's edges and lip catch the light, like real polystyrene: draw its creases as bright lines
    if (lid) lidEdges.push([o, new THREE.EdgesGeometry(o.geometry, 25)]);
  });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false });
  for (const [o, g] of lidEdges) { const l = new THREE.LineSegments(g, edgeMat); l.renderOrder = 3; o.add(l); }
  model.scale.z = 2;                                                // the model is a slim case: make it a standard 10 mm one
  box.add(model);
  // a solid black floor under everything, so the hinge strip reads as black plastic, not see-through
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14.2, 12.4), trayMat);
  floor.position.set(0, 0, 0.06);
  box.add(floor);
  const insertMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0 });
  const iw = INSERT.x1 - INSERT.x0, ih = INSERT.y1 - INSERT.y0;
  const insert = new THREE.Mesh(new THREE.PlaneGeometry(iw, ih), insertMat);
  insert.position.set((INSERT.x0 + INSERT.x1) / 2, (INSERT.y0 + INSERT.y1) / 2, INSERT.z);
  insert.renderOrder = 1;
  if (withInsert) box.add(insert);
  box.rotation.set(THREE.MathUtils.degToRad(-tilt), THREE.MathUtils.degToRad(angle), THREE.MathUtils.degToRad(roll));
  scene.add(box);

  const camera = new THREE.PerspectiveCamera(26, 1, 1, 200);
  camera.position.set(0, 0.6, 37);
  camera.lookAt(0, 0.6, 0);

  const probe = Object.assign(document.createElement('canvas'), { width: 32, height: 32 }).getContext('2d', { willReadFrequently: true });
  const out = [];
  for (const item of covers) {
    const { src, align = 'center' } = item && typeof item === 'object' && !(item instanceof HTMLCanvasElement) ? item : { src: item };
    const tex = src ? await toTexture(src) : null;
    if (!tex) { out.push(null); continue; }
    // crop to fill the insert, keeping the art's proportions
    const a = (tex.image.width || 1) / (tex.image.height || 1), want = iw / ih;
    tex.repeat.set(a > want ? want / a : 1, a > want ? 1 : a / want);
    // texture v runs bottom to top: 'bottom' keeps the lower part, 'top' the upper
    const ox = align === 'left' ? 0 : align === 'right' ? 1 - tex.repeat.x : (1 - tex.repeat.x) / 2;
    const oy = align === 'bottom' ? 0 : align === 'top' ? 1 - tex.repeat.y : (1 - tex.repeat.y) / 2;
    tex.offset.set(ox, oy);
    insertMat.map = tex; insertMat.needsUpdate = true;
    renderer.render(scene, camera);
    // some browsers hand back an empty picture from a WebGL canvas: check, and leave a gap (null) for the
    // page to fall back on rather than a blank image
    probe.clearRect(0, 0, 32, 32);
    probe.drawImage(canvas, 0, 0, 32, 32);
    const px = probe.getImageData(0, 0, 32, 32).data;
    let seen = 0;
    for (let i = 3; i < px.length; i += 4) seen += px[i];
    out.push(seen > 0 ? canvas.toDataURL('image/png') : null);
    tex.dispose();
  }
  pmrem.dispose(); renderer.dispose();
  renderer.forceContextLoss?.();
  return out;
}
