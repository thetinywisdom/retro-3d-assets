// The shelf unit and the things that stand on it spine-out: PS1 jewel cases,
// Game Boy Advance boxes, PS Vita cases, PSP cases and books. Every spine and
// cover is drawn from text, so titles are editable.
//
import * as THREE from 'three';

// Sizes (thickness x height x depth when shelved, mm). The Vita and PSP case
// sizes are the published Amaray figures; the jewel case is the standard CD
// jewel box; the GBA box is the common 125 mm square carton.
export const ITEM_TYPES = {
  ps1: { t: 10.4, h: 125, d: 142, name: 'PlayStation game' },
  gba: { t: 23, h: 125, d: 125, name: 'Game Boy Advance game' },
  vita: { t: 12, h: 135, d: 105, name: 'PS Vita game' },
  psp: { t: 14, h: 168, d: 99, name: 'PSP game' },
  book: { t: 26, h: 205, d: 150, name: 'Book' },
};

const FONT = '"Barlow Semi Condensed", "Arial Narrow", "Helvetica Neue", Arial, "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif';
const SERIF = 'Georgia, "Times New Roman", "Hiragino Mincho ProN", "Yu Mincho", serif';
const CJK = /[぀-ヿ㐀-鿿＀-￯]/;

function hash(str) { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.codePointAt(0), 16777619); return (h >>> 0) / 4294967296; }
function lum(hex) { const c = new THREE.Color(hex); return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; }
const inkOn = (bg) => (lum(bg) > 0.45 ? '#16140f' : '#f4f1ea');
const shade = (hex, k) => '#' + new THREE.Color(hex).multiplyScalar(k).getHexString();

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
function spineText(g, text, x, y0, y1, size, color, font = `700 ${size}px ${FONT}`) {
  if (!text || y1 - y0 < 4) return;
  g.fillStyle = color;
  g.textBaseline = 'middle';
  if (CJK.test(text)) {
    const chars = [...text];
    const s = Math.min(size, (y1 - y0) / chars.length);
    g.font = font.replace(/[\d.]+px/, s + 'px');
    g.textAlign = 'center';
    chars.forEach((ch, i) => g.fillText(ch, x, y0 + s * (i + 0.55)));
    return;
  }
  g.save();
  g.translate(x, y0);
  g.rotate(Math.PI / 2);
  g.font = font;
  g.textAlign = 'left';
  const w = g.measureText(text).width, max = y1 - y0;
  if (w > max) g.scale(max / w, 1);
  g.fillText(text, 0, 0.05 * size);
  g.restore();
}

function fitText(g, text, x, y, maxW, size, font = FONT, weight = 700, lineH = 1.06) {
  const words = text.split(/\s+/);
  let fs = size, lines;
  for (;;) {
    g.font = `${weight} ${fs}px ${font}`;
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

/** Artwork area: the user's image, or a typographic cover built from the title. */
function art(g, spec, x, y, w, h, { font = FONT, upper = true } = {}) {
  g.save();
  g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.fillStyle = spec.color; g.fillRect(x, y, w, h);
  if (spec.image) {
    const iw = spec.image.naturalWidth || spec.image.width, ih = spec.image.naturalHeight || spec.image.height;
    const s = Math.max(w / iw, h / ih);
    g.drawImage(spec.image, x + (w - iw * s) / 2, y + (h - ih * s) / 2, iw * s, ih * s);
  } else {
    const ink = inkOn(spec.color), m = w * 0.09;
    g.fillStyle = ink; g.globalAlpha = 0.13;
    g.beginPath(); g.arc(x + w * 0.74, y + h * 0.7, w * 0.44, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(x + w * 0.2, y + h * 0.95, w * 0.3, 0, Math.PI * 2); g.fill();
    g.globalAlpha = 1; g.textAlign = 'left'; g.textBaseline = 'top';
    const end = fitText(g, upper ? spec.title.toUpperCase() : spec.title, x + m, y + m, w - m * 2, w * 0.175, font);
    if (spec.subtitle) { g.globalAlpha = 0.78; fitText(g, spec.subtitle, x + m, end + w * 0.03, w - m * 2, w * 0.075, font, 500); g.globalAlpha = 1; }
  }
  g.restore();
}

/** Small stand-in for a platform mark: plain lettering in a box, not the real logo. */
function tag(g, text, cx, cy, w, h, bg, fg, size) {
  g.fillStyle = bg; g.fillRect(cx - w / 2, cy - h / 2, w, h);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `700 ${size}px ${FONT}`;
  const tw = g.measureText(text).width;
  g.save(); g.translate(cx, cy + size * 0.05); if (tw > w * 0.86) g.scale((w * 0.86) / tw, 1); g.fillText(text, 0, 0); g.restore();
}
function vtag(g, text, cx, y0, y1, size, fg) {
  g.save(); g.translate(cx, (y0 + y1) / 2); g.rotate(-Math.PI / 2);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `700 ${size}px ${FONT}`;
  const tw = g.measureText(text).width, max = y1 - y0;
  if (tw > max) g.scale(max / tw, 1);
  g.fillText(text, 0, size * 0.05); g.restore();
}

// ---------------------------------------------------------------------------
// what is printed on each kind of item
// ---------------------------------------------------------------------------
const PRINT = {
  // CD jewel case: black tray card spine seen through clear plastic, with the
  // lid's edge beside it; front booklet with the black band on the hinge side
  ps1: {
    plastic: 0xc9d0d4, rough: 0.16,
    spine(g, s, t, h) {
      g.fillStyle = '#8d969b'; g.fillRect(0, 0, t, h);
      g.fillStyle = '#5d666b'; g.fillRect(7.6, 0, 0.3, h);                        // lid / tray join
      g.fillStyle = '#e9e8e2'; g.fillRect(8.3, 3.4, 1.3, h - 6.8);                // booklet edge through the lid
      g.fillStyle = '#0c0c0d'; g.fillRect(0.45, 2.6, 6.9, h - 5.2);               // tray card spine
      tag(g, 'PS', 3.9, 8.4, 5, 5, '#e9e9e4', '#0c0c0d', 3.2);
      spineText(g, s.title.toUpperCase(), 3.9, 14, h - (s.subtitle ? 30 : 8), 4.3, '#f3f3ee');
      if (s.subtitle) spineText(g, s.subtitle, 3.9, h - 27, h - 6, 2.5, '#b9b9b4', `500 2.5px ${FONT}`);
      g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(0.5, 0, 0.5, h);
    },
    cover(g, s, d, h) {
      g.fillStyle = '#ccd3d7'; g.fillRect(0, 0, d, h);
      // hinge strip with its moulded ridges
      g.fillStyle = '#b4bcc1'; for (let y = 6; y < h - 6; y += 2.1) g.fillRect(1.6, y, 8.6, 0.9);
      const x0 = 12.5, bw = d - x0 - 2.2, by = 2.4, bh = h - 4.8;
      g.fillStyle = '#0c0c0d'; g.fillRect(x0, by, 13.5, bh);                      // black band of the booklet
      vtag(g, 'PlayStation', x0 + 6.8, by + 20, by + bh - 6, 6.6, '#efefea');
      tag(g, 'PS', x0 + 6.8, by + 10, 9.5, 9.5, '#e9e9e4', '#0c0c0d', 6);
      art(g, s, x0 + 13.5, by, bw - 13.5, bh);
      g.fillStyle = 'rgba(255,255,255,0.16)'; g.fillRect(x0, by, bw, 1.6);
    },
    back: '#111112', edge: 0x7f888d,
  },
  // Blue Vita keep case with its paper sleeve
  vita: {
    plastic: 0x1f63d6, rough: 0.22,
    spine(g, s, t, h) {
      g.fillStyle = '#1b5acb'; g.fillRect(0, 0, t, h);
      g.fillStyle = '#f5f6f8'; g.fillRect(1.1, 3, t - 2.2, h - 6);
      g.fillStyle = '#1657c8'; g.fillRect(1.1, 3, t - 2.2, 21);
      vtag(g, 'PS VITA', t / 2, 4.5, 22.5, 4.4, '#ffffff');
      spineText(g, s.title, t / 2, 28, h - (s.subtitle ? 30 : 9), 5, '#15161a');
      if (s.subtitle) spineText(g, s.subtitle, t / 2, h - 27, h - 7, 2.8, '#5a5d66', `500 2.8px ${FONT}`);
    },
    cover(g, s, d, h) {
      g.fillStyle = '#1b5acb'; g.fillRect(0, 0, d, h);
      const m = 2.4, w = d - m * 2, hh = h - m * 2;
      g.fillStyle = '#1657c8'; g.fillRect(m, m, w, 15);
      g.fillStyle = '#ffffff'; g.textAlign = 'left'; g.textBaseline = 'middle';
      g.save(); g.translate(m + 6, m + 7.9); g.scale(1.3, 1); g.font = `300 7.4px ${FONT}`; g.fillText('PS VITA', 0, 0); g.restore();
      art(g, s, m, m + 15, w, hh - 15);
      g.fillStyle = 'rgba(255,255,255,0.14)'; g.fillRect(m, m, w, 1.4);
    },
    back: '#1b5acb', edge: 0x1c5dcf,
  },
  // Clear PSP keep case: sleeve with the black band on the spine side
  psp: {
    plastic: 0xcfd5d8, rough: 0.18,
    spine(g, s, t, h) {
      g.fillStyle = '#d5dadd'; g.fillRect(0, 0, t, h);
      g.fillStyle = '#f6f6f3'; g.fillRect(1.2, 3, t - 2.4, h - 6);
      g.fillStyle = '#0d0d0f'; g.fillRect(1.2, 3, t - 2.4, 20);
      vtag(g, 'PSP', t / 2, 5, 21, 6, '#f2f2ee');
      spineText(g, s.title, t / 2, 27, h - (s.subtitle ? 34 : 10), 5.6, '#15161a');
      if (s.subtitle) spineText(g, s.subtitle, t / 2, h - 31, h - 8, 3, '#5a5d66', `500 3px ${FONT}`);
    },
    cover(g, s, d, h) {
      g.fillStyle = '#cfd5d8'; g.fillRect(0, 0, d, h);
      const m = 2.6, w = d - m * 2, hh = h - m * 2;
      g.fillStyle = '#0d0d0f'; g.fillRect(m, m, 12.5, hh);
      vtag(g, 'PSP', m + 6.3, m + hh - 44, m + hh - 6, 9, '#f2f2ee');
      art(g, s, m + 12.5, m, w - 12.5, hh);
    },
    back: '#e9e9e5', edge: 0xc6cdd1,
  },
  // Game Boy Advance carton: indigo band sweeping down the left of the art
  gba: {
    plastic: null, rough: 0.82,
    spine(g, s, t, h) {
      g.fillStyle = s.color; g.fillRect(0, 0, t, h);
      g.fillStyle = '#3a2f93'; g.fillRect(0, 0, t, 27);
      vtag(g, 'GAME BOY ADVANCE', t / 2, 2, 25, 3.3, '#f1f0f7');
      const ink = inkOn(s.color);
      spineText(g, s.title.toUpperCase(), t / 2, 31, h - (s.subtitle ? 30 : 8), 8.4, ink);
      if (s.subtitle) spineText(g, s.subtitle, t / 2, h - 27, h - 6, 3.4, ink, `500 3.4px ${FONT}`);
      g.fillStyle = 'rgba(255,255,255,0.22)'; g.fillRect(0, 0, 0.5, h); g.fillRect(t - 0.5, 0, 0.5, h);  // worn card edges
    },
    cover(g, s, d, h) {
      g.fillStyle = s.color; g.fillRect(0, 0, d, h);
      art(g, s, 22, 0, d - 22, h);
      g.fillStyle = '#3a2f93';
      g.beginPath(); g.moveTo(0, 0); g.lineTo(26, 0); g.bezierCurveTo(15, h * 0.3, 15, h * 0.7, 21, h); g.lineTo(0, h); g.closePath(); g.fill();
      g.fillStyle = '#8f88d6'; g.beginPath(); g.moveTo(26, 0); g.lineTo(28, 0); g.bezierCurveTo(17, h * 0.3, 17, h * 0.7, 23, h); g.lineTo(21, h); g.bezierCurveTo(15, h * 0.7, 15, h * 0.3, 26, 0); g.fill();
      vtag(g, 'GAME BOY ADVANCE', 8.4, 8, h - 8, 7.4, '#f1f0f7');
      g.fillStyle = 'rgba(255,255,255,0.2)'; g.fillRect(0, 0, d, 0.6); g.fillRect(0, h - 0.6, d, 0.6);
    },
    back: null, edge: null,
  },
};

function pageTexture(w, h, along) {
  return canvasTex(w, h, 6, (g) => {
    g.fillStyle = '#ece4cf'; g.fillRect(0, 0, w, h);
    let s = 7;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const n = along === 'x' ? w : h;
    for (let i = 0; i < n * 3; i++) {
      g.fillStyle = `rgba(90,70,40,${0.05 + rnd() * 0.16})`;
      const p = rnd() * n;
      if (along === 'x') g.fillRect(p, 0, 0.12, h); else g.fillRect(0, p, w, 0.12);
    }
  });
}

function bookSpine(spec, hard) {
  const { t, h, color } = spec, ink = hard ? (lum(color) > 0.5 ? '#2a2016' : '#e2c98a') : inkOn(color);
  return canvasTex(t, h, Math.min(10, 2048 / h), (g) => {
    g.fillStyle = color; g.fillRect(0, 0, t, h);
    if (hard) {
      // cloth weave and stamped rules
      g.fillStyle = 'rgba(0,0,0,0.05)'; for (let y = 0; y < h; y += 0.6) g.fillRect(0, y, t, 0.25);
      g.fillStyle = ink;
      for (const y of [11, 13, h - 26, h - 24]) g.fillRect(t * 0.14, y, t * 0.72, 0.6);
      spineText(g, spec.title, t / 2, 19, h - (spec.subtitle ? 62 : 32), Math.min(t * 0.5, 11), ink, `700 ${Math.min(t * 0.5, 11)}px ${SERIF}`);
      if (spec.subtitle) spineText(g, spec.subtitle, t / 2, h - 58, h - 31, Math.min(t * 0.3, 6), ink, `400 ${Math.min(t * 0.3, 6)}px ${SERIF}`);
      g.beginPath(); g.arc(t / 2, h - 13, Math.min(t * 0.22, 4.5), 0, Math.PI * 2); g.lineWidth = 0.6; g.strokeStyle = ink; g.stroke();
    } else {
      // paperback: colour block at the head, publisher's mark at the foot, reading creases
      g.fillStyle = shade(color, 0.72); g.fillRect(0, 0, t, 16);
      g.fillStyle = ink;
      spineText(g, spec.title, t / 2, 22, h - (spec.subtitle ? 60 : 30), Math.min(t * 0.52, 11), ink);
      if (spec.subtitle) spineText(g, spec.subtitle, t / 2, h - 56, h - 28, Math.min(t * 0.32, 6), ink, `500 ${Math.min(t * 0.32, 6)}px ${FONT}`);
      const r = Math.min(t * 0.26, 5);
      g.fillRect(t / 2 - r, h - 18, r * 2, r * 2); g.fillStyle = color; g.fillRect(t / 2 - r * 0.45, h - 18 + r * 0.55, r * 0.9, r * 0.9);
      g.fillStyle = 'rgba(255,255,255,0.18)';
      for (const x of [t * 0.3, t * 0.52, t * 0.71]) g.fillRect(x, 0, 0.25, h);
    }
  });
}

function bookCover(spec, hard) {
  const { d, h, color } = spec;
  return canvasTex(d, h, Math.min(6, 1024 / h), (g) => {
    g.fillStyle = color; g.fillRect(0, 0, d, h);
    if (spec.image) { art(g, spec, 0, 0, d, h); return; }
    const ink = inkOn(color), m = d * 0.11;
    g.fillStyle = ink; g.textAlign = 'left'; g.textBaseline = 'top';
    if (hard) {
      g.lineWidth = 0.7; g.strokeStyle = ink; g.strokeRect(m * 0.6, m * 0.6, d - m * 1.2, h - m * 1.2);
      const end = fitText(g, spec.title, m * 1.3, h * 0.2, d - m * 2.6, d * 0.16, SERIF);
      g.fillRect(m * 1.3, end + 4, d * 0.2, 0.8);
      if (spec.subtitle) fitText(g, spec.subtitle, m * 1.3, end + 10, d - m * 2.6, d * 0.07, SERIF, 400);
    } else {
      g.fillStyle = shade(color, 0.72); g.fillRect(0, 0, d, h * 0.09);
      g.fillStyle = ink; g.globalAlpha = 0.12; g.beginPath(); g.arc(d * 0.7, h * 0.72, d * 0.42, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1;
      const end = fitText(g, spec.title.toUpperCase(), m, h * 0.16, d - m * 2, d * 0.17);
      if (spec.subtitle) { g.globalAlpha = 0.78; fitText(g, spec.subtitle, m, end + d * 0.03, d - m * 2, d * 0.075, FONT, 500); g.globalAlpha = 1; }
      g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(4.5, 0, 0.5, h);   // hinge crease
    }
  });
}

const PALETTE = ['#ffd23f', '#ff7a59', '#7fd1c7', '#c9b6ff', '#9fe07c', '#ffb3c7', '#e8e2d2', '#5d8fd6', '#d9534f', '#2f4858'];
let PAGES = null;

/**
 * One shelved item. spec: { type, title, subtitle, color, image?, t?, h?, binding? }
 * Returns a Group whose +z side is the spine and +x side the front cover.
 */
export function buildItem(input) {
  const base = ITEM_TYPES[input.type] || ITEM_TYPES.book;
  const spec = { subtitle: '', ...input, type: ITEM_TYPES[input.type] ? input.type : 'book' };
  spec.title = (spec.title || 'Untitled').trim();
  spec.color ||= PALETTE[Math.floor(hash(spec.title + spec.type) * PALETTE.length)];
  spec.d = base.d;
  const isBook = spec.type === 'book';
  spec.t = +spec.t || (isBook ? 16 + Math.round(hash(spec.title) * 22) : base.t);
  spec.h = +spec.h || (isBook ? 176 + Math.round(hash(spec.title + 'h') * 38) : base.h);
  if (isBook) spec.d = 128 + Math.round(hash(spec.title + 'd') * 26);
  const { t, h, d } = spec;
  const group = new THREE.Group();
  group.name = `${spec.type}: ${spec.title}`;
  const mat = (params) => new THREE.MeshStandardMaterial(params);
  let coverMat, drawCover;

  if (isBook) {
    PAGES ||= { top: pageTexture(40, 40, 'x'), fore: pageTexture(40, 40, 'x') };
    const hard = spec.binding ? spec.binding === 'hard' : spec.t >= 27;
    const pages = mat({ map: PAGES.top, roughness: 0.9 });
    const cloth = mat({ color: spec.color, roughness: hard ? 0.86 : 0.55 });
    coverMat = mat({ color: spec.color, roughness: hard ? 0.86 : 0.5 });
    const spineMat = mat({ map: bookSpine(spec, hard), roughness: hard ? 0.86 : 0.5 });
    drawCover = () => bookCover(spec, hard);
    if (hard) {
      // boards overhang a page block; the spine is a shallow arc
      const b = 2.4, sq = 3.4, R = t * 0.78, a = Math.asin(t / 2 / R), sag = R * (1 - Math.cos(a));
      const boardD = d - sag;
      const board = (x, m) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(b, h, boardD), m); mesh.position.set(x, 0, -sag / 2); group.add(mesh); };
      board(t / 2 - b / 2, [coverMat, cloth, cloth, cloth, cloth, cloth]);
      board(-t / 2 + b / 2, cloth);
      const block = new THREE.Mesh(new THREE.BoxGeometry(t - b * 2, h - sq * 2, boardD - sq - 1.5), pages);
      block.position.set(0, 0, -sag / 2 - sq / 2 + 0.75);
      group.add(block);
      const spine = new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 14, 1, false, -a, a * 2), [spineMat, cloth, cloth]);
      spine.position.set(0, 0, d / 2 - R);
      group.add(spine);
    } else {
      group.add(new THREE.Mesh(new THREE.BoxGeometry(t, h, d), [coverMat, cloth, pages, pages, spineMat, pages]));
    }
  } else {
    const P = PRINT[spec.type];
    const spineMat = mat({ map: canvasTex(t, h, Math.min(14, 2048 / h), (g) => P.spine(g, spec, t, h)), roughness: P.rough });
    coverMat = mat({ color: P.plastic ?? spec.color, roughness: P.rough });
    drawCover = () => canvasTex(d, h, Math.min(7, 1024 / h), (g) => P.cover(g, spec, d, h));
    const edge = mat({ color: P.edge ?? new THREE.Color(spec.color).multiplyScalar(0.82).getHex(), roughness: P.rough });
    const back = mat({ color: P.back ?? spec.color, roughness: P.rough });
    group.add(new THREE.Mesh(new THREE.BoxGeometry(t, h, d), [coverMat, back, edge, edge, spineMat, edge]));
  }
  group.userData.spec = spec;
  group.userData.ensureCover = () => {
    if (coverMat.map) return;
    coverMat.map = drawCover();
    coverMat.color.set(0xffffff);
    coverMat.needsUpdate = true;
  };
  group.userData.setCoverImage = (image) => {
    spec.image = image;
    const had = !!coverMat.map;
    coverMat.map?.dispose(); coverMat.map = null;
    if (had) group.userData.ensureCover();
  };
  return group;
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
export function buildShelf({ cols = 1, rows = 2, cellW = 1290, cellH = 236, depth = 520, t = 24, plinth = 50 } = {}) {
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
