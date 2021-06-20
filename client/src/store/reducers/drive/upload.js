import A from '../../actionTypes'

const uploadReducer = (state = [], action) => {
	switch (action.type) {
		case A.ADD_UPLOAD: {
			return [...state, action.upload]
		}
		case A.EDIT_UPLOAD: {
			const currentUploadStatus = state.map((u) => {
				if (u.id === action.id) {
					u.progress = action.progress
					u.completed = action.completed
				}
				return u
			})
			return currentUploadStatus
		}
		case A.CANCE_UPLOAD: {
			const currentUploadStatus = state.map((upload) => {
				if (upload.id == action.id) {
					upload.canceled = true
				}
				return upload
			})
			return currentUploadStatus
		}
		default:
			return state
	}
}
export default uploadReducer
