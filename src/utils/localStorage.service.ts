import { ICardData, ICardSetsData } from '../types/types';

const getCardSetstLocalStorage = (roomId: string): ICardSetsData | null => {
  const cardSets = window.localStorage.getItem(roomId);
  if (cardSets) {
    return JSON.parse(cardSets);
  }
  return null;
};

export const setCardSetsLocalStorage = (roomId: string, data: ICardSetsData): void =>
  window.localStorage.setItem(roomId, JSON.stringify(data));

export const deleteCardSetsLocalStorage = (roomId: string): void => {
  window.localStorage.removeItem(roomId);
};

export const addCardToLocalStorage = (roomId: string, cardName: string, newCard: ICardData): void => {
  const storage = getCardSetstLocalStorage(roomId);
  if (storage) {
    storage[cardName].push(newCard);
    setCardSetsLocalStorage(roomId, storage);
  }
};

export const editCardInLocalStorage = (roomId: string, cardName: string, newCard: string, oldCard: string): void => {
  const storage = getCardSetstLocalStorage(roomId);
  if (storage) {
    storage[cardName].forEach((card: ICardData) => {
      const editCard = card;
      if (card.card === oldCard) editCard.card = newCard;
    });
    setCardSetsLocalStorage(roomId, storage);
  }
};

export const deleteCardFromLocalStorage = (roomId: string, cardName: string, deletedCard: string): void => {
  const storage = getCardSetstLocalStorage(roomId);
  if (storage) {
    storage[cardName] = storage[cardName].filter((card: ICardData) => card.card !== deletedCard);
    setCardSetsLocalStorage(roomId, storage);
  }
};

export const getCardsFromLocalStorage = (roomId: string, cardName: string): ICardData[] | [] => {
  const storage = getCardSetstLocalStorage(roomId);
  return storage ? storage[cardName] : [];
};
