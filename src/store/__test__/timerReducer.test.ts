import { resetTime, startTime, timerReducer } from '../timerReducer';

describe('Timer reducer', () => {
  const state = {
    time: 60,
  };

  it('should be start time with received number after call startTime', () => {
    const action = startTime(60);
    const newState = timerReducer(state, action);
    expect(newState.time).toBe(60);
  });

  it('should be reset time on received number after call resetTime', () => {
    const action = resetTime(200);
    const newState = timerReducer(state, action);

    expect(newState.time).toBe(200);
  });
});
