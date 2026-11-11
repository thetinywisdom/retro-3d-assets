# Sony CRT set — interactive 3D monitors and TVs

Four Sony CRTs as one web component. The picture on the tube is your own HTML, and the controls work.

| `model` | What it is | Size (W × H × D) | Reference used |
| --- | --- | --- | --- |
| `pvm-9042qm` (default) | 9-inch studio monitor | 217 × 217 × 352.5 mm | Sony dimension drawing + photos of a real unit |
| `pvm-20m4e` | 20-inch studio monitor | 450 × 458 × 503 mm | Published size only. **Front layout is reconstructed, approximate** |
| `kv-5200` | 5-inch portable colour TV | 162 × 269 × 330 mm (handle up) | Service manual size + photos |
| `kv-9pr1` | 9-inch personal TV, soft orange | about 218 × 184 × 296 mm | Photos only. **Size estimated; top buttons reconstructed** |

- `dist/sony-pvm.js` — the component (one file, about 185 KB gzipped, three.js included)
- `dist/sony-<model>.glb` — each model as a standard 3D file (metres, Y up)
- `demo/index.html` — demo page (`npm run dev`, then open `/demo/index.html`)
- `react/SonyPVM.jsx` — React / Next.js wrapper

## Use it

### Plain HTML

```html
<script type="module" src="sony-pvm.js"></script>

<sony-pvm model="kv-5200" power="on" style="height: 100vh">
  <main>Your site goes here</main>
  <section slot="ch-5">A second page, on channel 5</section>
</sony-pvm>
```

Whatever you put inside the tag appears on the tube. It stays real page content: your own CSS applies, links work, it scrolls, and search engines and screen readers can read it. Every model has a 4:3 picture that is 640 × 480 CSS pixels by default (`resolution="800x600"` changes it; keep 4:3).

Give the element a height. It fills the width of its container and has a transparent background.

### React / Next.js

```jsx
import { SonyPVM } from 'sony-pvm/react';

<SonyPVM model="kv-9pr1" brand="MY NAME" power style={{ height: '100vh' }} onButton={(d) => console.log(d)}>
  <MySite />
</SonyPVM>
```

The wrapper is a client component and loads the 3D code in the browser only, so it is safe with server rendering. Event props: `onReady`, `onPower`, `onButton`, `onKnob`, `onInput`, `onDegauss`, `onFocusChange`. A `ref` gives you the element and all the methods below.

## How visitors use it

| Action | Result |
| --- | --- |
| Drag | Look around the front, top and sides |
| Click the screen | Camera flies in until the picture fills the element; the content is then fully usable. `Esc`, the Back button or a click outside the picture zooms out |
| Click a button | It presses and latches like the real one |
| Drag a knob left/right, or scroll over it | Turns it |
| Pinch (touch) | Zoom |
| Tab key | Every control is also a real, labelled button or slider for keyboard and screen-reader users |

## Pages: inputs and channels

Plain children go on the first input or channel. Add `slot="..."` to put more pages on the others; the set's own buttons then switch between them.

| Model | Slots | Switched by |
| --- | --- | --- |
| `pvm-9042qm` | `line-b`, `rgb`, `component` | A/B and LINE/RGB buttons |
| `pvm-20m4e` | `line-b`, `rgb` | LINE A / LINE B / RGB buttons |
| `kv-5200` | `ch-3` … `ch-13`, `ch-u1`, `ch-u2` (default is channel 2) | The 14 channel keys |
| `kv-9pr1` | `ch-2` … `ch-12` (default is channel 1) | Channel ▼ ▲ on top |

Switching only takes over once you add a second page. With a single page the buttons just send events. On the TVs, channels with no page show static.

## What the controls do

Control ids (for `press()`, `setKnob()` and events):

| Model | Buttons | Knobs / sliders |
| --- | --- | --- |
| `pvm-9042qm` | `power` `ab` `line-rgb` `sync` `degauss` `blue-only` `underscan` `hv-delay` `16-9` | `aper` `bright` `chroma` `phase` `contr` `volume` |
| `pvm-20m4e` | `power` `line-a` `line-b` `rgb` `sync` `16-9` `hv-delay` `underscan` `blue-only` `degauss` `menu` `up` `down` `enter` | `aper` `bright` `chroma` `phase` `contr` `volume` |
| `kv-5200` | `power` `ch-2` … `ch-13` `ch-u1` `ch-u2` | `volume` (slider) |
| `kv-9pr1` | `power` `ch-down` `ch-up` `vol-down` `vol-up` `sleep` | — |

Built-in behaviour: power warms the tube up or collapses it to a dot; `sync` (EXT) makes the picture roll; `degauss` wobbles it in rainbow colours; `blue-only`, `underscan`, `hv-delay` and `16-9` change the picture the way the real buttons do; the picture knobs change sharpness, brightness, saturation, hue and contrast of your content; volume sets the volume of any `<video>` / `<audio>` inside the element. `menu`, `up`, `down`, `enter` and `sleep` only send events.

## The maker's badge

The SONY badge on every model can be replaced:

```html
<sony-pvm brand="MY NAME"></sony-pvm>          <!-- your own wordmark -->
<sony-pvm brand-logo="logo.svg"></sony-pvm>    <!-- a logo image -->
<sony-pvm brand=""></sony-pvm>                 <!-- no badge -->
```

```js
tv.setBrand('MY NAME');      // '' removes it, null restores the original
tv.setBrandLogo('logo.svg'); // URL, <img> or <canvas>; null restores the original
```

Text and images are fitted inside the original badge's footprint and keep its finish (chrome letters on the 9042QM, white on the TVs, dark print on the 20M4E). Images from another site need CORS headers.

## Attributes

| Attribute | Meaning |
| --- | --- |
| `model="kv-5200"` | Which set to show (see the table at the top). Can be changed at any time |
| `brand`, `brand-logo` | Replace the maker's badge (see above) |
| `power="on"` | Start switched on (also reflects the current state) |
| `src="page.html"` | Show a page in an iframe instead of child content |
| `resolution="640x480"` | Size of the picture area in CSS pixels |
| `view="hero"` | Starting camera: `hero` (default), `front`, `top`, `side` |
| `auto-rotate` | Gentle idle sway until the visitor interacts |
| `tally="red"` | Light the tally lamp in any CSS colour (PVM models) |
| `tally-logo="logo.svg"` | Put a logo in the tally window (PVM models; blank by default) |
| `effects="off"` | Remove scanlines, grille and corner shading from the picture |
| `muted` | No click / degauss sounds |
| `wheel-zoom` | Let the mouse wheel zoom the camera (off by default so the page still scrolls) |
| `no-hint` | Hide the "drag to look around" hint |

## Events

All events bubble. Details are on `event.detail`.

| Event | Detail |
| --- | --- |
| `pvm-ready` | — |
| `pvm-power` | `{ on }` |
| `pvm-button` | `{ id, pressed }` |
| `pvm-knob` | `{ id, value }` (0–1, 0.5 is the centre) |
| `pvm-input` | `{ input }` — the input or channel now selected, e.g. `line-b` or `ch-5` |
| `pvm-degauss` | — |
| `pvm-focus` | `{ focused }` |

## Methods and properties

```js
const pvm = document.querySelector('sony-pvm');
pvm.power = true;              // or powerOn() / powerOff() / togglePower()
pvm.press('degauss');          // press any button by id
pvm.setButton('ab', true);     // set a latching button
pvm.setKnob('bright', 0.7);    // 0..1
pvm.getKnob('bright');
pvm.focusScreen(); pvm.unfocus();
pvm.setView({ azimuth: 30, polar: 75, zoom: 1.2 }); pvm.resetView();
pvm.setTally('red'); pvm.setTally(null);
pvm.setTallyLogo('logo.svg');  // URL, <img> or <canvas>; null clears it
pvm.setBrand('MY NAME'); pvm.setBrandLogo('logo.svg');
pvm.model = 'kv-9pr1';         // swap sets
pvm.input; pvm.focused; pvm.state;
```

Styling hooks: `sony-pvm::part(back)` (the Back button), `::part(hint)`, `::part(screen)`.

## Accuracy

- **PVM-9042QM:** size from Sony's dimension drawing (30 mm bezel, feet 163 mm apart); front face and top cover measured from perspective-corrected photos; side vents follow the drawing. Back and underside are plain by design.
- **KV-5200:** overall size from the service manual. Front panel, hood slant, handle, aerial and rear cover measured from photos. The control door on the right side is modelled closed, so the picture, hue, colour and brightness wheels behind it are not there.
- **KV-9PR1:** no manual was available. Proportions come from front and side photos, scaled from the 9-inch tube. The control strip on top is only partly visible in the photos, so its buttons are a reconstruction.
- **PVM-20M4E:** cabinet size from the published specification. No photos or panel drawing were used, so the control order, labels, tally lamp position and side grips are approximate.

On all models the HTML picture is flat behind the curved glass (the curve is suggested by shading and reflections), and the badge lettering is drawn to resemble the original rather than copied from logo artwork.

## Develop

```bash
npm install
npm run dev          # dev server
npm run build        # dist/sony-pvm.js
npm run demo         # rebuild the demo pages
npm run export-glb   # dist/sony-<model>.glb for every model (needs Playwright)
```

Browsers without WebGL get the content in a plain frame instead of the 3D model.

Adding a model: copy one of `src/models/*.js`, build it with the helpers in `src/kit.js`, and register it in `src/models/index.js`.
