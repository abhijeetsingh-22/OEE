const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {type: String, default: ''},
		user: {type: mongoose.Types.ObjectId, ref: 'user'},
		startTime: {type: Date, required: true},
		endTime: {type: Date, required: true},
	},
	{timestamps: true}
)

const Meeting = mongoose.model('meeting', meetingSchema)
module.exports = Meeting
