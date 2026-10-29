import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {colors, fonts} from './brand';
import {Eyebrow, Script, Steam, useIn} from './motion';

const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 1}) => (
  <Sequence from={Math.round(at * 30)} durationInFrames={60} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const LogoOutro: React.FC<{cta?: string}> = ({cta = 'Follow the build'}) => {
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
        <Eyebrow text={cta} at={1.8} color={cta === 'Follow the build' ? colors.smoke : colors.gold} />
      </AbsoluteFill>
      <Steam start={0} dur={1.4} />
      <Sfx name="steam" at={0} />
      <Sfx name="shimmer" at={0.7} />
    </AbsoluteFill>
  );
};

