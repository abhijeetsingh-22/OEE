import React from 'react'
import {useSelector} from 'react-redux'
import {getFiles, getFolder} from '../../store/selectors/drive'
import FolderItem from './FolderItem'

function FolderList(props) {
	const folders = useSelector(getFolder)

	return (
		<div className='drive_item_wrapper'>
			{/* {JSON.stringify(files)} */}
			{folders.map((folder) => {
				return <FolderItem key={folder._id} {...folder} {...props} />
			})}
		</div>
	)
}

export default FolderList
