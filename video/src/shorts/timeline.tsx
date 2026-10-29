// Shared timeline helpers for text-led shorts: absolute-second blocks, shot lists,
// typed lines and brand cards. Everything takes seconds from the start of the video.
import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from './brand';
import {
  ChecklistRow,
  Chip,
  Eyebrow,
  GlassCard,
  GoldHighlight,
  Hero,
  Script,
  Serif,
  useIn,
} from './motion';

export const FPS = 30;
export const f = (s: number) => Math.round(s * FPS);

const Offset = React.createContext(0);
export const useT = () => React.useContext(Offset);

// A window of the timeline; children keep using absolute seconds
export const Block: React.FC<{from: number; to: number; name: string; children: React.ReactNode}> = ({
  from,
  to,
  name,
  children,
}) => {
  // Nested blocks: Sequence `from` is relative to the enclosing block
  const parent = useT();
  return (
    <Sequence from={f(from) - f(parent)} durationInFrames={f(to - from)} name={name}>
      <Offset.Provider value={from}>{children}</Offset.Provider>
    </Sequence>
  );
};

export const A = {
  Eyebrow: (p: React.ComponentProps<typeof Eyebrow>) => <Eyebrow {...p} at={p.at - useT()} />,
  Hero: (p: React.ComponentProps<typeof Hero>) => <Hero {...p} at={p.at - useT()} />,
  Script: (p: React.ComponentProps<typeof Script>) => <Script {...p} at={p.at - useT()} />,
  Serif: (p: React.ComponentProps<typeof Serif>) => <Serif {...p} at={p.at - useT()} />,
  Gold: (p: React.ComponentProps<typeof GoldHighlight>) => <GoldHighlight {...p} at={p.at - useT()} />,
  Glass: (p: React.ComponentProps<typeof GlassCard>) => <GlassCard {...p} at={p.at - useT()} />,
  Row: (p: React.ComponentProps<typeof ChecklistRow>) => <ChecklistRow {...p} at={p.at - useT()} />,
  Chip: (p: React.ComponentProps<typeof Chip>) => <Chip {...p} at={p.at - useT()} />,
};

export const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 1}) => (
  <Sequence from={f(at)} durationInFrames={f(2)} layout="none" name={`sfx ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export type Shot = {src: string; dur: number; trim?: number; zoom?: number; dim?: number; blur?: number};

const ShotView: React.FC<{shot: Shot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const z = shot.zoom ?? 1.04;
  const push = interpolate(frame, [0, durationInFrames], [z, z + 0.05]);
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <OffthreadVideo
        src={staticFile(shot.src)}
        muted
        trimBefore={f(shot.trim ?? 0)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${push})`,
          filter: shot.blur ? `blur(${shot.blur}px)` : undefined,
        }}
      />
      {shot.dim ? <AbsoluteFill style={{backgroundColor: `rgba(20,20,20,${shot.dim})`}} /> : null}
    </AbsoluteFill>
  );
};

// Hard-cut shot list; returns total length via shotsDuration()
export const Shots: React.FC<{shots: Shot[]}> = ({shots}) => {
  let t = 0;
  return (
    <>
      {shots.map((s, i) => {
        const from = t;
        t += s.dur;
        return (
          <Sequence key={i} from={f(from)} durationInFrames={f(s.dur)} name={`Shot ${i + 1}: ${s.src}`}>
            <ShotView shot={s} />
          </Sequence>
        );
      })}
    </>
  );
};
export const shotsDuration = (shots: Shot[]) => shots.reduce((a, s) => a + s.dur, 0);

// A spoken-style line that builds word by word; *word* marks a gold keyword
export const Say: React.FC<{text: string; at: number; size?: number; per?: number; align?: 'center' | 'left'}> = ({
  text,
  at,
  size = 66,
  per = 0.09,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const local = frame / FPS - (at - useT());
  const words = text.split(' ');
  // *a b c* marks a gold run that may span several words
  let inGold = false;
  const gold = words.map((w) => {
    const starts = w.startsWith('*');
    if (starts) inGold = true;
    const g = inGold;
    if (w.replace(/[.,!?]+$/, '').endsWith('*') || (starts && w.length > 1 && w.slice(1).includes('*'))) inGold = false;
    return g;
  });
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        textAlign: align,
        textShadow: '0 2px 14px rgba(0,0,0,.6)',
        margin: '10px 0',
      }}
    >
      {words.map((w, i) => {
        const p = interpolate(local, [i * per, i * per + 0.18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              margin: '0 0.13em',
              color: gold[i] ? colors.gold : colors.cream,
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px)`,
            }}
          >
            {w.replace(/\*/g, '')}
          </span>
        );
      })}
    </div>
  );
};

// Characters "print" one by one (numbers, equations)
export const TypeLine: React.FC<{text: string; at: number; size?: number; color?: string; cps?: number}> = ({
  text,
  at,
  size = 64,
  color = colors.cream,
  cps = 28,
}) => {
  const frame = useCurrentFrame();
  const local = frame / FPS - (at - useT());
  const n = Math.max(0, Math.min(text.length, Math.floor(local * cps)));
  const caret = local >= 0 && n < text.length && Math.floor(local * 4) % 2 === 0;
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: size,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.01em',
        color,
        whiteSpace: 'pre',
        textShadow: '0 2px 14px rgba(0,0,0,.6)',
        minHeight: size * 1.2,
      }}
    >
      {text.slice(0, n)}
      <span style={{opacity: caret ? 1 : 0, color: colors.gold}}>|</span>
    </div>
  );
};

// Printed receipt card that drops onto the frame
export const Receipt: React.FC<{at: number; lines: string[]; total: string}> = ({at, lines, total}) => {
  const p = useIn(at - useT(), 14);
  return (
    <div
      style={{
        width: 600,
        background: colors.cream,
        color: colors.black,
        padding: '40px 44px 56px',
        fontFamily: fonts.sans,
        boxShadow: '0 40px 90px rgba(0,0,0,.55)',
        clipPath:
          'polygon(0 0,100% 0,100% calc(100% - 18px),95% 100%,90% calc(100% - 18px),85% 100%,80% calc(100% - 18px),75% 100%,70% calc(100% - 18px),65% 100%,60% calc(100% - 18px),55% 100%,50% calc(100% - 18px),45% 100%,40% calc(100% - 18px),35% 100%,30% calc(100% - 18px),25% 100%,20% calc(100% - 18px),15% 100%,10% calc(100% - 18px),5% 100%,0 calc(100% - 18px))',
        opacity: p,
        transform: `translateY(${(1 - p) * -260}px) rotate(${-4 + 2 * p}deg)`,
      }}
    >
      <div style={{fontWeight: 700, fontSize: 30, letterSpacing: '0.14em', textAlign: 'center'}}>SPA · RECEIPT</div>
      <div style={{borderTop: `2px dashed ${colors.smoke}`, margin: '22px 0'}} />
      {lines.map((l) => (
        <div key={l} style={{fontSize: 34, fontWeight: 500, display: 'flex', justifyContent: 'space-between', margin: '8px 0'}}>
          <span>{l}</span>
          <span>····</span>
        </div>
      ))}
      <div style={{borderTop: `2px dashed ${colors.smoke}`, margin: '22px 0'}} />
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <span style={{fontWeight: 800, fontSize: 40}}>TOTAL</span>
        <span style={{fontFamily: fonts.serif, fontSize: 110, color: colors.goldDeep}}>{total}</span>
      </div>
    </div>
  );
};

// Wall cross-section: layers slide in one by one from the outside in
export const LayerStack: React.FC<{layers: {label: string; at: number; color: string; pattern?: string}[]}> = ({
  layers,
}) => {
  const base = useT();
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: 860}}>
      {layers.map((l, i) => {
        const p = interpolate(frame / FPS, [l.at - base, l.at - base + 0.35], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div key={l.label} style={{display: 'flex', alignItems: 'center', gap: 28, opacity: p}}>
            <div
              style={{
                width: 120,
                height: 96,
                borderRadius: 14,
                background: l.color,
                backgroundImage: l.pattern,
                transform: `translateX(${(1 - p) * -200}px)`,
                boxShadow: '0 10px 30px rgba(0,0,0,.4)',
                border: `1.5px solid ${colors.line}`,
              }}
            />
            <div style={{fontFamily: fonts.serif, fontSize: 64, color: colors.gold, width: 56}}>{i + 1}</div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: 54,
                color: colors.cream,
                letterSpacing: '-0.02em',
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              {l.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Music: React.FC<{src: string; volume?: number}> = ({src, volume = 0.35}) => (
  <Audio src={staticFile(src)} volume={volume} />
);

export const TopShade: React.FC<{strength?: number}> = ({strength = 0.7}) => (
  <AbsoluteFill
    style={{background: `linear-gradient(180deg, rgba(20,20,20,${strength}) 0%, rgba(20,20,20,0) 45%)`}}
  />
);
