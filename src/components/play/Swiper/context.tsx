import type { ReactNode } from 'react';
import { useState, createContext, Dispatch, SetStateAction } from 'react';

import { cardItem } from '../../../common/types';

export const SwiperContext = createContext<{
  cards: cardItem[];
  setCards: Dispatch<SetStateAction<cardItem[]>>;
}>({} as any);

export const SwiperProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<cardItem[]>([]);
  return (
    <SwiperContext.Provider
      value={{
        cards,
        setCards,
      }}>
      {children}
    </SwiperContext.Provider>
  );
};
