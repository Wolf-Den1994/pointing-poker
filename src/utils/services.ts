import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SocketTokens, User } from '../types/types';

export const deleteUserFromRoom = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  roomId: string,
  userId: string,
  usersArray: User[],
): void => {
  socket.emit(SocketTokens.WillBeDisconnected);
  socket.broadcast.in(roomId).emit(SocketTokens.UserLeaveTheRoom, { user: userId, usersList: usersArray });
  socket.removeAllListeners();
  socket.leave(roomId);
  socket.disconnect(true);
};

export const errorHandler = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, err: Error): void => {
  socket.emit(SocketTokens.ErrorMessage, { name: err.name, message: err.message });
  console.log(err);
};
