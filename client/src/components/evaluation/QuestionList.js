import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import {useSelector} from 'react-redux'
import {useParams, useRouteMatch} from 'react-router'
import {Link} from 'react-router-dom'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import {apiCall} from '../../services/api'
import {getCurrentUser} from '../../store/selectors/user'
import Spinner from '../common/Spinner'

function QuestionList() {
	const {evaluationId} = useParams()
	const {path, url} = useRouteMatch()
	const [questions, setQuestions] = useState([])
	const currentUser = useSelector(getCurrentUser)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
			const data = await apiCall('get', `/api/evaluation/${evaluationId}`)
			console.log(data)
			if (!data.error) {
				setQuestions(data)
				setLoading(false)
			}
		}
		fetchData()
	}, [evaluationId])
	const questionView = questions.map((question, idx) => {
		return (
			<div className='card'>
				{/* <img src="..." className="card-img-top" alt="..."> */}
				<div className='card-body'>
					{question.type === 'code' ? (
						<div>
							<Link to={`${url}/questions/${question.id}`} className='text-decoration-none'>
								<h5 className='card-title mb-0'>
									{' '}
									Q{idx + 1}. {question.title.substring(0, 100)}
								</h5>
							</Link>
							<p className='mt-2 '>{question.body.substring(0, 500)}</p>
						</div>
					) : (
						<Link to={`${url}/questions/${question.id}`} className='text-decoration-none'>
							<h5 className='card-title mb-0'>
								{' '}
								Q{idx + 1}. {question.body.substring(0, 100)}
							</h5>
						</Link>
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
					<Link to={`${url}/questions/new`} className=' btn btn-primary '>
						Add new question
					</Link>
				)}
			</div>
			{questionView}
		</div>
	)
}

export default QuestionList
