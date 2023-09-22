import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GlobalStateType } from '../../types';

function Meals() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (!meals) {
    window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  if (meals && meals.length === 1) {
    navigate(`/meals/${meals[0].idMeal}`);
  }
  return (
    <div
      className="container"
    >

      {
      meals && meals.filter((_, index) => index < 12).map((meal, index) => (
        <Link to={ `${pathname}/${meal.idMeal}` } key={ meal.idMeal }>
          <div data-testid={ `${index}-recipe-card` } className="card">
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      ))
     }

    </div>
  );
}
export default Meals;
