import {Composition} from 'remotion';
import {FounderShort, founderShortDuration} from './shorts/FounderShort';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FounderShort"
        component={FounderShort}
        durationInFrames={founderShortDuration}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
