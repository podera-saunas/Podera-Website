// PODERA brand tokens for video — mirrors brand/tokens/podera-tokens.ts
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
// Temporary stand-in for Tempting until the licensed font file is supplied
import '@fontsource/allura/400.css';
import {continueRender, delayRender} from 'remotion';

export const colors = {
  black: '#141414',
  graphite: '#2B2B2B',
  gold: '#C9A227',
  goldLight: '#E3C56A',
  goldDeep: '#8E7018',
  cream: '#F6F1E4',
  smoke: '#9A968C',
  line: 'rgba(246,241,228,0.14)',
  goldMetal:
    'linear-gradient(135deg, #8E7018 0%, #C9A227 35%, #E3C56A 50%, #C9A227 65%, #8E7018 100%)',
};

export const fonts = {
  sans: 'Inter, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  script: 'Allura, cursive',
};

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

const families = [
  '500 40px Inter',
  '600 40px Inter',
  '700 40px Inter',
  '800 40px Inter',
  '900 40px Inter',
  '400 40px "Instrument Serif"',
  'italic 400 40px "Instrument Serif"',
  '400 40px Allura',
];

const handle = delayRender('Loading brand fonts');
Promise.all(families.map((f) => document.fonts.load(f)))
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
