import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchDetails from '../../services/fetchDetails';
import { DrinkType, MealType } from '../../types';

function RecipeDetails() {
  const [drinks, setDrinks] = useState<DrinkType[]>([]);
  const [meals, setMeals] = useState<MealType[]>([]);
  const { pathname } = useLocation();

  console.log(drinks);

  const { id } = useParams();

  const drinkIngredients = drinks.length > 0 ? drinks.map((drink) => {
    return Object.entries(drink).filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== null && entry[1] !== '');
  }).flat(2).filter((_, index) => index % 2 === 1) : [];

  const drinkMeasures = drinks.map((drink) => {
    return Object.entries(drink).filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== null && entry[1] !== '');
  }).flat(2).filter((_, index) => index % 2 === 1);

  const mealIngredients = meals.length > 0 ? meals.map((meal) => {
    return Object.entries(meal).filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== null && entry[1] !== '');
  }).flat(2).filter((_, index) => index % 2 === 1) : [];

  const mealMeasures = meals.map((meal) => {
    return Object.entries(meal).filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== null && entry[1] !== '');
  }).flat(2).filter((_, index) => index % 2 === 1);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await fetchDetails(pathname, id);
        if (pathname.includes('drinks')) {
          setDrinks(response.drinks);
        } else {
          setMeals(response.meals);
        }
      }
    };
    fetchData();

    return () => {
      setDrinks([]);
      setMeals([]);
    };
  }, [id, pathname]);

  return (
    <div>
      {drinks.length > 0 ? drinks.map((drink) => (
        <div key={ drink.idDrink }>
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{drink.strDrink}</h1>
          <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
          <h3>Ingredients</h3>
          { drinkIngredients.map((ingredients, index) => (
            <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{ingredients}</li>
              <li>{drinkMeasures[index]}</li>
            </ul>
          ))}
          <p data-testid="instructions">{drink.strInstructions}</p>

        </div>
      )) : meals.map((meal) => (
        <div key={ meal.idMeal }>
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{meal.strMeal}</h1>
          <h2 data-testid="recipe-category">{meal.strCategory}</h2>
          <p>Ingredientes</p>
          { mealIngredients && mealIngredients.map((ingredients, index) => (
            <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{ingredients}</li>
              <li>{mealMeasures[index]}</li>
            </ul>
          ))}
          <p data-testid="instructions">{meal.strInstructions}</p>

          <iframe
            width="320"
            height="300"
            src={ `${meal.strYoutube.replace('watch?v=', 'embed/')}` }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
         gyroscope; picture-in-picture; web-share"
            data-testid="video"
          />

        </div>

      ))}

    </div>
  );
}

export default RecipeDetails;
