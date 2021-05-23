import React from 'react'

function Spinner() {
	return (
		<div className='d-flex align-items-center flex-row'>
			<div className='spinner-border text-primary mx-auto' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
