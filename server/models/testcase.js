const mongoose = require('mongoose');
const testcaseSchema = new mongoose.Schema({
  question: {type: mongoose.Types.ObjectId, ref: 'question', required: true},
  input: {type: String, required: true},
  output: {type: String, required: true},
});
testcaseSchema.post('insertMany', async function (docs, next) {
  const idArray = docs.map((d) => d._id);
  const question = await mongoose.model('codeQuestion').findOneAndUpdate(
    {_id: docs[0].question},
    {
      $push: {testcases: {$each: idArray}},
    },
    {new: true}
  );
});
const Testcase = mongoose.model('testcase', testcaseSchema);
module.exports = Testcase;
