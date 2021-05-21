import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch, useParams, useRouteMatch} from 'react-router'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import {apiCall} from '../../services/api'
import {setLanguages} from '../../store/actions/editor'
import {getCurrentUser} from '../../store/selectors/user'
import AddEvaluation from './AddEvaluation'
import AddCodeQuestion from './AddCodeQuestion'
import EvaluationResultList from './EvaluationResultList'
import EvaluationsList from './EvaluationsList'
import Question from './Question'
import QuestionList from './QuestionList'
import SubmissionResultList from './SubmissionResultList'

function Evaluation({type}) {
	const {path, url} = useRouteMatch()
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser)
	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await apiCall('get', '/api/oj/langs')
				console.log('hello', data)
				if (data) {
					dispatch(
						setLanguages(
							data.reduce((langs, lang) => {
								langs[lang.langCode] = lang
								return langs
							}, {})
						)
					)
				}
			} catch (error) {}
		}
		fetch()
	}, [])

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
					path={`/evaluations/:evaluationId/questions/new`}
					componentProps={{type: 'Add'}}
					component={AddCodeQuestion}
				/>
				<ProtectedRoute
					currentUser={currentUser}
					role='staff'
					exact
					path={`${path}/:evaluationId/questions/:questionId/edit`}
					componentProps={{type: 'Edit'}}
					component={AddCodeQuestion}
				/>
				<Route exact path={`${path}/:evaluationId/questions/:questionId`} component={Question} />
				<Route
					exact
					path={`${path}/:evaluationId/questions/:questionId/submissions`}
					component={SubmissionResultList}
				/>
				<Route path={`${path}/:evaluationId/submissions`} component={EvaluationResultList} />
			</Switch>
			{/* <EvaluationsList/> */}
		</div>
	)
}

export default Evaluation
