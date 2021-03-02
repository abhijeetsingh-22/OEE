require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {User} = require('./models');
const authRoutes = require('./routes/auth');
const {setAuthUser} = require('./middleware/auth');
const categoryRoutes = require('./routes/category');
const threadRoutes = require('./routes/thread');
const postRoutes = require('./routes/post');
const TagRoutes = require('./routes/tag');
const cors = require('cors');

const app = express();

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use(setAuthUser);
app.use('/api/forum/categories', categoryRoutes);
app.use('/api/forum', threadRoutes);
app.use('/api/forum', postRoutes);
app.use('/api/forum/tags', TagRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // returns the error message
  res
    .status(err.status || 500)
    .json({error: {message: err.message || 'Oops!! Something went wrong try again'}});
});

module.exports = app;
// export default app
