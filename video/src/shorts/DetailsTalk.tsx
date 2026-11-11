// Talking-head reel T2 "The hardest part is making it simple" (files 21–24), editorial style.
// Full-bleed B-roll inserts on the things he names, masked type reveals, thin gold rules, lower-third titles.
// No orbiting/flipping cards, no PIP bubbles, no pill polls (owner rules). No background music.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {Captions, Word} from './Captions';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, FPS, Sfx} from './timeline';
import segsJson from './detail-words.json';

type Seg = {id: string; src: string; duration: number; words: Word[]};
const segs = segsJson as Seg[];
const starts: Record<string, number> = {};
{
  let t = 0;
  for (const s of segs) {
    starts[s.id] = t;
    t += s.duration;
  }
}
const MAIN = segs.reduce((a, s) => a + s.duration, 0); // 41.25
const OUTRO = 2.6;
export const detailsDuration = f(MAIN + OUTRO);

const expo = Easing.bezier(0.19, 1, 0.22, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const useTime = () => useCurrentFrame() / FPS;
const prog = (t: number, at: number, dur: number) => interpolate(t, [at, at + dur], [0, 1], {...clamp, easing: expo});
const fadeWindow = (t: number, a: number, b: number, d = 0.3) => interpolate(t, [a, a + d, b - d, b], [0, 1, 1, 0], clamp);

/* ---------- talking head (wide takes are already punched in at the cut, at full resolution) ---------- */
const Talker: React.FC = () => (
  <>
    {segs.map((s) => (
      <Sequence key={s.id} from={f(starts[s.id])} durationInFrames={f(s.duration)} name={`Talk ${s.id}`}>
        <OffthreadVideo src={staticFile(s.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </Sequence>
    ))}
  </>
);

const Mask: React.FC<{at: number; children: React.ReactNode; dur?: number}> = ({at, children, dur = 0.7}) => {
  const p = prog(useTime(), at, dur);
  return (
    <div style={{overflow: 'hidden', paddingBottom: '0.08em'}}>
      <div style={{transform: `translateY(${(1 - p) * 105}%)`}}>{children}</div>
    </div>
  );
};

const Rule: React.FC<{at: number; width?: number}> = ({at, width = 120}) => {
  const p = prog(useTime(), at, 0.9);
  return <div style={{width, height: 2, background: colors.gold, transformOrigin: 'left', transform: `scaleX(${p})`, margin: '18px 0'}} />;
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontWeight: 600,
  fontSize: 26,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: colors.goldLight,
};
const serif = (size: number, color: string = colors.cream, italic = false): React.CSSProperties => ({
  fontFamily: fonts.serif,
  fontStyle: italic ? 'italic' : 'normal',
  fontSize: size,
  lineHeight: 1.02,
  letterSpacing: '-0.01em',
  color,
  textShadow: '0 2px 30px rgba(0,0,0,.35)',
});
const Floor: React.FC<{strength?: number}> = ({strength = 0.8}) => (
  <AbsoluteFill
    style={{background: `linear-gradient(180deg, rgba(14,13,12,0) 48%, rgba(14,13,12,${strength * 0.78}) 78%, rgba(14,13,12,${strength}) 100%)`}}
  />
);

/* Hook: two-line title over the speaker */
const TopTitle: React.FC = () => {
  const t = useTime();
  const o = fadeWindow(t, 0.2, 6.3);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,.72) 0%, rgba(14,13,12,0) 28%)'}} />
      <div style={{position: 'absolute', top: 120, left: 80, right: 80, textAlign: 'center'}}>
        <Mask at={1.45}>
          <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 54, color: colors.cream, letterSpacing: '-0.02em'}}>
            The hardest part of a modern sauna
          </div>
        </Mask>
        <Mask at={4.05} dur={0.9}>
          <div style={serif(100, colors.goldLight, true)}>is making it simple.</div>
        </Mask>
      </div>
    </AbsoluteFill>
  );
};

/* Lower-third title over the speaker */
const LowerTitle: React.FC<{from: number; to: number; eyebrow: string; title: string; size?: number; italic?: boolean}> = ({
  from,
  to,
  eyebrow,
  title,
  size = 100,
  italic = true,
}) => {
  const t = useTime();
  const o = fadeWindow(t, from, to);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Floor />
      <div style={{position: 'absolute', left: 90, right: 90, top: 1150}}>
        <Mask at={from + 0.05}>
          <div style={eyebrowStyle}>{eyebrow}</div>
        </Mask>
        <Rule at={from + 0.15} />
        <Mask at={from + 0.25} dur={0.85}>
          <div style={serif(size, colors.cream, italic)}>{title}</div>
        </Mask>
      </div>
    </AbsoluteFill>
  );
};

/* Full-bleed B-roll insert with slow push; the voice keeps running underneath */
const Insert: React.FC<{
  from: number;
  to: number;
  src: string;
  rate?: number;
  eyebrow: string;
  title?: string;
  size?: number;
}> = ({from, to, src, rate = 1, eyebrow, title, size = 104}) => {
  const t = useTime();
  if (t < from || t >= to) return null;
  const push = 1.03 + 0.05 * ((t - from) / (to - from));
  return (
    <AbsoluteFill>
      <Sequence from={f(from)} durationInFrames={f(to - from)} layout="none" name={`Insert ${eyebrow}`}>
        <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`}} />
      </Sequence>
      <Floor strength={0.7} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 1200}}>
        <Mask at={from + 0.08} dur={0.55}>
          <div style={eyebrowStyle}>{eyebrow}</div>
        </Mask>
        {title ? (
          <>
            <Rule at={from + 0.15} />
            <Mask at={from + 0.22} dur={0.75}>
              <div style={serif(size, colors.cream, true)}>{title}</div>
            </Mask>
          </>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

/* "Removing what's unnecessary" struck through, then the answer — two calm phases, never stacked */
const Minimalism: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useTime();
  const o = fadeWindow(t, from, to);
  const strike = prog(t, 32.7, 0.6);
  const a = fadeWindow(t, from, 34.25, 0.25);
  const b = fadeWindow(t, 34.3, to, 0.25);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Floor strength={0.92} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 1300, opacity: a}}>
        <Mask at={from + 0.05}>
          <div style={eyebrowStyle}>Good minimalism isn't</div>
        </Mask>
        <Rule at={from + 0.15} />
        <Mask at={from + 0.2}>
          <div style={{position: 'relative', display: 'inline-block', ...serif(76, 'rgba(246,241,228,.88)', true)}}>
            removing what's unnecessary
            <div style={{position: 'absolute', left: 0, right: 0, top: '58%', height: 3, background: colors.gold, transformOrigin: 'left', transform: `scaleX(${strike})`}} />
          </div>
        </Mask>
      </div>
      {t >= 34.3 ? (
        <div style={{position: 'absolute', left: 90, right: 90, top: 1300, opacity: b}}>
          <Mask at={34.35}>
            <div style={eyebrowStyle}>It's every detail that remains</div>
          </Mask>
          <Rule at={34.45} />
          <Mask at={36.75} dur={0.9}>
            <div style={serif(96, colors.cream, true)}>exactly where it belongs.</div>
          </Mask>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// Captions hidden where a title already carries the line
const CAPTION_OFF: [number, number][] = [
  [0, 6.3],
  [11.85, 16.1],
  [16.8, 18.85],
  [20.25, 24.75],
  [25.0, 28.85],
  [31.3, 38.25],
  [38.25, 42],
];
const CaptionTrack: React.FC = () => {
  const t = useTime();
  const s = segs.find((x) => t >= starts[x.id] && t < starts[x.id] + x.duration);
  if (!s || CAPTION_OFF.some(([a, b]) => t >= a && t < b)) return null;
  return (
    <Sequence from={f(starts[s.id])} durationInFrames={f(s.duration)} layout="none">
      <Captions words={s.words} top={1480} />
    </Sequence>
  );
};

export const DetailsTalk: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Talker />
    <Vignette />

    <TopTitle />

    {/* "you see wood. You see benches, LEDs and the heater." — one insert per word */}
    <Insert from={11.85} to={13.15} src="media/k_8804.mp4" eyebrow="You see" title="Wood." size={120} />
    <Insert from={13.15} to={13.95} src="media/k_1910.mp4" eyebrow="You see" title="Benches." size={120} />
    <Insert from={13.95} to={15.1} src="media/k_1917.mp4" eyebrow="You see" title="LEDs." size={120} />
    <Insert from={15.1} to={16.1} src="media/k_8813.mp4" eyebrow="You see" title="Heater." size={120} />
    <LowerTitle from={16.8} to={18.85} eyebrow="What really matters" title="The small details." />

    {/* "joints · lining · materials" — numbered detail inserts */}
    <Insert from={20.25} to={21.55} src="media/k_8837.mp4" eyebrow="01 · Joints" title="Clean. Seamless." />
    <Insert from={21.55} to={22.85} src="media/k_1919.mp4" eyebrow="02 · Lining" title="Placed with care." />
    <Insert from={22.85} to={24.75} src="media/k_2020.mp4" rate={0.9} eyebrow="03 · Materials" title="Working together." />
    <LowerTitle from={25.0} to={28.8} eyebrow="Every detail shapes" title="how it looks — and feels." size={92} />

    <Minimalism from={31.3} to={38.2} />

    <Insert from={38.25} to={MAIN} src="media/k_1980.mp4" rate={0.72} eyebrow="PODERA" title="That's what we strive for." size={92} />

    <CaptionTrack />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment VISIT" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* No music (owner): voice only, soft swish where the inserts start */}
    <Sfx name="lib/whoosh/gentle_swish" at={11.8} volume={0.2} />
    <Sfx name="lib/whoosh/gentle_swish" at={20.2} volume={0.2} />
    <Sfx name="lib/whoosh/gentle_swish" at={38.2} volume={0.18} />
  </AbsoluteFill>
);
