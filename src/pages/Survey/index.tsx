import React, { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Survey as SurveyType, Question, Q, P, QuestionType, S } from '../../common/types';
import Air from '@/assets/air2.png';
import Back from '@/assets/back-arrow.svg';
import { Choice, FillInTheBlank, Slider, Swiper } from '../../components/Q';
import { StoredContext } from '../../context';
import { Page } from '../../components/P/Page';

const QcomponentMap = {
  [QuestionType.choice]: Choice,
  [QuestionType.fillInBlank]: FillInTheBlank,
  [QuestionType.slider]: Slider,
  [QuestionType.swiper]: Swiper,
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
    flex rounded-lg flex-row justify-between
    items-center shadow-md text-gray-500 text-xl font-[400]'>
      <img
        src={Back}
        onClick={() => {
          if (active > 0) {
            onGoBack();
          }
        }}
        className='max-h-10 mx-2'
      />
      <div className='text-xl text-stone-500'>
        <span>{active + 1}</span>
        <span> / {total}</span>
      </div>
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

export type FootProps = {
  progress: number;
};
const Foot: FC<FootProps> = (props) => {
  const { progress } = props;
  return (
    <div className='flex justify-center mb-2 items-center'>
      <div
        className='radial-progress border-8 border-[#eedad8] bg-white text-[#b5665c]'
        // @ts-ignore
        style={{ '--value': progress, '--size': '6em', '--thickness': '1rem' }}>
        {progress}%{' '}
      </div>
    </div>
  );
};

const Survey: FC<Props> = (props) => {
  const { survey } = props;

  const { skipped, form, setForm } = useContext(StoredContext);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lastChoice, setLastChoice] = useState<ActionType>(ActionType.next);
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
    // union all skipped question by skipped values
    const skippedQs = new Set(
      Object.values(skipped).reduce((acc, cur) => {
        return [...acc, ...cur];
      }, [] as string[])
    );

    if (skippedQs.has(questions[activeIdx].id)) {
      if (lastChoice === ActionType.back) {
        onGoBack();
      } else {
        onGoNext();
      }
    }
  }, [activeIdx]);

  const renderS = (section: S) => {
    if (section.type in QcomponentMap) {
      return renderQ(section as Q);
    } else {
      return renderP(section as P);
    }
  };

  const renderP = (page: P) => {
    return <Page {...page} />;
  };
  const renderQ = (question: Q) => {
    const Component = QcomponentMap[question.type];
    return (
      <Component
        // TODO: fixme
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
      />
    );
  };

  const progress = (activeIdx / survey.sections.length) * 100;
  return (
    <div className='w-screen max-w-[48em] survey'>
      <Header
        active={activeIdx}
        total={survey.sections.length}
        onGoBack={onGoBack}
      />
      <div className='flex flex-col items-center'>
        {renderS(survey.sections[activeIdx])}
        <button onClick={onGoNext}>next</button>
      </div>
      <Foot progress={progress} />
    </div>
  );
};

export default Survey;
