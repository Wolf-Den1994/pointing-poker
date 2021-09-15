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
  admin: { id: '', name: '', lastName: '', position: '', role: 'admin', avatarUrl: '' },
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

interface IRoomDataActionString {
  type: RoomDataActions;
  payload: string;
}

interface IRoomDataActionIMessage {
  type: RoomDataActions;
  payload: IMessage;
}

interface IRoomDataActionIMember {
  type: RoomDataActions;
  payload: IMember;
}

interface IRoomDataActionIMemberArray {
  type: RoomDataActions;
  payload: IMember[];
}

interface IRoomDataActionClear {
  type: RoomDataActions;
}

export const addUsers = (payload: IMember[]): IRoomDataActionIMemberArray => ({
  type: RoomDataActions.ADD_USERS,
  payload,
});

export const getAllMessages = (payload: IMember): IRoomDataActionIMember => ({
  type: RoomDataActions.GET_ALL_MESSAGES,
  payload,
});

export const addMessage = (payload: IMessage): IRoomDataActionIMessage => ({
  type: RoomDataActions.ADD_MESSAGE,
  payload,
});

export const setRoomId = (payload: string): IRoomDataActionString => ({
  type: RoomDataActions.SET_ROOM_ID,
  payload,
});

export const addAdmin = (payload: IMember): IRoomDataActionIMember => ({
  type: RoomDataActions.ADD_ADMIN,
  payload,
});

export const clearRoomData = (): IRoomDataActionClear => ({
  type: RoomDataActions.CLEAR_ROOM_DATA,
});
