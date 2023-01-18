import './style.scss';
import { FC, useState, useContext } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps, valueType, selectedValuesType } from '../../../common/types';
import { StoredContext } from '../../../context';

export type Props = BaseComponentProps & {
  q: SliderQ;
  onChange?: (selectedValues: selectedValuesType) => void;
};

export const Slider: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;

  const { form } = useContext(StoredContext);
  const [value, setValue] = useState<number>((form[q.id] as number) || q.value || q.min);

  function getLabel(value: number) {
    return q.labelConfig.sort((a, b) => b[0] - a[0]).find(([threshold, _]) => value >= threshold)?.[1];
  }

  return (
    <div
      style={style}
      className={classnames('slider', className)}>
      <div className='title'>{q.title}</div>
        <input
          type='range'
          min={q.min}
          max={q.max}
          step={q.step}
          defaultValue={value}
          className='slider-input'
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            onChange &&
              onChange({
                [q.id]: parseInt(e.target.value),
              });
          }}
        />
      <div className='slider-label'>{q.valueType === valueType.number ? value : getLabel(value)}</div>
    </div>
  );
};

export default Slider;
