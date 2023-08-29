"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const router_1 = require("./API/router");
const mongoDB_1 = require("./API/mongoDB");
const constants_1 = require("./utils/constants");
const services_1 = require("./utils/services");
const types_1 = require("./types/types");
require("dotenv-defaults/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '5mb' }));
app.use(express_1.default.urlencoded({ limit: '5mb', extended: true }));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use('/api', router_1.router);
io.on('connection', (socket) => {
    socket.on(types_1.SocketTokens.CreateRoom, ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roomId = (0, uuid_1.v4)();
            socket.join(roomId);
            const user = Object.assign(Object.assign({}, data), { id: socket.id, role: 'admin' });
            const newUserRoom = Object.assign(Object.assign({}, constants_1.room), { roomId, admin: data, users: [user] });
            yield (0, mongoDB_1.setRoom)(newUserRoom);
            socket.emit(types_1.SocketTokens.ReturnRoomId, { id: roomId, user });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.EnterRoom, ({ user, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket.join(roomId);
            yield (0, mongoDB_1.addNewUser)(roomId, user);
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.EnteredRoom, { user });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.RequestForEntering, ({ userId, adminId }) => {
        socket.broadcast.to(adminId).emit(types_1.SocketTokens.AdminsAnswerForRequest, { userId });
    });
    socket.on(types_1.SocketTokens.ResponseForEnteringRequest, ({ id, response }) => {
        socket.to(id).emit(types_1.SocketTokens.AdminsResponse, { response });
    });
    socket.on(types_1.SocketTokens.RedirectAllToGamePage, ({ roomId, settings, cardSet, timer, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            response.settings = settings;
            response.cardSet = cardSet;
            response.gameRoom = types_1.GameRoom.GameLocked;
            yield (0, mongoDB_1.updateRoom)(response);
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.RedirectUserToGamePage, { settings, cardSet, timer });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.RedirectAllToResultPage, ({ roomId }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.RedirectToResultPage);
    });
    socket.on(types_1.SocketTokens.GetMessage, ({ roomId, user, mess }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchingRoom = yield (0, mongoDB_1.getRoom)(roomId);
            searchingRoom.messages.push({ name: user, message: mess });
            yield (0, mongoDB_1.updateRoom)(searchingRoom);
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.SendMessage, { name: user, message: mess });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.SomeOneWriteMessage, ({ user, write, roomId }) => {
        socket.broadcast.to(roomId).emit(types_1.SocketTokens.SendMessageWriter, { name: user, active: write });
    });
    socket.on(types_1.SocketTokens.ChangeIssuesList, ({ newIssue, mode, roomId, oldIssue = '', }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            switch (mode) {
                case types_1.ChangeIssueModes.ADD:
                    response.issues.push(newIssue);
                    break;
                case types_1.ChangeIssueModes.ALL: {
                    response.issues = newIssue;
                    break;
                }
                case types_1.ChangeIssueModes.DELETE: {
                    const index = response.issues.findIndex((el) => el.taskName === newIssue);
                    response.issues.splice(index, 1);
                    break;
                }
                case types_1.ChangeIssueModes.CHANGE: {
                    const index = response.issues.findIndex((el) => el.taskName === oldIssue);
                    response.issues[index].taskName = newIssue;
                    break;
                }
                default:
                    response.issues = newIssue;
            }
            yield (0, mongoDB_1.updateRoom)(response);
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.GetIssuesList, { issues: response.issues });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.EditIssueGrade, ({ roomId, userData }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.GetNewIssueGrade, { userData });
    });
    socket.on(types_1.SocketTokens.ClearIssueGrade, ({ roomId, taskName }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.ClearIssueGrade, { taskName });
    });
    socket.on(types_1.SocketTokens.OnProgress, ({ roomId, progress }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.OnProgress, progress);
    });
    socket.on(types_1.SocketTokens.SetIssueGrades, ({ roomId, taskName, grades, statistics, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            response.issues.forEach((el) => {
                if (el.taskName === taskName)
                    el.grades = grades;
            });
            const findStatisticIndex = response.statistics.findIndex((el) => el.taskName === taskName);
            if (findStatisticIndex >= 0) {
                response.statistics[findStatisticIndex] = statistics;
            }
            else {
                response.statistics.push(statistics);
            }
            yield (0, mongoDB_1.updateRoom)(response);
            socket.broadcast.in(roomId).emit(types_1.SocketTokens.ChangeIssueGrades, { statistics });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.OffProgress, ({ roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        io.in(roomId).emit(types_1.SocketTokens.OffProgress);
    }));
    socket.on(types_1.SocketTokens.EnableCards, ({ roomId, enableCards }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.EnableCards, enableCards);
    });
    socket.on(types_1.SocketTokens.DisableCards, ({ roomId, enableCards }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.DisableCards, enableCards);
    });
    socket.on(types_1.SocketTokens.ShowStatistics, ({ roomId, showStatistics }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.ShowStatistics, showStatistics);
    });
    socket.on(types_1.SocketTokens.HideStatistics, ({ roomId, showStatistics }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.HideStatistics, showStatistics);
    });
    socket.on(types_1.SocketTokens.EditTotalValue, ({ roomId, newTotal, taskName }) => {
        socket.broadcast.in(roomId).emit(types_1.SocketTokens.EditTotalValue, { newTotal, taskName });
    });
    socket.on(types_1.SocketTokens.SendActiveIssueToUser, ({ roomId, issueName }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            response.issues.forEach((el) => {
                el.isActive = false;
                if (el.taskName === issueName)
                    el.isActive = true;
            });
            yield (0, mongoDB_1.updateRoom)(response);
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.GetActiveIssue, { issueName });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.SendNewSettingsToUsers, ({ roomId, settings, cardSet, time, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            if (settings.autoAdmitMembers) {
                response.gameRoom = types_1.GameRoom.GameAllow;
            }
            else {
                response.gameRoom = types_1.GameRoom.GameLocked;
            }
            response.settings = settings;
            response.cardSet = cardSet;
            yield (0, mongoDB_1.updateRoom)(response);
            socket.broadcast.in(roomId).emit(types_1.SocketTokens.GetNewSettingsFromAdmin, { settings, cardSet, time });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.SetTimeOnTimer, ({ time, roomId }) => {
        io.in(roomId).emit(types_1.SocketTokens.SendTimeOnTimer, time);
    });
    socket.on(types_1.SocketTokens.DeleteUserWithVoting, ({ userId, userName, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            const usersAmountWithAdmin = 3;
            if (response.users.length <= usersAmountWithAdmin) {
                socket.emit(types_1.SocketTokens.CancelVoting);
                return;
            }
            const votingData = response.voting;
            votingData.id = userId;
            votingData.voices++;
            votingData.votedUsers++;
            socket.broadcast.to(roomId).emit(types_1.SocketTokens.ShowCandidateToBeDeleted, { name: userName });
            yield (0, mongoDB_1.updateRoom)(response);
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.ToVoteFor, ({ voice, user, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            const usersArray = response.users;
            const votingObj = response.voting;
            const usersAmount = usersArray.length - 1; // minus admin;
            if (voice === 'for') {
                votingObj.voices++;
            }
            votingObj.votedUsers++;
            if (usersAmount !== votingObj.votedUsers) {
                yield (0, mongoDB_1.updateRoom)(response);
                return;
            }
            if (votingObj.voices > votingObj.votedUsers / 2) {
                io.sockets.sockets.forEach((el) => {
                    if (el.id === votingObj.id) {
                        const resultUsersArray = usersArray.filter((elem) => elem.id !== el.id);
                        (0, mongoDB_1.clearVotingObj)(roomId, el.id);
                        (0, services_1.deleteUserFromRoom)(el, roomId, user, resultUsersArray);
                    }
                });
            }
            else {
                (0, mongoDB_1.clearVotingObj)(roomId);
            }
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.LeaveRoom, ({ roomId, user, id }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongoDB_1.deleteUser)(roomId, id);
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            (0, services_1.deleteUserFromRoom)(socket, roomId, user, response.users);
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.DisconnectAll, ({ roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        io.in(roomId).emit(types_1.SocketTokens.DisconnectAllSockets);
        io.in(roomId).disconnectSockets();
    }));
    socket.on(types_1.SocketTokens.DisconnectOne, ({ userId, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongoDB_1.deleteUser)(roomId, userId);
            const response = yield (0, mongoDB_1.getRoom)(roomId);
            io.sockets.sockets.forEach((el) => {
                if (el.id === userId) {
                    (0, services_1.deleteUserFromRoom)(el, roomId, userId, response.users);
                }
            });
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    }));
    socket.on(types_1.SocketTokens.Disconnecting, () => {
        try {
            const userData = Array.from(socket.rooms);
            if (userData.length <= 1)
                return;
            const allRoomsId = [...userData];
            allRoomsId.shift();
            allRoomsId.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, mongoDB_1.deleteUser)(el, userData[0]);
                const response = yield (0, mongoDB_1.getRoom)(el);
                if (response === null)
                    return;
                if (response.admin.id === userData[0]) {
                    io.in(el).emit(types_1.SocketTokens.DisconnectAllSockets);
                    io.in(el).disconnectSockets();
                    yield (0, mongoDB_1.deleteRoom)(el);
                }
                else {
                    (0, services_1.deleteUserFromRoom)(socket, el, userData[0], response.users);
                }
            }));
        }
        catch (err) {
            (0, services_1.errorHandler)(socket, err);
        }
    });
    socket.on(types_1.SocketTokens.Disconnect, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`${socket.id} disconnected`);
    }));
    console.log('socket connected', socket.id);
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB__URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        httpServer.listen(PORT, () => console.log(`Server started on ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=index.js.map