import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {CSVLink} from 'react-csv'

function ResultsTableView({tableData, maxMarks}) {
	const userResultView = tableData.map((data) => {
		var userScores = data.scores.map((score) => {
			return <td>{score}</td>
		})
		return (
			<tr>
				<td>{data.username}</td>
				{userScores}
				<td>{data.totalScore}</td>
			</tr>
		)
	})
	console.log('table data is ', tableData)
	const quest = tableData[0].scores.map((s, idx) => {
		return {label: `Q.${idx + 1}`, key: `q${idx + 1}`}
	})

	const headers = [
		{label: 'User', key: 'username'},
		...quest,
		{label: `Total ${maxMarks}`, key: 'totalScore'},
	]
	console.log(headers, tableData)

	return (
		<div>
			<div>
				<div className='d-flex justify-content-between align-items-center mt-4 mb-2'>
					<h4 className='mb-0'>Submissions</h4>
					<CSVLink
						data={tableData}
						headers={headers}
						filename='Evaluation Result.csv'
						className='btn btn-sm btn-primary'
					>
						Download xlsx
					</CSVLink>
				</div>
				<table className='table table-bordered text-center'>
					<thead className='table-dark'>
						<tr>
							<th scope='col'>User</th>
							{tableData[0].scores.map((q, idx) => (
								<th scope='col'>Q.{idx + 1}</th>
							))}
							<th>Total ({maxMarks})</th>
						</tr>
					</thead>
					<tbody>{userResultView}</tbody>
				</table>
			</div>
		</div>
	)
}

export default ResultsTableView

// import React, {useEffect, useState} from 'react'
// import {useHistory, useParams} from 'react-router'
// import {apiCall} from '../../services/api'
// import Spinner from '../common/Spinner'
// import {toast} from 'react-toastify'
// function EvaluationResultList() {
// 	const {evaluationId} = useParams()
// 	const [submissions, setSubmissions] = useState([])
// 	const [evaluation, setEvaluation] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const history = useHistory()
// 	useEffect(() => {
// 		const fetch = async () => {
// 			try {
// 				const submissionData = await apiCall('get', `/api/evaluation/${evaluationId}/submissions`)
// 				const evaluationData = await apiCall('get', `/api/evaluation/${evaluationId}/questions`)
// 				console.log('return data', evaluationData)
// 				console.log('return data 2', submissionData)
// 				if (!submissionData.error && !evaluationData.error) {
// 					setSubmissions(submissionData)
// 					setEvaluation(evaluationData)
// 					setLoading(false)
// 				} else {
// 				}
// 			} catch (error) {
// 				history.push('/')
// 				toast.error(error.message, {position: toast.POSITION.BOTTOM_RIGHT})
// 			}
// 		}
// 		fetch()
// 	}, [evaluationId])
// 	if (loading) return <Spinner />
// 	// console.log("helloj",submissions);
// 	const userResultView = submissions.map((userSub) => {
// 		var totalScore = 0
// 		var userScores = evaluation.map((question) => {
// 			var attempt = userSub.questions.find((sub) => {
// 				console.log('helloj q', sub)
// 				return sub.question._id === question._id
// 			})
// 			if (!!attempt) {
// 				totalScore += attempt.score
// 				return <td>{attempt.score}</td>
// 			}
// 			console.log('helloj', attempt)
// 			// console.log("hello",attempt,);

// 			return <td>NA</td>
// 		})
// 		totalScore /= evaluation.length
// 		return (
// 			<tr>
// 				<td>{userSub.user.name}</td>
// 				{userScores}
// 				<td>{totalScore}</td>
// 			</tr>
// 		)
// 	})
// 	// evaluation.map(question=>{
// 	// 	var userSub=submissions.map(sub=>{
// 	// 		return sub
// 	// 	})
// 	// 	return <p>{question.id}</p>
// 	// })

// 	// return <div>
// 	// 	{JSON.stringify(submissions)}
// 	// ============================================
// 	// 	{JSON.stringify(evaluation)}
// 	// 	{userResultView}
// 	// </div>
// 	return (
// 		<div>
// 			<div>
// 				<h4 className='mt-4'>Submissions</h4>
// 				<table className='table table-bordered text-center'>
// 					<thead className='table-dark'>
// 						<tr>
// 							<th scope='col'>User</th>
// 							{evaluation.map((q, idx) => (
// 								<th scope='col'>Q.{idx + 1}</th>
// 							))}
// 							<th>Total (100)</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{userResultView}
// 						{/* <tr className='table-dark'>
// 							<td></td>
// 							<td></td>
// 							<td>Total Score %</td>
// 						</tr> */}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	)
// }

// export default EvaluationResultList
