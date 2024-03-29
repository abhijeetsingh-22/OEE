const config = require('../config')
const db = require('../models')
const services = require('../services/oj')

const createEvaluation = async (req, res, next) => {
	try {
		//req.body={title,startTime,endTime,description,}
		const {title, body, startTime, endTime, marks, type} = req.body
		console.log(title)
		const evaluation = await db.Evaluation.create({
			title,
			body,
			startTime,
			endTime,
			type,
			user: req.user.id,
		})
		console.log('happy to be here 🤦‍♂️🤦‍♂️', req.user)
		return res.status(200).json(evaluation)
	} catch (err) {
		return next(err)
	}
}
const updateEvaluation = async (req, res, next) => {
	try {
		const {title, body, startTime, endTime, type} = req.body
		const updatedEvaluation = await db.Evaluation.findByIdAndUpdate(
			req.params.evaluationId,
			{
				title,
				body,
				startTime,
				endTime,
			},
			{new: true, omitUndefined: true}
		)
		if (!updatedEvaluation) return res.status(200).json({error: {message: 'Evaluation not found'}})
		else return res.status(200).json(updatedEvaluation)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const getAllEvaluations = async (req, res, next) => {
	try {
		const type = req.query.type
		let foundEvaluations = await db.Evaluation.find({type})
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
			{source: false, testcases: false, correctOptions: false}
		)
			.populate('exampleTestcases', 'input output', 'testcase')
			.populate('options', '-isCorrect', 'quizOption')
		// .populate('testcases', 'input', 'testcase');
		return res.status(200).json(foundQuesion)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getQuestion = async (req, res, next) => {
	try {
		const type = req.query.type
		const question = await db.Question.findById(req.params.questionId, {
			user: true,
			evaluation: true,
		}).populate('evaluation', 'startTime endTime', 'evaluation')
		const isOwner = req.user.id == question.user

		var foundQuestion = {}
		if (type == 'edit' && isOwner) {
			foundQuestion = await db.Question.findById(req.params.questionId, '-correctOptions')
				.populate('testcases', '', 'testcase')
				.populate('options', '', 'quizOption')
		} else if (new Date().getTime() >= new Date(question.evaluation.startTime).getTime()) {
			foundQuestion = await db.Question.findById(req.params.questionId, {
				source: false,
			}).populate('testcases', '', 'testcase', {isPublic: true})
		}
		console.log(foundQuestion)
		return res.status(200).json(foundQuestion)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const updateQuestion = async (req, res, next) => {
	try {
		const question = await db.Question.findById(req.params.questionId)
		console.log('updating 😁😁', question)
		const isOwner = req.user.id == question.user
		if (!isOwner) {
			return res.status(403).json({error: {message: 'You are not allowed to do that'}})
		}
		if (question.type == 'code') {
			await db.Testcase.deleteMany({_id: {$in: question.testcases}})
		} else await db.QuizOption.deleteMany({_id: {$in: question.options}})
		const {title, body, marks, type, testcases, source, bodyDelta, bodyHTML, options} = req.body
		var updatedQuestion = {}
		if (question.type == 'code') {
			updatedQuestion = await db.CodingQuesion.findByIdAndUpdate(question.id, {
				$set: {
					title,
					body,
					bodyDelta,
					bodyHTML,
					marks,
					source,
					type,
					// user: req.user && req.user.id,
					// evaluation: req.params.evaluationId,
				},
				$pullAll: {
					testcases: question.testcases,
				},
			})
			const newTestCases = testcases.map((t) => {
				t.question = updatedQuestion._id
				return t
			})
			const createdTestcases = await db.Testcase.insertMany(newTestCases)
		} else {
			updatedQuestion = await db.ObjectiveQuestion.findByIdAndUpdate(
				question.id,
				{
					$set: {
						body,
					},
					$pullAll: {
						options: question.options,
						correctOptions: question.correctOptions,
					},
				},
				{new: true}
			)
			const newOptions = options.map((o) => {
				o.question = updatedQuestion._id
				return o
			})
			const createdOptions = await db.QuizOption.insertMany(newOptions)
		}
		return res.status(200).json(updatedQuestion)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const deleteQuestion = async (req, res, next) => {
	try {
		const question = await db.Question.findById(req.params.questionId)
		const isOwner = req.user.id == question.user
		if (!isOwner) {
			return res.status(403).json({error: {message: 'You are not allowed to do that'}})
		}
		if (question.type == 'code') {
			await db.Testcase.deleteMany({_id: {$in: question.testcases}})
		} else {
			await db.QuizOption.deleteMany({_id: {$in: question.options}})
		}
		var deletedQuestion = await db.Question.findByIdAndDelete(question.id)
		if (deletedQuestion) return res.status(200).json({message: 'question delted'})
		else return res.status(400).json({error: {message: 'Question not found'}})
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
			user: req.user && req.user.id,
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
			console.log(newOps)
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
const submitAnswer = async (req, res, next) => {
	try {
		const question = await db.Question.findById(req.params.questionId, 'type testcases evaluation')
			.populate('testcases', 'id input output', 'testcase')
			.populate('evaluation', 'startTime endTime', 'evaluation')
			.populate('options', '', 'quizOption')
			.populate('correctOptions', '', 'quizOption')

		var startTime = new Date(question.evaluation.startTime).getTime()
		var endTime = new Date(question.evaluation.endTime).getTime()
		var currentTime = new Date().getTime()
		console.log('😀😀😀😀😀 time is', currentTime)
		console.log('start time', startTime)
		console.log('end time', endTime)
		// console.log(question)
		if (currentTime < startTime || currentTime > endTime)
			return res
				.status(405)
				.json({error: {message: 'Submission not allowed! The evluation is currently closed.'}})
		// const questionType = req.query.type

		if (question.type == 'objective') {
			const {answer: sentAnswer} = req.body
			var score = 0
			// if (question.correctOptions.length === 1)
			// 	score = sentAnswer.option == question.correctOptions[0]._id ? 1 : 0
			// else
			score = question.correctOptions.reduce((score, currOption) => {
				// console.log(currOption)
				// console.log(sentAnswer.options.includes(currOption._id.toString()))
				// console.log(sentAnswer.options)
				// console.log('before', score)
				if (sentAnswer.options.includes(currOption._id.toString())) return 1
				else return score
			}, 0)
			// score = score / question.correctOptions.length
			// score=question.correctOption
			// console.log(question._id, req.user.id)
			console.log('after', score)
			const updatedAnswer = await db.UserAnswer.findOneAndUpdate(
				{question: question._id, user: req.user.id},
				{answer: [...sentAnswer.options], score, user: req.user.id},
				{upsert: true}
			)
			// console.log('score is', score, answer.option, question.correctOptions[0]._id)
			return res.status(200).json(updatedAnswer)
		} else {
			if (question && question.type === 'code') {
				const {source, lang} = req.body

				const {id} = await services.submitAnswer({source, lang, testcases: question.testcases})
				const submission = await db.Submission.create({
					judgeId: id,
					source,
					lang,
					user: req.user && req.user.id,
					question: question.id,
				})
				return res.status(200).json({id: submission.id})
			}
		}
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const submitCb = async (req, res, next) => {
	try {
		console.log('the secret code is', req.query.code)
		console.log('inside submit cb', req.body)
		if (req.query.code !== config.judge.apiKey) {
			return res.sendSatus(403)
		}

		const {id, code, stderr, testcases} = req.body
		const score = testcases && testcases.reduce((acc, cur) => acc + cur.score, 0) / testcases.length
		const time =
			testcases &&
			testcases.reduce((acc, cur) => {
				if (cur.score !== 0) return Math.max(acc, cur)
				else return acc
			}, 0)
		console.log('the score is ', score)
		const topSub = db.Submission.find({})
		// // const output = {id, code, stderr, , time}
		const updatedSubmission = await db.Submission.findOneAndUpdate(
			{judgeId: id, isCompleted: false},
			{isCompleted: true, isSuccessful: !stderr, results: testcases, score, time}
		)
		if (!updatedSubmission) return res.status(404).send({error: {message: 'submission not found'}})
		return res.send({success: true})
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getSubmission = async (req, res, next) => {
	try {
		const submission = await db.Submission.findById(req.params.submissionId)
		if (!submission) return res.status(400).send({error: {message: 'submission not found'}})
		return res.send(submission)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getAllSubmissions = async (req, res, next) => {
	try {
		console.log('inside getallsubmission 😋😋')
		const submissions = await db.Submission.find({
			question: req.params.questionId,
			user: req.user && req.user.id,
		}).sort({createdAt: -1})
		if (submissions) return res.status(200).json(submissions)
		else return res.status(404).json({error: {message: 'Not found'}})
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const getAllTopSubmissions = async (req, res, next) => {
	try {
		const type = req.query.type
		var evaluationId = req.params.evaluationId
		const evaluation = await db.Evaluation.findById(evaluationId, {user: true})
		if (req.user.id != evaluation.user)
			return res.status(401).json({error: {message: 'You are not allowed to do that'}})
		if (type == 'quiz') {
			const questionIdArray = await db.Evaluation.findById(evaluationId, 'questions')
			console.log(questionIdArray)
			const pipeline = [
				{$match: {question: {$in: questionIdArray.questions}}},
				{
					$group: {
						_id: '$user',
						questions: {$push: '$$ROOT'},
						total: {$sum: 1},
					},
				},
				{
					$lookup: {
						from: 'users',
						let: {userId: '$_id'},
						pipeline: [
							{$match: {$expr: {$eq: ['$_id', '$$userId']}}},
							{$project: {password: false, threads: false}},
							{$unwind: '$_id'},
						],
						as: 'user',
					},
				},
				{
					$unwind: {
						path: '$user',
					},
				},
				{
					$sort: {
						'user.name': 1,
					},
				},
			]
			const userAnswers = await db.UserAnswer.aggregate(pipeline)
			// const userAnswers = await db.UserAnswer.find({
			// 	question: {$in: questionIdArray.questions},
			// })
			return res.status(200).json(userAnswers)
		} else {
			const pipeline = [
				{
					$match: {
						isTopSubmission: true,
					},
				},
				{
					$lookup: {
						from: 'questions',
						let: {questionId: '$question'},
						pipeline: [
							{$match: {$expr: {$eq: ['$_id', '$$questionId']}}},
							{$project: {evaluation: true, createdAt: true}},
							{$unwind: '$_id'},
						],
						as: 'question',
					},
				},
				{
					$unwind: {
						path: '$question',
					},
				},
				{
					$sort: {
						'question.createdAt': 1,
					},
				},
				{
					$group: {
						_id: '$user',
						questions: {$push: '$$ROOT'},
						total: {$sum: 1},
					},
				},
				{
					$lookup: {
						from: 'users',
						let: {userId: '$_id'},
						pipeline: [
							{$match: {$expr: {$eq: ['$_id', '$$userId']}}},
							{$project: {password: false, threads: false}},
							{$unwind: '$_id'},
						],
						as: 'user',
					},
				},
				{
					$unwind: {
						path: '$user',
					},
				},
				{
					$sort: {
						'user.name': 1,
					},
				},
			]
			const submissions = await db.Submission.aggregate(pipeline)
			if (!submissions) return res.status(200).json({error: {message: 'Submissions not found'}})
			res.status(200).json(submissions)
		}
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getEvaluationDetails = async (req, res, next) => {
	try {
		const foundEvaluation = await db.Evaluation.findById(req.params.evaluationId, {
			questions: false,
			isEvaluated: false,
		})
		if (!foundEvaluation)
			return res.status(404).json({error: {message: 'Evaluation data not found'}})
		return res.status(200).json(foundEvaluation)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getUserAnswers = async (req, res, next) => {
	try {
		const foundEvaluation = await db.Evaluation.findById(req.params.evaluationId, {
			isEvaluated: false,
		})
		if (!foundEvaluation)
			return res.status(404).json({error: {message: 'Evaluation data not found'}})
		const userAnswers = await db.UserAnswer.find({
			user: req.user.id,
			question: {$in: foundEvaluation.questions},
		})
		console.log('the user answer are ', userAnswers)
		return res.status(200).json(userAnswers)
	} catch (err) {
		console.error(err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
module.exports = {
	createEvaluation,
	updateEvaluation,
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
	submitAnswer,
	submitCb,
	getSubmission,
	getAllSubmissions,
	getAllTopSubmissions,
	getEvaluationDetails,
	getUserAnswers,
}
