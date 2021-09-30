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
  ValidateFirstName = 'The input is not valid First name is short. Minimum 3 characters and no additional characters!',
  RequiredFirstName = 'Please, input your First name!',
  RequiredMinLengthFirstName = 'Please, input your First name! Minimum 3 characters',
  KickUserWithVoiting = 'You need to use another way to leave room',
  RoomDoesNotExist = 'Such room doesnt exist, try again!',
  SomethingGoingWrong = 'Something is going wrong, try again!',
  EnteredRoom = 'entered room',
  LeaveRoom = 'is leave the room',
  UserDisconnected = 'user disconnected',
  RequiredCustomizeCard = 'Customize card is required!',
  RequiredScoreType = 'Score type is required!',
  CancelVoting = 'There are not enough users for voting',
  AdminAllow = 'Admin allows to enter the room',
  AdminNotAllow = 'Admin doesn`t allow to enter the room',
  CancelEnterTheRoom = 'You need to wait for the admin`s decision to re-try to enter the room!',
  GoBack = 'Go back and try a different link.',
  PageNotFound = 'page not found',
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

export enum VotingVoit {
  Against = 'against',
  For = 'for',
}

export enum PathRoutes {
  Home = '/',
  Lobby = '/lobby',
  Game = '/game',
  Result = '/result',
}

export enum GameRooms {
  Lobby = 'lobby',
  GameLocked = 'gameLocked',
  GameAllow = 'gameAllow',
}

export enum IssuesListMode {
  Add = 'add',
  Change = 'change',
  All = 'all',
  Delete = 'delete',
}

export enum IssueStatus {
  Create = 'New Issue',
  Edit = 'Edit Issue',
}

export enum OptionSettings {
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
  CancelVoting = 'cancelVoting',
  DisconnectAllSockets = 'disconnectAllSockets',
  RedirectUserToGamePage = 'redirectUserToGamePage',
  AdminsResponse = 'adminsResponse',
  RequestForEntering = 'requestForEntering',
  RedirectAllToGamePage = 'redirectAllToGamePage',
  AdminsAnswerForRequest = 'adminsAnswerForRequest',
  GetNewSettingsFromAdmin = 'getNewSettingsFromAdmin',
  SendNewSettingsToUsers = 'sendNewSettingsToUsers',
  ResponseForEnteringRequest = 'responseForEnteringRequest',
  SendActiveIssueToUser = 'sendActiveIssueToUser',
  RedirectToResultPage = 'redirectToResultPage',
  GetActiveIssue = 'getActiveIssue',
  RedirectAllToResultPage = 'redirectAllToResultPage',
  GetNewIssueGrade = 'getNewIssueGrade',
  EditIssueGrade = 'editIssueGrade',
  OnProgress = 'onProgress',
  OffProgress = 'offProgress',
  DisableCards = 'disableCards',
  EnableCards = 'enableCards',
  ShowStatistics = 'showStatistics',
  HideStatistics = 'hideStatistics',
}

export enum LayoutViews {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export enum KeyboardKeys {
  Enter = 'Enter',
}

export enum LocalUserData {
  FirstName = 'firstName',
  LastName = 'lastName',
  JobStatus = 'jobStatus',
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

export interface IGameSettingsData {
  isDealerActive: boolean;
  voteAfterRoundEnd: boolean;
  autoFlipCards: boolean;
  autoAdmitMembers: boolean;
  showTimer: boolean;
  scoreType: string;
  roundTime: number;
}

export interface IIssueData {
  taskName: string;
  grades: {
    name: string;
    grade: string | null;
  }[];
  isActive: boolean;
}

export interface IInitialStateIssues {
  issueList: IIssueData[];
}

export interface IRoomDataApi {
  data: {
    id: string;
  };
}

export interface IRoomData {
  roomId: string;
  gameRoom: string;
  admin: IMember;
  users: IMember[];
  messages: IMessage[];
  issues: IIssueData[];
  voting: { id: string; voices: number; votedUsers: number };
  settings: IGameSettingsData;
  cardSet: ICardData[];
  statistics: IStatisticData[];
}

export interface ICardData {
  card: string;
  isActive: boolean;
}

export interface IStatisticData {
  taskName: string;
  statisticValues: {
    card: string;
    averageValue: string;
  }[];
}

export interface SavedIssuesList {
  issue?: string;
  card?: string;
  averageValue?: string;
}

export interface IStatisticValues {
  card: string;
  averageValue: string;
}

export interface IGradesObject {
  [grade: string]: number;
}

export const cardSets = {
  arrayFibonacci: [
    { card: 'pass', isActive: false },
    { card: '0', isActive: false },
    { card: '1', isActive: false },
    { card: '2', isActive: false },
    { card: '3', isActive: false },
    { card: '5', isActive: false },
    { card: '8', isActive: false },
    { card: '13', isActive: false },
    { card: '21', isActive: false },
    { card: '34', isActive: false },
    { card: '55', isActive: false },
    { card: '89', isActive: false },
  ],
  arrayModifiedFibonacci: [
    { card: 'pass', isActive: false },
    { card: '0', isActive: false },
    { card: '0.5', isActive: false },
    { card: '1', isActive: false },
    { card: '2', isActive: false },
    { card: '3', isActive: false },
    { card: '5', isActive: false },
    { card: '8', isActive: false },
    { card: '13', isActive: false },
    { card: '20', isActive: false },
    { card: '40', isActive: false },
    { card: '100', isActive: false },
  ],
  arrayPowerOfTwo: [
    { card: 'pass', isActive: false },
    { card: '0', isActive: false },
    { card: '1', isActive: false },
    { card: '2', isActive: false },
    { card: '4', isActive: false },
    { card: '8', isActive: false },
    { card: '16', isActive: false },
    { card: '32', isActive: false },
    { card: '64', isActive: false },
  ],
  arrayCustomYour: [{ card: 'pass', isActive: false }],
};
