import moment from 'moment';
import { AnyAction } from 'redux';
import { IGameSettingsData } from '../types/types';
import { SettingsActions } from './actionTypes';

interface IInitialStateSettings {
  settings: IGameSettingsData;
}

const initialState: IInitialStateSettings = {
  settings: {
    isDealerActive: false,
    voteAfterRoundEnd: false,
    autoFlipCards: false,
    showTimer: false,
    scoreType: 'story point',
    scoreTypeShort: 'SP',
    roundTime: moment('02:20', 'mm:ss'),
  },
};

export const settingsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case SettingsActions.CHANGE_SETTINGS:
      return { ...state, settings: action.payload };

    default:
      return state;
  }
};

interface ISettingsActionsIGameSettings {
  type: SettingsActions;
  payload: IGameSettingsData;
}

export const changeSettings = (payload: IGameSettingsData): ISettingsActionsIGameSettings => ({
  type: SettingsActions.CHANGE_SETTINGS,
  payload,
});
