import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {apiCall} from '../../services/api'
import Spinner from '../common/Spinner'
import MeetingRoom from './MeetingRoom'

function MeetingRoomContainer() {
	const history = useHistory()
	const {meetingId} = useParams()
	const [isTimeOk, setIsTimeOk] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		apiCall('get', `/api/meetings/${meetingId}`).then((meeting) => {
			if (new Date(meeting.endTime) < new Date()) {
				history.push('/meetings')
				toast.info('Meeting has ended')
				// window.close('', '_parent')
			} else if (new Date(meeting.startTime) > new Date()) {
				window.close()
				history.push('/meetings')
				toast.info('Meeting not started')
				// e.preventDefault()
			} else {
				console.log('time is in range')
				setIsTimeOk(true)
			}
			setLoading(false)
		})
	}, [])
	if (loading) return <Spinner />
	return isTimeOk && <MeetingRoom />
}

export default MeetingRoomContainer
