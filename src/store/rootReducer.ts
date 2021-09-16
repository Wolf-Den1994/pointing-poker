import { combineReducers } from 'redux';
import { issuesReducer } from './issuesReducer';
import { lobbyReducer } from './lobbyReducer';
import { settingsReducer } from './settingsReducer';
import { userReducer } from './userReducer';
import { roomDataReducer } from './roomDataReducer';
import { votingReducer } from './votingReducer';
import { userTypingReducer } from './userTypingReducer';
import { timerReducer } from './timerReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  issues: issuesReducer,
  settings: settingsReducer,
  userData: userReducer,
  roomData: roomDataReducer,
  voting: votingReducer,
  userTyping: userTypingReducer,
  timer: timerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
