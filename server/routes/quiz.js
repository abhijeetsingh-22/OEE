const router = require('express').Router()
const {isStaffUser} = require('../middleware/auth')
const {getAllQuizzes} = require('../handlers/quiz')
const {
	createEvaluation,
	createQuestion,
	updateQuestion,
	deleteQuestion,
} = require('../handlers/evaluation')

router.post('/', isStaffUser, createEvaluation)
router.get('/', getAllQuizzes)

router.post('/:evaluationId/question', createQuestion)
router.put('/questions/:questionId', updateQuestion)
router.delete('/questions/:questionId', deleteQuestion)

// router.post('/questions/:questionId', submitAnswer)

module.exports = router
