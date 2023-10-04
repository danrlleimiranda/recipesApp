import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

describe('Testando a page recipe details', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: async () => {},
        readText: async () => 'http://localhost:3000/meals/52771',
      },
    });
  });

  const loading = 'Loading...';

  it('Verificação do local storage na página de detalhes da receita em drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });
    await waitForElementToBeRemoved(() => screen.getByText(loading));
    const startRecipe = screen.getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    await userEvent.click(startRecipe);
    expect(localStorage.getItem('inProgressRecipes')).toBe('{"drinks":{"178319":["Hpnotiq","Pineapple Juice","Banana Liqueur"]}}');
  });

  it('Verificação do local storage na página de detalhes da receita em meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771'] });
    await waitForElementToBeRemoved(() => screen.getByText(loading));
    const startRecipe = screen.getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    await userEvent.click(startRecipe);
    expect(localStorage.getItem('inProgressRecipes')).toBe('{"drinks":{"178319":["Hpnotiq","Pineapple Juice","Banana Liqueur"]},"meals":{"52771":["penne rigate","olive oil","garlic","chopped tomatoes","red chile flakes","italian seasoning","basil","Parmigiano-Reggiano"]}}');
  });

  it('Verificação do botão share', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });
    await waitForElementToBeRemoved(() => screen.getByText(loading));
    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const copiedLink = await window.navigator.clipboard.readText();
    expect(copiedLink).toBe('http://localhost:3000/meals/52771');
  });

  it('Verificação do botão favorite', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771'] });
    await waitForElementToBeRemoved(() => screen.getByText(loading));
    const favoriteRecipe = screen.getByTestId('favorite-btn');
    expect(favoriteRecipe).toBeInTheDocument();
    await userEvent.click(favoriteRecipe);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}]');
    await userEvent.click(favoriteRecipe);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });
});
