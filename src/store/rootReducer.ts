import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { issuesReducer } from './issuesReducer';
import { lobbyReducer } from './lobbyReducer';
import { cardSetReducer } from './cardSetReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
  issues: issuesReducer,
  cardSet: cardSetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
