import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Recipes from '../../pages/Recipes/index';
=======
>>>>>>> 3eb2bc2fb4ed0be3c4b008965b77a38db6033771
import Profile from '../../pages/Profile/Profile';
import DoneRecipes from '../../pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from '../../pages/FavoriteRecipes/FavoriteRecipes';
import HeaderLayout from '../../layout/HeaderLayout';
import FooterLayout from '../../layout/FooterLayout';
import Login from '../../pages/Login/Login';
<<<<<<< HEAD
import RecipeDetails from '../../pages/RecipeDetails/RecipeDetails';
import MealDetails from '../../pages/Details/MealDetails';
import DrinkDetails from '../../pages/Details/DrinkDetails';
import Recipes from '../Recipes/Recipes';
=======
import Recipes from '../../pages/Recipes/Recipes';
import RecipeDetails from '../../pages/RecipeDetails/RecipeDetails';
>>>>>>> 3eb2bc2fb4ed0be3c4b008965b77a38db6033771

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route path="/" element={ <HeaderLayout /> }>
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/" element={ <FooterLayout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/meals/:id-da-receita" element={ <RecipeDetails /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/drinks/:id-da-receita" element={ <RecipeDetails /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
      </Route>
    </Routes>
  );
}
export default Router;
