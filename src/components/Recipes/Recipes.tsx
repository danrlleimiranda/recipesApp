import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dispatch, DrinkType, GlobalStateType, MealType } from '../../types';
import { fetchCategories, fetchData } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';

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
  const navigate = useNavigate();

  if (!recipes) {
    window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  useEffect(() => {
    if (recipes && recipes.length === 1) {
      if ('idMeal' in recipes[0]) {
        navigate(`${pathname}/${recipes[0].idMeal}`);
      } else if ('idDrink' in recipes[0]) {
        navigate(`${pathname}/${recipes[0].idDrink}`);
      }
    }

    dispatch(fetchData(pathname, '', ''));
    dispatch(fetchCategories(pathname));
    setLoading(false);
  }, [pathname]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="container"
      style={ {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        marginBottom: '50px',
      } }
    >
      {/* {
        categories && categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => dispatch(fetchData(pathname, category.strCategory, '')) }
          >
            {category.strCategory}
          </button>
        ))
      } */}
      {
        recipes && recipes
          .filter((_, index) => index < 12)
          .map((recipe, index) => (
            <Link
              to={ `${pathname}/${isMealType(recipe)
                ? (recipe as MealType).idMeal
                : (recipe as DrinkType).idDrink}` }
              key={ isMealType(recipe)
                ? (recipe as MealType).idMeal
                : (recipe as DrinkType).idDrink }
            >
              <RecipeCard
                recipe={ recipe }
                index={ index }
                isMealType={ isMealType }
              />
            </Link>
          ))
      }
    </div>
  );
}
export default Recipes;
