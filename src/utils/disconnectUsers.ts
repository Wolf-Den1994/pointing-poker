import { deleteRoom } from '../services/api';
import { emit } from '../services/socket';
import { SocketTokens } from '../types/types';
import socket from './soketIO';

export const disconnectUsers = async (roomId: string, isDealer: boolean, userName?: string): Promise<void> => {
  if (isDealer) {
    emit(SocketTokens.DisconnectAll, { roomId });
    await deleteRoom({ data: { id: roomId } });
  } else {
    emit(SocketTokens.LeaveRoom, { roomId, user: userName, id: socket.id });
  }
};
