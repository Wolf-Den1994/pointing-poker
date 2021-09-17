import mongoose from 'mongoose';
import { RoomModel } from '../models/models';
import { Room, User } from '../types/types';
import { clearVoting } from '../utils/constants';

const RoomMongo = mongoose.model('RoomMongo', RoomModel, 'pp-database');

export const resetDataBase = async (): Promise<void> => {
  await RoomMongo.deleteMany({});
};

export const getRoom = async (id: string): Promise<Room> => {
  const response = await RoomMongo.findOne({ roomId: id });
  const result = await response;
  return result;
};

export const updateRoom = async (room: Room): Promise<void> => {
  await RoomMongo.findOneAndUpdate({ roomId: room.roomId }, room);
  return Promise.resolve();
};

export const clearVotingObj = async (roomId: string, id = ''): Promise<void> => {
  const response = await RoomMongo.findOne({ roomId });
  if (id !== '') {
    const newUsersArray = await response.users.filter((el: User) => el.id !== id);
    response.users = newUsersArray;
  }
  response.voting = clearVoting;
  await RoomMongo.findOneAndUpdate({ roomId: response.roomId }, response);
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

export const deleteRoom = async (id: string): Promise<void> => {
  await RoomMongo.deleteOne({ roomId: id });
  return Promise.resolve();
};

export const setRoom = async (room: Room): Promise<void> => {
  await RoomMongo.create(room);
  return Promise.resolve();
};
