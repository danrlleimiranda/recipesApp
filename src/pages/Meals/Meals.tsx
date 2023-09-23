import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlobalStateType, MealType } from '../../types';
import fetchAPI from '../../services/fetchAPI';

function Meals() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  const [initialMeals, setInitialMeal] = useState<MealType[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (!meals) {
    window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAPI(pathname, '', '');
      setInitialMeal(response.meals.filter((_: any, index: number) => index < 12));
    };
    fetchData();
  }, [pathname]);

  if (meals && meals.length === 1) {
    navigate(`/meals/${meals[0].idMeal}`);
  }
  return (
    <div
      className="container"
    >

      {
      meals.length === 0 ? initialMeals
        .filter((_, index) => index < 12).map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ meal.idMeal }
          >
            <Link to={ `${pathname}/${meal.idMeal}` }>
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        )) : meals.filter((_, index) => index < 12).map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ meal.idMeal }
          >
            <Link to={ `${pathname}/${meal.idMeal}` }>
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
      ))
     }

    </div>
  );
}
export default Meals;
