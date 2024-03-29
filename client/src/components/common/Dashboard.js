import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {Switch, Route, Redirect} from 'react-router-dom'
import Forum from '../forum'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import AddQuestionForm from '../forum/AddQuestionForm'
import Editor from '../oj/Editor'
import Evaluation from '../evaluation'
import PlayGround from '../oj'
import Quiz from '../evaluation/quiz'
import ResourcesDashboard from '../drive'
import Meeting from '../meeting'
const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className='container-fluid'>
				<div className='row'>
					<Sidebar />

					<div className='col-md-9 col-lg-10 ms-sm-auto px-md-4 mt-3'>
						<Switch>
							<Route
								exact
								path='/'
								render={() => (
									<h1 className='col'>
										<Redirect to='/forum' />
									</h1>
								)}
							/>
							<Route exact path='/codeplayground' component={PlayGround} />
							<Route exact path='/forum/ask' component={AddQuestionForm} />
							<Route path='/forum' component={Forum} />
							<Route path='/evaluations' render={() => <Evaluation type='Evaluation' />} />
							<Route path='/quiz' render={() => <Quiz type='Quiz' />} />
							<Route path={['/drive/folders/:folderID', '/drive']} component={ResourcesDashboard} />
							<Route path='/meetings' component={Meeting} />
						</Switch>
						{/* <button
							onClick={(e) => {
								console.log('emitting')
								// socket.emit('answer', 'good answer')
							}}
						>
							Emit event
						</button> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
