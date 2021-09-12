import { Moment } from 'moment';

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
  Lobby = 'lobby',
  Game = 'game',
  Admin = '/admin',
  Chat = `/user`,
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

export interface IMember {
  id: string;
  name: string;
  jobStatus: string;
  role: string;
  avatar: string;
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
