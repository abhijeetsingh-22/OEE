import React, {useEffect, useRef} from 'react'

function ContextMenu(props) {
	// const wrapperRef = useRef(null)

	const {parent, folderMode, contextSelected, quickItemMode} = props

	// useEffect(() => {
	// 	document.addEventListener('mousedown', handleClickOutside)
	// 	return () => document.removeEventListener('mousedown', handleClickOutside)
	// }, [contextSelected])
	// const handleClickOutside = () => {
	// 	console.log('closeing context', wrapperRef?.current)
	// 	if (props.contextSelected && wrapperRef) {
	// 		console.log('hello')
	// 		props.closeContext()
	// 	}
	// }
	const stopPropagation = (e) => {
		console.log('stopping propagation from drop')
		e.stopPropagation()
		// if (props.quickItemMode || props.gridMode) props.closeContext()
	}

	const startRenameFile = () => {
		props.handleFileRename()
		props.closeContext()
	}
	const startFileDownload = () => {
		console.log('starting file download', props.downloadFile)
		props.downloadFile(props.file._id, props.file)
		props.closeContext()
	}
	const startDeleteFile = () => {
		props.handleFileDelete()
		props.closeContext()
	}
	const startMovingFile = () => {}
	return (
		<div
			onMouseDown={stopPropagation}
			onClick={stopPropagation}
			ref={props.wrapperRef}
			// className={parent === '/' || parent === undefined ? 'settings__drop' : 'settings__drop'}
			className='settings_drop'
			style={contextSelected ? {display: 'block', marginTop: '138px'} : {display: 'none'}}
		>
			<ul>
				<li>
					<a onClick={startRenameFile} class='rename__file'>
						<span>
							<img src='/assets/img/filesetting1.svg' alt='setting' />
						</span>{' '}
						Rename
					</a>
				</li>
				{!folderMode ? (
					<li>
						{/* <a onClick={startShareFile} class='modal__button' data-modal='share__modal'> */}
						{/* <span><img src='/assets/filesetting2.svg' alt='setting' /></span> Share */}
						{/* </a> */}
					</li>
				) : undefined}
				{!folderMode ? (
					<li>
						<a onClick={startFileDownload} className='download_file_btn'>
							<span>
								<img src='/assets/img/filesetting3.svg' alt='setting' />
							</span>
							Download
						</a>
					</li>
				) : undefined}
				<li>
					<a
						onClick={startMovingFile}
						class='modal_btn'
						// data-modal='destination__modal'
					>
						<span>
							<img src='/assets/img/filesetting4.svg' alt='setting' />
						</span>
						Move
					</a>
				</li>
				<li>
					<a onClick={startDeleteFile} class='delete__file'>
						<span>
							<img src='/assets/img/filesetting5.svg' alt='setting' />
						</span>
						Delete
					</a>
				</li>
			</ul>
		</div>
	)
}

export default ContextMenu
