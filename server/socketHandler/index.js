const quizHandler = require('./quiz')

module.exports = (io, socket) => {
	quizHandler(io, socket)
}
