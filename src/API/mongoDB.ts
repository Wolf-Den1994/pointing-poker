import mongoose from 'mongoose';
import { RoomModel } from '../models/models.js';
import { Room, User } from '../types/types.js';

const RoomMongo = mongoose.model('RoomMongo', RoomModel, 'pp-database');

export const getRoom = async (id: string): Promise<Room> => {
  const response = await RoomMongo.findOne({ roomId: id });
  const result = await response;
  if (!result) return Promise.reject(new Error('Empty'));
  return result;
};

export const updateRoom = async (room: Room): Promise<void> => {
  await RoomMongo.findOneAndUpdate({ roomId: room.roomId }, room);
  return Promise.resolve();
};

export const addNewUser = async (id: string, data: User): Promise<void> => {
  const response = await RoomMongo.findOne({ roomId: id });
  await response.users.push(data);
  await RoomMongo.findOneAndUpdate({ roomId: id }, response);
  return Promise.resolve();
};

export const deleteUser = async (id: string, userId: string): Promise<void> => {
  const response = await RoomMongo.findOne({ roomId: id });
  const newUsersArray = await response.users.filter((el: User) => el.id !== userId);
  response.users = newUsersArray;
  await RoomMongo.findOneAndUpdate({ roomId: id }, response);
  return Promise.resolve();
};

export const deteteRoom = async (id: string): Promise<void> => {
  await RoomMongo.deleteOne({ roomId: id });
  return Promise.resolve();
};

export const setRoom = async (room: Room): Promise<void> => {
  await RoomMongo.create(room);
  return Promise.resolve();
};
