const mongoose = require('mongoose')
const db = require('../models')

const submissionSchema = new mongoose.Schema(
	{
		judgeId: {type: String, required: true},
		isCompleted: {type: Boolean, default: false},
		isSuccessful: {type: Boolean, default: false},
		results: {type: Object},
		user: {type: mongoose.Types.ObjectId, ref: 'user'},
		isTopSubmission: {type: Boolean},
		score: {type: Number},
		source: {type: String},
		lang: {type: String},
		time: {type: String},
		question: {type: mongoose.Types.ObjectId, ref: 'question'},
	},
	{timestamps: true}
)
submissionSchema.pre('findOneAndUpdate', async function (err) {
	const docToUpdate = await this.model.findOne(this.getQuery())
	const topSub = await db.Submission.findOne(
		{isTopSubmission: true, user: docToUpdate.user,question:docToUpdate.question},
		'score'
	)
	var isTopSubmission = true
	if (topSub && topSub.score > this._update.score) isTopSubmission = false
	else if (topSub) {
		topSub.isTopSubmission = false
		await topSub.save()
	}
	this.set({isTopSubmission})
})

const Submission = mongoose.model('submission', submissionSchema)
module.exports = Submission
