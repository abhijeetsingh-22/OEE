import React from 'react'
import FileList from './FileList'
import FolderList from './FolderList'
function ViewDriveContent(props) {
	return (
		<div>
			<FileList {...props} />
			<div style={{height: '20px'}} />
			<FolderList {...props} />
		</div>
	)
}

export default ViewDriveContent
