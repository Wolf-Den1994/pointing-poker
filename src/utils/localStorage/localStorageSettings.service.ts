import { OptionSettings, IGameSettingsData } from '../../types/types';

export const SETTINGS_KEY = 'settings';

const initialSettings = {
  isDealerActive: false,
  voteAfterRoundEnd: false,
  autoFlipCards: false,
  autoFlipCardsAllVoted: false,
  autoAdmitMembers: false,
  showTimer: false,
  scoreType: OptionSettings.Fibonacci,
  roundTime: 1,
};

export const getSettingsLocalStorage = (): IGameSettingsData => {
  const settings = window.localStorage.getItem(SETTINGS_KEY);
  if (settings) {
    return JSON.parse(settings);
  }
  return initialSettings;
};

export const setSettingsLocalStorage = (data: IGameSettingsData): void =>
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
