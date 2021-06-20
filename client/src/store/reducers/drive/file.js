import A from '../../actionTypes'

const defaultState = []

const fileReducer = (state = defaultState, action) => {
	switch (action.type) {
		case A.SET_FILES:
			return action.files
		case A.ADD_FILE:
			return [...state, action.file]
		case A.EDIT_FILE: {
			const newFiles = state.map((file) => {
				if (file._id == action.id) {
					return {...file, ...action.file}
				} else {
					return file
				}
			})
			return newFiles
		}
		case A.DELETE_FILE: {
			const newFileList = state.filter((file) => file._id !== action.id)

			return newFileList
		}
		default:
			return state
	}
}
export default fileReducer
