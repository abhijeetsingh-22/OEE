require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const busboy = require('connect-busboy')
const authRoutes = require('./routes/auth')
const {setAuthUser} = require('./middleware/auth')
const categoryRoutes = require('./routes/category')
const threadRoutes = require('./routes/thread')
const postRoutes = require('./routes/post')
const TagRoutes = require('./routes/tag')
const ojRoutes = require('./routes/oj')
const cors = require('cors')
const runSubmission = require('./handlers/oj')
const {runTestcasesCb, submitCb} = require('./handlers/evaluation')
const evaluationRoutes = require('./routes/evaluation')
const quizRoutes = require('./routes/quiz')
const fileRoutes = require('./routes/file')
const folderRoutes = require('./routes/folder')

const app = express()

// view engine setup
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
	busboy({
		highWaterMark: 2 * 1024 * 1024,
	})
)

app.get('/test', (req, res) => {
	res.send('welcome to oee server')
})
app.use('/api/auth', authRoutes)
app.post('/api/oj/run/cb', runSubmission.done) // seprated from oj routes to make accessible with OJ api key
app.post('/api/oj/runtestcases/cb', runTestcasesCb)
app.post('/api/oj/submit/cb', submitCb)
app.use(setAuthUser)
app.use('/api/forum/categories', categoryRoutes)
app.use('/api/forum', threadRoutes)
app.use('/api/forum', postRoutes)
app.use('/api/forum/tags', TagRoutes)
app.use('/api/oj', ojRoutes)
app.use('/api/evaluation', evaluationRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/drive/file', fileRoutes)
app.use('/api/drive/folder', folderRoutes)
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
