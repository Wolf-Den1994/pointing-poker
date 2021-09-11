import moment from 'moment';
import { AnyAction } from 'redux';
import { IGameSettingsData, OptionSettings } from '../types/types';
import { SettingsActions } from './actionTypes';

interface IInitialStateSettings {
  settings: IGameSettingsData;
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
