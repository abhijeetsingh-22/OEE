const router = require('express').Router();
const {
  createEvaluation,
  getAllEvaluations,
  getQuestion,
  createCodeQuestion,
  createObjectiveQuestion,
} = require('../handlers/evaluation');
const {isStaffUser} = require('../middleware/auth');

router.post('/', isStaffUser, createEvaluation);
router.get('/', getAllEvaluations);
router.get('/:evaluationId', getQuestion);
router.post('/:evaluationId/question/objective', createObjectiveQuestion);
router.post('/:evaluationId/question/code', createCodeQuestion);

module.exports = router;
