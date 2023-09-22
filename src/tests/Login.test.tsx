import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

describe('Testando a page login', () => {
  it('Verificação dos elementos na página login e funcionamento do botão', async () => {
    renderWithRouterAndRedux(<App />);
    const getEmail = screen.getByTestId('email-input');
    expect(getEmail).toBeInTheDocument();
    const getPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button');
    expect(getPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    await userEvent.type(getEmail, 'usuario@example.com');
    await userEvent.type(getPassword, '1234567');
    expect(loginButton).not.toBeDisabled();
    await userEvent.click(loginButton);
  });
});
