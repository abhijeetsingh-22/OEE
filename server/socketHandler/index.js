const quizHandler = require('./quiz')
const meetingHandler = require('./meeting')

module.exports = (io, socket) => {
	quizHandler(io, socket)
	meetingHandler(io, socket)
}
