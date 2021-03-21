import React, {useState, useEffect} from 'react'
import Moment from 'react-moment'
import {useSelector} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {apiCall} from '../../services/api'
import {getCurrentUser} from '../../store/selectors/user'
import Spinner from '../common/Spinner'
function EvaluationsList() {
	const {path, url} = useRouteMatch()
	console.log(path, url)
	const [evaluations, setEvaluations] = useState([])
	const [loading, setLoading] = useState(true)
	const currentUser = useSelector(getCurrentUser)

	useEffect(() => {
		const fetch = async () => {
			const res = await apiCall('get', '/api/evaluation')
			if (!res.error) {
				setEvaluations(res)
				setLoading(false)
			}
		}
		fetch()
		return () => {}
	}, [])

	const evaluationView = evaluations.map((evaluation) => {
		return (
			<div className='card'>
				{/* <img src="..." className="card-img-top" alt="..."> */}
				<div className='card-body'>
					<Link to={`${url}/${evaluation.id}`} className='text-decoration-none'>
						<h5 className='card-title mb-0'>{evaluation.title}</h5>
					</Link>
					{/* <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div> */}
					<p className='card-text'>{evaluation.body.substring(0, 100)}</p>
					<div className='d-flex '>
						<span className='badge bg-secondary me-2 '>
							Starts :-
							<Moment format='DD MMM YYYY hh:mm:A'>{evaluation.startTime}</Moment>
						</span>
						{evaluation.endTime && (
							<span className='badge bg-secondary me-2 '>
								Ends :-
								<Moment format='DD MMM YYYY hh:mm:A'>{evaluation.endTime}</Moment>
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
		<div className=''>
			<div className='d-flex justify-content-between mb-2 p-1'>
				<h3>Evaluations</h3>
				{currentUser.user.role === 'staff' && (
					<Link to='/evaluations/new' className=' btn btn-primary '>
						Create Evaluation
					</Link>
				)}
			</div>
			{evaluationView}
		</div>
	)
}

export default EvaluationsList
