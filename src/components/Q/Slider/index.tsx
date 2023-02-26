import './style.scss';
import { FC, useState, useContext } from 'react';
import classnames from 'classnames';
import { SliderQ, BaseComponentProps, selectedValuesType } from '../../../common/types';
import { StoredContext } from '../../../context';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

export type Props = BaseComponentProps & {
  q: SliderQ;
  onChange?: (selectedValues: selectedValuesType) => void;
};

export const Slider: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const { form } = useContext(StoredContext);
  const labelConfig = q.options.sort((a, b) => a.value - b.value);
  const min = labelConfig[0].value;
  const max = labelConfig[labelConfig.length - 1].value;

  const startV = (form[q.id] as number) || q.value || min;
  const [value, setValue] = useState<number>(startV);

  function getLabel(value: number) {
    return labelConfig.find((config) => value <= config.value)?.label;
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
      <div className='slider-label'>{getLabel(value)}</div>
    </div>
  );
};

export default Slider;
