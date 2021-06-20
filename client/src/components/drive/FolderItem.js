import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import {
	startFileDelete,
	startFileRename,
	startFolderDelete,
	startFolderRename,
} from '../../store/actions/drive'
import ContextMenu from './ContextMenu'
const FolderItem = (props) => {
	// const parent=
	const wrapperRef = useRef(null)
	const dispatch = useDispatch()

	// const [thumbnail, setThumbnail] = useState({src: '', class: ''})
	const [contextSelected, setContextSelected] = useState(false)
	// const getThumbnail = async () => {
	// 	const thumbnailID = props.metadata.thumbnailID
	// 	const url = `/api/drive/file/thumbnail/${thumbnailID}`
	// 	const config = {responseType: 'arraybuffer'}
	// 	apiCall('get', url, config).then((res) => {
	// 		const imgFile = new Blob([res])
	// 		const imgURL = URL.createObjectURL(imgFile)
	// 		console.log(imgFile, imgURL)
	// 		setThumbnail({src: imgURL, class: 'file_thumbnail'})
	// 	})
	// }
	// const onThumbnailError = () => {
	// 	console.log('thumbnail error')
	// 	setThumbnail({
	// 		src: '/assets/img/file-svg.svg',
	// 		class: 'file_thumbnail file_aternative-thumbnail',
	// 	})
	// }

	const selectContext = (e) => {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
		}
		console.log('setting selected context to ', !contextSelected)
		setContextSelected((prev) => !prev)
	}
	const closeContext = () => {
		console.log('closing context')
		setContextSelected(false)
	}
	// useEffect(() => {
	// 	if (props.metadata.hasThumbnail) getThumbnail()
	// }, [props.metadata.hasThumbnail])
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [contextSelected, wrapperRef])
	const handleClickOutside = () => {
		// console.log('closeing context', wrapperRef?.current, contextSelected)
		if (contextSelected) {
			console.log('hello')
			closeContext()
		}
	}
	const showRenameModal = async () => {
		let inputValue = props.name
		const {value: fileName} = await Swal.fire({
			title: 'Enter File Name',
			input: 'text',
			inputValue: inputValue,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) return 'Please enter a file name'
			},
		})
		if (fileName === undefined || fileName === null) return
		dispatch(startFolderRename(props._id, fileName))
	}
	const showDeleteModal = () => {
		Swal.fire({
			title: 'Confirm Deletion',
			text: 'Once delete you cannot undo this action',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Yes, Delete',
		}).then((result) => {
			if (result.value) {
				dispatch(startFolderDelete(props.id, props.parent, [...props.parentList, props._id]))
			}
		})
	}
	const handleFileRename = () => {
		showRenameModal()
	}
	const handleFileDelete = () => {
		showDeleteModal()
	}
	return (
		<div
			// className={
			// 	props._id !== props.selected
			// 		? 'folder_item noSelect'
			// 		: 'elem__folders active__folder noSelect'
			// }
			className={props._id !== props.selected ? 'folder_item' : 'folder_item folder_active'}
			onClick={() => props.folderClick(props._id, props)}
			onContextMenu={selectContext}
			onTouchStart={props.onTouchStart}
			onTouchEnd={props.onTouchEnd}
			onTouchMove={props.onTouchMove}
		>
			<div className='settings_wrapper' onClick={props.clickStopPropagation}>
				<ContextMenu
					gridMode={true}
					folderMode={true}
					quickItemMode={props.parent !== '/'}
					contextSelected={contextSelected}
					closeContext={closeContext}
					// downloadFile={downloadFile}
					// file={props}
					changeEditNameMode={props.changeEditNameMode}
					handleFileRename={handleFileRename}
					handleFileDelete={handleFileDelete}
					startMovingFile={props.startMoveFolder}
				/>
			</div>
			<div class={props._id !== props.selected ? 'folder_icon' : 'folder_icon folder_selected'}>
				<FontAwesomeIcon icon='folder' />
				{/* <FontAwesomeIcon icon='check-square' /> */}
				{/* <i className='fas fa-folder' aria-hidden={true}></i> */}
				{/* <img class="fas fa-folder" src="/assets/foldericon.svg"/> */}
			</div>
			<div class='folder_info'>
				<p>{props.name}</p>
				<ul>
					{/* <li>16 files</li>
					<li class="spacer__folder">•</li> */}
					{/* <li>{props.drive ? 'Google Drive' : props.personalFolder ? 'Amazon S3' : 'myDrive'}</li> */}
				</ul>
			</div>
		</div>
	)
}

export default FolderItem
