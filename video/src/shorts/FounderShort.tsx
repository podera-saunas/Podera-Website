import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from './brand';
import {Captions, Word} from './Captions';
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
  Steam,
  useIn,
  Vignette,
} from './motion';
import transcript from './transcript.json';

type Seg = {id: string; src: string; duration: number; words: Word[]};
const segs = transcript as Seg[];
const FPS = 30;
const OUTRO = 90;
const OUTRO_OVERLAP = 15;
const frames = (s: number) => Math.round(s * FPS);

export const founderShortDuration =
  segs.reduce((a, s) => a + frames(s.duration), 0) + OUTRO - OUTRO_OVERLAP;

const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 1}) => (
  <Sequence from={frames(at)} durationInFrames={frames(2)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

// Footage with punch-in level and a slow push to keep jump cuts alive
const Footage: React.FC<{src: string; zoom: number; dim?: number}> = ({src, zoom, dim = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [0, 0.025]);
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom + drift})`,
          transformOrigin: '50% 32%',
        }}
      />
      {dim > 0 && <AbsoluteFill style={{backgroundColor: `rgba(20,20,20,${dim})`}} />}
    </AbsoluteFill>
  );
};

// Per-segment graphics, timed to word starts (seconds from segment start)
const graphics: Record<string, React.FC> = {
  '01': () => (
    <>
      <Shade strength={0.8} />
      <Stage top={1020}>
        <Eyebrow text="Age 17 · Pattaya, Thailand" at={0} color={colors.gold} />
        <Hero text="Dropped out" at={0.2} size={150} />
        <Script text="of school." at={1.7} size={140} style={{marginTop: -10}} />
      </Stage>
      <Sfx name="whoosh" at={0.15} />
      <Sfx name="shimmer" at={1.7} />
    </>
  ),
  '02': () => (
    <>
      <Shade strength={0.6} />
      <Stage top={980}>
        <Serif text="17" at={1.2} size={300} color={colors.gold} />
        <Eyebrow text="years old" at={1.5} />
      </Stage>
      <Sfx name="pop" at={1.2} />
    </>
  ),
  '03': () => (
    <>
      <Shade strength={0.65} />
      <Stage top={1000}>
        <GlassCard at={1.7}>
          <Eyebrow text="Home for" at={1.7} color={colors.goldLight} />
          <div style={{display: 'flex', alignItems: 'baseline', gap: 24, justifyContent: 'center'}}>
            <Serif text="16" at={3.05} size={170} color={colors.cream} />
            <Serif text="years" at={3.2} size={90} color={colors.cream} italic />
          </div>
          <Eyebrow text="Pattaya, Thailand" at={1.8} />
        </GlassCard>
      </Stage>
      <Sfx name="whoosh" at={1.65} volume={0.8} />
      <Sfx name="pop" at={3.05} />
    </>
  ),
  '04': () => (
    <>
      <Shade strength={0.7} />
      <Stage top={1010}>
        <Eyebrow text="What school didn't give me" at={0.1} color={colors.gold} />
        <div style={{display: 'flex', gap: 56, justifyContent: 'center', alignItems: 'baseline'}}>
          <Serif text="5" at={1.78} size={200} />
          <Serif text="10" at={3.02} size={200} />
          <Serif text="15" at={3.36} size={200} color={colors.gold} />
        </div>
        <Eyebrow text="years from now" at={3.75} />
      </Stage>
      <Sfx name="pop" at={1.78} />
      <Sfx name="pop" at={3.02} />
      <Sfx name="pop" at={3.36} />
    </>
  ),
  '05': () => (
    <>
      <Shade strength={0.65} />
      <Stage top={1000}>
        <GlassCard at={0.1}>
          <Eyebrow text="The idea" at={0.1} color={colors.goldLight} />
          <Serif text="Oct 2025" at={0.3} size={150} />
        </GlassCard>
      </Stage>
      <Sfx name="whoosh" at={0.05} />
    </>
  ),
  '06': () => (
    <>
      <Shade strength={0.75} />
      <Stage top={1010}>
        <Eyebrow text="Prefab" at={1.45} color={colors.gold} />
        <Script text="movable" at={2.1} size={170} style={{marginBottom: -50, zIndex: 2}} />
        <Hero text="Home saunas" at={2.75} size={124} />
      </Stage>
      <Sfx name="shimmer" at={2.1} />
      <Sfx name="whoosh" at={2.7} volume={0.7} />
    </>
  ),
  '07': () => (
    <>
      <Shade strength={0.6} />
      <Stage top={1080}>
        <GoldHighlight text="Get in early." at={0.5} size={110} />
      </Stage>
      <Sfx name="whoosh" at={0.45} volume={0.8} />
    </>
  ),
  '08': () => <Shade strength={0.45} />,
  '09': () => (
    <>
      <Shade strength={0.82} />
      <Stage top={860}>
        <Eyebrow text="I'm the one" at={0} color={colors.gold} />
        <ChecklistRow text="Owner" at={0.45} />
        <ChecklistRow text="Running it" at={2.7} />
        <ChecklistRow text="Controlling everything" at={3.65} />
        <ChecklistRow text="Paying the bills" at={6.1} />
        <ChecklistRow text="Paying the workers" at={7.8} />
      </Stage>
      {[0.45, 2.7, 3.65, 6.1, 7.8].map((t) => (
        <Sfx key={t} name="click" at={t} />
      ))}
    </>
  ),
  '10': () => (
    <>
      <Shade strength={0.7} />
      <Stage top={1020}>
        <Eyebrow text="Built to move" at={0.3} color={colors.gold} />
        <Hero text="Custom trailer" at={2.85} size={130} />
      </Stage>
      <Sfx name="whoosh" at={2.8} />
    </>
  ),
  '11': () => (
    <>
      <Shade strength={0.65} />
      <Stage top={1040}>
        <div style={{display: 'flex', gap: 28, justifyContent: 'center'}}>
          <Chip text="Wheels" at={0.3} />
          <Chip text="Rotate" at={3.8} />
          <Chip text="Lift" at={4.38} gold />
        </div>
      </Stage>
      <Sfx name="pop" at={0.3} />
      <Sfx name="pop" at={3.8} />
      <Sfx name="pop" at={4.38} />
    </>
  ),
  '12': () => (
    <Stage top={860}>
      <Serif text="Sleepless" at={0} size={170} italic />
      <Serif text="nights." at={0.35} size={170} italic color={colors.gold} />
    </Stage>
  ),
  '13': () => {
    return (
      <>
        <Shade strength={0.7} />
        <Stage top={900}>
          <Serif text="months" at={2.0} size={80} color={colors.smoke} italic />
          <Serif text="& months" at={2.72} size={96} color={colors.cream} italic />
          <Serif text="& months" at={3.52} size={112} color={colors.gold} italic />
          <div style={{height: 20}} />
          <Hero text="Standing." at={5.95} size={130} />
        </Stage>
        <Sfx name="pop" at={2.0} volume={0.7} />
        <Sfx name="pop" at={2.72} volume={0.8} />
        <Sfx name="pop" at={3.52} />
        <Sfx name="whoosh" at={5.9} />
      </>
    );
  },
  '14': () => (
    <>
      <Shade strength={0.6} />
      <Stage top={1050}>
        <Script text="on its own." at={0} size={170} />
      </Stage>
      <Sfx name="shimmer" at={0.05} />
    </>
  ),
  '16': () => <Shade strength={0.45} />,
};

const zooms: Record<string, number> = {
  '01': 1.0, '02': 1.1, '03': 1.0, '04': 1.08, '05': 1.0, '06': 1.06, '07': 1.15, '08': 1.05,
  '09': 1.0, '10': 1.0, '11': 1.06, '12': 1.18, '13': 1.0, '14': 1.12, '16': 1.0,
};
// Segments whose graphics already carry the words, so captions would double up
const noCaptions = new Set(['01', '09', '12', '14']);

const LogoOutro: React.FC = () => {
  const bg = useIn(0.35, 8);
  const mark = useIn(0.6, 14);
  const frame = useCurrentFrame();
  const sheen = interpolate(frame, [20, 50], [-60, 160], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{backgroundColor: colors.black, opacity: bg}}>
        <AbsoluteFill
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${colors.line} 0 1px, transparent 1px 24px)`,
            opacity: 0.35,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: mark}}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: '0.18em',
            marginRight: '-0.18em',
            backgroundImage: `linear-gradient(110deg, ${colors.gold} ${sheen - 30}%, ${colors.goldLight} ${sheen}%, ${colors.gold} ${sheen + 30}%)`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            transform: `scale(${0.94 + 0.06 * mark})`,
          }}
        >
          PODERA
        </div>
        <Script text="Your escape, every day" at={1.4} size={110} color={colors.cream} />
        <div style={{height: 60}} />
        <Eyebrow text="Follow the build" at={1.8} color={colors.smoke} />
      </AbsoluteFill>
      <Steam start={0} dur={1.4} />
      <Sfx name="steam" at={0} />
      <Sfx name="shimmer" at={0.7} />
    </AbsoluteFill>
  );
};

export const FounderShort: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <Series>
        {segs.map((s) => {
          const G = graphics[s.id];
          return (
            <Series.Sequence key={s.id} name={`Shot ${s.id}`} durationInFrames={frames(s.duration)}>
              <Footage src={s.src} zoom={zooms[s.id] ?? 1} dim={s.id === '12' ? 0.45 : 0} />
              <Vignette />
              {G && <G />}
              {!noCaptions.has(s.id) && <Captions words={s.words} />}
            </Series.Sequence>
          );
        })}
        <Series.Sequence name="Logo outro" durationInFrames={OUTRO} offset={-OUTRO_OVERLAP}>
          <LogoOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
