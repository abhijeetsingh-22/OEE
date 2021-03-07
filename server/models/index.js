const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI,
  {keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true},
  () => console.log('Database Connected')
);

module.exports = require('./user');
module.exports.Category = require('./category');
module.exports.Thread = require('./thread');
module.exports.Post = require('./post');
module.exports.Tag = require('./tag');
module.exports.Submission = require('./submission');
