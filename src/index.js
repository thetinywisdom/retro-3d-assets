// Sony PVM-9042QM — interactive 3D monitor.
//
//   <script type="module" src="sony-pvm.js"></script>
//   <sony-pvm power="on"> ...your HTML... </sony-pvm>
import { SonyPVMElement } from './element.js';

export { SonyPVMElement };
export { MODELS } from './models/index.js';

/** Register the custom element (done automatically in the browser). */
export function define(tag = 'sony-pvm') {
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
    customElements.define(tag, SonyPVMElement);
  }
}

define();
