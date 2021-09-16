import { io } from 'socket.io-client';
import { SERVER_URL } from '../types/types';

const socket = io(SERVER_URL);

export default socket;
