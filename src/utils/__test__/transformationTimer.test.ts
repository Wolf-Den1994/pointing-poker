import transformationTimer from '../transformationTimer';

describe('transformationTimer util', () => {
  it('received time and return object with minutes and secons from this time', () => {
    const fn = transformationTimer(120);
    expect(fn).toStrictEqual({ minutes: '02', seconds: '00' });
  });
});
