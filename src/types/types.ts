import { Moment } from 'moment';

export const BASE_URL = 'https://rsschool-pp.herokuapp.com';

export enum TextForUser {
  AboutDublicate = 'This is duplicate!',
  AboutDublicateInLine = 'There is a duplicate in the line. Check the line!',
  AboutEmpty = 'Empty string or unchanged. Enter a new value!',
  AboutNumber = 'This is not a number. Enter the number!',
}

export enum Authors {
  Maksim = 'Maksim Malashkou',
  Artsiom = 'Artsiom Murashko',
  Denis = 'Denis Karazan',
  Diana = 'Diana Garbuzova',
  RSS = 'The Rolling Scopes School',
}

export enum AuthorsLink {
  Maksim = 'https://github.com/KalashnikovTV',
  Artsiom = 'https://github.com/Ksarelto',
  Denis = 'https://github.com/Wolf-Den1994',
  Diana = 'https://github.com/lessarea',
  RSS = 'https://rs.school/js/',
}

export enum PathRoutes {
  Home = '/',
  Lobby = '/lobby',
  Game = 'game',
}

export enum IssueStatus {
  Create = 'New Issue',
  Edit = 'Edit Issue',
}

export enum OptionSettings {
  StoryPoint = 'story point',
  Fibonacci = 'fibonacci',
  ModifiedFibonacci = 'modified fibonacci',
  PowerOfTwo = 'power of two',
  CustomYour = 'custom/your',
}

export enum SocketTokens {
  DisconnectAll = 'disconnectAll',
  LeaveRoom = 'leaveRoom',
  SendMessage = 'sendMessage',
  SomeOneWriteMessage = 'someOneWriteMessage',
  GetMessage = 'getMessage',
  ChangeIssuesList = 'changeIssuesList',
  CreateRoom = 'createRoom',
  ReturnRoomId = 'returnRoomId',
  EnterRoom = 'enterRoom',
  SetTimeOnTimer = 'setTimeOnTimer',
  DeleteUserWithVoting = 'deleteUserWithVoting',
  DisconnectOne = 'disconnectOne',
  ToVoteFor = 'toVoteFor',
  EnteredRoom = 'enteredRoom',
  SendMessageWriter = 'sendMessageWriter',
  UserLeaveTheRoom = 'userLeaveTheRoom',
  WillBeDisconnected = 'willBeDisconnected',
  Disconnect = 'disconnect',
  SendUserDisconnected = 'sendUserDisconnected',
  SendTimeOnTimer = 'sendTimeOnTimer',
  GetIssuesList = 'getIssuesList',
  ShowCandidateToBeDeleted = 'showCandidateToBeDeleted',
  DisconnectAllSockets = 'disconnectAllSockets',
}

export interface IMember {
  id: string;
  name: string;
  lastName: string;
  position: string;
  role: string;
  avatarUrl: string;
}

export interface IMessage {
  name: string;
  message: string;
}

export interface IRoomData {
  roomId: string;
  admin: IMember;
  users: IMember[];
  messages: IMessage[];
}

export interface IGameSettingsData {
  isDealerActive: boolean;
  voteAfterRoundEnd: boolean;
  autoFlipCards: boolean;
  autoAdmitMembers: boolean;
  showTimer: boolean;
  scoreType: string;
  customizeCard: string;
  roundTime: Moment;
}
