import { AnyAction } from 'redux';
import { HomeActions } from './actionTypes';

interface IInitialStateHome {
  modalActive: boolean;
  imageAvatar: string;
}

const initialState: IInitialStateHome = {
  modalActive: false,
  imageAvatar: '',
};

export const homeReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case HomeActions.CHANGE_AVATAR:
      return { ...state, imageAvatar: action.payload };

    case HomeActions.CHANGE_MODAL_ACTIVE:
      return { ...state, modalActive: action.payload };

    default:
      return state;
  }
};

interface IHomeActionsString {
  type: HomeActions;
  payload: string;
}

interface IHomeActionsBoolean {
  type: HomeActions;
  payload: boolean;
}

export const changeAvatar = (payload: string): IHomeActionsString => ({
  type: HomeActions.CHANGE_AVATAR,
  payload,
});

export const chageModalActive = (payload: boolean): IHomeActionsBoolean => ({
  type: HomeActions.CHANGE_MODAL_ACTIVE,
  payload,
});
