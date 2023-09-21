import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Input from './Input/Input';
import useForms from '../hooks/useForms';
import fetchAPI from '../services/fetchAPI';
import { Dispatch } from '../types';
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
  const dispatch: Dispatch = useDispatch();
  const searchInput = 'search-input';

  const handleSearch = async () => {
    if (form.search === 'primeira-letra' && form[searchInput].length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      dispatch(fetchData(pathname, form.search, form[searchInput]));
      setForm(initialState);
    }
  };
  return (
    <div>
      <Input
        type="text"
        name="search-input"
        id=""
        value={ form['search-input'] }
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />

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

      <button
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Pesquisar

      </button>
    </div>
  );
}
