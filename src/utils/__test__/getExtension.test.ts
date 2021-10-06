import { getExtension } from '../getExtension';

describe('getExtension util', () => {
  it('should return csv from string "test.csv"', () => {
    const fn = getExtension('test.csv');
    expect(fn).toBe('csv');
  });

  it('should return xlsx from string "newTest.xlsx"', () => {
    const fn = getExtension('newTest.xlsx');
    expect(fn).toBe('xlsx');
  });
});
