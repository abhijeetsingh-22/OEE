const mongoose = require('mongoose')
const testcaseSchema = new mongoose.Schema({
	question: {type: mongoose.Types.ObjectId, ref: 'question', required: true},
	input: {type: String, required: true},
	output: {type: String, required: true},
	isPublic: {type: Boolean, default: false},
})
testcaseSchema.post('insertMany', async function (docs, next) {
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
	const testcasesIdArray = docs.map((t) => t._id)
	const question = await mongoose.model('codeQuestion').findOneAndUpdate(
		{_id: docs[0].question},
		{
			$push: {
				testcases: {$each: testcasesIdArray},
			},
		},
		{new: true}
	)
})
testcaseSchema.pre('deleteMany', async function (docs, next) {
	console.log('😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀 inside deletemany')

	// const testcasesIdArray = this._conditions._id['$in'].map((t) => t._id)
	// const question = await mongoose.model('codeQuestion').findOneAndUpdate(
	// 	{_id: docs[0].question},
	// 	{
	// 		$pullAll: {testcases: testcasesIdArray},
	// 	}
	// )
})

const Testcase = mongoose.model('testcase', testcaseSchema)
module.exports = Testcase
