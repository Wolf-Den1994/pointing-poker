import { AnyAction } from 'redux';
import { HomeActions } from './action-types';

interface IInitialStateHome {
  imageAvatar: string;
}

const initialState: IInitialStateHome = {
  imageAvatar: '',
};

export const homeReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case HomeActions.CHANGE_AVATAR:
      return { ...state, imageAvatar: action.payload };

    default:
      return state;
  }
};

interface IHomeActionsString {
  type: HomeActions;
  payload: string;
}

export const changeAvatar = (payload: string): IHomeActionsString => ({
  type: HomeActions.CHANGE_AVATAR,
  payload,
});
