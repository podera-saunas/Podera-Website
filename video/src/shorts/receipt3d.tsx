// Photoreal-ish thermal receipt rendered in CSS 3D: paper grain, curl shading,
// torn edges and a contact shadow. It drops in and settles onto the bench plane.
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {colors} from './brand';
import {FPS, useT} from './timeline';

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.32  0 0 0 0 0.28  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const TEETH = 22;
const torn = (() => {
  // Small irregular teeth along top and bottom (deterministic)
  const pts: string[] = [];
  for (let i = 0; i <= TEETH; i++) pts.push(`${(i / TEETH) * 100}% ${i % 2 ? 0 : 1.1 + ((i * 7) % 3) * 0.25}%`);
  for (let i = TEETH; i >= 0; i--) pts.push(`${(i / TEETH) * 100}% ${100 - (i % 2 ? 0 : 1.1 + ((i * 5) % 3) * 0.25)}%`);
  return `polygon(${pts.join(',')})`;
})();

const mono = '"IBM Plex Mono", monospace';

const Row: React.FC<{l: string; r?: string; bold?: boolean; size?: number}> = ({l, r = '', bold, size = 30}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: mono,
      fontWeight: bold ? 600 : 400,
      fontSize: size,
      letterSpacing: '0.02em',
      margin: '7px 0',
    }}
  >
    <span>{l}</span>
    <span>{r}</span>
  </div>
);

export const Receipt3D: React.FC<{at: number; total?: string}> = ({at, total = '?'}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS - (at - useT());
  const drop = interpolate(t, [0, 0.9], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.9, 0.25, 1),
  });
  const settle = interpolate(t, [0.75, 1.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Slow camera drift after landing keeps the 3D read alive
  const drift = interpolate(t, [1, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rotX = 58 - 6 * drift;
  const rotZ = -14 + 22 * (1 - drop) + 3 * drift;
  const y = -1100 * (1 - drop);
  const lift = 220 * (1 - drop) + 6 * Math.sin(settle * Math.PI) * (1 - settle);
  const totalIn = interpolate(t, [1.3, 1.8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div style={{position: 'absolute', inset: 0, perspective: 1500, perspectiveOrigin: '50% 30%'}}>
      {/* contact shadow on the bench */}
      <div
        style={{
          position: 'absolute',
          left: 290,
          top: 1010,
          width: 520,
          height: 980,
          transform: `translateY(${y * 0.2}px) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateZ(-4px) scale(${1 + lift / 900})`,
          background: 'rgba(0,0,0,.55)',
          filter: `blur(${18 + lift / 6}px)`,
          opacity: 0.35 + 0.5 * drop,
          borderRadius: 30,
        }}
      />
      {/* paper */}
      <div
        style={{
          position: 'absolute',
          left: 270,
          top: 960,
          width: 540,
          transformStyle: 'preserve-3d',
          transform: `translateY(${y}px) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateZ(${lift}px)`,
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '64px 46px 70px',
            color: '#2a2722',
            backgroundColor: '#F4F0E6',
            backgroundImage: `${GRAIN}, linear-gradient(180deg, rgba(0,0,0,.06) 0%, rgba(255,255,255,0) 18%, rgba(0,0,0,.04) 48%, rgba(255,255,255,.35) 52%, rgba(0,0,0,0) 60%, rgba(0,0,0,.08) 100%), linear-gradient(90deg, rgba(0,0,0,.07), rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, rgba(0,0,0,.07))`,
            clipPath: torn,
            boxShadow: 'inset 0 0 40px rgba(120,100,70,.12)',
          }}
        >
          <div style={{textAlign: 'center', fontFamily: mono, fontWeight: 600, fontSize: 34, letterSpacing: '0.2em'}}>
            CITY SPA
          </div>
          <div style={{textAlign: 'center', fontFamily: mono, fontSize: 22, opacity: 0.7, margin: '6px 0 20px'}}>
            ** EVENING VISITS **
          </div>
          <div style={{borderTop: '2px dashed rgba(42,39,34,.55)', margin: '14px 0'}} />
          <Row l="GUESTS" r="2" />
          <Row l="VISITS / WEEK" r="2" />
          <Row l="WEEKS" r="52" />
          <Row l="YEARS" r="3" />
          <div style={{borderTop: '2px dashed rgba(42,39,34,.55)', margin: '14px 0'}} />
          <Row l="BOOKING" r="REQ." size={24} />
          <Row l="TRAFFIC" r="INCL." size={24} />
          <div style={{borderTop: '2px solid rgba(42,39,34,.7)', margin: '18px 0 10px'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <span style={{fontFamily: mono, fontWeight: 600, fontSize: 40}}>TOTAL</span>
            <span
              style={{
                fontFamily: mono,
                fontWeight: 600,
                fontSize: 96,
                color: colors.goldDeep,
                opacity: totalIn,
                transform: `scale(${0.8 + 0.2 * totalIn})`,
                display: 'inline-block',
              }}
            >
              {total}
            </span>
          </div>
          {/* barcode */}
          <div
            style={{
              marginTop: 26,
              height: 64,
              backgroundImage:
                'repeating-linear-gradient(90deg, #2a2722 0 3px, transparent 3px 5px, #2a2722 5px 6px, transparent 6px 10px, #2a2722 10px 14px, transparent 14px 16px)',
              opacity: 0.85,
            }}
          />
        </div>
        {/* specular sheen sweeping across the paper as it settles */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: torn,
            background: `linear-gradient(115deg, rgba(255,255,255,0) ${20 + 60 * drift}%, rgba(255,255,255,.28) ${30 + 60 * drift}%, rgba(255,255,255,0) ${40 + 60 * drift}%)`,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
};
