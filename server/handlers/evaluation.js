const db = require('../models');
const services = require('../services/oj');

const createEvaluation = async (req, res, next) => {
  try {
    //req.body={title,startTime,endTime,description,}
    const evaluation = await db.Evaluation.create({...req.body, user: req.user.id});
    console.log('happy to be here 🤦‍♂️🤦‍♂️', req.user);
    return res.status(200).json(evaluation);
  } catch (err) {
    return next(err);
  }
};

const getAllEvaluations = async (req, res, next) => {
  try {
    let foundEvaluations = await db.Evaluation.find({});
    return res.status(200).json(foundEvaluations);
  } catch (err) {
    console.error('error 🚫👨‍🚫 ', err);
    next({status: 400, message: 'Oops!! Something went wrong'});
  }
};

const getQuestion = async (req, res, next) => {
  try {
    const questionNumber = req.query.questionNumber || 1;
    let foundQuesion = await db.Question.find({
      questionId: req.params.questionId,
      order: questionNumber,
    });
    return res.status(200).json(foundQuesion);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};
const createObjectiveQuestion = async (req, res, next) => {
  try {
    const {
      body,
      marks,
      order,
      type,
      testcases,
      correctOption,
      options,
      source,
      lang,
    } = req.body;

    const createdQuestion = await db.Question.create({
      body,
      marks,
      type,
      order,

      evaluation: req.params.evaluationId,
    });
    if (type === 'objective') {
      const newOps = options.map((o) => {
        o.question = createdQuestion._id;
        return o;
      });
      const createdOptions = await db.QuizOption.insertMany(newOps);
    } else {
      await services.getTestcaseOutput({source, lang, testcases});
    }
    return res.json({createdOptions, createdQuestion});
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};
const createCodeQuestion = async (req, res, next) => {
  try {
    const {body, marks, type, order, testcases, source} = req.body;
    const createdQuestion = await db.Question.create({
      body,
      marks,
      type,
      order,
      source,
      evaluation: req.params.evaluationId,
    });
    const newTestCases = testcases.map((t) => {
      t.question = createdQuestion._id;
      return t;
    });
    const createdTestcases = await db.Testcase.insertMany(newTestCases);
    // await db.Question.findOneAndUpdate(
    //   {id: createdQuestion.id, type: 'code'},
    //   {
    //     $push: {testcases: '604bb11fc0b580098ab3bf0e'},
    //     type: 'code',
    //   },
    //   {safe: true, overwriteDiscriminatorKey: true}
    // );
    return res.status(200).json(createdQuestion);
  } catch (err) {
    console.error('error occured', err);
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};
module.exports = {
  createEvaluation,
  getAllEvaluations,
  getQuestion,
  createCodeQuestion,
  createObjectiveQuestion,
};
