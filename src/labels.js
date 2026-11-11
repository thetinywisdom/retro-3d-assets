// Canvas-drawn textures: panel legends, logos, paint grain, contact shadow.
// All coordinates are in millimetres, measured from the real unit's front face
// (fx from the left edge, fy from the top edge).
import * as THREE from 'three';

const FONT = 'Arial, "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif';

function makeCanvas(wmm, hmm, px) {
  const c = document.createElement('canvas');
  c.width = Math.round(wmm * px);
  c.height = Math.round(hmm * px);
  const g = c.getContext('2d');
  g.scale(px, px);
  return [c, g];
}

function toTexture(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// ---------------------------------------------------------------------------
// Control strip legends
// ---------------------------------------------------------------------------
export function makePanelLabels(L) {
  const { panel } = L;
  const [c, g] = makeCanvas(panel.w, panel.h, 16);
  const ox = panel.fx0, oy = panel.fy0;
  const INK = '#d9d9d2';
  g.fillStyle = INK;
  g.strokeStyle = INK;

  const T = (str, fx, fy, size, { weight = 700, align = 'center', squeeze = 1 } = {}) => {
    g.save();
    g.font = `${weight} ${size}px ${FONT}`;
    g.textAlign = align;
    g.textBaseline = 'alphabetic';
    g.translate(fx - ox, fy - oy);
    g.scale(squeeze, 1);
    g.fillText(str, 0, 0);
    g.restore();
  };

  const [c1, c2, c3, c4] = L.buttonCols;
  // top row legends
  T('A/B', c1, 176.75, 1.9);
  T('RGB/Y R-Y B-Y', c1 + 0.3, 178.75, 1.35, { squeeze: 0.92 });
  T('LINE/', c2, 176.75, 1.9);
  T('RGB', c2, 178.9, 1.9);
  T('SYNC', c3, 176.75, 1.9);
  T('INT/EXT', c3, 178.9, 1.9);
  T('DEGAUSS', c4, 177.4, 1.9);
  // link line between A/B and LINE/RGB buttons
  g.lineWidth = 0.28;
  g.beginPath();
  g.moveTo(c1 + 4.4 - ox, L.buttonRows[0] - 1.2 - oy);
  g.lineTo(c2 - 4.4 - ox, L.buttonRows[0] - 1.2 - oy);
  g.stroke();
  // bottom row legends
  const by1 = L.buttonRows[1] + 5.9, by2 = by1 + 1.85;
  T('BLUE', c1, by1, 1.75);
  T('ONLY', c1, by2, 1.75);
  T('UNDER', c2, by1, 1.75);
  T('SCAN', c2, by2, 1.75);
  T('H/V', c3, by1, 1.75);
  T('DELAY', c3, by2, 1.75);
  T('16:9', c4, by1 + 0.6, 1.9);

  // BIAS / GAIN
  T('BIAS', L.trimCols[0], 176.6, 1.8);
  T('GAIN', L.trimCols[1], 176.6, 1.8);
  const mid = (L.trimCols[0] + L.trimCols[1]) / 2;
  ['R', 'G', 'B'].forEach((ch, i) => T(ch, mid, L.trimRows[i] + 0.75, 2.0));

  // knobs
  L.knobs.forEach((k) => {
    T(k.label, k.fx, 178.75, 2.5);
    g.beginPath();
    g.arc(k.fx - ox, 180.45 - oy, 0.3, 0, Math.PI * 2);
    g.fill();
  });

  // POWER legend + leader line to the LED
  T('POWER', L.power.fx - 0.4, 178.2, 2.5);
  g.lineWidth = 0.26;
  g.beginPath();
  g.moveTo(L.power.fx - 5.6 - ox, 177.3 - oy);
  g.lineTo(L.led.fx - ox, 177.3 - oy);
  g.lineTo(L.led.fx - ox, L.led.fy - 2.2 - oy);
  g.stroke();
  // ON / OFF marks under the power switch (pushed-in / popped-out icons)
  const py = L.power.fy + 8.1;
  const px = L.power.fx - 4.2;
  g.lineWidth = 0.18;
  g.fillRect(px - ox, py - 0.55 - oy, 1.3, 0.55);
  g.strokeRect(px - ox, py - 1.2 - oy, 1.3, 1.2);
  T('ON', px + 1.7, py, 1.25, { align: 'left' });
  g.fillRect(px + 4.2 - ox, py - 1.2 - oy, 1.3, 0.55);
  g.strokeRect(px + 4.2 - ox, py - 1.2 - oy, 1.3, 1.2);
  T('OFF', px + 5.9, py, 1.25, { align: 'left' });

  return toTexture(c);
}

// ---------------------------------------------------------------------------
// SONY badge: slab-serif logotype drawn from primitives (no font dependency)
// ---------------------------------------------------------------------------
/**
 * Brand badge. With no options it draws the SONY logotype from primitives
 * (no font dependency). Pass `text` for your own wordmark or `image` for a
 * logo; both are fitted inside the same w x h (mm) box.
 * style: 'chrome' (raised metal letters) or a CSS colour for printed ink.
 */
export function makeBrandTexture({ w = 33, h: hmm = 7.5, text = null, image = null, style = 'chrome' } = {}) {
  const pad = 0.6;
  const [c, g] = makeCanvas(w + pad * 2, hmm + pad * 2, Math.min(40, Math.floor(2048 / (w + pad * 2))));
  g.translate(pad, pad);
  let ink = style;
  if (style === 'chrome') {
    ink = g.createLinearGradient(0, 0, 0, hmm);
    ink.addColorStop(0, '#ffffff');
    ink.addColorStop(0.45, '#e9e9e9');
    ink.addColorStop(0.55, '#b9b9b9');
    ink.addColorStop(1, '#efefef');
  }
  g.fillStyle = ink;
  g.strokeStyle = ink;
  if (image) {
    const iw = image.naturalWidth || image.videoWidth || image.width;
    const ih = image.naturalHeight || image.videoHeight || image.height;
    const s = Math.min(w / iw, hmm / ih);
    g.drawImage(image, (w - iw * s) / 2, (hmm - ih * s) / 2, iw * s, ih * s);
  } else if (text !== null) {
    if (text.trim()) {
      g.font = `700 ${hmm * 1.25}px Rockwell, "Roboto Slab", "Courier New", Georgia, serif`;
      g.textBaseline = 'alphabetic';
      g.textAlign = 'center';
      const m = g.measureText(text);
      const asc = m.actualBoundingBoxAscent || hmm, desc = m.actualBoundingBoxDescent || 0;
      const s = Math.min(w / m.width, hmm / (asc + desc));
      g.save();
      g.translate(w / 2, hmm / 2 + ((asc - desc) / 2) * s);
      g.scale(s, s);
      g.fillText(text, 0, 0);
      g.restore();
    }
  } else {
    // the SONY logotype is designed on a 33 x 7.5 grid; scale it to the box
    g.scale(w / 33, hmm / 7.5);
    drawSony(g, 7.5);
  }
  return toTexture(c);
}

function drawSony(g, h) {
  const slab = 0.95;
  const poly = (pts) => {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.closePath();
    g.fill();
  };

  // S
  {
    const x0 = 0, w = 6.5;
    const P = (u, v) => [x0 + u * w, v * h];
    g.lineWidth = 1.75;
    g.lineCap = 'butt';
    g.beginPath();
    g.moveTo(...P(0.88, 0.3));
    g.bezierCurveTo(...P(0.84, 0.07), ...P(0.22, 0.03), ...P(0.17, 0.27));
    g.bezierCurveTo(...P(0.13, 0.47), ...P(0.42, 0.47), ...P(0.52, 0.5));
    g.bezierCurveTo(...P(0.7, 0.55), ...P(0.93, 0.56), ...P(0.86, 0.76));
    g.bezierCurveTo(...P(0.78, 0.98), ...P(0.2, 0.97), ...P(0.11, 0.7));
    g.stroke();
    g.fillRect(x0 + w * 0.82, h * 0.03, 0.75, h * 0.3);
    g.fillRect(x0 + w * 0.03, h * 0.67, 0.75, h * 0.3);
  }
  // O
  {
    const cx = 7.3 + 4.15, rx = 4.15, ry = h / 2;
    g.beginPath();
    g.ellipse(cx, h / 2, rx, ry, 0, 0, Math.PI * 2);
    g.ellipse(cx, h / 2, rx - 2.15, ry - 1.05, 0, 0, Math.PI * 2);
    g.fill('evenodd');
  }
  // N
  {
    const x0 = 16.4, w = 8.4;
    g.fillRect(x0 + 0.95, 0, 1.15, h);
    g.fillRect(x0 + w - 2.1, 0, 1.15, h);
    poly([[x0 + 0.95, 0], [x0 + 3.5, 0], [x0 + w - 0.95, h], [x0 + w - 3.5, h]]);
    g.fillRect(x0, 0, 3.3, slab);
    g.fillRect(x0, h - slab, 3.05, slab);
    g.fillRect(x0 + w - 3.05, 0, 3.05, slab);
  }
  // Y
  {
    const x0 = 25.3, w = 7.7, m = x0 + w / 2;
    poly([[x0 + 0.8, 0], [x0 + 3.3, 0], [m + 1.15, h * 0.55], [m - 1.15, h * 0.55]]);
    poly([[x0 + w - 2.1, 0], [x0 + w - 0.9, 0], [m + 1.0, h * 0.55], [m - 0.1, h * 0.52]]);
    g.fillRect(m - 1.15, h * 0.5, 2.3, h * 0.5);
    g.fillRect(x0, 0, 4.1, slab);
    g.fillRect(x0 + w - 3.1, 0, 3.1, slab);
    g.fillRect(m - 2.3, h - slab, 4.6, slab);
  }
}

// ---------------------------------------------------------------------------
// "Trinitron" legend, top-left of the bezel
// ---------------------------------------------------------------------------
export function makeTrinitronLabel(wmm = 18, hmm = 5) {
  const [c, g] = makeCanvas(wmm, hmm, 40);
  g.fillStyle = '#f1f1ec';
  g.font = `900 4.3px "Arial Black", "Helvetica Neue", ${FONT}`;
  g.textBaseline = 'alphabetic';
  const w = g.measureText('Trinitron').width;
  g.save();
  g.translate(0.3, hmm - 1.0);
  g.scale((wmm - 0.6) / w, 1);
  g.fillText('Trinitron', 0, 0);
  g.restore();
  return toTexture(c);
}

// ---------------------------------------------------------------------------
// Fine paint grain (used as a bump map, tiles every few millimetres)
// ---------------------------------------------------------------------------
export function makeGrainTexture(size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  let seed = 1337;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < size * size; i++) {
    const v = 110 + rnd() * 70;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

/**
 * Low-contrast roughness blotches. Tiled in millimetre UVs (repeat 1/80),
 * and kept near white so it only nudges a material's roughness factor.
 */
export function makeRoughnessTexture(size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  const grid = 4;
  const cells = [];
  let seed = 9001;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let y = 0; y <= grid; y++) {
    cells[y] = [];
    for (let x = 0; x <= grid; x++) cells[y][x] = rnd();
  }
  const fade = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = (x / size) * grid, gy = (y / size) * grid;
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      const tx = fade(gx - x0), ty = fade(gy - y0);
      const v = lerp(
        lerp(cells[y0][x0], cells[y0][x0 + 1], tx),
        lerp(cells[y0 + 1][x0], cells[y0 + 1][x0 + 1], tx),
        ty,
      );
      const n = Math.round(228 + v * 27); // about 0.89–1.0
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.name = 'paint-roughness';
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / 80, 1 / 80);
  return t;
}

// ---------------------------------------------------------------------------
// Soft contact shadow under the unit
// ---------------------------------------------------------------------------
export function makeShadowTexture(w, d, pad) {
  const px = 0.5;
  const c = document.createElement('canvas');
  c.width = Math.round((w + pad * 2) * px);
  c.height = Math.round((d + pad * 2) * px);
  const g = c.getContext('2d');
  // drawn as a pure drop-shadow (works in every browser, unlike ctx.filter)
  const far = 4000;
  g.shadowColor = 'rgba(0,0,0,0.6)';
  g.shadowBlur = pad * 0.55 * px;
  g.shadowOffsetX = far;
  g.fillStyle = '#000';
  g.fillRect(pad * px - far, pad * px, w * px, d * px);
  return new THREE.CanvasTexture(c);
}

// ---------------------------------------------------------------------------
// Tally plate: plain plastic, or a logo fitted inside it
// ---------------------------------------------------------------------------
export function makeTallyTexture(image, wmm, hmm) {
  const [c, g] = makeCanvas(wmm, hmm, 32);
  g.fillStyle = '#e9e7dc';
  g.fillRect(0, 0, wmm, hmm);
  if (image) {
    const iw = image.naturalWidth || image.videoWidth || image.width;
    const ih = image.naturalHeight || image.videoHeight || image.height;
    const m = 0.8;
    const s = Math.min((wmm - m * 2) / iw, (hmm - m * 2) / ih);
    g.drawImage(image, (wmm - iw * s) / 2, (hmm - ih * s) / 2, iw * s, ih * s);
  }
  return toTexture(c);
}

/** Model-specific legends: draw(g, font) works in millimetres on a w x h canvas. */
export function makeDrawTexture(w, h, px, draw) {
  const [c, g] = makeCanvas(w, h, px);
  draw(g, FONT);
  return toTexture(c);
}
