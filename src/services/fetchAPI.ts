const fetchAPI = async (path: string, param: string, searchInput: string) => {
  if (path === 'meals') {
    switch (param) {
      case 'ingrediente': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        const data = await response.json();
        return data;
      }
      case 'nome': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        return data;
      }
      case 'first-letter': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const data = await response.json();
        return data;
      }
      default: {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        return data;
      }
    }
  }

  if (path === 'drinks') {
    switch (param) {
      case 'ingrediente': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        const data = await response.json();
        return data;
      }
      case 'nome': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        return data;
      }
      case 'first-letter': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const data = await response.json();
        return data;
      }
      default: {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        return data;
      }
    }
  }
};

export default fetchAPI;
