/**
 * Fill in the blank with dropdown options
 */
import './style.scss';
import { FC, useEffect, useState, useContext } from 'react';
import classnames from 'classnames';
import {
  FillInBlankConfig,
  FillInBlankQ,
  BlankItem,
  PlainItem,
  BaseComponentProps,
  fillInType,
  selectedValuesType,
} from '../../../common/types';
import { StoredContext } from '../../../context';

export type Props = BaseComponentProps & {
  q: FillInBlankQ;
  onChange?: (selectedValues: selectedValuesType) => void;
};

export const FillInTheBlank: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const config = q.config;

  const { form } = useContext(StoredContext);
  const selectedValues: selectedValuesType = form[q.id] as selectedValuesType || {};

  const [fillInTheBlankConfig, setFillInTheBlankConfig] = useState<FillInBlankConfig>([]);

  useEffect(() => {
    setFillInTheBlankConfig(config);
  }, [config]);

  return (
    <div
      style={style}
      className={classnames('fill-in-the-blank', className)}>
      {fillInTheBlankConfig.map((item: PlainItem | BlankItem, index: number) => {
        if (item.type === fillInType.plain) {
          return <span key={index}>{item.text}</span>;
        }
        if (item.type === fillInType.blank) {
          return (
            <div
              key={index}
              className={classnames(
                'blank', {
                  selected: selectedValues[item.id],
                }
              )}
              onMouseEnter={(e) => {
                document.querySelectorAll('.blank').forEach((blank) => {
                  blank.classList.remove('show-menu');
                });
                e.currentTarget.classList.add('show-menu');
              }}>
              <span>{item.text}</span>
              <div
                className='menu'
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('hide');
                  e.currentTarget.parentElement?.classList.remove('show-menu');
                }}>
                {item.options.map((option: string, optionIdx: number) => (
                  <div
                    className='option'
                    key={`question-${item.id}-option-${optionIdx}`}
                    onClick={(e) => {
                      const newConfig = [...fillInTheBlankConfig];
                      newConfig[index].text = option;
                      setFillInTheBlankConfig(newConfig);
                      e.currentTarget.parentElement?.parentElement?.classList.add('selected');
                      e.currentTarget.parentElement?.classList.add('hide');
                      selectedValues[item.id] = option;
                      onChange && onChange({[q.id]: selectedValues});
                    }}>
                    {option}
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FillInTheBlank;
