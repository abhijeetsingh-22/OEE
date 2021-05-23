import React from 'react'

function SubmissionResult({resultData}) {
	const resultList = resultData?.results?.map((r, idx) => {
		const highlight = r.result === 'AC' ? 'table-success' : 'table-danger'
		return (
			<tr className={`${highlight}`}>
				<td>{idx + 1}</td>
				<td>{r.time}</td>
				<td>{r.result}</td>
			</tr>
		)
	})
	console.log(resultList)
	return (
		Object.keys(resultData).length > 0 && (
			<div>
				<h4 className='mt-4'>Result</h4>
				<table className='table table-bordered text-center'>
					<thead className='table-dark'>
						<tr>
							<th scope='col'>Testcase</th>
							<th scope='col'>Time</th>
							<th scope='col'>Result</th>
						</tr>
					</thead>
					<tbody>
						{resultList}
						<tr className='table-dark'>
							<td></td>
							<td></td>
							<td>Total Score {resultData?.score}%</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	)
}

export default SubmissionResult
