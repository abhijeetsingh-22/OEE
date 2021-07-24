const db = require('../models')
module.exports = (io, socket) => {
	const submitAnswer = (payload, cb) => {
		console.log(
			'the received answer is 😀😀😀',
			payload.option,
			'for question',
			payload.question,
			'by user',
			socket.data.user
		)
		cb({status: 'ok'})
	}
	socket.on('answer', submitAnswer)
	// socket.on('join-room', () => console.log('join-room'))
}
