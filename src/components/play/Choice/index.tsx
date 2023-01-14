/*
  single or multiple Choice allowing custom input

  UI depeneds on the following states:

  1. whether custom value empty
  2. whether custom input focused
  3. whether custom choice selected
  4. if choice be clicked and value not empty, recognize the value selected by user
  */

import './style.scss';
import { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { ChoiceQ, BaseComponentProps } from '../../../common/types';

export type Props = BaseComponentProps & {
  q: ChoiceQ;
  onChange?: (values: Set<string>) => void;
};

export const Choice: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [choiceQ, setChoiceQ] = useState<ChoiceQ>(q);
  const [customValue, setCustomValue] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const [displayCustomInput, setDisplayCustomInput] = useState<boolean>(false);

  const single = !choiceQ.allowMultiple;

  useEffect(() => {
    setChoiceQ(q);
  }, [q]);

  function updateSelectedValues() {
    selectedValues.delete(customValue);
    const newVal = ref.current?.value || '';
    setCustomValue(newVal);

    if (newVal) {
      if (single) {
        setSelectedValues(new Set([newVal]));
      } else {
        setSelectedValues(new Set([...selectedValues, newVal]));
      }
    }
    onChange && onChange(selectedValues);
    setDisplayCustomInput(false);
  }

  return (
    <div
      style={style}
      className={classnames('choice', className)}>
      <div className='title'>{choiceQ.title}</div>
      {single ? (
        <div className='radio-group'>
          {choiceQ.options.map((option) => (
            <div
              className='radio-option'
              key={option.value}>
              <input
                checked={selectedValues.has(option.value)}
                type='radio'
                name='choice'
                value={option.value}
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setSelectedValues(new Set([option.value]));
                  }
                  onChange && onChange(selectedValues);
                }}
              />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className='checkbox-group'>
          {choiceQ.options.map((option) => (
            <div
              className='checkbox-option'
              key={option.value}>
              <input
                type='checkbox'
                name='choice'
                value={option.value}
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setSelectedValues(new Set([...selectedValues, option.value]));
                  } else {
                    setSelectedValues(new Set([...selectedValues].filter((v) => v !== option.value)));
                  }
                  onChange && onChange(selectedValues);
                }}
              />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      )}
      {choiceQ.allowCustom && (
        <div
          className={classnames('custom-choice', { selected: selectedValues.has(customValue) })}
          onClick={() => {
            setDisplayCustomInput(true);
          }}>
          {!displayCustomInput ? <span>{customValue ? customValue : 'Other'}</span> : null}
          {displayCustomInput && (
            <div className='input'>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};
