import mongoose from 'mongoose';

const { Schema } = mongoose;

export const RoomModel = new Schema({
  roomId: { type: String },
  admin: {
    id: String,
    name: String,
    lastName: String,
    position: String,
    role: String,
    avatarUrl: String,
  },
  users: [
    {
      id: String,
      name: String,
      lastName: String,
      position: String,
      role: String,
      avatarUrl: String,
    },
  ],
  messages: [{ name: String, message: String }],
  issues: [String],
  voting: {
    id: String,
    voices: Number,
    votedUsers: Number,
  },
});
