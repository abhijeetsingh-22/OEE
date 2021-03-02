const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    count: {type: String},
  },
  {timestamps: true}
);

const Tag = mongoose.model('tag', tagSchema);
module.exports = Tag;
