import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

const dataTestTitle = 'page-title';
const searchTestBtn = 'search-top-btn';
const searchTestInput = 'search-input';
const execSearchTestBtn = 'exec-search-btn';
const nameSearchTestRadio = 'name-search-radio';
const notFoundAlert = 'Sorry, we haven\'t found any recipes for these filters.';

describe('Testando a searchbar', () => {
  it('Verificação da rota /meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getTitle = screen.getByTestId(dataTestTitle);
    expect(getTitle).toBeInTheDocument();
    expect(getTitle).toHaveTextContent('Meals');
  });

  it('Retorno unico de name na rota /meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Arrabiata');
    const getNameRadio = screen.getByTestId(nameSearchTestRadio);
    await userEvent.click(getNameRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    await waitForElementToBeRemoved(() => screen.getByText('First Letter'));
    await screen.findByTestId('recipe-title');
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
  });

  it('Retorno unico de first letter na rota /meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Su');
    const getNameRadio = screen.getByTestId('first-letter-search-radio');
    await userEvent.click(getNameRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    expect(window.alert('Your search must have only 1 (one) character'));
  });

  it('Retorno unico de erro na rota /meals first letter', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Z');
    const getRadio = screen.getByTestId('first-letter-search-radio');
    await userEvent.click(getRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    expect(window.alert(notFoundAlert));
  });

  it('Retorno unico de erro na rota /meals name', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Tchubaruba');
    const getRadio = screen.getByTestId(nameSearchTestRadio);
    await userEvent.click(getRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    expect(window.alert(notFoundAlert));
  });

  it('Retorno unico de erro na rota /meals ingredient', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Tchubaruba');
    const getRadio = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(getRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    expect(window.alert(notFoundAlert));
  });

  it('Verificação da rota /drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const getTitle = screen.getByTestId(dataTestTitle);
    expect(getTitle).toBeInTheDocument();
    expect(getTitle).toHaveTextContent('Drinks');
  });

  it('Retorno unico de name na rota /drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const getSearchButton = screen.getByTestId(searchTestBtn);
    await userEvent.click(getSearchButton);
    const getSearchInput = screen.getByTestId(searchTestInput);
    await userEvent.type(getSearchInput, 'Aquamarine');
    const getNameRadio = screen.getByTestId(nameSearchTestRadio);
    await userEvent.click(getNameRadio);
    const getExecSearchBtn = screen.getByTestId(execSearchTestBtn);
    await userEvent.click(getExecSearchBtn);
    await waitForElementToBeRemoved(() => screen.getByText('First Letter'));
    await screen.findByTestId('recipe-title');
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});
