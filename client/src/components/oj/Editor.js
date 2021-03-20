import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import * as monaco from 'monaco-editor'
import {useDispatch, useSelector} from 'react-redux'
import {
	getCode,
	getInput,
	getLanguage,
	getLanguages,
	getSubmissionId,
	getTheme,
} from '../../store/selectors/editor'
import {setCode, setCodeId, setLanguage, setLanguages, setOutput} from '../../store/actions/editor'
import InOutBox from './InOutBox'
import {apiCall} from '../../services/api'
import base64 from 'base-64'

function Editor({handleRun, loading, showRunBtn}) {
	const dispatch = useDispatch()
	const theme = useSelector(getTheme)
	const language = useSelector(getLanguage)
	const languages = useSelector(getLanguages)
	const code = useSelector(getCode)
	const input = useSelector(getInput)
	const editorRef = useRef(null)
	const containerRef = useRef(null)
	// const [loading, setLoading] = useState(false)
	let [editor, setEditor] = useState(null)
	let test = undefined
	const subId = useSelector(getSubmissionId)
	var subIdRef = useRef(null)
	subIdRef.current = subId

	useEffect(() => {
		// const fetch = async () => {
		// 	try {
		// 		const data = await apiCall('get', '/api/oj/langs')
		// 		if (data) {
		// 			dispatch(
		// 				setLanguages(
		// 					data.reduce((langs, lang) => {
		// 						langs[lang.langCode] = lang
		// 						return langs
		// 					}, {})
		// 				)
		// 			)
		// 		}
		// 	} catch (error) {}
		// }
		// fetch()
		if (editorRef) {
			setEditor(
				monaco.editor.create(editorRef.current, {
					// value: this.$store.state.code[this.$store.state.language],
					minimap: {
						showSlider: false,
					},
					value: code,
					// language: langModes[this.$store.state.language],
					language: language,
					automaticLayout: true,
					dragAndDrop: true,
					fontFamily: 'Ubuntu Mono',
					// fontSize: this.$store.state.fontSize,
					// tabSize: this.$store.state.tabSize,
					parameterHints: true,
					renderIndentGuides: true,
					lineNumbersMinChars: 3,
					theme: theme,
					scrollBeyondLastLine: true,
				})
			)
			test = 'done'
			console.log('after creation', editor, test)
		}
		// return () => editor.dispose();
	}, [])
	console.log('outside', editor, test)
	useEffect(() => {
		console.log(editorRef, editor, test)
		if (editorRef && editor) {
			editor.onDidChangeModelContent(() => {
				dispatch(setCode(editor.getValue()))
			})
			const model = editor.getModel()

			model.setValue(code)
		}
	}, [language, editor])

	return (
		<div ref={containerRef}>
			<div className='d-flex my-1 '>
				{showRunBtn && (
					<button className='btn btn-sm btn-danger me-1' onClick={handleRun} disabled={loading}>
						{!loading ? 'Run' : 'Running'}
					</button>
				)}
				<div className='dropdown'>
					<button
						className='btn btn-sm btn-secondary dropdown-toggle '
						type='button'
						id='selectCodeLanguageBtn'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						{languages[language]?.langName}
					</button>
					<ul className='dropdown-menu' aria-labelledby='selectCodeLanguageBtn'>
						{Object.values(languages).map((l) => {
							// console.log(l);
							return (
								<li
									className='dropdown-item'
									type='button'
									onClick={() => dispatch(setLanguage(l.langCode))}
								>
									{l.langName}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
			<div id='editor' className='' ref={editorRef}></div>
			{/* <InOutBox /> */}

			{/* {!isToolbarOnTop && (
				<div className='my-3 d-flex justify-content-end'>
					<button className='btn btn-sm btn-danger me-1' onClick={handleRun} disabled={loading}>
						{!loading ? 'Run' : 'Running'}
					</button>
					<button className='btn btn-sm btn-success me-1' onClick={handleSubmit} disabled={loading}>
						{!loading ? 'Submit' : 'Submission Queued'}
					</button>
				</div>
			)} */}
		</div>
	)
}

export default Editor
