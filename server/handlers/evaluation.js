const config = require('../config')
const db = require('../models')
const services = require('../services/oj')

const createEvaluation = async (req, res, next) => {
	try {
		//req.body={title,startTime,endTime,description,}
		const {title, body, startTime, endTime, marks} = req.body
		console.log(title)
		const evaluation = await db.Evaluation.create({
			title,
			body,
			startTime,
			endTime,
			user: req.user.id,
		})
		console.log('happy to be here 🤦‍♂️🤦‍♂️', req.user)
		return res.status(200).json(evaluation)
	} catch (err) {
		return next(err)
	}
}

const getAllEvaluations = async (req, res, next) => {
	try {
		let foundEvaluations = await db.Evaluation.find({})
		return res.status(200).json(foundEvaluations)
	} catch (err) {
		console.error('error 🚫👨‍🚫 ', err)
		next({status: 400, message: 'Oops!! Something went wrong'})
	}
}
const getAllQuestions = async (req, res, next) => {
	try {
		// const questionNumber = req.query.questionNumber || 1
		let foundQuesion = await db.Question.find(
			{
				evaluation: req.params.evaluationId,
			},
			{source: false, testcases: false}
		).populate('exampleTestcases', 'input output', 'testcase')
		// .populate('testcases', 'input', 'testcase');
		return res.status(200).json(foundQuesion)
	} catch (err) {
		console.error('error occured')
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getQuestion = async (req, res, next) => {
	try {
		const foundQuestion = await db.Question.findById(req.params.questionId, {
			testcases: false,
		})
		return res.status(200).json(foundQuestion)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const updateQuestion = async (req, res, next) => {
	try {
		console.log('UPDATE QUESTION NOT IMPLEMENTED YET ')
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const deleteQuestion = async (req, res, next) => {
	try {
		console.log('DELETE QUESTION NOT IMPLEMENTED YET')
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const createObjectiveQuestion = async (req, res, next) => {
	try {
		const {body, marks, order, type, testcases, correctOption, options, source, lang} = req.body

		const createdQuestion = await db.Question.create({
			body,
			marks,
			type,
			order,

			evaluation: req.params.evaluationId,
		})
		if (type === 'objective') {
			const newOps = options.map((o) => {
				o.question = createdQuestion._id
				return o
			})
			const createdOptions = await db.QuizOption.insertMany(newOps)
		} else {
			await services.getTestcasesOutput({source, lang, testcases})
		}
		return res.json({createdOptions, createdQuestion})
	} catch (err) {
		console.error('error occured')
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const createCodeQuestion = async (req, res, next) => {
	try {
		const {body, marks, type, order, testcases, source} = req.body
		const createdQuestion = await db.Question.create({
			body,
			marks,
			type,
			order,
			source,
			evaluation: req.params.evaluationId,
		})
		const newTestCases = testcases.map((t) => {
			t.question = createdQuestion._id
			return t
		})
		const createdTestcases = await db.Testcase.insertMany(newTestCases)

		return res.status(200).json(createdQuestion)
	} catch (err) {
		console.error('error occured', err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const createQuestion = async (req, res, next) => {
	try {
		const {title, body, marks, type, testcases, source, bodyDelta, bodyHTML, options} = req.body

		const createdQuestion = await db.Question.create({
			title,
			body,
			bodyDelta,
			bodyHTML,
			marks,
			type,
			source,
			evaluation: req.params.evaluationId,
		})
		if (type === 'code') {
			// const newExampleTestcases = exampleTestcases.map((t) => {
			// 	t.question = createdQuestion._id
			// 	t.type = 'public'
			// 	return t
			// })
			const newTestCases = testcases.map((t) => {
				t.question = createdQuestion._id

				return t
			})
			const createdTestcases = await db.Testcase.insertMany([...newTestCases])
		} else {
			const newOps = options.map((o) => {
				o.question = createdQuestion._id
				return o
			})
			const createdOptions = await db.QuizOption.insertMany(newOps)
		}
		const foundQuestion = await db.Question.findById(createdQuestion.id).populate('testcases')

		return res.status(200).json(foundQuestion)
	} catch (err) {
		console.error('error occured', err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const runTestcases = async (req, res, next) => {
	try {
		const {source, lang, testcases} = req.body
		console.error(testcases)
		console.log('inside run post😀😀😀😀')
		if (!source) return res.status(400).send({error: {message: 'source is required'}})
		if (!lang) return res.status(400).send({error: {message: 'lang is required'}})

		const {id} = await services.getTestcasesOutput({source, lang, testcases})
		await db.RunRequest.create({
			judgeId: id,
			user: req.user && req.user.id,
		})
		res.json({id})
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong. in placing'})
	}
}
const runTestcasesCb = async (req, res, next) => {
	try {
		console.log('the secret code is', req.query.code)
		console.log('inside run test cases cb')
		if (req.query.code !== config.judge.apiKey) {
			return res.sendSatus(403)
		}
		const {id, code, stderr, testcases, time} = req.body
		// const output = {id, code, stderr, , time}
		const updatedSubmission = await db.RunRequest.findOneAndUpdate(
			{judgeId: id, isCompleted: false},
			{isCompleted: true, isSuccessful: !stderr, results: testcases}
		)
		if (!updatedSubmission) return res.status(404).send({error: {message: 'submission not found'}})
		return res.send({success: true})
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
module.exports = {
	createEvaluation,
	getAllEvaluations,
	getQuestion,
	getAllQuestions,
	createCodeQuestion,
	createObjectiveQuestion,
	createQuestion,
	deleteQuestion,
	updateQuestion,
	runTestcases,
	runTestcasesCb,
}
