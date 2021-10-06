import { getExtension } from '../getExtension';

it('should return extension from string "test.csv"', () => {
  const fn = getExtension('test.csv');
  expect(fn).not.toBeNull();
  expect(fn).toBe('csv');
  const newFn = getExtension('newTest.xlsx');
  expect(newFn).toBe('xlsx');
  expect(newFn).not.toBeUndefined();
});
