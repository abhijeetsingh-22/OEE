const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema(
  {
    question: {type: mongoose.Types.ObjectId, ref: 'question'},
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
  },
  {timestamps: true, discriminatorKey: 'type'}
);

const userCodeAnswerSchema = new mongoose.Schema({
  source: {type: String},
});
const userObjectiveAnsSchema = new mongoose.Schema({
  answer: {type: mongoose.Types.ObjectId, ref: 'quizOption'},
});

const UserAnswer = mongoose.model('userAnswer', userAnswerSchema);
const UserCodeAnswer = UserAnswer.discriminator(
  'codeAnswer',
  userCodeAnswerSchema,
  'code'
);
const UserObjectiAnswer = UserAnswer.discriminator(
  'objectiveAnswer',
  userObjectiveAnsSchema,
  'objective'
);
module.exports = {UserAnswer, UserCodeAnswer, UserObjectiAnswer};
