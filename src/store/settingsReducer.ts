import { AnyAction } from 'redux';
import { IGameSettingsData, cardSets, ICardData } from '../types/types';
import { getCardSetstLocalStorage, getCardTypeLocalStorage } from '../utils/localStorage';
import { SettingsActions } from './actionTypes';

interface IInitialStateSettings {
  settings: IGameSettingsData;
  cardSet: ICardData[];
  visibleChat: boolean;
}

const scoreType = getCardTypeLocalStorage();
const cardSet = getCardSetstLocalStorage()?.[scoreType];

const initialState: IInitialStateSettings = {
  settings: {
    isDealerActive: false,
    voteAfterRoundEnd: false,
    autoFlipCards: false,
    autoFlipCardsAllVoted: false,
    autoAdmitMembers: false,
    showTimer: false,
    scoreType,
    roundTime: 1,
  },
  cardSet: cardSet || cardSets.fibonacci,
  visibleChat: false,
};

export const settingsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case SettingsActions.CHANGE_SETTINGS:
      return { ...state, settings: action.payload };

    case SettingsActions.ADD_CARD:
      return { ...state, cardSet: [...state.cardSet, action.payload].sort((a, b) => a.card - b.card) };

    case SettingsActions.REMOVE_CARD:
      return { ...state, cardSet: state.cardSet.filter((card) => card.card !== action.payload) };

    case SettingsActions.EDIT_CARD:
      return {
        ...state,
        cardSet: state.cardSet.map((card) => ({
          ...card,
          card: card.card === action.payload.oldCard ? action.payload.newCard : card.card,
        })),
      };

    case SettingsActions.SET_CARDS:
      return { ...state, cardSet: action.payload };

    case SettingsActions.SET_ACTIVE_CARD:
      return {
        ...state,
        cardSet: state.cardSet.map((card) => ({
          ...card,
          isActive: card.card === action.payload && !card.isActive,
        })),
      };

    case SettingsActions.DISABLE_ACTIVE:
      return { ...state, cardSet: state.cardSet.map((card) => ({ ...card, isActive: false })) };

    case SettingsActions.VISIBLE_CHAT:
      return { ...state, visibleChat: action.payload };

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

interface ICardActionsICardData {
  type: SettingsActions;
  payload: ICardData;
}

interface INewCard {
  oldCard: string;
  newCard: string;
}

interface ICardActionsEdit {
  type: SettingsActions;
  payload: INewCard;
}

interface ICardActionsSet {
  type: SettingsActions;
  payload: ICardData[];
}

interface IVisibleChatActions {
  type: SettingsActions;
  payload: boolean;
}

interface IDisableActiveCards {
  type: SettingsActions;
}

export const changeSettings = (payload: IGameSettingsData): ISettingsActionsIGameSettings => ({
  type: SettingsActions.CHANGE_SETTINGS,
  payload,
});

export const addCard = (payload: ICardData): ICardActionsICardData => ({
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

export const setCards = (payload: ICardData[]): ICardActionsSet => ({
  type: SettingsActions.SET_CARDS,
  payload,
});

export const setActiveCard = (payload: string): ICardActionsString => ({
  type: SettingsActions.SET_ACTIVE_CARD,
  payload,
});

export const disableActiveCards = (): IDisableActiveCards => ({
  type: SettingsActions.DISABLE_ACTIVE,
});

export const setVisibleChat = (payload: boolean): IVisibleChatActions => ({
  type: SettingsActions.VISIBLE_CHAT,
  payload,
});
