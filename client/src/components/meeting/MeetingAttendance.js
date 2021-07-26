import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {CSVLink} from 'react-csv'
import Moment from 'react-moment'
import {useParams} from 'react-router-dom'
import {apiCall} from '../../services/api'
import Spinner from '../common/Spinner'

function MeetingAttendance() {
	const [attendaceData, setAttendanceData] = useState([])
	const [meeting, setMeeting] = useState(true)
	const [loading, setLoading] = useState(true)
	const {meetingId} = useParams()
	useEffect(() => {
		const fetch = async () => {
			const attendanceRes = await apiCall('get', `/api/meetings/${meetingId}/attendance`)
			setAttendanceData(attendanceRes)
			const meetingRes = await apiCall('get', `/api/meetings/${meetingId}`)
			setMeeting(meetingRes)
			setLoading(false)
		}
		fetch()
	}, [])

	if (loading) return <Spinner />
	const x = new moment(meeting.startTime)
	const y = new moment(meeting.endTime)
	const totalDuration = y.diff(x, 'minutes')
	const tableData = attendaceData.map((d) => {
		const x = moment(d.joiningTime)
		const y = moment()
		const deltaTime = y.diff(x, 'minutes')
		const duration = !!d.joiningTime ? d.duration + deltaTime : d.duration
		return {
			username: d.user.name,
			duration: duration,
			// totalDuration: 100,
			rollNo: d.user.eno || d.user.empid,
		}
	})
	const headers = [
		{label: 'ENo', key: 'rollNo'},
		{label: 'User', key: 'username'},
		{label: `Time attended (${totalDuration} min)`, key: 'duration'},
	]
	console.log(attendaceData)
	const attendaceView = tableData.map((data) => {
		return (
			<tr>
				<td>{data.rollNo}</td>
				<td>{data.username}</td>
				<td>{data.duration}</td>
			</tr>
		)
	})
	return (
		<div>
			<div>
				<div className='d-flex justify-content-between align-items-center mt-4 mb-2'>
					<h4 className='mb-0'>
						Attendance -
						<em>
							{meeting.title} ( <Moment format='DD MMM YYYY hh:mm:A'>{meeting.startTime}</Moment>)
						</em>
					</h4>
					<CSVLink
						data={tableData}
						headers={headers}
						filename={`Attendance -${meeting.title} (${moment(meeting.startTime).format(
							'MMMM Do YYYY, h:mm:ss a'
						)}).csv`}
						className='btn btn-sm btn-primary'
					>
						Download xlsx
					</CSVLink>
				</div>
				<table className='table table-bordered text-center'>
					<thead className='table-dark'>
						<tr>
							<th scope='col'>ENo</th>
							<th scope='col'>User</th>

							<th>Time Attended ({totalDuration} min)</th>
							{/* <th></th> */}
						</tr>
					</thead>
					<tbody>{attendaceView}</tbody>
				</table>
			</div>
		</div>
	)
}

export default MeetingAttendance
