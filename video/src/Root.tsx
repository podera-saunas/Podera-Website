import {Composition} from 'remotion';
import {FounderShort, founderShortDuration} from './shorts/FounderShort';
import {FounderShortV2, founderShortV2Duration} from './shorts/FounderShortV2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FounderShortV2"
        component={FounderShortV2}
        durationInFrames={founderShortV2Duration}
        fps={30}
        width={1080}
        height={1920}
      />
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
