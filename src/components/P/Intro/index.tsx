// start page for a survey

import './style.scss';

import { FC } from 'react';
import { BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {
  title?: string;
  text?: string;
};

export const Intro: FC<Props> = (props) => {
  const { title, text } = props;

  return (
    <div className='intro'>
      <div className='title'>{title}</div>
      <div className='text'>{text}</div>
    </div>
  );
};

export default Intro;
