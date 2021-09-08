import { HomeActions, LobbyActions } from '../store/action-types';

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

export interface IMember {
  name: string;
  jobStatus: string;
  avatar: string;
}

export interface ILobbyActionsBoolean {
  type: LobbyActions;
  payload: boolean;
}

export interface ILobbyActionsString {
  type: LobbyActions;
  payload: string;
}

export interface ILobbyActionsIMember {
  type: LobbyActions;
  payload: IMember;
}

export interface IHomeActionsBoolean {
  type: HomeActions;
  payload: boolean;
}

export interface IHomeActionsString {
  type: HomeActions;
  payload: string;
}
