import * as pvm9042qm from './pvm9042qm.js';
import * as pvm20m4e from './pvm20m4e.js';
import * as kv5200 from './kv5200.js';
import * as kv9pr1 from './kv9pr1.js';

const wrap = (m) => ({ META: m.META, build: m.buildMonitor });

/** Every model the element can show, keyed by the value of the `model` attribute. */
export const MODELS = {
  'pvm-9042qm': wrap(pvm9042qm),
  'pvm-20m4e': wrap(pvm20m4e),
  'kv-5200': wrap(kv5200),
  'kv-9pr1': wrap(kv9pr1),
};
export const DEFAULT_MODEL = 'pvm-9042qm';
