export enum LobbyActions {
  CHANGE_USERDATA = 'CHANGE_USER',
  ADD_USERS = 'ADD_USERS',
  KICK_USER = 'KICK_USER',
  CHANGE_LINK = 'CHANGE_LINK',
  IS_DEALER = 'IS_DEALER',
}

export enum HomeActions {
  CHANGE_MODAL_ACTIVE = 'CHANGE_MODAL_ACTIVE',
  CHANGE_AVATAR = 'CHANGE_AVATAR',
}

export enum IssueActions {
  ADD_ISSUE = 'ADD_ISSUE',
  REMOVE_ISSUE = 'REMOVE_ISSUE',
  EDIT_ISSUE = 'EDIT_ISSUE',
  CHANGE_ISSUES = 'CHANGE_ISSUES',
}

export enum SettingsActions {
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
  ADD_CARD = 'ADD_CARD',
  REMOVE_CARD = 'REMOVE_CARD',
  EDIT_CARD = 'EDIT_CARD',
}

export enum RegistrationDataActions {
  SET_DATA = 'SET_DATA',
  SET_ID = 'SET_ID',
  SET_NAME = 'SET_NAME',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_JOB_STATUS = 'SET_JOB_STATUS',
  SET_ROLE = 'SET_ROLE',
  SET_AVATAR = 'SET_AVATAR',
}

export enum RoomDataActions {
  ADD_USERS = 'ADD_USERS',
  LEAVE_USER = 'LEAVE_USER',
  GET_ALL_MESSAGES = 'GET_ALL_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_ROOM_ID = 'SET_ROOM_ID',
  ADD_ADMIN = 'ADD_ADMIN',
  CLEAR_ROOM_DATA = 'CLEAR_ROOM_DATA',
}

export enum UserTypingActions {
  SET_SHOW_WRITER = 'SET_SHOW_WRITER',
  SET_WRITER = 'SET_WRITER',
  WRITE_MESSAGE = 'WRITE_MESSAGE',
  SET_USER_NAME = 'SET_USER_NAME',
  CLEAR_USER_TYPING_DATA = 'CLEAR_USER_TYPING_DATA',
}

export enum TimerActions {
  START_TIME = 'START_TIME',
  RESET_TIME = 'RESET_TIME',
}
