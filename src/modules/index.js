import { combineReducers } from 'redux'
import { GET_MAKES, GET_MODELS, IS_HAVE_CAR, IS_SELECTED_MAKE_NAME, IS_SELECTED_MODEL } from '../actions'

const initialState = {
	data: {
		CarsMakes: [],
		CarModels: [],
	},
	Ui: {
		isHaveCar: false,
		currentMakeName: null,
		currentModel: null,
	}
}


export default combineReducers({

	CarsReducer: function (state = initialState.data, action) {
		switch (action.type) {
			case GET_MAKES:
				return {
					...state, CarsMakes: action.payload.data.Results
				}
			case GET_MODELS:
				return {
					...state, CarModels: action.payload.data.Results
				}
			default: 
				return state
		}
	},
	UI: function (state = initialState.Ui, action) {
		switch (action.type) {
			case IS_HAVE_CAR:
				return {
					...state, isHaveCar: action.payload
				}
			case IS_SELECTED_MAKE_NAME:
				return {
					...state, currentMakeName: action.payload
				}
			case IS_SELECTED_MODEL:
				return {
					...state, currentModel: action.payload
				}
			default: 
				return state
		}
	}
})
