// start page for a survey

import './style.scss';

import { FC } from 'react';
import { BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {
  title: string;
  text?: string;
  onGoNext: () => void;
};

export const Intro: FC<Props> = (props) => {
  const { title, text, onGoNext } = props;

  return (
    <div className='intro'>
      <div className='title'>
        {title.split(/\n/).map((line) => (
          <div
            className='paragraph'
            key={line}>
            {line}
          </div>
        ))}
      </div>
      <div
        className='action'
        onClick={onGoNext}>
        <div className='text'>{text}</div>
        <div className='start'>start</div>
      </div>
    </div>
  );
};

export default Intro;
