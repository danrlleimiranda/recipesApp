import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { FavoriteType } from '../../types';

export default function FavoriteRecipes() {
  const [favoritesList, setFavoritesList] = useState<FavoriteType[]>([]);
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(storage);
    setFavoritesList(storage);
  }, []);

  const handleFavorite = (id: string) => {
    const updatedFavorites = favoritesList.filter((recipe) => recipe.id !== id);
    setFavoritesList(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const handleShareClick = (id: string, type: string, index: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {
          setCopyIndex(null);
        }, 3000);
      });
  };

  const filterByAll = () => {
    setFavoritesList(favorites);
  };

  const filterByMeal = () => {
    setFavoritesList(favorites.filter((recipe) => recipe.type === 'meal'));
  };

  const filterByDrink = () => {
    setFavoritesList(favorites.filter((recipe) => recipe.type !== 'meal'));
  };

  return (
    <>
      <Header />
      <button data-testid="filter-by-all-btn" onClick={ filterByAll }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ filterByMeal }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ filterByDrink }>
        Drinks
      </button>
      <div>
        {favoritesList.length > 0 ? (
          <>
            {favoritesList.map((recipe, index) => (
              <div key={ recipe.id }>
                <Link
                  to={ `/${recipe.type}s/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    style={ { width: '150px' } }
                  />
                </Link>
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </h5>
                <Link
                  to={ `/${recipe.type}s/${recipe.id}` }
                >
                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h4>
                </Link>
                <button
                  data-testid={ `btn-Copy${index}` }
                  onClick={ () => handleShareClick(recipe.id, recipe.type, index) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="copiar"
                  />
                </button>
                {copyIndex === index && <p>Link copied!</p>}
                <button
                  data-testid={ `btn-favorite${index}` }
                  onClick={ () => handleFavorite(recipe.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="heart-black"
                  />
                </button>
              </div>
            ))}
          </>
        ) : 'Nenhuma receita favorita.'}
      </div>
      <Footer />
    </>
  );
}
