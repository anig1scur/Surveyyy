import React, { FC, useContext, useEffect, useState } from 'react';
import { Survey as SurveyType, Question, Q, QuestionType } from '../common/types';
import Air from '@/assets/air2.png';
import Back from '@/assets/back-arrow.svg';
import { Choice, FillInTheBlank, Slider, Swiper } from '../components/Q';
import { StoredContext } from '../context';

export type Props = {
  survey: SurveyType;
};

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

  const { form, setForm } = useContext(StoredContext);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onGoBack = () => {
    setActiveIdx((i) => i - 1);
  };
  const onGoNext = () => {
    setActiveIdx((i) => i + 1);
  };

  const renderQ = (question: Q) => {
    switch (question.type) {
      case QuestionType.choice:
        return (
          <Choice
            q={question}
            onChange={(data) =>
              setForm((f) => {
                return {
                  ...f,
                  [question.id]: data,
                };
              })
            }
          />
        );
      case QuestionType.fillInBlank:
        return (
          <FillInTheBlank
            q={question}
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
      case QuestionType.slider:
        return (
          <Slider
            q={question}
            onChange={(data) => {
              console.log(data);
              setForm((f) => {
                return {
                  ...f,
                  ...data,
                };
              });
            }}
          />
        );
      case QuestionType.swiper:
        return (
          <Swiper
            q={question}
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
      default:
        return <div>Not implemented</div>;
    }
  };

  const progress = (activeIdx / survey.questions.length) * 100;
  return (
    <div className='w-screen max-w-[48em]'>
      <Header
        active={activeIdx}
        total={survey.questions.length}
        onGoBack={onGoBack}
      />
      <div className='flex flex-col items-center'>
        {renderQ(survey.questions[activeIdx])}
        <button
          onClick={() => {
            onGoNext();
          }}>
          next
        </button>
      </div>
      <Foot progress={progress} />
    </div>
  );
};

export default Survey;
