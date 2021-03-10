import {combineReducers} from 'redux';
import currentUserReducer from './currentUser';
import editorReducer from './editor';
import errorReducer from './error';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  error: errorReducer,
  editor: editorReducer,
});

export default rootReducer;
