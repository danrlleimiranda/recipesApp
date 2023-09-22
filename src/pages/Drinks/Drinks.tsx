import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DrinkType, GlobalStateType } from '../../types';
import fetchAPI from '../../services/fetchAPI';

function Drinks() {
  const drinks = useSelector((state: GlobalStateType) => state.recepiesReducer.drinks);
  const [initialDrinks, setInitialDrinks] = useState<DrinkType[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAPI(pathname, '', '');
      setInitialDrinks(response.drinks.filter((_: any, index: number) => index < 12));
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  if (!drinks) {
    window.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  if (drinks && drinks.length === 1) {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }
  return (
    <div data-testid="page-title" className="container">
      {drinks.length === 0 ? initialDrinks
        .filter((_, index) => index < 13).map((drink, index) => (
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
        )) : (drinks
        .filter((_, index) => index < 13).map((drink, index) => (
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
          </Link>))) }
    </div>
  );
}
export default Drinks;
