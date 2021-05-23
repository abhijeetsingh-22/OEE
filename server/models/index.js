const mongoose = require('mongoose')

mongoose.connect(
	process.env.MONGO_URI,
	{keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true},
	() => console.log('Database Connected')
)

module.exports = {
	...require('./user'),
	...require('./question'),
	...require('./userAnswer'),
}
mongoose.set('debug', process.env.NODE_ENV != 'production')
mongoose.set('toJSON', {virtuals: true})
module.exports.EvaluationResult = require('./evaluationResult')
module.exports.Category = require('./category')
module.exports.Thread = require('./thread')
module.exports.Post = require('./post')
module.exports.Tag = require('./tag')
module.exports.RunRequest = require('./runRequest')
module.exports.Evaluation = require('./evaluation')
module.exports.QuizOption = require('./quizOption')
module.exports.Testcase = require('./testcase')
module.exports.Submission = require('./submission')
