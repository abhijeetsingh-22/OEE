import React, {useEffect, useRef, useState} from 'react'
import axiosNonInterceptor from 'axios'
import {apiCall} from '../../services/api'
import {useDispatch, useSelector} from 'react-redux'
import {setAllDriveItems, startFileUpload} from '../../store/actions/drive'
import {getDriveData} from '../../store/selectors/drive'
import FileList from './FileList'
import ViewDriveContent from './ViewDriveContent'
const http = require('http')
const https = require('https')

function ResourcesDashboard() {
	const [progress, setProgress] = useState(0)
	// const [uploadInput, setUploadInput] = useState({})
	const uploadInput = useRef(null)
	const dispatch = useDispatch()
	const driveData = useSelector(getDriveData)
	useEffect(() => {
		console.log('fetching drive data')
		dispatch(setAllDriveItems())
		return () => {}
	}, [])

	const downloadFile = (fileID, file) => {
		const fileDownloadURL = `http://localhost:3000/api/drive/file/download/${fileID}`
		console.log('downloading file from ', fileDownloadURL)
		const token = localStorage.getItem('authToken')
		console.log(file)
		document.cookie = `authorization=bearer ${token}`
		const link = document.createElement('a')
		document.body.appendChild(link)
		link.href = fileDownloadURL
		link.setAttribute('type', 'hidden')
		link.setAttribute('download', 'hello.jpeg')
		link.click()
		document.body.removeChild(link)
		// document.cookie = 'authorization=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
	}
	const handleUpload = (e) => {
		e.preventDefault()
		console.log('uploading file', e.target.files)
		dispatch(startFileUpload(uploadInput.current, '/', ['/']))
		uploadInput.current.value = ''
	}
	return (
		<div>
			<input ref={uploadInput} type='file' multiple={true} onChange={handleUpload} />
			{/* <button onClick={handleUpload}>Submit</button> */}
			{/* {JSON.stringify(driveData)} */}
			{/* <FileList /> */}
			<ViewDriveContent downloadFile={downloadFile} folderClick={null} fileClick={null} />
		</div>
	)
}

export default ResourcesDashboard
