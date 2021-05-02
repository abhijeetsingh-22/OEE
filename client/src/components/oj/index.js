import React, {useEffect, useState} from 'react'
import Editor from './Editor'
import InOutBox from './InOutBox'
import base64 from 'base-64'
import {apiCall} from '../../services/api'
import {setCodeId, setLanguages, setOutput} from '../../store/actions/editor'
import {useDispatch, useSelector} from 'react-redux'
import {getLanguage, getLanguages, getCode, getInput} from '../../store/selectors/editor'

function PlayGround() {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const language = useSelector(getLanguage)
	const languages = useSelector(getLanguages)
	const input = useSelector(getInput)

	const code = useSelector(getCode)
	useEffect(() => {
		const fetch = async () => {
			try {
				const d = await apiCall('get', '/api/oj/langs')
				if (d) {
					dispatch(
						setLanguages(
							d.reduce((langs, lang) => {
								langs[lang.langCode] = lang
								return langs
							}, {})
						)
					)
				}
			} catch (error) {}
		}
		fetch()
	}, [])
	const handleCodeRun = (e) => {
		e.preventDefault()
		// console.log(base64.encode(code));
		setLoading(true)

		apiCall('post', '/api/oj/run', {
			source: base64.encode(code),
			lang: language,
			input: base64.encode(input),
		}).then((res) => {
			const start = new Date()
			dispatch(setCodeId(res.id))

			const poll = async () => {
				const data = await apiCall('get', `/api/oj/${res.id}`)

				//check for 20sec
				if (!data.isCompleted && new Date() - start <= 20 * 1000)
					return new Promise((resolve) => setTimeout(() => resolve(poll()), 1000))
				setLoading(false)
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
	return (
		<div>
			<Editor handleRun={handleCodeRun} loading={loading} showRunBtn={true} />
			<InOutBox />
		</div>
	)
}

export default PlayGround
