import { AnyAction } from 'redux';
import { ProgressVoiting } from './actionTypes';

interface IInitialStateProgress {
  progress: boolean;
}

const initialState: IInitialStateProgress = { progress: false };

export const progressReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case ProgressVoiting.ON_PROGRESS:
      return { ...state, progress: true };

    case ProgressVoiting.OFF_PROGRESS:
      return { ...state, progress: false };

    default:
      return state;
  }
};

interface IProgressActions {
  type: ProgressVoiting;
}

export const setOnProgress = (): IProgressActions => ({
  type: ProgressVoiting.ON_PROGRESS,
});

export const setOffProgress = (): IProgressActions => ({
  type: ProgressVoiting.OFF_PROGRESS,
});
