import { Moment } from 'moment';

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
}

export enum IssueStatus {
  Create = 'New Issue',
  Edit = 'Edit Issue',
}

export interface IMember {
  name: string;
  jobStatus: string;
  avatar: string;
}

export interface IGameSettingsData {
  scram: boolean;
  card: boolean;
  timerNeed: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: Moment;
}
