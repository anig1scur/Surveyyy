import { PayloadType, QuestionType, Survey } from './types';

export const SurveyMock: Survey = {
  author_id: 'me',
  title: 'mock 一个调查问卷',
  id: '0',
  questions: [
    {
      id: '1',
      survey_id: '0',
      type: QuestionType.choice,
      title: 'Do you prefer to live in a shared flat with your residency colleagues or live in a single apartment?',
      options: [
        { text: 'shared flat', value: 'shared flat' },
        { text: 'single apartment', value: 'single apartment' },
      ],
      payload: {
        type: PayloadType.modal,
        desc: 'Another challenging part is how do you balance life and work. Because this residency is really close and tense. The four of us spend so much time together. And you are relocated to a different place, living with your colleaques. And the private boundary becomes ambiguous."  —— Jingyun',
      },
    },
    {
      survey_id: '0',
      id: '2',
      type: QuestionType.choice,
      title: 'You are more like',
      options: [
        { text: 'a morning person', value: 'a morning person' },
        { text: 'a night owl', value: 'a night owl' },
      ],
    },
    {
      survey_id: '0',
      id: '3',
      type: QuestionType.choice,
      title: 'Would you eat dinner with your residency colleagues?',
      options: [
        { text: 'Yes, I like to eat together', value: 'yes I like to eat together' },
        { text: 'No, I prefer to eat my own dinner', value: 'no, I prefer to eat my own dinner' },
      ],
    },
    {
      survey_id: '0',
      id: '4',
      type: QuestionType.choice,
      title: 'Where would you prefer to have a residency?',
      options: [
        { text: 'in a big city', value: 'in a big city' },
        { text: 'in a rural side', value: 'in a rural side' },
      ],
    },
    {
      survey_id: '0',
      id: '5',
      type: QuestionType.choice,
      title: 'You prefer residency in another city/country that last',
      options: [
        { text: 'shorter, maybe around 1-2 weeks', value: 'shorter, maybe around 1-2 weeks' },
        { text: 'longer, maybe around 1-2 months', value: 'longer, maybe around 1-2 months' },
      ],
      payload: {
        type: PayloadType.modal,
        desc: "if L have more time, I'm more like to be a bit more calm, and for me it's really important to be calm, to be relaxed. if I'm relaxed, I have my feelings open and I see more than if I am just focused on some deadline.\"  —— Alexey",
      },
    },
  ],
};
