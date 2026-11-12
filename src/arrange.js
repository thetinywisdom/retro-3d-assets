// Shelf arrangements: how the cases, books and consoles are set out on the
// shelf rows. Each arrangement is a short script of placement steps, so a new
// one is a dozen lines. Everything is seeded, so a given arrangement always
// looks the same.
//
// Item frame: x = thickness, y = height, z = depth; spine faces +z, front
// cover faces +x. Rows are { x0, x1, y, h }, the top row first.
import * as THREE from 'three';

const SPINE_Z = -16;                     // how far spines sit behind the shelf's front edge
const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);
const q = (axis, a) => new THREE.Quaternion().setFromAxisAngle(axis, a);
const PROP_SIZE = { 'ps-one': [193, 144], dualshock: [157, 96], gba: [145, 82], 'ps-vita': [184, 85], 'psp-go': [128, 108] };

class Row {
  constructor(ctx, row) { this.ctx = ctx; this.row = row; this.x = row.x0 + 10; this.last = null; this.seg = 0; this.mine = []; }

  get room() { return this.row.x1 - 10 - this.x; }

  gap(mm) { this.x += mm * this.ctx.tight; this.seg++; return this; }

  _put(obj, pos, quat) {
    obj.position.copy(pos);
    obj.quaternion.copy(quat || new THREE.Quaternion());
    this.mine.push([obj, this.seg]);
    this.ctx.out.push(obj);
  }

  /** A run of items standing upright, spines out, each pushed in a slightly different amount. */
  up(type, n = Infinity, { push = 0 } = {}) {
    const { rnd } = this.ctx;
    let x0 = this.x, count = 0;
    for (const it of this.ctx.take(type, n)) {
      const s = it.userData.spec;
      if (s.t > this.room || s.h > this.row.h - 4) { this.ctx.back(it); continue; }
      this._put(it, new THREE.Vector3(this.x + s.t / 2, this.row.y + s.h / 2, SPINE_Z - push - s.d / 2 - rnd() * 9));
      this.x += s.t + 0.5;
      count++;
    }
    if (count) this.last = { x0, x1: this.x, push };
    return this;
  }

  /** A run of upright items pushed back, with a handheld leaning on their spines in front. */
  withProp(type, n, name, turn = 0) {
    const items = this.ctx.take(type, n);
    const run = items.reduce((w, it) => w + it.userData.spec.t + 0.5, 0);
    const w = Math.max(run, PROP_SIZE[name][0] * 0.82);
    items.reverse().forEach((it) => this.ctx.back(it));
    if (w > this.room) return this.up(type, n);
    const x0 = this.x;
    this.x = x0 + (w - run) / 2;
    this.up(type, n, { push: 30 });
    const obj = this.ctx.makeProp(name);
    if (obj) {
      const hold = new THREE.Group();
      hold.add(obj);
      obj.rotation.x = -0.24;
      this._put(hold, new THREE.Vector3(x0 + w / 2, this.row.y, SPINE_Z - 30 + 26), q(Y, turn));
    }
    this.x = x0 + w + 6;
    return this;
  }

  /** Spread the groups (the parts between gaps) across the row's spare room. */
  justify() {
    const spare = this.room - 8;
    if (spare <= 0) return;
    const step = spare / (this.seg + 1);
    for (const [obj, seg] of this.mine) obj.position.x += step * (seg + 0.5);
  }

  /** One item leaning left against whatever stands before it. */
  lean(type, angle = 0.2) {
    const [it] = this.ctx.take(type, 1);
    if (!it) return this;
    const s = it.userData.spec, a = angle + this.ctx.rnd() * 0.06;
    const w = s.h * Math.sin(a) + s.t * Math.cos(a);
    if (w > this.room) { this.ctx.back(it); return this; }
    const xl = this.x + s.h * Math.sin(a);
    this._put(it, new THREE.Vector3(xl + (s.t / 2) * Math.cos(a) - (s.h / 2) * Math.sin(a), this.row.y + (s.t / 2) * Math.sin(a) + (s.h / 2) * Math.cos(a), SPINE_Z - s.d / 2 - 4), q(Z, a));
    this.x += w + 1;
    return this;
  }

  /** Items lying flat in a pile, each twisted a little. Returns the row; this.last.top is the pile's top. */
  pile(list) {
    const { rnd } = this.ctx;
    const items = list.flatMap(([type, n]) => this.ctx.take(type, n));
    if (!items.length) return this;
    const width = Math.max(...items.map((it) => it.userData.spec.h));
    if (width > this.room) { items.forEach((it) => this.ctx.back(it)); return this; }
    const cx = this.x + width / 2 + 4;
    let y = this.row.y;
    items.sort((a, b) => b.userData.spec.h * b.userData.spec.d - a.userData.spec.h * a.userData.spec.d);
    for (const it of items) {
      const s = it.userData.spec;
      if (y + s.t > this.row.y + this.row.h - 6) { this.ctx.back(it); continue; }
      this._put(it, new THREE.Vector3(cx + (rnd() - 0.5) * 12, y + s.t / 2, SPINE_Z - s.d / 2 - rnd() * 14), q(Y, (rnd() - 0.5) * 0.2).multiply(q(Z, Math.PI / 2)));
      y += s.t + 0.3;
    }
    this.last = { x0: this.x, x1: this.x + width + 8, top: y, cx };
    this.x += width + 12;
    return this;
  }

  /** One item turned cover-out, leaning back. On a narrow shelf it is just shelved upright. */
  face(type) {
    if (this.ctx.narrow) return this.up(type, 1);
    const [it] = this.ctx.take(type, 1);
    if (!it) return this;
    const s = it.userData.spec, a = 0.16;
    if (s.d > this.room) { this.ctx.back(it); return this; }
    it.userData.ensureCover();
    this._put(it, new THREE.Vector3(this.x + s.d / 2, this.row.y + (s.h / 2) * Math.cos(a) + (s.t / 2) * Math.sin(a), -70 - (s.h / 2) * Math.sin(a)), q(X, -a).multiply(q(Y, -Math.PI / 2 + (this.ctx.rnd() - 0.5) * 0.12)));
    this.x += s.d + 6;
    return this;
  }

  /**
   * A console. how:
   *   'stand'   on its edge, leaning back a little (handhelds)
   *   'propped' tilted up so its top faces the viewer (PS one, controller)
   *   'on'      standing on top of the pile placed just before
   *   'against' in front of the run placed just before, leaning on its spines
   */
  prop(name, how = 'stand', { turn = 0, overlap = 0 } = {}) {
    const obj = this.ctx.makeProp(name);
    if (!obj) return this;
    const [w, d] = PROP_SIZE[name];
    const hold = new THREE.Group();
    hold.add(obj);
    hold.userData.prop = name;
    if (how === 'on' && this.last?.top) {
      obj.rotation.x = -0.1;
      this._put(hold, new THREE.Vector3(this.last.cx, this.last.top, -84), q(Y, turn));
      return this;
    }
    if (how === 'against' && this.last) {
      obj.rotation.x = -0.2;
      this._put(hold, new THREE.Vector3((this.last.x0 + this.last.x1) / 2, this.row.y, SPINE_Z - this.last.push + 22), q(Y, turn));
      return this;
    }
    if (w - overlap > this.room) return this;
    if (how === 'propped') {
      const tilt = name === 'ps-one' ? 0.98 : 0.9;
      obj.rotation.x = tilt;
      obj.position.y = (d / 2) * Math.sin(tilt) + 1;
      this._put(hold, new THREE.Vector3(this.x - overlap + w / 2, this.row.y, name === 'ps-one' ? -150 : -100), q(Y, turn));
    } else {
      obj.rotation.x = -0.14;
      this._put(hold, new THREE.Vector3(this.x - overlap + w / 2, this.row.y, -96), q(Y, turn));
    }
    this.x += w - overlap + 8;
    return this;
  }
}

// ---------------------------------------------------------------------------
// the arrangements
// ---------------------------------------------------------------------------
export const ARRANGEMENTS = {
  // Sorted by kind, everything upright, consoles beside their games.
  tidy(top, low) {
    top.up('ps1').gap(40).prop('ps-one', 'propped', { turn: 0.1 }).prop('dualshock', 'propped', { turn: -0.22, overlap: 30 }).gap(40).up('book');
    low.up('gba').gap(12).prop('gba').gap(36).up('vita').gap(12).prop('ps-vita').gap(36).up('psp').gap(12).prop('psp-go');
  },

  // Someone has been pulling things out: runs end in a leaning case, a couple
  // of covers are turned out, books are half stacked.
  browsed(top, low) {
    top.up('ps1', 4).lean('ps1').gap(26).prop('ps-one', 'propped', { turn: 0.14 }).prop('dualshock', 'propped', { turn: -0.3, overlap: 46 })
      .gap(22).pile([['book', 2]]).prop('gba', 'on', { turn: 0.12 }).gap(8).up('book', 3).lean('book', 0.17);
    low.up('gba', 2).lean('gba', 0.24).gap(20).face('vita').up('vita', 2).lean('vita').gap(18).prop('ps-vita', 'stand', { turn: -0.08 })
      .gap(22).withProp('psp', 3, 'psp-go', 0.06);
  },

  // Piles: things put down flat on top of each other, consoles sitting on the piles.
  piled(top, low) {
    top.gap(6).pile([['ps1', 4]]).gap(4).up('ps1', 2).lean('ps1', 0.18).gap(20).prop('ps-one', 'propped', { turn: -0.1 }).prop('dualshock', 'propped', { turn: 0.26, overlap: 40 })
      .gap(18).up('book', 2).lean('book', 0.18).gap(14).pile([['book', 3]]).prop('ps-vita', 'on', { turn: -0.1 });
    low.pile([['gba', 2], ['vita', 1]]).prop('gba', 'on', { turn: 0.1 }).gap(8).up('gba', 1).up('vita', 2).lean('vita').gap(24)
      .pile([['psp', 2], ['vita', 1]]).prop('psp-go', 'on', { turn: -0.12 }).gap(10).up('psp').lean('vita', 0.2);
  },

  // A display: one cover of each kind turned out with the rest beside it and
  // the console in front.
  display(top, low) {
    top.gap(6).face('ps1').up('ps1').gap(24).prop('ps-one', 'propped', { turn: 0.08 }).prop('dualshock', 'propped', { turn: -0.24, overlap: 40 }).gap(24).up('book', 4).lean('book', 0.18).gap(8).pile([['book', 2]]);
    low.face('gba').up('gba').gap(6).prop('gba', 'stand', { turn: 0.08 }).gap(10).face('vita').up('vita').gap(6).prop('ps-vita', 'stand', { turn: -0.06 }).gap(10).withProp('psp', 9, 'psp-go', 0.08);
  },
};

/**
 * Run an arrangement. items: array of item groups (from buildItem). makeProp(name) returns a console.
 * Returns every object placed, positioned in shelf coordinates.
 */
export function arrange(name, rows, items, makeProp) {
  const script = ARRANGEMENTS[name] || ARRANGEMENTS.browsed;
  let seed = 0;
  for (const c of name || 'browsed') seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const pools = {};
  for (const it of items) (pools[it.userData.spec.type] ||= []).push(it);
  const usedProps = new Set();
  const width = rows[0].x1 - rows[0].x0;
  const ctx = {
    out: [], rnd, narrow: width < 900, tight: width < 900 ? 0.5 : 1,
    take: (type, n) => (pools[type] || []).splice(0, n),
    back: (it) => (pools[it.userData.spec.type] ||= []).unshift(it),
    makeProp: (p) => (usedProps.has(p) ? null : (usedProps.add(p), makeProp(p))),
  };
  const cursors = rows.map((r) => new Row(ctx, r));
  script(cursors[0], cursors[1] || cursors[0]);
  // anything the script left over goes upright wherever there is room, then consoles
  for (const type of Object.keys(pools)) for (const c of [...cursors].sort((a, b) => b.room - a.room)) c.up(type);
  for (const p of Object.keys(PROP_SIZE)) if (!usedProps.has(p)) [...cursors].sort((a, b) => b.room - a.room)[0].gap(10).prop(p, p === 'ps-one' || p === 'dualshock' ? 'propped' : 'stand');
  cursors.forEach((c) => c.justify());
  const left = Object.values(pools).flat();
  for (const it of left) console.warn(`retro-shelf: no room on the shelf for "${it.userData.spec.title}"`);
  return ctx.out;
}
