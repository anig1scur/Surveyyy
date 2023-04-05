/**
 * Fill in the blank with dropdown options
 */
import "./style.scss";
import { Popover } from "react-tiny-popover";
import { FC, useRef, useEffect, useState, useContext } from "react";
import classnames from "classnames";
import {
  FillInBlankConfig,
  FillInBlankQ,
  BlankItem,
  PlainItem,
  BaseComponentProps,
  fillInType,
  selectedValuesType,
} from "../../../common/types";
import { StoredContext } from "../../../context";

export type Props = BaseComponentProps & {
  q: FillInBlankQ;
  onChange?: (selectedValues: selectedValuesType) => void;
};

export const FillInTheBlank: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const config = q.options;

  const { form } = useContext(StoredContext);
  const ref = useRef(null);
  const [showingOption, setShowingOption] = useState<string>("");
  const selectedValues: selectedValuesType = (form[q.id] as selectedValuesType) || {};

  const [fillInTheBlankConfig, setFillInTheBlankConfig] = useState<FillInBlankConfig>([]);

  useEffect(() => {
    setFillInTheBlankConfig(config);
  }, [config]);

  return (
    <div
      style={style}
      className={classnames("fill-in-the-blank", className)}
      ref={ref}
      onClick={() => {
        setShowingOption("");
      }}>
      {fillInTheBlankConfig.map((item: PlainItem | BlankItem, index: number) => {
        if (item.type === fillInType.plain) {
          return <span key={index}>{item.text}</span>;
        }
        if (item.type === fillInType.blank) {
          return (
            <Popover
              parentElement={ref.current || undefined}
              isOpen={showingOption == item.id}
              positions={["bottom", "right", "top", "left"]} // preferred positions by priority
              content={
                <div className='menu'>
                  {item.options.map((option: string, optionIdx: number) => (
                    <div
                      className='option'
                      key={`question-${item.id}-option-${optionIdx}`}
                      onClick={() => {
                        const newConfig = [...fillInTheBlankConfig];
                        newConfig[index].text = option;
                        setFillInTheBlankConfig(newConfig);
                        setShowingOption("");
                        selectedValues[item.id] = option;
                        onChange && onChange({ [q.id]: selectedValues });
                      }}>
                      {option}
                    </div>
                  ))}
                </div>
              }>
              <div
                key={index}
                className={classnames("blank", {
                  selected: selectedValues[item.id],
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowingOption(showingOption === item.id ? "" : item.id);
                }}>
                <span>{item.text}</span>
              </div>
            </Popover>
          );
        }
      })}
    </div>
  );
};

export default FillInTheBlank;
