import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, InProgressType, MealType } from '../../types';
import fetchDetails from '../../services/fetchDetails';
import shareIcon from '../../images/shareIcon.svg';
import { saveLocalStorage } from '../../utils/isValid';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import notFavoriteIcon from '../../images/whiteHeartIcon.svg';
import './recipeInProgress.css';

type FormType = {
  [key: string]: boolean
};

export default function RecipeInProgress() {
  const [inProgress, setInProgress] = useState<InProgressType>({
    drinks: {},
    meals: {},
  });
  const [recipe, setRecipe] = useState([]);
  const [copy, setCopy] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [form, setForm] = useState<FormType>({});

  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const inProgressLocalStorage = localStorage.getItem('inProgressRecipes');
    const recipesInProgress = inProgressLocalStorage === null
      ? {
        drinks: {},
        meals: {},
      } : JSON.parse(inProgressLocalStorage);
    const route = pathname.includes('meals') ? 'meals' : 'drinks';

    if (id) {
      setInProgress({ ...recipesInProgress });
    }

    const fetchData = async () => {
      if (id) {
        const response = await fetchDetails(route, id);
        if (route === 'meals') { setRecipe(response.meals); } else {
          setRecipe(response.drinks);
        }
      }
    };
    fetchData();
  }, [id, pathname]);

  const handleCopy = () => {
    const link = window.location.href;
    const timer = () => {
      setTimeout(() => {
        setCopy(false);
        setCopyError(false);
      }, 3000);
    };
    navigator.clipboard.writeText(`${link}`).then(
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

  const handleFavorite = (recipeId: any) => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const updatedFavoriteRecipes = [...savedRecipes];
    let isRecipeInFavorites = false;

    const recipeData: any = recipe[0];
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
    setForm({ ...form, [target.id]: target.checked });
  };
  return (
    <div>
      <div className="top-btns">
        <button data-testid="share-btn" onClick={ () => handleCopy() }>
          <img src={ shareIcon } alt="" />
        </button>
        {copy && <p>Link copied!</p>}
        {copyError && <p>Erro ao copiar link!</p>}
        <button onClick={ () => handleFavorite(id) }>
          <img
            src={ !isFavorite ? notFavoriteIcon : favoriteIcon }
            alt=""
            data-testid="favorite-btn"
          />
        </button>
      </div>
      {(id && recipe) && pathname.includes('meals') ? recipe.map((item: MealType) => (
        <div key={ item.idMeal } className="recipe-card">
          <h1 data-testid="recipe-title">{item.strMeal}</h1>
          <img src={ item.strMealThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-category">{item.strCategory}</h2>
          <p data-testid="instructions">{item.strInstructions}</p>
          <div className="ingredientes">

            <h3>Ingredients</h3>
            <ul className="checkboxes">
              {(id && inProgress.meals[id]) && inProgress.meals[id]
                .map((ingredient: string, index: number) => (
                  <li key={ index }>

                    <label
                      htmlFor={ ingredient }
                      data-testid={ `${index}-ingredient-step` }
                      className={ form[ingredient] ? 'checked' : '' }
                    >
                      <input
                        type="checkbox"
                        value={ ingredient }
                        id={ ingredient }
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
      )) : recipe.map((item: DrinkType) => (
        <div key={ item.idDrink } className="recipe-card">
          <img src={ item.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{item.strDrink}</h1>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          <div className="ingredientes">

            <h3>Ingredients</h3>
            <ul>

              {(id && inProgress.drinks[id])
            && inProgress.drinks[id].map((ingredient: string, index: number) => (
              <li key={ index }>
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ form[ingredient] ? 'checked' : '' }
                >
                  <input
                    type="checkbox"
                    value={ ingredient }
                    id={ ingredient }
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
