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
import { deleteUserFromRoom, errorHandler } from './utils/services';
import {
  ChangeIssueModes,
  GameRoom,
  Room,
  SocketTokens,
} from './types/types';
import 'dotenv-defaults/config';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
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
    try {
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
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.EnterRoom, async ({ user, roomId }) => {
    try {
      socket.join(roomId);
      await addNewUser(roomId, user);
      socket.broadcast.to(roomId).emit(SocketTokens.EnteredRoom, { user });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.RequestForEntering, ({ userId, adminId }) => {
    socket.broadcast.to(adminId).emit(SocketTokens.AdminsAnswerForRequest, { userId });
  });

  socket.on(SocketTokens.ResponseForEnteringRequest, ({ id, response }) => {
    socket.to(id).emit(SocketTokens.AdminsResponse, { response });
  });

  socket.on(SocketTokens.RedirectAllToGamePage, async ({
    roomId,
    settings,
    cardSet,
    timer,
  }) => {
    try {
      const response = await getRoom(roomId);
      response.settings = settings;
      response.cardSet = cardSet;
      response.gameRoom = GameRoom.GameLocked;
      await updateRoom(response);
      socket.broadcast.to(roomId).emit(SocketTokens.RedirectUserToGamePage, { settings, cardSet, timer });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.RedirectAllToResultPage, ({ roomId }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.RedirectToResultPage);
  });

  socket.on(SocketTokens.GetMessage, async ({ roomId, user, mess }) => {
    try {
      const searchingRoom = await getRoom(roomId);
      searchingRoom.messages.push({ name: user, message: mess });
      await updateRoom(searchingRoom);
      socket.broadcast.to(roomId).emit(SocketTokens.SendMessage, { name: user, message: mess });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
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
    try {
      const response = await getRoom(roomId);
      switch (mode) {
        case ChangeIssueModes.ADD:
          response.issues.push(newIssue);
          break;

        case ChangeIssueModes.ALL: {
          response.issues = newIssue;
          break;
        }

        case ChangeIssueModes.DELETE: {
          const index = response.issues.findIndex((el) => el.taskName === newIssue);
          response.issues.splice(index, 1);
          break;
        }

        case ChangeIssueModes.CHANGE: {
          const index = response.issues.findIndex((el) => el.taskName === oldIssue);
          response.issues[index].taskName = newIssue;
          break;
        }

        default:
          response.issues = newIssue;
      }
      await updateRoom(response);
      socket.broadcast.to(roomId).emit(SocketTokens.GetIssuesList, { issues: response.issues });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.EditIssueGrade, ({ roomId, userData }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.GetNewIssueGrade, { userData });
  });

  socket.on(SocketTokens.ClearIssueGrade, ({ roomId, taskName }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.ClearIssueGrade, { taskName });
  });

  socket.on(SocketTokens.OnProgress, ({ roomId, progress }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.OnProgress, progress);
  });

  socket.on(SocketTokens.SetIssueGrades, async ({
    roomId, taskName, grades, statistics,
  }) => {
    try {
      const response = await getRoom(roomId);
      response.issues.forEach((el) => {
        if (el.taskName === taskName) el.grades = grades;
      });
      const findStatisticIndex = response.statistics.findIndex((el) => el.taskName === taskName);
      if (findStatisticIndex >= 0) {
        response.statistics[findStatisticIndex] = statistics;
      } else {
        response.statistics.push(statistics);
      }
      await updateRoom(response);
      socket.broadcast.in(roomId).emit(SocketTokens.ChangeIssueGrades, { statistics });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.OffProgress, async ({ roomId }) => {
    io.in(roomId).emit(SocketTokens.OffProgress);
  });

  socket.on(SocketTokens.EnableCards, ({ roomId, enableCards }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.EnableCards, enableCards);
  });

  socket.on(SocketTokens.DisableCards, ({ roomId, enableCards }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.DisableCards, enableCards);
  });

  socket.on(SocketTokens.ShowStatistics, ({ roomId, showStatistics }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.ShowStatistics, showStatistics);
  });

  socket.on(SocketTokens.HideStatistics, ({ roomId, showStatistics }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.HideStatistics, showStatistics);
  });

  socket.on(SocketTokens.EditTotalValue, ({ roomId, newTotal, taskName }) => {
    socket.broadcast.in(roomId).emit(SocketTokens.EditTotalValue, { newTotal, taskName });
  });

  socket.on(SocketTokens.SendActiveIssueToUser, async ({ roomId, issueName }) => {
    try {
      const response = await getRoom(roomId);
      response.issues.forEach((el) => {
        el.isActive = false;
        if (el.taskName === issueName) el.isActive = true;
      });
      await updateRoom(response);
      socket.broadcast.to(roomId).emit(SocketTokens.GetActiveIssue, { issueName });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.SendNewSettingsToUsers, async ({
    roomId,
    settings,
    cardSet,
    time,
  }) => {
    try {
      const response = await getRoom(roomId);
      if (settings.autoAdmitMembers) {
        response.gameRoom = GameRoom.GameAllow;
      } else {
        response.gameRoom = GameRoom.GameLocked;
      }
      response.settings = settings;
      response.cardSet = cardSet;
      await updateRoom(response);
      socket.broadcast.in(roomId).emit(SocketTokens.GetNewSettingsFromAdmin, { settings, cardSet, time });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.SetTimeOnTimer, ({ time, roomId }) => {
    io.in(roomId).emit(SocketTokens.SendTimeOnTimer, time);
  });

  socket.on(SocketTokens.DeleteUserWithVoting, async ({ userId, userName, roomId }) => {
    try {
      const response = await getRoom(roomId);
      const usersAmountWithAdmin = 3;
      if (response.users.length <= usersAmountWithAdmin) {
        socket.emit(SocketTokens.CancelVoting);
        return;
      }
      const votingData = response.voting;
      votingData.id = userId;
      votingData.voices++;
      votingData.votedUsers++;
      socket.broadcast.to(roomId).emit(SocketTokens.ShowCandidateToBeDeleted, { name: userName });
      await updateRoom(response);
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.ToVoteFor, async ({ voice, user, roomId }) => {
    try {
      const response = await getRoom(roomId);
      const usersArray = response.users;
      const votingObj = response.voting;
      const usersAmount = usersArray.length - 1; // minus admin;
      if (voice === 'for') {
        votingObj.voices++;
      }
      votingObj.votedUsers++;
      if (usersAmount !== votingObj.votedUsers) {
        await updateRoom(response);
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
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.LeaveRoom, async ({ roomId, user, id }) => {
    try {
      await deleteUser(roomId, id);
      const response = await getRoom(roomId);
      deleteUserFromRoom(socket, roomId, user, response.users);
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.DisconnectAll, async ({ roomId }) => {
    io.in(roomId).emit(SocketTokens.DisconnectAllSockets);
    io.in(roomId).disconnectSockets();
  });

  socket.on(SocketTokens.DisconnectOne, async ({ userId, roomId }) => {
    try {
      await deleteUser(roomId, userId);
      const response = await getRoom(roomId);
      io.sockets.sockets.forEach((el) => {
        if (el.id === userId) {
          deleteUserFromRoom(el, roomId, userId, response.users);
        }
      });
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.Disconnecting, () => {
    try {
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
    } catch (err) {
      errorHandler(socket, err as Error);
    }
  });

  socket.on(SocketTokens.Disconnect, async () => {
    console.log(`${socket.id} disconnected`);
  });

  console.log('socket connected', socket.id);
});

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB__URI || '',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    httpServer.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
