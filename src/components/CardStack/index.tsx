import { FC } from 'react';
import './style.scss';
import classnames from 'classnames';

export type Props = {
  cards: Card[];
  onGoBack: () => void;
  onGoNext: () => void;
};
export interface Card {
  question: string;
  options: string[];
}

const CardStack: FC<Props> = (props) => {
  const { cards, onGoBack, onGoNext } = props;

  function pickOption() {
    onGoNext();
  }

  function goBack() {
    // update the current card index
    onGoBack();
  }

  return (
    <div className='card-stack'>
      <div className='cards-wrap mx-1 flex justify-center h-[24em]'>
        {cards.map((card, index) => {
          return (
            <div
              className={classnames(
                'card',
                'w-[90vw] max-w-[45em] min-h-[20em] max-h-[20em] pl-4 pr-1 pt-3 m-4',
                index === 0 ? 'first' : index === 1 ? 'second' : 'last-card'
              )}
              key={card.question}>
              <h5 className='text-2xl font-semibold mb-6'>{card.question}</h5>
              {card.options.map((option) => (
                <button
                  className='option'
                  onClick={() => pickOption()}>
                  {option}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardStack;
