// Talking-head reel: "Same sauna, different wood" (files 1944–1948), v2.
// Editorial direction: full-bleed B-roll inserts, masked type reveals, thin gold rules.
// No orbiting/flipping cards, no PIP bubble, no pill polls (owner feedback on v1).
import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {Captions, Word} from './Captions';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, FPS, Music, Sfx} from './timeline';
import segsJson from './wood-words.json';

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
const MAIN = segs.reduce((a, s) => a + s.duration, 0);
const OUTRO = 2.6;
export const woodDuration = f(MAIN + OUTRO);

const expo = Easing.bezier(0.19, 1, 0.22, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
// Global-time helpers (this composition places everything on the root timeline)
const useTime = () => useCurrentFrame() / FPS;
const prog = (t: number, at: number, dur: number) => interpolate(t, [at, at + dur], [0, 1], {...clamp, easing: expo});
const fadeWindow = (t: number, a: number, b: number, d = 0.35) =>
  interpolate(t, [a, a + d, b - d, b], [0, 1, 1, 0], clamp);

/* ---------- talking head ---------- */
const PUNCH: Record<string, number> = {a: 1.0, b: 1.05, c1: 1.0, c2: 1.0, d: 1.07, e: 1.0};
const Talker: React.FC = () => (
  <>
    {segs.map((s) => (
      <Sequence key={s.id} from={f(starts[s.id])} durationInFrames={f(s.duration)} name={`Talk ${s.id}`}>
        <OffthreadVideo
          src={staticFile(s.src)}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${PUNCH[s.id]})`, transformOrigin: '50% 28%'}}
        />
      </Sequence>
    ))}
  </>
);

/* ---------- masked line: text rises out of an invisible slot ---------- */
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
  lineHeight: 1,
  letterSpacing: '-0.01em',
  color,
});

/* Lower-third editorial title, left aligned, inside a soft floor gradient */
const LowerTitle: React.FC<{from: number; to: number; eyebrow: string; title: string; italic?: boolean; top?: number}> = ({
  from,
  to,
  eyebrow,
  title,
  italic,
  top = 1120,
}) => {
  const t = useTime();
  const o = fadeWindow(t, from, to);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 48%, rgba(14,13,12,.62) 78%, rgba(14,13,12,.8) 100%)'}} />
      <div style={{position: 'absolute', left: 90, right: 90, top}}>
        <Mask at={from + 0.05}>
          <div style={eyebrowStyle}>{eyebrow}</div>
        </Mask>
        <Rule at={from + 0.15} />
        <Mask at={from + 0.25} dur={0.85}>
          <div style={serif(104, colors.cream, italic)}>{title}</div>
        </Mask>
      </div>
    </AbsoluteFill>
  );
};

/* Full-bleed B-roll insert with slow push and its own title */
const Insert: React.FC<{
  from: number;
  to: number;
  src: string;
  rate?: number;
  eyebrow: string;
  title: string;
  titleAt?: number;
}> = ({from, to, src, rate = 1, eyebrow, title, titleAt}) => {
  const t = useTime();
  const local = t - from;
  const push = 1.04 + 0.06 * (local / (to - from));
  const inO = interpolate(t, [from, from + 0.25], [0, 1], clamp);
  if (t < from || t >= to) return null;
  return (
    <>
      <AbsoluteFill style={{opacity: inO}}>
        <Sequence from={f(from)} durationInFrames={f(to - from)} layout="none" name={`Insert ${title}`}>
          <OffthreadVideo
            src={staticFile(src)}
            muted
            playbackRate={rate}
            style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`}}
          />
        </Sequence>
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,.15) 0%, rgba(14,13,12,0) 30%, rgba(14,13,12,0) 50%, rgba(14,13,12,.7) 100%)'}} />
        <div style={{position: 'absolute', left: 90, right: 90, top: 1180}}>
          <Mask at={(titleAt ?? from) + 0.1}>
            <div style={eyebrowStyle}>{eyebrow}</div>
          </Mask>
          <Rule at={(titleAt ?? from) + 0.2} />
          <Mask at={(titleAt ?? from) + 0.3} dur={0.85}>
            <div style={serif(112, colors.cream, true)}>{title}</div>
          </Mask>
        </div>
      </AbsoluteFill>
    </>
  );
};

/* Hook split screen: the same frame, two moods, divided by a gold hairline */
const SplitSame: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useTime();
  const open = prog(t, from, 0.5);
  const mood = prog(t, from + 0.9, 0.9);
  const half = (top: boolean) => (
    <div style={{position: 'absolute', left: 0, right: 0, top: top ? 0 : 960, height: 960, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -480, height: 1920}}>
        <OffthreadVideo
          src={staticFile('media/e_8800.mp4')}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: top
              ? `saturate(${1 - 0.55 * mood}) brightness(${1 + 0.28 * mood}) hue-rotate(${-8 * mood}deg)`
              : `saturate(${1 + 0.35 * mood}) sepia(${0.3 * mood}) brightness(${1 - 0.08 * mood})`,
          }}
        />
      </div>
    </div>
  );
  if (t < from || t >= to) return null;
  return (
    <Sequence from={f(from)} durationInFrames={f(to - from)} name="Hook split" layout="none">
      <AbsoluteFill style={{clipPath: `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0)`}}>
        {half(true)}
        {half(false)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 959, height: 2, background: colors.gold}} />
        <div style={{position: 'absolute', left: 90, top: 860, ...eyebrowStyle, opacity: mood}}>Same sauna</div>
        <div style={{position: 'absolute', left: 90, top: 990, ...eyebrowStyle, opacity: mood}}>Different wood</div>
      </AbsoluteFill>
    </Sequence>
  );
};

/* Triptych of the three interiors, panels wipe in on each name */
const Triptych: React.FC<{from: number; to: number; panels: {src: string; name: string; at: number}[]}> = ({from, to, panels}) => {
  const t = useTime();
  const o = interpolate(t, [from, from + 0.2, to - 0.25, to], [0, 1, 1, 0], clamp);
  if (t < from || t >= to) return null;
  return (
    <>
      <AbsoluteFill style={{backgroundColor: colors.black, opacity: o}}>
        {panels.map((p, i) => {
          const w = prog(t, p.at - 0.15, 0.6);
          return (
            <div
              key={p.name}
              style={{position: 'absolute', top: 0, bottom: 0, left: i * 360, width: 358, overflow: 'hidden', clipPath: `inset(${(1 - w) * 100}% 0 0 0)`}}
            >
              <Sequence from={f(from)} durationInFrames={f(to - from)} layout="none" name={`Triptych ${p.name}`}>
                <OffthreadVideo src={staticFile(p.src)} muted style={{width: 1080, height: 1920, marginLeft: -360, objectFit: 'cover'}} />
              </Sequence>
              <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 55%, rgba(14,13,12,.75) 100%)'}} />
              <div style={{position: 'absolute', left: 30, right: 20, bottom: 300}}>
                <Mask at={p.at + 0.15}>
                  <div style={{...eyebrowStyle, fontSize: 22}}>{`0${i + 1}`}</div>
                </Mask>
                <Mask at={p.at + 0.25}>
                  <div style={serif(56)}>{p.name}</div>
                </Mask>
              </div>
            </div>
          );
        })}
        <div style={{position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center'}}>
          <Mask at={from + 0.1}>
            <div style={eyebrowStyle}>PODERA · three interiors</div>
          </Mask>
        </div>
      </AbsoluteFill>
    </>
  );
};

/* Top title over the speaker (hook) */
const TopTitle: React.FC = () => {
  const t = useTime();
  const o = fadeWindow(t, 0.2, 6.3, 0.3);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,.7) 0%, rgba(14,13,12,0) 26%)'}} />
      <div style={{position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center'}}>
        <Mask at={0.25}>
          <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 64, color: colors.cream, letterSpacing: '-0.02em'}}>
            Same sauna.
          </div>
        </Mask>
        <Mask at={3.45} dur={0.9}>
          <div style={serif(98, colors.goldLight, true)}>Different wood.</div>
        </Mask>
      </div>
    </AbsoluteFill>
  );
};

/* Closing question: three editorial lines with hairline dividers */
const Question: React.FC<{from: number; to: number}> = ({from, to}) => {
  const t = useTime();
  const o = fadeWindow(t, from, to);
  const rows = [
    {n: '01', label: 'Bright', wood: 'Pine', at: 53.85},
    {n: '02', label: 'Contrast', wood: 'Mixed Abachi', at: 56.0},
    {n: '03', label: 'Warm', wood: 'Canadian Cedar', at: 58.8},
  ];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 42%, rgba(14,13,12,.7) 70%, rgba(14,13,12,.85) 100%)'}} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 980}}>
        <Mask at={from + 0.05}>
          <div style={eyebrowStyle}>Which one is yours?</div>
        </Mask>
        {rows.map((r) => {
          const line = prog(t, r.at, 0.8);
          return (
            <div key={r.n}>
              <div style={{height: 1, background: 'rgba(246,241,228,.35)', transformOrigin: 'left', transform: `scaleX(${line})`, marginTop: 22}} />
              <Mask at={r.at + 0.1}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 26, paddingTop: 14}}>
                  <span style={{...eyebrowStyle, fontSize: 22, color: colors.gold}}>{r.n}</span>
                  <span style={serif(70)}>{r.label}</span>
                  <span style={{marginLeft: 'auto', fontFamily: fonts.sans, fontWeight: 500, fontSize: 28, color: 'rgba(246,241,228,.75)'}}>
                    {r.wood}
                  </span>
                </div>
              </Mask>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* "Not the most expensive" — a single hairline strike, then the answer */
const NotExpensive: React.FC = () => {
  const t = useTime();
  const o = fadeWindow(t, 37.3, 43.75);
  const strike = prog(t, 38.25, 0.6);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 48%, rgba(14,13,12,.62) 78%, rgba(14,13,12,.8) 100%)'}} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 1110}}>
        <Mask at={37.35}>
          <div style={{position: 'relative', display: 'inline-block', fontFamily: fonts.sans, fontWeight: 500, fontSize: 46, color: 'rgba(246,241,228,.8)'}}>
            Not the most expensive wood
            <div style={{position: 'absolute', left: 0, right: 0, top: '55%', height: 2, background: colors.gold, transformOrigin: 'left', transform: `scaleX(${strike})`}} />
          </div>
        </Mask>
        <Rule at={40.1} />
        <Mask at={40.25} dur={0.9}>
          <div style={serif(104, colors.cream, true)}>The one that feels right.</div>
        </Mask>
      </div>
    </AbsoluteFill>
  );
};

// Captions sit under everything but are hidden where a title already carries the line
const CAPTION_OFF: [number, number][] = [
  [0, 0.2],
  [1.4, 3.45],
  [10.05, 13.5],
  [20.85, 28.95],
  [37.3, 43.8],
  [47.2, 51.75],
  [52.6, 61],
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

export const WoodOptions: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Talker />
    <Vignette />

    <TopTitle />
    <SplitSame from={1.4} to={3.45} />

    <LowerTitle from={7.2} to={10.05} eyebrow="PODERA interiors" title="Three woods." />
    <Triptych
      from={10.05}
      to={13.5}
      panels={[
        {src: 'media/e_pine.mp4', name: 'Pine', at: 10.25},
        {src: 'media/e_1907.mp4', name: 'Mixed Abachi', at: 11.05},
        {src: 'media/e_8803.mp4', name: 'Cedar', at: 12.25},
      ]}
    />
    <LowerTitle from={15.45} to={20.7} eyebrow="In this sauna" title="Canadian Cedar" />

    <Insert from={20.85} to={25.35} src="media/e_pine.mp4" rate={0.75} eyebrow="01 · Pine" title="Bright & vibrant." titleAt={22.5} />
    <Insert from={25.35} to={28.95} src="media/e_1907.mp4" rate={0.9} eyebrow="02 · Mixed Abachi" title="Contrast." titleAt={26.9} />
    <LowerTitle from={29.0} to={34.5} eyebrow="03 · Canadian Cedar" title="Warm & welcoming." italic />

    <NotExpensive />

    <Insert from={47.2} to={51.75} src="media/e_8848.mp4" eyebrow="Pattaya · Phuket" title="Come and feel it." titleAt={47.4} />

    <Question from={52.6} to={MAIN - 0.2} />

    <CaptionTrack />

    <Sequence from={f(MAIN - 0.3)} durationInFrames={f(OUTRO + 0.3)} name="Logo outro">
      <LogoOutro cta="Comment your pick" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Music well under the voice; sparse, soft SFX only on structural cuts */}
    <Music src="music/wood_infinite_echoes.wav" volume={0.05} />
    <Sfx name="lib/whoosh/gentle_swish" at={1.35} volume={0.22} />
    <Sfx name="lib/whoosh/gentle_swish" at={10.0} volume={0.22} />
    <Sfx name="lib/whoosh/gentle_swish" at={20.8} volume={0.2} />
    <Sfx name="lib/whoosh/gentle_swish" at={47.15} volume={0.2} />
  </AbsoluteFill>
);
