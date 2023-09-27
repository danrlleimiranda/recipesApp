import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Dispatch,
  DrinkType,
  GlobalStateType,
  MealType } from '../../types';
import { fetchCategories, fetchData } from '../../redux/actions';
import Categories from '../../components/Categories/Categories';
import RecipesList from '../../components/RecipesList/RecipesList';

function Recipes() {
  const dispatch: Dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[1];

  const isMealType = (recipe: MealType | DrinkType) => {
    return 'idMeal' in recipe;
  };
  const recipes = useSelector((state: GlobalStateType) => state
    .recipesReducer[currentPath]);

  const categories = useSelector((state: GlobalStateType) => state
    .categoriesReducer[currentPath]);

  useEffect(() => {
    dispatch(fetchData(pathname, '', ''));
    dispatch(fetchCategories(pathname));
    setLoading(false);
  }, [pathname, dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="container"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      } }
    >
      <Categories
        categories={ categories }
        pathname={ pathname }
      />
      <RecipesList
        recipes={ recipes }
        pathname={ pathname }
        isMealType={ isMealType }
      />
    </div>
  );
}
export default Recipes;
