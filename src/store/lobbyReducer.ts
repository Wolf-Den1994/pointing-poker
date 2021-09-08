import { AnyAction } from 'redux';
import membersArray from '../data';
import { ILobbyActionsString, ILobbyActionsBoolean, ILobbyActionsIMember, IMember } from '../types/types';
import { LobbyActions } from './action-types';

interface IInitialStateLobby {
  user: IMember;
  users: IMember[];
  link: string;
  isDealer: boolean;
}

const initialState: IInitialStateLobby = {
  // TODO: change the field to empty. change this state to the name that was during authorization
  user: { name: '', jobStatus: '', avatar: '' },
  users: membersArray,
  link: 'https://github.com/rolling-scopes-school/tasks/blob/yuliaHope-patch-4/tasks/react/pointing-poker.md',
  isDealer: true,
};

export const lobbyReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case LobbyActions.CHANGE_USERNAME:
      return {
        ...state,
        user: { ...state.user, name: action.payload.name },
        users: state.users.map((user, index) => (index === 0 ? action.payload : user)),
      };

    case LobbyActions.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case LobbyActions.KICK_USER:
      return { ...state, users: state.users.filter((user) => user.name !== action.payload) };

    case LobbyActions.CHANGE_LINK:
      return { ...state, link: action.payload };

    case LobbyActions.IS_DEALER:
      return { ...state, isDealer: action.payload };

    default:
      return state;
  }
};

export const changeUsername = (payload: IMember): ILobbyActionsIMember => ({
  type: LobbyActions.CHANGE_USERNAME,
  payload,
});

export const addUser = (payload: IMember): ILobbyActionsIMember => ({
  type: LobbyActions.ADD_USER,
  payload,
});

export const kickUser = (payload: string): ILobbyActionsString => ({
  type: LobbyActions.KICK_USER,
  payload,
});

export const changeLink = (payload: string): ILobbyActionsString => ({
  type: LobbyActions.CHANGE_LINK,
  payload,
});

export const changeDealer = (payload: boolean): ILobbyActionsBoolean => ({
  type: LobbyActions.IS_DEALER,
  payload,
});
