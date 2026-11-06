// N5 "A sauna as a villa-rental upgrade" — B2B product video, minimalist editorial (same kit as N3 v3 / N4 v4).
// No pool/villa footage yet → the script's fallback hook "Imagine this next to your pool"; the showroom sauna is
// never cut as if it stood at a villa. Cuts land on the beat of a light CC0 track (Fresh Focus, 103 BPM).
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {EdShot, Floor, Footage, Line, shotsLength} from './editorial';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Vignette} from './motion';
import {f, Music} from './timeline';

// Cut points = music beats: 3.088 · 7.709 · 10.031 · 12.353 · 14.675 · 18.158 · 21.618 · 24.52 · 27.4
// Every source clip starts ≥ 1 s past its shaky start.
const SHOTS: EdShot[] = [
  {src: 'media/x_8849.mp4', dur: 3.088}, // sauna B at blue hour, lit inside
  {src: 'media/x_8853.mp4', dur: 4.621}, // orbit around the corner to the glowing window
  {src: 'media/x_1994.mp4', dur: 2.322}, // listing shot 1: facade, day
  {src: 'media/x_8838.mp4', dur: 2.322}, // listing shot 2: benches with light
  {src: 'media/x_8800.mp4', dur: 2.322}, // listing shot 3: steam room
  {src: 'media/x_1882.mp4', dur: 3.483}, // hand on the touch control panel
  {src: 'media/x_8814.mp4', dur: 3.46, rate: 0.9}, // benches
  {src: 'media/x_8812.mp4', dur: 2.902}, // heater against the panoramic window, evening
  {src: 'media/x_8847.mp4', dur: 2.88}, // facade from the porch, evening
];
const MAIN = shotsLength(SHOTS); // 27.4
const OUTRO = 2.6;
export const villaDuration = f(MAIN + OUTRO); // 30 s

export const VillaEditorial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Footage shots={SHOTS} />
    <Vignette />
    <Floor />

    <Line from={0.3} to={2.85} eyebrow="Villa owners" text="Your guests have seen a hundred pools." size={88} />
    <Line from={3.4} to={7.45} text="Imagine this next to yours." />
    <Line from={8.0} to={14.45} eyebrow="Arrives finished" text="Installed in 1 day." sub="No renovation. No closed weeks." />
    <Line from={15.0} to={17.9} text="Simple controls for guests." size={88} />
    <Line from={18.45} to={21.35} eyebrow="2.5×4 · 2.5×6" text="4 to 8 guests." />
    <Line from={21.9} to={24.3} text="The photo they stop on." />
    <Line from={24.8} to={MAIN} eyebrow="Own or manage rentals?" text="Comment VILLA" serif={false} size={92} sub="We'll send specs and power requirements." />

    <Sequence from={f(MAIN)} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta="Comment VILLA" />
    </Sequence>
    <Grain opacity={0.04} />

    {/* Light, quiet CC0 bed (Fresh Focus, FreePD, 103 BPM). No source audio. */}
    <Music src="music/n5_fresh_focus.wav" volume={0.3} />
  </AbsoluteFill>
);
