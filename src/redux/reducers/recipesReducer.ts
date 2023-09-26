import { AnyAction } from 'redux';
import { DrinkType, MealType } from '../../types';
import { FETCH_SUCCESS } from '../actions';

type InitialStateType = {
  meals: MealType[],
  drinks: DrinkType[]
};

const initialState = {
  meals: [],
  drinks: [],
};

export const recipesReducer = (
  state: InitialStateType = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
