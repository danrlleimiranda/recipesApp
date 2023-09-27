import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../../types';
import fetchDetails from '../../services/fetchDetails';
import shareIcon from '../../images/shareIcon.svg';
import { saveLocalStorage } from '../../utils/isValid';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import notFavoriteIcon from '../../images/whiteHeartIcon.svg';
import './recipeInProgress.css';

export default function RecipeInProgress() {
  const [inProgress, setInProgress] = useState<
  { [key: string]: { [key: string]: string[] } }>({
    drinks: {},
    meals: {},
  });
  const [mealRecipe, setMealRecipe] = useState<MealType[] >([]);
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType[] >([]);
  const [copy, setCopy] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<any[]>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [form, setForm] = useState<string[]>(ingredients);
  const { id } = useParams();
  const { pathname } = useLocation();
  const route = pathname.includes('meals') ? 'meals' : 'drinks';
  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null && id) {
      const inProgressLocal = { [route]: { [id]: form } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressLocal));
    }
    const inProgressLocalStorage = localStorage.getItem('inProgressRecipes') || '{}';
    if (id && inProgressLocalStorage) {
      const recipesInProgress = !inProgressLocalStorage ? []
        : JSON.parse(inProgressLocalStorage);
      setForm(recipesInProgress[route][id]);
      setInProgress(recipesInProgress);
    }
    const updatedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (updatedFavoriteRecipes) {
      const isFavoriteRecipe = updatedFavoriteRecipes
        .some((recipe: any) => recipe.id === id);
      setIsFavorite(isFavoriteRecipe);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await fetchDetails(route, id);
        if (route === 'meals') {
          setMealRecipe(response.meals);
          const mealIngredients = response.meals
            .map((meal: MealType) => Object.entries(meal)
              .filter((entry) => entry[0]
                .includes('strIngredient') && entry[1] !== null && entry[1] !== ''))
            .flat(2).filter((_: any, index: number) => index % 2 === 1);
          const filteredMealIngredients = mealIngredients
            .filter((item: any) => item !== null && item !== '');
          setIngredients(filteredMealIngredients);
        } else {
          setDrinkRecipe(response.drinks);
          const mealIngredients = response.drinks
            .map((drink: DrinkType) => Object.entries(drink)
              .filter((entry) => entry[0]
                .includes('strIngredient') && entry[1] !== null && entry[1] !== ''))
            .flat(2).filter((_: any, index: number) => index % 2 === 1);
          const filteredDrinkIngredients = mealIngredients
            .filter((item: any) => item !== null && item !== '');

          setIngredients(filteredDrinkIngredients);
        }
      }
    };
    fetchData();
  }, [id, pathname, route]);
  const handleCopy = () => {
    const link = new URL(window.location.href);
    const url = link.href.replace('/in-progress', '');
    const timer = () => {
      setTimeout(() => {
        setCopy(false);
        setCopyError(false);
      }, 3000);
    };
    navigator.clipboard.writeText(`${url}`).then(
      () => {
        setCopy(true);
        timer();
      },
      () => {
        setCopyError(true);
        timer();
      },
    );
  };
  const handleFavorite = (recipeId: string) => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const updatedFavoriteRecipes = [...savedRecipes];
    let isRecipeInFavorites = false;
    const recipeData: any = mealRecipe.length > 0 ? mealRecipe[0] : drinkRecipe[0];
    const type = pathname.includes('drinks') ? 'drink' : 'meal';

    updatedFavoriteRecipes.forEach((recipes: any, index: number) => {
      if (recipes.id === recipeId) {
        updatedFavoriteRecipes.splice(index, 1);
        isRecipeInFavorites = true;
      }
    });
    if (!isRecipeInFavorites) {
      updatedFavoriteRecipes.push({
        id: recipeId,
        type,
        nationality: type === 'meal' ? (recipeData.strArea || '') : '',
        category: recipeData.strCategory || '',
        alcoholicOrNot: type === 'drink' ? recipeData.strAlcoholic : '',
        name: recipeData.strDrink || recipeData.strMeal || '',
        image: recipeData.strDrinkThumb || recipeData.strMealThumb || '',
      });
    }
    saveLocalStorage('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setIsFavorite(!isRecipeInFavorites);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (id && !form.includes(target.id)) {
      setForm([...form, target.id]);
      const alreadyInLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes') || '{}');
      const updateInProgress = { ...alreadyInLocalStorage,
        [route]: { ...alreadyInLocalStorage[route], [id]: [...form, target.id] } };
      setInProgress(updateInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateInProgress));
    }
    if (id && form.includes(target.id)) {
      setForm(form
        .filter((item: string) => item !== target.id));
      const alreadyInLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes') || '{}');
      const updateInProgress = { ...alreadyInLocalStorage,
        [route]: { ...alreadyInLocalStorage[route],
          [id]: [...alreadyInLocalStorage[route][id]]
            .filter((item: string) => item !== target.id) } };
      setInProgress(updateInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateInProgress));
    }
  };
  return (
    <div>
      <div className="top-btns">
        <button data-testid="share-btn" onClick={ () => handleCopy() }>
          <img src={ shareIcon } alt="" />
        </button>
        {copy && <p>Link copied!</p>}
        {copyError && <p>Erro ao copiar link!</p>}
        <button
          onClick={ () => handleFavorite(id as string) }

        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite
              ? favoriteIcon : notFavoriteIcon }
            alt=""

          />
        </button>
      </div>
      {(id && mealRecipe) && pathname.includes('meals')
        ? mealRecipe.map((item: MealType) => (
          <div key={ item.idMeal } className="recipe-card">
            <h1 data-testid="recipe-title">{item.strMeal}</h1>
            <img src={ item.strMealThumb } alt="" data-testid="recipe-photo" />
            <h2 data-testid="recipe-category">{item.strCategory}</h2>
            <p data-testid="instructions">{item.strInstructions}</p>
            <div className="ingredientes">

              <h3>Ingredients</h3>
              <ul className="checkboxes">
                {(ingredients) && ingredients
                  .map((ingredient: string, index: number) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      className={ inProgress[route][id] && !inProgress[route][id]
                        .includes(ingredient) ? 'checked' : '' }
                    >
                      <label
                        htmlFor={ ingredient }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          value={ ingredient }
                          id={ ingredient }
                          checked={ inProgress[route][id]
                            && !inProgress[route][id].includes(ingredient) }
                          name="ingredient"
                          onChange={ (e) => handleChange(e) }
                          data-testid={ `${index}-checkbox` }
                        />
                        {ingredient}
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )) : drinkRecipe.map((item) => (
          <div key={ item.idDrink } className="recipe-card">
            <img src={ item.strDrinkThumb } alt="" data-testid="recipe-photo" />
            <h1 data-testid="recipe-title">{item.strDrink}</h1>
            <p data-testid="recipe-category">{item.strAlcoholic}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            <div className="ingredientes">
              <h3>Ingredients</h3>
              <ul>
                {(ingredients && id)
            && ingredients.map((ingredient: string, index: number) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ inProgress[route][id]
                  && !inProgress[route][id].includes(ingredient) ? 'checked' : '' }
              >
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    value={ ingredient }
                    id={ ingredient }
                    name="ingredient"
                    checked={ inProgress[route][id]
                      && !inProgress[route][id].includes(ingredient) }
                    onChange={ (e) => handleChange(e) }
                    data-testid={ `${index}-checkbox` }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
              </ul>
            </div>
          </div>
        )) }
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}
