import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch, useParams, useRouteMatch} from 'react-router'
import ProtectedRoute from '../../hocs/ProtectedRoute'
import {apiCall} from '../../services/api'
import {setLanguages} from '../../store/actions/editor'
import {getCurrentUser} from '../../store/selectors/user'
import AddEvaluation from './AddEvaluation'
import AddQuestion from './AddQuestion'
import EvaluationsList from './EvaluationsList'
import Question from './Question'
import QuestionList from './QuestionList'
import SubmissionResultList from './SubmissionResultList'

function Evaluation() {
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
				<Route exact path={path + '/'} component={EvaluationsList} />
				<ProtectedRoute
					currentUser={currentUser}
					role={'staff'}
					exact
					path={`${path}/new`}
					component={AddEvaluation}
				/>
				<Route exact path={`${path}/:evaluationId`} component={QuestionList} />
				<ProtectedRoute
					currentUser={currentUser}
					role='staff'
					exact
					path={`${path}/:evaluationId/questions/new`}
					component={AddQuestion}
				/>
				<Route exact path={`${path}/:evaluationId/questions/:questionId`} component={Question} />
				<Route
					exact
					path={`${path}/:evaluationId/questions/:questionId/submissions`}
					component={SubmissionResultList}
				/>
			</Switch>
			{/* <EvaluationsList/> */}
		</div>
	)
}

export default Evaluation