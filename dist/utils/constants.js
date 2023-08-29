"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearVoting = exports.room = void 0;
exports.room = {
    roomId: '',
    gameRoom: 'lobby',
    admin: {},
    users: [],
    messages: [],
    issues: [],
    voting: {
        id: '',
        voices: 0,
        votedUsers: 0,
    },
    settings: {
        isDealerActive: false,
        voteAfterRoundEnd: false,
        autoFlipCards: false,
        autoAdmitMembers: false,
        showTimer: false,
        scoreType: 'story point',
        customizeCard: '',
        roundTime: 1,
    },
    cardSet: [],
    progress: { progress: false },
    statistics: [],
};
exports.clearVoting = {
    id: '',
    voices: 0,
    votedUsers: 0,
};
//# sourceMappingURL=constants.js.map