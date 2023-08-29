"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.deleteUserFromRoom = void 0;
const types_1 = require("../types/types");
const deleteUserFromRoom = (socket, roomId, userId, usersArray) => {
    socket.emit(types_1.SocketTokens.WillBeDisconnected);
    socket.broadcast.in(roomId).emit(types_1.SocketTokens.UserLeaveTheRoom, { user: userId, usersList: usersArray });
    socket.removeAllListeners();
    socket.leave(roomId);
    socket.disconnect(true);
};
exports.deleteUserFromRoom = deleteUserFromRoom;
const errorHandler = (socket, err) => {
    socket.emit(types_1.SocketTokens.ErrorMessage, { name: err.name, message: err.message });
    console.error(err);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=services.js.map