const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
	{
		uploadDate: {type: Date, required: true},
		filename: {type: String, required: true},
		length: {type: Number, required: true},
		metadata: {
			type: {
				parent: {
					type: String,
					required: true,
				},
				parentList: {
					type: String,
					required: true,
				},
				hasThumbnail: {
					type: Boolean,
					required: true,
				},
				isVideo: {
					type: Boolean,
					required: true,
				},
				thumbnailID: String,
				size: {
					type: Number,
					required: true,
				},
				// IV: {
				//     type: Binary,
				//     required: true
				// },
				linkType: String,
				link: String,
				filePath: String,
				// s3ID: String,
				// personalFile: Boolean,
			},
		},

		user: {type: mongoose.Types.ObjectId, ref: 'user'},
	},
	{timestamps: true}
)

// fileSchema.pre('save', async function (next) {
// 	try {
// 		let user = await User.findOneAndUpdate({id: this.user}, {$push: {posts: this.id}})
// 		let thread = await User.findOneAndUpdate({id: this.thread}, {$push: {posts: this.id}})
// 		next()
// 	} catch (err) {
// 		console.error('error occured')
// 		next({status: 400, message: 'Oops !! Something went wrong.'})
// 	}
// })

const File = mongoose.model('file', fileSchema)
module.exports = File
