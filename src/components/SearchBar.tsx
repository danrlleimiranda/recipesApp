import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useForms from '../hooks/useForms';
import { fetchAPI } from '../services/fetchAPI';

export default function SearchBar() {
  const { form, handleChange } = useForms(
    {
      search: '',
      'search-input': '',
    },
  );
  const [searchResult, setSearchResult] = useState([]);
  const { pathname } = useLocation();

  const handleSearch = async () => {
    if (form.search === 'first-letter' && form['search-input'].length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      const response = await fetchAPI(pathname, form.search, form['search-input']);
      setSearchResult(response);
    }
  };
  return (
    <div>
      <label htmlFor="">
        <input
          type="text"
          name="search-input"
          id=""
          data-testid="search-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="">
        Ingredient
        <input
          type="radio"
          name="search"
          value="ingrediente"
          data-testid="ingredient-search-radio"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="">
        Name
        <input
          type="radio"
          name="search"
          value="nome"
          data-testid="name-search-radio"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="">
        first letter
        <input
          type="radio"
          name="search"
          value="primeira-letra"
          data-testid="first-letter-search-radio"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>Pesquisar</button>
    </div>
  );
}
