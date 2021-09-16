import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './API/router';
import {
  getRoom, setRoom, updateRoom, addNewUser, deleteUser,
} from './API/mongoDB';
import { Room } from './types/types';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB__URI
      || 'mongodb+srv://RSSchool-React:planning-poker@poker.jgasx.mongodb.net/Planning-poker-db?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    httpServer.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();

const room = {
  roomId: '',
  admin: {},
  users: [],
  messages: [],
};

io.on('connection', (socket) => {
  socket.on('createRoom', async ({ data }) => {
    const roomId = uuidv4();
    socket.join(roomId);
    const user = { ...data, id: socket.id, role: 'admin' };
    const newUserRoom = {
      ...room,
      roomId,
      admin: data,
      users: [user],
    };
    await setRoom(newUserRoom as unknown as Room);
    socket.emit('returnRoomId', { id: roomId, user });
  });

  socket.on('enterRoom', ({ user, roomId }) => {
    socket.join(roomId);
    const newUser = { ...user, id: socket.id };
    addNewUser(roomId, newUser);
    socket.broadcast.to(roomId).emit('enteredRoom', { user: newUser });
  });

  socket.on('getMessage', async ({ roomId, user, mess }) => {
    const searchingRoom = await getRoom(roomId);
    searchingRoom.messages.push({ name: user, message: mess });
    await updateRoom(searchingRoom);
    socket.broadcast.to(roomId).emit('sendMessage', { name: user, message: mess });
  });

  socket.on('someOneWriteMessage', ({ user, write, roomId }) => {
    io.to(roomId).emit('sendMessageWriter', { name: user, active: write });
  });

  socket.once('disconnectAll', async ({ roomId }) => {
    io.in(roomId).emit('dissconnectAllSockets');
    io.in(roomId).disconnectSockets();
  });

  socket.on('disconnectOne', async ({ userId, roomId }) => {
    const sockets = await io.in(roomId).fetchSockets();
    sockets.forEach((el) => {
      if (el.id === userId) {
        io.to(roomId).emit('sendUserDisconnected', `${userId} is disconnected`);
        el.emit('willBeDisconnected');
        deleteUser(roomId, el.id);
        el.leave(roomId);
        el.disconnect(true);
      }
    });
  });
  socket.on('setTimeOnTimer', ({ time, roomId }) => {
    io.in(roomId).emit('sendTimeOnTimer', time);
  });

  socket.once('leaveRoom', ({ roomId, user, id }) => {
    deleteUser(roomId, id);
    socket.broadcast.in(roomId).emit('userLeaveTheRoom', { user, userId: id });
    socket.leave(roomId);
    socket.disconnect(true);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  console.log('socket connected', socket.id);
});

app.use('/api', router);