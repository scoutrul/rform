import * as t from '../actions/types';

const initialState = {
  isLoading: false,
  CarMakes: [],
  CarModels: [],
};


export default function CarsReducer(state = initialState, action) {
  switch (action.type) {
    case t.GET_MAKES:
      return {
        ...state,
        CarMakes: action.payload.data.Results,
        isLoading: false,
      };
    case t.GET_MODELS:
      return {
        ...state,
        CarModels: action.payload.data.Results,
        isLoading: false,
      };
    case t.IS_FETCHING:
      return {
        ...state, isLoading: true,
      };
    default:
      return state;
  }
}

