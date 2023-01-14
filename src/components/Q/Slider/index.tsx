import './style.scss';
import { FC, useState } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps, valueType } from '../../../common/types';

export type Props = BaseComponentProps & {
  q: SliderQ;
  onChange?: (selectedValues: { [key: number]: string }) => void;
};

export const Slider: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const [value, setValue] = useState<number>(q.value);

  function getLabel(value: number) {
    const labelConfig = q.labelConfig;
    // sort labelConfig by threshold and return the first label that matches
    return labelConfig.sort((a, b) => b[0] - a[0]).find(([threshold, _]) => value >= threshold)?.[1];
  }

  return (
    <div
      style={style}
      className={classnames('slider', className)}>
      <div className='title'>{q.title}</div>
      <div className='slider-wrap'>
        <input
          type='range'
          min={q.min}
          max={q.max}
          step={q.step}
          value={value}
          className='slider-input'
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            console.log(getLabel(value));
          }}
        />
      </div>
      <div className='slider-label'>{q.valueType === valueType.number ? value : getLabel(value)}</div>
    </div>
  );
};

export default Slider;
