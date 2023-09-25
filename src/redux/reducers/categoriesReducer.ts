import { AnyAction } from 'redux';
import { CategoryType } from '../../types';
import { FETCH_CATEGORIES_SUCCESS } from '../actions';

type InitialStateType = {
  [key: string]: CategoryType[],
};

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

export const categoriesReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
