import React, {useEffect, useRef, useState} from 'react'
import axiosNonInterceptor from 'axios'
import {apiCall} from '../../services/api'
import {useDispatch, useSelector} from 'react-redux'
import {
	addParentList,
	resetParentList,
	setAllDriveItems,
	setParent,
	startAddFolder,
	startFileUpload,
	startSetParentList,
	startSetSelectedItem,
} from '../../store/actions/drive'
import {
	getDriveData,
	getFolderName,
	getLastSelectedTime,
	getParent,
	getParentList,
	getParentNameList,
	getSelectedItem,
} from '../../store/selectors/drive'
import FileList from './FileList'
import ViewDriveContent from './ViewDriveContent'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const http = require('http')
const https = require('https')

function ResourcesDashboard() {
	const [progress, setProgress] = useState(0)
	// const [uploadInput, setUploadInput] = useState({})
	const history = useHistory()
	const {folderID} = useParams()
	const location = useLocation()
	const uploadInput = useRef(null)
	const dispatch = useDispatch()
	const driveData = useSelector(getDriveData)
	const parent = useSelector(getParent)
	const parentList = useSelector(getParentList)
	const parentNameList = useSelector(getParentNameList)
	const {lastSelected, id: selectedID} = useSelector(getSelectedItem)
	const folderName = useSelector(getFolderName)
	const [showDropdown, setShowDropdown] = useState(false)
	useEffect(() => {
		console.log('fetching drive data')
		dispatch(setAllDriveItems(folderID))
		if (folderID) dispatch(addParentList(folderID))
		else dispatch(resetParentList())
		dispatch(setParent(folderID || '/'))
		console.log('the key', location)
		console.log('the folderID', folderID)
		return () => {}
	}, [folderID])

	const downloadFile = (fileID, file) => {
		const fileDownloadURL = `http://localhost:3000/api/drive/files/download/${fileID}`
		console.log('downloading file from ', fileDownloadURL)
		const token = localStorage.getItem('authToken')
		console.log(file)
		document.cookie = `authorization=bearer ${token};path=/`
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
		dispatch(startFileUpload(uploadInput.current, parent, parentList))
		uploadInput.current.value = ''
	}
	const createFolder = async (e) => {
		let inputValue = ''

		const {value: folderName} = await Swal.fire({
			title: 'Enter Folder Name',
			input: 'text',
			inputValue: inputValue,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'Please Enter a Name'
				}
			},
		})

		if (folderName === undefined || folderName === null) {
			return
		}

		// const parent = this.props.parent
		// const owner = this.props.auth.id
		// const parentList = this.props.parentList

		dispatch(startAddFolder(folderName, parent, parentList))
		// this.showDropDown()
	}
	const folderClick = (id, folder, bypass = false) => {
		const currentDate = Date.now()
		// const mobile = mobileCheck();
		// const selectedID = this.props.selected

		// const doubleClickMobile = localStorage.getItem('double-click-folders') || false

		if (
			(currentDate - lastSelected < 1500 && selectedID === id) ||
			// (mobile && !doubleClickMobile) ||
			bypass
		) {
			const folderPush = `/drive/folders/${id}`
			history.push(folderPush)
		} else {
			dispatch(startSetSelectedItem(id, false))
		}
	}
	const fileClick = (id, file, bypass = false) => {
		const currentDate = Date.now()
		let selectedFileID = id
		if ((currentDate - lastSelected < 1500 && selectedFileID === id) || bypass) {
			// this.props.dispatch(setPopupFile({showPopup: true, ...file}))
		} else {
			dispatch(startSetSelectedItem(selectedFileID, true))
		}
	}
	const toggleDropdown = () => {
		setShowDropdown((prev) => !prev)
	}
	return (
		<div>
			<h2>{folderName || 'HOME'}</h2>
			<div className='add_item_dropdown_wrapper'>
				<button className='add_item_dropdown_btn ' onClick={toggleDropdown}>
					ADD NEW <FontAwesomeIcon icon='caret-down' />{' '}
				</button>
				<div
					className='add_item_dropdown'
					style={showDropdown ? {display: 'block'} : {display: 'none'}}
				>
					<ul>
						<li>
							<label>
								<span>
									<img src='/assets/img/uploadicon.svg' />
								</span>
								Upload Files
								<input
									ref={uploadInput}
									type='file'
									multiple={true}
									onChange={handleUpload}
									style={{display: 'none'}}
								/>
							</label>
						</li>
						<li>
							<a onClick={createFolder}>
								<span>
									<img src='/assets/img/foldericon.svg' alt='folder' />
								</span>
								Create Folder
							</a>
						</li>
					</ul>
				</div>
			</div>

			<ViewDriveContent
				downloadFile={downloadFile}
				folderClick={folderClick}
				fileClick={fileClick}
				parent={parent}
				parentList={parentList}
				selected={selectedID}
			/>
		</div>
	)
}

export default ResourcesDashboard
