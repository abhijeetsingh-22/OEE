import React, {useRef, useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useSelector} from 'react-redux'
import {apiCall} from '../../services/api'
import {getCode, getLanguage} from '../../store/selectors/editor'
import Editor from '../oj/Editor'
import TestcaseInput from './TestcaseInput'
import base64 from 'base-64'
import {useHistory, useParams} from 'react-router'

function AddQuestion() {
	const [editorValue, setEditorValue] = useState('')
	const code = useSelector(getCode)
	const language = useSelector(getLanguage)
	const [loading, setLoading] = useState(false)
	const [testcases, setTestcases] = useState([{input: '', output: '', isPublic: false}])
	const [isTestcaseChanged, setIsTestcaseChanged] = useState(true)
	const [title, setTitle] = useState('')
	const {evaluationId} = useParams()
	const history = useHistory()
	const handleBodyChange = (value) => {
		console.log(editorRef.current.getEditor().getContents())
		console.log(editorRef.current.getEditor().getText())
		console.log(value)
		setEditorValue(value)
	}
	const editorRef = useRef(null)
	var toolbarOptions = [
		['bold', 'italic', 'underline'], // toggled buttons
		['code-block'],

		// [{header: 1}, {header: 2}], // custom button values
		[{list: 'ordered'}, {list: 'bullet'}],
		[{script: 'sub'}, {script: 'super'}], // superscript/subscript
		[{header: [1, 2, 3, 4, 5, 6, false]}],
		[{size: ['small', false, 'large', 'huge']}], // custom dropdown

		[{color: []}, {background: []}], // dropdown with defaults from theme
		// [{font: []}],
		[{align: []}],

		// ['clean'], // remove formatting button
	]
	const handleCodeRun = (e) => {
		e.preventDefault()
		console.log('running testcases')
		setLoading(true)
		apiCall('post', '/api/evaluation/runtestcases', {
			source: base64.encode(code),
			lang: language,
			testcases: testcases.map((t, idx) => {
				const newTestcase = {...t, id: idx.toString()}
				newTestcase.input = base64.encode(newTestcase.input)
				return newTestcase
			}),
		}).then((res) => {
			const start = new Date()
			// dispatch(setCodeId(res.id))
			console.log(res)
			const poll = async () => {
				const data = await apiCall('get', `/api/oj/${res.id}`)

				//check for 20sec
				if (!data.isCompleted && new Date() - start <= 20 * 1000)
					return new Promise((resolve) => setTimeout(() => resolve(poll()), 1000))
				setLoading(false)
				if (data.isCompleted) {
					console.log(data)
					setTestcases((prev) => {
						const reduced = data.results.reduce((acc, cur) => {
							acc[cur.id] = cur
							return acc
						}, {})
						console.log('reduced\n', reduced)
						const newState = [...prev]
						newState.forEach((t, idx) => {
							console.log(reduced[idx])
							t.output = reduced[idx].stdout
						})
						return newState
					})
					setIsTestcaseChanged(false)
				}
			}
			return poll()
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const testcasesOutput = testcases.map((t) => {
			const newTestcase = {...t}
			newTestcase.input = base64.encode(t.input)
			return newTestcase
		})
		const opt = {
			title,
			body: editorRef.current.getEditor().getText(),
			bodyHTML: editorValue,
			bodyDelta: JSON.stringify(editorRef.current.getEditor().getContents()),
			testcases: testcasesOutput,
			source: base64.encode(code),
			lang: language,
			type: 'code',
		}
		console.log(opt)
		const data = await apiCall('post', `/api/evaluation/${evaluationId}/question`, opt)
		console.log(data)
		if (!data.error) {
			history.push(`/evaluations/${evaluationId}`)
		}
	}
	return (
		<div className='row justify-content-center'>
			<h3 className='text-center'>Add Question for Evaluation</h3>
			<div className='mb-3 col-10'>
				<label htmlFor='questionTitle' className='form-label'>
					Title
				</label>
				<input
					type='text'
					className='form-control'
					id='questionTitle'
					placeholder='e.g. Invert binary tree'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className='col-10'>
				<label htmlFor='questionBody' className='form-label'>
					Body
				</label>
				<ReactQuill
					id='quillEditor'
					style={{height: '200px'}}
					ref={editorRef}
					scrollingContainer='true'
					value={editorValue}
					onChange={handleBodyChange}
					theme='snow'
					modules={{toolbar: toolbarOptions}}
				/>
			</div>

			<div className='col-10 mt-5 border-0'>
				<ReactQuill
					className='border-0'
					ref={editorRef}
					value={editorValue}
					readOnly={true}
					theme='snow'
					modules={{toolbar: null}}
				/>
			</div>
			<div className='col-10 mt-5'>
				<TestcaseInput
					testcases={testcases}
					setTestcases={setTestcases}
					setIsTestcaseChanged={setIsTestcaseChanged}
				/>
			</div>
			<div className='col-10 mt-2'>
				<label htmlFor='questionCode' className='form-label'>
					Solution Code
				</label>
				<Editor handleRun={handleCodeRun} loading={loading} isToolbarOnTop={false} />
			</div>
			<div className='col-md-10 d-flex justify-content-center my-4 '>
				{/* <div className='my-3 d-flex justify-content-end'> */}
				<button
					className='btn btn-sm btn-danger me-1 col-2'
					onClick={handleCodeRun}
					disabled={loading}
				>
					{!loading ? 'Run' : 'Running'}
				</button>
				<span
					className='col-2'
					data-bs-toggle='tooltip'
					data-bs-placement='top'
					title='Please run code and verify testcases output before submitting'
				>
					<button
						className='btn btn-sm btn-success w-100 '
						disabled={isTestcaseChanged}
						onClick={handleSubmit}
					>
						Submit
					</button>
				</span>
			</div>
		</div>
	)
}

export default AddQuestion
