import axios from 'axios';


export const GET_MAKES = 'GET_MAKES';

export const reciveMakes = () => (dispatch) => {
  // dispatch(isLoading(true))
  const result = axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes', { params: { format: 'json' } })
    .then((response) => {
      // dispatch(isLoading(false))
      dispatch(getMakes(response));
    })
    .catch(error => console.log(error));
  return result;
};
const getMakes = (payload) => ({ type: GET_MAKES, payload });


export const GET_MODELS = 'GET_MODELS';

export const reciveModels = (make_id) => (dispatch) => {
  const result = axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${make_id}`, { params: { format: 'json' } })
    .then((response) => {
      dispatch(getModels(response));
    })
    .catch(error => console.log(error));
  return result;
};
const getModels = (payload) => ({ type: GET_MODELS, payload });


export const IS_HAVE_CAR = 'IS_HAVE_CAR';
export const changeIsHaveCar = (payload) => ({ type: IS_HAVE_CAR, payload });


export const IS_SELECTED_MAKE_NAME = 'IS_SELECTED_MAKE_NAME';
export const selectMakeName = (payload) => ({ type: IS_SELECTED_MAKE_NAME, payload });


export const IS_SELECTED_MODEL = 'IS_SELECTED_MODEL';
export const selectModel = (payload) => ({ type: IS_SELECTED_MODEL, payload });

