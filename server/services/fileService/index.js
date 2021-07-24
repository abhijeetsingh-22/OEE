const fs = require('fs')

const deleteFile = (path) => {
	return new Promise((resolve, reject) => {
		fs.unlink(path, (err) => {
			if (err) {
				console.log('file delete faild', err)
				resolve()
			}
			resolve()
		})
	})
}
module.exports = {deleteFile}
