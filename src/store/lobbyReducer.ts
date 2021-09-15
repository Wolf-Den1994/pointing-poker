import { AnyAction } from 'redux';
import { LobbyActions } from './actionTypes';

interface IInitialStateLobby {
  isDealer: boolean;
}

const initialState: IInitialStateLobby = {
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
