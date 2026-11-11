// The CRT glass.
//
// The picture itself is real HTML sitting on a flat plane *behind* the WebGL
// canvas. This material is drawn with blending disabled and writes
// premultiplied colour + alpha straight into the framebuffer, so it both
// "punches a hole" for the HTML to show through and layers the tube look on
// top of it: scanlines, aperture grille, corner falloff, reflections, degauss.
//
// Every effect is computed where the view ray meets the HTML plane, so the
// overlay stays glued to the content from any angle even though the glass
// surface itself is curved.
import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec3 vPos;
varying vec3 vN;
void main() {
  vPos = position;
  vN = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = /* glsl */ `
precision highp float;
varying vec3 vPos;
varying vec3 vN;
uniform vec3 uCam;      // camera position in monitor space (mm)
uniform vec4 uRect;     // picture rect: centre xy, half size
uniform float uPlaneZ;  // z of the HTML plane
uniform float uOn;      // 0 = tube off, 1 = picture showing
uniform float uDegauss; // 0..1 decaying
uniform float uTime;
uniform float uLines;   // visible scanlines
uniform float uFx;      // overlay strength
uniform float uGlare;   // reflection strength
uniform float uCorner;  // picture corner radius (mm)
uniform float uOutside; // brightness of the face plate outside the picture

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + r;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

float softbox(vec3 r, vec3 c, vec2 size, float soft) {
  float dn = dot(r, c);
  if (dn <= 0.0) return 0.0;
  vec3 ux = normalize(cross(vec3(0.0, 1.0, 0.0), c));
  vec3 uy = cross(c, ux);
  vec2 p = vec2(dot(r, ux), dot(r, uy)) / dn;
  vec2 e = smoothstep(size + soft, size - soft, abs(p));
  return e.x * e.y;
}

void main() {
  vec3 N = normalize(vN);
  vec3 rd = normalize(vPos - uCam);
  vec3 V = -rd;

  // where this view ray lands on the HTML plane
  float t = (uPlaneZ - uCam.z) / rd.z;
  vec2 hit = uCam.xy + rd.xy * t;
  vec2 p = hit - uRect.xy;
  vec2 q = p / uRect.zw;
  float sd = sdRoundRect(p, uRect.zw, uCorner);
  float aa = max(fwidth(sd), 0.02);
  float inside = 1.0 - smoothstep(-aa, aa, sd);

  // room reflections on the glass
  vec3 R = reflect(rd, N);
  float fres = 0.045 + 0.955 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);
  float win1 = softbox(R, normalize(vec3(-0.52, 0.50, 0.69)), vec2(0.20, 0.30), 0.07);
  float win2 = softbox(R, normalize(vec3(0.80, 0.30, 0.52)), vec2(0.09, 0.45), 0.09);
  vec3 glare = (vec3(1.0, 0.98, 0.94) * win1 * 2.4 + vec3(0.82, 0.9, 1.0) * win2 * 1.0 + vec3(0.32)) * fres * uGlare;

  // unlit phosphor: the grey-green of a tube that is switched off
  vec3 L = normalize(vec3(-0.4, 0.7, 0.6));
  float diff = 0.42 + 0.58 * max(dot(N, L), 0.0);
  vec3 offCol = vec3(0.20, 0.235, 0.215) * diff * mix(0.82 * uOutside, 1.0, inside) + glare;

  // scanlines (fade out when too fine to resolve, keeping average brightness)
  float sv = (q.y * 0.5 + 0.5) * uLines;
  float sVis = 1.0 - smoothstep(0.18, 0.5, fwidth(sv));
  float scan = 0.24 * mix(0.5, 0.5 - 0.5 * cos(6.2831853 * sv), sVis);
  // Trinitron aperture grille: vertical stripes, 0.5 mm pitch
  float gv = p.x / 0.5;
  float gVis = 1.0 - smoothstep(0.18, 0.5, fwidth(gv));
  float grille = 0.10 * mix(0.5, 0.5 - 0.5 * cos(6.2831853 * gv), gVis);
  // corner falloff
  float vig = 0.34 * pow(clamp(length(q * vec2(0.84, 0.88)), 0.0, 1.3), 3.6);
  float a = clamp((scan + grille + vig) * uFx + 0.03, 0.0, 0.92);

  // degauss: rainbow blotches that swirl and die away
  vec3 deg = vec3(0.0);
  if (uDegauss > 0.001) {
    vec2 dq = q + 0.10 * uDegauss * vec2(sin(uTime * 41.0 + q.y * 6.0), cos(uTime * 33.0 + q.x * 5.0));
    deg = (0.5 + 0.5 * cos(6.2831853 * (dq.x * 1.2 + dq.y * 0.8 + vec3(0.0, 0.33, 0.67)) + uTime * 9.0))
        * uDegauss * 0.5;
  }

  // faint glow spilling past the picture edge when lit
  float halo = 0.035 * exp(-max(sd, 0.0) / 5.0) * (1.0 - inside);

  vec3 outside = mix(offCol, vec3(0.014) + glare + vec3(0.55, 0.65, 1.0) * halo, uOn);
  float k = inside * uOn;
  vec3 rgb = mix(outside, glare + deg, k);
  float alpha = mix(1.0, a, k);
  gl_FragColor = vec4(rgb, alpha);
}`;

export function makeCrtMaterial({ rect, planeZ, lines = 240, corner = 5, outside = 1 }) {
  return new THREE.ShaderMaterial({
    name: 'crt-glass',
    uniforms: {
      uCam: { value: new THREE.Vector3(0, 0, 1000) },
      uRect: { value: new THREE.Vector4(rect.cx, rect.cy, rect.w / 2, rect.h / 2) },
      uPlaneZ: { value: planeZ },
      uOn: { value: 0 },
      uDegauss: { value: 0 },
      uTime: { value: 0 },
      uLines: { value: lines },
      uFx: { value: 1 },
      uGlare: { value: 1 },
      uCorner: { value: corner },
      uOutside: { value: outside },
    },
    vertexShader,
    fragmentShader,
    blending: THREE.NoBlending,
    toneMapped: false,
  });
}
