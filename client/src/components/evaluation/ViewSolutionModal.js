import React, {useEffect, useRef} from 'react'
import {Modal} from 'bootstrap'

const ViewSolutionModal = ({showModal, setShowModal, source}, ref) => {
	const modalRef = useRef(null)
	useEffect(() => {
		const modalEle = modalRef.current

		if (showModal) {
			const bsModal = new Modal(modalEle, {
				backdrop: 'static',
				keyboard: false,
			})
			bsModal.show()
		} else {
			const bsModal = Modal.getInstance(modalEle)
			bsModal && bsModal.hide()
		}
		return () => {}
	}, [showModal])
	// const showModal = () => {
	// 	const modalEle = modalRef.current
	// 	const bsModal = new Modal(modalEle, {
	// 		backdrop: 'static',
	// 		keyboard: false,
	// 	})
	// 	bsModal.show()
	// }
	console.log(Buffer.from(source, 'base64').toString('ascii'))

	const hideModal = () => {
		const modalEle = modalRef.current
		const bsModal = Modal.getInstance(modalEle)
		setShowModal(false)
		bsModal.hide()
	}
	return (
		<div>
			{/* <button
				type='button'
				className='btn btn-primary'
				onClick={showModal}
				// data-bs-toggle='modal'
				// data-bs-target='#exampleModal'
			>
				Launch demo modal
			</button> */}

			<div
				className='modal fade '
				id='exampleModal'
				tabIndex={-1}
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
				ref={modalRef}
			>
				<div className='modal-dialog '>
					<div className='modal-content bg-light'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Modal title
							</h5>
							<button
								type='button'
								className='btn-close'
								// data-bs-dismiss='modal'
								// aria-label='Close'
								onClick={hideModal}
							></button>
						</div>
						<div className='modal-body'>
							<pre className='bg-dark text-white p-3'>
								{Buffer.from(source, 'base64').toString('ascii')}
							</pre>
						</div>
						<div className='modal-footer d-flex justify-content-center'>
							<button type='button' className='btn btn-secondary' onClick={hideModal}>
								Close
							</button>
							{/* <button type='button' className='btn btn-primary'>
								Save changes
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ViewSolutionModal
