const mongoose = require('mongoose')
const {Question} = require('./question')

const quizOptionSchema = new mongoose.Schema({
	question: {type: mongoose.Types.ObjectId, ref: 'question', required: true},
	isCorrect: {type: Boolean},
	body: {type: String, required: true},
})
quizOptionSchema.post('insertMany', async function (docs, next) {
	// const privateIdArray = docs.reduce((acc, cur) => {
	// 	if (cur.type === 'private') return [...acc, cur._id]
	// 	else return acc
	// }, [])
	// const publicIdArray = docs.reduce((acc, cur) => {
	// 	if (cur.type === 'public') return [...acc, cur._id]
	// 	else return acc
	// }, [])
	// console.log('private', privateIdArray)
	// console.log('public', publicIdArray)
	const optionIdArray = docs.map((o) => o._id)
	const correctOptionIdArray = docs.filter((o) => o.isCorrect).map((o) => o._id)
	console.log('correct options are 😋😋', correctOptionIdArray)
	const question = await mongoose.model('objectiveQuestion').findOneAndUpdate(
		{_id: docs[0].question},
		{
			$push: {
				options: {$each: optionIdArray},
				correctOptions: {$each: correctOptionIdArray},
			},
		},
		{new: true}
	)
})

const QuizOption = mongoose.model('quizOption', quizOptionSchema)
module.exports = QuizOption
