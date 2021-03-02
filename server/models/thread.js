const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    category: {type: mongoose.Schema.ObjectId, ref: 'category'},
    tags: [{type: mongoose.Schema.ObjectId, ref: 'tag'}],
    posts: [{type: mongoose.Schema.ObjectId, ref: 'post'}],
  },
  {timestamps: true}
);

const Thread = mongoose.model('thread', threadSchema);
module.exports = Thread;
