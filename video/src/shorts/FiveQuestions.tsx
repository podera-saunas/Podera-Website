// N7 "Before you pay for a sauna — 5 questions" — product video, editorial minimal (same kit as N3–N6).
// No voice-over recorded and no person on camera → the questions are on-screen text. The question number is a
// big gold counter that always sits in the same place. No competitors named, no prices shown.
// Only clips never used in earlier videos. Calm CC0 lofi beat, no source audio.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, FPS, Music} from './timeline';

const SHOTS: EdShot[] = [
  {src: 'media/q_1979.mp4', dur: 3.2}, // hook: sauna A, day
  {src: 'media/q_8857.mp4', dur: 5.0, rate: 0.6}, // Q1 walls: corner, cladding → window, night
  {src: 'media/q_8810.mp4', dur: 1.7}, // Q2 heater cage
  {src: 'media/q_1984.mp4', dur: 1.8}, // Q2 control panel on the facade
  {src: 'media/q_8821.mp4', dur: 3.5}, // Q3 interior wood: floor → benches
  {src: 'media/q_1981.mp4', dur: 3.5, rate: 0.8}, // Q4 the whole module on its blocks
  {src: 'media/q_1996.mp4', dur: 3.5, rate: 0.78}, // Q4 porch and side window
  {src: 'media/q_8799.mp4', dur: 4.0}, // Q5 door handle, push-in
  {src: 'media/q_8852.mp4', dur: 3.4}, // Save this: past the lit window to the door, night
  {src: 'media/q_8860.mp4', dur: 2.8}, // CTA: corner window, night
];
const MAIN = shotsLength(SHOTS); // 32.4
const OUTRO = 2.6;
export const fiveQuestionsDuration = f(MAIN + OUTRO); // 35 s

// Counter: [number, from, to]
const STEPS: [number, number, number][] = [
  [1, 3.2, 8.2],
  [2, 8.2, 11.7],
  [3, 11.7, 15.2],
  [4, 15.2, 22.2],
  [5, 22.2, 26.2],
];
const expo = Easing.bezier(0.19, 1, 0.22, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Counter: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const first = STEPS[0][1];
  const last = STEPS[STEPS.length - 1][2];
  if (t < first - 0.05 || t > last) return null;
  const o = interpolate(t, [first, first + 0.3, last - 0.4, last], [0, 1, 1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: 90, top: 1010, opacity: o, display: 'flex', alignItems: 'flex-end', gap: 14}}>
      <div style={{position: 'relative', height: 210, width: 130, overflow: 'hidden'}}>
        {STEPS.map(([n, from, to]) => {
          const y = interpolate(t, [from, from + 0.7, to - 0.25, to + 0.45], [100, 0, 0, -100], {...clamp, easing: expo});
          if (t < from - 0.05 || t > to + 0.5) return null;
          return (
            <div
              key={n}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                transform: `translateY(${y}%)`,
                fontFamily: fonts.serif,
                fontSize: 220,
                lineHeight: 0.95,
                color: colors.gold,
                textShadow: '0 2px 30px rgba(0,0,0,.35)',
              }}
            >
              {n}
            </div>
          );
        })}
      </div>
      <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 30, letterSpacing: '0.18em', color: 'rgba(246,241,228,.7)', paddingBottom: 26}}>
        / 5
      </div>
    </div>
  );
};

export const FiveQuestions: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
    <Vignette />
    <Floor />

    <Line from={0.3} to={2.95} eyebrow="Before you pay for a sauna" text="Ask these 5 questions." size={92} />

    <Counter />
    <Line from={3.6} to={7.95} text="What's in the walls?" sub="And how thick is the insulation?" top={1250} />
    <Line from={8.55} to={11.45} text="Which heater, what power?" sub="And who services it in Thailand?" size={84} top={1250} />
    <Line from={12.05} to={14.95} text="Is the wood rated for 90°C?" sub="And for Thai humidity?" size={84} top={1250} />
    <Line from={15.55} to={21.95} text="What's in the price?" sub="Delivery, crane, connection — or extra?" top={1250} />
    <Line from={22.55} to={25.95} text="Can I see a finished one?" sub="Before I pay anything." size={84} top={1250} />

    <Line from={26.5} to={29.35} text="Save this." size={120} />
    <Line from={29.7} to={MAIN} eyebrow="Our answers to all five" text="Comment PRICE" serif={false} size={92} />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment PRICE" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Calm CC0 lofi beat (One Night In France, HoliznaCC0), quiet. No source audio. */}
    <Music src="music/n7_one_night.wav" volume={0.3} />
  </AbsoluteFill>
);
