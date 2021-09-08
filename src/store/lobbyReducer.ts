import { AnyAction } from 'redux';
import membersArray from '../data';
import { ADD_USER, CHANGE_USERNAME, KICK_USER } from './action-types';

const initialState = {
  // TODO: change the field to empty. change this state to the name that was during authorization
  username: 'Rick Giligan',
  users: membersArray,
};

export const lobbyReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return { ...state, username: action.payload };

    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case KICK_USER:
      return { ...state, users: state.users.filter((user) => user.name !== action.payload) };

    default:
      return state;
  }
};

export const changeUsername = (payload: string) => ({
  type: CHANGE_USERNAME,
  payload,
});

export const addUser = (payload: string) => ({
  type: ADD_USER,
  payload,
});

export const kickUserX = (payload: string) => ({
  type: KICK_USER,
  payload,
});
