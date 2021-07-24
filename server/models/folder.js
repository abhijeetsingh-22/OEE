const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		parent: {
			type: String,
			required: true,
		},

		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
			required: true,
		},

		parentList: {
			type: Array,
			required: true,
		},
		// personalFolder: Boolean,
	},
	{
		timestamps: true,
	}
)

const Folder = mongoose.model('folder', folderSchema)
module.exports = Folder
