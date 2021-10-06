import { ICardData, ICardSetsData } from '../types/types';

export const createLocalStorage = (roomId: string, data: ICardSetsData): void => {
  window.localStorage.setItem(roomId, JSON.stringify(data));
};

export const deleteLocalStorage = (roomId: string): void => {
  window.localStorage.removeItem(roomId);
};

export const addCardToLocalStorage = (roomId: string, cardsName: string, newCard: ICardData): void => {
  const cardSets = window.localStorage.getItem(roomId);
  if (cardSets) {
    const storage = JSON.parse(cardSets);
    storage[cardsName].push(newCard);
    window.localStorage.setItem(roomId, JSON.stringify(storage));
  }
};

export const editCardInLocalStorage = (roomId: string, cardsName: string, newCard: string, oldCard: string): void => {
  const cardSets = window.localStorage.getItem(roomId);
  if (cardSets) {
    const storage = JSON.parse(cardSets);
    storage[cardsName].forEach((card: ICardData) => {
      const editCard = card;
      if (card.card === oldCard) editCard.card = newCard;
    });
    window.localStorage.setItem(roomId, JSON.stringify(storage));
  }
};

export const deleteCardFromLocalStorage = (roomId: string, cardsName: string, deletedCard: string): void => {
  const cardSets = window.localStorage.getItem(roomId);
  if (cardSets) {
    const storage = JSON.parse(cardSets);
    const index = storage[cardsName].findIndex((card: ICardData) => card.card === deletedCard);
    storage[cardsName].splice(index, 1);
    window.localStorage.setItem(roomId, JSON.stringify(storage));
  }
};

export const getCardsFromLocalStorage = (roomId: string, cardsName: string): ICardData[] | [] => {
  const cardSets = window.localStorage.getItem(roomId);
  if (cardSets) {
    const storage = JSON.parse(cardSets);
    return storage[cardsName];
  }
  return [];
};
