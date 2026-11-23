// N8 (honest version) "Built in our workshop" — product video, editorial minimal.
// The scripted "Day 1 of N" build diary needs daily tripod footage that does not exist yet, so this cut shows
// only the real workshop clips we have, in build order, with no day counter, no master's name and no truck.
// No source audio; calm CC0 lofi bed. Every clip starts past its shaky first second where the source allows.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, Music} from './timeline';

const SHOTS: EdShot[] = [
  {src: 'media/b8_0006.mp4', dur: 3.0, rate: 0.7}, // saw cut
  {src: 'media/b8_8823.mp4', dur: 3.4}, // wooden handrail, macro
  {src: 'media/b8_1987.mp4', dur: 2.8}, // eave underside with lights, day
  {src: 'media/b8_1905.mp4', dur: 2.6}, // porch deck boards and railing
  {src: 'media/b8_8841.mp4', dur: 3.0}, // SAWO heater tower
  {src: 'media/b8_1882.mp4', dur: 3.0}, // hand on the control panel
  {src: 'media/b8_8845.jpg', dur: 3.2, still: true}, // finished sauna, evening (photo)
  {src: 'media/b8_8854.jpg', dur: 3.2, still: true}, // lit steam room through the window (photo)
];
const MAIN = shotsLength(SHOTS); // 24.2
const OUTRO = 2.6;
export const workshopDuration = f(MAIN + OUTRO);

export const WorkshopEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
    <Vignette />
    <Floor />

    <Line from={0.3} to={2.75} eyebrow="Behind every PODERA" text="It starts here." />
    <Line from={3.3} to={6.15} text="Real wood." />
    <Line from={6.7} to={8.95} text="Built in our workshop." />
    <Line from={9.5} to={11.55} text="Every board fitted." />
    <Line from={12.1} to={14.95} eyebrow="SAWO" text="The heater goes in." />
    <Line from={15.4} to={17.95} text="Tested before it leaves." size={88} />
    <Line from={18.5} to={20.95} eyebrow="On your plot" text="Installed in 1 day." />
    <Line from={21.5} to={MAIN} eyebrow="See one finished" text="Comment VISIT" serif={false} size={92} />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment VISIT" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Calm CC0 lofi bed (Infinite Echoes, HoliznaCC0). No source audio. */}
    <Music src="music/wood_infinite_echoes.wav" volume={0.3} />
  </AbsoluteFill>
);
