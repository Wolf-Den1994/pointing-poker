import { changeModalActivity, setNameOfDeletedUser, votingReducer } from '../votingReducer';

describe('Voting reducer', () => {
  const state = {
    isVisible: false,
    userName: 'test',
  };

  it('should be truthy isVisible after call changeModalActivity with true action', () => {
    const action = changeModalActivity(true);
    const newState = votingReducer(state, action);

    expect(newState.isVisible).not.toBeFalsy();
  });

  it('should be falsy isVisible after call changeModalActivity with false action', () => {
    const action = changeModalActivity(false);
    const newState = votingReducer(state, action);

    expect(newState.isVisible).toBeFalsy();
  });

  it('should be choose userName with received name', () => {
    const action = setNameOfDeletedUser('test');
    const newState = votingReducer(state, action);

    expect(newState.userName).toBe('test');
  });
});
