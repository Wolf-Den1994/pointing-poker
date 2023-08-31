import { ICardData, ICardSetsData } from '../../types/types';

const CARD_SETS_KEY = 'cardSets';

export const getCardSetstLocalStorage = (): ICardSetsData | null => {
  const cardSets = window.localStorage.getItem(CARD_SETS_KEY);
  if (cardSets) {
    return JSON.parse(cardSets);
  }
  return null;
};

export const setCardSetsLocalStorage = (data: ICardSetsData): void =>
  window.localStorage.setItem(CARD_SETS_KEY, JSON.stringify(data));

export const addCardToLocalStorage = (cardName: string, newCard: ICardData): void => {
  const storage = getCardSetstLocalStorage();
  if (storage) {
    storage[cardName].push(newCard);
    storage[cardName].sort((a, b) => Number(a.card) - Number(b.card));
    setCardSetsLocalStorage(storage);
  }
};

export const editCardInLocalStorage = (cardName: string, newCard: string, oldCard: string): void => {
  const storage = getCardSetstLocalStorage();
  if (storage) {
    storage[cardName].forEach((card: ICardData) => {
      const editCard = card;
      if (card.card === oldCard) editCard.card = newCard;
    });
    setCardSetsLocalStorage(storage);
  }
};

export const deleteCardFromLocalStorage = (cardName: string, deletedCard: string): void => {
  const storage = getCardSetstLocalStorage();
  if (storage) {
    storage[cardName] = storage[cardName].filter((card: ICardData) => card.card !== deletedCard);
    setCardSetsLocalStorage(storage);
  }
};

export const getCardsFromLocalStorage = (cardName: string): ICardData[] | [] => {
  const storage = getCardSetstLocalStorage();
  return storage ? storage[cardName] : [];
};
