import getFirstUpLetters from '../getFirstUpLetters';

describe('getFirstUpLetters util', () => {
  it('should return first letter of received string', () => {
    const fn = getFirstUpLetters('Android');
    expect(fn).toBe('A');
  });
});
