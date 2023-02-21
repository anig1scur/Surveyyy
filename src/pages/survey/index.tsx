import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Survey as SurveyType, Question, Q, P, S, QuestionType, BaseComponentProps, PageType } from '../../common/types';
import Air from '@/assets/air-black.png';
import Back from '@/assets/back-arrow.svg';
import { Choice, FillInTheBlank, Slider, Swiper } from '../../components/Q';
import { StoredContext } from '../../context';
import { Page, Intro } from '../../components/P';
import SwirlyProgress from '../../components/Progress/Spiral';

const QcomponentMap = {
  [QuestionType.choice]: Choice,
  [QuestionType.fillInBlank]: FillInTheBlank,
  [QuestionType.slider]: Slider,
  [QuestionType.swiper]: Swiper,
};

const PcomponentMap = {
  [PageType.intro]: Intro,
  [PageType.normal]: Page,
};

export type Props = {
  survey: SurveyType;
};

export enum ActionType {
  back = 'back',
  next = 'next',
}

export type HeaderProps = {
  active: number;
  total: number;
  onGoBack: () => void;
};

const Header: FC<HeaderProps> = (props) => {
  const { active, total, onGoBack } = props;
  return (
    <div
      className='bg-white mt-3 mx-5
    flex rounded-lg justify-between max-w-2xl w-[90vw]
    items-center shadow-md text-gray-500 text-xl font-[400]
    sticky top-0 z-1'>
      <SwirlyProgress />
      {/* <div className='text-xl text-stone-500'>
        <span>{active + 1}</span>
        <span> / {total}</span>
      </div> */}
      <img
        className='max-h-14 mr-2 object-cover'
        src={Air}
      />
    </div>
  );
};

export type QuestionProps = {
  question: Question;
};

// export type FootProps = {
//   progress: number;
// };
// const Foot: FC<FootProps> = (props) => {
//   const { progress } = props;
//   return (
//     <div className='flex justify-center mb-2 items-center'>
//       <div
//         className='radial-progress border-8 border-[#eedad8] bg-white text-[#b5665c]'
//         // @ts-ignore
//         style={{ '--value': progress, '--size': '6em', '--thickness': '1rem' }}>
//         {progress}%{' '}
//       </div>
//     </div>
//   );
// };

type ArrowProps = BaseComponentProps & {
  onClick: () => void;
};

const Arrow: FC<ArrowProps> = (props) => {
  const { onClick, style } = props;
  return (
    <img
      style={style}
      className='h-14 ml-2'
      src={Back}
      onClick={onClick}
    />
  );
};

const Survey: FC<Props> = (props) => {
  const { survey } = props;

  const { skipped, setForm, setProgress } = useContext(StoredContext);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lastChoice, setLastChoice] = useState<ActionType>(ActionType.next);
  const [skippedQs, setSkippedQs] = useState<Set<string>>(new Set());
  const questions = survey.sections;

  const onGoBack = () => {
    setActiveIdx((i) => i - 1);
    setLastChoice(ActionType.back);
  };
  const onGoNext = () => {
    setActiveIdx((i) => i + 1);
    setLastChoice(ActionType.next);
  };

  useLayoutEffect(() => {
    setProgress({
      active: activeIdx,
      total: survey.sections.length - skippedQs.size,
    });
    // union all skipped question by skipped values
    let skipped_ = new Set(
      Object.values(skipped).reduce((acc, cur) => {
        return [...acc, ...cur];
      }, [] as string[])
    );
    setSkippedQs(skipped_);

    if (skipped_.has(questions[activeIdx].id)) {
      if (lastChoice === ActionType.back) {
        onGoBack();
      } else {
        onGoNext();
      }
    }
  }, [activeIdx]);

  const renderS = (section: S) => {
    if (!skippedQs.has(section.id)) {
      if (section.type in QcomponentMap) {
        return renderQ(section as Q);
      } else {
        return renderP(section as P);
      }
    }
  };

  const renderP = (page: P) => {
    const Component = PcomponentMap[page.type];
    return <Component {...page} />;
  };
  const renderQ = (question: Q) => {
    const Component = QcomponentMap[question.type];
    return (
      <Component
        // TODO: fixme
        // @ts-ignore
        q={question}
        key={question.id}
        onChange={(data) =>
          setForm((f) => {
            return {
              ...f,
              ...data,
            };
          })
        }
        onGoNext={onGoNext}
      />
    );
  };

  return (
    <div className='survey flex items-center flex-col'>
      <Header
        active={activeIdx}
        total={survey.sections.length}
        onGoBack={onGoBack}
      />
      <div className='flex flex-col items-center mx-5'>{renderS(survey.sections[activeIdx])}</div>
      <div className='flex justify-between w-[90%] mt-5'>
        <Arrow
          onClick={() => {
            if (activeIdx > 0) {
              onGoBack();
            }
          }}
        />
        <Arrow
          style={{ transform: 'rotate(180deg)' }}
          onClick={() => {
            if (activeIdx < survey.sections.length) {
              onGoNext();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Survey;