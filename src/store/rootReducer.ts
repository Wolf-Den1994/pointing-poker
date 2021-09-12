import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { issuesReducer } from './issuesReducer';
import { lobbyReducer } from './lobbyReducer';
import { settingsReducer } from './settingsReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
  issues: issuesReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
