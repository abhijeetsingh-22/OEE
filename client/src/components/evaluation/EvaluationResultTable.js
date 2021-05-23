import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {apiCall} from '../../services/api'
import Spinner from '../common/Spinner'
import {toast} from 'react-toastify'
import ResultsTableView from './ResultsTableView'
function EvaluationResultTable() {
	const {evaluationId} = useParams()
	const [submissions, setSubmissions] = useState([])
	const [evaluation, setEvaluation] = useState([])
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	useEffect(() => {
		const fetch = async () => {
			try {
				const submissionData = await apiCall('get', `/api/evaluation/${evaluationId}/submissions`)
				const evaluationData = await apiCall('get', `/api/evaluation/${evaluationId}/questions`)
				console.log('return data', evaluationData)
				console.log('return data 2', submissionData)
				if (!submissionData.error && !evaluationData.error) {
					setSubmissions(submissionData)
					setEvaluation(evaluationData)
					setLoading(false)
				} else {
				}
			} catch (error) {
				history.push('/')
				toast.error(error.message, {position: toast.POSITION.BOTTOM_RIGHT})
			}
		}
		fetch()
	}, [evaluationId])
	if (loading) return <Spinner />
	// console.log("helloj",submissions);

	const tableData = submissions.map((userSub) => {
		var totalScore = 0
		var userScores = evaluation.map((question) => {
			var attempt = userSub.questions.find((sub) => {
				console.log('helloj q', sub)
				return sub.question._id === question._id
			})
			if (!!attempt) {
				totalScore += attempt.score
				return attempt.score
			}
			console.log('helloj', attempt)
			// console.log("hello",attempt,);

			return 'NA'
		})
		const qData = userScores.reduce((res, curr, idx) => {
			return {...res, [`q${idx + 1}`]: curr}
		}, {})
		totalScore /= evaluation.length
		const res = {username: userSub.user.name, scores: userScores, totalScore, ...qData}
		return res
	})
	console.log('table data is ', tableData)
	// evaluation.map(question=>{
	// 	var userSub=submissions.map(sub=>{
	// 		return sub
	// 	})
	// 	return <p>{question.id}</p>
	// })

	// return <div>
	// 	{JSON.stringify(submissions)}
	// ============================================
	// 	{JSON.stringify(evaluation)}
	// 	{userResultView}
	// </div>
	return (
		<div>
			<ResultsTableView tableData={tableData} maxMarks={100} />
		</div>
	)
}

export default EvaluationResultTable
