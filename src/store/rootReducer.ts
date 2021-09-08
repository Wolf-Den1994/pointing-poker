import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { lobbyReducer } from './lobbyReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
