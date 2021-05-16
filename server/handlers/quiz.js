const config = require('../config')
const db = require('../models')
const services = require('../services/oj')

//======================= QUIZ HANDLERS =========================//

const getAllQuizzes = async (req, res, next) => {
	try {
		const foundQuizzes = await db.Evaluation.find({type: 'quiz'})
		if (!foundQuizzes) return res.status(200).json({error: {message: 'no quiz found'}})
		return res.status(200).json(foundQuizzes)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const submitAnswer = async (req, res, next) => {
	try {
		// const selected
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

module.exports = {getAllQuizzes}
