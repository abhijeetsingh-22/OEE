import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {apiCall} from '../../services/api'
import {socket} from '../../services/socket'

function OptionView({question, options, answers}) {
	// console.log('useranswer is', answers.answer[0])
	const [selectedOption, setSelectedOption] = useState(answers?.answer[0])
	const [previousSelected, setPreviousSelected] = useState(answers?.answer[0])
	var optionsView = options.map((option, idx) => {
		return (
			<div>
				<input
					type='radio'
					name={question.id}
					id={option.id}
					checked={selectedOption === option.id}
					onChange={(e) => {
						console.log('browser status 😀😀', typeof navigator.onLine)
						if (navigator.onLine) {
							setSelectedOption(option.id)
							apiCall('post', `/api/evaluation/questions/${question.id}`, {
								answer: {options: [option.id], type: 'add'},
							})
								.then((data) => {
									setPreviousSelected(option.id)
								})
								.catch((err) => {
									if (!err?.message) toast.error('Unable to connect to server, Answer not saved')

									setSelectedOption(previousSelected)
								})
						} else toast.error('You are offline , unable to save answer')
						// if (socket.connected) {
						// 	socket.emit('answer', {option: option.id, question: question.id}, (response) => {
						// 		if (response.status == 'ok') {
						// 		}
						// 	})
						// 	setSelectedOption(option.id)
						// } else {
						// }
					}}
				/>{' '}
				{option.body}
			</div>
		)
	})
	return <div className='ms-5'>{optionsView}</div>
}

export default OptionView
