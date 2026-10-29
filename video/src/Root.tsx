import {Composition} from 'remotion';
import {FounderShort, founderShortDuration} from './shorts/FounderShort';
import {FounderShortV2, founderShortV2Duration} from './shorts/FounderShortV2';
import {
  InsideTheWalls,
  n2Duration,
  n3Duration,
  n4Duration,
  SpaVsSauna,
  VisitShowroom,
} from './shorts/scripts';

const vertical = {fps: 30, width: 1080, height: 1920} as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="N2-SpaVsSauna" component={SpaVsSauna} durationInFrames={n2Duration} {...vertical} />
      <Composition id="N3-VisitShowroom" component={VisitShowroom} durationInFrames={n3Duration} {...vertical} />
      <Composition id="N4-InsideTheWalls" component={InsideTheWalls} durationInFrames={n4Duration} {...vertical} />
      <Composition
        id="FounderShortV2"
        component={FounderShortV2}
        durationInFrames={founderShortV2Duration}
        {...vertical}
      />
      <Composition id="FounderShort" component={FounderShort} durationInFrames={founderShortDuration} {...vertical} />
    </>
  );
};
