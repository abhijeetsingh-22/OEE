const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    title: {type: String},
    startTime: {type: Date, required: true},
    endTime: {type: Date},
    body: {type: String},
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    marks: {type: String},
    questions: {type: [mongoose.Types.ObjectId], ref: 'question'},
    isEvaluated: {type: Boolean, default: false},
  },
  {timestamps: true}
);

const Evaluation = mongoose.model('evaluation', evaluationSchema);
module.exports = Evaluation;
