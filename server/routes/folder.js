const {getFolderList, uploadFolder, renameFolder, deleteFolder} = require('../handlers/folder')

const router = require('express').Router()

router.post('/upload', uploadFolder)
router.delete('/delete', deleteFolder)
router.delete('/remove-all')
router.get('/info/:id')
router.get('/list', getFolderList)
router.get('/subfolder-list')
router.patch('/rename', renameFolder)
// router.delete('/')

module.exports = router
