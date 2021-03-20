export const getTheme = (state) => {
	return state.editor.theme
}

export const getCode = (state) => {
	return state.editor.code[state.editor.language]
}
export const getInput = (state) => {
	return state.editor.input
}

export const getLanguage = (state) => {
	return state.editor.language
}

export const getLanguages = (state) => {
	return state.editor.languages
}
export const getSubmissionId = (state) => {
	return state.editor.codeId
}
export const getOutput = (state) => {
	return state.editor.output
}
