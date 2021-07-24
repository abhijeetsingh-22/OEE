const jwt = require('jsonwebtoken')
const user = require('../models/user')

isLoggedin = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
			if (decoded) {
				return next()
			} else return next({status: 401, message: 'you need to login to do that'})
		})
	} catch (err) {
		return next({status: 401, message: 'you need to login to do that'})
	}
}

isCorrectUser = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
			if (decoded && decoded.id == req.params.id) return next()
			else return next({status: 401, message: 'Unauthorized'})
		})
	} catch (err) {
		return next({status: 401, message: 'Unauthorized'})
	}
}

function setAuthUser(req, res, next) {
	try {
		console.log('checking user login status 🔑🔑')
		// console.log(req.path.split('/'))
		if (req.path.split('/')[1] === 'peerjs') return next()

		if (req?.headers?.authorization || req.cookies.authorization) {
			const token =
				req?.headers?.authorization?.split(' ')[1] || req.cookies.authorization.split(' ')[1]
			console.log('🥱🥱 token is ', token)
			var decoded = jwt.verify(token, process.env.TOKEN_SECRET)
			if (decoded) {
				req.user = decoded
				console.log('user verified ', req.user)
				return next()
			}
		}
		return next({status: 400, message: 'you need to login to do that'})
	} catch (err) {
		console.log(err)
		return next({status: 401, message: 'you need to login to do that'})
	}
}
function isStaffUser(req, res, next) {
	try {
		// return next();
		if (req.user.role !== 'staff')
			return res.status(403).json({error: {message: 'you are not allowed to do that!!'}})
		else next()
	} catch (err) {
		return res.status(404).json({error: {message: 'something went wrong s'}})
	}
}

module.exports = {isLoggedin, isCorrectUser, setAuthUser, isStaffUser}
