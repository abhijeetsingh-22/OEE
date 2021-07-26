const express = require('express')
const {
	createMeeting,
	getMeeting,
	getAllMeetings,
	deleteMeeting,
	updateMeeting,
	getAllAttendance,
} = require('../handlers/meeting')
const router = express.Router()

// router.get('/room/:roomId',)
router.post('/', createMeeting)
router.get('/:meetingId', getMeeting)
router.put('/:meetingId', updateMeeting)
router.delete('/:meetingId', deleteMeeting)
router.get('/', getAllMeetings)
router.get('/:meetingId/attendance', getAllAttendance)

module.exports = router
