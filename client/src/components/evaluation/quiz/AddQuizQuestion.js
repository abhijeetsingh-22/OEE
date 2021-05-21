import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {toast} from 'react-toastify'
import {apiCall} from '../../../services/api'
import AddQuizOptions from './AddQuizOptions'

function AddQuizQuestion() {
	const {evaluationId} = useParams()
	const history = useHistory()
	const [options, setOptions] = useState([])
	const [body, setBody] = useState('')
	const handleSubmit = (e) => {
		e.preventDefault()
		if (options.length <= 0) return toast.error('Please add atleast one option')
		if (options.some((o) => o.body.length <= 0)) return toast.error('Option cannot be blank')
		if (!options.some((o) => o.isCorrect)) return toast.error('Please mark correct answer')
		apiCall('post', `/api/evaluation/${evaluationId}/question`, {
			body,
			options,
			type: 'objective',
		}).then((data) => history.push(`/quiz/${evaluationId}`))
	}

	return (
		<div className='row justify-content-center'>
			<h3 className='text-center'> Add Question</h3>
			<div className='mb-2 col-10'>
				<div className='mb-3'>
					<label htmlFor='questionBody' className='form-label fs-6'>
						Question Body
					</label>
					<textarea
						className='form-control'
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
				<AddQuizOptions options={options} setOptions={setOptions} />
			</div>
			<button className='btn btn-primary col-3 mt-3' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	)
}

export default AddQuizQuestion
