import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {apiCall} from '../../../services/api'
import QuizInputForm from './QuizInputForm'

function AddQuizQuestionForm() {
	const {evaluationId} = useParams()
	const history = useHistory()

	const onSubmit = (data) => {
		apiCall('post', `/api/evaluation/${evaluationId}/question`, data).then((data) =>
			history.push(`/quiz/${evaluationId}`)
		)
	}

	return <QuizInputForm title='Add Question' onSubmit={onSubmit} questionBody='' />
}

export default AddQuizQuestionForm
