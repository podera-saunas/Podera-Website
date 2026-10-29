// Text-led scripted shorts N2–N4 (no voice-over: the script's lines are on-screen copy).
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './brand';
import {LogoOutro} from './LogoOutro';
import {Shade, Stage, Steam, Vignette} from './motion';
import {
  A,
  Block,
  f,
  LayerStack,
  Music,
  Receipt,
  Say,
  Sfx,
  Shot,
  Shots,
  shotsDuration,
  TopShade,
  TypeLine,
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
  <Frame shots={n2Shots} music="music/n2_bed.wav" volume={0.45} cta="Comment PRICE">
    <Block from={0} to={3.2} name="Hook: receipt">
      <TopShade strength={0.75} />
      <Stage top={250}>
        <A.Hero text="3 years of spa" at={0.15} size={110} />
        <A.Serif text="= ?" at={0.6} size={150} color={colors.gold} />
      </Stage>
      <div style={{position: 'absolute', left: 240, top: 860}}>
        <Receipt at={0.3} lines={['2 people', '2 visits a week', '3 years']} total="?" />
      </div>
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

/* ---------- N3 · A finished sauna is waiting for you ---------- */
const n3Shots: Shot[] = [
  {src: 'media/b_1881.mp4', dur: 3.5},
  {src: 'media/b_8848.mp4', dur: 5.0},
  {src: 'media/b_1952.mp4', dur: 3.0},
  {src: 'media/b_8797.mp4', dur: 1.8},
  {src: 'media/b_8803.mp4', dur: 2.2},
  {src: 'media/b_8839.mp4', dur: 3.2},
  {src: 'media/b_8801.mp4', dur: 4.0},
  {src: 'media/b_8818.mp4', dur: 2.8, trim: 0.5},
  {src: 'media/b_8844.mp4', dur: 3.0},
];
export const n3Duration = f(shotsDuration(n3Shots) + OUTRO);

export const VisitShowroom: React.FC = () => (
  <Frame shots={n3Shots} music="music/ambient_bed.wav" volume={0.4} cta="Comment VISIT">
    <Block from={0} to={3.5} name="Hook">
      <TopShade strength={0.75} />
      <Stage top={280}>
        <A.Hero text="Don't buy a sauna" at={0.3} size={104} />
        <A.Script text="from photos." at={1.2} size={150} />
      </Stage>
    </Block>
    <Block from={3.5} to={8.5} name="Finished PODERA">
      <Shade strength={0.65} />
      <Stage top={1060}>
        <A.Eyebrow text="A finished PODERA · Pattaya" at={3.7} color={colors.gold} />
        <Say text="Built. Lit. *Ready to try.*" at={4.8} size={76} />
      </Stage>
    </Block>
    <Block from={8.5} to={15.5} name="Touch it">
      <TopShade strength={0.6} />
      <Stage top={280}>
        <A.Eyebrow text="Touch it. Sit in it." at={8.6} color={colors.gold} />
      </Stage>
      <Shade strength={0.55} />
      <Block from={8.5} to={11.5} name="bench">
        <Stage top={1180}>
          <Say text="Check the *bench height*." at={8.8} size={72} />
        </Stage>
      </Block>
      <Block from={11.5} to={13.3} name="handle">
        <Stage top={1180}>
          <Say text="Feel the *details*." at={11.6} size={72} />
        </Stage>
      </Block>
      <Block from={13.3} to={15.5} name="wood">
        <Stage top={1180}>
          <Say text="Touch the *wood*." at={13.4} size={72} />
        </Stage>
      </Block>
    </Block>
    <Block from={15.5} to={25.5} name="Bring your partner">
      <Steam start={0.1} dur={1.8} />
      <Block from={18.7} to={25.5} name="partner text">
        <Shade strength={0.65} />
        <Stage top={1000}>
          <Say text="Bring your partner." at={18.9} size={70} />
          <Say text="Bring your *plot questions*." at={19.9} size={70} />
          <div style={{height: 16}} />
          <A.Chip text="40 min · no obligation" at={22.0} gold />
        </Stage>
      </Block>
    </Block>
    <Block from={25.5} to={28.5} name="CTA">
      <Shade strength={0.6} />
      <Stage top={1080}>
        <A.Gold text="Comment VISIT" at={25.8} size={100} />
        <Say text="We'll send the location and free times." at={26.6} size={46} />
      </Stage>
    </Block>
    <Sfx name="whoosh" at={0.3} volume={0.6} />
    <Sfx name="shimmer" at={1.2} />
    <Sfx name="steam" at={15.5} volume={1.4} />
    <Sfx name="steam" at={16.6} volume={1.0} />
    <Sfx name="pop" at={22.0} />
    <Sfx name="whoosh" at={25.8} volume={0.7} />
  </Frame>
);

/* ---------- N4 · What's hidden in the walls ---------- */
const n4Shots: Shot[] = [
  {src: 'media/b_2008.mp4', dur: 3.2, zoom: 1.12},
  {src: 'media/b_frame.mp4', dur: 3.0},
  {src: 'media/b_under.mp4', dur: 2.0},
  {src: 'media/b_8861.mp4', dur: 1.75, dim: 0.35},
  {src: 'media/b_frame.mp4', dur: 3.5, trim: 0, dim: 0.6, blur: 6},
  {src: 'media/b_8803.mp4', dur: 1.75, dim: 0.35},
  {src: 'media/b_8809.mp4', dur: 3.5},
  {src: 'media/b_1901.mp4', dur: 3.0},
  {src: 'media/b_8844.mp4', dur: 3.5},
  {src: 'media/b_1952.mp4', dur: 3.0},
  {src: 'media/b_8802.mp4', dur: 5.0},
];
export const n4Duration = f(shotsDuration(n4Shots) + OUTRO);

const stripes = (c: string) => `repeating-linear-gradient(90deg, ${c} 0 3px, transparent 3px 14px)`;

export const InsideTheWalls: React.FC = () => (
  <Frame shots={n4Shots} music="music/ambient_bed.wav" volume={0.4} cta="Comment WOOD">
    <Block from={0} to={3.2} name="Hook: knock">
      <TopShade strength={0.75} />
      <Stage top={280}>
        <A.Hero text="What you don't see" at={0.9} size={100} />
        <A.Script text="costs the most." at={1.8} size={140} />
      </Stage>
    </Block>
    <Block from={3.2} to={8.2} name="Inside the wall">
      <Shade strength={0.7} />
      <Stage top={1060}>
        <A.Eyebrow text="Inside the wall" at={3.3} color={colors.gold} />
        <Say text="A PODERA wall *before it's closed*." at={3.9} size={70} />
      </Stage>
    </Block>
    <Block from={8.2} to={15.2} name="Layers">
      <Shade strength={0.85} />
      <Stage top={960}>
        <A.Eyebrow text="Outside → in" at={8.25} color={colors.gold} />
        <LayerStack
          layers={[
            {label: 'Exterior cladding', at: 8.3, color: '#7D6A55', pattern: stripes('rgba(0,0,0,.25)')},
            {
              label: 'Insulation',
              at: 9.95,
              color: '#D9C27A',
              pattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,.18) 0 4px, transparent 4px 12px)',
            },
            {label: 'Vapour barrier', at: 11.7, color: '#B9BCC0', pattern: 'linear-gradient(135deg,#8d9196,#e6e8ea,#8d9196)'},
            {label: 'Cedar lining', at: 13.45, color: '#B06A3B', pattern: stripes('rgba(0,0,0,.2)')},
          ]}
        />
      </Stage>
    </Block>
    <Block from={15.2} to={18.7} name="SAWO">
      <Shade strength={0.65} />
      <Stage top={1080}>
        <A.Glass at={15.4}>
          <A.Eyebrow text="Heater" at={15.4} color={colors.goldLight} />
          <A.Serif text="SAWO · 12–18 kW" at={15.6} size={96} />
        </A.Glass>
      </Stage>
    </Block>
    <Block from={18.7} to={21.7} name="Ventilation">
      <Shade strength={0.6} />
      <Stage top={1200}>
        <Say text="Ventilation, *built in*." at={18.9} size={74} />
      </Stage>
    </Block>
    <Block from={21.7} to={25.2} name="Door">
      <Shade strength={0.6} />
      <Stage top={1160}>
        <Say text="A glass door that *keeps the heat in*." at={21.9} size={66} />
      </Stage>
    </Block>
    <Block from={25.2} to={33.2} name="Feel them">
      <Shade strength={0.7} />
      <Stage top={1000}>
        <Say text="You'll never see these layers." at={25.4} size={62} />
        <Say text="You'll *feel them* every session." at={27.0} size={62} />
        <div style={{height: 24}} />
        <A.Gold text="Comment WOOD" at={29.6} size={96} />
      </Stage>
    </Block>
    <Sfx name="knock" at={0.15} />
    <Sfx name="knock" at={0.42} />
    <Sfx name="knock" at={0.68} />
    <Sfx name="shimmer" at={1.8} />
    <Sfx name="whoosh" at={3.3} volume={0.6} />
    {[8.3, 9.95, 11.7, 13.45].map((t) => (
      <Sfx key={t} name="click" at={t} />
    ))}
    <Sfx name="pop" at={15.6} />
    <Sfx name="whoosh" at={29.6} volume={0.7} />
  </Frame>
);
