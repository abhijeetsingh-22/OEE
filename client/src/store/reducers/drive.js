import A from '../actionTypes'
const defaultState = {
	parentList: ['/'],
	parentNameList: ['Home'],
	parent: '/',
	files: [],
	folders: [],
	upload: [],
}

const driveReducer = (state = defaultState, action) => {
	switch (action.type) {
		case A.SET_FILES:
			return {...state, files: action.files}
		case A.ADD_FILE:
			return {...state, files: [...state.files, action.file]}
		case A.EDIT_FILE: {
			const newFiles = state.files.map((file) => {
				if (file._id == action.id) {
					return {...file, ...action.file}
				} else {
					return file
				}
			})
			return {...state, files: newFiles}
		}
		case A.DELETE_FILE: {
			const newFileList = state.files.filter((file) => file._id !== action.id)

			return {...state, files: newFileList}
		}
		case A.ADD_UPLOAD: {
			return {...state, upload: [...state.upload, action.upload]}
		}
		case A.SET_UPLOAD_STATUS: {
			const currentUploadStatus = state.upload.map((u) => {
				if (u.id === action.id) {
					u.progress = action.progress
					u.completed = action.completed
				}
				return u
			})
			return {...state, upload: currentUploadStatus}
		}
		case A.CANCE_UPLOAD: {
			const currentUploadStatus = state.upload.map((upload) => {
				if (upload.id == action.id) {
					upload.canceled = true
				}
				return upload
			})
			return {...state, upload: currentUploadStatus}
		}
		default:
			return state
	}
}

export default driveReducer
