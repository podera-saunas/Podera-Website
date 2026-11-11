import {Composition} from 'remotion';
import {FounderShort, founderShortDuration} from './shorts/FounderShort';
import {FounderShortV2, founderShortV2Duration} from './shorts/FounderShortV2';
import {WoodOptions, woodDuration} from './shorts/WoodOptions';
import {VisitEditorial, visitDuration} from './shorts/VisitEditorial';
import {WallsEditorial, wallsDuration} from './shorts/WallsEditorial';
import {VillaEditorial, villaDuration} from './shorts/VillaEditorial';
import {RitualEditorial, ritualDuration} from './shorts/RitualEditorial';
import {FiveQuestions, fiveQuestionsDuration} from './shorts/FiveQuestions';
import {DetailsTalk, detailsDuration} from './shorts/DetailsTalk';
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
      <Composition id="T2-MakingItSimple" component={DetailsTalk} durationInFrames={detailsDuration} {...vertical} />
      <Composition id="N7-FiveQuestions" component={FiveQuestions} durationInFrames={fiveQuestionsDuration} {...vertical} />
      <Composition id="N6-PhoneStaysOutside" component={RitualEditorial} durationInFrames={ritualDuration} {...vertical} />
      <Composition id="N5-VillaUpgrade" component={VillaEditorial} durationInFrames={villaDuration} {...vertical} />
      <Composition id="N4v4-WallsEditorial" component={WallsEditorial} durationInFrames={wallsDuration} {...vertical} />
      <Composition id="N3v3-VisitEditorial" component={VisitEditorial} durationInFrames={visitDuration} {...vertical} />
      <Composition id="T1-WoodOptions" component={WoodOptions} durationInFrames={woodDuration} {...vertical} />
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
