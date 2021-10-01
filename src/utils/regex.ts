export const checkForLettersAndNumbers = (word: string): boolean => {
  const regex = new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9-]+$');
  return regex.test(word);
};
