const fetchDetails = async (path: string, id: string) => {
  if (path.includes('meals')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }

  if (path.includes('drinks')) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }
};

export default fetchDetails;
