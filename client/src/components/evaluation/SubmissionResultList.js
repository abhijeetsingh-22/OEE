import React, {useEffect, useRef, useState} from 'react'
import Moment from 'react-moment'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {apiCall} from '../../services/api'
import {setLanguages} from '../../store/actions/editor'
import {getLanguages} from '../../store/selectors/editor'
import {getCurrentUser} from '../../store/selectors/user'
import ViewSolutionModal from './ViewSolutionModal'

function SubmissionResultList() {
	const {evaluationId, questionId} = useParams()
	const [results, setResults] = useState([])
	const languages = useSelector(getLanguages)
	const currentUser = useSelector(getCurrentUser)
	const [source, setSource] = useState('')
	const [showModal, setShowModal] = useState(false)
	console.log(languages)
	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await apiCall('get', `/api/evaluation/questions/${questionId}/submissions`)
				if (!data.error) setResults(data)
			} catch (error) {}
		}
		fetch()
	}, [evaluationId, questionId])
	const toggleModal = (e, source) => {
		setSource(source)
		setShowModal((prev) => !prev)
	}
	const resultList = results.map((r, idx) => {
		// const highlight = r.result === 'AC' ? 'table-success' : 'table-danger'
		var highlight
		var icon
		if (r.score === 100) {
			highlight = 'table-success'
			// icon = <i className='bi bi-check text-success fs-4 fw-bold d-block'></i>
		} else if (r.score !== 0) {
			highlight = 'table-warning'
		} else highlight = 'table-danger'
		return (
			<tr className={`${highlight}`}>
				<td> {<Moment format='DD/MM/YY hh:mm:A'>{r.createdAt}</Moment>}</td>
				<td>{currentUser.user.name}</td>
				<td>
					{icon}
					{r.score} pts
				</td>
				<td>{r.time}</td>
				<td>{languages?.[r.lang]?.langName} </td>
				<td>
					<button className='btn btn-sm btn-dark' onClick={(e) => toggleModal(e, r.source)}>
						View
					</button>
				</td>
			</tr>
		)
	})

	return (
		<div>
			<ViewSolutionModal showModal={showModal} setShowModal={setShowModal} source={source} />
			<h4 className='mt-4'>Submissions</h4>

			<table className='table table-bordered text-center table-hover'>
				<thead className='table-dark'>
					<tr>
						<th scope='col'>Date/Time</th>
						<th scope='col'>User</th>
						<th scope='col'>Result</th>
						<th scope='col'>Time</th>
						<th scope='col'>Lang</th>
						<th scope='col'>Solution</th>
					</tr>
				</thead>
				<tbody>
					{/* {JSON.stringify(results)} */}
					{resultList}
					{/* <tr className='table-dark'>
						<td></td>
						<td></td>
						<td>Total Score {resultData?.score}%</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	)
}

export default SubmissionResultList
function dispatch(arg0) {
	throw new Error('Function not implemented.')
}
