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