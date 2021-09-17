import { Moment } from 'moment';

export const BASE_URL = 'https://rsschool-pp.herokuapp.com';

export enum TextForUser {
  AboutDublicate = 'This is duplicate!',
  AboutDublicateInLine = 'There is a duplicate in the line. Check the line!',
  AboutEmpty = 'Empty string or unchanged. Enter a new value!',
  AboutNumber = 'This is not a number. Enter the number!',
  IsTyping = 'is typing a message ...',
  IdCopiedClipboard = 'ID successfully copied to clipboard!',
  DublicateUserName = 'User with the same name already exists. Enter another name!',
  ErrorServer = 'Failed to establish a connection. Contact the system administrator. Error:',
  ValidateFirstName = 'The input is not valid First name!',
  RequiredFirstName = 'Please, input your First name!',
  KickUserWithVoiting = 'You need to use another way to leave room',
  RoomDoesNotExist = 'Such room doesnt exist, try again!',
  SomethingGoingWrong = 'Something is going wrong, try again!',
  EnteredRoom = 'entered room',
  LeaveRoom = 'is leave the room',
  UserDisconnected = 'user disconnected',
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

export enum UserRole {
  Admin = 'admin',
  Player = 'player',
  Observer = 'observer',
}

export enum VoitingVoit {
  Against = 'against',
  For = 'for',
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

export enum KeyboardKeys {
  Enter = 'Enter',
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
