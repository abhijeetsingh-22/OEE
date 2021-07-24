import A from '../../actionTypes'

const folderReducer = (state = [], action) => {
	switch (action.type) {
		case A.SET_FOLDERS:
			return action.folders
		case A.ADD_FOLDER: {
			return [...state, action.folder]
		}
		case A.EDIT_FOLDER: {
			const newFolderList = state.map((folder) => {
				if (folder._id == action.id) {
					return {...folder, ...action.folder}
				}
				return folder
			})
			return newFolderList
		}
		case A.DELETE_FOLDER: {
			const newFolderList = state.filter((folder) => folder._id !== action.id)
			return newFolderList
		}
		default:
			return state
	}
}
export default folderReducer
