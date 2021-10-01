import { combineReducers } from 'redux';
import { issuesReducer } from './issuesReducer';
import { settingsReducer } from './settingsReducer';
import { userReducer } from './userReducer';
import { roomDataReducer } from './roomDataReducer';
import { votingReducer } from './votingReducer';
import { userTypingReducer } from './userTypingReducer';
import { timerReducer } from './timerReducer';
import { statisticsReducer } from './statisticsReducer';
import { requestsForEnterReducer } from './requestsForEnterReducer';
import { progressReducer } from './progressReducer';

const rootReducer = combineReducers({
  issues: issuesReducer,
  settings: settingsReducer,
  userData: userReducer,
  roomData: roomDataReducer,
  voting: votingReducer,
  userTyping: userTypingReducer,
  timer: timerReducer,
  statistics: statisticsReducer,
  requests: requestsForEnterReducer,
  progress: progressReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
