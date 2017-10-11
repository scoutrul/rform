import { combineReducers } from 'redux'
import { GET_MAKES, GET_MODELS } from '../actions'
import { reciveMakes, reciveModels } from '../actions'

const initialState = {
	CarsMakes: [
		{
			"make_id":"acura",
			"make_display":"Acura",
			"make_is_common":"1",
			"make_country":"USA"
		},
		{
			 "make_id": "bentley",
			 "make_display": "Bentley",
			 "make_is_common": "1",
			 "make_country": "UK"
		},
		{
			 "make_id": "lotus",
			 "make_display": "Lotus",
			 "make_is_common": "1",
			 "make_country": "UK"
		},
		{
			 "make_id": "tesla",
			 "make_display": "Tesla",
			 "make_is_common": "1",
			 "make_country": "USA"
		},
	],
	CarModels: [
		{
			"model_name":"Escape",
			"model_make_id":"ford"
		},
		{
			"model_name":"Excursion",
			"model_make_id":"ford"
		}
	]
}


export default combineReducers({

	CarsReducer: function (state = initialState, action) {
		switch (action.type) {
			case GET_MAKES:
				return {
					...state, CarsMakes: (action.payload.data.error) ? state.CarsMakes : action.payload.data
				}
			case GET_MODELS:
				return {
					...state, CarModels:(action.payload.data.error) ? state.CarModels : action.payload.data
				}
			default: 
				return state
		}
	}
})
