import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  type ListType = {
    id: string,
    type: string,
    nationality: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
    doneDate: string,
    tags: string,
  };

  const [listFavorites, setListFavorites] = useState<ListType[]>([]);
  const [globlalListFavorites, setGlobalListFavorites] = useState<ListType[]>([]);
  const [copy, setCopy] = useState('');
  const [clicked, setClicked] = useState<number>();

  const handleFavorite = (id: string) => {
    const newList = listFavorites.filter((list) => list.id !== id);
    setListFavorites(newList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  };

  const handleDrinksFilter = () => {
    setListFavorites(globlalListFavorites.filter((list) => list.type !== 'meal'));
  };

  const handleMealsFilter = () => {
    setListFavorites(globlalListFavorites.filter((list) => list.type === 'meal'));
  };
  const handleCopy = (id: string, index: number, type: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
      .then(() => setCopy('Link copied!'))
      .catch(() => console.log('erro'));
    setClicked(index);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setGlobalListFavorites(data);
    setListFavorites(data);
  }, []);
  return (
    <div>
      <Header />

      <section>
        <button
          onClick={ () => setListFavorites(globlalListFavorites) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ handleMealsFilter }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ handleDrinksFilter }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        { listFavorites.length > 0 ? (
          <>
            { listFavorites.map((list, index) => (
              <div key={ list.id }>
                <Link
                  to={ list.type === 'meal' ? `http://localhost:3000/meals/${list.id}`
                    : `http://localhost:3000/drinks/${list.id}` }
                >
                  <img
                    style={ { width: '150px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ list.image }
                    alt={ list.name }
                  />
                </Link>
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { list.type === 'meal' ? `${list.nationality} - ${list.category} `
                    : `${list.alcoholicOrNot}`}
                </h5>
                <Link
                  to={ list.type === 'meal' ? `http://localhost:3000/meals/${list.id}`
                    : `http://localhost:3000/drinks/${list.id}` }
                >
                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {list.name}
                  </h4>
                </Link>
                <button
                  data-testid={ `btn-Copy${index}` }
                  onClick={ () => handleCopy(list.id, index, list.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="copiar"
                  />
                </button>
                { clicked === index && <p>{copy}</p>}
                <button
                  data-testid={ `btn-favorite${index}` }
                  onClick={ () => handleFavorite(list.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="heart-black"
                  />
                </button>
              </div>
            ))}
          </>) : 'Nenhuma receita favorita.'}
      </section>
    </div>
  );
}
