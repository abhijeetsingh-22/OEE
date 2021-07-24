const mongoose = require('mongoose')

const thumbnailSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
			required: true,
		},

		data: {
			type: Buffer,
		},
		path: {
			type: String,
		},

		// IV: {
		//     type: Buffer,
		// },
		// s3ID: String,
		// personalFile: String,
	},
	{
		timestamps: true,
	}
)

const Thumbnail = mongoose.model('thumbnail', thumbnailSchema)

module.exports = Thumbnail
