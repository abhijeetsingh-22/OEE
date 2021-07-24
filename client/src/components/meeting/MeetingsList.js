import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import {useSelector} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {apiCall} from '../../services/api'
import {getCurrentUser} from '../../store/selectors/user'
import Spinner from '../common/Spinner'

function MeetingsList() {
	const {path, url} = useRouteMatch()
	console.log('url is ', url, path)
	const [meetings, setMeetings] = useState([])
	const [loading, setLoading] = useState(true)
	const currentUser = useSelector(getCurrentUser)
	useEffect(() => {
		const fetch = async () => {
			apiCall('get', '/api/meetings').then((res) => {
				setMeetings(res)
				setLoading(false)
			})
		}
		fetch()
	}, [])
	const meetingsView = meetings.map((meeting) => {
		return (
			<div className='card'>
				{/* <img src="..." className="card-img-top" alt="..."> */}
				<div className='card-body'>
					<div className='row'>
						<div className='col'>
							<Link to={`${url}/${meeting.id}`} className='text-decoration-none' target='_blank'>
								<h5 className='card-title mb-0'>{meeting.title}</h5>
							</Link>
							{/* <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div> */}
							<p className='card-text'>{meeting.body.substring(0, 100)}</p>
							<div className='d-flex '>
								<span className='badge bg-secondary me-2 '>
									Starts :-
									<Moment format='DD MMM YYYY hh:mm:A'>{meeting.startTime}</Moment>
								</span>
								{meeting.endTime && (
									<span className='badge bg-secondary me-2 '>
										Ends :-
										<Moment format='DD MMM YYYY hh:mm:A'>{meeting.endTime}</Moment>
									</span>
								)}
							</div>
							<div></div>
						</div>
						{currentUser.user.id === meeting.user && (
							<div className='col-1'>
								<Link
									to={`${url}/${meeting.id}/edit`}
									className='btn btn-sm btn-warning w-100 mb-2'
								>
									Edit
								</Link>
								<button
									onClick={async (e) => {
										e.preventDefault()
										await apiCall('delete', `/api/meetings/${meeting.id}`)
										window.location.reload()
									}}
									className='btn btn-sm btn-danger w-100'
								>
									Delete
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	})
	if (loading) return <Spinner />
	return (
		<div className=''>
			<div className='d-flex justify-content-between mb-2 p-1'>
				<h3>Meetings</h3>
				{currentUser.user.role === 'staff' && (
					<Link to={`${url}/new`} className=' btn btn-primary '>
						Schedule Meeting
					</Link>
				)}
			</div>
			{meetingsView}
		</div>
	)
}

export default MeetingsList
