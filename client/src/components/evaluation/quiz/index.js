import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import ProtectedRoute from '../../../hocs/ProtectedRoute'
import {getCurrentUser} from '../../../store/selectors/user'
import AddEvaluation from '../AddEvaluation'
import EvaluationsList from '../EvaluationsList'
import QuestionList from '../QuestionList'
import AddQuizQuestion from './AddQuizQuestion'
import QuizResultTable from './QuizResultTable'
import UpdateQuizQuestion from './UpdateQuizQuestion'

function Quiz({type}) {
	const currentUser = useSelector(getCurrentUser)
	const {path, url} = useRouteMatch()
	return (
		<div>
			<Switch>
				<Route exact path={path + '/'} render={() => <EvaluationsList type={type} />} />
				<ProtectedRoute
					currentUser={currentUser}
					role={'staff'}
					exact
					path={`${path}/new`}
					componentProps={{type}}
					component={AddEvaluation}
				/>
				<Route exact path={`${path}/:evaluationId`} component={QuestionList} />
				<ProtectedRoute
					currentUser={currentUser}
					role='staff'
					exact
					path={`${path}/:evaluationId/questions/new`}
					componentProps={{type: 'Add'}}
					component={AddQuizQuestion}
				/>
				<ProtectedRoute
					currentUser={currentUser}
					role='staff'
					exact
					path={`${path}/:evaluationId/questions/:questionId/edit`}
					componentProps={{type: 'Edit'}}
					component={UpdateQuizQuestion}
				/>
				{/*<Route exact path={`${path}/:evaluationId/questions/:questionId`} component={Question} />
				<Route
					exact
					path={`${path}/:evaluationId/questions/:questionId/submissions`}
					component={SubmissionResultList}
				/>*/}
				<Route path={`${path}/:evaluationId/submissions`} component={QuizResultTable} />
			</Switch>
			{/* <EvaluationsList/> */}
		</div>
		// </div>
	)
}

export default Quiz
