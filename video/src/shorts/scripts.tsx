// Text-led scripted shorts N2–N4 (no voice-over: the script's lines are on-screen copy).
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {LogoOutro} from './LogoOutro';
import {Receipt3D} from './receipt3d';
import {Shade, Stage, Vignette} from './motion';
import {
  A,
  Block,
  f,
  Music,
  Say,
  Sfx,
  Shot,
  Shots,
  shotsDuration,
  TopShade,
  TypeLine,
  MinLine,
  SoftFloor,
} from './timeline';

const OUTRO = 2.6;

const Frame: React.FC<{shots: Shot[]; music: string; volume?: number; cta: string; children: React.ReactNode}> = ({
  shots,
  music,
  volume,
  cta,
  children,
}) => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Shots shots={shots} />
    <Vignette />
    {children}
    <Sequence from={f(shotsDuration(shots))} durationInFrames={f(OUTRO)} name="Logo outro">
      <LogoOutro cta={cta} />
    </Sequence>
    <Music src={music} volume={volume} />
  </AbsoluteFill>
);

/* ---------- N2 · 3 years of spa vs your own sauna ---------- */
const n2Shots: Shot[] = [
  {src: 'media/b_1952.mp4', dur: 3.2},
  {src: 'media/b_8838.mp4', dur: 5.0},
  {src: 'media/b_8841.mp4', dur: 4.8},
  {src: 'media/b_8808.mp4', dur: 2.2},
  {src: 'media/b_8849.mp4', dur: 2.6},
  {src: 'media/b_8800.mp4', dur: 3.8},
  {src: 'media/b_8818.mp4', dur: 3.6, trim: 3},
  {src: 'media/b_8850.mp4', dur: 3.3},
  {src: 'media/b_8847.mp4', dur: 3.0, trim: 4, dim: 0.35},
];
export const n2Duration = f(shotsDuration(n2Shots) + OUTRO);

export const SpaVsSauna: React.FC = () => (
  <Frame shots={n2Shots} music="music/n2_energizing.wav" volume={0.6} cta="Comment PRICE">
    <Block from={0} to={3.2} name="Hook: receipt">
      <TopShade strength={0.75} />
      <Stage top={250}>
        <A.Hero text="3 years of spa" at={0.15} size={110} />
        <A.Serif text="= ?" at={0.6} size={150} color={colors.gold} />
      </Stage>
      <Receipt3D at={0.25} total="?" />
    </Block>
    <Block from={3.2} to={8.2} name="The maths">
      <Shade strength={0.7} />
      <Stage top={1000}>
        <A.Eyebrow text="Let's actually count" at={3.3} color={colors.gold} />
        <Say text="*Two* people. *Twice* a week." at={3.5} />
        <TypeLine text="2 × 2 × 52 weeks × 3 years" at={5.2} size={58} />
      </Stage>
    </Block>
    <Block from={8.2} to={15.2} name="The total">
      <Shade strength={0.75} />
      <Stage top={960}>
        <TypeLine text="= 624 spa tickets" at={8.5} size={86} color={colors.gold} />
        <TypeLine text="= 312 trips across town" at={10.6} size={62} />
        <Say text="Each one: booking, traffic, *strangers*." at={12.6} size={56} />
      </Stage>
    </Block>
    <Block from={15.2} to={25.2} name="Your own PODERA">
      <TopShade strength={0.7} />
      <Stage top={260}>
        <A.Eyebrow text="Or" at={15.3} color={colors.gold} />
        <A.Hero text="Your own PODERA" at={15.5} size={104} />
      </Stage>
      <Shade strength={0.6} />
      <Stage top={1080}>
        <A.Glass at={18.0}>
          <A.Eyebrow text="Per one-hour session" at={18.0} color={colors.goldLight} />
          <A.Serif text="≈ 12 kWh" at={18.2} size={120} />
          <A.Eyebrow text="12 kW SAWO heater" at={18.4} />
        </A.Glass>
      </Stage>
      <Block from={21.6} to={25.2} name="No booking">
        <Stage top={1320}>
          <Say text="No booking. No strangers. *Every day.*" at={21.8} size={58} />
        </Stage>
      </Block>
    </Block>
    <Block from={25.2} to={31.5} name="Honest CTA">
      <Shade strength={0.75} />
      <Stage top={980}>
        <Say text="Once a month? Keep the *spa*." at={25.4} size={58} />
        <Say text="Twice a week?" at={27.4} />
        <div style={{height: 20}} />
        <A.Gold text="Comment PRICE" at={28.4} size={96} />
      </Stage>
    </Block>
    <Sfx name="whoosh" at={0.3} />
    <Sfx name="pop" at={0.6} />
    <Sfx name="click" at={5.2} />
    <Sfx name="click" at={8.5} />
    <Sfx name="pop" at={9.1} />
    <Sfx name="click" at={10.6} />
    <Sfx name="whoosh" at={15.5} />
    <Sfx name="pop" at={18.2} />
    <Sfx name="whoosh" at={28.4} />
  </Frame>
);

/* ---------- N3 · Don't buy a sauna from photos (minimalist) ---------- */
const n3Shots: Shot[] = [
  {src: 'media/b_1881.mp4', dur: 3.8, zoom: 1.02},
  {src: 'media/b_8848.mp4', dur: 5.0, zoom: 1.02},
  {src: 'media/b_1952.mp4', dur: 3.5, zoom: 1.02},
  {src: 'media/b_8803.mp4', dur: 3.5, zoom: 1.02},
  {src: 'media/b_8839.mp4', dur: 4.0, zoom: 1.02},
  {src: 'media/b_8801.mp4', dur: 4.5, zoom: 1.02},
  {src: 'media/b_8844.mp4', dur: 4.0, zoom: 1.02},
];
export const n3Duration = f(shotsDuration(n3Shots) + OUTRO);

export const VisitShowroom: React.FC = () => (
  <Frame shots={n3Shots} music="music/n3_walking_away.wav" volume={0.55} cta="Comment VISIT">
    <SoftFloor />
    <MinLine text="Don't buy a sauna" at={0.4} until={3.8} size={64} top={1270} />
    <MinLine text="from photos." at={1.2} until={3.8} size={120} font="script" color={colors.gold} top={1340} />
    <MinLine text="Pattaya · Phuket" at={4.2} until={8.8} size={34} color={colors.gold} top={1290} />
    <MinLine text="Come and sit in one." at={4.8} until={8.8} size={58} top={1350} />
    <MinLine text="Touch the wood." at={9.2} until={15.8} size={58} />
    <MinLine text="Feel the heat." at={16.2} until={19.8} size={58} />
    <MinLine text="Stay as long as you need." at={20.2} until={24.3} size={58} />
    <MinLine text="Comment VISIT" at={24.7} until={28.3} size={64} color={colors.gold} />
  </Frame>
);

/* ---------- N4 · What's hidden in the walls (minimalist, no people) ---------- */
const n4Shots: Shot[] = [
  {src: 'media/b_8862.mp4', dur: 4.0, zoom: 1.06},
  {src: 'media/b_9412.mp4', dur: 3.5, zoom: 1.02},
  {src: 'media/b_8861.mp4', dur: 3.0, zoom: 1.02},
  {src: 'media/b_8820.mp4', dur: 3.0, zoom: 1.02},
  {src: 'media/b_8803.mp4', dur: 3.0, zoom: 1.02},
  {src: 'media/b_8839.mp4', dur: 4.0, zoom: 1.02},
  {src: 'media/b_8851.mp4', dur: 4.0, zoom: 1.02},
  {src: 'media/b_8836.mp4', dur: 3.5, zoom: 1.02},
  {src: 'media/b_8853.mp4', dur: 4.0, trim: 1.6, zoom: 1.02},
];
export const n4Duration = f(shotsDuration(n4Shots) + OUTRO);

export const InsideTheWalls: React.FC = () => (
  <Frame shots={n4Shots} music="music/n4_big_eyes.wav" volume={0.6} cta="Comment WOOD">
    <SoftFloor />
    <MinLine text="What you don't see" at={0.8} until={4.0} size={64} top={1270} />
    <MinLine text="costs the most." at={1.6} until={4.0} size={120} font="script" color={colors.gold} top={1340} />
    <MinLine text="Built in our workshop." at={4.4} until={7.5} />
    <MinLine text="Cladding." at={7.8} until={10.5} />
    <MinLine text="Insulation." at={10.8} until={13.5} />
    <MinLine text="Cedar inside." at={13.8} until={16.5} />
    <MinLine text="SAWO · 12 kW" at={16.8} until={20.5} />
    <MinLine text="The heat stays in." at={20.8} until={24.5} />
    <MinLine text="You'll never see these layers." at={25.0} until={28.0} size={52} />
    <MinLine text="You'll feel them." at={28.4} until={32.0} size={120} font="script" color={colors.gold} top={1310} />
    <Sfx name="knock" at={0.15} volume={0.8} />
    <Sfx name="knock" at={0.42} volume={0.8} />
    <Sfx name="knock" at={0.68} volume={0.8} />
  </Frame>
);
