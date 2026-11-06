// N6 "Phone stays outside" — image film, a ritual without voice. The product is privacy and quiet.
// Long calm shots (3.4–3.8 s), no speed-ups, three lines only, no CTA in the video (caption: VISIT).
// No source audio (owner): calm CC0 lofi bed (Saturation, HoliznaCC0) + soft door and steam foley.
// Only clips never used in earlier videos.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, Music, Sfx} from './timeline';

const SHOTS: EdShot[] = [
  {src: 'media/r_1875.mp4', dur: 3.6, rate: 0.95}, // outside: control panel → glowing steam-room window
  {src: 'media/r_8811.mp4', dur: 3.8, rate: 0.9}, // inside: soft light along the benches
  {src: 'media/r_8840.mp4', dur: 3.8, rate: 0.5}, // the heater tower, 50 % (60 fps source)
  {src: 'media/r_8813.mp4', dur: 3.8, rate: 0.5}, // heater stones cage, 50 % (60 fps source)
  {src: 'media/r_8837.mp4', dur: 3.6, rate: 0.7}, // wood and light
  {src: 'media/r_8817.mp4', dur: 3.6, rate: 0.8}, // evening behind the glass
  {src: 'media/r_8859.mp4', dur: 3.4, rate: 0.9}, // back outside at night
];
const MAIN = shotsLength(SHOTS); // 25.6
const OUTRO = 2.4;
export const ritualDuration = f(MAIN + OUTRO); // 28 s

export const RitualEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
    <Vignette />
    <Floor />

    <Line from={0.4} to={3.35} text="Phone stays outside." />
    <Line from={8.0} to={14.7} text="20 minutes. Yours." />
    <Line from={22.6} to={MAIN} text="Every evening. At home." size={88} />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Calm CC0 bed + soft foley: door closes, steam on the heater, door opens */}
    <Music src="music/n6_saturation.wav" volume={0.3} />
    <Sfx name="lib/door/door_close_01" at={3.2} volume={0.4} />
    <Sfx name="steam" at={7.7} volume={0.4} />
    <Sfx name="steam" at={11.5} volume={0.3} />
    <Sfx name="lib/door/door_open" at={22.0} volume={0.3} />
  </AbsoluteFill>
);
