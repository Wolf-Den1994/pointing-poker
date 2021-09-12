import moment from 'moment';
import { AnyAction } from 'redux';
import { IGameSettingsData, OptionSettings } from '../types/types';
import { SettingsActions } from './actionTypes';

interface IInitialStateSettings {
  settings: IGameSettingsData;
  cardSet: string[];
}

const initialState: IInitialStateSettings = {
  settings: {
    isDealerActive: false,
    voteAfterRoundEnd: false,
    autoFlipCards: false,
    autoAdmitMembers: false,
    showTimer: false,
    scoreType: OptionSettings.StoryPoint,
    customizeCard: '',
    roundTime: moment('02:20', 'mm:ss'),
  },
  cardSet: ['Pass'],
};

export const settingsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case SettingsActions.CHANGE_SETTINGS:
      return { ...state, settings: action.payload };

    case SettingsActions.ADD_CARD:
      return { ...state, cardSet: [...state.cardSet, action.payload] };

    case SettingsActions.REMOVE_CARD:
      return { ...state, cardSet: state.cardSet.filter((card) => card !== action.payload) };

    case SettingsActions.EDIT_CARD: {
      const index = state.cardSet.findIndex((card) => card === action.payload.oldCard);
      const newCardSetArray = [...state.cardSet];
      newCardSetArray[index] = action.payload.newCard;
      return { ...state, cardSet: newCardSetArray };
    }

    default:
      return state;
  }
};

interface ISettingsActionsIGameSettings {
  type: SettingsActions;
  payload: IGameSettingsData;
}

interface ICardActionsString {
  type: SettingsActions;
  payload: string;
}

interface INewCard {
  oldCard: string;
  newCard: string;
}

interface ICardActionsEdit {
  type: SettingsActions;
  payload: INewCard;
}

export const changeSettings = (payload: IGameSettingsData): ISettingsActionsIGameSettings => ({
  type: SettingsActions.CHANGE_SETTINGS,
  payload,
});

export const addCard = (payload: string): ICardActionsString => ({
  type: SettingsActions.ADD_CARD,
  payload,
});

export const removeCard = (payload: string): ICardActionsString => ({
  type: SettingsActions.REMOVE_CARD,
  payload,
});

export const editCard = (payload: INewCard): ICardActionsEdit => ({
  type: SettingsActions.EDIT_CARD,
  payload,
});
