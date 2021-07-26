import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import {getCurrentUser} from '../../store/selectors/user'
import MeetingAttendance from './MeetingAttendance'
import MeetingForm from './MeetingForm'
import MeetingRoom from './MeetingRoom'
import MeetingsList from './MeetingsList'

function Meeting() {
	const {path, url} = useRouteMatch()
	const currentUser = useSelector(getCurrentUser)
	// console.log(path, url)
	return (
		<div>
			<Switch>
				<Route exact path={`${path}`} component={MeetingsList} />
				{/* <Route
					exact
					path='/new'
					render={() => {
						return <MeetingForm />
					}}
				/> */}
				<ProtectedRoute
					currentUser={currentUser}
					role={'staff'}
					exact
					path={`${path}/new`}
					componentProps={{action: 'Create'}}
					component={MeetingForm}
				/>
				<ProtectedRoute
					currentUser={currentUser}
					role={'staff'}
					exact
					path={`${path}/:meetingId/edit`}
					componentProps={{action: 'Update'}}
					component={MeetingForm}
				/>
				<ProtectedRoute
					currentUser={currentUser}
					role={'staff'}
					exact
					path={`${path}/:meetingId/attendance`}
					// componentProps={{action: 'Update'}}
					component={MeetingAttendance}
				/>
				{/* <Route path={`${path}/:meetingId`} component={MeetingRoom} /> */}
			</Switch>
			{/* // <MeetingsList /> */}
		</div>
	)
}

export default Meeting
