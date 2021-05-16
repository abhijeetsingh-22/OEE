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
	getAllTopSubmissions,
	getEvaluationDetails,
} = require('../handlers/evaluation')
const {isStaffUser} = require('../middleware/auth')

router.post('/', isStaffUser, createEvaluation)
router.get('/', getAllEvaluations)
// router.get('/:evaluationId', getQuestion);
// router.post('/:evaluationId/question/objective', createObjectiveQuestion);
// router.post('/:evaluationId/question/code', createCodeQuestion);

//create a new question under evaluationId
router.post('/:evaluationId/question', isStaffUser, createQuestion)
router.put('/questions/:questionId', isStaffUser, updateQuestion)
router.delete('/questions/:questionId', isStaffUser, deleteQuestion)

// Get ouput for each testcase
router.post('/runtestcases', runTestcases)
router.post('/runtestcases/cb', runTestcasesCb)

//get question by evaluationId and order
router.get('/:evaluationId/questions', getAllQuestions)
//get evaluation details by evaluation id
router.get('/:evaluationId', getEvaluationDetails)
router.get('/questions/:questionId', getQuestion)

// route to submit the answer of the questions
router.post('/questions/:questionId', submitAnswer)

//get submission by id
router.get('/submissions/:submissionId', getSubmission)
//get all submissions for a question by user
router.get('/questions/:questionId/submissions', getAllSubmissions)

//get evaluation result for all students  (staff only route)
router.get('/:evaluationId/submissions', isStaffUser, getAllTopSubmissions)

// router.post('/questions/:questionId', submitAnswer)

module.exports = router
