import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/routes/Router';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Router />
    </div>
  );
}

export default App;
