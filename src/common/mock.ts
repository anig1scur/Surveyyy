import { PayloadType, QuestionType, Survey, fillInType, valueType } from './types';

export const SurveyMock: Survey = {
  authorId: 'me',
  title: 'mock 一个调查问卷',
  id: '0',
  questions: [
    {
      id: '111',
      allowCustom: false,
      allowMultiple: true,
      type: QuestionType.choice,
      title: 'You are working ___ in the performing arts?',
      options: [
        {
          value: 'A',
          text: 'A. Backstage (technician, designer, director, choreographer, composer, writer...)',
          skip: new Set(['222']),
        },
        {
          value: 'B',
          text: 'B. On stage (performer, dancer, musician, singer, comedian...)',
        },
        {
          value: 'C',
          text: 'C. All around the production (producer, organizer, administrator, PR...)',
        },
      ],
    },
    {
      id: '222',
      allowCustom: true,
      allowMultiple: true,
      type: QuestionType.choice,
      title: 'What attracts you to a global collaboration?',
      options: [
        {
          value: 'A',
          text: 'A. Meeting people from different backgrounds',
        },
        {
          value: 'B',
          text: 'B. Learning about different cultural, languages and artistic traditions',
        },
        {
          value: 'C',
          text: 'C. Examining my own points of view and acquiring new perspectives',
        },
        {
          value: 'D',
          skip: new Set(['1234']),
          text: 'D. Traveling to different places',
        },
      ],
    },
    {
      id: 'sdfgdf',
      type: QuestionType.slider,
      title: 'How many years of experience do you have in working globally?',
      min: 0,
      max: 11,
      step: 1,
      value: 50,
      valueType: valueType.string,
      labelConfig: [
        [0, 'Never'],
        [1, '1'],
        [2, '2'],
        [3, '3'],
        [4, '4'],
        [5, '5'],
        [6, '6'],
        [7, '7'],
        [8, '8'],
        [9, '9'],
        [10, '10'],
        [11, 'More than 10 years'],
      ],
    },
    {
      id: '444',
      allowCustom: true,
      allowMultiple: false,
      type: QuestionType.choice,
      title: 'What is the most important need for you in a global collaboration?',
      options: [
        {
          value: 'A',
          text: 'A. Financial and infrastructural support',
        },
        {
          value: 'B',
          skip: new Set(['sdfgdf', '1234']),
          text: 'B. An Environment with unconditioned trust and calmness',
        },
        {
          value: 'C',
          text: 'C. Collaborators who are open-minded and adventurous',
        },
      ],
    },
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
          id: 'lkjklj-1',
          text: 'Red',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        {
          id: 'lkjklj-2',
          text: 'Blue',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        {
          id: 'lkjklj-3',
          text: 'Green',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        {
          id: 'lkjklj-4',
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
