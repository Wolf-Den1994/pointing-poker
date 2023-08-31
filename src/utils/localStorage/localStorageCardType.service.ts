import { OptionSettings } from '../../types/types';

export const CARD_TYPE_KEY = 'cardType';

export const getCardTypeLocalStorage = (): string => {
  const cardType = window.localStorage.getItem(CARD_TYPE_KEY);
  return cardType || OptionSettings.Fibonacci;
};

export const setCardTypeLocalStorage = (data: string): void => window.localStorage.setItem(CARD_TYPE_KEY, data);
