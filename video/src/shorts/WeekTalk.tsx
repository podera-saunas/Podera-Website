// Talking-head reel T3 "A sauna in a week? I'd decline" (files 2012, 2013, 2015+2016, 2018), editorial style.
// Full-bleed B-roll inserts on the things he names, masked type reveals, thin gold rules, lower-third titles.
// No orbiting/flipping cards, no PIP bubbles, no pill polls (owner rules). No background music.
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {Captions, Word} from './Captions';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, FPS, Sfx} from './timeline';
import segsJson from './week-words.json';

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
const MAIN = segs.reduce((a, s) => a + s.duration, 0); // 52.2
const OUTRO = 2.6;
export const weekDuration = f(MAIN + OUTRO);

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
  const o = fadeWindow(t, 0.2, 6.35);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,.72) 0%, rgba(14,13,12,0) 28%)'}} />
      <div style={{position: 'absolute', top: 120, left: 80, right: 80, textAlign: 'center'}}>
        <Mask at={1.5}>
          <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 60, color: colors.cream, letterSpacing: '-0.02em'}}>A sauna in one week?</div>
        </Mask>
        <Mask at={4.7} dur={0.9}>
          <div style={serif(110, colors.goldLight, true)}>I'd decline.</div>
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

/* Full-bleed insert (video or still photo) with slow push; the voice keeps running underneath */
const Insert: React.FC<{
  from: number;
  to: number;
  src: string;
  still?: boolean;
  rate?: number;
  eyebrow: string;
  title?: string;
  size?: number;
}> = ({from, to, src, still, rate = 1, eyebrow, title, size = 104}) => {
  const t = useTime();
  if (t < from || t >= to) return null;
  const push = 1.03 + 0.05 * ((t - from) / (to - from));
  const media = {width: '100%', height: '100%', objectFit: 'cover' as const, transform: `scale(${push})`};
  return (
    <AbsoluteFill>
      {still ? (
        <Img src={staticFile(src)} style={media} />
      ) : (
        <Sequence from={f(from)} durationInFrames={f(to - from)} layout="none" name={`Insert ${eyebrow}`}>
          <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} style={media} />
        </Sequence>
      )}
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

// Captions hidden where a title already carries the line
const CAPTION_OFF: [number, number][] = [
  [0, 6.35],
  [13.7, 18.6],
  [19.15, 26.25],
  [27.3, 38.75],
  [39.0, 45.9],
  [46.8, 60],
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

export const WeekTalk: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Talker />
    <Vignette />

    <TopTitle />

    <LowerTitle from={13.7} to={18.6} eyebrow="Behind the scenes" title="What none of you see." size={92} />

    {/* "structure · insulation · heaters · testing" — one insert per step */}
    <Insert from={19.15} to={22.1} src="media/m_frame.mp4" rate={0.58} eyebrow="01" title="The structure." />
    <Insert from={22.1} to={23.4} src="media/m_8861.mp4" eyebrow="02" title="Insulation." />
    <Insert from={23.4} to={25.1} src="media/m_8839.mp4" eyebrow="03" title="The heater." />
    <Insert from={25.1} to={26.25} src="media/m_1882.mp4" eyebrow="04" title="Testing." />

    <LowerTitle from={27.3} to={31.9} eyebrow="Every step" title="Correctly. Carefully." size={92} />

    {/* 2015 → 2016 take change is hidden under the photo / real-life pair */}
    <Insert from={31.9} to={34.6} src="media/m_8855.jpg" still eyebrow="In a photo" title="One thing." />
    <Insert from={34.6} to={38.75} src="media/m_8858.mp4" rate={0.81} eyebrow="In real life" title="Something else." />

    <LowerTitle from={39.0} to={41.85} eyebrow="Production at PODERA" title="Four weeks." />
    <LowerTitle from={41.9} to={45.9} eyebrow="Not just to win an order" title="No unrealistic timelines." size={88} />

    <Insert from={46.8} to={MAIN} src="media/m_8846.jpg" still eyebrow="PODERA" title="A product we're proud of." size={92} />

    <CaptionTrack />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment VISIT" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Voice only, no music; soft swish where the insert runs start */}
    <Sfx name="lib/whoosh/gentle_swish" at={19.1} volume={0.2} />
    <Sfx name="lib/whoosh/gentle_swish" at={31.85} volume={0.2} />
    <Sfx name="lib/whoosh/gentle_swish" at={46.75} volume={0.18} />
  </AbsoluteFill>
);
