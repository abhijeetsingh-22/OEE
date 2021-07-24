const express = require('express')
const {
	createMeeting,
	getMeeting,
	getAllMeetings,
	deleteMeeting,
	updateMeeting,
} = require('../handlers/meeting')
const router = express.Router()

// router.get('/room/:roomId',)
router.post('/', createMeeting)
router.get('/:meetingId', getMeeting)
router.put('/:meetingId', updateMeeting)
router.delete('/:meetingId', deleteMeeting)
router.get('/', getAllMeetings)

module.exports = router
