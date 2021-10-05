import { progressReducer, setOffProgress, setOnProgress } from '../progressReducer';

const state = {
  progress: false,
};

it('after call setOnProgess action progress should be truthy', () => {
  const action = setOnProgress();
  const newState = progressReducer(state, action);
  expect(newState.progress).toBeTruthy();
});

it('after call setOnProgess action progress should be falsy', () => {
  const action = setOffProgress();
  const newState = progressReducer(state, action);
  expect(newState.progress).toBeFalsy();
});
