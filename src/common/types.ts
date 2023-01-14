import { CSSProperties } from 'react';

export type BaseComponentProps = {
  className?: string
  style?: CSSProperties
};

export enum QuestionType {
  choice = 'choice',
  swiper = 'swiper', // yes or no
  slider = 'slider',
  fillInBlank = 'fillInBlank',
}

export interface selectedValuesType {
  [key: string]: string;
}


export enum PayloadType {
  modal = 'modal',
}
// 可能是个弹窗 anything
export type Payload = {
  type: PayloadType
  title?: string
  desc: string
};

export type Attachment = {
  url: string;
  type: string; // audio | image | video ?
};

export type Option = {
  text: string
  value: string
  attachment?: Attachment
};

export type Question = {
  id: number
  type: QuestionType
  title?: string
  surveyId?: number
  attachment?: Attachment
  tip?: string
};

export type Survey = {
  questions: Question[]
  id: string
  title: string
  authorId: string
  createdAt?: Date
};

export type Choice = {
  question_id: string;
  value: string
};

export type Sample = {
  questions: Question[]
  id: string
  surveyId: string
  username: string
  createdAt: Date
  choices: Choice[]
};


export type ChoiceQ = Question & {
  type: QuestionType.choice;
  options: Option[];

  // maxChoice === 1 -> radio
  // maxChoice > 1 -> checkbox
  allowCustom: boolean;
  // allowCustom === true -> allow user to input custom option
  allowMultiple: boolean;
}



export type SliderQ = Question & {
  type: QuestionType.slider;
  min: number;
  max: number;
  step: number;
  value: number;
  labelConfig: {
    [bound: string]: string;
  }
  resultType: 'number' | 'string';
};

export type cardItem = {
  id: string;
  text?: string;
  attachment?: Attachment;
  yesLabel: string;
  noLabel: string;
}

export type SwiperQ = Question & {
  type: QuestionType.swiper;
  cards: cardItem[];
};

export enum fillInType {
  plain = 'plain',
  blank = 'blank',
};

export type PlainItem = {
  text: string;
  type: fillInType.plain;
};

export type BlankItem = {
  id: number;
  text: string;
  type: fillInType.blank;
  options: string[];
};

export type FillInBlankConfig = (BlankItem | PlainItem)[];

export type FillInBlankQ = Question & {
  type: QuestionType.fillInBlank;
  config: FillInBlankConfig;
};
