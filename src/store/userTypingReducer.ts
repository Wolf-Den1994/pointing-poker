import { AnyAction } from 'redux';
import { UserTypingActions } from './actionTypes';

interface IInitialStateUserTyping {
  userName: string;
  message: string;
  showWriter: boolean;
  writer: string;
}

const initialState: IInitialStateUserTyping = {
  userName: '',
  message: '',
  showWriter: false,
  writer: '',
};

export const userTypingReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case UserTypingActions.SET_SHOW_WRITER:
      return { ...state, showWriter: action.payload };

    case UserTypingActions.SET_WRITER:
      return { ...state, writer: action.payload };

    case UserTypingActions.WRITE_MESSAGE:
      return { ...state, message: action.payload };

    case UserTypingActions.SET_USER_NAME:
      return { ...state, userName: action.payload };

    case UserTypingActions.CLEAR_USER_TYPING_DATA:
      return initialState;

    default:
      return state;
  }
};

export const setShowWriter = (payload: any): any => ({
  type: UserTypingActions.SET_SHOW_WRITER,
  payload,
});

export const setWriter = (payload: any): any => ({
  type: UserTypingActions.SET_WRITER,
  payload,
});

export const writeMessage = (payload: any): any => ({
  type: UserTypingActions.WRITE_MESSAGE,
  payload,
});

export const setUserName = (payload: any): any => ({
  type: UserTypingActions.SET_USER_NAME,
  payload,
});

export const clearUserTypingData = (payload: any): any => ({
  type: UserTypingActions.CLEAR_USER_TYPING_DATA,
  payload,
});
