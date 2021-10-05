import transformationTimer from '../transformationTimer';

it('received time and return object with minutes and secons from this time', () => {
  const fn = transformationTimer(120);
  expect(fn).not.toBeNull();
  expect(fn).toStrictEqual({ minutes: '02', seconds: '00' });
});
