import { combineReducers } from 'redux';
import { recepiesReducer } from './recepiesReducer';

const rootReducer = combineReducers({ recepiesReducer });

export default rootReducer;
