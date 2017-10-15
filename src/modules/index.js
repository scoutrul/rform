import { combineReducers } from 'redux';

import CarsReducer from './CarsReducer';
import FormReducer from './FormReducer';


export default combineReducers({
  CarsReducer,
  FormReducer,
});
