import React, {useState} from 'react'
import {socket} from '../../services/socket'

function OptionView({question, options}) {
	const [selectedOption, setSelectedOption] = useState(null)
	var optionsView = options.map((option, idx) => {
		return (
			<div>
				<input
					type='radio'
					name={question.id}
					id={option.id}
					checked={selectedOption === option.id}
					onChange={(e) => {
						// setSelectedOption(option.id)
						socket.emit('answer', option.id, (response) => {
							console.log('the response is', response)
							if (response.status == 'ok') setSelectedOption(option.id)
						})
					}}
				/>{' '}
				{option.body}
			</div>
		)
	})
	return <div className='ms-5'>{optionsView}</div>
}

export default OptionView
