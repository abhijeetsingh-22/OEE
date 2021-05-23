import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {apiCall} from '../../../services/api'
import Spinner from '../../common/Spinner'
import QuizInputForm from './QuizInputForm'

function UpdateQuizQuestion() {
	const {evaluationId, questionId} = useParams()
	const history = useHistory()
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		apiCall('get', `/api/evaluation/questions/${questionId}?type=edit`).then((response) => {
			setData(response)
			setLoading(false)
		})
	}, [])
	const onSubmit = (data) => {
		apiCall('put', `/api/evaluation/questions/${questionId}`, data).then((data) =>
			history.push(`/quiz/${evaluationId}`)
		)
	}
	if (loading) return <Spinner />
	console.log('data is', data)
	return (
		<QuizInputForm
			title='Edit Question'
			onSubmit={onSubmit}
			questionBody={data.body}
			prevOptions={data.options}
		/>
	)
}

export default UpdateQuizQuestion
