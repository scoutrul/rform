import axios from 'axios'


export const GET_MAKES = 'GET_MAKES'

export const reciveMakes = () => (dispatch) => {
	const result = axios.get("https://www.carqueryapi.com/api/0.3/", { params: {cmd:"getMakes"} })
			.then((response) => {
				dispatch(getMakes(response))
			})
			.catch(error => console.log(error))
	return result
}
const getMakes = (payload) => { 
	return {type: GET_MAKES, payload} 
}


export const GET_MODELS = 'GET_MODELS'

export const reciveModels = (model_make_id) => (dispatch) => {
	const result = axios.get("https://www.carqueryapi.com/api/0.3/", { params: {cmd:"getModels", make: model_make_id} })
			.then((response) => {
				dispatch(getModels(response))
			})
			.catch(error => console.log(error))
	return result
}
const getModels = (payload) => { 
	return {type: GET_MODELS, payload} 
}