import { AnyAction } from 'redux';
import { RequestActions } from './actionTypes';

interface IInitialStateVoting {
  requestsFromUsers: string[];
}

const initialState: IInitialStateVoting = {
  requestsFromUsers: [],
};

export const requestsForEnterReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case RequestActions.ADD_USER_ID:
      return { ...state, requestsFromUsers: [...state.requestsFromUsers, action.payload] };

    case RequestActions.DELETE_USER_ID:
      return { ...state, requestsFromUsers: state.requestsFromUsers.filter((el) => el !== action.payload) };

    default:
      return state;
  }
};

interface IRequestUserId {
  type: RequestActions;
  payload: string;
}

export const addUserRequest = (payload: string): IRequestUserId => ({
  type: RequestActions.ADD_USER_ID,
  payload,
});

export const deleteUserRequest = (payload: string): IRequestUserId => ({
  type: RequestActions.DELETE_USER_ID,
  payload,
});
