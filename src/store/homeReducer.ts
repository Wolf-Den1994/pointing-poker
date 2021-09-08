import { AnyAction } from 'redux';
import { HomeActions } from './action-types';
import { IHomeActionsBoolean, IHomeActionsString } from '../types/types';

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
    case HomeActions.DISPLAY_MODAL:
      return { ...state, modalActive: action.payload };

    case HomeActions.CHANGE_AVATAR:
      return { ...state, imageAvatar: action.payload };

    default:
      return state;
  }
};

export const displayModal = (payload: boolean): IHomeActionsBoolean => ({
  type: HomeActions.DISPLAY_MODAL,
  payload,
});

export const changeAvatar = (payload: string): IHomeActionsString => ({
  type: HomeActions.CHANGE_AVATAR,
  payload,
});
