import { combineReducers } from 'redux';
import { categoriesReducer } from './categoriesReducer';
import { recipesReducer } from './recipesReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({ recipesReducer, loginReducer, categoriesReducer });

export default rootReducer;
