import { AnyAction } from 'redux';
import { IMember } from '../types/types';
import { LobbyActions } from './actionTypes';

interface IInitialStateLobby {
  link: string;
  isDealer: boolean;
}

const initialState: IInitialStateLobby = {
  // TODO: change the field to empty. change this state to the name that was during authorization
  link: '',
  isDealer: true,
};

export const lobbyReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case LobbyActions.CHANGE_LINK:
      return { ...state, link: action.payload };

    case LobbyActions.IS_DEALER:
      return { ...state, isDealer: action.payload };

    default:
      return state;
  }
};

interface ILobbyActionsBoolean {
  type: LobbyActions;
  payload: boolean;
}

interface ILobbyActionsString {
  type: LobbyActions;
  payload: string;
}

interface ILobbyActionsIMember {
  type: LobbyActions;
  payload: IMember;
}

export const addUser = (payload: IMember): ILobbyActionsIMember => ({
  type: LobbyActions.ADD_USERS,
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
