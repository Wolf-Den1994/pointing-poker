import { AnyAction } from 'redux';
import membersArray from '../data';
import { IActionCreatorsForString, IActionCreatorsForIMember, IMember } from '../types/types';
import { LobbyActions } from './action-types';

interface IInitialStateLobby {
  username: string;
  users: IMember[];
  link: string;
}

const initialState: IInitialStateLobby = {
  // TODO: change the field to empty. change this state to the name that was during authorization
  username: 'Rick Giligan',
  users: membersArray,
  link: 'https://github.com/rolling-scopes-school/tasks/blob/yuliaHope-patch-4/tasks/react/pointing-poker.md',
};

export const lobbyReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case LobbyActions.CHANGE_USERNAME:
      return { ...state, username: action.payload };

    case LobbyActions.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case LobbyActions.KICK_USER:
      return { ...state, users: state.users.filter((user) => user.name !== action.payload) };

    case LobbyActions.CHANGE_LINK:
      return { ...state, link: action.payload };

    default:
      return state;
  }
};

export const changeUsername = (payload: string): IActionCreatorsForString => ({
  type: LobbyActions.CHANGE_USERNAME,
  payload,
});

export const addUser = (payload: IMember): IActionCreatorsForIMember => ({
  type: LobbyActions.ADD_USER,
  payload,
});

export const kickUserX = (payload: string): IActionCreatorsForString => ({
  type: LobbyActions.KICK_USER,
  payload,
});

export const changeLink = (payload: string): IActionCreatorsForString => ({
  type: LobbyActions.CHANGE_LINK,
  payload,
});
