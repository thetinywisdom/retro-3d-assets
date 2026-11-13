# retro-3d-assets

Interactive 3D retro hardware as web components, built with three.js and bundled by Vite into one file, `dist/retro-3d.js`. It is the engine behind the portfolio site in the sibling repository `thetinywisdom/briandi.to`, which vendors the built file.

Read `README.md` for the public API (attributes, events, methods). Read `PLAN.md` in the `briandi.to` repository for what is done, what is open and what the owner has decided.

## Commands

```bash
npm install
npm run dev          # Vite dev server
npm run build        # dist/retro-3d.js
npm run demo         # rebuild demo/index.html and demo/pvm-9042qm-demo.html from demo/body.html
npm run export-glb   # dist/sony-<model>.glb for each CRT (needs Playwright)
```

Dev pages (with `npm run dev`):

- `/index.html?model=kv-5200` — one `<sony-pvm>`
- `/shelf.html?scene=floor&lighting=dark&stack=scatter&backlight&floor=carpet&smoke&grain` — `<retro-shelf>`; every attribute can be passed as a query parameter
- `/tools/props.html?only=ps-vita&tilt=0` — console props on a plain background

There are no automated tests. Check work by rendering the dev pages in a browser (headless Chromium with `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader` works) and looking at screenshots; drive real pointer events when you change interaction code.

## After every change

1. `npm run build` and `npm run demo`.
2. Commit `dist/` too: it is tracked on purpose, because the site copies it.
3. Copy `dist/retro-3d.js` to `vendor/retro-3d.js` in the `briandi.to` repository and commit there as well. The site does not update until you do.

## Layout

| Path | What it is |
| --- | --- |
| `src/index.js` | Entry: registers `<sony-pvm>`, `<retro-shelf>`, `<retro-pager>` and `<retro-map>`, re-exports builders |
| `src/element.js` | `<sony-pvm>`: one CRT with its own canvas, orbit camera, controls, power, picture effects. Also runs "hosted" inside another scene (`_attachHost`, `_tick`) |
| `src/shelf-element.js` | `<retro-shelf>`: the scene the site uses. Owns the renderer and camera, hosts the four CRTs, builds the shelf or floor scene, lighting, smoke, grain, focus and the full-screen reader |
| `src/pager-element.js` | `<retro-pager>`: the site's navigation dock, a 3D pager with its own canvas. Keys come from its child buttons; it drives a `<retro-shelf>` through its methods and events |
| `src/map-element.js` | `<retro-map>`: a green hologram of the TV stack with its own canvas, copied as plain boxes from the shelf's sets. Shown while the camera is in on a set; lights that set and has keys for the set above and below |
| `src/models/*.js` | One file per CRT. Each exports `META` (id, size, inputs, controls) and `buildMonitor()`; registered in `src/models/index.js` |
| `src/kit.js` | Shared geometry helpers (`rr`, `loft`, `plate`, `rbox`) and the `Kit` builder (materials, buttons, knobs, sliders, decals, the CRT glass) |
| `src/crt.js` | Glass shader. Draws the tube look and leaves a transparent window for the HTML underneath |
| `src/labels.js` | Canvas-drawn textures: panel legends, brand badge, grain, shadows |
| `src/props/consoles.js` | PS one, DualShock, Game Boy Advance, PS Vita, PSP Go |
| `src/props/outlines.js` | Generated body outlines for the consoles, traced from reference images. Do not hand-edit |
| `src/props/shelf.js` | Shelf unit, and the shelved items (PS1, GBA, Vita, PSP cases, books) with text-driven spines and covers |
| `src/arrange.js` | Scripted shelf arrangements (`tidy`, `browsed`, `piled`, `display`) |
| `src/sound.js` | Synthesised clicks, power and degauss sounds |
| `react/SonyPVM.jsx` | Thin React / Next.js wrapper for `<sony-pvm>` |

## How it works

- **Units are millimetres.** +x right, +y up, +z towards the viewer. Models sit on y = 0. Real published dimensions are used throughout; keep that.
- **The picture is real HTML.** A `CSS3DRenderer` layer sits behind the WebGL canvas and holds each TV's page, transformed onto the tube's picture plane. The glass material is drawn with blending off and writes premultiplied colour plus alpha, so it punches a see-through window and layers scanlines, vignette and reflections on top. The canvas never takes pointer events; everything is ray-cast from the stage.
- **Render on demand.** Call `invalidate()` after changing anything; there is no free-running loop.
- **Slots.** In `<retro-shelf>` a TV's page is the child with `slot="<model id>"`; extra inputs are `slot="<model id>:<input>"`. The full-screen reader moves that same element to `slot="reader"` and back.
- **Controls are declared in `META.controls`** with a `role` (`power`, `degauss`, `underscan`, `volume`, `channel`, ...). Behaviour is keyed by role in `element.js`, so a new model needs no element changes if it reuses roles.
- **Channels and media.** A set switches pages with its own keys once it has a second page, or always when `_alwaysSwitch` is set (the shelf sets it for TVs in `no-reader`). `_holdMedia()` in `element.js` keeps only the channel on air playing: it pauses YouTube players that have been on air (they are loaded the first time their channel is tuned), unloads other iframes off air (keeping the address in `data-held`) and pauses `<video>` / `<audio>`. The set's volume and the host's mute drive `<video>`, `<audio>` and YouTube players on its channels; YouTube is controlled through its postMessage interface (`ytWire` / `ytLevel` at the top of `element.js`), including the fallback that plays muted when the browser blocks sound and unmutes on the next pointer or key press.
- **No-reader TVs.** `<retro-shelf no-reader="...">`: `canRead(id)` is false for them, `openReader()` ignores them, and when the camera is in on one its picture gets `pointer-events: auto` and `_inLiveScreen()` hands those pointer events to the page instead of the scene.
- **The pager** (`<retro-pager>`) reads the shelf's state through `_focusKey`, `_reading`, `hint`, `canRead()` and the `shelf-*` / `pvm-input` events, and drives it with `focusTV()`, `openReader()`, `closeReader()` and `unfocus()`. Its LCD is a canvas texture lettered in DotGothic16 when the page loads it; the font is requested explicitly with `document.fonts.load`, because nothing else on the page uses it.
- **Dark room lighting.** With `lighting="dark"` each powered TV carries a forward `SpotLight` plus a weak `PointLight`, coloured from the computed background of its page (`_buildGlow`). Room light is nearly zero; `front-light` is a faint directional fill.

## Conventions

- Plain ES modules, no TypeScript, no framework. Two-space indent, single quotes, semicolons.
- Geometry is procedural. No external model, texture, font or image files: textures are drawn on canvases at runtime.
- New CRT: copy a file in `src/models/`, build it with `Kit`, register it in `src/models/index.js`.
- New shelf arrangement: add a function to `ARRANGEMENTS` in `src/arrange.js`.
- New TV stack: add an entry to `STACKS` in `src/shelf-element.js` (`x`, optional `z`, `ry` in degrees, `on` = the set it stands on).
- Respect `prefers-reduced-motion` (tweens become instant) and keep the hidden real buttons in `.sr` in sync when adding controls.
- Platform and brand marks are plain lettering drawn in code, not real logo artwork. Keep it that way.

## Accuracy notes

How closely each model follows a reference matters to the owner. Do not present a reconstruction as measured.

- **PVM-9042QM, KV-5200:** dimensions from Sony documents, layout measured from perspective-corrected photos. The KV-5200's channel keys are numbered 1–12 at the owner's request; the real set reads 2–13.
- **KV-9PR1:** no manual; size estimated from photos. Top control strip is a reconstruction. The frame and screen are centred vertically at the owner's request (not as in the photos).
- **PVM-20M4E:** cabinet size from the published spec only; front layout is reconstructed.
- **Consoles:** outlines traced, controls measured from photos; backs are plain. The PS Vita was also styled against a Sketchfab model by rose3d (Editorial licence, viewed as a reference only, nothing copied); its home screen is a generic invented one.
- **Cases and books:** real case sizes; printed designs are drawn from memory of the packaging, not matched to photos.

## Git

Work is committed straight to `main` and pushed; there are no pull requests so far. Commit messages are a short imperative subject with a body when the change needs explaining.
