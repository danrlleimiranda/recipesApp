import { Route, Routes } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';
import DoneRecipes from '../../pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from '../../pages/FavoriteRecipes/FavoriteRecipes';
import HeaderLayout from '../../layout/HeaderLayout';
import FooterLayout from '../../layout/FooterLayout';
import Login from '../../pages/Login/Login';

import Recipes from '../../pages/Recipes/Recipes';
import RecipeDetails from '../../pages/RecipeDetails/RecipeDetails';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route path="/" element={ <HeaderLayout /> }>
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/" element={ <FooterLayout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/drinks/:id" element={ <RecipeDetails /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
      </Route>
    </Routes>
  );
}
export default Router;
