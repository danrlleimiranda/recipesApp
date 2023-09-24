import { Route, Routes } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';
import DoneRecipes from '../../pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from '../../pages/FavoriteRecipes/FavoriteRecipes';
import HeaderLayout from '../../layout/HeaderLayout';
import FooterLayout from '../../layout/FooterLayout';
import Login from '../../pages/Login/Login';
import MealDetails from '../../pages/Details/MealDetails';
import DrinkDetails from '../../pages/Details/DrinkDetails';
import Recipes from '../Recipes/Recipes';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route path="/" element={ <HeaderLayout /> }>
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/" element={ <FooterLayout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/meals/:id-da-receita" element={ <MealDetails /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/drinks/:id-da-receita" element={ <DrinkDetails /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
      </Route>
    </Routes>
  //
  // <Route path="/meals/:id-da-receita" element={ <Login /> } />
  // <Route path="/drinks/:id-da-receita" element={ <Login /> } />
  // <Route path="/meals/:id-da-receita/in-progress" element={ <Login /> } />
  // <Route path="/drinks/:id-da-receita/in-progress" element={ <Login /> } />
  //
  );
}
export default Router;
