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
export const setFolders = (folders) => {
	return {type: A.SET_FOLDERS, folders}
}
const addUpload = (upload) => {
	return {type: A.ADD_UPLOAD, upload}
}
const editUpload = (id, progress, completed = false) => {
	return {type: A.EDIT_UPLOAD, progress, completed}
}
const cancelUpload = (id) => {
	return {type: A.CANCE_UPLOAD, id}
}

export const setAllDriveItems = (parent = '/', search = '', folderSearch = false) => {
	return (dispatch) => {
		const fileURL = `/api/drive/file/list?parent=${parent}`
		const folderURL = `/api/drive/folder/list?parent=${parent}`
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
		apiCall('patch', '/api/drive/file/rename', data)
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
		apiCall('delete', `/api/drive/file/${id}`)
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
			const url = '/api/drive/file/upload'

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
