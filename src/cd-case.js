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
const INSERT = { x0: -6.0, x1: 6.95, y0: -6.05, y1: 6.05, z: 0.43 };

const toTexture = (src) => new Promise((resolve) => {
  if (src instanceof HTMLCanvasElement) { const t = new THREE.CanvasTexture(src); t.colorSpace = THREE.SRGBColorSpace; resolve(t); return; }
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { const t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; resolve(t); };
  img.onerror = () => resolve(null);
  img.src = src;
});

/**
 * Render one image per cover. `covers` are image URLs or canvases (square art suits the case; other shapes
 * are cropped to fill). Returns PNG data URLs in the same order (null where a cover failed to load).
 */
export async function renderCases(modelUrl, covers, { size = 480, angle = -28, tilt = 16 } = {}) {
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
  const lidMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.1,
    clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 0.7, depthWrite: false, side: THREE.DoubleSide });
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.35, metalness: 0 });
  const box = new THREE.Group();
  const model = obj.clone(true);
  model.traverse((o) => {
    if (!o.isMesh) return;
    const lid = /cover/i.test(o.name);
    o.material = lid ? lidMat : trayMat;
    o.renderOrder = lid ? 2 : 0;
  });
  box.add(model);
  // a solid black floor under everything, so the hinge strip reads as black plastic, not see-through
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14.2, 12.4), trayMat);
  floor.position.set(0, 0, 0.03);
  box.add(floor);
  const insertMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0 });
  const iw = INSERT.x1 - INSERT.x0, ih = INSERT.y1 - INSERT.y0;
  const insert = new THREE.Mesh(new THREE.PlaneGeometry(iw, ih), insertMat);
  insert.position.set((INSERT.x0 + INSERT.x1) / 2, (INSERT.y0 + INSERT.y1) / 2, INSERT.z);
  insert.renderOrder = 1;
  box.add(insert);
  box.rotation.set(THREE.MathUtils.degToRad(-tilt), THREE.MathUtils.degToRad(angle), 0);
  scene.add(box);

  const camera = new THREE.PerspectiveCamera(26, 1, 1, 200);
  camera.position.set(0, 0.6, 37);
  camera.lookAt(0, 0.6, 0);

  const out = [];
  for (const src of covers) {
    const tex = src ? await toTexture(src) : null;
    if (!tex) { out.push(null); continue; }
    // crop to fill the insert, keeping the art's proportions
    const a = (tex.image.width || 1) / (tex.image.height || 1), want = iw / ih;
    tex.repeat.set(a > want ? want / a : 1, a > want ? 1 : a / want);
    tex.offset.set((1 - tex.repeat.x) / 2, (1 - tex.repeat.y) / 2);
    insertMat.map = tex; insertMat.needsUpdate = true;
    renderer.render(scene, camera);
    out.push(canvas.toDataURL('image/png'));
    tex.dispose();
  }
  pmrem.dispose(); renderer.dispose();
  renderer.forceContextLoss?.();
  return out;
}
