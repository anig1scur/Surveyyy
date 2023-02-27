import { CSSProperties } from 'react';

export type BaseComponentProps = {
  className?: string;
  style?: CSSProperties;
};

export enum QuestionType {
  choice = 'choice',
  swiper = 'swiper', // yes or no
  slider = 'slider',
  fillInBlank = 'fillInBlank',
}

export enum PageType {
  intro = 'intro',
  normal = 'normal',
}

export interface selectedValuesType {
  [key: string]: number | string | Set<string> | string[] | selectedValuesType
};

export interface Progress {
  active: number;
  total: number;
}

export interface inputType {
  [key: string]: string;
}

export enum PayloadType {
  modal = 'modal',
}
// 可能是个弹窗 anything
export type Payload = {
  type: PayloadType;
  title?: string;
  desc: string;
};

export type Attachment = {
  url: string;
  type: string; // audio | image | video ?
};

export type Option = {
  label: string;
  value: string;
  attachment?: Attachment;
  skip?: Set<string>;
};

export type Question = sectionBase & {
  type: QuestionType;
  attachment?: Attachment;
  tip?: string;
};

export type Survey = {
  sections: S[];
  id: string;
  title: string;
  authorId: string;
  createdAt?: Date;
};

export type Choice = {
  question_id: string;
  value: string;
};

export type Sample = {
  questions: Question[];
  id: string;
  surveyId: string;
  username: string;
  createdAt: Date;
  choices: Choice[];
};

export type ChoiceQ = Question & {
  type: QuestionType.choice;
  options: Option[];

  allowMultiple?: boolean;
  // allowMultiple === true ? checkbox:radio
  allowCustom?: boolean;
  // allowCustom === true -> allow user to input custom option
  customOptionLabel?: string;
};

export type rangeItem = {
  value: number;
  label: string;
};

export enum valueType {
  number = 'number',
  string = 'string',
}

export type SliderQ = Question & {
  type: QuestionType.slider;
  min: number;
  max: number;
  value?: number;
  // 左闭右开
  options: rangeItem[];
  valueType: valueType;
};

export type cardItem = {
  id: string;
  text?: string;
  attachment?: Attachment;
  yesLabel?: string;
  noLabel?: string;
};

export type SwiperQ = Question & {
  type: QuestionType.swiper;
  options: cardItem[];
};

export enum fillInType {
  plain = 'plain',
  blank = 'blank',
}

export type PlainItem = {
  text: string;
  type: fillInType.plain;
};

export type BlankItem = {
  id: string;
  text: string;
  type: fillInType.blank;
  options: string[];
};

export type FillInBlankConfig = (BlankItem | PlainItem)[];

export type FillInBlankQ = Question & {
  type: QuestionType.fillInBlank;
  options: FillInBlankConfig;
};

export type sectionBase = {
  id: string;
  title?: string;
  type: string;
  surveyIds?: string[];
}

export type Q = ChoiceQ | SliderQ | SwiperQ | FillInBlankQ;

export type Page = sectionBase & {
  type: 'normal' | 'intro';
  text?: string;
  iframeSrc?: string;
  redirectUri?: string;
  redirectDelay?: number;
};

export type P = Page ;
export type S = Q | P;

// 一份提交的答案
export type Collection = {
  id: string;
  // We don't need user to login to submit a survey, so authorId is not required
  // authorId: string; ?
  // maybe ip addr ?
  surveyId: string;
  createdAt: Date;
  // data: selectedValuesType;
  data: any;
}

export type User = {
  name: string;
  avatar?: string;
  password: string;
  refreshTokensId: string;
};
