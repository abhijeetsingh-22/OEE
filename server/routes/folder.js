const {getFolderList, uploadFolder, renameFolder, deleteFolder} = require('../handlers/folder')
const {isStaffUser} = require('../middleware/auth')

const router = require('express').Router()

router.post('/upload', isStaffUser, uploadFolder)
router.delete('/delete', isStaffUser, deleteFolder)
router.delete('/remove-all')
router.get('/info/:id')
router.get('/list', getFolderList)
router.get('/subfolder-list')
router.patch('/rename', isStaffUser, renameFolder)
// router.delete('/')

module.exports = router
