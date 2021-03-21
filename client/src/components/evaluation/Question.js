import React, {useEffect, useState} from 'react'
import {useParams, useRouteMatch} from 'react-router'
import {Link} from 'react-router-dom'
import {apiCall} from '../../services/api'
import Editor from '../oj/Editor'
import InOutBox from '../oj/InOutBox'
import base64 from 'base-64'
import {useDispatch, useSelector} from 'react-redux'
import {getCode, getInput, getLanguage} from '../../store/selectors/editor'
import {setOutput} from '../../store/actions/editor'
import SubmissionResult from './SubmissionResult'
import 'react-quill/dist/quill.snow.css'
import Spinner from '../common/Spinner'

function Question() {
	const [question, setQuestion] = useState({})
	const [isRunning, setIsRunning] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState({})
	const {questionId} = useParams()
	const {path, url} = useRouteMatch()
	const language = useSelector(getLanguage)
	const code = useSelector(getCode)
	const input = useSelector(getInput)
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiCall('get', `/api/evaluation/questions/${questionId}`)
				setQuestion(data)
				setLoading(false)
			} catch (err) {
				console.log('error')
			}
		}
		fetchData()
	}, [questionId])

	const handleRun = (e) => {
		e.preventDefault()
		// console.log(base64.encode(code));
		setIsRunning(true)

		apiCall('post', '/api/oj/run', {
			source: base64.encode(code),
			lang: language,
			input: base64.encode(input),
		}).then((res) => {
			const start = new Date()
			// dispatch(setCodeId(res.id))

			const poll = async () => {
				const data = await apiCall('get', `/api/oj/${res.id}`)

				//check for 20sec
				if (!data.isCompleted && new Date() - start <= 20 * 1000)
					return new Promise((resolve) => setTimeout(() => resolve(poll()), 1000))
				setIsRunning(false)
				if (data.isCompleted) {
					dispatch(setOutput(data.results.stdout))
					// containerRef.current.scrollIntoView({
					// 	behavior: 'smooth',
					// 	block: 'end',
					// 	inline: 'nearest',
					// })
				}
			}
			return poll()
		})
	}
	const handleSubmit = async () => {
		setResult({})
		apiCall('post', `/api/evaluation/questions/${questionId}`, {
			source: base64.encode(code),
			lang: language,
			// input: base64.encode(input),
		}).then((res) => {
			console.log(res)
			const start = new Date()
			// dispatch(setCodeId(res.id))

			const poll = async () => {
				const data = await apiCall('get', `/api/evaluation/submissions/${res.id}`)

				//check for 20sec
				if (!data.isCompleted && new Date() - start <= 20 * 1000)
					return new Promise((resolve) => setTimeout(() => resolve(poll()), 1000))
				setIsRunning(false)
				if (data.isCompleted) {
					console.log(data)
					setResult(data)

					// dispatch(setOutput(data.results.stdout))
					// containerRef.current.scrollIntoView({
					// 	behavior: 'smooth',
					// 	block: 'end',
					// 	inline: 'nearest',
					// })
				}
			}
			return poll()
		})
	}
	const exampleTestcaseView = question?.testcases?.map((t) => {
		return (
			<div className='my-3'>
				<h6>Sample Input</h6>
				<pre className='bg-dark text-white p-2 ps-3'>
					{Buffer.from(t.input, 'base64').toString('ascii')}
				</pre>
				<h6>Sample Output</h6>
				<pre className='bg-dark text-white p-2 ps-3'>
					{Buffer.from(t.output, 'base64').toString('ascii')}
				</pre>
			</div>
		)
	})
	if (loading) return <Spinner />

	return (
		<div>
			<div className='d-flex flex-column'>
				<div className='card'>
					<div className='card-body '>
						{/* <div className='d-flex align-items-center justify-content-start flex-wrap'>
							<p className='card-title me-3 my-auto text-primary fw-bold '>
								{thread.user.name}
							</p>
								<small className='text-muted mt-n1  fst-light'>
						Asked :{' '}
						{moment().diff(moment(thread.createdAt), 'hours') < 24 ? (
							<Moment fromNow>{thread.createdAt}</Moment>
						) : (
							<Moment format='DD MMM YYYY hh:mm:A'>{thread.createdAt}</Moment>
						)}
							</small>
								</div> */}
						<div className='d-flex justify-content-between'>
							<h5 className='card-title fw-bold mt-1 fs-5'>{question.title}</h5>
							<Link
								to={`/evaluations/${question.evaluation}/questions/${question.id}/submissions`}
								className='btn btn-sm btn-secondary'
							>
								My Submissions
							</Link>
						</div>
						{/* <h5 className="card-title">Special title treatment</h5> */}
						{/* <p className='card-text mt-0' >{question.bodyHTML}</p> */}
						<div
							dangerouslySetInnerHTML={{__html: question.bodyHTML}}
							className='ql-editor p-0'
						></div>
						{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
						<div className='d-flex '>
							{/* {thread.tags.map((tag) => {
							return (
							<Link to={`/forum/questions/tagged/${tag.title}`}>
								<span className='badge bg-secondary me-2'>{tag.title}</span>
							</Link>
							);
						})} */}
						</div>
						{exampleTestcaseView}
					</div>
				</div>
			</div>
			<h4 className='my-3'>Your Solution</h4>
			<Editor />
			<div className='my-3 d-flex justify-content-end'>
				<button
					className='btn btn-sm btn-danger me-2'
					onClick={handleRun}
					disabled={isRunning || isSubmitting}
				>
					{!isRunning ? 'Run' : 'Running'}
				</button>
				<button
					className='btn btn-sm btn-success me-1'
					onClick={handleSubmit}
					disabled={isSubmitting || isRunning}
				>
					{!isSubmitting ? 'Submit' : 'Submission Queued'}
				</button>
			</div>
			<InOutBox />
			{/* <button className='btn btn-success'> Submit</button> */}
			<SubmissionResult resultData={result} />
		</div>
	)
}

export default Question
