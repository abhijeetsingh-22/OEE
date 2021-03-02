const db = require('../models');

const createTag = async (req, res, next) => {
  try {
    const {title} = req.body;
    const newTag = await db.Tag.create({title});
    // const foundCategory = await db.Category.findById(category.id)
    //   .populate('user', {email: true, name: true})
    //   .exec();
    console.log('happy to be here 🤦‍♂️🤦‍♂️', newTag);
    return res.status(200).json(newTag);
  } catch (err) {
    return next(err);
  }
};

const getAllTags = async (req, res, next) => {
  try {
    // let foundTags = await db.Tag.find();
    var pipeline = [
      {$match: {}},
      {
        $lookup: {
          from: 'threads',
          let: {tagId: '$_id'},
          pipeline: [
            {$match: {$expr: {$in: ['$$tagId', '$tags']}}},
            {$project: {_id: 0, title: 1}},
            // {$group: {_id: '$title', count: {$sum: 1}}},
            // {$count: 'title'},
          ],
          as: 'questionCount',
        },
      },
      {$addFields: {questionCount: {$size: '$questionCount'}, id: '$_id'}},
    ];
    var foundTags = await db.Tag.aggregate(pipeline);
    console.log('the agg is ', foundTags);
    var response = [];
    // console.log(foundTags.map((tag) => response.push(tag.toObject({virtuals: true}))));
    return res.status(200).json(foundTags);
  } catch (err) {
    console.error('error 🚫👨‍🚫 ', err);
    next({status: 400, message: 'Oops!! Something went wrong'});
  }
};

const getTag = async (req, res, next) => {
  try {
    let foundTag = await db.Tag.findById(req.params.id);
    return res.status(200).json(foundTag);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

module.exports = {createTag, getAllTags, getTag};
