import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

describe('Testando a page recipes in progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: async () => {},
        readText: async () => 'http://localhost:3000/drinks/178319/in-progress',
      },
    });
  });

  it('Verificação do botão share', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319/in-progress'] });
    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const copiedLink = await window.navigator.clipboard.readText();
    expect(copiedLink).toBe('http://localhost:3000/drinks/178319/in-progress');
  });

  /* it('Verificação do botão favorite', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771/in-progress'] });
    const favoriteRecipe = screen.getByTestId('favorite-btn');
    expect(favoriteRecipe).toBeInTheDocument();
    await userEvent.click(favoriteRecipe);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}]');
    await userEvent.click(favoriteRecipe);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  }); */

  /* it('Verificação do local storage na página de detalhes da receita em drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    const startRecipe = screen.getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    await userEvent.click(startRecipe);
    expect(localStorage.getItem('inProgressRecipes')).toBe('{"drinks":{"178319":["Hpnotiq","Pineapple Juice","Banana Liqueur"]}}');
    expect(window.location.href).toBe('http://localhost:3000/drinks/178319/in-progress');
  }); */
});
