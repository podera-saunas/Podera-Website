import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from './brand';
import {Captions, Word} from './Captions';
import {LogoOutro} from './LogoOutro';
import {
  ChecklistRow,
  Chip,
  Eyebrow,
  GlassCard,
  GoldHighlight,
  Hero,
  Script,
  Serif,
  Shade,
  Stage,
  useIn,
  Vignette,
} from './motion';
import words from './yasha-words.json';

const FPS = 30;
const MAIN = 59.1;
const OUTRO_AT = 58.7;
const OUTRO = 2.7;
const f = (s: number) => Math.round(s * FPS);

export const founderShortV2Duration = f(OUTRO_AT + OUTRO);

// Everything inside a Block uses absolute seconds of the main video, so timings
// can be read straight off the transcript.
const Block: React.FC<{from: number; to: number; name: string; children: React.ReactNode}> = ({
  from,
  to,
  name,
  children,
}) => (
  <Sequence from={f(from)} durationInFrames={f(to - from)} name={name}>
    <Shift by={from}>{children}</Shift>
  </Sequence>
);

// Re-bases child timings: children write absolute seconds, Sequence makes frame 0 = `from`
const ShiftContext = React.createContext(0);
const Shift: React.FC<{by: number; children: React.ReactNode}> = ({by, children}) => (
  <ShiftContext.Provider value={by}>{children}</ShiftContext.Provider>
);
const useT = () => React.useContext(ShiftContext);

const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 1}) => (
  <Sequence from={f(at)} durationInFrames={f(2)} layout="none" name={`sfx ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

// Punch-in moments on the talking-head track (absolute seconds → zoom)
const PUNCH: [number, number, number][] = [
  [25.4, 27.2, 1.12],
  [51.0, 56.06, 1.06],
];

const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const punch = PUNCH.find(([a, b]) => t >= a && t < b);
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <OffthreadVideo
        src={staticFile('media/yasha.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${punch ? punch[2] : 1})`,
          transformOrigin: '50% 30%',
        }}
      />
    </AbsoluteFill>
  );
};

// Full-screen B-roll insert; the voice keeps running underneath
const Cutaway: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const push = interpolate(frame, [0, durationInFrames], [1.04, 1.1]);
  const fade = interpolate(frame, [0, 3], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fade}}>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`}}
      />
    </AbsoluteFill>
  );
};

// Photo card that slides in tilted, like a print dropped on the frame
const PhotoCard: React.FC<{src: string; at: number; x: number; y: number; w?: number; rot?: number}> = ({
  src,
  at,
  x,
  y,
  w = 420,
  rot = 4,
}) => {
  const base = useT();
  const p = useIn(at - base, 10);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        padding: 12,
        background: colors.cream,
        borderRadius: 18,
        boxShadow: '0 30px 80px rgba(0,0,0,.55)',
        opacity: p,
        transform: `translateY(${(1 - p) * 120}px) rotate(${rot * p - 8 * (1 - p)}deg) scale(${0.9 + 0.1 * p})`,
      }}
    >
      <Img src={staticFile(src)} style={{width: '100%', borderRadius: 10, display: 'block'}} />
    </div>
  );
};

// Helpers so graphics inside a Block take absolute seconds
const A = {
  Eyebrow: (p: React.ComponentProps<typeof Eyebrow>) => <Eyebrow {...p} at={p.at - useT()} />,
  Hero: (p: React.ComponentProps<typeof Hero>) => <Hero {...p} at={p.at - useT()} />,
  Script: (p: React.ComponentProps<typeof Script>) => <Script {...p} at={p.at - useT()} />,
  Serif: (p: React.ComponentProps<typeof Serif>) => <Serif {...p} at={p.at - useT()} />,
  Gold: (p: React.ComponentProps<typeof GoldHighlight>) => <GoldHighlight {...p} at={p.at - useT()} />,
  Glass: (p: React.ComponentProps<typeof GlassCard>) => <GlassCard {...p} at={p.at - useT()} />,
  Row: (p: React.ComponentProps<typeof ChecklistRow>) => <ChecklistRow {...p} at={p.at - useT()} />,
  Chip: (p: React.ComponentProps<typeof Chip>) => <Chip {...p} at={p.at - useT()} />,
};

// Captions are hidden where a graphic already spells out the words
const CAPTION_OFF: [number, number][] = [
  [0, 2.6],
  [20.4, 24.0],
  [27.4, 34.2],
  [47.4, 51.0],
  [52.9, 56.05],
];

const CaptionTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  if (CAPTION_OFF.some(([a, b]) => t >= a && t < b)) return null;
  return <Captions words={words as Word[]} top={1440} />;
};

export const FounderShortV2: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <Sequence durationInFrames={f(MAIN)} name="Talking head">
        <MainVideo />
      </Sequence>

      {/* B-roll inserts */}
      <Sequence from={f(20.4)} durationInFrames={f(2.2)} name="Cutaway: sauna at blue hour">
        <Cutaway src="media/c_8850.mp4" />
      </Sequence>
      <Sequence from={f(22.6)} durationInFrames={f(1.4)} name="Cutaway: window reveal">
        <Cutaway src="media/c_8853.mp4" />
      </Sequence>
      <Sequence from={f(47.5)} durationInFrames={f(1.2)} name="Cutaway: workshop">
        <Cutaway src="media/c_9412.mp4" />
      </Sequence>
      <Sequence from={f(48.7)} durationInFrames={f(1.2)} name="Cutaway: sawdust">
        <Cutaway src="media/c_9407.mp4" />
      </Sequence>
      <Sequence from={f(49.9)} durationInFrames={f(1.1)} name="Cutaway: saw">
        <Cutaway src="media/c_0006.mp4" />
      </Sequence>
      <Sequence from={f(56.06)} durationInFrames={f(0.95)} name="Cutaway: door into sauna">
        <Cutaway src="media/c_8800.mp4" />
      </Sequence>
      <Sequence from={f(57.0)} durationInFrames={f(0.8)} name="Cutaway: heater">
        <Cutaway src="media/c_8839.mp4" />
      </Sequence>
      <Sequence from={f(57.8)} durationInFrames={f(1.3)} name="Cutaway: exterior night">
        <Cutaway src="media/c_8849.mp4" />
      </Sequence>

      <Vignette />

      {/* Graphics */}
      <Block from={0} to={2.6} name="Hook">
        <Shade strength={0.75} />
        <Stage top={1080}>
          <A.Eyebrow text="Age 17 · Pattaya, Thailand" at={0} color={colors.gold} />
          <A.Hero text="Dropped out" at={0.28} size={140} />
          <A.Script text="of school." at={1.9} size={130} style={{marginTop: -6}} />
        </Stage>
      </Block>
      <Block from={2.7} to={4.8} name="17">
        <Shade strength={0.55} />
        <Stage top={1060}>
          <A.Serif text="17" at={3.8} size={230} color={colors.gold} />
          <A.Eyebrow text="years old" at={4.1} />
        </Stage>
      </Block>
      <Block from={4.9} to={9.1} name="Pattaya 16 years">
        <Shade strength={0.6} />
        <Stage top={1040}>
          <A.Glass at={6.4}>
            <A.Eyebrow text="Home for" at={6.4} color={colors.goldLight} />
            <div style={{display: 'flex', alignItems: 'baseline', gap: 22, justifyContent: 'center'}}>
              <A.Serif text="16" at={7.8} size={150} />
              <A.Serif text="years" at={7.95} size={80} italic />
            </div>
            <A.Eyebrow text="Pattaya, Thailand" at={6.5} />
          </A.Glass>
        </Stage>
      </Block>
      <Block from={9.3} to={15.4} name="5 10 15">
        <Shade strength={0.6} />
        <Stage top={1060}>
          <A.Eyebrow text="What school didn't give me" at={10.8} color={colors.gold} />
          <div style={{display: 'flex', gap: 56, justifyContent: 'center', alignItems: 'baseline'}}>
            <A.Serif text="5" at={12.46} size={180} />
            <A.Serif text="10" at={13.82} size={180} />
            <A.Serif text="15" at={14.04} size={180} color={colors.gold} />
          </div>
          <A.Eyebrow text="years from now" at={14.4} />
        </Stage>
      </Block>
      <Block from={15.6} to={17.85} name="Oct 2025">
        <Shade strength={0.55} />
        <Stage top={1080}>
          <A.Glass at={15.7}>
            <A.Eyebrow text="The idea" at={15.7} color={colors.goldLight} />
            <A.Serif text="Oct 2025" at={15.9} size={130} />
          </A.Glass>
        </Stage>
      </Block>
      <Block from={17.85} to={20.4} name="Idea photo">
        <PhotoCard src="media/p_8846.jpg" at={17.9} x={590} y={1000} w={380} rot={5} />
      </Block>
      <Block from={20.4} to={24.0} name="Movable home saunas (on B-roll)">
        <Shade strength={0.5} />
        <Stage top={1060}>
          <A.Eyebrow text="Prefab" at={20.46} color={colors.gold} />
          <A.Script text="movable" at={21.3} size={170} style={{marginBottom: -46, zIndex: 2}} />
          <A.Hero text="Home saunas" at={22.68} size={130} />
        </Stage>
      </Block>
      <Block from={24.0} to={25.4} name="Get in early">
        <Stage top={1180}>
          <A.Gold text="Get in early." at={24.45} size={100} />
        </Stage>
      </Block>
      <Block from={27.4} to={34.3} name="I'm the one">
        <Shade strength={0.8} />
        <Stage top={1060}>
          <A.Eyebrow text="I'm the one" at={27.5} color={colors.gold} />
          <A.Row text="Running it" at={28.6} />
          <A.Row text="Controlling everything" at={29.52} />
          <A.Row text="Paying the bills" at={31.9} />
          <A.Row text="Paying the workers" at={33.58} />
        </Stage>
      </Block>
      <Block from={34.4} to={42.1} name="Custom trailer">
        <Shade strength={0.55} />
        <Stage top={1120}>
          <A.Eyebrow text="Built to move" at={34.7} color={colors.gold} />
          <A.Hero text="Custom trailer" at={37.28} size={120} />
        </Stage>
      </Block>
      <Block from={42.2} to={47.4} name="Wheels / stand / rotate / lift">
        <Shade strength={0.5} />
        <Stage top={1220}>
          <div style={{display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'nowrap'}}>
            <A.Chip text="Wheels" at={42.54} />
            <A.Chip text="Stand" at={43.82} />
            <A.Chip text="Rotate" at={46.06} />
            <A.Chip text="Lift" at={46.64} gold />
          </div>
        </Stage>
      </Block>
      <Block from={47.4} to={51.0} name="Months (on workshop B-roll)">
        <Shade strength={0.45} />
        <Stage top={1000}>
          <A.Eyebrow text="Finally, after" at={47.5} color={colors.gold} />
          <A.Serif text="months" at={49.04} size={90} color={colors.smoke} italic />
          <A.Serif text="& months" at={49.74} size={110} italic />
          <A.Serif text="& months" at={50.54} size={130} color={colors.gold} italic />
        </Stage>
      </Block>
      <Block from={52.9} to={56.05} name="Standing on its own">
        <AbsoluteFill
          style={{background: 'linear-gradient(180deg, rgba(20,20,20,.75) 0%, rgba(20,20,20,0) 45%)'}}
        />
        <Stage top={330}>
          <A.Hero text="Standing." at={52.98} size={130} />
          <A.Script text="on its own." at={55.24} size={140} style={{marginTop: -10}} />
        </Stage>
      </Block>
      <Block from={56.06} to={58.8} name="Coming soon (on B-roll)">
        <AbsoluteFill
          style={{background: 'linear-gradient(180deg, rgba(20,20,20,.7) 0%, rgba(20,20,20,0) 40%)'}}
        />
        <Stage top={300}>
          <A.Eyebrow text="Stay tuned" at={56.4} color={colors.gold} />
          <A.Hero text="Coming soon" at={57.0} size={110} />
        </Stage>
      </Block>

      <CaptionTrack />

      {/* Sound design */}
      <Sfx name="whoosh" at={0.25} />
      <Sfx name="shimmer" at={1.9} />
      <Sfx name="pop" at={3.8} />
      <Sfx name="whoosh" at={6.4} volume={0.7} />
      <Sfx name="pop" at={7.8} />
      {[12.46, 13.82, 14.04].map((t) => (
        <Sfx key={t} name="pop" at={t} />
      ))}
      <Sfx name="whoosh" at={15.7} volume={0.7} />
      <Sfx name="whoosh" at={17.9} volume={0.6} />
      <Sfx name="whoosh" at={20.4} />
      <Sfx name="shimmer" at={21.3} />
      <Sfx name="whoosh" at={24.45} volume={0.7} />
      {[28.6, 29.52, 31.9, 33.58].map((t) => (
        <Sfx key={t} name="click" at={t} />
      ))}
      <Sfx name="whoosh" at={37.28} />
      {[42.54, 43.82, 46.06, 46.64].map((t) => (
        <Sfx key={t} name="pop" at={t} />
      ))}
      <Sfx name="whoosh" at={47.5} volume={0.8} />
      {[49.04, 49.74, 50.54].map((t) => (
        <Sfx key={t} name="pop" at={t} volume={0.8} />
      ))}
      <Sfx name="whoosh" at={52.98} />
      <Sfx name="shimmer" at={55.24} />
      <Sfx name="whoosh" at={56.06} volume={0.7} />

      <Sequence from={f(OUTRO_AT)} durationInFrames={f(OUTRO)} name="Logo outro">
        <LogoOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
