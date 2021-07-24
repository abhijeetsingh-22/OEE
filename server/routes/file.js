const router = require('express')()
const {
	uploadFile,
	downloadFile,
	getList,
	getThumbnail,
	renameFile,
	deleteFile,
} = require('../handlers/file')

router.post('/upload', uploadFile)
router.get('/thumbnail/:id', getThumbnail)
router.get('/info/:id')
router.get('/stream-video/:id')
router.get('/list', getList)
router.get('/download/:id', downloadFile)
router.patch('/rename', renameFile)
router.delete('/:fileId', deleteFile)
module.exports = router
