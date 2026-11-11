'use client';
// React / Next.js wrapper around the <sony-pvm> custom element.
//
//   import { SonyPVM } from 'sony-pvm/react';
//   <SonyPVM power style={{ height: '100vh' }} onButton={(e) => ...}>
//     <MySite />
//   </SonyPVM>
//
// The 3D code is imported inside useEffect, so nothing runs during server
// rendering (safe in the Next.js app and pages routers).
import { createElement, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const EVENTS = {
  onReady: 'pvm-ready',
  onPower: 'pvm-power',
  onButton: 'pvm-button',
  onKnob: 'pvm-knob',
  onInput: 'pvm-input',
  onDegauss: 'pvm-degauss',
  onFocusChange: 'pvm-focus',
};

export const SonyPVM = forwardRef(function SonyPVM(props, ref) {
  const {
    model, brand, brandLogo, power, muted, src, resolution, tally, tallyLogo, autoRotate, view, effects, noHint, wheelZoom,
    children, className, style, ...rest
  } = props;
  const el = useRef(null);
  const handlers = useRef({});
  handlers.current = rest;

  useImperativeHandle(ref, () => el.current, []);

  useEffect(() => {
    import('../dist/sony-pvm.js');
    const node = el.current;
    const offs = Object.entries(EVENTS).map(([prop, type]) => {
      const fn = (e) => handlers.current[prop]?.(e.detail, e);
      node.addEventListener(type, fn);
      return () => node.removeEventListener(type, fn);
    });
    return () => offs.forEach((off) => off());
  }, []);

  const attrs = { ref: el, class: className, style };
  if (model) attrs.model = model;
  if (brand !== undefined) attrs.brand = brand;
  if (brandLogo) attrs['brand-logo'] = brandLogo;
  if (power !== undefined) attrs.power = power ? 'on' : 'off';
  if (muted) attrs.muted = '';
  if (src) attrs.src = src;
  if (resolution) attrs.resolution = resolution;
  if (tally) attrs.tally = tally;
  if (tallyLogo) attrs['tally-logo'] = tallyLogo;
  if (autoRotate) attrs['auto-rotate'] = '';
  if (view) attrs.view = view;
  if (effects === false) attrs.effects = 'off';
  if (noHint) attrs['no-hint'] = '';
  if (wheelZoom) attrs['wheel-zoom'] = '';
  return createElement('sony-pvm', attrs, children);
});

export default SonyPVM;
