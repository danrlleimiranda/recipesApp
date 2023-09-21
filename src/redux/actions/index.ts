import { Dispatch } from 'redux';
import { DrinkType, MealType } from '../../types';
import fetchAPI from '../../services/fetchAPI';

export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

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

export const fetchData = (path: string, param: string, searchInput: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchStarted());
    try {
      const data = await fetchAPI(path, param, searchInput);
      dispatch(fetchSuccess(data));
    } catch (error: any) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
      dispatch(fetchError(error));
    }
  };
};
