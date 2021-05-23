const mongoose = require('mongoose');

const evaluationResultSchema = new mongoose.Schema({
  evaluation: {type: mongoose.Types.ObjectId, ref: 'evaluation', required: true},
  user: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
  answers: {type: [mongoose.Types.ObjectId], ref: 'useranswer'},
  Result: {type: String},
  Score: {type: String, default: '0'},
});

const EvaluationResult = mongoose.model('evaluationResult',evaluationResultSchema);
module.exports=EvaluationResult
