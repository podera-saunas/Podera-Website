import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, easeInOut, easeOut, fonts} from './brand';

const out = Easing.bezier(...easeOut);
const inOut = Easing.bezier(...easeInOut);

// 0 → 1 progress starting at `start` (seconds) over `dur` frames
export const useIn = (start: number, dur = 10, ease = out) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return interpolate(frame, [start * fps, start * fps + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
};

// Fade everything out over the last frames of a block
export const useOutro = (end: number, dur = 6) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return interpolate(frame, [end * fps - dur, end * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

// Lower-middle stage where graphics live (face stays clear above)
export const Stage: React.FC<{children: React.ReactNode; top?: number; opacity?: number}> = ({
  children,
  top = 980,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: 96,
      right: 96,
      top,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      opacity,
    }}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{text: string; at: number; color?: string}> = ({
  text,
  at,
  color = colors.cream,
}) => {
  const p = useIn(at, 8);
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: 32,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        textShadow: '0 2px 16px rgba(0,0,0,.5)',
        marginBottom: 12,
      }}
    >
      {text}
    </div>
  );
};

// Hero word: scale 1.12→1, blur 8→0
export const Hero: React.FC<{
  text: string;
  at: number;
  size?: number;
  color?: string;
  weight?: number;
}> = ({text, at, size = 180, color = colors.cream, weight = 900}) => {
  const p = useIn(at, 10);
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        whiteSpace: 'nowrap',
        color,
        opacity: p,
        transform: `scale(${1.12 - 0.12 * p})`,
        filter: `blur(${(1 - p) * 8}px)`,
        textShadow: '0 6px 40px rgba(0,0,0,.45)',
      }}
    >
      {text}
    </div>
  );
};

// Script word "written" on with a left→right mask
export const Script: React.FC<{
  text: string;
  at: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({text, at, size = 150, color = colors.gold, style}) => {
  const p = useIn(at, 18, inOut);
  return (
    <div
      style={{
        fontFamily: fonts.script,
        fontSize: size,
        lineHeight: 1,
        color,
        clipPath: `inset(-20% ${(1 - p) * 100}% -20% -5%)`,
        textShadow: '0 4px 24px rgba(0,0,0,.5)',
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const Serif: React.FC<{
  text: string;
  at: number;
  size?: number;
  color?: string;
  italic?: boolean;
}> = ({text, at, size = 130, color = colors.cream, italic = false}) => {
  const p = useIn(at, 10);
  return (
    <div
      style={{
        fontFamily: fonts.serif,
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        textShadow: '0 4px 30px rgba(0,0,0,.5)',
      }}
    >
      {text}
    </div>
  );
};

// Gold plate wipes across, then reveals the word on top of it
export const GoldHighlight: React.FC<{text: string; at: number; size?: number}> = ({
  text,
  at,
  size = 120,
}) => {
  const plate = useIn(at, 6, inOut);
  const word = useIn(at + 0.07, 8);
  return (
    <div style={{position: 'relative', display: 'inline-block', padding: '6px 28px'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: colors.gold,
          borderRadius: 8,
          transformOrigin: 'left center',
          transform: `scaleX(${plate})`,
        }}
      />
      <div
        style={{
          position: 'relative',
          fontFamily: fonts.sans,
          fontWeight: 800,
          fontSize: size,
          letterSpacing: '-0.03em',
          color: colors.black,
          opacity: word,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const GlassCard: React.FC<{children: React.ReactNode; at: number}> = ({children, at}) => {
  const p = useIn(at, 8);
  return (
    <div
      style={{
        background: 'rgba(201,162,39,.18)',
        backdropFilter: 'blur(24px)',
        border: '1.5px solid rgba(227,197,106,.35)',
        borderRadius: 24,
        padding: '28px 48px',
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px) scale(${0.96 + 0.04 * p})`,
        boxShadow: '0 20px 60px rgba(0,0,0,.35)',
      }}
    >
      {children}
    </div>
  );
};

export const ChecklistRow: React.FC<{text: string; at: number}> = ({text, at}) => {
  const p = useIn(at, 5);
  const tick = useIn(at + 0.1, 6);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        width: 820,
        padding: '18px 0',
        borderBottom: `1px solid ${colors.line}`,
        opacity: p,
        transform: `translateX(${(1 - p) * -40}px)`,
      }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="20" fill="none" stroke={colors.gold} strokeWidth="2" />
        <path
          d="M13 22.5 L19.5 29 L31 16"
          fill="none"
          stroke={colors.gold}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="30"
          strokeDashoffset={30 * (1 - tick)}
        />
      </svg>
      <div
        style={{
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 58,
          letterSpacing: '-0.02em',
          color: colors.cream,
          textAlign: 'left',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Chip: React.FC<{text: string; at: number; gold?: boolean}> = ({text, at, gold}) => {
  const p = useIn(at, 6);
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize: 56,
        letterSpacing: '-0.02em',
        padding: '16px 40px',
        borderRadius: 999,
        background: gold ? colors.gold : 'rgba(20,20,20,.72)',
        color: gold ? colors.black : colors.cream,
        border: gold ? 'none' : `1.5px solid ${colors.line}`,
        opacity: p,
        transform: `scale(${0.9 + 0.1 * p})`,
      }}
    >
      {text}
    </div>
  );
};

// Bottom gradient so lower-third graphics read on any footage
export const Shade: React.FC<{strength?: number}> = ({strength = 0.75}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, rgba(20,20,20,0) 35%, rgba(20,20,20,${strength}) 72%, rgba(20,20,20,${
        strength + 0.1
      }) 100%)`,
    }}
  />
);

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,.35) 100%)',
      pointerEvents: 'none',
    }}
  />
);

// Soft steam puffs that rise and cover the frame (brand transition)
export const Steam: React.FC<{start: number; dur?: number}> = ({start, dur = 1.2}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame - start * fps) / (dur * fps);
  if (t < 0) return null;
  const puffs = [
    {x: 20, d: 0, s: 1.1},
    {x: 70, d: 0.08, s: 1.3},
    {x: 45, d: 0.15, s: 1.5},
    {x: 85, d: 0.22, s: 1.0},
    {x: 10, d: 0.3, s: 1.2},
    {x: 55, d: 0.35, s: 1.6},
  ];
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {puffs.map((p, i) => {
        const k = Math.min(Math.max((t - p.d) / 0.8, 0), 1.4);
        const y = 2100 - k * 1700;
        const size = 700 * p.s * (0.6 + k);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: y,
              width: size,
              height: size,
              marginLeft: -size / 2,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(246,241,228,.85) 0%, rgba(246,241,228,.45) 35%, rgba(246,241,228,0) 70%)',
              filter: 'blur(40px)',
              opacity: Math.min(k * 2, 1) * interpolate(k, [0.6, 1.2], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
