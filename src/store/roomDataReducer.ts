import { AnyAction } from 'redux';
import { IMember, IMessage } from '../types/types';
import { RoomDataActions } from './actionTypes';

interface IInitialStateRoomData {
  roomId: string;
  admin: IMember;
  users: IMember[];
  messages: IMessage[];
}

const initialState: IInitialStateRoomData = {
  roomId: '',
  admin: { id: '', name: '', jobStatus: '', role: 'admin', avatar: '' },
  users: [],
  messages: [],
};

export const roomDataReducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case RoomDataActions.ADD_USERS: {
      if (!Array.isArray(action.payload)) return { ...state, users: [...state.users, action.payload] };
      return { ...state, users: [...action.payload] };
    }

    case RoomDataActions.GET_ALL_MESSAGES:
      return { ...state, messages: [...action.payload] };

    case RoomDataActions.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case RoomDataActions.SET_ROOM_ID:
      return { ...state, roomId: action.payload };

    case RoomDataActions.ADD_ADMIN:
      return { ...state, admin: { ...action.patload } };

    case RoomDataActions.CLEAR_ROOM_DATA:
      return initialState;

    default:
      return state;
  }
};

export const addUsers = (payload: IMember) => ({
  type: RoomDataActions.ADD_USERS,
  payload,
});

export const getAllMessages = (payload: IMember) => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
  payload,
});

export const addMessage = (payload: IMessage) => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
  payload,
});

export const setRoomId = (payload: string) => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
  payload,
});

export const addAdmin = (payload: IMember) => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
  payload,
});

export const clearRoomData = () => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
});
