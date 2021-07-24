import {apiCall} from '../../services/api'
import A from '../actionTypes'
import axiosNonInterceptor from 'axios'
import http from 'http'
import https from 'https'
export const addFile = (file) => {
	return {type: A.ADD_FILE, file}
}
export const setFiles = (files) => {
	return {type: A.SET_FILES, files}
}
const editFile = (id, file) => {
	return {type: A.EDIT_FILE, id, file}
}
const deleteFile = (id) => {
	return {type: A.DELETE_FILE, id}
}
export const addFolder = (folder) => {
	return {type: A.ADD_FOLDER, folder}
}
export const setFolders = (folders) => {
	return {type: A.SET_FOLDERS, folders}
}
export const editFolder = (id, folder) => {
	return {type: A.EDIT_FOLDER, id, folder}
}
export const deleteFolder = (id) => {
	return {type: A.DELETE_FOLDER, id}
}
const addUpload = (upload) => {
	return {type: A.ADD_UPLOAD, upload}
}
const editUpload = (id, progress, completed = false) => {
	return {type: A.EDIT_UPLOAD, id, progress, completed}
}
const cancelUpload = (id) => {
	return {type: A.CANCE_UPLOAD, id}
}
export const setSelectedItem = (selectedItem) => {
	return {type: A.SET_SELECTED_ITEM, selectedItem}
}
export const setLastSelectedTime = (lastSelected) => {
	return {type: A.SET_LAST_SELECTED, lastSelected}
}
export const setParent = (parent) => {
	return {type: A.SET_PARENT, parent}
}
export const setParentList = (parentList, parentNameList) => {
	return {type: A.SET_PARENT_LIST, parentList, parentNameList}
}
export const addParentList = (parent) => {
	return {type: A.ADD_PARENT_LIST, parent}
}
export const resetParentList = () => {
	return {type: A.RESET_PARENT_LIST}
}
export const setAllDriveItems = (parent = '/', search = '', folderSearch = false) => {
	return (dispatch) => {
		const fileURL = `/api/drive/files/list?parent=${parent}`
		const folderURL = `/api/drive/folders/list?parent=${parent}`
		dispatch(setFiles([]))
		dispatch(setFolders([]))
		// dispatch(setLoading(true))
		const fetchlist = [apiCall('get', fileURL), apiCall('get', folderURL)]
		Promise.all(fetchlist)
			.then((res) => {
				const fileList = res[0]
				const folderList = res[1]
				dispatch(setFiles(fileList))
				dispatch(setFolders(folderList))

				// dispatch(setQuickFiles(quickItemList))
				// dispatch(setLoading(false))
			})
			.catch((e) => {
				console.log('Fetch all items error', e)
			})
	}
}

export const startFileRename = (id, title) => {
	return (dispatch) => {
		const data = {id, title}
		apiCall('patch', '/api/drive/files/rename', data)
			.then((res) => {
				console.log('rename done updating state', res)
				dispatch(editFile(id, {filename: title}))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

export const startFileDelete = (id) => {
	return (dispatch) => {
		apiCall('delete', `/api/drive/files/${id}`)
			.then((res) => {
				dispatch(deleteFile(id))
			})
			.catch((err) => {
				console.log('file delete failed ', err)
			})
	}
}

export const startFileUpload = (uploadInput, parent, parentList) => {
	return (dispatch, getState) => {
		const prevParent = getState().drive.parent
		for (let i = 0; i < uploadInput.files.length; i++) {
			const currentFile = uploadInput.files[i]
			const currentID = i
			const CancelToken = axiosNonInterceptor.CancelToken
			const source = CancelToken.source()

			const httpAgent = new http.Agent({keepAlive: true})
			const httpsAgent = new https.Agent({keepAlive: true})
			const authToken = localStorage.getItem('authToken')
			const config = {
				headers: {
					httpAgent,
					httpsAgent,
					'Content-Type': 'multipart/form-data',
					'Transfere-Encoding': 'chunked',
				},
				onUploadProgress: (progressEvent) => {
					const currentProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100)

					if (currentProgress !== 100) {
						console.log(currentID, currentProgress)
						dispatch(editUpload(currentID, currentProgress))
					}
				},
				cancelToken: source.token,
			}
			dispatch(
				addUpload({
					id: currentID,
					progress: 0,
					name: currentFile.name,
					completed: false,
					source,
					canceled: false,
					size: currentFile.size,
				})
			)
			const data = new FormData()

			data.append('filename', currentFile.name)
			data.append('parent', parent)
			data.append('parentList', parentList)
			data.append('currentID', currentID)
			data.append('size', currentFile.size)
			data.append('file', currentFile)
			const url = '/api/drive/files/upload'

			apiCall('post', url, data, config)
				.then(function (response) {
					const currentParent = getState().drive.parent
					// This can change by the time the file uploads
					if (prevParent === currentParent) {
						dispatch(addFile(response))
					}

					// dispatch(addQuickFile(response.data))
					dispatch(editUpload(currentID, 100, true))
					// dispatch(resetSelected())
					// dispatch(startSetStorage())

					// cachedResults = {};
				})
				.catch(function (error) {
					console.log(error)
					dispatch(cancelUpload(currentID))
				})
		}
	}
}

export const startAddFolder = (name, parent, parentList) => {
	return (dispatch) => {
		const URL = '/api/drive/folders/upload'
		const data = {name, parent, parentList}
		apiCall('post', URL, data).then((res) => {
			const folder = res
			dispatch(addFolder(folder))
		})
	}
}

export const startFolderRename = (id, title, parent) => {
	return (dispatch) => {
		const data = {id, title}
		const URL = '/api/drive/folders/rename'
		apiCall('patch', URL, data)
			.then((res) => {
				dispatch(editFolder(id, {name: title}))
			})
			.catch((err) => {
				console.log('error renaming', err)
			})
	}
}

export const startFolderDelete = (id, parent, parentList) => {
	return (dispatch) => {
		const data = {id, parentList, parent}
		const URL = '/api/drive/folders/delete'
		apiCall('delete', URL, {data})
			.then((res) => {
				dispatch(deleteFolder(id))
			})
			.catch((err) => {
				console.log('error occured in deleting folder', err)
			})
	}
}

export const startSetSelectedItem = (id, file) => {
	return (dispatch) => {
		const currentDate = Date.now()
		dispatch(setLastSelectedTime(currentDate))
		dispatch(setSelectedItem({id}))
		// axios.get(`/folder-service/info/${id}`).then((results) => {

		// 	const {name, 0: size, createdAt: date, parentName: location, _id: id, drive, personalFolder: personalFile} = results.data;

		// 	dispatch(setSelectedItem({name, size, date, file, location, data: results.data, id, drive, personalFile}))

		// }).catch((err) => {
		// 	console.log(err)
		// })
	}
}

export const startSetParentList = (id) => {
	return (dispatch) => {
		const parentList = ['/', id]
		const parentNameList = ['Home', 'hello']
		dispatch(setParentList(parentList, parentNameList))
	}
}
