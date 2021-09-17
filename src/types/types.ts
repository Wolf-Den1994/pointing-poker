export interface Room {
  roomId: string,
  gameRoom: string,
  admin: {
    id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
  },
  users: [{
    id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
  }],
  messages: [{ name: string, message: string }],
  issues: [string];
  voting: { id: string; voices: number; votedUsers: number };
}

export interface User {
  id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
}

