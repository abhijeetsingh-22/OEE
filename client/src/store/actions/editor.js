import A from '../actionTypes';
export const setLanguage = (language) => {
  return {type: A.SET_EDITOR_LANG, language};
};
export const setLanguages = (languages) => {
  return {type: A.SET_EDITOR_LANGS, languages};
};

export const setCode = (code) => {
  return {type: A.SET_EDITOR_CODE, code};
};

export const setOutput = (output) => {
  return {type: A.SET_EDITOR_OUTPUT, output};
};

export const setInput = (input) => {
  return {type: A.SET_EDITOR_INPUT, input};
};

export const setTheme = (theme) => {
  return {type: A.SET_EDITOR_THEME, theme};
};

export const resetCode = () => {
  return {type: A.RESET_EDITOR_CODE};
};

export const setCodeId = (id) => {
  return {type: A.SET_CODE_SUBMISSION_ID, id};
};
