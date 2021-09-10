import { AnyAction } from 'redux';
import { CardSetActions } from './actionTypes';

interface IInitialStateCardSet {
  cardSet: string[];
}

const initialState: IInitialStateCardSet = {
  cardSet: ['Pass', '12', '5'],
};

export const cardSetReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case CardSetActions.ADD_CARD:
      return { ...state, cardSet: [...state.cardSet, action.payload] };

    case CardSetActions.REMOVE_CARD:
      return { ...state, cardSet: state.cardSet.filter((card) => card !== action.payload) };

    case CardSetActions.EDIT_CARD: {
      const index = state.cardSet.findIndex((card) => card === action.payload.oldCard);
      const newCardSetArray = [...state.cardSet];
      newCardSetArray[index] = action.payload.newCard;
      return { ...state, cardSet: newCardSetArray };
    }

    default:
      return state;
  }
};

interface ICardActionsString {
  type: CardSetActions;
  payload: string;
}

interface INewCard {
  oldCard: string;
  newCard: string;
}

interface ICardActionsEdit {
  type: CardSetActions;
  payload: INewCard;
}

export const addCard = (payload: string): ICardActionsString => ({
  type: CardSetActions.ADD_CARD,
  payload,
});

export const removeCard = (payload: string): ICardActionsString => ({
  type: CardSetActions.REMOVE_CARD,
  payload,
});

export const editCard = (payload: INewCard): ICardActionsEdit => ({
  type: CardSetActions.EDIT_CARD,
  payload,
});
