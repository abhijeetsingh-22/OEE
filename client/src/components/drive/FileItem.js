import moment from 'moment'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import {apiCall} from '../../services/api'
import {startFileDelete, startFileRename} from '../../store/actions/drive'
import ContextMenu from './ContextMenu'
function FileItem(props) {
	const wrapperRef = useRef(null)
	const dispatch = useDispatch()

	const [thumbnail, setThumbnail] = useState({src: '', class: ''})
	const [contextSelected, setContextSelected] = useState(false)
	const getThumbnail = async () => {
		const thumbnailID = props.metadata.thumbnailID
		const url = `/api/drive/files/thumbnail/${thumbnailID}`
		const config = {responseType: 'arraybuffer'}
		apiCall('get', url, config).then((res) => {
			const imgFile = new Blob([res])
			const imgURL = URL.createObjectURL(imgFile)
			console.log(imgFile, imgURL)
			setThumbnail({src: imgURL, class: 'file_thumbnail'})
		})
	}
	const onThumbnailError = () => {
		console.log('thumbnail error')
		setThumbnail({
			src: '/assets/img/file-svg.svg',
			class: 'file_thumbnail file_aternative-thumbnail',
		})
	}

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
	useEffect(() => {
		if (props.metadata.hasThumbnail) getThumbnail()
	}, [props.metadata.hasThumbnail])
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
		let inputValue = props.filename
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
		dispatch(startFileRename(props._id, fileName))
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
				dispatch(startFileDelete(props.id))
			}
		})
	}
	const handleFileRename = () => {
		showRenameModal()
	}
	const handleFileDelete = () => {
		showDeleteModal()
	}
	console.log('the prop ', props.selected, props._id)
	return (
		thumbnail && (
			<div
				onContextMenu={selectContext}
				className={props._id !== props.selected ? 'file_item' : 'file_item file_active'}
				// className='d-flex flex-column justify-content-center align-items-start m-2 '
				// style={{position: 'relative'}}
				onClick={() => props.fileClick(props._id, props)}
			>
				<div className='settings_wrapper' onClick={props.clickStopPropagation}>
					<ContextMenu
						wrapperRef={wrapperRef}
						gridMode={true}
						folderMode={false}
						quickItemMode={props.parent !== '/'}
						contextSelected={contextSelected}
						closeContext={closeContext}
						downloadFile={props.downloadFile}
						file={props}
						handleFileRename={handleFileRename}
						closeEditNameMode={props.closeEditNameMode}
						handleFileDelete={handleFileDelete}
						startMovingFile={props.startMoveFolder}
						// downloadFile={props.downLoadFile}
					/>
				</div>
				<div className='file_thmbnail_wrapper'>
					<img src={thumbnail.src} className={thumbnail.class} onError={onThumbnailError} />
				</div>
				<div className='file_info'>
					<p>{props.filename}</p>
					<span>{moment(props.uploadDate).format('L')}</span>
				</div>
			</div>
		)
	)
}

export default FileItem
