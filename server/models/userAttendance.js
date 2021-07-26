const mongoose = require('mongoose')

const userAttendanceSchema = new mongoose.Schema(
	{
		meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'meeting'},
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
		joiningTime: {type: Date, required: true},
		duration: {type: Number, default: 0},
	},
	{timestamps: true}
)

const UserAttendance = mongoose.model('userAttendance', userAttendanceSchema)
module.exports = UserAttendance
