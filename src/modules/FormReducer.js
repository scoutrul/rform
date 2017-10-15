import * as t from '../actions/types';

const initialState = {
  isSending: false,
  isHaveCar: false,
  currentMakeName: "",
  currentModel: "",
  passport: "",
  name: "",
  surname: "",
  patronymic: "",
  birthdate: "",
  gender: false,
  email: "",
};

export default function FormReducer(state = initialState, action) {
  switch (action.type) {
    case t.IS_HAVE_CAR:
      return {
        ...state, isHaveCar: action.payload,
      };
    case t.IS_SELECTED_MAKE_NAME:
      return {
        ...state, currentMakeName: action.payload,
      };
    case t.IS_SELECTED_MODEL:
      return {
        ...state, currentModel: action.payload,
      };
    case t.VALID_INPUT_PASSPORT:
      return {
        ...state, passport: action.payload,
      };
    case t.VALID_INPUT_NAME:
      return {
        ...state, name: action.payload,
      };
    case t.VALID_INPUT_SURNAME:
      return {
        ...state, surname: action.payload,
      };
    case t.VALID_INPUT_PATRONYMIC:
      return {
        ...state, patronymic: action.payload,
      };
    case t.VALID_INPUT_EMAIL:
      return {
        ...state, email: action.payload,
      };
    case t.SET_GENDER:
      return {
        ...state, gender: action.payload,
      };
    case t.SET_BIRTH_DATE:
      return {
        ...state, birthdate: action.payload,
      };
    case t.IS_SENDING:
      return {
        ...state, isSending: true,
      };
    case t.IS_SENDING_DONE:
      return {
        ...state, isSending: false,
      };
    case t.FORM_RESTORE_DEFAULT:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
