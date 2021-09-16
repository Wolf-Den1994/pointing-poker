/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../types/types';

interface IRoomData {
  data: {
    id: string;
  };
}

class ApiHeroku {
  getResourse = async (roomId: string): Promise<AxiosResponse<any>> => {
    const response = await axios.get(`${BASE_URL}/api/${roomId}`);
    return response;
  };

  deleteRoom = async (room: IRoomData): Promise<void> => {
    axios.delete(`${BASE_URL}/api/`, room);
  };
}

const api = new ApiHeroku();

export default api;
