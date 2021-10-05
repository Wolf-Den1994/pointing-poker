import getFirstUpLetters from '../getFirstUpLetters';

it('should return first letter of received strings', () => {
  const fn = getFirstUpLetters('Andrei');
  expect(fn).toBe('A');
  expect(fn).not.toBeNull();
});
