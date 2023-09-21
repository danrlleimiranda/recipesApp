import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from '../../pages/Login/Login';
import Header from '../Header/Header';
import Layout from '../../layout/Layout';
import Meals from '../../pages/Meals/Meals';
import Drinks from '../../pages/Drinks/Drinks';
import Profile from '../../pages/Profile/Profile';
import DoneRecipes from '../../pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from '../../pages/FavoriteRecipes/FavoriteRecipes';

function Router() {
  const [login, setLogin] = useState(false);
  // Mentoria: Perguntar sobre o login
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
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
