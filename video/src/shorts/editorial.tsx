// Minimal editorial kit for product/B-roll videos (N3 v3, N4 v4):
// graded shots with a barely-there push-in, one masked line per shot, soft floor gradient.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {f, FPS} from './timeline';

export type EdShot = {src: string; dur: number; rate?: number; volume?: number};

export const shotsLength = (shots: EdShot[]) => shots.reduce((a, s) => a + s.dur, 0);

const expo = Easing.bezier(0.19, 1, 0.22, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Barely-there push-in so every shot breathes
const Push: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{transform: `scale(${1.02 + frame * 0.0006})`}}>{children}</AbsoluteFill>;
};

// Hard cuts only. A shot plays its own sound only when it has a `volume` (e.g. real workshop audio).
export const Footage: React.FC<{shots: EdShot[]}> = ({shots}) => {
  let t = 0;
  return (
    <>
      {shots.map((s, i) => {
        const from = t;
        t += s.dur;
        return (
          <Sequence key={`${s.src}-${i}`} from={f(from)} durationInFrames={f(s.dur)} name={`Shot ${i + 1}`}>
            <Push>
              <OffthreadVideo
                src={staticFile(s.src)}
                muted={!s.volume}
                volume={s.volume ?? 0}
                playbackRate={s.rate ?? 1}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </Push>
          </Sequence>
        );
      })}
    </>
  );
};

// One editorial line: eyebrow (optional) + gold rule + main line, revealed from a mask, fading before the cut
export const Line: React.FC<{
  from: number;
  to: number;
  text: React.ReactNode;
  eyebrow?: string;
  sub?: string;
  serif?: boolean;
  size?: number;
  top?: number;
}> = ({from, to, text, eyebrow, sub, serif = true, size = 96, top = 1230}) => {
  const t = useCurrentFrame() / FPS;
  if (t < from - 0.05 || t > to) return null;
  const o = interpolate(t, [to - 0.45, to], [1, 0], clamp);
  const rise = (at: number, d = 0.8) => interpolate(t, [at, at + d], [105, 0], {...clamp, easing: expo});
  const rule = interpolate(t, [from + 0.15, from + 1.0], [0, 1], {...clamp, easing: expo});
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top, opacity: o}}>
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

export const Floor: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 50%, rgba(14,13,12,.55) 78%, rgba(14,13,12,.75) 100%)'}} />
);
