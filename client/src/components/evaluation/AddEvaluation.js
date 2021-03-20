import React, {useState} from 'react'
import {useHistory} from 'react-router'
import {apiCall} from '../../services/api'
// title: {type: String},
//     startTime: {type: Date, required: true},
//     endTime: {type: Date},
//     body: {type: String},
//     user: {type: mongoose.Types.ObjectId, ref: 'user'},
//     marks: {type: String},
//     questions: {type: [mongoose.Types.ObjectId], ref: 'question'},
//     isEvaluated: {type: Boolean, default: false},
function AddEvaluation() {
	const [title, setTitle] = useState('')
	const [startTime, setStartTime] = useState(0)
	const [endTime, setEndTime] = useState(0)
	const [body, setBody] = useState('')
	const history = useHistory()
	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {title, body, startTime, endTime}
		console.log(data)
		apiCall('post', '/api/evaluation', data)
			.then((res) => history.push(`/evaluation/${res.id}`))
			.catch((err) => console.log(err))
	}
	return (
		<div className='row align-items-center justify-content-center mx-5 '>
			{/* <div className=''> */}
			<h3 className='text-center mb-3  '>Enter Evaluation Details</h3>
			<div className='mb-3 col-12 col-md-12 col-lg-10'>
				<label htmlFor='question-title' className='form-label'>
					Title
				</label>
				<input
					type='email'
					className='form-control'
					id='question-title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					placeholder='e.g. DSA Lab Evaluation 1'
				/>
			</div>
			{/* <div className='col-12 col-md-10 col-lg-8 mb-3'>
				<label htmlFor='question-title' className='form-label mb-0'>
					Tags
				</label>
				<div className='form-text mt-0 mb-2'>
					Add up to 5 tags to describe what your question is about
				</div>
			</div> */}

			<div className='mb-3 col-12 col-md-12 col-lg-10'>
				<label htmlFor='question-body' className='form-label'>
					Body
				</label>
				<textarea
					className='form-control'
					id='question-body'
					name='body'
					rows='5'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				></textarea>
			</div>
			<div className='mb-3 col-12 col-md-5 col-lg-5'>
				<label htmlFor='question-startTime' className='form-label'>
					Start Time
				</label>
				<input
					className='form-control'
					type='datetime-local'
					id='question-startTime'
					name='startTime'
					value={startTime}
					onChange={(e) => {
						if (endTime !== 0 && e.target.value > endTime)
							alert('Start time should be smaller than end time')
						else setStartTime(e.target.value)
					}}
					required
				/>
			</div>
			<div className='mb-3 col-12 col-md-5 col-lg-5'>
				<label htmlFor='question-endTime' className='form-label'>
					End Time
				</label>
				<input
					className='form-control'
					type='datetime-local'
					id='question-endTime'
					name='endTime'
					value={endTime}
					onChange={(e) => {
						if (startTime !== 0 && e.target.value < startTime)
							alert('End time should be greater than start')
						else setEndTime(e.target.value)
					}}
					required
				/>
			</div>
			<button
				className='btn btn-primary align-self-center col-3 mb-3'
				type='submit'
				onClick={handleSubmit}
			>
				Submit
			</button>
			{/* </div> */}
		</div>
	)
}

export default AddEvaluation
