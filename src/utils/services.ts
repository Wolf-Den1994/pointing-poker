import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { User } from '../types/types';

export const deleteUserFromRoom = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  roomId: string,
  userId: string,
  usersArray: User[],
): void => {
  socket.emit('willBeDisconnected');
  socket.broadcast.in(roomId).emit('userLeaveTheRoom', { user: userId, usersList: usersArray });
  socket.removeAllListeners();
  socket.leave(roomId);
  socket.disconnect(true);
};
