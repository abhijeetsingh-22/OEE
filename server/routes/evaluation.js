const router = require('express').Router()
const {
	createEvaluation,
	getAllEvaluations,
	getAllQuestions,
	createCodeQuestion,
	createObjectiveQuestion,
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestion,
	runTestcases,
	runTestcasesCb,
	submitAnswer,
	getSubmission,
	getAllSubmissions,
} = require('../handlers/evaluation')
const {isStaffUser} = require('../middleware/auth')

router.post('/', isStaffUser, createEvaluation)
router.get('/', getAllEvaluations)
// router.get('/:evaluationId', getQuestion);
// router.post('/:evaluationId/question/objective', createObjectiveQuestion);
// router.post('/:evaluationId/question/code', createCodeQuestion);

//create a new question under evaluationId
router.post('/:evaluationId/question', createQuestion)
router.put('/question/:questionId', updateQuestion)
router.delete('/question/:questionId', deleteQuestion)

// Get ouput for each testcase
router.post('/runtestcases', runTestcases)
router.post('/runtestcases/cb', runTestcasesCb)

//get question by evaluationId and order
router.get('/:evaluationId', getAllQuestions)
router.get('/questions/:questionId', getQuestion)

// route to submit the answer of the questions
router.post('/questions/:questionId', submitAnswer)

//get submission by id
router.get('/submissions/:submissionId', getSubmission)
//get all for a question
router.get('/questions/:questionId/submissions', getAllSubmissions)

// router.post('/questions/:questionId', submitAnswer)

module.exports = router
