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
  issues: {
    taskName: string;
    grades: {
      name: string;
      grade: string | null;
    }[];
    isActive: boolean;
  }[];
  voting: { id: string; voices: number; votedUsers: number };
  settings: {
    isDealerActive: boolean;
    voteAfterRoundEnd: boolean;
    autoFlipCards: boolean;
    autoAdmitMembers: boolean;
    showTimer: boolean;
    scoreType: string;
    customizeCard: string;
    roundTime: number;
  };
  cardSet: {
    card: string;
    isActive: boolean;
  }[];
  progress: { progress: boolean };
  statistics: {
    taskName: string ;
    statisticValues: {
      card: string ;
      averageValue: string ;
    }[],
  }[],
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
  DELETE = 'delete',
}

export enum GameRoom {
  LOBBY = 'lobby',
  GameLocked = 'gameLocked',
  GameAllow = 'gameDenied',
}

export enum SocketTokens {
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
  RedirectAllToResultPage = 'redirectAllToResultPage',
  RedirectToResultPage = 'redirectToResultPage',
  SendActiveIssueToUser = 'sendActiveIssueToUser',
  GetActiveIssue = 'getActiveIssue',
  EditIssueGrade = 'editIssueGrade',
  GetNewIssueGrade = 'getNewIssueGrade',
  OnProgress = 'onProgress',
  OffProgress = 'offProgress',
  WillBeDisconnected = 'willBeDisconnected',
  UserLeaveTheRoom = 'userLeaveTheRoom',
  DisableCards = 'disableCards',
  EnableCards = 'enableCards',
  ShowStatistics = 'showStatistics',
  HideStatistics = 'hideStatistics',
  ClearIssueGrade = 'clearIssueGrade',
}
