import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DrinkType, GlobalStateType, MealType } from '../../types';
import { fetchAPI } from '../../services/fetchAPI';

function Recipes() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  const drinks = useSelector((state: GlobalStateType) => state.recepiesReducer.drinks);
  const [initialDrinks, setInitialDrinks] = useState<DrinkType[]>([]);
  const [initialMeals, setInitialMeal] = useState<MealType[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!meals) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (!drinks) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (pathname.includes('meals')) {
        const response = await fetchAPI(pathname, '', '');
        setInitialMeal(response.meals.filter((_: any, index: number) => index < 12));
      } else {
        const response = await fetchAPI(pathname, '', '');
        setInitialDrinks(response.drinks.filter((_: any, index: number) => index < 12));
      }
    };
    fetchData();
  }, [pathname]);

  if (meals && meals.length === 1) {
    navigate(`/meals/${meals[0].idMeal}`);
  }

  if (drinks && drinks.length === 1) {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div
      className="container"
    >

      {pathname === '/meals'
      && (meals.length === 0) ? initialMeals
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
          )) : meals.map((meal, index) => (
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
        ))}

      {pathname === '/drinks' && (drinks.length === 0) ? initialDrinks
        .filter((_, index) => index < 13).map((drink, index) => (

          <div
            className="card"
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <Link
              to={ `${pathname}/${drink.idDrink}` }
            >
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        )) : (drinks
        .map((drink, index) => (

          <div
            className="card"
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <Link
              to={ `${pathname}/${drink.idDrink}` }
            >
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        ))) }

    </div>
  );
}
export default Recipes;
