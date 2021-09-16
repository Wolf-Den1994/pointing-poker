import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../types/types';

interface IRoomData {
  data: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getResourse = async (roomId: string): Promise<AxiosResponse<any>> => {
  const response = await axios.get(`${BASE_URL}/api/${roomId}`);
  return response;
};

export const deleteRoom = async (room: IRoomData): Promise<void> => {
  axios.delete(`${BASE_URL}/api/`, room);
};
