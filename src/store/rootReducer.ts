import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { issuesReducer } from './issuesReducer';
import { lobbyReducer } from './lobbyReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
