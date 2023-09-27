import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../../types';
import fetchDetails from '../../services/fetchDetails';
import shareIcon from '../../images/shareIcon.svg';
import { saveLocalStorage } from '../../utils/isValid';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import notFavoriteIcon from '../../images/whiteHeartIcon.svg';
import './recipeInProgress.css';
import InProgress from '../../components/InProgress/InProgress';

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
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [form, setForm] = useState<string[]>(ingredients);
  const { id } = useParams();
  const { pathname } = useLocation();
  const route = pathname.includes('meals') ? 'meals' : 'drinks';
  useEffect(() => {
    const updatedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (updatedFavoriteRecipes) {
      const isFavoriteRecipe = updatedFavoriteRecipes
        .some((recipe: any) => recipe.id === id);
      setIsFavorite(isFavoriteRecipe);
    }
  }, []);
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;

      const response = await fetchDetails(route, id);
      const ingredientKey = 'strIngredient';

      if (route === 'meals') {
        setMealRecipe(response.meals);
      } else {
        setDrinkRecipe(response.drinks);
      }

      const recipeIngredients = response[route === 'meals' ? 'meals' : 'drinks']
        .map((item: any) => Object.entries(item)
          .filter(([key, value]) => key
            .includes(ingredientKey) && value !== null && value !== ''))
        .flat(2)
        .filter((_: any, index: number) => index % 2 === 1);

      const inProgressLocalStorage = localStorage.getItem('inProgressRecipes');
      const recipesInProgress = !inProgressLocalStorage
        ? { [route]: { [id]: [...recipeIngredients] } }
        : JSON.parse(inProgressLocalStorage);

      setForm(recipesInProgress[route][id]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
      setInProgress(recipesInProgress);
      setIngredients(recipeIngredients);
    };

    fetchRecipeDetails();
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
      <InProgress
        pathname={ pathname }
        mealRecipe={ mealRecipe }
        drinkRecipe={ drinkRecipe }
        ingredients={ ingredients }
        handleChange={ handleChange }
        inProgress={ inProgress }
        route={ route }
        id={ id as string }
      />
    </div>
  );
}
