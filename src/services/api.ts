import axios, { AxiosResponse } from 'axios';
import { BASE_URL, IRoomDataApi, IRoomData } from '../types/types';

export const getResourse = async (roomId: string): Promise<AxiosResponse<IRoomData>> => {
  const response = await axios.get(`${BASE_URL}/api/${roomId}`);
  return response;
};

export const deleteRoom = async (room: IRoomDataApi): Promise<void> => {
  axios.delete(`${BASE_URL}/api/`, room);
};
