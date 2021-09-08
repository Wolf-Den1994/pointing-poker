import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { lobbyReducer } from './lobbyReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
  home: homeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
