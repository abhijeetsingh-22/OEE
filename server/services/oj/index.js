const rp = require('request-promise')
const config = require('../../config')

const apiBase = config.judge.apiBase
const uri = (path) => apiBase + path

const runCode = ({source, lang, input}) => {
	return rp({
		method: 'POST',
		uri: uri('/run'),
		json: true,
		headers: {Authorization: `Bearer ${config.judge.apiKey}`},
		body: {
			source,
			lang,
			stdin: input,
			mode: 'callback',
			callback: config.api.apiBase + '/api/oj/run/cb?code=' + config.judge.apiKey,
		},
	})
}
const getTestcasesOutput = ({source, lang, testcases}) => {
	return rp({
		method: 'POST',
		uri: uri('/run/testcases'),
		json: true,
		headers: {Authorization: `Bearer ${config.judge.apiKey}`},
		body: {
			source,
			lang,
			testcases,
			mode: 'callback',
			callback: config.api.apiBase + '/api/oj/runtestcases/cb?code=' + config.judge.apiKey,
		},
	})
}
const submitAnswer = ({source, lang, testcases}) => {
	return rp({
		method: 'POST',
		uri: uri('/submit'),
		json: true,
		headers: {Authorization: `Bearer ${config.judge.apiKey}`},
		body: {
			source,
			lang,
			testcases,
			mode: 'callback',
			callback: config.api.apiBase + '/api/oj/submit/cb?code=' + config.judge.apiKey,
		},
	})
}
const getLangs = () => {
	return rp({
		uri: uri('/langs'),
		json: true,
		headers: {
			Authorization: `Bearer ${config.judge.apiKey}`,
		},
	})
}
module.exports = {runCode, getLangs, getTestcasesOutput, submitAnswer}
