import { combineReducers } from 'redux';
import flagsReducer from './flagsSlice';

export interface RootState {
  flags: ReturnType<typeof flagsReducer>;
}

const rootReducer = combineReducers<RootState>({
  flags: flagsReducer,
});

export default rootReducer;
