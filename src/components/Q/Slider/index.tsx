import './style.scss';
import { FC, useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps, valueType, selectedValuesType } from '../../../common/types';
import { StoredContext } from '../../../context';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

export type Props = BaseComponentProps & {
  q: SliderQ;
  onChange?: (selectedValues: selectedValuesType) => void;
};

export const Slider: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const { min, max } = q;
  const { form } = useContext(StoredContext);
  const startV = (form[q.id] as number) || q.value || q.min;
  const [value, setValue] = useState<number>(startV);

  function getLabel(value: number) {
    return q.labelConfig.sort((a, b) => b[0] - a[0]).find(([threshold, _]) => value >= threshold)?.[1];
  }

  function mapRange(value: number, low1: number, high1: number, low2: number, high2: number): number {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  return (
    <div
      style={style}
      className={classnames('slider', className)}>
      <div className='title'>{q.title}</div>
      <Nouislider
        onSlide={(values: number[]) => {
          if (values[0] === value) return;
          setValue(values[0]);
        }}
        onChange={(values: number[]) => {
          if (values[0] === value) return;
          onChange &&
            onChange({
              [q.id]: values[0],
            });
        }}
        range={{ min: min, max: max }}
        start={startV}
      />
      <div className='slider-label'>{q.valueType === valueType.number ? value : getLabel(value)}</div>
    </div>
  );
};

export default Slider;
