// https://github.com/3DJakob/react-tinder-card

import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { faCheckCircle, faTimesCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
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
};

export const SwiperWrapper: FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <Swiper {...props} />
    </Provider>
  );
};

export const Swiper: FC<Props> = (props) => {
  const { q, style, className, onChange } = props;
  const lastChoice = useSelector((state: RootState) => state.lastChoice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_STATE, cardsLength: q.cards.length });
  }, [q.cards.length]);

  useEffect(() => {
    const values = Object.entries(lastChoice.selectedValues).reduce(function (prev: selectedValuesType, pair) {
      const [key, value] = pair;
      prev[q.cards[parseInt(key)].id] = value;
      return prev;
    }, {});
    onChange && onChange(values);
  }, [lastChoice.selectedValues]);

  return (
    <div>
      <div
        className={classNames('cards', className)}
        style={style}>
        {q.cards.map((card, index) => (
          <Card
            cardLength={q.cards.length}
            key={index}
            index={index}
            {...card}
          />
        ))}
      </div>
      <div className='buttons'>
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
      </div>
    </div>
  );
};

export default SwiperWrapper;
