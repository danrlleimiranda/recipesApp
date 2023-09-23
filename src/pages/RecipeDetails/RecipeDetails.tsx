import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetchDetails from '../../services/fetchDetails';
import { DrinkType, MealType } from '../../types';
import fetchAPI from '../../services/fetchAPI';
import './recipeDetails.css';
import { saveLocalStorage } from '../../utils/isValid';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

function RecipeDetails() {
  const [drinks, setDrinks] = useState<DrinkType[]>([]);
  const [meals, setMeals] = useState<MealType[]>([]);
  const [drinksRecomendation, setDrinksRecomendation] = useState<DrinkType[]>([]);
  const [mealsRecomendation, setMealsRecomendation] = useState<MealType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') && id) {
      const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      if (pathname.includes('drinks') && savedRecipes.drinks && savedRecipes.drinks[id]) {
        setIsInProgress(true);
      }
      if (pathname.includes('meals') && savedRecipes.meals && savedRecipes.meals[id]) {
        setIsInProgress(true);
      }
    }
  }, [pathname, id]);

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

  const sixMealsRecomendations = mealsRecomendation
    ? mealsRecomendation.filter((_, index) => index < 6) : [];
  const sixDrinksRecomendations = drinksRecomendation
    ? drinksRecomendation.filter((_, index) => index < 6) : [];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        const response = await fetchDetails(pathname, id);
        if (pathname.includes('drinks')) {
          setDrinks(response.drinks);
        } else {
          setMeals(response.meals);
        }
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      setDrinks([]);
      setMeals([]);
    };
  }, [id, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (pathname.includes('drinks')) {
        const response = await fetchAPI('/meals', '', '');
        setMealsRecomendation(response.meals);
        setDrinksRecomendation([]);
      } else {
        const response = await fetchAPI('/drinks', '', '');
        setMealsRecomendation([]);
        setDrinksRecomendation(response.drinks);
      }
    };
    fetchData();
  }, [pathname]);

  const handleClick = (recipeId: any) => {
    const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (pathname.includes('drinks')) {
      const inProgressRecipes = {
        ...savedRecipes,
        drinks: {
          [recipeId]: [...drinkIngredients],
        },
      };
      saveLocalStorage('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setIsInProgress(true);
      navigate(`/drinks/${recipeId}/in-progress`);
    } else {
      const inProgressRecipes = {
        ...savedRecipes,
        meals: {
          [recipeId]: [...mealIngredients],
        },
      };
      saveLocalStorage('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setIsInProgress(true);
      navigate(`/meals/${recipeId}/in-progress`);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="recipe-container">
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="" />
      </button>
      <button data-testid="favorite-btn">
        <img src={ favoriteIcon } alt="" />
      </button>
      {drinks.length > 0 ? drinks.map((drink) => (
        <div key={ drink.idDrink } className="recipe-card">
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{drink.strDrink}</h1>
          <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
          <h3>Ingredients</h3>
          { drinkIngredients.map((ingredients, index) => (
            <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{`${ingredients} - ${drinkMeasures[index]}`}</li>
            </ul>
          ))}
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.strInstructions}</p>

        </div>
      )) : meals.map((meal) => (
        <div key={ meal.idMeal } className="recipe-card">
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{meal.strMeal}</h1>
          <h2 data-testid="recipe-category">{meal.strCategory}</h2>
          <h3>Ingredientes</h3>
          { mealIngredients && mealIngredients.map((ingredients, index) => (
            <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{`${ingredients} - ${mealMeasures[index]}`}</li>
            </ul>
          ))}
          <h3>Instructions</h3>
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
      <div className="carousel">
        {mealsRecomendation.length === 0 ? sixDrinksRecomendations.map((drink, index) => (
          <div
            className="recomendation-card"
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <h2 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h2>
            <img src={ drink.strDrinkThumb } alt="" />
          </div>
        )) : sixMealsRecomendations.map((meal, index) => (
          <div
            className="recomendation-card"
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <h2 data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</h2>
            <img src={ meal.strMealThumb } alt="" />
          </div>
        ))}
      </div>

      {!isInProgress
        ? (
          <button
            data-testid="start-recipe-btn"
            onClick={ () => handleClick(id) }
          >
            START RECIPE

          </button>) : (
            <button
              data-testid="start-recipe-btn"
              onClick={ () => handleClick(id) }
            >
              Continue Recipe

            </button>)}
    </div>
  );
}

export default RecipeDetails;
