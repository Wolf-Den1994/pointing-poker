import { AnyAction } from 'redux';
import { TimerActions } from './actionTypes';

interface IInitialStateTimer {
  time: number;
}

const initialState: IInitialStateTimer = {
  time: 120,
};

export const timerReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case TimerActions.START_TIME:
      return { ...state, time: action.payload };

    case TimerActions.RESET_TIME:
      return { ...state, time: action.payload };

    default:
      return state;
  }
};

interface ITimerActionsNumber {
  type: TimerActions;
  payload: number;
}

export const startTime = (payload: number): ITimerActionsNumber => ({
  type: TimerActions.START_TIME,
  payload,
});

export const resetTime = (payload: number): ITimerActionsNumber => ({
  type: TimerActions.RESET_TIME,
  payload,
});
