import React, {useState} from 'react'

function TestcaseInput({testcases, setTestcases, setIsTestcaseChanged}) {
	// const [testcases, setTestcases] = useState([
	// 	{input: 'test1', output: '', isPublic: false},
	// 	{input: 'test2', output: '', isPublic: true},
	// ])
	const [selectedTestcase, setSelectedTestcase] = useState(0)
	const [running, setRunning] = useState(false)

	const handleInputChange = (e) => {
		// console.log('value', e.target.value)
		// console.log('name', e.target.id)
		if (e.target.id === 'testcaseType') {
			console.log('current value is  ', testcases[selectedTestcase].isPublic)
			setTestcases((prev) => {
				const newState = [...prev]
				newState[selectedTestcase].isPublic = e.target.checked
				console.log('new state', newState[selectedTestcase])
				return newState
			})
		} else {
			setTestcases((prev) => {
				const newState = [...prev]
				setIsTestcaseChanged(true)
				newState[selectedTestcase].input = e.target.value
				console.log(newState[selectedTestcase])
				return newState
			})
		}
	}
	const handleAddTestcase = (e) => {
		setSelectedTestcase(testcases.length)
		setTestcases((prev) => [...prev, {input: '', output: '', isPublic: false}])
	}
	const handleRemoveTestcase = (e) => {
		setTestcases((prev) => {
			const newState = [...prev]
			newState.splice(selectedTestcase, 1)
			setSelectedTestcase(testcases.length - 2)
			return newState
		})
	}

	return (
		<div className='bg-light'>
			<div className='bg-dark text-white p-2 fs-6 d-flex'>
				Testcases{' '}
				<button className='btn btn-sm btn-outline-light ms-auto' onClick={handleAddTestcase}>
					{' '}
					Add +{' '}
				</button>
			</div>
			<div className='row pe-3'>
				<div className='col-3'>
					<ul className='nav nav-tabs flex-column nav-fill'>
						{testcases.map((t, idx) => {
							return (
								<button
									className={`nav-link ${idx === selectedTestcase ? 'active' : ''}`}
									onClick={() => setSelectedTestcase(idx)}
								>
									TestCase {idx + 1}
								</button>
							)
						})}
					</ul>
				</div>
				<div className='col-9 py-3 '>
					<div className='d-flex mb-2'>
						<div className='form-check'>
							<label htmlFor='testcaseType' className='form-check-label'>
								Is Public
							</label>
							<input
								type='checkbox'
								className='form-check-input'
								id='testcaseType'
								checked={testcases[selectedTestcase]?.isPublic}
								onChange={handleInputChange}
							></input>
						</div>
						<button className='btn btn-sm btn-danger ms-auto' onClick={handleRemoveTestcase}>
							Remove
						</button>
					</div>
					<div className='panel-input panel-default'>
						<div className='panel-heading p-2'>
							<span>Input</span>
						</div>
						<textarea
							id='test-input'
							// rows='2'
							disabled={testcases.length <= 0}
							wrap='off'
							placeholder='Enter Input'
							className='textbox w-100'
							onChange={handleInputChange}
							value={testcases?.[selectedTestcase]?.input || ''}
						></textarea>
					</div>
					<div className='panel-output panel-default'>
						<div className='panel-heading p-2'>
							<span>Output</span>
						</div>
						<pre id='output'>
							{Buffer.from(testcases[selectedTestcase]?.output || '', 'base64').toString('ascii')}
						</pre>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestcaseInput
