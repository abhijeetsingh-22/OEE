import React from 'react'

function AddQuizOptions({options, setOptions}) {
	const addNewOption = (e) => {
		e.preventDefault()
		setOptions((prev) => {
			const newOption = {body: '', isCorrect: false}
			return [...prev, newOption]
		})
	}
	console.log('render', !!options[0]?.isCorrect)
	const handleRemove = (e, idx) => {
		e.preventDefault()
		setOptions((prev) => {
			var newState = [...prev]
			newState.splice(idx, 1)
			console.log('opt', idx, newState)
			return newState
		})
	}
	const optionView = options.map((option, idx) => {
		return (
			<div className='row mb-2 m-2 justify-content-around' key={idx}>
				<div className='col-5 row'>
					<label htmlFor='option' className='col-sm-2 col-form-label'>
						{idx + 1}.
					</label>
					<div className='col-sm-10'>
						<input
							className='form-control '
							type='text'
							value={option.body}
							onChange={(e) => {
								setOptions((prev) => {
									var newOptions = [...prev]
									newOptions[idx].body = e.target.value
									return newOptions
								})
							}}
						/>
					</div>
				</div>
				<div className='form-check col-3 justify-self-center'>
					<label htmlFor='testcaseType' className='form-check-label'>
						Is Correct
					</label>
					<input
						type='checkbox'
						className='form-check-input'
						id='optionType'
						placeholder='Enter option'
						checked={!!options[idx]?.isCorrect}
						onChange={(e) => {
							setOptions((prev) => {
								var newOptions = [...prev]
								newOptions.forEach((o) => (o.isCorrect = false))
								newOptions[idx].isCorrect = e.target.checked
								console.log('render', newOptions)
								return newOptions
							})
						}}
					></input>
				</div>
				<button className='btn btn-sm btn-danger -auto col-2' onClick={(e) => handleRemove(e, idx)}>
					Remove
				</button>
			</div>
		)
	})
	return (
		<div>
			<div className='bg-dark text-white p-2 fs-6 d-flex mb-3'>
				Options
				<button className='btn btn-sm btn-outline-light ms-auto' onClick={addNewOption}>
					{' '}
					Add +{' '}
				</button>
			</div>
			{optionView}
		</div>
	)
}

export default AddQuizOptions
