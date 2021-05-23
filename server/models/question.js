const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
	{
		order: {type: Number},
		body: {type: String},
		marks: {type: String},
		evaluation: {type: mongoose.Types.ObjectId, ref: 'evaluation'},
		user: {type: mongoose.Types.ObjectId, ref: 'user'},
	},
	{timestamps: true, discriminatorKey: 'type'}
)
const codeSchema = new mongoose.Schema({
	title: {type: String},
	testcases: {type: [mongoose.Types.ObjectId], ref: 'testcase'},
	source: {type: String},
	lang: {type: String},
	bodyHTML: {type: String},
	bodyDelta: {type: String},
})
const objectiveSchema = new mongoose.Schema({
	correctOptions: {type: [mongoose.Types.ObjectId], ref: 'quizOption'},
	options: {type: [mongoose.Types.ObjectId], ref: 'quizOption'},
})
questionSchema.pre('save', async function (next) {
	console.log(this)
	await mongoose
		.model('evaluation')
		.findOneAndUpdate({_id: this.evaluation}, {$push: {questions: this._id}})
	return next()
})
questionSchema.pre('deleteOne', async function (next) {
	console.log(this)
	await mongoose
		.model('evaluation')
		.findOneAndUpdate({_id: this.evaluation}, {$pull: {questions: this._id}})
	return next()
})
const Question = mongoose.model('question', questionSchema)
const CodingQuesion = Question.discriminator('codeQuestion', codeSchema, 'code')
const ObjectiveQuestion = Question.discriminator('objectiveQuestion', objectiveSchema, 'objective')
module.exports = {Question, CodingQuesion, ObjectiveQuestion}
