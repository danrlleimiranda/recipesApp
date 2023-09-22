import { combineReducers } from 'redux';
import { recepiesReducer } from './recepiesReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({ recepiesReducer, loginReducer });

export default rootReducer;
