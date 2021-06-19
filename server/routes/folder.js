const {getFolderList, uploadFolder} = require('../handlers/folder')

const router = require('express').Router()

router.post('/upload', uploadFolder)
router.delete('/remove')
router.delete('/remove-all')
router.get('/info/:id')
router.get('/list', getFolderList)
router.get('/subfolder-list')

module.exports = router
