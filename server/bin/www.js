#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app')
// app.get('/hello', (req, res) => res.send('hello'))
var debug = require('debug')('server:server')
var http = require('http')
const createError = require('http-errors')
const {ExpressPeerServer} = require('peer')
const {v4: uuid} = require('uuid')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */
var server = http.createServer(app)
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log('listening on port ', port))
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address()
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
	debug('Listening on ' + bind)
}
// ==========  socket io configuration ==============//
const options = {cors: {origin: '*'}}
const io = require('socket.io')(server, options)
const jwt = require('jsonwebtoken')
const socketHandlers = require('../socketHandler')
io.on('connection', (socket) => {
	console.log(`user ${socket.data.user.name} connected`)
	socketHandlers(io, socket)
})
io.use(async (socket, next) => {
	const token = socket.handshake.auth.token
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (decoded) {
			console.log('token is ', token)
			console.log('socket user verified')
			socket.data.user = decoded
			return next()
		} else {
			console.log('invalid socket user')
			return next(new Error('You are not allowed to do that !!'))
		}
	})
})
// ================== PEERJS CONFIG ========================//
const peerServer = ExpressPeerServer(server, {debug: true, path: '/', cors: '*'})

app.use('/peerjs', peerServer)
app.get('/hello', (req, res) => res.send('hi'))

// server.listen(port, () => console.log('listening on port ', port))
// module.exports = {peerServer}
// =================== Express rotes error handling=========================//
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// returns the error message
	res
		.status(err.status || 500)
		.json({error: {message: err.message || 'Oops!! Something went wrong try again'}})
})
