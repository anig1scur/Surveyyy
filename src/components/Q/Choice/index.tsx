/*
  single or multiple Choice allowing custom input

  UI depeneds on the following states:

  1. whether custom value empty
  2. whether custom input focused
  3. whether custom choice selected
  4. if choice be clicked and value not empty, recognize the value selected by user
  */

import './style.scss';
import { FC, useRef, useState, useContext } from 'react';
import classnames from 'classnames';
import { ChoiceQ, BaseComponentProps } from '../../../common/types';
import { StoredContext } from '../../../context';

export type Props = BaseComponentProps & {
  q: ChoiceQ;
  onChange?: (values: Set<string>) => void;
};

export const Choice: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;

  const { form, customData, setCustomData } = useContext(StoredContext);
  const ref = useRef<HTMLInputElement>(null);
  const choiceQ = q;
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set(form[q.id]));
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
    onChange && onChange(newSet);
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
                type='radio'
                name='choice'
                value={option.value}
                checked={selectedValues.has(option.value)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    const newVal = new Set([option.value]);
                    setSelectedValues(newVal);
                    onChange && onChange(newVal);
                  }
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
                  const newSet = selectedValues;
                  if (e.currentTarget.checked) {
                    newSet.add(option.value);
                  } else {
                    newSet.delete(option.value);
                  }
                  setSelectedValues(newSet);
                  onChange && onChange(newSet);
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

export default Choice;
