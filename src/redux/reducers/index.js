import { combineReducers } from 'redux';
import authReducer from './authReducer';
import performanceReducer from './performanceReducer';

export default combineReducers({
  auth: authReducer,
  performance: performanceReducer,
});