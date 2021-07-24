export const getDriveData = (state) => {
	return state.drive
}
export const getFiles = (state) => {
	return state.drive.files
}
export const getFolder = (state) => {
	return state.drive.folders
}

export const getParent = (state) => {
	return state.drive.parent.parent
}
export const getParentList = (state) => {
	return state.drive.parent.parentList
}
export const getParentNameList = (state) => {
	return state.drive.parent.parentNameList
}

export const getLastSelectedTime = (state) => {
	return state.drive.selectedItem.lastSelected
}
export const getSelectedItem = (state) => {
	return state.drive.selectedItem
}
export const getFolderName = (state) => {
	return state.drive.folders.last?.name
}
