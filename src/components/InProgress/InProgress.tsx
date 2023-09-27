import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DrinkType, MealType } from '../../types';
import { saveLocalStorage } from '../../utils/isValid';

type InProgressProps = {
  pathname: string;
  mealRecipe: MealType[];
  drinkRecipe: DrinkType[];
  ingredients: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inProgress: { [key: string]: { [key: string]: string[] } };
  route: string;
  id: string;
};
export default function InProgress({ pathname,
  mealRecipe,
  drinkRecipe,
  ingredients,
  handleChange,
  inProgress,
  route,
  id }: InProgressProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    if (pathname.includes('meals')) {
      const meal = mealRecipe.map((item: MealType) => ({
        id: item.idMeal,
        type: 'meal',
        nationality: item.strArea,
        category: item.strCategory,
        alcoholicOrNot: '',
        name: item.strMeal,
        image: item.strMealThumb,
        doneDate: new Date(),
        tags: item.strTags ? item.strTags.split(',') : [],
      }));
      saveLocalStorage('doneRecipes', JSON.stringify([...doneRecipes, ...meal]));
    } else {
      const drink = drinkRecipe.map((item: DrinkType) => ({
        id: item.idDrink,
        type: 'drink',
        nationality: '',
        category: item.strCategory,
        alcoholicOrNot: item.strAlcoholic,
        name: item.strDrink,
        image: item.strDrinkThumb,
        doneDate: new Date(),
        tags: item.strTags ? item.strTags.split(',') : [],
      }));
      saveLocalStorage('doneRecipes', JSON.stringify([...doneRecipes, ...drink]));
    }

    navigate('/done-recipes');
  };
  return (
    <div>
      I
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
                        className={ inProgress[route][id] && !inProgress[route][id]
                          .includes(ingredient) ? 'checked' : '' }
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
              className={ inProgress[route][id]
                && !inProgress[route][id].includes(ingredient) ? 'checked' : '' }
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
        disabled={ inProgress[route][id]
       && inProgress[route][id].length > 0 }
        onClick={ () => handleClick() }
      >
        Finish Recipe
      </button>

    </div>
  );
}
