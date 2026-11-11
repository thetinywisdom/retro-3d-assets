// The shelf unit and the things that stand on it spine-out: PS1 jewel cases,
// Game Boy Advance boxes, PS Vita cases, PSP cases and books. Every spine and
// cover is drawn from text, so titles are editable.
//
// Real-world sizes (thickness x height x depth when shelved, mm):
//   PS1 jewel case 10.4 x 125 x 142      GBA box  22 x 127 x 127
//   PS Vita case   13 x 135 x 104        PSP case 14.5 x 170 x 105
import * as THREE from 'three';

export const ITEM_TYPES = {
  ps1: { t: 10.4, h: 125, d: 142, name: 'PlayStation game' },
  gba: { t: 22, h: 127, d: 127, name: 'Game Boy Advance game' },
  vita: { t: 13, h: 135, d: 104, name: 'PS Vita game' },
  psp: { t: 14.5, h: 170, d: 105, name: 'PSP game' },
  book: { t: 26, h: 205, d: 150, name: 'Book' },
};

const FONT = '"Barlow Semi Condensed", "Arial Narrow", "Helvetica Neue", Arial, "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif';
const CJK = /[぀-ヿ㐀-鿿＀-￯]/;

function hash(str) { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.codePointAt(0), 16777619); return (h >>> 0) / 4294967296; }
function lum(hex) { const c = new THREE.Color(hex); return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; }
const inkOn = (bg) => (lum(bg) > 0.45 ? '#16140f' : '#f4f1ea');

function canvasTex(wmm, hmm, px, draw) {
  const c = document.createElement('canvas');
  c.width = Math.max(8, Math.round(wmm * px));
  c.height = Math.max(8, Math.round(hmm * px));
  const g = c.getContext('2d');
  g.scale(px, px);
  draw(g, wmm, hmm);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Text running down a spine: rotated for Latin, stacked upright for Japanese. */
function spineText(g, text, x, y0, y1, size, color, weight = 700) {
  if (!text) return;
  g.fillStyle = color;
  g.textBaseline = 'middle';
  if (CJK.test(text)) {
    const chars = [...text];
    const s = Math.min(size, (y1 - y0) / chars.length);
    g.font = `${weight} ${s}px ${FONT}`;
    g.textAlign = 'center';
    chars.forEach((ch, i) => g.fillText(ch, x, y0 + s * (i + 0.55)));
    return;
  }
  g.save();
  g.translate(x, y0);
  g.rotate(Math.PI / 2);
  g.font = `${weight} ${size}px ${FONT}`;
  g.textAlign = 'left';
  const w = g.measureText(text).width, max = y1 - y0;
  if (w > max) g.scale(max / w, 1);
  g.fillText(text, 0, 0);
  g.restore();
}

function fitText(g, text, x, y, maxW, size, weight = 700, lineH = 1.08) {
  const words = text.split(/\s+/);
  let fs = size, lines;
  for (;;) {
    g.font = `${weight} ${fs}px ${FONT}`;
    lines = [];
    let cur = '';
    for (const w of words) {
      const next = cur ? cur + ' ' + w : w;
      if (g.measureText(next).width > maxW && cur) { lines.push(cur); cur = w; } else cur = next;
    }
    lines.push(cur);
    if ((lines.length <= 4 && lines.every((l) => g.measureText(l).width <= maxW)) || fs < size * 0.35) break;
    fs *= 0.9;
  }
  lines.forEach((l, i) => g.fillText(l, x, y + i * fs * lineH));
  return y + lines.length * fs * lineH;
}

const STYLE = {
  ps1: { spine: '#101012', edge: '#cfd2d6', band: (c) => c, bandH: 0.1 },
  gba: { spine: null, edge: null, band: () => '#3b2f8f', bandH: 0.13 },
  vita: { spine: '#f3f4f6', edge: '#2b68d8', band: () => '#2157c9', bandH: 0.15 },
  psp: { spine: '#ecebe7', edge: '#d9d9d6', band: () => '#1a1a1c', bandH: 0.11 },
  book: { spine: null, edge: '#ece5d3', band: null, bandH: 0 },
};

function drawSpine(spec) {
  const { t, h } = spec, st = STYLE[spec.type];
  return canvasTex(t, h, Math.min(10, 2048 / h), (g) => {
    const bg = st.spine || spec.color;
    g.fillStyle = bg; g.fillRect(0, 0, t, h);
    let top = 5;
    if (st.band) { g.fillStyle = st.band(spec.color); g.fillRect(0, 0, t, h * st.bandH); top = h * st.bandH + 4; }
    if (spec.type === 'book') { g.fillStyle = inkOn(bg); g.globalAlpha = 0.5; g.fillRect(t * 0.18, 9, t * 0.64, 0.7); g.fillRect(t * 0.18, h - 9.7, t * 0.64, 0.7); g.globalAlpha = 1; top = 14; }
    const size = Math.min(t * 0.62, spec.type === 'book' ? 13 : 9);
    const bottom = spec.subtitle ? h - 34 : h - 8;
    spineText(g, spec.title, t / 2, top, bottom, size, inkOn(bg));
    if (spec.subtitle) { g.globalAlpha = 0.72; spineText(g, spec.subtitle, t / 2, h - 30, h - 6, size * 0.62, inkOn(bg), 500); g.globalAlpha = 1; }
  });
}

function drawCover(spec) {
  const { d, h } = spec, st = STYLE[spec.type];
  return canvasTex(d, h, Math.min(6, 1024 / h), (g) => {
    g.fillStyle = spec.color; g.fillRect(0, 0, d, h);
    let x0 = 0, y0 = 0;
    if (spec.type === 'ps1') { g.fillStyle = '#101012'; g.fillRect(0, 0, d * 0.105, h); x0 = d * 0.105; }
    else if (st.band) { g.fillStyle = st.band(spec.color); g.fillRect(0, 0, d, h * st.bandH); y0 = h * st.bandH; }
    const aw = d - x0, ah = h - y0;
    if (spec.image) {
      const iw = spec.image.naturalWidth || spec.image.width, ih = spec.image.naturalHeight || spec.image.height;
      const s = Math.max(aw / iw, ah / ih);
      g.save(); g.beginPath(); g.rect(x0, y0, aw, ah); g.clip();
      g.drawImage(spec.image, x0 + (aw - iw * s) / 2, y0 + (ah - ih * s) / 2, iw * s, ih * s);
      g.restore();
      return;
    }
    // no artwork: a typographic cover
    const ink = inkOn(spec.color), m = aw * 0.1;
    g.fillStyle = ink; g.globalAlpha = 0.14;
    g.beginPath(); g.arc(x0 + aw * 0.72, y0 + ah * 0.7, aw * 0.42, 0, Math.PI * 2); g.fill();
    g.globalAlpha = 1; g.textAlign = 'left'; g.textBaseline = 'top';
    const end = fitText(g, spec.title.toUpperCase(), x0 + m, y0 + m, aw - m * 2, aw * 0.17);
    if (spec.subtitle) { g.globalAlpha = 0.75; fitText(g, spec.subtitle, x0 + m, end + aw * 0.03, aw - m * 2, aw * 0.075, 500); g.globalAlpha = 1; }
    g.fillRect(x0 + m, y0 + ah - m - 1.2, aw * 0.22, 1.2);
  });
}

/**
 * One shelved item. spec: { type, title, subtitle, color, image?, t?, h? }
 * Returns a Mesh whose +z face is the spine and +x face the front cover.
 */
export function buildItem(input) {
  const base = ITEM_TYPES[input.type] || ITEM_TYPES.book;
  const spec = { subtitle: '', ...input, type: ITEM_TYPES[input.type] ? input.type : 'book' };
  spec.title = (spec.title || 'Untitled').trim();
  const r = hash(spec.title + spec.type);
  const PALETTE = ['#ffd23f', '#ff7a59', '#7fd1c7', '#c9b6ff', '#9fe07c', '#ffb3c7', '#e8e2d2', '#5d8fd6', '#d9534f', '#2f4858'];
  spec.color ||= PALETTE[Math.floor(r * PALETTE.length)];
  spec.d = base.d;
  spec.t = +spec.t || (spec.type === 'book' ? 18 + Math.round(hash(spec.title) * 20) : base.t);
  spec.h = +spec.h || (spec.type === 'book' ? 172 + Math.round(hash(spec.title + 'h') * 40) : base.h);
  const st = STYLE[spec.type];
  const edge = st.edge || new THREE.Color(spec.color).multiplyScalar(0.7).getStyle();
  const plain = (c, rough = 0.6) => new THREE.MeshStandardMaterial({ color: c, roughness: rough });
  const cover = plain(spec.color, 0.45), back = plain(spec.type === 'book' ? spec.color : st.spine || spec.color, 0.45);
  const side = plain(edge, 0.5);
  const spine = new THREE.MeshStandardMaterial({ map: drawSpine(spec), roughness: spec.type === 'book' ? 0.7 : 0.3 });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(spec.t, spec.h, spec.d), [cover, back, side, side, spine, side]);
  mesh.name = `${spec.type}: ${spec.title}`;
  mesh.userData.spec = spec;
  mesh.userData.ensureCover = () => {
    if (cover.map) return;
    cover.map = drawCover(spec);
    cover.color.set(0xffffff);
    cover.needsUpdate = true;
  };
  return mesh;
}

function woodTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#3d2b20'; g.fillRect(0, 0, 256, 256);
  let s = 99;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 150; i++) {
    g.strokeStyle = `rgba(${rnd() < 0.5 ? '18,10,6' : '104,74,50'},${0.05 + rnd() * 0.12})`;
    g.lineWidth = 0.5 + rnd() * 2;
    const y = rnd() * 256, wob = rnd() * 6;
    g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(80, y + wob, 170, y - wob, 256, y + wob * 0.5); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/**
 * Open-fronted shelf unit. Front face is at z = 0, floor at y = 0, centred on x.
 * Returns { group, width, height (top surface y), depth, cells: [{ x0, x1, y, h }] }
 * with cells listed row by row from the top-left.
 */
export function buildShelf({ cols = 3, rows = 2, cellW = 470, cellH = 228, depth = 520, t = 22, plinth = 50 } = {}) {
  const group = new THREE.Group();
  group.name = 'shelf';
  const wood = new THREE.MeshStandardMaterial({ name: 'wood', map: woodTexture(), roughness: 0.62 });
  const inside = new THREE.MeshStandardMaterial({ name: 'shelf-back', color: 0x1a120d, roughness: 0.9 });
  const width = cols * cellW + (cols + 1) * t;
  const height = plinth + rows * cellH + (rows + 1) * t;
  const board = (w, h, d, x, y, z, mat = wood) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    group.add(m);
  };
  board(width - 30, plinth, depth - 40, 0, plinth / 2, -depth / 2 - 10, inside);
  for (let r = 0; r <= rows; r++) board(width + (r === rows ? 24 : 0), t, depth + (r === rows ? 16 : 0), 0, plinth + r * (cellH + t) + t / 2, -depth / 2 + (r === rows ? 4 : 0));
  for (let c = 0; c <= cols; c++) board(t, height - plinth - t, depth, -width / 2 + t / 2 + c * (cellW + t), plinth + (height - plinth - t) / 2, -depth / 2);
  board(width - 4, height - plinth, 6, 0, plinth + (height - plinth) / 2, -depth + 3, inside);
  const cells = [];
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = 0; c < cols; c++) {
      const x0 = -width / 2 + t + c * (cellW + t);
      cells.push({ x0, x1: x0 + cellW, y: plinth + r * (cellH + t) + t, h: cellH });
    }
  }
  return { group, width: width + 24, height, depth, cells };
}
