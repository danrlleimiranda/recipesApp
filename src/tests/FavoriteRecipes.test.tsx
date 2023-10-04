import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

describe('Testando os filtros da page favorite recipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('Verificação dos elementos na página', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });

    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();
    const filterByMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterByMeal).toBeInTheDocument();
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterByDrink).toBeInTheDocument();
    const noFavoriteRecipes = screen.getByText('Nenhuma receita favorita.');
    expect(noFavoriteRecipes).toBeInTheDocument();
  });

  /* it('Verificação dos elementos na página', async () => {
    localStorage.setItem('favoriteRecipes', '"{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}" ');
    localStorage.setItem('favoriteRecipes', '"{"id":"178319","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"Aquamarine","image":"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"}" ');
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });

    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();
    const filterByMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterByMeal).toBeInTheDocument();
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterByDrink).toBeInTheDocument();

    await waitFor(() => {
      const meal = screen.getByAltText('Spicy Arrabiata Penne');
      expect(meal).toBeInTheDocument();
      expect(localStorage.getItem('favoriteRecipes')).toBe('[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"},{"id":"178319","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"Aquamarine","image":"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"}]');
    });
  }); */
});
