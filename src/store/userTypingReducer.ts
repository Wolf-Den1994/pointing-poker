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

interface IUserTypingActionString {
  type: UserTypingActions;
  payload: string;
}

interface IUserTypingActionBoolean {
  type: UserTypingActions;
  payload: boolean;
}

interface IUserTypingActionClear {
  type: UserTypingActions;
}

export const setShowWriter = (payload: boolean): IUserTypingActionBoolean => ({
  type: UserTypingActions.SET_SHOW_WRITER,
  payload,
});

export const setWriter = (payload: string): IUserTypingActionString => ({
  type: UserTypingActions.SET_WRITER,
  payload,
});

export const writeMessage = (payload: string): IUserTypingActionString => ({
  type: UserTypingActions.WRITE_MESSAGE,
  payload,
});

export const setUserName = (payload: string): IUserTypingActionString => ({
  type: UserTypingActions.SET_USER_NAME,
  payload,
});

export const clearUserTypingData = (): IUserTypingActionClear => ({
  type: UserTypingActions.CLEAR_USER_TYPING_DATA,
});
