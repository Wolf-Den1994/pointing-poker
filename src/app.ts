import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './API/router';
import {
  getRoom,
  setRoom,
  updateRoom,
  addNewUser,
  deleteUser,
  clearVotingObj,
  deleteRoom,
} from './API/mongoDB';
import { room } from './utils/constants';
import { deleteUserFromRoom } from './utils/services';
import {
  ChangeIssueModes,
  GameRoom,
  Room,
  SocketTokens,
} from './types/types';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use('/api', router);

io.on('connection', (socket) => {
  socket.on(SocketTokens.CreateRoom, async ({ data }) => {
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
    socket.emit(SocketTokens.ReturnRoomId, { id: roomId, user });
  });

  socket.on(SocketTokens.EnterRoom, ({ user, roomId }) => {
    socket.join(roomId);
    addNewUser(roomId, user);
    socket.broadcast.to(roomId).emit(SocketTokens.EnteredRoom, { user });
  });

  socket.on(SocketTokens.RequestForEntering, ({ userId, adminId }) => {
    socket.broadcast.to(adminId).emit(SocketTokens.AdminsAnswerForRequest, { userId });
  });

  socket.on(SocketTokens.ResponseForEnteringRequest, ({ id, response }) => {
    socket.to(id).emit(SocketTokens.AdminsResponse, { response });
  });

  socket.on(SocketTokens.RedirectAllToGamePage, async ({ roomId, settings, timer }) => {
    const response = await getRoom(roomId);
    response.settings = settings;
    response.gameRoom = GameRoom.GameDenied;
    await updateRoom(response);
    socket.broadcast.to(roomId).emit(SocketTokens.RedirectUserToGamePage, { settings, timer });
  });

  socket.on(SocketTokens.GetMessage, async ({ roomId, user, mess }) => {
    const searchingRoom = await getRoom(roomId);
    searchingRoom.messages.push({ name: user, message: mess });
    await updateRoom(searchingRoom);
    socket.broadcast.to(roomId).emit(SocketTokens.SendMessage, { name: user, message: mess });
  });

  socket.on(SocketTokens.SomeOneWriteMessage, ({ user, write, roomId }) => {
    socket.broadcast.to(roomId).emit(SocketTokens.SendMessageWriter, { name: user, active: write });
  });

  socket.on(SocketTokens.ChangeIssuesList, async ({
    newIssue,
    mode,
    roomId,
    oldIssue = '',
  }) => {
    const response = await getRoom(roomId);
    if (mode === ChangeIssueModes.ADD) {
      response.issues.push(newIssue);
    } else if (mode === ChangeIssueModes.ALL) {
      response.issues = newIssue;
    } else {
      const index = response.issues.findIndex((el) => el.taskName === oldIssue);
      response.issues[index].taskName = newIssue;
    }
    updateRoom(response);
    socket.broadcast.to(roomId).emit(SocketTokens.GetIssuesList, { issues: response.issues });
  });

  socket.on(SocketTokens.SendNewSettingsToUsers, async ({ roomId, settings, time }) => {
    const response = await getRoom(roomId);
    if (settings.autoAdmitMembers) {
      response.gameRoom = GameRoom.GameAllow;
    } else {
      response.gameRoom = GameRoom.GameDenied;
    }
    response.settings = settings;
    await updateRoom(response);
    socket.broadcast.in(roomId).emit(SocketTokens.GetNewSettingsFromAdmin, { settings, time });
  });

  socket.on(SocketTokens.SetTimeOnTimer, ({ time, roomId }) => {
    io.in(roomId).emit(SocketTokens.SendTimeOnTimer, time);
  });

  socket.on(SocketTokens.DeleteUserWithVoting, async ({ userId, userName, roomId }) => {
    const response = await getRoom(roomId);
    const usersAmountWithAdmin = 4;
    if (response.users.length <= usersAmountWithAdmin) {
      socket.emit(SocketTokens.CancelVoting);
      return;
    }
    const votingData = response.voting;
    votingData.id = userId;
    votingData.voices++;
    votingData.votedUsers++;
    socket.broadcast.to(roomId).emit(SocketTokens.ShowCandidateToBeDeleted, { name: userName });
    updateRoom(response);
  });

  socket.on(SocketTokens.ToVoteFor, async ({ voice, user, roomId }) => {
    const response = await getRoom(roomId);
    const usersArray = response.users;
    const votingObj = response.voting;
    const usersAmount = usersArray.length - 1; // minus admin;
    if (voice === 'for') {
      votingObj.voices++;
    }
    votingObj.votedUsers++;
    if (usersAmount !== votingObj.votedUsers) {
      updateRoom(response);
      return;
    }

    if (votingObj.voices > votingObj.votedUsers / 2) {
      io.sockets.sockets.forEach((el) => {
        if (el.id === votingObj.id) {
          const resultUsersArray = usersArray.filter((elem) => elem.id !== el.id);
          clearVotingObj(roomId, el.id);
          deleteUserFromRoom(el, roomId, user, resultUsersArray);
        }
      });
    } else {
      clearVotingObj(roomId);
    }
  });

  socket.on(SocketTokens.LeaveRoom, async ({ roomId, user, id }) => {
    await deleteUser(roomId, id);
    const response = await getRoom(roomId);
    deleteUserFromRoom(socket, roomId, user, response.users);
  });

  socket.on(SocketTokens.DisconnectAll, async ({ roomId }) => {
    io.in(roomId).emit(SocketTokens.DisconnectAllSockets);
    io.in(roomId).disconnectSockets();
  });

  socket.on(SocketTokens.DisconnectOne, async ({ userId, roomId }) => {
    await deleteUser(roomId, userId);
    const response = await getRoom(roomId);
    io.sockets.sockets.forEach((el) => {
      if (el.id === userId) {
        deleteUserFromRoom(el, roomId, userId, response.users);
      }
    });
  });

  socket.on(SocketTokens.Disconnecting, () => {
    const userData = Array.from(socket.rooms);
    if (userData.length <= 1) return;
    const allRoomsId = [...userData];
    allRoomsId.shift();
    allRoomsId.forEach(async (el) => {
      await deleteUser(el, userData[0]);
      const response = await getRoom(el);
      if (response === null) return;
      if (response.admin.id === userData[0]) {
        io.in(el).emit(SocketTokens.DisconnectAllSockets);
        io.in(el).disconnectSockets();
        await deleteRoom(el);
      } else {
        deleteUserFromRoom(socket, el, userData[0], response.users);
      }
    });
  });

  socket.on(SocketTokens.Disconnect, async () => {
    console.log(`${socket.id} disconnected`);
  });

  console.log('socket connected', socket.id);
});

const start = async () => {
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
};

start();
