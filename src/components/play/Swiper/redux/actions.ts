export const YES = 'YES';
export const NO = 'NO';
export const RESET = 'RESET';
export const INIT_STATE = 'INIT_STATE';

export type ChoiceActionType = typeof YES | typeof NO | typeof RESET | typeof INIT_STATE;

export interface YesNoAction {
  type: ChoiceActionType,
  currentCardIndex: number,
  cardsLength?: number,
}

export const yes = (index: number): YesNoAction => ({
  type: YES,
  currentCardIndex: index - 1,
});

export const no = (index: number): YesNoAction => ({
  type: NO,
  currentCardIndex: index - 1,
});

export const resetChoice = (): YesNoAction => ({
  type: RESET,
  currentCardIndex: -1,
});
