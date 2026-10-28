// PODERA design tokens for Remotion — see brand/DESIGN_SYSTEM.md
export const colors = {
  black: '#141414',
  graphite: '#2B2B2B',
  gold: '#C9A227',
  goldLight: '#E3C56A',
  goldDeep: '#8E7018',
  cream: '#F6F1E4',
  cedar: '#8A5A3B',
  smoke: '#9A968C',
  line: 'rgba(246,241,228,0.14)',
  goldMetal:
    'linear-gradient(135deg, #8E7018 0%, #C9A227 35%, #E3C56A 50%, #C9A227 65%, #8E7018 100%)',
} as const;

export const fonts = {
  sans: 'Inter',
  serif: 'Instrument Serif',
  script: 'Tempting',
} as const;

// Sizes in px for a 1080x1920 frame
export const videoType = {
  hero: {font: fonts.sans, weight: 900, size: 250, lineHeight: 0.9, tracking: '-0.04em'},
  display: {font: fonts.sans, weight: 800, size: 160, lineHeight: 0.95, tracking: '-0.03em'},
  script: {font: fonts.script, weight: 400, size: 140, lineHeight: 1, tracking: '0'},
  serif: {font: fonts.serif, weight: 400, size: 112, lineHeight: 1, tracking: '-0.01em'},
  title: {font: fonts.sans, weight: 700, size: 80, lineHeight: 1.05, tracking: '-0.02em'},
  lead: {font: fonts.sans, weight: 500, size: 48, lineHeight: 1.2, tracking: '-0.01em'},
  caption: {font: fonts.sans, weight: 600, size: 56, lineHeight: 1.15, tracking: '-0.005em'},
  eyebrow: {font: fonts.sans, weight: 600, size: 30, lineHeight: 1.2, tracking: '0.12em'},
} as const;

export const safeArea = {top: 230, bottom: 420, right: 160, sidePadding: 96} as const;

export const motion = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  frames: {fast: 6, base: 10, slow: 18},
} as const;

export const formats = {
  reel: {width: 1080, height: 1920, fps: 30},
  carousel: {width: 1080, height: 1440},
} as const;
