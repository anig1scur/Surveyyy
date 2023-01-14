import './style.scss';
import { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps, QuestionType } from '../../../common/types';

export type Props = BaseComponentProps & {
  config: SliderQ;
  onChange?: (selectedValues: { [key: number]: string }) => void;
};

export const Slider: FC<Props> = (props) => {
  const { config, style, className, onChange } = props;
  const [value, setValue] = useState<number>(config.value);

  function getLabel(value: number) {
    const labelConfig = config.labelConfig;
    Object.keys(labelConfig).map((k: string) => {
      if (value < parseInt(k)) {
        return labelConfig[parseInt(k)];
      }
    });
    return labelConfig[Object.keys(labelConfig).length - 1];
  }

  return (
    <div
      style={style}
      className={classnames('slider', className)}>
      <div className='title'>{config.title}</div>
      <div className='slider-wrap'>
        <input
          type='range'
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          className='slider-input'
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            console.log(getLabel(value));
          }}
        />
      </div>
      <div>{getLabel(value)}</div>
      <div className='slider-label'>{config.resultType === 'number' ? value : getLabel(value)}</div>
    </div>
  );
};
