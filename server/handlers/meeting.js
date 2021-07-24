const db = require('../models')

const createMeeting = async (req, res, next) => {
	try {
		const {title, startTime, endTime, body} = req.body
		console.log('the start time is 😀😀', startTime)
		const newMeeting = await db.Meeting.create({title, body, startTime, endTime, user: req.user.id})
		if (!newMeeting) return res.status(400).json({error: {message: 'Unable to create meeting'}})
		return res.status(200).json(newMeeting)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const updateMeeting = async (req, res, next) => {
	try {
		const {meetingId} = req.params
		const {title, startTime, endTime, body} = req.body
		const updatedMeeting = await db.Meeting.findByIdAndUpdate(meetingId, {
			title,
			startTime,
			endTime,
			body,
		})
		if (!updateMeeting) return res.status(400).json({error: {message: 'Meeting not found'}})
		return res.status(200).json(updatedMeeting)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const deleteMeeting = async (req, res, next) => {
	try {
		const deletedMeeting = await db.Meeting.findByIdAndDelete(req.params.meetingId)
		if (!deletedMeeting) return res.status(404).json({error: {message: 'Meeting not found'}})
		return res.status(200).json()
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getMeeting = async (req, res, next) => {
	try {
		const foundMeeting = await db.Meeting.findById(req.params.meetingId)
		if (!foundMeeting) return res.status(404).json({error: {message: 'Meeting not found'}})
		return res.status(200).json(foundMeeting)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getAllMeetings = async (req, res, next) => {
	try {
		// console.l')
		const foundMeetings = await db.Meeting.find({})
		if (!foundMeetings) return res.status(404).json({error: {message: 'Meeting not found'}})
		// console.log(foundMeetings, '😀😀')
		return res.status(200).json(foundMeetings)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
module.exports = {createMeeting, updateMeeting, deleteMeeting, getMeeting, getAllMeetings}
