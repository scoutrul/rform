import axios from 'axios';
import * as t from './types';

export const reciveMakes = () => (dispatch) => {
  dispatch(isFetching());
  const result = axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes', { params: { format: 'json' } })
    .then((response) => {
      dispatch(getMakes(response));
    })
    .catch(error => console.log(error));
  return result;
};


export const reciveModels = (make_id) => (dispatch) => {
  dispatch(isFetching());
  const result = axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${make_id}`, { params: { format: 'json' } })
    .then((response) => {
      dispatch(getModels(response));
    })
    .catch(error => console.log(error));
  return result;
};

const getMakes = (payload) => ({ type: t.GET_MAKES, payload });

const getModels = (payload) => ({ type: t.GET_MODELS, payload });

const isFetching = () => ({ type: t.IS_FETCHING });

export const changeIsHaveCar = (payload) => ({ type: t.IS_HAVE_CAR, payload });

export const selectMakeName = (payload) => ({ type: t.IS_SELECTED_MAKE_NAME, payload });

export const selectModel = (payload) => ({ type: t.IS_SELECTED_MODEL, payload });

export const passportValid = (payload) => ({ type: t.VALID_INPUT_PASSPORT, payload });

export const nameValid = (payload) => ({ type: t.VALID_INPUT_NAME, payload });

export const surnameValid = (payload) => ({ type: t.VALID_INPUT_SURNAME, payload });

export const patronymicValid = (payload) => ({ type: t.VALID_INPUT_PATRONYMIC, payload });

export const emailValid = (payload) => ({ type: t.VALID_INPUT_EMAIL, payload });

export const isSending = (payload) => ({ type: t.IS_SENDING, payload });

export const isSendingDone = (payload) => ({ type: t.IS_SENDING_DONE, payload });

export const setGender = (payload) => ({ type: t.SET_GENDER, payload });

export const setBirthDate = (payload) => ({ type: t.SET_BIRTH_DATE, payload });

export const formReset = (payload) => ({ type: t.FORM_RESTORE_DEFAULT, payload });



