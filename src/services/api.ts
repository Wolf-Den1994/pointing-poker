import axios, { AxiosResponse } from 'axios';
import { BASE_URL, IMember, IMessage } from '../types/types';

interface IRoomDataApi {
  data: {
    id: string;
  };
}

interface IRoomData {
  roomId: string;
  admin: IMember;
  users: IMember[];
  messages: IMessage[];
  issues: [string];
  voting: { id: string; voices: number; votedUsers: number };
}

export const getResourse = async (roomId: string): Promise<AxiosResponse<IRoomData>> => {
  const response = await axios.get(`${BASE_URL}/api/${roomId}`);
  return response;
};

export const deleteRoom = async (room: IRoomDataApi): Promise<void> => {
  axios.delete(`${BASE_URL}/api/`, room);
};
