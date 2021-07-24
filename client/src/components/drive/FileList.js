import React from 'react'
import {useSelector} from 'react-redux'
import {getFiles} from '../../store/selectors/drive'
import FileItem from './FileItem'

function FileList(props) {
	const files = useSelector(getFiles)

	return (
		<div className='drive_item_wrapper'>
			{/* {JSON.stringify(files)} */}
			{files.map((file) => {
				return <FileItem key={file._id} {...file} {...props} />
			})}
		</div>
	)
}

export default FileList
