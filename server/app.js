require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const authRoutes = require('./routes/auth')
const {setAuthUser} = require('./middleware/auth')
const categoryRoutes = require('./routes/category')
const threadRoutes = require('./routes/thread')
const postRoutes = require('./routes/post')
const TagRoutes = require('./routes/tag')
const ojRoutes = require('./routes/oj')
const cors = require('cors')
const submission = require('./handlers/oj')
const {runTestcasesCb} = require('./handlers/evaluation')
const evaluationRoutes = require('./routes/evaluation')

const app = express()

// view engine setup
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/test', (req, res) => {
	res.send('welcome to oee server')
})
app.use('/api/auth', authRoutes)
app.post('/api/oj/run/cb', submission.done) // seprated from oj routes to make accessible with OJ api key
app.post('/api/oj/runtestcases/cb', runTestcasesCb)
app.use(setAuthUser)
app.use('/api/forum/categories', categoryRoutes)
app.use('/api/forum', threadRoutes)
app.use('/api/forum', postRoutes)
app.use('/api/forum/tags', TagRoutes)
app.use('/api/oj', ojRoutes)
app.use('/api/evaluation', evaluationRoutes)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// returns the error message
	res
		.status(err.status || 500)
		.json({error: {message: err.message || 'Oops!! Something went wrong try again'}})
})

module.exports = app
