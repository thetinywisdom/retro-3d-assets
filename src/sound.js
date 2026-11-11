// Tiny synthesised sound set (no audio files): switch clicks, the power
// relay, and the degauss coil.
export class Sound {
  constructor() {
    this.muted = false;
    this.ctx = null;
  }

  _ac() {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        this.ctx = new AC();
      } catch {
        return null;
      }
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.32;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  _noise(dur) {
    const ac = this.ctx;
    const buf = ac.createBuffer(1, Math.max(1, Math.floor(ac.sampleRate * dur)), ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource();
    src.buffer = buf;
    return src;
  }

  click(strength = 1, pitch = 2600) {
    const ac = this._ac();
    if (!ac) return;
    const t = ac.currentTime;
    const n = this._noise(0.03);
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = pitch;
    bp.Q.value = 1.4;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.9 * strength, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    n.connect(bp).connect(g).connect(this.master);
    n.start(t);
    this._thump(t, 150, 0.035, 0.35 * strength);
  }

  _thump(t, freq, dur, gain) {
    const ac = this.ctx;
    const o = ac.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.45, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  power(on) {
    const ac = this._ac();
    if (!ac) return;
    const t = ac.currentTime;
    this.click(1.2, 1800);
    this._thump(t + 0.02, on ? 95 : 70, 0.16, 0.8);
    if (on) {
      // faint static crackle as the tube charges
      const n = this._noise(0.5);
      const hp = ac.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 5000;
      const g = ac.createGain();
      g.gain.setValueAtTime(0.0, t + 0.1);
      g.gain.linearRampToValueAtTime(0.07, t + 0.2);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      n.connect(hp).connect(g).connect(this.master);
      n.start(t + 0.1);
    }
  }

  degauss() {
    const ac = this._ac();
    if (!ac) return;
    const t = ac.currentTime;
    this._thump(t, 80, 0.2, 0.9);
    const o = ac.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = 100;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
    o.connect(lp).connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 1.35);
  }
}
