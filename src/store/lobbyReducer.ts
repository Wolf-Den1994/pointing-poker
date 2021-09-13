import { AnyAction } from 'redux';
import { LobbyActions } from './actionTypes';

interface IInitialStateLobby {
  isDealer: boolean;
}

const initialState: IInitialStateLobby = {
  // TODO: change the field to empty. change this state to the name that was during authorization
  isDealer: true,
};

export const lobbyReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
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

export const changeDealer = (payload: boolean): ILobbyActionsBoolean => ({
  type: LobbyActions.IS_DEALER,
  payload,
});
