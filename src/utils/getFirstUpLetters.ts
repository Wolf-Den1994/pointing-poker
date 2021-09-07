const getFirstUpLetters = (words: string): string =>
  words
    .split(' ')
    .map((item) => {
      return item[0];
    })
    .join('')
    .toUpperCase();

export default getFirstUpLetters;
