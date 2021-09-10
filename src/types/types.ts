export interface Room {
  roomId: string,
  admin: {
    id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
  },
  users: [{
    id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
  }],
  messages: [{ name: string, message: string }],
}

export interface User {
  id: string, name: string, lastName: string, position: string, role: string, avatarUrl: string,
}
