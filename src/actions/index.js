import axios from 'axios';

export const GET_MAKES = 'GET_MAKES';
export const GET_MODELS = 'GET_MODELS';
export const IS_HAVE_CAR = 'IS_HAVE_CAR';
export const IS_SELECTED_MAKE_NAME = 'IS_SELECTED_MAKE_NAME';
export const IS_SELECTED_MODEL = 'IS_SELECTED_MODEL';
export const VALID_INPUT_PASSPORT = 'VALID_INPUT_PASSPORT';
export const VALID_INPUT_NAME = 'VALID_INPUT_NAME';
export const VALID_INPUT_SURNAME = 'VALID_INPUT_SURNAME';
export const VALID_INPUT_PATRONYMIC = 'VALID_INPUT_PATRONYMIC';
export const VALID_INPUT_EMAIL = 'VALID_INPUT_EMAIL';
export const IS_FETCHING = 'IS_FETCHING';
export const IS_SENDING = 'IS_SENDING';
export const IS_SENDING_DONE = 'IS_SENDING_DONE';

export const reciveMakes = () => (dispatch) => {
  dispatch(isFetching())
  const result = axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes', { params: { format: 'json' } })
    .then((response) => {
      dispatch(getMakes(response));
    })
    .catch(error => console.log(error));
  return result;
};
const isFetching = () => ({ type: IS_FETCHING });
const getMakes = (payload) => ({ type: GET_MAKES, payload });


export const reciveModels = (make_id) => (dispatch) => {
  dispatch(isFetching())
  const result = axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${make_id}`, { params: { format: 'json' } })
    .then((response) => {
      dispatch(getModels(response));
    })
    .catch(error => console.log(error));
  return result;
};
const getModels = (payload) => ({ type: GET_MODELS, payload });


export const changeIsHaveCar = (payload) => ({ type: IS_HAVE_CAR, payload });

export const selectMakeName = (payload) => ({ type: IS_SELECTED_MAKE_NAME, payload });

export const selectModel = (payload) => ({ type: IS_SELECTED_MODEL, payload });

export const passportValid = (payload) => ({ type: VALID_INPUT_PASSPORT, payload });

export const nameValid = (payload) => ({ type: VALID_INPUT_NAME, payload });

export const surnameValid = (payload) => ({ type: VALID_INPUT_SURNAME, payload });

export const patronymicValid = (payload) => ({ type: VALID_INPUT_PATRONYMIC, payload });

export const emailValid = (payload) => ({ type: VALID_INPUT_EMAIL, payload });

export const isSending = (payload) => ({ type: IS_SENDING, payload });
export const isSendingDone = (payload) => ({ type: IS_SENDING_DONE, payload });





