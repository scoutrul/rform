import { combineReducers } from 'redux'
import { 
	GET_MAKES, GET_MODELS, IS_HAVE_CAR, IS_SELECTED_MAKE_NAME, IS_SELECTED_MODEL, 
	VALID_INPUT_PASSPORT, VALID_INPUT_NAME, VALID_INPUT_SURNAME, VALID_INPUT_PATRONYMIC
	} from '../actions/'

const initialState = {
	data: {
		CarsMakes: [],
		CarModels: [],
	},
	form: {
		isHaveCar: false,
		currentMakeName: null,
		currentModel: null,
		passport: null,
		name: null,
		surname: null,
		patronymic: null
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
	FormReducer: function (state = initialState.form, action) {
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
			case VALID_INPUT_PASSPORT:
				return {
					...state, passport: action.payload
				}
			case VALID_INPUT_NAME:
				return {
					...state, name: action.payload
				}
			case VALID_INPUT_SURNAME:
				return {
					...state, surname: action.payload
				}
			case VALID_INPUT_PATRONYMIC:
				return {
					...state, patronymic: action.payload
				}
			default: 
				return state
		}
	}
})
