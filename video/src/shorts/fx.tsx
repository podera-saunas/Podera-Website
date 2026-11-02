// Finishing layers: film grain and a 3D logo outro rendered with HyperFrames.
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {colors} from './brand';
import {MinLine} from './timeline';

// Animated film grain (deterministic: seed follows the frame)
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
      <svg width="100%" height="100%">
        <filter id={`grain-${frame % 8}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 8} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${frame % 8})`} />
      </svg>
    </AbsoluteFill>
  );
};

// 3D gold PODERA (HyperFrames extruded-logo, 1920x1080) centred on the vertical frame
export const Logo3DOutro: React.FC<{cta: string}> = ({cta}) => (
  <AbsoluteFill style={{backgroundColor: colors.black}}>
    <div style={{position: 'absolute', left: -60, top: 560, width: 1200, height: 675}}>
      <OffthreadVideo src={staticFile('media/logo3d_outro.mp4')} muted style={{width: '100%', height: '100%'}} />
    </div>
    <MinLine text="Your escape, every day" at={1.0} until={3.4} size={92} font="script" color={colors.cream} top={1150} />
    <MinLine text={cta} at={1.5} until={3.4} size={40} color={colors.gold} top={1300} />
  </AbsoluteFill>
);
