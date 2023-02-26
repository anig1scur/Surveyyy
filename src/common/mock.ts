import { QuestionType, Survey, fillInType, valueType } from './types';

export const SurveyMock: Survey = {
  authorId: 'me',
  title: 'mock kalsjdlaks',
  id: 'poiqweopiop',
  sections: [
    {
      id: '99999',
      type: 'intro',
      title: 'Welcome balabala!',
      text: 'This test takes about 8 minutes to complete.',
    },
    {
      id: 'asdsa',
      allowCustom: false,
      allowMultiple: true,
      type: QuestionType.choice,
      title: 'You are working ___ in the performing arts?',
      options: [
        {
          label: 'A',
          value: 'Backstage (technician, designer, director, choreographer, composer, writer...)',
          skip: new Set(['222']),
        },
        {
          label: 'B',
          value: 'On stage (performer, dancer, musician, singer, comedian...)',
        },
        {
          label: 'C',
          value: 'All around the production (producer, organizer, administrator, PR...)',
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
          label: 'A',
          value: 'Meeting people from different backgrounds',
        },
        {
          label: 'B',
          value: 'Learning about different cultural, languages and artistic traditions',
        },
        {
          label: 'C',
          value: 'Examining my own points of view and acquiring new perspectives',
        },
        {
          label: 'D',
          value: 'Traveling to different places',
        },
      ],
    },
    {
      id: 'sdfgdf',
      type: QuestionType.slider,
      title: 'How many years of experience do you have in working globally?',
      min: 0,
      max: 11,
      value: 50,
      valueType: valueType.string,
      options: [
        {
          value: 0,
          label: `Never`,
        },
        {
          value: 1,
          label: `1 year`,
        },
        {
          value: 2,
          label: `2 years`,
        },
        {
          value: 3,
          label: 'More than 2 years',
        },
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
          label: 'A',
          value: 'Financial and infrastructural support',
        },
        {
          label: 'B',
          value: 'An Environment with unconditioned trust and calmness',
          skip: new Set(['sdfgdf', '1234']),
        },
        {
          label: 'C',
          value: 'Collaborators who are open-minded and adventurous',
        },
      ],
    },
    {
      id: '555',
      allowCustom: false,
      allowMultiple: false,
      type: QuestionType.choice,
      title: `OPEN CALL: flausen+ global residency at the “Feast of the Independent Arts”

      What is the Feast of the Independent Arts?
      The flausen+ “Feast of the Independent Arts” is a mobile festival in small towns and rural areas of Germany. With “process-oriented work” as the through line of all the flausen+ models from residency, co-production to international collaboration, we aim to develop the global residency model in which international artists come together and work closely with the local inhabitants as part of their artistic process.

      What are the conditions?

    - Festival time: three days
    - Residency period: 2 weeks before the festival
    - Number of artists: 4
    - Fee: 500€/Week/Artist
    - Material cost: up to 500€
    - Accommodation: max. 2 artists / room
    - Motto “global meets local”: Focus on local issues with
    international perspectives
    - 2 x MakingOFF# events where audiences are invited to be part
    of the artistic research process`,
      options: [
        {
          label: 'A',
          value: 'yes',
          skip: new Set(['9999', '99999']),
        },
        {
          label: 'B',
          value: 'no',
          skip: new Set(['iouoiu', 'swiper-aa', '1234', 'sdfgdf']),
        },
      ],
    },
    {
      id: '9999',
      allowCustom: true,
      allowMultiple: true,
      type: QuestionType.choice,
      title: 'Which part of this open call you didn’t like?',
      options: [
        {
          label: 'A',
          value: 'Process-oriented work',
        },
        {
          label: 'B',
          value: 'Research topic',
        },
        {
          label: 'C',
          value: 'Presentation format',
        },
        {
          label: 'D',
          value: 'Rural locations',
        },
        {
          label: 'E',
          value: 'Accommodation',
        },
        {
          label: 'F',
          value: 'The group size (4 people)',
        },
        {
          label: 'G',
          value: 'Payment',
        },
        {
          label: 'H',
          value: 'Duration of stay',
        },
      ],
    },
    {
      id: '99999',
      type: 'normal',
      title: 'Thank you for your participation!',
      redirectUri: 'https://flausenpluscommunity.padlet.org/global/Chemnitz2022',
      redirectDelay: 4,
    },
    {
      id: 'iouoiu',
      type: QuestionType.choice,
      allowMultiple: false,
      allowCustom: false,
      title: `In the first week, the four of you spend much time exploring the new city. In order to get in touch with local issues, which of the following is a must-do?`,
      options: [
        {
          label: 'A',
          value: 'Go through the historical materials the hosting theater provided',
        },
        {
          label: 'B',
          value: 'Consult local residents or organizations',
        },
        {
          label: 'C',
          value: 'Walk around the city',
        },
        {
          label: 'D',
          value: 'Discuss with your colleagues about potential topics',
        },
      ],
    },
    {
      id: 'swiper-aa',
      type: QuestionType.swiper,
      title: `What counts as “local” about a city?`,
      options: [
        {
          id: 'swiper-aa-1',
          text: 'History background?',
        },
        {
          id: 'swiper-aa-2',
          text: 'Local political issues?',
        },
        {
          id: 'swiper-aa-3',
          text: 'Nature?',
        },
        {
          id: 'swiper-aa-4',
          text: 'A net cafe?',
        },
        {
          id: 'swiper-aa-5',
          text: 'A chain shopping mall?',
        },
        {
          id: 'swiper-aa-6',
          text: 'A busy market square in city center?',
        },
      ],
    },
    {
      id: '1234',
      type: QuestionType.fillInBlank,
      options: [
        {
          text: 'The making off happens on ',
          type: fillInType.plain,
        },
        {
          id: '123-1',
          type: fillInType.blank,
          text: 'two days',
          options: ['one day', 'multiple days'],
        },
        {
          text: ' at the ',
          type: fillInType.plain,
        },
        {
          id: '123-2',
          type: fillInType.blank,
          text: 'end of the two-week residency',
          options: ['prefer to do it not at the end'],
        },
        {
          text: ', ',
          type: fillInType.plain,
        },
        {
          id: '123-3',
          type: fillInType.blank,
          text: 'each day',
          options: ['prefer not each day'],
        },
        {
          id: '123-4',
          type: fillInType.blank,
          text: ' one hour',
          options: [' too short', ' too long'],
        },
        {
          text: '. During this hour, the visitors ',
          type: fillInType.plain,
        },
        {
          id: '123-5',
          type: fillInType.blank,
          text: 'meet at the theatre',
          options: ['prefer a different meeting point'],
        },
        {
          text: ' and would be ',
          type: fillInType.plain,
        },
        {
          id: '123-6',
          type: fillInType.blank,
          text: 'first introduced to the format',
          options: ['prefer another kind of opening'],
        },
        {
          text: ' of making off ',
          type: fillInType.plain,
        },
        {
          id: '123-7',
          type: fillInType.blank,
          text: 'by one colleague from flausen+',
          options: ['prefer to host it by your group'],
        },
        {
          text: '. Then the artists could take over and also lead the visitors to another place. The event would be ',
          type: fillInType.plain,
        },
        {
          id: '123-8',
          type: fillInType.blank,
          text: 'moderated by flausen+ staff',
          options: ['prefer no moderation or by your own group'],
        },
        {
          text: ' and ',
          type: fillInType.plain,
        },
        {
          id: '123-9',
          type: fillInType.blank,
          text: 'could be stopped in between',
          options: ['prefer no breaks in between'],
        },
        {
          text: ' to allow discussions. The sharing of the artists and discussions with the audience ',
          type: fillInType.plain,
        },
        {
          id: '123-10',
          type: fillInType.blank,
          text: 'take place interchangeably',
          options: ['prefer another structure'],
        },
        {
          text: '.',
          type: fillInType.plain,
        },
      ],
    },
    {
      id: 'jklkjkljkl',
      type: QuestionType.slider,
      title: 'Do you think you are a person who feels more comfortable to',
      min: 0,
      max: 1,
      valueType: valueType.string,
      options: [
        {
          value: 0,
          label: `separate private life from work, and social life from working
        relationships`,
        },
        {
          value: 1,
          label: `mix private life and work, and social
        life and working relationships`,
        },
      ],
    },
  ],
};

console.log('survey', JSON.stringify(SurveyMock));
