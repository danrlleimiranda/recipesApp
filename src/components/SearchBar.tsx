import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from './Input/Input';
import useForms from '../hooks/useForms';
import { Dispatch, GlobalStateType } from '../types';
import { fetchData } from '../redux/actions';

export default function SearchBar() {
  const initialState = {
    search: 'ingrediente',
    'search-input': '',
  };
  const { form, setForm, handleChange } = useForms(
    initialState,
  );

  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[1];
  const dispatch: Dispatch = useDispatch();
  const searchInput = 'search-input';
  const navigate = useNavigate();
  const recipes = useSelector((state: GlobalStateType) => state
    .recipesReducer[currentPath]);

  const handleSearch = () => {
    if (form.search === 'primeira-letra' && form[searchInput].length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      dispatch(fetchData(pathname, form.search, form[searchInput]));
      setForm(initialState);
    }
  };

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      if ('idMeal' in recipes[0]) {
        navigate(`${pathname}/${recipes[0].idMeal}`);
      } else if ('idDrink' in recipes[0]) {
        navigate(`${pathname}/${recipes[0].idDrink}`);
      }
    }
  }, [recipes]);

  return (
    <div className="searchBar">
      <Input
        type="text"
        name="search-input"
        id=""
        value={ form['search-input'] }
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <div className="radios">

        <Input
          label="Ingredient"
          type="radio"
          name="search"
          value="ingrediente"
          data-testid="ingredient-search-radio"
          onChange={ (e) => handleChange(e) }
        />

        <Input
          label="Name"
          type="radio"
          name="search"
          value="nome"
          data-testid="name-search-radio"
          onChange={ (e) => handleChange(e) }
        />
        <Input
          label="First Letter"
          type="radio"
          name="search"
          value="primeira-letra"
          data-testid="first-letter-search-radio"
          onChange={ (e) => handleChange(e) }
        />
      </div>

      <button
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Search

      </button>
    </div>
  );
}
