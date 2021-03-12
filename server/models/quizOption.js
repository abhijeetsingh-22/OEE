const mongoose = require('mongoose');
const {Question} = require('./question');

const quizOptionSchema = new mongoose.Schema({
  question: {type: mongoose.Types.ObjectId, ref: 'question', required: true},
  body: {type: String, required: true},
});
quizOptionSchema.pre('save', async function (err) {
  const question = await Question.findByIdAndUpdate(
    {id: this.question},
    {$push: {options: this._id}}
  );
});

const QuizOption = mongoose.model('quizOption', quizOptionSchema);
module.exports = QuizOption;
