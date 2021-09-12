import { AnyAction } from 'redux';
import { RegistrationDataActions } from './actionTypes';
import { IMember } from '../types/types';

interface IInitialStateRegistrationData {
  user: IMember;
}

const initialState: IInitialStateRegistrationData = {
  user: { id: '', name: '', jobStatus: '', role: 'player', avatar: '' },
};

export const registratinDataReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case RegistrationDataActions.SET_DATA:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

interface IRegistatinDataActionsIMember {
  type: RegistrationDataActions;
  payload: IMember;
}

export const changeUser = (payload: IMember): IRegistatinDataActionsIMember => ({
  type: RegistrationDataActions.SET_DATA,
  payload,
});
