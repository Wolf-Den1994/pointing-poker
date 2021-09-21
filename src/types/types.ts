export interface Room {
  roomId: string;
  gameRoom: string;
  admin: {
    id: string;
    name: string;
    lastName: string;
    position: string;
    role: string;
    avatarUrl: string;
  };
  users: [
    {
      id: string;
      name: string;
      lastName: string;
      position: string;
      role: string;
      avatarUrl: string;
    },
  ];
  messages: [{ name: string; message: string }];
  issues: [
    {
      taskName: string;
      grades: [
        {
          name: string;
          grade: number | null;
        },
      ];
      isActive: boolean;
    },
  ];
  voting: { id: string; voices: number; votedUsers: number };
  settings: {
    isDealerActive: boolean;
    voteAfterRoundEnd: boolean;
    autoFlipCards: boolean;
    autoAdmitMembers: boolean;
    showTimer: boolean;
    scoreType: string;
    customizeCard: string;
    roundTime: string;
  };
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  position: string;
  role: string;
  avatarUrl: string;
}

export enum ChangeIssueModes {
  ADD = 'add',
  CHANGE = 'change',
  ALL = 'all',
}

export enum GameRoom {
  LOBBY = 'lobby',
  GameDenied = 'gameDenied',
  GameAllow = 'gameDenied',
}

export enum SocketTokens {
  Connection = 'connection',
  CreateRoom = 'createRoom',
  ReturnRoomId = 'returnRoomId',
  EnterRoom = 'enterRoom',
  EnteredRoom = 'enteredRoom',
  RequestForEntering = 'requestForEntering',
  AdminsAnswerForRequest = 'adminsAnswerForRequest',
  ResponseForEnteringRequest = 'responseForEnteringRequest',
  AdminsResponse = 'adminsResponse',
  RedirectAllToGamePage = 'redirectAllToGamePage',
  RedirectUserToGamePage = 'redirectUserToGamePage',
  GetMessage = 'getMessage',
  SendMessage = 'sendMessage',
  SomeOneWriteMessage = 'someOneWriteMessage',
  SendMessageWriter = 'sendMessageWriter',
  ChangeIssuesList = 'changeIssuesList',
  GetIssuesList = 'getIssuesList',
  SendNewSettingsToUsers = 'sendNewSettingsToUsers',
  GetNewSettingsFromAdmin = 'getNewSettingsFromAdmin',
  SetTimeOnTimer = 'setTimeOnTimer',
  SendTimeOnTimer = 'sendTimeOnTimer',
  DeleteUserWithVoting = 'deleteUserWithVoting',
  CancelVoting = 'cancelVoting',
  ShowCandidateToBeDeleted = 'showCandidateToBeDeleted',
  ToVoteFor = 'toVoteFor',
  LeaveRoom = 'leaveRoom',
  DisconnectAll = 'disconnectAll',
  DisconnectAllSockets = 'disconnectAllSockets',
  DisconnectOne = 'disconnectOne',
  Disconnecting = 'disconnecting',
  Disconnect = 'disconnect',
}
