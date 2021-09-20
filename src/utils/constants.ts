export const room = {
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
    roundTime: '2021-09-18T21:02:20.000Z',
  },
};

export const clearVoting = {
  id: '',
  voices: 0,
  votedUsers: 0,
};
