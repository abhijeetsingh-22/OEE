import A from '../actionTypes';
import samples from '../../assets/js/sample-source';

const DEFAULT_STATE = {
  code: Object.assign({}, samples),
  sampleCodes: samples,
  languages: {},
  language: 'cpp',
  theme: 'vs-dark',
  font: 'Ubuntu Mono',
  fontSize: 16,
  tabSize: 4,
  // showInOutBox: true,
  // showSettings: false,
  input: '',
  customInputBuf: '', //input buffer to store customInput when toggled OFF
  output: '',
  fileName: `code`,
  isChanged: false,
  // autoSave: true,
  // autoSaveIntervalId: null,
  // checkData: "",
  codeId: null,
  // codeTitle: ``,
  // submissionId: null,
  // isVertical: true
};

function editorReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case A.SET_EDITOR_LANG:
      return {
        ...state,
        language: action.language,
      };
    case A.SET_EDITOR_LANGS:
      return {...state, languages: action.languages};
    case A.SET_EDITOR_CODE:
      var newState = state;
      newState.code[newState.language] = action.code;
      return newState;
    case A.SET_EDITOR_OUTPUT:
      return {...state, output: action.output};
    case A.SET_EDITOR_INPUT:
      return {...state, input: action.input};
    case A.SET_EDITOR_THEME:
      return {...state, theme: action.theme};
    case A.RESET_EDITOR_CODE:
      var newState = state;
      newState.code[state.language] = newState.sampleCodes[state.language];
      return newState;
    case A.SET_CODE_SUBMISSION_ID:
      return {...state, codeId: action.id};

    default:
      return state;
  }
}

export default editorReducer;
