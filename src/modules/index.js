import { combineReducers } from 'redux'
import { GET_MAKES } from '../actions'
import { reciveMakes } from '../actions'

const initialState = {
	data: {
			Makes: null
	}
}


export default combineReducers({
	allMakes: function (state = initialState, action) {
		switch (action.type) {
			case GET_MAKES:
				return {
					...state, data: action.payload.data
				}
			default: 
				return state
		}
	}
})
