import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { issuesReducer } from './issuesReducer';
import { lobbyReducer } from './lobbyReducer';
import { settingsReducer } from './settingsReducer';
import { registrationDataReducer } from './registrationDataReducer';
import { roomDataReducer } from './roomDataReducer';
import { votingReducer } from './votingReducer';
import { userTypingReducer } from './userTypingReducer';
import { timerReducer } from './timerReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
  issues: issuesReducer,
  settings: settingsReducer,
  registrationData: registrationDataReducer,
  roomData: roomDataReducer,
  voting: votingReducer,
  userTyping: userTypingReducer,
  timer: timerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
