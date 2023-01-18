/*
  single or multiple Choice allowing custom input option

  depeneds on the following states:

  1. whether custom value empty
  2. whether custom input focused
  3. whether custom choice selected
  4. if custom input was clicked and the value wasn't empty, consider it be selected.
  */

import './style.scss';
import { FC, useRef, useState, useContext } from 'react';
import classnames from 'classnames';
import { ChoiceQ, BaseComponentProps, Option as OptionType } from '../../../common/types';
import { StoredContext } from '../../../context';

export type Props = BaseComponentProps & {
  q: ChoiceQ;
  onChange?: (values: { [key: string]: Set<string> }) => void;
};

export type OptionProps = {
  option: OptionType;
  selected: boolean;
};

const Option: FC<OptionProps> = (props) => {
  const { option, selected  } = props;
  return (
    <>
      <svg
        width='36'
        height='36'
        viewBox='0 0 100 100'>
        <rect
          x='12'
          y='12'
          width='75'
          height='75'
          stroke='#e3e3e3'
          fill='none'
        />
        <g transform='translate(0,-952.3622)'>
          <path
            d='m 21,972 c -2,53 10,38 56,38 -3,-8 -7,-15 -14,-21 2,5 15,18 15,22 0,0.11 -2,-0.15 -2,0 -1,1 -2,1 -4,2 -4,2 -10,8 -12,10 '
            stroke='black'
            fill='none'
            strokeWidth='3'
            className={
              classnames('path', {
                'selected': selected,
              })
            }
          />
        </g>
      </svg>
      <span> {option.value} </span>
    </>
  );
};

export const Choice: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;

  const { form, skipped, setSkipped, customData, setCustomData } = useContext(StoredContext);
  const ref = useRef<HTMLInputElement>(null);
  const choiceQ = q;
  const [selectedValues, setSelectedValues] = useState<Set<string>>((form[q.id] as Set<string>) || new Set());
  const [customValue, setCustomValue] = useState<string>(customData[q.id] || '');
  const [displayCustomInput, setDisplayCustomInput] = useState<boolean>(false);

  const single = !choiceQ.allowMultiple;

  function updateSelectedValues() {
    const newSet = selectedValues;
    newSet.delete(customValue);
    const newVal = ref.current?.value || '';
    setCustomValue(newVal);
    setCustomData({ ...customData, [q.id]: newVal });

    if (newVal) {
      if (single) {
        newSet.clear();
      }
      newSet.add(newVal);
    }
    setSelectedValues(newSet);
    onChange && onChange({ [q.id]: newSet });
    setDisplayCustomInput(false);
  }

  return (
    <div
      style={style}
      className={classnames('choice', className)}>
      <div className='title'>{choiceQ.title}</div>
      <div className='options'>
        {choiceQ.options.map((option) => (
          <div
            className={classnames('option')}
            key={option.value}>
            {/* <span className={classnames('label', { selected: selectedValues.has(option.value) })}>{option.label}</span> */}
            {single ? (
              <input
                type='radio'
                className='check'
                name='choice'
                value={option.value}
                checked={selectedValues.has(option.value)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    const newVal = new Set([option.value]);
                    setSelectedValues(newVal);
                    onChange && onChange({ [q.id]: newVal });
                    setSkipped({
                      ...skipped,
                      [q.id]: option.skip || new Set(),
                    });
                  }
                }}
              />
            ) : (
              <input
                type='checkbox'
                className='check'
                value={option.value}
                checked={selectedValues.has(option.value)}
                onChange={(e) => {
                  const newSet = selectedValues;
                  if (e.currentTarget.checked) {
                    newSet.add(option.value);
                  } else {
                    newSet.delete(option.value);
                  }
                  setSelectedValues(newSet);

                  // get all option skip from newSet and setSkipped
                  const skip = new Set<string>();
                  newSet.forEach((val) => {
                    const option = choiceQ.options.find((o) => o.value === val);
                    if (option && option.skip) {
                      option.skip.forEach((s) => skip.add(s));
                    }
                  });
                  setSkipped({ [q.id]: skip });
                  onChange && onChange({ [q.id]: newSet });
                }}
              />
            )}
            <Option
              option={option}
              key={option.value}
              selected={selectedValues.has(option.value)}
            />
          </div>
        ))}
        {choiceQ.allowCustom && (
          <div
            className={classnames('option')}
            onClick={() => {
              setDisplayCustomInput(true);
            }}>
            <Option
              selected={selectedValues.has(customValue)}
              option={{
                value: displayCustomInput ? '' : customValue || 'Other',
                label: choiceQ.customOptionLabel || 'Other',
              }}
            />
            {displayCustomInput ? (
              <span className='input'>
                <input
                  ref={ref}
                  autoFocus
                  type='text'
                  placeholder='Enter your choice'
                  defaultValue={customValue}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateSelectedValues();
                    }
                  }}
                  onBlur={updateSelectedValues}
                />
                <button className='confirm'>confirm</button>
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Choice;
