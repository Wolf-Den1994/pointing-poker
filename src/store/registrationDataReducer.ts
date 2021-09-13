import { AnyAction } from 'redux';
import { RegistrationDataActions } from './actionTypes';
import { IMember } from '../types/types';

interface IInitialStateRegistrationData {
  user: IMember;
}

const initialState: IInitialStateRegistrationData = {
  user: { id: '', name: '', lastName: '', position: '', role: 'player', avatarUrl: '' },
};

export const registrationDataReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case RegistrationDataActions.SET_DATA:
      return { ...state, user: action.payload };

    case RegistrationDataActions.SET_ID:
      return { ...state, user: { ...state.user, id: action.payload } };

    case RegistrationDataActions.SET_NAME:
      return { ...state, user: { ...state.user, name: action.payload } };

    case RegistrationDataActions.SET_LASTNAME:
      return { ...state, user: { ...state.user, lastName: action.payload } };

    case RegistrationDataActions.SET_JOB_STATUS:
      return { ...state, user: { ...state.user, position: action.payload } };

    case RegistrationDataActions.SET_ROLE:
      return { ...state, user: { ...state.user, role: action.payload } };

    case RegistrationDataActions.SET_AVATAR:
      return { ...state, user: { ...state.user, avatarUrl: action.payload } };

    default:
      return state;
  }
};

export const setData = (payload: IMember): any => ({
  type: RegistrationDataActions.SET_DATA,
  payload,
});

export const setId = (payload: string): any => ({
  type: RegistrationDataActions.SET_ID,
  payload,
});

export const setName = (payload: string): any => ({
  type: RegistrationDataActions.SET_NAME,
  payload,
});

export const setLastName = (payload: string): any => ({
  type: RegistrationDataActions.SET_LASTNAME,
  payload,
});

export const setJobStatus = (payload: string): any => ({
  type: RegistrationDataActions.SET_JOB_STATUS,
  payload,
});

export const setRole = (payload: string): any => ({
  type: RegistrationDataActions.SET_ROLE,
  payload,
});

export const setAvatar = (payload: string): any => ({
  type: RegistrationDataActions.SET_AVATAR,
  payload,
});
