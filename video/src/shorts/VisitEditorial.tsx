// N3 v3 "Don't buy a sauna from photos" — product video, minimalist editorial.
// One line per shot, masked reveals, PODERA LUT grade, quiet CC0 bed, natural door/steam foley.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, Music, Sfx} from './timeline';

// Every source clip is cut 1 s (or more) past its shaky start
const SHOTS: EdShot[] = [
  {src: 'media/v_1880.mp4', dur: 3.4, rate: 0.85},
  {src: 'media/v_8848.mp4', dur: 5.0, rate: 0.9},
  {src: 'media/v_1952.mp4', dur: 3.0, rate: 0.85},
  {src: 'media/v_8797.mp4', dur: 2.2},
  {src: 'media/v_8806.mp4', dur: 2.0},
  {src: 'media/v_8819.mp4', dur: 2.6, rate: 0.8},
  {src: 'media/v_8801.mp4', dur: 4.2},
  {src: 'media/v_8818.mp4', dur: 3.4},
  {src: 'media/v_8850.mp4', dur: 3.0, rate: 0.75},
];
const MAIN = shotsLength(SHOTS);
const OUTRO = 2.6;
export const visitDuration = f(MAIN + OUTRO);

export const VisitEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
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
    <Sfx name="lib/door/door_open" at={0.35} volume={0.5} />
    <Sfx name="steam" at={15.6} volume={0.9} />
  </AbsoluteFill>
);
