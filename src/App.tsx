import './index.scss';
import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Content from './pages/Intro';
import Result from './pages/Result';
import Survey from './pages/Survey';
import { SurveyMock } from './common/mock';
import { FillInTheBlank } from './components/play/FillInTheBlank';
import { FillInBlankConfig, fillInType, ChoiceQ, QuestionType, SliderQ, SwiperQ, FillInBlankQ } from './common/types';
import { Choice } from './components/play/Choice';
import { Slider } from './components/play/Slider';
import Swiper from './components/play/Swiper';

export type Props = {};

const fillInTheBlankQ: FillInBlankQ = {
  id: 123,
  config: [
    {
      text: '欢迎来到徒步者之家。这里是户外爱好者的天地，我来自',
      type: fillInType.plain,
    },
    {
      id: 1,
      type: fillInType.blank,
      text: '？',
      options: ['运营', '设计', '开发'],
    },
    {
      text: '。我更喜欢在',
      type: fillInType.plain,
    },
    {
      id: 3,
      type: fillInType.blank,
      text: '？',
      options: ['夏天', '春天', '秋天', '冬天'],
    },
    {
      text: '徒步，我的朋友们都很厉害，每天可以走',
      type: fillInType.plain,
    },
    {
      id: 4,
      type: fillInType.blank,
      text: '？',
      options: ['100km', '17km', '1km', '1m'],
    },
  ],
};

const choiceQ: ChoiceQ = {
  id: 1,
  allowCustom: true,
  allowMultiple: false,
  type: QuestionType.choice,
  title: 'What is your favorite color?',
  options: [
    {
      value: 'red',
      text: 'Red',
    },
    {
      value: 'blue',
      text: 'Blue',
    },
    {
      value: 'green',
      text: 'Green',
    },
  ],
};

const sliderQ: SliderQ = {
  id: 1,
  type: QuestionType.slider,
  title: 'What is your favorite color?',
  min: 1,
  max: 100,
  step: 3,
  value: 50,
  resultType: 'string',
  labelConfig: [
    [5, 'asd'],
    [0, 'tyr'],
    [10, 'ertr'],
    [15, 'sdf'],
    [25, 'oiuou'],
    [30, 'kjhjk'],
    [35, 'Yui'],
    [100, 'cvbcvb'],
  ],
};

const swiperQ: SwiperQ = {
  id: 1,
  cards: [
    {
      id: '1',
      text: 'Red',
      yesLabel: 'Yes',
      noLabel: 'No',
    },
    {
      id: '2',
      text: 'Blue',
      yesLabel: 'Yes',
      noLabel: 'No',
    },
    {
      id: '4',
      text: 'Green',
      yesLabel: 'Yes',
      noLabel: 'No',
    },
    {
      id: '25',
      text: 'Black',
      yesLabel: 'Yes',
      noLabel: 'No',
    },
  ],
  type: QuestionType.swiper,
  title: 'What is your favorite color?',
};

const App: FC<Props> = () => (
  <div>
    <div>
      <Routes>
        <Route
          path='/'
          element={<Content />}
        />
        <Route
          path='app'
          element={<Survey survey={SurveyMock} />}>
          <Route
            path=':id'
            element={<Survey survey={SurveyMock} />}
          />
          <Route
            path='*'
            element={<Survey survey={SurveyMock} />}
          />
        </Route>
        <Route
          path='/game'
          element={
            // <FillInTheBlank q={fillInTheBlankQ} />
            <Slider config={sliderQ} />
            // <Choice q={choiceQ} />
            // <Provider store={store}>
            //   <Swiper q={swiperQ} />
            // </Provider>
          }
        />
        <Route
          path='/result'
          element={<Result />}
        />
      </Routes>
    </div>
  </div>
);

export default App;
