import {combineReducers} from 'redux';
import userReducer from './user/userReducer'

import data from './dataReducer';

export default combineReducers({
  user: userReducer,
  data
});