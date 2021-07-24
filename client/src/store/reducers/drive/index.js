import selectedItemReducer from './selectedItem'
import uploadReducer from './upload'

const {combineReducers} = require('redux')
const {default: fileReducer} = require('./file')
const {default: folderReducer} = require('./folder')
const {default: parentReducer} = require('./parent')

const driveReducer = combineReducers({
	files: fileReducer,
	folders: folderReducer,
	parent: parentReducer,
	upload: uploadReducer,
	selectedItem: selectedItemReducer,
})

export default driveReducer
