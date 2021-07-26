const db = require('../models')
const users = {}
module.exports = (io, socket) => {
	socket.on('join-room', async (roomID, userID, username) => {
		// socket.on('join-room', async (roomID) => {
		console.log('joining room', roomID)
		const meeting = await db.Meeting.findById(roomID)
		if (!meeting) return
		const joiningTime = new Date()
		const attendance = await db.UserAttendance.update(
			{user: socket.data.user.id, meeting: roomID},
			{joiningTime},
			{upsert: true}
		)
		console.log(users)
		console.log('=========')
		// const {id: userID, name: username} = socket.data.user
		if (users[roomID]) users[roomID].push({id: userID, name: username, video: true, audio: true})
		else users[roomID] = [{id: userID, name: username, video: true, audio: true}]
		console.log(users)
		console.log('xxxxxxxxxx')
		socket.join(roomID)
		// console.log(socket.to(roomID))
		socket.to(roomID).emit('user-connected', userID, username)
		// socket.to(roomID).broadcast.emit('user-connected', userID, username)

		socket.on('message', (message) => {
			io.in(roomID).emit('message', message, userID, username)
		})

		io.in(roomID).emit('participants', users[roomID])

		socket.on('mute-mic', () => {
			users[roomID].forEach((user) => {
				if (user.id === userID) return (user.audio = false)
			})
			io.in(roomID).emit('participants', users[roomID])
		})

		socket.on('unmute-mic', () => {
			users[roomID].forEach((user) => {
				if (user.id === userID) return (user.audio = true)
			})
			io.in(roomID).emit('participants', users[roomID])
		})

		socket.on('stop-video', () => {
			users[roomID].forEach((user) => {
				if (user.id === userID) return (user.video = false)
			})
			io.in(roomID).emit('participants', users[roomID])
		})

		socket.on('play-video', () => {
			users[roomID].forEach((user) => {
				if (user.id === userID) return (user.video = true)
			})
			io.in(roomID).emit('participants', users[roomID])
		})

		socket.on('disconnect', async () => {
			const attendance = await db.UserAttendance.findOne({
				user: socket.data.user.id,
				meeting: roomID,
			})
			const timeNow = new Date()
			const minutes = !!attendance.joiningTime
				? attendance.duration + timeNow.getMinutes() - attendance.joiningTime.getMinutes()
				: attendance.duration
			await attendance.update({duration: minutes, joiningTime: null})
			// socket.to(roomID).broadcast.emit('user-disconnected', userID, username)
			console.log('user disconnected')
			socket.to(roomID).emit('user-disconnected', userID, username)
			users[roomID] = users[roomID]?.filter((user) => user.id !== userID) || []
			if (users[roomID].length === 0) delete users[roomID]
			else io.in(roomID).emit('participants', users[roomID])
			// console.log(users)
		})
		// socket.on('user-leaving', () => socket.emit('disconnect'))
	})
}
