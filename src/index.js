// Retro 3D assets: Sony CRTs, a shelf, games and consoles as web components.
//
//   <script type="module" src="retro-3d.js"></script>
//   <sony-pvm model="kv-5200" power="on"> ...your HTML... </sony-pvm>
//   <retro-shelf> ...pages and <retro-item>s... </retro-shelf>
//   <retro-pager for="shelf"> ...one <button> per key... </retro-pager>
//   <retro-map for="shelf"> ...one <button> per set... </retro-map>
//   <retro-giant src="giant.glb"></retro-giant>
import { SonyPVMElement } from './element.js';
import { RetroShelfElement } from './shelf-element.js';
import { RetroPagerElement } from './pager-element.js';
import { RetroMapElement } from './map-element.js';
import { RetroGiantElement } from './giant-element.js';

export { SonyPVMElement, RetroShelfElement, RetroPagerElement, RetroMapElement, RetroGiantElement };
export { MODELS } from './models/index.js';
export { STACKS } from './shelf-element.js';
export { PROPS } from './props/consoles.js';
export { ARRANGEMENTS } from './arrange.js';
export { buildShelf, buildItem, ITEM_TYPES } from './props/shelf.js';

/** Register the custom elements (done automatically in the browser). */
export function define() {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get('sony-pvm')) customElements.define('sony-pvm', SonyPVMElement);
  if (!customElements.get('retro-shelf')) customElements.define('retro-shelf', RetroShelfElement);
  if (!customElements.get('retro-pager')) customElements.define('retro-pager', RetroPagerElement);
  if (!customElements.get('retro-map')) customElements.define('retro-map', RetroMapElement);
  if (!customElements.get('retro-giant')) customElements.define('retro-giant', RetroGiantElement);
}

define();
