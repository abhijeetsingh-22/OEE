import A from '../../actionTypes'
const defaultState = {
	parent: '/',
	parentList: ['/'],
	parentNameList: ['Home'],
}
const parentReducer = (state = defaultState, action) => {
	switch (action.type) {
		case A.SET_PARENT:
			return {
				...state,
				parent: action.parent,
			}
		case A.ADD_PARENT_LIST:
			return {
				...state,
				parentList: [...state.parentList, action.parent],
				parentNameList: [...state.parentNameList, action.name],
			}

		case A.ADJUST_PARENT_LIST:
			return {
				...state,
				parentList: action.parentList,
				parentNameList: action.parentNameList,
			}

		case A.SET_PARENT_LIST:
			return {
				...state,
				parentList: action.parentList,
				parentNameList: action.parentNameList,
			}

		case A.REMOVE_PARENT_LIST:
			return {
				...state,
				parentList: state.parentList.filter((parent) => {
					return parent._id !== action.parent
				}),
			}

		case A.RESET_PARENT_LIST:
			return {
				...state,
				parentList: ['/'],
				parentNameList: ['Home'],
			}

		case A.ADD_PARENT_NAME_LIST:
			return {
				...state,
				parentNameList: [...state.parentNameList, action.name],
			}

		default:
			return state
	}
}
export default parentReducer
