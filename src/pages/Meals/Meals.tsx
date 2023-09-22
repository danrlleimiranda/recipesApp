import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GlobalStateType } from '../../types';

function Meals() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  const navigate = useNavigate();

  if (meals && meals.length === 1) {
    navigate(`/meals/${meals[0].idMeal}`);
  }
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      } }
    >
      {
      meals && meals.filter((_, index) => index < 12).map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))
     }

    </div>
  );
}
export default Meals;
