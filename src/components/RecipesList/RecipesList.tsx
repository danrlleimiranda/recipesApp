import { Link } from 'react-router-dom';
import { DrinkType, MealType } from '../../types';
import RecipeCard from '../RecipeCard/RecipeCard';

type RecipesListProps = {
  recipes: (MealType | DrinkType)[];
  pathname: string;
  isMealType: (recipe: MealType | DrinkType) => boolean;
};

function RecipesList({ recipes, pathname, isMealType }: RecipesListProps) {
  return (
    <div className="container">
      {
        recipes && recipes
          .filter((_, index) => index < 12)
          .map((recipe, index) => (
            <Link
              to={ `${pathname}/${isMealType(recipe)
                ? (recipe as MealType).idMeal
                : (recipe as DrinkType).idDrink}` }
              key={ isMealType(recipe)
                ? (recipe as MealType).idMeal
                : (recipe as DrinkType).idDrink }
            >
              <RecipeCard
                recipe={ recipe }
                index={ index }
                isMealType={ isMealType }
              />
            </Link>
          ))
      }
    </div>
  );
}
export default RecipesList;
