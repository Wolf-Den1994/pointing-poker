import { AnyAction } from 'redux';
import { UserActions } from './actionTypes';
import { IMember } from '../types/types';

interface IInitialStateUser {
  id: string;
  name: string;
  lastName: string;
  position: string;
  role: string;
  avatarUrl: string;
}

const initialState: IInitialStateUser = {
  id: '',
  name: '',
  lastName: '',
  position: '',
  role: 'player',
  avatarUrl: '',
};

export const userReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case UserActions.SET_DATA:
      return { ...action.payload };

    case UserActions.SET_ID:
      return { ...state, id: action.payload };

    case UserActions.SET_NAME:
      return { ...state, name: action.payload };

    case UserActions.SET_LASTNAME:
      return { ...state, lastName: action.payload };

    case UserActions.SET_JOB_STATUS:
      return { ...state, position: action.payload };

    case UserActions.SET_ROLE:
      return { ...state, role: action.payload };

    case UserActions.SET_AVATAR:
      return { ...state, avatarUrl: action.payload };

    default:
      return state;
  }
};

interface IUserActionStrings {
  type: UserActions;
  payload: string;
}

interface IUserActionIMember {
  type: UserActions;
  payload: IMember;
}

export const setData = (payload: IMember): IUserActionIMember => ({
  type: UserActions.SET_DATA,
  payload,
});

export const setId = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_ID,
  payload,
});

export const setName = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_NAME,
  payload,
});

export const setLastName = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_LASTNAME,
  payload,
});

export const setJobStatus = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_JOB_STATUS,
  payload,
});

export const setRole = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_ROLE,
  payload,
});

export const setAvatar = (payload: string): IUserActionStrings => ({
  type: UserActions.SET_AVATAR,
  payload,
});
