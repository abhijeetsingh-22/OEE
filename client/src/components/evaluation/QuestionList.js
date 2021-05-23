import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import {useSelector} from 'react-redux'
import {useParams, useRouteMatch} from 'react-router'
import {Link} from 'react-router-dom'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import {apiCall} from '../../services/api'
import {getCurrentUser} from '../../store/selectors/user'
import Spinner from '../common/Spinner'
import OptionView from './OptionView'

function QuestionList() {
	const {evaluationId} = useParams()
	const {path, url} = useRouteMatch()
	const [questions, setQuestions] = useState([])
	const [evaluation, setEvaluation] = useState({})
	const currentUser = useSelector(getCurrentUser)
	const [loading, setLoading] = useState(true)
	const [isEvaluationActive, setIsEvaluationActive] = useState(true)
	const [userAnswers, setUserAnswers] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const evaluationData = await apiCall('get', `/api/evaluation/${evaluationId}`)
			var startTime = new Date(evaluationData.startTime).getTime()
			var endTime = new Date(evaluationData.endTime).getTime()
			var currentTime = new Date().getTime()
			console.log('time', evaluationData)
			setEvaluation(evaluationData)
			if (
				evaluationData.user === currentUser.user.id ||
				(startTime < currentTime && currentTime < endTime)
			) {
				const questionData = await apiCall('get', `/api/evaluation/${evaluationId}/questions`)
				console.log(questionData)
				const userAnswerData = await apiCall('get', `/api/evaluation/${evaluationId}/answers`)
				console.log('useranswer', userAnswerData)
				setUserAnswers(userAnswerData)
				if (!questionData.error) {
					setQuestions(questionData)
				}
			} else setIsEvaluationActive(false)

			setLoading(false)
		}
		fetchData()
	}, [evaluationId])
	if (!isEvaluationActive) {
		var startTime = new Date(evaluation.startTime)
		var endTime = new Date(evaluation.endTime)
		var currentTime = new Date()
		var closeReason = ''
		if (currentTime < endTime)
			closeReason = `This evaluation is currently closed it opens on ${startTime}`
		else closeReason = `This evaluation is closed on ${endTime.toLocaleString()}`

		return (
			<div className='text-center'>
				<h2 className='mb-5'>{evaluation.title}</h2>
				<p> {closeReason}</p>
				<p>
					Time limit : <Moment from={startTime}>{endTime}</Moment>
				</p>
			</div>
		)
	}
	const questionView = questions.map((question, idx) => {
		return (
			<div className='card'>
				{/* <img src="..." className="card-img-top" alt="..."> */}
				<div className='card-body'>
					{question.type === 'code' ? (
						<div className='row'>
							<div className='col'>
								<Link to={`${url}/questions/${question.id}`} className='text-decoration-none'>
									<h5 className='card-title mb-0'>
										Q{idx + 1}. {question.title.substring(0, 100)}
									</h5>
								</Link>
								<p className='mt-2 '>{question.body.substring(0, 500)}</p>
							</div>
							{currentUser.user.id === question.user && (
								<div className='col-1'>
									<Link
										to={`${url}/questions/${question.id}/edit`}
										className='btn btn-sm btn-warning w-100 mb-2'
									>
										Edit
									</Link>
									<button
										onClick={async (e) => {
											e.preventDefault()
											await apiCall('delete', `/api/evaluation/questions/${question.id}`)
											window.location.reload()
										}}
										className='btn btn-sm btn-danger w-100'
									>
										Delete
									</button>
								</div>
							)}
						</div>
					) : (
						<div className='row'>
							<div className='col'>
								<a className='text-decoration-none'>
									<h5 className='card-title mb-2'>
										Q{idx + 1}. {question.body}
									</h5>
								</a>
								<OptionView question={question} options={question.options || []} />
							</div>
							{currentUser.user.id === question.user && (
								<div className='col-1'>
									<Link
										to={`${url}/questions/${question.id}/edit`}
										className='btn btn-sm btn-warning w-100 mb-2'
									>
										Edit
									</Link>
									<button
										onClick={async (e) => {
											e.preventDefault()
											await apiCall('delete', `/api/evaluation/questions/${question.id}`)
											window.location.reload()
										}}
										className='btn btn-sm btn-danger w-100'
									>
										Delete
									</button>
								</div>
							)}
						</div>
					)}
					{/* <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div> */}
					{/* <p className='card-text'>
            Q{idx + 1}. {question.body.substring(0, 100)}
          </p> */}
					<div className='d-flex '>
						{/* <span className='badge bg-secondary me-2 '>
              Starts :-
              <Moment format='DD MMM YYYY hh:mm:A'>{question.startTime}</Moment>
            </span> */}
						{question.endTime && (
							<span className='badge bg-secondary me-2 '>
								Ends :-
								<Moment format='DD MMM YYYY hh:mm:A'>{question.endTime}</Moment>
							</span>
						)}
						{/* {thread.tags.map((tag) => {
            return (
              <Link to={`/forum/questions/tagged/${tag.title}`}>
                <span className='badge bg-secondary me-2'>{tag.title}</span>
              </Link>
            );
          })} */}
					</div>
				</div>
			</div>
		)
	})
	if (loading) return <Spinner />
	return (
		<div>
			<div className='px-2 mb-2 d-flex justify-content-between'>
				<h3 className=''>Questions</h3>
				{currentUser.user.role === 'staff' && (
					<div>
						<Link to={`${url}/questions/new`} className=' btn btn-primary '>
							Add new question
						</Link>
						<Link to={`${url}/submissions`} className='btn btn-success ms-1'>
							View Submissions
						</Link>
					</div>
				)}
			</div>
			{questionView}
		</div>
	)
}

export default QuestionList
