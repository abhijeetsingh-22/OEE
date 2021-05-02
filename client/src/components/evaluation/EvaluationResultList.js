import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {apiCall} from '../../services/api'
import Spinner from '../common/Spinner'
import {toast} from 'react-toastify'
function EvaluationResultList() {
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
	const userResultView = submissions.map((userSub) => {
		var totalScore = 0
		var userScores = evaluation.map((question) => {
			var attempt = userSub.questions.find((sub) => {
				console.log('helloj q', sub)
				return sub.question._id === question._id
			})
			if (!!attempt) {
				totalScore += attempt.score
				return <td>{attempt.score}</td>
			}
			console.log('helloj', attempt)
			// console.log("hello",attempt,);

			return <td>NA</td>
		})
		totalScore /= evaluation.length
		return (
			<tr>
				<td>{userSub.user.name}</td>
				{userScores}
				<td>{totalScore}</td>
			</tr>
		)
	})
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
			<div>
				<h4 className='mt-4'>Submissions</h4>
				<table className='table table-bordered text-center'>
					<thead className='table-dark'>
						<tr>
							<th scope='col'>User</th>
							{evaluation.map((q, idx) => (
								<th scope='col'>Q.{idx + 1}</th>
							))}
							<th>Total (100)</th>
						</tr>
					</thead>
					<tbody>
						{userResultView}
						{/* <tr className='table-dark'>
							<td></td>
							<td></td>
							<td>Total Score %</td>
						</tr> */}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default EvaluationResultList
