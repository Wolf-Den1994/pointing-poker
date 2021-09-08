import { combineReducers } from 'redux';
import { lobbyReducer } from './lobbyReducer';

const rootReducer = combineReducers({
  lobby: lobbyReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
