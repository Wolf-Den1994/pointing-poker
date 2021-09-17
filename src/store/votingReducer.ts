import { AnyAction } from 'redux';
import { VotingActions } from './actionTypes';

interface IInitialStateVoting {
  isVisible: boolean;
  userName: string;
}

const initialState: IInitialStateVoting = {
  isVisible: false,
  userName: '',
};

export const votingReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case VotingActions.SET_MODAL_VISIBLE:
      return { ...state, isVisible: action.payload };

    case VotingActions.SET_DELETED_USER:
      return { ...state, userName: action.payload };

    default:
      return state;
  }
};

interface IVotingActionsString {
  type: VotingActions;
  payload: string;
}

interface IVotingActionsBoolean {
  type: VotingActions;
  payload: boolean;
}

export const setNameOfDeletedUser = (payload: string): IVotingActionsString => ({
  type: VotingActions.SET_DELETED_USER,
  payload,
});

export const changeModalActivity = (payload: boolean): IVotingActionsBoolean => ({
  type: VotingActions.SET_MODAL_VISIBLE,
  payload,
});
