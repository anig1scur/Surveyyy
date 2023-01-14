import React, { FC, useState } from 'react';
import { Survey as SurveyType, Question } from '../common/types';
import CardStack, { Card } from '../components/cardStack';
import Air from '@/assets/air2.png';
import Back from '@/assets/back-arrow.svg';
import InfiniteLooper from '../components/loop';

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

const Body: FC<QuestionProps> = (props) => {
  const { question } = props;
  return (
    <div>
      {question.title}
      <div>
        {question.options?.map((o) => (
          <label
            className='plan basic-plan'
            key={o.value}
            htmlFor='basic'>
            <input
              defaultChecked
              type='radio'
              name='plan'
              value={o.value}
            />
            <div className='plan-content'>
              <p>{o.text}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
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
  const initCards = survey.questions.map((q) => {
    return { question: q.title, options: q.options?.map((i) => i.text) || [] };
  });
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [cards, setCards] = useState<Array<Card>>(initCards);

  const onGoBack = () => {
    setCards(initCards.slice(initCards.length - cards.length - 1));
    setActiveIdx((i) => i - 1);
  };
  const onGoNext = () => {
    setCards(cards.slice(1));
    setActiveIdx((i) => i + 1);
  };
  const progress = (activeIdx / survey.questions.length) * 100;
  return (
    <div className='w-screen max-w-[48em]'>
      <Header
        active={activeIdx}
        total={survey.questions.length}
        onGoBack={onGoBack}
      />
      {/* <InfiniteLooper speed={ 2 } direction="right">
        <div className="contentBlock contentBlock--one">
          Place the stuff you want to loop
        </div>
        <div className="contentBlock contentBlock--one">
          ;ladkal;s;dlk
        </div>
      </InfiniteLooper> */}

      <CardStack
        cards={cards}
        onGoBack={onGoBack}
        onGoNext={onGoNext}
      />
      <Foot progress={progress} />
    </div>
  );
};

export default Survey;
