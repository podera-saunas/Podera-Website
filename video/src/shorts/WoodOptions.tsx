// Talking-head reel: "Same sauna, different wood" (files 1944–1948).
// Talking-head mode = animations + graphics + captions (DESIGN_SYSTEM §13).
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {colors, fonts} from './brand';
import {Captions, Word} from './Captions';
import {Grain} from './fx';
import {LogoOutro} from './LogoOutro';
import {Shade, Stage, Vignette} from './motion';
import {A, Block, f, FPS, MinLine, Music, Sfx, useT} from './timeline';
import segsJson from './wood-words.json';

type Seg = {id: string; src: string; duration: number; words: Word[]};
const segs = segsJson as Seg[];
const starts: Record<string, number> = {};
{
  let t = 0;
  for (const s of segs) {
    starts[s.id] = t;
    t += s.duration;
  }
}
const MAIN = segs.reduce((a, s) => a + s.duration, 0);
const OUTRO = 2.6;
export const woodDuration = f(MAIN + OUTRO);

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
// Absolute-time progress helper (frame is global inside the root composition)
const useP = (at: number, dur = 0.4) => {
  const t = useCurrentFrame() / FPS + useT();
  return interpolate(t, [at, at + dur], [0, 1], {...clamp, easing: ease});
};

/* ---------- wood swatches (tone references, not product photos) ---------- */
const WOODS = {
  pine: {
    name: 'Pine',
    mood: 'bright & vibrant',
    bg: 'repeating-linear-gradient(91deg, rgba(90,60,30,.10) 0 1px, transparent 1px 7px, rgba(90,60,30,.07) 7px 8px, transparent 8px 19px), linear-gradient(90deg, #F0DDB4 0 24%, #E8CF9F 24% 25%, #EED8AC 25% 49%, #E2C792 49% 50%, #F2E1BB 50% 74%, #E6CC9A 74% 75%, #EFD9B0 75% 100%)',
  },
  abachi: {
    name: 'Mixed Abachi',
    mood: 'contrast',
    bg: 'repeating-linear-gradient(91deg, rgba(90,60,30,.10) 0 1px, transparent 1px 7px, rgba(90,60,30,.07) 7px 8px, transparent 8px 19px), linear-gradient(90deg, #E4CFA6 0 16%, #5E3E26 16% 31%, #D9BF92 31% 47%, #7A5233 47% 58%, #EAD6AE 58% 74%, #4E321F 74% 86%, #D2B488 86% 100%)',
  },
  cedar: {name: 'Canadian Cedar', mood: 'warm & welcoming', photo: 'media/p_cedar.jpg'},
} as const;
type WoodKey = keyof typeof WOODS;

const Swatch: React.FC<{wood: WoodKey; w: number; h: number; label?: boolean}> = ({wood, w, h, label = true}) => {
  const wd = WOODS[wood];
  return (
    <div style={{width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
      <div
        style={{
          width: w,
          height: h,
          borderRadius: 22,
          overflow: 'hidden',
          background: 'photo' in wd ? colors.graphite : wd.bg,
          boxShadow: '0 30px 70px rgba(0,0,0,.55), inset 0 0 0 1.5px rgba(246,241,228,.18)',
        }}
      >
        {'photo' in wd ? (
          <Img src={staticFile(wd.photo)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : null}
      </div>
      {label ? (
        <div style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 34, color: colors.cream, letterSpacing: '-0.01em'}}>
          {wd.name}
        </div>
      ) : null}
    </div>
  );
};

/* ---------- talking head track with alternating punch-ins ---------- */
const PUNCH: Record<string, number> = {a: 1.0, b: 1.06, c1: 1.0, c2: 1.0, d: 1.08, e: 1.0};
const Talker: React.FC = () => (
  <>
    {segs.map((s) => (
      <Sequence key={s.id} from={f(starts[s.id])} durationInFrames={f(s.duration)} name={`Talk ${s.id}`}>
        <OffthreadVideo
          src={staticFile(s.src)}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${PUNCH[s.id]})`, transformOrigin: '50% 28%'}}
        />
      </Sequence>
    ))}
  </>
);

/* ---------- brand background for inserts ---------- */
const BrandBg: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill style={{backgroundColor: colors.black}}>
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${colors.line} 0 1px, transparent 1px 24px)`,
          opacity: 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + 12 * Math.sin(t * 0.6)}% ${38 + 6 * Math.cos(t * 0.5)}%, rgba(201,162,39,.22) 0%, rgba(201,162,39,0) 45%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- S1 hook: two identical saunas that diverge ---------- */
const TwinCards: React.FC = () => {
  const inP = useP(0.6, 0.5);
  const diverge = useP(3.4, 0.8);
  const card = (side: -1 | 1) => (
    <div
      style={{
        width: 380,
        height: 500,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,.55)',
        border: `1.5px solid ${colors.line}`,
        transform: `translateY(${(1 - inP) * 160}px) rotate(${side * (3 + 4 * diverge)}deg)`,
        opacity: inP,
      }}
    >
      <Img
        src={staticFile('media/p_8855.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter:
            side < 0
              ? `brightness(${1 + 0.55 * diverge}) saturate(${1 - 0.6 * diverge}) contrast(${1 - 0.15 * diverge})`
              : `brightness(${1 - 0.18 * diverge}) saturate(${1 + 0.7 * diverge}) sepia(${0.55 * diverge})`,
        }}
      />
    </div>
  );
  return (
    <div style={{position: 'absolute', top: 820, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40}}>
      {card(-1)}
      {card(1)}
    </div>
  );
};

/* ---------- S2: video shrinks into a card, wood swatches orbit it ---------- */
const OrbitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS + useT();
  const shrink = interpolate(t, [7.0, 7.6, 13.0, 13.55], [0, 1, 1, 0], {...clamp, easing: ease});
  const order: {wood: WoodKey; at: number}[] = [
    {wood: 'pine', at: 10.2},
    {wood: 'abachi', at: 11.05},
    {wood: 'cedar', at: 12.25},
  ];
  const cardW = 1080 * (1 - 0.42 * shrink);
  const cardH = 1920 * (1 - 0.42 * shrink);
  const cx = 540;
  const cy = 960 - 170 * shrink;
  const spin = t * 0.9;
  const items = order.map((o, i) => {
    const appear = interpolate(t, [o.at, o.at + 0.45], [0, 1], {...clamp, easing: ease});
    const ang = spin + (i * 2 * Math.PI) / 3;
    const x = Math.sin(ang) * 470;
    const z = Math.cos(ang);
    const y = 300 + z * -60;
    return {o, appear, x, z, y};
  });
  const ring = (front: boolean) =>
    items
      .filter((it) => (it.z >= 0) === front)
      .map((it) => (
        <div
          key={it.o.wood}
          style={{
            position: 'absolute',
            left: cx + it.x - 150,
            top: cy + it.y - 260,
            transform: `scale(${(0.72 + 0.28 * (it.z + 1) / 2) * it.appear})`,
            opacity: it.appear * (front ? 1 : 0.75),
            filter: front ? undefined : 'blur(2px) brightness(.7)',
          }}
        >
          <Swatch wood={it.o.wood} w={300} h={360} />
        </div>
      ));
  if (shrink <= 0.001) return null;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: shrink}}>
        <BrandBg />
      </AbsoluteFill>
      {ring(false)}
      <div
        style={{
          position: 'absolute',
          left: cx - cardW / 2,
          top: cy - cardH / 2,
          width: cardW,
          height: cardH,
          borderRadius: 60 * shrink,
          overflow: 'hidden',
          boxShadow: `0 40px 120px rgba(0,0,0,${0.6 * shrink})`,
          outline: `${3 * shrink}px solid rgba(201,162,39,${0.6 * shrink})`,
        }}
      >
        <Sequence from={f(starts.b)} layout="none">
          <OffthreadVideo
            src={staticFile('media/w_b.mp4')}
            muted
            style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)', transformOrigin: '50% 28%'}}
          />
        </Sequence>
      </div>
      {ring(true)}
      <div style={{position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', opacity: shrink}}>
        <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 30, letterSpacing: '0.14em', color: colors.gold}}>
          PODERA INTERIORS
        </div>
        <div style={{fontFamily: fonts.serif, fontSize: 96, color: colors.cream, lineHeight: 1}}>3 woods</div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- PIP bubble: the speaker stays on screen during inserts ---------- */
const Bubble: React.FC<{src: string; segStart: number}> = ({src, segStart}) => {
  const base = useT();
  const p = useP(base + 0.05, 0.4);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        top: 1230,
        width: 250,
        height: 250,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${colors.gold}`,
        boxShadow: '0 20px 60px rgba(0,0,0,.6)',
        transform: `scale(${p})`,
      }}
    >
      <Sequence from={f(segStart) - f(base)} layout="none">
        <OffthreadVideo
          src={staticFile(src)}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(2.2) translateY(14%)'}}
        />
      </Sequence>
    </div>
  );
};

/* ---------- S4: insert with a flipping wood card (Pine → Mixed Abachi) ---------- */
const FlipInsert: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS + useT();
  const enter = useP(20.85, 0.5);
  const flip = interpolate(t, [25.35, 25.85], [0, 180], {...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1)});
  const sway = Math.sin(t * 1.4) * 6;
  const face = (wood: WoodKey, back: boolean, moodAt: number) => {
    const wd = WOODS[wood];
    const m = interpolate(t, [moodAt, moodAt + 0.6], [0, 1], clamp);
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: back ? 'rotateY(180deg)' : undefined,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Swatch wood={wood} w={620} h={760} label={false} />
        <div style={{fontFamily: fonts.sans, fontWeight: 800, fontSize: 92, color: colors.cream, marginTop: 40, letterSpacing: '-0.03em'}}>
          {wd.name}
        </div>
        <div
          style={{
            fontFamily: fonts.script,
            fontSize: 110,
            color: colors.gold,
            marginTop: -6,
            clipPath: `inset(-20% ${(1 - m) * 100}% -20% -5%)`,
          }}
        >
          {wd.mood}
        </div>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <BrandBg />
      <div style={{position: 'absolute', inset: 0, perspective: 1800}}>
        <div
          style={{
            position: 'absolute',
            left: 230,
            top: 220,
            width: 620,
            height: 1100,
            transformStyle: 'preserve-3d',
            transform: `translateY(${(1 - enter) * 300}px) rotateY(${flip + sway}deg) rotateX(${4 + Math.cos(t) * 2}deg)`,
            opacity: enter,
          }}
        >
          {face('pine', false, 23.5)}
          {face('abachi', true, 27.3)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- S8: carousel of real sauna photos spinning in 3D ---------- */
const PHOTOS = ['media/p_8846.jpg', 'media/p_8855.jpg', 'media/p_8834.jpg', 'media/p_8833.jpg', 'media/p_cedar.jpg'];
const PhotoCarousel: React.FC = () => {
  const t = useCurrentFrame() / FPS + useT();
  const enter = useP(47.2, 0.6);
  const rot = (t - 47.2) * 34;
  return (
    <AbsoluteFill>
      <BrandBg />
      <div style={{position: 'absolute', inset: 0, perspective: 1600, perspectiveOrigin: '50% 40%'}}>
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 760,
            transformStyle: 'preserve-3d',
            transform: `scale(${0.8 + 0.2 * enter}) rotateX(-8deg) rotateY(${rot}deg)`,
            opacity: enter,
          }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={src}
              style={{
                position: 'absolute',
                left: -170,
                top: -230,
                width: 340,
                height: 460,
                borderRadius: 22,
                overflow: 'hidden',
                transform: `rotateY(${(i * 360) / PHOTOS.length}deg) translateZ(440px)`,
                boxShadow: '0 20px 60px rgba(0,0,0,.5)',
                border: `1.5px solid ${colors.line}`,
              }}
            >
              <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontFamily: fonts.sans, fontWeight: 600, fontSize: 30, letterSpacing: '0.14em', color: colors.gold, opacity: enter}}>
          PATTAYA · PHUKET
        </div>
        <div style={{fontFamily: fonts.script, fontSize: 130, color: colors.cream, opacity: enter}}>Come and feel it.</div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- S6: strike-through "most expensive" ---------- */
const StrikeLine: React.FC = () => {
  const strike = useP(38.25, 0.35);
  const a = useP(37.4, 0.4);
  return (
    <div style={{position: 'relative', display: 'inline-block', opacity: a}}>
      <div style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 70, color: colors.cream, letterSpacing: '-0.02em'}}>
        The most expensive wood
      </div>
      <div
        style={{
          position: 'absolute',
          left: -10,
          right: -10,
          top: '52%',
          height: 7,
          background: colors.gold,
          transformOrigin: 'left center',
          transform: `scaleX(${strike}) rotate(-2deg)`,
          borderRadius: 4,
        }}
      />
    </div>
  );
};

/* ---------- S9: story-style poll ---------- */
const PollRow: React.FC<{label: string; wood: string; at: number}> = ({label, wood, at}) => {
  const p = useP(at, 0.45);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 820,
        padding: '22px 34px',
        marginTop: 16,
        borderRadius: 999,
        background: 'rgba(20,20,20,.62)',
        backdropFilter: 'blur(14px)',
        border: `1.5px solid ${colors.line}`,
        opacity: p,
        transform: `translateX(${(1 - p) * -60}px)`,
      }}
    >
      <span style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 46, color: colors.cream}}>{label}</span>
      <span style={{fontFamily: fonts.sans, fontWeight: 500, fontSize: 32, color: colors.gold}}>{wood}</span>
    </div>
  );
};

// Captions hidden where an insert or graphic already carries the words
const CAPTION_OFF: [number, number][] = [
  [7.0, 13.55],
  [20.85, 28.95],
  [37.3, 43.8],
  [47.2, 51.75],
];
const CaptionTrack: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const s = segs.find((x) => t >= starts[x.id] && t < starts[x.id] + x.duration);
  if (!s || CAPTION_OFF.some(([a, b]) => t >= a && t < b)) return null;
  return (
    <Sequence from={f(starts[s.id])} durationInFrames={f(s.duration)} layout="none">
      <Captions words={s.words} top={1450} />
    </Sequence>
  );
};

export const WoodOptions: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <Talker />
    <Vignette />

    {/* S1 hook */}
    <Block from={0} to={6.4} name="Hook: twin saunas">
      <Shade strength={0.55} />
      <Stage top={130}>
        <A.Hero text="Same sauna." at={0.3} size={96} />
        <A.Script text="different feel." at={3.4} size={130} style={{marginTop: -6}} />
      </Stage>
      <TwinCards />
    </Block>

    {/* S2 orbit */}
    <OrbitScene />

    {/* S3 this sauna = cedar */}
    <Block from={13.55} to={20.85} name="This sauna: cedar">
      <Shade strength={0.55} />
      <Stage top={1010}>
        <A.Chip text="This sauna · Canadian Cedar" at={15.5} gold />
        <div style={{height: 26}} />
        <A.Hero text="3 woods." at={16.7} size={110} />
        <A.Script text="3 atmospheres." at={18.5} size={120} />
      </Stage>
    </Block>

    {/* S4 flip insert with speaker bubble */}
    <Block from={20.85} to={28.95} name="Insert: Pine → Mixed Abachi">
      <FlipInsert />
      <Bubble src="media/w_c2.mp4" segStart={starts.c2} />
    </Block>

    {/* S5 cedar on the talker */}
    <Block from={28.95} to={34.57} name="Cedar: warm & welcoming">
      <Shade strength={0.55} />
      <div style={{position: 'absolute', right: 70, top: 880}}>
        <CedarCard />
      </div>
      <Stage top={1040}>
        <div style={{alignSelf: 'flex-start', marginLeft: 10, textAlign: 'left'}}>
          <A.Eyebrow text="Canadian Cedar" at={29.0} color={colors.gold} />
          <A.Script text="warm &" at={31.0} size={110} />
          <A.Script text="welcoming." at={33.2} size={110} />
        </div>
      </Stage>
    </Block>

    {/* S6 not the most expensive */}
    <Block from={37.3} to={43.8} name="Not the most expensive">
      <Shade strength={0.6} />
      <div style={{position: 'absolute', top: 1060, left: 0, right: 0, textAlign: 'center'}}>
        <StrikeLine />
      </div>
      <MinLine text="The one that feels right." at={40.2} until={43.8} size={120} font="script" color={colors.gold} top={1170} />
    </Block>

    {/* S8 come see it */}
    <Block from={47.2} to={51.75} name="Insert: come see it">
      <PhotoCarousel />
      <Bubble src="media/w_e.mp4" segStart={starts.e} />
    </Block>

    {/* S9 poll */}
    <Block from={52.6} to={MAIN} name="Poll">
      <Shade strength={0.65} />
      <Stage top={1000}>
        <A.Eyebrow text="Your pick?" at={52.7} color={colors.gold} />
        <PollRow label="Bright" wood="Pine" at={53.85} />
        <PollRow label="Contrast" wood="Mixed Abachi" at={56.0} />
        <PollRow label="Warm" wood="Canadian Cedar" at={58.8} />
      </Stage>
    </Block>

    <CaptionTrack />

    <Sequence from={f(MAIN - 0.3)} durationInFrames={f(OUTRO + 0.3)} name="Logo outro">
      <LogoOutro cta="Comment your pick" />
    </Sequence>
    <Grain opacity={0.045} />

    <Music src="music/wood_infinite_echoes.wav" volume={0.16} />
    <Sfx name="lib/whoosh/gentle_swish" at={0.6} volume={0.4} />
    <Sfx name="lib/ui/glass_002" at={3.45} volume={0.5} />
    <Sfx name="lib/whoosh/twirl_smol_2" at={7.0} volume={0.45} />
    {[10.2, 11.05, 12.25].map((t) => (
      <Sfx key={t} name="lib/ui/pluck_001" at={t} volume={0.55} />
    ))}
    <Sfx name="lib/whoosh/gentle_swish" at={13.0} volume={0.35} />
    <Sfx name="lib/ui/select_003" at={15.5} volume={0.5} />
    <Sfx name="lib/whoosh/classic_swish_2" at={20.85} volume={0.45} />
    <Sfx name="lib/whoosh/twirl_smol_4" at={25.35} volume={0.45} />
    <Sfx name="lib/whoosh/gentle_swish" at={28.95} volume={0.35} />
    <Sfx name="lib/ui/drop_002" at={38.25} volume={0.5} />
    <Sfx name="lib/whoosh/twirl_2" at={47.2} volume={0.4} />
    {[53.85, 56.0, 58.8].map((t) => (
      <Sfx key={t} name="lib/ui/click_003" at={t} volume={0.6} />
    ))}
  </AbsoluteFill>
);

// Real cedar photo card gently rotating beside the speaker
const CedarCard: React.FC = () => {
  const t = useCurrentFrame() / FPS + useT();
  const p = useP(29.0, 0.6);
  return (
    <div
      style={{
        width: 300,
        height: 400,
        borderRadius: 22,
        overflow: 'hidden',
        border: `3px solid ${colors.cream}`,
        boxShadow: '0 30px 80px rgba(0,0,0,.55)',
        transform: `perspective(900px) rotateY(${-18 + Math.sin(t * 1.2) * 10}deg) rotate(${6 + Math.sin(t) * 2}deg) scale(${p})`,
        opacity: p,
      }}
    >
      <Img src={staticFile(WOODS.cedar.photo)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  );
};
