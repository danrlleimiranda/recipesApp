import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GlobalStateType } from '../../types';

function Drinks() {
  const drinks = useSelector((state: GlobalStateType) => state.recepiesReducer.drinks);
  const navigate = useNavigate();
  if (drinks && drinks.length === 1) {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }
  return (
    <div data-testid="page-title" className="container">
      {drinks && drinks.filter((_, index) => index < 12).map((drink, index) => (
        <div
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}
export default Drinks;
