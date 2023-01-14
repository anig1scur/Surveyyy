import './style.scss';
import { FC, useState } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {
  config: SliderQ;
  onChange?: (selectedValues: { [key: number]: string }) => void;
};

export const Slider: FC<Props> = (props) => {
  const { config, style, className, onChange } = props;
  const [value, setValue] = useState<number>(config.value);

  function getLabel(value: number) {
    const labelConfig = config.labelConfig;
    // sort labelConfig by threshold and return the first label that matches
    return labelConfig.sort((a, b) => b[0]- a[0]).find(([threshold, _]) => value >= threshold)?.[1];
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
      <div className='slider-label'>{config.resultType === 'number' ? value : getLabel(value)}</div>
    </div>
  );
};
