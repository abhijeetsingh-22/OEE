const db = require('../models')
const config = require('../config')
const services = require('../services/oj/')

const runCode = async (req, res, next) => {
	try {
		const {source, lang, input} = req.body
		console.log('inside run post😀😀😀😀')
		if (!source) return res.status(400).send({error: {message: 'source is required'}})
		if (!lang) return res.status(400).send({error: {message: 'lang is required'}})

		const {id} = await services.runCode({source, lang, input})
		await db.RunRequest.create({
			judgeId: id,
			user: req.user && req.user.id,
		})
		res.send({id})
	} catch (err) {
		console.error('error occured', err)
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const getSubId = async (req, res, next) => {
	try {
		const submission = await db.RunRequest.findOne({judgeId: req.params.submissionId})
		if (!submission) return res.status(404).send({error: {message: 'Submission not found'}})
		res.send(submission)
	} catch (err) {
		console.error('error occured')
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}

const done = async (req, res, next) => {
	try {
		console.log('the secret code is', req.query.code)
		if (req.query.code !== config.judge.apiKey) {
			return res.sendSatus(403)
		}
		const {id, code, stderr, stdout, time} = req.body
		const output = {id, code, stderr, stdout, time}
		const updatedSubmission = await db.RunRequest.findOneAndUpdate(
			{judgeId: id, isCompleted: false},
			{isCompleted: true, isSuccessful: !stderr, results: output}
		)
		if (!updatedSubmission) return res.status(404).send({error: {message: 'submission not found'}})
		return res.send({success: true})
	} catch (err) {
		console.error('error occured')
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
const fetchLangs = async (req, res, next) => {
	try {
		const langs = await services.getLangs()
		if (langs) {
			return res.status(200).json(langs)
		}
	} catch (err) {
		console.error('error occured')
		next({status: 400, message: 'Oops !! Something went wrong.'})
	}
}
module.exports = {runCode, getSubId, done, fetchLangs}
