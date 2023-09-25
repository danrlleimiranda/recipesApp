import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import profileIcon from '../images/profileIcon.svg';

const dataTestTitle = 'page-title';

describe('Testando componente header', () => {
  it('Verificação na page meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchIcon = screen.getByTestId('profile-top-btn');
    expect(getSearchIcon).toHaveAttribute('src', profileIcon);
    const getSearchTopBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(getSearchTopBtn);
    const getTitle = screen.getByTestId(dataTestTitle);
    expect(getTitle).toBeInTheDocument();
    expect(getTitle).toHaveTextContent('Meals');
    const getLogo = screen.getByTestId('logo');
    expect(getLogo).toBeInTheDocument();
    const getSearchInput = screen.getByTestId('search-input');
    const getIngredienteRadio = screen.getByTestId('ingredient-search-radio');
    const getNameSearchRadio = screen.getByTestId('name-search-radio');
    const getFirtsLetterRadio = screen.getByTestId('first-letter-search-radio');
    const getBtnSearch = screen.getByTestId('exec-search-btn');
    expect(getIngredienteRadio).toBeInTheDocument();
    expect(getSearchInput).toBeInTheDocument();
    expect(getBtnSearch).toBeInTheDocument();
    expect(getNameSearchRadio).toBeInTheDocument();
    expect(getFirtsLetterRadio).toBeInTheDocument();
  });
  it('Testando na page drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const getTitle = await screen.findAllByTestId(dataTestTitle);
    expect(getTitle[0]).toBeInTheDocument();
    expect(getTitle[0]).toHaveTextContent('Drinks');
  });
  it('Testando na page Profile', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const getTitle = await screen.findAllByTestId(dataTestTitle);
    expect(getTitle[0]).toBeInTheDocument();
    expect(getTitle[0]).toHaveTextContent('Profile');
  });
  it('Testando na page Done Recipes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });
    const getTitle = await screen.findAllByTestId(dataTestTitle);
    expect(getTitle[0]).toBeInTheDocument();
    expect(getTitle[0]).toHaveTextContent('Done Recipes');
  });
  it('Testando na page Favorite Recipes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/favorite-recipes'] });
    const getTitle = await screen.findAllByTestId(dataTestTitle);
    expect(getTitle[0]).toBeInTheDocument();
    expect(getTitle[0]).toHaveTextContent('Favorite Recipes');
  });
});
