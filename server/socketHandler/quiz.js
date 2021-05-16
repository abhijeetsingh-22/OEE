const db = require('../models')
module.exports = (io, socket) => {
	const submitAnswer = (payload, cb) => {
		console.log('the received paylod is 😀😀😀', payload, 'by user', socket.data.user)
		cb({status: 'ok'})
	}
	socket.on('answer', submitAnswer)
}
