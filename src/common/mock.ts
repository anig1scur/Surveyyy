import { PayloadType, QuestionType, Survey, fillInType, valueType } from './types';

export const SurveyMock: Survey = {
  author_id: 'me',
  title: 'mock 一个调查问卷',
  id: '0',
  questions: [
    {
      id: '1234',
      type: QuestionType.fillInBlank,
      config: [
        {
          text: '欢迎来到徒步者之家。这里是户外爱好者的天地，我来自',
          type: fillInType.plain,
        },
        {
          id: '123-1',
          type: fillInType.blank,
          text: '？',
          options: ['运营', '设计', '开发'],
        },
        {
          text: '。我更喜欢在',
          type: fillInType.plain,
        },
        {
          id: '123-2',
          type: fillInType.blank,
          text: '？',
          options: ['夏天', '春天', '秋天', '冬天'],
        },
        {
          text: '徒步，我的朋友们都很厉害，每天可以走',
          type: fillInType.plain,
        },
        {
          id: '123-3',
          type: fillInType.blank,
          text: '？',
          options: ['100km', '17km', '1km', '1m'],
        },
      ],
    },
    {
      id: 'oipu',
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
    },
    {
      id: 'sdfgdf',
      type: QuestionType.slider,
      title: 'What is your favorite color?',
      min: 1,
      max: 100,
      step: 3,
      value: 50,
      valueType: valueType.string,
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
    },
    {
      id: 'lkjklj',
      cards: [
        {
          id: '233',
          text: 'Red',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        {
          id: '56767',
          text: 'Blue',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        {
          id: '67867',
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
    },
  ],
};
