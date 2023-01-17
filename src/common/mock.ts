import { PayloadType, QuestionType, Page, Survey, fillInType, valueType } from './types';

export const SurveyMock: Survey = {
  authorId: 'me',
  title: 'mock 一个调查问卷',
  id: '0',
  sections: [
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
          id: '555',
          allowCustom: false,
          allowMultiple: false,
          type: QuestionType.choice,
          title: `OPEN CALL: flausen+ global residency at the “Feast of the
    Independent Arts”
    What is the Feast of the Independent Arts?
    The flausen+ “Feast of the Independent Arts” is a mobile festival in
    small towns and rural areas of Germany. With “process-oriented work”
    as the through line of all the flausen+ models from residency,
    co-production to international collaboration, we aim to develop the
    global residency model in which international artists come together and
    work closely with the local inhabitants as part of their artistic process.
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
              value: 'A',
              text: 'yes',
              skip: new Set(['9999', '99999']),
            },
            {
              value: 'B',
              text: 'no',
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
              value: 'A',
              text: 'A. Process-oriented work',
            },
            {
              value: 'B',
              text: 'B. Research topic',
            },
            {
              value: 'C',
              text: 'C. Presentation format',
            },
            {
              value: 'D',
              text: 'D. Rural locations',
            },
            {
              value: 'E',
              text: 'E. Accommodation',
            },
            {
              value: 'F',
              text: 'F. The group size (4 people)',
            },
            {
              value: 'G',
              text: 'G. Payment',
            },
            {
              value: 'H',
              text: 'H. Duration of stay',
            },
          ],
        },
        {
          id: '99999',
          type: 'page',
          title: 'Thank you for your participation!',
          redirectUri: 'https://flausenpluscommunity.padlet.org/global/Chemnitz2022',
          redirectDelay: 4,
        },
    {
      id: 'iouoiu',
      type: QuestionType.choice,
      allowMultiple: false,
      allowCustom: false,
      title: `In the first week, the four of you spend much time exploring
      the new city. In order to get in touch with local issues, which of
      the following is a must-do?`,
      // - Go through the historical materials the hosting theater
      // provided
      // - Consult local residents or organizations
      // - Walk around the city
      // - Discuss with your colleagues about potential topics
      options: [
        {
          value: 'A',
          text: 'A. Go through the historical materials the hosting theater provided',
        },
        {
          value: 'B',
          text: 'B. Consult local residents or organizations',
        },
        {
          value: 'C',
          text: 'C. Walk around the city',
        },
        {
          value: 'D',
          text: 'D. Discuss with your colleagues about potential topics',
        },
      ],
    },
    {
      id: 'swiper-aa',
      type: QuestionType.swiper,
      title: `What counts as “local” about a city?`,
      cards: [
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
      config: [
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
          options: ['too short', 'too long'],
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
      step: 1,
      valueType: valueType.string,
      labelConfig: [
        [0, `separate private life from work, and social life from working
        relationships`],
        [1, `mix private life and work, and social
        life and working relationships`],
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
  ],
};
