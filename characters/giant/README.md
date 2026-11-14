# Giant — TV-head hologram guide (three.js asset)

`giant.glb` is Giant (Sony PVM-20M4E head, broad gentle body) built from plain
blocks like the `<retro-map>` TVs: a faint fill on each block plus its edges as
real line geometry. It is about 1.15 m tall, in metres, Y up, facing +Z.

## What's inside

| Thing | Name(s) |
|---|---|
| Clips | `idle` 3.6 s loop · `talk` 2.4 s loop · `yes` 1.5 s · `no` 1.5 s |
| Expression clips | `happy` 2.0 s · `surprised` 1.8 s · `sad` 2.5 s · `thinking` 3.0 s **loop** · `wink` 1.8 s · `angry` 2.0 s · `dizzy` 5.0 s one-shot |

### Clips

| Clip | Duration | Playback | What it does |
| --- | --- | --- | --- |
| `idle` | 3.6 s | loop | Standing sway, one blink |
| `talk` | 2.4 s | loop | Talking body, mouth bar |
| `yes` | 1.5 s | one-shot | Nod, back to rest |
| `no` | 1.5 s | one-shot | Head shake, back to rest |
| `happy` | 2.0 s | one-shot | Bounce, then rest |
| `surprised` | 1.8 s | one-shot | Startle, then rest |
| `sad` | 2.5 s | one-shot | Slump, then rest |
| `thinking` | 3.0 s | held loop | Stays in the thinking pose |
| `wink` | 1.8 s | one-shot | Shrug and wink, then rest |
| `angry` | 2.0 s | one-shot | Stomp, then rest |
| `dizzy` | 5.0 s | one-shot | Swoon, 2.5-turn spin with spiral eyes from frame 21, wobble, then a held fall. `LoopOnce` and `clampWhenFinished`. Play `idle` to stand him back up |
| Eye expressions (meshes under the `Eyes` node) | `eyes_neutral` `eyes_happy` `eyes_blink` `eyes_surprised` `eyes_sad` `eyes_thinking` `eyes_wink` `eyes_angry` `eyes_dizzy` |
| Mouth (shown only while `talk` plays) | `mouth` |
| Clip-driven eyes | `clip_eyes_happy` `clip_eyes_surprised` `clip_eyes_sad` `clip_eyes_thinking` `clip_eyes_wink` `clip_eyes_angry` `clip_eyes_dizzy` |
| Rig nodes | `root` `hips` `spine` `chest` `neck` `head` `eyes_ctrl` `eyes_code` `clip_eyes_<name>_ctrl` `mouth_ctrl` `shoulder_L/R` `upper_arm_L/R` `forearm_L/R` `hand_L/R` `thigh_L/R` `shin_L/R` `foot_L/R` |
| Block fills / edges | `<part>_fill` meshes and `<part>_edges` line segments, `screen`, `floor_ring` |

How the rig works:

- **Rigid parts.** Each block hangs off its bone node, so the file has no skinning.
- **Seamless loops.** Every clip keys every bone on every frame. In `idle` and `talk` the first frame equals the last, and `yes` and `no` start and end at rest.
- **Built-in blinks.** `idle` and `talk` each contain one blink, made by scaling the `eyes_ctrl` node. The blink squashes whichever expression is showing, so it never fights expression switching.
- **Mouth.** `talk` opens and closes the mouth by scaling `mouth_ctrl`. The other clips hold it at scale 0. If you don't want a mouth, set `mouth.visible = false`.
- **Expression clips drive their own eyes.** `happy`, `surprised`, `sad`, `wink` and `angry` each show their matching eyes for the length of the clip, then hand back to your eyes on the last frame. They do this by scaling two kinds of node to 0 or 1:
  - `eyes_code` holds the `Eyes` group that you switch in code. These clips hide it.
  - Each clip shows its own copy of the eyes on `clip_eyes_<name>_ctrl`.

  glTF and three.js can't animate `.visible`, which is why it's done with scale.
- **How code and clips interact.**
  - `idle`, `talk`, `yes` and `no` never touch which expression shows. Whatever you set with `setExpression()` stays.
  - During an expression clip, the clip's eyes win. When the clip ends and you go back to `idle`, your code expression comes back.
  - To keep the face after the clip, call `setExpression()` with the same name, as `react()` does below.
  - During a cross-fade, both sets of eyes scale between 0 and 1 for the fade time, so they shrink and grow into each other.
- **No clip for `neutral` or `blink`.** `idle` already covers neutral, and the clips already blink.
- **`thinking` is a held loop.** Its first frame equals its last, and it's the thinking pose itself, not rest. Cross-fade into it from `idle` and back out when you're done. The other expression clips start and end at rest.
- **Blinks still work.** They scale `eyes_ctrl`, which sits above both sets of eyes. `sad` and `thinking` include a blink of their own.
- **Bind pose.** All eye meshes are visible in the file's bind pose. Pick one at load time, as in the example below.

## Minimal three.js

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GREEN = 0x8dff9a;
const gltf = await new GLTFLoader().loadAsync('dist/giant.glb');
const giant = gltf.scene;
scene.add(giant);

// optional: the <retro-map> look - additive green, faint fill, bright edges
const add = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false };
const fill   = new THREE.MeshBasicMaterial({ color: GREEN, opacity: 0.06, side: THREE.DoubleSide, ...add });
const screen = new THREE.MeshBasicMaterial({ color: GREEN, opacity: 0.18, ...add });
const edge   = new THREE.LineBasicMaterial({ color: GREEN, opacity: 0.9, ...add });
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xd8ffe0, ...add });
giant.traverse(o => {
  if (o.isLineSegments) o.material = edge;
  else if (o.isMesh) {
    const n = o.material.name;   // holo_fill, holo_screen, holo_eye, holo_fx
    o.material = n === 'holo_eye' ? eyeMat : n === 'holo_screen' ? screen : fill;
  }
});

// eye expressions
const eyes = giant.getObjectByName('Eyes');
function setExpression(name) {            // 'neutral', 'happy', 'blink', ...
  for (const e of eyes.children) e.visible = e.name === `eyes_${name}`;
}
setExpression('neutral');

// animation clips, cross-faded by name
const mixer = new THREE.AnimationMixer(giant);
const actions = Object.fromEntries(gltf.animations.map(c => [c.name, mixer.clipAction(c)]));
const ONE_SHOTS = ['yes', 'no', 'happy', 'surprised', 'sad', 'wink', 'angry', 'dizzy'];
for (const n of ONE_SHOTS) {               // one-shots: play once, then go back to idle
  actions[n].setLoop(THREE.LoopOnce, 1);
  actions[n].clampWhenFinished = true;
}
let current = actions.idle.play();
function play(name, fade = 0.3) {
  const next = actions[name];
  if (next === current) return;
  next.reset().play();
  current.crossFadeTo(next, fade, false);
  current = next;
}
mixer.addEventListener('finished', e => {
  if (ONE_SHOTS.includes(e.action.getClip().name)) play('idle');
});

// expression + matching body language. The clip shows its own eyes while it
// plays; setting the same code expression keeps that face after it ends.
const PAIRS = { happy: 'happy', surprised: 'surprised', sad: 'sad',
                thinking: 'thinking', wink: 'wink', angry: 'angry' };
function react(name, keepFace = true) {
  if (keepFace) setExpression(name);
  play(PAIRS[name]);                         // 'thinking' loops until you play('idle')
}

// play('talk'); play('yes'); play('no'); play('idle'); setExpression('happy');
// react('surprised'); react('thinking'); /* ... */ play('idle'); setExpression('neutral');

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => { mixer.update(clock.getDelta()); renderer.render(scene, camera); });
```

Notes:

- **Edge lines.** Edges load as `THREE.LineSegments`, and WebGL draws them 1 px wide. For thicker lines, convert them to `LineSegments2` from three/addons.
- **Floor ring.** `floor_ring` is the projector ring on the floor. Hide it with `giant.getObjectByName('floor_ring').visible = false`.
- **Scale.** Giant is real-world sized, with the head at the PVM-20M4E's 45 cm width. Scale `giant` to fit your camera.

## Files

| File | What it is |
|---|---|
| `dist/giant.glb` | The asset, with the other GLBs (metres, Y up) |
| `giant_rig.blend` | Rig, the four actions on NLA tracks, and all expressions |
| `build_giant.py` | Rebuilds the `.blend` and `.glb`. Run `blender -b --python build_giant.py` |
| `preview_giant.py` | Raw hologram previews. Uses `../holo_lib.py` |
| `giant_post.py` | Glow, scanlines and labels; writes `previews/` |
| `check_clearance.py` | Per clip, checks that the head stays clear of the torso and that no block pushes deeper into another than it does at rest. Joints are reported separately. Run `blender -b giant_rig.blend --python check_clearance.py` |
