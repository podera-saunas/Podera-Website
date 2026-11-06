// N3 v3 "Don't buy a sauna from photos" — product video, minimalist editorial.
// One line per shot, masked reveals, PODERA LUT grade, quiet CC0 bed, natural door/steam foley.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, FPS, Music, Sfx} from './timeline';

const SHOTS: {src: string; dur: number; rate?: number}[] = [
  {src: 'media/v_1880.mp4', dur: 3.4, rate: 0.9},
  {src: 'media/v_8848.mp4', dur: 5.0},
  {src: 'media/v_1952.mp4', dur: 3.0},
  {src: 'media/v_8797.mp4', dur: 2.2},
  {src: 'media/v_8806.mp4', dur: 2.0},
  {src: 'media/v_8819.mp4', dur: 2.6, rate: 0.8},
  {src: 'media/v_8801.mp4', dur: 4.2},
  {src: 'media/v_8818.mp4', dur: 3.4},
  {src: 'media/v_8850.mp4', dur: 3.0},
];
const MAIN = SHOTS.reduce((a, s) => a + s.dur, 0);
const OUTRO = 2.6;
export const visitDuration = f(MAIN + OUTRO);

const expo = Easing.bezier(0.19, 1, 0.22, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Footage: React.FC = () => {
  let t = 0;
  return (
    <>
      {SHOTS.map((s, i) => {
        const from = t;
        t += s.dur;
        return (
          <Sequence key={s.src} from={f(from)} durationInFrames={f(s.dur)} name={`Shot ${i + 1}`}>
            <Push>
              <OffthreadVideo src={staticFile(s.src)} muted playbackRate={s.rate ?? 1} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </Push>
          </Sequence>
        );
      })}
    </>
  );
};

// Barely-there push-in so every shot breathes
const Push: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{transform: `scale(${1.02 + frame * 0.0006})`}}>{children}</AbsoluteFill>;
};

// One editorial line: eyebrow (optional) + main line, revealed from a mask, fading before the cut
const Line: React.FC<{
  from: number;
  to: number;
  text: string;
  eyebrow?: string;
  sub?: string;
  serif?: boolean;
  size?: number;
}> = ({from, to, text, eyebrow, sub, serif = true, size = 96}) => {
  const t = useCurrentFrame() / FPS;
  if (t < from - 0.05 || t > to) return null;
  const o = interpolate(t, [to - 0.45, to], [1, 0], clamp);
  const rise = (at: number, d = 0.8) => interpolate(t, [at, at + d], [105, 0], {...clamp, easing: expo});
  const rule = interpolate(t, [from + 0.15, from + 1.0], [0, 1], {...clamp, easing: expo});
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: 1230, opacity: o}}>
      {eyebrow ? (
        <div style={{overflow: 'hidden'}}>
          <div
            style={{
              transform: `translateY(${rise(from)}%)`,
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: colors.goldLight,
            }}
          >
            {eyebrow}
          </div>
        </div>
      ) : null}
      <div style={{width: 110, height: 2, background: colors.gold, margin: '16px 0', transformOrigin: 'left', transform: `scaleX(${rule})`}} />
      <div style={{overflow: 'hidden', paddingBottom: '0.08em'}}>
        <div
          style={{
            transform: `translateY(${rise(from + 0.12, 0.9)}%)`,
            fontFamily: serif ? fonts.serif : fonts.sans,
            fontStyle: serif ? 'italic' : 'normal',
            fontWeight: serif ? 400 : 600,
            fontSize: size,
            lineHeight: 1.02,
            letterSpacing: serif ? '-0.01em' : '-0.02em',
            color: colors.cream,
            textShadow: '0 2px 30px rgba(0,0,0,.35)',
          }}
        >
          {text}
        </div>
      </div>
      {sub ? (
        <div style={{overflow: 'hidden', marginTop: 14}}>
          <div style={{transform: `translateY(${rise(from + 0.35)}%)`, fontFamily: fonts.sans, fontWeight: 500, fontSize: 34, color: 'rgba(246,241,228,.82)'}}>
            {sub}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Floor: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 50%, rgba(14,13,12,.55) 78%, rgba(14,13,12,.75) 100%)'}} />
);

export const VisitEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage />
    <Vignette />
    <Floor />

    <Line from={0.35} to={3.35} eyebrow="Before you order" text="Don't buy a sauna from photos." size={92} />
    <Line from={3.7} to={8.35} eyebrow="Pattaya · Phuket" text="A finished PODERA." sub="Heated. Ready for you." />
    <Line from={8.65} to={11.35} text="Touch it." />
    <Line from={11.65} to={15.55} text="Sit in it." />
    <Line from={15.85} to={18.15} text="Feel the heat." />
    <Line from={18.45} to={22.35} text="Bring your partner." sub="And your plot questions." />
    <Line from={22.65} to={25.75} eyebrow="No obligation" text="Stay as long as you need." size={88} />
    <Line from={26.05} to={MAIN} eyebrow="Visit a show sauna" text="Comment VISIT" serif={false} size={92} sub="We'll send the location and free times." />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment VISIT" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Very quiet bed + natural foley only */}
    <Music src="music/n3_going_home.wav" volume={0.22} />
    <Sfx name="lib/door/door_open" at={0.85} volume={0.5} />
    <Sfx name="steam" at={15.6} volume={0.9} />
  </AbsoluteFill>
);
