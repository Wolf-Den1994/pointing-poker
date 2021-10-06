import { progressReducer, setOffProgress, setOnProgress } from '../progressReducer';

const state = {
  progress: false,
};

describe('Progress reducer', () => {
  it('should be truthy action progress after call setOnProgess', () => {
    const action = setOnProgress();
    const newState = progressReducer(state, action);
    expect(newState.progress).toBeTruthy();
  });

  it('should be falsy action progress after call setOnProgess', () => {
    const action = setOffProgress();
    const newState = progressReducer(state, action);
    expect(newState.progress).toBeFalsy();
  });
});
