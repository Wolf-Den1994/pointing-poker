import { io } from 'socket.io-client';
import { BASE_URL } from '../types/types';

console.warn('BASE_URL', BASE_URL);

const socket = io(BASE_URL, {
  reconnectionDelay: 5000,
  reconnectionDelayMax: 10000,
});

export default socket;
