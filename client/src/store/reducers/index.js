import {combineReducers} from 'redux'
import currentUserReducer from './currentUser'
import driveReducer from './drive'
import editorReducer from './editor'
import errorReducer from './error'

const rootReducer = combineReducers({
	currentUser: currentUserReducer,
	error: errorReducer,
	editor: editorReducer,
	drive: driveReducer,
})

export default rootReducer
