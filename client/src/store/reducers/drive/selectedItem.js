import A from '../../actionTypes'
const defaultState = {
	selected: '',
	id: '',
	name: '',
	selectedItem: '',
	lastSelected: 0,
}

const selectedItemReducer = (state = defaultState, action) => {
	switch (action.type) {
		case A.SET_SELECTED:
			return {
				...state,
				selected: action.selected,
			}

		case A.SET_SELECTED_ITEM:
			return {
				...state,
				...action.selectedItem,
			}

		case A.EDIT_SELECTED_ITEM:
			return {
				...state,
				...action.item,
			}

		case A.RESET_SELECTED_ITEM:
			return defaultState

		// case 'EDIT_SHARE_SELECTED':
		// 	return {
		// 		...state,
		// 		shareSelected: {
		// 			...state.shareSelected,
		// 			...action.selected,
		// 		},
		// 	}

		// case 'SET_SHARE_SELECTED':
		// 	return {
		// 		...state,
		// 		shareSelected: action.selected,
		// 	}

		// case 'SET_RIGHT_SELECTED':
		// 	return {
		// 		...state,
		// 		rightSelected: action.selected,
		// 	}

		case A.SET_LAST_SELECTED:
			return {
				...state,
				lastSelected: action.lastSelected,
			}

		case A.RESET_SELECTED:
			return {
				...state,
				selected: '',
			}

		default:
			return state
	}
}

export default selectedItemReducer
