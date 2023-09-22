import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GlobalStateType } from '../../types';

function Drinks() {
  const drinks = useSelector((state: GlobalStateType) => state.recepiesReducer.drinks);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (!drinks) {
    window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  if (drinks && drinks.length === 1) {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }
  return (
    <div data-testid="page-title" className="container">
      {drinks && drinks.filter((_, index) => index < 12).map((drink, index) => (
        <Link
          to={ `${pathname}/${drink.idDrink}` }
          key={ drink.idDrink }

        >
          <div
            className="card"
            data-testid={ `${index}-recipe-card` }

          >
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Drinks;
