// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n, r, i, a, o, s, c, l, u, d = 1e3, f = 1001, p = 1002, m = 1003, h = 1004, g = 1005, _ = 1006, v = 1007, y = 1008, b = 1009, x = 1010, S = 1011, C = 1012, w = 1013, T = 1014, E = 1015, D = 1016, O = 1017, k = 1018, A = 1020, j = 35902, ee = 35899, M = 1021, te = 1022, N = 1023, ne = 1026, re = 1027, ie = 1028, ae = 1029, oe = 1030, se = 1031, ce = 1033, le = 33776, P = 33777, ue = 33778, de = 33779, fe = 35840, pe = 35841, me = 35842, he = 35843, ge = 36196, _e = 37492, ve = 37496, ye = 37488, be = 37489, xe = 37490, Se = 37491, Ce = 37808, we = 37809, Te = 37810, Ee = 37811, De = 37812, Oe = 37813, ke = 37814, Ae = 37815, je = 37816, Me = 37817, Ne = 37818, Pe = 37819, F = 37820, Fe = 37821, Ie = 36492, Le = 36494, I = 36495, Re = 36283, L = 36284, R = 36285, ze = 36286, Be = 2300, Ve = 2301, He = 2302, Ue = 2303, We = 2400, Ge = 2401, Ke = 2402, qe = 3200, Je = "srgb", Ye = "srgb-linear", Xe = "linear", Ze = "srgb", Qe = 7680, $e = 35044, et = 2e3;
function tt(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function nt(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function rt(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function it() {
	let e = rt("canvas");
	return e.style.display = "block", e;
}
var at = {};
function ot(...e) {
	let t = "THREE." + e.shift();
	console.log(t, ...e);
}
function st(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function z(...e) {
	e = st(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function B(...e) {
	e = st(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function ct(...e) {
	let t = e.join(" ");
	t in at || (at[t] = !0, z(...e));
}
function lt(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var ut = {
	0: 0,
	2: 6,
	4: 4,
	3: 5,
	1: 1,
	6: 2,
	7: 7,
	5: 3
}, dt = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n !== void 0 && n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, ft = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), pt = 1234567, mt = Math.PI / 180, ht = 180 / Math.PI;
function gt() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (ft[e & 255] + ft[e >> 8 & 255] + ft[e >> 16 & 255] + ft[e >> 24 & 255] + "-" + ft[t & 255] + ft[t >> 8 & 255] + "-" + ft[t >> 16 & 15 | 64] + ft[t >> 24 & 255] + "-" + ft[n & 63 | 128] + ft[n >> 8 & 255] + "-" + ft[n >> 16 & 255] + ft[n >> 24 & 255] + ft[r & 255] + ft[r >> 8 & 255] + ft[r >> 16 & 255] + ft[r >> 24 & 255]).toLowerCase();
}
function V(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function _t(e, t) {
	return (e % t + t) % t;
}
function vt(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function yt(e, t, n) {
	return e === t ? 0 : (n - e) / (t - e);
}
function bt(e, t, n) {
	return (1 - n) * e + n * t;
}
function xt(e, t, n, r) {
	return bt(e, t, 1 - Math.exp(-n * r));
}
function St(e, t = 1) {
	return t - Math.abs(_t(e, t * 2) - t);
}
function Ct(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function wt(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function Tt(e, t) {
	return e + Math.floor(Math.random() * (t - e + 1));
}
function Et(e, t) {
	return e + Math.random() * (t - e);
}
function Dt(e) {
	return e * (.5 - Math.random());
}
function Ot(e) {
	e !== void 0 && (pt = e);
	let t = pt += 1831565813;
	return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function kt(e) {
	return e * mt;
}
function At(e) {
	return e * ht;
}
function jt(e) {
	return e > 0 && Number.isInteger(e) && 2 ** Math.round(Math.log2(e)) === e;
}
function Mt(e) {
	return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function Nt(e) {
	return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function Pt(e, t, n, r, i) {
	let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2);
	switch (i) {
		case "XYX":
			e.set(s * u, c * d, c * f, s * l);
			break;
		case "YZY":
			e.set(c * f, s * u, c * d, s * l);
			break;
		case "ZXZ":
			e.set(c * d, c * f, s * u, s * l);
			break;
		case "XZX":
			e.set(s * u, c * m, c * p, s * l);
			break;
		case "YXY":
			e.set(c * p, s * u, c * m, s * l);
			break;
		case "ZYZ":
			e.set(c * m, c * p, s * u, s * l);
			break;
		default: z("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
	}
}
function Ft(e) {
	switch (e.constructor) {
		case Uint32Array: return 4294967295;
		case Uint16Array: return 65535;
		case Uint8Array:
		case Uint8ClampedArray: return 255;
		case Int32Array: return 2147483647;
		case Int16Array: return 32767;
		case Int8Array: return 127;
		default: return;
	}
}
function It(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = Ft(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.max(e / n, -1);
}
function Lt(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = Ft(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.round(e * n);
}
var Rt = {
	DEG2RAD: mt,
	RAD2DEG: ht,
	generateUUID: gt,
	clamp: V,
	euclideanModulo: _t,
	mapLinear: vt,
	inverseLerp: yt,
	lerp: bt,
	damp: xt,
	pingpong: St,
	smoothstep: Ct,
	smootherstep: wt,
	randInt: Tt,
	randFloat: Et,
	randFloatSpread: Dt,
	seededRandom: Ot,
	degToRad: kt,
	radToDeg: At,
	isPowerOfTwo: jt,
	ceilPowerOfTwo: Mt,
	floorPowerOfTwo: Nt,
	setQuaternionFromProperEuler: Pt,
	normalize: Lt,
	denormalize: It
};
c = Symbol.iterator;
var H = class {
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = V(this.x, e.x, t.x), this.y = V(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = V(this.x, e, t), this.y = V(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(V(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(V(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[c]() {
		yield this.x, yield this.y;
	}
};
n = H, n.prototype.isVector2 = !0;
var zt = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: z("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(V(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
};
l = Symbol.iterator;
var U = class {
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(Vt.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(Vt.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = V(this.x, e.x, t.x), this.y = V(this.y, e.y, t.y), this.z = V(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = V(this.x, e, t), this.y = V(this.y, e, t), this.z = V(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(V(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return Bt.copy(this).projectOnVector(e), this.sub(Bt);
	}
	reflect(e) {
		return this.sub(Bt.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(V(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[l]() {
		yield this.x, yield this.y, yield this.z;
	}
};
r = U, r.prototype.isVector3 = !0;
var Bt = /*@__PURE__*/ new U(), Vt = /*@__PURE__*/ new zt(), W = class {
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return ct("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Ht.makeScale(e, t)), this;
	}
	rotate(e) {
		return ct("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Ht.makeRotation(-e)), this;
	}
	translate(e, t) {
		return ct("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Ht.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
};
i = W, i.prototype.isMatrix3 = !0;
var Ht = /*@__PURE__*/ new W(), Ut = /*@__PURE__*/ new W().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Wt = /*@__PURE__*/ new W().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function Gt() {
	let e = {
		enabled: !0,
		workingColorSpace: Ye,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n || (this.spaces[t].transfer === "srgb" && (e.r = qt(e.r), e.g = qt(e.g), e.b = qt(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = Jt(e.r), e.g = Jt(e.g), e.b = Jt(e.b))), e;
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? Xe : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[Ye]: {
			primaries: t,
			whitePoint: r,
			transfer: Xe,
			toXYZ: Ut,
			fromXYZ: Wt,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: Je },
			outputColorSpaceConfig: { drawingBufferColorSpace: Je }
		},
		[Je]: {
			primaries: t,
			whitePoint: r,
			transfer: Ze,
			toXYZ: Ut,
			fromXYZ: Wt,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: Je }
		}
	}), e;
}
var Kt = /*@__PURE__*/ Gt();
function qt(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function Jt(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var Yt, Xt = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			Yt === void 0 && (Yt = rt("canvas")), Yt.width = e.width, Yt.height = e.height;
			let t = Yt.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = Yt;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = rt("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = qt(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		}
		if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(qt(t[e] / 255) * 255) : t[e] = qt(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		}
		return z("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, Zt = 0, Qt = class {
	constructor(e = null) {
		this.isTextureSource = !0, Object.defineProperty(this, "id", { value: Zt++ }), this.uuid = gt(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width || 0, t.height || 0, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push($t(r[t].image)) : e.push($t(r[t]));
			} else e = $t(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function $t(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Xt.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (z("Texture: Unable to serialize Texture."), {});
}
var en = 0, tn = /*@__PURE__*/ new U(), nn = class e extends dt {
	constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, r = f, i = f, a = _, o = y, s = N, c = b, l = e.DEFAULT_ANISOTROPY, u = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: en++ }), this.uuid = gt(), this.name = "", this.source = new Qt(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = r, this.wrapT = i, this.magFilter = a, this.minFilter = o, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = c, this.offset = new H(0, 0), this.repeat = new H(1, 1), this.center = new H(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new W(), this.generateMipmaps = !0, this.mipmapsAutoUpdate = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.isPMREMTexture = !1, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(tn).x;
	}
	get height() {
		return this.source.getSize(tn).y;
	}
	get depth() {
		return this.source.getSize(tn).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.mipmapsAutoUpdate = e.mipmapsAutoUpdate, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isPMREMTexture = e.isPMREMTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				z(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? z(`Texture.setValues(): property '${t}' does not exist.`) : r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			mipmapsAutoUpdate: this.mipmapsAutoUpdate,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(e) {
		if (this.mapping !== 300) return e;
		if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
			case d:
				e.x -= Math.floor(e.x);
				break;
			case f:
				e.x = e.x < 0 ? 0 : 1;
				break;
			case p: Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x);
		}
		if (e.y < 0 || e.y > 1) switch (this.wrapT) {
			case d:
				e.y -= Math.floor(e.y);
				break;
			case f:
				e.y = e.y < 0 ? 0 : 1;
				break;
			case p: Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y);
		}
		return this.flipY && (e.y = 1 - e.y), e;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
nn.DEFAULT_IMAGE = null, nn.DEFAULT_MAPPING = 300, nn.DEFAULT_ANISOTROPY = 1, u = Symbol.iterator;
var rn = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = V(this.x, e.x, t.x), this.y = V(this.y, e.y, t.y), this.z = V(this.z, e.z, t.z), this.w = V(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = V(this.x, e, t), this.y = V(this.y, e, t), this.z = V(this.z, e, t), this.w = V(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(V(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[u]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
};
a = rn, a.prototype.isVector4 = !0;
var an = class extends dt {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: _,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveColorBuffer: !0,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			storeMultisampledColorBuffer: !0,
			storeMultisampledDepthBuffer: !0,
			storeMultisampledStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1,
			useArrayDepthTexture: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new rn(0, 0, e, t), this.scissorTest = !1, this.viewport = new rn(0, 0, e, t), this.textures = [];
		let r = n.count;
		for (let i = 0; i < r; i++) this.textures[i] = new nn({
			width: e,
			height: t,
			depth: n.depth
		}), this.textures[i].isRenderTargetTexture = !0, this.textures[i].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: _,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.mipmapsAutoUpdate !== void 0 && (t.mipmapsAutoUpdate = e.mipmapsAutoUpdate), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), e !== null && e.renderTarget === null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new Qt(n);
		}
		if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null) {
			if (e.depthTexture.renderTarget === e) {
				let t = e.depthTexture.clone();
				t.renderTarget = null, this.depthTexture = t;
			} else this.depthTexture = e.depthTexture;
		} else this.depthTexture = null;
		return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, on = class extends an {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, sn = class extends nn {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = m, this.minFilter = m, this.wrapR = f, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, cn = class extends nn {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = m, this.minFilter = m, this.wrapR = f, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
}, ln = class e {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / un.setFromMatrixColumn(e, 0).length(), i = 1 / un.setFromMatrixColumn(e, 1).length(), a = 1 / un.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(fn, e, pn);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return gn.subVectors(e, t), gn.lengthSq() === 0 && (gn.z = 1), gn.normalize(), mn.crossVectors(n, gn), mn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? gn.x += 1e-4 : gn.z += 1e-4, gn.normalize(), mn.crossVectors(n, gn)), mn.normalize(), hn.crossVectors(gn, mn), r[0] = mn.x, r[4] = hn.x, r[8] = gn.x, r[1] = mn.y, r[5] = hn.y, r[9] = gn.y, r[2] = mn.z, r[6] = hn.z, r[10] = gn.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], j = r[10], ee = r[14], M = r[3], te = r[7], N = r[11], ne = r[15];
		return i[0] = a * x + o * T + s * k + c * M, i[4] = a * S + o * E + s * A + c * te, i[8] = a * C + o * D + s * j + c * N, i[12] = a * w + o * O + s * ee + c * ne, i[1] = l * x + u * T + d * k + f * M, i[5] = l * S + u * E + d * A + f * te, i[9] = l * C + u * D + d * j + f * N, i[13] = l * w + u * O + d * ee + f * ne, i[2] = p * x + m * T + h * k + g * M, i[6] = p * S + m * E + h * A + g * te, i[10] = p * C + m * D + h * j + g * N, i[14] = p * w + m * O + h * ee + g * ne, i[3] = _ * x + v * T + y * k + b * M, i[7] = _ * S + v * E + y * A + b * te, i[11] = _ * C + v * D + y * j + b * N, i[15] = _ * w + v * O + y * ee + b * ne, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = un.set(r[0], r[1], r[2]).length(), o = un.set(r[4], r[5], r[6]).length(), s = un.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), dn.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return dn.elements[0] *= c, dn.elements[1] *= c, dn.elements[2] *= c, dn.elements[4] *= l, dn.elements[5] *= l, dn.elements[6] *= l, dn.elements[8] *= u, dn.elements[9] *= u, dn.elements[10] *= u, t.setFromRotationMatrix(dn), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = et, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = et, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
};
o = ln, o.prototype.isMatrix4 = !0;
var un = /*@__PURE__*/ new U(), dn = /*@__PURE__*/ new ln(), fn = /*@__PURE__*/ new U(0, 0, 0), pn = /*@__PURE__*/ new U(1, 1, 1), mn = /*@__PURE__*/ new U(), hn = /*@__PURE__*/ new U(), gn = /*@__PURE__*/ new U(), _n = /*@__PURE__*/ new ln(), vn = /*@__PURE__*/ new zt(), yn = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(V(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-V(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(V(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-V(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(V(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-V(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: z("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return _n.makeRotationFromQuaternion(e), this.setFromRotationMatrix(_n, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return vn.setFromEuler(this), this.setFromQuaternion(vn, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
yn.DEFAULT_ORDER = "XYZ";
var bn = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = 1 << e >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e;
	}
	disable(e) {
		this.mask &= ~(1 << e);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return !!(this.mask & 1 << e);
	}
}, xn = 0, Sn = /*@__PURE__*/ new U(), Cn = /*@__PURE__*/ new zt(), wn = /*@__PURE__*/ new ln(), Tn = /*@__PURE__*/ new U(), En = /*@__PURE__*/ new U(), Dn = /*@__PURE__*/ new U(), On = /*@__PURE__*/ new zt(), kn = /*@__PURE__*/ new U(1, 0, 0), An = /*@__PURE__*/ new U(0, 1, 0), jn = /*@__PURE__*/ new U(0, 0, 1), Mn = { type: "added" }, Nn = { type: "removed" }, Pn = {
	type: "childadded",
	child: null
}, Fn = {
	type: "childremoved",
	child: null
}, In = class e extends dt {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: xn++ }), this.uuid = gt(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new U(), n = new yn(), r = new zt(), i = new U(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new ln() },
			normalMatrix: { value: new W() }
		}), this.matrix = new ln(), this.matrixWorld = new ln(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new bn(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale), this.pivot !== null && this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return Cn.setFromAxisAngle(e, t), this.quaternion.multiply(Cn), this;
	}
	rotateOnWorldAxis(e, t) {
		return Cn.setFromAxisAngle(e, t), this.quaternion.premultiply(Cn), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(kn, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(An, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(jn, e);
	}
	translateOnAxis(e, t) {
		return Sn.copy(e).applyQuaternion(this.quaternion), this.position.add(Sn.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(kn, e);
	}
	translateY(e) {
		return this.translateOnAxis(An, e);
	}
	translateZ(e) {
		return this.translateOnAxis(jn, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(wn.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? Tn.copy(e) : Tn.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), En.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? wn.lookAt(En, Tn, this.up) : wn.lookAt(Tn, En, this.up), this.quaternion.setFromRotationMatrix(wn), r && (wn.extractRotation(r.matrixWorld), Cn.setFromRotationMatrix(wn), this.quaternion.premultiply(Cn.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (B("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Mn), Pn.child = e, this.dispatchEvent(Pn), Pn.child = null) : B("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Nn), Fn.child = e, this.dispatchEvent(Fn), Fn.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), wn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), wn.multiply(e.parent.matrixWorld)), e.applyMatrix4(wn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Mn), Pn.child = e, this.dispatchEvent(Pn), Pn.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(En, e, Dn), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(En, On, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	intersectsFrustum() {
		return !0;
	}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) {
			if (Array.isArray(this.material)) {
				let t = [];
				for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
				r.material = t;
			} else r.material = i(e.materials, this.material);
		}
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
};
In.DEFAULT_UP = /*@__PURE__*/ new U(0, 1, 0), In.DEFAULT_MATRIX_AUTO_UPDATE = !0, In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Ln = class extends In {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, Rn = { type: "move" }, zn = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new Ln(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new Ln(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new U(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new U()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new Ln(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new U(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new U(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.quaternion, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.quaternion, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Rn)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new Ln();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, Bn = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, Vn = {
	h: 0,
	s: 0,
	l: 0
}, Hn = {
	h: 0,
	s: 0,
	l: 0
};
function Un(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var G = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = Je) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Kt.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = Kt.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, Kt.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = Kt.workingColorSpace) {
		if (e = _t(e, 1), t = V(t, 0, 1), n = V(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = Un(i, r, e + 1 / 3), this.g = Un(i, r, e), this.b = Un(i, r, e - 1 / 3);
		}
		return Kt.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = Je) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && z("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseFloat(i[1])) / 100, Math.min(100, parseFloat(i[2])) / 100, Math.min(100, parseFloat(i[3])) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: z("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			z("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = Je) {
		let n = Bn[e.toLowerCase()];
		return n === void 0 ? z("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = qt(e.r), this.g = qt(e.g), this.b = qt(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = Jt(e.r), this.g = Jt(e.g), this.b = Jt(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = Je) {
		return Kt.workingToColorSpace(Wn.copy(this), e), Math.round(V(Wn.r * 255, 0, 255)) * 65536 + Math.round(V(Wn.g * 255, 0, 255)) * 256 + Math.round(V(Wn.b * 255, 0, 255));
	}
	getHexString(e = Je) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = Kt.workingColorSpace) {
		Kt.workingToColorSpace(Wn.copy(this), t);
		let n = Wn.r, r = Wn.g, i = Wn.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i: s = (n - r) / e + 4;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = Kt.workingColorSpace) {
		return Kt.workingToColorSpace(Wn.copy(this), t), e.r = Wn.r, e.g = Wn.g, e.b = Wn.b, e;
	}
	getStyle(e = Je) {
		Kt.workingToColorSpace(Wn.copy(this), e);
		let t = Wn.r, n = Wn.g, r = Wn.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(Vn), this.setHSL(Vn.h + e, Vn.s + t, Vn.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(Vn), e.getHSL(Hn);
		let n = bt(Vn.h, Hn.h, t), r = bt(Vn.s, Hn.s, t), i = bt(Vn.l, Hn.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, Wn = /*@__PURE__*/ new G();
G.NAMES = Bn;
var Gn = class extends In {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new yn(), this.environmentIntensity = 1, this.environmentRotation = new yn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), this.background = e.background === null ? null : e.background.clone(), this.environment = e.environment === null ? null : e.environment.clone(), this.fog = e.fog === null ? null : e.fog.clone(), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), this.overrideMaterial = e.overrideMaterial === null ? null : e.overrideMaterial.clone(), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, Kn = /*@__PURE__*/ new U(), qn = /*@__PURE__*/ new U(), Jn = /*@__PURE__*/ new U(), Yn = /*@__PURE__*/ new U(), Xn = /*@__PURE__*/ new U(), Zn = /*@__PURE__*/ new U(), Qn = /*@__PURE__*/ new U(), $n = /*@__PURE__*/ new U(), er = /*@__PURE__*/ new U(), tr = /*@__PURE__*/ new U(), nr = /*@__PURE__*/ new rn(), rr = /*@__PURE__*/ new rn(), ir = /*@__PURE__*/ new rn(), ar = class e {
	constructor(e = new U(), t = new U(), n = new U()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), Kn.subVectors(e, t), r.cross(Kn);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		Kn.subVectors(r, t), qn.subVectors(n, t), Jn.subVectors(e, t);
		let a = Kn.dot(Kn), o = Kn.dot(qn), s = Kn.dot(Jn), c = qn.dot(qn), l = qn.dot(Jn), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, Yn) !== null && Yn.x >= 0 && Yn.y >= 0 && Yn.x + Yn.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, Yn) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Yn.x), s.addScaledVector(a, Yn.y), s.addScaledVector(o, Yn.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return nr.setScalar(0), rr.setScalar(0), ir.setScalar(0), nr.fromBufferAttribute(e, t), rr.fromBufferAttribute(e, n), ir.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(nr, i.x), a.addScaledVector(rr, i.y), a.addScaledVector(ir, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return Kn.subVectors(n, t), qn.subVectors(e, t), Kn.cross(qn).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return Kn.subVectors(this.c, this.b), qn.subVectors(this.a, this.b), Kn.cross(qn).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		Xn.subVectors(r, n), Zn.subVectors(i, n), $n.subVectors(e, n);
		let s = Xn.dot($n), c = Zn.dot($n);
		if (s <= 0 && c <= 0) return t.copy(n);
		er.subVectors(e, r);
		let l = Xn.dot(er), u = Zn.dot(er);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0 && s - l > 0) return a = s / (s - l), t.copy(n).addScaledVector(Xn, a);
		tr.subVectors(e, i);
		let f = Xn.dot(tr), p = Zn.dot(tr);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Zn, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return Qn.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(Qn, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(Xn, a).addScaledVector(Zn, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, or = class {
	constructor(e = new U(Infinity, Infinity, Infinity), t = new U(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(cr.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(cr.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = cr.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0 && e.isBatchedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, cr) : cr.fromBufferAttribute(r, t), cr.applyMatrix4(e.matrixWorld), this.expandByPoint(cr);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), lr.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), lr.copy(e.boundingBox)), lr.applyMatrix4(e.matrixWorld), this.union(lr);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, cr), cr.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(gr), _r.subVectors(this.max, gr), ur.subVectors(e.a, gr), dr.subVectors(e.b, gr), fr.subVectors(e.c, gr), pr.subVectors(dr, ur), mr.subVectors(fr, dr), hr.subVectors(ur, fr);
		let t = [
			0,
			-pr.z,
			pr.y,
			0,
			-mr.z,
			mr.y,
			0,
			-hr.z,
			hr.y,
			pr.z,
			0,
			-pr.x,
			mr.z,
			0,
			-mr.x,
			hr.z,
			0,
			-hr.x,
			-pr.y,
			pr.x,
			0,
			-mr.y,
			mr.x,
			0,
			-hr.y,
			hr.x,
			0
		];
		return !br(t, ur, dr, fr, _r) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !br(t, ur, dr, fr, _r)) ? !1 : (vr.crossVectors(pr, mr), t = [
			vr.x,
			vr.y,
			vr.z
		], br(t, ur, dr, fr, _r));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, cr).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(cr).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() || (sr[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), sr[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), sr[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), sr[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), sr[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), sr[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), sr[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), sr[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(sr)), this;
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, sr = [
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U(),
	/*@__PURE__*/ new U()
], cr = /*@__PURE__*/ new U(), lr = /*@__PURE__*/ new or(), ur = /*@__PURE__*/ new U(), dr = /*@__PURE__*/ new U(), fr = /*@__PURE__*/ new U(), pr = /*@__PURE__*/ new U(), mr = /*@__PURE__*/ new U(), hr = /*@__PURE__*/ new U(), gr = /*@__PURE__*/ new U(), _r = /*@__PURE__*/ new U(), vr = /*@__PURE__*/ new U(), yr = /*@__PURE__*/ new U();
function br(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		yr.fromArray(e, a);
		let o = i.x * Math.abs(yr.x) + i.y * Math.abs(yr.y) + i.z * Math.abs(yr.z), s = t.dot(yr), c = n.dot(yr), l = r.dot(yr);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var xr = /*@__PURE__*/ new U(), Sr = /*@__PURE__*/ new H(), Cr = 0, wr = class extends dt {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Cr++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = $e, this.updateRanges = [], this.gpuType = E, this.version = 0, this._normalizationScale = e === void 0 ? void 0 : Ft(e);
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this._normalizationScale = e._normalizationScale, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) Sr.fromBufferAttribute(this, t), Sr.applyMatrix3(e), this.setXY(t, Sr.x, Sr.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) xr.fromBufferAttribute(this, t), xr.applyMatrix3(e), this.setXYZ(t, xr.x, xr.y, xr.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) xr.fromBufferAttribute(this, t), xr.applyMatrix4(e), this.setXYZ(t, xr.x, xr.y, xr.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) xr.fromBufferAttribute(this, t), xr.applyNormalMatrix(e), this.setXYZ(t, xr.x, xr.y, xr.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) xr.fromBufferAttribute(this, t), xr.transformDirection(e), this.setXYZ(t, xr.x, xr.y, xr.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? It(e, this.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Lt(e, this.array) : Math.round(e * t);
	}
}, Tr = class extends wr {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, Er = class extends wr {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, Dr = class extends wr {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, Or = /*@__PURE__*/ new or(), kr = /*@__PURE__*/ new U(), Ar = /*@__PURE__*/ new U(), jr = class {
	constructor(e = new U(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? Or.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		kr.subVectors(e, this.center);
		let t = kr.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(kr, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Ar.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(kr.copy(e.center).add(Ar)), this.expandByPoint(kr.copy(e.center).sub(Ar))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, Mr = 0, Nr = /*@__PURE__*/ new ln(), Pr = /*@__PURE__*/ new In(), Fr = /*@__PURE__*/ new U(), Ir = /*@__PURE__*/ new or(), Lr = /*@__PURE__*/ new or(), Rr = /*@__PURE__*/ new U(), zr = class e extends dt {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Mr++ }), this.uuid = gt(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return this.index = Array.isArray(e) ? new (tt(e) ? Er : Tr)(e, 1) : e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new W().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return Nr.makeRotationFromQuaternion(e), this.applyMatrix4(Nr), this;
	}
	rotateX(e) {
		return Nr.makeRotationX(e), this.applyMatrix4(Nr), this;
	}
	rotateY(e) {
		return Nr.makeRotationY(e), this.applyMatrix4(Nr), this;
	}
	rotateZ(e) {
		return Nr.makeRotationZ(e), this.applyMatrix4(Nr), this;
	}
	translate(e, t, n) {
		return Nr.makeTranslation(e, t, n), this.applyMatrix4(Nr), this;
	}
	scale(e, t, n) {
		return Nr.makeScale(e, t, n), this.applyMatrix4(Nr), this;
	}
	lookAt(e) {
		return Pr.lookAt(e), Pr.updateMatrix(), this.applyMatrix4(Pr.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(Fr).negate(), this.translate(Fr.x, Fr.y, Fr.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new Dr(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && z("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new or());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) B("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new U(-Infinity, -Infinity, -Infinity), new U(Infinity, Infinity, Infinity));
		else {
			if (e !== void 0) {
				if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
					let n = t[e];
					Ir.setFromBufferAttribute(n), this.morphTargetsRelative ? (Rr.addVectors(this.boundingBox.min, Ir.min), this.boundingBox.expandByPoint(Rr), Rr.addVectors(this.boundingBox.max, Ir.max), this.boundingBox.expandByPoint(Rr)) : (this.boundingBox.expandByPoint(Ir.min), this.boundingBox.expandByPoint(Ir.max));
				}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && B("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new jr());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) B("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new U(), Infinity);
		else if (e) {
			let n = this.boundingSphere.center;
			if (Ir.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				Lr.setFromBufferAttribute(n), this.morphTargetsRelative ? (Rr.addVectors(Ir.min, Lr.min), Ir.expandByPoint(Rr), Rr.addVectors(Ir.max, Lr.max), Ir.expandByPoint(Rr)) : (Ir.expandByPoint(Lr.min), Ir.expandByPoint(Lr.max));
			}
			Ir.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) Rr.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(Rr));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) Rr.fromBufferAttribute(a, t), o && (Fr.fromBufferAttribute(e, t), Rr.add(Fr)), r = Math.max(r, n.distanceToSquared(Rr));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && B("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			B("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new wr(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [], c = new Uint8Array(n.count);
		for (let e = 0; e < n.count; e++) o[e] = new U(), s[e] = new U();
		let l = new U(), u = new U(), d = new U(), f = new H(), p = new H(), m = new H(), h = new U(), g = new U();
		function _(e, t, r) {
			c[e] = c[t] = c[r] = 1, l.fromBufferAttribute(n, e), u.fromBufferAttribute(n, t), d.fromBufferAttribute(n, r), f.fromBufferAttribute(i, e), p.fromBufferAttribute(i, t), m.fromBufferAttribute(i, r), u.sub(l), d.sub(l), p.sub(f), m.sub(f);
			let a = 1 / (p.x * m.y - m.x * p.y);
			isFinite(a) && (h.copy(u).multiplyScalar(m.y).addScaledVector(d, -p.y).multiplyScalar(a), g.copy(d).multiplyScalar(p.x).addScaledVector(u, -m.x).multiplyScalar(a), o[e].add(h), o[t].add(h), o[r].add(h), s[e].add(g), s[t].add(g), s[r].add(g));
		}
		let v = this.groups;
		v.length === 0 && (v = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = v.length; t < n; ++t) {
			let n = v[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) _(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let y = new U(), b = new U(), x = new U(), S = new U();
		function C(e) {
			x.fromBufferAttribute(r, e), S.copy(x);
			let t = o[e];
			y.copy(t), y.sub(x.multiplyScalar(x.dot(t))).normalize(), b.crossVectors(S, t);
			let n = b.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, y.x, y.y, y.z, n);
		}
		for (let e = 0, t = n.count; e < t; ++e) c[e] && C(e);
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new wr(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new U(), i = new U(), a = new U(), o = new U(), s = new U(), c = new U(), l = new U(), u = new U();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) Rr.fromBufferAttribute(e, t), Rr.normalize(), e.setXYZ(t, Rr.x, Rr.y, Rr.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new wr(a, r, i);
		}
		if (this.index === null) return z("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Br = /*@__PURE__*/ new U(), Vr = /*@__PURE__*/ new U(), Hr = /*@__PURE__*/ new W(), Ur = class {
	constructor(e = new U(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = Br.subVectors(n, t).cross(Vr.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(Br), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || Hr.getNormalMatrix(e), r = this.coplanarPoint(Br).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			normal: this.normal.toArray(),
			constant: this.constant
		};
	}
	fromJSON(e) {
		return this.normal.fromArray(e.normal), this.constant = e.constant, this;
	}
}, Wr = 0, Gr = class extends dt {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Wr++ }), this.uuid = gt(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new G(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Qe, this.stencilZFail = Qe, this.stencilZPass = Qe, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				z(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? z(`Material: '${t}' is not a property of THREE.${this.type}.`) : r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.diffuseRoughness !== void 0 && (n.diffuseRoughness = this.diffuseRoughness), this.diffuseRoughnessMap && this.diffuseRoughnessMap.isTexture && (n.diffuseRoughnessMap = this.diffuseRoughnessMap.toJSON(e).uuid), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessMinimum !== void 0 && (n.iridescenceThicknessMinimum = this.iridescenceThicknessMinimum), this.iridescenceThicknessMaximum !== void 0 && (n.iridescenceThicknessMaximum = this.iridescenceThicknessMaximum), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((e) => e.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new G().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.diffuseRoughness !== void 0 && (this.diffuseRoughness = e.diffuseRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessMinimum !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum), e.iridescenceThicknessMaximum !== void 0 && (this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], this.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1]), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((e) => new Ur().fromJSON(e))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (this.vertexColors = typeof e.vertexColors == "number" ? e.vertexColors > 0 : e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new H().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new H().fromArray(e.clearcoatNormalScale)), e.diffuseRoughnessMap !== void 0 && (this.diffuseRoughnessMap = t[e.diffuseRoughnessMap] || null), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Kr = /*@__PURE__*/ new U(), qr = /*@__PURE__*/ new U(), Jr = /*@__PURE__*/ new U(), Yr = /*@__PURE__*/ new U(), Xr = class {
	constructor(e = new U(), t = new U(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, Kr)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = Kr.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (Kr.copy(this.origin).addScaledVector(this.direction, t), Kr.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		qr.copy(e).add(t).multiplyScalar(.5), Jr.copy(t).sub(e).normalize(), Yr.copy(this.origin).sub(qr);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(Jr), o = Yr.dot(this.direction), s = -Yr.dot(Jr), c = Yr.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) {
			if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) {
				if (d >= -p) {
					if (d <= p) {
						let e = 1 / l;
						u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
					} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
				} else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
			} else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		} else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(qr).addScaledVector(Jr, d), f;
	}
	intersectSphere(e, t) {
		if (e.radius < 0) return null;
		Kr.subVectors(e.center, this.origin);
		let n = Kr.dot(this.direction), r = Kr.dot(Kr) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, Kr) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		let a = this.origin, o = this.direction, s = o.x, c = o.y, l = o.z, u = e.x - a.x, d = e.y - a.y, f = e.z - a.z, p = t.x - a.x, m = t.y - a.y, h = t.z - a.z, g = n.x - a.x, _ = n.y - a.y, v = n.z - a.z, y = Math.abs(s), b = Math.abs(c), x = Math.abs(l), S, C, w, T, E, D, O, k, A, j, ee, M;
		if (y >= b && y >= x ? (w = s, D = u, A = p, M = g, s >= 0 ? (S = c, C = l, T = d, E = f, O = m, k = h, j = _, ee = v) : (S = l, C = c, T = f, E = d, O = h, k = m, j = v, ee = _)) : b >= x ? (w = c, D = d, A = m, M = _, c >= 0 ? (S = l, C = s, T = f, E = u, O = h, k = p, j = v, ee = g) : (S = s, C = l, T = u, E = f, O = p, k = h, j = g, ee = v)) : (w = l, D = f, A = h, M = v, l >= 0 ? (S = s, C = c, T = u, E = d, O = p, k = m, j = g, ee = _) : (S = c, C = s, T = d, E = u, O = m, k = p, j = _, ee = g)), w === 0) return null;
		let te = S / w, N = C / w, ne = 1 / w, re = T - te * D, ie = E - N * D, ae = O - te * A, oe = k - N * A, se = j - te * M, ce = ee - N * M, le = se * oe - ce * ae, P = re * ce - ie * se, ue = ae * ie - oe * re;
		if (r) {
			if (le < 0 || P < 0 || ue < 0) return null;
		} else if ((le < 0 || P < 0 || ue < 0) && (le > 0 || P > 0 || ue > 0)) return null;
		let de = le + P + ue;
		if (de === 0) return null;
		let fe = ne * (le * D + P * A + ue * M);
		return (de > 0 ? fe < 0 : fe > 0) ? null : this.at(fe / de, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Zr = class extends Gr {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new G(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, Qr = /*@__PURE__*/ new ln(), $r = /*@__PURE__*/ new Xr(), ei = /*@__PURE__*/ new jr(), ti = /*@__PURE__*/ new U(), ni = /*@__PURE__*/ new U(), ri = /*@__PURE__*/ new U(), ii = /*@__PURE__*/ new U(), ai = /*@__PURE__*/ new U(), oi = /*@__PURE__*/ new U(), si = /*@__PURE__*/ new U(), ci = /*@__PURE__*/ new U(), K = class extends In {
	constructor(e = new zr(), t = new Zr()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			oi.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (ai.fromBufferAttribute(s, e), a ? oi.addScaledVector(ai, r) : oi.addScaledVector(ai.sub(t), r));
			}
			t.add(oi);
		}
		return t;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), ei.copy(n.boundingSphere), ei.applyMatrix4(i), $r.copy(e.ray).recast(e.near), ei.containsPoint($r.origin) === !1 && ($r.intersectSphere(ei, ti) === null || $r.origin.distanceToSquared(ti) > (e.far - e.near) ** 2) || (Qr.copy(i).invert(), $r.copy(e.ray).applyMatrix4(Qr), (n.boundingBox === null || $r.intersectsBox(n.boundingBox) !== !1) && this._computeIntersections(e, t, $r)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) {
			if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
				let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
					r = ui(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
				for (let d = i, f = s; d < f; d += 3) {
					let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
					r = ui(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
				}
			}
		} else if (s !== void 0) {
			if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
				let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = i, s = i + 1, d = i + 2;
					r = ui(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
				for (let s = i, d = o; s < d; s += 3) {
					let i = s, o = s + 1, d = s + 2;
					r = ui(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
				}
			}
		}
	}
};
function li(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	ci.copy(s), ci.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(ci);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: ci.clone(),
		object: e
	};
}
function ui(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, ni), e.getVertexPosition(c, ri), e.getVertexPosition(l, ii);
	let u = li(e, t, n, r, ni, ri, ii, si);
	if (u) {
		let e = new U();
		ar.getBarycoord(si, ni, ri, ii, e), i && (u.uv = ar.getInterpolatedAttribute(i, s, c, l, e, new H())), a && (u.uv1 = ar.getInterpolatedAttribute(a, s, c, l, e, new H())), o && (u.normal = ar.getInterpolatedAttribute(o, s, c, l, e, new U()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new U(),
			materialIndex: 0
		};
		ar.getNormal(ni, ri, ii, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var di = class extends nn {
	constructor(e = null, t = 1, n = 1, r, i, a, o, s, c = m, l = m, u, d) {
		super(null, a, o, s, c, l, r, i, u, d), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, fi = class extends wr {
	constructor(e, t, n, r = 1) {
		super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
	}
	copy(e) {
		return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
	}
}, pi = /*@__PURE__*/ new ln(), mi = /*@__PURE__*/ new ln(), hi = [], gi = /*@__PURE__*/ new or(), _i = /*@__PURE__*/ new ln(), vi = /*@__PURE__*/ new K(), yi = /*@__PURE__*/ new jr(), bi = class extends K {
	constructor(e, t, n) {
		super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new fi(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
		for (let e = 0; e < n; e++) this.setMatrixAt(e, _i);
	}
	computeBoundingBox() {
		let e = this.geometry, t = this.count;
		this.boundingBox === null && (this.boundingBox = new or()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, pi), gi.copy(e.boundingBox).applyMatrix4(pi), this.boundingBox.union(gi);
	}
	computeBoundingSphere() {
		let e = this.geometry, t = this.count;
		this.boundingSphere === null && (this.boundingSphere = new jr()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, pi), yi.copy(e.boundingSphere).applyMatrix4(pi), this.boundingSphere.union(yi);
	}
	copy(e, t) {
		return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), this.morphTexture = e.morphTexture === null ? null : e.morphTexture.clone(), this.instanceColor = e.instanceColor === null ? null : e.instanceColor.clone(), this.count = e.count, this.boundingBox = e.boundingBox === null ? null : e.boundingBox.clone(), this.boundingSphere = e.boundingSphere === null ? null : e.boundingSphere.clone(), this;
	}
	getColorAt(e, t) {
		return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		return t.fromArray(this.instanceMatrix.array, e * 16);
	}
	getMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1;
		for (let e = 0; e < n.length; e++) n[e] = r[i + e];
	}
	raycast(e, t) {
		let n = this.matrixWorld, r = this.count;
		if (vi.geometry = this.geometry, vi.material = this.material, vi.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), yi.copy(this.boundingSphere), yi.applyMatrix4(n), e.ray.intersectsSphere(yi) !== !1)) for (let i = 0; i < r; i++) {
			this.getMatrixAt(i, pi), mi.multiplyMatrices(n, pi), vi.matrixWorld = mi, vi.raycast(e, hi);
			for (let e = 0, n = hi.length; e < n; e++) {
				let n = hi[e];
				n.instanceId = i, n.object = this, t.push(n);
			}
			hi.length = 0;
		}
	}
	setColorAt(e, t) {
		return this.instanceColor === null && (this.instanceColor = new fi(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
	}
	setMatrixAt(e, t) {
		return t.toArray(this.instanceMatrix.array, e * 16), this;
	}
	setMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = n.length + 1;
		this.morphTexture === null && (this.morphTexture = new di(new Float32Array(r * this.count), r, this.count, ie, E));
		let i = this.morphTexture.source.data.data, a = 0;
		for (let e = 0; e < n.length; e++) a += n[e];
		let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e;
		return i[s] = o, i.set(n, s + 1), this;
	}
	updateMorphTargets() {}
	dispose() {
		super.dispose(), this.instanceMatrix.dispose(), this.instanceColor !== null && this.instanceColor.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
	}
}, xi = /*@__PURE__*/ new jr(), Si = /*@__PURE__*/ new H(.5, .5), Ci = /*@__PURE__*/ new U(), wi = class {
	constructor(e = new Ur(), t = new Ur(), n = new Ur(), r = new Ur(), i = new Ur(), a = new Ur()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = et, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(xi);
	}
	intersectsSprite(e) {
		return xi.center.set(0, 0, 0), xi.radius = .7071067811865476 + Si.distanceTo(e.center), xi.applyMatrix4(e.matrixWorld), this.intersectsSphere(xi);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (Ci.x = r.normal.x > 0 ? e.max.x : e.min.x, Ci.y = r.normal.y > 0 ? e.max.y : e.min.y, Ci.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Ci) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Ti = /*@__PURE__*/ new ln(), Ei = class e {
	constructor() {
		this.coordinateSystem = et, this._frustums = [], this._count = 0;
	}
	setFromArrayCamera(e) {
		let t = e.cameras, n = this._frustums;
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			Ti.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), n[e] === void 0 && (n[e] = new wi()), n[e].setFromProjectionMatrix(Ti, r.coordinateSystem, r.reversedDepth);
		}
		return this._count = t.length, this;
	}
	getFrustum(e) {
		return this._frustums[e];
	}
	intersectsObject(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsObject(e)) return !0;
		return !1;
	}
	intersectsSprite(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSprite(e)) return !0;
		return !1;
	}
	intersectsSphere(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSphere(e)) return !0;
		return !1;
	}
	intersectsBox(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsBox(e)) return !0;
		return !1;
	}
	containsPoint(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].containsPoint(e)) return !0;
		return !1;
	}
	copy(e) {
		this.coordinateSystem = e.coordinateSystem;
		let t = this._frustums, n = e._frustums;
		for (let r = 0; r < e._count; r++) t[r] === void 0 && (t[r] = new wi()), t[r].copy(n[r]);
		return this._count = e._count, this;
	}
	clone() {
		return new e().copy(this);
	}
}, Di = class extends nn {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, Oi = class extends nn {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r, i, a, o, s, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, ki = class extends nn {
	constructor(e, t, n = T, r, i, a, o = m, s = m, c, l = ne, u = 1) {
		if (l !== 1026 && l !== 1027) throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: u
		}, r, i, a, o, s, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new Qt(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.compareFunction = this.compareFunction, t;
	}
}, Ai = class extends ki {
	constructor(e, t = T, n = 301, r, i, a = m, o = m, s, c = ne) {
		let l = {
			width: e,
			height: e,
			depth: 1
		}, u = [
			l,
			l,
			l,
			l,
			l,
			l
		];
		super(e, e, t, n, r, i, a, o, s, c), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, ji = class extends nn {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, Mi = class e extends zr {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new Dr(c, 3)), this.setAttribute("normal", new Dr(l, 3)), this.setAttribute("uv", new Dr(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new U();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, Ni = class e extends zr {
	constructor(e = 1, t = 1, n = 4, r = 8, i = 1) {
		super(), this.type = "CapsuleGeometry", this.parameters = {
			radius: e,
			height: t,
			capSegments: n,
			radialSegments: r,
			heightSegments: i
		}, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), i = Math.max(1, Math.floor(i));
		let a = [], o = [], s = [], c = [], l = t / 2, u = Math.PI / 2 * e, d = t, f = 2 * u + d, p = n * 2 + i, m = r + 1, h = new U(), g = new U();
		for (let _ = 0; _ <= p; _++) {
			let v = 0, y = 0, b = 0, x = 0;
			if (_ <= n) {
				let t = _ / n, r = t * Math.PI / 2;
				y = -l - e * Math.cos(r), b = e * Math.sin(r), x = -e * Math.cos(r), v = t * u;
			} else if (_ <= n + i) {
				let r = (_ - n) / i;
				y = -l + r * t, b = e, x = 0, v = u + r * d;
			} else {
				let t = (_ - n - i) / n, r = t * Math.PI / 2;
				y = l + e * Math.sin(r), b = e * Math.cos(r), x = e * Math.sin(r), v = u + d + t * u;
			}
			let S = Math.max(0, Math.min(1, v / f)), C = 0;
			_ === 0 ? C = .5 / r : _ === p && (C = -.5 / r);
			for (let e = 0; e <= r; e++) {
				let t = e / r, n = t * Math.PI * 2, i = Math.sin(n), a = Math.cos(n);
				g.x = -b * a, g.y = y, g.z = b * i, o.push(g.x, g.y, g.z), h.set(-b * a, x, b * i), h.normalize(), s.push(h.x, h.y, h.z), c.push(t + C, S);
			}
			if (_ > 0) {
				let e = (_ - 1) * m;
				for (let t = 0; t < r; t++) {
					let n = e + t, r = e + t + 1, i = _ * m + t, o = _ * m + t + 1;
					a.push(n, r, i), a.push(r, o, i);
				}
			}
		}
		this.setIndex(a), this.setAttribute("position", new Dr(o, 3)), this.setAttribute("normal", new Dr(s, 3)), this.setAttribute("uv", new Dr(c, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
	}
}, Pi = class e extends zr {
	constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
		super(), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: r
		}, t = Math.max(3, t);
		let i = [], a = [], o = [], s = [], c = new U(), l = new H();
		a.push(0, 0, 0), o.push(0, 0, 1), s.push(.5, .5);
		for (let i = 0, u = 3; i <= t; i++, u += 3) {
			let d = n + i / t * r;
			c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), o.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, s.push(l.x, l.y);
		}
		for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
		this.setIndex(i), this.setAttribute("position", new Dr(a, 3)), this.setAttribute("normal", new Dr(o, 3)), this.setAttribute("uv", new Dr(s, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
	}
}, Fi = class e extends zr {
	constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, o = 0, s = Math.PI * 2) {
		super(), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: r,
			heightSegments: i,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		let c = this;
		r = Math.floor(r), i = Math.floor(i);
		let l = [], u = [], d = [], f = [], p = 0, m = [], h = n / 2, g = 0;
		_(), a === !1 && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(l), this.setAttribute("position", new Dr(u, 3)), this.setAttribute("normal", new Dr(d, 3)), this.setAttribute("uv", new Dr(f, 2));
		function _() {
			let a = new U(), _ = new U(), v = 0, y = (t - e) / n;
			for (let c = 0; c <= i; c++) {
				let l = [], g = c / i, v = g * (t - e) + e;
				for (let e = 0; e <= r; e++) {
					let t = e / r, i = t * s + o, c = Math.sin(i), m = Math.cos(i);
					_.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), d.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
				}
				m.push(l);
			}
			for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
				let a = m[r][n], o = m[r + 1][n], s = m[r + 1][n + 1], c = m[r][n + 1];
				(e > 0 || r !== 0) && (l.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (l.push(o, s, c), v += 3);
			}
			c.addGroup(g, v, 0), g += v;
		}
		function v(n) {
			let i = p, a = new H(), m = new U(), _ = 0, v = n === !0 ? e : t, y = n === !0 ? 1 : -1;
			for (let e = 1; e <= r; e++) u.push(0, h * y, 0), d.push(0, y, 0), f.push(.5, .5), p++;
			let b = p;
			for (let e = 0; e <= r; e++) {
				let t = e / r * s + o, n = Math.cos(t), i = Math.sin(t);
				m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), d.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
			}
			for (let e = 0; e < r; e++) {
				let t = i + e, r = b + e;
				n === !0 ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
			}
			c.addGroup(g, _, n === !0 ? 1 : 2), g += _;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, Ii = class {
	constructor() {
		this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
	}
	getPoint() {
		z("Curve: .getPoint() not implemented.");
	}
	getPointAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getPoint(n, t);
	}
	getPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return t;
	}
	getSpacedPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
		return t;
	}
	getLength() {
		let e = this.getLengths();
		return e[e.length - 1];
	}
	getLengths(e = this.arcLengthDivisions) {
		if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
		this.needsUpdate = !1;
		let t = [], n, r = this.getPoint(0), i = 0;
		t.push(0);
		for (let a = 1; a <= e; a++) n = this.getPoint(a / e), i += n.distanceTo(r), t.push(i), r = n;
		return this.cacheArcLengths = t, t;
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.getLengths();
	}
	getUtoTmapping(e, t = null) {
		let n = this.getLengths(), r = 0, i = n.length, a;
		a = t || e * n[i - 1];
		let o = 0, s = i - 1, c;
		for (; o <= s;) if (r = Math.floor(o + (s - o) / 2), c = n[r] - a, c < 0) o = r + 1;
		else if (c > 0) s = r - 1;
		else {
			s = r;
			break;
		}
		if (r = s, n[r] === a) return r / (i - 1);
		let l = n[r], u = n[r + 1] - l, d = (a - l) / u;
		return (r + d) / (i - 1);
	}
	getTangent(e, t) {
		let n = 1e-4, r = e - n, i = e + n;
		r < 0 && (r = 0), i > 1 && (i = 1);
		let a = this.getPoint(r), o = this.getPoint(i), s = t || (a.isVector2 ? new H() : new U());
		return s.copy(o).sub(a).normalize(), s;
	}
	getTangentAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getTangent(n, t);
	}
	computeFrenetFrames(e, t = !1) {
		let n = new U(), r = [], i = [], a = [], o = new U(), s = new ln();
		for (let t = 0; t <= e; t++) {
			let n = t / e;
			r[t] = this.getTangentAt(n, new U());
		}
		i[0] = new U(), a[0] = new U();
		let c = Number.MAX_VALUE, l = Math.abs(r[0].x), u = Math.abs(r[0].y), d = Math.abs(r[0].z);
		l <= c && (c = l, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), i[0].crossVectors(r[0], o), a[0].crossVectors(r[0], i[0]);
		for (let t = 1; t <= e; t++) {
			if (i[t] = i[t - 1].clone(), a[t] = a[t - 1].clone(), o.crossVectors(r[t - 1], r[t]), o.length() > 2 ** -52) {
				o.normalize();
				let e = Math.acos(V(r[t - 1].dot(r[t]), -1, 1));
				i[t].applyMatrix4(s.makeRotationAxis(o, e));
			}
			a[t].crossVectors(r[t], i[t]);
		}
		if (t === !0) {
			let t = Math.acos(V(i[0].dot(i[e]), -1, 1));
			t /= e, r[0].dot(o.crossVectors(i[0], i[e])) > 0 && (t = -t);
			for (let n = 1; n <= e; n++) i[n].applyMatrix4(s.makeRotationAxis(r[n], t * n)), a[n].crossVectors(r[n], i[n]);
		}
		return {
			tangents: r,
			normals: i,
			binormals: a
		};
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this.cacheArcLengths = null, this;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "Curve",
			generator: "Curve.toJSON"
		} };
		return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
	}
	fromJSON(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this.cacheArcLengths = null, this;
	}
}, Li = class extends Ii {
	constructor(e = 0, t = 0, n = 1, r = 1, i = 0, a = Math.PI * 2, o = !1, s = 0) {
		super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = r, this.aStartAngle = i, this.aEndAngle = a, this.aClockwise = o, this.aRotation = s;
	}
	getPoint(e, t = new H()) {
		let n = t, r = Math.PI * 2, i = this.aEndAngle - this.aStartAngle, a = Math.abs(i) < 2 ** -52;
		for (; i < 0;) i += r;
		for (; i > r;) i -= r;
		i < 2 ** -52 && (i = a ? 0 : r), this.aClockwise === !0 && !a && (i === r ? i = -r : i -= r);
		let o = this.aStartAngle + e * i, s = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
		if (this.aRotation !== 0) {
			let e = Math.cos(this.aRotation), t = Math.sin(this.aRotation), n = s - this.aX, r = c - this.aY;
			s = n * e - r * t + this.aX, c = n * t + r * e + this.aY;
		}
		return n.set(s, c);
	}
	copy(e) {
		return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
}, Ri = class extends Li {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, n, r, i, a), this.isArcCurve = !0, this.type = "ArcCurve";
	}
};
function zi() {
	let e = 0, t = 0, n = 0, r = 0;
	function i(i, a, o, s) {
		e = i, t = o, n = -3 * i + 3 * a - 2 * o - s, r = 2 * i - 2 * a + o + s;
	}
	return {
		initCatmullRom: function(e, t, n, r, a) {
			i(t, n, a * (n - e), a * (r - t));
		},
		initNonuniformCatmullRom: function(e, t, n, r, a, o, s) {
			let c = (t - e) / a - (n - e) / (a + o) + (n - t) / o, l = (n - t) / o - (r - t) / (o + s) + (r - n) / s;
			c *= o, l *= o, i(t, n, c, l);
		},
		calc: function(i) {
			let a = i * i, o = a * i;
			return e + t * i + n * a + r * o;
		}
	};
}
var Bi = /*@__PURE__*/ new U(), Vi = /*@__PURE__*/ new U(), Hi = /*@__PURE__*/ new zi(), Ui = /*@__PURE__*/ new zi(), Wi = /*@__PURE__*/ new zi(), Gi = class extends Ii {
	constructor(e = [], t = !1, n = "centripetal", r = .5) {
		super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = r;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.points, i = r.length, a = (i - +!this.closed) * e, o = Math.floor(a), s = a - o;
		this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / i) + 1) * i : s === 0 && o === i - 1 && (o = i - 2, s = 1);
		let c, l;
		this.closed || o > 0 ? c = r[(o - 1) % i] : (Vi.subVectors(r[0], r[1]).add(r[0]), c = Vi);
		let u = r[o % i], d = r[(o + 1) % i];
		if (this.closed || o + 2 < i ? l = r[(o + 2) % i] : (Bi.subVectors(r[i - 1], r[i - 2]).add(r[i - 1]), l = Bi), this.curveType === "centripetal" || this.curveType === "chordal") {
			let e = this.curveType === "chordal" ? .5 : .25, t = c.distanceToSquared(u) ** +e, n = u.distanceToSquared(d) ** +e, r = d.distanceToSquared(l) ** +e;
			n < 1e-4 && (n = 1), t < 1e-4 && (t = n), r < 1e-4 && (r = n), Hi.initNonuniformCatmullRom(c.x, u.x, d.x, l.x, t, n, r), Ui.initNonuniformCatmullRom(c.y, u.y, d.y, l.y, t, n, r), Wi.initNonuniformCatmullRom(c.z, u.z, d.z, l.z, t, n, r);
		} else this.curveType === "catmullrom" && (Hi.initCatmullRom(c.x, u.x, d.x, l.x, this.tension), Ui.initCatmullRom(c.y, u.y, d.y, l.y, this.tension), Wi.initCatmullRom(c.z, u.z, d.z, l.z, this.tension));
		return n.set(Hi.calc(s), Ui.calc(s), Wi.calc(s)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new U().fromArray(n));
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
};
function Ki(e, t, n, r, i) {
	let a = (r - t) * .5, o = (i - n) * .5, s = e * e, c = e * s;
	return (2 * n - 2 * r + a + o) * c + (-3 * n + 3 * r - 2 * a - o) * s + a * e + n;
}
function qi(e, t) {
	let n = 1 - e;
	return n * n * t;
}
function Ji(e, t) {
	return 2 * (1 - e) * e * t;
}
function Yi(e, t) {
	return e * e * t;
}
function Xi(e, t, n, r) {
	return qi(e, t) + Ji(e, n) + Yi(e, r);
}
function Zi(e, t) {
	let n = 1 - e;
	return n * n * n * t;
}
function Qi(e, t) {
	let n = 1 - e;
	return 3 * n * n * e * t;
}
function $i(e, t) {
	return 3 * (1 - e) * e * e * t;
}
function ea(e, t) {
	return e * e * e * t;
}
function ta(e, t, n, r, i) {
	return Zi(e, t) + Qi(e, n) + $i(e, r) + ea(e, i);
}
var na = class extends Ii {
	constructor(e = new H(), t = new H(), n = new H(), r = new H()) {
		super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new H()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(ta(e, r.x, i.x, a.x, o.x), ta(e, r.y, i.y, a.y, o.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, ra = class extends Ii {
	constructor(e = new U(), t = new U(), n = new U(), r = new U()) {
		super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(ta(e, r.x, i.x, a.x, o.x), ta(e, r.y, i.y, a.y, o.y), ta(e, r.z, i.z, a.z, o.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, ia = class extends Ii {
	constructor(e = new H(), t = new H()) {
		super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new H()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new H()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, aa = class extends Ii {
	constructor(e = new U(), t = new U()) {
		super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new U()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new U()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, oa = class extends Ii {
	constructor(e = new H(), t = new H(), n = new H()) {
		super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new H()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Xi(e, r.x, i.x, a.x), Xi(e, r.y, i.y, a.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, sa = class extends Ii {
	constructor(e = new U(), t = new U(), n = new U()) {
		super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Xi(e, r.x, i.x, a.x), Xi(e, r.y, i.y, a.y), Xi(e, r.z, i.z, a.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, ca = class extends Ii {
	constructor(e = []) {
		super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
	}
	getPoint(e, t = new H()) {
		let n = t, r = this.points, i = (r.length - 1) * e, a = Math.floor(i), o = i - a, s = r[a === 0 ? a : a - 1], c = r[a], l = r[a > r.length - 2 ? r.length - 1 : a + 1], u = r[a > r.length - 3 ? r.length - 1 : a + 2];
		return n.set(Ki(o, s.x, c.x, l.x, u.x), Ki(o, s.y, c.y, l.y, u.y)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new H().fromArray(n));
		}
		return this;
	}
}, la = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ArcCurve: Ri,
	CatmullRomCurve3: Gi,
	CubicBezierCurve: na,
	CubicBezierCurve3: ra,
	EllipseCurve: Li,
	LineCurve: ia,
	LineCurve3: aa,
	QuadraticBezierCurve: oa,
	QuadraticBezierCurve3: sa,
	SplineCurve: ca
}), ua = class extends Ii {
	constructor() {
		super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1, this.cacheLengths = null;
	}
	add(e) {
		this.curves.push(e);
	}
	closePath() {
		let e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
		if (!e.equals(t)) {
			let n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
			this.curves.push(new la[n](t, e));
		}
		return this;
	}
	getPoint(e, t) {
		let n = e * this.getLength(), r = this.getCurveLengths(), i = 0;
		for (; i < r.length;) {
			if (r[i] >= n) {
				let e = r[i] - n, a = this.curves[i], o = a.getLength(), s = o === 0 ? 0 : 1 - e / o;
				return a.getPointAt(s, t);
			}
			i++;
		}
		return null;
	}
	getLength() {
		let e = this.getCurveLengths();
		return e[e.length - 1];
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
	}
	getCurveLengths() {
		if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
		let e = [], t = 0;
		for (let n = 0, r = this.curves.length; n < r; n++) t += this.curves[n].getLength(), e.push(t);
		return this.cacheLengths = e, e;
	}
	getSpacedPoints(e = 40) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return this.autoClose && t.push(t[0]), t;
	}
	getPoints(e = 12) {
		let t = [], n;
		for (let r = 0, i = this.curves; r < i.length; r++) {
			let a = i[r], o = a.isEllipseCurve ? e * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? e * a.points.length : e, s = a.getPoints(o);
			for (let e = 0; e < s.length; e++) {
				let r = s[e];
				n && n.equals(r) || (t.push(r), n = r);
			}
		}
		return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
	}
	copy(e) {
		super.copy(e), this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(n.clone());
		}
		return this.autoClose = e.autoClose, this.cacheLengths = null, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.autoClose = this.autoClose, e.curves = [];
		for (let t = 0, n = this.curves.length; t < n; t++) {
			let n = this.curves[t];
			e.curves.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(new la[n.type]().fromJSON(n));
		}
		return this.cacheLengths = null, this;
	}
}, da = class extends ua {
	constructor(e) {
		super(), this.type = "Path", this.currentPoint = new H(), e && this.setFromPoints(e);
	}
	setFromPoints(e) {
		this.moveTo(e[0].x, e[0].y);
		for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
		return this;
	}
	moveTo(e, t) {
		return this.currentPoint.set(e, t), this;
	}
	lineTo(e, t) {
		let n = new ia(this.currentPoint.clone(), new H(e, t));
		return this.curves.push(n), this.currentPoint.set(e, t), this;
	}
	quadraticCurveTo(e, t, n, r) {
		let i = new oa(this.currentPoint.clone(), new H(e, t), new H(n, r));
		return this.curves.push(i), this.currentPoint.set(n, r), this;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		let o = new na(this.currentPoint.clone(), new H(e, t), new H(n, r), new H(i, a));
		return this.curves.push(o), this.currentPoint.set(i, a), this;
	}
	splineThru(e) {
		let t = new ca([this.currentPoint.clone()].concat(e));
		return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this;
	}
	arc(e, t, n, r, i, a) {
		let o = this.currentPoint.x, s = this.currentPoint.y;
		return this.absarc(e + o, t + s, n, r, i, a), this;
	}
	absarc(e, t, n, r, i, a) {
		return this.absellipse(e, t, n, n, r, i, a), this;
	}
	ellipse(e, t, n, r, i, a, o, s) {
		let c = this.currentPoint.x, l = this.currentPoint.y;
		return this.absellipse(e + c, t + l, n, r, i, a, o, s), this;
	}
	absellipse(e, t, n, r, i, a, o, s) {
		let c = new Li(e, t, n, r, i, a, o, s);
		if (this.curves.length > 0) {
			let e = c.getPoint(0);
			e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
		}
		this.curves.push(c);
		let l = c.getPoint(1);
		return this.currentPoint.copy(l), this;
	}
	copy(e) {
		return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.currentPoint = this.currentPoint.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
	}
}, fa = class extends da {
	constructor(e) {
		super(e), this.uuid = gt(), this.type = "Shape", this.holes = [];
	}
	getPointsHoles(e) {
		let t = [];
		for (let n = 0, r = this.holes.length; n < r; n++) t[n] = this.holes[n].getPoints(e);
		return t;
	}
	extractPoints(e) {
		return {
			shape: this.getPoints(e),
			holes: this.getPointsHoles(e)
		};
	}
	copy(e) {
		super.copy(e), this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.uuid = this.uuid, e.holes = [];
		for (let t = 0, n = this.holes.length; t < n; t++) {
			let n = this.holes[t];
			e.holes.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(new da().fromJSON(n));
		}
		return this;
	}
};
function pa(e, t, n = 2) {
	let r = t && t.length, i = r ? t[0] * n : e.length, a = ma(e, 0, i, n, !0), o = [];
	if (!a || a.next === a.prev) return o;
	let s, c, l;
	if (r && (a = xa(e, t, a, n)), e.length > 80 * n) {
		s = e[0], c = e[1];
		let t = s, r = c;
		for (let a = n; a < i; a += n) {
			let n = e[a], i = e[a + 1];
			n < s && (s = n), i < c && (c = i), n > t && (t = n), i > r && (r = i);
		}
		l = Math.max(t - s, r - c), l = l === 0 ? 0 : 32767 / l;
	}
	return ga(a, o, n, s, c, l, 0), o;
}
function ma(e, t, n, r, i) {
	let a;
	if (i === Ga(e, t, n, r) > 0) for (let i = t; i < n; i += r) a = Ha(i / r | 0, e[i], e[i + 1], a);
	else for (let i = n - r; i >= t; i -= r) a = Ha(i / r | 0, e[i], e[i + 1], a);
	return a && Pa(a, a.next) && (Ua(a), a = a.next), a;
}
function ha(e, t) {
	if (!e) return e;
	t || (t = e);
	let n = e, r;
	do
		if (r = !1, !n.steiner && (Pa(n, n.next) || Na(n.prev, n, n.next) === 0)) {
			if (Ua(n), n = t = n.prev, n === n.next) break;
			r = !0;
		} else n = n.next;
	while (r || n !== t);
	return t;
}
function ga(e, t, n, r, i, a, o) {
	if (!e) return;
	!o && a && Ea(e, r, i, a);
	let s = e;
	for (; e.prev !== e.next;) {
		let c = e.prev, l = e.next;
		if (a ? va(e, r, i, a) : _a(e)) t.push(c.i, e.i, l.i), Ua(e), e = l.next, s = l.next;
		else if (e = l, e === s) {
			o ? o === 1 ? (e = ya(ha(e), t), ga(e, t, n, r, i, a, 2)) : o === 2 && ba(e, t, n, r, i, a) : ga(ha(e), t, n, r, i, a, 1);
			break;
		}
	}
}
function _a(e) {
	let t = e.prev, n = e, r = e.next;
	if (Na(t, n, r) >= 0) return !1;
	let i = t.x, a = n.x, o = r.x, s = t.y, c = n.y, l = r.y, u = Math.min(i, a, o), d = Math.min(s, c, l), f = Math.max(i, a, o), p = Math.max(s, c, l), m = r.next;
	for (; m !== t;) {
		if (m.x >= u && m.x <= f && m.y >= d && m.y <= p && ja(i, s, a, c, o, l, m.x, m.y) && Na(m.prev, m, m.next) >= 0) return !1;
		m = m.next;
	}
	return !0;
}
function va(e, t, n, r) {
	let i = e.prev, a = e, o = e.next;
	if (Na(i, a, o) >= 0) return !1;
	let s = i.x, c = a.x, l = o.x, u = i.y, d = a.y, f = o.y, p = Math.min(s, c, l), m = Math.min(u, d, f), h = Math.max(s, c, l), g = Math.max(u, d, f), _ = Oa(p, m, t, n, r), v = Oa(h, g, t, n, r), y = e.prevZ, b = e.nextZ;
	for (; y && y.z >= _ && b && b.z <= v;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && ja(s, u, c, d, l, f, y.x, y.y) && Na(y.prev, y, y.next) >= 0 || (y = y.prevZ, b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && ja(s, u, c, d, l, f, b.x, b.y) && Na(b.prev, b, b.next) >= 0)) return !1;
		b = b.nextZ;
	}
	for (; y && y.z >= _;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && ja(s, u, c, d, l, f, y.x, y.y) && Na(y.prev, y, y.next) >= 0) return !1;
		y = y.prevZ;
	}
	for (; b && b.z <= v;) {
		if (b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && ja(s, u, c, d, l, f, b.x, b.y) && Na(b.prev, b, b.next) >= 0) return !1;
		b = b.nextZ;
	}
	return !0;
}
function ya(e, t) {
	let n = e;
	do {
		let r = n.prev, i = n.next.next;
		!Pa(r, i) && Fa(r, n, n.next, i) && za(r, i) && za(i, r) && (t.push(r.i, n.i, i.i), Ua(n), Ua(n.next), n = e = i), n = n.next;
	} while (n !== e);
	return ha(n);
}
function ba(e, t, n, r, i, a) {
	let o = e;
	do {
		let e = o.next.next;
		for (; e !== o.prev;) {
			if (o.i !== e.i && Ma(o, e)) {
				let s = Va(o, e);
				o = ha(o, o.next), s = ha(s, s.next), ga(o, t, n, r, i, a, 0), ga(s, t, n, r, i, a, 0);
				return;
			}
			e = e.next;
		}
		o = o.next;
	} while (o !== e);
}
function xa(e, t, n, r) {
	let i = [];
	for (let n = 0, a = t.length; n < a; n++) {
		let o = ma(e, t[n] * r, n < a - 1 ? t[n + 1] * r : e.length, r, !1);
		o === o.next && (o.steiner = !0), i.push(ka(o));
	}
	i.sort(Sa);
	for (let e = 0; e < i.length; e++) n = Ca(i[e], n);
	return n;
}
function Sa(e, t) {
	let n = e.x - t.x;
	return n === 0 && (n = e.y - t.y, n === 0 && (n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x))), n;
}
function Ca(e, t) {
	let n = wa(e, t);
	if (!n) return t;
	let r = Va(n, e);
	return ha(r, r.next), ha(n, n.next);
}
function wa(e, t) {
	let n = t, r = e.x, i = e.y, a = -Infinity, o;
	if (Pa(e, n)) return n;
	do {
		if (Pa(e, n.next)) return n.next;
		if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
			let e = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
			if (e <= r && e > a && (a = e, o = n.x < n.next.x ? n : n.next, e === r)) return o;
		}
		n = n.next;
	} while (n !== t);
	if (!o) return null;
	let s = o, c = o.x, l = o.y, u = Infinity;
	n = o;
	do {
		if (r >= n.x && n.x >= c && r !== n.x && Aa(i < l ? r : a, i, c, l, i < l ? a : r, i, n.x, n.y)) {
			let t = Math.abs(i - n.y) / (r - n.x);
			za(n, e) && (t < u || t === u && (n.x > o.x || n.x === o.x && Ta(o, n))) && (o = n, u = t);
		}
		n = n.next;
	} while (n !== s);
	return o;
}
function Ta(e, t) {
	return Na(e.prev, e, t.prev) < 0 && Na(t.next, e, e.next) < 0;
}
function Ea(e, t, n, r) {
	let i = e;
	do
		i.z === 0 && (i.z = Oa(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
	while (i !== e);
	i.prevZ.nextZ = null, i.prevZ = null, Da(i);
}
function Da(e) {
	let t, n = 1;
	do {
		let r = e, i;
		e = null;
		let a = null;
		for (t = 0; r;) {
			t++;
			let o = r, s = 0;
			for (let e = 0; e < n && (s++, o = o.nextZ, o); e++);
			let c = n;
			for (; s > 0 || c > 0 && o;) s !== 0 && (c === 0 || !o || r.z <= o.z) ? (i = r, r = r.nextZ, s--) : (i = o, o = o.nextZ, c--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
			r = o;
		}
		a.nextZ = null, n *= 2;
	} while (t > 1);
	return e;
}
function Oa(e, t, n, r, i) {
	return e = (e - n) * i | 0, t = (t - r) * i | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function ka(e) {
	let t = e, n = e;
	do
		(t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
	while (t !== e);
	return n;
}
function Aa(e, t, n, r, i, a, o, s) {
	return (i - o) * (t - s) >= (e - o) * (a - s) && (e - o) * (r - s) >= (n - o) * (t - s) && (n - o) * (a - s) >= (i - o) * (r - s);
}
function ja(e, t, n, r, i, a, o, s) {
	return (e !== o || t !== s) && Aa(e, t, n, r, i, a, o, s);
}
function Ma(e, t) {
	return e.next.i !== t.i && e.prev.i !== t.i && !Ra(e, t) && (za(e, t) && za(t, e) && Ba(e, t) && (Na(e.prev, e, t.prev) || Na(e, t.prev, t)) || Pa(e, t) && Na(e.prev, e, e.next) > 0 && Na(t.prev, t, t.next) > 0);
}
function Na(e, t, n) {
	return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function Pa(e, t) {
	return e.x === t.x && e.y === t.y;
}
function Fa(e, t, n, r) {
	let i = La(Na(e, t, n)), a = La(Na(e, t, r)), o = La(Na(n, r, e)), s = La(Na(n, r, t));
	return !!(i !== a && o !== s || i === 0 && Ia(e, n, t) || a === 0 && Ia(e, r, t) || o === 0 && Ia(n, e, r) || s === 0 && Ia(n, t, r));
}
function Ia(e, t, n) {
	return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function La(e) {
	return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Ra(e, t) {
	let n = e;
	do {
		if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Fa(n, n.next, e, t)) return !0;
		n = n.next;
	} while (n !== e);
	return !1;
}
function za(e, t) {
	return Na(e.prev, e, e.next) < 0 ? Na(e, t, e.next) >= 0 && Na(e, e.prev, t) >= 0 : Na(e, t, e.prev) < 0 || Na(e, e.next, t) < 0;
}
function Ba(e, t) {
	let n = e, r = !1, i = (e.x + t.x) / 2, a = (e.y + t.y) / 2;
	do
		n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
	while (n !== e);
	return r;
}
function Va(e, t) {
	let n = Wa(e.i, e.x, e.y), r = Wa(t.i, t.x, t.y), i = e.next, a = t.prev;
	return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
}
function Ha(e, t, n, r) {
	let i = Wa(e, t, n);
	return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
}
function Ua(e) {
	e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Wa(e, t, n) {
	return {
		i: e,
		x: t,
		y: n,
		prev: null,
		next: null,
		z: 0,
		prevZ: null,
		nextZ: null,
		steiner: !1
	};
}
function Ga(e, t, n, r) {
	let i = 0;
	for (let a = t, o = n - r; a < n; a += r) i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
	return i;
}
var Ka = class {
	static triangulate(e, t, n = 2) {
		return pa(e, t, n);
	}
}, qa = class e {
	static area(e) {
		let t = e.length, n = 0;
		for (let r = t - 1, i = 0; i < t; r = i++) n += e[r].x * e[i].y - e[i].x * e[r].y;
		return n * .5;
	}
	static isClockWise(t) {
		return e.area(t) < 0;
	}
	static triangulateShape(e, t) {
		let n = [], r = [], i = [];
		Ja(e), Ya(n, e);
		let a = e.length;
		t.forEach(Ja);
		for (let e = 0; e < t.length; e++) r.push(a), a += t[e].length, Ya(n, t[e]);
		let o = Ka.triangulate(n, r);
		for (let e = 0; e < o.length; e += 3) i.push(o.slice(e, e + 3));
		return i;
	}
};
function Ja(e) {
	let t = e.length;
	t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function Ya(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y);
}
var Xa = class e extends zr {
	constructor(e = [
		new H(0, -.5),
		new H(.5, 0),
		new H(0, .5)
	], t = 12, n = 0, r = Math.PI * 2) {
		super(), this.type = "LatheGeometry", this.parameters = {
			points: e,
			segments: t,
			phiStart: n,
			phiLength: r
		}, t = Math.floor(t), r = V(r, 0, Math.PI * 2);
		let i = [], a = [], o = [], s = [], c = [], l = 1 / t, u = new U(), d = new H(), f = new U(), p = new U(), m = new U(), h = 0, g = 0;
		for (let t = 0; t <= e.length - 1; t++) switch (t) {
			case 0:
				h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, m.copy(f), f.normalize(), s.push(f.x, f.y, f.z);
				break;
			case e.length - 1:
				m.normalize(), s.push(m.x, m.y, m.z);
				break;
			default: h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, p.copy(f), f.x += m.x, f.y += m.y, f.z += m.z, f.normalize(), s.push(f.x, f.y, f.z), m.copy(p);
		}
		for (let i = 0; i <= t; i++) {
			let f = n + i * l * r, p = Math.sin(f), m = Math.cos(f);
			for (let n = 0; n <= e.length - 1; n++) {
				u.x = e[n].x * p, u.y = e[n].y, u.z = e[n].x * m, a.push(u.x, u.y, u.z), d.x = i / t, d.y = n / (e.length - 1), o.push(d.x, d.y);
				let r = s[3 * n + 0] * p, l = s[3 * n + 1], f = s[3 * n + 0] * m;
				c.push(r, l, f);
			}
		}
		for (let n = 0; n < t; n++) for (let t = 0; t < e.length - 1; t++) {
			let r = t + n * e.length, a = r, o = r + e.length, s = r + e.length + 1, c = r + 1;
			i.push(a, o, c), i.push(s, c, o);
		}
		this.setIndex(i), this.setAttribute("position", new Dr(a, 3)), this.setAttribute("uv", new Dr(o, 2)), this.setAttribute("normal", new Dr(c, 3));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.points, t.segments, t.phiStart, t.phiLength);
	}
}, Za = class e extends zr {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new Dr(p, 3)), this.setAttribute("normal", new Dr(m, 3)), this.setAttribute("uv", new Dr(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
}, Qa = class e extends zr {
	constructor(e = .5, t = 1, n = 32, r = 1, i = 0, a = Math.PI * 2) {
		super(), this.type = "RingGeometry", this.parameters = {
			innerRadius: e,
			outerRadius: t,
			thetaSegments: n,
			phiSegments: r,
			thetaStart: i,
			thetaLength: a
		}, n = Math.max(3, n), r = Math.max(1, r);
		let o = [], s = [], c = [], l = [], u = e, d = (t - e) / r, f = new U(), p = new H();
		for (let e = 0; e <= r; e++) {
			for (let e = 0; e <= n; e++) {
				let r = i + e / n * a;
				f.x = u * Math.cos(r), f.y = u * Math.sin(r), s.push(f.x, f.y, f.z), c.push(0, 0, 1), p.x = (f.x / t + 1) / 2, p.y = (f.y / t + 1) / 2, l.push(p.x, p.y);
			}
			u += d;
		}
		for (let e = 0; e < r; e++) {
			let t = e * (n + 1);
			for (let e = 0; e < n; e++) {
				let r = e + t, i = r, a = r + n + 1, s = r + n + 2, c = r + 1;
				o.push(i, a, c), o.push(a, s, c);
			}
		}
		this.setIndex(o), this.setAttribute("position", new Dr(s, 3)), this.setAttribute("normal", new Dr(c, 3)), this.setAttribute("uv", new Dr(l, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
	}
}, $a = class e extends zr {
	constructor(e = new fa([
		new H(0, .5),
		new H(-.5, -.5),
		new H(.5, -.5)
	]), t = 12) {
		super(), this.type = "ShapeGeometry", this.parameters = {
			shapes: e,
			curveSegments: t
		};
		let n = [], r = [], i = [], a = [], o = 0, s = 0;
		if (Array.isArray(e) === !1) c(e);
		else for (let t = 0; t < e.length; t++) c(e[t]), this.addGroup(o, s, t), o += s, s = 0;
		this.setIndex(n), this.setAttribute("position", new Dr(r, 3)), this.setAttribute("normal", new Dr(i, 3)), this.setAttribute("uv", new Dr(a, 2));
		function c(e) {
			let o = r.length / 3, c = e.extractPoints(t), l = c.shape, u = c.holes;
			qa.isClockWise(l) === !1 && (l = l.reverse());
			for (let e = 0, t = u.length; e < t; e++) {
				let t = u[e];
				qa.isClockWise(t) === !0 && (u[e] = t.reverse());
			}
			let d = qa.triangulateShape(l, u);
			for (let e = 0, t = u.length; e < t; e++) {
				let t = u[e];
				l = l.concat(t);
			}
			for (let e = 0, t = l.length; e < t; e++) {
				let t = l[e];
				r.push(t.x, t.y, 0), i.push(0, 0, 1), a.push(t.x, t.y);
			}
			for (let e = 0, t = d.length; e < t; e++) {
				let t = d[e], r = t[0] + o, i = t[1] + o, a = t[2] + o;
				n.push(r, i, a), s += 3;
			}
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON(), t = this.parameters.shapes;
		return eo(t, e);
	}
	static fromJSON(t, n) {
		let r = [];
		for (let e = 0, i = t.shapes.length; e < i; e++) {
			let i = n[t.shapes[e]];
			r.push(i);
		}
		return new e(r, t.curveSegments);
	}
};
function eo(e, t) {
	if (t.shapes = [], Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n];
		t.shapes.push(r.uuid);
	}
	else t.shapes.push(e.uuid);
	return t;
}
var to = class e extends zr {
	constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) {
		super(), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: r,
			phiLength: i,
			thetaStart: a,
			thetaLength: o
		}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
		let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new U(), d = new U(), f = [], p = [], m = [], h = [];
		for (let f = 0; f <= n; f++) {
			let g = [], _ = f / n, v = a + _ * o, y = e * Math.cos(v), b = Math.sqrt(e * e - y * y), x = 0;
			f === 0 && a === 0 ? x = .5 / t : f === n && s === Math.PI && (x = -.5 / t);
			for (let e = 0; e <= t; e++) {
				let n = e / t, a = r + n * i;
				u.x = -b * Math.cos(a), u.y = y, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(n + x, 1 - _), g.push(c++);
			}
			l.push(g);
		}
		for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
			let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1];
			(e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c);
		}
		this.setIndex(f), this.setAttribute("position", new Dr(p, 3)), this.setAttribute("normal", new Dr(m, 3)), this.setAttribute("uv", new Dr(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
	}
}, no = class e extends zr {
	constructor(e = 1, t = .4, n = 12, r = 48, i = Math.PI * 2, a = 0, o = Math.PI * 2) {
		super(), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: r,
			arc: i,
			thetaStart: a,
			thetaLength: o
		}, n = Math.floor(n), r = Math.floor(r);
		let s = [], c = [], l = [], u = [], d = new U(), f = new U(), p = new U();
		for (let s = 0; s <= n; s++) {
			let m = a + s / n * o;
			for (let a = 0; a <= r; a++) {
				let o = a / r * i;
				f.x = (e + t * Math.cos(m)) * Math.cos(o), f.y = (e + t * Math.cos(m)) * Math.sin(o), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), d.x = e * Math.cos(o), d.y = e * Math.sin(o), p.subVectors(f, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(s / n);
			}
		}
		for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
			let n = (r + 1) * e + t - 1, i = (r + 1) * (e - 1) + t - 1, a = (r + 1) * (e - 1) + t, o = (r + 1) * e + t;
			s.push(n, i, o), s.push(i, a, o);
		}
		this.setIndex(s), this.setAttribute("position", new Dr(c, 3)), this.setAttribute("normal", new Dr(l, 3)), this.setAttribute("uv", new Dr(u, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
	}
}, ro = class e extends zr {
	constructor(e = new sa(new U(-1, -1, 0), new U(-1, 1, 0), new U(1, 1, 0)), t = 64, n = 1, r = 8, i = !1) {
		super(), this.type = "TubeGeometry", this.parameters = {
			path: e,
			tubularSegments: t,
			radius: n,
			radialSegments: r,
			closed: i
		};
		let a = e.computeFrenetFrames(t, i);
		this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
		let o = new U(), s = new U(), c = new H(), l = new U(), u = [], d = [], f = [], p = [];
		m(), this.setIndex(p), this.setAttribute("position", new Dr(u, 3)), this.setAttribute("normal", new Dr(d, 3)), this.setAttribute("uv", new Dr(f, 2));
		function m() {
			for (let e = 0; e < t; e++) h(e);
			h(i === !1 ? t : 0), _(), g();
		}
		function h(i) {
			l = e.getPointAt(i / t, l);
			let c = a.normals[i], f = a.binormals[i];
			for (let e = 0; e <= r; e++) {
				let t = e / r * Math.PI * 2, i = Math.sin(t), a = -Math.cos(t);
				s.x = a * c.x + i * f.x, s.y = a * c.y + i * f.y, s.z = a * c.z + i * f.z, s.normalize(), d.push(s.x, s.y, s.z), o.x = l.x + n * s.x, o.y = l.y + n * s.y, o.z = l.z + n * s.z, u.push(o.x, o.y, o.z);
			}
		}
		function g() {
			for (let e = 1; e <= t; e++) for (let t = 1; t <= r; t++) {
				let n = (r + 1) * (e - 1) + (t - 1), i = (r + 1) * e + (t - 1), a = (r + 1) * e + t, o = (r + 1) * (e - 1) + t;
				p.push(n, i, o), p.push(i, a, o);
			}
		}
		function _() {
			for (let e = 0; e <= t; e++) for (let n = 0; n <= r; n++) c.x = e / t, c.y = n / r, f.push(c.x, c.y);
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.path = this.parameters.path.toJSON(), e;
	}
	static fromJSON(t) {
		return new e(new la[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
	}
};
function io(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (oo(i)) i.isRenderTargetTexture ? (z("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) {
				if (oo(i[0])) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
					t[n][r] = e;
				} else t[n][r] = i.slice();
			} else t[n][r] = i;
		}
	}
	return t;
}
function ao(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = io(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function oo(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function so(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function co(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Kt.workingColorSpace;
}
var lo = {
	clone: io,
	merge: ao
}, uo = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", fo = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", po = class extends Gr {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = uo, this.fragmentShader = fo, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = io(e.uniforms), this.uniformsGroups = so(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new G().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new H().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new U().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new rn().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new W().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new ln().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, mo = class extends po {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, q = class extends Gr {
	constructor(e) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new G(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new G(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new H(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, ho = class extends q {
	constructor(e) {
		super(), this.isMeshPhysicalMaterial = !0, this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new H(1, 1), this.clearcoatNormalMap = null, this.diffuseRoughnessMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
			get: function() {
				return V(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
			},
			set: function(e) {
				this.ior = (1 + .4 * e) / (1 - .4 * e);
			}
		}), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessMinimum = 100, this.iridescenceThicknessMaximum = 400, this.iridescenceThicknessMap = null, this.sheenColor = new G(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = Infinity, this.attenuationColor = new G(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new G(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._diffuseRoughness = 0, this._dispersion = 0, this._iridescence = 0, this._retroreflectivity = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
	}
	get anisotropy() {
		return this._anisotropy;
	}
	set anisotropy(e) {
		this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
	}
	get clearcoat() {
		return this._clearcoat;
	}
	set clearcoat(e) {
		this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
	}
	get diffuseRoughness() {
		return this._diffuseRoughness;
	}
	set diffuseRoughness(e) {
		this._diffuseRoughness > 0 != e > 0 && this.version++, this._diffuseRoughness = e;
	}
	get iridescence() {
		return this._iridescence;
	}
	set iridescence(e) {
		this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
	}
	get dispersion() {
		return this._dispersion;
	}
	set dispersion(e) {
		this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
	}
	get retroreflectivity() {
		return this._retroreflectivity;
	}
	set retroreflectivity(e) {
		this._retroreflectivity > 0 != e > 0 && this.version++, this._retroreflectivity = e;
	}
	get sheen() {
		return this._sheen;
	}
	set sheen(e) {
		this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
	}
	get transmission() {
		return this._transmission;
	}
	set transmission(e) {
		this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
	}
	get iridescenceThicknessRange() {
		return ct("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), [this.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum];
	}
	set iridescenceThicknessRange(e) {
		ct("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), this.iridescenceThicknessMinimum = e[0], this.iridescenceThicknessMaximum = e[1];
	}
	copy(e) {
		return super.copy(e), this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.diffuseRoughness = e.diffuseRoughness, this.diffuseRoughnessMap = e.diffuseRoughnessMap, this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum, this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.retroreflectivity = e.retroreflectivity, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
	}
}, go = class extends Gr {
	constructor(e) {
		super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new G(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new G(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new H(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, _o = class extends Gr {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = qe, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, vo = class extends Gr {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function yo(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function bo(e) {
	return e !== void 0 && e.inTangents !== void 0 && e.outTangents !== void 0;
}
var xo = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, So = class extends xo {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: We,
			endingEnd: We
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case Ge:
				i = e, o = 2 * t - n;
				break;
			case Ke:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case Ge:
				a = e, s = 2 * n - t;
				break;
			case Ke:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, Co = class extends xo {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, wo = class extends xo {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, To = class extends xo {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = Oo(n, t, g, y, r);
			i[p] = Eo(x, o, _, b, m);
		}
		return i;
	}
};
function Eo(e, t, n, r, i) {
	let a = 1 - e;
	return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Do(e, t, n, r, i) {
	let a = 1 - e;
	return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function Oo(e, t, n, r, i) {
	let a = (e - t) / (i - t);
	for (let o = 0; o < 8; o++) {
		let o = Eo(a, t, n, r, i) - e;
		if (Math.abs(o) < 1e-10) break;
		let s = Do(a, t, n, r, i);
		if (Math.abs(s) < 1e-10) break;
		a = Math.max(0, Math.min(1, a - o / s));
	}
	return a;
}
var ko = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = yo(t, this.TimeBufferType), this.values = yo(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: yo(e.times, Array),
				values: yo(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t), bo(e.settings) && (n.settings = {
				inTangents: yo(e.settings.inTangents, Array),
				outTangents: yo(e.settings.outTangents, Array)
			});
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new wo(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Co(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new So(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new To(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case Be:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case Ve:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case He:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case Ue: t = this.InterpolantFactoryMethodBezier;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw Error(t);
			}
			return z("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return Be;
			case this.InterpolantFactoryMethodLinear: return Ve;
			case this.InterpolantFactoryMethodSmooth: return He;
			case this.InterpolantFactoryMethodBezier: return Ue;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
			bo(this.settings) && (Ao(this.settings.inTangents, e), Ao(this.settings.outTangents, e));
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
			bo(this.settings) && (jo(this.settings.inTangents, e), jo(this.settings.outTangents, e));
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (B("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (B("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				B("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				B("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && nt(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				B("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === He, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) {
				if (r) i = !0;
				else {
					let e = o * n, r = e - n, a = e + n;
					for (let o = 0; o !== n; ++o) {
						let n = t[e + o];
						if (n !== t[r + o] || n !== t[a + o]) {
							i = !0;
							break;
						}
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, bo(this.settings) && (r.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		}), r;
	}
};
function Ao(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] += t;
}
function jo(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] *= t;
}
ko.prototype.ValueTypeName = "", ko.prototype.TimeBufferType = Float32Array, ko.prototype.ValueBufferType = Float32Array, ko.prototype.DefaultInterpolation = Ve;
var Mo = class extends ko {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Mo.prototype.ValueTypeName = "bool", Mo.prototype.ValueBufferType = Array, Mo.prototype.DefaultInterpolation = Be, Mo.prototype.InterpolantFactoryMethodLinear = void 0, Mo.prototype.InterpolantFactoryMethodSmooth = void 0;
var No = class extends ko {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
No.prototype.ValueTypeName = "color";
var Po = class extends ko {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Po.prototype.ValueTypeName = "number";
var Fo = class extends xo {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) zt.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, Io = class extends ko {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Fo(this.times, this.values, this.getValueSize(), e);
	}
};
Io.prototype.ValueTypeName = "quaternion", Io.prototype.InterpolantFactoryMethodSmooth = void 0;
var Lo = class extends ko {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Lo.prototype.ValueTypeName = "string", Lo.prototype.ValueBufferType = Array, Lo.prototype.DefaultInterpolation = Be, Lo.prototype.InterpolantFactoryMethodLinear = void 0, Lo.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ro = class extends ko {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Ro.prototype.ValueTypeName = "vector";
var zo = class extends In {
	static registerNode(e) {
		this.prototype._lightNode = e;
	}
	constructor(e, t = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new G(e), this.intensity = t;
	}
	copy(e, t) {
		return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
	}
}, Bo = class extends zo {
	constructor(e, t, n) {
		super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(In.DEFAULT_UP), this.updateMatrix(), this.groundColor = new G(t);
	}
	copy(e, t) {
		return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.groundColor = this.groundColor.getHex(), t;
	}
}, Vo = /*@__PURE__*/ new ln(), Ho = /*@__PURE__*/ new U(), Uo = /*@__PURE__*/ new U(), Wo = class {
	constructor(e) {
		this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new H(512, 512), this.mapType = b, this.map = null, this.mapPass = null, this.matrix = new ln(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new wi(), this._frameExtents = new H(1, 1), this._viewportCount = 1, this._viewports = [new rn(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getCamera() {
		return this.camera;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		let t = this.camera;
		Ho.setFromMatrixPosition(e.matrixWorld), t.position.copy(Ho), Uo.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Uo), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
	}
	_updateMatrix(e, t, n, r) {
		Vo.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(Vo, e.coordinateSystem, e.reversedDepth);
		let i = this._frameExtents, a = r ? r.z / i.x : 1, o = r ? r.w / i.y : 1, s = r ? r.x / i.x : 0, c = r ? r.y / i.y : 0;
		e.coordinateSystem === 2001 || e.reversedDepth ? t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), t.multiply(Vo);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.mapType = e.mapType, this.biasNode = e.biasNode, this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let e = {};
		return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.mapType = this.mapType, e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
	}
}, Go = /*@__PURE__*/ new U(), Ko = /*@__PURE__*/ new zt(), qo = /*@__PURE__*/ new U(), Jo = class extends In {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ln(), this.projectionMatrix = new ln(), this.projectionMatrixInverse = new ln(), this.coordinateSystem = et, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(Go, Ko, qo), qo.x === 1 && qo.y === 1 && qo.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Go, Ko, qo.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(Go, Ko, qo), qo.x === 1 && qo.y === 1 && qo.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Go, Ko, qo.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Yo = /*@__PURE__*/ new U(), Xo = /*@__PURE__*/ new H(), Zo = /*@__PURE__*/ new H(), Qo = class extends Jo {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = ht * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(mt * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return ht * 2 * Math.atan(Math.tan(mt * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		Yo.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(Yo.x, Yo.y).multiplyScalar(-e / Yo.z), Yo.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(Yo.x, Yo.y).multiplyScalar(-e / Yo.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, Xo, Zo), t.subVectors(Zo, Xo);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(mt * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, $o = class extends Wo {
	constructor() {
		super(new Qo(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
	}
	updateMatrices(e) {
		let t = this.camera, n = ht * 2 * e.angle * this.focus, r = this.mapSize.width / this.mapSize.height * this.aspect, i = e.distance || t.far;
		(n !== t.fov || r !== t.aspect || i !== t.far) && (t.fov = n, t.aspect = r, t.far = i, t.updateProjectionMatrix()), super.updateMatrices(e);
	}
	copy(e) {
		return super.copy(e), this.focus = e.focus, this.aspect = e.aspect, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.focus = this.focus, e.aspect = this.aspect, e;
	}
}, es = class extends zo {
	constructor(e, t, n = 0, r = Math.PI / 3, i = 0, a = 2) {
		super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(In.DEFAULT_UP), this.updateMatrix(), this.target = new In(), this.distance = n, this.angle = r, this.penumbra = i, this.decay = a, this.map = null, this.shadow = new $o();
	}
	get power() {
		return this.intensity * Math.PI;
	}
	set power(e) {
		this.intensity = e / Math.PI;
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t;
	}
}, ts = class extends Wo {
	constructor() {
		super(new Qo(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, ns = class extends zo {
	constructor(e, t, n = 0, r = 2) {
		super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new ts();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
	}
}, rs = class extends Jo {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, is = class extends Wo {
	constructor() {
		super(new rs(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
	}
}, as = class extends zo {
	constructor(e, t) {
		super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(In.DEFAULT_UP), this.updateMatrix(), this.target = new In(), this.shadow = new is();
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e) {
		return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
	}
}, os = -90, ss = 1, cs = class extends In {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new Qo(os, ss, e, t);
		r.layers = this.layers, this.add(r);
		let i = new Qo(os, ss, e, t);
		i.layers = this.layers, this.add(i);
		let a = new Qo(os, ss, e, t);
		a.layers = this.layers, this.add(a);
		let o = new Qo(os, ss, e, t);
		o.layers = this.layers, this.add(o);
		let s = new Qo(os, ss, e, t);
		s.layers = this.layers, this.add(s);
		let c = new Qo(os, ss, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.mipmapsAutoUpdate;
		n.texture.mipmapsAutoUpdate = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.mipmapsAutoUpdate = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, ls = class extends Qo {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e, this.perCameraFrustumCulled = !1;
	}
}, us = "\\[\\]\\.:\\/", ds = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), fs = "[^\\[\\]\\.:\\/]", ps = "[^" + us.replace("\\.", "") + "]", ms = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", fs), hs = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", ps), gs = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", fs), _s = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", fs), vs = RegExp("^" + ms + hs + gs + _s + "$"), ys = [
	"material",
	"materials",
	"bones",
	"map"
], bs = class {
	constructor(e, t, n) {
		let r = n || xs.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, xs = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(ds, "");
	}
	static parseTrackName(e) {
		let t = vs.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			ys.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			z("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						B("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						B("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						B("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						B("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						B("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						B("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					B("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			B("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					B("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					B("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
xs.Composite = bs, xs.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, xs.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, xs.prototype.GetterByBindingType = [
	xs.prototype._getValue_direct,
	xs.prototype._getValue_array,
	xs.prototype._getValue_arrayElement,
	xs.prototype._getValue_toArray
], xs.prototype.SetterByBindingTypeAndVersioning = [
	[
		xs.prototype._setValue_direct,
		xs.prototype._setValue_direct_setNeedsUpdate,
		xs.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		xs.prototype._setValue_array,
		xs.prototype._setValue_array_setNeedsUpdate,
		xs.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		xs.prototype._setValue_arrayElement,
		xs.prototype._setValue_arrayElement_setNeedsUpdate,
		xs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		xs.prototype._setValue_fromArray,
		xs.prototype._setValue_fromArray_setNeedsUpdate,
		xs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
];
var Ss = /*@__PURE__*/ new ln(), Cs = class {
	constructor(e, t, n = 0, r = Infinity) {
		this.ray = new Xr(e, t), this.near = n, this.far = r, this.camera = null, this.layers = new bn(), this.params = {
			Mesh: {},
			Line: { threshold: 1 },
			LOD: {},
			Points: { threshold: 1 },
			Sprite: {}
		};
	}
	set(e, t) {
		this.ray.set(e, t);
	}
	setFromCamera(e, t) {
		t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, t.projectionMatrix.elements[14]).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : B("Raycaster: Unsupported camera type: " + t.type);
	}
	setFromXRController(e) {
		return Ss.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Ss), this;
	}
	intersectObject(e, t = !0, n = []) {
		return Ts(e, this, n, t), n.sort(ws), n;
	}
	intersectObjects(e, t = !0, n = []) {
		for (let r = 0, i = e.length; r < i; r++) Ts(e[r], this, n, t);
		return n.sort(ws), n;
	}
};
function ws(e, t) {
	return e.distance - t.distance;
}
function Ts(e, t, n, r) {
	let i = !0;
	if (e.layers.test(t.layers) && e.raycast(t, n) === !1 && (i = !1), i === !0 && r === !0) {
		let r = e.children;
		for (let e = 0, i = r.length; e < i; e++) Ts(r[e], t, n, !0);
	}
}
s = class {
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
}, s.prototype.isMatrix2 = !0;
function Es(e, t, n, r) {
	let i = Ds(r);
	switch (n) {
		case M: return e * t;
		case ie: return e * t / i.components * i.byteLength;
		case ae: return e * t / i.components * i.byteLength;
		case oe: return e * t * 2 / i.components * i.byteLength;
		case se: return e * t * 2 / i.components * i.byteLength;
		case te: return e * t * 3 / i.components * i.byteLength;
		case N: return e * t * 4 / i.components * i.byteLength;
		case ce: return e * t * 4 / i.components * i.byteLength;
		case le:
		case P: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case ue:
		case de: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case pe:
		case he: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case fe:
		case me: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case ge:
		case _e:
		case ye:
		case be: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case ve:
		case xe:
		case Se: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case Ce: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case we: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case Te: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case Ee: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case De: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case Oe: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case ke: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case Ae: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case je: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case Me: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case Ne: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case Pe: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case F: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case Fe: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case Ie:
		case Le:
		case I: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case Re:
		case L: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case R:
		case ze: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function Ds(e) {
	switch (e) {
		case b:
		case x: return {
			byteLength: 1,
			components: 1
		};
		case C:
		case S:
		case D: return {
			byteLength: 2,
			components: 1
		};
		case O:
		case k: return {
			byteLength: 2,
			components: 4
		};
		case T:
		case w:
		case E: return {
			byteLength: 4,
			components: 1
		};
		case j:
		case ee: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "187" } })), typeof window < "u" && (window.__THREE__ ? z("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "187");
// node_modules/three/build/three.module.js
function Os() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		r = e.requestAnimationFrame(i), n(t, a);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function ks(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var J = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	uniform samplerCube envMap;\n	#ifdef ENVMAP_TYPE_PMREM\n		float roughnessToMip( const in float roughness ) {\n			float r = clamp( roughness, 0.0, 1.0 );\n			return ENVMAP_MAX_LOD * r * ( 2.0 - r );\n		}\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_PMREM\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.045 );\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef USE_DIFFUSE_ROUGHNESS\n	float diffuseRoughnessFactor = diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;\n	#endif\n	material.diffuseRoughness = saturate( diffuseRoughnessFactor );\n#endif\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float diffuseRoughness;\n	#endif\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n#ifdef USE_DIFFUSE_ROUGHNESS\n	const float EON_EPSILON = 1e-7;\n	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {\n		float muComp = 1.0 - mu;\n		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );\n		return A * ( 1.0 + roughness * gOverPi );\n	}\n	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float s = dot( lightDir, viewDir ) - dotNL * dotNV;\n		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI\n			* max( EON_EPSILON, 1.0 - albedoV )\n			* max( EON_EPSILON, 1.0 - albedoL )\n			/ max( EON_EPSILON, 1.0 - averageAlbedo );\n		return singleScatter + multiScatter;\n	}\n	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return rho;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );\n	}\n#endif\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = max( material.clearcoatRoughness, 0.045 );\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = max( material.roughness, 0.045 );\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float alphaT = max( material.alphaT, alpha );\n		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );\n	#else\n		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );\n	#endif\n	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );\n		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );\n	#else\n		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#endif\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );\n	#else\n		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	#endif\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_LIGHT_PROBE_GRIDS > 0\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		int probeGrid = - 1;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;\n		}\n		#pragma unroll_loop_end\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#if NUM_LIGHT_PROBE_GRIDS > 0\nuniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];\nbool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {\n	vec3 spacing = ( probesMax - probesMin ) / probesResolution;\n	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;\n	vec3 margin = spacing * 0.01;\n	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );\n}\nvec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 probeSpacing = gridRange / res;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	#if defined( USE_COLOR_ALPHA )\n		vColor *= morphTargetBaseInfluence;\n	#elif defined( USE_COLOR )\n		vColor.rgb *= morphTargetBaseInfluence;\n	#endif\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				vec2 radius = shadowRadius * texelSize;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float lightDistance = length( lightToPosition );\n			float depthRange = shadowCameraFar - shadowCameraNear;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float depthA = - shadowCameraNear / depthRange - shadowBias;\n				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#else\n				float depthA = shadowCameraFar / depthRange + shadowBias;\n				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			shadow = 0.0;\n			for ( int i = 0; i < 5; i ++ ) {\n				vec2 offset = vogelDiskSample( i, 5, phi );\n				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;\n				vec3 absDirection = abs( direction );\n				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );\n				shadow += texture( shadowMap, vec4( direction, dp ) );\n			}\n			shadow *= 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	uniform mat3 diffuseRoughnessMapTransform;\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "uniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <envmap_common_pars_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_PMREM\n		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );\n	#else\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESS\n	uniform float diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		uniform sampler2D diffuseRoughnessMap;\n	#endif\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, Y = {
	common: {
		diffuse: { value: /*@__PURE__*/ new G(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new W() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new W() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /*@__PURE__*/ new W() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /*@__PURE__*/ new W() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /*@__PURE__*/ new W() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /*@__PURE__*/ new W() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /*@__PURE__*/ new W() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /*@__PURE__*/ new W() },
		normalScale: { value: /*@__PURE__*/ new H(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /*@__PURE__*/ new W() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /*@__PURE__*/ new W() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /*@__PURE__*/ new W() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /*@__PURE__*/ new W() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /*@__PURE__*/ new G(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		sunLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		sunLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		sunShadowMatrix: { value: [] },
		sunShadowCascade: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: [] },
		probesMin: { value: [] },
		probesMax: { value: [] },
		probesResolution: { value: [] }
	},
	points: {
		diffuse: { value: /*@__PURE__*/ new G(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new W() },
		alphaTest: { value: 0 },
		uvTransform: { value: /*@__PURE__*/ new W() }
	},
	sprite: {
		diffuse: { value: /*@__PURE__*/ new G(16777215) },
		opacity: { value: 1 },
		center: { value: /*@__PURE__*/ new H(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new W() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new W() },
		alphaTest: { value: 0 }
	}
}, As = {
	basic: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.specularmap,
			Y.envmap,
			Y.aomap,
			Y.lightmap,
			Y.fog
		]),
		vertexShader: J.meshbasic_vert,
		fragmentShader: J.meshbasic_frag
	},
	lambert: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.specularmap,
			Y.envmap,
			Y.aomap,
			Y.lightmap,
			Y.emissivemap,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			Y.fog,
			Y.lights,
			{
				emissive: { value: /*@__PURE__*/ new G(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: J.meshlambert_vert,
		fragmentShader: J.meshlambert_frag
	},
	phong: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.specularmap,
			Y.envmap,
			Y.aomap,
			Y.lightmap,
			Y.emissivemap,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			Y.fog,
			Y.lights,
			{
				emissive: { value: /*@__PURE__*/ new G(0) },
				specular: { value: /*@__PURE__*/ new G(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: J.meshphong_vert,
		fragmentShader: J.meshphong_frag
	},
	standard: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.envmap,
			Y.aomap,
			Y.lightmap,
			Y.emissivemap,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			Y.roughnessmap,
			Y.metalnessmap,
			Y.fog,
			Y.lights,
			{
				emissive: { value: /*@__PURE__*/ new G(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: J.meshphysical_vert,
		fragmentShader: J.meshphysical_frag
	},
	toon: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.aomap,
			Y.lightmap,
			Y.emissivemap,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			Y.gradientmap,
			Y.fog,
			Y.lights,
			{ emissive: { value: /*@__PURE__*/ new G(0) } }
		]),
		vertexShader: J.meshtoon_vert,
		fragmentShader: J.meshtoon_frag
	},
	matcap: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			Y.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: J.meshmatcap_vert,
		fragmentShader: J.meshmatcap_frag
	},
	points: {
		uniforms: /*@__PURE__*/ ao([Y.points, Y.fog]),
		vertexShader: J.points_vert,
		fragmentShader: J.points_frag
	},
	dashed: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: J.linedashed_vert,
		fragmentShader: J.linedashed_frag
	},
	depth: {
		uniforms: /*@__PURE__*/ ao([Y.common, Y.displacementmap]),
		vertexShader: J.depth_vert,
		fragmentShader: J.depth_frag
	},
	normal: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.bumpmap,
			Y.normalmap,
			Y.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: J.meshnormal_vert,
		fragmentShader: J.meshnormal_frag
	},
	sprite: {
		uniforms: /*@__PURE__*/ ao([Y.sprite, Y.fog]),
		vertexShader: J.sprite_vert,
		fragmentShader: J.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /*@__PURE__*/ new W() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: J.background_vert,
		fragmentShader: J.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /*@__PURE__*/ new W() }
		},
		vertexShader: J.backgroundCube_vert,
		fragmentShader: J.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: J.cube_vert,
		fragmentShader: J.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: J.equirect_vert,
		fragmentShader: J.equirect_frag
	},
	distance: {
		uniforms: /*@__PURE__*/ ao([
			Y.common,
			Y.displacementmap,
			{
				referencePosition: { value: /*@__PURE__*/ new U() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: J.distance_vert,
		fragmentShader: J.distance_frag
	},
	shadow: {
		uniforms: /*@__PURE__*/ ao([
			Y.lights,
			Y.fog,
			{
				color: { value: /*@__PURE__*/ new G(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: J.shadow_vert,
		fragmentShader: J.shadow_frag
	}
};
As.physical = {
	uniforms: /*@__PURE__*/ ao([As.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /*@__PURE__*/ new W() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /*@__PURE__*/ new W() },
		clearcoatNormalScale: { value: /*@__PURE__*/ new H(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new W() },
		diffuseRoughness: { value: 0 },
		diffuseRoughnessMap: { value: null },
		diffuseRoughnessMapTransform: { value: /*@__PURE__*/ new W() },
		dispersion: { value: 0 },
		retroreflectivity: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /*@__PURE__*/ new W() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new W() },
		sheen: { value: 0 },
		sheenColor: { value: /*@__PURE__*/ new G(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /*@__PURE__*/ new W() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /*@__PURE__*/ new W() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /*@__PURE__*/ new W() },
		transmissionSamplerSize: { value: /*@__PURE__*/ new H() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /*@__PURE__*/ new W() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /*@__PURE__*/ new G(0) },
		specularColor: { value: /*@__PURE__*/ new G(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /*@__PURE__*/ new W() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /*@__PURE__*/ new W() },
		anisotropyVector: { value: /*@__PURE__*/ new H() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /*@__PURE__*/ new W() }
	}]),
	vertexShader: J.meshphysical_vert,
	fragmentShader: J.meshphysical_frag
};
var js = {
	r: 0,
	b: 0,
	g: 0
}, Ms = /*@__PURE__*/ new ln(), Ns = /*@__PURE__*/ new W();
Ns.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Ps(e, t, n, r, i, a) {
	let o = new G(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && i.isCubeTexture ? (l === void 0 && (l = new K(new Mi(1, 1, 1), new po({
			name: "BackgroundCubeMaterial",
			uniforms: io(As.backgroundCube.uniforms),
			vertexShader: As.backgroundCube.vertexShader,
			fragmentShader: As.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ms.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(Ns), l.material.toneMapped = Kt.getTransfer(i.colorSpace) !== Ze, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new K(new Za(2, 2), new po({
			name: "BackgroundMaterial",
			uniforms: io(As.background.uniforms),
			vertexShader: As.background.vertexShader,
			fragmentShader: As.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = Kt.getTransfer(i.colorSpace) !== Ze, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(js, co(e)), n.buffers.color.setClear(js.r, js.g, js.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function Fs(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.isInterleavedBuffer === !0 ? t.stride : t.itemSize, p = s.offset;
						if (t.isInstancedInterleavedBuffer || t.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function Is(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function Ls(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return t === 1023 || r.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && n !== 1015 && !i && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (z("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"), f = n.logarithmicDepthBuffer === !0 && d === !1;
	n.reversedDepthBuffer === !0 && d === !1 && z("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."), n.logarithmicDepthBuffer === !0 && d === !0 && z("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: f,
		reversedDepthBuffer: d,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function Rs(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new Ur(), s = new W(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var zs = class extends on {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new Di(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new Mi(5, 5, 5), i = new po({
			name: "CubemapFromEquirect",
			uniforms: io(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		i.uniforms.tEquirect.value = t;
		let a = new K(r, i), o = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = _), new cs(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
}, Bs = 256, Vs = 3, Hs = 20, Us = 256, Ws = 16, Gs = 3, Ks = /*@__PURE__*/ new U(), qs = /*@__PURE__*/ new G(), Js = class e {
	constructor(e) {
		this._renderer = e, this._cubeSize = 0, this._sourceTarget = null, this._cubeCamera = new cs(1, 10, null), this._boxMesh = new K(new Mi(5, 5, 5), null), this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null, this._integrationMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = Ks } = i, s = this._renderer;
		this._setSize(a);
		let c = this._allocateTarget(), l = this._getSourceTarget(!0);
		t > 0 && (l.texture.mipmapsAutoUpdate = !1);
		let u = s.autoClear, d = s.autoClearColor, f = s.autoClearDepth, p = s.autoClearStencil, m = e.background;
		s.autoClear = !0, s.autoClearColor = !0, s.autoClearDepth = !0, s.autoClearStencil = !0, m === null && (e.background = s.getClearColor(qs));
		let h = new cs(n, r, l);
		return h.position.copy(o), h.update(s, e), s.autoClear = u, s.autoClearColor = d, s.autoClearDepth = f, s.autoClearStencil = p, e.background = m, t > 0 && (l.texture.mipmapsAutoUpdate = !0, this._blur(c, t)), this._applyPMREM(c), c;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = tc(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = ec(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._sourceTarget !== null && this._sourceTarget.dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._integrationMaterial !== null && this._integrationMaterial.dispose(), this._boxMesh.geometry.dispose();
	}
	static lodToRoughness(e, t) {
		return t > 0 ? 1 - Math.sqrt(1 - e / t) : 0;
	}
	_setSize(e) {
		this._cubeSize = Math.max(Bs, Nt(e));
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? Bs : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4);
		let n = t || this._allocateTarget();
		return this._textureToCubemap(e), this._applyPMREM(n), n;
	}
	_allocateTarget() {
		let e = this._cubeSize, t = Ys(e, !1, !1), n = Math.log2(e) - Vs;
		for (let r = 0; r <= n; r++) t.texture.mipmaps.push({
			width: e >> r,
			height: e >> r
		});
		return t.texture.name = "PMREM", t.texture.isPMREMTexture = !0, t;
	}
	_getSourceTarget(e = !1) {
		let t = this._cubeSize, n = this._sourceTarget;
		return (n === null || n.width !== t || e && n.depthBuffer === !1) && (n !== null && n.dispose(), this._sourceTarget = Ys(t, !0, e)), this._sourceTarget;
	}
	_compileMaterial(e) {
		this._boxMesh.material = e, this._renderer.compile(this._boxMesh, this._cubeCamera.children[0]);
	}
	_renderCube(e, t, n) {
		let r = this._boxMesh, i = this._cubeCamera;
		r.material = n, i.renderTarget = e, i.activeMipmapLevel = t;
		let a = e.width >> t;
		e.viewport.set(0, 0, a, a), i.update(this._renderer, r), e.viewport.set(0, 0, e.width, e.height);
	}
	_textureToCubemap(e) {
		let t;
		e.mapping === 301 || e.mapping === 302 ? (this._cubemapMaterial === null && (this._cubemapMaterial = tc()), t = this._cubemapMaterial, t.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : (this._equirectMaterial === null && (this._equirectMaterial = ec()), t = this._equirectMaterial), t.uniforms.envMap.value = e, this._renderCube(this._getSourceTarget(), 0, t);
	}
	_applyPMREM(t) {
		this._ggxMaterial === null && (this._ggxMaterial = Zs(), this._integrationMaterial = Qs());
		let n = this._cubeSize, r = t.texture.mipmaps.length - 1, i = this._ggxMaterial.uniforms;
		i.envMap.value = this._sourceTarget.texture;
		let a = this._integrationMaterial.uniforms;
		a.envMap.value = this._sourceTarget.texture, a.sourceLod.value = Math.log2(n / Ws);
		for (let o = 0; o <= r; o++) {
			let s = e.lodToRoughness(o, r);
			if (o > r - Gs) a.roughness.value = s, this._renderCube(t, o, this._integrationMaterial);
			else {
				let e = s > 0 ? Math.log2(n) + .5 * Math.log2(6 / (Us * s ** 4)) + .5 : 0;
				i.roughness.value = s, i.lodBias.value = e, this._renderCube(t, o, this._ggxMaterial);
			}
		}
	}
	_blur(e, t) {
		this._blurMaterial === null && (this._blurMaterial = $s());
		let n = this._blurMaterial, r = n.uniforms, i = this._sourceTarget;
		r.sigma.value = Math.min(t, Math.PI) / Math.SQRT2, r.envMap.value = i.texture, this._renderCube(e, 0, n), r.envMap.value = e.texture, this._renderCube(i, 0, n);
	}
};
function Ys(e, t, n) {
	return new zs(e, {
		minFilter: y,
		generateMipmaps: t,
		type: D,
		colorSpace: Ye,
		depthBuffer: n
	});
}
function Xs(e, t, n) {
	return new po({
		name: e,
		uniforms: t,
		vertexShader: J.cube_vert,
		fragmentShader: n,
		side: 1,
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Zs() {
	return Xs("PMREMGGXConvolution", {
		envMap: { value: null },
		roughness: { value: 0 },
		lodBias: { value: 0 }
	}, `

		#define GGX_SAMPLES ${Us}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`);
}
function Qs() {
	return Xs("PMREMGGXIntegration", {
		envMap: { value: null },
		roughness: { value: 0 },
		sourceLod: { value: 0 },
		sourceSize: { value: Ws }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float roughness;\n		uniform float sourceLod;\n		uniform int sourceSize;\n\n		void main() {\n\n			vec3 N = normalize( vWorldDirection );\n\n			float alpha = roughness * roughness;\n			float alpha2 = alpha * alpha;\n\n			float texelSize = 2.0 / float( sourceSize );\n\n			vec3 prefilteredColor = vec3( 0.0 );\n			float totalWeight = 0.0;\n\n			// Pair opposite texels: only the one in N's hemisphere contributes.\n			for ( int face = 0; face < 3; face ++ ) {\n\n				for ( int y = 0; y < sourceSize; y ++ ) {\n\n					for ( int x = 0; x < sourceSize; x ++ ) {\n\n						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;\n						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );\n\n						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );\n						float NdotL = dot( N, texelDirection );\n						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;\n						NdotL = abs( NdotL ) * invDistance;\n\n						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors\n						// in the GGX distribution and texel solid angle cancel when normalized.\n						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;\n						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );\n\n						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;\n						totalWeight += weight;\n\n					}\n\n				}\n\n			}\n\n			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );\n\n		}\n	");
}
function $s() {
	return Xs("PMREMSphericalGaussianBlur", {
		envMap: { value: null },
		sigma: { value: 0 }
	}, `

		#define SAMPLES ${Hs}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`);
}
function ec() {
	return Xs("PMREMEquirectangularToCubemap", { envMap: { value: null } }, "\n\n		varying vec3 vWorldDirection;\n\n		uniform sampler2D envMap;\n\n		#include <common>\n\n		void main() {\n\n			// Average four subpixel samples to preserve small, bright features.\n			vec3 direction = normalize( vWorldDirection );\n			vec3 dx = dFdx( direction ) * 0.25;\n			vec3 dy = dFdy( direction ) * 0.25;\n\n			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;\n			gl_FragColor = vec4( color * 0.25, 1.0 );\n\n		}\n	");
}
function tc() {
	return Xs("PMREMCubemapToCubemap", {
		envMap: { value: null },
		flipEnvMap: { value: -1 }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float flipEnvMap;\n\n		void main() {\n\n			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );\n\n		}\n	");
}
function nc(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) {
				if (t.has(n)) {
					let e = t.get(n).texture;
					return s(e, n.mapping);
				}
				{
					let r = n.image;
					if (r && r.height > 0) {
						let i = new zs(r.height);
						return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
					}
					return null;
				}
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture && t.isPMREMTexture !== !0) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new Js(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new Js(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function rc(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && ct("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function ic(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap(), o = new FinalizationRegistry((e) => delete i[e]);
	function s(e) {
		c(e.target);
	}
	function c(e) {
		e.index !== null && t.remove(e.index);
		for (let n in e.attributes) t.remove(e.attributes[n]);
		e.removeEventListener("dispose", s), delete i[e.id], o.unregister(e);
		let c = a.get(e);
		c && (t.remove(c), a.delete(e)), r.releaseStatesOfGeometry(e), e.isInstancedBufferGeometry === !0 && delete e._maxInstanceCount, n.memory.geometries--;
	}
	function l(e, t) {
		return i[t.id] === void 0 && (t.addEventListener("dispose", s), i[t.id] = new WeakRef(t), o.register(t, t.id, t), n.memory.geometries++), t;
	}
	function u(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function d(e) {
		let n = e.index, r = e.attributes.position, i = 0;
		if (r === void 0) return;
		let o = n === null ? r.array.length / 3 - 1 : n.array.length, s = new (r.count >= 65535 ? Er : Tr)(Math.ceil(o / 3) * 6, 1), c = s.array;
		if (n !== null) {
			let e = n.array;
			i = n.version;
			for (let t = 0, n = 0; t < o; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				c[n++] = r, c[n++] = i, c[n++] = i, c[n++] = a, c[n++] = a, c[n++] = r;
			}
		} else {
			i = r.version;
			for (let e = 0, t = 0; e < o; e += 3) {
				let n = e + 0, r = e + 1, i = e + 2;
				c[t++] = n, c[t++] = r, c[t++] = r, c[t++] = i, c[t++] = i, c[t++] = n;
			}
		}
		s.version = i;
		let l = a.get(e);
		l && t.remove(l), a.set(e, s);
	}
	function f(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && d(e);
		} else d(e);
		return a.get(e);
	}
	function p() {
		for (let e in i) {
			let t = i[e].deref();
			t !== void 0 && c(t);
		}
	}
	return {
		get: l,
		update: u,
		getWireframeAttribute: f,
		dispose: p
	};
}
function ac(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function oc(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default: B("WebGLInfo: Unknown draw mode:", r);
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function sc(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new rn();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, l = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = l === void 0 ? 0 : l.length, d = r.get(o);
		if (d === void 0 || d.count !== u) {
			d !== void 0 && d.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], l = o.morphAttributes.color || [], f = 0;
			e === !0 && (f = 1), n === !0 && (f = 2), a === !0 && (f = 3);
			let p = o.attributes.position.count * f, m = 1;
			p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
			let h = new Float32Array(p * m * 4 * u), g = new sn(h, p, m, u);
			g.type = E, g.needsUpdate = !0;
			let _ = f * 4;
			for (let t = 0; t < u; t++) {
				let r = s[t], o = c[t], u = l[t], d = p * m * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * _;
					e === !0 && (i.fromBufferAttribute(r, t), h[d + s + 0] = i.x, h[d + s + 1] = i.y, h[d + s + 2] = i.z, h[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), h[d + s + 4] = i.x, h[d + s + 5] = i.y, h[d + s + 6] = i.z, h[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(u, t), h[d + s + 8] = i.x, h[d + s + 9] = i.y, h[d + s + 10] = i.z, h[d + s + 11] = u.itemSize === 4 ? i.w : 1);
				}
			}
			d = {
				count: u,
				texture: g,
				size: new H(p, m)
			}, r.set(o, d);
			function v() {
				g.dispose(), r.delete(o), o.removeEventListener("dispose", v);
			}
			o.addEventListener("dispose", v);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", d.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", d.size);
	}
	return { update: a };
}
function cc(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var lc = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function uc(e, t, n, r, i, a) {
	let o = new on(t, n, {
		type: e,
		depthBuffer: i,
		stencilBuffer: a,
		samples: r ? 4 : 0,
		storeMultisampledDepthBuffer: !1,
		storeMultisampledStencilBuffer: !1,
		resolveDepthBuffer: !1,
		resolveStencilBuffer: !1
	}), s = null, c = null, l = null, u = new zr();
	u.setAttribute("position", new Dr([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), u.setAttribute("uv", new Dr([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let d = new mo({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), f = new K(u, d), p = new rs(-1, 1, 1, -1, 0, 1), m = null, h = null, g = !1, _, v = null, y = [], b = !1;
	this.setSize = function(e, t) {
		o.setSize(e, t), s !== null && s.setSize(e, t), c !== null && c.setSize(e, t);
		for (let n = 0; n < y.length; n++) {
			let r = y[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		y = e, b = y.length > 0 && y[0].isRenderPass === !0;
		let t = o.width, n = o.height;
		y.length > 0 && s === null && (s = new on(t, n, {
			type: D,
			depthBuffer: !1,
			stencilBuffer: !1
		}), c = new on(t, n, {
			type: D,
			depthBuffer: !1,
			stencilBuffer: !1
		}));
		let r = i === !0 && y.some((e) => e.needsDepthTexture === !0);
		r !== (o.depthTexture !== null) && (r === !0 && l === null && (l = new ki(t, n), a === !0 && (l.format = re, l.type = A)), o.dispose(), o.depthTexture = r ? l : null, o.resolveDepthBuffer = r, o.storeMultisampledDepthBuffer = r);
		for (let e = 0; e < y.length; e++) {
			let i = y[e];
			i.setSize && i.setSize(t, n), r && i.needsDepthTexture === !0 && i.setDepthTexture && i.setDepthTexture(l);
		}
	}, this.begin = function(e, t) {
		if (g || e.toneMapping === 0 && y.length === 0) return !1;
		if (v = t, t !== null) {
			let e = t.width, n = t.height;
			(o.width !== e || o.height !== n) && this.setSize(e, n);
		}
		return b === !1 && e.setRenderTarget(o), _ = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return b;
	}, this.end = function(e, t) {
		e.toneMapping = _, g = !0;
		let n = o, r = s;
		for (let i = 0; i < y.length; i++) {
			let a = y[i];
			a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1 && (n = r, r = r === s ? c : s));
		}
		if (m !== e.outputColorSpace || h !== e.toneMapping) {
			m = e.outputColorSpace, h = e.toneMapping, d.defines = {}, Kt.getTransfer(m) === "srgb" && (d.defines.SRGB_TRANSFER = "");
			let t = lc[h];
			t && (d.defines[t] = ""), d.needsUpdate = !0;
		}
		d.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(v), e.render(f, p), v = null, g = !1;
	}, this.isCompositing = function() {
		return g;
	}, this.dispose = function() {
		o.dispose(), s !== null && s.dispose(), c !== null && c.dispose(), u.dispose(), d.dispose();
	};
}
var dc = /*@__PURE__*/ new nn(), fc = /*@__PURE__*/ new ki(1, 1), pc = /*@__PURE__*/ new Ai(1), mc = /*@__PURE__*/ new sn(), hc = /*@__PURE__*/ new cn(), gc = /*@__PURE__*/ new Di(), _c = [], vc = [], yc = /* @__PURE__ */ new Float32Array(16), bc = /* @__PURE__ */ new Float32Array(9), xc = /* @__PURE__ */ new Float32Array(4);
function Sc(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = _c[i];
	if (a === void 0 && (a = new Float32Array(i), _c[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function Cc(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function wc(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function Tc(e, t) {
	let n = vc[t];
	n === void 0 && (n = new Int32Array(t), vc[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function Ec(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Dc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Cc(n, t)) return;
		e.uniform2fv(this.addr, t), wc(n, t);
	}
}
function Oc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (Cc(n, t)) return;
		e.uniform3fv(this.addr, t), wc(n, t);
	}
}
function kc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Cc(n, t)) return;
		e.uniform4fv(this.addr, t), wc(n, t);
	}
}
function Ac(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Cc(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), wc(n, t);
	} else {
		if (Cc(n, r)) return;
		xc.set(r), e.uniformMatrix2fv(this.addr, !1, xc), wc(n, r);
	}
}
function jc(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Cc(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), wc(n, t);
	} else {
		if (Cc(n, r)) return;
		bc.set(r), e.uniformMatrix3fv(this.addr, !1, bc), wc(n, r);
	}
}
function Mc(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Cc(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), wc(n, t);
	} else {
		if (Cc(n, r)) return;
		yc.set(r), e.uniformMatrix4fv(this.addr, !1, yc), wc(n, r);
	}
}
function Nc(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function Pc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Cc(n, t)) return;
		e.uniform2iv(this.addr, t), wc(n, t);
	}
}
function Fc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (Cc(n, t)) return;
		e.uniform3iv(this.addr, t), wc(n, t);
	}
}
function Ic(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Cc(n, t)) return;
		e.uniform4iv(this.addr, t), wc(n, t);
	}
}
function Lc(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function Rc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Cc(n, t)) return;
		e.uniform2uiv(this.addr, t), wc(n, t);
	}
}
function zc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (Cc(n, t)) return;
		e.uniform3uiv(this.addr, t), wc(n, t);
	}
}
function Bc(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Cc(n, t)) return;
		e.uniform4uiv(this.addr, t), wc(n, t);
	}
}
function Vc(e) {
	return e.version === 0 && (e.compareFunction = 519, e.needsUpdate = !0), e;
}
function Hc(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_2D_SHADOW ? Vc(fc) : dc, n.setTexture2D(t || a, i);
}
function Uc(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || hc, i);
}
function Wc(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_CUBE_SHADOW ? Vc(pc) : gc, n.setTextureCube(t || a, i);
}
function Gc(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || mc, i);
}
function Kc(e) {
	switch (e) {
		case 5126: return Ec;
		case 35664: return Dc;
		case 35665: return Oc;
		case 35666: return kc;
		case 35674: return Ac;
		case 35675: return jc;
		case 35676: return Mc;
		case 5124:
		case 35670: return Nc;
		case 35667:
		case 35671: return Pc;
		case 35668:
		case 35672: return Fc;
		case 35669:
		case 35673: return Ic;
		case 5125: return Lc;
		case 36294: return Rc;
		case 36295: return zc;
		case 36296: return Bc;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Hc;
		case 35679:
		case 36299:
		case 36307: return Uc;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return Wc;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return Gc;
	}
}
function qc(e, t) {
	e.uniform1fv(this.addr, t);
}
function Jc(e, t) {
	let n = Sc(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function Yc(e, t) {
	let n = Sc(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function Xc(e, t) {
	let n = Sc(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function Zc(e, t) {
	let n = Sc(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function Qc(e, t) {
	let n = Sc(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function $c(e, t) {
	let n = Sc(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function el(e, t) {
	e.uniform1iv(this.addr, t);
}
function tl(e, t) {
	e.uniform2iv(this.addr, t);
}
function nl(e, t) {
	e.uniform3iv(this.addr, t);
}
function rl(e, t) {
	e.uniform4iv(this.addr, t);
}
function il(e, t) {
	e.uniform1uiv(this.addr, t);
}
function al(e, t) {
	e.uniform2uiv(this.addr, t);
}
function ol(e, t) {
	e.uniform3uiv(this.addr, t);
}
function sl(e, t) {
	e.uniform4uiv(this.addr, t);
}
function cl(e, t, n) {
	let r = this.cache, i = t.length, a = Tc(n, i);
	Cc(r, a) || (e.uniform1iv(this.addr, a), wc(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? Vc(fc) : dc;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function ll(e, t, n) {
	let r = this.cache, i = t.length, a = Tc(n, i);
	Cc(r, a) || (e.uniform1iv(this.addr, a), wc(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || hc, a[e]);
}
function ul(e, t, n) {
	let r = this.cache, i = t.length, a = Tc(n, i);
	Cc(r, a) || (e.uniform1iv(this.addr, a), wc(r, a));
	let o;
	o = this.type === e.SAMPLER_CUBE_SHADOW ? Vc(pc) : gc;
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || o, a[e]);
}
function dl(e, t, n) {
	let r = this.cache, i = t.length, a = Tc(n, i);
	Cc(r, a) || (e.uniform1iv(this.addr, a), wc(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || mc, a[e]);
}
function fl(e) {
	switch (e) {
		case 5126: return qc;
		case 35664: return Jc;
		case 35665: return Yc;
		case 35666: return Xc;
		case 35674: return Zc;
		case 35675: return Qc;
		case 35676: return $c;
		case 5124:
		case 35670: return el;
		case 35667:
		case 35671: return tl;
		case 35668:
		case 35672: return nl;
		case 35669:
		case 35673: return rl;
		case 5125: return il;
		case 36294: return al;
		case 36295: return ol;
		case 36296: return sl;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return cl;
		case 35679:
		case 36299:
		case 36307: return ll;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return ul;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return dl;
	}
}
var pl = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Kc(t.type);
	}
}, ml = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = fl(t.type);
	}
}, hl = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, gl = /(\w+)(\])?(\[|\.)?/g;
function _l(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function vl(e, t, n) {
	let r = e.name, i = r.length;
	for (gl.lastIndex = 0;;) {
		let a = gl.exec(r), o = gl.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			_l(n, l === void 0 ? new pl(s, e, t) : new ml(s, e, t));
			break;
		}
		{
			let e = n.map[s];
			e === void 0 && (e = new hl(s), _l(n, e)), n = e;
		}
	}
}
var yl = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			vl(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function bl(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var xl = 37297, Sl = 0;
function Cl(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var wl = /*@__PURE__*/ new W();
function Tl(e) {
	Kt._getMatrix(wl, Kt.workingColorSpace, e);
	let t = `mat3( ${wl.elements.map((e) => e.toFixed(4))} )`;
	switch (Kt.getTransfer(e)) {
		case Xe: return [t, "LinearTransferOETF"];
		case Ze: return [t, "sRGBTransferOETF"];
		default: return z("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function El(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + Cl(e.getShaderSource(t), r);
	}
	return i;
}
function Dl(e, t) {
	let n = Tl(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,
		"}"
	].join("\n");
}
var Ol = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function kl(e, t) {
	let n = Ol[t];
	return n === void 0 ? (z("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var Al = /*@__PURE__*/ new U();
function jl() {
	return Kt.getLuminanceCoefficients(Al), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${Al.x.toFixed(4)}, ${Al.y.toFixed(4)}, ${Al.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function Ml(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Fl).join("\n");
}
function Nl(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function Pl(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function Fl(e) {
	return e !== "";
}
function Il(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g, t.numLightProbeGrids);
}
function Ll(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Rl = /^[ \t]*#include +<([\w\d./]+)>/gm;
function zl(e) {
	return e.replace(Rl, Bl);
}
function Bl(e, t) {
	let n = J[t];
	if (n === void 0) throw Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
	return zl(n);
}
var Vl = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Hl(e) {
	return e.replace(Vl, Ul);
}
function Ul(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function Wl(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var Gl = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function Kl(e) {
	return Gl[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var ql = { 302: "ENVMAP_MODE_REFRACTION" };
function Jl(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : ql[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var Yl = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function Xl(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Yl[e.combine] || "ENVMAP_BLENDING_NONE";
}
function Zl(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = Kl(n), l = n.envMapPMREM === !0 ? "ENVMAP_TYPE_PMREM" : "ENVMAP_TYPE_CUBE", u = Jl(n), d = Xl(n), f = Ml(n), p = Nl(a), m = i.createProgram(), h, g, _ = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (h = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(Fl).join("\n"), h.length > 0 && (h += "\n"), g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(Fl).join("\n"), g.length > 0 && (g += "\n")) : (h = [
		Wl(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.diffuseRoughnessMapUv ? "#define DIFFUSE_ROUGHNESSMAP_UV " + n.diffuseRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(Fl).join("\n"), g = [
		Wl(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		n.envMapPMREM ? "#define ENVMAP_MAX_LOD " + n.envMapMaxLod + ".0" : "",
		n.envMapPMREM ? "#define ENVMAP_SIZE " + n.envMapSize + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughness ? "#define USE_DIFFUSE_ROUGHNESS" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.retroreflection ? "#define USE_RETROREFLECTION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : J.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : kl("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		J.colorspace_pars_fragment,
		Dl("linearToOutputTexel", n.outputColorSpace),
		jl(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(Fl).join("\n")), o = zl(o), o = Il(o, n), o = Ll(o, n), s = zl(s), s = Il(s, n), s = Ll(s, n), o = Hl(o), s = Hl(s), n.isRawShaderMaterial !== !0 && (_ = "#version 300 es\n", h = [
		f,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + h, g = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + g);
	let v = _ + h + o, y = _ + g + s, b = bl(i, i.VERTEX_SHADER, v), x = bl(i, i.FRAGMENT_SHADER, y);
	i.attachShader(m, b), i.attachShader(m, x), n.index0AttributeName === void 0 ? n.hasPositionAttribute === !0 && i.bindAttribLocation(m, 0, "position") : i.bindAttribLocation(m, 0, n.index0AttributeName), i.linkProgram(m);
	function S(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(m) || "", r = i.getShaderInfoLog(b) || "", a = i.getShaderInfoLog(x) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(m, i.LINK_STATUS) === !1) {
				if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, m, b, x);
				else {
					let e = El(i, b, "vertex"), n = El(i, x, "fragment");
					B("WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(m, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
				}
			} else o === "" ? (s === "" || c === "") && (u = !1) : z("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: h
				},
				fragmentShader: {
					log: c,
					prefix: g
				}
			});
		}
		i.deleteShader(b), i.deleteShader(x), C = new yl(i, m), w = Pl(i, m);
	}
	let C;
	this.getUniforms = function() {
		return C === void 0 && S(this), C;
	};
	let w;
	this.getAttributes = function() {
		return w === void 0 && S(this), w;
	};
	let T = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return T === !1 && (T = i.getProgramParameter(m, xl)), T;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(m), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = Sl++, this.cacheKey = t, this.usedTimes = 1, this.program = m, this.vertexShader = b, this.fragmentShader = x, this;
}
var Ql = 0, $l = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e, t, n) {
		let r = this._getShaderCacheForMaterial(e);
		return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderStage(e) {
		return this._getShaderStage(e.vertexShader);
	}
	getFragmentShaderStage(e) {
		return this._getShaderStage(e.fragmentShader);
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new eu(e), t.set(e, n)), n;
	}
}, eu = class {
	constructor(e) {
		this.id = Ql++, this.code = e, this.usedTimes = 0;
	}
};
function tu(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function nu(e, t, n, r, i, a) {
	let o = new bn(), s = new $l(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function p(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function m(i, o, l, u, m, h) {
		let g = u.fog, _ = m.geometry, v = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, b = t.get(i.envMap || v, y), x = f[i.type], S = r.precision;
		i.precision !== null && (S = r.getMaxPrecision(i.precision), S !== i.precision && z("WebGLProgram.getParameters:", i.precision, "not supported, using", S, "instead."));
		let C = _.morphAttributes.position || _.morphAttributes.normal || _.morphAttributes.color, w = C === void 0 ? 0 : C.length, T = 0;
		_.morphAttributes.position !== void 0 && (T = 1), _.morphAttributes.normal !== void 0 && (T = 2), _.morphAttributes.color !== void 0 && (T = 3);
		let E, D, O, k;
		if (x) {
			let e = As[x];
			E = e.vertexShader, D = e.fragmentShader;
		} else {
			E = i.vertexShader, D = i.fragmentShader;
			let e = s.getVertexShaderStage(i), t = s.getFragmentShaderStage(i);
			s.update(i, e, t), O = e.id, k = t.id;
		}
		let A = e.getRenderTarget(), j = e.state.buffers.depth.getReversed(), ee = m.isInstancedMesh === !0, M = m.isBatchedMesh === !0, te = !!i.map, N = !!i.matcap, ne = !!b, re = ne && b.isPMREMTexture === !0, ie = !!i.aoMap, ae = !!i.lightMap, oe = !!i.bumpMap && i.wireframe === !1, se = !!i.normalMap, ce = !!i.displacementMap, le = !!i.emissiveMap, P = !!i.metalnessMap, ue = !!i.roughnessMap, de = i.anisotropy > 0, fe = i.clearcoat > 0, pe = i.diffuseRoughness > 0, me = i.dispersion > 0, he = i.retroreflectivity > 0, ge = i.iridescence > 0, _e = i.sheen > 0, ve = i.transmission > 0, ye = de && !!i.anisotropyMap, be = fe && !!i.clearcoatMap, xe = fe && !!i.clearcoatNormalMap, Se = fe && !!i.clearcoatRoughnessMap, Ce = pe && !!i.diffuseRoughnessMap, we = ge && !!i.iridescenceMap, Te = ge && !!i.iridescenceThicknessMap, Ee = _e && !!i.sheenColorMap, De = _e && !!i.sheenRoughnessMap, Oe = !!i.specularMap, ke = !!i.specularColorMap, Ae = !!i.specularIntensityMap, je = ve && !!i.transmissionMap, Me = ve && !!i.thicknessMap, Ne = !!i.gradientMap, Pe = !!i.alphaMap, F = i.alphaTest > 0, Fe = !!i.alphaHash, Ie = !!i.extensions, Le = 0;
		i.toneMapped && (A === null || A.isXRRenderTarget === !0) && (Le = e.toneMapping);
		let I = re ? b.isCompressedCubeTexture ? b.image[0].mipmaps : b.mipmaps : null, Re = {
			shaderID: x,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: E,
			fragmentShader: D,
			defines: i.defines,
			customVertexShaderID: O,
			customFragmentShaderID: k,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: S,
			batching: M,
			batchingColor: M && m._colorsTexture !== null,
			instancing: ee,
			instancingColor: ee && m.instanceColor !== null,
			instancingMorph: ee && m.morphTexture !== null,
			outputColorSpace: A === null ? e.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : Kt.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: te,
			matcap: N,
			envMap: ne,
			envMapMode: ne && b.mapping,
			envMapPMREM: re,
			envMapMaxLod: re ? I.length - 1 : null,
			envMapSize: re ? I[0].width : null,
			aoMap: ie,
			lightMap: ae,
			bumpMap: oe,
			normalMap: se,
			displacementMap: ce,
			emissiveMap: le,
			normalMapObjectSpace: se && i.normalMapType === 1,
			normalMapTangentSpace: se && i.normalMapType === 0,
			packedNormalMap: se && i.normalMapType === 0 && tu(i.normalMap.format),
			metalnessMap: P,
			roughnessMap: ue,
			anisotropy: de,
			anisotropyMap: ye,
			clearcoat: fe,
			clearcoatMap: be,
			clearcoatNormalMap: xe,
			clearcoatRoughnessMap: Se,
			diffuseRoughness: pe,
			diffuseRoughnessMap: Ce,
			dispersion: me,
			retroreflection: he,
			iridescence: ge,
			iridescenceMap: we,
			iridescenceThicknessMap: Te,
			sheen: _e,
			sheenColorMap: Ee,
			sheenRoughnessMap: De,
			specularMap: Oe,
			specularColorMap: ke,
			specularIntensityMap: Ae,
			transmission: ve,
			transmissionMap: je,
			thicknessMap: Me,
			gradientMap: Ne,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: Pe,
			alphaTest: F,
			alphaHash: Fe,
			combine: i.combine,
			mapUv: te && p(i.map.channel),
			aoMapUv: ie && p(i.aoMap.channel),
			lightMapUv: ae && p(i.lightMap.channel),
			bumpMapUv: oe && p(i.bumpMap.channel),
			normalMapUv: se && p(i.normalMap.channel),
			displacementMapUv: ce && p(i.displacementMap.channel),
			emissiveMapUv: le && p(i.emissiveMap.channel),
			metalnessMapUv: P && p(i.metalnessMap.channel),
			roughnessMapUv: ue && p(i.roughnessMap.channel),
			anisotropyMapUv: ye && p(i.anisotropyMap.channel),
			clearcoatMapUv: be && p(i.clearcoatMap.channel),
			clearcoatNormalMapUv: xe && p(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: Se && p(i.clearcoatRoughnessMap.channel),
			diffuseRoughnessMapUv: Ce && p(i.diffuseRoughnessMap.channel),
			iridescenceMapUv: we && p(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: Te && p(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: Ee && p(i.sheenColorMap.channel),
			sheenRoughnessMapUv: De && p(i.sheenRoughnessMap.channel),
			specularMapUv: Oe && p(i.specularMap.channel),
			specularColorMapUv: ke && p(i.specularColorMap.channel),
			specularIntensityMapUv: Ae && p(i.specularIntensityMap.channel),
			transmissionMapUv: je && p(i.transmissionMap.channel),
			thicknessMapUv: Me && p(i.thicknessMap.channel),
			alphaMapUv: Pe && p(i.alphaMap.channel),
			vertexTangents: !!_.attributes.tangent && (se || de),
			vertexNormals: !!_.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!_.attributes.color && _.attributes.color.itemSize === 4,
			pointsUvs: m.isPoints === !0 && !!_.attributes.uv && (te || Pe),
			fog: !!g,
			useFog: i.fog === !0,
			fogExp2: !!g && g.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || _.attributes.normal === void 0 && se === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: j,
			skinning: m.isSkinnedMesh === !0,
			hasPositionAttribute: _.attributes.position !== void 0,
			morphTargets: _.morphAttributes.position !== void 0,
			morphNormals: _.morphAttributes.normal !== void 0,
			morphColors: _.morphAttributes.color !== void 0,
			morphTargetsCount: w,
			morphTextureStride: T,
			numSunLights: o.sun.length,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numSunLightShadows: o.sunShadowMap.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: h.filter((e) => e.texture !== null).length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: Le,
			decodeVideoTexture: te && i.map.isVideoTexture === !0 && Kt.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: le && i.emissiveMap.isVideoTexture === !0 && Kt.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: Ie && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (Ie && i.extensions.multiDraw === !0 || M) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return Re.vertexUv1s = c.has(1), Re.vertexUv2s = c.has(2), Re.vertexUv3s = c.has(3), c.clear(), Re;
	}
	function h(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (g(n, t), _(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function g(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapPMREM), e.push(t.envMapMaxLod), e.push(t.envMapSize), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.diffuseRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.numSunLights), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numSunLightShadows), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.numLightProbeGrids), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function _(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.retroreflection && o.enable(24), t.diffuseRoughness && o.enable(25), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
	}
	function v(e) {
		let t = f[e.type], n;
		if (t) {
			let e = As[t];
			n = lo.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function y(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new Zl(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function b(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function x(e) {
		s.remove(e);
	}
	function S() {
		s.dispose();
	}
	return {
		getParameters: m,
		getProgramCacheKey: h,
		getUniforms: v,
		acquireProgram: y,
		releaseProgram: b,
		releaseShaderCache: x,
		programs: l,
		dispose: S
	};
}
function ru() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function iu(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function au(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function ou() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l, u) {
		u.reversedDepth === !0 && (c = -c);
		let d = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(d) : a.transparent === !0 ? i.push(d) : n.push(d);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t) {
		n.length > 1 && n.sort(e || iu), r.length > 1 && r.sort(t || au), i.length > 1 && i.sort(t || au);
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function su() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new ou(), e.set(t, [i])) : n >= r.length ? (i = new ou(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function cu() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					direction: new U(),
					color: new G()
				};
				break;
			case "SpotLight":
				n = {
					position: new U(),
					direction: new U(),
					color: new G(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new U(),
					color: new G(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new U(),
					skyColor: new G(),
					groundColor: new G()
				};
				break;
			case "RectAreaLight": n = {
				color: new G(),
				position: new U(),
				halfWidth: new U(),
				halfHeight: new U()
			};
		}
		return e[t.id] = n, n;
	} };
}
function lu() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new H()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new H()
				};
				break;
			case "PointLight": n = {
				shadowIntensity: 1,
				shadowBias: 0,
				shadowNormalBias: 0,
				shadowRadius: 1,
				shadowMapSize: new H(),
				shadowCameraNear: 1,
				shadowCameraFar: 1e3
			};
		}
		return e[t.id] = n, n;
	} };
}
var uu = 0;
function du(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function fu(e) {
	let t = new cu(), n = lu(), r = {
		version: 0,
		hash: {
			sunLength: -1,
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numSunShadows: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		sun: [],
		sunShadow: [],
		sunShadowMap: [],
		sunShadowMatrix: [],
		sunShadowCascade: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new U());
	let i = new U(), a = new ln(), o = new ln();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0;
		i.sort(du);
		for (let e = 0, S = i.length; e < S; e++) {
			let S = i[e], C = S.color, w = S.intensity, T = S.distance, E = null;
			if (S.shadow && S.shadow.map && (E = S.shadow.map.texture.format === 1030 ? S.shadow.map.texture : S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight) a += C.r * w, o += C.g * w, s += C.b * w;
			else if (S.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(S.sh.coefficients[e], w);
				x++;
			} else if (S.isSunLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()), r.sunShadow[l] = t, r.sunShadowMap[l] = E;
					let i = e.getViewportCount();
					for (let t = 0; t < i; t++) r.sunShadowMatrix[u + t] = e.getMatrix(t), r.sunShadowCascade[u + t] = e._cascadeData[t];
					u += i, l++;
				}
				r.sun[c] = e, c++;
			} else if (S.isDirectionalLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[d] = t, r.directionalShadowMap[d] = E, r.directionalShadowMatrix[d] = S.shadow.matrix, g++;
				}
				r.directional[d] = e, d++;
			} else if (S.isSpotLight) {
				let e = t.get(S);
				e.position.setFromMatrixPosition(S.matrixWorld), e.color.copy(C).multiplyScalar(w), e.distance = T, e.coneCos = Math.cos(S.angle), e.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), e.decay = S.decay, r.spot[p] = e;
				let i = S.shadow;
				if (S.map && (r.spotLightMap[y] = S.map, y++, i.updateMatrices(S), S.castShadow && b++), r.spotLightMatrix[p] = i.matrix, S.castShadow) {
					let e = n.get(S);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[p] = e, r.spotShadowMap[p] = E, v++;
				}
				p++;
			} else if (S.isRectAreaLight) {
				let e = t.get(S);
				e.color.copy(C).multiplyScalar(w), e.halfWidth.set(S.width * .5, 0, 0), e.halfHeight.set(0, S.height * .5, 0), r.rectArea[m] = e, m++;
			} else if (S.isPointLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), e.distance = S.distance, e.decay = S.decay, S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[f] = t, r.pointShadowMap[f] = E, r.pointShadowMatrix[f] = S.shadow.matrix, _++;
				}
				r.point[f] = e, f++;
			} else if (S.isHemisphereLight) {
				let e = t.get(S);
				e.skyColor.copy(S.color).multiplyScalar(w), e.groundColor.copy(S.groundColor).multiplyScalar(w), r.hemi[h] = e, h++;
			}
		}
		m > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = Y.LTC_FLOAT_1, r.rectAreaLTC2 = Y.LTC_FLOAT_2) : (r.rectAreaLTC1 = Y.LTC_HALF_1, r.rectAreaLTC2 = Y.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let S = r.hash;
		(S.sunLength !== c || S.directionalLength !== d || S.pointLength !== f || S.spotLength !== p || S.rectAreaLength !== m || S.hemiLength !== h || S.numSunShadows !== l || S.numDirectionalShadows !== g || S.numPointShadows !== _ || S.numSpotShadows !== v || S.numSpotMaps !== y || S.numLightProbes !== x) && (r.sun.length = c, r.directional.length = d, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = h, r.sunShadow.length = l, r.sunShadowMap.length = l, r.sunShadowMatrix.length = u, r.sunShadowCascade.length = u, r.directionalShadow.length = g, r.directionalShadowMap.length = g, r.directionalShadowMatrix.length = g, r.pointShadow.length = _, r.pointShadowMap.length = _, r.pointShadowMatrix.length = _, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + y - b, r.spotLightMap.length = y, r.numSpotLightShadowsWithMaps = b, r.numLightProbes = x, S.sunLength = c, S.directionalLength = d, S.pointLength = f, S.spotLength = p, S.rectAreaLength = m, S.hemiLength = h, S.numSunShadows = l, S.numDirectionalShadows = g, S.numPointShadows = _, S.numSpotShadows = v, S.numSpotMaps = y, S.numLightProbes = x, r.version = uu++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = t.matrixWorldInverse;
		for (let t = 0, p = e.length; t < p; t++) {
			let p = e[t];
			if (p.isSunLight) {
				let e = r.sun[n];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), n++;
			} else if (p.isDirectionalLight) {
				let e = r.directional[s];
				e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), s++;
			} else if (p.isSpotLight) {
				let e = r.spot[l];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), l++;
			} else if (p.isRectAreaLight) {
				let e = r.rectArea[u];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), o.identity(), a.copy(p.matrixWorld), a.premultiply(f), o.extractRotation(a), e.halfWidth.set(p.width * .5, 0, 0), e.halfHeight.set(0, p.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), u++;
			} else if (p.isPointLight) {
				let e = r.point[c];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), c++;
			} else if (p.isHemisphereLight) {
				let e = r.hemi[d];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), d++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function pu(e) {
	let t = new fu(e), n = [], r = [], i = [];
	function a(e) {
		u.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		e.isLightProbeGrid ? i.push(e) : n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c() {
		t.setup(n), i.sort((e, t) => e.priority - t.priority || e.id - t.id);
	}
	function l(e) {
		t.setupView(n, e);
	}
	let u = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: u,
		setupLights: c,
		setupLightsView: l,
		pushLight: o,
		pushShadow: s
	};
}
function mu(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new pu(e), t.set(n, [a])) : r >= i.length ? (a = new pu(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var hu = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", gu = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", _u = [
	/*@__PURE__*/ new U(1, 0, 0),
	/*@__PURE__*/ new U(-1, 0, 0),
	/*@__PURE__*/ new U(0, 1, 0),
	/*@__PURE__*/ new U(0, -1, 0),
	/*@__PURE__*/ new U(0, 0, 1),
	/*@__PURE__*/ new U(0, 0, -1)
], vu = [
	/*@__PURE__*/ new U(0, -1, 0),
	/*@__PURE__*/ new U(0, -1, 0),
	/*@__PURE__*/ new U(0, 0, 1),
	/*@__PURE__*/ new U(0, 0, -1),
	/*@__PURE__*/ new U(0, -1, 0),
	/*@__PURE__*/ new U(0, -1, 0)
], yu = /*@__PURE__*/ new ln(), bu = /*@__PURE__*/ new U(), xu = /*@__PURE__*/ new U();
function Su(e, t, n) {
	let r = new wi(), i = new H(), a = new H(), o = new rn(), s = new _o(), c = new vo(), l = {}, u = n.maxTextureSize, d = {
		0: 1,
		1: 0,
		2: 2
	}, f = new po({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new H() },
			radius: { value: 4 }
		},
		vertexShader: hu,
		fragmentShader: gu
	}), p = f.clone();
	p.defines.HORIZONTAL_PASS = 1;
	let h = new zr();
	h.setAttribute("position", new wr(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let g = new K(h, f), v = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let y = this.type;
	this.render = function(t, n, s) {
		if (v.enabled === !1 || v.autoUpdate === !1 && v.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (z("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = 1);
		let c = e.getRenderTarget(), l = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), f = e.state;
		f.setBlending(0), f.buffers.depth.getReversed() === !0 ? f.buffers.color.setClear(0, 0, 0, 0) : f.buffers.color.setClear(1, 1, 1, 1), f.buffers.depth.setTest(!0), f.setScissorTest(!1);
		let p = y !== this.type;
		p && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let c = 0, l = t.length; c < l; c++) {
			let l = t[c], d = l.shadow;
			if (d === void 0) {
				z("WebGLShadowMap:", l, "has no shadow.");
				continue;
			}
			if (d.autoUpdate === !1 && d.needsUpdate === !1) continue;
			i.copy(d.mapSize);
			let h = d.getFrameExtents();
			i.multiply(h), a.copy(d.mapSize), (i.x > u || i.y > u) && (i.x > u && (a.x = Math.floor(u / h.x), i.x = a.x * h.x, d.mapSize.x = a.x), i.y > u && (a.y = Math.floor(u / h.y), i.y = a.y * h.y, d.mapSize.y = a.y));
			let g = e.state.buffers.depth.getReversed();
			if (d.camera._reversedDepth = g, d.map === null || p === !0) {
				if (d.map !== null && (d.map.depthTexture !== null && (d.map.depthTexture.dispose(), d.map.depthTexture = null), d.map.dispose()), this.type === 3) {
					if (l.isPointLight) {
						z("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					d.map = new on(i.x, i.y, {
						format: oe,
						type: D,
						minFilter: _,
						magFilter: _,
						generateMipmaps: !1
					}), d.map.texture.name = l.name + ".shadowMap", d.map.depthTexture = new ki(i.x, i.y, E), d.map.depthTexture.name = l.name + ".shadowMapDepth", d.map.depthTexture.format = ne, d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = m, d.map.depthTexture.magFilter = m;
				} else l.isPointLight ? (d.map = new zs(i.x), d.map.depthTexture = new Ai(i.x, T)) : (d.map = new on(i.x, i.y), d.map.depthTexture = new ki(i.x, i.y, T)), d.map.depthTexture.name = l.name + ".shadowMap", d.map.depthTexture.format = ne, this.type === 1 ? (d.map.depthTexture.compareFunction = g ? 518 : 515, d.map.depthTexture.minFilter = _, d.map.depthTexture.magFilter = _) : (d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = m, d.map.depthTexture.magFilter = m);
				d.camera.updateProjectionMatrix();
			}
			d.map.isWebGLCubeRenderTarget !== !0 && (d.map.width !== i.x || d.map.height !== i.y) && d.map.setSize(i.x, i.y);
			let v = d.map.isWebGLCubeRenderTarget ? 6 : d.getViewportCount();
			l.isPointLight !== !0 && d.updateMatrices(l, s);
			let y = d.camera.layers.mask & 4294967294 ? d.camera.layers : s.layers;
			for (let t = 0; t < v; t++) {
				let i = d.getCamera(t);
				if (l.isPointLight) {
					let e = d.camera, n = d.matrix, r = l.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), bu.setFromMatrixPosition(l.matrixWorld), e.position.copy(bu), xu.copy(e.position), xu.add(_u[t]), e.up.copy(vu[t]), e.lookAt(xu), e.updateMatrixWorld(), n.makeTranslation(-bu.x, -bu.y, -bu.z), yu.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), d._frustum.setFromProjectionMatrix(yu, e.coordinateSystem, e.reversedDepth);
				}
				if (d.map.isWebGLCubeRenderTarget) e.setRenderTarget(d.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(d.map), e.clear());
					let n = d.getViewport(t);
					o.set(a.x * n.x, a.y * n.y, a.x * n.z, a.y * n.w), f.viewport(o);
				}
				r = d.getFrustum(t), S(n, s, i, l, y, this.type);
			}
			d.isPointLightShadow !== !0 && this.type === 3 && b(d, s), d.needsUpdate = !1;
		}
		y = this.type, v.needsUpdate = !1, e.setRenderTarget(c, l, d);
	};
	function b(n, r) {
		let a = t.update(g);
		f.defines.VSM_SAMPLES !== n.blurSamples && (f.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), n.mapPass === null ? n.mapPass = new on(i.x, i.y, {
			format: oe,
			type: D
		}) : (n.mapPass.width !== n.map.width || n.mapPass.height !== n.map.height) && n.mapPass.setSize(n.map.width, n.map.height), f.uniforms.shadow_pass.value = n.map.depthTexture, f.uniforms.resolution.value.set(n.map.width, n.map.height), f.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, a, f, g, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value.set(n.map.width, n.map.height), p.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, a, p, g, null);
	}
	function x(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? c : s, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = l[e];
			r === void 0 && (r = {}, l[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", C)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? d[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function S(n, i, a, o, s, c) {
		if (n.visible === !1) return;
		if (n.layers.test(s) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && c === 3) && (!n.frustumCulled || n.intersectsFrustum(r))) {
			n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
			let r = t.update(n), s = n.material;
			if (Array.isArray(s)) {
				let t = r.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = s[u.materialIndex];
					if (d && d.visible) {
						let t = x(n, d, o, c);
						n.onBeforeShadow(e, n, i, a, r, t, u), e.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(e, n, i, a, r, t, u);
					}
				}
			} else if (s.visible) {
				let t = x(n, s, o, c);
				n.onBeforeShadow(e, n, i, a, r, t, null), e.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(e, n, i, a, r, t, null);
			}
		}
		let l = n.children;
		for (let e = 0, t = l.length; e < t; e++) S(l[e], i, a, o, s, c);
	}
	function C(e) {
		e.target.removeEventListener("dispose", C);
		for (let t in l) {
			let n = l[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function Cu(e, t) {
	function n() {
		let t = !1, n = new rn(), r = null, i = new rn(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? P(e.DEPTH_TEST) : ue(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = ut[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? P(e.STENCIL_TEST) : ue(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = {}, l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new G(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, ee = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), M = !1, te = 0, N = e.getParameter(e.VERSION);
	N.indexOf("WebGL") === -1 ? N.indexOf("OpenGL ES") !== -1 && (te = parseFloat(/^OpenGL ES (\d)/.exec(N)[1]), M = te >= 2) : (te = parseFloat(/^WebGL (\d)/.exec(N)[1]), M = te >= 1);
	let ne = null, re = {}, ie = e.getParameter(e.SCISSOR_BOX), ae = e.getParameter(e.VIEWPORT), oe = new rn().fromArray(ie), se = new rn().fromArray(ae);
	function ce(t, n, r, i) {
		let a = /* @__PURE__ */ new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let le = {};
	le[e.TEXTURE_2D] = ce(e.TEXTURE_2D, e.TEXTURE_2D, 1), le[e.TEXTURE_CUBE_MAP] = ce(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), le[e.TEXTURE_2D_ARRAY] = ce(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), le[e.TEXTURE_3D] = ce(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), P(e.DEPTH_TEST), o.setFunc(3), ve(!1), ye(1), P(e.CULL_FACE), ge(0);
	function P(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function ue(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function de(t, n) {
		return f[t] !== n && (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function fe(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function pe(t) {
		return h !== t && (e.useProgram(t), h = t, !0);
	}
	let me = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	me[103] = e.MIN, me[104] = e.MAX;
	let he = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function ge(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) g === !0 && (ue(e.BLEND), g = !1);
		else if (g === !1 && (P(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default: B("WebGLState: Invalid blending: ", t);
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						B("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						B("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default: B("WebGLState: Invalid blending: ", t);
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
		} else a = a || n, o = o || r, s = s || i, (n !== v || a !== x) && (e.blendEquationSeparate(me[n], me[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(he[r], he[i], he[o], he[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function _e(t, n) {
		t.side === 2 ? ue(e.CULL_FACE) : P(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), ve(r), t.blending === 1 && t.transparent === !1 ? ge(0) : ge(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), xe(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? P(e.SAMPLE_ALPHA_TO_COVERAGE) : ue(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function ve(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function ye(t) {
		t === 0 ? ue(e.CULL_FACE) : (P(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function be(t) {
		t !== k && (M && e.lineWidth(t), k = t);
	}
	function xe(t, n, r) {
		t ? (P(e.POLYGON_OFFSET_FILL), (A !== n || j !== r) && (A = n, j = r, o.getReversed() && (n = -n, r = -r), e.polygonOffset(n, r))) : ue(e.POLYGON_OFFSET_FILL);
	}
	function Se(t) {
		t ? P(e.SCISSOR_TEST) : ue(e.SCISSOR_TEST);
	}
	function Ce(t) {
		t === void 0 && (t = e.TEXTURE0 + ee - 1), ne !== t && (e.activeTexture(t), ne = t);
	}
	function we(t, n, r) {
		r === void 0 && (r = ne === null ? e.TEXTURE0 + ee - 1 : ne);
		let i = re[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, re[r] = i), (i.type !== t || i.texture !== n) && (ne !== r && (e.activeTexture(r), ne = r), e.bindTexture(t, n || le[t]), i.type = t, i.texture = n);
	}
	function Te() {
		let t = re[ne];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function Ee() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function De() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Oe() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function ke() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Ae() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function je() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Me() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Ne() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Pe() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function F() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Fe(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function Ie(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function Le(t) {
		oe.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), oe.copy(t));
	}
	function I(t) {
		se.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), se.copy(t));
	}
	function Re(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), e.uniformBlockBinding(n, i, i), r.set(t, i));
	}
	function L(t, n, r) {
		let i = l.get(n).get(t);
		c[i] !== r && (e.bindBufferBase(e.UNIFORM_BUFFER, i, r), c[i] = r);
	}
	function R() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, ne = null, re = {}, f = {}, c = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new G(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, oe.set(0, 0, e.canvas.width, e.canvas.height), se.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: P,
		disable: ue,
		bindFramebuffer: de,
		drawBuffers: fe,
		useProgram: pe,
		setBlending: ge,
		setMaterial: _e,
		setFlipSided: ve,
		setCullFace: ye,
		setLineWidth: be,
		setPolygonOffset: xe,
		setScissorTest: Se,
		activeTexture: Ce,
		bindTexture: we,
		unbindTexture: Te,
		compressedTexImage2D: Ee,
		compressedTexImage3D: De,
		texImage2D: Pe,
		texImage3D: F,
		pixelStorei: Ie,
		getParameter: Fe,
		updateUBOMapping: Re,
		uniformBlockBinding: L,
		texStorage2D: Me,
		texStorage3D: Ne,
		texSubImage2D: Oe,
		texSubImage3D: ke,
		compressedTexSubImage2D: Ae,
		compressedTexSubImage3D: je,
		scissor: Le,
		viewport: I,
		reset: R
	};
}
function wu(e, t, n, r, i, a, o) {
	let s = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new H(), u = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new Set(), x, S = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new Set(), w = new FinalizationRegistry((e) => C.delete(e)), T = !1;
	try {
		T = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function E(e, t) {
		return T ? new OffscreenCanvas(e, t) : rt("canvas");
	}
	function D(e, t, n) {
		let r = 1, i = R(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) {
			if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
				let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
				x === void 0 && (x = E(n, a));
				let o = t ? E(n, a) : x;
				return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), z("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
			}
			return "data" in e && z("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		}
		return e;
	}
	function O(e) {
		return e.generateMipmaps;
	}
	function k(t) {
		e.generateMipmap(t);
	}
	function A(t) {
		return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
	}
	function j(n, r, i, a, o, s = !1) {
		if (n !== null) {
			if (e[n] !== void 0) return e[n];
			z("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
		}
		let c;
		a && (c = t.get("EXT_texture_norm16"), c || z("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = r;
		if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && c && (l = c.R16_EXT), i === e.SHORT && c && (l = c.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && c && (l = c.RG16_EXT), i === e.SHORT && c && (l = c.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), i === e.SHORT && c && (l = c.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) {
			let t = s ? Xe : Kt.getTransfer(o);
			i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), i === e.SHORT && c && (l = c.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1);
		}
		return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get("EXT_color_buffer_float"), l;
	}
	function ee(t, n) {
		let r;
		return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, z("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r;
	}
	function M(e, t) {
		return O(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function te(e) {
		let t = new WeakRef(e);
		r.get(e).__ref = t, C.add(t), w.register(e, t, t);
	}
	function N(e) {
		let t = r.get(e).__ref;
		t !== void 0 && (C.delete(t), w.unregister(t));
	}
	function ne(e) {
		ae(e.target);
	}
	function ie(e) {
		oe(e.target);
	}
	function ae(e) {
		e.removeEventListener("dispose", ne), N(e), ce(e), e.isVideoTexture && u.delete(e), e.isHTMLTexture && b.delete(e);
	}
	function oe(e) {
		e.removeEventListener("dispose", ie), N(e), P(e);
	}
	function se() {
		for (let e of C) {
			let t = e.deref();
			t !== void 0 && (t.isRenderTarget === !0 ? oe(t) : ae(t));
		}
		C.clear(), b.clear();
	}
	function ce(e) {
		let t = r.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, i = S.get(n);
		if (i) {
			let r = i[t.__cacheKey];
			r.usedTimes--, r.usedTimes === 0 && le(e), Object.keys(i).length === 0 && S.delete(n);
		}
		r.remove(e);
	}
	function le(t) {
		let n = r.get(t);
		e.deleteTexture(n.__webglTexture);
		let i = t.source, a = S.get(i);
		delete a[n.__cacheKey], o.memory.textures--;
	}
	function P(t) {
		let n = r.get(t);
		n.__depthDisposeCallback && n.__depthDisposeCallback();
		let i = t.depthTexture;
		if (i && i.renderTarget === t && ae(i), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
			if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);
			else e.deleteFramebuffer(n.__webglFramebuffer[t]);
			n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
		}
		else {
			if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);
			else e.deleteFramebuffer(n.__webglFramebuffer);
			if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
			n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
		}
		let a = t.textures;
		for (let t = 0, n = a.length; t < n; t++) {
			let n = r.get(a[t]);
			n.__webglTexture && (e.deleteTexture(n.__webglTexture), o.memory.textures--), r.remove(a[t]);
		}
		r.remove(t);
	}
	let ue = 0;
	function de() {
		ue = 0;
	}
	function fe() {
		return ue;
	}
	function pe(e) {
		ue = e;
	}
	function me() {
		let e = ue;
		return e >= i.maxTextures && z("WebGLTextures: Trying to use " + (e + 1) + " texture units while this GPU supports only " + i.maxTextures), ue += 1, e;
	}
	function he(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.mipmapsAutoUpdate), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function ge(t, i) {
		let a = r.get(t);
		if (t.isVideoTexture && Re(t), t.isRenderTargetTexture === !1 && t.isExternalTexture !== !0 && t.version > 0 && a.__version !== t.version) {
			let e = t.image;
			if (e === null) z("WebGLRenderer: Texture marked for update but no image data found.");
			else if (e.complete === !1) z("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				De(a, t, i);
				return;
			}
		} else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		n.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function _e(t, i) {
		let a = r.get(t);
		t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version ? De(a, t, i) : (t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null), n.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + i));
	}
	function ve(t, i) {
		let a = r.get(t);
		t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version ? De(a, t, i) : n.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function ye(t, i) {
		let a = r.get(t);
		t.version > 0 && a.__version !== t.version ? Oe(a, t, i) : n.bindTexture(e.TEXTURE_CUBE_MAP, a.__webglTexture, e.TEXTURE0 + i);
	}
	let be = {
		[d]: e.REPEAT,
		[f]: e.CLAMP_TO_EDGE,
		[p]: e.MIRRORED_REPEAT
	}, xe = {
		[m]: e.NEAREST,
		[h]: e.NEAREST_MIPMAP_NEAREST,
		[g]: e.NEAREST_MIPMAP_LINEAR,
		[_]: e.LINEAR,
		[v]: e.LINEAR_MIPMAP_NEAREST,
		[y]: e.LINEAR_MIPMAP_LINEAR
	}, Se = {
		512: e.NEVER,
		519: e.ALWAYS,
		513: e.LESS,
		515: e.LEQUAL,
		514: e.EQUAL,
		518: e.GEQUAL,
		516: e.GREATER,
		517: e.NOTEQUAL
	};
	function Ce(n, a) {
		if (a.type === 1015 && t.has("OES_texture_float_linear") === !1 && (a.magFilter === 1006 || a.magFilter === 1007 || a.magFilter === 1005 || a.magFilter === 1008 || a.minFilter === 1006 || a.minFilter === 1007 || a.minFilter === 1005 || a.minFilter === 1008) && z("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n, e.TEXTURE_WRAP_S, be[a.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, be[a.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, be[a.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, xe[a.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, xe[a.minFilter]), a.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, Se[a.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
			if (a.magFilter === 1003 || a.minFilter !== 1005 && a.minFilter !== 1008 || a.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
			if (a.anisotropy > 1 || r.get(a).__currentAnisotropy) {
				let o = t.get("EXT_texture_filter_anisotropic");
				e.texParameterf(n, o.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, i.getMaxAnisotropy())), r.get(a).__currentAnisotropy = a.anisotropy;
			}
		}
	}
	function we(t, n) {
		let r = !1;
		t.__webglInit === void 0 && (t.__webglInit = !0, n.addEventListener("dispose", ne), te(n));
		let i = n.source, a = S.get(i);
		a === void 0 && (a = {}, S.set(i, a));
		let s = he(n);
		if (s !== t.__cacheKey) {
			a[s] === void 0 && (a[s] = {
				texture: e.createTexture(),
				usedTimes: 0
			}, o.memory.textures++, r = !0), a[s].usedTimes++;
			let i = a[t.__cacheKey];
			i !== void 0 && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && le(n)), t.__cacheKey = s, t.__webglTexture = a[s].texture;
		}
		return r;
	}
	function Te(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function Ee(t, r, i, a) {
		let o = t.updateRanges;
		if (o.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r.width, r.height, i, a, r.data);
		else {
			o.sort((e, t) => e.start - t.start);
			let s = 0;
			for (let e = 1; e < o.length; e++) {
				let t = o[s], n = o[e], i = t.start + t.count, a = Te(n.start, r.width, 4), c = Te(t.start, r.width, 4);
				n.start <= i + 1 && a === c && Te(n.start + n.count - 1, r.width, 4) === a ? t.count = Math.max(t.count, n.start + n.count - t.start) : (++s, o[s] = n);
			}
			o.length = s + 1;
			let c = n.getParameter(e.UNPACK_ROW_LENGTH), l = n.getParameter(e.UNPACK_SKIP_PIXELS), u = n.getParameter(e.UNPACK_SKIP_ROWS);
			n.pixelStorei(e.UNPACK_ROW_LENGTH, r.width);
			for (let t = 0, s = o.length; t < s; t++) {
				let s = o[t], c = Math.floor(s.start / 4), l = Math.ceil(s.count / 4), u = c % r.width, d = Math.floor(c / r.width), f = l;
				n.pixelStorei(e.UNPACK_SKIP_PIXELS, u), n.pixelStorei(e.UNPACK_SKIP_ROWS, d), n.texSubImage2D(e.TEXTURE_2D, 0, u, d, f, 1, i, a, r.data);
			}
			t.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, c), n.pixelStorei(e.UNPACK_SKIP_PIXELS, l), n.pixelStorei(e.UNPACK_SKIP_ROWS, u);
		}
	}
	function De(t, o, s) {
		let c = e.TEXTURE_2D;
		(o.isDataArrayTexture || o.isCompressedArrayTexture) && (c = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (c = e.TEXTURE_3D);
		let l = we(t, o), u = o.source;
		n.bindTexture(c, t.__webglTexture, e.TEXTURE0 + s);
		let d = r.get(u);
		if (u.version !== d.__version || l === !0) {
			if (n.activeTexture(e.TEXTURE0 + s), !(typeof ImageBitmap < "u" && o.image instanceof ImageBitmap)) {
				let t = Kt.getPrimaries(Kt.workingColorSpace), r = o.colorSpace === "" ? null : Kt.getPrimaries(o.colorSpace), i = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
				n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i);
			}
			n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment);
			let t = D(o.image, !1, i.maxTextureSize);
			t = L(o, t);
			let r = a.convert(o.format, o.colorSpace), f = a.convert(o.type), p = j(o.internalFormat, r, f, o.normalized, o.colorSpace, o.isVideoTexture);
			Ce(c, o);
			let m, h = o.mipmaps, g = o.isVideoTexture !== !0, _ = d.__version === void 0 || l === !0, v = u.dataReady, y = M(o, t);
			if (o.isDepthTexture) p = ee(o.format === re, o.type), _ && (g ? n.texStorage2D(e.TEXTURE_2D, 1, p, t.width, t.height) : n.texImage2D(e.TEXTURE_2D, 0, p, t.width, t.height, 0, r, f, null));
			else if (o.isDataTexture) {
				if (h.length > 0) {
					g && _ && n.texStorage2D(e.TEXTURE_2D, y, p, h[0].width, h[0].height);
					for (let t = 0, i = h.length; t < i; t++) m = h[t], g ? v && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, r, f, m.data) : n.texImage2D(e.TEXTURE_2D, t, p, m.width, m.height, 0, r, f, m.data);
					o.generateMipmaps = !1;
				} else g ? (_ && n.texStorage2D(e.TEXTURE_2D, y, p, t.width, t.height), v && Ee(o, t, r, f)) : n.texImage2D(e.TEXTURE_2D, 0, p, t.width, t.height, 0, r, f, t.data);
			} else if (o.isCompressedTexture) {
				if (o.isCompressedArrayTexture) {
					g && _ && n.texStorage3D(e.TEXTURE_2D_ARRAY, y, p, h[0].width, h[0].height, t.depth);
					for (let i = 0, a = h.length; i < a; i++) if (m = h[i], o.format !== 1023) {
						if (r !== null) {
							if (g) {
								if (v) {
									if (o.layerUpdates.size > 0) {
										let t = Es(m.width, m.height, o.format, o.type);
										for (let a of o.layerUpdates) {
											let o = m.data.subarray(a * t / m.data.BYTES_PER_ELEMENT, (a + 1) * t / m.data.BYTES_PER_ELEMENT);
											n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, a, m.width, m.height, 1, r, o);
										}
									} else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, m.width, m.height, t.depth, r, m.data);
								}
							} else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, i, p, m.width, m.height, t.depth, 0, m.data, 0, 0);
						} else z("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
					} else g ? v && n.texSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, m.width, m.height, t.depth, r, f, m.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, i, p, m.width, m.height, t.depth, 0, r, f, m.data);
					o.layerUpdates.size > 0 && o.clearLayerUpdates();
				} else {
					g && _ && n.texStorage2D(e.TEXTURE_2D, y, p, h[0].width, h[0].height);
					for (let t = 0, i = h.length; t < i; t++) m = h[t], o.format === 1023 ? g ? v && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, r, f, m.data) : n.texImage2D(e.TEXTURE_2D, t, p, m.width, m.height, 0, r, f, m.data) : r === null ? z("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : g ? v && n.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, r, m.data) : n.compressedTexImage2D(e.TEXTURE_2D, t, p, m.width, m.height, 0, m.data);
				}
			} else if (o.isDataArrayTexture) {
				if (g) {
					if (_ && n.texStorage3D(e.TEXTURE_2D_ARRAY, y, p, t.width, t.height, t.depth), v) {
						if (o.layerUpdates.size > 0) {
							let i = Es(t.width, t.height, o.format, o.type);
							for (let a of o.layerUpdates) {
								let o = t.data.subarray(a * i / t.data.BYTES_PER_ELEMENT, (a + 1) * i / t.data.BYTES_PER_ELEMENT);
								n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, a, t.width, t.height, 1, r, f, o);
							}
							o.clearLayerUpdates();
						} else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, r, f, t.data);
					}
				} else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, p, t.width, t.height, t.depth, 0, r, f, t.data);
			} else if (o.isData3DTexture) g ? (_ && n.texStorage3D(e.TEXTURE_3D, y, p, t.width, t.height, t.depth), v && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, r, f, t.data)) : n.texImage3D(e.TEXTURE_3D, 0, p, t.width, t.height, t.depth, 0, r, f, t.data);
			else if (o.isFramebufferTexture) {
				if (_) {
					if (g) n.texStorage2D(e.TEXTURE_2D, y, p, t.width, t.height);
					else {
						let i = t.width, a = t.height;
						for (let t = 0; t < y; t++) n.texImage2D(e.TEXTURE_2D, t, p, i, a, 0, r, f, null), i >>= 1, a >>= 1;
					}
				}
			} else if (o.isHTMLTexture) {
				if ("texElementImage2D" in e) {
					let n = e.canvas;
					if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), t.parentNode !== n) {
						n.appendChild(t), b.add(o), n.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of b) t.includes(e.image) && (e.needsUpdate = !0);
						}, n.requestPaint();
						return;
					}
					if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t);
					else {
						let n = e.RGBA, r = e.RGBA, i = e.UNSIGNED_BYTE;
						e.texElementImage2D(e.TEXTURE_2D, 0, n, r, i, t);
					}
					e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
				}
			} else if (h.length > 0) {
				if (g && _) {
					let t = R(h[0]);
					n.texStorage2D(e.TEXTURE_2D, y, p, t.width, t.height);
				}
				for (let t = 0, i = h.length; t < i; t++) m = h[t], g ? v && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, r, f, m) : n.texImage2D(e.TEXTURE_2D, t, p, r, f, m);
				o.generateMipmaps = !1;
			} else if (g) {
				if (_) {
					let r = R(t);
					n.texStorage2D(e.TEXTURE_2D, y, p, r.width, r.height);
				}
				v && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r, f, t);
			} else n.texImage2D(e.TEXTURE_2D, 0, p, r, f, t);
			O(o) && o.mipmapsAutoUpdate === !0 && k(c), d.__version = u.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function Oe(t, o, s) {
		if (o.image.length !== 6) return;
		let c = we(t, o), l = o.source;
		n.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + s);
		let u = r.get(l);
		if (l.version !== u.__version || c === !0) {
			n.activeTexture(e.TEXTURE0 + s);
			let t = Kt.getPrimaries(Kt.workingColorSpace), r = o.colorSpace === "" ? null : Kt.getPrimaries(o.colorSpace), d = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
			n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, d);
			let f = o.isCompressedTexture || o.image[0].isCompressedTexture, p = o.image[0] && o.image[0].isDataTexture, m = [];
			for (let e = 0; e < 6; e++) !f && !p ? m[e] = D(o.image[e], !0, i.maxCubemapSize) : m[e] = p ? o.image[e].image : o.image[e], m[e] = L(o, m[e]);
			let h = m[0], g = a.convert(o.format, o.colorSpace), _ = a.convert(o.type), v = j(o.internalFormat, g, _, o.normalized, o.colorSpace), y = o.isVideoTexture !== !0, b = u.__version === void 0 || c === !0, x = l.dataReady, S = M(o, h);
			Ce(e.TEXTURE_CUBE_MAP, o);
			let C;
			if (o.isDepthTexture) {
				if (v = ee(o.format === re, o.type), b) {
					if (y) n.texStorage2D(e.TEXTURE_CUBE_MAP, 1, v, h.width, h.height);
					else for (let t = 0; t < 6; t++) n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, h.width, h.height, 0, g, _, null);
				}
			} else if (f) {
				y && b && n.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, h.width, h.height);
				for (let t = 0; t < 6; t++) {
					C = m[t].mipmaps;
					for (let r = 0; r < C.length; r++) {
						let i = C[r];
						o.format === 1023 ? y ? x && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, _, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, g, _, i.data) : g === null ? z("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : y ? x && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, g, i.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, v, i.width, i.height, 0, i.data);
					}
				}
			} else {
				if (C = o.mipmaps, y && b) {
					C.length > 0 && S++;
					let t = R(m[0]);
					n.texStorage2D(e.TEXTURE_CUBE_MAP, S, v, t.width, t.height);
				}
				for (let t = 0; t < 6; t++) if (p) {
					y ? x && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, m[t].width, m[t].height, g, _, m[t].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, m[t].width, m[t].height, 0, g, _, m[t].data);
					for (let r = 0; r < C.length; r++) {
						let i = C[r].image[t].image;
						y ? x && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, i.width, i.height, g, _, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, v, i.width, i.height, 0, g, _, i.data);
					}
				} else {
					y ? x && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, g, _, m[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, v, g, _, m[t]);
					for (let r = 0; r < C.length; r++) {
						let i = C[r];
						y ? x && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, g, _, i.image[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, v, g, _, i.image[t]);
					}
				}
			}
			O(o) && o.mipmapsAutoUpdate === !0 && k(e.TEXTURE_CUBE_MAP), u.__version = l.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function ke(t, i, o, c, l, u) {
		let d = a.convert(o.format, o.colorSpace), f = a.convert(o.type), p = j(o.internalFormat, d, f, o.normalized, o.colorSpace), m = r.get(i), h = r.get(o);
		if (h.__renderTarget = i, !m.__hasExternalTextures) {
			let t = Math.max(1, i.width >> u), r = Math.max(1, i.height >> u);
			l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY ? n.texImage3D(l, u, p, t, r, i.depth, 0, d, f, null) : n.texImage2D(l, u, p, t, r, 0, d, f, null);
		}
		n.bindFramebuffer(e.FRAMEBUFFER, t), I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, c, l, h.__webglTexture, 0, Le(i)) : (l === e.TEXTURE_2D || l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, c, l, h.__webglTexture, u), n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function Ae(t, n, r) {
		if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) {
			let i = n.depthTexture, a = i && i.isDepthTexture ? i.type : null, o = ee(n.stencilBuffer, a), c = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
			I(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, Le(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, Le(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, c, e.RENDERBUFFER, t);
		} else {
			let t = n.textures;
			for (let i = 0; i < t.length; i++) {
				let o = t[i], c = a.convert(o.format, o.colorSpace), l = a.convert(o.type), u = j(o.internalFormat, c, l, o.normalized, o.colorSpace);
				I(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, Le(n), u, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, Le(n), u, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, u, n.width, n.height);
			}
		}
		e.bindRenderbuffer(e.RENDERBUFFER, null);
	}
	function je(t, i, a) {
		let o = i.isWebGLCubeRenderTarget === !0;
		if (n.bindFramebuffer(e.FRAMEBUFFER, t), !(i.depthTexture && i.depthTexture.isDepthTexture)) throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
		let c = r.get(i.depthTexture);
		c.__renderTarget = i;
		let l = o ? i.depthTexture.image[0] : i.depthTexture.image;
		c.__webglTexture && l.width === i.width && l.height === i.height || (l.width = i.width, l.height = i.height, i.depthTexture.needsUpdate = !0), o ? ye(i.depthTexture, 0) : ge(i.depthTexture, 0);
		let u = c.__webglTexture, d = Le(i), f = o ? e.TEXTURE_CUBE_MAP_POSITIVE_X + a : e.TEXTURE_2D, p = i.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
		if (i.depthTexture.format === 1026) I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else if (i.depthTexture.format === 1027) I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else throw Error("THREE.WebGLTextures: Unknown depthTexture format.");
	}
	function Me(t) {
		let i = r.get(t), a = t.isWebGLCubeRenderTarget === !0;
		if (i.__boundDepthTexture !== t.depthTexture) {
			let e = t.depthTexture;
			if (i.__depthDisposeCallback && i.__depthDisposeCallback(), e) {
				let t = () => {
					delete i.__boundDepthTexture, delete i.__depthDisposeCallback, e.removeEventListener("dispose", t);
				};
				e.addEventListener("dispose", t), i.__depthDisposeCallback = t;
			}
			i.__boundDepthTexture = e;
		}
		if (t.depthTexture && !i.__autoAllocateDepthBuffer) {
			if (a) for (let e = 0; e < 6; e++) je(i.__webglFramebuffer[e], t, e);
			else t.texture.mipmaps.length > 0 ? je(i.__webglFramebuffer[0], t, 0) : je(i.__webglFramebuffer, t, 0);
		} else if (a) {
			i.__webglDepthbuffer = [];
			for (let r = 0; r < 6; r++) if (n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[r]), i.__webglDepthbuffer[r] === void 0) i.__webglDepthbuffer[r] = e.createRenderbuffer(), Ae(i.__webglDepthbuffer[r], t, !1);
			else {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, a = i.__webglDepthbuffer[r];
				e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, a);
			}
		} else if (t.texture.mipmaps.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer === void 0) i.__webglDepthbuffer = e.createRenderbuffer(), Ae(i.__webglDepthbuffer, t, !1);
		else {
			let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, r = i.__webglDepthbuffer;
			e.bindRenderbuffer(e.RENDERBUFFER, r), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, r);
		}
		n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function Ne(t, n, i) {
		let a = r.get(t);
		n !== void 0 && ke(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), i !== void 0 && Me(t);
	}
	function Pe(t) {
		let i = t.texture, s = r.get(t), c = r.get(i);
		t.addEventListener("dispose", ie), te(t);
		let l = t.textures, u = t.isWebGLCubeRenderTarget === !0, d = l.length > 1;
		if (d || (c.__webglTexture === void 0 && (c.__webglTexture = e.createTexture()), c.__version = i.version, o.memory.textures++), u) {
			s.__webglFramebuffer = [];
			for (let t = 0; t < 6; t++) if (i.mipmaps.length > 0) {
				s.__webglFramebuffer[t] = [];
				for (let n = 0; n < i.mipmaps.length; n++) s.__webglFramebuffer[t][n] = e.createFramebuffer();
			} else s.__webglFramebuffer[t] = e.createFramebuffer();
		} else {
			if (i.mipmaps.length > 0) {
				s.__webglFramebuffer = [];
				for (let t = 0; t < i.mipmaps.length; t++) s.__webglFramebuffer[t] = e.createFramebuffer();
			} else s.__webglFramebuffer = e.createFramebuffer();
			if (d) for (let t = 0, n = l.length; t < n; t++) {
				let n = r.get(l[t]);
				n.__webglTexture === void 0 && (n.__webglTexture = e.createTexture(), o.memory.textures++);
			}
			if (t.samples > 0 && I(t) === !1) {
				s.__webglMultisampledFramebuffer = e.createFramebuffer(), s.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer);
				for (let n = 0; n < l.length; n++) {
					let r = l[n];
					s.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
					let i = a.convert(r.format, r.colorSpace), o = a.convert(r.type), c = j(r.internalFormat, i, o, r.normalized, r.colorSpace, t.isXRRenderTarget === !0), u = Le(t);
					e.renderbufferStorageMultisample(e.RENDERBUFFER, u, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
				}
				e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (s.__webglDepthRenderbuffer = e.createRenderbuffer(), Ae(s.__webglDepthRenderbuffer, t, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
			}
		}
		if (u) {
			n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture), Ce(e.TEXTURE_CUBE_MAP, i);
			for (let n = 0; n < 6; n++) if (i.mipmaps.length > 0) for (let r = 0; r < i.mipmaps.length; r++) ke(s.__webglFramebuffer[n][r], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, r);
			else ke(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0);
			O(i) ? k(e.TEXTURE_CUBE_MAP) : i.mipmaps.length > 0 && e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAX_LEVEL, i.mipmaps.length - 1), n.unbindTexture();
		} else if (d) {
			for (let i = 0, a = l.length; i < a; i++) {
				let a = l[i], o = r.get(a), c = e.TEXTURE_2D;
				(t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (c = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(c, o.__webglTexture), Ce(c, a), ke(s.__webglFramebuffer, t, a, e.COLOR_ATTACHMENT0 + i, c, 0), O(a) && k(c);
			}
			n.unbindTexture();
		} else {
			let r = e.TEXTURE_2D;
			if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (r = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(r, c.__webglTexture), Ce(r, i), i.mipmaps.length > 0) for (let n = 0; n < i.mipmaps.length; n++) ke(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, r, n);
			else ke(s.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0, r, 0);
			O(i) ? k(r) : i.mipmaps.length > 0 && e.texParameteri(r, e.TEXTURE_MAX_LEVEL, i.mipmaps.length - 1), n.unbindTexture();
		}
		t.depthBuffer && Me(t);
	}
	function F(e) {
		let t = e.textures;
		for (let i = 0, a = t.length; i < a; i++) {
			let a = t[i];
			if (O(a) && a.mipmapsAutoUpdate === !0) {
				let t = A(e), i = r.get(a).__webglTexture;
				n.bindTexture(t, i), k(t), n.unbindTexture();
			}
		}
	}
	let Fe = [];
	function Ie(t) {
		if (t.samples > 0) {
			if (I(t) === !1) {
				let i = t.textures, a = t.width, o = t.height, s = e.COLOR_BUFFER_BIT, l = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, u = r.get(t), d = i.length > 1;
				if (d) for (let t = 0; t < i.length; t++) n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
				n.bindFramebuffer(e.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer), t.texture.mipmaps.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer);
				for (let n = 0; n < i.length; n++) {
					if (t.resolveDepthBuffer && (t.depthBuffer && (s |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (s |= e.STENCIL_BUFFER_BIT)), d) {
						e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, u.__webglColorRenderbuffer[n]);
						let t = r.get(i[n]).__webglTexture;
						e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
					}
					e.blitFramebuffer(0, 0, a, o, 0, 0, a, o, s, e.NEAREST), c === !0 && (Fe.length = 0, Fe.push(e.COLOR_ATTACHMENT0 + n), t.depthBuffer && t.storeMultisampledDepthBuffer === !1 && Fe.push(l), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, Fe));
				}
				if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), d) for (let t = 0; t < i.length; t++) {
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, u.__webglColorRenderbuffer[t]);
					let a = r.get(i[t]).__webglTexture;
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, a, 0);
				}
				n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
			} else if (t.depthBuffer && t.storeMultisampledDepthBuffer === !1 && c) {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
				e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
			}
		}
	}
	function Le(e) {
		return Math.min(i.maxSamples, e.samples);
	}
	function I(e) {
		let n = r.get(e);
		return e.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && n.__useRenderToTexture !== !1;
	}
	function Re(e) {
		let t = o.render.frame;
		u.get(e) !== t && (u.set(e, t), e.update());
	}
	function L(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (Kt.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && z("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : B("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function R(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (l.width = e.naturalWidth || e.width, l.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (l.width = e.displayWidth, l.height = e.displayHeight) : (l.width = e.width, l.height = e.height), l;
	}
	this.allocateTextureUnit = me, this.resetTextureUnits = de, this.getTextureUnits = fe, this.setTextureUnits = pe, this.setTexture2D = ge, this.setTexture2DArray = _e, this.setTexture3D = ve, this.setTextureCube = ye, this.rebindTextures = Ne, this.setupRenderTarget = Pe, this.updateRenderTargetMipmap = F, this.updateMultisampleRenderTarget = Ie, this.setupDepthRenderbuffer = Me, this.setupFrameBufferTexture = ke, this.useMultisampledRTT = I, this.dispose = se;
}
function Tu(e, t) {
	function n(n, r = "") {
		let i, a = Kt.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) {
			if (a === "srgb") {
				if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
					if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
					if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
					if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
					if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
				} else return null;
			} else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
				if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			} else return null;
		}
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) {
			if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
				if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			} else return null;
		}
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) {
			if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
				if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
				if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
				if (n === 37488) return i.COMPRESSED_R11_EAC;
				if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
				if (n === 37490) return i.COMPRESSED_RG11_EAC;
				if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
			} else return null;
		}
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) {
			if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
				if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
				if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
				if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
				if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
				if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
				if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
				if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
				if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
				if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
				if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
				if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
				if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
				if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
				if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
			} else return null;
		}
		if (n === 36492 || n === 36494 || n === 36495) {
			if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
				if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
				if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
				if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
			} else return null;
		}
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) {
			if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
				if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
				if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
				if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
				if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
			} else return null;
		}
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var Eu = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", Du = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", Ou = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new ji(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new po({
				vertexShader: Eu,
				fragmentShader: Du,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new K(new Za(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, ku = class extends dt {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, o = "local-floor", s = 1, c = null, l = null, u = null, d = null, f = null, p = null, m = typeof XRWebGLBinding < "u", h = new Ou(), g = {}, _ = t.getContextAttributes(), v = null, y = null, x = [], S = [], C = new H(), w = null, E = null, D = new Qo();
		D.viewport = new rn();
		let O = new Qo();
		O.viewport = new rn();
		let k = [D, O], j = new ls(), ee = null, M = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = x[e];
			return t === void 0 && (t = new zn(), x[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = x[e];
			return t === void 0 && (t = new zn(), x[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = x[e];
			return t === void 0 && (t = new zn(), x[e] = t), t.getHandSpace();
		};
		function te(e) {
			let t = S.indexOf(e.inputSource);
			if (t === -1) return;
			let n = x[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, c || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function ie() {
			r.removeEventListener("select", te), r.removeEventListener("selectstart", te), r.removeEventListener("selectend", te), r.removeEventListener("squeeze", te), r.removeEventListener("squeezestart", te), r.removeEventListener("squeezeend", te), r.removeEventListener("end", ie), r.removeEventListener("inputsourceschange", ae);
			for (let e = 0; e < x.length; e++) {
				let t = S[e];
				t !== null && (S[e] = null, x[e].disconnect(t));
			}
			ee = null, M = null, h.reset();
			for (let e in g) delete g[e];
			if (e.setRenderTarget(v), f = null, d = null, u = null, r = null, y = null, P.stop(), n.isPresenting = !1, e.setPixelRatio(w), e.setSize(C.width, C.height, !1), E !== null) {
				let e = E.camera;
				e.fov = E.fov, e.zoom = E.zoom, e.updateProjectionMatrix(), E = null;
			}
			n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && z("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			o = e, n.isPresenting === !0 && z("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return c || a;
		}, this.setReferenceSpace = function(e) {
			c = e;
		}, this.getBaseLayer = function() {
			return d === null ? f : d;
		}, this.getBinding = function() {
			return u === null && m && (u = new XRWebGLBinding(r, t)), u;
		}, this.getFrame = function() {
			return p;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(l) {
			if (r = l, r !== null) {
				if (v = e.getRenderTarget(), r.addEventListener("select", te), r.addEventListener("selectstart", te), r.addEventListener("selectend", te), r.addEventListener("squeeze", te), r.addEventListener("squeezestart", te), r.addEventListener("squeezeend", te), r.addEventListener("end", ie), r.addEventListener("inputsourceschange", ae), _.xrCompatible !== !0 && await t.makeXRCompatible(), w = e.getPixelRatio(), e.getSize(C), m && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, o = null;
					_.depth && (o = _.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = _.stencil ? re : ne, a = _.stencil ? A : T);
					let s = {
						colorFormat: t.RGBA8,
						depthFormat: o,
						scaleFactor: i
					};
					u = this.getBinding(), d = u.createProjectionLayer(s), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), y = new on(d.textureWidth, d.textureHeight, {
						format: N,
						type: b,
						depthTexture: new ki(d.textureWidth, d.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: _.stencil,
						colorSpace: e.outputColorSpace,
						samples: _.antialias ? 4 : 0,
						resolveDepthBuffer: d.ignoreDepthValues === !1,
						resolveStencilBuffer: d.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: d.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: d.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: _.antialias,
						alpha: !0,
						depth: _.depth,
						stencil: _.stencil,
						framebufferScaleFactor: i
					};
					f = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new on(f.framebufferWidth, f.framebufferHeight, {
						format: N,
						type: b,
						colorSpace: e.outputColorSpace,
						stencilBuffer: _.stencil,
						resolveDepthBuffer: f.ignoreDepthValues === !1,
						resolveStencilBuffer: f.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: f.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: f.ignoreDepthValues === !1
					});
				}
				y.isXRRenderTarget = !0, this.setFoveation(s), c = null, a = await r.requestReferenceSpace(o), P.setContext(r), P.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return h.getDepthTexture();
		};
		function ae(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = S.indexOf(n);
				r >= 0 && (S[r] = null, x[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = S.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < x.length; e++) if (e >= S.length) {
						S.push(n), r = e;
						break;
					} else if (S[e] === null) {
						S[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = x[r];
				i && i.connect(n);
			}
		}
		function oe(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			h.texture !== null && (h.depthNear > 0 && (t = h.depthNear), h.depthFar > 0 && (n = h.depthFar)), j.near = O.near = D.near = t, j.far = O.far = D.far = n, (ee !== j.near || M !== j.far) && (r.updateRenderState({
				depthNear: j.near,
				depthFar: j.far
			}), ee = j.near, M = j.far), j.layers.mask = e.layers.mask | 6, D.layers.mask = j.layers.mask & -5, O.layers.mask = j.layers.mask & -3;
			let i = e.parent, a = j.cameras;
			oe(j, i);
			for (let e = 0; e < a.length; e++) oe(a[e], i);
			j.projectionMatrix.copy(D.projectionMatrix), j.projectionMatrixInverse.copy(D.projectionMatrixInverse), E === null && e.isPerspectiveCamera && (E = {
				camera: e,
				fov: e.fov,
				zoom: e.zoom
			}), se(e, j, i);
		};
		function se(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = ht * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return j;
		}, this.getFoveation = function() {
			if (d !== null || f !== null) return s;
		}, this.setFoveation = function(e) {
			s = e, d !== null && (d.fixedFoveation = e), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return h.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return h.getMesh(j);
		}, this.getCameraTexture = function(e) {
			return g[e];
		};
		let ce = null;
		function le(t, i) {
			if (l = i.getViewerPose(c || a), p = i, l !== null) {
				let t = l.views;
				f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y));
				let i = !1;
				t.length !== j.cameras.length && (j.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (f !== null) a = f.getViewport(r);
					else {
						let t = u.getViewSubImage(d, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(y, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(y));
					}
					let o = k[n];
					o === void 0 && (o = new Qo(), o.layers.enable(n), o.viewport = new rn(), k[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (j.matrix.copy(o.matrix), j.matrix.decompose(j.position, j.quaternion, j.scale)), i === !0 && j.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && m) {
					u = n.getBinding();
					let e = u.getDepthInformation(t[0]);
					e && e.isValid && e.texture && h.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && m) {
					e.state.unbindTexture(), u = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = g[n];
							e || (e = new ji(), g[n] = e);
							let t = u.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < x.length; e++) {
				let t = S[e], n = x[e];
				t !== null && n !== void 0 && n.update(t, i, c || a);
			}
			ce && ce(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), p = null;
		}
		let P = new Os();
		P.setAnimationLoop(le), this.setAnimationLoop = function(e) {
			ce = e;
		}, this.dispose = function() {};
	}
}, Au = /*@__PURE__*/ new ln(), ju = /*@__PURE__*/ new W();
ju.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Mu(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, co(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(Au.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(ju), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.diffuseRoughness > 0 && (e.diffuseRoughness.value = t.diffuseRoughness, t.diffuseRoughnessMap && (e.diffuseRoughnessMap.value = t.diffuseRoughnessMap, n(t.diffuseRoughnessMap, e.diffuseRoughnessMapTransform))), t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.retroreflectivity > 0 && (e.retroreflectivity.value = t.retroreflectivity), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessMinimum, e.iridescenceThicknessMaximum.value = t.iridescenceThicknessMaximum, t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function Nu(e, t, n, r) {
	let i = {}, a = {};
	function o(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n, i[e.id]);
	}
	function s(e, n) {
		let o = i[e.id];
		o === void 0 && (m(e), o = c(e), i[e.id] = o, e.addEventListener("dispose", g));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let u = t.render.frame;
		a[e.id] !== u && (l(e), a[e.id] = u);
	}
	function c(t) {
		let n = e.createBuffer(), r = t.__size, i = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, n), e.bufferData(e.UNIFORM_BUFFER, r, i), e.bindBuffer(e.UNIFORM_BUFFER, null), n;
	}
	function l(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let e = 0, t = r.length; e < t; e++) {
			let t = r[e];
			if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) u(t[n], e, n, a);
			else u(t, e, 0, a);
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function u(t, n, r, i) {
		if (f(t, n, r, i) === !0) {
			let n = t.__offset, r = t.value;
			if (Array.isArray(r)) {
				let e = 0;
				for (let n = 0; n < r.length; n++) {
					let i = r[n], a = h(i, !0);
					d(i, t.__data, e), e += a.storage / Float32Array.BYTES_PER_ELEMENT;
				}
			} else d(r, t.__data, 0);
			e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
		}
	}
	function d(e, t, n) {
		typeof e == "number" || typeof e == "boolean" ? t[n] = e : e.isMatrix3 ? (t[n] = e.elements[0], t[n + 1] = e.elements[1], t[n + 2] = e.elements[2], t[n + 3] = 0, t[n + 4] = e.elements[3], t[n + 5] = e.elements[4], t[n + 6] = e.elements[5], t[n + 7] = 0, t[n + 8] = e.elements[6], t[n + 9] = e.elements[7], t[n + 10] = e.elements[8], t[n + 11] = 0) : ArrayBuffer.isView(e) ? t.set(e.subarray(0, t.length - n), n) : e.toArray(t, n);
	}
	function f(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (Array.isArray(i)) {
			r[a] === void 0 && (r[a] = []);
			let e = r[a], t = !1;
			for (let n = 0; n < i.length; n++) p(i[n], e, n) === !0 && (t = !0);
			return t;
		}
		return p(i, r, a);
	}
	function p(e, t, n) {
		if (t[n] === void 0) return t[n] = typeof e == "number" || typeof e == "boolean" ? e : ArrayBuffer.isView(e) ? e.slice() : e.clone(), !0;
		{
			let r = t[n];
			if (typeof e == "number" || typeof e == "boolean") {
				if (r !== e) return t[n] = e, !0;
			} else if (ArrayBuffer.isView(e)) return !0;
			else if (r.equals(e) === !1) return r.copy(e), !0;
		}
		return !1;
	}
	function m(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let i = 0, a = r.length; i < a; i++) {
				let a = r[i], o = Array.isArray(a.value) ? a.value : [a.value], s = Array.isArray(t[e]) || Array.isArray(a.value), c = n;
				for (let e = 0, t = o.length; e < t; e++) {
					let t = o[e], r = h(t, s), i = n % 16, a = i % r.boundary, l = i + a;
					n += a, l !== 0 && 16 - l < r.storage && (n += 16 - l), e === 0 && (c = n), n += r.storage;
				}
				a.__data = new (a.type === "int" ? Int32Array : a.type === "uint" ? Uint32Array : Float32Array)((n - c) / Float32Array.BYTES_PER_ELEMENT), a.__offset = c;
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function h(e, t) {
		let n = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (n.boundary = 4, n.storage = 4) : e.isVector2 ? (n.boundary = 8, n.storage = 8) : e.isVector3 || e.isColor ? (n.boundary = 16, n.storage = 12) : e.isVector4 ? (n.boundary = 16, n.storage = 16) : e.isMatrix3 ? (n.boundary = 16, n.storage = 48) : e.isMatrix4 ? (n.boundary = 16, n.storage = 64) : e.isTexture ? z("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (n.boundary = 16, n.storage = e.byteLength) : z("WebGLRenderer: Unsupported uniform value type.", e), t === !0 && (n.boundary = 16, n.storage = Math.ceil(n.storage / 16) * 16), n;
	}
	function g(t) {
		let n = t.target;
		n.removeEventListener("dispose", g), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function _() {
		for (let t in i) e.deleteBuffer(i[t]);
		i = {}, a = {};
	}
	return {
		bind: o,
		update: s,
		dispose: _
	};
}
var Pu = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), Fu = null;
function Iu() {
	return Fu === null && (Fu = new di(Pu, 16, 16, oe, D), Fu.name = "DFG_LUT", Fu.minFilter = _, Fu.magFilter = _, Fu.wrapS = f, Fu.wrapT = f, Fu.generateMipmaps = !1, Fu.needsUpdate = !0), Fu;
}
var Lu = class {
	constructor(e = {}) {
		let { canvas: t = it(), context: n = null, depth: r = !0, stencil: i = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: s = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1, outputBufferType: f = b } = e;
		this.isWebGLRenderer = !0;
		let p;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			p = n.getContextAttributes().alpha;
		} else p = a;
		let m = f, h = /* @__PURE__ */ new Set([
			ce,
			se,
			ae
		]), g = /* @__PURE__ */ new Set([
			b,
			T,
			C,
			A,
			O,
			k
		]), _ = /* @__PURE__ */ new Uint32Array(4), v = /* @__PURE__ */ new Int32Array(4), x = {
			textures: [],
			min: [],
			max: [],
			resolution: []
		}, S = null, w = null, E = [], j = [], ee = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			diagnostics: { keywords: !1 },
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let M = this, te = !1, N = null, ne = null, re = null, ie = null;
		this._outputColorSpace = Je;
		let oe = 0, le = 0, P = null, ue = -1, de = null, fe = new rn(), pe = new rn(), me = null, he = new G(0), ge = 0, _e = t.width, ve = t.height, ye = 1, be = null, xe = null, Se = new rn(0, 0, _e, ve), Ce = new rn(0, 0, _e, ve), we = !1, Te = new wi(), Ee = new Ei(), De = !1, Oe = !1, ke = new ln(), Ae = new U(), je = new rn(), Me = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, Ne = !1;
		function Pe() {
			return P === null ? ye : 1;
		}
		let F = n;
		function Fe(e, n) {
			return t.getContext(e, n);
		}
		let Ie, Le, I, Re, L, R, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Ye, Xe, Ze, Qe, $e, tt, nt, rt;
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: o,
				premultipliedAlpha: s,
				preserveDrawingBuffer: c,
				powerPreference: l,
				failIfMajorPerformanceCaveat: u
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r187"), t.addEventListener("webglcontextlost", ct, !1), t.addEventListener("webglcontextrestored", ut, !1), t.addEventListener("webglcontextcreationerror", dt, !1), F === null) {
				let t = "webgl2";
				if (F = Fe(t, e), F === null) throw Fe(t) ? Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : Error("THREE.WebGLRenderer: Error creating WebGL context.");
			}
			at();
		} catch (e) {
			throw t.removeEventListener("webglcontextlost", ct, !1), t.removeEventListener("webglcontextrestored", ut, !1), t.removeEventListener("webglcontextcreationerror", dt, !1), B("WebGLRenderer: " + e.message), e;
		}
		function at() {
			Ie = new rc(F), Ie.init(), tt = new Tu(F, Ie), Le = new Ls(F, Ie, e, tt), I = new Cu(F, Ie), Le.reversedDepthBuffer && d && I.buffers.depth.setReversed(!0), ne = F.createFramebuffer(), re = F.createFramebuffer(), ie = F.createFramebuffer(), Re = new oc(F), L = new ru(), R = new wu(F, Ie, I, L, Le, tt, Re), ze = new nc(M), Be = new ks(F), nt = new Fs(F, Be), Ve = new ic(F, Be, Re, nt), He = new cc(F, Ve, Be, nt, Re), Ze = new sc(F, Le, R), qe = new Rs(L), Ue = new nu(M, ze, Ie, Le, nt, qe), We = new Mu(M, L), Ge = new su(), Ke = new mu(Ie), Xe = new Ps(M, ze, I, He, p, s), Ye = new Su(M, He, Le), rt = new Nu(F, Re, Le, I), Qe = new Is(F, Ie, Re), $e = new ac(F, Ie, Re), Re.programs = Ue.programs, M.capabilities = Le, M.extensions = Ie, M.properties = L, M.renderLists = Ge, M.shadowMap = Ye, M.state = I, M.info = Re;
		}
		m !== 1009 && (ee = new uc(m, t.width, t.height, o, r, i));
		let st = new ku(M, F);
		this.xr = st, this.getContext = function() {
			return F;
		}, this.getContextAttributes = function() {
			return F.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = Ie.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = Ie.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return ye;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (ye = e, this.setSize(_e, ve, !1));
		}, this.getSize = function(e) {
			return e.set(_e, ve);
		}, this.setSize = function(e, n, r = !0) {
			st.isPresenting ? z("WebGLRenderer: Can't change size while VR device is presenting.") : (_e = e, ve = n, t.width = Math.floor(e * ye), t.height = Math.floor(n * ye), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), ee !== null && ee.setSize(t.width, t.height), this.setViewport(0, 0, e, n));
		}, this.getDrawingBufferSize = function(e) {
			return e.set(_e * ye, ve * ye).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			_e = e, ve = n, ye = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (m === 1009) B("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
			else {
				if (e) {
					for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
						z("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
						break;
					}
				}
				ee.setEffects(e || []);
			}
		}, this.getCurrentViewport = function(e) {
			return e.copy(fe);
		}, this.getViewport = function(e) {
			return e.copy(Se);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? Se.set(e.x, e.y, e.z, e.w) : Se.set(e, t, n, r), I.viewport(fe.copy(Se).multiplyScalar(Pe()).round());
		}, this.getScissor = function(e) {
			return e.copy(Ce);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? Ce.set(e.x, e.y, e.z, e.w) : Ce.set(e, t, n, r), I.scissor(pe.copy(Ce).multiplyScalar(Pe()).round());
		}, this.getScissorTest = function() {
			return we;
		}, this.setScissorTest = function(e) {
			I.setScissorTest(we = e);
		}, this.setOpaqueSort = function(e) {
			be = e;
		}, this.setTransparentSort = function(e) {
			xe = e;
		}, this.getClearColor = function(e) {
			return e.copy(Xe.getClearColor());
		}, this.setClearColor = function() {
			Xe.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Xe.getClearAlpha();
		}, this.setClearAlpha = function() {
			Xe.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (P !== null) {
					let t = P.texture.format;
					e = h.has(t);
				}
				if (e) {
					let e = P.texture.type, t = g.has(e), n = Xe.getClearColor(), r = Xe.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (_[0] = i, _[1] = a, _[2] = o, _[3] = r, F.clearBufferuiv(F.COLOR, 0, _)) : (v[0] = i, v[1] = a, v[2] = o, v[3] = r, F.clearBufferiv(F.COLOR, 0, v));
				} else r |= F.COLOR_BUFFER_BIT;
			}
			t && (r |= F.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= F.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && F.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), N = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", ct, !1), t.removeEventListener("webglcontextrestored", ut, !1), t.removeEventListener("webglcontextcreationerror", dt, !1), Xe.dispose(), Ge.dispose(), Ke.dispose(), R.dispose(), L.dispose(), ze.dispose(), He.dispose(), Ve.dispose(), nt.dispose(), rt.dispose(), Ue.dispose(), st.dispose(), st.removeEventListener("sessionstart", _t), st.removeEventListener("sessionend", vt), yt.stop();
		};
		function ct(e) {
			e.preventDefault(), ot("WebGLRenderer: Context Lost."), te = !0;
		}
		function ut() {
			ot("WebGLRenderer: Context Restored."), te = !1;
			let e = Re.autoReset, t = Ye.enabled, n = Ye.autoUpdate, r = Ye.needsUpdate, i = Ye.type;
			at(), Re.autoReset = e, Ye.enabled = t, Ye.autoUpdate = n, Ye.needsUpdate = r, Ye.type = i;
		}
		function dt(e) {
			B("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function ft(e) {
			let t = e.target;
			t.removeEventListener("dispose", ft), pt(t);
		}
		function pt(e) {
			mt(e), L.remove(e);
		}
		function mt(e) {
			let t = L.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				Ue.releaseProgram(e);
			}), e.isShaderMaterial && Ue.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = Me);
			let o = i.isMesh && i.matrixWorld.determinantAffine() < 0, s = At(e, t, n, r, i);
			I.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = Ve.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			nt.setup(i, r, s, n, c);
			let h, g = Qe;
			if (c !== null && (h = Be.get(c), g = $e, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (I.setLineWidth(r.wireframeLinewidth * Pe()), g.setMode(F.LINES)) : g.setMode(F.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), I.setLineWidth(e * Pe()), i.isLineSegments ? g.setMode(F.LINES) : i.isLineLoop ? g.setMode(F.LINE_LOOP) : g.setMode(F.LINE_STRIP);
			} else i.isPoints ? g.setMode(F.POINTS) : i.isSprite && g.setMode(F.TRIANGLES);
			if (i.isBatchedMesh) {
				if (Ie.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
				else {
					let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? Be.get(c).bytesPerElement : 1, o = L.get(r).currentProgram.getUniforms();
					for (let r = 0; r < n; r++) o.setValue(F, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
				}
			} else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function ht(e, t, n, r) {
			N !== null && e.isNodeMaterial && N.setObject(r, e), De === !0 && qe.setState(e, n, !1), e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, Et(e, t, r), e.side = 0, e.needsUpdate = !0, Et(e, t, r), e.side = 2) : Et(e, t, r);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), N !== null && N.renderStart(e, t, n), w = Ke.get(n), w.init(t), j.push(w), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (w.pushLight(e), e.castShadow && w.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (w.pushLight(e), e.castShadow && w.pushShadow(e));
			}), w.setupLights(), N !== null && N.updateLights(w.state.lightsArray), Oe = this.localClippingEnabled, De = qe.init(this.clippingPlanes, Oe), De === !0 && qe.setGlobalState(this.clippingPlanes, t), N !== null && Ye.render(w.state.shadowsArray, n, t);
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let i = e.material;
				if (i) {
					if (Array.isArray(i)) for (let a = 0; a < i.length; a++) {
						let o = i[a];
						ht(o, n, t, e), r.add(o);
					}
					else ht(i, n, t, e), r.add(i);
				}
			}), w = j.pop(), N !== null && N.renderEnd(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					r.forEach(function(e) {
						let t = L.get(e).currentProgram;
						(t === void 0 || t.isReady()) && r.delete(e);
					}), r.size === 0 ? t(e) : setTimeout(n, 10);
				}
				Ie.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let gt = null;
		function V(e) {
			gt && gt(e);
		}
		function _t() {
			yt.stop();
		}
		function vt() {
			yt.start();
		}
		let yt = new Os();
		yt.setAnimationLoop(V), typeof self < "u" && yt.setContext(self), this.setAnimationLoop = function(e) {
			gt = e, st.setAnimationLoop(e), e === null ? yt.stop() : yt.start();
		}, st.addEventListener("sessionstart", _t), st.addEventListener("sessionend", vt), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				B("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (te === !0) return;
			N !== null && N.renderStart(e, t);
			let n = st.enabled === !0 && st.isPresenting === !0, r = ee !== null && (P === null || n) && ee.begin(M, P);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), st.enabled === !0 && st.isPresenting === !0 && (ee === null || ee.isCompositing() === !1) && (st.cameraAutoUpdate === !0 && st.updateCamera(t), t = st.getCamera()), e.isScene === !0 && e.onBeforeRender(M, e, t, P), w = Ke.get(e, j.length), w.init(t), w.state.textureUnits = R.getTextureUnits(), j.push(w), ke.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), t.isArrayCamera ? Ee.setFromArrayCamera(t) : Te.setFromProjectionMatrix(ke, et, t.reversedDepth), Oe = this.localClippingEnabled, De = qe.init(this.clippingPlanes, Oe), S = Ge.get(e, E.length), S.init(), E.push(S), this.info.render.frame++, st.enabled === !0 && st.isPresenting === !0) {
				let e = M.xr.getDepthSensingMesh();
				e !== null && bt(e, t, -Infinity, M.sortObjects);
			}
			bt(e, t, 0, M.sortObjects), S.finish(), N !== null && N.updateLights(w.state.lightsArray), M.sortObjects === !0 && S.sort(be, xe), Ne = st.enabled === !1 || st.isPresenting === !1 || st.hasDepthSensing() === !1, Ne && Xe.addToRenderList(S, e), this.info.autoReset === !0 && this.info.reset(), De === !0 && qe.beginShadows();
			let i = w.state.shadowsArray;
			if (Ye.render(i, e, t), De === !0 && qe.endShadows(), (r && ee.hasRenderPass()) === !1) {
				let n = S.opaque, r = S.transmissive;
				if (w.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						St(n, r, e, a);
					}
					Ne && Xe.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						xt(S, e, n, n.viewport);
					}
				} else r.length > 0 && St(n, r, e, t), Ne && Xe.render(e), xt(S, e, t);
			}
			P !== null && le === 0 && (R.updateMultisampleRenderTarget(P), R.updateRenderTargetMipmap(P)), r && ee.end(M), e.isScene === !0 && e.onAfterRender(M, e, t), nt.resetDefaultState(), ue = -1, de = null, j.pop(), j.length > 0 ? (w = j[j.length - 1], R.setTextureUnits(w.state.textureUnits), De === !0 && qe.setGlobalState(M.clippingPlanes, w.state.camera)) : w = null, E.pop(), S = E.length > 0 ? E[E.length - 1] : null, N !== null && N.renderEnd();
		};
		function bt(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLight) w.pushLight(e), e.castShadow && w.pushShadow(e);
				else if (e.isSprite) {
					let i = t.isArrayCamera ? Ee : Te;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						r && je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);
						let i = He.update(e), a = e.material;
						a.visible && S.push(e, i, a, n, je.z, null, t);
					}
				} else if (e.isMesh || e.isLine || e.isPoints) {
					let i = t.isArrayCamera ? Ee : Te;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						let i = He.update(e), a = e.material;
						if (r && (e.boundingSphere === void 0 ? (i.boundingSphere === null && i.computeBoundingSphere(), je.copy(i.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), je.copy(e.boundingSphere.center)), je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)), Array.isArray(a)) {
							let r = i.groups;
							for (let o = 0, s = r.length; o < s; o++) {
								let s = r[o], c = a[s.materialIndex];
								c && c.visible && S.push(e, i, c, n, je.z, s, t);
							}
						} else a.visible && S.push(e, i, a, n, je.z, null, t);
					}
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) bt(i[e], t, n, r);
		}
		function xt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			w.setupLightsView(n), De === !0 && qe.setGlobalState(M.clippingPlanes, n), r && I.viewport(fe.copy(r)), i.length > 0 && Ct(i, t, n), a.length > 0 && Ct(a, t, n), o.length > 0 && Ct(o, t, n), I.buffers.depth.setTest(!0), I.buffers.depth.setMask(!0), I.buffers.color.setMask(!0), I.setPolygonOffset(!1);
		}
		function St(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (w.state.transmissionRenderTarget[r.id] === void 0) {
				let e = Ie.has("EXT_color_buffer_half_float") || Ie.has("EXT_color_buffer_float");
				w.state.transmissionRenderTarget[r.id] = new on(1, 1, {
					generateMipmaps: !0,
					type: e ? D : b,
					minFilter: y,
					samples: Math.max(4, Le.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					storeMultisampledDepthBuffer: !1,
					storeMultisampledStencilBuffer: !1,
					colorSpace: Kt.workingColorSpace
				});
			}
			let a = w.state.transmissionRenderTarget[r.id], o = r.viewport || fe;
			a.setSize(o.z * M.transmissionResolutionScale, o.w * M.transmissionResolutionScale);
			let s = M.getRenderTarget(), c = M.getActiveCubeFace(), l = M.getActiveMipmapLevel();
			M.setRenderTarget(a), M.getClearColor(he), ge = M.getClearAlpha(), ge < 1 && M.setClearColor(16777215, .5), M.clear(), Ne && Xe.render(n);
			let u = M.toneMapping;
			M.toneMapping = 0;
			let d = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), w.setupLightsView(r), De === !0 && qe.setGlobalState(M.clippingPlanes, r), Ct(e, n, r), R.updateMultisampleRenderTarget(a), R.updateRenderTargetMipmap(a), Ie.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, wt(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (R.updateMultisampleRenderTarget(a), R.updateRenderTargetMipmap(a));
			}
			M.setRenderTarget(s, c, l), M.setClearColor(he, ge), d !== void 0 && (r.viewport = d), M.toneMapping = u;
		}
		function Ct(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && wt(o, t, n, s, l, c);
			}
		}
		function wt(e, t, n, r, i, a) {
			N !== null && i.isNodeMaterial && N.setObject(e, i), e.onBeforeRender(M, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(M, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, M.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, M.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : M.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(M, t, n, r, i, a);
		}
		function Tt(e) {
			let t = 0;
			for (let n of e) n.texture !== null && t++;
			return t;
		}
		function Et(e, t, n) {
			t.isScene !== !0 && (t = Me);
			let r = L.get(e), i = w.state.lights, a = w.state.shadowsArray, o = i.state.version, s = Ue.getParameters(e, i.state, a, t, n, w.state.lightProbeGridArray), c = Ue.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = ze.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", ft), l = /* @__PURE__ */ new Map(), r.programs = l, r.programVariants = /* @__PURE__ */ new Map());
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return kt(e, s), d;
			} else s.uniforms = Ue.getUniforms(e), N !== null && e.isNodeMaterial && N.build(e, n, s), e.onBeforeCompile(s, M), d = Ue.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = qe.uniform), kt(e, s), r.needsLights = Mt(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.sunLights.value = i.state.sun, f.sunLightShadows.value = i.state.sunShadow, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.sunShadowMatrix.value = i.state.sunShadowMatrix, f.sunShadowCascade.value = i.state.sunShadowCascade, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.numLightProbeGrids = Tt(w.state.lightProbeGridArray), r.currentProgram = d, r.uniformsList = null, d;
		}
		function Dt(e, t, n, r, i) {
			let a = L.get(e), o = a.currentProgram.id + "," + r + "," + i, s = a.programVariants.get(o);
			return s === void 0 ? (s = Et(e, t, n), a.programVariants.set(o, s)) : (a.currentProgram = s, a.uniformsList = null, a.outputColorSpace = r, a.toneMapping = i), s;
		}
		function Ot(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = yl.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function kt(e, t) {
			let n = L.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function At(e, t, n, r, i) {
			t.isScene !== !0 && (t = Me), R.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = P === null ? M.outputColorSpace : P.isXRRenderTarget === !0 ? P.texture.colorSpace : Kt.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = ze.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (P === null || P.isXRRenderTarget === !0) && (h = M.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = L.get(r), y = w.state.lights;
			if (De === !0 && (Oe === !0 || e !== de)) {
				let t = e === de && r.id === ue;
				qe.setState(r, e, t);
			}
			let b = !1, S = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version || i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i._colorsTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i._colorsTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== qe.numPlanes || v.numIntersection !== qe.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.morphTargetsCount === _ && v.numLightProbeGrids === Tt(w.state.lightProbeGridArray) ? (v.outputColorSpace !== s || v.toneMapping !== h) && (S = !0) : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let C = v.currentProgram;
			(b === !0 || S === !0) && (C = S === !0 ? Dt(r, t, i, s, h) : Et(r, t, i), N && r.isNodeMaterial && N.onUpdateProgram(r, C, v));
			let T = !1, E = !1, D = !1, O = C.getUniforms(), k = v.uniforms;
			if (I.useProgram(C.program) && (T = !0, E = !0, D = !0), r.id !== ue && (ue = r.id, E = !0), T || de !== e) {
				I.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), O.setValue(F, "projectionMatrix", e.projectionMatrix), O.setValue(F, "viewMatrix", e.matrixWorldInverse);
				let t = O.map.cameraPosition;
				t !== void 0 && t.setValue(F, Ae.setFromMatrixPosition(e.matrixWorld)), Le.logarithmicDepthBuffer && O.setValue(F, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && O.setValue(F, "isOrthographic", e.isOrthographicCamera === !0), de !== e && (de = e, E = !0, D = !0);
			}
			if (v.needsLights && (y.state.sunShadowMap.length > 0 && O.setValue(F, "sunShadowMap", y.state.sunShadowMap, R), y.state.directionalShadowMap.length > 0 && O.setValue(F, "directionalShadowMap", y.state.directionalShadowMap, R), y.state.spotShadowMap.length > 0 && O.setValue(F, "spotShadowMap", y.state.spotShadowMap, R), y.state.pointShadowMap.length > 0 && O.setValue(F, "pointShadowMap", y.state.pointShadowMap, R)), i.isSkinnedMesh) {
				O.setOptional(F, i, "bindMatrix"), O.setOptional(F, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), O.setValue(F, "boneTexture", e.boneTexture, R));
			}
			i.isBatchedMesh && (O.setOptional(F, i, "batchingTexture"), O.setValue(F, "batchingTexture", i._matricesTexture, R), O.setOptional(F, i, "batchingIdTexture"), O.setValue(F, "batchingIdTexture", i._indirectTexture, R), O.setOptional(F, i, "batchingColorTexture"), i._colorsTexture !== null && O.setValue(F, "batchingColorTexture", i._colorsTexture, R));
			let A = n.morphAttributes;
			if ((A.position !== void 0 || A.normal !== void 0 || A.color !== void 0) && Ze.update(i, n, C), (E || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, O.setValue(F, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (k.envMapIntensity.value = t.environmentIntensity), k.dfgLUT !== void 0 && (k.dfgLUT.value = Iu()), E) {
				if (O.setValue(F, "toneMappingExposure", M.toneMappingExposure), v.needsLights && jt(k, D), a && r.fog === !0 && We.refreshFogUniforms(k, a), We.refreshMaterialUniforms(k, r, ye, ve, w.state.transmissionRenderTarget[e.id]), v.needsLights && v.numLightProbeGrids > 0) {
					let e = x, t = 0;
					for (let n of w.state.lightProbeGridArray) n.texture !== null && (e.textures[t] = n.texture, e.min[t] = n.boundingBox.min, e.max[t] = n.boundingBox.max, e.resolution[t] = n.resolution, t++);
					for (let n in e) e[n].length = t;
					k.probesSH.value = e.textures, k.probesMin.value = e.min, k.probesMax.value = e.max, k.probesResolution.value = e.resolution;
				}
				yl.upload(F, Ot(v), k, R);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (yl.upload(F, Ot(v), k, R), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && O.setValue(F, "center", i.center), O.setValue(F, "modelViewMatrix", i.modelViewMatrix), O.setValue(F, "normalMatrix", i.normalMatrix), O.setValue(F, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					rt.update(n, C), rt.bind(n, C);
				}
			}
			return C;
		}
		function jt(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.sunLights.needsUpdate = t, e.sunLightShadows.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function Mt(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return oe;
		}, this.getActiveMipmapLevel = function() {
			return le;
		}, this.getRenderTarget = function() {
			return P;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = L.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), L.get(e.texture).__webglTexture = t, L.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = L.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		}, this.setRenderTarget = function(e, t = 0, n = 0) {
			P = e, oe = t, le = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = L.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					I.bindFramebuffer(F.FRAMEBUFFER, o.__webglFramebuffer), fe.copy(e.viewport), pe.copy(e.scissor), me = e.scissorTest, I.viewport(fe), I.scissor(pe), I.setScissorTest(me), ue = -1;
					return;
				}
				if (o.__webglFramebuffer === void 0) R.setupRenderTarget(e);
				else if (o.__hasExternalTextures) R.rebindTextures(e, L.get(e.texture).__webglTexture, L.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && L.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
						R.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = L.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && R.useMultisampledRTT(e) === !1 ? L.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, fe.copy(e.viewport), pe.copy(e.scissor), me = e.scissorTest;
			} else fe.copy(Se).multiplyScalar(ye).floor(), pe.copy(Ce).multiplyScalar(ye).floor(), me = we;
			if (n !== 0 && (r = ne), I.bindFramebuffer(F.FRAMEBUFFER, r) && I.drawBuffers(e, r), I.viewport(fe), I.scissor(pe), I.setScissorTest(me), i) {
				let r = L.get(e.texture);
				F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = L.get(e.textures[t]);
					F.framebufferTextureLayer(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = L.get(e.texture);
				F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, t.__webglTexture, n);
			}
			ue = -1;
		};
		function Nt(e) {
			let t = L.get(e);
			return (t.__readFormat !== e.format || t.__readType !== e.type) && (t.__readFormat = e.format, t.__readType = e.type, t.__formatReadable = Le.textureFormatReadable(e.format), t.__typeReadable = Le.textureTypeReadable(e.type)), t;
		}
		this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				B("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = L.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				I.bindFramebuffer(F.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					e.textures.length > 1 && F.readBuffer(F.COLOR_ATTACHMENT0 + s);
					let u = Nt(o);
					if (u.__formatReadable === !1) {
						B("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (u.__typeReadable === !1) {
						B("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && F.readPixels(t, n, r, i, tt.convert(c), tt.convert(l), a);
				} finally {
					let e = P === null ? null : L.get(P).__webglFramebuffer;
					I.bindFramebuffer(F.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = L.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
					I.bindFramebuffer(F.FRAMEBUFFER, c);
					let o = e.textures[s], l = o.format, u = o.type;
					e.textures.length > 1 && F.readBuffer(F.COLOR_ATTACHMENT0 + s);
					let d = Nt(o);
					if (d.__formatReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
					if (d.__typeReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
					let f = F.createBuffer();
					F.bindBuffer(F.PIXEL_PACK_BUFFER, f), F.bufferData(F.PIXEL_PACK_BUFFER, a.byteLength, F.STREAM_READ), F.readPixels(t, n, r, i, tt.convert(l), tt.convert(u), 0), F.bindBuffer(F.PIXEL_PACK_BUFFER, null);
					let p = P === null ? null : L.get(P).__webglFramebuffer;
					I.bindFramebuffer(F.FRAMEBUFFER, p);
					let m = F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE, 0);
					return F.flush(), await lt(F, m, 4), F.bindBuffer(F.PIXEL_PACK_BUFFER, f), F.getBufferSubData(F.PIXEL_PACK_BUFFER, 0, a), F.bindBuffer(F.PIXEL_PACK_BUFFER, null), F.deleteBuffer(f), F.deleteSync(m), a;
				}
				throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
			}
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			R.setTexture2D(e, 0), F.copyTexSubImage2D(F.TEXTURE_2D, n, 0, 0, o, s, i, a), I.unbindTexture();
		}, this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = tt.convert(t.format), _ = tt.convert(t.type), v;
			t.isData3DTexture ? (R.setTexture3D(t, 0), v = F.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (R.setTexture2DArray(t, 0), v = F.TEXTURE_2D_ARRAY) : (R.setTexture2D(t, 0), v = F.TEXTURE_2D), I.activeTexture(F.TEXTURE0), I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL, t.flipY), I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), I.pixelStorei(F.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = I.getParameter(F.UNPACK_ROW_LENGTH), b = I.getParameter(F.UNPACK_IMAGE_HEIGHT), x = I.getParameter(F.UNPACK_SKIP_PIXELS), S = I.getParameter(F.UNPACK_SKIP_ROWS), C = I.getParameter(F.UNPACK_SKIP_IMAGES);
			I.pixelStorei(F.UNPACK_ROW_LENGTH, h.width), I.pixelStorei(F.UNPACK_IMAGE_HEIGHT, h.height), I.pixelStorei(F.UNPACK_SKIP_PIXELS, l), I.pixelStorei(F.UNPACK_SKIP_ROWS, u), I.pixelStorei(F.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = L.get(e), r = L.get(t), h = L.get(n.__renderTarget), g = L.get(r.__renderTarget);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, h.__webglFramebuffer), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (F.framebufferTextureLayer(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, L.get(e).__webglTexture, i, d + n), F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, L.get(t).__webglTexture, a, m + n)), F.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, F.DEPTH_BUFFER_BIT, F.NEAREST);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, null), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || L.has(e)) {
				let n = L.get(e), r = L.get(t);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, re), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, ie);
				for (let e = 0; e < c; e++) w ? F.framebufferTextureLayer(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : F.framebufferTexture2D(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, n.__webglTexture, i), T ? F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : F.framebufferTexture2D(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? F.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : F.copyTexSubImage2D(v, a, f, p, l, u, o, s) : F.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, F.COLOR_BUFFER_BIT, F.NEAREST);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, null), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? F.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? F.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : F.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? F.texSubImage2D(F.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? F.compressedTexSubImage2D(F.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : F.texSubImage2D(F.TEXTURE_2D, a, f, p, o, s, g, _, h);
			I.pixelStorei(F.UNPACK_ROW_LENGTH, y), I.pixelStorei(F.UNPACK_IMAGE_HEIGHT, b), I.pixelStorei(F.UNPACK_SKIP_PIXELS, x), I.pixelStorei(F.UNPACK_SKIP_ROWS, S), I.pixelStorei(F.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps === !0 && t.mipmapsAutoUpdate === !0 && F.generateMipmap(v), I.unbindTexture();
		}, this.initRenderTarget = function(e) {
			L.get(e).__webglFramebuffer === void 0 && R.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? R.setTextureCube(e, 0) : e.isData3DTexture ? R.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? R.setTexture2DArray(e, 0) : R.setTexture2D(e, 0), I.unbindTexture();
		}, this.resetState = function() {
			oe = 0, le = 0, P = null, I.reset(), nt.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return et;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = Kt._getDrawingBufferColorSpace(e), t.unpackColorSpace = Kt._getUnpackColorSpace();
	}
}, Ru = new U(), zu = new zt(), Bu = new U(), Vu = class extends In {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS3DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.pointerEvents = "auto", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this;
	}
}, Hu = new ln(), Uu = new ln(), Wu = class {
	constructor(e = {}) {
		let t = this, n, r, i, a, o = {
			camera: { style: "" },
			objects: /* @__PURE__ */ new WeakMap()
		}, s = e.element === void 0 ? document.createElement("div") : e.element;
		s.style.overflow = "hidden", this.domElement = s;
		let c = document.createElement("div");
		c.style.transformOrigin = "0 0", c.style.pointerEvents = "none", s.appendChild(c);
		let l = document.createElement("div");
		l.style.transformStyle = "preserve-3d", c.appendChild(l), this.getSize = function() {
			return {
				width: n,
				height: r
			};
		}, this.render = function(e, t) {
			let s = t.projectionMatrix.elements[5] * a;
			t.view && t.view.enabled ? (c.style.transform = `translate( ${-t.view.offsetX * (n / t.view.width)}px, ${-t.view.offsetY * (r / t.view.height)}px )`, c.style.transform += `scale( ${t.view.fullWidth / t.view.width}, ${t.view.fullHeight / t.view.height} )`) : c.style.transform = "", e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld();
			let f, p;
			t.isOrthographicCamera && (f = -(t.right + t.left) / 2, p = (t.top + t.bottom) / 2);
			let h = t.view && t.view.enabled ? t.view.height / t.view.fullHeight : 1, g = t.isOrthographicCamera ? `scale( ${h} )scale(` + s + ")translate(" + u(f) + "px," + u(p) + "px)" + d(t.matrixWorldInverse) : `scale( ${h} )translateZ(` + s + "px)" + d(t.matrixWorldInverse), _ = (t.isPerspectiveCamera ? "perspective(" + s + "px) " : "") + g + "translate(" + i + "px," + a + "px)";
			o.camera.style !== _ && (l.style.transform = _, o.camera.style = _), m(e, e, t, g);
		}, this.setSize = function(e, t) {
			n = e, r = t, i = n / 2, a = r / 2, s.style.width = e + "px", s.style.height = t + "px", c.style.width = e + "px", c.style.height = t + "px", l.style.width = e + "px", l.style.height = t + "px";
		};
		function u(e) {
			return Math.abs(e) < 1e-10 ? 0 : e;
		}
		function d(e) {
			let t = e.elements;
			return "matrix3d(" + u(t[0]) + "," + u(-t[1]) + "," + u(t[2]) + "," + u(t[3]) + "," + u(t[4]) + "," + u(-t[5]) + "," + u(t[6]) + "," + u(t[7]) + "," + u(t[8]) + "," + u(-t[9]) + "," + u(t[10]) + "," + u(t[11]) + "," + u(t[12]) + "," + u(-t[13]) + "," + u(t[14]) + "," + u(t[15]) + ")";
		}
		function f(e) {
			let t = e.elements;
			return "translate(-50%,-50%)" + ("matrix3d(" + u(t[0]) + "," + u(t[1]) + "," + u(t[2]) + "," + u(t[3]) + "," + u(-t[4]) + "," + u(-t[5]) + "," + u(-t[6]) + "," + u(-t[7]) + "," + u(t[8]) + "," + u(t[9]) + "," + u(t[10]) + "," + u(t[11]) + "," + u(t[12]) + "," + u(t[13]) + "," + u(t[14]) + "," + u(t[15]) + ")");
		}
		function p(e) {
			e.isCSS3DObject && (e.element.style.display = "none");
			for (let t = 0, n = e.children.length; t < n; t++) p(e.children[t]);
		}
		function m(e, n, r, i) {
			if (e.visible === !1) p(e);
			else {
				if (e.isCSS3DObject) {
					let i = e.layers.test(r.layers) === !0, a = e.element;
					if (a.style.display = i === !0 ? "" : "none", i === !0) {
						e.onBeforeRender(t, n, r);
						let i;
						e.isCSS3DSprite ? (Hu.copy(r.matrixWorldInverse), Hu.transpose(), e.rotation2D !== 0 && Hu.multiply(Uu.makeRotationZ(e.rotation2D)), e.matrixWorld.decompose(Ru, zu, Bu), Hu.setPosition(Ru), Hu.scale(Bu), Hu.elements[3] = 0, Hu.elements[7] = 0, Hu.elements[11] = 0, Hu.elements[15] = 1, i = f(Hu)) : i = f(e.matrixWorld);
						let s = o.objects.get(e);
						if (s === void 0 || s.style !== i) {
							a.style.transform = i;
							let t = { style: i };
							o.objects.set(e, t);
						}
						a.parentNode !== l && l.appendChild(a), e.onAfterRender(t, n, r);
					}
				}
				for (let t = 0, a = e.children.length; t < a; t++) m(e.children[t], n, r, i);
			}
		}
	}
}, Gu = class extends Gn {
	constructor() {
		super(), this.name = "RoomEnvironment", this.position.y = -3.5;
		let e = new Mi();
		e.deleteAttribute("uv");
		let t = new q({ side: 1 }), n = new q(), r = new ns(16777215, 900, 28, 2);
		r.position.set(.418, 16.199, .3), this.add(r);
		let i = new K(e, t);
		i.position.set(-.757, 13.219, .717), i.scale.set(31.713, 28.305, 28.591), this.add(i);
		let a = new bi(e, n, 6), o = new In();
		o.position.set(-10.906, 2.009, 1.846), o.rotation.set(0, -.195, 0), o.scale.set(2.328, 7.905, 4.651), o.updateMatrix(), a.setMatrixAt(0, o.matrix), o.position.set(-5.607, -.754, -.758), o.rotation.set(0, .994, 0), o.scale.set(1.97, 1.534, 3.955), o.updateMatrix(), a.setMatrixAt(1, o.matrix), o.position.set(6.167, .857, 7.803), o.rotation.set(0, .561, 0), o.scale.set(3.927, 6.285, 3.687), o.updateMatrix(), a.setMatrixAt(2, o.matrix), o.position.set(-2.017, .018, 6.124), o.rotation.set(0, .333, 0), o.scale.set(2.002, 4.566, 2.064), o.updateMatrix(), a.setMatrixAt(3, o.matrix), o.position.set(2.291, -.756, -2.621), o.rotation.set(0, -.286, 0), o.scale.set(1.546, 1.552, 1.496), o.updateMatrix(), a.setMatrixAt(4, o.matrix), o.position.set(-2.193, -.369, -5.547), o.rotation.set(0, .516, 0), o.scale.set(3.875, 3.487, 2.986), o.updateMatrix(), a.setMatrixAt(5, o.matrix), this.add(a);
		let s = new K(e, Ku(50));
		s.position.set(-16.116, 14.37, 8.208), s.scale.set(.1, 2.428, 2.739), this.add(s);
		let c = new K(e, Ku(50));
		c.position.set(-16.109, 18.021, -8.207), c.scale.set(.1, 2.425, 2.751), this.add(c);
		let l = new K(e, Ku(17));
		l.position.set(14.904, 12.198, -1.832), l.scale.set(.15, 4.265, 6.331), this.add(l);
		let u = new K(e, Ku(43));
		u.position.set(-.462, 8.89, 14.52), u.scale.set(4.38, 5.441, .088), this.add(u);
		let d = new K(e, Ku(20));
		d.position.set(3.235, 11.486, -12.541), d.scale.set(2.5, 2, .1), this.add(d);
		let f = new K(e, Ku(100));
		f.position.set(0, 20, 0), f.scale.set(1, .1, 1), this.add(f);
	}
	dispose() {
		let e = /* @__PURE__ */ new Set();
		this.traverse((t) => {
			t.isMesh && (e.add(t.geometry), e.add(t.material));
		});
		for (let t of e) t.dispose();
	}
};
function Ku(e) {
	return new go({
		color: 0,
		emissive: 16777215,
		emissiveIntensity: e
	});
}
// node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function qu(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new zr();
	c.morphTargetsRelative = s;
	let l = 0;
	for (let u = 0; u < e.length; ++u) {
		let d = e[u], f = 0, p = 0;
		if (n !== (d.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
		for (let e in d.attributes) {
			if (!r.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure \"" + e + "\" attribute exists among all geometries, or in none of them."), null;
			a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++;
		}
		if (f !== r.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of attributes."), null;
		if (s !== d.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
		for (let t in d.morphAttributes) {
			if (!i.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ".  .morphAttributes must be consistent throughout all geometries."), null;
			if (d.morphAttributes[t].length !== e[0].morphAttributes[t].length) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have the same number of morph targets for the \"" + t + "\" morph attribute."), null;
			o[t] === void 0 && (o[t] = []), o[t].push(d.morphAttributes[t]), p++;
		}
		if (p !== i.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of morph attributes."), null;
		if (t) {
			let e;
			if (n) e = d.index.count;
			else if (d.attributes.position !== void 0) e = d.attributes.position.count;
			else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". The geometry must have either an index or a position attribute"), null;
			c.addGroup(l, e, u), l += e;
		}
	}
	if (n) {
		let t = 0, n = [];
		for (let r = 0; r < e.length; ++r) {
			let i = e[r].index;
			for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
			t += e[r].attributes.position.count;
		}
		c.setIndex(n);
	}
	for (let e in a) {
		let t = Ju(a[e]);
		if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
		c.setAttribute(e, t);
	}
	for (let e in o) {
		let t = o[e][0].length;
		if (t !== 0) {
			c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
			for (let n = 0; n < t; ++n) {
				let t = [];
				for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
				let r = Ju(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function Ju(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new wr(o, n, r), c = 0;
	for (let t = 0; t < e.length; ++t) {
		let r = e[t];
		if (r.isInterleavedBufferAttribute) {
			let e = c / n;
			for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
				let n = r.getComponent(t, i);
				s.setComponent(t + e, i, n);
			}
		} else o.set(r.array, c);
		c += r.count * n;
	}
	return i !== void 0 && (s.gpuType = i), s;
}
// src/labels.js
var Yu = "Arial, \"Helvetica Neue\", Helvetica, \"Liberation Sans\", sans-serif";
function Xu(e, t, n) {
	let r = document.createElement("canvas");
	r.width = Math.round(e * n), r.height = Math.round(t * n);
	let i = r.getContext("2d");
	return i.scale(n, n), [r, i];
}
function Zu(e) {
	let t = new Oi(e);
	return t.colorSpace = Je, t.anisotropy = 8, t;
}
function Qu(e) {
	let { panel: t } = e, [n, r] = Xu(t.w, t.h, 16), i = t.fx0, a = t.fy0, o = "#d9d9d2";
	r.fillStyle = o, r.strokeStyle = o;
	let s = (e, t, n, o, { weight: s = 700, align: c = "center", squeeze: l = 1 } = {}) => {
		r.save(), r.font = `${s} ${o}px ${Yu}`, r.textAlign = c, r.textBaseline = "alphabetic", r.translate(t - i, n - a), r.scale(l, 1), r.fillText(e, 0, 0), r.restore();
	}, [c, l, u, d] = e.buttonCols;
	s("A/B", c, 176.75, 1.9), s("RGB/Y R-Y B-Y", c + .3, 178.75, 1.35, { squeeze: .92 }), s("LINE/", l, 176.75, 1.9), s("RGB", l, 178.9, 1.9), s("SYNC", u, 176.75, 1.9), s("INT/EXT", u, 178.9, 1.9), s("DEGAUSS", d, 177.4, 1.9), r.lineWidth = .28, r.beginPath(), r.moveTo(c + 4.4 - i, e.buttonRows[0] - 1.2 - a), r.lineTo(l - 4.4 - i, e.buttonRows[0] - 1.2 - a), r.stroke();
	let f = e.buttonRows[1] + 5.9, p = f + 1.85;
	s("BLUE", c, f, 1.75), s("ONLY", c, p, 1.75), s("UNDER", l, f, 1.75), s("SCAN", l, p, 1.75), s("H/V", u, f, 1.75), s("DELAY", u, p, 1.75), s("16:9", d, f + .6, 1.9), s("BIAS", e.trimCols[0], 176.6, 1.8), s("GAIN", e.trimCols[1], 176.6, 1.8);
	let m = (e.trimCols[0] + e.trimCols[1]) / 2;
	[
		"R",
		"G",
		"B"
	].forEach((t, n) => s(t, m, e.trimRows[n] + .75, 2)), e.knobs.forEach((e) => {
		s(e.label, e.fx, 178.75, 2.5), r.beginPath(), r.arc(e.fx - i, 180.45 - a, .3, 0, Math.PI * 2), r.fill();
	}), s("POWER", e.power.fx - .4, 178.2, 2.5), r.lineWidth = .26, r.beginPath(), r.moveTo(e.power.fx - 5.6 - i, 177.3 - a), r.lineTo(e.led.fx - i, 177.3 - a), r.lineTo(e.led.fx - i, e.led.fy - 2.2 - a), r.stroke();
	let h = e.power.fy + 8.1, g = e.power.fx - 4.2;
	return r.lineWidth = .18, r.fillRect(g - i, h - .55 - a, 1.3, .55), r.strokeRect(g - i, h - 1.2 - a, 1.3, 1.2), s("ON", g + 1.7, h, 1.25, { align: "left" }), r.fillRect(g + 4.2 - i, h - 1.2 - a, 1.3, .55), r.strokeRect(g + 4.2 - i, h - 1.2 - a, 1.3, 1.2), s("OFF", g + 5.9, h, 1.25, { align: "left" }), Zu(n);
}
function $u({ w: e = 33, h: t = 7.5, text: n = null, image: r = null, style: i = "chrome" } = {}) {
	let a = .6, [o, s] = Xu(e + a * 2, t + a * 2, Math.min(40, Math.floor(2048 / (e + a * 2))));
	s.translate(a, a);
	let c = i;
	if (i === "chrome" && (c = s.createLinearGradient(0, 0, 0, t), c.addColorStop(0, "#ffffff"), c.addColorStop(.45, "#e9e9e9"), c.addColorStop(.55, "#b9b9b9"), c.addColorStop(1, "#efefef")), s.fillStyle = c, s.strokeStyle = c, r) {
		let n = r.naturalWidth || r.videoWidth || r.width, i = r.naturalHeight || r.videoHeight || r.height, a = Math.min(e / n, t / i);
		s.drawImage(r, (e - n * a) / 2, (t - i * a) / 2, n * a, i * a);
	} else if (n !== null) {
		if (n.trim()) {
			s.font = `700 ${t * 1.25}px Rockwell, "Roboto Slab", "Courier New", Georgia, serif`, s.textBaseline = "alphabetic", s.textAlign = "center";
			let r = s.measureText(n), i = r.actualBoundingBoxAscent || t, a = r.actualBoundingBoxDescent || 0, o = Math.min(e / r.width, t / (i + a));
			s.save(), s.translate(e / 2, t / 2 + (i - a) / 2 * o), s.scale(o, o), s.fillText(n, 0, 0), s.restore();
		}
	} else s.scale(e / 33, t / 7.5), ed(s, 7.5);
	return Zu(o);
}
function ed(e, t) {
	let n = .95, r = (t) => {
		e.beginPath(), t.forEach(([t, n], r) => r ? e.lineTo(t, n) : e.moveTo(t, n)), e.closePath(), e.fill();
	};
	{
		let n = (e, n) => [0 + e * 6.5, n * t];
		e.lineWidth = 1.75, e.lineCap = "butt", e.beginPath(), e.moveTo(...n(.88, .3)), e.bezierCurveTo(...n(.84, .07), ...n(.22, .03), ...n(.17, .27)), e.bezierCurveTo(...n(.13, .47), ...n(.42, .47), ...n(.52, .5)), e.bezierCurveTo(...n(.7, .55), ...n(.93, .56), ...n(.86, .76)), e.bezierCurveTo(...n(.78, .98), ...n(.2, .97), ...n(.11, .7)), e.stroke(), e.fillRect(5.33, t * .03, .75, t * .3), e.fillRect(.195, t * .67, .75, t * .3);
	}
	{
		let n = 11.45, r = t / 2;
		e.beginPath(), e.ellipse(n, t / 2, 4.15, r, 0, 0, Math.PI * 2), e.ellipse(n, t / 2, 2.0000000000000004, r - 1.05, 0, 0, Math.PI * 2), e.fill("evenodd");
	}
	{
		let i = 16.4;
		e.fillRect(17.349999999999998, 0, 1.15, t), e.fillRect(22.699999999999996, 0, 1.15, t), r([
			[17.349999999999998, 0],
			[19.9, 0],
			[23.849999999999998, t],
			[21.299999999999997, t]
		]), e.fillRect(i, 0, 3.3, n), e.fillRect(i, t - n, 3.05, n), e.fillRect(21.749999999999996, 0, 3.05, n);
	}
	r([
		[26.1, 0],
		[28.6, 0],
		[30.3, t * .55],
		[28.000000000000004, t * .55]
	]), r([
		[30.9, 0],
		[32.1, 0],
		[30.150000000000002, t * .55],
		[29.05, t * .52]
	]), e.fillRect(28.000000000000004, t * .5, 2.3, t * .5), e.fillRect(25.3, 0, 4.1, n), e.fillRect(29.9, 0, 3.1, n), e.fillRect(26.85, t - n, 4.6, n);
}
function td(e = 18, t = 5) {
	let [n, r] = Xu(e, t, 40);
	r.fillStyle = "#f1f1ec", r.font = `900 4.3px "Arial Black", "Helvetica Neue", ${Yu}`, r.textBaseline = "alphabetic";
	let i = r.measureText("Trinitron").width;
	return r.save(), r.translate(.3, t - 1), r.scale((e - .6) / i, 1), r.fillText("Trinitron", 0, 0), r.restore(), Zu(n);
}
function nd(e = 128) {
	let t = document.createElement("canvas");
	t.width = t.height = e;
	let n = t.getContext("2d"), r = n.createImageData(e, e), i = 1337, a = () => (i = i * 1664525 + 1013904223 >>> 0) / 4294967296;
	for (let t = 0; t < e * e; t++) {
		let e = 110 + a() * 70;
		r.data[t * 4] = r.data[t * 4 + 1] = r.data[t * 4 + 2] = e, r.data[t * 4 + 3] = 255;
	}
	n.putImageData(r, 0, 0);
	let o = new Oi(t);
	return o.wrapS = o.wrapT = d, o;
}
function rd(e, t, n) {
	let r = .5, i = document.createElement("canvas");
	i.width = Math.round((e + n * 2) * r), i.height = Math.round((t + n * 2) * r);
	let a = i.getContext("2d"), o = 4e3;
	return a.shadowColor = "rgba(0,0,0,0.6)", a.shadowBlur = n * .55 * r, a.shadowOffsetX = o, a.fillStyle = "#000", a.fillRect(n * r - o, n * r, e * r, t * r), new Oi(i);
}
function id(e, t, n) {
	let [r, i] = Xu(t, n, 32);
	if (i.fillStyle = "#e9e7dc", i.fillRect(0, 0, t, n), e) {
		let r = e.naturalWidth || e.videoWidth || e.width, a = e.naturalHeight || e.videoHeight || e.height, o = .8, s = Math.min((t - o * 2) / r, (n - o * 2) / a);
		i.drawImage(e, (t - r * s) / 2, (n - a * s) / 2, r * s, a * s);
	}
	return Zu(r);
}
function ad(e, t, n, r) {
	let [i, a] = Xu(e, t, n);
	return r(a, Yu), Zu(i);
}
// src/crt.js
var od = "\nvarying vec3 vPos;\nvarying vec3 vN;\nvoid main() {\n  vPos = position;\n  vN = normal;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}", sd = "\nprecision highp float;\nvarying vec3 vPos;\nvarying vec3 vN;\nuniform vec3 uCam;      // camera position in monitor space (mm)\nuniform vec4 uRect;     // picture rect: centre xy, half size\nuniform float uPlaneZ;  // z of the HTML plane\nuniform float uOn;      // 0 = tube off, 1 = picture showing\nuniform float uDegauss; // 0..1 decaying\nuniform float uTime;\nuniform float uLines;   // visible scanlines\nuniform float uFx;      // overlay strength\nuniform float uGlare;   // reflection strength\nuniform float uCorner;  // picture corner radius (mm)\nuniform float uOutside; // brightness of the face plate outside the picture\nuniform float uRoom;    // how much room light falls on the glass (1 = lit room, 0 = dark)\n\nfloat sdRoundRect(vec2 p, vec2 b, float r) {\n  vec2 d = abs(p) - b + r;\n  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;\n}\n\nfloat softbox(vec3 r, vec3 c, vec2 size, float soft) {\n  float dn = dot(r, c);\n  if (dn <= 0.0) return 0.0;\n  vec3 ux = normalize(cross(vec3(0.0, 1.0, 0.0), c));\n  vec3 uy = cross(c, ux);\n  vec2 p = vec2(dot(r, ux), dot(r, uy)) / dn;\n  vec2 e = smoothstep(size + soft, size - soft, abs(p));\n  return e.x * e.y;\n}\n\nvoid main() {\n  vec3 N = normalize(vN);\n  vec3 rd = normalize(vPos - uCam);\n  vec3 V = -rd;\n\n  // where this view ray lands on the HTML plane\n  float t = (uPlaneZ - uCam.z) / rd.z;\n  vec2 hit = uCam.xy + rd.xy * t;\n  vec2 p = hit - uRect.xy;\n  vec2 q = p / uRect.zw;\n  float sd = sdRoundRect(p, uRect.zw, uCorner);\n  float aa = max(fwidth(sd), 0.02);\n  float inside = 1.0 - smoothstep(-aa, aa, sd);\n\n  // room reflections on the glass\n  vec3 R = reflect(rd, N);\n  float fres = 0.045 + 0.955 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);\n  float win1 = softbox(R, normalize(vec3(-0.52, 0.50, 0.69)), vec2(0.20, 0.30), 0.07);\n  float win2 = softbox(R, normalize(vec3(0.80, 0.30, 0.52)), vec2(0.09, 0.45), 0.09);\n  vec3 glare = (vec3(1.0, 0.98, 0.94) * win1 * 2.4 + vec3(0.82, 0.9, 1.0) * win2 * 1.0 + vec3(0.32)) * fres * uGlare;\n\n  // unlit phosphor: the grey-green of a tube that is switched off\n  vec3 L = normalize(vec3(-0.4, 0.7, 0.6));\n  float diff = 0.42 + 0.58 * max(dot(N, L), 0.0);\n  glare *= uRoom;\n  vec3 offCol = vec3(0.20, 0.235, 0.215) * diff * mix(0.82 * uOutside, 1.0, inside) * uRoom + glare;\n\n  // scanlines (fade out when too fine to resolve, keeping average brightness)\n  float sv = (q.y * 0.5 + 0.5) * uLines;\n  float sVis = 1.0 - smoothstep(0.18, 0.5, fwidth(sv));\n  float scan = 0.24 * mix(0.5, 0.5 - 0.5 * cos(6.2831853 * sv), sVis);\n  // Trinitron aperture grille: vertical stripes, 0.5 mm pitch\n  float gv = p.x / 0.5;\n  float gVis = 1.0 - smoothstep(0.18, 0.5, fwidth(gv));\n  float grille = 0.10 * mix(0.5, 0.5 - 0.5 * cos(6.2831853 * gv), gVis);\n  // corner falloff\n  float vig = 0.34 * pow(clamp(length(q * vec2(0.84, 0.88)), 0.0, 1.3), 3.6);\n  float a = clamp((scan + grille + vig) * uFx + 0.03, 0.0, 0.92);\n\n  // degauss: rainbow blotches that swirl and die away\n  vec3 deg = vec3(0.0);\n  if (uDegauss > 0.001) {\n    vec2 dq = q + 0.10 * uDegauss * vec2(sin(uTime * 41.0 + q.y * 6.0), cos(uTime * 33.0 + q.x * 5.0));\n    deg = (0.5 + 0.5 * cos(6.2831853 * (dq.x * 1.2 + dq.y * 0.8 + vec3(0.0, 0.33, 0.67)) + uTime * 9.0))\n        * uDegauss * 0.5;\n  }\n\n  // faint glow spilling past the picture edge when lit\n  float halo = 0.035 * exp(-max(sd, 0.0) / 5.0) * (1.0 - inside);\n\n  vec3 outside = mix(offCol, vec3(0.014) + glare + vec3(0.55, 0.65, 1.0) * halo, uOn);\n  float k = inside * uOn;\n  vec3 rgb = mix(outside, glare + deg, k);\n  float alpha = mix(1.0, a, k);\n  gl_FragColor = vec4(rgb, alpha);\n}";
function cd({ rect: e, planeZ: t, lines: n = 240, corner: r = 5, outside: i = 1 }) {
	return new po({
		name: "crt-glass",
		uniforms: {
			uCam: { value: new U(0, 0, 1e3) },
			uRect: { value: new rn(e.cx, e.cy, e.w / 2, e.h / 2) },
			uPlaneZ: { value: t },
			uOn: { value: 0 },
			uDegauss: { value: 0 },
			uTime: { value: 0 },
			uLines: { value: n },
			uFx: { value: 1 },
			uGlare: { value: 1 },
			uCorner: { value: r },
			uOutside: { value: i },
			uRoom: { value: 1 }
		},
		vertexShader: od,
		fragmentShader: sd,
		blending: 0,
		toneMapped: !1
	});
}
function X(e, t, n, r = 0, i = 0) {
	let a = e / 2, o = t / 2;
	n = Math.max(.01, Math.min(n, a, o));
	let s = [
		[
			a - n,
			o - n,
			0
		],
		[
			-a + n,
			o - n,
			Math.PI / 2
		],
		[
			-a + n,
			-o + n,
			Math.PI
		],
		[
			a - n,
			-o + n,
			Math.PI * 1.5
		]
	], c = [];
	for (let [e, t, a] of s) for (let o = 0; o <= 5; o++) {
		let s = a + o / 5 * (Math.PI / 2);
		c.push(new H(r + e + Math.cos(s) * n, i + t + Math.sin(s) * n));
	}
	return c;
}
function ld(e, t, n, r = 32) {
	let i = [];
	for (let a = 0; a < r; a++) {
		let o = a / r * Math.PI * 2;
		i.push(new H(t + Math.cos(o) * e, n + Math.sin(o) * e));
	}
	return i;
}
var Z = (e, t) => e.map((e) => new U(e.x, e.y, t));
function ud(e, { skip: t = null } = {}) {
	let n = e[0].length, r = e.length, i = n + 1, a = [], o = [], s = [], c = 0;
	for (let t = 0; t < r; t++) {
		t > 0 && (c += e[t][0].distanceTo(e[t - 1][0]));
		let r = 0;
		for (let i = 0; i <= n; i++) {
			let s = e[t][i % n];
			i > 0 && (r += s.distanceTo(e[t][i - 1])), a.push(s.x, s.y, s.z), o.push(r, c);
		}
	}
	for (let e = 0; e < r - 1; e++) for (let r = 0; r < n; r++) {
		if (t && t(r)) continue;
		let n = e * i + r, a = n + 1, o = n + i, c = o + 1;
		s.push(n, a, o, a, c, o);
	}
	let l = new zr();
	l.setAttribute("position", new Dr(a, 3)), l.setAttribute("uv", new Dr(o, 2)), l.setIndex(s), l.computeVertexNormals();
	let u = l.attributes.normal;
	for (let e = 0; e < r; e++) {
		let t = e * i, r = t + n, a = u.getX(t) + u.getX(r), o = u.getY(t) + u.getY(r), s = u.getZ(t) + u.getZ(r), c = Math.hypot(a, o, s) || 1;
		u.setXYZ(t, a / c, o / c, s / c), u.setXYZ(r, a / c, o / c, s / c);
	}
	return l;
}
function Q(e, t = [], n = 0) {
	let r = new fa(e);
	for (let e of t) r.holes.push(new da(e));
	let i = new $a(r);
	return n && i.translate(0, 0, n), i;
}
function dd(e, t, n, r, i) {
	return qu([ud([
		Z(X(e, t, r), 0),
		Z(X(e, t, r), n - i),
		Z(X(e - 2 * i, t - 2 * i, r - i), n)
	]), Q(X(e - 2 * i, t - 2 * i, r - i), [], n)]);
}
function fd(e, t, n, r = e) {
	return {
		walls: ud([Z(e, t), Z(r, t - n)]),
		floor: Q(r, [], t - n)
	};
}
var pd = (e, t, n, r) => e.rotateX(-Math.PI / 2).translate(t, n, r), md = class {
	constructor(e) {
		this.root = new Ln(), this.root.name = e, this.interactive = new Ln(), this.interactive.name = "controls", this.root.add(this.interactive), this.controls = {}, this.bucket = {}, this.grain = nd(), this.grain.repeat.set(1 / 9, 1 / 9), this.M = {
			black: new q({
				name: "black",
				color: 460551,
				roughness: .85
			}),
			rubber: new q({
				name: "rubber",
				color: 1184274,
				roughness: .92
			}),
			screw: new q({
				name: "screw",
				color: 12895424,
				roughness: .38,
				metalness: 1
			}),
			chrome: new q({
				name: "chrome",
				color: 14606046,
				roughness: .18,
				metalness: 1
			}),
			slot: new Zr({
				name: "slot",
				color: 328965
			})
		};
	}
	mat(e, t, n = q) {
		return this.M[e] = new n({
			name: e,
			...t
		}), this.M[e];
	}
	add(e, t) {
		var n;
		if (!this.M[e]) throw Error(`kit: no material "${e}"`);
		return ((n = this.bucket)[e] || (n[e] = [])).push(t), t;
	}
	mesh(e, t, n) {
		let r = new K(e, t);
		return n && (r.name = n), this.root.add(r), r;
	}
	lamp(e, t, n) {
		let r = new q({
			name: "lamp",
			color: 1710618,
			roughness: .35,
			emissive: t,
			emissiveIntensity: 0
		}), i = this.mesh(e, r, n);
		return i.userData.lampOn = 2.2, i;
	}
	button({ id: e, pos: t, w: n, h: r, out: i = 3, travel: a = 1.5, len: o = 9, r: s = .7, c = .55, facing: l = "front", material: u, lamp: d = null }) {
		let f = dd(n, r, o, s, c), p = new K(f, u), m = new U();
		return l === "top" ? (f.rotateX(-Math.PI / 2), p.position.set(t[0], t[1] + i - o, t[2]), m.set(0, -1, 0)) : (p.position.set(t[0], t[1], t[2] + i - o), m.set(0, 0, -1)), p.name = e, p.userData.control = e, this.interactive.add(p), this.controls[e] = {
			id: e,
			kind: "button",
			mesh: p,
			home: p.position.clone(),
			axis: m,
			travel: a,
			lamp: d
		};
	}
	knob({ id: e, pos: t, radius: n = 5.25, len: r = 9.6, material: i, markColor: a = 15263970 }) {
		let o = [
			[n, 0],
			[n, r - 1],
			[n - .3, r - .35],
			[n - .95, r],
			[0, r]
		].map(([e, t]) => new H(e, t)), s = new Ln();
		s.position.set(...t), s.name = e;
		let c = new K(new Xa(o, 36).rotateX(Math.PI / 2), i);
		c.userData.control = e;
		let l = new K(new Mi(n * .18, n * .63, .12).translate(0, n * .5, r + .06), new Zr({ color: a }));
		return l.userData.control = e, s.add(c, l), this.interactive.add(s), this.controls[e] = {
			id: e,
			kind: "knob",
			mesh: c,
			group: s
		};
	}
	slider({ id: e, mesh: t, range: n }) {
		return t.name = e, t.userData.control = e, this.interactive.add(t), this.controls[e] = {
			id: e,
			kind: "slider",
			mesh: t,
			home: t.position.clone(),
			range: n
		};
	}
	decal(e, t, n, r, i, a, o = {}) {
		let s = new q({
			map: e,
			transparent: !0,
			depthWrite: !1,
			roughness: .6,
			...o
		}), c = new K(new Za(t, n), s);
		return c.position.set(r, i, a), c.raycast = () => {}, c.renderOrder = 2, this.root.add(c), c;
	}
	crt({ cx: e, cy: t, edgeZ: n, glassW: r, glassH: i, picW: a, picH: o, RH: s, RV: c, corner: l = 5, outside: u = 1 }) {
		let d = n + (r / 2) ** 2 / (2 * s), f = new Za(r + 8, i + 8, 40, 20), p = f.attributes.position;
		for (let n = 0; n < p.count; n++) {
			let r = p.getX(n), i = p.getY(n);
			p.setXYZ(n, r + e, i + t, d - r * r / (2 * s) - i * i / (2 * c));
		}
		return f.computeVertexNormals(), this.picture = {
			cx: e,
			cy: t,
			w: a,
			h: o,
			z: d - 2
		}, this.crtMaterial = cd({
			rect: this.picture,
			planeZ: this.picture.z,
			corner: l,
			outside: u
		}), this.glass = new K(f, this.crtMaterial), this.glass.name = "crt-glass", this.glass.userData.screen = !0, this.root.add(this.glass), this.picture;
	}
	shadow(e, t, n = .3, r = 70) {
		let i = new K(new Za(e + r * 2, t + r * 2).rotateX(-Math.PI / 2), new Zr({
			map: rd(e, t, r),
			transparent: !0,
			depthWrite: !1,
			toneMapped: !1
		}));
		return i.position.y = n, i.name = "contact-shadow", i.raycast = () => {}, this.root.add(i), this.shadowMesh = i, i;
	}
	finish(e, t = {}) {
		let n = new Ln();
		n.name = "body";
		for (let [e, t] of Object.entries(this.bucket)) {
			let r = new K(qu(t), this.M[e]);
			r.name = e, e === "slot" && (r.raycast = () => {}), n.add(r);
		}
		return this.root.add(n), {
			root: this.root,
			body: n,
			controls: this.controls,
			glass: this.glass,
			crtMaterial: this.crtMaterial,
			picture: this.picture,
			shadow: this.shadowMesh,
			meta: e,
			setPower: () => {},
			...t
		};
	}
};
function hd({ n: e, pitch: t, len: n, t: r = 1.7, at: i, step: a, face: o = "top" }) {
	let s = [];
	for (let c = 0; c < e; c++) {
		let e = new Za(n, r);
		o === "top" ? e.rotateX(-Math.PI / 2) : o === "left" ? e.rotateY(-Math.PI / 2) : o === "right" && e.rotateY(Math.PI / 2), e.translate(i[0] + a[0] * c * t, i[1] + a[1] * c * t, i[2] + a[2] * c * t), s.push(e);
	}
	return s;
}
// src/models/pvm9042qm.js
var gd = /* @__PURE__ */ t({
	DIM: () => _d,
	LAYOUT: () => Od,
	META: () => Md,
	buildMonitor: () => Nd
}), _d = {
	W: 217,
	H: 217,
	D: 352.5,
	FOOT_H: 9,
	BODY_H: 208,
	BEZEL_D: 30,
	PICTURE_W: 158,
	PICTURE_H: 118.5
}, { W: vd, D: yd, FOOT_H: bd, BODY_H: xd, BEZEL_D: Sd } = _d, Cd = bd + xd, wd = yd / 2, Td = -yd / 2, Ed = wd - Sd, Dd = bd + xd / 2, Od = {
	screen: {
		fx: 108.5,
		fy: 86,
		w: 199,
		h: 132
	},
	tally: {
		fx: 108.5,
		fy: 10.25,
		w: 22,
		h: 15.5
	},
	trinitron: {
		fx: 24.5,
		fy: 15,
		w: 18,
		h: 5
	},
	sony: {
		fx: 108.5,
		fy: 165.5,
		w: 33,
		h: 7.5
	},
	panel: {
		fx0: 15.5,
		fy0: 174.3,
		w: 184.5,
		h: 27.7
	},
	buttonCols: [
		21.7,
		33.2,
		45,
		56.5
	],
	buttonRows: [183.9, 193.4],
	buttons: [[
		"ab",
		"line-rgb",
		"sync",
		"degauss"
	], [
		"blue-only",
		"underscan",
		"hv-delay",
		"16-9"
	]],
	trimCols: [67, 76.7],
	trimRows: [
		180.9,
		188.4,
		195.9
	],
	knobs: [
		"APER",
		"BRIGHT",
		"CHROMA",
		"PHASE",
		"CONTR",
		"VOLUME"
	].map((e, t) => ({
		id: e.toLowerCase(),
		label: e,
		fx: 88.5 + 15.35 * t,
		fy: 187.2
	})),
	led: {
		fx: 177.5,
		fy: 188
	},
	power: {
		fx: 190.7,
		fy: 189.2
	}
}, kd = (e) => e - vd / 2, Ad = (e) => Cd - e, jd = (e, t, n = {}) => ({
	id: e,
	label: t,
	kind: "button",
	role: e,
	latch: !0,
	...n
}), Md = {
	id: "pvm-9042qm",
	name: "Sony PVM-9042QM",
	size: {
		w: vd,
		h: _d.H,
		d: yd
	},
	inputs: [
		"line-a",
		"line-b",
		"rgb",
		"component"
	],
	inputOf: (e) => e.buttons["line-rgb"] ? e.buttons.ab ? "component" : "rgb" : e.buttons.ab ? "line-b" : "line-a",
	noSignal: "black",
	controls: [
		jd("power", "Power", { latch: !1 }),
		jd("ab", "A/B input selector"),
		jd("line-rgb", "LINE/RGB input selector"),
		jd("sync", "Sync internal/external"),
		jd("degauss", "Degauss", { latch: !1 }),
		jd("blue-only", "Blue only"),
		jd("underscan", "Under scan"),
		jd("hv-delay", "H/V delay"),
		jd("16-9", "16:9", { role: "wide" }),
		{
			id: "aper",
			label: "Aperture (sharpness)",
			kind: "knob",
			role: "aper"
		},
		{
			id: "bright",
			label: "Brightness",
			kind: "knob",
			role: "bright"
		},
		{
			id: "chroma",
			label: "Chroma (colour)",
			kind: "knob",
			role: "chroma"
		},
		{
			id: "phase",
			label: "Phase (hue)",
			kind: "knob",
			role: "phase"
		},
		{
			id: "contr",
			label: "Contrast",
			kind: "knob",
			role: "contr"
		},
		{
			id: "volume",
			label: "Volume",
			kind: "knob",
			role: "volume"
		}
	]
};
function Nd({ tallyLogo: e = null } = {}) {
	let t = new Ln();
	t.name = "Sony PVM-9042QM";
	let n = nd();
	n.repeat.set(1 / 9, 1 / 9);
	let r = {
		cover: new q({
			name: "cover",
			color: 9671566,
			roughness: .74,
			metalness: .05,
			bumpMap: n,
			bumpScale: .6
		}),
		bezel: new q({
			name: "bezel",
			color: 5591887,
			roughness: .66,
			metalness: 0,
			bumpMap: n,
			bumpScale: .45
		}),
		funnel: new q({
			name: "funnel",
			color: 2828841,
			roughness: .72
		}),
		panel: new q({
			name: "panel",
			color: 3815993,
			roughness: .62
		}),
		black: new q({
			name: "black",
			color: 460551,
			roughness: .85
		}),
		strap: new q({
			name: "strap",
			color: 9211015,
			roughness: .6
		}),
		rubber: new q({
			name: "rubber",
			color: 1184274,
			roughness: .92
		}),
		handle: new ho({
			name: "handle",
			color: 723723,
			roughness: .32,
			clearcoat: .6,
			clearcoatRoughness: .25
		}),
		screw: new q({
			name: "screw",
			color: 12895424,
			roughness: .38,
			metalness: 1
		}),
		trimmer: new q({
			name: "trimmer",
			color: 1907997,
			roughness: .5
		}),
		slot: new Zr({
			name: "slot",
			color: 328965
		})
	}, i = () => new q({
		name: "button",
		color: 11118233,
		roughness: .6
	}), a = () => new q({
		name: "knob",
		color: 1315860,
		roughness: .38
	}), o = {}, s = (e, t) => (o[e] || (o[e] = [])).push(t), c = vd - 1, l = xd - 1, u = 3.5, d = X(c, l, u, 0, Dd), f = Dd + l / 2;
	s("cover", ud([Z(d, Td), Z(d, Ed)], { skip: (e) => e === 5 })), s("cover", Q(d, [], 0).rotateY(Math.PI).translate(0, 0, Td)), s("panel", new Za(vd - 28, xd - 30).rotateY(Math.PI).translate(0, Dd, Td - .06));
	let p = {
		w: 80,
		d: 240,
		zc: Td + 170,
		depth: 7
	};
	s("cover", Q([
		new H(-(c / 2 - u), -Ed),
		new H(c / 2 - u, -Ed),
		new H(c / 2 - u, -Td),
		new H(-(c / 2 - u), -Td)
	], [X(p.w, p.d, 8, 0, -p.zc)]).rotateX(-Math.PI / 2).translate(0, f, 0)), s("cover", pd(ud([
		Z(X(p.w, p.d, 8), 0),
		Z(X(p.w - 2.4, p.d - 2.4, 7), -1.1),
		Z(X(p.w - 9, p.d - 9, 5), -p.depth)
	]), 0, f, p.zc)), s("cover", pd(Q(X(p.w - 9, p.d - 9, 5), [], -p.depth), 0, f, p.zc));
	let m = f - p.depth, h = [Td + 86.5, Td + 258.5];
	for (let e of h) s("cover", pd(dd(27, 33, 5.6, 1.6, .9), 0, m, e));
	s("strap", pd(dd(25, 140, 4.2, 1.2, .8), 0, m, Td + 172.5));
	let g = (e, t = 3.3) => {
		let n = new Fi(t * .86, t, 1.1, 20).translate(0, .55, 0), r = qu([new Mi(t * 1.2, .3, .75).translate(0, 1.1, 0), new Mi(.75, .3, t * 1.2).translate(0, 1.1, 0)]);
		s("screw", n.applyMatrix4(e)), s("black", r.applyMatrix4(e));
	};
	g(new ln().makeTranslation(0, m + 5.6, Td + 93)), g(new ln().makeTranslation(0, m + 5.6, Td + 252));
	let _ = 1.7, v = [
		[12, 14],
		[88, 14],
		[164, 14],
		[240, 8]
	];
	for (let e of [
		-91.5,
		-67.5,
		67.5,
		91.5
	]) for (let [t, n] of v) for (let r = 0; r < n; r++) s("slot", new Za(16, _).rotateX(-Math.PI / 2).translate(e, f + .06, Td + t + r * 5.05));
	let y = [
		[47, 114],
		[122, 188],
		[196, 262],
		[270, 327]
	], b = [
		[12, 28],
		[36, 52],
		[60, 75],
		[132, 148],
		[156, 173]
	], x = [
		[50, 100],
		[334, 100],
		[110, 198],
		[281, 198]
	];
	for (let e of [-1, 1]) {
		let t = e * (c / 2 + .06);
		for (let [n, r] of y) {
			let i = Math.floor((r - n + 3) / 17.5), a = (r - n - (i - 1) * 3) / i;
			for (let [r] of b) for (let o = 0; o < 4; o++) for (let c = 0; c < i; c++) {
				let i = n + a / 2 + c * (a + 3);
				s("slot", new Za(a, _).rotateY(e * Math.PI / 2).translate(t, Cd - (r + 1.2 + o * 4.6), wd - i));
			}
		}
		for (let [t, n] of x) g(new ln().makeRotationZ(-e * Math.PI / 2).setPosition(e * c / 2, Cd - n, wd - t), 3.6);
	}
	for (let e of [-81.5, 81.5]) for (let t of [wd - 60, wd - 323]) s("rubber", qu([ud([
		Z(X(25, 17, 3), 0),
		Z(X(22, 14, 3), 7.8),
		Z(X(20, 12, 2.4), 9)
	]), Q(X(20, 12, 2.4), [], 9)]).rotateX(Math.PI / 2).translate(e, bd + .4, t));
	let S = 2.6, C = (e) => X(vd - 2 * e, xd - 2 * e, 4.2 - e, 0, Dd), w = [Z(C(0), Ed), Z(C(0), wd - S)];
	for (let e = 1; e <= 4; e++) {
		let t = e / 4 * (Math.PI / 2);
		w.push(Z(C(S * (1 - Math.cos(t))), wd - S + S * Math.sin(t)));
	}
	s("bezel", ud(w)), s("bezel", Q(C(0), [d.map((e) => new H(-e.x, e.y))]).rotateY(Math.PI).translate(0, 0, Ed));
	let T = Od.screen, E = Od.tally, D = Od.panel, O = kd(T.fx), k = Ad(T.fy), A = X(T.w + 1.6, T.h + 1.6, 5.8, O, k), j = X(E.w, E.h, 1.2, kd(E.fx), Ad(E.fy)), ee = kd(D.fx0 + D.w / 2), M = Ad(D.fy0 + D.h / 2), te = X(D.w, D.h, 1.5, ee, M);
	s("bezel", Q(C(S), [
		A,
		j,
		te
	], wd)), s("bezel", ud([Z(A, wd), Z(X(T.w, T.h, 5, O, k), wd - .9)])), s("funnel", ud([Z(X(T.w, T.h, 5, O, k), wd - .9), Z(X(166, 126, 7, O, k), wd - 19)])), s("black", ud([Z(X(166, 126, 7, O, k), wd - 19), Z(X(163, 123, 6, O, k), wd - 19 - 2)]));
	let N = {
		w: E.w - 3,
		h: E.h - 3
	};
	s("bezel", ud([Z(j, wd), Z(X(N.w, N.h, .8, kd(E.fx), Ad(E.fy)), wd - 3)]));
	let ne = new q({
		name: "tally",
		color: 14277076,
		roughness: .45,
		emissive: 16777215,
		emissiveIntensity: 0,
		map: id(e, N.w, N.h)
	});
	ne.emissiveMap = ne.map;
	let re = new K(new Za(N.w, N.h), ne);
	re.position.set(kd(E.fx), Ad(E.fy), wd - 2.95), re.name = "tally", re.userData.size = N, t.add(re);
	let ie = wd - 1.2;
	s("bezel", ud([Z(te, wd), Z(te, ie)]));
	let ae = [], oe = (e) => {
		ae.push(e);
		let t = fd(e, ie, 3);
		s("black", t.walls), s("black", t.floor);
	}, se = {}, ce = new Ln();
	ce.name = "controls", t.add(ce);
	let le = (e, t, n, r, a, o, s) => {
		oe(X(r + 1.5, a + 1.5, .8, kd(t), Ad(n)));
		let c = new K(dd(r, a, 9, .7, .55), i());
		c.position.set(kd(t), Ad(n), ie + o - 9), c.name = e, c.userData.control = e, ce.add(c), se[e] = {
			id: e,
			kind: "button",
			mesh: c,
			home: c.position.clone(),
			axis: new U(0, 0, -1),
			travel: s
		};
	};
	Od.buttons.forEach((e, t) => e.forEach((e, n) => {
		le(e, Od.buttonCols[n], Od.buttonRows[t], 6.5, 6.7, 3.6, 1.7);
	})), le("power", Od.power.fx, Od.power.fy, 7.5, 10.5, 5.2, 2.4);
	for (let e of Od.trimCols) {
		oe(X(6.4, 22, 3.2, kd(e), Ad(Od.trimRows[1])));
		for (let t of Od.trimRows) s("trimmer", new Fi(2, 2, 1.6, 18).rotateX(Math.PI / 2).translate(kd(e), Ad(t), ie - 3 + .8)), s("black", new Mi(3, .55, .3).translate(kd(e), Ad(t), ie - 3 + 1.6));
	}
	let P = 9.6, ue = [
		[5.25, 0],
		[5.25, 8.6],
		[4.95, 9.25],
		[4.3, P],
		[0, P]
	].map(([e, t]) => new H(e, t));
	for (let e of Od.knobs) {
		oe(ld(6.3, kd(e.fx), Ad(e.fy)));
		let t = new Ln();
		t.position.set(kd(e.fx), Ad(e.fy), ie - 3), t.name = e.id;
		let n = a(), r = new K(new Xa(ue, 36).rotateX(Math.PI / 2), n);
		r.userData.control = e.id;
		let i = new K(new Mi(.95, 3.3, .12).translate(0, 2.65, 9.66), new Zr({ color: 15263970 }));
		i.userData.control = e.id, t.add(r, i), ce.add(t), se[e.id] = {
			id: e.id,
			kind: "knob",
			mesh: r,
			group: t,
			label: e.label
		};
	}
	let de = new q({
		name: "led",
		color: 1845788,
		roughness: .3,
		emissive: 3800922,
		emissiveIntensity: 0
	}), fe = new K(new to(1.05, 16, 10), de);
	fe.scale.z = .7, fe.position.set(kd(Od.led.fx), Ad(Od.led.fy), ie), fe.name = "power-led", t.add(fe), s("panel", Q(te, ae, ie));
	let pe = (e, n, r, i, a, o, s = {}) => {
		let c = new q({
			map: e,
			transparent: !0,
			depthWrite: !1,
			roughness: .6,
			...s
		}), l = new K(new Za(n, r), c);
		return l.position.set(i, a, o), l.raycast = () => {}, l.renderOrder = 2, t.add(l), l;
	};
	pe(Qu(Od), D.w, D.h, ee, M, ie + .04).name = "legends";
	let me = Od.sony, he = Od.trinitron, ge = pe($u({
		w: me.w,
		h: me.h,
		style: "chrome"
	}), me.w + 1.2, me.h + 1.2, kd(me.fx), Ad(me.fy), wd + .05, {
		metalness: .35,
		roughness: .3,
		alphaTest: .4,
		transparent: !1,
		depthWrite: !0,
		emissive: 5592405
	});
	ge.name = "brand-badge", pe(td(he.w, he.h), he.w, he.h, kd(he.fx), Ad(he.fy), wd + .04).name = "trinitron";
	let _e = (() => {
		let e = 12.5, t = new ua(), n = (e, t) => new U(0, e, t);
		return t.add(new aa(n(0, -1), n(0, 5.5))), t.add(new sa(n(0, 5.5), n(0, e), n(-7, e))), t.add(new aa(n(-7, e), n(-23, e))), t.add(new sa(n(-23, e), n(-30, e), n(-30, 5.5))), t.add(new aa(n(-30, 5.5), n(-30, -1))), {
			path: t,
			L: 30
		};
	})();
	for (let e of [-1, 1]) {
		let t = qu([
			new ro(_e.path, 56, 3, 12, !1),
			new Fi(4.4, 4.8, 1.8, 20).rotateX(Math.PI / 2).translate(0, 0, .9),
			new Fi(4.4, 4.8, 1.8, 20).rotateX(Math.PI / 2).translate(0, -_e.L, .9)
		]);
		t.rotateY(e * .2).translate(e * 99.2, Ad(166), wd), s("handle", t);
	}
	let ve = new Ln();
	ve.name = "body";
	for (let [e, t] of Object.entries(o)) {
		let n = new K(qu(t.map((e) => (e.index, e))), r[e]);
		n.name = e, e === "slot" && (n.raycast = () => {}), ve.add(n);
	}
	t.add(ve);
	let ye = wd - 19 - 2.6 + (163 / 2) ** 2 / 1120, be = new Za(171, 131, 40, 20);
	{
		let e = be.attributes.position;
		for (let t = 0; t < e.count; t++) {
			let n = e.getX(t), r = e.getY(t);
			e.setXYZ(t, n + O, r + k, ye - n * n / 1120 - r * r / 5200);
		}
		be.computeVertexNormals();
	}
	let xe = {
		cx: O,
		cy: k,
		w: _d.PICTURE_W,
		h: _d.PICTURE_H,
		z: ye - 2
	}, Se = cd({
		rect: xe,
		planeZ: xe.z
	}), Ce = new K(be, Se);
	Ce.name = "crt-glass", Ce.userData.screen = !0, t.add(Ce);
	let we = new K(new Za(vd + 140, yd + 140).rotateX(-Math.PI / 2), new Zr({
		map: rd(vd, yd, 70),
		transparent: !0,
		depthWrite: !1,
		toneMapped: !1
	}));
	return we.position.y = .3, we.name = "contact-shadow", we.raycast = () => {}, t.add(we), {
		root: t,
		body: ve,
		controls: se,
		glass: Ce,
		crtMaterial: Se,
		picture: xe,
		tally: re,
		shadow: we,
		setPower: (e) => {
			de.emissiveIntensity = e ? 2.4 : 0, de.color.setHex(e ? 3116863 : 1845788);
		},
		meta: Md,
		brand: {
			mesh: ge,
			w: me.w,
			h: me.h,
			style: "chrome"
		}
	};
}
// src/models/pvm20m4e.js
var Pd = /* @__PURE__ */ t({
	META: () => qd,
	buildMonitor: () => Jd
}), Fd = 450, Id = 458, Ld = 503, Rd = 12, zd = 446, Bd = Ld / 2, Vd = -503 / 2, Hd = 235, Ud = (e, t, n, r = {}) => ({
	id: e,
	label: t,
	kind: "button",
	role: e,
	x: n,
	...r
}), Wd = [
	Ud("line-a", "Line A input", -196, {
		radio: "input",
		legend: "LINE A"
	}),
	Ud("line-b", "Line B input", -180, {
		radio: "input",
		legend: "LINE B"
	}),
	Ud("rgb", "RGB input", -164, {
		radio: "input",
		legend: "RGB"
	}),
	Ud("sync", "External sync", -144, {
		latch: !0,
		legend: "EXT SYNC"
	}),
	Ud("16-9", "16:9", -120, {
		latch: !0,
		role: "wide",
		legend: "16:9"
	}),
	Ud("hv-delay", "H/V delay", -104, {
		latch: !0,
		legend: "H/V DELAY"
	}),
	Ud("underscan", "Under scan", -88, {
		latch: !0,
		legend: "UNDERSCAN"
	}),
	Ud("blue-only", "Blue only", -72, {
		latch: !0,
		legend: "BLUE ONLY"
	}),
	Ud("degauss", "Degauss", -52, { legend: "DEGAUSS" }),
	Ud("menu", "Menu", -26, { legend: "MENU" }),
	Ud("up", "Menu up", -10, { legend: "▲" }),
	Ud("down", "Menu down", 6, { legend: "▼" }),
	Ud("enter", "Menu enter", 22, { legend: "ENTER" })
], Gd = [
	[
		"aper",
		"APERTURE",
		"Aperture (sharpness)"
	],
	[
		"bright",
		"BRIGHT",
		"Brightness"
	],
	[
		"chroma",
		"CHROMA",
		"Chroma (colour)"
	],
	[
		"phase",
		"PHASE",
		"Phase (hue)"
	],
	[
		"contr",
		"CONTRAST",
		"Contrast"
	],
	[
		"volume",
		"VOLUME",
		"Volume"
	]
].map(([e, t, n], r) => ({
	id: e,
	legend: t,
	label: n,
	kind: "knob",
	role: e,
	x: 52 + r * 23
})), Kd = 198, qd = {
	id: "pvm-20m4e",
	name: "Sony PVM-20M4E",
	size: {
		w: Fd,
		h: Id,
		d: Ld
	},
	inputs: [
		"line-a",
		"line-b",
		"rgb"
	],
	inputOf: (e) => e.radio.input,
	noSignal: "black",
	controls: [
		{
			id: "power",
			label: "Power",
			kind: "button",
			role: "power"
		},
		...Wd,
		...Gd
	]
};
function Jd({ tallyLogo: e = null } = {}) {
	var t;
	let n = new md(qd.name);
	n.mat("case", {
		color: 11118752,
		roughness: .7,
		metalness: .05,
		bumpMap: n.grain,
		bumpScale: .5
	}), n.mat("funnel", {
		color: 2368548,
		roughness: .7
	}), n.mat("panel", {
		color: 7829103,
		roughness: .62
	});
	let r = () => new q({
		name: "key",
		color: 3881785,
		roughness: .5
	}), i = () => new q({
		name: "knob",
		color: 2763305,
		roughness: .42
	}), a = (e) => X(Fd - 2 * e, zd - 2 * e, 7 - e, 0, Hd), o = [Z(a(0), Vd), Z(a(0), 248.5)];
	for (let e = 1; e <= 4; e++) {
		let t = e / 4 * (Math.PI / 2);
		o.push(Z(a(3 * (1 - Math.cos(t))), 248.5 + 3 * Math.sin(t)));
	}
	n.add("case", ud(o)), n.add("case", Q(a(0), [], 0).rotateY(Math.PI).translate(0, 0, Vd)), n.add("panel", new Za(400, 396).rotateY(Math.PI).translate(0, Hd, -251.56));
	let s = {
		w: 406,
		h: 312,
		cy: 276
	}, c = X(s.w + 2, s.h + 2, 11, 0, s.cy), l = {
		w: 420,
		h: 46,
		cy: 52
	}, u = X(l.w, l.h, 3, 0, l.cy), d = {
		w: 18,
		h: 8,
		cy: 445
	}, f = X(d.w, d.h, 1, 0, d.cy);
	n.add("case", Q(a(3), [
		c,
		u,
		f
	], Bd));
	let p = {
		w: 392,
		h: 298
	};
	n.add("case", ud([Z(c, Bd), Z(X(s.w, s.h, 10, 0, s.cy), 250.5)])), n.add("funnel", ud([Z(X(s.w, s.h, 10, 0, s.cy), 250.5), Z(X(p.w + 4, p.h + 4, 14, 0, s.cy), 236.5)])), n.add("black", ud([Z(X(p.w + 4, p.h + 4, 14, 0, s.cy), 236.5), Z(X(p.w, p.h, 13, 0, s.cy), 234)])), n.crt({
		cx: 0,
		cy: s.cy,
		edgeZ: 233.3,
		glassW: p.w,
		glassH: p.h,
		picW: 386,
		picH: 289.5,
		RH: 1500,
		RV: 6500,
		corner: 11
	});
	let m = {
		w: d.w - 2,
		h: d.h - 2
	};
	n.add("case", ud([Z(f, Bd), Z(X(m.w, m.h, .6, 0, d.cy), 249.5)]));
	let h = new q({
		name: "tally",
		color: 14277076,
		roughness: .45,
		emissive: 16777215,
		emissiveIntensity: 0,
		map: id(e, m.w, m.h)
	});
	h.emissiveMap = h.map;
	let g = n.mesh(new Za(m.w, m.h).translate(0, d.cy, 249.55), h, "tally");
	g.userData.size = m;
	let _ = {
		w: 46,
		h: 10.5,
		style: "#2c2c2a"
	};
	_.mesh = n.decal($u(_), _.w + 1.2, _.h + 1.2, 0, 98, 251.55, {
		roughness: .5,
		alphaTest: .4,
		transparent: !1,
		depthWrite: !0
	}), _.mesh.name = "brand-badge", n.decal(ad(120, 12, 12, (e, t) => {
		e.fillStyle = "#3a3a37", e.textAlign = "left", e.font = `900 5px ${t}`, e.fillText("HR", 2, 8.2), e.font = `900 7.4px "Arial Black", ${t}`, e.fillText("Trinitron", 13, 8.6);
	}), 120, 12, -143, 98, 251.54), n.decal(ad(60, 8, 16, (e, t) => {
		e.fillStyle = "#3a3a37", e.textAlign = "right", e.font = `600 4.4px ${t}`, e.fillText("PVM-20M4E", 59, 5.8);
	}), 60, 8, 176, 98, 251.54);
	let v = l.cy - 2;
	n.add("case", ud([Z(u, Bd), Z(u, 250)]));
	let y = [], b = (e, t = 3) => {
		y.push(e);
		let r = fd(e, 250, t);
		n.add("black", r.walls), n.add("black", r.floor);
	};
	for (let e of Wd) {
		b(X(12.4, 8.4, 1, e.x, v));
		let t = e.latch || e.radio ? n.lamp(new Pi(1.25, 14).translate(e.x, v + 9.5, 250.05), 4587366, "lamp-" + e.id) : null;
		t && (t.raycast = () => {}), n.button({
			id: e.id,
			pos: [
				e.x,
				v,
				250
			],
			w: 11,
			h: 7,
			out: 2.6,
			travel: 1.4,
			len: 8,
			r: .8,
			c: .5,
			material: r(),
			lamp: t
		});
	}
	for (let e of Gd) b(ld(8.6, e.x, v - 1)), n.knob({
		id: e.id,
		pos: [
			e.x,
			v - 1,
			247
		],
		radius: 7.3,
		len: 11,
		material: i()
	});
	b(X(14, 20, 1.2, Kd, v - 1)), n.button({
		id: "power",
		pos: [
			Kd,
			v - 1,
			250
		],
		w: 12.4,
		h: 18.4,
		out: 4.2,
		travel: 2.2,
		len: 10,
		r: 1,
		c: .7,
		material: r()
	});
	let x = n.lamp(new to(1.5, 14, 10).scale(1, 1, .6).translate(185, v + 12, 250), 4587366, "power-led");
	n.add("panel", Q(u, y, 250)), n.decal(ad(l.w, l.h, 8, (e, t) => {
		let n = (e) => e + l.w / 2, r = (e) => l.cy + l.h / 2 - e;
		e.fillStyle = "#141413", e.textAlign = "center", e.font = `700 2.5px ${t}`;
		for (let t of Wd) t.legend.split(" ").forEach((i, a) => e.fillText(i, n(t.x), r(v - 8.2 - a * 2.9)));
		e.font = `700 3px ${t}`;
		for (let t of Gd) e.fillText(t.legend, n(t.x), r(v + 12.2));
		e.fillText("POWER", n(Kd), r(v + 14.6)), e.strokeStyle = "#141413", e.lineWidth = .35;
		for (let [t, i, a] of [[
			-196,
			-164,
			"INPUT"
		], [
			-120,
			-72,
			"FUNCTION"
		]]) e.beginPath(), e.moveTo(n(t - 5), r(v + 15)), e.lineTo(n(i + 5), r(v + 15)), e.stroke(), e.fillText(a, n((t + i) / 2), r(v + 16.4));
	}), l.w, l.h, 0, l.cy, 250.04).name = "legends", (t = n.bucket).slot || (t.slot = []);
	for (let e of [-1, 1]) {
		n.bucket.slot.push(Q(X(130, 40, 14), [], 0).rotateY(e * Math.PI / 2).translate(e * 225.07, 306.36, 30));
		for (let t of [-60, -150]) n.bucket.slot.push(...hd({
			n: 14,
			pitch: 7,
			len: 70,
			t: 2.6,
			at: [
				e * 225.07,
				72,
				t
			],
			step: [
				0,
				1,
				0
			],
			face: e < 0 ? "left" : "right"
		}));
	}
	for (let e of [
		-140,
		0,
		140
	]) n.bucket.slot.push(...hd({
		n: 26,
		pitch: 7.5,
		len: 110,
		t: 2.8,
		at: [
			e,
			458.07,
			-211.5
		],
		step: [
			0,
			0,
			1
		]
	}));
	for (let e of [-180, 180]) for (let t of [191.5, -181.5]) n.add("rubber", new Fi(15, 13, Rd, 20).translate(e, Rd / 2, t));
	return n.shadow(Fd, Ld), n.finish(qd, {
		brand: _,
		tally: g,
		setPower: (e) => {
			x.material.emissiveIntensity = e ? 2.4 : 0;
		}
	});
}
// src/models/kv5200.js
var Yd = /* @__PURE__ */ t({
	META: () => sf,
	buildMonitor: () => cf
}), Xd = 162, Zd = 330, Qd = 205, $d = 48, ef = 65, tf = 124, nf = -120, rf = 150, af = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"u1",
	"u2"
], of = (e) => e.startsWith("u") ? `UHF preset ${e[1]}` : `Channel ${e}`, sf = {
	id: "kv-5200",
	name: "Sony KV-5200",
	size: {
		w: Xd,
		h: 235,
		d: Zd
	},
	inputs: af.map((e) => "ch-" + e),
	inputOf: (e) => e.radio.channel,
	noSignal: "noise",
	barsLabel: "CH 2",
	controls: [
		{
			id: "power",
			label: "Power",
			kind: "button",
			role: "power"
		},
		...af.map((e) => ({
			id: "ch-" + e,
			label: of(e),
			kind: "button",
			role: "channel",
			radio: "channel"
		})),
		{
			id: "volume",
			label: "Volume",
			kind: "slider",
			role: "volume",
			value: .35
		}
	]
};
function cf() {
	let e = new md(sf.name);
	e.mat("silver", {
		color: 12038308,
		roughness: .42,
		metalness: .55,
		bumpMap: e.grain,
		bumpScale: .25
	}), e.mat("hood", {
		color: 723723,
		roughness: .8
	}), e.mat("gloss", {
		color: 855309,
		roughness: .28
	}), e.mat("rear", {
		color: 1447446,
		roughness: .7
	}), e.mat("orange", {
		color: 15223068,
		roughness: .5
	});
	let t = () => new q({
		name: "key",
		color: 1118481,
		roughness: .3
	}), n = (e) => e.map((e) => new U(e.x, e.y, tf + (e.y - ef) / 140 * 41)), r = X(Xd, 140, 9, 0, 135), i = X(152, 130, 6, 0, 135);
	e.add("silver", ud([Z(r, nf), n(r)])), e.add("silver", ud([n(r), n(i)]));
	let a = X(150, 128, 5, 0, 135);
	e.add("hood", ud([n(i), Z(a, 112)]));
	let o = {
		w: 129,
		h: 113,
		cy: 125.5
	};
	e.add("gloss", Q(a, [X(o.w, o.h, 4, 0, o.cy)], 112)), e.crt({
		cx: 0,
		cy: o.cy,
		edgeZ: 111,
		glassW: o.w,
		glassH: o.h,
		picW: 100,
		picH: 75,
		RH: 900,
		RV: 4e3,
		corner: 6,
		outside: .22
	});
	let s = {
		w: 21.5,
		h: 4.2,
		style: "#eeeeea"
	};
	s.mesh = e.decal($u(s), s.w + 1.2, s.h + 1.2, 0, 76, 113.6, {
		alphaTest: .4,
		transparent: !1,
		depthWrite: !0,
		emissive: 6710886
	}), s.mesh.name = "brand-badge";
	let c = X(rf, $d, 5, 0, 41);
	e.add("silver", ud([Z(c, nf), Z(c, 126)]));
	let l = (e) => -75 + e, u = (e) => ef - e, d = X(141.2, 37.4, 1.5, 0, u(22.9)), f = 124.4;
	e.add("silver", Q(c, [d], 126)), e.add("silver", ud([Z(d, 126), Z(d, f)])), e.add("hood", Q(d, [], f));
	let p = 11.7, m = 12.75, h = [{
		cell: 8.8,
		key: 16.9
	}, {
		cell: 24.6,
		key: 32.8
	}], g = new to(.85, 12, 8);
	af.forEach((n, r) => {
		let i = h[Math.floor(r / 7)], a = l(m + r % 7 * p), o = e.lamp(new Za(10.9, 5).translate(a, u(i.cell), 124.43), n.startsWith("u") ? 6750037 : 16767392, "lamp-ch-" + n);
		o.userData.lampOn = 1.4, o.raycast = () => {};
		let s = e.button({
			id: "ch-" + n,
			pos: [
				a,
				u(i.key),
				f
			],
			w: 10.9,
			h: 8.7,
			out: 1.3,
			travel: .9,
			len: 6,
			r: .5,
			c: .35,
			material: t(),
			lamp: o
		}), c = new K(g, e.M.chrome);
		c.position.set(0, 0, 6.2), c.scale.z = .5, c.userData.control = s.id, s.mesh.add(c);
	});
	let _ = {
		x: l(105.3),
		y: u(17.2),
		w: 32.2,
		h: 21.2
	};
	e.add("gloss", dd(_.w, _.h, 1.6, .8, .4).translate(_.x, _.y, f));
	let v = {
		x: l(132.4),
		y: u(17.15),
		w: 20,
		h: 19.4
	}, y = e.button({
		id: "power",
		pos: [
			v.x,
			v.y,
			f
		],
		w: v.w,
		h: v.h,
		out: 2.4,
		travel: 1.3,
		len: 7,
		r: .8,
		c: .4,
		material: t()
	}), b = new K(new Za(v.w - 1, v.h - 1), new Zr({
		transparent: !0,
		depthWrite: !1,
		map: ad(v.w - 1, v.h - 1, 32, (e, t) => {
			e.fillStyle = "#e4e4de", e.textAlign = "center", e.font = `700 2.6px ${t}`, e.fillText("POWER", 9.5, 8.2), e.font = `600 1.25px ${t}`, e.fillStyle = "#8d8d88", e.fillText("▁ ON", 5.2, 15.6), e.fillText("▔ OFF", 13.6, 15.6);
		})
	}));
	b.position.z = 7.03, b.raycast = () => {}, y.mesh.add(b);
	let x = {
		x0: l(100),
		y: u(34.2),
		range: 31
	};
	e.add("rubber", new Mi(40, 2.2, .2).translate(l(116), x.y, 124.5));
	let S = new K(new Fi(2.6, 2.6, 7.5, 20, 1).rotateZ(Math.PI / 2), e.M.chrome);
	S.scale.set(1, 1, .75), S.position.set(x.x0, x.y, 125.60000000000001), e.slider({
		id: "volume",
		mesh: S,
		range: x.range
	});
	let C = u(22.9), w = e.decal(ad(141.2, 37.4, 16, (e, t) => {
		let n = (e) => e - 4.4, r = (e) => e - 4.2;
		e.fillStyle = "rgba(70,70,70,0.55)";
		for (let t of h) e.fillRect(n(7.15), r(t.cell - 2.6), p * 7 - .5, 5.2);
		e.fillStyle = "#9a9a96", e.textAlign = "center", e.font = `500 4.3px ${t}`, af.forEach((t, i) => {
			let a = h[Math.floor(i / 7)];
			e.fillText(t.startsWith("u") ? "✳" : t, n(m + i % 7 * p), r(a.cell + 1.55));
		});
		let i = n(105.3);
		[
			["#e23b2e", -7.3],
			["#2fae4a", 0],
			["#2a8fd6", 7.3]
		].forEach(([t, n]) => {
			e.fillStyle = t, e.beginPath(), e.ellipse(i + n, r(11.2), 3.4, 1.15, 0, 0, Math.PI * 2), e.fill();
		}), e.fillStyle = "#e9e9e4", e.font = `600 3.3px ${t}`, e.save(), e.translate(i, r(16.6)), e.scale(1.42, 1), e.fillText("TRINITRON", 0, 0), e.restore(), e.fillStyle = "#d5d5cf", e.font = `600 1.55px ${t}`, e.fillText("MIN", n(99.5), r(31.4)), e.fillText("MAX", n(132.5), r(31.4)), e.font = `600 2.1px ${t}`, e.fillText("VOLUME", n(116), r(31.4));
	}), 141.2, 37.4, 0, C, 124.46000000000001);
	w.name = "legends", w.position.z = 126.06, e.add("rear", new Mi(128, 19, 271).translate(0, 19 / 2, -31 / 2)), e.decal(ad(128, 15, 14, (e, t) => {
		e.fillStyle = "#b8b8b2", e.textAlign = "left", e.font = `600 2.1px ${t}`, e.fillText("START", 37.5, 6.3), e.fillText("RECHARGE", 37.5, 9), e.fillText("CHARGING", 59, 7.7), e.strokeStyle = "#3a3a3a", e.lineWidth = .25, e.strokeRect(100, 3.6, 16, 6.6), e.textAlign = "center", e.font = `700 2.2px ${t}`, e.fillText("KV-5200", 108, 7.7);
	}), 128, 15, 0, 8, 120.05), e.add("rubber", new Pi(1.1, 14).translate(-30.5, 9.3, 120.04)), e.add("rubber", new Pi(1.1, 14).translate(-8.5, 8.7, 120.04));
	let T = X(160, 184, 9, 0, 111), E = X(138, 154, 9, 0, 111);
	e.add("rear", ud([Z(E, -165), Z(T, nf)])), e.add("rear", Q(E, [], 0).rotateY(Math.PI).translate(0, 0, -165)), e.add("rear", Q(T, [], -119.5));
	let D = Qd;
	e.add("hood", new Za(27, 190).rotateX(-Math.PI / 2).translate(0, 205.06, -27));
	for (let t of [-112, 58]) e.add("silver", new Mi(25, 52, 18).translate(0, 231, t));
	e.add("silver", dd(25, 188, 11, 1.5, 1).rotateX(-Math.PI / 2).translate(0, 246, -27)), e.add("hood", new Za(15, 180).rotateX(-Math.PI / 2).translate(0, 257.06, -27)), e.add("chrome", new Fi(3, 3, 172, 16).rotateX(Math.PI / 2).translate(0, 260.4, -31)), e.add("chrome", new to(4.2, 14, 10).translate(0, 260.6, -118)), e.add("orange", new Fi(3.7, 3.7, 9, 16).rotateX(Math.PI / 2).translate(0, 260.4, 59.5)), e.add("silver", dd(23, 12, 1.4, 1, .5).rotateX(-Math.PI / 2).translate(0, D, 76)), e.decal(ad(23, 12, 20, (e, t) => {
		e.fillStyle = "#6f6a61", e.textAlign = "center", e.font = `700 3.4px ${t}`, e.fillText("PUSH", 11.5, 7.3);
	}), 23, 12, 0, 206.46, 76).rotation.x = -Math.PI / 2;
	for (let t of [-1, 1]) for (let n of [-96, -109]) {
		var O;
		(O = e.bucket).slot || (O.slot = []), e.bucket.slot.push(...hd({
			n: 22,
			pitch: 2.6,
			len: 1.25,
			t: 9,
			at: [
				t * 19,
				205.06,
				n
			],
			step: [
				t,
				0,
				0
			]
		}));
	}
	let k = e.decal(ad(140, 40, 10, (e, t) => {
		e.strokeStyle = "rgba(20,20,20,0.75)", e.lineWidth = .5, e.strokeRect(4, 12, 132, 26), e.fillStyle = "#8f897e", e.fillRect(64, 6.5, 13, 5.5), e.strokeStyle = "rgba(40,40,40,0.5)", e.lineWidth = .3;
		for (let t = 0; t < 5; t++) e.beginPath(), e.moveTo(66.5 + t * 2, 7.3), e.lineTo(66.5 + t * 2, 11.2), e.stroke();
		e.fillStyle = "#4c4840", e.textAlign = "right", e.font = `700 2.6px ${t}`, e.fillText("OPEN ▸", 61, 10.6);
	}), 140, 40, 75.06, 38, -3);
	return k.rotation.y = Math.PI / 2, e.shadow(rf, 310), e.finish(sf, { brand: s });
}
// src/models/kv9pr1.js
var lf = /* @__PURE__ */ t({
	META: () => Sf,
	buildMonitor: () => Cf
}), uf = 218, df = 296, ff = 13, pf = 171, mf = 184, hf = df / 2, gf = -48, _f = -113, vf = -148, yf = 98.5, bf = Array.from({ length: 12 }, (e, t) => "ch-" + (t + 1)), xf = "\"Hiragino Sans\", \"Yu Gothic\", \"Noto Sans JP\", \"Noto Sans CJK JP\", Meiryo, sans-serif", Sf = {
	id: "kv-9pr1",
	name: "Sony KV-9PR1",
	size: {
		w: uf,
		h: mf,
		d: df
	},
	inputs: bf,
	inputOf: (e) => e.radio.channel || bf[0],
	noSignal: "noise",
	barsLabel: "CH 1",
	values: { volume: .5 },
	controls: [
		{
			id: "power",
			label: "Power",
			kind: "button",
			role: "power"
		},
		{
			id: "ch-down",
			label: "Channel down",
			kind: "button",
			role: "channel-down"
		},
		{
			id: "ch-up",
			label: "Channel up",
			kind: "button",
			role: "channel-up"
		},
		{
			id: "vol-down",
			label: "Volume down",
			kind: "button",
			role: "volume-down"
		},
		{
			id: "vol-up",
			label: "Volume up",
			kind: "button",
			role: "volume-up"
		},
		{
			id: "sleep",
			label: "Sleep timer",
			kind: "button",
			role: "sleep",
			latch: !0
		}
	]
};
function Cf() {
	var e;
	let t = new md(Sf.name);
	t.mat("shell", {
		color: 14859418,
		roughness: .55,
		bumpMap: t.grain,
		bumpScale: .2
	}), t.mat("bezel", {
		color: 3421755,
		roughness: .42
	}), t.mat("rib", {
		color: 6907484,
		roughness: .7
	}), t.mat("window", {
		color: 789518,
		roughness: .25
	});
	let n = () => new q({
		name: "key",
		color: 10396303,
		roughness: .5
	}), r = (e) => X(uf - 2 * e, pf - 2 * e, 15 - e, 0, yf), i = [Z(r(0), gf), Z(r(0), 143)];
	for (let e = 1; e <= 4; e++) {
		let t = e / 4 * (Math.PI / 2);
		i.push(Z(r(5 * (1 - Math.cos(t))), 143 + 5 * Math.sin(t)));
	}
	t.add("shell", ud(i));
	let a = {
		w: 206,
		h: 158,
		cy: yf
	}, o = X(a.w, a.h, 10, 0, a.cy);
	t.add("shell", Q(r(5), [o], hf));
	let s = {
		w: 180,
		h: 127,
		cy: a.cy
	}, c = 148.8;
	t.add("bezel", ud([Z(o, hf), Z(o, c)]));
	let l = X(s.w, s.h, 4, 0, s.cy);
	t.add("bezel", Q(o, [l], c));
	let u = {
		w: 170,
		h: 121
	};
	t.add("bezel", ud([Z(l, c), Z(X(u.w + 2, u.h + 2, 6, 0, s.cy), 140.8)])), t.add("black", ud([Z(X(u.w + 2, u.h + 2, 6, 0, s.cy), 140.8), Z(X(u.w, u.h, 6, 0, s.cy), 139.3)])), t.crt({
		cx: 0,
		cy: s.cy,
		edgeZ: 138.8,
		glassW: u.w,
		glassH: u.h,
		picW: 158,
		picH: 118.5,
		RH: 520,
		RV: 2400,
		corner: 7
	});
	let d = {
		w: 28,
		h: 5.6,
		style: "#f3f1ea"
	};
	d.mesh = t.decal($u(d), d.w + 1.2, d.h + 1.2, 0, a.cy - a.h / 2 + 7.6, 148.86, {
		alphaTest: .4,
		transparent: !1,
		depthWrite: !0,
		emissive: 5592405
	}), d.mesh.name = "brand-badge", t.add("shell", new Mi(132, 17, 170).translate(0, 17 / 2, 55)), t.decal(ad(132, ff, 18, (e, t) => {
		[
			["#e8463a", 9],
			["#58b947", 13.6],
			["#3c8fd8", 18.2]
		].forEach(([t, n]) => {
			e.fillStyle = t, e.beginPath(), e.arc(n, 8.6, 1.9, 0, Math.PI * 2), e.fill();
		}), e.fillStyle = "#3d5a8a", e.textAlign = "left", e.font = `600 3.1px ${t}`, e.fillText("TRINITRON", 21.6, 9.75);
	}), 132, ff, 0, ff / 2, 140.05);
	let f = {
		x: 39,
		y: 6.4,
		w: 32,
		h: 8.8
	};
	t.add("window", dd(f.w, f.h, .6, .8, .2).translate(f.x, f.y, 140)), t.decal(ad(f.w, f.h, 24, (e) => {
		e.fillStyle = "#d6d6d2", e.textAlign = "left", e.font = `500 2.3px ${xf}`, e.fillText("スタンバイ", 9, 3.7), e.fillText("スリープ", 9, 7.3);
	}), f.w, f.h, f.x, f.y, 140.66);
	let p = (e) => new Za(3.2, 1.3).translate(f.x - 11, f.y + e, 140.67), m = t.lamp(p(1.75), 16726570, "lamp-standby"), h = t.lamp(p(-1.85), 16753978, "lamp-sleep");
	for (let e of [m, h]) e.material.color.setHex(7039846), e.raycast = () => {};
	let g = X(214, 167, 13, 0, yf);
	t.add("rib", ud([Z(g, _f), Z(g, gf)])), t.add("rib", Q(g, [], 0).rotateY(Math.PI).translate(0, 0, _f));
	let _ = X(188, 127, 10, 0, 106.5);
	t.add("rib", ud([Z(_, vf), Z(_, _f)])), t.add("rib", Q(_, [], 0).rotateY(Math.PI).translate(0, 0, vf)), t.add("rib", new Mi(150, 17, 46).translate(0, 17 / 2, -81));
	let v = -161 / 2;
	(e = t.bucket).slot || (e.slot = []);
	for (let e of [-1, 1]) t.bucket.slot.push(...hd({
		n: 30,
		pitch: 4.7,
		len: 64,
		t: 1.3,
		at: [
			e * 107.06,
			31,
			v
		],
		step: [
			0,
			1,
			0
		],
		face: e < 0 ? "left" : "right"
	}));
	t.bucket.slot.push(...hd({
		n: 39,
		pitch: 4.7,
		len: 1.3,
		t: 64,
		at: [
			-89.3,
			182.06,
			v
		],
		step: [
			1,
			0,
			0
		]
	}));
	let y = new Pi(1.35, 8);
	for (let e = 0; e <= 8; e++) {
		let n = e === 0 ? 1 : Math.round(2 * Math.PI * e * 5 / 5.4);
		for (let r = 0; r < n; r++) {
			let i = r / n * Math.PI * 2 + e * .31;
			t.bucket.slot.push(y.clone().rotateY(-Math.PI / 2).translate(-109.06, 100 + Math.sin(i) * e * 5, 9 + Math.cos(i) * e * 5));
		}
	}
	let b = {
		x: 52,
		z: -14,
		w: 96,
		d: 30
	};
	t.add("rib", new Za(b.w, b.d).rotateX(-Math.PI / 2).translate(b.x, 184.05, b.z));
	for (let [e, r, i] of [
		[
			"power",
			-36,
			18
		],
		[
			"ch-down",
			-15,
			12
		],
		[
			"ch-up",
			-1,
			12
		],
		[
			"vol-down",
			15,
			12
		],
		[
			"vol-up",
			29,
			12
		]
	]) t.button({
		id: e,
		pos: [
			b.x + r,
			184,
			b.z - 3
		],
		w: i,
		h: 9,
		out: 2.2,
		travel: 1.2,
		len: 7,
		r: 4.4,
		c: .8,
		facing: "top",
		material: n()
	});
	return t.button({
		id: "sleep",
		pos: [
			b.x + 40.5,
			184,
			b.z - 3
		],
		w: 7,
		h: 9,
		out: 2.2,
		travel: 1.2,
		len: 7,
		r: 3.4,
		c: .8,
		facing: "top",
		material: n(),
		lamp: h
	}), t.decal(ad(b.w, 9, 20, (e) => {
		e.fillStyle = "#e9e6dc", e.textAlign = "center", e.font = `600 2.6px ${xf}`, e.fillText("電源", 12, 6), e.fillText("▼ チャンネル ▲", 40, 6), e.fillText("－ 音量 ＋", 70, 6), e.fillText("スリープ", 89, 6);
	}), b.w, 9, b.x, 184.09, b.z + 9.5).rotation.x = -Math.PI / 2, t.add("rib", new Fi(3.4, 4, 20, 16).translate(-74, 194, -22)), t.add("chrome", new Fi(2.2, 2.2, 6, 12).translate(-74, 206, -22)), t.shadow(188, 276), t.finish(Sf, {
		brand: d,
		setPower: (e) => {
			m.material.emissiveIntensity = e ? 0 : 2.2;
		}
	});
}
// src/models/index.js
var wf = (e) => ({
	META: e.META,
	build: e.buildMonitor
}), Tf = {
	"pvm-9042qm": wf(gd),
	"pvm-20m4e": wf(Pd),
	"kv-5200": wf(Yd),
	"kv-9pr1": wf(lf)
}, Ef = "pvm-9042qm", Df = class {
	constructor() {
		this.muted = !1, this.ctx = null;
	}
	_ac() {
		if (this.muted || typeof window > "u") return null;
		if (!this.ctx) {
			let e = window.AudioContext || window.webkitAudioContext;
			if (!e) return null;
			try {
				this.ctx = new e();
			} catch {
				return null;
			}
			this.master = this.ctx.createGain(), this.master.gain.value = .32, this.master.connect(this.ctx.destination);
		}
		return this.ctx.state === "suspended" && this.ctx.resume().catch(() => {}), this.ctx;
	}
	_noise(e) {
		let t = this.ctx, n = t.createBuffer(1, Math.max(1, Math.floor(t.sampleRate * e)), t.sampleRate), r = n.getChannelData(0);
		for (let e = 0; e < r.length; e++) r[e] = Math.random() * 2 - 1;
		let i = t.createBufferSource();
		return i.buffer = n, i;
	}
	click(e = 1, t = 2600) {
		let n = this._ac();
		if (!n) return;
		let r = n.currentTime, i = this._noise(.03), a = n.createBiquadFilter();
		a.type = "bandpass", a.frequency.value = t, a.Q.value = 1.4;
		let o = n.createGain();
		o.gain.setValueAtTime(.9 * e, r), o.gain.exponentialRampToValueAtTime(.001, r + .03), i.connect(a).connect(o).connect(this.master), i.start(r), this._thump(r, 150, .035, .35 * e);
	}
	_thump(e, t, n, r) {
		let i = this.ctx, a = i.createOscillator();
		a.type = "sine", a.frequency.setValueAtTime(t, e), a.frequency.exponentialRampToValueAtTime(t * .45, e + n);
		let o = i.createGain();
		o.gain.setValueAtTime(r, e), o.gain.exponentialRampToValueAtTime(.001, e + n), a.connect(o).connect(this.master), a.start(e), a.stop(e + n + .02);
	}
	power(e) {
		let t = this._ac();
		if (!t) return;
		let n = t.currentTime;
		if (this.click(1.2, 1800), this._thump(n + .02, e ? 95 : 70, .16, .8), e) {
			let e = this._noise(.5), r = t.createBiquadFilter();
			r.type = "highpass", r.frequency.value = 5e3;
			let i = t.createGain();
			i.gain.setValueAtTime(0, n + .1), i.gain.linearRampToValueAtTime(.07, n + .2), i.gain.exponentialRampToValueAtTime(.001, n + .6), e.connect(r).connect(i).connect(this.master), e.start(n + .1);
		}
	}
	degauss() {
		let e = this._ac();
		if (!e) return;
		let t = e.currentTime;
		this._thump(t, 80, .2, .9);
		let n = e.createOscillator();
		n.type = "sawtooth", n.frequency.value = 100;
		let r = e.createBiquadFilter();
		r.type = "lowpass", r.frequency.value = 420;
		let i = e.createGain();
		i.gain.setValueAtTime(.55, t), i.gain.exponentialRampToValueAtTime(.001, t + 1.3), n.connect(r).connect(i).connect(this.master), n.start(t), n.stop(t + 1.35);
	}
}, Of = Rt.degToRad(150), kf = (e, t, n) => Math.min(n, Math.max(t, e)), Af = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, jf = (e) => 1 - (1 - e) ** 3, Mf = (e) => e, Nf = "\n:host { display: block; position: relative; width: 100%; height: 480px; }\n:host([hidden]) { display: none; }\n.stage { position: absolute; inset: 0; overflow: hidden; touch-action: pan-y; cursor: grab;\n  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }\n.stage.dragging { cursor: grabbing; }\n.css { position: absolute; inset: 0; z-index: 0; }\ncanvas { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; display: block; pointer-events: none; }\n\n.screen { width: 640px; height: 480px; background: #000; overflow: hidden; color: #e9e9e4;\n  font: 16px/1.45 system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif; text-align: left; }\n.beam, .roll, .raster, .picture { position: absolute; inset: 0; }\n.beam { opacity: 0; }\n.beam.on { opacity: 1; animation: pvm-on 0.95s cubic-bezier(0.2, 0.7, 0.2, 1) both; }\n.beam.off { animation: pvm-off 0.5s ease-in both; }\n.beam.instant { animation-duration: 1ms; }\n@keyframes pvm-on {\n  0% { opacity: 0; transform: scale(1, 0.004); filter: brightness(6); }\n  20% { opacity: 1; transform: scale(1, 0.004); filter: brightness(6); }\n  55% { transform: scale(1, 1); filter: brightness(2.2); }\n  100% { opacity: 1; transform: none; filter: none; }\n}\n@keyframes pvm-off {\n  0% { opacity: 1; transform: none; filter: none; }\n  45% { opacity: 1; transform: scale(1, 0.004); filter: brightness(8); }\n  85% { opacity: 1; transform: scale(0.004, 0.004); filter: brightness(12); }\n  100% { opacity: 0; transform: scale(0.004, 0.004); }\n}\n.roll.rolling { animation: pvm-roll 1.25s linear infinite; }\n@keyframes pvm-roll {\n  from { transform: translateY(-100%) skewX(-3deg); }\n  to { transform: translateY(100%) skewX(-3deg); }\n}\n.raster { transition: transform 0.22s ease-out; overflow: hidden; }\n.picture { background: #000; overflow: hidden; }\n.input { position: absolute; inset: 0; overflow: auto; display: none; }\n.input.active { display: block; }\n.input iframe { width: 100%; height: 100%; border: 0; background: #fff; display: block; }\n.blue { position: absolute; inset: 0; background: #00f; mix-blend-mode: multiply; pointer-events: none; display: none; }\n.screen.blue-only .blue { display: block; }\n\n.noise { position: absolute; inset: -64px; display: none; background-size: 192px 192px; image-rendering: pixelated; animation: pvm-noise 0.32s steps(4) infinite; }\n.noise.active { display: block; }\n@keyframes pvm-noise { 0% { transform: translate(0, 0); } 25% { transform: translate(-37px, 23px); } 50% { transform: translate(29px, -41px); } 75% { transform: translate(-19px, -13px); } 100% { transform: translate(0, 0); } }\n.bars { position: absolute; inset: 0; display: none; flex-direction: column; }\n.bars.active { display: flex; }\n.bars i { display: block; }\n.bars i:nth-child(1) { flex: 67; background: linear-gradient(90deg, #c0c0c0 0 14.286%, #c0c000 0 28.571%, #00c0c0 0 42.857%, #00c000 0 57.143%, #c000c0 0 71.429%, #c00000 0 85.714%, #0000c0 0); }\n.bars i:nth-child(2) { flex: 8; background: linear-gradient(90deg, #0000c0 0 14.286%, #131313 0 28.571%, #c000c0 0 42.857%, #131313 0 57.143%, #00c0c0 0 71.429%, #131313 0 85.714%, #c0c0c0 0); }\n.bars i:nth-child(3) { flex: 25; background: linear-gradient(90deg, #00214c 0 17.86%, #fff 0 35.71%, #32006a 0 53.57%, #131313 0 71.43%, #090909 0 76.19%, #131313 0 80.95%, #1d1d1d 0 85.71%, #131313 0); }\n.bars b { position: absolute; left: 50%; top: 36%; transform: translate(-50%, -50%); background: #000; color: #f2f2f2;\n  font: 600 22px/1 ui-monospace, \"SF Mono\", Menlo, Consolas, monospace; letter-spacing: 0.12em; padding: 10px 16px; }\n\n.back { position: absolute; z-index: 3; top: 14px; left: 14px; padding: 8px 14px; border-radius: 999px;\n  border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(18, 18, 18, 0.72); color: #f2f2f2;\n  font: 500 13px/1 system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif; cursor: pointer;\n  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }\n.back:hover { background: rgba(40, 40, 40, 0.85); }\n.back:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 2px; }\n.back[hidden] { display: none; }\n.hint { position: absolute; z-index: 2; left: 50%; bottom: 14px; transform: translateX(-50%); padding: 7px 13px;\n  border-radius: 999px; background: rgba(18, 18, 18, 0.6); color: #ededed; white-space: nowrap; pointer-events: none;\n  font: 500 12px/1 system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif; transition: opacity 0.5s; }\n.hint.gone, :host([no-hint]) .hint { opacity: 0; }\n.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n\n/* no-WebGL fallback: just show the content in a plain frame */\n.stage.nogl { cursor: default; display: grid; place-items: center; }\n.stage.nogl canvas, .stage.nogl .hint, .stage.nogl .css { display: none; }\n.stage.nogl .screen { position: relative; max-width: 100%; border: 14px solid #62605c; border-radius: 10px; box-sizing: content-box; }\n@media (prefers-reduced-motion: reduce) {\n  .beam.on, .beam.off { animation-duration: 1ms; }\n  .roll.rolling, .noise { animation: none; }\n  .raster { transition: none; }\n}\n", Pf = typeof HTMLElement < "u" ? HTMLElement : class {}, Ff = null;
function If() {
	if (Ff) return Ff;
	let e = document.createElement("canvas");
	e.width = e.height = 96;
	let t = e.getContext("2d"), n = t.createImageData(96, 96);
	for (let e = 0; e < n.data.length; e += 4) {
		let t = Math.random() * 255;
		n.data[e] = t * .92, n.data[e + 1] = t * .97, n.data[e + 2] = Math.min(255, t * 1.08), n.data[e + 3] = 255;
	}
	return t.putImageData(n, 0, 0), Ff = e.toDataURL();
}
var Lf = class extends Pf {
	static get observedAttributes() {
		return [
			"model",
			"power",
			"muted",
			"src",
			"resolution",
			"tally",
			"tally-logo",
			"brand",
			"brand-logo",
			"auto-rotate",
			"effects",
			"view"
		];
	}
	constructor() {
		super(), this.state = {
			power: !1,
			focused: !1,
			buttons: {},
			values: {},
			radio: {}
		}, this._modelId = Ef, this._meta = Tf[Ef].META, this._ctl = {}, this._sound = new Df(), this._tweens = /* @__PURE__ */ new Map(), this._pointers = /* @__PURE__ */ new Map(), this._res = [640, 480], this._focusF = 0, this._orbit = {
			goal: {
				az: .42,
				pol: 1.36,
				zoom: 1
			},
			cur: {
				az: .42,
				pol: 1.36,
				zoom: 1
			}
		}, this._home = {
			az: .42,
			pol: 1.36,
			zoom: 1
		}, this._frame = this._frame.bind(this), this._onKey = this._onKey.bind(this), this._buildDom();
	}
	_buildDom() {
		let e = this.attachShadow({ mode: "open" });
		e.innerHTML = `<style>${Nf}</style>
      <div class="stage" part="stage">
        <div class="css"></div>
        <canvas aria-hidden="true"></canvas>
        <button class="back" part="back" type="button" hidden>&larr; Back</button>
        <div class="hint" part="hint">Drag to look around &middot; click the screen to zoom in</div>
        <div class="sr" role="group" aria-label="Sony PVM-9042QM monitor controls"></div>
      </div>`, this._stage = e.querySelector(".stage"), this._cssLayer = e.querySelector(".css"), this._canvas = e.querySelector("canvas"), this._back = e.querySelector(".back"), this._hint = e.querySelector(".hint"), this._sr = e.querySelector(".sr");
		let t = document.createElement("div");
		t.className = "screen", t.setAttribute("part", "screen"), t.innerHTML = "<div class=\"beam\"><div class=\"roll\"><div class=\"raster\">\n        <div class=\"picture\">\n          <div class=\"inputs\"></div>\n          <div class=\"noise\" aria-hidden=\"true\"></div>\n          <div class=\"bars\" aria-hidden=\"true\"><i></i><i></i><i></i><b></b></div>\n        </div>\n        <div class=\"blue\"></div>\n      </div></div></div>", this._screenEl = t, this._beam = t.querySelector(".beam"), this._roll = t.querySelector(".roll"), this._raster = t.querySelector(".raster"), this._picture = t.querySelector(".picture"), this._bars = t.querySelector(".bars"), this._noise = t.querySelector(".noise"), this._inputsEl = t.querySelector(".inputs"), this._inputs = {}, this._a11y = {}, this._resetState(), this._back.addEventListener("click", () => this.unfocus());
		let n = this._stage;
		n.addEventListener("pointerdown", (e) => this._onDown(e)), n.addEventListener("pointermove", (e) => this._onMove(e)), n.addEventListener("pointerup", (e) => this._onUp(e)), n.addEventListener("pointercancel", (e) => this._onUp(e, !0)), n.addEventListener("pointerleave", () => {
			this._drag || this._setHover(null);
		}), n.addEventListener("wheel", (e) => this._onWheel(e), { passive: !1 });
	}
	connectedCallback() {
		this._inited || (this._inited = !0, this._init()), this._renderer && (this._ro = new ResizeObserver(() => this._resize()), this._ro.observe(this), this._io = new IntersectionObserver((e) => {
			this._visible = e[e.length - 1].isIntersecting, this._visible && this.invalidate();
		}), this._io.observe(this), this._resize());
	}
	disconnectedCallback() {
		this._ro?.disconnect(), this._io?.disconnect(), window.removeEventListener("keydown", this._onKey), this._raf && cancelAnimationFrame(this._raf), this._raf = 0;
	}
	attributeChangedCallback(e, t, n) {
		if (!this._reflecting) switch (e) {
			case "model":
				this._setModel(n);
				break;
			case "brand":
				this.setBrand(n);
				break;
			case "brand-logo":
				this.setBrandLogo(n);
				break;
			case "power":
				this.power = n !== null && n !== "off" && n !== "false";
				break;
			case "muted":
				this._sound.muted = n !== null;
				break;
			case "src":
				this._setSrc(n);
				break;
			case "resolution":
				this._setResolution(n);
				break;
			case "tally":
				this.setTally(n);
				break;
			case "tally-logo":
				this.setTallyLogo(n);
				break;
			case "auto-rotate":
				this._autoRotate = n !== null, this.invalidate();
				break;
			case "effects":
				this._m && (this._m.crtMaterial.uniforms.uFx.value = n === "off" ? 0 : 1, this.invalidate());
				break;
			case "view": this._setViewPreset(n);
		}
	}
	_init() {
		let e;
		try {
			e = new Lu({
				canvas: this._canvas,
				antialias: !0,
				alpha: !0,
				powerPreference: "high-performance"
			});
		} catch {
			this._fallback();
			return;
		}
		this._renderer = e, e.setClearColor(0, 0), e.toneMapping = 7, e.toneMappingExposure = 1, e.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		let t = this._scene = new Gn(), n = new Js(e);
		t.environment = n.fromScene(new Gu(), .04).texture, t.environmentIntensity = .6, n.dispose();
		let r = new as(16777215, 2.3);
		r.position.set(-320, 520, 460), t.add(r);
		let i = new as(14674175, .35);
		i.position.set(420, 180, 300), t.add(i), this._camera = new Qo(28, 1, 10, 12e3), this._css = new Wu({ element: this._cssLayer }), this._screenObj = new Vu(this._screenEl), this._screenEl.style.userSelect = "auto", this._screenEl.style.webkitUserSelect = "auto", this._screenEl.style.pointerEvents = "none", this._ray = new Cs(), this._ndc = new H(), this._reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !1, this._visible = !0, this._mountModel(), this._ready = !0, this._applyPicture(), this._applyPower(!0), this.dispatchEvent(new CustomEvent("pvm-ready", {
			bubbles: !0,
			composed: !0
		}));
	}
	_resetState() {
		var e;
		let t = this._meta;
		this._ctl = Object.fromEntries(t.controls.map((e) => [e.id, e])), this._roleId = {};
		let n = this.state;
		n.buttons = {}, n.values = {}, n.radio = {};
		for (let e of t.controls) e.role && !(e.role in this._roleId) && (this._roleId[e.role] = e.id), e.kind === "button" && e.latch && (n.buttons[e.id] = !1), e.kind !== "button" && (n.values[e.role] = e.value ?? .5), e.radio && (e.selected || !(e.radio in n.radio)) && (n.radio[e.radio] = e.id);
		for (let [r, i] of Object.entries(t.values || {})) (e = n.values)[r] ?? (e[r] = i);
		this._lastInput = t.inputOf(n), this._inputsEl.textContent = "", this._inputs = {}, t.inputs.forEach((e, t) => {
			let n = document.createElement("div");
			n.className = "input", n.dataset.input = e;
			let r = document.createElement("slot"), i = this._slotPrefix;
			i ? r.name = t > 0 ? `${i}:${e}` : i : t > 0 && (r.name = e), r.addEventListener("slotchange", () => this._applyPicture()), n.append(r), this._inputsEl.append(n), this._inputs[e] = n;
		});
		let r = this.getAttribute("src");
		r && this._setSrc(r, !0), this._sr.textContent = "", this._sr.setAttribute("aria-label", `${t.name} controls`), this._a11y = {};
		let i = (e, t) => Object.assign(document.createElement(e), t);
		for (let e of t.controls) {
			let t;
			e.kind === "button" ? (t = i("button", {
				type: "button",
				textContent: e.label
			}), (e.latch || e.radio || e.role === "power") && t.setAttribute("aria-pressed", "false"), t.addEventListener("click", () => this.press(e.id))) : (t = i("input", {
				type: "range",
				min: 0,
				max: 100,
				step: 1,
				value: Math.round(n.values[e.role] * 100)
			}), t.setAttribute("aria-label", e.label), t.addEventListener("input", () => this.setKnob(e.id, t.value / 100))), t.addEventListener("focus", () => this._highlight(e.id, !0)), t.addEventListener("blur", () => this._highlight(e.id, !1)), this._sr.append(t), this._a11y[e.id] = t;
		}
		let a = i("button", {
			type: "button",
			textContent: "Zoom in to the screen"
		});
		a.addEventListener("click", () => this.state.focused ? this.unfocus() : this.focusScreen()), this._sr.append(a);
	}
	_mountModel() {
		this._m && (this._m.root.remove(this._screenObj), this._scene.remove(this._m.root), this._m.root.traverse((e) => {
			e.geometry?.dispose();
			for (let t of [].concat(e.material || [])) t.map?.dispose(), t.dispose();
		})), this._tweens.clear(), this._hoverId = null, this._m = Tf[this._modelId].build(), this._scene.add(this._m.root);
		let e = this._m.picture;
		this._screenObj.position.set(e.cx, e.cy, e.z), this._m.root.add(this._screenObj), this._applyResolution();
		let t = this._m.crtMaterial.uniforms;
		t.uFx.value = this.getAttribute("effects") === "off" ? 0 : 1, t.uOn.value = +!!this.state.power, this.hasAttribute("tally") && this.setTally(this.getAttribute("tally")), this._logoSrc !== void 0 && this.setTallyLogo(this._logoSrc), this._brandSrc === void 0 ? this._brandText !== void 0 && this.setBrand(this._brandText) : this.setBrandLogo(this._brandSrc);
		for (let e of this._meta.controls) e.kind === "button" ? this._poseButton(e.id, this._buttonRest(e.id), 0) : this._poseValue(e.id);
		this._syncLamps(), this._host ? this._m.shadow && (this._m.shadow.visible = !1) : this.isConnected && this._resize();
	}
	_setModel(e) {
		let t = e && Tf[e.toLowerCase()] ? e.toLowerCase() : Ef;
		if (e && !Tf[e.toLowerCase()] && console.warn(`sony-pvm: unknown model "${e}". Available: ${Object.keys(Tf).join(", ")}`), t === this._modelId) return;
		let n = this.state.power;
		this.state.focused && this.unfocus(), this._focusF = 0, this._modelId = t, this._meta = Tf[t].META, this._resetState(), this._renderer && (this._mountModel(), this.state.power = n, this._applyPower(!0)), this._applyPicture();
	}
	get model() {
		return this._modelId;
	}
	set model(e) {
		this.setAttribute("model", e);
	}
	_fallback() {
		this._stage.classList.add("nogl"), this._stage.append(this._screenEl), this.state.power = !0, this._beam.className = "beam on instant", this._applyPicture();
	}
	_resize() {
		if (!this._renderer) return;
		let e = this.clientWidth || 1, t = this.clientHeight || 1;
		this._renderer.setSize(e, t, !1), this._css.setSize(e, t), this._camera.aspect = e / t, this._camera.updateProjectionMatrix();
		let n = Math.tan(Rt.degToRad(this._camera.fov / 2)), r = n * this._camera.aspect, { w: i, h: a, d: o } = this._meta.size, s = this._m.picture;
		this._baseDist = .455 * Math.hypot(i, a, o) / Math.min(n, r);
		let c = 1.035;
		this._focusDist = Math.max(s.h / 2 * c / n, s.w / 2 * c / r), this.invalidate();
	}
	invalidate() {
		this._host ? this._host.invalidate() : !this._raf && this._ready && this.isConnected && (this._raf = requestAnimationFrame(this._frame));
	}
	_tween(e, t, n, r, i, { ease: a = jf, delay: o = 0, done: s } = {}) {
		r <= 0 && o <= 0 ? (this._tweens.delete(e), i(n), s?.()) : this._tweens.set(e, {
			start: performance.now() + o,
			from: t,
			to: n,
			dur: Math.max(r, 1),
			fn: i,
			ease: a,
			done: s
		}), this.invalidate();
	}
	_runTweens(e) {
		let t = !1;
		for (let [n, r] of this._tweens) {
			let i = (e - r.start) / r.dur;
			i < 0 ? t = !0 : (r.fn(r.from + (r.to - r.from) * r.ease(Math.min(i, 1))), i >= 1 ? (this._tweens.delete(n), r.done?.()) : t = !0);
		}
		return t;
	}
	_attachHost(e, t) {
		this._host = e, this._slotPrefix = t, this._sound = e.sound, this._reduced = e.reduced, this._visible = !0, this._inited = !0, this._resetState(), this._scene = e.parent, this._screenObj = new Vu(this._screenEl), this._screenEl.style.userSelect = "auto", this._screenEl.style.webkitUserSelect = "auto", this._screenEl.style.pointerEvents = "none", this._mountModel(), this._ready = !0, this._applyPicture(), this._applyPower(!0);
	}
	_tick(e, t) {
		let n = this._runTweens(e), r = this._m.crtMaterial.uniforms;
		return r.uCam.value.copy(t.position), this._m.root.worldToLocal(r.uCam.value), r.uTime.value = e / 1e3 % 1e3, n;
	}
	_frame(e) {
		if (this._raf = 0, !this._ready) return;
		let t = Math.min((e - (this._last || e)) / 1e3, .05);
		this._last = e;
		let n = this._runTweens(e), r = this._orbit;
		this._autoRotate && !this._reduced && !this.state.focused && !this._drag && this._visible && (r.goal.az = this._home.az + Math.sin(e / 4200) * .38, n = !0);
		let i = 1 - Math.exp(-t * 9);
		for (let e of [
			"az",
			"pol",
			"zoom"
		]) {
			let a = r.goal[e] - r.cur[e];
			Math.abs(a) > 1e-4 ? (r.cur[e] += a * (t ? i : 1), n = !0) : r.cur[e] = r.goal[e];
		}
		let a = this._camera, o = this._m.picture, s = this._focusF, c = this._baseDist / r.cur.zoom, l = Math.sin(r.cur.pol), u = this._meta.size.h * .5, d = 0 + c * l * Math.sin(r.cur.az), f = u + c * Math.cos(r.cur.pol), p = 0 + c * l * Math.cos(r.cur.az);
		a.position.set(d + (o.cx - d) * s, f + (o.cy - f) * s, p + (o.z + this._focusDist - p) * s), a.lookAt(0 + (o.cx - 0) * s, u + (o.cy - u) * s, 0 + (o.z - 0) * s), a.updateMatrixWorld();
		let m = this._m.crtMaterial.uniforms;
		m.uCam.value.copy(a.position), this._m.root.worldToLocal(m.uCam.value), m.uTime.value = e / 1e3 % 1e3, this._renderer.render(this._scene, a), this._css.render(this._scene, a), n && this._visible !== !1 && this.invalidate();
	}
	_pick(e) {
		if (!this._ready) return null;
		let t = this._stage.getBoundingClientRect();
		this._ndc.set((e.clientX - t.left) / t.width * 2 - 1, -((e.clientY - t.top) / t.height) * 2 + 1), this._ray.setFromCamera(this._ndc, this._camera);
		let n = this._ray.intersectObject(this._m.root, !0)[0];
		return n ? {
			control: n.object.userData.control || null,
			screen: !!n.object.userData.screen
		} : null;
	}
	_inScreen(e) {
		return this.state.focused && e.composedPath().includes(this._screenEl);
	}
	_onDown(e) {
		if (!this._ready || e.button > 0 || e.target === this._back || this._inScreen(e)) return;
		if (this._hint.classList.add("gone"), this._pointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		}), this._pointers.size === 2) {
			let [e, t] = [...this._pointers.values()];
			this._pinch = {
				d: Math.hypot(e.x - t.x, e.y - t.y),
				zoom: this._orbit.goal.zoom
			}, this._drag = null;
			return;
		}
		let t = this._pick(e), n = t?.control && this._m.controls[t.control];
		try {
			this._stage.setPointerCapture(e.pointerId);
		} catch {}
		n?.kind === "button" ? (e.preventDefault(), this._drag = {
			type: "button",
			id: n.id
		}, this._buttonDown(n.id)) : n?.kind === "knob" || n?.kind === "slider" ? (e.preventDefault(), this._drag = {
			type: "knob",
			id: n.id,
			x: e.clientX,
			y: e.clientY,
			v: this.getKnob(n.id)
		}, this._stage.classList.add("dragging")) : this.state.focused ? this._drag = { type: "exit" } : (this._drag = {
			type: "orbit",
			x: e.clientX,
			y: e.clientY,
			moved: 0,
			screen: !!t?.screen
		}, this._stage.classList.add("dragging"));
	}
	_onMove(e) {
		if (!this._ready) return;
		if (this._pointers.has(e.pointerId) && this._pointers.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		}), this._pinch && this._pointers.size === 2) {
			let [e, t] = [...this._pointers.values()], n = Math.hypot(e.x - t.x, e.y - t.y);
			this._orbit.goal.zoom = kf(this._pinch.zoom * (n / this._pinch.d), .55, 2.2), this.invalidate();
			return;
		}
		let t = this._drag;
		if (!t) e.pointerType === "mouse" && !this._inScreen(e) && this._setHover(this._pick(e));
		else if (t.type === "orbit") {
			let n = e.clientX - t.x, r = e.clientY - t.y;
			t.x = e.clientX, t.y = e.clientY, t.moved += Math.abs(n) + Math.abs(r);
			let i = this._orbit.goal;
			i.az = kf(i.az - n * .005, -2.2, 2.2), i.pol = kf(i.pol - r * .004, .45, 1.64), this.invalidate();
		} else t.type === "knob" && this.setKnob(t.id, t.v + (e.clientX - t.x - (e.clientY - t.y)) * .005);
	}
	_onUp(e, t = !1) {
		if (this._pointers.delete(e.pointerId), this._pinch) {
			this._pointers.size < 2 && (this._pinch = null);
			return;
		}
		let n = this._drag;
		if (this._drag = null, this._stage.classList.remove("dragging"), n) {
			if (n.type === "button") this._buttonUp(n.id);
			else if (t) return;
			else n.type === "exit" ? this.unfocus() : n.type === "orbit" && n.moved < 6 && n.screen && (this.state.power || this.press("power"), this.focusScreen());
		}
	}
	_onWheel(e) {
		if (this._inScreen(e) || !this._ready) return;
		let t = this._pick(e), n = t?.control && this._m.controls[t.control];
		n?.kind === "knob" || n?.kind === "slider" ? (e.preventDefault(), this.setKnob(n.id, this.getKnob(n.id) - Math.sign(e.deltaY) * .04)) : this.hasAttribute("wheel-zoom") && !this.state.focused && (e.preventDefault(), this._orbit.goal.zoom = kf(this._orbit.goal.zoom * Math.exp(-e.deltaY * .0012), .55, 2.2), this.invalidate());
	}
	_setHover(e) {
		let t = e?.control || null;
		t !== this._hoverId && (this._hoverId && this._highlight(this._hoverId, !1), t && this._highlight(t, !0), this._hoverId = t);
		let n = t && this._m.controls[t].kind;
		this._stage.style.cursor = n === "knob" || n === "slider" ? "ew-resize" : n === "button" ? "pointer" : e?.screen && !this.state.focused ? "zoom-in" : "";
	}
	_highlight(e, t) {
		let n = this._m?.controls[e];
		n && (n.mesh.material.emissive?.setHex(t ? 3026476 : 0), this.invalidate());
	}
	_onKey(e) {
		e.key === "Escape" && this.state.focused && this.unfocus();
	}
	_on(e) {
		let t = this._roleId[e];
		return !!(t && this.state.buttons[t]);
	}
	_val(e) {
		return this.state.values[e] ?? .5;
	}
	_buttonRest(e) {
		let t = this._ctl[e];
		return t.role === "power" ? +!!this.state.power : t.radio ? +(this.state.radio[t.radio] === e) : +!!this.state.buttons[e];
	}
	_poseButton(e, t, n = 70) {
		let r = this._m?.controls[e];
		r && (r.pos ?? (r.pos = 0), this._tween("btn-" + e, r.pos, t, this._reduced ? 0 : n, (e) => {
			r.pos = e, r.mesh.position.copy(r.home).addScaledVector(r.axis, r.travel * e);
		}));
	}
	_syncLamps() {
		if (this._m) {
			for (let e of this._meta.controls) {
				let t = this._m.controls[e.id];
				if (e.kind !== "button") continue;
				let n = this._buttonRest(e.id) === 1, r = this._a11y[e.id];
				r?.hasAttribute("aria-pressed") && r.setAttribute("aria-pressed", String(n)), t?.lamp && e.role !== "power" && (t.lamp.material.emissiveIntensity = n && (this.state.power || e.lampAlways) ? t.lamp.userData.lampOn : 0);
			}
			this.invalidate();
		}
	}
	_buttonDown(e) {
		this._poseButton(e, 1.25, 55), this._activate(e);
	}
	_buttonUp(e) {
		this._poseButton(e, this._buttonRest(e), 90), this._ctl[e].role !== "power" && this._sound.click(.6, 3200);
	}
	_activate(e) {
		let t = this._ctl[e], n = this.state;
		if (t.role === "power") {
			this.power = !n.power;
			return;
		}
		if (this._sound.click(1, 2500), t.role === "degauss") {
			this.degauss();
			return;
		}
		if (t.radio) {
			let r = n.radio[t.radio];
			n.radio[t.radio] = e, r && r !== e && this._poseButton(r, 0, 90);
		} else if (t.role === "channel-up" || t.role === "channel-down") {
			let e = this._meta.inputs, r = e.indexOf(this.input);
			n.radio.channel = e[(r + (t.role === "channel-up" ? 1 : e.length - 1)) % e.length];
		} else t.role === "volume-up" || t.role === "volume-down" ? (n.values.volume = kf(this._val("volume") + (t.role === "volume-up" ? .08 : -.08), 0, 1), this._emit("pvm-knob", {
			id: "volume",
			value: n.values.volume
		})) : t.latch && (n.buttons[e] = !n.buttons[e]);
		let r = this.input;
		this._syncLamps(), this._applyPicture(), this._emit("pvm-button", {
			id: e,
			pressed: !t.latch || n.buttons[e]
		}), r !== this._lastInput && (this._lastInput = r, n.power && this._meta.noSignal === "noise" && this._blip(), this._emit("pvm-input", { input: r }));
	}
	_blip() {
		this._noise.classList.add("active"), clearTimeout(this._blipT), this._blipT = setTimeout(() => this._applyPicture(), 140);
	}
	press(e) {
		if (this._ctl[e]?.kind !== "button") throw Error(`sony-pvm: unknown button "${e}"`);
		this._poseButton(e, 1.25, 55), this._activate(e), setTimeout(() => this._poseButton(e, this._buttonRest(e), 90), 110);
	}
	setButton(e, t) {
		if (!this._ctl[e]?.latch) throw Error(`sony-pvm: "${e}" is not a latching button`);
		this.state.buttons[e] !== !!t && this.press(e);
	}
	setKnob(e, t) {
		let n = this._ctl[e];
		if (!n || n.kind === "button") throw Error(`sony-pvm: unknown knob "${e}"`);
		let r = kf(+t || 0, 0, 1);
		r !== this.state.values[n.role] && (this.state.values[n.role] = r, this._a11y[e].value = Math.round(r * 100), this._poseValue(e), this._applyPicture(), this._emit("pvm-knob", {
			id: e,
			value: r
		}));
	}
	getKnob(e) {
		return this.state.values[this._ctl[e]?.role];
	}
	_poseValue(e) {
		let t = this._m?.controls[e];
		if (!t) return;
		let n = this.state.values[this._ctl[e].role];
		t.kind === "knob" ? t.group.rotation.z = (.5 - n) * 2 * Of : t.mesh.position.x = t.home.x + t.range * n, this.invalidate();
	}
	get input() {
		return this._meta.inputOf(this.state);
	}
	get power() {
		return this.state.power;
	}
	set power(e) {
		e = !!e, e !== this.state.power && (this.state.power = e, this._sound.power(e), this._applyPower(!1), this._emit("pvm-power", { on: e }));
	}
	powerOn() {
		this.power = !0;
	}
	powerOff() {
		this.power = !1;
	}
	togglePower() {
		this.power = !this.power;
	}
	_applyPower(e) {
		let t = this.state.power;
		if (this._reflect("power", t ? "on" : "off"), this._beam.className = "beam " + (t ? "on" : e ? "" : "off") + (e ? " instant" : ""), this._applyPicture(), !this._m) return;
		let n = this._roleId.power;
		n && !this._drag && this._poseButton(n, +!!t, e ? 0 : 90), this._m.setPower(t), this._syncLamps();
		let r = this._m.crtMaterial.uniforms, i = e || this._reduced;
		t ? this._tween("tube", r.uOn.value, 1, i ? 0 : 380, (e) => r.uOn.value = e, {
			delay: i ? 0 : 150,
			ease: Mf
		}) : this._tween("tube", r.uOn.value, 0, i ? 0 : 650, (e) => r.uOn.value = e, {
			delay: i ? 0 : 480,
			ease: Mf
		});
	}
	degauss() {
		if (this._emit("pvm-degauss", {}), !this.state.power || (this._sound.degauss(), !this._m)) return;
		let e = this._m.crtMaterial.uniforms;
		if (this._tween("degauss", 1, 0, 1500, (t) => e.uDegauss.value = t * t, { ease: Mf }), !this._reduced && this._roll.animate) {
			let e = [];
			for (let t = 0; t <= 18; t++) {
				let n = (1 - t / 18) ** 2;
				e.push({
					transform: `translate(${Math.sin(t * 2.4) * 16 * n}px, ${Math.cos(t * 3.1) * 11 * n}px) scale(${1 + .035 * n}) rotate(${Math.sin(t * 1.9) * 1.2 * n}deg)`,
					filter: `hue-rotate(${Math.sin(t * 2.2) * 150 * n}deg) saturate(${1 + 1.6 * n})`
				});
			}
			this._roll.animate(e, {
				duration: 1500,
				easing: "linear"
			});
		}
	}
	_hasContent(e) {
		let t = this._inputs[e];
		return t ? t.querySelector("iframe") ? !0 : t.querySelector("slot").assignedNodes().some((e) => e.nodeType === 1 || e.textContent.trim()) : !1;
	}
	_applyPicture() {
		let { power: e } = this.state, t = (e) => this._on(e), n = (e) => this._val(e), r = this._meta.inputs, i = r[0], a = r.slice(1).some((e) => this._hasContent(e)) ? this.input : i, o = this._hasContent(a);
		for (let e of r) this._inputs[e].classList.toggle("active", e === a && o);
		this._bars.classList.toggle("active", a === i && !o), this._bars.lastElementChild.textContent = this._meta.barsLabel || i.replace("-", " ").toUpperCase();
		let s = !o && a !== i && this._meta.noSignal === "noise";
		s && !this._noise.style.backgroundImage && (this._noise.style.backgroundImage = `url(${If()})`), this._noise.classList.toggle("active", s);
		let c = [];
		n("bright") !== .5 && c.push(`brightness(${(.35 + 1.3 * n("bright")).toFixed(3)})`), n("contr") !== .5 && c.push(`contrast(${(.4 + 1.2 * n("contr")).toFixed(3)})`), n("chroma") !== .5 && c.push(`saturate(${(2 * n("chroma")).toFixed(3)})`), n("phase") !== .5 && c.push(`hue-rotate(${((n("phase") - .5) * 120).toFixed(1)}deg)`), n("aper") < .5 && c.push(`blur(${((.5 - n("aper")) * 2.4).toFixed(2)}px)`), this._picture.style.filter = c.join(" ");
		let l = 1, u = 1, d = "";
		t("underscan") && (l *= .94, u *= .94), t("wide") && (u *= .75), t("hv-delay") && (d = "translate(25%, 50%) "), this._raster.style.transform = d || l !== 1 || u !== 1 ? `${d}scale(${l}, ${u})` : "", this._screenEl.classList.toggle("blue-only", t("blue-only")), this._roll.classList.toggle("rolling", t("sync") && e);
		let f = e ? n("volume") : 0;
		for (let e of (this._host?.el || this).querySelectorAll("video, audio")) try {
			e.volume = f;
		} catch {}
	}
	_setSrc(e, t = !1) {
		let n = this._inputs[this._meta.inputs[0]];
		if (n.querySelector("iframe")?.remove(), n.querySelector("slot").style.display = e ? "none" : "", e) {
			let t = document.createElement("iframe");
			t.src = e, t.title = this.getAttribute("title") || "Screen content", t.loading = "lazy", n.append(t);
		}
		t || this._applyPicture();
	}
	_setResolution(e) {
		let t = /^(\d+)\s*[x×]\s*(\d+)$/i.exec(e || "");
		this._res = t ? [kf(+t[1], 160, 4096), kf(+t[2], 120, 4096)] : [640, 480], this._applyResolution();
	}
	_applyResolution() {
		let [e, t] = this._res;
		this._screenEl.style.width = e + "px", this._screenEl.style.height = t + "px", this._screenObj && this._m && (this._screenObj.scale.set(this._m.picture.w / e, this._m.picture.h / t, 1), this.invalidate());
	}
	focusScreen() {
		!this.state.focused && this._ready && (this.state.focused = !0, this._stage.classList.add("focused"), this._screenEl.style.pointerEvents = "auto", this._back.hidden = !1, this._hint.classList.add("gone"), this._setHover(null), this._reflect("focused", ""), window.addEventListener("keydown", this._onKey), this._flyTo(1), this._emit("pvm-focus", { focused: !0 }));
	}
	unfocus() {
		this.state.focused && (this.state.focused = !1, this._stage.classList.remove("focused"), this._screenEl.style.pointerEvents = "none", this._back.hidden = !0, this._reflect("focused", null), window.removeEventListener("keydown", this._onKey), this._flyTo(0), this._emit("pvm-focus", { focused: !1 }));
	}
	_flyTo(e) {
		let t = this._m.crtMaterial.uniforms, n = t.uGlare.value, r = e ? .3 : 1;
		this._tween("focus", this._focusF, e, this._reduced ? 0 : 950, (i) => {
			this._focusF = i, t.uGlare.value = n + (r - n) * (e ? i : 1 - i);
		}, { ease: Af });
	}
	setView({ azimuth: e, polar: t, zoom: n } = {}) {
		let r = this._orbit.goal;
		e !== void 0 && (r.az = kf(Rt.degToRad(e), -2.2, 2.2)), t !== void 0 && (r.pol = kf(Rt.degToRad(t), .45, 1.64)), n !== void 0 && (r.zoom = kf(n, .55, 2.2)), this.invalidate();
	}
	resetView() {
		Object.assign(this._orbit.goal, this._home), this.invalidate();
	}
	_setViewPreset(e) {
		let t = {
			front: [0, 90],
			hero: [24, 78],
			top: [28, 40],
			side: [80, 80]
		}, n = t[e] || t.hero;
		this._home = {
			az: Rt.degToRad(n[0]),
			pol: Rt.degToRad(n[1]),
			zoom: 1
		}, Object.assign(this._orbit.goal, this._home), this._ready && this._last || Object.assign(this._orbit.cur, this._home), this.invalidate();
	}
	setTally(e) {
		let t = this._m?.tally;
		if (!t) return;
		let n = t.material;
		e && e !== "off" ? (n.emissive.set(e === "on" || e === "" ? "#ff2a1a" : e), n.emissiveIntensity = 1.6) : n.emissiveIntensity = 0, this.invalidate();
	}
	_loadImage(e, t) {
		return e ? typeof e == "string" ? new Promise((n) => {
			let r = new Image();
			r.crossOrigin = "anonymous", r.onload = () => n(r), r.onerror = () => {
				console.warn(`sony-pvm: could not load ${t} "${e}"`), n(void 0);
			}, r.src = e;
		}) : Promise.resolve(e) : Promise.resolve(null);
	}
	async setTallyLogo(e) {
		this._logoSrc = e;
		let t = await this._loadImage(e, "tally logo"), n = this._m?.tally;
		if (!n || t === void 0 || this._logoSrc !== e) return;
		let r = n.material.map;
		n.material.map = n.material.emissiveMap = id(t, n.userData.size.w, n.userData.size.h), r?.dispose(), n.material.needsUpdate = !0, this.invalidate();
	}
	_paintBrand(e) {
		let t = this._m?.brand;
		if (!t) return;
		let n = t.mesh.material, r = n.map;
		n.map = $u({
			w: t.w,
			h: t.h,
			style: t.style,
			...e
		}), n.emissiveMap && (n.emissiveMap = n.map), r?.dispose(), n.needsUpdate = !0, this.invalidate();
	}
	setBrand(e) {
		this._brandText = e ?? void 0, this._brandSrc = void 0, this._paintBrand(e == null ? {} : { text: String(e) });
	}
	async setBrandLogo(e) {
		if (this._brandSrc = e ?? void 0, !e) {
			this._paintBrand(this._brandText === void 0 ? {} : { text: this._brandText });
			return;
		}
		let t = await this._loadImage(e, "brand logo");
		t && this._brandSrc === e && this._paintBrand({ image: t });
	}
	get focused() {
		return this.state.focused;
	}
	get muted() {
		return this._sound.muted;
	}
	set muted(e) {
		this._sound.muted = !!e, this._reflect("muted", e ? "" : null);
	}
	get object3D() {
		return this._m?.root || null;
	}
	_reflect(e, t) {
		this._reflecting = !0, t === null ? this.removeAttribute(e) : this.getAttribute(e) !== t && this.setAttribute(e, t), this._reflecting = !1;
	}
	_emit(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			detail: t,
			bubbles: !0,
			composed: !0
		}));
	}
}, Rf = {
	ps1: {
		t: 10.4,
		h: 125,
		d: 142,
		name: "PlayStation game"
	},
	gba: {
		t: 23,
		h: 125,
		d: 125,
		name: "Game Boy Advance game"
	},
	vita: {
		t: 12,
		h: 135,
		d: 105,
		name: "PS Vita game"
	},
	psp: {
		t: 14,
		h: 168,
		d: 99,
		name: "PSP game"
	},
	book: {
		t: 26,
		h: 205,
		d: 150,
		name: "Book"
	}
}, zf = "\"Barlow Semi Condensed\", \"Arial Narrow\", \"Helvetica Neue\", Arial, \"Hiragino Sans\", \"Yu Gothic\", \"Noto Sans JP\", sans-serif", Bf = "Georgia, \"Times New Roman\", \"Hiragino Mincho ProN\", \"Yu Mincho\", serif", Vf = /[぀-ヿ㐀-鿿＀-￯]/;
function Hf(e) {
	let t = 2166136261;
	for (let n of e) t = Math.imul(t ^ n.codePointAt(0), 16777619);
	return (t >>> 0) / 4294967296;
}
function Uf(e) {
	let t = new G(e);
	return .2126 * t.r + .7152 * t.g + .0722 * t.b;
}
var Wf = (e) => Uf(e) > .45 ? "#16140f" : "#f4f1ea", Gf = (e, t) => "#" + new G(e).multiplyScalar(t).getHexString();
function Kf(e, t, n, r) {
	let i = document.createElement("canvas");
	i.width = Math.max(8, Math.round(e * n)), i.height = Math.max(8, Math.round(t * n));
	let a = i.getContext("2d");
	a.scale(n, n), r(a, e, t);
	let o = new Oi(i);
	return o.colorSpace = Je, o.anisotropy = 8, o;
}
function qf(e, t, n, r, i, a, o, s = `700 ${a}px ${zf}`) {
	if (!t || i - r < 4) return;
	if (e.fillStyle = o, e.textBaseline = "middle", Vf.test(t)) {
		let o = [...t], c = Math.min(a, (i - r) / o.length);
		e.font = s.replace(/[\d.]+px/, c + "px"), e.textAlign = "center", o.forEach((t, i) => e.fillText(t, n, r + c * (i + .55)));
		return;
	}
	e.save(), e.translate(n, r), e.rotate(Math.PI / 2), e.font = s, e.textAlign = "left";
	let c = e.measureText(t).width, l = i - r;
	c > l && e.scale(l / c, 1), e.fillText(t, 0, .05 * a), e.restore();
}
function Jf(e, t, n, r, i, a, o = zf, s = 700, c = 1.06) {
	let l = t.split(/\s+/), u = a, d;
	for (;;) {
		e.font = `${s} ${u}px ${o}`, d = [];
		let t = "";
		for (let n of l) {
			let r = t ? t + " " + n : n;
			e.measureText(r).width > i && t ? (d.push(t), t = n) : t = r;
		}
		if (d.push(t), d.length <= 4 && d.every((t) => e.measureText(t).width <= i) || u < a * .35) break;
		u *= .9;
	}
	return d.forEach((t, i) => e.fillText(t, n, r + i * u * c)), r + d.length * u * c;
}
function Yf(e, t, n, r, i, a, { font: o = zf, upper: s = !0 } = {}) {
	if (e.save(), e.beginPath(), e.rect(n, r, i, a), e.clip(), e.fillStyle = t.color, e.fillRect(n, r, i, a), t.image) {
		let o = t.image.naturalWidth || t.image.width, s = t.image.naturalHeight || t.image.height, c = Math.max(i / o, a / s);
		e.drawImage(t.image, n + (i - o * c) / 2, r + (a - s * c) / 2, o * c, s * c);
	} else {
		let c = Wf(t.color), l = i * .09;
		e.fillStyle = c, e.globalAlpha = .13, e.beginPath(), e.arc(n + i * .74, r + a * .7, i * .44, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(n + i * .2, r + a * .95, i * .3, 0, Math.PI * 2), e.fill(), e.globalAlpha = 1, e.textAlign = "left", e.textBaseline = "top";
		let u = Jf(e, s ? t.title.toUpperCase() : t.title, n + l, r + l, i - l * 2, i * .175, o);
		t.subtitle && (e.globalAlpha = .78, Jf(e, t.subtitle, n + l, u + i * .03, i - l * 2, i * .075, o, 500), e.globalAlpha = 1);
	}
	e.restore();
}
function Xf(e, t, n, r, i, a, o, s, c) {
	e.fillStyle = o, e.fillRect(n - i / 2, r - a / 2, i, a), e.fillStyle = s, e.textAlign = "center", e.textBaseline = "middle", e.font = `700 ${c}px ${zf}`;
	let l = e.measureText(t).width;
	e.save(), e.translate(n, r + c * .05), l > i * .86 && e.scale(i * .86 / l, 1), e.fillText(t, 0, 0), e.restore();
}
function Zf(e, t, n, r, i, a, o) {
	e.save(), e.translate(n, (r + i) / 2), e.rotate(-Math.PI / 2), e.fillStyle = o, e.textAlign = "center", e.textBaseline = "middle", e.font = `700 ${a}px ${zf}`;
	let s = e.measureText(t).width, c = i - r;
	s > c && e.scale(c / s, 1), e.fillText(t, 0, a * .05), e.restore();
}
var Qf = {
	ps1: {
		plastic: 13226196,
		rough: .16,
		spine(e, t, n, r) {
			e.fillStyle = "#8d969b", e.fillRect(0, 0, n, r), e.fillStyle = "#5d666b", e.fillRect(7.6, 0, .3, r), e.fillStyle = "#e9e8e2", e.fillRect(8.3, 3.4, 1.3, r - 6.8), e.fillStyle = "#0c0c0d", e.fillRect(.45, 2.6, 6.9, r - 5.2), Xf(e, "PS", 3.9, 8.4, 5, 5, "#e9e9e4", "#0c0c0d", 3.2), qf(e, t.title.toUpperCase(), 3.9, 14, r - (t.subtitle ? 30 : 8), 4.3, "#f3f3ee"), t.subtitle && qf(e, t.subtitle, 3.9, r - 27, r - 6, 2.5, "#b9b9b4", `500 2.5px ${zf}`), e.fillStyle = "rgba(255,255,255,0.35)", e.fillRect(.5, 0, .5, r);
		},
		cover(e, t, n, r) {
			e.fillStyle = "#ccd3d7", e.fillRect(0, 0, n, r), e.fillStyle = "#b4bcc1";
			for (let t = 6; t < r - 6; t += 2.1) e.fillRect(1.6, t, 8.6, .9);
			let i = 12.5, a = n - i - 2.2, o = 2.4, s = r - 4.8;
			e.fillStyle = "#0c0c0d", e.fillRect(i, o, 13.5, s), Zf(e, "PlayStation", 19.3, 22.4, o + s - 6, 6.6, "#efefea"), Xf(e, "PS", 19.3, 12.4, 9.5, 9.5, "#e9e9e4", "#0c0c0d", 6), Yf(e, t, 26, o, a - 13.5, s), e.fillStyle = "rgba(255,255,255,0.16)", e.fillRect(i, o, a, 1.6);
		},
		back: "#111112",
		edge: 8358029
	},
	vita: {
		plastic: 2057174,
		rough: .22,
		spine(e, t, n, r) {
			e.fillStyle = "#1b5acb", e.fillRect(0, 0, n, r), e.fillStyle = "#f5f6f8", e.fillRect(1.1, 3, n - 2.2, r - 6), e.fillStyle = "#1657c8", e.fillRect(1.1, 3, n - 2.2, 21), Zf(e, "PS VITA", n / 2, 4.5, 22.5, 4.4, "#ffffff"), qf(e, t.title, n / 2, 28, r - (t.subtitle ? 30 : 9), 5, "#15161a"), t.subtitle && qf(e, t.subtitle, n / 2, r - 27, r - 7, 2.8, "#5a5d66", `500 2.8px ${zf}`);
		},
		cover(e, t, n, r) {
			e.fillStyle = "#1b5acb", e.fillRect(0, 0, n, r);
			let i = 2.4, a = n - i * 2, o = r - i * 2;
			e.fillStyle = "#1657c8", e.fillRect(i, i, a, 15), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.save(), e.translate(8.4, 10.3), e.scale(1.3, 1), e.font = `300 7.4px ${zf}`, e.fillText("PS VITA", 0, 0), e.restore(), Yf(e, t, i, 17.4, a, o - 15), e.fillStyle = "rgba(255,255,255,0.14)", e.fillRect(i, i, a, 1.4);
		},
		back: "#1b5acb",
		edge: 1859023
	},
	psp: {
		plastic: 13620696,
		rough: .18,
		spine(e, t, n, r) {
			e.fillStyle = "#d5dadd", e.fillRect(0, 0, n, r), e.fillStyle = "#f6f6f3", e.fillRect(1.2, 3, n - 2.4, r - 6), e.fillStyle = "#0d0d0f", e.fillRect(1.2, 3, n - 2.4, 20), Zf(e, "PSP", n / 2, 5, 21, 6, "#f2f2ee"), qf(e, t.title, n / 2, 27, r - (t.subtitle ? 34 : 10), 5.6, "#15161a"), t.subtitle && qf(e, t.subtitle, n / 2, r - 31, r - 8, 3, "#5a5d66", `500 3px ${zf}`);
		},
		cover(e, t, n, r) {
			e.fillStyle = "#cfd5d8", e.fillRect(0, 0, n, r);
			let i = 2.6, a = n - i * 2, o = r - i * 2;
			e.fillStyle = "#0d0d0f", e.fillRect(i, i, 12.5, o), Zf(e, "PSP", 8.9, i + o - 44, i + o - 6, 9, "#f2f2ee"), Yf(e, t, 15.1, i, a - 12.5, o);
		},
		back: "#e9e9e5",
		edge: 13028817
	},
	gba: {
		plastic: null,
		rough: .82,
		spine(e, t, n, r) {
			e.fillStyle = t.color, e.fillRect(0, 0, n, r), e.fillStyle = "#3a2f93", e.fillRect(0, 0, n, 27), Zf(e, "GAME BOY ADVANCE", n / 2, 2, 25, 3.3, "#f1f0f7");
			let i = Wf(t.color);
			qf(e, t.title.toUpperCase(), n / 2, 31, r - (t.subtitle ? 30 : 8), 8.4, i), t.subtitle && qf(e, t.subtitle, n / 2, r - 27, r - 6, 3.4, i, `500 3.4px ${zf}`), e.fillStyle = "rgba(255,255,255,0.22)", e.fillRect(0, 0, .5, r), e.fillRect(n - .5, 0, .5, r);
		},
		cover(e, t, n, r) {
			e.fillStyle = t.color, e.fillRect(0, 0, n, r), Yf(e, t, 22, 0, n - 22, r), e.fillStyle = "#3a2f93", e.beginPath(), e.moveTo(0, 0), e.lineTo(26, 0), e.bezierCurveTo(15, r * .3, 15, r * .7, 21, r), e.lineTo(0, r), e.closePath(), e.fill(), e.fillStyle = "#8f88d6", e.beginPath(), e.moveTo(26, 0), e.lineTo(28, 0), e.bezierCurveTo(17, r * .3, 17, r * .7, 23, r), e.lineTo(21, r), e.bezierCurveTo(15, r * .7, 15, r * .3, 26, 0), e.fill(), Zf(e, "GAME BOY ADVANCE", 8.4, 8, r - 8, 7.4, "#f1f0f7"), e.fillStyle = "rgba(255,255,255,0.2)", e.fillRect(0, 0, n, .6), e.fillRect(0, r - .6, n, .6);
		},
		back: null,
		edge: null
	}
};
function $f(e, t, n) {
	return Kf(e, t, 6, (r) => {
		r.fillStyle = "#ece4cf", r.fillRect(0, 0, e, t);
		let i = 7, a = () => (i = i * 1664525 + 1013904223 >>> 0) / 4294967296, o = n === "x" ? e : t;
		for (let i = 0; i < o * 3; i++) {
			r.fillStyle = `rgba(90,70,40,${.05 + a() * .16})`;
			let i = a() * o;
			n === "x" ? r.fillRect(i, 0, .12, t) : r.fillRect(0, i, e, .12);
		}
	});
}
function ep(e, t) {
	let { t: n, h: r, color: i } = e, a = t ? Uf(i) > .5 ? "#2a2016" : "#e2c98a" : Wf(i);
	return Kf(n, r, Math.min(10, 2048 / r), (o) => {
		if (o.fillStyle = i, o.fillRect(0, 0, n, r), t) {
			o.fillStyle = "rgba(0,0,0,0.05)";
			for (let e = 0; e < r; e += .6) o.fillRect(0, e, n, .25);
			o.fillStyle = a;
			for (let e of [
				11,
				13,
				r - 26,
				r - 24
			]) o.fillRect(n * .14, e, n * .72, .6);
			qf(o, e.title, n / 2, 19, r - (e.subtitle ? 62 : 32), Math.min(n * .5, 11), a, `700 ${Math.min(n * .5, 11)}px ${Bf}`), e.subtitle && qf(o, e.subtitle, n / 2, r - 58, r - 31, Math.min(n * .3, 6), a, `400 ${Math.min(n * .3, 6)}px ${Bf}`), o.beginPath(), o.arc(n / 2, r - 13, Math.min(n * .22, 4.5), 0, Math.PI * 2), o.lineWidth = .6, o.strokeStyle = a, o.stroke();
		} else {
			o.fillStyle = Gf(i, .72), o.fillRect(0, 0, n, 16), o.fillStyle = a, qf(o, e.title, n / 2, 22, r - (e.subtitle ? 60 : 30), Math.min(n * .52, 11), a), e.subtitle && qf(o, e.subtitle, n / 2, r - 56, r - 28, Math.min(n * .32, 6), a, `500 ${Math.min(n * .32, 6)}px ${zf}`);
			let t = Math.min(n * .26, 5);
			o.fillRect(n / 2 - t, r - 18, t * 2, t * 2), o.fillStyle = i, o.fillRect(n / 2 - t * .45, r - 18 + t * .55, t * .9, t * .9), o.fillStyle = "rgba(255,255,255,0.18)";
			for (let e of [
				n * .3,
				n * .52,
				n * .71
			]) o.fillRect(e, 0, .25, r);
		}
	});
}
function tp(e, t) {
	let { d: n, h: r, color: i } = e;
	return Kf(n, r, Math.min(6, 1024 / r), (a) => {
		if (a.fillStyle = i, a.fillRect(0, 0, n, r), e.image) {
			Yf(a, e, 0, 0, n, r);
			return;
		}
		let o = Wf(i), s = n * .11;
		if (a.fillStyle = o, a.textAlign = "left", a.textBaseline = "top", t) {
			a.lineWidth = .7, a.strokeStyle = o, a.strokeRect(s * .6, s * .6, n - s * 1.2, r - s * 1.2);
			let t = Jf(a, e.title, s * 1.3, r * .2, n - s * 2.6, n * .16, Bf);
			a.fillRect(s * 1.3, t + 4, n * .2, .8), e.subtitle && Jf(a, e.subtitle, s * 1.3, t + 10, n - s * 2.6, n * .07, Bf, 400);
		} else {
			a.fillStyle = Gf(i, .72), a.fillRect(0, 0, n, r * .09), a.fillStyle = o, a.globalAlpha = .12, a.beginPath(), a.arc(n * .7, r * .72, n * .42, 0, Math.PI * 2), a.fill(), a.globalAlpha = 1;
			let t = Jf(a, e.title.toUpperCase(), s, r * .16, n - s * 2, n * .17);
			e.subtitle && (a.globalAlpha = .78, Jf(a, e.subtitle, s, t + n * .03, n - s * 2, n * .075, zf, 500), a.globalAlpha = 1), a.fillStyle = "rgba(0,0,0,0.16)", a.fillRect(4.5, 0, .5, r);
		}
	});
}
var np = [
	"#ffd23f",
	"#ff7a59",
	"#7fd1c7",
	"#c9b6ff",
	"#9fe07c",
	"#ffb3c7",
	"#e8e2d2",
	"#5d8fd6",
	"#d9534f",
	"#2f4858"
], rp = null;
function ip(e) {
	let t = Rf[e.type] || Rf.book, n = {
		subtitle: "",
		...e,
		type: Rf[e.type] ? e.type : "book"
	};
	n.title = (n.title || "Untitled").trim(), n.color || (n.color = np[Math.floor(Hf(n.title + n.type) * np.length)]), n.d = t.d;
	let r = n.type === "book";
	n.t = +n.t || (r ? 16 + Math.round(Hf(n.title) * 22) : t.t), n.h = +n.h || (r ? 176 + Math.round(Hf(n.title + "h") * 38) : t.h), r && (n.d = 128 + Math.round(Hf(n.title + "d") * 26));
	let { t: i, h: a, d: o } = n, s = new Ln();
	s.name = `${n.type}: ${n.title}`;
	let c = (e) => new q(e), l, u;
	if (r) {
		rp || (rp = {
			top: $f(40, 40, "x"),
			fore: $f(40, 40, "x")
		});
		let e = n.binding ? n.binding === "hard" : n.t >= 27, t = c({
			map: rp.top,
			roughness: .9
		}), r = c({
			color: n.color,
			roughness: e ? .86 : .55
		});
		l = c({
			color: n.color,
			roughness: e ? .86 : .5
		});
		let d = c({
			map: ep(n, e),
			roughness: e ? .86 : .5
		});
		if (u = () => tp(n, e), e) {
			let e = 2.4, n = 3.4, c = i * .78, u = Math.asin(i / 2 / c), f = c * (1 - Math.cos(u)), p = o - f, m = (t, n) => {
				let r = new K(new Mi(e, a, p), n);
				r.position.set(t, 0, -f / 2), s.add(r);
			};
			m(i / 2 - e / 2, [
				l,
				r,
				r,
				r,
				r,
				r
			]), m(-i / 2 + e / 2, r);
			let h = new K(new Mi(i - e * 2, a - n * 2, p - n - 1.5), t);
			h.position.set(0, 0, -f / 2 - n / 2 + .75), s.add(h);
			let g = new K(new Fi(c, c, a, 14, 1, !1, -u, u * 2), [
				d,
				r,
				r
			]);
			g.position.set(0, 0, o / 2 - c), s.add(g);
		} else s.add(new K(new Mi(i, a, o), [
			l,
			r,
			t,
			t,
			d,
			t
		]));
	} else {
		let e = Qf[n.type], t = c({
			map: Kf(i, a, Math.min(14, 2048 / a), (t) => e.spine(t, n, i, a)),
			roughness: e.rough
		});
		l = c({
			color: e.plastic ?? n.color,
			roughness: e.rough
		}), u = () => Kf(o, a, Math.min(7, 1024 / a), (t) => e.cover(t, n, o, a));
		let r = c({
			color: e.edge ?? new G(n.color).multiplyScalar(.82).getHex(),
			roughness: e.rough
		}), d = c({
			color: e.back ?? n.color,
			roughness: e.rough
		});
		s.add(new K(new Mi(i, a, o), [
			l,
			d,
			r,
			r,
			t,
			r
		]));
	}
	return s.userData.spec = n, s.userData.ensureCover = () => {
		l.map || (l.map = u(), l.color.set(16777215), l.needsUpdate = !0);
	}, s.userData.setCoverImage = (e) => {
		n.image = e;
		let t = !!l.map;
		l.map?.dispose(), l.map = null, t && s.userData.ensureCover();
	}, s;
}
function ap() {
	let e = document.createElement("canvas");
	e.width = 256, e.height = 256;
	let t = e.getContext("2d");
	t.fillStyle = "#3d2b20", t.fillRect(0, 0, 256, 256);
	let n = 99, r = () => (n = n * 1664525 + 1013904223 >>> 0) / 4294967296;
	for (let e = 0; e < 150; e++) {
		t.strokeStyle = `rgba(${r() < .5 ? "18,10,6" : "104,74,50"},${.05 + r() * .12})`, t.lineWidth = .5 + r() * 2;
		let e = r() * 256, n = r() * 6;
		t.beginPath(), t.moveTo(0, e), t.bezierCurveTo(80, e + n, 170, e - n, 256, e + n * .5), t.stroke();
	}
	let i = new Oi(e);
	return i.colorSpace = Je, i.wrapS = i.wrapT = d, i;
}
function op({ cols: e = 1, rows: t = 2, cellW: n = 1290, cellH: r = 236, depth: i = 520, t: a = 24, plinth: o = 50 } = {}) {
	let s = new Ln();
	s.name = "shelf";
	let c = new q({
		name: "wood",
		map: ap(),
		roughness: .62
	}), l = new q({
		name: "shelf-back",
		color: 1708557,
		roughness: .9
	}), u = e * n + (e + 1) * a, d = o + t * r + (t + 1) * a, f = (e, t, n, r, i, a, o = c) => {
		let l = new K(new Mi(e, t, n), o);
		l.position.set(r, i, a), s.add(l);
	};
	f(u - 30, o, i - 40, 0, o / 2, -i / 2 - 10, l);
	for (let e = 0; e <= t; e++) f(u + (e === t ? 24 : 0), a, i + (e === t ? 16 : 0), 0, o + e * (r + a) + a / 2, -i / 2 + (e === t ? 4 : 0));
	for (let t = 0; t <= e; t++) f(a, d - o - a, i, -u / 2 + a / 2 + t * (n + a), o + (d - o - a) / 2, -i / 2);
	f(u - 4, d - o, 6, 0, o + (d - o) / 2, -i + 3, l);
	let p = [];
	for (let i = t - 1; i >= 0; i--) for (let t = 0; t < e; t++) {
		let e = -u / 2 + a + t * (n + a);
		p.push({
			x0: e,
			x1: e + n,
			y: o + i * (r + a) + a,
			h: r
		});
	}
	return {
		group: s,
		width: u + 24,
		height: d,
		depth: i,
		cells: p
	};
}
// src/props/outlines.js
var sp = {
	vita: [
		[0, -42.95],
		[3.57, -42.95],
		[7.14, -42.95],
		[10.71, -42.95],
		[14.28, -42.95],
		[17.85, -42.95],
		[21.42, -42.95],
		[24.99, -42.95],
		[28.56, -42.95],
		[32.13, -42.95],
		[35.7, -42.95],
		[39.27, -42.95],
		[42.84, -42.95],
		[46.41, -42.95],
		[49.96, -42.92],
		[53.45, -42.82],
		[56.83, -42.55],
		[60.09, -42.05],
		[63.26, -41.28],
		[66.34, -40.26],
		[69.31, -39],
		[72.17, -37.48],
		[74.93, -35.69],
		[77.57, -33.64],
		[80.06, -31.35],
		[82.34, -28.86],
		[84.39, -26.19],
		[86.17, -23.37],
		[87.67, -20.43],
		[88.91, -17.38],
		[89.92, -14.27],
		[90.73, -11.11],
		[91.3, -7.88],
		[91.63, -4.52],
		[91.76, -1.05],
		[91.76, 2.47],
		[91.61, 5.94],
		[91.26, 9.28],
		[90.63, 12.49],
		[89.76, 15.62],
		[88.66, 18.7],
		[87.33, 21.71],
		[85.75, 24.61],
		[83.91, 27.39],
		[81.85, 30.01],
		[79.57, 32.34],
		[77.11, 34.15],
		[74.5, 35.26],
		[71.77, 35.87],
		[68.96, 36.5],
		[66.22, 37.59],
		[63.68, 39.13],
		[61.25, 40.72],
		[58.68, 41.88],
		[55.85, 42.46],
		[52.82, 42.67],
		[49.63, 42.78],
		[46.29, 42.87],
		[42.82, 42.93],
		[39.27, 42.95],
		[35.7, 42.95],
		[32.13, 42.95],
		[28.56, 42.95],
		[24.99, 42.95],
		[21.42, 42.95],
		[17.85, 42.95],
		[14.28, 42.95],
		[10.71, 42.95],
		[7.14, 42.95],
		[3.57, 42.95],
		[0, 42.95],
		[-3.57, 42.95],
		[-7.14, 42.95],
		[-10.71, 42.95],
		[-14.28, 42.95],
		[-17.85, 42.95],
		[-21.42, 42.95],
		[-24.99, 42.95],
		[-28.56, 42.95],
		[-32.13, 42.95],
		[-35.7, 42.95],
		[-39.27, 42.95],
		[-42.82, 42.93],
		[-46.29, 42.87],
		[-49.63, 42.78],
		[-52.82, 42.67],
		[-55.85, 42.46],
		[-58.68, 41.88],
		[-61.25, 40.72],
		[-63.68, 39.13],
		[-66.22, 37.59],
		[-68.96, 36.5],
		[-71.77, 35.87],
		[-74.5, 35.26],
		[-77.11, 34.15],
		[-79.57, 32.34],
		[-81.85, 30.01],
		[-83.91, 27.39],
		[-85.75, 24.61],
		[-87.33, 21.71],
		[-88.66, 18.7],
		[-89.76, 15.62],
		[-90.63, 12.49],
		[-91.26, 9.28],
		[-91.61, 5.94],
		[-91.76, 2.47],
		[-91.76, -1.05],
		[-91.63, -4.52],
		[-91.3, -7.88],
		[-90.73, -11.11],
		[-89.92, -14.27],
		[-88.91, -17.38],
		[-87.67, -20.43],
		[-86.17, -23.37],
		[-84.39, -26.19],
		[-82.34, -28.86],
		[-80.06, -31.35],
		[-77.57, -33.64],
		[-74.93, -35.69],
		[-72.17, -37.48],
		[-69.31, -39],
		[-66.34, -40.26],
		[-63.26, -41.28],
		[-60.09, -42.05],
		[-56.83, -42.55],
		[-53.45, -42.82],
		[-49.96, -42.92],
		[-46.41, -42.95],
		[-42.84, -42.95],
		[-39.27, -42.95],
		[-35.7, -42.95],
		[-32.13, -42.95],
		[-28.56, -42.95],
		[-24.99, -42.95],
		[-21.42, -42.95],
		[-17.85, -42.95],
		[-14.28, -42.95],
		[-10.71, -42.95],
		[-7.14, -42.95],
		[-3.57, -42.95]
	],
	pspgo: [
		[0, -34.67],
		[3.05, -34.67],
		[6.1, -34.67],
		[9.15, -34.67],
		[12.2, -34.67],
		[15.26, -34.67],
		[18.31, -34.67],
		[21.36, -34.67],
		[24.4, -34.66],
		[27.44, -34.62],
		[30.45, -34.53],
		[33.45, -34.4],
		[36.44, -34.26],
		[39.46, -34.17],
		[42.48, -34.11],
		[45.47, -33.96],
		[48.32, -33.54],
		[50.91, -32.61],
		[53.14, -31.07],
		[55.02, -29.04],
		[56.61, -26.71],
		[58, -24.25],
		[59.22, -21.7],
		[60.29, -19.09],
		[61.22, -16.43],
		[62.02, -13.71],
		[62.69, -10.94],
		[63.22, -8.1],
		[63.59, -5.21],
		[63.78, -2.27],
		[63.79, .68],
		[63.62, 3.63],
		[63.28, 6.53],
		[62.81, 9.39],
		[62.19, 12.18],
		[61.45, 14.93],
		[60.58, 17.62],
		[59.6, 20.26],
		[58.5, 22.86],
		[57.28, 25.4],
		[55.89, 27.85],
		[54.24, 30.08],
		[52.26, 31.92],
		[49.9, 33.22],
		[47.21, 33.95],
		[44.31, 34.28],
		[41.3, 34.38],
		[38.28, 34.41],
		[35.29, 34.4],
		[32.37, 34.3],
		[29.51, 34.12],
		[26.65, 33.93],
		[23.75, 33.81],
		[20.8, 33.73],
		[17.81, 33.69],
		[14.82, 33.69],
		[11.83, 33.77],
		[8.86, 33.88],
		[5.9, 33.9],
		[2.95, 33.78],
		[0, 33.58],
		[-2.95, 33.78],
		[-5.9, 33.9],
		[-8.86, 33.88],
		[-11.83, 33.77],
		[-14.82, 33.69],
		[-17.81, 33.69],
		[-20.8, 33.73],
		[-23.75, 33.81],
		[-26.65, 33.93],
		[-29.51, 34.12],
		[-32.37, 34.3],
		[-35.29, 34.4],
		[-38.28, 34.41],
		[-41.3, 34.38],
		[-44.31, 34.28],
		[-47.21, 33.95],
		[-49.9, 33.22],
		[-52.26, 31.92],
		[-54.24, 30.08],
		[-55.89, 27.85],
		[-57.28, 25.4],
		[-58.5, 22.86],
		[-59.6, 20.26],
		[-60.58, 17.62],
		[-61.45, 14.93],
		[-62.19, 12.18],
		[-62.81, 9.39],
		[-63.28, 6.53],
		[-63.62, 3.63],
		[-63.79, .68],
		[-63.78, -2.27],
		[-63.59, -5.21],
		[-63.22, -8.1],
		[-62.69, -10.94],
		[-62.02, -13.71],
		[-61.22, -16.43],
		[-60.29, -19.09],
		[-59.22, -21.7],
		[-58, -24.25],
		[-56.61, -26.71],
		[-55.02, -29.04],
		[-53.14, -31.07],
		[-50.91, -32.61],
		[-48.32, -33.54],
		[-45.47, -33.96],
		[-42.48, -34.11],
		[-39.46, -34.17],
		[-36.44, -34.26],
		[-33.45, -34.4],
		[-30.45, -34.53],
		[-27.44, -34.62],
		[-24.4, -34.66],
		[-21.36, -34.67],
		[-18.31, -34.67],
		[-15.26, -34.67],
		[-12.2, -34.67],
		[-9.15, -34.67],
		[-6.1, -34.67],
		[-3.05, -34.67]
	],
	gba: [
		[0, -39.68],
		[3.01, -39.67],
		[6.01, -39.65],
		[9, -39.6],
		[11.96, -39.52],
		[14.91, -39.39],
		[17.83, -39.21],
		[20.74, -39],
		[23.63, -38.73],
		[26.48, -38.41],
		[29.29, -38.02],
		[32.05, -37.56],
		[34.75, -37.01],
		[37.41, -36.38],
		[40.03, -35.65],
		[42.57, -34.77],
		[44.97, -33.72],
		[47.25, -32.6],
		[49.52, -31.58],
		[51.9, -30.75],
		[54.41, -30.05],
		[57.03, -29.43],
		[59.7, -28.81],
		[62.32, -28.11],
		[64.77, -27.15],
		[66.95, -25.83],
		[68.79, -24.11],
		[70.23, -22],
		[71.22, -19.55],
		[71.73, -16.86],
		[71.83, -14.04],
		[71.68, -11.18],
		[71.38, -8.33],
		[71.02, -5.5],
		[70.63, -2.67],
		[70.23, .17],
		[69.81, 3],
		[69.36, 5.81],
		[68.85, 8.59],
		[68.3, 11.36],
		[67.7, 14.12],
		[67.07, 16.85],
		[66.41, 19.56],
		[65.73, 22.24],
		[64.98, 24.84],
		[63.99, 27.25],
		[62.57, 29.25],
		[60.61, 30.71],
		[58.24, 31.71],
		[55.69, 32.51],
		[53.14, 33.31],
		[50.64, 34.18],
		[48.19, 35.06],
		[45.79, 35.85],
		[43.41, 36.49],
		[41.02, 37.06],
		[38.6, 37.66],
		[36.2, 38.25],
		[33.83, 38.65],
		[31.41, 38.78],
		[28.84, 38.75],
		[26.09, 38.69],
		[23.22, 38.65],
		[20.32, 38.63],
		[17.4, 38.62],
		[14.48, 38.61],
		[11.58, 38.59],
		[8.7, 38.55],
		[5.82, 38.51],
		[2.92, 38.48],
		[0, 38.44],
		[-2.92, 38.48],
		[-5.82, 38.51],
		[-8.7, 38.55],
		[-11.58, 38.59],
		[-14.48, 38.61],
		[-17.4, 38.62],
		[-20.32, 38.63],
		[-23.22, 38.65],
		[-26.09, 38.69],
		[-28.84, 38.75],
		[-31.41, 38.78],
		[-33.83, 38.65],
		[-36.2, 38.25],
		[-38.6, 37.66],
		[-41.02, 37.06],
		[-43.41, 36.49],
		[-45.79, 35.85],
		[-48.19, 35.06],
		[-50.64, 34.18],
		[-53.14, 33.31],
		[-55.69, 32.51],
		[-58.24, 31.71],
		[-60.61, 30.71],
		[-62.57, 29.25],
		[-63.99, 27.25],
		[-64.98, 24.84],
		[-65.73, 22.24],
		[-66.41, 19.56],
		[-67.07, 16.85],
		[-67.7, 14.12],
		[-68.3, 11.36],
		[-68.85, 8.59],
		[-69.36, 5.81],
		[-69.81, 3],
		[-70.23, .17],
		[-70.63, -2.67],
		[-71.02, -5.5],
		[-71.38, -8.33],
		[-71.68, -11.18],
		[-71.83, -14.04],
		[-71.73, -16.86],
		[-71.22, -19.55],
		[-70.23, -22],
		[-68.79, -24.11],
		[-66.95, -25.83],
		[-64.77, -27.15],
		[-62.32, -28.11],
		[-59.7, -28.81],
		[-57.03, -29.43],
		[-54.41, -30.05],
		[-51.9, -30.75],
		[-49.52, -31.58],
		[-47.25, -32.6],
		[-44.97, -33.72],
		[-42.57, -34.77],
		[-40.03, -35.65],
		[-37.41, -36.38],
		[-34.75, -37.01],
		[-32.05, -37.56],
		[-29.29, -38.02],
		[-26.48, -38.41],
		[-23.63, -38.73],
		[-20.74, -39],
		[-17.83, -39.21],
		[-14.91, -39.39],
		[-11.96, -39.52],
		[-9, -39.6],
		[-6.01, -39.65],
		[-3.01, -39.67]
	],
	psone: [
		[0, -72.17],
		[5.28, -72.16],
		[10.55, -72.14],
		[15.81, -72.09],
		[21.07, -72.04],
		[26.32, -71.96],
		[31.56, -71.89],
		[36.81, -71.81],
		[42.05, -71.7],
		[47.26, -71.54],
		[52.44, -71.3],
		[57.58, -70.95],
		[62.64, -70.44],
		[67.62, -69.7],
		[72.44, -68.65],
		[77.05, -67.17],
		[81.33, -65.16],
		[85.15, -62.52],
		[88.37, -59.25],
		[90.93, -55.39],
		[92.82, -51.06],
		[94.13, -46.38],
		[94.99, -41.49],
		[95.54, -36.45],
		[95.88, -31.35],
		[96.1, -26.21],
		[96.25, -21.04],
		[96.35, -15.85],
		[96.42, -10.64],
		[96.46, -5.39],
		[96.48, -.13],
		[96.48, 5.14],
		[96.46, 10.41],
		[96.41, 15.67],
		[96.31, 20.91],
		[96.16, 26.12],
		[95.92, 31.3],
		[95.55, 36.43],
		[94.99, 41.47],
		[94.12, 46.38],
		[92.82, 51.07],
		[90.95, 55.42],
		[88.41, 59.3],
		[85.2, 62.6],
		[81.38, 65.24],
		[77.09, 67.25],
		[72.47, 68.71],
		[67.63, 69.75],
		[62.66, 70.47],
		[57.59, 70.98],
		[52.46, 71.34],
		[47.29, 71.6],
		[42.08, 71.79],
		[36.86, 71.92],
		[31.62, 72.02],
		[26.37, 72.09],
		[21.11, 72.13],
		[15.84, 72.16],
		[10.56, 72.17],
		[5.28, 72.17],
		[0, 72.17],
		[-5.28, 72.17],
		[-10.56, 72.17],
		[-15.84, 72.16],
		[-21.11, 72.13],
		[-26.37, 72.09],
		[-31.62, 72.02],
		[-36.86, 71.92],
		[-42.08, 71.79],
		[-47.29, 71.6],
		[-52.46, 71.34],
		[-57.59, 70.98],
		[-62.66, 70.47],
		[-67.63, 69.75],
		[-72.47, 68.71],
		[-77.09, 67.25],
		[-81.38, 65.24],
		[-85.2, 62.6],
		[-88.41, 59.3],
		[-90.95, 55.42],
		[-92.82, 51.07],
		[-94.12, 46.38],
		[-94.99, 41.47],
		[-95.55, 36.43],
		[-95.92, 31.3],
		[-96.16, 26.12],
		[-96.31, 20.91],
		[-96.41, 15.67],
		[-96.46, 10.41],
		[-96.48, 5.14],
		[-96.48, -.13],
		[-96.46, -5.39],
		[-96.42, -10.64],
		[-96.35, -15.85],
		[-96.25, -21.04],
		[-96.1, -26.21],
		[-95.88, -31.35],
		[-95.54, -36.45],
		[-94.99, -41.49],
		[-94.13, -46.38],
		[-92.82, -51.06],
		[-90.93, -55.39],
		[-88.37, -59.25],
		[-85.15, -62.52],
		[-81.33, -65.16],
		[-77.05, -67.17],
		[-72.44, -68.65],
		[-67.62, -69.7],
		[-62.64, -70.44],
		[-57.58, -70.95],
		[-52.44, -71.3],
		[-47.26, -71.54],
		[-42.05, -71.7],
		[-36.81, -71.81],
		[-31.56, -71.89],
		[-26.32, -71.96],
		[-21.07, -72.04],
		[-15.81, -72.09],
		[-10.55, -72.14],
		[-5.28, -72.16]
	],
	pad: [
		[0, -16.74],
		[2.37, -16.77],
		[4.62, -16.96],
		[6.6, -17.56],
		[8.23, -18.73],
		[9.68, -20.3],
		[11.19, -21.96],
		[12.86, -23.47],
		[14.7, -24.73],
		[16.67, -25.73],
		[18.76, -26.45],
		[20.95, -26.88],
		[23.23, -27],
		[25.49, -26.82],
		[27.69, -26.38],
		[29.79, -25.75],
		[31.83, -25.22],
		[33.77, -25.2],
		[35.55, -25.94],
		[37.16, -27.32],
		[38.66, -29.01],
		[40.12, -30.79],
		[41.57, -32.57],
		[43.02, -34.35],
		[44.48, -36.14],
		[45.94, -37.91],
		[47.41, -39.69],
		[48.92, -41.43],
		[50.5, -43.08],
		[52.19, -44.55],
		[54.03, -45.76],
		[56.02, -46.69],
		[58.13, -47.33],
		[60.34, -47.69],
		[62.61, -47.76],
		[64.86, -47.54],
		[67.02, -47.03],
		[69.08, -46.23],
		[70.99, -45.11],
		[72.75, -43.7],
		[74.3, -42.05],
		[75.59, -40.23],
		[76.62, -38.27],
		[77.37, -36.2],
		[77.87, -34.04],
		[78.12, -31.82],
		[78.16, -29.56],
		[78.02, -27.3],
		[77.74, -25.06],
		[77.35, -22.84],
		[76.91, -20.63],
		[76.47, -18.43],
		[76.04, -16.23],
		[75.64, -14.01],
		[75.26, -11.78],
		[74.85, -9.57],
		[74.42, -7.36],
		[73.98, -5.16],
		[73.54, -2.96],
		[73.11, -.75],
		[72.71, 1.47],
		[72.32, 3.69],
		[71.91, 5.9],
		[71.48, 8.11],
		[71.05, 10.31],
		[70.64, 12.53],
		[70.24, 14.75],
		[69.78, 16.94],
		[69.21, 19.09],
		[68.47, 21.17],
		[67.58, 23.18],
		[66.5, 25.12],
		[65.24, 26.97],
		[63.79, 28.73],
		[62.25, 30.41],
		[60.84, 32.09],
		[59.79, 33.94],
		[59.14, 36],
		[58.68, 38.17],
		[58.12, 40.3],
		[57.23, 42.27],
		[55.96, 44.01],
		[54.39, 45.5],
		[52.58, 46.65],
		[50.56, 47.41],
		[48.35, 47.79],
		[46.03, 47.91],
		[43.68, 47.87],
		[41.4, 47.65],
		[39.27, 47.12],
		[37.35, 46.2],
		[35.64, 44.95],
		[34.1, 43.46],
		[32.82, 41.76],
		[31.92, 39.82],
		[31.34, 37.71],
		[30.78, 35.68],
		[29.84, 34.11],
		[28.26, 33.21],
		[26.17, 32.88],
		[23.84, 32.81],
		[21.46, 32.8],
		[19.07, 32.8],
		[16.69, 32.8],
		[14.3, 32.8],
		[11.92, 32.8],
		[9.54, 32.8],
		[7.15, 32.8],
		[4.77, 32.8],
		[2.38, 32.8],
		[0, 32.8],
		[-2.38, 32.8],
		[-4.77, 32.8],
		[-7.15, 32.8],
		[-9.54, 32.8],
		[-11.92, 32.8],
		[-14.3, 32.8],
		[-16.69, 32.8],
		[-19.07, 32.8],
		[-21.46, 32.8],
		[-23.84, 32.81],
		[-26.17, 32.88],
		[-28.26, 33.21],
		[-29.84, 34.11],
		[-30.78, 35.68],
		[-31.34, 37.71],
		[-31.92, 39.82],
		[-32.82, 41.76],
		[-34.1, 43.46],
		[-35.64, 44.95],
		[-37.35, 46.2],
		[-39.27, 47.12],
		[-41.4, 47.65],
		[-43.68, 47.87],
		[-46.03, 47.91],
		[-48.35, 47.79],
		[-50.56, 47.41],
		[-52.58, 46.65],
		[-54.39, 45.5],
		[-55.96, 44.01],
		[-57.23, 42.27],
		[-58.12, 40.3],
		[-58.68, 38.17],
		[-59.14, 36],
		[-59.79, 33.94],
		[-60.84, 32.09],
		[-62.25, 30.41],
		[-63.79, 28.73],
		[-65.24, 26.97],
		[-66.5, 25.12],
		[-67.58, 23.18],
		[-68.47, 21.17],
		[-69.21, 19.09],
		[-69.78, 16.94],
		[-70.24, 14.75],
		[-70.64, 12.53],
		[-71.05, 10.31],
		[-71.48, 8.11],
		[-71.91, 5.9],
		[-72.32, 3.69],
		[-72.71, 1.47],
		[-73.11, -.75],
		[-73.54, -2.96],
		[-73.98, -5.16],
		[-74.42, -7.36],
		[-74.85, -9.57],
		[-75.26, -11.78],
		[-75.64, -14.01],
		[-76.04, -16.23],
		[-76.47, -18.43],
		[-76.91, -20.63],
		[-77.35, -22.84],
		[-77.74, -25.06],
		[-78.02, -27.3],
		[-78.16, -29.56],
		[-78.12, -31.82],
		[-77.87, -34.04],
		[-77.37, -36.2],
		[-76.62, -38.27],
		[-75.59, -40.23],
		[-74.3, -42.05],
		[-72.75, -43.7],
		[-70.99, -45.11],
		[-69.08, -46.23],
		[-67.02, -47.03],
		[-64.86, -47.54],
		[-62.61, -47.76],
		[-60.34, -47.69],
		[-58.13, -47.33],
		[-56.02, -46.69],
		[-54.03, -45.76],
		[-52.19, -44.55],
		[-50.5, -43.08],
		[-48.92, -41.43],
		[-47.41, -39.69],
		[-45.94, -37.91],
		[-44.48, -36.14],
		[-43.02, -34.35],
		[-41.57, -32.57],
		[-40.12, -30.79],
		[-38.66, -29.01],
		[-37.16, -27.32],
		[-35.55, -25.94],
		[-33.77, -25.2],
		[-31.83, -25.22],
		[-29.79, -25.75],
		[-27.69, -26.38],
		[-25.49, -26.82],
		[-23.23, -27],
		[-20.95, -26.88],
		[-18.76, -26.45],
		[-16.67, -25.73],
		[-14.7, -24.73],
		[-12.86, -23.47],
		[-11.19, -21.96],
		[-9.68, -20.3],
		[-8.23, -18.73],
		[-6.6, -17.56],
		[-4.62, -16.96],
		[-2.37, -16.77]
	]
}, cp = "Rockwell, \"Roboto Slab\", Georgia, \"Times New Roman\", serif";
function lp(e, t, n, r = 0, i = 0, a = 7) {
	let o = e / 2, s = t / 2, c = [
		[
			o,
			s,
			0
		],
		[
			-o,
			s,
			Math.PI / 2
		],
		[
			-o,
			-s,
			Math.PI
		],
		[
			o,
			-s,
			Math.PI * 1.5
		]
	], l = [];
	return c.forEach(([e, t, o], s) => {
		let c = Math.max(.01, n[s]), u = e - Math.sign(e) * c, d = t - Math.sign(t) * c;
		for (let e = 0; e <= a; e++) {
			let t = o + e / a * (Math.PI / 2);
			l.push(new H(r + u + Math.cos(t) * c, i + d + Math.sin(t) * c));
		}
	}), l;
}
function up(e, t) {
	let n = e.length;
	return e.map((r, i) => {
		let a = e[(i + n - 1) % n], o = e[(i + 1) % n], s = o.y - a.y, c = -(o.x - a.x), l = Math.hypot(s, c) || 1;
		return new H(r.x - s / l * t, r.y - c / l * t);
	});
}
function $(e, t, n, r = 1.5) {
	let i = Math.min(r, (n - t) * .9), a = [Z(e, t), Z(e, n - i)];
	for (let t = 1; t <= 3; t++) {
		let r = t / 3 * (Math.PI / 2);
		a.push(Z(up(e, i * (1 - Math.cos(r))), n - i + i * Math.sin(r)));
	}
	return qu([ud(a), Q(up(e, i), [], n)]);
}
var dp = (e) => e.rotateX(-Math.PI / 2);
function fp(e, t, n, r, i, a, o, s = 16) {
	return e.decal(ad(t, n, s, (e, r) => {
		e.translate(t / 2, n / 2), e.textAlign = "center", e.textBaseline = "middle", o(e, r);
	}), t, n, r, i, a);
}
var pp = (e, t, n, r, i, a) => {
	e.font = i, e.fillStyle = a, e.fillText(t, n, -r);
};
function mp(e, t, n, r, i, a, o = .45) {
	e.lineWidth = o, e.lineJoin = "round";
	let [s, c, l, u] = a;
	e.strokeStyle = s, e.beginPath(), e.moveTo(t, -(n + r) - i), e.lineTo(t + i, -(n + r) + i * .75), e.lineTo(t - i, -(n + r) + i * .75), e.closePath(), e.stroke(), e.strokeStyle = c, e.beginPath(), e.arc(t + r, -n, i * .9, 0, Math.PI * 2), e.stroke(), e.strokeStyle = l, e.beginPath(), e.moveTo(t - i * .8, -(n - r) - i * .8), e.lineTo(t + i * .8, -(n - r) + i * .8), e.moveTo(t + i * .8, -(n - r) - i * .8), e.lineTo(t - i * .8, -(n - r) + i * .8), e.stroke(), e.strokeStyle = u, e.strokeRect(t - r - i * .8, -n - i * .8, i * 1.6, i * 1.6);
}
var hp = (e, t = 1, n = 1) => sp[e].map(([e, r]) => new H(e * t, r * n));
function gp(e, t, n, r = 2, i = 2, a = 4) {
	let o = [];
	for (let n = 0; n <= a; n++) {
		let r = n / a * (Math.PI / 2);
		o.push(Z(up(e, i * (1 - Math.sin(r))), t + i * (1 - Math.cos(r))));
	}
	for (let t = 0; t <= a; t++) {
		let i = t / a * (Math.PI / 2);
		o.push(Z(up(e, r * (1 - Math.cos(i))), n - r + r * Math.sin(i)));
	}
	return qu([
		ud(o),
		Q(up(e, r), [], n),
		Q(up(e, i), [], 0).rotateY(Math.PI).translate(0, 0, t)
	]);
}
function _p(e, t, [n, r], i, a, o) {
	let s = -r, c = n, l = o / 2, u = i + o * .45, d = (i, a) => new H(e + n * i + s * a, t + r * i + c * a);
	return [
		d(i, 0),
		d(u, -l),
		d(a, -l),
		d(a, l),
		d(u, l)
	];
}
var vp = (e, t, n, r, i) => n.forEach(([n, a]) => e.add(t, Q(ld(r, n, a, 10), [], i)));
function yp(e, t, n = 0) {
	let { root: r } = e.finish({});
	r.position.y = n;
	let i = new Ln();
	return i.add(r), i.name = t, i.userData.prop = t, i;
}
function bp() {
	let e = new md("PS one");
	e.mat("shell", {
		color: 12895165,
		roughness: .58
	}), e.mat("lid", {
		color: 13158337,
		roughness: .54
	}), e.mat("seam", {
		color: 9144964,
		roughness: .8
	}), e.mat("door", {
		color: 12829372,
		roughness: .55
	}), e.mat("port", {
		color: 11118755,
		roughness: .6
	});
	let t = hp("psone");
	e.add("shell", dp(gp(t, 0, 33.5, 7, 11, 6))), e.add("seam", dp(ud([Z(up(t, -.05), 17.6), Z(up(t, -.05), 18.4)]))), e.add("lid", dp($(X(105, 30, 2, 0, 56.5), 31.5, 35.1, 1.2))), e.add("lid", dp($(ld(67.5, 0, -1, 72), 31.5, 36.9, 2.6))), e.add("seam", new Qa(67.4, 68.4, 72).rotateX(-Math.PI / 2).translate(0, 33.56, 1));
	for (let t of [-1, 1]) e.add("shell", dp($(ld(19.5, t * 75, -49, 44), 30.5, 34.4, 2))), e.add("seam", new Qa(15, 15.8, 44).rotateX(-Math.PI / 2).translate(t * 75, 34.45, 49)), e.add("lid", dp($(ld(15, t * 75, -49, 44), 32.5, 36.1, 1.4)));
	e.add("seam", new Za(1.6, 5).rotateX(-Math.PI / 2).translate(-75, 31.3, 68.2)), e.add("seam", new Pi(15, 24, Math.PI, Math.PI).translate(0, 29.1, 71.1).rotateX(0));
	for (let t of [-1, 1]) e.add("door", new Mi(53, 8.4, 2).translate(t * 34.5, 22.6, 71)), e.add("port", $(X(53, 10.5, 4, t * 34.5, 11.8), 65.6, 72.1, .5));
	fp(e, 150, 30, 0, 17, 72.16, (e, t) => {
		for (let n of [-1, 1]) {
			pp(e, "MEMORY CARD", n * 34.5, 5.4, `600 2.5px ${t}`, "#74736e");
			for (let t = 0; t < 3; t++) {
				let r = n * 34.5 - 23.5 + t * 16.2;
				e.fillStyle = "#d7d6d1", e.beginPath(), e.roundRect(r, 2.1, 14.6, 6.2, 1.2), e.fill(), e.fillStyle = "#85847f";
				for (let t = 0; t < 3; t++) e.fillRect(r + 3.4 + t * 3.3, 4.6, 1.3, 1.3);
			}
		}
	}), fp(e, 170, 144, 0, 36.96, 0, (e, t) => {
		pp(e, "SONY", 0, 40, `700 9px ${cp}`, "#6f6e68"), [
			[
				"#d9382c",
				-2.6,
				1.6,
				3.4,
				3.4
			],
			[
				"#e9b723",
				.6,
				2.4,
				3,
				2.6
			],
			[
				"#2c8f6b",
				-.2,
				-1.4,
				3.4,
				2.6
			],
			[
				"#2a63b8",
				3.2,
				-.6,
				3,
				3
			]
		].forEach(([t, n, r, i, a]) => {
			e.fillStyle = t, e.fillRect(n - i / 2, -(-33 + r) - a / 2, i, a);
		}), pp(e, "PS", -4.6, -43, `500 6.4px ${t}`, "#66655f"), pp(e, "one", 5.4, -43.3, `500 5.2px ${t}`, "#66655f");
	}).rotation.x = -Math.PI / 2, fp(e, 170, 144, 0, 33.58, 0, (e, t) => {
		pp(e, "1", -37, -66.5, `500 4px ${t}`, "#a3a29c"), pp(e, "2", 37, -66.5, `500 4px ${t}`, "#a3a29c");
	}).rotation.x = -Math.PI / 2;
	for (let [t, n] of [[-1, (e, t) => {
		pp(e, "I/⏻", 0, 2.2, `700 7px ${t}`, "#2f9b68"), pp(e, "RESET", 0, -5, `700 3px ${t}`, "#6f6e68");
	}], [1, (e) => {
		e.strokeStyle = "#3d86c9", e.lineWidth = 1.1, e.lineJoin = "round", e.beginPath(), e.moveTo(-4.4, .6), e.lineTo(0, -4.8), e.lineTo(4.4, .6), e.closePath(), e.stroke(), e.strokeRect(-4.4, 2.6, 8.8, 1.8);
	}]]) fp(e, 26, 26, t * 75, 36.16, 49, n).rotation.x = -Math.PI / 2;
	return yp(e, "ps-one");
}
function xp() {
	let e = new md("DualShock");
	e.mat("shell", {
		color: 14078918,
		roughness: .58
	}), e.mat("pad", {
		color: 14605264,
		roughness: .5
	}), e.mat("key", {
		color: 8355978,
		roughness: .62
	}), e.mat("cable", {
		color: 12171443,
		roughness: .7
	}), e.add("shell", dp(gp(hp("pad"), 0, 27, 6, 7, 5)));
	for (let t of [-1, 1]) e.add("shell", new Ni(12.5, 26, 10, 24).rotateX(Math.PI / 2 - .5).rotateY(t * .19).translate(t * 62.5, 5, 24));
	for (let t of [-1, 1]) e.add("key", dp($(X(22, 7, 3, t * 45, 44.6), 9, 21, 2)));
	let t = -45.5;
	e.add("pad", dp($(X(37, 13.5, 2, t, 11), 26, 27.5, .4))), e.add("pad", dp($(X(13.5, 37, 2, t, 11), 26, 27.5, .4)));
	for (let n of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	]) e.add("key", dp($(_p(t, 11, n, 2.2, 13.6, 9.6), 27, 30, .9)));
	e.add("pad", dp($(X(38, 14.5, 2, 46, 11), 26, 27.5, .4))), e.add("pad", dp($(X(14.5, 38, 2, 46, 11), 26, 27.5, .4)));
	for (let [t, n] of [
		[0, 12],
		[12, 0],
		[0, -12],
		[-12, 0]
	]) e.add("key", dp($(ld(6.2, 46 + t, 11 + n, 28), 27, 30.2, 1)));
	for (let t of [-1, 1]) e.add("shell", dp($(ld(15.5, t * 23, -11.5, 36), 25, 29.2, 2.2))), e.add("key", dp($(ld(4, t * 23, -11.5, 16), 27, 31, .4))), e.add("key", dp($(ld(11, t * 23, -11.5, 32), 30.4, 34.4, 2)));
	e.add("key", dp($(X(7.6, 4.4, .9, -14.5, 11), 27, 28.3, .4))), e.add("key", dp($([
		new H(10.5, 13.9),
		new H(10.5, 8.1),
		new H(19.5, 11)
	], 27, 28.3, .3))), e.add("key", dp($(X(7.6, 4.8, .9, 0, -4.2), 27, 28.3, .4))), e.add("key", new Za(4.6, 1.6).rotateX(-Math.PI / 2).translate(0, 27.06, 11.2));
	let n = new Gi([
		[
			0,
			14,
			-38
		],
		[
			0,
			12,
			-60
		],
		[
			-26,
			6,
			-84
		],
		[
			-70,
			4,
			-84
		],
		[
			-104,
			4,
			-64
		]
	].map((e) => new U(...e)));
	return e.add("cable", new ro(n, 36, 2.3, 8)), fp(e, 160, 100, 0, 27.08, 0, (e, n) => {
		let r = "#85837a";
		pp(e, "SONY", 0, 24.5, `700 7.6px ${cp}`, r), pp(e, "PS", -2.8, 9.6, `500 3.6px ${n}`, r), pp(e, "one", 2.6, 9.4, `500 3px ${n}`, r), pp(e, "SELECT", -14.5, 6.2, `500 2.5px ${n}`, r), pp(e, "START", 14.5, 6.2, `500 2.5px ${n}`, r), pp(e, "ANALOG", 0, .9, `500 2.5px ${n}`, r), e.strokeStyle = r, e.lineWidth = .35, e.lineJoin = "round";
		for (let [n, r, i] of [
			[
				0,
				1,
				0
			],
			[
				0,
				-1,
				Math.PI
			],
			[
				1,
				0,
				Math.PI / 2
			],
			[
				-1,
				0,
				-Math.PI / 2
			]
		]) e.save(), e.translate(t + n * 16.2, -(11 + r * 16.2)), e.rotate(i), e.beginPath(), e.moveTo(-1.6, .7), e.lineTo(0, -.7), e.lineTo(1.6, .7), e.stroke(), e.restore();
	}).rotation.x = -Math.PI / 2, fp(e, 44, 44, 46, 30.259999999999998, -11, (e) => mp(e, 0, 0, 12, 3.3, [
		"#2fa07a",
		"#d8553f",
		"#7f9bd6",
		"#d98ab0"
	], .65)).rotation.x = -Math.PI / 2, yp(e, "dualshock");
}
function Sp() {
	let e = new md("Game Boy Advance");
	e.mat("shell", {
		color: 5523112,
		roughness: .52
	}), e.mat("dark", {
		color: 4405402,
		roughness: .6
	}), e.mat("key", {
		color: 13223881,
		roughness: .55
	}), e.mat("lens", {
		color: 1908e3,
		roughness: .35
	}), e.mat("lcd", {
		color: 8422523,
		roughness: .6
	});
	let t = hp("gba", 1, 1.02);
	for (let t of [-1, 1]) e.add("key", gp(lp(26, 13, [
		6.5,
		6.5,
		3,
		3
	], 0, 0).map((e) => e.clone().rotateAround(new H(), -t * .5).add(new H(t * 60.6, 25.5))), 3.5, 14.5, 3, 3));
	e.add("shell", gp(t, 0, 21, 4.5, 8, 5));
	let n = lp(74, 63.5, [
		5.5,
		5.5,
		15,
		15
	], 0, -1.2);
	e.add("dark", Q(lp(77, 66.5, [
		7,
		7,
		16.5,
		16.5
	], 0, -1.2), [], 21.03)), e.add("lens", $(n, 21, 21.9, .6)), e.add("lcd", new Za(61.2, 40.8).translate(0, 3, 21.95));
	let r = -52.5, i = 7.8;
	e.add("dark", Q(ld(11.6, r, i, 32), [], 21.03)), e.add("key", $(X(19.4, 6.4, 1, r, i), 21, 23.6, .8)), e.add("key", $(X(6.4, 19.4, 1, r, i), 21, 23.6, .8));
	for (let [t, n] of [[57.8, 8.4], [45.2, 3.9]]) e.add("dark", Q(ld(5.3, t, n, 28), [], 21.03)), e.add("key", $(ld(4.5, t, n, 28), 21, 23.3, 1));
	for (let [t, n] of [[-43.4, -13.1], [-43.6, -21.2]]) e.add("key", $(ld(2.4, t, n, 18), 21, 22.5, .6));
	return [
		[16, 0],
		[16, -3.5],
		[15, -7],
		[14.5, -10.5],
		[13, -14]
	].forEach(([t, n], r) => {
		e.add("dark", Q(X(t, 1.15, .55), [], 0).rotateZ(.21).translate(47.8 - r * .2, -10.6 + n, 21.04));
	}), e.add("dark", Q(ld(1.15, 45.9, 25.2, 14), [], 21.04)), fp(e, 150, 86, 0, 0, 21.98, (e, t) => {
		e.save(), e.translate(0, 25.2), e.transform(1, 0, -.2, 1, 0, 0), pp(e, "GAME BOY", -10.2, 0, `900 3.9px ${t}`, "#d4d4d8"), e.save(), e.scale(1.15, 1), pp(e, "ADVANCE", 9.9, -.1, `600 3.3px ${t}`, "#d4d4d8"), e.restore(), e.restore();
	}, 20), fp(e, 150, 86, 0, 0, 21.06, (e, t) => {
		let n = "#473c9f";
		e.strokeStyle = n, e.lineWidth = .45;
		for (let [r, i] of [[-13.1, "START"], [-21.2, "SELECT"]]) e.beginPath(), e.roundRect(-58.5, -r - 2.7, 13.5, 5.4, 2.7), e.stroke(), pp(e, i, -52.4, r, `800 2.3px ${t}`, n);
		pp(e, "POWER", 53, 25.2, `800 2.2px ${t}`, n), e.beginPath(), e.ellipse(1.5, -35.6, 9, 2.3, 0, 0, Math.PI * 2), e.stroke(), pp(e, "Nintendo", 1.5, 35.5, `800 3px ${t}`, n);
	}, 20), yp(e, "gba", 40);
}
function Cp() {
	let e = new md("PS Vita");
	e.mat("shell", {
		color: 1513242,
		roughness: .6
	}), e.mat("face", {
		color: 526346,
		roughness: .25
	}), e.mat("key", {
		color: 1908e3,
		roughness: .42
	}), e.mat("stick", {
		color: 1052690,
		roughness: .7
	}), e.mat("lcd", {
		color: 3158843,
		roughness: .35
	});
	let t = 85.1;
	e.add("shell", gp(hp("vita", 1, t / 85.9), 0, 14, 3.2, 5, 5)), e.add("face", $(X(121.5, 81.5, 5, 0, 1.3), 13.4, 14.5, .45)), e.add("lcd", new Za(110.7, 62.3).translate(0, 3.8, 14.53));
	let n = -74.5, r = 14.3;
	for (let t of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	]) e.add("key", $(_p(n, r, t, 1.6, 10, 6.2), 14, 15.7, .6));
	for (let [t, n] of [[-70, -6.8999999999999995], [68.8, -6.6000000000000005]]) e.add("face", Q(ld(8.2, t, n, 32), [], 14.04)), e.add("stick", $(ld(3.2, t, n, 16), 14, 16.6, .3)), e.add("stick", $(ld(6.2, t, n, 28), 16.2, 18.6, 1.3));
	let i = 73.8, a = 14.600000000000001;
	for (let [t, n] of [
		[0, 8],
		[8, 0],
		[0, -8],
		[-8, 0]
	]) e.add("key", $(ld(3.7, i + t, a + n, 22), 14, 15.6, .6));
	e.add("key", $(ld(3, 65.6, 27.1, 20), 14, 14.9, .4)), e.add("key", $(ld(4.1, -71.5, -22.2, 22), 14, 14.9, .4));
	for (let t of [65.6, 74.6]) e.add("key", $(ld(3.7, t, -22.4, 22), 14, 14.9, .4));
	for (let [t, n] of [[-84, -6.8999999999999995], [82.3, -6.8999999999999995]]) vp(e, "face", [
		[0, 0],
		[2.2, 1.3],
		[2.2, -1.3],
		[-2.2, 1.3],
		[-2.2, -1.3],
		[0, 2.6],
		[0, -2.6]
	].map(([e, r]) => [t + e, n + r]), .6, 14.05);
	return fp(e, 190, 90, 0, 0, 14.56, (e, t) => {
		pp(e, "SONY", -48, 38.4, `700 4.3px ${cp}`, "#d2d2d6"), e.save(), e.translate(-.8, 33), e.scale(1.42, 1), pp(e, "PS VITA", 0, 0, `200 5.6px ${t}`, "#dcdce0"), e.restore();
	}, 20), fp(e, 190, 90, 0, 0, 15.66, (e, t) => {
		mp(e, i, a, 8, 1.8, [
			"#c4c4c8",
			"#c4c4c8",
			"#c4c4c8",
			"#c4c4c8"
		], .38), e.strokeStyle = "#9a9a9e", e.lineWidth = .3;
		for (let [t, i, a] of [
			[
				0,
				1,
				0
			],
			[
				0,
				-1,
				Math.PI
			],
			[
				1,
				0,
				Math.PI / 2
			],
			[
				-1,
				0,
				-Math.PI / 2
			]
		]) e.save(), e.translate(n + t * 6.6, -(r + i * 6.6)), e.rotate(a), e.beginPath(), e.moveTo(-1.1, .6), e.lineTo(0, -.6), e.lineTo(1.1, .6), e.closePath(), e.stroke(), e.restore();
	}, 20), fp(e, 190, 90, 0, 0, 14.96, (e, t) => {
		pp(e, "SELECT", 65.6, -22.4, `700 1.5px ${t}`, "#e6e6ea"), pp(e, "START", 74.6, -22.4, `700 1.5px ${t}`, "#e6e6ea");
	}, 24), yp(e, "ps-vita", t / 2);
}
function wp() {
	let e = new md("PSP Go");
	e.mat("silver", {
		color: 12171965,
		roughness: .36,
		metalness: .8
	}), e.mat("deck", {
		color: 1381655,
		roughness: .55
	}), e.mat("face", {
		color: 592139,
		roughness: .22
	}), e.mat("key", {
		color: 1710621,
		roughness: .4
	}), e.mat("stick", {
		color: 921104,
		roughness: .8
	}), e.mat("lcd", {
		color: 3421755,
		roughness: .35
	});
	let t = 38.8, n = 9.5, r = hp("pspgo");
	e.add("silver", gp(r, 0, 9, 1.6, 4, 4)), e.add("deck", $(up(r, 2.6), 8.1, n, .6)), e.add("silver", new no(4.2, 1.1, 8, 20).translate(-58.5, -30.5, 3));
	let i = n, a = -15.5, o = 34.9;
	for (let t of [-1, 1]) e.add("deck", $(ld(16.6, t * o, a, 44), 8.9, 10, .5)), e.add("silver", new Qa(12.5, 14.7, 48).translate(t * o, a, 10.03));
	for (let t of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	]) e.add("key", $(_p(-34.9, a, t, 1.6, 11, 8.6), 9.9, 11.4, .6));
	for (let [t, n] of [
		[0, 8.4],
		[8.4, 0],
		[0, -8.4],
		[-8.4, 0]
	]) e.add("key", $(ld(3.5, o + t, a + n, 22), 9.9, 11.4, .6));
	e.add("face", Q(ld(7.7, -10.5, -20.7, 30), [], 9.54)), e.add("stick", $(ld(5, -10.5, -20.7, 26), i, 11.7, .8)), e.add("face", Q(ld(8.4, 10.8, -20.7, 30), [], 9.54));
	let s = (e) => {
		let t = [];
		for (let n = 0; n <= 14; n++) {
			let r = n / 14 * Math.PI;
			t.push(new H(10.8 + Math.cos(r) * 6.9, -20.7 + e * (.55 + Math.sin(r) * 4.4)));
		}
		return e > 0 ? t : t.reverse();
	};
	e.add("key", $(s(1), i, 10.7, .4)), e.add("key", $(s(-1), i, 10.7, .4)), e.add("face", Q(X(2.4, 1.1, .5, 0, -31.6), [], 9.54)), fp(e, 130, 70, 0, 0, 11.46, (e, t) => {
		mp(e, o, a, 8.4, 1.75, [
			"#d6d6da",
			"#d6d6da",
			"#d6d6da",
			"#d6d6da"
		], .36), e.strokeStyle = "#d6d6da", e.lineWidth = .3;
		for (let [t, n, r] of [
			[
				0,
				1,
				0
			],
			[
				0,
				-1,
				Math.PI
			],
			[
				1,
				0,
				Math.PI / 2
			],
			[
				-1,
				0,
				-Math.PI / 2
			]
		]) e.save(), e.translate(-34.9 + t * 8, -(a + n * 8)), e.rotate(r), e.beginPath(), e.moveTo(-1.2, .7), e.lineTo(0, -.7), e.lineTo(1.2, .7), e.closePath(), e.stroke(), e.restore();
	}, 24), fp(e, 130, 70, 0, 0, 10.76, (e, t) => {
		pp(e, "SELECT", 10.8, -18.3, `500 1.9px ${t}`, "#d6d6da"), pp(e, "START", 10.8, -23.3, `500 1.9px ${t}`, "#d6d6da");
	}, 24);
	let c = r.map((e) => new H(e.x, e.y + t));
	e.add("silver", ud([Z(up(c, .3), 9.6), Z(up(c, .3), 10.8)])), e.add("deck", gp(c, 10.7, 16.5, 1.8, 1.2, 4)), e.add("face", $(X(86.5, 56, 1.5, 0, 38.8), 16.1, 16.85, .3)), e.add("lcd", new Za(84.1, 47.3).translate(0, 40.8, 16.88)), e.add("key", $(lp(9, 9, [
		4.5,
		2,
		4.5,
		4.5
	], -52.2, 23.799999999999997), 16.2, 17.2, .4));
	for (let t of [-51.2, 51.3]) vp(e, "face", [
		[0, 1.5],
		[1.5, 0],
		[0, -1.5],
		[-1.5, 0]
	].map(([e, n]) => [t + e, 48.8 + n]), .7, 16.54);
	return vp(e, "key", [[-52.6, 57.8], [52.8, 56.8]], .9, 16.54), fp(e, 130, 70, 0, t, 16.92, (e, t) => {
		pp(e, "SONY", .8, 29.4, `700 3.6px ${cp}`, "#cfcfd3"), e.strokeStyle = "#dedee2", e.lineWidth = .42, e.lineCap = "butt", e.lineJoin = "miter";
		let n = 24.7 - 1.35, r = 24.7, i = 26.05, a = (t) => {
			e.beginPath(), e.moveTo(t, i), e.lineTo(t, r), e.lineTo(t + 5.6, r), e.lineTo(t + 5.6, n), e.lineTo(t, n), e.stroke();
		};
		a(-9), e.beginPath(), e.moveTo(3.2, n), e.lineTo(-2.4, n), e.lineTo(-2.4, r), e.lineTo(3.2, r), e.lineTo(3.2, i), e.lineTo(-2.4, i), e.stroke(), a(4.2);
	}, 24), yp(e, "psp-go", 69 / 2);
}
var Tp = {
	"ps-one": bp,
	dualshock: xp,
	gba: Sp,
	"ps-vita": Cp,
	"psp-go": wp
}, Ep = -16, Dp = new U(1, 0, 0), Op = new U(0, 1, 0), kp = new U(0, 0, 1), Ap = (e, t) => new zt().setFromAxisAngle(e, t), jp = {
	"ps-one": [193, 144],
	dualshock: [157, 96],
	gba: [145, 82],
	"ps-vita": [184, 85],
	"psp-go": [128, 108]
}, Mp = class {
	constructor(e, t) {
		this.ctx = e, this.row = t, this.x = t.x0 + 10, this.last = null, this.seg = 0, this.mine = [];
	}
	get room() {
		return this.row.x1 - 10 - this.x;
	}
	gap(e) {
		return this.x += e * this.ctx.tight, this.seg++, this;
	}
	_put(e, t, n) {
		e.position.copy(t), e.quaternion.copy(n || new zt()), this.mine.push([e, this.seg]), this.ctx.out.push(e);
	}
	up(e, t = Infinity, { push: n = 0 } = {}) {
		let { rnd: r } = this.ctx, i = this.x, a = 0;
		for (let i of this.ctx.take(e, t)) {
			let e = i.userData.spec;
			e.t > this.room || e.h > this.row.h - 4 ? this.ctx.back(i) : (this._put(i, new U(this.x + e.t / 2, this.row.y + e.h / 2, Ep - n - e.d / 2 - r() * 9)), this.x += e.t + .5, a++);
		}
		return a && (this.last = {
			x0: i,
			x1: this.x,
			push: n
		}), this;
	}
	withProp(e, t, n, r = 0) {
		let i = this.ctx.take(e, t), a = i.reduce((e, t) => e + t.userData.spec.t + .5, 0), o = Math.max(a, jp[n][0] * .82);
		if (i.reverse().forEach((e) => this.ctx.back(e)), o > this.room) return this.up(e, t);
		let s = this.x;
		this.x = s + (o - a) / 2, this.up(e, t, { push: 30 });
		let c = this.ctx.makeProp(n);
		if (c) {
			let e = new Ln();
			e.add(c), c.rotation.x = -.24, this._put(e, new U(s + o / 2, this.row.y, -20), Ap(Op, r));
		}
		return this.x = s + o + 6, this;
	}
	justify() {
		let e = this.room - 8;
		if (e <= 0) return;
		let t = e / (this.seg + 1);
		for (let [e, n] of this.mine) e.position.x += t * (n + .5);
	}
	lean(e, t = .2) {
		let [n] = this.ctx.take(e, 1);
		if (!n) return this;
		let r = n.userData.spec, i = t + this.ctx.rnd() * .06, a = r.h * Math.sin(i) + r.t * Math.cos(i);
		if (a > this.room) return this.ctx.back(n), this;
		let o = this.x + r.h * Math.sin(i);
		return this._put(n, new U(o + r.t / 2 * Math.cos(i) - r.h / 2 * Math.sin(i), this.row.y + r.t / 2 * Math.sin(i) + r.h / 2 * Math.cos(i), Ep - r.d / 2 - 4), Ap(kp, i)), this.x += a + 1, this;
	}
	pile(e) {
		let { rnd: t } = this.ctx, n = e.flatMap(([e, t]) => this.ctx.take(e, t));
		if (!n.length) return this;
		let r = Math.max(...n.map((e) => e.userData.spec.h));
		if (r > this.room) return n.forEach((e) => this.ctx.back(e)), this;
		let i = this.x + r / 2 + 4, a = this.row.y;
		n.sort((e, t) => t.userData.spec.h * t.userData.spec.d - e.userData.spec.h * e.userData.spec.d);
		for (let e of n) {
			let n = e.userData.spec;
			a + n.t > this.row.y + this.row.h - 6 ? this.ctx.back(e) : (this._put(e, new U(i + (t() - .5) * 12, a + n.t / 2, Ep - n.d / 2 - t() * 14), Ap(Op, (t() - .5) * .2).multiply(Ap(kp, Math.PI / 2))), a += n.t + .3);
		}
		return this.last = {
			x0: this.x,
			x1: this.x + r + 8,
			top: a,
			cx: i
		}, this.x += r + 12, this;
	}
	face(e) {
		if (this.ctx.narrow) return this.up(e, 1);
		let [t] = this.ctx.take(e, 1);
		if (!t) return this;
		let n = t.userData.spec, r = .16;
		return n.d > this.room ? (this.ctx.back(t), this) : (t.userData.ensureCover(), this._put(t, new U(this.x + n.d / 2, this.row.y + n.h / 2 * Math.cos(r) + n.t / 2 * Math.sin(r), -70 - n.h / 2 * Math.sin(r)), Ap(Dp, -.16).multiply(Ap(Op, -Math.PI / 2 + (this.ctx.rnd() - .5) * .12))), this.x += n.d + 6, this);
	}
	prop(e, t = "stand", { turn: n = 0, overlap: r = 0 } = {}) {
		let i = this.ctx.makeProp(e);
		if (!i) return this;
		let [a, o] = jp[e], s = new Ln();
		if (s.add(i), s.userData.prop = e, t === "on" && this.last?.top) return i.rotation.x = -.1, this._put(s, new U(this.last.cx, this.last.top, -84), Ap(Op, n)), this;
		if (t === "against" && this.last) return i.rotation.x = -.2, this._put(s, new U((this.last.x0 + this.last.x1) / 2, this.row.y, Ep - this.last.push + 22), Ap(Op, n)), this;
		if (a - r > this.room) return this;
		if (t === "propped") {
			let t = e === "ps-one" ? .98 : .9;
			i.rotation.x = t, i.position.y = o / 2 * Math.sin(t) + 1, this._put(s, new U(this.x - r + a / 2, this.row.y, e === "ps-one" ? -150 : -100), Ap(Op, n));
		} else i.rotation.x = -.14, this._put(s, new U(this.x - r + a / 2, this.row.y, -96), Ap(Op, n));
		return this.x += a - r + 8, this;
	}
}, Np = {
	tidy(e, t) {
		e.up("ps1").gap(40).prop("ps-one", "propped", { turn: .1 }).prop("dualshock", "propped", {
			turn: -.22,
			overlap: 30
		}).gap(40).up("book"), t.up("gba").gap(12).prop("gba").gap(36).up("vita").gap(12).prop("ps-vita").gap(36).up("psp").gap(12).prop("psp-go");
	},
	browsed(e, t) {
		e.up("ps1", 4).lean("ps1").gap(26).prop("ps-one", "propped", { turn: .14 }).prop("dualshock", "propped", {
			turn: -.3,
			overlap: 46
		}).gap(22).pile([["book", 2]]).prop("gba", "on", { turn: .12 }).gap(8).up("book", 3).lean("book", .17), t.up("gba", 2).lean("gba", .24).gap(20).face("vita").up("vita", 2).lean("vita").gap(18).prop("ps-vita", "stand", { turn: -.08 }).gap(22).withProp("psp", 3, "psp-go", .06);
	},
	piled(e, t) {
		e.gap(6).pile([["ps1", 4]]).gap(4).up("ps1", 2).lean("ps1", .18).gap(20).prop("ps-one", "propped", { turn: -.1 }).prop("dualshock", "propped", {
			turn: .26,
			overlap: 40
		}).gap(18).up("book", 2).lean("book", .18).gap(14).pile([["book", 3]]).prop("ps-vita", "on", { turn: -.1 }), t.pile([["gba", 2], ["vita", 1]]).prop("gba", "on", { turn: .1 }).gap(8).up("gba", 1).up("vita", 2).lean("vita").gap(24).pile([["psp", 2], ["vita", 1]]).prop("psp-go", "on", { turn: -.12 }).gap(10).up("psp").lean("vita", .2);
	},
	display(e, t) {
		e.gap(6).face("ps1").up("ps1").gap(24).prop("ps-one", "propped", { turn: .08 }).prop("dualshock", "propped", {
			turn: -.24,
			overlap: 40
		}).gap(24).up("book", 4).lean("book", .18).gap(8).pile([["book", 2]]), t.face("gba").up("gba").gap(6).prop("gba", "stand", { turn: .08 }).gap(10).face("vita").up("vita").gap(6).prop("ps-vita", "stand", { turn: -.06 }).gap(10).withProp("psp", 9, "psp-go", .08);
	}
};
function Pp(e, t, n, r) {
	var i;
	let a = Np[e] || Np.browsed, o = 0;
	for (let t of e || "browsed") o = o * 31 + t.charCodeAt(0) >>> 0;
	let s = () => (o = o * 1664525 + 1013904223 >>> 0) / 4294967296, c = {};
	for (let e of n) (c[i = e.userData.spec.type] || (c[i] = [])).push(e);
	let l = /* @__PURE__ */ new Set(), u = t[0].x1 - t[0].x0, d = {
		out: [],
		rnd: s,
		narrow: u < 900,
		tight: u < 900 ? .5 : 1,
		take: (e, t) => (c[e] || []).splice(0, t),
		back: (e) => {
			var t;
			return (c[t = e.userData.spec.type] || (c[t] = [])).unshift(e);
		},
		makeProp: (e) => l.has(e) ? null : (l.add(e), r(e))
	}, f = t.map((e) => new Mp(d, e));
	a(f[0], f[1] || f[0]);
	for (let e of Object.keys(c)) for (let t of [...f].sort((e, t) => t.room - e.room)) t.up(e);
	for (let e of Object.keys(jp)) l.has(e) || [...f].sort((e, t) => t.room - e.room)[0].gap(10).prop(e, e === "ps-one" || e === "dualshock" ? "propped" : "stand");
	f.forEach((e) => e.justify());
	let p = Object.values(c).flat();
	for (let e of p) console.warn(`retro-shelf: no room on the shelf for "${e.userData.spec.title}"`);
	return d.out;
}
// src/shelf-element.js
var Fp = [
	"pvm-20m4e",
	"pvm-9042qm",
	"kv-9pr1",
	"kv-5200"
], Ip = -14, Lp = {
	pyramid: {
		"pvm-20m4e": { x: 0 },
		"pvm-9042qm": {
			x: -112,
			on: "pvm-20m4e"
		},
		"kv-9pr1": {
			x: 112,
			on: "pvm-20m4e"
		},
		"kv-5200": {
			x: -112,
			on: "pvm-9042qm"
		}
	},
	pile: {
		"pvm-20m4e": {
			x: -165,
			ry: 4
		},
		"kv-9pr1": {
			x: -190,
			on: "pvm-20m4e",
			ry: -7
		},
		"pvm-9042qm": {
			x: 262,
			ry: -9
		},
		"kv-5200": {
			x: 268,
			on: "pvm-9042qm",
			ry: 11
		}
	},
	tower: {
		"pvm-20m4e": {
			x: 0,
			ry: -3
		},
		"pvm-9042qm": {
			x: -28,
			on: "pvm-20m4e",
			ry: 7
		},
		"kv-9pr1": {
			x: 14,
			on: "pvm-9042qm",
			ry: -9
		},
		"kv-5200": {
			x: -6,
			on: "kv-9pr1",
			ry: 6
		}
	},
	row: {
		"kv-5200": {
			x: -560,
			ry: 16,
			z: 30
		},
		"pvm-9042qm": {
			x: -330,
			ry: 9,
			z: -40
		},
		"pvm-20m4e": {
			x: 30,
			ry: -2
		},
		"kv-9pr1": {
			x: 420,
			ry: -13,
			z: 20
		}
	},
	scatter: {
		"pvm-20m4e": {
			x: -190,
			ry: 8,
			z: -60
		},
		"pvm-9042qm": {
			x: -130,
			on: "pvm-20m4e",
			ry: -12,
			z: -60
		},
		"kv-9pr1": {
			x: 290,
			ry: -16,
			z: 90
		},
		"kv-5200": {
			x: 296,
			on: "kv-9pr1",
			ry: -4,
			z: 96
		}
	}
}, Rp = (e, t, n) => Math.min(n, Math.max(t, e)), zp = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, Bp = "\n:host { display: block; position: relative; width: 100%; height: 100vh; height: 100dvh; }\n.wall { position: absolute; inset: 0; overflow-x: hidden; overflow-y: auto; scrollbar-width: none; overscroll-behavior-y: auto;\n  -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }\n.wall::-webkit-scrollbar { display: none; }\n.wall.locked { overflow-y: hidden; touch-action: none; }\n.view { position: sticky; top: 0; height: 100%; overflow: hidden; }\n.grain { position: absolute; inset: 0; z-index: 2; pointer-events: none; background-size: 256px 256px; opacity: 0; }\n.ui { position: absolute; inset: 0; z-index: 3; pointer-events: none; font: 500 14px/1.45 system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif; }\n.ui > * { pointer-events: auto; }\n.ui .back { top: max(14px, env(safe-area-inset-top, 0px)); left: max(14px, env(safe-area-inset-left, 0px)); }\n.fill { position: absolute; top: max(14px, env(safe-area-inset-top, 0px)); left: calc(max(14px, env(safe-area-inset-left, 0px)) + 92px); padding: 8px 14px; border-radius: 999px;\n  border: 1px solid rgba(255, 255, 255, 0.22); background: rgba(18, 18, 18, 0.72); color: #f2f2f2; font: 500 13px/1 system-ui, sans-serif; cursor: pointer;\n  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }\n.fill:hover { background: rgba(40, 40, 40, 0.85); }\n.fill:focus-visible, .card button:focus-visible, .card a:focus-visible { outline: 2px solid #7fb4ff; outline-offset: 2px; }\n.card { position: absolute; left: 50%; bottom: max(18px, env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); width: min(440px, calc(100% - 32px));\n  box-sizing: border-box; padding: 16px 18px; border-radius: 12px; background: rgba(20, 19, 18, 0.92); color: #ece8e0;\n  border: 1px solid rgba(255, 255, 255, 0.14); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);\n  display: flex; flex-direction: column; gap: 6px; max-height: 46%; overflow-y: auto; }\n.card-type { font: 600 11px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: 0.1em; text-transform: uppercase; color: #a39e93; }\n.card-title { margin: 0; font-size: 20px; line-height: 1.2; }\n.card-sub { margin: 0; color: #c9c4ba; }\n.card-body { color: #c9c4ba; }\n.card-row { display: flex; gap: 8px; margin-top: 8px; }\n.card a, .card button { font: 600 13px/1 system-ui, sans-serif; padding: 10px 14px; border-radius: 8px; cursor: pointer; text-decoration: none; }\n.card a { background: #ece8e0; color: #151413; border: 1px solid #ece8e0; }\n.card button { background: transparent; color: #ece8e0; border: 1px solid rgba(255, 255, 255, 0.25); }\n.card[hidden], .fill[hidden], .reader[hidden] { display: none; }\n.reader { position: absolute; inset: 0; z-index: 6; overflow: hidden; opacity: 0; transition: opacity 0.28s ease; background: #0b0b0b; }\n.reader.open { opacity: 1; }\n.reader-page { position: absolute; inset: 0; overflow: auto; -webkit-overflow-scrolling: touch; user-select: text; -webkit-user-select: text; }\n.reader ::slotted(*) { box-sizing: border-box; min-height: 100%; width: 100%; }\n.reader ::slotted(iframe) { height: 100%; border: 0; display: block; }\n.reader .reader-close { position: fixed; z-index: 2; }\n@media (prefers-reduced-motion: reduce) { .reader { transition: none; } }\n.ui .hint { bottom: max(14px, env(safe-area-inset-bottom, 0px)); }\n.fallback { display: none; padding: 16px; color: inherit; }\n:host(.nogl) .wall, :host(.nogl) .ui { display: none; }\n:host(.nogl) .fallback { display: block; }\n:host(.nogl) { height: auto; }\n";
function Vp() {
	let e = document.createElement("canvas");
	e.width = 256, e.height = 160;
	let t = e.getContext("2d"), n = 23, r = () => (n = n * 1664525 + 1013904223 >>> 0) / 4294967296;
	for (let e = 0; e < 70; e++) {
		let e = 40 + r() * 176, n = 40 + r() * 80, i = 8 + r() * 30, a = t.createRadialGradient(e, n, 0, e, n, i);
		a.addColorStop(0, `rgba(255,255,255,${.04 + r() * r() * .3})`), a.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = a, t.fillRect(e - i, n - i, i * 2, i * 2);
	}
	let i = new Oi(e);
	return i.colorSpace = Je, i;
}
function Hp(e, t) {
	let n = document.createElement("canvas");
	n.width = n.height = 256;
	let r = n.getContext("2d");
	r.fillStyle = "#8c8c8c", r.fillRect(0, 0, 256, 256);
	let i = 5, a = () => (i = i * 1664525 + 1013904223 >>> 0) / 4294967296;
	for (let e = 0; e < 22e3; e++) {
		let e = 60 + Math.floor(a() * 170);
		r.fillStyle = `rgba(${e},${e},${e},0.55)`;
		let t = a() * 256, n = a() * 256, i = a() * Math.PI;
		r.fillRect(t, n, 1 + Math.abs(Math.cos(i)) * 2, 1 + Math.abs(Math.sin(i)) * 2);
	}
	let o = (e) => {
		let r = new Oi(n);
		return e && (r.colorSpace = Je), r.wrapS = r.wrapT = d, r.repeat.set(t, t), r.anisotropy = 8, r;
	};
	return {
		color: new G(e).multiplyScalar(1.15),
		map: o(!0),
		bumpMap: o(!1),
		bumpScale: 1.6,
		roughness: 1,
		metalness: 0
	};
}
function Up(e, t = !1) {
	let n = document.createElement("canvas");
	n.width = n.height = 512;
	let r = n.getContext("2d");
	r.fillStyle = "#1b1b1c", r.fillRect(0, 0, 512, 512);
	let i = t ? 41 : 17, a = () => (i = i * 1664525 + 1013904223 >>> 0) / 4294967296;
	for (let e = 0; e < 260; e++) {
		let e = a() * 512, t = a() * 512, n = 20 + a() * 90, i = a() < .5 ? 0 : 60, o = r.createRadialGradient(e, t, 0, e, t, n);
		o.addColorStop(0, `rgba(${i},${i},${i},${.05 + a() * .08})`), o.addColorStop(1, `rgba(${i},${i},${i},0)`), r.fillStyle = o;
		for (let [i, a] of [
			[0, 0],
			[512, 0],
			[-512, 0],
			[0, 512],
			[0, -512]
		]) r.fillRect(e - n + i, t - n + a, n * 2, n * 2);
	}
	for (let e = 0; e < 5e3; e++) {
		let e = a() < .5 ? 0 : 90;
		r.fillStyle = `rgba(${e},${e},${e},${a() * .12})`, r.fillRect(a() * 512, a() * 512, 1 + a() * 1.5, 1 + a() * 1.5);
	}
	if (t) {
		r.fillStyle = "rgba(0,0,0,0.55)", r.fillRect(0, 0, 512, 2), r.fillRect(0, 0, 2, 512), r.fillStyle = "rgba(70,70,70,0.25)", r.fillRect(0, 2, 512, 1), r.fillRect(2, 0, 1, 512);
		for (let [e, t] of [
			[64, 96],
			[448, 96],
			[64, 416],
			[448, 416]
		]) r.fillStyle = "rgba(0,0,0,0.6)", r.beginPath(), r.arc(e, t, 5, 0, Math.PI * 2), r.fill();
	}
	let o = new Oi(n);
	return o.colorSpace = Je, o.wrapS = o.wrapT = d, o.repeat.set(e, t ? 5e3 / 9e3 * e : e), o.anisotropy = 8, o;
}
var Wp = typeof HTMLElement < "u" ? HTMLElement : class {}, Gp = class extends Wp {
	static get observedAttributes() {
		return [
			"stack",
			"arrange",
			"layout",
			"brand",
			"muted",
			"power",
			"scene",
			"lighting",
			"wall",
			"backlight",
			"consoles",
			"floor",
			"floor-color",
			"smoke",
			"grain",
			"front-light"
		];
	}
	constructor() {
		super(), this._units = {}, this._items = [], this._tweens = /* @__PURE__ */ new Map(), this._sound = new Df(), this._f = 0, this._focus = null, this._focusKey = null, this._selected = -1, this._par = {
			x: 0,
			y: 0
		}, this._frame = this._frame.bind(this), this._onKey = (e) => {
			e.key === "Escape" && (this._reading ? this.closeReader() : this._selected >= 0 ? this.close() : this.unfocus());
		};
		let e = this.attachShadow({ mode: "open" });
		e.innerHTML = `<style>${Nf}${Bp}</style>
      <div class="wall" part="wall"><div class="view"><div class="css"></div><canvas aria-hidden="true"></canvas><div class="grain" aria-hidden="true"></div></div><div class="spacer"></div></div>
      <div class="ui">
        <button class="back" part="back" type="button" hidden>&larr; Back</button>
        <button class="fill" part="fill" type="button" hidden>Read full screen</button>
        <div class="card" part="card" hidden>
          <span class="card-type"></span><h3 class="card-title"></h3><p class="card-sub"></p>
          <div class="card-body"><slot name="card"></slot></div>
          <div class="card-row"><a class="card-link" hidden>Open</a><button class="card-close" type="button">Put it back</button></div>
        </div>
        <div class="reader" part="reader" hidden><div class="reader-page"><slot name="reader"></slot></div>
          <button class="reader-close back" part="reader-close" type="button">&larr; Back to the TV</button></div>
        <div class="hint" part="hint">Tap a TV, a game or a book</div>
      </div>
      <div class="sr" role="group" aria-label="Shelf"></div>
      <div class="fallback"><slot name="fallback">This page needs WebGL to show the 3D shelf.</slot></div>`;
		let t = (t) => e.querySelector(t);
		this._wall = t(".wall"), this._view = t(".view"), this._cssLayer = t(".css"), this._canvas = t("canvas"), this._spacer = t(".spacer"), this._back = t(".back"), this._readBtn = t(".fill"), this._reader = t(".reader"), this._card = t(".card"), this._hint = t(".hint"), this._sr = t(".sr"), this._back.addEventListener("click", () => this.unfocus()), this._readBtn.addEventListener("click", () => this.openReader()), t(".reader-close").addEventListener("click", () => this.closeReader()), t(".card-close").addEventListener("click", () => this.close());
		let n = this._wall;
		n.addEventListener("pointerdown", (e) => this._onDown(e)), n.addEventListener("pointermove", (e) => this._onMove(e)), n.addEventListener("pointerup", (e) => this._onUp(e)), n.addEventListener("pointercancel", () => {
			this._releaseButton(), this._drag = null;
		}), n.addEventListener("pointerleave", () => this._hover(null)), n.addEventListener("scroll", () => {
			this._selected >= 0 && this.close(), this.invalidate();
		}, { passive: !0 });
	}
	connectedCallback() {
		this._inited || (this._inited = !0, this._init()), this._renderer && (this._ro = new ResizeObserver(() => this._resize()), this._ro.observe(this), this._mo = new MutationObserver(() => {
			clearTimeout(this._moT), this._moT = setTimeout(() => this._rebuild(), 30);
		}), this._mo.observe(this, {
			childList: !0,
			subtree: !0,
			attributes: !0,
			attributeFilter: [
				"type",
				"title",
				"subtitle",
				"color",
				"cover",
				"thickness",
				"height",
				"binding"
			]
		}), window.addEventListener("keydown", this._onKey), this._resize());
	}
	disconnectedCallback() {
		this._ro?.disconnect(), this._mo?.disconnect(), window.removeEventListener("keydown", this._onKey), this._raf && cancelAnimationFrame(this._raf), this._raf = 0;
	}
	attributeChangedCallback(e, t, n) {
		if (e === "muted" && (this._sound.muted = n !== null), e === "grain" && this._applyGrain(), this._renderer) {
			if ([
				"stack",
				"layout",
				"arrange",
				"scene",
				"lighting",
				"wall",
				"backlight",
				"consoles",
				"floor",
				"floor-color",
				"smoke",
				"front-light"
			].includes(e) && this._rebuild(), e === "brand") for (let e of Object.values(this._units)) e.setBrand(n);
			e === "power" && this._applyPowerAttr();
		}
	}
	_init() {
		let e;
		try {
			e = new Lu({
				canvas: this._canvas,
				antialias: !0,
				alpha: !0,
				powerPreference: "high-performance"
			});
		} catch {
			this.classList.add("nogl");
			return;
		}
		this._renderer = e, e.setClearColor(0, 0), e.toneMapping = 7, e.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		let t = this._scene = new Gn(), n = new Js(e);
		t.environment = n.fromScene(new Gu(), .04).texture, t.environmentIntensity = .6, n.dispose();
		let r = new as(16777215, 2.1);
		r.position.set(-500, 1700, 1500), t.add(r), this._key = r;
		let i = new as(14674175, .5);
		i.position.set(700, 300, 1200), t.add(i), this._fill = i, this._camera = new Qo(28, 1, 50, 3e4), this._css = new Wu({ element: this._cssLayer }), this._ray = new Cs(), this._reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !1, this._world = new Ln(), t.add(this._world), this._furniture = new Ln(), this._world.add(this._furniture);
		let a = (e) => ({
			parent: e,
			invalidate: () => this.invalidate(),
			sound: this._sound,
			reduced: this._reduced,
			el: this
		});
		for (let e of Fp) {
			let t = new Ln();
			t.userData.unit = e, this._world.add(t);
			let n = new Lf();
			n.setAttribute("model", e), n._attachHost(a(t), e), n._parent = t, n.addEventListener("pvm-power", () => this._syncGlow());
			for (let t of [
				"pvm-power",
				"pvm-button",
				"pvm-knob",
				"pvm-input",
				"pvm-degauss"
			]) n.addEventListener(t, (n) => this.dispatchEvent(new CustomEvent(t, {
				detail: {
					...n.detail,
					tv: e
				},
				bubbles: !0,
				composed: !0
			})));
			this._units[e] = n;
		}
		if (this.hasAttribute("brand")) for (let e of Object.values(this._units)) e.setBrand(this.getAttribute("brand"));
		this._applyPowerAttr(), this._ready = !0, this._applyGrain(), this._rebuild(), requestAnimationFrame(() => this._buildGlow()), window.addEventListener("load", () => this._buildGlow(), { once: !0 }), this.dispatchEvent(new CustomEvent("shelf-ready", {
			bubbles: !0,
			composed: !0
		}));
	}
	_applyPowerAttr() {
		let e = this.getAttribute("power"), t = e === null || e === "all" ? Fp : e.split(/[\s,]+/);
		this._sound.muted = !0;
		for (let e of Fp) this._units[e].power = t.includes(e);
		this._sound.muted = this.hasAttribute("muted");
	}
	_applyGrain() {
		let e = this.shadowRoot.querySelector(".grain");
		if (!this.hasAttribute("grain")) e.style.opacity = 0;
		else {
			if (!e.style.backgroundImage) {
				let t = document.createElement("canvas");
				t.width = t.height = 512;
				let n = t.getContext("2d"), r = n.createImageData(512, 512);
				for (let e = 0; e < r.data.length; e += 4) {
					let t = (Math.random() + Math.random() + Math.random()) / 3 - .5;
					r.data[e] = r.data[e + 1] = r.data[e + 2] = t > 0 ? 235 : 0, r.data[e + 3] = Math.min(255, Math.abs(t) * 2 * 255);
				}
				n.putImageData(r, 0, 0), e.style.backgroundImage = `url(${t.toDataURL()})`;
			}
			e.style.opacity = Math.max(0, Math.min(1, .2 * (parseFloat(this.getAttribute("grain")) || 1)));
		}
	}
	tv(e) {
		return this._units[e];
	}
	_mode() {
		let e = this.getAttribute("layout");
		return e === "wide" || e === "tall" ? e : (this.clientWidth || 1) / (this.clientHeight || 1) < .9 ? "tall" : "wide";
	}
	_dispose(e) {
		e.traverse((e) => {
			e.geometry?.dispose();
			for (let t of [].concat(e.material || [])) t.map?.dispose(), t.dispose();
		}), e.clear();
	}
	_rebuild() {
		if (!this._ready) return;
		this._selected >= 0 && this.close(!0), this._dispose(this._furniture);
		let e = this._builtMode = this._mode(), t = this.getAttribute("scene") === "floor", n = this.getAttribute("lighting"), r = n === "dim", i = n === "dark" || r, a = this.hasAttribute("front-light") ? Math.max(0, parseFloat(this.getAttribute("front-light")) || 0) : 1;
		this._key.intensity = r ? .22 : i ? 0 : 2.1, this._fill.intensity = r ? .3 : i ? .24 * a : .5, this._fill.color.set(i ? 16773596 : 14674175), this._fill.position.set(i ? 150 : 700, i ? 520 : 300, i ? 1600 : 1200), this._scene.environmentIntensity = r ? .16 : i ? .014 : .6, this._room = r ? .3 : i ? .06 : 1;
		let o = t && this.hasAttribute("consoles");
		this._floorPad = o ? 330 : t ? 190 : 0, this._hintHome = t ? "Tap a TV to look closer" : "Tap a TV, a game or a book", this._hint.textContent = this._hintHome, this._focusKey || this._say(this._hintHome), this._pitch = t ? o ? .27 : .12 : 0;
		let s = t ? {
			height: 0,
			width: 0,
			depth: 520,
			cells: []
		} : op({
			cols: 1,
			rows: 2,
			cellW: e === "wide" ? 980 : 860
		});
		if (t || this._furniture.add(s.group), t || i) {
			let e = new K(new Za(6e4, 6e4).rotateX(-Math.PI / 2), new q(i ? this.getAttribute("floor") === "carpet" ? Hp(this.getAttribute("floor-color") || "#55682f", 200) : {
				color: 9079434,
				map: Up(6e4 / 1400),
				roughness: .5,
				metalness: 0
			} : {
				color: 2762790,
				roughness: .5,
				metalness: 0
			}));
			e.position.set(0, -.5, 0), e.raycast = () => {}, this._furniture.add(e);
		}
		let c = this.getAttribute("backlight");
		if (this.hasAttribute("wall") || c !== null) {
			let e = new K(new Za(9e3, 5e3), new q({
				color: 10132122,
				map: Up(9e3 / 1400, !0),
				roughness: .88
			}));
			e.position.set(0, 2500, -760), e.raycast = () => {}, this._furniture.add(e);
		}
		if (!i && !t) {
			let e = new K(new Za(s.width + 260, s.depth + 260).rotateX(-Math.PI / 2), new Zr({
				map: rd(s.width, s.depth, 130),
				transparent: !0,
				depthWrite: !1,
				toneMapped: !1
			}));
			e.position.set(0, .5, -s.depth / 2), e.raycast = () => {}, this._furniture.add(e);
		}
		let l = (this.getAttribute("stack") || "pyramid").trim().split(/\s+/), u = Lp[e === "tall" && l[1] ? l[1] : l[0]] || Lp.pyramid;
		this._dark = i;
		let d = {}, f = s.height, p = -s.width / 2, m = s.width / 2, h = (e) => {
			if (e in d) return d[e];
			let n = u[e], r = Tf[e].META.size, a = n.on ? h(n.on) + Tf[n.on].META.size.h : s.height, o = this._units[e]._parent;
			return o.position.set(n.x, a, Ip - r.d / 2 + (n.z || 0)), o.rotation.y = Rt.degToRad(n.ry || 0), o.updateMatrixWorld(!0), f = Math.max(f, a + (e === "kv-5200" ? 269 : r.h)), this._units[e]._m.shadow.visible = !i && t && !n.on, p = Math.min(p, n.x - r.w / 2), m = Math.max(m, n.x + r.w / 2), d[e] = a;
		};
		if (Fp.forEach(h), this._buildGlow(), this._bounds = {
			w: Math.max(-p, m) * 2,
			h: f
		}, c !== null) {
			let e = new G(c || "#10a045"), t = this._bounds.w / 2;
			for (let [n, r, i] of [
				[
					-t * 1.5,
					120,
					1
				],
				[
					t * 1.5,
					120,
					.8
				],
				[
					0,
					60,
					.35
				]
			]) {
				let t = new ns(e, 15e4 * i, 0, 2);
				t.position.set(n, r, -560), this._furniture.add(t);
			}
		}
		if (this._smoke = [], this.hasAttribute("smoke")) {
			let e = new G(c || (c === "" ? "#10a045" : "#8a8f8c")), t = Math.max(.2, Math.min(3, parseFloat(this.getAttribute("smoke")) || 1)), n = Vp(), r = Math.max(this._bounds.w / 2, 500), i = 11, a = () => (i = i * 1664525 + 1013904223 >>> 0) / 4294967296;
			for (let i = 0; i < 14; i++) {
				let o = i < 9, s = 900 + a() * 1100, c = new Zr({
					map: n,
					color: e,
					transparent: !0,
					depthWrite: !1,
					blending: 2,
					opacity: (o ? .13 : .04) * t,
					toneMapped: !1
				}), l = new K(new Za(s, s * .6), c);
				l.position.set((a() - .5) * r * 4.2, o ? 120 + a() * f * .9 : 40 + a() * 160, o ? -330 - a() * 380 : 140 + a() * 420), l.rotation.z = (a() - .5) * .8, l.raycast = () => {}, l.renderOrder = 5;
				let u = a() * 6.28, d = 90 + a() * 180;
				l.position.x += Math.sin(u) * d, l.position.y += Math.sin(u * 2) * 30, l.rotation.z += Math.sin(u) * .25, c.opacity *= .75 + .25 * Math.sin(u * 3), this._furniture.add(l), this._smoke.push(l);
			}
		}
		if (o) {
			let t = Math.max(this._bounds.w / 2 + 120, e === "tall" ? 330 : 520), n = e === "tall" ? [
				[
					"ps-one",
					-.5,
					250,
					.2
				],
				[
					"dualshock",
					.42,
					330,
					-.5
				],
				[
					"gba",
					-.62,
					520,
					-.3
				],
				[
					"ps-vita",
					.2,
					560,
					.16
				],
				[
					"psp-go",
					.72,
					150,
					.5
				]
			] : [
				[
					"ps-one",
					-.42,
					300,
					.22
				],
				[
					"dualshock",
					-.1,
					420,
					-.4
				],
				[
					"gba",
					-.86,
					430,
					.5
				],
				[
					"ps-vita",
					.34,
					360,
					-.2
				],
				[
					"psp-go",
					.8,
					470,
					.34
				]
			], r = {
				gba: 13627083,
				"ps-vita": 9419007,
				"psp-go": 11126527
			};
			for (let [e, a, o, s] of n) {
				let n = Tp[e](), c = new Ln();
				if (c.add(n), r[e]) {
					n.rotation.x = -Math.PI / 2, n.traverse((t) => {
						t.name === "lcd" && (t.material = new Zr({ color: r[e] }));
					});
					let t = new ns(r[e], i ? 15e3 : 0, 0, 2);
					t.position.set(0, 90, e === "psp-go" ? -75 : -42), c.add(t);
				}
				c.position.set(a * t, 0, o), c.rotation.y = s, c.traverse((e) => {
					e.raycast = () => {};
				}), this._furniture.add(c);
			}
			this._bounds.w = Math.max(this._bounds.w, t * 2 + 120);
		}
		if (this._items = [], t) {
			this._buildA11y(), this._fit(), this._focusKey && this._aim();
			return;
		}
		let g = [...this.querySelectorAll("retro-item")].map((e) => ({
			el: e,
			type: (e.getAttribute("type") || "book").toLowerCase(),
			title: e.getAttribute("title") || e.textContent.trim().slice(0, 40),
			subtitle: e.getAttribute("subtitle") || "",
			color: e.getAttribute("color") || "",
			cover: e.getAttribute("cover"),
			t: e.getAttribute("thickness"),
			h: e.getAttribute("height"),
			binding: e.getAttribute("binding")
		})).map((e) => {
			let t = ip(e);
			return t.userData.el = e.el, t;
		});
		for (let e of Pp(this.getAttribute("arrange") || "browsed", s.cells, g, (e) => Tp[e]())) {
			if (e.userData.spec) {
				e.userData.home = {
					pos: e.position.clone(),
					quat: e.quaternion.clone()
				}, e.userData.item = this._items.length, this._items.push(e);
				let t = e.userData.el.getAttribute("cover");
				t && this._loadCover(e, t);
			}
			this._furniture.add(e);
		}
		this._buildA11y(), this._fit(), this._focusKey && this._aim();
	}
	_buildGlow() {
		for (let e of Fp) {
			let t = this._units[e], n = t._parent, r = t._m.picture;
			if (t._glow && (n.remove(t._glow, t._glow.target), t._glow.dispose(), t._glow = null), t._m.crtMaterial.uniforms.uRoom.value = this._room ?? 1, !this._dark) continue;
			let i = this.querySelector(`[slot="${e}"]`), a = i ? getComputedStyle(i).backgroundColor : "", o = new G(!a || a === "transparent" || a.endsWith(", 0)") ? "#cfe0ff" : a), s = o.getHSL({});
			o.setHSL(s.h, Math.min(s.s, .8), Math.max(s.l, .55));
			let c = new es(o, 0, 0, 1.25, 1, 1.7);
			c.position.set(r.cx, r.cy, r.z), c.target.position.set(r.cx, r.cy - 160, r.z + 400), n.add(c.target), c.userData.full = r.w * r.h * (this._room > .1 ? .75 : .2);
			let l = new ns(o, 0, 0, 1.7);
			l.position.set(0, 0, r.w * .9), l.userData.full = r.w * r.h * (this._room > .1 ? .05 : .012), c.add(l), n.add(c), t._glow = c;
		}
		this._syncGlow();
	}
	_syncGlow() {
		if (this._units) {
			for (let e of Object.values(this._units)) if (e._glow) for (let t of [e._glow, ...e._glow.children]) t.intensity = e.power ? t.userData.full : 0;
			this.invalidate();
		}
	}
	_loadCover(e, t) {
		let n = new Image();
		n.crossOrigin = "anonymous", n.onload = () => {
			e.userData.setCoverImage(n), this.invalidate();
		}, n.onerror = () => console.warn(`retro-shelf: could not load cover "${t}"`), n.src = t;
	}
	_buildA11y() {
		this._sr.textContent = "";
		let e = (e, t) => {
			let n = document.createElement("button");
			n.type = "button", n.textContent = e, n.addEventListener("click", t), this._sr.append(n);
		};
		for (let t of Fp) e(`Look at the ${Tf[t].META.name}`, () => this.focusTV(t)), e(`Read the ${Tf[t].META.name} page full screen`, () => this.openReader(t)), this._sr.append(this._units[t]._sr);
		this._items.forEach((t, n) => e(`${Rf[t.userData.spec.type].name}: ${t.userData.spec.title}`, () => this.select(n)));
	}
	_resize() {
		if (!this._renderer) return;
		let e = this.clientWidth || 1, t = this.clientHeight || 1;
		this._renderer.setSize(e, t, !1), this._css.setSize(e, t), this._camera.aspect = e / t, this._camera.updateProjectionMatrix(), !this.hasAttribute("layout") && this._builtMode && this._mode() !== this._builtMode ? this._rebuild() : this._fit();
	}
	_fit() {
		if (!this._bounds) return;
		let e = this._camera, t = this.clientHeight || 1, n = Math.tan(Rt.degToRad(e.fov / 2)), r = n * e.aspect;
		this._tan = {
			v: n,
			h: r
		};
		let i = this._floorPad || 0, a = this._bounds.w * 1.08, o = this._bounds.h + 110 + i, s = a / 2 / r, c = o / 2 / n, l = e.aspect >= 1 || c <= s * 1.15, u = this._over = {
			d: l ? Math.max(s, c) : s,
			top: this._bounds.h + 70
		};
		u.viewH = 2 * u.d * n, u.range = Math.max(0, o - u.viewH), u.pxPerMm = t / u.viewH, this._spacer.style.height = u.range > 4 ? `${Math.round(u.range * u.pxPerMm)}px` : "0", u.range <= 4 && (u.top = (this._bounds.h + 30 - i) / 2 + u.viewH / 2), this._focusKey && this._aim(), this.invalidate();
	}
	invalidate() {
		!this._raf && this._ready && this.isConnected && (this._raf = requestAnimationFrame(this._frame));
	}
	_tween(e, t, n, r) {
		this._reduced || t <= 0 ? (this._tweens.delete(e), n(1), r?.()) : this._tweens.set(e, {
			start: performance.now(),
			dur: t,
			fn: n,
			done: r
		}), this.invalidate();
	}
	_frame(e) {
		this._raf = 0;
		let t = !1;
		for (let [n, r] of this._tweens) {
			let i = Math.min((e - r.start) / r.dur, 1);
			r.fn(zp(i)), i >= 1 ? (this._tweens.delete(n), r.done?.()) : t = !0;
		}
		let n = this._over, r = this._camera, i = n.top - n.viewH / 2 - this._wall.scrollTop / n.pxPerMm, a = this._par.x * 26, o = this._par.y * 16, s = this._f, c = this._focus;
		if (c && s > 0) {
			let e = i + o + n.d * Math.tan(this._pitch || 0);
			r.position.set(a + (c.pos.x - a) * s, e + (c.pos.y - e) * s, n.d + (c.pos.z - n.d) * s), r.lookAt(a * .4 + (c.look.x - a * .4) * s, i + o * .4 + (c.look.y - i - o * .4) * s, c.look.z * s);
		} else r.position.set(a, i + o + n.d * Math.tan(this._pitch || 0), n.d), r.lookAt(a * .4, i + o * .4, 0);
		r.updateMatrixWorld();
		for (let n of Object.values(this._units)) n._tick(e, r) && (t = !0);
		this._renderer.render(this._scene, r), this._css.render(this._scene, r), t && this.invalidate();
	}
	_aim() {
		let e = this._units[this._focusKey], t = e._parent, n = e._meta.size, r = e._m.picture, i = this._fillScreen ? new U(r.cx, r.cy, r.z) : new U(0, n.h / 2, n.d / 2), a = this._fillScreen ? r.w : n.w, o = this._fillScreen ? r.h : n.h, s = this._fillScreen ? 1.04 : 1.12, c = Math.max(o / 2 * s / this._tan.v, a / 2 * s / this._tan.h), l = t.localToWorld(i.clone()), u = t.localToWorld(i.clone().add(new U(0, 0, c)));
		this._focus = {
			pos: u,
			look: l
		}, this.invalidate();
	}
	focusTV(e) {
		if (!this._units[e] || !this._ready) return;
		this._selected >= 0 && this.close(!0);
		let t = this._focus && this._f > 0 ? {
			pos: this._focus.pos.clone(),
			look: this._focus.look.clone()
		} : null;
		this._focusKey && this._setScreenLive(this._focusKey, !1), this._focusKey = e, this._aim();
		let n = this._focus, r = this._f;
		if (t) {
			let e = {
				pos: t.pos.clone(),
				look: t.look.clone()
			};
			this._focus = e, this._tween("focus", 650, (i) => {
				e.pos.lerpVectors(t.pos, n.pos, i), e.look.lerpVectors(t.look, n.look, i), this._f = r + (1 - r) * i;
			}, () => {
				this._focus = n;
			});
		} else this._tween("focus", 850, (e) => {
			this._f = r + (1 - r) * e;
		});
		this._setScreenLive(e, !0), this._wall.classList.add("locked"), this._back.hidden = !1, this._readBtn.hidden = !1, this._hint.textContent = "Tap the screen to read it full screen", this._say(this._hint.textContent), this._hint.classList.remove("gone"), clearTimeout(this._hintT), this._hintT = setTimeout(() => this._hint.classList.add("gone"), 3200), this.dispatchEvent(new CustomEvent("shelf-focus", {
			detail: { tv: e },
			bubbles: !0,
			composed: !0
		}));
	}
	unfocus() {
		if (!this._focusKey) return;
		this._reading && this.closeReader(), this._setScreenLive(this._focusKey, !1), this._focusKey = null;
		let e = this._f;
		this._tween("focus", 750, (t) => {
			this._f = e * (1 - t);
		}), this._wall.classList.remove("locked"), this._back.hidden = !0, this._readBtn.hidden = !0, clearTimeout(this._hintT), this._hint.classList.add("gone"), this._setFill(!1, !0), this._say(this._hintHome), this.dispatchEvent(new CustomEvent("shelf-focus", {
			detail: { tv: null },
			bubbles: !0,
			composed: !0
		}));
	}
	_setScreenLive(e, t) {
		let n = this._units[e];
		n.state.focused = t, n._m.crtMaterial.uniforms.uGlare.value = t ? .35 : 1, this.invalidate();
	}
	_setFill(e, t = !1) {
		if (this._fillScreen = e, t || !this._focusKey) return;
		let n = {
			pos: this._focus.pos.clone(),
			look: this._focus.look.clone()
		};
		this._aim();
		let r = this._focus, i = {
			pos: n.pos.clone(),
			look: n.look.clone()
		};
		this._focus = i;
		let a = this._f;
		this._tween("focus", 500, (e) => {
			i.pos.lerpVectors(n.pos, r.pos, e), i.look.lerpVectors(n.look, r.look, e), this._f = a + (1 - a) * e;
		}, () => {
			this._focus = r;
		});
	}
	openReader(e = this._focusKey) {
		if (!e || this._reading?.id === e) return;
		let t = this.querySelector(`[slot="${e}"]`);
		if (t) {
			if (this._reading) {
				let n = this._reading;
				clearTimeout(this._readT), n.page.setAttribute("slot", n.id), this.dispatchEvent(new CustomEvent("shelf-read", {
					detail: {
						tv: n.id,
						open: !1
					},
					bubbles: !0,
					composed: !0
				})), this._reading = null, this.focusTV(e), this._reading = {
					id: e,
					page: t
				}, this._paintReader(t), t.setAttribute("slot", "reader"), this._reader.querySelector(".reader-page").scrollTop = 0, this._say("Reading. Press Esc or Back to return"), this.dispatchEvent(new CustomEvent("shelf-read", {
					detail: {
						tv: e,
						open: !0
					},
					bubbles: !0,
					composed: !0
				}));
			} else e !== this._focusKey && this.focusTV(e), this._reading = {
				id: e,
				page: t
			}, this._paintReader(t), this._reader.hidden = !1, this._setFill(!0), requestAnimationFrame(() => this._reader.classList.add("open")), clearTimeout(this._readT), this._readT = setTimeout(() => {
				t.setAttribute("slot", "reader"), this._reader.querySelector(".reader-page").scrollTop = 0, this._reader.querySelector(".reader-close").focus({ preventScroll: !0 });
			}, this._reduced ? 0 : 260), this._back.hidden = !0, this._readBtn.hidden = !0, this._hint.classList.add("gone"), this._say("Reading. Press Esc or Back to return"), this.dispatchEvent(new CustomEvent("shelf-read", {
				detail: {
					tv: e,
					open: !0
				},
				bubbles: !0,
				composed: !0
			}));
		}
	}
	_paintReader(e) {
		let t = getComputedStyle(e).backgroundColor;
		this._reader.style.background = t && !t.endsWith(", 0)") && t !== "transparent" ? t : "#0b0b0b";
	}
	get hint() {
		return this._hintNow || "";
	}
	_say(e) {
		e !== this._hintNow && (this._hintNow = e, this.dispatchEvent(new CustomEvent("shelf-hint", {
			detail: { text: e },
			bubbles: !0,
			composed: !0
		})));
	}
	page(e) {
		return this._reading?.id === e ? this._reading.page : this.querySelector(`[slot="${e}"]`);
	}
	closeReader() {
		let e = this._reading;
		e && (this._reading = null, clearTimeout(this._readT), e.page.setAttribute("slot", e.id), this._reader.classList.remove("open"), this._readT = setTimeout(() => {
			this._reader.hidden = !0;
		}, this._reduced ? 0 : 300), this._focusKey && (this._setFill(!1), this._back.hidden = !1, this._readBtn.hidden = !1, this._say("Tap the screen to read it full screen")), this.dispatchEvent(new CustomEvent("shelf-read", {
			detail: {
				tv: e.id,
				open: !1
			},
			bubbles: !0,
			composed: !0
		})));
	}
	select(e) {
		let t = typeof e == "number" ? e : this._items.findIndex((t) => t.userData.el === e), n = this._items[t];
		if (!n || t === this._selected) return;
		this._focusKey && this.unfocus(), this._selected >= 0 && this.close(!0), this._selected = t;
		let r = n.userData.spec, i = this._camera, a = this._over;
		n.userData.ensureCover(), this._sound.click(.5, 1500);
		let o = Math.min(a.d - 120, Math.max(r.h / (2 * this._tan.v * .42), (r.d + 30) / (2 * this._tan.h * .6))), s = new U(i.position.x, i.position.y + o * this._tan.v * .3, i.position.z - o), c = n.userData.home, l = c.pos.clone();
		l.z = 70 + r.d / 2;
		let u = new zt().setFromAxisAngle(new U(0, 1, 0), -Math.PI / 2 + .32);
		this._tween("item" + t, 620, (e) => {
			let t = Math.min(e / .35, 1), r = Math.max((e - .25) / .75, 0);
			n.position.lerpVectors(c.pos, l, t).lerp(s, r), n.quaternion.slerpQuaternions(c.quat, u, r);
		});
		let d = n.userData.el, f = (e) => this._card.querySelector(e);
		for (let e of this.querySelectorAll("retro-item[slot=\"card\"]")) e.removeAttribute("slot");
		d.setAttribute("slot", "card"), f(".card-type").textContent = Rf[r.type].name, f(".card-title").textContent = r.title, f(".card-sub").textContent = r.subtitle, f(".card-sub").hidden = !r.subtitle;
		let p = f(".card-link"), m = d.getAttribute("href");
		p.hidden = !m, m && (p.href = m, p.textContent = d.getAttribute("link-text") || "Open"), this._card.hidden = !1, this._hint.classList.add("gone"), this.dispatchEvent(new CustomEvent("shelf-select", {
			detail: {
				item: d,
				index: t
			},
			bubbles: !0,
			composed: !0
		}));
	}
	close(e = !1) {
		let t = this._selected, n = this._items[t];
		if (!n) return;
		this._selected = -1, this._card.hidden = !0, n.userData.el?.removeAttribute("slot");
		let r = n.position.clone(), i = n.quaternion.clone(), a = n.userData.home, o = (e) => {
			n.position.lerpVectors(r, a.pos, e), n.quaternion.slerpQuaternions(i, a.quat, e);
		};
		e ? (this._tweens.delete("item" + t), o(1), this.invalidate()) : this._tween("item" + t, 420, o), this.dispatchEvent(new CustomEvent("shelf-select", {
			detail: {
				item: null,
				index: -1
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_pick(e) {
		let t = this._view.getBoundingClientRect();
		this._ray.setFromCamera(new H((e.clientX - t.left) / t.width * 2 - 1, -((e.clientY - t.top) / t.height) * 2 + 1), this._camera);
		let n = this._ray.intersectObject(this._world, !0)[0];
		if (!n) return {};
		let r = {
			control: n.object.userData.control || null,
			screen: !!n.object.userData.screen
		};
		for (let e = n.object; e; e = e.parent) e.userData.item !== void 0 && (r.item = e.userData.item), e.userData.unit && (r.unit = e.userData.unit);
		return r;
	}
	_inLiveScreen() {
		return !1;
	}
	_onDown(e) {
		if (!this._ready || e.button > 0 || this._inLiveScreen(e)) return;
		let t = this._pick(e);
		this._drag = {
			x: e.clientX,
			y: e.clientY,
			moved: 0,
			hit: t
		};
		let n = t.unit && this._units[t.unit], r = t.control && n?._m.controls[t.control];
		if (r) {
			if (r.kind === "button") this._drag.button = {
				unit: n,
				id: r.id
			}, n._buttonDown(r.id);
			else if (this._focusKey === t.unit || e.pointerType === "mouse") {
				e.preventDefault();
				try {
					this._wall.setPointerCapture(e.pointerId);
				} catch {}
				this._drag.knob = {
					unit: n,
					id: r.id,
					v: n.getKnob(r.id)
				};
			}
		}
	}
	_onMove(e) {
		let t = this._drag;
		if (t?.knob) {
			t.knob.unit.setKnob(t.knob.id, t.knob.v + (e.clientX - t.x - (e.clientY - t.y)) * .005);
			return;
		}
		if (t && (t.moved = Math.max(t.moved, Math.hypot(e.clientX - t.x, e.clientY - t.y))), e.pointerType !== "mouse" || !this._ready) return;
		let n = this._view.getBoundingClientRect();
		if (this._par.x = Rp((e.clientX - n.left) / n.width * 2 - 1, -1, 1), this._par.y = -Rp((e.clientY - n.top) / n.height * 2 - 1, -1, 1), !t && !this._inLiveScreen(e)) {
			let t = this._pick(e);
			this._wall.style.cursor = t.control || t.item !== void 0 || t.unit && t.unit !== this._focusKey ? "pointer" : t.screen ? "zoom-in" : "", this._hover(t.unit || null);
		}
		this.invalidate();
	}
	_hover(e) {
		e !== this._hovered && (this._hovered = e, this.dispatchEvent(new CustomEvent("shelf-hover", {
			detail: { tv: e },
			bubbles: !0,
			composed: !0
		})));
	}
	_releaseButton() {
		let e = this._drag?.button;
		e && e.unit._buttonUp(e.id);
	}
	_onUp(e) {
		let t = this._drag;
		if (this._drag = null, !t) return;
		if (t.button) {
			t.button.unit._buttonUp(t.button.id);
			return;
		}
		if (t.knob || t.moved > 8) return;
		let n = t.hit;
		this._selected >= 0 && (n.item === this._selected || (this.close(), n.item === void 0)) || (n.item === void 0 ? n.unit ? n.unit === this._focusKey ? n.screen && this.openReader() : this.focusTV(n.unit) : this._focusKey && this.unfocus() : this.select(n.item));
	}
}, Kp = "\"Barlow Semi Condensed\", \"Arial Narrow\", Arial, sans-serif", qp = "\"IBM Plex Mono\", ui-monospace, Menlo, Consolas, monospace", Jp = "\"DotGothic16\", \"IBM Plex Mono\", ui-monospace, monospace", Yp = 560, Xp = -.2, Zp = "\n:host { display: block; position: relative; height: 128px; pointer-events: none; -webkit-tap-highlight-color: transparent; }\n:host([narrow]) { height: 176px; }\ncanvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.7)); }\n.pad { position: absolute; pointer-events: auto; touch-action: manipulation; }\n.keys { position: absolute; top: 0; left: 0; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }\n";
function Qp(e, t, n) {
	let r = 6.5, i = n ? n * r * 2 + (n - 1) * 3 : 0, a = {
		nav: [],
		extra: []
	};
	if (!e) {
		let e = t * 24 + Math.max(0, t - 1) * 4, o = 134 + e + (n ? 13 + i : 0) + 13, s = -o / 2 + 13;
		a.lcd = {
			x: s + 54,
			y: 0,
			w: 108,
			h: 30
		}, s += 121;
		for (let e = 0; e < t; e++) a.nav.push({
			x: s + 12 + e * 28,
			y: 0,
			w: 24,
			h: 22
		});
		s += e + 13;
		for (let e = 0; e < n; e++) a.extra.push({
			x: s + r + e * 16,
			y: 0,
			r
		});
		return a.led = {
			x: o / 2 - 12,
			y: 18.5
		}, Object.assign(a, {
			W: o,
			H: 52,
			r: 7
		});
	}
	let o = Math.max(89 + (n ? 6 + i : 0) + 11, 132), s = (o - 22 - Math.max(0, t - 1) * 4) / Math.max(1, t), c = o - 22 - (n ? 6 + i : 0);
	a.lcd = {
		x: -o / 2 + 11 + c / 2,
		y: 14,
		w: c,
		h: 24
	};
	for (let e = 0; e < n; e++) a.extra.push({
		x: o / 2 - 11 - i + r + e * 16,
		y: 14,
		r
	});
	for (let e = 0; e < t; e++) a.nav.push({
		x: -o / 2 + 11 + s / 2 + e * (s + 4),
		y: -16,
		w: s,
		h: 20
	});
	return a.led = {
		x: o / 2 - 10,
		y: 30.5
	}, Object.assign(a, {
		W: o,
		H: 74,
		r: 7
	});
}
function $p(e, t, n) {
	return qu([ud([
		Z(ld(e, 0, 0, 40), 0),
		Z(ld(e, 0, 0, 40), t - n),
		Z(ld(e - n, 0, 0, 40), t)
	]), Q(ld(e - n, 0, 0, 40), [], t)]);
}
function em(e, t) {
	let n = document.createElement("canvas");
	n.width = e, n.height = t;
	let r = new Oi(n);
	return r.colorSpace = Je, r.anisotropy = 4, [
		n,
		n.getContext("2d"),
		r
	];
}
var tm = (e) => String(e).padStart(2, "0"), nm = class extends HTMLElement {
	static get observedAttributes() {
		return ["for", "name"];
	}
	constructor() {
		super();
		let e = this.attachShadow({ mode: "open" });
		e.innerHTML = `<style>${Zp}</style><canvas aria-hidden="true"></canvas><div class="pad" aria-hidden="true"></div>
      <div class="keys" role="navigation" aria-label="${this.getAttribute("aria-label") || "Site"}"><slot></slot></div>
      <div class="keys" aria-live="polite"></div>`, this._canvas = e.querySelector("canvas"), this._pad = e.querySelector(".pad"), this._live = e.querySelectorAll(".keys")[1], this._hover = -1, this._sceneTV = null, this._pressed = -1, this._note = null, this._reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !1;
		let t = this._pad;
		t.addEventListener("pointermove", (e) => {
			e.pointerType === "mouse" && this._setHover(this._pick(e));
		}), t.addEventListener("pointerleave", () => {
			this._release(), this._setHover(-1);
		}), t.addEventListener("pointerdown", (e) => {
			let t = this._pick(e);
			t < 0 || (e.preventDefault(), this._setHover(t), this._pressed = t, this._shelf?._sound?.click?.(.35, 2400), this._layoutKeys());
		}), t.addEventListener("pointerup", (e) => {
			let t = this._pressed;
			this._release(), t >= 0 && t === this._pick(e) && this._keys[t].el.click(), e.pointerType !== "mouse" && this._setHover(t);
		}), t.addEventListener("pointercancel", () => this._release()), this.addEventListener("click", (e) => {
			let t = e.target.closest?.("[data-tv], [data-action]");
			t && t.parentElement === this && this._activate(t);
		}), this.addEventListener("focusin", (e) => {
			let t = this._keys?.findIndex((t) => t.el === e.target) ?? -1;
			t >= 0 && this._setHover(t);
		}), this.addEventListener("focusout", () => this._setHover(-1)), this._onShelf = (e) => {
			e.type === "shelf-hover" && (this._sceneTV = e.detail.tv, e.detail.tv && (this._note = null), this._layoutKeys()), e.type === "shelf-ready" && this._paintLegends(), (e.type === "shelf-focus" || e.type === "shelf-read") && (this._note = null, this._layoutKeys(), this._paintLegends()), this._draw();
		};
	}
	connectedCallback() {
		this._renderer || this._init(), this._ro = new ResizeObserver(() => this._resize()), this._ro.observe(this), this._mo = new MutationObserver(() => this._rebuild()), this._mo.observe(this, {
			childList: !0,
			attributes: !0,
			subtree: !0,
			attributeFilter: [
				"data-tv",
				"data-action",
				"data-label",
				"data-info",
				"data-channel",
				"data-color"
			]
		}), this._bind(), this._clock = setInterval(() => this._draw(), 2e4), document.fonts?.ready.then(() => {
			this._paintLegends(), this._draw();
		}), document.fonts?.load?.("16px \"DotGothic16\"", "A").then(() => this._draw(), () => {}), this._resize();
	}
	disconnectedCallback() {
		this._ro?.disconnect(), this._mo?.disconnect(), clearInterval(this._clock), clearTimeout(this._mqT), this._bind(!0);
	}
	attributeChangedCallback(e) {
		this._renderer && (e === "for" && this._bind(), this._draw());
	}
	get shelf() {
		return this._shelf || null;
	}
	_bind(e = !1) {
		let t = [
			"shelf-hover",
			"shelf-hint",
			"shelf-focus",
			"shelf-read",
			"shelf-ready"
		];
		if (this._shelf) for (let e of t) this._shelf.removeEventListener(e, this._onShelf);
		if (this._shelf = null, e) return;
		let n = this.getAttribute("for");
		if (this._shelf = (n ? document.getElementById(n) : document.querySelector("retro-shelf")) || null, this._shelf) for (let e of t) this._shelf.addEventListener(e, this._onShelf);
	}
	_init() {
		let e;
		try {
			e = new Lu({
				canvas: this._canvas,
				antialias: !0,
				alpha: !0
			});
		} catch {
			this.setAttribute("nogl", "");
			return;
		}
		e.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), e.setClearColor(0, 0), e.toneMapping = 7, this._renderer = e;
		let t = this._scene = new Gn();
		t.add(new Bo(9411728, 263684, .9));
		let n = new as(16773596, 2.2);
		n.position.set(-120, 300, 260), t.add(n);
		let r = new as(1089605, 1.4);
		r.position.set(60, 200, -220), t.add(r), this._camera = new Qo(7, 1, 10, 2e4), this._ray = new Cs(), this._group = new Ln(), this._group.rotation.x = Xp, t.add(this._group), this._mat = {
			body: new q({
				color: 1841945,
				roughness: .48,
				metalness: .05
			}),
			bezel: new q({
				color: 460551,
				roughness: .35
			}),
			key: new q({
				color: 2828582,
				roughness: .82
			}),
			keyHot: new q({
				color: 4867649,
				roughness: .7
			}),
			led: new Zr({ color: 3804170 })
		};
		let [i, a, o] = em(1024, 2);
		this._lcd = {
			c: i,
			g: a,
			t: o
		}, this._mat.lcd = new Zr({
			map: o,
			toneMapped: !1
		}), this._glow = new ns(11985034, 900, 140, 2), t.add(this._glow);
	}
	_readKeys() {
		let e = [...this.children].filter((e) => e.matches("[data-tv], [data-action]")), t = e.filter((e) => e.dataset.tv), n = e.filter((e) => !e.dataset.tv), r = 0;
		return [...t, ...n].map((e) => {
			let t = e.dataset.tv || null;
			return {
				el: e,
				tv: t,
				action: e.dataset.action || null,
				label: e.dataset.label || e.textContent.trim(),
				channel: t ? e.dataset.channel || tm(++r) : ""
			};
		});
	}
	_rebuild() {
		if (!this._renderer) return;
		this._body && (this._group.traverse((e) => {
			e.geometry?.dispose(), e.material?.map && e.material !== this._mat.lcd && (e.material.map.dispose(), e.material.dispose());
		}), this._group.clear()), this._keys = this._readKeys();
		let e = this.hasAttribute("narrow"), t = this._keys.filter((e) => e.tv).length, n = this._keys.length - t, r = this._L = Qp(e, t, n), i = this._group;
		this._body = new K(dd(r.W, r.H, 12, r.r, 3), this._mat.body), this._body.position.z = -12, i.add(this._body);
		let a = new K(ud([Z(X(r.W + .3, r.H + .3, r.r), -5.4), Z(X(r.W + .3, r.H + .3, r.r), -5.9)]), this._mat.bezel);
		i.add(a);
		let o = r.lcd, s = new K(qu([
			ud([Z(X(o.w + 6, o.h + 6, 5), 0), Z(X(o.w + 6, o.h + 6, 5), .8)]),
			Q(X(o.w + 6, o.h + 6, 5), [X(o.w, o.h, 2.5).reverse()], .8),
			ud([Z(X(o.w, o.h, 2.5), .8), Z(X(o.w, o.h, 2.5), .05)])
		]), this._mat.bezel);
		s.position.set(o.x, o.y, 0), i.add(s);
		let c = new K(new Za(o.w, o.h), this._mat.lcd);
		c.position.set(o.x, o.y, .1), i.add(c);
		let l = Math.round(1024 * o.h / o.w);
		if (this._lcd.c.height !== l) {
			this._lcd.t.dispose();
			let [e, t, n] = em(1024, l);
			this._lcd = {
				c: e,
				g: t,
				t: n
			}, this._mat.lcd.map = n, this._mat.lcd.needsUpdate = !0;
		}
		this._glow.position.set(o.x, o.y * Math.cos(Xp), 24);
		let u = new K($p(1.3, .8, .3), this._mat.led);
		u.position.set(r.led.x, r.led.y, 0), i.add(u), this._ledMesh = u;
		let d = 0, f = 0;
		for (let e of this._keys) {
			let t = e.tv ? r.nav[d++] : r.extra[f++], n = new Ln();
			n.position.set(t.x, t.y, 0);
			let a = 4.5, o = new K(e.tv ? dd(t.w, t.h, a, 4, 1.6) : $p(t.r, a, 1.4), this._mat.key), s = new K(e.tv ? Q(X(t.w + 2.4, t.h + 2.4, 5), [X(t.w, t.h, 4).reverse()], .05) : Q(ld(t.r + 1.2, 0, 0, 40), [ld(t.r, 0, 0, 40).reverse()], .05), this._mat.bezel), c = e.tv ? t.w - 3.2 : (t.r - 1.4) * 2, l = e.tv ? t.h - 3.2 : c, [u, p, m] = em(Math.round(c * 16), Math.round(l * 16)), h = new K(new Za(c, l), new q({
				map: m,
				transparent: !0,
				roughness: .8,
				alphaTest: .02
			}));
			h.position.z = 4.55;
			let g = new Ln();
			g.add(o, h), n.add(s, g), i.add(n), Object.assign(e, {
				top: g,
				cap: o,
				w: c,
				h: l,
				legend: {
					c: u,
					g: p,
					t: m
				}
			});
			for (let t of [o, h]) t.userData.key = this._keys.indexOf(e);
		}
		this._paintLegends(), this._layoutKeys(), this._fit(), this._draw();
	}
	_resize() {
		if (!this._renderer) return;
		let e = this.clientWidth < Yp;
		e !== this.hasAttribute("narrow") || !this._keys ? (e ? this.setAttribute("narrow", "") : this.removeAttribute("narrow"), this._rebuild()) : (this._fit(), this._render());
	}
	_fit() {
		let e = this.clientWidth, t = this.clientHeight, n = this._L;
		if (!e || !t || !n) return;
		this._renderer.setSize(e, t, !1);
		let r = this._camera;
		r.aspect = e / t;
		let i = Math.tan(Rt.degToRad(r.fov / 2)), a = Math.min(e - 24, 780), o = n.H * Math.cos(Xp) + 16 * Math.abs(Math.sin(Xp)), s = Math.max(n.W * t / (2 * a * i), o / (1.68 * i));
		r.position.set(0, 0, s), r.lookAt(0, 0, 0), r.updateProjectionMatrix(), r.updateMatrixWorld(), this._group.updateMatrixWorld(!0);
		let c = new or().setFromObject(this._group), l = [];
		for (let e of [c.min.x, c.max.x]) for (let t of [c.min.y, c.max.y]) for (let n of [c.min.z, c.max.z]) l.push(new U(e, t, n).project(r));
		let u = l.map((t) => (t.x + 1) / 2 * e), d = l.map((e) => (1 - e.y) / 2 * t);
		Object.assign(this._pad.style, {
			left: `${Math.min(...u)}px`,
			top: `${Math.min(...d)}px`,
			width: `${Math.max(...u) - Math.min(...u)}px`,
			height: `${Math.max(...d) - Math.min(...d)}px`
		});
	}
	_pick(e) {
		let t = this._canvas.getBoundingClientRect();
		this._ray.setFromCamera(new H((e.clientX - t.left) / t.width * 2 - 1, -((e.clientY - t.top) / t.height) * 2 + 1), this._camera);
		let n = this._ray.intersectObject(this._group, !0).find((e) => e.object.userData.key !== void 0);
		return n ? n.object.userData.key : -1;
	}
	_release() {
		this._pressed < 0 || (this._pressed = -1, this._layoutKeys());
	}
	_setHover(e) {
		e !== this._hover && (e >= 0 && (this._note = null), this._hover = e, this._pad.style.cursor = e >= 0 ? "pointer" : "", this._layoutKeys(), this._draw());
	}
	_state() {
		let e = this._shelf;
		return {
			focused: e?._focusKey || null,
			reading: e?._reading?.id || null,
			muted: !!e?.hasAttribute("muted")
		};
	}
	_layoutKeys() {
		if (!this._keys) return;
		let e = this._state(), t = this._keys.findIndex((e) => e.tv && e.tv === this._sceneTV);
		this._keys.forEach((n, r) => {
			let i = n.tv && n.tv === (e.reading || e.focused);
			n.top.position.z = r === this._pressed ? -2.6 : i ? -1.4 : 0, n.cap.material = r === this._hover || r === t ? this._mat.keyHot : this._mat.key;
		}), this._render();
	}
	_tvColor(e) {
		let t = this._keys?.find((t) => t.tv === e);
		if (t?.el.dataset.color) return t.el.dataset.color;
		let n = this._shelf?.page?.(e) || this._shelf?.querySelector?.(`[slot="${e}"]`), r = n ? getComputedStyle(n).backgroundColor : "";
		return r && !r.endsWith(", 0)") && r !== "transparent" ? r : "#e8e4da";
	}
	_paintLegends() {
		if (!this._keys) return;
		let e = this._state();
		for (let t of this._keys) {
			let { c: n, g: r, t: i } = t.legend;
			r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, n.width, n.height), r.scale(16, 16);
			let a = t.w, o = t.h, s = "#d8d3c7";
			if (r.fillStyle = s, r.strokeStyle = s, r.textAlign = "center", t.tv) {
				let n = t.tv === (e.reading || e.focused);
				r.font = `500 ${o * .24}px ${qp}`;
				let i = r.measureText(t.channel).width, c = o * .075, l = a / 2 + c + .6, u = o * .34;
				r.fillStyle = "#9d988d", r.textBaseline = "middle", r.fillText(t.channel, l, u), r.beginPath(), r.arc(l - i / 2 - 1.4 - c, u, c, 0, Math.PI * 2), r.fillStyle = this._tvColor(t.tv), r.globalAlpha = n ? 1 : .55, n && (r.shadowColor = r.fillStyle, r.shadowBlur = 2.5), r.fill(), r.shadowBlur = 0, r.globalAlpha = 1, r.fillStyle = s, r.textBaseline = "alphabetic";
				let d = o * .36;
				r.font = `700 ${d}px ${Kp}`;
				let f = t.label.toUpperCase(), p = r.measureText(f).width;
				p > a * .9 && (d *= a * .9 / p, r.font = `700 ${d}px ${Kp}`), r.fillText(f, a / 2, o * .84);
			} else {
				r.lineWidth = a * .09, r.lineCap = "round", r.lineJoin = "round";
				let n = a / 2, i = o / 2, s = a * .22;
				r.globalAlpha = t.action === "back" && !e.focused ? .4 : 1, t.action === "back" ? (r.beginPath(), r.moveTo(n + s, i), r.lineTo(n - s, i), r.moveTo(n - s * .1, i - s * .9), r.lineTo(n - s, i), r.lineTo(n - s * .1, i + s * .9), r.stroke()) : t.action === "sound" ? (r.beginPath(), r.moveTo(n - s * 1.1, i - s * .4), r.lineTo(n - s * .6, i - s * .4), r.lineTo(n, i - s), r.lineTo(n, i + s), r.lineTo(n - s * .6, i + s * .4), r.lineTo(n - s * 1.1, i + s * .4), r.closePath(), r.fill(), r.beginPath(), e.muted ? (r.moveTo(n + s * .4, i - s * .45), r.lineTo(n + s * 1.2, i + s * .45), r.moveTo(n + s * 1.2, i - s * .45), r.lineTo(n + s * .4, i + s * .45)) : (r.arc(n + s * .2, i, s * .6, -.9, .9), r.moveTo(n + s * .2 + Math.cos(-.9) * s * 1.1, i + Math.sin(-.9) * s * 1.1), r.arc(n + s * .2, i, s * 1.1, -.9, .9)), r.stroke()) : t.action === "info" ? (r.font = `700 ${o * .62}px Georgia, "Times New Roman", serif`, r.textBaseline = "middle", r.fillText("i", n, i + o * .03)) : (r.font = `700 ${o * .5}px ${Kp}`, r.textBaseline = "middle", r.fillText((t.label[0] || "?").toUpperCase(), n, i)), r.globalAlpha = 1;
			}
			i.needsUpdate = !0;
		}
		this._render();
	}
	_text() {
		let e = this._state(), t = /* @__PURE__ */ new Date(), n = `${tm(t.getHours())}:${tm(t.getMinutes())}`, r = this.getAttribute("name") || location.hostname || "PAGER", i = this._sceneTV ? this._keys?.find((e) => e.tv === this._sceneTV) : null, a = this._hover >= 0 ? this._keys[this._hover] : i;
		if (a) {
			if (a.tv) {
				let t = a.tv === e.reading ? "Reading now" : a.tv === e.focused ? "Press again to read it full screen" : null;
				return {
					left: `CH ${a.channel}  ${a.label}`,
					right: a.tv.toUpperCase(),
					main: a.el.dataset.info || a.label,
					sub: t
				};
			}
			return a.action === "back" ? {
				left: "BACK",
				right: n,
				main: e.reading ? "Back to the TV" : e.focused ? "Back to the room" : "You are in the room"
			} : a.action === "sound" ? {
				left: "SOUND",
				right: e.muted ? "OFF" : "ON",
				main: e.muted ? "Sound is off. Press to turn it on" : "Sound is on. Press to mute"
			} : {
				left: a.label.toUpperCase(),
				right: n,
				main: a.el.dataset.info || a.label
			};
		}
		if (this._note) return {
			left: "INFO",
			right: n,
			main: this._note
		};
		let o = e.reading || e.focused, s = o && this._keys?.find((e) => e.tv === o), c = this._shelf?.hint || "Tap a TV to look closer";
		return {
			left: s ? `CH ${s.channel}  ${s.label}` : r,
			right: n,
			main: c
		};
	}
	_draw() {
		if (!this._L || !this._renderer) return;
		let { c: e, g: t, t: n } = this._lcd, r = e.width, i = e.height, a = this._text();
		this._hover < 0 && !this._sceneTV && this._live.textContent !== a.main && (this._live.textContent = a.main);
		let o = t.createLinearGradient(0, 0, 0, i);
		o.addColorStop(0, "#87a061"), o.addColorStop(.18, "#a3bc7b"), o.addColorStop(1, "#93ad6b"), t.fillStyle = o, t.fillRect(0, 0, r, i);
		let s = r * .035, c = i * .27, l = i * .32;
		t.fillStyle = "#162010", t.textBaseline = "alphabetic", t.font = `400 ${i * .21}px ${Jp}`, t.globalAlpha = .72, t.textAlign = "left", t.fillText(a.left.toUpperCase(), s, c), t.textAlign = "right", t.fillText(a.right, r - s, c), t.globalAlpha = 1, t.font = `400 ${l}px ${Jp}`, t.textAlign = "left";
		let u = r - 2 * s, d = a.sub ? `${a.main} · ${a.sub}` : a.main, f = t.measureText(d).width;
		d !== this._mqText && (this._mqText = d, this._mq0 = performance.now());
		let p = 0;
		if (clearTimeout(this._mqT), f > u) {
			if (this._reduced) {
				let e = d;
				for (; e.length > 1 && t.measureText(e + "…").width > u;) e = e.slice(0, -1);
				t.fillText(e + "…", s, i * .8);
			} else {
				let e = r * .14, n = f + u * .35;
				p = (performance.now() - this._mq0) / 1e3 * e % n, t.save(), t.beginPath(), t.rect(s, 0, u, i), t.clip(), t.fillText(d, s - p, i * .8), t.fillText(d, s - p + n, i * .8), t.restore(), this._mqT = setTimeout(() => this._draw(), 33);
			}
		} else t.fillText(d, s, i * .8);
		t.fillStyle = "rgba(20, 30, 10, 0.07)";
		for (let e = 0; e < r; e += 4) t.fillRect(e, 0, 1, i);
		for (let e = 0; e < i; e += 4) t.fillRect(0, e, r, 1);
		let m = t.createLinearGradient(0, 0, 0, i * .22);
		m.addColorStop(0, "rgba(0, 0, 0, 0.35)"), m.addColorStop(1, "rgba(0, 0, 0, 0)"), t.fillStyle = m, t.fillRect(0, 0, r, i * .22), n.needsUpdate = !0;
		let h = this._hover >= 0 || !!this._sceneTV;
		this._mat.led.color.set(h ? 16726831 : 3804170), this._render();
	}
	_render() {
		this._renderer && this._L && (this._raf || (this._raf = requestAnimationFrame(() => {
			this._raf = 0, this._renderer.render(this._scene, this._camera);
		})));
	}
	_activate(e) {
		let t = this._shelf, n = this._state(), r = e.dataset.tv, i = e.dataset.action;
		this._note = null, r && t ? n.reading || n.focused === r ? t.openReader(r) : t.focusTV(r) : i === "back" && t ? n.reading ? t.closeReader() : n.focused && t.unfocus() : i === "sound" && t ? (t.toggleAttribute("muted"), this._paintLegends()) : i === "info" && (this._note = e.dataset.info || e.textContent.trim()), this.dispatchEvent(new CustomEvent("pager-press", {
			detail: {
				tv: r || null,
				action: i || null
			},
			bubbles: !0
		})), this._layoutKeys(), this._paintLegends(), this._draw();
	}
};
// src/index.js
function rm() {
	typeof customElements < "u" && (customElements.get("sony-pvm") || customElements.define("sony-pvm", Lf), customElements.get("retro-shelf") || customElements.define("retro-shelf", Gp), customElements.get("retro-pager") || customElements.define("retro-pager", nm));
}
rm();
export { Np as ARRANGEMENTS, Rf as ITEM_TYPES, Tf as MODELS, Tp as PROPS, nm as RetroPagerElement, Gp as RetroShelfElement, Lp as STACKS, Lf as SonyPVMElement, ip as buildItem, op as buildShelf, rm as define };
