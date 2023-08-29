"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.RoomModel = new Schema({
    roomId: { type: String },
    gameRoom: { type: String },
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
    issues: [
        {
            taskName: { type: String },
            grades: [
                {
                    name: { type: String },
                    grade: { type: Schema.Types.Mixed },
                },
            ],
            isActive: { type: Boolean },
        },
    ],
    voting: {
        id: String,
        voices: Number,
        votedUsers: Number,
    },
    settings: {
        isDealerActive: { type: Boolean },
        voteAfterRoundEnd: { type: Boolean },
        autoFlipCards: { type: Boolean },
        autoAdmitMembers: { type: Boolean },
        showTimer: { type: Boolean },
        scoreType: { type: String },
        customizeCard: { type: String },
        roundTime: { type: Number },
    },
    cardSet: [
        {
            card: { type: String },
            isActive: { type: Boolean },
        },
    ],
    progress: {
        progress: { type: Boolean },
    },
    statistics: [{
            taskName: { type: String },
            statisticValues: [{
                    card: { type: String },
                    averageValue: { type: String },
                }],
        }],
});
//# sourceMappingURL=models.js.map