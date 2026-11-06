// N4 v4 "What's hidden in the walls" — product video, minimalist editorial (same kit as N3 v3).
// Hard cuts by layer, one line per shot, real workshop sound + quiet CC0 bed, dull wall knocks on the hook.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, Music, Sfx} from './timeline';

// Every source clip is cut ≥ 1 s past its shaky start (see brand/edits/scripts-N2-N4.md)
const SHOTS: EdShot[] = [
  {src: 'media/w_8862.mp4', dur: 3.2}, // cladding from below, night
  {src: 'media/w_9412.mp4', dur: 3.2, volume: 0.45}, // workshop: bench, mitre saw (real sound)
  {src: 'media/w_0006.mp4', dur: 1.8, volume: 0.3}, // saw cut (real sound)
  {src: 'media/w_2008.mp4', dur: 2.3}, // layer 1: exterior cladding
  {src: 'media/w_8820.mp4', dur: 2.3}, // layer 2: insulation (behind the lit wall)
  {src: 'media/w_8803.mp4', dur: 2.4}, // layer 3: cedar lining
  {src: 'media/w_8809.mp4', dur: 3.5}, // SAWO heater top
  {src: 'media/w_1901.mp4', dur: 3.0}, // vent grille
  {src: 'media/w_1983.mp4', dur: 3.5, rate: 0.75}, // glass door + wooden handle, straight verticals
  {src: 'media/w_1952.mp4', dur: 2.4}, // palm along the bench
  {src: 'media/w_8802.mp4', dur: 2.8}, // wide interior
];
const MAIN = shotsLength(SHOTS); // 30.4
const OUTRO = 2.6;
export const wallsDuration = f(MAIN + OUTRO); // 33 s

export const WallsEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
    <Vignette />
    <Floor />

    <Line from={0.75} to={2.95} text={<>What you don't see<br />costs the most.</>} size={92} />
    <Line from={3.5} to={7.95} eyebrow="Inside the wall" text="Built in our workshop." />
    <Line from={8.45} to={10.25} eyebrow="01 · Outside" text="Exterior cladding." />
    <Line from={10.75} to={12.55} eyebrow="02" text="Insulation." />
    <Line from={13.05} to={14.95} eyebrow="03 · Inside" text="Cedar lining." />
    <Line from={15.5} to={18.45} eyebrow="PODERA 2.5×4" text="SAWO · 12 kW" serif={false} size={92} />
    <Line from={19.0} to={21.45} text="Ventilation, built in." />
    <Line from={22.0} to={24.95} text="A door that keeps the heat in." size={84} />
    <Line from={25.5} to={27.35} text="You'll never see these layers." size={84} />
    <Line from={27.9} to={MAIN} eyebrow="Every session" text="You'll feel them." sub="Comment WOOD for our materials guide." />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment WOOD" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Calm lofi CC0 bed (Walking Away, HoliznaCC0); hook = three dull, dense knocks on the wall */}
    <Music src="music/n3_walking_away.wav" volume={0.3} />
    <Sfx name="lib/impact/impactsoft_heavy_000" at={0.1} volume={0.9} />
    <Sfx name="lib/impact/impactsoft_heavy_001" at={0.36} volume={0.9} />
    <Sfx name="lib/impact/impactsoft_heavy_002" at={0.62} volume={0.9} />
    {/* A soft wood tick on each layer cut */}
    <Sfx name="lib/impact/impactwood_light_003" at={8.2} volume={0.3} />
    <Sfx name="lib/impact/impactwood_light_004" at={10.5} volume={0.3} />
    <Sfx name="lib/impact/impactwood_light_000" at={12.8} volume={0.3} />
  </AbsoluteFill>
);
