import {combineReducers} from 'redux';
import currentUserReducer from './currentUser';
import errorReducer from './error';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  error: errorReducer,
});

export default rootReducer;
