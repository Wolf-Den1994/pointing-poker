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
exports.setRoom = exports.deleteRoom = exports.deleteUser = exports.addNewUser = exports.clearVotingObj = exports.updateRoom = exports.getRoom = exports.resetDataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models/models");
const constants_1 = require("../utils/constants");
const RoomMongo = mongoose_1.default.model('RoomMongo', models_1.RoomModel, 'pp-database');
const resetDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield RoomMongo.deleteMany({});
});
exports.resetDataBase = resetDataBase;
const getRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield RoomMongo.findOne({ roomId: id });
    return response;
});
exports.getRoom = getRoom;
const updateRoom = (room) => __awaiter(void 0, void 0, void 0, function* () {
    yield RoomMongo.findOneAndUpdate({ roomId: room.roomId }, room);
    return Promise.resolve();
});
exports.updateRoom = updateRoom;
const clearVotingObj = (roomId, id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield RoomMongo.findOne({ roomId });
    if (id !== '') {
        const newUsersArray = yield response.users.filter((el) => el.id !== id);
        response.users = newUsersArray;
    }
    response.voting = constants_1.clearVoting;
    yield RoomMongo.findOneAndUpdate({ roomId: response.roomId }, response);
    return Promise.resolve();
});
exports.clearVotingObj = clearVotingObj;
const addNewUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield RoomMongo.findOne({ roomId: id });
    yield response.users.push(data);
    yield RoomMongo.findOneAndUpdate({ roomId: id }, response);
    return Promise.resolve();
});
exports.addNewUser = addNewUser;
const deleteUser = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield RoomMongo.findOne({ roomId: id });
    const newUsersArray = yield response.users.filter((el) => el.id !== userId);
    response.users = newUsersArray;
    yield RoomMongo.findOneAndUpdate({ roomId: id }, response);
    return Promise.resolve();
});
exports.deleteUser = deleteUser;
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield RoomMongo.deleteOne({ roomId: id });
    return Promise.resolve();
});
exports.deleteRoom = deleteRoom;
const setRoom = (room) => __awaiter(void 0, void 0, void 0, function* () {
    yield RoomMongo.create(room);
    return Promise.resolve();
});
exports.setRoom = setRoom;
//# sourceMappingURL=mongoDB.js.map