const db = require('../models');
const {options} = require('../routes/thread');

const createThread = async (req, res, next) => {
  try {
    const {title, body, category, tags} = req.body;
    var ops = [];
    var tagTitleList = [];
    tags.forEach((tag, i) => {
      var title = tag.title.toLowerCase();
      tagTitleList.push(title);
      if (!tag._id) {
        ops.push({
          updateOne: {
            filter: {title},
            update: {$setOnInsert: {title}},
            upsert: true,
          },
        });
      }
    });
    var tagInsertResult = await db.Tag.bulkWrite(ops, {ordered: false});
    var tagList = await db.Tag.find({title: {$in: tagTitleList}});
    var tagIdList = tagList.map((t) => t._id);
    var newThread = await db.Thread.create({
      title,
      body,
      user: req.user.id,
      tags: tagList,
      posts: [],
    });

    return res.status(200).json(newThread);
  } catch (err) {
    console.error('error occured', err);
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

const getThread = async (req, res, next) => {
  try {
    let foundThread = await db.Thread.findById(
      req.params.threadId,
      'body title createdAt'
    )
      .populate('user', 'name email')
      .populate('tags', 'title');

    return res.status(200).json(foundThread);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

const getAllThreads = async (req, res, next) => {
  try {
    let foundThreads = await db.Thread.find()
      .populate('user', 'name email')
      .populate('category', 'title')
      .populate('tags', 'title id');
    return res.status(200).json(foundThreads);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};
const getAllThreadsByCategory = async (req, res, next) => {
  try {
    let foundThreads = await db.Thread.find({category: req.params.categoryId}).populate(
      'user',
      'name email'
    );
    return res.status(200).json(foundThreads);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};
const getThreadsByTag = async (req, res, next) => {
  try {
    // let foundThreads = await db.Thread.find({category: req.params.categoryId}).populate(
    //   'user',
    //   'name email'
    // );
    console.log('😀😀😀');
    var pipeline = [
      {$match: {title: req.params.tag}},
      {
        $lookup: {
          from: 'threads',
          let: {tagId: '$_id'},
          pipeline: [
            {$match: {$expr: {$in: ['$$tagId', '$tags']}}},
            {
              $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tags',
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            {$unwind: '$user'},
          ],
          as: 'questions',
        },
      },
      // {$unwind: ''},
    ];
    let response = await db.Tag.aggregate(pipeline);
    console.log(response);
    return res.status(200).json(response[0]);
  } catch (err) {
    console.error('error occured', err);
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

module.exports = {
  createThread,
  getThread,
  getAllThreads,
  getAllThreadsByCategory,
  getThreadsByTag,
};
