import { ChoiceActionType, NO, YES, YesNoAction, RESET, INIT_STATE } from './actions';
import { combineReducers } from 'redux';
import { selectedValuesType } from '../../../../common/types';

export interface RootState {
  lastChoice: LastChoiceState;
}

export interface LastChoiceState {
  type: ChoiceActionType | null;
  cardsLength: number;
  currentCardIndex: number;
  selectedValues: selectedValuesType;
}

const initialState: LastChoiceState = {
  type: null,
  cardsLength: 0,
  currentCardIndex: 0,
  selectedValues: {},
};

const lastChoice = (state = initialState, action: YesNoAction): LastChoiceState => {
  switch (action.type) {
    case YES:
    case NO:
      return {
        ...action,
        cardsLength: state.cardsLength,
        selectedValues: {
          ...state.selectedValues,
          [action.currentCardIndex]: action.type,
        },
      };
    case RESET:
      return {
        ...state,
        type: RESET,
        currentCardIndex: 4,
        selectedValues: {},
      };
    case INIT_STATE:
      return {
        ...action,
        cardsLength: action.cardsLength || 0,
        currentCardIndex: action.cardsLength || 0,
        selectedValues: {},
      };
    default:
      return state;
  }
};

export default combineReducers({ lastChoice });
