// https://github.com/ahalimkara/react-tinder-cards

import { FC, useEffect } from 'react';
import classNames from 'classnames';
// import { faCheckCircle, faTimesCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Provider, useDispatch, useSelector } from 'react-redux';

import './style.scss';
import Card from './Card';
import Button from './Button';

import { store } from './redux/store';
import { RootState } from './redux/reducers';
import { NO, YES, RESET, INIT_STATE } from './redux/actions';
import { SwiperQ, BaseComponentProps, selectedValuesType } from '../../../common/types';

export type Props = BaseComponentProps & {
  q: SwiperQ;
  onChange?: (selectedValues: selectedValuesType) => void;
  onGoNext?: () => void;
};

export const SwiperWrapper: FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <Swiper {...props} />
    </Provider>
  );
};

export const Swiper: FC<Props> = (props) => {
  const { q, style, className, onChange, onGoNext } = props;
  const lastChoice = useSelector((state: RootState) => state.lastChoice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_STATE, cardsLength: q.options.length });
  }, [q.options.length]);

  useEffect(() => {
    const values = Object.entries(lastChoice.selectedValues).reduce(function (prev: selectedValuesType, pair) {
      const [key, value] = pair;
      prev[q.options[parseInt(key)].id] = value;
      return prev;
    }, {});

    onChange && onChange({ [q.id]: values });

    // auto go next if all cards are swiped
    if (lastChoice.type && lastChoice.currentCardIndex === 0) {
      setTimeout(() => {
        onGoNext && onGoNext();
      }, 300);
    }
  }, [lastChoice.selectedValues]);

  return (
    <div
      className={classNames('swiper', className)}
      style={style}>
      <div className='title'>{q.title}</div>
      <div className='cards'>
        {q.options.map((card, index) => (
          <Card
            cardLength={q.options.length}
            key={index}
            index={index}
            {...card}
          />
        ))}
      </div>
      {/* <div className='buttons'>
        <Button
          icon={faTimesCircle}
          type={NO}
        />
        <Button
          icon={faPlayCircle}
          type={RESET}
        />
        <Button
          icon={faCheckCircle}
          type={YES}
        />
      </div> */}
    </div>
  );
};

export default SwiperWrapper;
