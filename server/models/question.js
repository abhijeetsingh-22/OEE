const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    order: {type: Number},
    body: {type: String},
    marks: {type: String},
    evaluation: {type: mongoose.Types.ObjectId, ref: 'evaluation'},
  },
  {timestamps: true, discriminatorKey: 'type'}
);
const codeSchema = new mongoose.Schema({
  testcases: {type: [mongoose.Types.ObjectId], ref: 'testcase'},
  source: {type: String},
});
const objectiveSchema = new mongoose.Schema({
  correctOption: {type: [mongoose.Types.ObjectId], ref: 'quizOption'},
  options: {type: [mongoose.Types.ObjectId], ref: 'quizOption'},
});
questionSchema.pre('save', async function (next) {
  console.log(this);
  await mongoose
    .model('evaluation')
    .findOneAndUpdate({_id: this.evaluation}, {$push: {questions: this._id}});
  return next();
});
const Question = mongoose.model('question', questionSchema);
const CodingQuesion = Question.discriminator('codeQuestion', codeSchema, 'code');
const ObjectiveQuestion = Question.discriminator(
  'objectiveQuestion',
  objectiveSchema,
  'objective'
);
module.exports = {Question, CodingQuesion, ObjectiveQuestion};
