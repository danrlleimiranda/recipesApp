import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Header from '../Header/Header';
import Layout from '../../layout/Layout';
import Meals from '../../pages/Meals/Meals';
import Drinks from '../../pages/Drinks/Drinks';

function Router() {
  return (
    <Routes>
      <Route path="/login" index element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        {/* <Route path="profile" element={ <Profile} />
        <Route path="done-recipes" element={ <DoneRecipes} />
        <Route path="favorite-recipes" element={ <FavoriteRecipes} /> */}
      </Route>
      {/*
      <Route path="/meals/:id-da-receita" element={ <Login /> } />
      <Route path="/drinks/:id-da-receita" element={ <Login /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Login /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Login /> } />
      */}
    </Routes>
  );
}
export default Router;
