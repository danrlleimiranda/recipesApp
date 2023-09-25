import { Dispatch } from 'redux';
import { CategoryType, DrinkType, MealType, User } from '../../types';
import { fetchAPI, getCategories } from '../../services/fetchAPI';

export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export type CategoriesType = {
  [key: string]: CategoryType[],
};

const fetchStarted = () => ({
  type: FETCH_STARTED,
});

const fetchSuccess = (payload: MealType[] | DrinkType[]) => ({
  type: FETCH_SUCCESS,
  payload,
});

const fetchError = (error: any) => ({
  type: 'FETCH_ERROR',
  payload: {
    error,
  },
});

const fetchCategoriesSuccess = (payload: CategoriesType) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
      ...payload,
    },
  };
};

export const loginSucess = (user: User) => (
  {
    type: 'LOGIN_SUCCESSFUL',
    payload: {
      ...user,
    },
  }
);

export const fetchData = (path: string, param: string, searchInput: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchStarted());
    try {
      const data = await fetchAPI(path, param, searchInput);
      // if (data.length === 0) {
      //   window.alert('Sorry, we haven\'t found any recipes for these filters.');
      // }
      dispatch(fetchSuccess(data));
    } catch (error: any) {
      // window.alert('Sorry, we haven\'t found any recipes for these filters.');
      dispatch(fetchError(error));
    }
  };
};

export const fetchCategories = (path: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchStarted());
    try {
      const data = await getCategories(path);
      dispatch(fetchCategoriesSuccess(path === '/meals'
        ? { meals: data }
        : { drinks: data }));
    } catch (error: any) {
      dispatch(fetchError(error));
    }
  };
};
