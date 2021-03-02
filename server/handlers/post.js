const db = require('../models');

const createPost = async (req, res, next) => {
  try {
    const {body, thread} = req.body;
    let newPost = await db.Post.create({body, thread, user: req.user.id});
    newPost = await newPost.populate('user', 'name').execPopulate();

    await db.Thread.findOneAndUpdate(
      {_id: newPost.thread},
      {$push: {posts: newPost._id}}
    );
    return res.status(200).json(newPost);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

const getAllPostsByThread = async (req, res, next) => {
  try {
    let foundPosts = await db.Post.find({thread: req.params.threadId}).populate(
      'user',
      'name'
    );
    return res.status(200).json(foundPosts);
  } catch (err) {
    console.error('error occured');
    next({status: 400, message: 'Oops !! Something went wrong.'});
  }
};

module.exports = {createPost, getAllPostsByThread};
