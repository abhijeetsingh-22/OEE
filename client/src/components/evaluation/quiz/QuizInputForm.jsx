import React, {useState} from 'react'
import {toast} from 'react-toastify'
import AddQuizOptions from './AddQuizOptions'

function QuizInputForm({title, questionBody, onSubmit, prevOptions}) {
	// const {evaluationId} = useParams()
	// const history = useHistory()
	const [options, setOptions] = useState(prevOptions || [])
	const [body, setBody] = useState(questionBody)
	const handleSubmit = (e) => {
		e.preventDefault()
		if (options.length <= 0) return toast.error('Please add atleast one option')
		if (options.some((o) => o.body.length <= 0)) return toast.error('Option cannot be blank')
		if (!options.some((o) => o.isCorrect)) return toast.error('Please mark correct answer')
		// apiCall('post', `/api/evaluation/${evaluationId}/question`, {
		// 	body,
		// 	options,
		// 	type: 'objective',
		// }).then((data) => history.push(`/quiz/${evaluationId}`))
		onSubmit({body, options, type: 'objective'})
	}

	return (
		<div className='row justify-content-center'>
			<h3 className='text-center'> {title}</h3>
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

export default QuizInputForm
