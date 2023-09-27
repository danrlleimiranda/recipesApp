import { DrinkType, MealType } from '../../types';

type RecipeCardProps = {
  recipe: MealType | DrinkType;
  index: number;
  isMealType: (recipe: MealType | DrinkType) => boolean;
};
function RecipeCard({ recipe, index, isMealType }: RecipeCardProps) {
  return (
    <div
      key={ isMealType(recipe)
        ? (recipe as MealType).idMeal
        : (recipe as DrinkType).idDrink }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <img
        src={
          isMealType(recipe)
            ? (recipe as MealType).strMealThumb
            : (recipe as DrinkType).strDrinkThumb
        }
        alt={
          isMealType(recipe)
            ? (recipe as MealType).strMeal
            : (recipe as DrinkType).strDrink
        }
        data-testid={ `${index}-card-img` }
        className="card-img-top"
        // style={ {
        //   width: '148px',
        //   height: '120px',
        // } }
      />
      <p
        data-testid={ `${index}-card-name` }
        style={ {
          fontSize: '12px',
          padding: '5px 5px',
        } }
      >
        { isMealType(recipe)
          ? (recipe as MealType).strMeal
          : (recipe as DrinkType).strDrink }
      </p>
    </div>
  );
}
export default RecipeCard;
