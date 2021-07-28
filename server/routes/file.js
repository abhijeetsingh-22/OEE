const router = require('express')()
const {
	uploadFile,
	downloadFile,
	getList,
	getThumbnail,
	renameFile,
	deleteFile,
} = require('../handlers/file')
const {isStaffUser} = require('../middleware/auth')

router.post('/upload', isStaffUser, uploadFile)
router.get('/thumbnail/:id', getThumbnail)
router.get('/info/:id')
router.get('/stream-video/:id')
router.get('/list', getList)
router.get('/download/:id', downloadFile)
router.patch('/rename', isStaffUser, renameFile)
router.delete('/:fileId', isStaffUser, deleteFile)
module.exports = router
